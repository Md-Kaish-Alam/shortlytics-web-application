package com.backend.shortlytics.dtos;

import com.backend.shortlytics.models.User;
import lombok.Data;

@Data
public class RegisterResponse {
    private String message;
    private User user;
}
