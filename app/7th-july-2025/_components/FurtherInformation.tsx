"use client";
import React, { useState } from "react";
import { useFormStore } from "@/store/useFormStore";

const roles = ["Investigator", "Sub-investigator", "Study Coordinator", "Abbvie"];
const dietaryOptions = ["Veg", "Non-Veg", "Jain food", "Gluten free"];
const roomPreferences = ["Smoking", "Non-smoking"];

export default function FurtherInformation() {
  const { data, setData } = useFormStore();
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateField = (name: string, value: string) => {
    let error = "";

    if (["institute", "city", "name"].includes(name) && !value.trim()) {
      error = "This field is required.";
    }

    if (name === "arrival" && !value) {
      error = "Arrival date is required.";
    }

    if (name === "departure" && !value) {
      error = "Departure date is required.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ [name]: value });
    validateField(name, value);
  };

  return (
    <div className="w-full max-w-5xl mt-10 mx-auto flex flex-col items-center">
      <div className="w-full bg-white p-4 md:p-8 lg:p-10 rounded-xl shadow mt-4 mb-4">
        <form className="w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Participant Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Institute Name"
              name="institute"
              value={data.institute}
              onChange={handleChange}
              placeholder="Enter institute name"
              error={errors.institute}
            />
            <Input
              label="City"
              name="city"
              value={data.city}
              onChange={handleChange}
              placeholder="Enter city"
              error={errors.city}
            />

            {/* Role */}
            <div className="w-full mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="flex flex-row flex-wrap gap-4">
                {roles.map((role) => (
                  <label
                    key={role}
                    className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm"
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
            </div>

            <Input
              label="Name as per Govt ID"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter name as per Govt ID"
              error={errors.name}
            />
            <Input
              label="Arrival Date"
              name="arrival"
              type="date"
              value={data.arrival}
              onChange={handleChange}
              placeholder="Select arrival date"
              error={errors.arrival}
            />
            <Input
              label="Departure Date"
              name="departure"
              type="date"
              value={data.departure}
              onChange={handleChange}
              placeholder="Select departure date"
              error={errors.departure}
            />
          </div>

          {/* Dietary Preferences */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Preferences
            </label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {dietaryOptions.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm"
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
          </div>

          <Input
            label="Any food allergies? Please specify"
            name="allergy"
            value={data.allergy}
            onChange={handleChange}
            placeholder="Specify any food allergies (optional)"
          />

          {/* Room Preferences */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Preference
            </label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {roomPreferences.map((room) => (
                <label
                  key={room}
                  className="flex items-center gap-2 cursor-pointer text-gray-700 text-sm"
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
          </div>
        </form>
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
  return (
    <div className="w-full mt-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          disabled ? "bg-gray-100 text-gray-500" : ""
        } ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
