import { useTheme } from "next-themes";
import React from "react";

const useThemeColors = () => {
  const { theme, systemTheme } = useTheme();

  return {
    primary: "#6366f1",
    "base-content":
      theme === "system"
        ? systemTheme === "dark"
          ? "#FAF9FA"
          : "#010102"
        : theme === "dark"
        ? "#FAF9FA"
        : "#010102",
    secondary:
      theme === "system"
        ? systemTheme === "dark"
          ? "#374151"
          : "#f3f4f6"
        : theme === "dark"
        ? "#374151"
        : "#f3f4f6",
    border:
      theme === "system"
        ? systemTheme === "dark"
          ? "#3E4756"
          : "#e2e8f0"
        : theme === "dark"
        ? "#3E4756"
        : "#e2e8f0",
    accent:
      theme === "system"
        ? systemTheme === "dark"
          ? "#313844"
          : "#ffffff"
        : theme === "dark"
        ? "#313844"
        : "#ffffff",
    "secondary-content":
      theme === "system"
        ? systemTheme === "dark"
          ? "#919EAB"
          : "#64748B"
        : theme === "dark"
        ? "#919EAB"
        : "#64748B",
  };
};

export default useThemeColors;
