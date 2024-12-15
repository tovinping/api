"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LogoutPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setTimeout(() => {
          router.replace("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div>
      <h1>你已经登出, 1秒后跳转回首页面</h1>
    </div>
  );
};

export default LogoutPage;
