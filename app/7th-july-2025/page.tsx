"use client";
import React from "react";
import HexagonBackground from "./HexagonBackground";
import NavigationButton from "./_components/NavigationButton";
import ContactInformation from "./_components/ContactInformation";
import ConfirmParticipation from "./_components/ConfirmParticipation";
import FurtherInformation from "./_components/FurtherInformation";
import Thankyou from "./_components/Thankyou";
import { PAGES, useFormStore } from "@/store/useFormStore";

function page() {
  const { currentStep, loading } = useFormStore();
  const CurrentPage = PAGES[currentStep];
  if (loading) {
    return (
      <HexagonBackground>
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Loading...
          </h1>
        </div>
      </HexagonBackground>
    );
  }
  return (
    <HexagonBackground>
      <img
        src="/logo.png"
        alt="Logo"
        className="absolute top-2 left-2 w-32 h-auto sm:top-6 sm:left-6 sm:w-44 md:w-52 lg:w-40 filter invert brightness-0 z-20"
      />
      <img
        src="/logo-2.png"
        alt="Logo 2"
        className="absolute top-2 right-2 w-32 h-auto sm:top-6 sm:right-6 sm:w-44 md:w-52 lg:w-40 z-20"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[40vh] p-4 ">
        <CurrentPage />
        {currentStep !== 2 && currentStep !== PAGES.length - 1 && (
          <NavigationButton />
        )}
      </div>
    </HexagonBackground>
  );
}

export default page;
