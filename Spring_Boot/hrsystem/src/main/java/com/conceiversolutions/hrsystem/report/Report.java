package com.conceiversolutions.hrsystem.report;

import com.conceiversolutions.hrsystem.enums.ReportTypeEnum;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Table(name="reports")
@Getter
@Setter
@EqualsAndHashCode
@Entity
public class Report {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "report_id")
        private Long reportId;
        @Column(name = "report_name")
        private String reportName;
        @Column(name = "report_description")
        private String reportDescription;
        @Column(name = "report_type_enum")
        private ReportTypeEnum reportTypeEnum;
        @Column(name = "generated_datetime")
        private LocalDateTime generatedDateTime;
        @Column(name = "start_period")
        private LocalDateTime startPeriod;
        @Column(name = "end_period")
        private LocalDateTime endPeriod;
        @Column(name = "query_list")
        private String queryList;


        public Report() {
        }

        public Report(String reportName, String reportDescription, ReportTypeEnum reportTypeEnum, LocalDateTime generatedDateTime, LocalDateTime startPeriod, LocalDateTime endPeriod, String queryList) {
            this.reportName = reportName;
            this.reportDescription = reportDescription;
            this.reportTypeEnum = reportTypeEnum;
            this.generatedDateTime = generatedDateTime;
            this.startPeriod = startPeriod;
            this.endPeriod = endPeriod;
            this.queryList = queryList;
        }

        public Report(Long reportId, String reportName, String reportDescription, ReportTypeEnum reportTypeEnum, LocalDateTime generatedDateTime, LocalDateTime startPeriod, LocalDateTime endPeriod, String queryList) {
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
