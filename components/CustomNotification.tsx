"use client";
import { Snackbar, Alert } from "@mui/material";

type CustomNotificationProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  variant: "standard" | "outlined" | "filled";
  severity: "success" | "error" | "warning" | "info";
};

const CustomNotification = ({message , variant,severity,open,onClose}:CustomNotificationProps) => {   

    return (           
        <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          variant={variant}
          sx={{ width: "100%" }}
        >
         {message}
        </Alert>
      </Snackbar>
        
    );
}

export default CustomNotification;