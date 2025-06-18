// src/context/ToastContext.js
import { createContext, useContext } from "react";
import { toast } from "react-hot-toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);
  const showInfo = (message) => toast(message); 

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
