import { formCopy } from "@/content/form";

export type ContactField =
  | "name"
  | "phone"
  | "email"
  | "relationship"
  | "contact_method"
  | "visit_timeframe"
  | "message";

export type ContactValues = Record<ContactField | "_gotcha", string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export function validateContactForm(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const digits = values.phone.replace(/\D/g, "");

  if (name.length < 2 || name.length > 100) {
    errors.name = formCopy.nameError;
  }

  if (
    !(
      digits.length === 10 ||
      (digits.length === 11 && digits.startsWith("1"))
    )
  ) {
    errors.phone = formCopy.phoneError;
  }

  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = formCopy.emailError;
  }

  if (values.message.length > 1000) {
    errors.message = formCopy.messageError;
  }

  return errors;
}
