package com.backend.shortlytics.repository;

import com.backend.shortlytics.models.UrlMapping;
import com.backend.shortlytics.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {
    UrlMapping findByShortUrl(String shortUrl);
    List<UrlMapping> findByUser(User user);
}
