import { React, useRef } from "react";
import Navbar from "../../components/Navbar";
import WelfareSidebar from "../../components/Sidebar/Welfare";
import Tab from "../../features/jobrequest/Tab";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUserId, setUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import BenefitPlanList from "../../features/benefit/BenefitPlanList";

export default function Benefits() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [medical, setMedical] = useState([]);
  const [dental, setDental] = useState([]);
  const [life, setLife] = useState([]);
  const [accident, setAccident] = useState([]);
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);

  const tabs = [
    { name: "Benefit Plans", href: "#", current: true },
    {
      name: "Claims",
      href: "/welfare/claims",
      current: false,
    },
  ];
  const plans = [{benefitPlanId:1, planName:'test1', planAmount:'111', startDate:'2022-11-30', endDate:'2022-11-30', planType:'Medical',isActive: true},
  {benefitPlanId:2, planName:'test2', planAmount:'111', startDate:'2022-11-30', endDate:'2022-11-30', planType:'Medical',isActive: true},
  {benefitPlanId:3, planName:'test3', planAmount:'111', startDate:'2022-11-30', endDate:'2022-11-30', planType:'Medical',isActive: false},]

  useEffect(() => {
    api
      .getUser(getUserId())
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => setError(error));
  }, []);
  useEffect(() => {
    api
      .getAllBenefitPlansByType('MEDICAL')
      .then((response) => {
        setMedical(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);
  useEffect(() => {
    api
      .getAllBenefitPlansByType('DENTAL')
      .then((response) => {
        setDental(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);
  useEffect(() => {
    api
      .getAllBenefitPlansByType('LIFE')
      .then((response) => {
        setLife(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);
  useEffect(() => {
    api
      .getAllBenefitPlansByType('ACCIDENT')
      .then((response) => {
        setAccident(response.data);
        console.log(response.data);
      })
      .catch((error) => setError(error));
  }, []);


  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <div className="flex-1">
          <WelfareSidebar currentPage={{
            name: "Benefits",
            href: "/welfare/benefits",
            current: true,
          }} />
        </div>
      </div>
      <div className="py-10">
        <main className="flex-1">
          <div className="sm:flex-auto px-6">
            <Tab tabs={tabs} />
          </div>
          <div className="py-3"></div>
          <BenefitPlanList type = 'Medical' plans = {medical} />
          <div className="py-3"></div>
          <BenefitPlanList type = 'Dental' plans = {dental} />
          <div className="py-3"></div>
          <BenefitPlanList type = 'Life Insurance' plans = {life} />
          <div className="py-3"></div>
          <BenefitPlanList type = 'Accident Insurance' plans = {accident} />
        </main>
      </div>
    </div>
  );
}
