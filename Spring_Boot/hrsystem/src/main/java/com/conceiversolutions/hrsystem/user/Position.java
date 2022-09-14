package com.conceiversolutions.hrsystem.user;

import java.time.LocalDate;

public class Position {
    private Long positionId;
    private String positionName;
    private String description;
    private LocalDate started;

    public Position() {
    }

    public Position(String positionName, String description, LocalDate started) {
        this.positionName = positionName;
        this.description = description;
        this.started = started;
    }

    public Position(Long positionId, String positionName, String description, LocalDate started) {
        this.positionId = positionId;
        this.positionName = positionName;
        this.description = description;
        this.started = started;
    }

    public Long getPositionId() {
        return positionId;
    }

    public void setPositionId(Long positionId) {
        this.positionId = positionId;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStarted() {
        return started;
    }

    public void setStarted(LocalDate started) {
        this.started = started;
    }

    @Override
    public String toString() {
        return "Position{" +
                "positionId=" + positionId +
                ", positionName='" + positionName + '\'' +
                ", description='" + description + '\'' +
                ", started=" + started +
                '}';
    }
}
