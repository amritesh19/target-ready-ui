import React, { createContext, useContext, useState } from "react";
import { Alert } from "@mui/material";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [showAlert, setShowAlert] = useState(false);

  const showAlertWithMessage = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  const value = {
    showAlertWithMessage,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {showAlert && (
        <Alert
          onClose={() => {}}
          severity={alertSeverity}
          style={{ position: "fixed", top: "10px", right: "10px" }}
        >
          {alertMessage}
        </Alert>
      )}
    </AlertContext.Provider>
  );
};
