import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play } from "lucide-react";
import bjjLogo from "@/assets/bjj-logo.png";
import videoAsset from "@/assets/video.mp4";
import { supabase } from "@/integrations/supabase/client";

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
    
    try {
      // Save email to Supabase
      const { error } = await supabase
        .from('emails')
        .insert({ email: email.trim() });
        
      if (error) {
        console.error('Error saving email:', error);
        // Continue anyway to not block the user experience
      }
      
      onEmailSubmit(email);
    } catch (error) {
      console.error('Error:', error);
      // Continue anyway to not block the user experience
      onEmailSubmit(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
  {/* Left Content */}
  <div className="space-y-8 text-left">
    {/* Logo Placeholder */}
<div className="flex justify-start">
  {/* Use equal width/height and aspect-square for safety */}
  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center">
    <img 
      src={bjjLogo} 
      alt="BJJ Logo" 
      className="w-full h-full object-cover"
    />
  </div>
</div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                AI-Powered Jiu Jitsu Style Matcher
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl">
           By deeply analysing your personal attributes, JITSMATCHR’s AI reveals optimal jiu jitsu style, pairs you with pros who share your build and game, and accelerates your path to mastering your most effective style.    </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-full px-6 text-base"
                  required
                />
                
               <Button 
  type="submit"
  variant="default"
  size="lg"
  disabled={isSubmitting || !email.trim()}
  className="w-full h-12 text-base rounded-full bg-red-100 hover:bg-red-200 text-red-800"
>
  {isSubmitting ? "Processing..." : "Register email for access"}
</Button>
              </div>
            </form>
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
                        <div className="w-1 h-3 bg-white rounded-full"></div>
                        <div className="w-1 h-3 bg-white/50 rounded-full"></div>
                      </div>
                      <div className="w-6 h-3 border border-white rounded-sm relative">
                        <div className="w-4 h-2 bg-white rounded-sm absolute top-0.5 left-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* Video */}
                  <div className="flex-1 bg-black overflow-hidden">
                    <video 
                      src={videoAsset}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Home Indicator */}
                  <div className="flex justify-center py-3">
                    <div className="w-32 h-1 bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}