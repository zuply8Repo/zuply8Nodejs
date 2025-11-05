"use client";

import { useState, FormEvent } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
}

export default function CustomerForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Email validation using RFC 5322 compliant regex (simplified)
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  // Sanitize input to prevent XSS
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, "") // Remove potential HTML tags
      .slice(0, 200); // Limit length
  };

  // Validate name fields (letters, spaces, hyphens, apostrophes)
  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
    return nameRegex.test(name);
  };

  // Validate company name (alphanumeric + common business characters)
  const validateCompany = (company: string): boolean => {
    const companyRegex = /^[a-zA-Z0-9\s.,'&\-()]{2,100}$/;
    return companyRegex.test(company);
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName =
        "First name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes";
    }

    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName =
        "Last name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes";
    }

    // Company validation
    if (!formData.company) {
      newErrors.company = "Company name is required";
    } else if (!validateCompany(formData.company)) {
      newErrors.company =
        "Company name must be 2-100 characters and contain only letters, numbers, and common business characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/hubspot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you! Your information has been submitted successfully. We'll be in touch soon.",
        });
        // Reset form
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          company: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.error ||
            "Something went wrong. Please try again or contact us directly.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Unable to submit form. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="surface-glass relative overflow-hidden px-8 py-12">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-indigo-500/20 to-transparent" />

      <div className="relative mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <p className="badge-soft mb-6 inline-flex bg-white/5 text-indigo-100/90">
            Get Started
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Book Your Demo
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Fill out the form below and we'll get back to you shortly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Email Address <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                errors.email ? "border-rose-500" : "border-white/10"
              } text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
              placeholder="company email"
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-2 text-sm text-rose-400"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* First Name Field */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              First Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
              className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                errors.firstName ? "border-rose-500" : "border-white/10"
              } text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
              placeholder="John"
            />
            {errors.firstName && (
              <p
                id="firstName-error"
                className="mt-2 text-sm text-rose-400"
                role="alert"
              >
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Last Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                errors.lastName ? "border-rose-500" : "border-white/10"
              } text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p
                id="lastName-error"
                className="mt-2 text-sm text-rose-400"
                role="alert"
              >
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Company Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? "company-error" : undefined}
              className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border ${
                errors.company ? "border-rose-500" : "border-white/10"
              } text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
              placeholder="Your Company Inc."
              inputMode="text"
              pattern="[a-zA-Z0-9\s.,'&\-()]{2,100}"
            />
            {errors.company && (
              <p
                id="company-error"
                className="mt-2 text-sm text-rose-400"
                role="alert"
              >
                {errors.company}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-primary inline-flex items-center justify-center w-full px-6 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Submitting...
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus.type && (
            <div
              className={`p-4 rounded-lg border ${
                submitStatus.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-200"
              }`}
              role="alert"
            >
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
