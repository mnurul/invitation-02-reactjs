import { createContext, useState } from "react";

const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [optional, setOptional] = useState("optional");

  return (
    // value -> state yang akan diakses secara global
    // Darkmode akan return semua state dalam value
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode, optional }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const DarkMode = DarkModeContext;
export default DarkModeContextProvider;
