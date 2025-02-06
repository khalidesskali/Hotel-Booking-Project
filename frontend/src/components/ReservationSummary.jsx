import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CiCalendar } from "react-icons/ci";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";

const ReservationSummary = ({
  startDate,
  format,
  endDate,
  handleClick,
  loading2,
  calculateDateDifference,
  data,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const loginClick = () => {
    localStorage.setItem("lastPage", window.location.pathname);
    navigate("/login");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
      <h3 className="text-lg font-bold mb-4">Reservation Summary</h3>
      <div
        className="mb-4 border rounded-md p-4"
        style={{ borderColor: "#e7e8e7" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 font-semibold text-sm">
              Check-in
            </span>
            <span className="text-primary font-medium">
              {startDate instanceof Date ? format(startDate, "PPP") : "--"}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 font-semibold text-sm">
              Check-out
            </span>
            <span className="text-primary font-medium">
              {endDate instanceof Date ? format(endDate, "PPP") : "--"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-between">
          <span className="font-semibold text-sm text-gray-500">
            Total length of stay:
          </span>
          <span className="flex items-center gap-4 font-semibold">
            {calculateDateDifference(startDate, endDate)}
            <CiCalendar className="text-[#391ac7] text-base" />
          </span>
        </div>
      </div>
      <div className="flex justify-between text-[#249b6e] font-semibold text-lg mt-4">
        <span>Total Price:</span>
        <span className="font-semibold text-base">
          {startDate && endDate ? `$${data.price.toFixed(2)}` : "--"}
        </span>
      </div>
      {!user ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg">
              Request To Book
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>You have to login first</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be done. You cannot book a room if you are
                not logged in.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={loginClick}>Login</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <button
          className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-lg"
          onClick={handleClick}
        >
          {loading2 ? "Request To Book..." : "Request To Book"}
        </button>
      )}
    </div>
  );
};

export default ReservationSummary;
