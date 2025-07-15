import { useFormStore } from "@/store/useFormStore";
import type { Data } from "@/store/useFormStore";
import React from "react";

export default function ContactInformation() {
  const { data, setData, validationErrors, showValidationErrors, setValidationErrors } = useFormStore();

  const validateField = (name: keyof Data, value: string) => {
    let error = "";
    if (name === "firstName" && !value.trim()) {
      error = "First name is required.";
    } else if (name === "lastName" && !value.trim()) {
      error = "Last Name is required.";
    } else if (name === "phone" && !value.trim()) {
      error = "Enter a valid Phone number ."
    }
    else if (name === "email" && !value.trim()) {
      error = "Email is required.";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Enter a valid email address.";
    } else if (name === "emergencyContactName" && !value.trim()) {
      error = "Emergency Contact Name name is required.";
    } else if (name === "emergencyContactNumber" && !value.trim()) {
      error = "Enter a valid Phone number ."
    }
    else if (name === "emergencyContactName" && !value.trim()) {
      error = "Emergency Contact Name name is required.";
    } else if (name === "emergencyContactNumber" && !value.trim()) {
      error = "Enter a valid Phone number ."
    } else if (name === "consent" && data.consent == "No") {
      error = "Consent is required.";
    }

    setValidationErrors({ [name]: error });
    return error;
  };

  return (
    <div className="p-6 py-[4rem] w-screen max-w-[45rem] mx-auto rounded-xl space-y-5">
      <h2 className="text-2xl font-semibold text-white">Contact Information</h2>

      <div className="">
        <div className="flex flex-col md:flex-row gap-5 ">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            className="p-0 shadow-none"
            error={showValidationErrors ? validationErrors.firstName : undefined}
            onBlur={validateField}
            data={data}
            setData={setData}
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            error={showValidationErrors ? validationErrors.lastName : undefined}
            onBlur={validateField}
            data={data}
            setData={setData}
          />
        </div>
        <span className="text-white">Same name will be used for Flight & Hotel Check-in.</span>
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email address"
        error={showValidationErrors ? validationErrors.email : undefined}
        onBlur={validateField}
        data={data}
        setData={setData}
      />

      <Input
        label="Mobile"
        name="phone"
        type="number"
        placeholder="Enter your mobile number"
        error={showValidationErrors ? validationErrors.phone : undefined}
        onBlur={validateField}
        data={data}
        setData={setData}
      />
      <Input
        label="Emergency contact name"
        name="emergencyContactName"
        type="text"
        placeholder="Emergency Contact Name..."
        error={showValidationErrors ? validationErrors.emergencyContactName : undefined}
        onBlur={validateField}
        data={data}
        setData={setData}
      />
      <Input
        label="Emergency contact Number"
        name="emergencyContactNumber"
        type="number"
        placeholder="Emergency Contact Number..."
        error={showValidationErrors ? validationErrors.emergencyContactNumber : undefined}
        onBlur={validateField}
        data={data}
        setData={setData}
      />

      <div className="p-4 rounded-xl shadow bg-white">
        <div className="flex items-center gap-2">
          <input
            onBlur={() => validateField("consent", data.consent || "")}
            type="checkbox"
            className="size-6"
            checked={data.consent === "Yes"}
            onChange={(e) => {
              setData({ consent: e.target.checked ? "Yes" : "No" });
            }
            } />
          <p> I consent for AbbVie to process and collect my personal data. <b className="text-red-500">*</b></p>
        </div>
        {/* {showValidationErrors && validationErrors.consent && (
          <span className="text-red-500 text-sm mt-1">{validationErrors.consent}</span>
        )} */}
      </div>


    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  placeholder,
  description,
  error,
  onBlur,
  data,
  setData,
}: {
  label: string;
  name: keyof Data;
  type?: string;
  placeholder?: string;
  error?: string;
  onBlur?: (name: keyof Data, value: string) => void;
  data: Data;
  setData: (data: Partial<Data>) => void;
  description?: string;
  className?: string;
}) {
  const handleBlur = () => {
    onBlur?.(name, data[name] || "");
  };

  return (
    <div className={"w-full bg-white p-4 rounded-xl shadow-sm flex flex-col gap-1"}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={data[name] || ""}
        onChange={(e) => setData({ [name]: e.target.value })}
        onBlur={handleBlur}
        className={`block w-full text-lg px-2 py-2 border-0 border-b-2 bg-transparent focus:ring-0 focus:outline-none transition-colors ${error ? "border-b-red-500" : "border-b-gray-300 focus:border-b-black"
          }`}
      />
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
