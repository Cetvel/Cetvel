"use client";

import { UserProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import React from "react";
import { dark } from "@clerk/themes";
import { TabsContent } from "@/components/ui/tabs";

const AccountSettings = () => {
  const { resolvedTheme } = useTheme();

  return (
    <TabsContent value="account">
      <UserProfile
        appearance={{
          baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
        routing="virtual"
      />
    </TabsContent>
  );
};

export default AccountSettings;
