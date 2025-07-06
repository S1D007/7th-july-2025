import { useFormStore } from "@/store/useFormStore";
import React from "react";

const Thankyou: React.FC = () => {
  const { data, isParticipating } = useFormStore();
  console.log("Thankyou data:", data);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Thank You!
      </h1>
      <p className="text-xl md:text-2xl mb-6 text-amber-50">
        Your response has been recorded.
      </p>
      {isParticipating && (
        <div className="my-6 flex flex-col items-center">
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
            }
            className="w-72 h-72 bg-white rounded-2xl"
          />
          <p className="mt-2 text-sm text-gray-100">
            Scan this QR code at the event for entry
          </p>
        </div>
      )}
    </div>
  );
};

export default Thankyou;
