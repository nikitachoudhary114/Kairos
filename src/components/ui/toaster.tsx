"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "./toast";

type ToastMessage = {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

interface ToastContextType {
  toast: (msg: Omit<ToastMessage, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToasterProvider");
  return ctx;
};

export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback(
    (msg: Omit<ToastMessage, "id">) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, ...msg }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            title={t.title}
            description={t.description}
            variant={t.variant}
            onClose={() =>
              setToasts((prev) => prev.filter((x) => x.id !== t.id))
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
