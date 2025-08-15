import React, { useState, useEffect } from "react";
import LandingPage from "@/components/LandingPage";
import BJJRecommender from "@/components/BJJRecommender";

const Index = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const handleBack = () => {
    setUserEmail(null);
    localStorage.removeItem('userEmail');
  };

  return (
    <>
      {!userEmail ? (
        <LandingPage onEmailSubmit={handleEmailSubmit} />
      ) : (
        <BJJRecommender userEmail={userEmail} onBack={handleBack} />
      )}
    </>
  );
};

export default Index;
