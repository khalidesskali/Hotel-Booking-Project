import React from "react";

const RoomCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative">
        <div className="w-full h-64 bg-gray-200 animate-pulse" />
      </div>
      <div className="p-6 space-y-4">
        <div className="h-7 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
