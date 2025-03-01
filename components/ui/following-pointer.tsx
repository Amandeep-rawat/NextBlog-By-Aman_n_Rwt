"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const FollowerPointerCard = ({
  children,
  className,
  
}: {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
}) => {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
};
