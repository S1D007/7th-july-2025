"use client"
import React from 'react';
import { useFormStore } from "@/store/useFormStore";

interface ConfirmParticipationProps {
  onConfirm?: (confirmed: boolean) => void;
}

const ConfirmParticipation: React.FC<ConfirmParticipationProps> = ({ onConfirm }) => {
  const { isParticipating, setIsParticipating } = useFormStore();

  const handleSelect = (value: boolean) => {
    setIsParticipating(value);
    if (onConfirm) {
      onConfirm(value);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Will you be participating?</h2>
      <div className="flex gap-6">
        <button
          className={`px-6 py-2 rounded-lg border-2 transition-colors duration-150 ${isParticipating === true ? 'bg-green-500 text-white border-green-600' : 'bg-white text-green-700 border-green-500 hover:bg-green-50'}`}
          onClick={() => handleSelect(true)}
        >
          Yes
        </button>
        <button
          className={`px-6 py-2 rounded-lg border-2 transition-colors duration-150 ${isParticipating === false ? 'bg-red-500 text-white border-red-600' : 'bg-white text-red-700 border-red-500 hover:bg-red-50'}`}
          onClick={() => handleSelect(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmParticipation;
