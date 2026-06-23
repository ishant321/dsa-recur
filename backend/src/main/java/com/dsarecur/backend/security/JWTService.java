package com.dsarecur.backend.security;

import com.dsarecur.backend.model.Users;
import com.dsarecur.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.refresh-secret}")
    private String refreshSecretKey;

    private SecretKey getKey(String type) {
        return type.equals("ACCESS") ?
                Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8))
                :
                Keys.hmacShaKeyFor(refreshSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Users user) {
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("type", "ACCESS");

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 15))
                .and()
                .signWith(getKey("ACCESS"))
                .compact();
    }

    public String generateRefreshToken(Users user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "REFRESH");

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 7)) // 7 days
                .and()
                .signWith(getKey("REFRESH"))
                .compact();
    }

    public String extractUserEmail(String token, String type) {
        return extractClaim(token, Claims::getSubject, type);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver, String type) {
        if("ACCESS".equals(type)) {
            final Claims claims = extractAccessClaims(token);
            return claimsResolver.apply(claims);
        }
        else if ("REFRESH".equals(type)) {
            final Claims claims = extractRefreshClaims(token);
            return claimsResolver.apply(claims);
        }
        return null;
    }

    private Claims extractAccessClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey("ACCESS"))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Claims extractRefreshClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey("REFRESH"))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateAccessToken(String token, UserDetail userDetail) {
        Claims claims = extractAccessClaims(token);

        String email = claims.getSubject();
        String type = claims.get("type", String.class);

        return email.equals(userDetail.getUsername())
                && !isTokenExpired(token, "ACCESS")
                && "ACCESS".equals(type);
    }

    public boolean validateRefreshToken(String token) {
        Claims claims = extractRefreshClaims(token);

        String type = claims.get("type", String.class);
        return !isTokenExpired(token, type)
                && "REFRESH".equals(type);
    }

    private boolean isTokenExpired(String token, String type) {
        return extractExpiration(token, type).before(new Date());
    }

    private Date extractExpiration(String token, String type) {
        return extractClaim(token, Claims::getExpiration, type);
    }

    public String getNewAccessToken(String refreshToken) {

        Claims claims = extractRefreshClaims(refreshToken);

        if (!validateRefreshToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String email = claims.getSubject();

        // IMPORTANT: load user (so token is not blindly trusted)
        Users user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return generateAccessToken(user);
    }
}
