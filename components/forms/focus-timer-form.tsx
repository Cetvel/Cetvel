"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import { IoPause, IoPlay, IoReload, IoSquare } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DialogFooter } from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Slider } from "../ui/slider";

const FocusTimerForm = () => {
  const [workMinutes, setWorkMinutes] = useState<number>(30);

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const [startDate, setStartDate] = useState(new Date());

  const [description, setDescription] = useState("");

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) return initTimer();

      tick();
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }, [workMinutes]);

  const initTimer = () => {
    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    isPausedRef.current = true;
    setIsPaused(isPausedRef.current);
  };

  const handlePause = (pause: boolean) => {
    setIsPaused(pause);
    isPausedRef.current = pause;
  };

  const handleSubmit = async () => {
    const data = {
      description,
      start: startDate,
      end: new Date(),
      duration: workMinutes * 60 - secondsLeftRef.current,
    };
  };

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const minutes = Math.floor(secondsLeftRef.current / 60);
  let seconds: number | string = secondsLeftRef.current % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <Tabs defaultValue="focus">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="focus">Odaklanma</TabsTrigger>
        <TabsTrigger value="settings">Ayarlar</TabsTrigger>
      </TabsList>
      <TabsContent value="focus">
        <h2 className="text-5xl font-bold my-10 text-center">
          {minutes}:{seconds}
        </h2>
        <div className="flex flex-col gap-4 mb-6 items-center w-full">
          <p className="text-sm text-secondary-content text-center">
            Lütfen odaklanma süresince odağınızı <br /> çalışmanıza verin!
          </p>
          <Input
            type="text"
            className="shad-input border-card"
            placeholder="Çalışılacak konu"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <DialogFooter className="!justify-center gap-2 m-0">
          {isPaused ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      handlePause(false);
                      setStartDate(new Date());
                    }}
                    size={"icon"}
                  >
                    <IoPlay className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Devam et</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => handlePause(true)} size={"icon"}>
                    <IoPause className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Duraklat</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={initTimer} variant={"outline"} size={"icon"}>
                  <IoReload className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Sayacı sıfırla</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {secondsLeftRef.current < workMinutes * 60 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleSubmit}
                    variant={"destructive"}
                    size={"icon"}
                  >
                    <IoSquare className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Bitir ve Kaydet</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </DialogFooter>
      </TabsContent>

      <TabsContent value="settings">
        <div className="flex flex-col gap-6 mt-6">
          <div className="form-control">
            <p className="mb-2">
              Odaklanma süresi:{" "}
              <span className="font-semibold">{workMinutes} dk</span>
            </p>
            <Slider
              min={15}
              max={60}
              step={5}
              value={[workMinutes]}
              onValueChange={(value) => setWorkMinutes(value[0])}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FocusTimerForm;
