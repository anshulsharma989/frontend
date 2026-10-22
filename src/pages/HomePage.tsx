import { useEffect, useState } from "react";
import { getGrades } from "../api";
import { AdminMockupCard } from "../components/home/AdminMockupCard";
import { ChatMockupCard } from "../components/home/ChatMockupCard";
import { FaqSection } from "../components/home/FaqSection";
import { FeatureSection } from "../components/home/FeatureSection";
import { HomeFooter } from "../components/home/HomeFooter";
import { HomeNav } from "../components/home/HomeNav";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { RoadmapSection } from "../components/home/RoadmapSection";
import { brand } from "../config/brand";
import { Icon } from "../components/ui/Icon";

interface HomePageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function HomePage({ onLogin, onSignup }: HomePageProps) {
  const [gradeCount, setGradeCount] = useState<number | null>(null);

  useEffect(() => {
    getGrades()
      .then((grades) => setGradeCount(grades.length))
      .catch(() => {});
  }, []);

  return (
    <div className="scroll-smooth bg-background text-on-background">
      <HomeNav onLogin={onLogin} onSignup={onSignup} />

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-space-xl px-space-lg py-space-xl text-center sm:py-24">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          AI-powered learning platform
        </span>
        <h1 className="max-w-3xl font-headline text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
          Turn your school's textbooks into an AI tutor
        </h1>
        <p className="max-w-xl text-lg text-on-surface-variant">
          {brand.name} brings your curriculum into one place — students ask questions and get cited answers, admins
          manage content and access, all grounded in your own books.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-space-sm">
          <button
            type="button"
            onClick={onSignup}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-container via-primary to-secondary px-6 py-3 text-sm font-bold text-on-primary shadow-[0_0_20px_rgba(160,120,255,0.35)] transition-transform active:scale-[0.98]"
          >
            Get started
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
          <a
            href="#how-it-works"
            className="rounded-xl bg-surface-container-high px-6 py-3 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-highest"
          >
            See how it works
          </a>
        </div>
        {gradeCount !== null && gradeCount > 0 && (
          <p className="text-xs text-on-surface-variant">
            <span className="font-code font-semibold text-secondary">{gradeCount}</span> grade levels already set up
            and ready for questions.
          </p>
        )}

        <ChatMockupCard />
      </section>

      <HowItWorksSection />

      <FeatureSection
        id="students"
        eyebrow="For students"
        title="Ask your books anything"
        description="No more flipping through chapters looking for one answer. Ask in plain English or Hindi and get a streaming, cited response — then practice with an instantly generated quiz."
        bullets={[
          "Streaming answers with page citations",
          "Works in English and Hindi, follow-up questions understood in context",
          "Generate multiple-choice quizzes from the same material",
        ]}
        visual={<ChatMockupCard />}
      />

      <FeatureSection
        id="admins"
        eyebrow="For admins"
        title="Manage content without the busywork"
        description="Upload books once, organize by grade and subject, and approve new student accounts — all from one screen."
        bullets={[
          "Upload PDFs, docs, and scanned books for any grade/subject",
          "Live ingestion status as books get indexed",
          "Approve or reject new student sign-ups",
        ]}
        visual={<AdminMockupCard />}
        reverse
      />

      <RoadmapSection />
      <FaqSection />
      <HomeFooter onLogin={onLogin} onSignup={onSignup} />
    </div>
  );
}
