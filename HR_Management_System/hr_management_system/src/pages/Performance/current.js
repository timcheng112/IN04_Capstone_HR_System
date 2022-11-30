import Navbar from "../../components/Navbar";
import PerformanceSidebar from "../../components/Sidebar/Performance";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import Flag from "@mui/icons-material/Flag";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { getUserId } from "../../utils/Common";

export default function CurrentPerformancePeriod() {
  const [goal, setGoal] = useState(null);
  const [financial, setFinancial] = useState([]);
  const [business, setBusiness] = useState([]);
  const [achievements, setAchievements] = useState(0);
  const [appraisal, setAppraisal] = useState(null);
  const [reviews, setReviews] = useState(0);
  const [appraisals, setAppraisals] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const [review, setReview] = useState(null);

  useEffect(() => {
    const year = new Date().getFullYear();

    api.getGoalPeriodByYear(year).then((response) => {
      console.log(response.data);
      setGoal(response.data);
    });

    var aCount = 0;
    api.getUserGoals(year, "financial", getUserId()).then((response) => {
      console.log(response.data);
      setFinancial(response.data);
      response.data.forEach((element) => {
        console.log(element.achievements.length);
        aCount += element.achievements.length;
      });
      setAchievements(aCount);
    });

    api.getUserGoals(year, "business", getUserId()).then((response) => {
      console.log(response.data);
      setBusiness(response.data);
      response.data.forEach((element) => {
        console.log(element.achievements.length);
        aCount += element.achievements.length;
      });
      setAchievements(aCount);
    });

    api.getAppraisalPeriodByYear(year).then((response) => {
      console.log(response.data);
      setAppraisal(response.data);
    });

    api.getReviewPeriodByYear(year).then((response) => {
      console.log(response.data);
      setReview(response.data);
    });

    api.getEmployeeReviewsByYear(year, getUserId()).then((response) => {
      setReviews(response.data);
    });

    api.getEmployeeAppraisals(year, getUserId()).then((response) => {
      setAppraisals(response.data);
    });

    api.getPromotionRequestByEmployee(getUserId()).then(response => {
      console.log(response.data);
      setPromotions(response.data);
    })
  }, []);
  return (
    <div className="bg-white p-5 mx-20 mb-10 rounded border">
      <div>
        <main>
          <div className="sm:flex-auto">
            
            <h1 className="text-2xl font-bold font-sans text-indigo-800 mb-10">
              {new Date().getFullYear()}
            </h1>
            <div>
              <Timeline>
                <TimelineItem>
                  <TimelineOppositeContent>
                    {goal ? (
                      <>
                        <div>
                          <Moment
                            parse="YYYY-MM-DD"
                            className=" text-sm text-gray-900"
                            locale="Asia/Singapore"
                            format="DD/MM/YYYY"
                          >
                            {goal.startDate}
                          </Moment>
                        </div>
                        {" to "}
                        <div>
                          <Moment
                            parse="YYYY-MM-DD"
                            className=" text-sm text-gray-900"
                            locale="Asia/Singapore"
                            format="DD/MM/YYYY"
                          >
                            {goal.endDate} {" - "}
                          </Moment>
                        </div>
                      </>
                    ) : (
                      <>Goal Period has not been created</>
                    )}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <Flag />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className="px-5">
                      <h1 className="text-xl font-semibold font-sans">
                        Goal-setting Period
                      </h1>
                      <h2>{financial.length} Financial Goal(s)</h2>
                      <h2>{business.length} Business Goal(s)</h2>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}></TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  {/* <TimelineOppositeContent>
                    1 February - 30 November
                  </TimelineOppositeContent> */}
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className="px-5">
                      <h1 className="text-xl font-semibold font-sans">
                        Add Achievements
                      </h1>
                      <h2>{achievements} achievement(s)</h2>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}></TimelineContent>
                </TimelineItem>

                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineItem>
                  <TimelineOppositeContent>
                    {review ? (
                      <>
                        <div>
                          <Moment
                            parse="YYYY-MM-DD"
                            className=" text-sm text-gray-900"
                            locale="Asia/Singapore"
                            format="DD/MM/YYYY"
                          >
                            {review.startDate}
                          </Moment>
                        </div>
                        {" to "}
                        <div>
                          <Moment
                            parse="YYYY-MM-DD"
                            className=" text-sm text-gray-900"
                            locale="Asia/Singapore"
                            format="DD/MM/YYYY"
                          >
                            {review.endDate} {" - "}
                          </Moment>
                        </div>
                      </>
                    ) : (
                      <>Review Period has not been created</>
                    )}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <HowToRegIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className="px-5">
                      <h1 className="text-xl font-semibold font-sans">
                        Review Period
                      </h1>
                      <h2>{reviews.length} review(s)</h2>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}></TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent>
                    {appraisal ? (
                      <>
                        <div>
                          <Moment
                            parse="YYYY-MM-DD"
                            className=" text-sm text-gray-900"
                            locale="Asia/Singapore"
                            format="DD/MM/YYYY"
                          >
                            {appraisal.startDate}
                          </Moment>
                        </div>
                        {" to "}
                        <div>
                          <Moment
                            parse="YYYY-MM-DD"
                            className=" text-sm text-gray-900"
                            locale="Asia/Singapore"
                            format="DD/MM/YYYY"
                          >
                            {appraisal.endDate} {" - "}
                          </Moment>
                        </div>
                      </>
                    ) : (
                      <>Appraisal Period has not been created</>
                    )}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <SupervisorAccountIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className="px-5">
                      <h1 className="text-xl font-semibold font-sans">
                        Appraisal Period
                      </h1>
                      <h2>{appraisals.length} appraisal(s)</h2>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent>
                    {/* 16 December - 31 December */}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <SupervisorAccountIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className="px-5">
                      <h1 className="text-xl font-semibold font-sans">
                        Promotion Period
                      </h1>
                      <h2>{promotions.length} promotion request(s)</h2>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
