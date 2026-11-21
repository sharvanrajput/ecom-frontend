"use client";

import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState("signup");
  const [message, setMessage] = useState("");
  const isSignUp = mode === "signup";

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Authentication is not connected yet. Please try again later.");
  };

  return (
    <section className="bg-[#f8f6f2] px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.28)] lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#253b35] p-8 text-white sm:flex lg:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-20 size-96 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-4 size-64 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-24 size-80 rounded-full bg-[#d49a66]/15 blur-2xl"
          />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e2bd98]">
              Everyday, elevated
            </p>
            <h2 className="mt-8 max-w-sm text-4xl font-medium leading-tight tracking-tight lg:text-5xl">
              Find your next favorite thing.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-white/70">
              Thoughtful pieces, easy shopping, and a little something special
              in every order.
            </p>
          </div>

          <div className="relative mt-10 rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm">
            <p className="text-sm leading-6 text-white/85">
              “The little details make all the difference. I found pieces I
              reach for every day.”
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#e2bd98]">
              A note from our community
            </p>
          </div>
        </aside>

        <div className="flex items-center justify-center px-5 py-6 sm:px-10 sm:py-8 lg:px-14">
          <div className="w-full max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              Your account
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isSignUp
                ? "Sign up to make your next find a little easier."
                : "Sign in to pick up where you left off."}
            </p>

            <div
              aria-label="Choose account option"
              className="mt-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1"
              role="tablist"
            >
              <button
                aria-selected={isSignUp}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isSignUp
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                id="signup-tab"
                onClick={() => {
                  setMode("signup");
                  setMessage("");
                }}
                role="tab"
                type="button"
              >
                Sign up
              </button>
              <button
                aria-selected={!isSignUp}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  !isSignUp
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                id="login-tab"
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
                role="tab"
                type="button"
              >
                Sign in
              </button>
            </div>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              {isSignUp && (
                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    autoComplete="name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    type="text"
                  />
                </div>
              )}

              <div>
                <label
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  id="password"
                  minLength={8}
                  name="password"
                  placeholder="At least 8 characters"
                  required
                  type="password"
                />
              </div>

              <button
                className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
                type="submit"
              >
                {isSignUp ? "Create account" : "Sign in"}
              </button>
            </form>

            <div className="my-4 flex items-center gap-4">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Or continue with
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              onClick={() =>
                setMessage("Google sign-in is not configured yet.")
              }
              type="button"
            >
              <svg
                aria-hidden="true"
                className="size-5"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  transform="translate(0 3)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 38.05 46.98 31.97 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
                  transform="translate(0 3)"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.9 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  transform="translate(0 -3)"
                />
              </svg>
              Continue with Google
            </button>

            <p aria-live="polite" className="mt-3 min-h-5 text-center text-sm text-slate-600">
              {message}
            </p>

            <p className="mt-2 text-center text-xs leading-5 text-slate-500">
              By continuing, you agree to our terms and acknowledge our privacy
              policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
