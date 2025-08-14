import React, { useState } from "react";
import LandingPage from "@/components/LandingPage";
import BJJRecommender from "@/components/BJJRecommender";

const Index = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
  };

  const handleBack = () => {
    setUserEmail(null);
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
