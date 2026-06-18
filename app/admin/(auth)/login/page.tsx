"use client";

import { useEffect, useRef, useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          padding: "40px 36px",
          borderRadius: 16,
          border: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 800,
            fontSize: 24,
            color: "var(--foreground)",
            marginBottom: 8,
            letterSpacing: "-0.02em",
          }}
        >
          Admin
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "var(--muted)",
            marginBottom: 28,
          }}
        >
          Portfolio CMS
        </p>

        <LoginForm inputRef={ref} />
      </div>
    </div>
  );
}

function LoginForm({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form
      action={formAction}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <input
        ref={inputRef}
        type="password"
        name="password"
        placeholder="Password"
        required
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 14,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--background)",
          color: "var(--foreground)",
          outline: "none",
          width: "100%",
        }}
      />

      {state?.error && (
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "#ef4444",
          }}
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          fontSize: 14,
          padding: "11px 20px",
          borderRadius: 10,
          border: "none",
          background: "var(--foreground)",
          color: "var(--background)",
          cursor: pending ? "not-allowed" : "pointer",
          opacity: pending ? 0.7 : 1,
        }}
      >
        {pending ? "..." : "Masuk →"}
      </button>
    </form>
  );
}
