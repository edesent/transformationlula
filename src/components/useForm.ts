"use client";

import { useCallback, useEffect, useState } from "react";

export type FormKind = "contact" | "visit" | "volunteer";

/** Fetches a signed load-time token and posts a form to /api/form. */
export function useForm(kind: FormKind) {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/form", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setToken(d.token ?? ""))
      .catch(() => {});
  }, []);

  const submit = useCallback(
    async (fields: Record<string, unknown>) => {
      setStatus("sending");
      setError("");
      try {
        let formToken = token;
        if (!formToken || Date.now() - Number(formToken.split(".")[0]) > 6 * 60 * 60 * 1000) {
          const response = await fetch("/api/form", { cache: "no-store" });
          if (!response.ok) throw new Error("Could not prepare the form.");
          const data = await response.json();
          if (typeof data.token !== "string") throw new Error("Could not prepare the form.");
          formToken = data.token;
          setToken(formToken);
        }
        // Autofill can complete the form before the signed anti-spam token is ready.
        const wait = Number(formToken.split(".")[0]) + 3100 - Date.now();
        if (wait > 0 && wait <= 3100) await new Promise((resolve) => setTimeout(resolve, wait));

        const res = await fetch("/api/form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...fields, kind, token: formToken }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data.error || "Something went wrong. Please call Pastor Mike.");
          setStatus("error");
          return;
        }
        setStatus("sent");
      } catch {
        setError("We couldn’t reach the server. Please call Pastor Mike.");
        setStatus("error");
      }
    },
    [kind, token],
  );

  return { submit, status, error };
}
