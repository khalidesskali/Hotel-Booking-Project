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
import { FaHotel } from "react-icons/fa";
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
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <FaHotel className="text-primary text-2xl" />
        <h3 className="text-xl font-bold text-gray-800">Reservation Summary</h3>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 font-medium text-sm">Check-in</span>
            <span className="text-primary font-semibold">
              {startDate instanceof Date ? format(startDate, "PPP") : "--"}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 font-medium text-sm">Check-out</span>
            <span className="text-primary font-semibold">
              {endDate instanceof Date ? format(endDate, "PPP") : "--"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
          <span className="font-medium text-gray-700">Length of stay</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary">
              {calculateDateDifference(startDate, endDate)} days
            </span>
            <CiCalendar className="text-primary text-xl" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10 mb-6">
        <span className="font-semibold text-primary">Total Price</span>
        <span className="font-bold text-primary text-xl">
          {startDate && endDate ? `$${data.price.toFixed(2)}` : "--"}
        </span>
      </div>

      {!user ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold
              hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg
              flex items-center justify-center gap-2"
            >
              <FaHotel className="text-lg" />
              Request To Book
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-gray-800">
                Login Required
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Please log in to your account to proceed with the booking.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={loginClick}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Login Now
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <button
          className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold
            hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg
            flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleClick}
          disabled={loading2}
        >
          {loading2 ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FaHotel className="text-lg" />
              Request To Book
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ReservationSummary;
