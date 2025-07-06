"use client";
import React from "react";
import { useFormStore } from "@/store/useFormStore";

const roles = ["Investigator", "Sub-investigator", "Study Coordinator", "Abbvie"];
const dietaryOptions = ["Veg", "Non-Veg", "Jain food", "Gluten free"];
const roomPreferences = ["Smoking", "Non-smoking"];

export default function FurtherInformation() {
  const { data, setData, validationErrors, showValidationErrors } = useFormStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ [name]: value });
  };

  return (
    <div className="pt-[2.5rem] px-4 w-screen max-w-[50rem] mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Participant Information
      </h2>

      <div className="w-full flex flex-col gap-4 md:gap-6">
        <Input
          label="Institute Name"
          name="institute"
          value={data.institute}
          onChange={handleChange}
          placeholder="Enter institute name"
          error={showValidationErrors ? validationErrors.institute : undefined}
        />
        
        <Input
          label="City"
          name="city"
          value={data.city}
          onChange={handleChange}
          placeholder="Enter city"
          error={showValidationErrors ? validationErrors.city : undefined}
        />

        {/* Role */}
        <div className="w-full bg-white p-4 rounded-xl shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {roles.map((role) => (
              <label
                key={role}
                className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={data.role === role}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span>{role}</span>
              </label>
            ))}
          </div>
          {showValidationErrors && validationErrors.role && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.role}</p>
          )}
        </div>

        <Input
          label="Name as per Govt ID"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Enter name as per Govt ID"
          error={showValidationErrors ? validationErrors.name : undefined}
        />
        
        <Input
          label="Arrival Date"
          name="arrival"
          type="date"
          value={data.arrival}
          onChange={handleChange}
          placeholder="Select arrival date"
          error={showValidationErrors ? validationErrors.arrival : undefined}
        />
        
        <Input
          label="Departure Date"
          name="departure"
          type="date"
          value={data.departure}
          onChange={handleChange}
          placeholder="Select departure date"
          error={showValidationErrors ? validationErrors.departure : undefined}
        />

        {/* Dietary Preferences */}
        <div className="w-full bg-white p-4 rounded-xl shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Preferences <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {dietaryOptions.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="radio"
                  name="dietary"
                  value={opt}
                  checked={data.dietary === opt}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          {showValidationErrors && validationErrors.dietary && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.dietary}</p>
          )}
        </div>

        <Input
          label="Any food allergies? Please specify"
          name="allergy"
          value={data.allergy}
          onChange={handleChange}
          placeholder="Specify any food allergies (optional)"
        />

        {/* Room Preferences */}
        <div className="w-full bg-white p-4 rounded-xl shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room Preference <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {roomPreferences.map((room) => (
              <label
                key={room}
                className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="radio"
                  name="room"
                  value={room}
                  checked={data.room === room}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span>{room}</span>
              </label>
            ))}
          </div>
          {showValidationErrors && validationErrors.room && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.room}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Input Component with error display
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder = "",
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}) {
  const isRequired = ["institute", "name", "arrival", "departure"].includes(name);
  
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm flex flex-col gap-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-2 py-3 border-0 border-b-2 bg-transparent focus:ring-0 focus:outline-none transition-colors ${
          disabled ? "bg-gray-100 text-gray-500" : ""
        } ${error ? "border-b-red-500" : "border-b-gray-300 focus:border-b-black"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
