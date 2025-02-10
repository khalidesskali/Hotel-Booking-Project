import React from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
    today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison
    return date < today;
  };

  const minDate = new Date(startDate);
  minDate.setDate(minDate.getDate() + 1);

  return (
    <div className="lg:col-span-3  rounded-lg">
      <h3 className="text-lg font-bold mb-4">Enter your details</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter your first name"
            value={userData.fullName}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number *
          </label>
          <input
            type="number"
            className={`w-full border rounded-lg px-3 py-2 ${
              error.phone ? "border-red-600" : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error.phone && (
            <p className="text-red-600 text-sm mr-2 mt-1">
              This field must be filled
            </p>
          )}
        </div>
        <div className="md:col-start-1 md:col-end-3">
          <label className="block text-sm font-medium mb-1">
            Email Address *
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter your email address"
            value={userData.email}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">From *</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground",
                  error.checkIn ? "border-red-600" : "border-input"
                )}
              >
                <CalendarIcon className={error.checkIn ? "text-red-600" : ""} />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span className={error.checkIn ? "text-red-600" : ""}>
                    Pick a date
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
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
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Until *</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground",
                  error.checkOut ? "border-red-600" : "border-input"
                )}
              >
                <CalendarIcon
                  className={error.checkOut ? "text-red-600" : ""}
                />
                {endDate ? (
                  format(endDate, "PPP")
                ) : (
                  <span className={error.checkOut ? "text-red-600" : ""}>
                    Pick a date
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={isDateDisabled}
                fromDate={minDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </form>
    </div>
  );
};

export default ReservationDetails;
