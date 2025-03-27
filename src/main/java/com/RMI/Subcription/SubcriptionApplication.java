package com.RMI.Subcription;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SubcriptionApplication {

	public static void main(String[] args) {
		SpringApplication.run(SubcriptionApplication.class, args);
	}
}
