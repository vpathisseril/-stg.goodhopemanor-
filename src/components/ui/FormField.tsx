import type { ChangeEvent, FocusEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { formCopy } from "@/content/form";

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  helperText?: string;
  onChange: (value: string) => void;
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: "text" | "tel" | "email";
  autoComplete?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  multiline?: boolean;
  options?: string[];
};

const controlClass =
  "min-h-12 w-full rounded-lg border-2 border-typography-muted bg-neutral-surface px-4 py-3 text-lg text-typography-primary focus:border-brand-secondary";

export function FormField({
  id,
  label,
  value,
  error,
  helperText,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  pattern,
  minLength,
  maxLength,
  required = false,
  multiline = false,
  options,
}: FormFieldProps) {
  const describedBy = [
    helperText ? `${id}-help` : "",
    error ? `${id}-error` : "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    onChange(event.target.value);
  }

  return (
    <div className="grid gap-2">
      <label className="text-lg font-medium" htmlFor={id}>
        {label}
        {required ? (
          <span className="ml-2 text-base text-typography-muted">
            {formCopy.required}
          </span>
        ) : null}
      </label>
      {options ? (
        <select
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={controlClass}
          id={id}
          name={id}
          onBlur={onBlur}
          onChange={handleChange}
          value={value}
        >
          <option value="">{formCopy.chooseOptional}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          className={`${controlClass} min-h-32`}
          id={id}
          maxLength={maxLength}
          name={id}
          onBlur={onBlur}
          onChange={handleChange}
          value={value}
        />
      ) : (
        <input
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          autoComplete={autoComplete}
          className={controlClass}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          name={id}
          onBlur={onBlur}
          onChange={handleChange}
          pattern={pattern}
          required={required}
          type={type}
          value={value}
        />
      )}
      {helperText ? (
        <p className="text-base text-typography-muted" id={`${id}-help`}>
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p className="flex items-start gap-2 text-status-error" id={`${id}-error`}>
          <Icon className="mt-1 h-5 w-5 shrink-0" name="warning" />
          <span>Error: {error}</span>
        </p>
      ) : null}
    </div>
  );
}
