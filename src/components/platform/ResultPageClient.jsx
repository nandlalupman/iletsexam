"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const fallback = {
  attemptId: "demo-reading-foundations",
  title: "Academic Reading Mock 01",
  section: "Reading",
  correctCount: 16,
  totalObjective: 24,
  bandScore: "6.0",
  reviewed: [],
  essayFeedback: "Focus on evidence tracking. Most band gains at this level come from better control of paraphrases and more disciplined elimination in True/False/Not Given items.",
};

export default function ResultPageClient({ attemptId, initialResult }) {
  const [result, setResult] = useState(initialResult || fallback);

  useEffect(() => {
    const raw = sessionStorage.getItem(`ielts-result:${attemptId}`);
    if (raw) {
      setResult(JSON.parse(raw));
    }
  }, [attemptId]);

  return (
    <div className="space-y-6">
      <div className="metric-card">
        <p className="muted-label">Result ready</p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-4xl font-extrabold text-white">{result.bandScore}</h2>
            <p className="mt-2 text-sm text-[#8ea1c1]">
              {result.correctCount} of {result.totalObjective} objective answers correct
            </p>
          </div>
          <Link href="/tests" className="btn-secondary">
            Back to tests
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="surface-card rounded-[32px] p-6">
          <h3 className="text-2xl font-bold text-white">Coach note</h3>
          <p className="mt-4 text-sm leading-7 text-[#c4d0e7]">{result.essayFeedback}</p>
        </div>
        <div className="surface-card rounded-[32px] p-6">
          <h3 className="text-2xl font-bold text-white">Answer review</h3>
          <div className="mt-5 space-y-4">
            {result.reviewed?.length ? (
              result.reviewed.map((item) => (
                <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-white">{item.prompt}</p>
                    <span className={`text-xs font-semibold ${item.isCorrect ? "text-[#2dd4bf]" : "text-[#fb7185]"}`}>
                      {item.isCorrect ? "Correct" : "Review"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[#8ea1c1]">Your answer: {item.submitted || "No answer"}</p>
                  <p className="mt-2 text-sm text-[#f5c842]">Correct answer: {item.correctAnswer}</p>
                  <p className="mt-3 text-sm leading-7 text-[#d8e0f2]">{item.explanation}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#8ea1c1]">
                Submit the Reading test in this browser tab to populate detailed review items here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
