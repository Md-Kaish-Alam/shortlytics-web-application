package com.backend.shortlytics.controller;


import com.backend.shortlytics.dtos.ClickEventDTO;
import com.backend.shortlytics.dtos.UrlMappingDTO;
import com.backend.shortlytics.models.User;
import com.backend.shortlytics.services.UrlMappingService;
import com.backend.shortlytics.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {

    private UrlMappingService urlMappingService;

    private UserService userService;

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> createShortUrl(
            @RequestBody Map<String, String> request, Principal principal) {

        String originalUrl = request.get("originalUrl");
        User user = userService.findByUsername(principal.getName());

        UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(originalUrl, user);

        return ResponseEntity.ok(urlMappingDTO);
    }

    @GetMapping("/my-urls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                               @RequestParam("startDate") String startDate,
                                                               @RequestParam("endDate") String endDate) {

        // 2025-08-02T23:22:10
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

        List<ClickEventDTO> clickEventDTOS = urlMappingService.getClickEventsByDate(shortUrl, start, end);

        return ResponseEntity.ok(clickEventDTOS);

    }

    @GetMapping("/total-clicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getUrlTotalClicksByDate(Principal principal,
                                                                        @RequestParam("startDate") String startDate,
                                                                        @RequestParam("endDate") String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        User user = userService.findByUsername(principal.getName());
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        Map<LocalDate, Long> totalClicksByUserAndDate = urlMappingService.getUrlTotalClicksByUserAndDate(user, start, end);

        return ResponseEntity.ok(totalClicksByUserAndDate);
    }
}
