"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "fixed bottom-4 right-4 z-50 w-80 rounded-xl shadow-lg border px-4 py-3 flex items-start gap-3 transition-all",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white border-gray-700",
        destructive: "bg-red-900 text-white border-red-700",
        success: "bg-green-900 text-white border-green-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ToastProps extends VariantProps<typeof toastVariants> {
  title: string;
  description?: string;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant,
  onClose,
}) => {
  return (
    <div className={cn(toastVariants({ variant }))}>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        {description && (
          <p className="text-sm text-gray-300 mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-white transition"
      >
        ✕
      </button>
    </div>
  );
};
