import React from "react";
import { CalendarIcon, User, Phone, Mail } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ReservationDetails = ({
  userData,
  error,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  phone,
  setPhone,
  format,
}) => {
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const minDate = new Date(startDate);
  minDate.setDate(minDate.getDate() + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-3 rounded-xl bg-white p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <User className="text-primary h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Enter your details</h3>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pl-10 
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                transition-all duration-200 bg-gray-50"
              placeholder="Enter your first name"
              value={userData.fullName}
              readOnly
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <div className="relative">
            <input
              type="number"
              className={cn(
                "w-full border rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-2",
                "transition-all duration-200",
                error.phone
                  ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-200 focus:ring-primary/20 focus:border-primary"
              )}
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          {error.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span className="text-red-500">•</span>
              This field must be filled
            </p>
          )}
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <div className="relative">
            <input
              type="email"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pl-10 
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                transition-all duration-200 bg-gray-50"
              placeholder="Enter your email address"
              value={userData.email}
              readOnly
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Check-in Date *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-11 px-4",
                  "border-gray-200 hover:bg-gray-50 transition-all duration-200",
                  !startDate && "text-gray-500",
                  error.checkIn
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "focus:ring-2 focus:ring-primary/20 focus:border-primary"
                )}
              >
                <CalendarIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    error.checkIn ? "text-red-500" : "text-gray-500"
                  )}
                />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span
                    className={error.checkIn ? "text-red-500" : "text-gray-500"}
                  >
                    Pick a date
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-lg border border-gray-100 rounded-xl">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setEndDate("");
                }}
                initialFocus
                disabled={isDateDisabled}
                fromDate={new Date()}
                className="rounded-xl"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Check-out Date *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-11 px-4",
                  "border-gray-200 hover:bg-gray-50 transition-all duration-200",
                  !endDate && "text-gray-500",
                  error.checkOut
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "focus:ring-2 focus:ring-primary/20 focus:border-primary"
                )}
              >
                <CalendarIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    error.checkOut ? "text-red-500" : "text-gray-500"
                  )}
                />
                {endDate ? (
                  format(endDate, "PPP")
                ) : (
                  <span
                    className={
                      error.checkOut ? "text-red-500" : "text-gray-500"
                    }
                  >
                    Pick a date
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-lg border border-gray-100 rounded-xl">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={isDateDisabled}
                fromDate={minDate}
                className="rounded-xl"
              />
            </PopoverContent>
          </Popover>
        </div>
      </form>
    </motion.div>
  );
};

export default ReservationDetails;
