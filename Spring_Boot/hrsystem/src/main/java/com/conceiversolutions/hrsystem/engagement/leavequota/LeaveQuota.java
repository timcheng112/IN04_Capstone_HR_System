package com.conceiversolutions.hrsystem.engagement.leavequota;

import lombok.*;

import javax.persistence.*;

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
    }

    public int getAvailableANL() {
        if (this.previousLeaveQuota == null) {
            return this.ANL;
        } else {
            return this.ANL + this.previousLeaveQuota.getANL();
        }
    }
}
