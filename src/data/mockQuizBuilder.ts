/**
 * Sample quiz for quiz_builder_authoring_studio. There's no structured
 * quiz-question model in the backend yet — today's `/quiz` endpoint only
 * returns an ephemeral generated set, nothing stored or editable (see
 * pending-backend-work.md). Everything here is local component state: fully
 * editable in the browser, nothing persists on reload.
 */

export type QuestionType = "mcq" | "multi" | "numerical" | "short" | "latex";

export const QUESTION_TYPES: { id: QuestionType; label: string; icon: string }[] = [
  { id: "mcq", label: "Multiple Choice", icon: "radio_button_checked" },
  { id: "multi", label: "Multi-Select", icon: "check_box" },
  { id: "numerical", label: "Numerical", icon: "pin" },
  { id: "short", label: "Short Answer", icon: "notes" },
  { id: "latex", label: "LaTeX", icon: "code" },
];

export interface AnswerOption {
  id: string;
  text: string;
  rationale?: string;
}

export interface BuilderQuestion {
  id: string;
  type: QuestionType;
  typeLabel: string;
  points: number;
  difficulty?: string;
  stem: string;
  latexPreview?: string;
  mediaFilename?: string;
  options: AnswerOption[];
  correctOptionId?: string;
  correctRationale?: string;
  acceptedAnswer?: string;
}

export const INITIAL_QUESTIONS: BuilderQuestion[] = [
  {
    id: "q1",
    type: "mcq",
    typeLabel: "MCQ",
    points: 4,
    stem: "A pendulum of length 2m swings with a period T. What is T, assuming g = 9.8 m/s²?",
    options: [
      { id: "a", text: "2.84 s" },
      { id: "b", text: "4.01 s" },
      { id: "c", text: "1.42 s" },
      { id: "d", text: "6.28 s" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q2",
    type: "mcq",
    typeLabel: "MCQ",
    points: 4,
    stem: "Which property of a wave remains unchanged when it passes from one medium to another?",
    options: [
      { id: "a", text: "Wavelength" },
      { id: "b", text: "Frequency" },
      { id: "c", text: "Speed" },
      { id: "d", text: "Amplitude" },
    ],
    correctOptionId: "b",
  },
  {
    id: "q3",
    type: "mcq",
    typeLabel: "MCQ",
    points: 5,
    difficulty: "Moderate",
    stem: "A transverse sinusoidal wave travels along a taut string with linear mass density μ = 0.045 kg/m and tension T = 180 N. If the frequency f = 25 Hz, determine the wavelength λ and the phase velocity v.",
    latexPreview: "v = √( T / μ ) = √( 180 / 0.045 ) = 63.25 m/s",
    mediaFilename: "wave_reflection_boundary.png",
    options: [
      { id: "a", text: "λ = 1.82 m, v = 45.0 m/s", rationale: "Common slip: tension inverted calculation error" },
      { id: "b", text: "λ = 2.53 m, v = 63.25 m/s" },
      { id: "c", text: "λ = 3.10 m, v = 77.5 m/s" },
      { id: "d", text: "λ = 0.98 m, v = 24.5 m/s" },
    ],
    correctOptionId: "b",
    correctRationale: "Phase velocity v = √(T/μ) gives 63.25 m/s. Wavelength λ = v/f = 63.25 / 25 = 2.53 m.",
  },
  {
    id: "q4",
    type: "numerical",
    typeLabel: "Numerical",
    points: 6,
    stem: "A spring with constant k = 250 N/m is stretched 0.12 m. Calculate the elastic potential energy stored, in joules.",
    acceptedAnswer: "1.8",
    options: [],
  },
  {
    id: "q5",
    type: "short",
    typeLabel: "Short Ans",
    points: 8,
    stem: "Explain why the speed of a wave on a string depends on tension and linear mass density, but not on frequency.",
    acceptedAnswer: "Grading note: look for reference to v = √(T/μ) being independent of f, and f·λ = v adjusting λ instead.",
    options: [],
  },
];
