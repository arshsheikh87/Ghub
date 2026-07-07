"use client";

import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/utils/cn";
import { feedbackBase, feedbackError, feedbackSuccess, feedbackHint } from "./fieldStyles";

interface FieldFeedbackProps {
  error?: string;
  success?: string;
  hint?: string;
  /** id to set on the element — used for aria-describedby */
  id?: string;
}

/**
 * FieldFeedback — renders error, success, or hint message below a field.
 * Renders nothing when all are undefined.
 */
export function FieldFeedback({ error, success, hint, id }: FieldFeedbackProps) {
  if (error) {
    return (
      <p
        id={id}
        role="alert"
        aria-live="polite"
        className={cn(feedbackBase, feedbackError)}
      >
        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        {error}
      </p>
    );
  }

  if (success) {
    return (
      <p id={id} className={cn(feedbackBase, feedbackSuccess)}>
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        {success}
      </p>
    );
  }

  if (hint) {
    return (
      <p id={id} className={cn(feedbackBase, feedbackHint)}>
        <Info className="w-3 h-3 shrink-0" aria-hidden="true" />
        {hint}
      </p>
    );
  }

  return null;
}
