import { useState } from "react";
import PasswordGate from "@/components/PasswordGate";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [password, setPassword] = useState<string | null>(
    sessionStorage.getItem("dash_pw")
  );

  const handleAuth = (pw: string) => {
    sessionStorage.setItem("dash_pw", pw);
    setPassword(pw);
  };

  if (!password) {
    return <PasswordGate onAuthenticated={handleAuth} />;
  }

  return <Dashboard password={password} />;
};

export default Index;
