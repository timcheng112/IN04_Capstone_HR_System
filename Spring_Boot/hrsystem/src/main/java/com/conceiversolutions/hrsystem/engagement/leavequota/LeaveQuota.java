package com.conceiversolutions.hrsystem.engagement.leavequota;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "leave_quotas")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class LeaveQuota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_quota_id")
    private Long leaveQuotaId;
    @Column(name = "year", nullable = false)
    private Integer year;
    @OneToOne(fetch = FetchType.LAZY, targetEntity = LeaveQuota.class)
    @JoinColumn(name = "previous_leave_quota", nullable = true)
    private LeaveQuota previousLeaveQuota;

    // leave types
    @Column(name = "anl", nullable = false)
    private Integer ANL; // annual leave
    @Column(name = "anl_allocated", nullable = false)
    private Integer ANLAllocated;

    @Column(name = "mcl", nullable = false)
    private Integer MCL; // medical leave
    @Column(name = "mcl_allocated", nullable = false)
    private Integer MCLAllocated;

    @Column(name = "hpl", nullable = false)
    private Integer HPL; // hospital leave
    @Column(name = "hpl_allocated", nullable = false)
    private Integer HPLAllocated;

    @Column(name = "ccl", nullable = false)
    private Integer CCL; // child care leave
    @Column(name = "ccl_allocated", nullable = false)
    private Integer CCLAllocated;

    @Column(name = "mpl", nullable = false)
    private Integer MPL; // maternity paternity leave
    @Column(name = "mpl_allocated", nullable = false)
    private Integer MPLAllocated;

    @Column(name = "bdl", nullable = false)
    private Integer BDL; // birthday leave
    @Column(name = "bdl_allocated", nullable = false)
    private Integer BDLAllocated;

    @Column(name = "cpl", nullable = false)
    private Integer CPL; // compassionate leave
    @Column(name = "cpl_allocated", nullable = false)
    private Integer CPLAllocated;

    @Column(name = "ecl", nullable = false)
    private Integer ECL; // eldercare leave
    @Column(name = "ecl_allocated", nullable = false)
    private Integer ECLAllocated;

    @Column(name = "mal", nullable = false)
    private Integer MAL; // marriage leave
    @Column(name = "mal_allocated", nullable = false)
    private Integer MALAllocated;

    @Column(name = "npl", nullable = false)
    private Integer NPL; // no pay leave
    @Column(name = "npl_allocated", nullable = false)
    private Integer NPLAllocated;
    @Column(name = "oil", nullable = false)
    private Integer OIL; // no pay leave
    @Column(name = "oil_allocated", nullable = false)
    private Integer OILAllocated;

    public LeaveQuota(Integer year, LeaveQuota previousLeaveQuota, Integer ANLAllocated, Integer MCLAllocated, Integer HPLAllocated, Integer CCLAllocated, Integer MPLAllocated, Integer BDLAllocated, Integer CPLAllocated, Integer ECLAllocated, Integer MALAllocated, Integer NPLAllocated) {
        this.year = year;
        this.previousLeaveQuota = previousLeaveQuota;
        this.ANL = ANLAllocated;
        this.ANLAllocated = ANLAllocated;
        this.MCL = MCLAllocated;
        this.MCLAllocated = MCLAllocated;
        this.HPL = HPLAllocated;
        this.HPLAllocated = HPLAllocated;
        this.CCL = CCLAllocated;
        this.CCLAllocated = CCLAllocated;
        this.MPL = MPLAllocated;
        this.MPLAllocated = MPLAllocated;
        this.BDL = BDLAllocated;
        this.BDLAllocated = BDLAllocated;
        this.CPL = CPLAllocated;
        this.CPLAllocated = CPLAllocated;
        this.ECL = ECLAllocated;
        this.ECLAllocated = ECLAllocated;
        this.MAL = MALAllocated;
        this.MALAllocated = MALAllocated;
        this.NPL = NPLAllocated;
        this.NPLAllocated = NPLAllocated;
        this.OIL = 0;
        this.OILAllocated = 0;
    }

    public int getAvailableANL() {
        if (this.previousLeaveQuota == null) {
            return this.ANL;
        } else {
            return this.ANL + this.previousLeaveQuota.getANL();
        }
    }

    public LeaveQuota populateFullTime(LocalDate startDate) {
        System.out.println("LeaveQuota.populateFullTime");
        int month = LocalDate.now().getMonthValue();
        this.year = LocalDate.now().getYear();
        this.previousLeaveQuota = null;

        // Annual Leave, Medical Leave, Hospitalization Leave and No-Pay Leaves are allowed to be prorated based
        // on number of months expected to be completed in the eyar.
        this.ANL = proRation(month, 14);
        this.ANLAllocated = proRation(month, 14);
        System.out.println("ANL given is " + this.getANLAllocated());
        this.MCL = proRation(month, 14);
        this.MCLAllocated = proRation(month, 14);
        System.out.println("MCL given is " + this.getMCLAllocated());
        this.HPL = proRation(month, 60);
        this.HPLAllocated = proRation(month, 60);
        this.CCL = 6;
        this.CCLAllocated = 6;
        this.MPL = 0;
        this.MPLAllocated = 0;
        this.BDL = 1;
        this.BDLAllocated = 1;
        this.CPL = 5;
        this.CPLAllocated = 5;
        this.ECL = 5;
        this.ECLAllocated = 5;
        this.MAL = 5;
        this.MALAllocated = 5;
        this.NPL = proRation(month, 180);
        this.NPLAllocated = proRation(month, 180);
        this.OIL = 0;
        this.OILAllocated = 0;
        return this;
    }

    public int proRation(int month, int total) {
//        System.out.println("LeaveQuota.proRation");
        int completedMonths = 12 - month;
        double proRated = (double) completedMonths/12 * 14;

//        System.out.println("prorated is " + proRated);
        // according to MOM law, if proRated amount fractice is < 0.5, round down. else round up
        if (proRated % 1 < 0.5) {
            return (int) Math.floor(proRated);
        }
        return (int) Math.ceil(proRated);
    }
}
