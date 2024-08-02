"use client";

import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/tr";

import { useModal } from "@/providers/modal-provider";
import TaskModal from "@/components/modals/task-modal";
import { Button } from "@/components/ui/button";
import AddTask from "@/components/global/add-task";
import { VIEW_OPTIONS } from "@/constants";

const DndCalendar = Calendar;

moment.locale("tr");
const localiser = momentLocalizer(moment);

type Keys = keyof typeof Views;

const Scheduler = ({ tags, events }: { tags: any; events: any }) => {
  const { setOpen } = useModal();

  const handleSelectEvent = (event: any) => {
    setOpen(<TaskModal task={event} />);
  };

  const [date, setDate] = useState<Date>(moment().toDate());
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).subtract(1, "d").toDate());
    } else if (view === Views.WEEK) {
      setDate(moment(date).subtract(1, "w").toDate());
    } else {
      setDate(moment(date).subtract(1, "M").toDate());
    }
  }, [view, date]);

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).add(1, "d").toDate());
    } else if (view === Views.WEEK) {
      setDate(moment(date).add(1, "w").toDate());
    } else {
      setDate(moment(date).add(1, "M").toDate());
    }
  }, [view, date]);

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format("dddd, MMMM DD");
    if (view === Views.WEEK) {
      const from = moment(date)?.startOf("week");
      const to = moment(date)?.endOf("week");
      return `${from.format("MMMM DD")} - ${to.format("MMMM DD")}`;
    }
    if (view === Views.MONTH) {
      return moment(date).format("MMMM YYYY");
    }
  }, [view, date]);

  const onTodayClick = useCallback(() => {
    setDate(moment().toDate());
  }, []);

  return (
    <>
      <div className="container bg-card p-4 rounded-xl border-card">
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 w-full pb-6 items-center justify-between relative">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onTodayClick} size={"sm"}>
              Bugün
            </Button>
            <AddTask />
          </div>
          <div className="flex gap-4 items-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <Button variant={"outline"} size={"icon-sm"} onClick={onPrevClick}>
              <IoChevronBackOutline size={16} />
            </Button>
            <span className="text-2xl font-bold text-accent-content">
              {dateText}
            </span>
            <Button variant={"outline"} size="icon-sm" onClick={onNextClick}>
              <IoChevronForwardOutline size={16} />
            </Button>
          </div>
          <div className="flex gap-2">
            {VIEW_OPTIONS.map(({ id, label }) => (
              <Button
                key={id}
                className="join-item"
                variant={view === id ? "secondary" : "outline"}
                onClick={() => setView(id)}
              >
                {label == "Day" ? "Gün" : label == "Week" ? "Hafta" : "Ay"}
              </Button>
            ))}
          </div>
        </div>
        <DndCalendar
          localizer={localiser}
          culture="tr"
          events={events}
          toolbar={false}
          date={date}
          onSelectEvent={handleSelectEvent}
          view={view}
          onView={(view: any) => setView(view)}
          onNavigate={(date: any) => setDate(date)}
        />
      </div>
    </>
  );
};

export default Scheduler;
