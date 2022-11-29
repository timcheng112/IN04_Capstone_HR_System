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

export default function CurrentPerformancePeriod() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <PerformanceSidebar
            currentPage={{
              name: "Current",
              href: "/myperformance",
              current: true,
            }}
          />
        </div>
      </div>
      <div>
        <main>
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold font-sans text-indigo-800 mt-10">
              Current Performance Period
            </h1>
            <h1 className="text-2xl font-bold font-sans text-indigo-800 mb-10">
              {new Date().getFullYear()}
            </h1>
            <div>
              <Timeline>
                <TimelineItem>
                  <TimelineOppositeContent>
                    1 January - 31 January
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
                      <h2>0 Financial Goal(s)</h2>
                      <h2>0 Business Goal(s)</h2>
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
                    1 February - 30 November
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className="px-5">
                      <h1 className="text-xl font-semibold font-sans">
                        Add Achievements
                      </h1>
                      <h2>0 achievement(s)</h2>
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
                    1 December - 15 December
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
                      <h2>0 review(s)</h2>
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
                    16 December - 31 December
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
                      <h2>0 appraisal(s)</h2>
                    </div>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent>
                    16 December - 31 December
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
                      <h2>0 promotion request(s)</h2>
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
