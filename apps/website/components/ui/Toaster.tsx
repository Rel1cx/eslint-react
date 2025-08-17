/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "#/components/ui/Toast";
import { toastsAtom } from "#/services/toaster";
import { useAtomValue } from "@effect-atom/atom-react";

export function Toaster() {
  const toasts = useAtomValue(toastsAtom);

  return (
    <ToastProvider>
      {toasts.map(({ id, description, title, action, ...props }) => (
        <Toast className="bg-[--sl-color-bg]" key={id} {...props}>
          <div className="grid gap-1">
            {title ? <ToastTitle className="text-[--sl-color-white]">{title}</ToastTitle> : null}
            {description ? <ToastDescription className="text-[--sl-color-text]">{description}</ToastDescription> : null}
          </div>
          {action}
          <ToastClose className="bg-transparent text-[--sl-color-white] cursor-pointer" />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
