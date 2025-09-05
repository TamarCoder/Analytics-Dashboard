"use client"
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const Realtime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null); // null-ით დაიწყე
  const [mounted, setMounted] = useState(false);

  // პირველი useEffect - mounted-ის დასაყენებლად
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
  }, []);

 
  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted || !currentTime) {
    return (
      <div className="flex items-center space-x-2 text-white">
        <Clock className="h-4 w-4 text-blue-400" />
        <div className="flex flex-col">
          <span className="text-sm font-mono font-semibold">
            --:--:--
          </span>
          <span className="text-xs text-gray-400 hidden sm:block">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ka-GE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ka-GE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center space-x-2 text-white">
      <Clock className="h-4 w-4 text-blue-400" />
      <div className="flex flex-col">
        <span className="text-sm font-mono font-semibold">
          {formatTime(currentTime)}
        </span>
        <span className="text-xs text-gray-400 hidden sm:block">
          {formatDate(currentTime)}
        </span>
      </div>
    </div>
  );
};

export default Realtime;