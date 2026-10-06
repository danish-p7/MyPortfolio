"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState<string>("");

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      errs.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      errs.message = "Message body cannot be empty.";
    } else if (formData.message.trim().length < 15) {
      errs.message = "Message must be at least 15 characters long.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error on type
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus("submitting");

    try {
      // POST to /api/contact stub route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setResponseMessage(
          data.message || "Thank you! Your message has been received. I will reply within 24 hours."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setResponseMessage(data.error || "Unable to send message. Please try again later.");
      }
    } catch {
      setStatus("error");
      setResponseMessage("A network error occurred. Please try reaching out directly via email.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-corporate-200 p-8 sm:p-10 shadow-sm">
      <h3 className="text-2xl font-bold text-corporate-900 tracking-tight mb-2">
        Send a Direct Message
      </h3>
      <p className="text-sm text-corporate-600 mb-8">
        Have an open role, engineering project, or consulting question? Fill out the form below and I&apos;ll get back to you promptly.
      </p>

      {/* Success Notification */}
      {status === "success" && (
        <div className="mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-sm text-emerald-800">
            <p className="font-semibold">Message Delivered Successfully!</p>
            <p className="mt-0.5">{responseMessage}</p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {status === "error" && (
        <div className="mb-8 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-sm text-rose-800">
            <p className="font-semibold">Submission Failed</p>
            <p className="mt-0.5">{responseMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wider text-corporate-700 mb-2"
            >
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Jenkins"
              disabled={status === "submitting"}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-corporate-900 bg-white placeholder-corporate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-rose-400 focus:ring-rose-400"
                  : "border-corporate-300 focus:border-accent-600 focus:ring-accent-500/20"
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-corporate-700 mb-2"
            >
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="s.jenkins@company.com"
              disabled={status === "submitting"}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-corporate-900 bg-white placeholder-corporate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-rose-400 focus:ring-rose-400"
                  : "border-corporate-300 focus:border-accent-600 focus:ring-accent-500/20"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-semibold uppercase tracking-wider text-corporate-700 mb-2"
          >
            Subject / Inquiry Type <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Senior Full-Stack Role / Contract Project"
            disabled={status === "submitting"}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-corporate-900 bg-white placeholder-corporate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.subject
                ? "border-rose-400 focus:ring-rose-400"
                : "border-corporate-300 focus:border-accent-600 focus:ring-accent-500/20"
            }`}
          />
          {errors.subject && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-wider text-corporate-700 mb-2"
          >
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project, team requirements, or collaboration idea..."
            disabled={status === "submitting"}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-corporate-900 bg-white placeholder-corporate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.message
                ? "border-rose-400 focus:ring-rose-400"
                : "border-corporate-300 focus:border-accent-600 focus:ring-accent-500/20"
            }`}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
            </p>
          )}
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === "submitting"}
            className="w-full sm:w-auto"
            icon={
              status === "submitting" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )
            }
          >
            {status === "submitting" ? "Sending Message..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
};
