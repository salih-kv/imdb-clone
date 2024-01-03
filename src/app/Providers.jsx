"use client";

import { ThemeProvider } from "next-themes";

export const Providers = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute={"class"}>
      <div className="transition-colors duration-300 min-h-screen select-none">
        {children}
      </div>
    </ThemeProvider>
  );
};
