package com.conceiversolutions.hrsystem.performance.review;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/review")
public class ReviewController {
    
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping(path = "{year}/employee/{employeeId}")
    public List<Review> getEmployeeReviewsByYear(@PathVariable("year") String year, @PathVariable("employeeId") Long employeeId) throws Exception {
        return reviewService.getEmployeeReviewsByYear(year, employeeId);
    }

    @GetMapping(path = "{year}/manager/{managerId}")
    public List<Review> getManagerReviewsByYear(@PathVariable("year") String year, @PathVariable("managerId") Long managerId) throws Exception {
        return reviewService.getManagerReviewsByYear(year, managerId);
    }

    @GetMapping(path = "manager/{managerId}")
    public List<Review> getManagerReviewsByManager(@PathVariable("managerId") Long managerId) throws Exception {
        return reviewService.getManagerReviewsByManager(managerId);
    }

    @GetMapping(path = "{year}/all")
    public List<Review> getAllReviewsByYear(@PathVariable("year") String year) throws Exception {
        return reviewService.getAllReviewsByYear(year);
    }

    @GetMapping(path = "{reviewId}")
    public Review getReviewById(@PathVariable("reviewId") Long reviewId) throws Exception {
        return reviewService.getReviewById(reviewId);
    }

    @PutMapping(path = "save/{reviewId}")
    public String saveReview(@PathVariable("reviewId") Long reviewId,
            @RequestParam("strengths") String strengths, @RequestParam("weaknesses") String weaknesses,
            @RequestParam("rating") Integer rating) throws Exception {
        return reviewService.saveReview(reviewId, strengths, weaknesses, rating);
    }

    @PutMapping(path = "submit/{reviewId}")
    public String submitReview(@PathVariable("reviewId") Long reviewId,
            @RequestParam("strengths") String strengths, @RequestParam("weaknesses") String weaknesses,
            @RequestParam("rating") Integer rating) throws Exception {
        return reviewService.submitReview(reviewId, strengths, weaknesses, rating);
    }

    @PutMapping(path = "delete/{reviewId}")
    public String deleteReview(@PathVariable("reviewId") Long reviewId) throws Exception {
        return reviewService.deleteReview(reviewId);
    }
    
}
