package com.conceiversolutions.hrsystem.performance.review;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.conceiversolutions.hrsystem.performance.appraisal.AppraisalService;
import com.conceiversolutions.hrsystem.performance.appraisalPeriod.AppraisalPeriod;
import com.conceiversolutions.hrsystem.performance.appraisalPeriod.AppraisalPeriodRepository;
import com.conceiversolutions.hrsystem.performance.reviewPeriod.ReviewPeriod;
import com.conceiversolutions.hrsystem.performance.reviewPeriod.ReviewPeriodRepository;
import com.conceiversolutions.hrsystem.user.user.User;
import com.conceiversolutions.hrsystem.user.user.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final AppraisalPeriodRepository appraisalPeriodRepository;

    private final ReviewPeriodRepository reviewPeriodRepository;

    private final UserRepository userRepository;

    public User breakRelationships(User user) {
        User u = new User();

        u.setUserId(user.getUserId());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setWorkEmail(user.getWorkEmail());
        u.setUserRole(user.getUserRole());
        u.setProfilePic(user.getProfilePic());
        u.setIsBlackListed(user.getIsBlackListed());
        u.setCitizenship(user.getCitizenship());
        u.setDateJoined(user.getDateJoined());
        u.setDob(user.getDob());
        u.setEmail(user.getEmail());
        u.setGender(user.getGender());
        u.setIsEnabled(user.getIsEnabled());
        u.setIsHrEmployee(user.getIsHrEmployee());
        u.setIsPartTimer(user.getIsPartTimer());
        u.setPassword(user.getPassword());
        u.setPhone(user.getPhone());
        u.setRace(user.getRace());
        u.setCurrentPosition(user.getCurrentPosition());
        u.setCurrentLeaveQuota(user.getCurrentLeaveQuota());

        return u;
    }

    public String createManagerReviews(String year, Long employeeId, Long managerId) throws Exception {
        System.out.println("ReviewService.createManagerReviews");

        Optional<ReviewPeriod> optionalReviewPeriod = reviewPeriodRepository.findReviewPeriodByYear(year);

        if (optionalReviewPeriod.isPresent()) {

            ReviewPeriod reviewPeriod = optionalReviewPeriod.get();

            Optional<Review> optionalReview = reviewRepository.findReviewByEmployeeManager(employeeId, managerId, year);

            if (!optionalReview.isPresent()) {

                Review review = new Review(year, "Incomplete", "", "", null, null, null, null);

                if (LocalDate.now().isAfter(reviewPeriod.getEndDate()) && !review.getStatus().equals("Completed")) {
                    review.setStatus("Overdue");
                }

                Optional<User> optionalEmployee = userRepository.findById(employeeId);
                Optional<User> optionalManager = userRepository.findById(managerId);

                if (optionalEmployee.isPresent() && optionalManager.isPresent()) {

                    User employee = optionalEmployee.get();
                    User e = breakRelationships(employee);
                    review.setEmployeeReviewing(e);

                    User manager = optionalManager.get();
                    User m = breakRelationships(manager);
                    review.setManager(m);

                    reviewRepository.save(review);

                } else {
                    throw new IllegalStateException("Unable to find employee reviewing or manager");
                }

                return "" + review.getEmployeeReviewing().getFirstName() + " " + review.getManager().getLastName()
                        + "'s review has been created for " + review.getReviewYear();

            } else {

                Review review = optionalReview.get();

                if (LocalDate.now().isAfter(reviewPeriod.getEndDate()) && !review.getStatus().equals("Completed")) {
                    review.setStatus("Overdue");
                }

                User employee = breakRelationships(review.getEmployeeReviewing());
                User manager = breakRelationships(review.getManager());

                review.setEmployeeReviewing(employee);
                review.setManager(manager);

                return "" + review.getEmployeeReviewing().getFirstName() + " " + review.getManager().getLastName()
                        + "'s review has already been created for " + review.getReviewYear();
            }

        } else {
            throw new IllegalStateException("Unable to find review period");
        }

    }

    public List<Review> getEmployeeReviewsByYear(String year, Long employeeId) {

        List<Review> reviews = reviewRepository.findEmployeeReviewByYear(year, employeeId);

        for (Review r : reviews) {
            User employee = r.getEmployeeReviewing();
            User e = breakRelationships(employee);
            r.setEmployeeReviewing(e);

            User manager = r.getManager();
            User m = breakRelationships(manager);
            r.setManager(m);
        }

        return reviews;
    }

    public Review getReviewById(Long reviewId) throws Exception {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);

        if (optionalReview.isPresent()) {

            Review review = optionalReview.get();

            review.setEmployeeReviewing(breakRelationships(review.getEmployeeReviewing()));
            review.setManager(breakRelationships(review.getManager()));

            return review;

        } else {
            throw new IllegalStateException("Unable to find review");
        }

    }

    @Transactional
    public String saveReview(Long reviewId, String strengths, String weaknesses, Integer rating) throws Exception {
        System.out.println("ReviewSerivce.saveReview");
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);

        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();
            review.setStrengths(strengths);
            review.setWeaknesses(weaknesses);
            review.setRating(rating);
            review.setStatus("In Progress");

            return "Review for " + review.getManager().getFirstName() + " " + review.getManager().getLastName() + " by "
                    + review.getEmployeeReviewing().getFirstName() + " " + review.getEmployeeReviewing().getLastName()
                    + " has been saved.";

        } else {
            throw new IllegalStateException("Unable to find review");
        }
    }

    @Transactional
    public String submitReview(Long reviewId, String strengths, String weaknesses, Integer rating) throws Exception {
        System.out.println("ReviewSerivce.submitReview");
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);

        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();
            review.setStrengths(strengths);
            review.setWeaknesses(weaknesses);
            review.setRating(rating);
            review.setStatus("Completed");
            review.setSubmitted(true);

            return "Review for " + review.getManager().getFirstName() + " " + review.getManager().getLastName() + " by "
                    + review.getEmployeeReviewing().getFirstName() + " " + review.getEmployeeReviewing().getLastName()
                    + " has been submitted.";

        } else {
            throw new IllegalStateException("Unable to find review");
        }
    }

    @Transactional
    public String deleteReview(Long reviewId) throws Exception {
        System.out.println("ReviewSerivce.submitReview");
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);

        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();
            review.setStrengths("");
            review.setWeaknesses("");
            review.setRating(null);
            review.setSubmitted(null);
            review.setStatus("Incomplete");

            return "Review for " + review.getManager().getFirstName() + " " + review.getManager().getLastName() + " has been deleted.";
        } else {
            throw new IllegalStateException("Unable to find review");
        }
    }

    public List<Review> getAllReviewsByYear(String year) {
        List<Review> reviews = reviewRepository.findAllReviewsByYear(year);
        for (Review r : reviews) {
            User employee = r.getEmployeeReviewing();
            User manager = r.getManager();

            r.setEmployeeReviewing(breakRelationships(employee));
            r.setManager(breakRelationships(manager));
        }
        return reviews;
    }

    public List<Review> getManagerReviewsByYear(String year, Long managerId) {
        List<Review> reviews = reviewRepository.findManagerReviewByYear(year, managerId);

        for (Review r : reviews) {
            User employee = r.getEmployeeReviewing();
            User e = breakRelationships(employee);
            r.setEmployeeReviewing(e);

            User manager = r.getManager();
            User m = breakRelationships(manager);
            r.setManager(m);
        }

        return reviews;
    }

}
