import {
  Cog8ToothIcon,
  DocumentMagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { differenceInHours, format, parseISO, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import RunPayRollDialog from "../../features/payroll/RunPayrollDialog";
import api from "../../utils/api";
import EditPayInformationForm from "./EditPayInformationForm";
import PayslipDocument from "../../features/payroll/PayslipDocument/PayslipDocument";
import { getUserId } from "../../utils/Common";
import { usePDF } from "@react-pdf/renderer";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Overview = ({
  searchFilteredEmployees,
  isEditPayInformationFormOpen,
  openEditPayInformationForm,
  closeEditPayInformationForm,
  openPayslip,
  onChangeHandler,
  setPdfUrl,
}) => {
  const date = format(subDays(new Date(), 7), "MMMM yyyy");
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [isRunPayrollDialogOpen, setIsRunPayrollDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progressCounter, setProgressCounter] = useState(0);
  const [totalAmountEmployees, setTotalAmountEmployees] = useState(0);

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => console.log("Error in fetching user"));
  }, []);

  // function uploadPdfFile(e) {
  //   e.preventDefault();
  //   let formData = new FormData();
  //   const file = instance.blob;
  //   console.log("FILE: " + file);
  //   if (file) {
  //     console.log("NOT NULL");
  //     formData.append("file", file);
  //   }
  //   console.log("FORM DATA: " + formData);
  //   console.log(formData);

  //   try {
  //     api
  //       .uploadPayslipPdf(formData, 43)
  //       .then((response) => alert("YAY"))
  //       .catch((error) => alert("Error"));
  //   } catch (err) {
  //     console.log("There was a problem with uploading...");
  //     console.log(err);
  //   }
  // }

  // create payslip and then upload its payslip pdf to database
  // function uploadFile(e) {
  // e.preventDefault();

  // const MyPayslipDoc = <PayslipDocument />;
  // const MyPayslipDoc = (payslipWrapper) => {
  //   return <PayslipDocument payslipWrapper={payslipWrapper} />;
  // };

  // const [tempPayslipWrapper, setTempPayslipWrapper] = useState({
  //   payslip: {
  //     monthOfPayment: 8,
  //     yearOfPayslip: 2022,
  //     dateOfPayment: "2022-08-31",
  //     grossSalary: 2000.0,
  //     basicSalary: 2500.0,
  //     allowance: 100.0,
  //     deduction: 600.0,
  //     dateGenerated: "2022-08-31",
  //   },
  //   allowances: [],
  //   deductions: [],
  //   user: {
  //     userId: 1,
  //     firstName: "Janice",
  //     lastName: "Sim",
  //   },
  // });

  const [tempPayslipWrapper, setTempPayslipWrapper] = useState(null);
  const [usersWithPayslipsGenerated, setUsersWithPayslipsGenerated] = useState(
    []
  );
  const document = <PayslipDocument payslipWrapper={tempPayslipWrapper} />;
  const [instance, updateInstance] = usePDF({
    document,
  });

  const uploadFile = (payslipWrapper) => {
    let formData = new FormData();
    const file = instance.blob;
    if (file) {
      formData.append("file", file);
    }

    try {
      api
        .addPayslipToUser(payslipWrapper.user.userId, payslipWrapper.payslip)
        .then((response) => {
          api
            .uploadPayslipPdf(formData, response.data)
            .then((response) => {
              console.log(
                "Successfully generated for user with id: " +
                  payslipWrapper.user.userId
              );
              if (progressCounter + 1 === totalAmountEmployees) {
                setIsRunning(false);
                setShowSuccess(true);
              }
            })
            .catch((error) => {
              console.log("Error");
              if (progressCounter + 1 === totalAmountEmployees) {
                setIsRunning(false);
                setShowSuccess(true);
              }
            });
        })
        .catch((error) => {
          console.log(error.response);
        });
    } catch (err) {
      console.log("There was a problem with uploading...");
      console.log(err);
    }
  };

  const viewPayslipHandler = (employee) => {
    api
      .findUserPayslipByMonth(
        employee.userId,
        format(subDays(new Date(), 7), "yyyy-MM-dd")
      )
      .then((response) => {
        api.getDocById(response.data.payslipPDF.docId).then((response) => {
          const url = window.URL.createObjectURL(response.data);
          setPdfUrl(url);
        });
      });
  };

  const calculateAge = (employeeDob) => {
    let dob = new Date(employeeDob);
    //calculate month difference from current date in time
    let month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    let age_dt = new Date(month_diff);

    //extract year from date
    let year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    let age = Math.abs(year - 1970);

    return age;
  };

  // for running payroll
  // need userId and month (current payroll month)
  // 1. gets user's pay information and allowances/deductions (need entity) for the month
  // 2. makes it into a payslip object and passes to uploadFile function
  const runPayrollHandler = () => {
    api.getAllEmployees().then((response) => {
      const employees = response.data;
      const payslips = [];

      // find employees in payroll
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].currentPayInformation.inPayroll) {
          const allowances = employees[i].currentPayInformation.allowance;
          const deductions = employees[i].currentPayInformation.deduction;
          let allowanceTotalAmount = 0;
          for (let i = 0; i < allowances.length; i++) {
            allowanceTotalAmount += allowances[i].template.amount;
          }
          let deductionTotalAmount = 0;
          for (let i = 0; i < deductions.length; i++) {
            deductionTotalAmount += deductions[i].template.amount;
          }

          // ********************************************************************** //
          // calculate OT hours and pay
          // calculate PH/Weekend pay
          let otHours = 0;
          let otPay = 0;
          let otPhWeekendHours = 0;
          let phWeekendHours = 0;
          let phWeekendHoursWorked = 0;
          let phWeekendPay = 0;
          let totalShiftHours = 0;
          let hoursWorked = 0;
          api
            .getShiftListItemsByMonth(
              employees[i].userId,
              format(subDays(new Date(), 7), "yyyy-MM-dd")
            )
            .then((response) => {
              console.log(response.data);
              for (let i = 0; i < response.data.length; i++) {
                console.log("**************FOUND SHIFT****************");
                console.log(
                  differenceInHours(
                    parseISO(response.data[i].shift.endTime),
                    parseISO(response.data[i].shift.startTime)
                  )
                );
                const shiftHours = differenceInHours(
                  parseISO(response.data[i].shift.endTime),
                  parseISO(response.data[i].shift.startTime)
                );
                totalShiftHours += shiftHours;
                const shiftHoursWorked = differenceInHours(
                  parseISO(response.data[i].checkOutTiming),
                  parseISO(response.data[i].checkInTiming)
                );
                console.log(
                  "**************SHIFT HOURS WORKED****************" +
                    shiftHoursWorked
                );
                hoursWorked += shiftHoursWorked;
                if (response.data[i].isWeekend || response.data[i].isPhEvent) {
                  phWeekendHours += differenceInHours(
                    parseISO(response.data[i].shift.endTime),
                    parseISO(response.data[i].shift.startTime)
                  );
                  phWeekendHoursWorked += differenceInHours(
                    parseISO(response.data[i].checkOutTiming),
                    parseISO(response.data[i].checkInTiming)
                  );
                  if (phWeekendHoursWorked > phWeekendHours) {
                    otPhWeekendHours += shiftHoursWorked - shiftHours;
                  }
                }
              }

              if (!employees[i].isPartTimer) {
                // PH/weekend/event pay for FT
                if (
                  employees[i].currentPayInformation.basicHourlyPay !== null
                ) {
                  console.log("TEST1: " + phWeekendPay);
                  console.log("TEST1: " + phWeekendHoursWorked);
                  console.log("TEST1: " + otPhWeekendHours);
                  phWeekendPay +=
                    (phWeekendHoursWorked - otPhWeekendHours) *
                    1.5 *
                    employees[i].currentPayInformation.basicHourlyPay;
                  console.log("TEST1: " + phWeekendPay);
                }

                // with reference to https://www.mom.gov.sg/employment-practices/hours-of-work-overtime-and-rest-days#:~:text=Work%20done%20beyond%20the%20contractual,hourly%20basic%20rate%20of%20pay
                // must work a minimum of 40hrs to claim OT pay
                if (totalShiftHours >= 40) {
                  if (hoursWorked > totalShiftHours) {
                    otHours = hoursWorked - totalShiftHours;
                    // max 72hrs of OT per month
                    if (otHours >= 0 && otHours <= 72) {
                      if (
                        employees[i].currentPayInformation.basicHourlyPay !==
                        null
                      ) {
                        otPay +=
                          otPhWeekendHours *
                            1.5 *
                            1.5 *
                            employees[i].currentPayInformation.basicHourlyPay +
                          (otHours - otPhWeekendHours) *
                            1.5 *
                            employees[i].currentPayInformation.basicHourlyPay;
                      } else {
                        otPay +=
                          otHours *
                          1.5 *
                          (employees[i].currentPayInformation.basicSalary /
                            8 /
                            4);
                      }
                    } else {
                      if (
                        employees[i].currentPayInformation.basicHourlyPay !==
                        null
                      ) {
                        otPay +=
                          (72 - otPhWeekendHours) *
                            employees[i].currentPayInformation.basicHourlyPay *
                            1.5 +
                          otPhWeekendHours *
                            employees[i].currentPayInformation.basicHourlyPay *
                            1.5 *
                            1.5;
                      } else {
                        otPay +=
                          72 *
                          1.5 *
                          (employees[i].currentPayInformation.basicSalary /
                            8 /
                            4);
                      }
                    }
                  }
                }
              } else {
                if (
                  employees[i].currentPayInformation.basicHourlyPay !== null
                ) {
                  phWeekendPay +=
                    (phWeekendHoursWorked - otPhWeekendHours) *
                    1.5 *
                    employees[i].currentPayInformation.basicHourlyPay;
                }

                // with reference to https://www.mom.gov.sg/employment-practices/part-time-employment/overtime#:~:text=As%20a%20part-time%20employee,a%20similar%20full-time%20employee
                otHours = hoursWorked - totalShiftHours;
                if (hoursWorked > totalShiftHours && hoursWorked > 8 * 5 * 4) {
                  otHours = hoursWorked - 8 * 5 * 4;
                  if (otHours >= 0 && otHours <= 72) {
                    if (
                      employees[i].currentPayInformation.basicHourlyPay !== null
                    ) {
                      otPay +=
                        8 * employees[i].currentPayInformation.basicHourlyPay +
                        (otHours - otPhWeekendHours) *
                          (employees[i].currentPayInformation.basicHourlyPay *
                            1.5) +
                        (8 *
                          employees[i].currentPayInformation.basicHourlyPay *
                          1.5 +
                          otPhWeekendHours *
                            (employees[i].currentPayInformation.basicHourlyPay *
                              1.5 *
                              1.5));
                    }
                  } else {
                    if (
                      employees[i].currentPayInformation.basicHourlyPay !== null
                    ) {
                      otPay +=
                        8 * employees[i].currentPayInformation.basicHourlyPay +
                        (72 - otPhWeekendHours) *
                          (employees[i].currentPayInformation.basicHourlyPay *
                            1.5) +
                        (8 *
                          employees[i].currentPayInformation.basicHourlyPay *
                          1.5 +
                          otPhWeekendHours *
                            (employees[i].currentPayInformation.basicHourlyPay *
                              1.5 *
                              1.5));
                    }
                  }
                }
              }
              console.log(
                "*********HOURS WORKED: " + hoursWorked + "************"
              );
              let basicSalary = 0;
              console.log("TOTAL SHIFT HOURS: " + totalShiftHours);
              if (hoursWorked >= totalShiftHours) {
                basicSalary =
                  employees[i].currentPayInformation.basicSalary ??
                  employees[i].currentPayInformation.basicHourlyPay *
                    totalShiftHours +
                    phWeekendPay;
                if (employees[i].currentPayInformation.basicHourlyPay) {
                  console.log("TEST " + employees[i].firstName);
                  console.log("TEST " + phWeekendPay);
                  console.log(
                    "TEST: " +
                      employees[i].currentPayInformation.basicHourlyPay *
                        totalShiftHours +
                      phWeekendPay
                  );
                }
              } else {
                basicSalary = employees[i].currentPayInformation.basicSalary
                  ? employees[i].currentPayInformation.basicSalary
                  : employees[i].currentPayInformation.basicHourlyPay *
                      totalShiftHours +
                    phWeekendPay;
              }
              console.log("BASIC SALARY: " + basicSalary);

              // ********************************************************************** //
              // calculate CPF
              // according to https://www.cpf.gov.sg/content/dam/web/employer/employer-obligations/documents/CPFContributionRatesTable_1Jan2022.pdf
              let cpf = 0;

              const totalWages = employees[i].currentPayInformation.grossSalary; // take gross as net
              const ordinaryWages = basicSalary;
              const additionalWages = basicSalary + allowanceTotalAmount;
              const age = calculateAge(employees[i].dob);

              if (
                employees[i].citizenship === "CITIZEN" ||
                employees[i].citizenship === "PR"
              ) {
                // for sg citizen & 3rd year SPR
                if (age <= 55) {
                  // take gross as net aka TW, TW = OA + AW
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.6 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(1200, 0.2 * ordinaryWages) +
                        0.2 * additionalWages
                    );
                  }
                } else if (age <= 60) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.42 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(840, 0.14 * ordinaryWages) +
                        0.14 * additionalWages
                    );
                  }
                } else if (age <= 65) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.255 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(510, 0.085 * ordinaryWages) +
                        0.085 * additionalWages
                    );
                  }
                } else if (age <= 70) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.18 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(360, 0.06 * ordinaryWages) +
                        0.06 * additionalWages
                    );
                  }
                } else {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                }
              } else if (employees[i].citizenship === "FIRST_PR_GG") {
                // for 1st year SPR under Graduated rates
                if (age <= 55) {
                  // take gross as net aka TW, TW = OA + AW
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                } else if (age <= 60) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                } else if (age <= 65) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                } else {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                }
              } else if (employees[i].citizenship === "SECOND_PR_GG") {
                // for 2nd year SPR under Graduated rates
                if (age <= 55) {
                  // take gross as net aka TW, TW = OA + AW
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.45 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(900, 0.15 * ordinaryWages) +
                        0.15 * additionalWages
                    );
                  }
                } else if (age <= 60) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.375 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(750, 0.125 * ordinaryWages) +
                        0.125 * additionalWages
                    );
                  }
                } else if (age <= 65) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.225 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(450, 0.075 * ordinaryWages) +
                        0.075 * additionalWages
                    );
                  }
                } else {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                }
              } else if (employees[i].citizenship === "FIRST_PR_FG") {
                // for 1st year SPR under Full and Graduated rates
                if (age <= 55) {
                  // take gross as net aka TW, TW = OA + AW
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                } else if (age <= 60) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                } else if (age <= 65) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                } else if (age <= 70) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                } else {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                }
              } else if (employees[i].citizenship === "SECOND_PR_FG") {
                // for 2nd year SPR under Full and Graduated rates
                if (age <= 55) {
                  // take gross as net aka TW, TW = OA + AW
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.45 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(900, 0.15 * ordinaryWages) +
                        0.15 * additionalWages
                    );
                  }
                } else if (age <= 60) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.375 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(750, 0.125 * ordinaryWages) +
                        0.125 * additionalWages
                    );
                  }
                } else if (age <= 65) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.225 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(450, 0.075 * ordinaryWages) +
                        0.075 * additionalWages
                    );
                  }
                } else if (age <= 70) {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                } else {
                  if (totalWages <= 50) {
                    cpf = 0;
                  } else if (totalWages <= 500) {
                    cpf = 0;
                  } else if (totalWages <= 750) {
                    cpf = Math.floor(0.15 * (totalWages - 500));
                  } else {
                    cpf = Math.floor(
                      Math.min(300, 0.05 * ordinaryWages) +
                        0.05 * additionalWages
                    );
                  }
                }
              }

              // ********************************************************************** //

              // ********************************************************************** //
              // calculate SHG contribution
              let shg = 0;
              if (employees[i].currentPayInformation.selfHelpGroup === "CDAC") {
                if (totalWages <= 2000) {
                  shg = 0.5;
                } else if (totalWages <= 3500) {
                  shg = 1;
                } else if (totalWages <= 5000) {
                  shg = 1.5;
                } else if (totalWages <= 7500) {
                  shg = 2;
                } else {
                  shg = 3;
                }
              } else if (
                employees[i].currentPayInformation.selfHelpGroup === "ECF"
              ) {
                if (totalWages <= 1000) {
                  shg = 2;
                } else if (totalWages <= 1500) {
                  shg = 4;
                } else if (totalWages <= 2500) {
                  shg = 6;
                } else if (totalWages <= 4000) {
                  shg = 9;
                } else if (totalWages <= 7000) {
                  shg = 12;
                } else if (totalWages <= 10000) {
                  shg = 16;
                } else {
                  shg = 20;
                }
              } else if (
                employees[i].currentPayInformation.selfHelpGroup === "MBMF"
              ) {
                if (totalWages <= 1000) {
                  shg = 3;
                } else if (totalWages <= 2000) {
                  shg = 4.5;
                } else if (totalWages <= 3000) {
                  shg = 6.5;
                } else if (totalWages <= 4000) {
                  shg = 15;
                } else if (totalWages <= 6000) {
                  shg = 19.5;
                } else if (totalWages <= 8000) {
                  shg = 22;
                } else if (totalWages <= 10000) {
                  shg = 24;
                } else {
                  shg = 26;
                }
              } else if (
                employees[i].currentPayInformation.selfHelpGroup === "SINDA"
              ) {
                if (totalWages <= 1000) {
                  shg = 1;
                } else if (totalWages <= 1500) {
                  shg = 3;
                } else if (totalWages <= 2500) {
                  shg = 5;
                } else if (totalWages <= 4500) {
                  shg = 7;
                } else if (totalWages <= 7500) {
                  shg = 9;
                } else if (totalWages <= 10000) {
                  shg = 12;
                } else if (totalWages <= 15000) {
                  shg = 18;
                } else {
                  shg = 30;
                }
              }

              const payslip = {
                monthOfPayment: format(subDays(new Date(), 7), "MM"),
                yearOfPayslip: format(subDays(new Date(), 7), "yyyy"),
                dateOfPayment: format(new Date(), "yyyy-MM-dd"),
                grossSalary:
                  basicSalary +
                  otPay +
                  allowanceTotalAmount -
                  deductionTotalAmount -
                  cpf -
                  shg, // calculate as net
                basicSalary: basicSalary,
                allowance: allowanceTotalAmount,
                deduction: deductionTotalAmount,
                dateGenerated: format(new Date(), "yyyy-MM-dd"),
              };
              payslips.push({
                payslip: payslip,
                allowances: allowances,
                deductions: deductions,
                user: {
                  userId: employees[i].userId,
                  firstName: employees[i].firstName,
                  lastName: employees[i].lastName,
                },
                cpf: cpf,
                shg: shg,
                ot: { otPay: otPay, otHours: otHours },
              });
              setTotalAmountEmployees(payslips.length);
              for (let i = 0; i < payslips.length; i++) {
                console.log(
                  "GENERATING FOR USER: " + payslips[i].user.firstName
                );
                // setTempPayslipWrapper(payslips[i], console.log(tempPayslipWrapper));
                // updateInstance();
                // uploadFile(tempPayslipWrapper);
                // const myPromise = new Promise((resolve, reject) => {
                //   setTempPayslipWrapper(payslips[i]);
                // });
                // myPromise.then((response) => console.log("test"));
                if (i === payslips.length - 1) {
                  delay(i, payslips[i], true);
                }
                delay(i, payslips[i], false);
              }
            })
            .catch(() => console.log("User has no shifts for this month"));

          // ********************************************************************** //
        }
      }
    });
  };

  async function delay(i, payslip, isLast) {
    if (!isRunning) {
      setIsRunning(true);
    }
    setTimeout(() => {
      setTempPayslipWrapper(payslip);
      if (isLast) {
      }
      // console.log(tempPayslipWrapper);
    }, 1000 * i);
  }

  useEffect(() => {
    // console.log(tempPayslipWrapper.user.firstName);
    console.log("Payslip Wrapper updated");
    console.log("Uploading file...");
    updateInstance();
  }, [tempPayslipWrapper]);

  useEffect(() => {
    if (!instance.loading && tempPayslipWrapper !== null) {
      if (
        !usersWithPayslipsGenerated.includes(tempPayslipWrapper.user.userId)
      ) {
        setProgressCounter((oldValue) => oldValue + 1);
        console.log("Instance updated");
        console.log("Is instance loading?: " + instance.loading);
        console.log(tempPayslipWrapper);
        uploadFile(tempPayslipWrapper);
        setUsersWithPayslipsGenerated([
          ...usersWithPayslipsGenerated,
          tempPayslipWrapper.user.userId,
        ]);
        console.log(usersWithPayslipsGenerated);
      } else {
        console.log(
          "Already generated for user with ID: " +
            tempPayslipWrapper.user.userId
        );
      }
    }
  }, [instance]);

  const [totalAllowance, setTotalAllowance] = useState(0);

  // function findTotalAllowance(userId, dateString) {
  //   api
  //     .findUserAllowanceByMonth(userId, dateString)
  //     .then((res) => {
  //       if (res.data != null) {
  //         let allowances = res.data;
  //         let total = 0;
  //         for (let i = 0; i < allowances.length; i++) {
  //           console.log("getAmount: " + allowances[i].getAmount);
  //           total += allowances[i].amount;
  //         }
  //         console.log("total: " + total);
  //         return total;
  //       } else {
  //         console.info("No allowances found.");
  //         return 0;
  //       }
  //     })
  //     .catch((error) => {
  //       let message = error.request.response;
  //       console.log(message);
  //       if (message.includes("annot find allowance")) {
  //         console.log("no allowances.");
  //         return 0;
  //       } else {
  //         console.error("unknown error occured in find allowance by month.");
  //         return 0;
  //       }
  //     });
  // }

  // useEffect(() => {
  //   let val = findTotalAllowance(1, "2022-11-11");
  //   console.log("use effect called in overview. val =" + val);
  //   setTotalAllowance(val);
  // });
  function calculateUserMonthlyAllowance(employee, dateString) {
    let allowanceList = employee.currentPayInformation.allowance;
    let subString = dateString.substring(0, 8);
    let sum = 0;
    for (let i = 0; i < allowanceList.length; i++) {
      if (allowanceList[i].date.includes(subString)) {
        sum += allowanceList[i].amount;
      }
    }
    return sum;
  }

  function calculateUserMonthlyDeduction(employee, dateString) {
    let deductionList = employee.currentPayInformation.deduction;
    let subString = dateString.substring(0, 8);
    let sum = 0;
    for (let i = 0; i < deductionList.length; i++) {
      //   console.log("deduction found!");
      //   console.log("deduction date:" + deductionList[i].date);
      //   console.log("substring: " + subString);
      if (deductionList[i].date.includes(subString)) {
        sum += deductionList[i].amount;
      }
    }
    return sum;
  }

  function employeeStatusForMonth(employee, dateString) {
    let payslipList = employee.payslips;
    let subString = dateString.substring(0, 8);
    for (let i = 0; i < payslipList.length; i++) {
      if (payslipList[i].dateOfPayment.includes(subString)) {
        //found payslip for month
        return "PAID";
      }
    }
    return "UNPAID";
  }

  return (
    <div>
      {isRunPayrollDialogOpen && (
        <RunPayRollDialog
          open={isRunPayrollDialogOpen}
          onClose={() => setIsRunPayrollDialogOpen(false)}
          onChangeHandler={onChangeHandler}
          onSubmitHandler={runPayrollHandler}
          isRunning={isRunning}
          showSuccess={showSuccess}
          progressCounter={progressCounter}
          totalAmountEmployees={totalAmountEmployees}
        />
      )}
      {isEditPayInformationFormOpen ? (
        <EditPayInformationForm
          employee={selectedEmployee}
          closeEditPayInformationForm={closeEditPayInformationForm}
        />
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex flex-col">
            <div className="flex justify-between mb-4">
              <h1 className="text-start text-2xl mb-2">Payroll for {date}</h1>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                onClick={() => setIsRunPayrollDialogOpen(true)}
              >
                <Cog8ToothIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Run Payroll
              </button>
            </div>
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Employee Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Basic
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Allowances
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Deductions
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Net Salary*
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        />
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {searchFilteredEmployees.map((employee, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">
                            {employee.firstName} {employee.lastName}
                            <p className="whitespace-nowrap text-left text-sm text-gray-500">
                              {employee.currentPosition &&
                                employee.currentPosition.positionName}
                            </p>
                            <p className="whitespace-nowrap text-left text-sm text-gray-500">
                              {employee.email}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                            {/* $10,310.00 */}$
                            {employee.currentPayInformation.basicSalary
                              ? employee.currentPayInformation.basicSalary.toLocaleString(
                                  "en-US"
                                ) + "/mth"
                              : employee.currentPayInformation.basicHourlyPay.toLocaleString(
                                  "en-US"
                                ) + "/hr"}
                            {/* {employee.gross} */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-green-600">
                            {/* +$0 */}
                            +$
                            {calculateUserMonthlyAllowance(employee, todayStr)}
                            {/* {employee.allowances} */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-red-600">
                            {/* -$100.31 */}
                            -$
                            {calculateUserMonthlyDeduction(employee, todayStr)}
                            {/* {employee.deductions} */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                            {/* $10,209.69 */}$
                            {employee.currentPayInformation.basicSalary
                              ? employee.currentPayInformation.basicSalary +
                                calculateUserMonthlyAllowance(
                                  employee,
                                  todayStr
                                ) -
                                calculateUserMonthlyDeduction(
                                  employee,
                                  todayStr
                                )
                              : employee.currentPayInformation.basicHourlyPay *
                                  243 +
                                calculateUserMonthlyAllowance(
                                  employee,
                                  todayStr
                                ) -
                                calculateUserMonthlyDeduction(
                                  employee,
                                  todayStr
                                )}
                            {/* {employee.net} */}
                          </td>
                          <td
                            colSpan={2}
                            className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500"
                          >
                            <div
                              id="paidStatus"
                              className={classNames(
                                "rounded-xl w-1/2 text-center font-bold",
                                employeeStatusForMonth(employee, todayStr) ===
                                  "PAID" && "bg-green-200 text-green-700",
                                employeeStatusForMonth(employee, todayStr) ===
                                  "PENDING" && "bg-yellow-200 text-yellow-700",
                                employeeStatusForMonth(employee, todayStr) ===
                                  "UNPAID" && "bg-red-200 text-red-700"
                              )}
                            >
                              {/* PAID */}
                              {employeeStatusForMonth(employee, todayStr)}
                              {/* {employee.status} */}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500">
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                openEditPayInformationForm();
                              }}
                            >
                              <PencilIcon
                                className="-ml-1 mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                              Edit
                            </button>
                            <button
                              type="button"
                              className="ml-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                              // disabled
                              onClick={() => {
                                viewPayslipHandler(employee);
                                openPayslip();
                              }}
                            >
                              <DocumentMagnifyingGlassIcon
                                className="-ml-1 mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                              View Payslip
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-500 float-right text-xs mt-4 mb-3 mr-5">
                  *please note that for employees paid hourly, net salary is
                  only an <br />
                  estimate considering a 5 day work week with 8 hours a day.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
