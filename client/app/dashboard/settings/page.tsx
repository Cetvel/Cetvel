"use client";

import { UserProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import React from "react";
import { dark } from "@clerk/themes";

const AccountSettings = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <UserProfile
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
        routing="virtual"
      />
    </>
  );
};

export default AccountSettings;
