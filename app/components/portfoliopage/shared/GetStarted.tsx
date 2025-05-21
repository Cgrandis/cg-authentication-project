"use client";

import styles from "../styles/style";
import { ArrowUpRight } from "lucide-react";

const solidTextColor = "text-[#2C403A]";

const GetStarted = () => (
  <div className={`${styles.flexCenter} w-[120px] h-[120px] rounded-full ${styles.gradients.green} p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter} flex-col bg-primary w-full h-full rounded-full`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className={`font-poppins font-medium text-[18px] leading-[23.4px] ${solidTextColor}`}>
          Get
        </p>
        <ArrowUpRight className="w-[20px] h-[20px] text-[#040240]" />
      </div>
      <p className={`font-poppins font-medium text-[18px] leading-[23.4px] ${solidTextColor}`}>
        Started
      </p>
    </div>
  </div>
);

export default GetStarted;
