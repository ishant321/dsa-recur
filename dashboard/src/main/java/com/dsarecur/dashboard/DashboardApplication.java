package com.dsarecur.dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka
public class DashboardApplication {


	public static void main(String[] args) {
		System.setProperty("user.timezone", "Asia/Kolkata");
		java.util.TimeZone.setDefault(
				java.util.TimeZone.getTimeZone("Asia/Kolkata"));

		System.out.println("🔥 APP STARTED");
		SpringApplication.run(DashboardApplication.class, args);
	}

}
