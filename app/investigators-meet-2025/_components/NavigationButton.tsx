import { PAGES, useFormStore } from "@/store/useFormStore";
import React from "react";

function NavigationButton() {
  const { currentStep, setCurrentStep } = useFormStore();
  
  return (
    <div className="flex flex-row justify-between w-full mt-5 p-4">
      <button
        onClick={() => setCurrentStep(currentStep - 1)}
        disabled={currentStep === 0}
        className="cursor-pointer bg-white text-gray-800 px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Back
      </button>
      <button
        onClick={() => setCurrentStep(currentStep + 1)}
        disabled={currentStep === PAGES.length - 1}
        className="bg-black text-white cursor-pointer hover:bg-gray-800 px-6 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default NavigationButton;
