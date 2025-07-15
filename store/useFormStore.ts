import ConfirmParticipation from "@/app/7th-july-2025/_components/ConfirmParticipation";
import ContactInformation from "@/app/7th-july-2025/_components/ContactInformation";
import Content from "@/app/7th-july-2025/_components/Content";
import FurtherInformation from "@/app/7th-july-2025/_components/FurtherInformation";
import NavigationButton from "@/app/7th-july-2025/_components/NavigationButton";
import Thankyou from "@/app/7th-july-2025/_components/Thankyou";
import { create } from "zustand";
import axios from "axios";

export const PAGES = [
  Content,
  ContactInformation,
  ConfirmParticipation,
  FurtherInformation,
  Thankyou,
];

interface FormState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  loading: boolean;
}

export interface Data {
  firstName: string;
  lastName: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  consent: "No" | "Yes";
  phone: string;
  email: string;
  institute: string;
  city: string;
  role: string;
  name: string;
  arrival: string;
  departure: string;
  dietary: string;
  allergy: string;
  room: string;
}

interface FormStore extends FormState {
  data: Data;

  isParticipating: boolean | null;
  setIsParticipating: (value: boolean) => void;

  setData: (data: Partial<Data>) => void;

  validationErrors: Partial<Record<keyof Data, string>>;
  setValidationErrors: (errors: Partial<Record<keyof Data, string>>) => void;
  showValidationErrors: boolean;
  setShowValidationErrors: (show: boolean) => void;

  /**
   * Submits the form data to the API. Returns the QR code (submission._id) on success.
   * If not participating, only participation field is sent.
   */
  submitForm: () => void;

  /**
   * Validates if the current step can proceed to the next step
   */
  canProceedToNextStep: () => boolean;
}

