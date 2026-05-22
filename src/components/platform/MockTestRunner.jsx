"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { signupSchema } from "@/lib/validators";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function ScorePopup({ result, onReview, onClose }) {
  if (!result) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(6,13,31,0.82)] p-4 backdrop-blur">
      <div className="surface-card w-full max-w-lg rounded-[32px] p-8 text-center">
        <p className="gold-chip">View your score</p>
        <h3 className="mt-5 text-4xl font-extrabold text-white">{result.bandScore}</h3>
        <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[#7a8aaa]">Estimated IELTS Band</p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#7a8aaa]">Correct</p>
            <p className="mt-2 text-2xl font-bold text-[#f5c842]">{result.correctCount}</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#7a8aaa]">Review Items</p>
            <p className="mt-2 text-2xl font-bold text-white">{result.totalObjective - result.correctCount}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onReview} className="btn-primary flex-1">
            Review result
          </button>
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            Stay here
          </button>
        </div>
      </div>
    </div>
  );
}

function SignupGate({ isOpen, form, onChange, onSubmit, message, isLoading }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(6,13,31,0.88)] p-4 backdrop-blur">
      <div className="surface-card w-full max-w-xl rounded-[32px] p-8">
        <p className="gold-chip">Unlock your result</p>
        <h3 className="mt-5 text-3xl font-extrabold text-white">Create your account to see the score</h3>
        <p className="mt-3 text-sm leading-7 text-[#9fb0cd]">
          We require a phone number for every student profile. Create your account now and the result will open immediately after signup.
        </p>

        <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-[#c9d5eb]">Full name</label>
            <input
              type="text"
              className="input-shell"
              value={form.fullName}
              onChange={(event) => onChange("fullName", event.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[#c9d5eb]">Phone number</label>
            <input
              type="tel"
              className="input-shell"
              value={form.phone}
              onChange={(event) => onChange("phone", event.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[#c9d5eb]">Email</label>
            <input
              type="email"
              className="input-shell"
              value={form.email}
              onChange={(event) => onChange("email", event.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-[#c9d5eb]">Password</label>
            <input
              type="password"
              className="input-shell"
              value={form.password}
              onChange={(event) => onChange("password", event.target.value)}
              placeholder="Minimum 8 characters"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn-primary flex-1" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account and show result"}
            </button>
          </div>
        </form>

        {message ? (
          <div className="mt-5 rounded-2xl border border-[rgba(245,200,66,0.18)] bg-[rgba(245,200,66,0.08)] p-4 text-sm text-[#f4e2a6]">
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function MockTestRunner({ test }) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(test.durationMinutes * 60);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [pendingResult, setPendingResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [gateMessage, setGateMessage] = useState("");
  const [isGateSubmitting, setIsGateSubmitting] = useState(false);
  const [gateForm, setGateForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function detectAccess() {
      const supabase = createBrowserSupabaseClient();
      if (!supabase || !isMounted) {
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (data.session && isMounted) {
        setHasAccess(true);
        setGateForm((current) => ({
          ...current,
          email: data.session.user.email || "",
          fullName: data.session.user.user_metadata?.full_name || "",
          phone: data.session.user.user_metadata?.phone || "",
        }));
      }
    }

    detectAccess();
    return () => {
      isMounted = false;
    };
  }, []);

  const objectiveCount = useMemo(
    () => test.questions.length,
    [test.questions],
  );
  const sections = useMemo(
    () =>
      test.sections?.map((section) => ({
        ...section,
        questions: test.questions.filter((question) => question.sectionId === section.id),
      })) || [],
    [test.questions, test.sections],
  );

  function setAnswer(questionId, value) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  function updateGateField(key, value) {
    setGateForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/tests/${test.slug}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to score test.");
      }

      sessionStorage.setItem(`ielts-result:${payload.result.attemptId}`, JSON.stringify(payload.result));
      if (hasAccess) {
        setResult(payload.result);
      } else {
        setPendingResult(payload.result);
        setIsGateOpen(true);
      }
    } catch (error) {
      const fallbackResult = {
        bandScore: "0.0",
        correctCount: 0,
        totalObjective: objectiveCount,
        attemptId: "demo-reading-foundations",
      };
      if (hasAccess) {
        setResult(fallbackResult);
      } else {
        setPendingResult(fallbackResult);
        setIsGateOpen(true);
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGateSubmit(event) {
    event.preventDefault();
    setGateMessage("");

    try {
      const payload = signupSchema.parse(gateForm);
      const supabase = createBrowserSupabaseClient();

      setIsGateSubmitting(true);

      if (supabase) {
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
      } else {
        throw new Error("Configure Supabase before unlocking results.");
      }

      setHasAccess(true);
      setIsGateOpen(false);
      setGateMessage("");
      if (pendingResult) {
        setResult(pendingResult);
      }
    } catch (error) {
      setGateMessage(error.message || "Unable to create account.");
    } finally {
      setIsGateSubmitting(false);
    }
  }

  return (
    <>
      <div className="surface-card rounded-[32px] p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="muted-label">{test.section} timed section</p>
            <h2 className="mt-2 text-2xl font-bold text-white">{test.title}</h2>
            <p className="mt-2 text-sm text-[#91a4c5]">
              {test.level} • {test.durationMinutes} minutes • {objectiveCount} questions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[rgba(245,200,66,0.24)] bg-[rgba(245,200,66,0.08)] px-4 py-2 text-sm font-semibold text-[#f5c842]">
              {formatTime(timeLeft)}
            </div>
            <button type="button" onClick={handleSubmit} className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Scoring..." : "Submit"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <section className="surface-card rounded-[32px] p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <p className="gold-chip">{section.title}</p>
                <span className="text-xs uppercase tracking-[0.22em] text-[#7a8aaa]">{section.passageTitle}</span>
              </div>
              <p className="mt-5 text-sm text-[#9eb0cc]">{section.instructions}</p>
              <div className="mt-6 space-y-5 text-sm leading-8 text-[#d4ddf1]">
                {section.passage.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="surface-card rounded-[32px] p-6 lg:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="muted-label">Questions</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {section.questions.length} prompts
                  </h3>
                </div>
                <p className="text-sm text-[#7a8aaa]">
                  Questions {test.questions.findIndex((item) => item.id === section.questionIds[0]) + 1}-
                  {test.questions.findIndex((item) => item.id === section.questionIds.at(-1)) + 1}
                </p>
              </div>

              <div className="space-y-5">
                {section.questions.map((question) => {
                  const questionNumber = test.questions.findIndex((item) => item.id === question.id) + 1;

                  return (
                    <div key={question.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(245,200,66,0.16)] text-sm font-bold text-[#f5c842]">
                          {questionNumber}
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-[#7a8aaa]">{question.type}</p>
                          <h4 className="mt-2 text-base font-semibold text-white">{question.prompt}</h4>
                        </div>
                      </div>

                      {question.type === "mcq" || question.type === "tfng" ? (
                        <div className="grid gap-3">
                          {question.options.map((option) => (
                            <label
                              key={option}
                              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-[#d7dff2]"
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                checked={answers[question.id] === option}
                                onChange={(event) => setAnswer(question.id, event.target.value)}
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : null}

                      {question.type === "fill" || question.type === "short" ? (
                        <input
                          type="text"
                          className="input-shell"
                          value={answers[question.id] || ""}
                          onChange={(event) => setAnswer(question.id, event.target.value)}
                          placeholder="Type your answer"
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        ))}
      </div>

      <SignupGate
        isOpen={isGateOpen}
        form={gateForm}
        onChange={updateGateField}
        onSubmit={handleGateSubmit}
        message={gateMessage}
        isLoading={isGateSubmitting}
      />

      <ScorePopup
        result={result}
        onClose={() => setResult(null)}
        onReview={() => router.push(`/results/${result?.attemptId}`)}
      />
    </>
  );
}
