"use client";

import { NotificationType } from "@/app/api/lib/types";
import CustomNotification from "@/components/CustomNotification";
import { createContext, ReactNode, useContext, useState } from "react";

type NotificationContextType = {
  message: string;
  variant: "standard" | "outlined" | "filled";
  severity: "success" | "error" | "warning" | "info";
  setNotificationData: (data: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType>({
    message: "",
    variant: "outlined",
    severity: "success",
  });

  const setNotificationData = (data: NotificationType) => {
    setNotification(data);
  };

  return (
    <NotificationContext.Provider
      value={{ ...notification, setNotificationData }}
    >
      <CustomNotification {...notification} />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useLoading must be used within a NotificationProvider");
  }
  return context;
};
