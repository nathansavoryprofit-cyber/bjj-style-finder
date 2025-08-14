import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play } from "lucide-react";
import bjjLogo from "@/assets/bjj-logo.png";

interface LandingPageProps {
  onEmailSubmit: (email: string) => void;
}

export default function LandingPage({ onEmailSubmit }: LandingPageProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onEmailSubmit(email);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hero-bg via-hero-bg to-primary-glow">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-hero-text/10 backdrop-blur-sm p-3 border border-hero-text/20">
                <img 
                  src={bjjLogo} 
                  alt="BJJ Style Recommender Logo" 
                  className="w-full h-full object-contain filter invert"
                />
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hero-text leading-tight">
                AI-powered Jiu Jitsu Style{" "}
                <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                  Recommender
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-hero-text/80 max-w-2xl mx-auto lg:mx-0">
                Use Jitsmatchr to gain insights about your most suitable jiu jitsu 
                playing style while matching your style to pros for easy learning.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto lg:mx-0">
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-hero-text/10 border-hero-text/20 text-hero-text placeholder:text-hero-text/60 backdrop-blur-sm rounded-full px-6"
                  required
                />
                
                <Button 
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full h-12 text-base"
                >
                  {isSubmitting ? "Processing..." : "Register email for software access"}
                </Button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-hero-text/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Pro Player Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Personalized Training</span>
              </div>
            </div>
          </div>

          {/* Right Content - Mobile Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-72 h-[600px] bg-gray-800 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-2 bg-black text-white text-sm">
                    <span>6:41</span>
                    <div className="flex gap-1">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                        <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                        <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                      </div>
                      <div className="w-6 h-3 border border-white rounded-sm">
                        <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* Video Placeholder */}
                  <div className="flex-1 bg-gradient-to-br from-hero-bg to-primary flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-hero-text/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-hero-text ml-1" />
                      </div>
                      <div className="text-hero-text/80 text-sm px-8">
                        <p className="font-medium">BJJ Style Analysis</p>
                        <p className="text-xs mt-1">See how AI matches your style</p>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="flex justify-center py-3">
                    <div className="w-32 h-1 bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-glow rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-glow/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}