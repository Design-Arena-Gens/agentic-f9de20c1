"use client";

import { motion } from "framer-motion";
import {
  format,
  isValid as isValidDate,
  parseISO
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import type { AgeInsights } from "@/lib/age";
import { calculateAgeInsights } from "@/lib/age";

const heroStats = [
  { label: "Precision breakdown", value: "Seconds to centuries" },
  { label: "Cosmic milestones", value: "Celebrate every orbit" },
  { label: "Dynamic insights", value: "Live age tracking" }
];

export function AgeCalculator() {
  const [birthDateInput, setBirthDateInput] = useState<string>("");
  const [referenceInput, setReferenceInput] = useState<string>(() =>
    new Date().toISOString().split("T")[0]
  );
  const [liveMode, setLiveMode] = useState(true);
  const [currentMoment, setCurrentMoment] = useState<Date>(() => new Date());

  useEffect(() => {
    if (!liveMode) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentMoment(new Date());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [liveMode]);

  const insights = useMemo<AgeInsights | null>(() => {
    if (!birthDateInput) {
      return null;
    }

    const birth = parseISO(birthDateInput);
    if (!isValidDate(birth)) {
      return null;
    }

    const reference = liveMode
      ? currentMoment
      : parseISO(referenceInput || new Date().toISOString().split("T")[0]);

    if (!isValidDate(reference)) {
      return null;
    }

    return calculateAgeInsights(birth, reference);
  }, [birthDateInput, referenceInput, liveMode, currentMoment]);

  return (
    <div className="relative isolate overflow-hidden">
      <div className="grid-overlay absolute inset-0" />
      <div className="absolute top-[20%] left-[10%] h-72 w-72 rounded-full bg-gradient-to-br from-aurora-400/30 to-transparent blur-3xl" />
      <div className="absolute bottom-[15%] right-[10%] h-80 w-80 rounded-full bg-gradient-to-tr from-aurora-200/25 to-transparent blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 pb-24 pt-24 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="glass-panel relative overflow-hidden rounded-3xl p-10 shadow-2xl"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-aurora-500/40 bg-aurora-500/10 px-4 py-1 text-sm font-medium text-aurora-200 backdrop-blur">
                ✦ Celestial Age Navigator
              </span>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Decode your age with{" "}
                <span className="bg-gradient-to-r from-aurora-200 via-aurora-400 to-white bg-clip-text text-transparent">
                  captivating precision
                </span>
              </h1>
              <p className="max-w-xl text-lg text-aurora-200/80">
                Enter your birth moment to reveal a vivid timeline of your life
                so far — from total seconds lived to the next cosmic milestone
                on your journey around the sun.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-aurora-200/60">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-sm text-white/90">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
            >
              <h2 className="text-lg font-semibold text-white/90">
                Begin the calculation
              </h2>
              <p className="mt-1 text-sm text-aurora-200/75">
                Provide your birth date and optionally lock a reference moment.
              </p>
              <div className="mt-6 space-y-5">
                <label className="block space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-aurora-200/60">
                    Birth date
                  </span>
                  <input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    value={birthDateInput}
                    onChange={(event) => setBirthDateInput(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-3 text-sm text-white outline-none transition focus:border-aurora-400 focus:ring-2 focus:ring-aurora-500/40"
                  />
                </label>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aurora-200/60">
                      Live mode
                    </p>
                    <p className="text-sm text-aurora-100/80">
                      {liveMode
                        ? "Reference updates every second"
                        : "Reference fixed to selected date"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLiveMode((prev) => !prev)}
                    className={`relative inline-flex h-10 w-20 items-center rounded-full border border-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight ${
                      liveMode
                        ? "bg-gradient-to-r from-aurora-400 to-aurora-600"
                        : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`inline-block h-8 w-8 transform rounded-full bg-white shadow transition ${
                        liveMode ? "translate-x-10" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {!liveMode && (
                  <label className="block space-y-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-aurora-200/60">
                      Reference date
                    </span>
                    <input
                      type="date"
                      value={referenceInput}
                      onChange={(event) => setReferenceInput(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-3 text-sm text-white outline-none transition focus:border-aurora-400 focus:ring-2 focus:ring-aurora-500/40"
                    />
                  </label>
                )}

                {birthDateInput && !insights && (
                  <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-3 py-3 text-sm text-red-200">
                    We encountered an invalid date combination. Make sure the
                    reference moment is not before the birth date.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {insights ? (
          <>
            <ResultHighlights insights={insights} />
            <DeepDiveGrid insights={insights} />
          </>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}

function ResultHighlights({ insights }: { insights: AgeInsights }) {
  const {
    age,
    nextBirthday,
    lifeProgress,
    referenceLabel
  } = insights;

  const detailItems = [
    {
      label: "Current Age",
      value: `${age.years}y ${age.months}m ${age.days}d`,
      descriptor: `Measured on ${referenceLabel}`
    },
    {
      label: "Weeks Lived",
      value: `${age.weeks.toLocaleString("en-US")}`,
      descriptor: "Each week a new chapter"
    },
    {
      label: "Next Birthday",
      value: format(nextBirthday.date, "MMMM d, yyyy"),
      descriptor: `${nextBirthday.countdown} • ${nextBirthday.weekday}`
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative grid grid-cols-1 gap-6 lg:grid-cols-12"
    >
      <div className="glass-panel relative col-span-7 rounded-3xl border border-white/10 p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative space-y-8">
          <header>
            <p className="text-sm uppercase tracking-[0.3em] text-aurora-200/60">
              Stellar snapshot
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Your age, narrated in moments
            </h2>
          </header>
          <div className="grid gap-5 sm:grid-cols-3">
            {detailItems.map((item) => (
              <div
                key={item.label}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-40" />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.25em] text-aurora-200/60">
                    {item.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white/95">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-aurora-200/80">
                    {item.descriptor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        className="glass-panel relative col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 p-8"
      >
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-aurora-200/60">
            Life expectancy tracker
          </p>
          <h3 className="text-2xl font-semibold text-white">Orbit progress</h3>
        </header>
        <div className="relative mt-4 h-3 rounded-full bg-white/10">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-aurora-300 to-aurora-600"
            style={{ width: `${lifeProgress.percentage}%` }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-aurora-200/80">
          <span>{lifeProgress.percentage.toFixed(1)}% of {lifeProgress.expectancyYears} years</span>
          <span>Projection {lifeProgress.expectancyYears}y</span>
        </div>
        <p className="mt-5 text-base text-aurora-100/90">
          {lifeProgress.summary}
        </p>
      </motion.div>
    </motion.section>
  );
}

function DeepDiveGrid({ insights }: { insights: AgeInsights }) {
  const { totals, milestones } = insights;

  const timeline = [
    {
      label: "Total months experienced",
      value: totals.totalMonths.toLocaleString("en-US"),
      descriptor: "Every lunar loop recorded"
    },
    {
      label: "Total days illuminated",
      value: totals.totalDays.toLocaleString("en-US"),
      descriptor: "Sunrises counted"
    },
    {
      label: "Hours in motion",
      value: totals.totalHours.toLocaleString("en-US"),
      descriptor: "The heartbeat of your timeline"
    },
    {
      label: "Minutes of memories",
      value: totals.totalMinutes.toLocaleString("en-US"),
      descriptor: "Every conversation, every laugh"
    },
    {
      label: "Seconds of existence",
      value: totals.totalSeconds.toLocaleString("en-US"),
      descriptor: "Measured in the tiniest beats"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-12"
    >
      <div className="glass-panel col-span-7 space-y-6 rounded-3xl border border-white/10 p-8">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-aurora-200/60">
            Timeline depth
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Every metric of your journey
          </h2>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          {timeline.map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-6"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.25em] text-aurora-200/60">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-white/95">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-aurora-100/80">
                  {item.descriptor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel col-span-5 space-y-6 rounded-3xl border border-white/10 p-8">
        <header>
          <p className="text-sm uppercase tracking-[0.3em] text-aurora-200/60">
            Upcoming milestones
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Celebrate the countdowns
          </h2>
        </header>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div
              key={milestone.label}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
            >
              <div>
                <p className="text-sm font-semibold text-white/90">
                  {milestone.label}
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-aurora-200/50">
                  {format(milestone.targetDate, "MMM d, yyyy")}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  milestone.reached
                    ? "bg-aurora-400/20 text-aurora-100"
                    : "bg-aurora-500/20 text-aurora-100"
                }`}
              >
                {milestone.countdown}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function EmptyState() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-panel relative mx-auto max-w-4xl rounded-3xl border border-dashed border-white/20 p-12 text-center"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative space-y-4">
        <p className="text-2xl font-semibold text-white/90">
          Awaiting a birth moment…
        </p>
        <p className="text-base text-aurora-200/80">
          This celestial console will unfurl once you share your first moment in
          time. We&apos;ll craft a living timeline filled with milestones and
          insights the moment you do.
        </p>
      </div>
    </motion.section>
  );
}
