"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  validateContactForm,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/validation";
import { Icon } from "@/components/ui/Icon";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { formCopy } from "@/content/form";

type ContactFormProps = {
  endpoint: string;
  privacyPolicyUrl: string;
};

const initialValues: ContactValues = {
  name: "",
  phone: "",
  email: "",
  relationship: "",
  contact_method: "",
  visit_timeframe: "",
  message: "",
  _gotcha: "",
};

const fieldLabels: Record<ContactField, string> = {
  name: formCopy.name,
  phone: formCopy.phone,
  email: formCopy.email,
  relationship: formCopy.relationship,
  contact_method: formCopy.contactMethod,
  visit_timeframe: formCopy.visitTimeframe,
  message: formCopy.message,
};

export function ContactForm({ endpoint, privacyPolicyUrl }: ContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>(
    {},
  );
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmittingRef = useRef(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
  }, []);

  useEffect(() => {
    if (showErrorSummary && Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errors, showErrorSummary]);

  useEffect(() => {
    if (isSuccess) successRef.current?.focus();
  }, [isSuccess]);

  if (!endpoint) {
    return (
      <div
        className="rounded-xl border-2 border-brand-secondary bg-neutral-surface p-6"
        role="status"
      >
        <h2 className="font-heading text-2xl text-brand-primary">
          {formCopy.disabledHeading}
        </h2>
        <p className="mt-3">
          {formCopy.disabledDetails}
        </p>
        <p className="mt-4">
          Please call{" "}
          <a
            className="font-semibold text-brand-secondary underline underline-offset-4"
            href={`tel:${site.phone.tel}`}
          >
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div
        aria-live="polite"
        className="rounded-xl bg-neutral-surface p-6 text-status-success shadow-sm"
        ref={successRef}
        tabIndex={-1}
      >
        <h2 className="flex items-center gap-3 font-heading text-2xl">
          <Icon name="check" />
          {formCopy.successHeading}
        </h2>
        <p className="mt-4">
          {formCopy.successBody}{" "}
          <a
            className="text-brand-secondary underline underline-offset-4"
            href={`tel:${site.phone.tel}`}
          >
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  function updateField(field: keyof ContactValues, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    if (field !== "_gotcha" && touched[field]) {
      setErrors(validateContactForm(nextValues));
    }
  }

  function fieldError(field: ContactField) {
    return touched[field] || showErrorSummary
      ? errors[field]
      : undefined;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    setSubmitError("");
    setShowErrorSummary(true);

    if (values._gotcha) return;

    const nextErrors = validateContactForm(values);
    setTouched({
      name: true,
      phone: true,
      email: true,
      relationship: true,
      contact_method: true,
      visit_timeframe: true,
      message: true,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(event.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        setSubmitError(
          `Error: ${formCopy.networkError}`,
        );
        return;
      }
      setIsSuccess(true);
    } catch {
      setSubmitError(
        `Error: ${formCopy.networkError}`,
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form
      action={endpoint}
      method="post"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {showErrorSummary && Object.keys(errors).length > 0 ? (
        <div
          aria-labelledby="contact-error-heading"
          className="mb-6 rounded-lg border-2 border-status-error bg-neutral-surface p-5"
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
        >
          <h2
            className="font-heading text-2xl text-status-error"
            id="contact-error-heading"
          >
            {formCopy.errorSummary}
          </h2>
          <ul className="mt-3 grid gap-2">
            {(Object.keys(errors) as ContactField[]).map((field) => (
              <li key={field}>
                <a
                  className="inline-flex min-h-11 items-center text-status-error underline underline-offset-4"
                  href={`#${field}`}
                >
                  {fieldLabels[field]}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {submitError ? (
        <div className="mb-5 flex items-start gap-2 text-status-error" role="alert">
          <Icon className="mt-1 h-5 w-5 shrink-0" name="warning" />
          <p>
            {submitError}{" "}
            <a
              className="font-semibold underline underline-offset-4"
              href={`tel:${site.phone.tel}`}
            >
              {site.phone.display}
            </a>
          </p>
        </div>
      ) : null}

      <div className="grid gap-5">
        <FormField
          autoComplete="name"
          error={fieldError("name")}
          id="name"
          label={formCopy.name}
          maxLength={100}
          minLength={2}
          onBlur={() => {
            setTouched((current) => ({ ...current, name: true }));
            setErrors(validateContactForm(values));
          }}
          onChange={(value) => updateField("name", value)}
          required
          value={values.name}
        />
        <FormField
          autoComplete="tel"
          error={fieldError("phone")}
          id="phone"
          label={formCopy.phone}
          maxLength={30}
          onBlur={() => {
            setTouched((current) => ({ ...current, phone: true }));
            setErrors(validateContactForm(values));
          }}
          onChange={(value) => updateField("phone", value)}
          pattern="(?:\\+?1[\\s.-]?)?(?:\\([0-9]{3}\\)|[0-9]{3})[\\s.-]?[0-9]{3}[\\s.-]?[0-9]{4}"
          required
          type="tel"
          value={values.phone}
        />
        <FormField
          autoComplete="email"
          error={fieldError("email")}
          id="email"
          label={formCopy.email}
          onBlur={() => {
            setTouched((current) => ({ ...current, email: true }));
            setErrors(validateContactForm(values));
          }}
          onChange={(value) => updateField("email", value)}
          type="email"
          value={values.email}
        />
        <FormField
          error={fieldError("relationship")}
          id="relationship"
          label={formCopy.relationship}
          onBlur={() => {
            setTouched((current) => ({ ...current, relationship: true }));
            setErrors(validateContactForm(values));
          }}
          onChange={(value) => updateField("relationship", value)}
          options={[
            ...formCopy.relationshipOptions,
          ]}
          value={values.relationship}
        />
        <fieldset
          aria-describedby={
            fieldError("contact_method") ? "contact_method-error" : undefined
          }
          className="grid gap-2"
        >
          <legend className="mb-2 text-lg font-medium">
            {formCopy.contactMethod}
          </legend>
          {(["Phone", "Email"] as const).map((method) => (
            <label
              className="inline-flex min-h-12 items-center gap-3 rounded-lg px-2"
              key={method}
            >
              <input
                checked={values.contact_method === method}
                className="h-6 w-6 accent-brand-primary"
                name="contact_method"
                onBlur={() => {
                  setTouched((current) => ({
                    ...current,
                    contact_method: true,
                  }));
                }}
                onChange={() => updateField("contact_method", method)}
                type="radio"
                value={method}
              />
              {method}
            </label>
          ))}
          {fieldError("contact_method") ? (
            <p className="text-status-error" id="contact_method-error">
              <Icon className="mr-2 inline h-5 w-5" name="warning" />
              Error: {fieldError("contact_method")}
            </p>
          ) : null}
        </fieldset>
        <FormField
          error={fieldError("visit_timeframe")}
          id="visit_timeframe"
          label={formCopy.visitTimeframe}
          onBlur={() => {
            setTouched((current) => ({ ...current, visit_timeframe: true }));
          }}
          onChange={(value) => updateField("visit_timeframe", value)}
          options={[
            ...formCopy.visitTimeframeOptions,
          ]}
          value={values.visit_timeframe}
        />
        <FormField
          error={fieldError("message")}
          helperText="Please don't include medical details."
          id="message"
          label={formCopy.message}
          maxLength={1000}
          onBlur={() => {
            setTouched((current) => ({ ...current, message: true }));
          }}
          onChange={(value) => updateField("message", value)}
          multiline
          value={values.message}
        />
      </div>

      <label hidden>
        Leave this field empty
        <input
          autoComplete="off"
          name="_gotcha"
          onChange={(event) => updateField("_gotcha", event.target.value)}
          tabIndex={-1}
          type="text"
          value={values._gotcha}
        />
      </label>

      <p className="mt-6">
        {formCopy.privacyLine}
      </p>
      {privacyPolicyUrl ? (
        <p className="mt-3">
          <a
            className="text-brand-secondary underline underline-offset-4"
            href={privacyPolicyUrl}
          >
            Read our privacy policy
          </a>
        </p>
      ) : null}
      <Button className="mt-6" disabled={isSubmitting} type="submit">
        <span aria-live="polite">
          {isSubmitting ? formCopy.sending : formCopy.requestTour}
        </span>
      </Button>
    </form>
  );
}
