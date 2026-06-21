package com.dsarecur.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		System.setProperty("user.timezone", "Asia/Kolkata");
		java.util.TimeZone.setDefault(
				java.util.TimeZone.getTimeZone("Asia/Kolkata"));
		SpringApplication.run(BackendApplication.class, args);
	}

}
