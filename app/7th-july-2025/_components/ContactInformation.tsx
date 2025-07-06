import { useFormStore } from "@/store/useFormStore";
import type { Data } from "@/store/useFormStore";
import React, { useState } from "react";

export default function ContactInformation() {
  const { data } = useFormStore();
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});

  const validateField = (name: keyof Data, value: string) => {
    let error = "";
    if (name === "fullName" && !value.trim()) {
      error = "Full name is required.";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Enter a valid email address.";
    } else if (name === "phone" && !/^\d{10}$/.test(value)) {
      error = "Enter a valid 10-digit mobile number.";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className="p-6 w-full min-w-xl mx-auto rounded-xl space-y-5">
      <h2 className="text-2xl font-semibold text-white">Contact Information</h2>

      <Input
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="Enter your full name"
        error={errors.fullName}
        onBlur={validateField}
      />

      <Input
        label="Email ID"
        name="email"
        type="email"
        placeholder="Enter your email"
        error={errors.email}
        onBlur={validateField}
      />

      <Input
        label="Mobile"
        name="phone"
        type="tel"
        placeholder="Enter your mobile number"
        error={errors.phone}
        onBlur={validateField}
      />
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  placeholder,
  error,
  onBlur,
}: {
  label: string;
  name: keyof Data;
  type?: string;
  placeholder?: string;
  error?: string;
  onBlur?: (name: keyof Data, value: string) => void;
}) {
  const { data, setData } = useFormStore();

  const handleBlur = () => {
    onBlur?.(name, data[name] || "");
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm flex flex-col gap-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={data[name] || ""}
        onChange={(e) => setData({ [name]: e.target.value })}
        onBlur={handleBlur}
        className={`block w-full text-lg px-4 py-2 border rounded-lg focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        } focus:outline-none bg-white`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
