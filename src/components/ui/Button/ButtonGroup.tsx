"use client";

import { cn } from "@/utils/cn";
import type { HTMLAttributes } from "react";

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Stack buttons vertically instead of horizontally */
  vertical?: boolean;
  /** Remove the gap between grouped buttons and merge borders */
  attached?: boolean;
}

/**
 * Groups multiple buttons together — horizontal row by default.
 *
 * @example
 * <ButtonGroup>
 *   <Button variant="outline">Cancel</Button>
 *   <Button variant="primary">Confirm</Button>
 * </ButtonGroup>
 */
export function ButtonGroup({
  vertical = false,
  attached = false,
  className,
  children,
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex",
        vertical ? "flex-col" : "flex-row flex-wrap",
        attached
          ? [
              "gap-0",
              // Collapse inner border radius for attached style
              "[&>button:not(:first-child):not(:last-child)]:rounded-none",
              vertical
                ? [
                    "[&>button:first-child]:rounded-b-none",
                    "[&>button:last-child]:rounded-t-none",
                  ]
                : [
                    "[&>button:first-child]:rounded-r-none",
                    "[&>button:last-child]:rounded-l-none",
                  ],
            ]
          : "gap-3",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
