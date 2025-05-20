"use client";

import styles from "./style";
import { ArrowUpRight } from "lucide-react";

const bgGreenGradient = "bg-gradient-to-br from-[#F2F2F2] via-[#52F2B8] to-[#37A686]";
const solidTextColor = "text-[#2C403A]";

const GetStarted = () => (
  <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full ${bgGreenGradient} p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter} flex-col bg-primary w-full h-full rounded-full`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className={`font-poppins font-medium text-[18px] leading-[23.4px] ${solidTextColor}`}>
          Get
        </p>
        <ArrowUpRight className="w-[23px] h-[23px] text-[#040240]" />
      </div>
      <p className={`font-poppins font-medium text-[18px] leading-[23.4px] ${solidTextColor}`}>
        Started
      </p>
    </div>
  </div>
);

export default GetStarted;
