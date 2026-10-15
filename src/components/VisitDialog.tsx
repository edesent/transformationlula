"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { VisitForm } from "./Forms";

const VisitContext = createContext<((element: HTMLButtonElement) => void) | null>(null);

export function VisitDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const openVisit = useCallback((element: HTMLButtonElement) => {
    trigger.current = element;
    setOpen(true);
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;

    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    title.current?.focus({ preventScroll: true });

    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      const returnTo = trigger.current?.isConnected
        ? trigger.current
        : document.querySelector<HTMLButtonElement>("header button[aria-expanded]");
      returnTo?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <VisitContext.Provider value={openVisit}>
      {children}
      <dialog
        ref={dialog}
        id="visit-dialog"
        aria-labelledby="visit-dialog-title"
        aria-describedby="visit-dialog-description"
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-[1.75rem] border-0 bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/75 backdrop:backdrop-blur-sm"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            setOpen(false);
          }
        }}
      >
        <div className="sticky top-0 z-10 flex justify-end bg-paper/95 px-4 pt-4 backdrop-blur sm:px-6">
          <button
            type="button"
            aria-label="Close visit form"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>
        </div>
        <div className="px-6 pb-8 sm:px-10 sm:pb-10">
          <p className="eyebrow text-royal">Sundays · 10:00 AM · Lula, GA</p>
          <h2 ref={title} id="visit-dialog-title" tabIndex={-1} className="display mt-3 text-4xl outline-none sm:text-5xl">
            Plan your visit.
          </h2>
          <p id="visit-dialog-description" className="mb-7 mt-4 leading-relaxed text-mute">
            Tell us who’s coming. Our team will help you feel at home, and you can share your kids’ details before Sunday.
          </p>
          {open && <VisitForm />}
        </div>
      </dialog>
    </VisitContext.Provider>
  );
}

export function VisitButton({ children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const openVisit = useContext(VisitContext);
  if (!openVisit) throw new Error("VisitButton must be inside VisitDialogProvider.");

  return (
    <button
      {...props}
      type="button"
      aria-haspopup="dialog"
      aria-controls="visit-dialog"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openVisit(event.currentTarget);
      }}
    >
      {children}
    </button>
  );
}
