package com.dsarecur.backend.service;

import com.dsarecur.backend.model.UserDetail;
import com.dsarecur.backend.model.Users;
import com.dsarecur.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException(email + "not found");
        }
        return new UserDetail(user);
    }
}
