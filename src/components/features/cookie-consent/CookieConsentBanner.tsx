"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TextP } from "@/components/typography/TextP";
import { TextSmall } from "@/components/typography/TextSmall";
import Link from "next/link";

export const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setShowBanner(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-2xl">
            <TextP className="text-gray-800 mb-2">
              We use cookies to enhance your experience on Recipefy. By
              continuing to use our site, you agree to our use of cookies.
            </TextP>
            <TextSmall className="text-gray-600">
              Learn more in our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </TextSmall>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Button
              variant="outline"
              onClick={decline}
              className="w-full sm:w-auto"
            >
              Decline
            </Button>
            <Button
              variant="outline"
              onClick={acceptNecessary}
              className="w-full sm:w-auto"
            >
              Necessary Only
            </Button>
            <Button onClick={acceptAll} className="w-full sm:w-auto">
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
