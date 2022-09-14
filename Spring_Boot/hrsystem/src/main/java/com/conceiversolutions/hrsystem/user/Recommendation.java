package com.conceiversolutions.hrsystem.user;

public class Recommendation {
    private Long recommendationId;
    private String name;
    private Integer phone;
    private String email;
    private String relationship;

    public Recommendation() {
    }

    public Recommendation(String name, Integer phone, String email, String relationship) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.relationship = relationship;
    }

    public Recommendation(Long recommendationId, String name, Integer phone, String email, String relationship) {
        this.recommendationId = recommendationId;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.relationship = relationship;
    }

    public Long getRecommendationId() {
        return recommendationId;
    }

    public void setRecommendationId(Long recommendationId) {
        this.recommendationId = recommendationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    @Override
    public String toString() {
        return "Recommendation{" +
                "recommendationId=" + recommendationId +
                ", name='" + name + '\'' +
                ", phone=" + phone +
                ", email='" + email + '\'' +
                ", relationship='" + relationship + '\'' +
                '}';
    }
}
