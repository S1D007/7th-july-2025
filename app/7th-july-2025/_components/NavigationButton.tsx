import { PAGES, useFormStore } from "@/store/useFormStore";
import React from "react";

type NavigationButtonProps = {};

function NavigationButton({}: NavigationButtonProps) {
  const { currentStep, setCurrentStep, loading } = useFormStore();
  return (
    <div className="flex flex-row justify-between w-full mt-5 p-4">
      <button
        onClick={() => setCurrentStep(currentStep - 1)}
        disabled={currentStep === 0}
        className="cursor-pointer bg-white text-gray-800 px-6 py-2 rounded-xl"
      >
        Back
      </button>
      <button
        onClick={() => setCurrentStep(currentStep + 1)}
        disabled={currentStep === PAGES.length} // Assuming 3 is the last step
        className="cursor-pointer bg-black text-white px-6 py-2 rounded-xl"
      >
        Next
      </button>
    </div>
  );
}

export default NavigationButton;