export const useFormStore = create<FormStore>((set, get) => ({
  currentStep: 0,
  loading: false,
  setCurrentStep: (step) => {
    const { currentStep, canProceedToNextStep, setShowValidationErrors } =
      get();

    if (step > currentStep && !canProceedToNextStep()) {
      setShowValidationErrors(true);
      return;
    }

    setShowValidationErrors(false);

    if (step === 4) {
      set({ loading: true });
      useFormStore.getState().submitForm();
    }
    set({ currentStep: step });
  },
  data: {
    firstName: "",
    lastName: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    consent: "No",
    phone: "",
    email: "",
    institute: "",
    city: "",
    role: "",
    name: "",
    arrival: "",
    departure: "",
    dietary: "",
    allergy: "",
    room: "",
  },
  isParticipating: null,

  validationErrors: {},
  setValidationErrors: (errors) =>
    set((state) => ({
      validationErrors: { ...state.validationErrors, ...errors },
    })),
  showValidationErrors: false,
  setShowValidationErrors: (show) => set({ showValidationErrors: show }),

  setIsParticipating: (value) => {
    if (!value) {
      // Reset data to only minimal fields for non-participation
      set((state) => ({
        data: {
          ...state.data,
          institute: "",
          city: "",
          role: "",
          name: "",
          arrival: "",
          departure: "",
          dietary: "",
          allergy: "",
          room: "",
        },
        isParticipating: false,
        currentStep: 4,
        loading: true,
      }));
      // Call submitForm after state is updated
      setTimeout(() => {
        useFormStore.getState().submitForm();
      }, 0);
      return;
    }
    set((state) => {
      const nextStep = value ? 3 : 4;
      return { isParticipating: value, currentStep: nextStep };
    });
  },
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),

  submitForm: async () => {
    const { data, isParticipating } = get();
    let payload;
    if (isParticipating) {
      // Participating payload (original)
      const fields = [
        {
          fieldId: "6869007456b8527b7d9a76a5",
          fieldName:
            "Please confirm your participation: Yes or No. If no, no further information to be collected. ",
          placeholder: "",
          fieldType: "MULTIPLE_CHOICE",
          fieldValue: "Yes",
          options: ["Yes", "No"],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "686901ef56b8527b7d9a7991",
          fieldName: "Email",
          placeholder: "",
          fieldType: "EMAIL",
          fieldValue: data.email,
          options: [],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "6875e74f0c16051a7eebc627",
          fieldName: "Emergency Contact Name",
          placeholder: "",
          fieldType: "NAME",
          fieldValue: data.emergencyContactName,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "6875e74f0c16051a7eebc628",
          fieldName: "Emergency contact Nummber",
          placeholder: "",
          fieldType: "PHONE_NUMBER",
          fieldValue: data.emergencyContactNumber,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "6875de100c16051a7eebb646",
          fieldName:
            " I consent for AbbVie to process and collect my personal data.",
          placeholder: "",
          fieldType: "CHECKBOX",
          fieldValue:
            data.consent === "Yes"
              ? "Yes6875de100c16051a7eebb646"
              : "No6875de100c16051a7eebb646",
          options: ["Yes", "No"],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "6869010856b8527b7d9a77e3",
          fieldName: "First Name",
          placeholder: "Name",
          fieldType: "NAME",
          fieldValue: data.firstName,
          options: [],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "6875cee50c16051a7eebb063",
          fieldName: "Last Name",
          placeholder: "Name",
          fieldType: "NAME",
          fieldValue: data.lastName,
          options: [],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "6869010856b8527b7d9a77e4",
          fieldName: "Institute Name",
          placeholder: "",
          fieldType: "SHORT_ANSWER",
          fieldValue: data.institute,
          options: [],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "6869010856b8527b7d9a77e5",
          fieldName: "City",
          placeholder: "",
          fieldType: "SHORT_ANSWER",
          fieldValue: data.city,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "6869010856b8527b7d9a77e6",
          fieldName: "Role",
          placeholder: "",
          fieldType: "MULTIPLE_CHOICE",
          fieldValue: data.role,
          options: [
            "Investigator",
            "Sub-investigator",
            "Study Coordinator",
            "Abbvie ",
          ],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "686901ef56b8527b7d9a7990",
          fieldName: "Mobile number for coordination/flight booking",
          placeholder: "",
          fieldType: "PHONE_NUMBER",
          fieldValue: data.phone,
          options: [],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "686901ef56b8527b7d9a7992",
          fieldName:
            "Name as per Govt Id (same to be used for flight booking, where applicable)",
          placeholder: "",
          fieldType: "NAME",
          fieldValue: data.name,
          options: [],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "686901ef56b8527b7d9a7993",
          fieldName: "Arrival Date",
          placeholder: "",
          fieldType: "DATE",
          fieldValue: data.arrival,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "686901ef56b8527b7d9a7994",
          fieldName: "Departure Date",
          placeholder: "",
          fieldType: "DATE",
          fieldValue: data.departure,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "686901ef56b8527b7d9a7995",
          fieldName: "Dietary preference",
          placeholder: "",
          fieldType: "MULTIPLE_CHOICE",
          fieldValue: data.dietary,
          options: ["Veg", "Non-Veg", "Jain food", "Gluten free"],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "686901ef56b8527b7d9a7996",
          fieldName: "Allergic to any food",
          placeholder: "plz be specific",
          fieldType: "SHORT_ANSWER",
          fieldValue: data.allergy,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "686901ef56b8527b7d9a7997",
          fieldName: "Room preference",
          placeholder: "",
          fieldType: "MULTIPLE_CHOICE",
          fieldValue: data.room,
          options: ["Smoking", "non-smoking"],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
      ];
      payload = {
        eventId: "6868fdf256b8527b7d998430",
        attendeeTypeId: "6868ffdd56b8527b7d9a6c0b",
        submission: {
          formId: "6869007456b8527b7d9a76a4",
          fields,
        },
      };
    } else {
      // Not participating payload (new)
      const fields = [
        {
          fieldId: "686a497456b8527b7d9c310c",
          fieldName: "First Name",
          placeholder: "",
          fieldType: "NAME",
          fieldValue: data.firstName,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "6875cd390c16051a7eebae07",
          fieldName: "Last Name",
          placeholder: "",
          fieldType: "NAME",
          fieldValue: data.lastName,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "6875e5030c16051a7eebc1dd",
          fieldName: "Email",
          placeholder: "",
          fieldType: "EMAIL",
          fieldValue: data.email,
          options: [],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
        {
          fieldId: "686a497456b8527b7d9c310e",
          fieldName: "Phone Number",
          placeholder: "",
          fieldType: "PHONE_NUMBER",
          fieldValue: data.phone,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "6875cd390c16051a7eebae09",
          fieldName: "Emergency Contact Name",
          placeholder: "",
          fieldType: "NAME",
          fieldValue: data.emergencyContactName,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "6875cd390c16051a7eebae0a",
          fieldName: "Emergency contact Nummber",
          placeholder: "",
          fieldType: "PHONE_NUMBER",
          fieldValue: data.emergencyContactNumber,
          options: [],
          isHidden: false,
          isRequired: false,
          verifyConsent: false,
        },
        {
          fieldId: "6875de2f0c16051a7eebb6a8",
          fieldName:
            " I consent for AbbVie to process and collect my personal data.",
          placeholder: "",
          fieldType: "CHECKBOX",
          fieldValue:
            data.consent === "Yes"
              ? "Yes6875de2f0c16051a7eebb6a8"
              : "No6875de2f0c16051a7eebb6a8",
          options: ["Yes", "No"],
          isHidden: false,
          isRequired: true,
          verifyConsent: false,
        },
      ];
      payload = {
        eventId: "6868fdf256b8527b7d998430",
        attendeeTypeId: "6868fff156b8527b7d9a75b9",
        submission: {
          formId: "686a497456b8527b7d9c310b",
          fields,
        },
      };
    }
    try {
      const res = await axios.post(
        "https://api.gokapturehub.com/form-submission/submit",
        payload
      );
      console.log("Form submission response:", res.data);
    } catch (err) {
      // You may want to handle error more gracefully
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  canProceedToNextStep: () => {
    const { currentStep, data, isParticipating, setValidationErrors } = get();

    if (currentStep === 1) {
      const errors: Partial<Record<keyof Data, string>> = {};

      if (!data.firstName || !data.firstName.trim()) {
        errors.firstName = "First name is required.";
      }
      if (!data.lastName || !data.lastName.trim()) {
        errors.lastName = "Last name is required.";
      }
      if (!data.email || !data.email.trim()) {
        errors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        errors.email = "Enter a valid email address.";
      }
      if (!data.phone) {
        errors.phone = "Enter a valid Phone number.";
      }
      if (!data.emergencyContactName || !data.emergencyContactName.trim()) {
        errors.emergencyContactName = "Emergency ContactName name is required.";
      }
      if (!data.emergencyContactNumber) {
        errors.emergencyContactNumber = "Enter a valid Phone number.";
      }
      if (!data.consent || data.consent === "No") {
        errors.consent = "Consent is required.";
      }
      // console.log(data);
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    }

    // Validation for step 2 (ConfirmParticipation - index 2)
    if (currentStep === 2) {
      return isParticipating !== null;
    }

    // Validation for step 3 (FurtherInformation - index 3) - only if participating
    if (currentStep === 3 && isParticipating) {
      const errors: Partial<Record<keyof Data, string>> = {};

      if (!data.institute || !data.institute.trim()) {
        errors.institute = "Institute name is required.";
      }
      if (!data.role || !data.role.trim()) {
        errors.role = "Role is required.";
      }
      if (!data.name || !data.name.trim()) {
        errors.name = "Name as per Govt ID is required.";
      }
      if (!data.dietary || !data.dietary.trim()) {
        errors.dietary = "Dietary preference is required.";
      }
      if (!data.room || !data.room.trim()) {
        errors.room = "Room preference is required.";
      }

      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    }

    // For other steps, allow navigation (you can add more validations here)
    return true;
  },
}));
