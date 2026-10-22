/**
 * Sample exam for active_quiz_session_wave_mechanics_midterm. There's no
 * quiz-attempt backend yet (no persistence, timing, flags, or proctoring —
 * see pending-backend-work.md), so the whole session lives in local
 * component state. Trimmed from the mock's "45 questions" to 12 — enough to
 * exercise the palette/filter/navigation UX without hand-authoring 45 fake
 * physics problems.
 */

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizSessionQuestion {
  id: number;
  section: string;
  points: number;
  type: string;
  prompt: string;
  subPrompt?: string;
  options: QuizOption[];
}

export const SESSION_META = {
  courseCode: "PHYS-402",
  title: "Wave Mechanics Midterm",
  durationSeconds: 48 * 60 + 22,
};

export const SESSION_QUESTIONS: QuizSessionQuestion[] = [
  {
    id: 1,
    section: "Section B: Resonance & Doppler",
    points: 4,
    type: "Single Choice",
    prompt:
      "An observer moves directly toward a stationary sound source emitting a constant frequency of f₀ = 680 Hz with a speed of v_o = 34 m/s.",
    subPrompt:
      "Assuming the ambient air is still and the speed of acoustic propagation in air is 340 m/s, what is the apparent frequency f' recorded by the moving observer?",
    options: [
      { id: "A", text: "612 Hz" },
      { id: "B", text: "748 Hz" },
      { id: "C", text: "714 Hz" },
      { id: "D", text: "800 Hz" },
    ],
  },
  {
    id: 2,
    section: "Section A: Wave Fundamentals",
    points: 3,
    type: "Single Choice",
    prompt: "A wave has a wavelength of 2.5 m and travels at 340 m/s. What is its frequency?",
    options: [
      { id: "A", text: "85 Hz" },
      { id: "B", text: "136 Hz" },
      { id: "C", text: "850 Hz" },
      { id: "D", text: "34 Hz" },
    ],
  },
  {
    id: 3,
    section: "Section A: Wave Fundamentals",
    points: 3,
    type: "Single Choice",
    prompt: "Which of the following best describes a transverse wave?",
    options: [
      { id: "A", text: "Particle motion is parallel to wave propagation" },
      { id: "B", text: "Particle motion is perpendicular to wave propagation" },
      { id: "C", text: "The wave cannot travel through a vacuum" },
      { id: "D", text: "The wave has no measurable amplitude" },
    ],
  },
  {
    id: 4,
    section: "Section B: Resonance & Doppler",
    points: 5,
    type: "Single Choice",
    prompt: "A source moves away from a stationary observer at 20 m/s, emitting a 500 Hz tone (v_sound = 340 m/s).",
    subPrompt: "What frequency does the observer hear?",
    options: [
      { id: "A", text: "472 Hz" },
      { id: "B", text: "531 Hz" },
      { id: "C", text: "500 Hz" },
      { id: "D", text: "460 Hz" },
    ],
  },
  {
    id: 5,
    section: "Section C: Standing Waves",
    points: 4,
    type: "Single Choice",
    prompt: "A string fixed at both ends resonates in its third harmonic. How many nodes does it have, including the endpoints?",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "4" },
      { id: "D", text: "5" },
    ],
  },
  {
    id: 6,
    section: "Section C: Standing Waves",
    points: 4,
    type: "Single Choice",
    prompt: "A pipe closed at one end has a length of 0.85 m. What is the wavelength of its fundamental frequency?",
    options: [
      { id: "A", text: "0.85 m" },
      { id: "B", text: "1.70 m" },
      { id: "C", text: "3.40 m" },
      { id: "D", text: "0.425 m" },
    ],
  },
  {
    id: 7,
    section: "Section B: Resonance & Doppler",
    points: 4,
    type: "Single Choice",
    prompt: "Which condition produces a sonic boom?",
    options: [
      { id: "A", text: "Source speed equals wave speed" },
      { id: "B", text: "Source speed exceeds wave speed" },
      { id: "C", text: "Observer speed exceeds wave speed" },
      { id: "D", text: "Source and observer are stationary" },
    ],
  },
  {
    id: 8,
    section: "Section A: Wave Fundamentals",
    points: 3,
    type: "Single Choice",
    prompt: "Doubling the amplitude of a wave affects its intensity by what factor?",
    options: [
      { id: "A", text: "2×" },
      { id: "B", text: "4×" },
      { id: "C", text: "8×" },
      { id: "D", text: "No change" },
    ],
  },
  {
    id: 9,
    section: "Section D: Superposition",
    points: 5,
    type: "Single Choice",
    prompt: "Two waves of equal amplitude and frequency arrive exactly out of phase at a point. What is the result?",
    options: [
      { id: "A", text: "Constructive interference, double amplitude" },
      { id: "B", text: "Destructive interference, zero amplitude" },
      { id: "C", text: "Beat frequency equal to their difference" },
      { id: "D", text: "No interference occurs" },
    ],
  },
  {
    id: 10,
    section: "Section D: Superposition",
    points: 4,
    type: "Single Choice",
    prompt: "Two tuning forks of 440 Hz and 444 Hz are struck together. What beat frequency is heard?",
    options: [
      { id: "A", text: "0 Hz" },
      { id: "B", text: "2 Hz" },
      { id: "C", text: "4 Hz" },
      { id: "D", text: "442 Hz" },
    ],
  },
  {
    id: 11,
    section: "Section C: Standing Waves",
    points: 3,
    type: "Single Choice",
    prompt: "At an antinode of a standing wave, the displacement amplitude is:",
    options: [
      { id: "A", text: "Zero at all times" },
      { id: "B", text: "At its maximum" },
      { id: "C", text: "Equal to the node spacing" },
      { id: "D", text: "Undefined" },
    ],
  },
  {
    id: 12,
    section: "Section B: Resonance & Doppler",
    points: 4,
    type: "Single Choice",
    prompt: "An ambulance siren at 700 Hz approaches you at 30 m/s while you stand still (v_sound = 340 m/s).",
    subPrompt: "What frequency do you hear as it approaches?",
    options: [
      { id: "A", text: "637 Hz" },
      { id: "B", text: "768 Hz" },
      { id: "C", text: "700 Hz" },
      { id: "D", text: "730 Hz" },
    ],
  },
];
