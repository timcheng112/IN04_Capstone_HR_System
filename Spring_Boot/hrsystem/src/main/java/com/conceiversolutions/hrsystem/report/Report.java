package com.conceiversolutions.hrsystem.report;

import com.conceiversolutions.hrsystem.enums.ReportTypeEnum;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Table(name="notifications")
@Getter
@Setter
@EqualsAndHashCode
public class Report {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "report_id")
        private Long reportId;
        private String reportName;
        private String reportDescription;
        private ReportTypeEnum reportTypeEnum;
        private LocalDateTime generatedDateTime;
        private LocalDateTime startPeriod;
        private LocalDateTime endPeriod;

        private List<Query> queryList;


        public Report() {
        }

    public Report(String reportName, String reportDescription, ReportTypeEnum reportTypeEnum, LocalDateTime generatedDateTime, LocalDateTime startPeriod, LocalDateTime endPeriod, List<Query> queryList) {
        this.reportName = reportName;
        this.reportDescription = reportDescription;
        this.reportTypeEnum = reportTypeEnum;
        this.generatedDateTime = generatedDateTime;
        this.startPeriod = startPeriod;
        this.endPeriod = endPeriod;
        this.queryList = queryList;
    }

    public Report(Long reportId, String reportName, String reportDescription, ReportTypeEnum reportTypeEnum, LocalDateTime generatedDateTime, LocalDateTime startPeriod, LocalDateTime endPeriod, List<Query> queryList) {
        this.reportId = reportId;
        this.reportName = reportName;
        this.reportDescription = reportDescription;
        this.reportTypeEnum = reportTypeEnum;
        this.generatedDateTime = generatedDateTime;
        this.startPeriod = startPeriod;
        this.endPeriod = endPeriod;
        this.queryList = queryList;
    }

    @Override
    public String toString() {
        return "Report{" +
                "reportId=" + reportId +
                ", reportName='" + reportName + '\'' +
                ", reportDescription='" + reportDescription + '\'' +
                ", reportTypeEnum=" + reportTypeEnum +
                ", generatedDateTime=" + generatedDateTime +
                ", startPeriod=" + startPeriod +
                ", endPeriod=" + endPeriod +
                ", queryList=" + queryList +
                '}';
    }
}
