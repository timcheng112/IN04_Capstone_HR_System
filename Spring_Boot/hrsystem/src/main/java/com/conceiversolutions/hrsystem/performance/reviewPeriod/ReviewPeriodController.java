package com.conceiversolutions.hrsystem.performance.reviewPeriod;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "api/reviewPeriod")
public class ReviewPeriodController {
    
    private final ReviewPeriodService reviewPeriodService;

    public ReviewPeriodController(ReviewPeriodService reviewPeriodService) {
        this.reviewPeriodService = reviewPeriodService;
    }

    @PostMapping
    public String addReviewPeriod(@RequestBody ReviewPeriod reviewPeriod) throws Exception {
        return reviewPeriodService.addReviewPeriod(reviewPeriod);
    }

    @GetMapping(path = "{year}")
    public ReviewPeriod getReviewPeriodByYear(@PathVariable("year") String year) throws Exception {
        return reviewPeriodService.getReviewPeriodByYear(year);
    }

    @GetMapping
    public List<ReviewPeriod> getReviewPeriods() throws Exception {
        return reviewPeriodService.getReviewPeriods();
    }

    @PutMapping
    public String updateReviewPeriod(@RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) throws Exception {
        return reviewPeriodService.updateReviewPeriod(startDate, endDate);
    }

}
