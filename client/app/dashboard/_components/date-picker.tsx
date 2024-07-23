"use client";

import React from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const DatePicker = () => {
  return (
    <Calendar
      className={"!w-full z-20 lg:col-span-2 shadow-sm"}
      locale="tr-TR"
      minDetail="year"
      prevLabel={<IoChevronBackOutline />}
      prev2Label={<FiChevronsLeft />}
      nextLabel={<IoChevronForwardOutline />}
      next2Label={<FiChevronsRight />}
    />
  );
};

export default DatePicker;
