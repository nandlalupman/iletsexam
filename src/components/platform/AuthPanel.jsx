"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserSupabaseClient, isSupabaseConfigured } from "@/lib/supabase-browser";
import { loginSchema, signupSchema } from "@/lib/validators";

const initialLoginForm = { email: "", password: "" };
const initialSignupForm = { fullName: "", phone: "", email: "", password: "" };

export default function AuthPanel({ mode = "login" }) {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [signupFormState, setSignupFormState] = useState(initialSignupForm);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      if (mode === "signup") {
        const payload = signupSchema.parse(signupFormState);
        const supabase = createBrowserSupabaseClient();

        if (!supabase) {
          setMessage("Configure Supabase env vars before creating accounts.");
          return;
        }

        setIsLoading(true);
        const { error } = await supabase.auth.signUp({
          email: payload.email,
          password: payload.password,
          options: {
            data: {
              full_name: payload.fullName,
              phone: payload.phone,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });

        if (error) {
          throw error;
        }

        setMessage("Account created. Redirecting to your dashboard.");
        router.push("/dashboard");
        router.refresh();
        return;
      }

      const payload = loginSchema.parse(loginForm);
      const supabase = createBrowserSupabaseClient();

      if (!supabase) {
        setMessage("Configure Supabase env vars before logging in.");
        return;
      }

      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword(payload);

      if (error) {
        throw error;
      }

      const profileResponse = await fetch("/api/auth/me");
      const profilePayload = profileResponse.ok ? await profileResponse.json() : null;
      const destination = profilePayload?.user?.role === "admin" ? "/admin" : "/dashboard";

      router.push(destination);
      router.refresh();
    } catch (error) {
      setMessage(error.message || "Unable to continue.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword() {
    const supabase = createBrowserSupabaseClient();
    if (!supabase || !loginForm.email) {
      setMessage("Enter your email first. Supabase is required for password reset.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(loginForm.email, {
      redirectTo: `${window.location.origin}/login`,
    });

    setMessage(error ? error.message : "Password reset email sent.");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="surface-card rounded-[32px] p-8 lg:p-10">
        <p className="gold-chip">Premium IELTS Platform</p>
        <h1 className="mt-6 text-5xl font-extrabold text-white">
          Move from coached practice to measurable band score gains.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-[#96a7c5]">
          IELTS.my now extends beyond the landing page. Students get structured drills, timed mock tests,
          streak tracking, and detailed review. Admins manage leads, content, tests, and SEO from the same stack.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "6 Band Guarantee", helper: "30-day intensive path" },
            { label: "Reading MVP Live", helper: "Timer + score popup" },
            { label: "Admin Layer", helper: "Leads and content control" },
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-2 text-sm text-[#7a8aaa]">{item.helper}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card rounded-[32px] p-8 lg:p-10">
        <div className="mb-8 flex rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] p-1">
          <Link
            href="/login"
            className={`flex-1 rounded-full px-4 py-3 text-center text-sm font-semibold transition ${
              mode === "login" ? "bg-[#f5c842] text-[#081023]" : "text-[#b7c5de]"
            }`}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={`flex-1 rounded-full px-4 py-3 text-center text-sm font-semibold transition ${
              mode === "signup" ? "bg-[#f5c842] text-[#081023]" : "text-[#b7c5de]"
            }`}
          >
            Sign up
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" ? (
            <>
              <div>
                <label className="mb-2 block text-sm text-[#c9d5eb]">Full name</label>
                <input
                  type="text"
                  className="input-shell"
                  value={signupFormState.fullName}
                  onChange={(event) => setSignupFormState((current) => ({ ...current, fullName: event.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#c9d5eb]">Phone number</label>
                <input
                  type="tel"
                  className="input-shell"
                  value={signupFormState.phone}
                  onChange={(event) => setSignupFormState((current) => ({ ...current, phone: event.target.value }))}
                  placeholder="+91 98765 43210"
                />
              </div>
            </>
          ) : null}

          <div>
            <label className="mb-2 block text-sm text-[#c9d5eb]">Email</label>
            <input
              type="email"
              className="input-shell"
              value={mode === "signup" ? signupFormState.email : loginForm.email}
              onChange={(event) =>
                mode === "signup"
                  ? setSignupFormState((current) => ({ ...current, email: event.target.value }))
                  : setLoginForm((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[#c9d5eb]">Password</label>
            <input
              type="password"
              className="input-shell"
              value={mode === "signup" ? signupFormState.password : loginForm.password}
              onChange={(event) =>
                mode === "signup"
                  ? setSignupFormState((current) => ({ ...current, password: event.target.value }))
                  : setLoginForm((current) => ({ ...current, password: event.target.value }))
              }
              placeholder="Minimum 8 characters"
            />
          </div>

          <button type="submit" className="btn-primary w-full" disabled={isLoading}>
            {isLoading ? "Please wait..." : mode === "signup" ? "Create account" : "Login"}
          </button>
        </form>

        {mode === "signup" ? (
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[#d0d9ec]">
            Phone number is mandatory for every new student account.
          </div>
        ) : null}

        {mode === "login" ? (
          <button type="button" onClick={handleResetPassword} className="mt-4 text-sm text-[#f5c842]">
            Forgot password?
          </button>
        ) : null}

        {message ? (
          <div className="mt-6 rounded-2xl border border-[rgba(245,200,66,0.18)] bg-[rgba(245,200,66,0.08)] p-4 text-sm text-[#f4e2a6]">
            {message}
          </div>
        ) : null}

        {!isSupabaseConfigured() ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[#d0d9ec]">
            Add your Supabase URL and anon key to enable live signup and login.
          </div>
        ) : null}
      </div>
    </div>
  );
}
