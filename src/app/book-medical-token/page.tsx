"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getAvailableCities } from "@/lib/medical-centers";
import WafidDatePicker from "@/components/common/WafidDatePicker";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Upload,
  QrCode,
  X,
  Loader2,
  ChevronDown,
} from "lucide-react";

export default function BookMedicalTokenPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cities, setCities] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [applicationId, setApplicationId] = useState("");

  // Calculate Date bounds
  const todayStr = new Date().toISOString().split("T")[0];
  
  const minExpiry6MonthsDate = new Date();
  minExpiry6MonthsDate.setMonth(minExpiry6MonthsDate.getMonth() + 6);
  const minExpiry6MonthsStr = minExpiry6MonthsDate.toISOString().split("T")[0];

  const maxExpiryDate = new Date();
  maxExpiryDate.setFullYear(maxExpiryDate.getFullYear() + 10);
  const maxExpiryStr = maxExpiryDate.toISOString().split("T")[0];

  // Step 1 Form State (Aligned with Wafid Layout)
  const [formData, setFormData] = useState({
    examinationCountry: "Pakistan",
    city: "",
    destinationCountry: "",
    appointmentType: "Standard Appointment",
    preferredAppointmentDate: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "Pakistani",
    gender: "",
    maritalStatus: "",
    passportNumber: "",
    confirmPassportNumber: "",
    passportIssueDate: "",
    passportIssuePlace: "",
    passportExpiryDate: "",
    visaType: "",
    email: "",
    phone: "",
    nationalId: "",
    positionApplied: "",
    confirmationChecked: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1 Passport file state
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);

  // Step 2 Screenshot state
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  const resetForm = () => {
    setStep(1);
    setFormData({
      examinationCountry: "Pakistan",
      city: "",
      destinationCountry: "",
      appointmentType: "Standard Appointment",
      preferredAppointmentDate: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "Pakistani",
      gender: "",
      maritalStatus: "",
      passportNumber: "",
      confirmPassportNumber: "",
      passportIssueDate: "",
      passportIssuePlace: "",
      passportExpiryDate: "",
      visaType: "",
      email: "",
      phone: "",
      nationalId: "",
      positionApplied: "",
      confirmationChecked: false,
    });
    setErrors({});
    setPassportFile(null);
    setPassportPreview(null);
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setApplicationId("");
    setErrorMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const available = getAvailableCities().filter((c) => c !== "All Cities");
    setCities(available);

    const handleReset = () => {
      resetForm();
    };
    window.addEventListener("reset-medical-token-form", handleReset);
    return () => window.removeEventListener("reset-medical-token-form", handleReset);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let updatedValue = value;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "positionApplied") {
      // Disallow numeric input immediately
      updatedValue = value.replace(/[0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Real-time instant Passport Number matching validation
    if (name === "passportNumber" || name === "confirmPassportNumber") {
      const pNum = name === "passportNumber" ? updatedValue : formData.passportNumber;
      const cNum = name === "confirmPassportNumber" ? updatedValue : formData.confirmPassportNumber;

      setErrors((prev) => {
        const copy = { ...prev };

        if (name === "passportNumber" && pNum.trim().length >= 6) {
          delete copy.passportNumber;
        }

        if (cNum.trim().length > 0 && pNum.trim().toUpperCase() !== cNum.trim().toUpperCase()) {
          copy.confirmPassportNumber = "Passport numbers do not match";
        } else if (cNum.trim().length > 0 && pNum.trim().toUpperCase() === cNum.trim().toUpperCase()) {
          delete copy.confirmPassportNumber;
        } else if (name === "confirmPassportNumber" && cNum.trim().length === 0) {
          delete copy.confirmPassportNumber;
        }

        return copy;
      });
    } else if (name === "passportExpiryDate") {
      if (value && value < minExpiry6MonthsStr) {
        setErrors((prev) => ({
          ...prev,
          passportExpiryDate: "Passport must be valid for at least 6 months from today",
        }));
      } else if (value && value > maxExpiryStr) {
        setErrors((prev) => ({
          ...prev,
          passportExpiryDate: "Passport Expiry Date cannot be more than 10 years from today",
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.passportExpiryDate;
          return copy;
        });
      }
    } else if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Step 1 Strict Validation (ALL FIELDS MANDATORY & DATE RULES)
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.examinationCountry) newErrors.examinationCountry = "Select Country";
    if (!formData.city) newErrors.city = "Select City";
    if (!formData.destinationCountry) newErrors.destinationCountry = "Select Country Traveling To";

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    } else if (formData.dateOfBirth > todayStr) {
      newErrors.dateOfBirth = "Date of Birth cannot be in the future";
    }

    if (!formData.nationality.trim()) newErrors.nationality = "Select Nationality";
    if (!formData.gender) newErrors.gender = "Select Gender";
    if (!formData.maritalStatus) newErrors.maritalStatus = "Select Marital Status";

    if (!formData.passportNumber.trim()) {
      newErrors.passportNumber = "Passport number is required";
    } else if (formData.passportNumber.length < 6) {
      newErrors.passportNumber = "Enter a valid Passport number";
    }

    if (!formData.confirmPassportNumber.trim()) {
      newErrors.confirmPassportNumber = "Confirm Passport number is required";
    } else if (
      formData.passportNumber.trim().toUpperCase() !==
      formData.confirmPassportNumber.trim().toUpperCase()
    ) {
      newErrors.confirmPassportNumber = "Passport numbers do not match";
    }

    // Passport Issue Date: Must not be in the future
    if (!formData.passportIssueDate) {
      newErrors.passportIssueDate = "Passport Issue Date is required";
    } else if (formData.passportIssueDate > todayStr) {
      newErrors.passportIssueDate = "Passport Issue Date cannot be in the future";
    }

    if (!formData.passportIssuePlace.trim()) newErrors.passportIssuePlace = "Passport Issue Place is required";

    // Passport Expiry Date: Must be at least 6 months from today and within 10 years
    if (!formData.passportExpiryDate) {
      newErrors.passportExpiryDate = "Passport Expiry Date is required";
    } else if (formData.passportExpiryDate < minExpiry6MonthsStr) {
      newErrors.passportExpiryDate = "Passport must be valid for at least 6 months from today";
    } else if (formData.passportExpiryDate > maxExpiryStr) {
      newErrors.passportExpiryDate = "Passport Expiry Date cannot be more than 10 years from today";
    } else if (
      formData.passportIssueDate &&
      new Date(formData.passportExpiryDate) <= new Date(formData.passportIssueDate)
    ) {
      newErrors.passportExpiryDate = "Passport Expiry Date must be after Issue Date";
    }

    if (!formData.visaType) newErrors.visaType = "Select Visa Type";

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone No is required";
    if (!formData.nationalId.trim()) newErrors.nationalId = "National ID is required";

    // Position Applied: MANDATORY + TEXT ONLY (NO NUMBERS)
    if (!formData.positionApplied.trim()) {
      newErrors.positionApplied = "Position Applied For is required";
    } else if (/\d/.test(formData.positionApplied)) {
      newErrors.positionApplied = "Position Applied For must contain text only (numbers not allowed)";
    }

    // Passport Copy File: MANDATORY
    if (!passportFile) {
      newErrors.passportFile = "Passport copy file attachment is required";
    }

    if (!formData.confirmationChecked) {
      newErrors.confirmationChecked = "You must confirm that the information provided is accurate.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Step 1 Passport Copy Upload Handler
  const handlePassportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("Passport file size exceeds 5MB limit. Please upload a smaller file.");
        return;
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PNG, JPG, JPEG, WEBP images, and PDF documents are allowed for Passport copy.");
        return;
      }
      setPassportFile(file);
      if (file.type.startsWith("image/")) {
        setPassportPreview(URL.createObjectURL(file));
      } else {
        setPassportPreview(null);
      }
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.passportFile;
        return copy;
      });
    }
  };

  const handleRemovePassportFile = () => {
    setPassportFile(null);
    setPassportPreview(null);
  };

  // Step 2 Screenshot Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please upload a smaller image.");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert("Only PNG, JPG, JPEG, and WEBP image files are allowed.");
        return;
      }
      setScreenshotFile(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
  };

  // Final Form Submit Handler
  const handleFinalSubmit = async () => {
    if (!passportFile) {
      alert("Please attach a passport copy before submitting.");
      setStep(1);
      return;
    }

    if (!screenshotFile) {
      alert("Please attach a payment screenshot before submitting.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const bodyData = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        bodyData.append(key, String(val));
      });
      bodyData.append("passportCopy", passportFile);
      bodyData.append("screenshot", screenshotFile);

      // Submit to Next.js API route
      const res = await fetch("/api/submit-token-request", {
        method: "POST",
        body: bodyData,
      });

      const data = await res.json();

      if (data.success) {
        setApplicationId(data.applicationId);
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrorMessage(data.message || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("A network error occurred. Please try again or contact us via WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Progress Indicator */}
        <div className="mb-8 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            
            {/* Step 1 Badge */}
            <div className={`flex items-center gap-3 ${step >= 1 ? "text-[#061224]" : "text-slate-400"}`}>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === 1
                    ? "bg-[#061224] text-white shadow-md ring-4 ring-amber-500/20"
                    : step > 1
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "01"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 1</p>
                <p className="text-xs font-bold">Appointment Information</p>
              </div>
            </div>

            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? "bg-emerald-500" : "bg-slate-200"}`}></div>

            {/* Step 2 Badge */}
            <div className={`flex items-center gap-3 ${step >= 2 ? "text-[#061224]" : "text-slate-400"}`}>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === 2
                    ? "bg-[#061224] text-white shadow-md ring-4 ring-amber-500/20"
                    : step > 2
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : "02"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 2</p>
                <p className="text-xs font-bold">Payment</p>
              </div>
            </div>

            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? "bg-emerald-500" : "bg-slate-200"}`}></div>

            {/* Step 3 Badge */}
            <div className={`flex items-center gap-3 ${step === 3 ? "text-[#061224]" : "text-slate-400"}`}>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === 3
                    ? "bg-emerald-600 text-white shadow-md ring-4 ring-emerald-500/20"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                03
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Step 3</p>
                <p className="text-xs font-bold">Get Token</p>
              </div>
            </div>

          </div>
        </div>

        {/* STEP 1: WAFID APPOINTMENT INFORMATION FORM */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/90 space-y-8">
            
            {/* Header Title */}
            <div>
              <h1 className="text-lg font-bold text-[#061224]">
                Book a medical examination appointment
              </h1>
            </div>

            <form onSubmit={handleNextStep} className="space-y-8">
              
              {/* Outer Section: Appointment Information */}
              <div className="space-y-8">
                
                <h2 className="text-base font-bold text-[#061224]">
                  Appointment Information
                </h2>

                {/* Fieldset 1: Appointment Location */}
                <fieldset className="border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
                  <legend className="text-xs font-bold text-slate-500 px-2 ml-2">
                    Appointment Location
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    
                    {/* Country */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="examinationCountry"
                          value={formData.examinationCountry}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none appearance-none pr-8 cursor-pointer"
                        >
                          <option value="Pakistan">Pakistan</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                      </div>
                      {errors.examinationCountry && (
                        <p className="mt-1 text-[11px] text-red-500">{errors.examinationCountry}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none appearance-none pr-8 cursor-pointer"
                        >
                          <option value="">Select City</option>
                          {cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                      </div>
                      {errors.city && <p className="mt-1 text-[11px] text-red-500">{errors.city}</p>}
                    </div>

                    {/* Country Traveling To */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Country Traveling To <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="destinationCountry"
                          value={formData.destinationCountry}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none appearance-none pr-8 cursor-pointer"
                        >
                          <option value="">Select Country Traveling To</option>
                          {siteConfig.destinationCountries.map((c) => (
                            <option key={c.code} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                      </div>
                      {errors.destinationCountry && (
                        <p className="mt-1 text-[11px] text-red-500">{errors.destinationCountry}</p>
                      )}
                    </div>

                  </div>
                </fieldset>

                {/* Fieldset 2: Candidate Information */}
                <fieldset className="border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
                  <legend className="text-xs font-bold text-slate-500 px-2 ml-2">
                    Candidate Information
                  </legend>

                  <div className="space-y-5">
                    
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First name"
                          className={`w-full px-3.5 py-2.5 bg-white border ${
                            errors.firstName ? "border-red-500 bg-red-50/20" : "border-slate-300"
                          } rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none`}
                        />
                        {errors.firstName && <p className="mt-1 text-[11px] text-red-500">{errors.firstName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          className={`w-full px-3.5 py-2.5 bg-white border ${
                            errors.lastName ? "border-red-500 bg-red-50/20" : "border-slate-300"
                          } rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none`}
                        />
                        {errors.lastName && <p className="mt-1 text-[11px] text-red-500">{errors.lastName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <WafidDatePicker
                          name="dateOfBirth"
                          id="dateOfBirth"
                          maxDate={todayStr}
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          error={!!errors.dateOfBirth}
                          placeholder="Select Date of Birth"
                        />
                        {errors.dateOfBirth && <p className="mt-1 text-[11px] text-red-500">{errors.dateOfBirth}</p>}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Nationality <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none appearance-none pr-8 cursor-pointer"
                          >
                            <option value="Pakistani">Pakistani</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                        </div>
                        {errors.nationality && <p className="mt-1 text-[11px] text-red-500">{errors.nationality}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none appearance-none pr-8 cursor-pointer"
                          >
                            <option value="">------</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                        </div>
                        {errors.gender && <p className="mt-1 text-[11px] text-red-500">{errors.gender}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Marital status <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none appearance-none pr-8 cursor-pointer"
                          >
                            <option value="">------</option>
                            {siteConfig.maritalStatuses.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                        </div>
                        {errors.maritalStatus && <p className="mt-1 text-[11px] text-red-500">{errors.maritalStatus}</p>}
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Passport number No <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="passportNumber"
                          id="passportNumber"
                          value={formData.passportNumber}
                          onChange={handleInputChange}
                          placeholder="Enter Passport No"
                          className={`w-full px-3.5 py-2.5 bg-white border ${
                            errors.passportNumber ? "border-red-500 bg-red-50/20" : "border-slate-300"
                          } rounded-lg text-xs font-medium uppercase tracking-wider text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none`}
                        />
                        {errors.passportNumber && <p className="mt-1 text-[11px] text-red-500">{errors.passportNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Confirm Passport No <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="confirmPassportNumber"
                          id="confirmPassportNumber"
                          value={formData.confirmPassportNumber}
                          onChange={handleInputChange}
                          placeholder="Enter Passport No"
                          className={`w-full px-3.5 py-2.5 bg-white border ${
                            errors.confirmPassportNumber ? "border-red-500 bg-red-50/20" : "border-slate-300"
                          } rounded-lg text-xs font-medium uppercase tracking-wider text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none`}
                        />
                        {errors.confirmPassportNumber && (
                          <p className="mt-1 text-[11px] font-semibold text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                            {errors.confirmPassportNumber}
                          </p>
                        )}
                      </div>

                      {/* Passport Issue Date: MAX TODAY (Future disabled) */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Passport Issue Date <span className="text-red-500">*</span>
                        </label>
                        <WafidDatePicker
                          name="passportIssueDate"
                          id="passportIssueDate"
                          maxDate={todayStr}
                          value={formData.passportIssueDate}
                          onChange={handleInputChange}
                          error={!!errors.passportIssueDate}
                          placeholder="Select Passport Issue Date"
                        />
                        {errors.passportIssueDate && (
                          <p className="mt-1 text-[11px] text-red-500">{errors.passportIssueDate}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Passport Issue Place <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="passportIssuePlace"
                          id="passportIssuePlace"
                          value={formData.passportIssuePlace}
                          onChange={handleInputChange}
                          placeholder="Passport Issue Place"
                          className={`w-full px-3.5 py-2.5 bg-white border ${
                            errors.passportIssuePlace ? "border-red-500 bg-red-50/20" : "border-slate-300"
                          } rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none`}
                        />
                        {errors.passportIssuePlace && (
                          <p className="mt-1 text-[11px] text-red-500">{errors.passportIssuePlace}</p>
                        )}
                      </div>

                      {/* Passport Expiry Date: MIN 6 MONTHS FROM TODAY, MAX TODAY+10 YEARS */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Passport Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <WafidDatePicker
                          name="passportExpiryDate"
                          id="passportExpiryDate"
                          maxDate={maxExpiryStr}
                          value={formData.passportExpiryDate}
                          onChange={handleInputChange}
                          error={!!errors.passportExpiryDate}
                          placeholder="Select Passport Expiry Date"
                        />
                        {errors.passportExpiryDate && (
                          <p className="mt-1 text-[11px] font-semibold text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                            {errors.passportExpiryDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Visa Type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="visaType"
                            value={formData.visaType}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none appearance-none pr-8 cursor-pointer"
                          >
                            <option value="">Select Visa Type</option>
                            {siteConfig.visaTypes.map((vt) => (
                              <option key={vt} value={vt}>
                                {vt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                        </div>
                        {errors.visaType && <p className="mt-1 text-[11px] text-red-500">{errors.visaType}</p>}
                      </div>
                    </div>

                    {/* Row 5 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          autoComplete="off"
                          placeholder="example@domain.com"
                          className={`w-full px-3.5 py-2.5 bg-white border ${
                            errors.email ? "border-red-500 bg-red-50/20" : "border-slate-300"
                          } rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none`}
                        />
                        {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Phone No <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone No"
                          className={`w-full px-3.5 py-2.5 bg-white border ${
                            errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-300"
                          } rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none`}
                        />
                        {errors.phone && <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          National ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="nationalId"
                          id="nationalId"
                          value={formData.nationalId}
                          onChange={handleInputChange}
                          placeholder="National ID"
                          className={`w-full px-3.5 py-2.5 bg-white border ${
                            errors.nationalId ? "border-red-500 bg-red-50/20" : "border-slate-300"
                          } rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none`}
                        />
                        {errors.nationalId && <p className="mt-1 text-[11px] text-red-500">{errors.nationalId}</p>}
                      </div>
                    </div>

                    {/* Row 6: Position Applied For (TEXT FIELD ONLY, NUMBERS NOT ALLOWED) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Position applied for <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="positionApplied"
                        id="positionApplied"
                        value={formData.positionApplied}
                        onChange={handleInputChange}
                        placeholder="e.g. Engineer, Driver, Technician"
                        className={`w-full px-3.5 py-2.5 bg-white border ${
                          errors.positionApplied ? "border-red-500 bg-red-50/20" : "border-slate-300"
                        } rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500/40 outline-none`}
                      />
                      {errors.positionApplied && (
                        <p className="mt-1 text-[11px] text-red-500">{errors.positionApplied}</p>
                      )}
                    </div>

                    {/* Row 7: Attach Passport Copy (Image / PDF) */}
                    <div id="passportFile" className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        Attach Passport Copy (Image or PDF) <span className="text-red-500">*</span>
                      </label>

                      {!passportFile ? (
                        <div
                          className={`border-2 border-dashed ${
                            errors.passportFile ? "border-red-400 bg-red-50/20" : "border-slate-300 hover:border-amber-500/60"
                          } rounded-xl p-5 text-center bg-slate-50 hover:bg-amber-500/5 transition-all cursor-pointer`}
                        >
                          <input
                            type="file"
                            id="passport-copy-input"
                            accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                            onChange={handlePassportFileChange}
                            className="hidden"
                          />
                          <label htmlFor="passport-copy-input" className="cursor-pointer block">
                            <div className="w-10 h-10 bg-amber-500/10 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Upload className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 block mb-0.5">
                              Click to choose or drag & drop Passport Copy
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              PNG, JPG, JPEG, WEBP or PDF (Max 5MB)
                            </span>
                          </label>
                        </div>
                      ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                          {passportPreview ? (
                            <div className="relative w-20 h-20 bg-slate-200 rounded-lg overflow-hidden border border-amber-500/40 flex-shrink-0">
                              <Image
                                src={passportPreview}
                                alt="Passport Copy Preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 bg-amber-50 border border-amber-200 rounded-lg flex flex-col items-center justify-center text-amber-800 flex-shrink-0">
                              <ShieldCheck className="w-8 h-8 text-amber-600" />
                              <span className="text-[10px] font-bold mt-1">PDF DOC</span>
                            </div>
                          )}

                          <div className="flex-1 text-center sm:text-left space-y-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              Passport Copy Attached
                            </span>
                            <p className="text-xs font-bold text-slate-800 truncate">{passportFile.name}</p>
                            <p className="text-[11px] text-slate-500">
                              Size: {(passportFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <div className="pt-1 flex justify-center sm:justify-start gap-2">
                              <label
                                htmlFor="passport-copy-input-replace"
                                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-semibold cursor-pointer transition-colors"
                              >
                                Replace
                              </label>
                              <input
                                type="file"
                                id="passport-copy-input-replace"
                                accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                                onChange={handlePassportFileChange}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={handleRemovePassportFile}
                                className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-semibold transition-colors flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {errors.passportFile && (
                        <p className="mt-1 text-[11px] text-red-500 font-semibold">{errors.passportFile}</p>
                      )}
                    </div>

                  </div>
                </fieldset>

                {/* Mandatory Confirmation Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="confirmationChecked"
                      checked={formData.confirmationChecked}
                      onChange={handleInputChange}
                      className="mt-0.5 w-4 h-4 text-[#061224] rounded border-slate-300 focus:ring-amber-500"
                    />
                    <span className="text-xs text-slate-600 leading-normal font-medium">
                      I confirm that the Information given in this form is true, complete, and accurate <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.confirmationChecked && (
                    <p className="mt-1 text-[11px] text-red-500 pl-6.5">{errors.confirmationChecked}</p>
                  )}
                </div>

              </div>

              {/* Action Buttons at Bottom */}
              <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-200">
                <Link
                  href="/"
                  className="px-8 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-800 rounded-lg text-xs font-bold transition-all text-center min-w-[120px]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="px-8 py-2.5 bg-[#061224] hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-all shadow-md text-center min-w-[150px]"
                >
                  Save And Continue
                </button>
              </div>

            </form>
          </div>
        )}

        {/* STEP 2: ACCOUNT DETAILS & SCREENSHOT UPLOAD */}
        {step === 2 && (
          <div className="space-y-8">
            
            {/* Payment & Account Instructions Card */}
            <div className="bg-[#061224] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-500/30">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Account & Payment Verification</h2>
                  <p className="text-xs text-slate-400">Scan QR Code or make payment to the account details below.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* QR Code Container */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-900/90 rounded-2xl border border-amber-500/30 text-center">
                  <div className="relative w-48 h-48 bg-white p-3 rounded-xl shadow-lg border-2 border-amber-400/50 mb-3 flex items-center justify-center">
                    <Image
                      src={siteConfig.paymentInfo.qrImageSrc}
                      alt="Payment QR Code"
                      fill
                      className="object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.display = "none";
                      }}
                    />
                    <div className="flex flex-col items-center justify-center text-slate-800 space-y-1">
                      <QrCode className="w-16 h-16 text-[#061224]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">QR Code Asset</span>
                      <span className="text-[9px] text-slate-500">/public/payment-qr.png</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-amber-300">Scan QR Code via Banking App</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">EasyPaisa / JazzCash / Banking Apps</p>
                </div>

                {/* Account Details Specs */}
                <div className="md:col-span-7 space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Account Title / Name</span>
                    <span className="text-base font-bold text-amber-400">{siteConfig.paymentInfo.accountName}</span>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Bank Name / Provider</span>
                    <span className="text-sm font-semibold text-white">{siteConfig.paymentInfo.bankName}</span>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Account Number / Phone</span>
                    <span className="text-base font-bold text-white font-mono">{siteConfig.paymentInfo.accountNumber}</span>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">IBAN Number</span>
                    <span className="text-xs font-bold text-amber-300 font-mono tracking-wider">{siteConfig.paymentInfo.iban}</span>
                  </div>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                    💡 <strong>Note:</strong> {siteConfig.paymentInfo.paymentReferenceNote}
                  </div>
                </div>

              </div>
            </div>

            {/* Upload Payment Screenshot Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-700">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#061224]">Upload Payment Confirmation Screenshot</h2>
                  <p className="text-xs text-slate-500">Attach a clear screenshot of your transfer transaction receipt.</p>
                </div>
              </div>

              {!screenshotPreview ? (
                <div className="border-2 border-dashed border-slate-300 hover:border-amber-500/60 rounded-2xl p-8 text-center bg-slate-50 hover:bg-amber-500/5 transition-all cursor-pointer">
                  <input
                    type="file"
                    id="screenshot-input"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="screenshot-input" className="cursor-pointer block">
                    <div className="w-16 h-16 bg-amber-500/10 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 block mb-1">
                      Click to choose or drag & drop payment screenshot
                    </span>
                    <span className="text-xs text-slate-500 block">
                      PNG, JPG, JPEG or WEBP (Max 5MB)
                    </span>
                  </label>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative w-40 h-40 bg-slate-200 rounded-xl overflow-hidden border-2 border-amber-500/40 flex-shrink-0">
                      <Image
                        src={screenshotPreview}
                        alt="Payment Screenshot Preview"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Screenshot Attached
                      </span>
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {screenshotFile?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Size: {(screenshotFile!.size / (1024 * 1024)).toFixed(2)} MB
                      </p>

                      <div className="pt-3 flex flex-wrap justify-center sm:justify-start gap-3">
                        <label
                          htmlFor="screenshot-input-replace"
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                        >
                          Replace Screenshot
                        </label>
                        <input
                          type="file"
                          id="screenshot-input-replace"
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveScreenshot}
                          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS STEP 2 */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Appointment Details
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={!screenshotFile || submitting}
                className={`gold-btn px-8 py-3.5 rounded-lg text-xs uppercase tracking-wider font-extrabold flex items-center gap-3 shadow-xl ${
                  !screenshotFile || submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit Medical Token Request</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: SUCCESS SCREEN */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 text-center shadow-sm border border-emerald-500/40 w-full space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                Application ID: {applicationId}
              </span>
              <h2 className="text-3xl font-extrabold text-[#061224]">Request Submitted Successfully!</h2>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Thank you. Your medical token request has been received. Our concierge team will review your application and you will receive your token through your email/whatsapp.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Applicant Name:</span>
                <span className="font-bold text-slate-800">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Passport Number:</span>
                <span className="font-bold text-slate-800">{formData.passportNumber}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Examination City:</span>
                <span className="font-bold text-slate-800">{formData.city}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Position Applied:</span>
                <span className="font-bold text-slate-800">{formData.positionApplied}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-800">{formData.destinationCountry}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
                  `Hi Gamca Centre, I just submitted my Wafid token request (Application ID: ${applicationId}, Passport: ${formData.passportNumber}). Please update me.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Now</span>
              </a>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto gold-btn px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                Book Another Token
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
