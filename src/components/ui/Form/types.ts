import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";

// ─────────────────────────────────────────────
// Shared field state
// ─────────────────────────────────────────────

export type FieldState = "default" | "error" | "success" | "loading" | "disabled";

export interface FieldFeedback {
  /** Error message shown below the field */
  error?: string;
  /** Success message shown below the field */
  success?: string;
  /** Hint / helper text shown below the field */
  hint?: string;
}

// ─────────────────────────────────────────────
// Label
// ─────────────────────────────────────────────

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

// ─────────────────────────────────────────────
// Field Wrapper
// ─────────────────────────────────────────────

export interface FieldWrapperProps {
  /** The form field */
  children: ReactNode;
  /** Label text */
  label?: string;
  /** htmlFor — wires label to input */
  htmlFor?: string;
  error?: string;
  success?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// ─────────────────────────────────────────────
// Input
// ─────────────────────────────────────────────

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Left decorative icon */
  leftIcon?: ReactNode;
  /** Right decorative icon (hidden when loading or password toggle shown) */
  rightIcon?: ReactNode;
  error?: string;
  success?: string;
  loading?: boolean;
}

// ─────────────────────────────────────────────
// Password Input
// ─────────────────────────────────────────────

export interface PasswordInputProps extends Omit<InputProps, "type"> {}

// ─────────────────────────────────────────────
// Textarea
// ─────────────────────────────────────────────

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  success?: string;
  /** Show character counter (requires maxLength) */
  showCount?: boolean;
  loading?: boolean;
}

// ─────────────────────────────────────────────
// Select
// ─────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  success?: string;
  loading?: boolean;
}

// ─────────────────────────────────────────────
// Checkbox
// ─────────────────────────────────────────────

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  error?: string;
  /** Indeterminate state (tri-state) */
  indeterminate?: boolean;
}

// ─────────────────────────────────────────────
// Radio
// ─────────────────────────────────────────────

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: string;
  error?: string;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string; disabled?: boolean }>;
  error?: string;
  className?: string;
}

// ─────────────────────────────────────────────
// Switch / Toggle
// ─────────────────────────────────────────────

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  description?: string;
  size?: "sm" | "md" | "lg";
}

// ─────────────────────────────────────────────
// Floating Label Input
// ─────────────────────────────────────────────

export interface FloatingLabelInputProps extends InputProps {
  /** The floating label text */
  label: string;
}
