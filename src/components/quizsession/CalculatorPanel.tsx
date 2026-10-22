import { useEffect, useState } from "react";

type Operator = "+" | "-" | "×" | "÷" | "^";

interface CalcState {
  display: string;
  accumulator: number | null;
  operator: Operator | null;
  waitingForOperand: boolean;
  ans: number | null;
}

const INITIAL: CalcState = { display: "0", accumulator: null, operator: null, waitingForOperand: true, ans: null };

function round(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}

function apply(op: Operator, a: number, b: number): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
    case "^":
      return Math.pow(a, b);
  }
}

const FUNCTION_ROW_1 = ["sin", "cos", "tan", "√"];
const FUNCTION_ROW_2 = ["π", "xʸ", "ANS", "DEL", "AC"];
const KEYPAD: (string | Operator)[] = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"];

interface CalculatorPanelProps {
  pendingInsert?: { value: string; nonce: number } | null;
}

export function CalculatorPanel({ pendingInsert }: CalculatorPanelProps) {
  const [state, setState] = useState<CalcState>(INITIAL);

  useEffect(() => {
    if (!pendingInsert) return;
    setState((s) => ({ ...s, display: pendingInsert.value, waitingForOperand: false }));
    // Only reacts to new insert events (nonce), not every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingInsert?.nonce]);

  const press = (key: string) => {
    setState((s) => {
      if (/^[0-9.]$/.test(key)) {
        if (s.waitingForOperand) return { ...s, display: key === "." ? "0." : key, waitingForOperand: false };
        if (key === "." && s.display.includes(".")) return s;
        return { ...s, display: s.display === "0" ? key : s.display + key };
      }
      if (key === "AC") return INITIAL;
      if (key === "DEL") {
        const next = s.display.length > 1 ? s.display.slice(0, -1) : "0";
        return { ...s, display: next };
      }
      if (key === "π") return { ...s, display: String(Math.PI), waitingForOperand: true };
      if (key === "ANS") return { ...s, display: String(s.ans ?? 0), waitingForOperand: true };
      if (key === "√") return { ...s, display: String(round(Math.sqrt(parseFloat(s.display)))), waitingForOperand: true };
      if (key === "sin" || key === "cos" || key === "tan") {
        const rad = (parseFloat(s.display) * Math.PI) / 180;
        const fn = key === "sin" ? Math.sin : key === "cos" ? Math.cos : Math.tan;
        return { ...s, display: String(round(fn(rad))), waitingForOperand: true };
      }
      const op: Operator | null = key === "xʸ" ? "^" : (["+", "-", "×", "÷"].includes(key) ? (key as Operator) : null);
      if (op) {
        const current = parseFloat(s.display);
        if (s.accumulator !== null && s.operator && !s.waitingForOperand) {
          const result = round(apply(s.operator, s.accumulator, current));
          return { ...s, accumulator: result, operator: op, waitingForOperand: true, display: String(result) };
        }
        return { ...s, accumulator: current, operator: op, waitingForOperand: true };
      }
      if (key === "=") {
        if (s.accumulator === null || !s.operator) return s;
        const result = round(apply(s.operator, s.accumulator, parseFloat(s.display)));
        return { display: String(result), accumulator: null, operator: null, waitingForOperand: true, ans: result };
      }
      return s;
    });
  };

  return (
    <div className="flex flex-col gap-space-xs rounded-xl bg-surface-container p-space-md shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-on-surface">Scientific Calculator</span>
        <span className="rounded-full bg-tertiary-container/15 px-2 py-0.5 font-code text-[11px] font-medium text-tertiary">
          Deg mode
        </span>
      </div>

      <div className="flex flex-col gap-1 rounded-xl bg-surface-container-lowest p-space-sm shadow-inner">
        <div className="flex items-center justify-between font-code text-[11px] text-outline">
          <span>Ans: {state.ans ?? "—"}</span>
          {state.operator && (
            <span>
              {state.accumulator} {state.operator}
            </span>
          )}
        </div>
        <div className="overflow-x-auto whitespace-nowrap py-0.5 text-right font-code text-xl font-bold text-on-surface">
          {state.display}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-1">
        <div className="grid grid-cols-4 gap-1.5">
          {FUNCTION_ROW_1.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              className="h-9 rounded-lg bg-surface-container-high font-code text-xs font-semibold text-on-surface transition-colors hover:bg-surface-variant"
            >
              {k}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {FUNCTION_ROW_2.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              className={`h-9 rounded-lg font-code text-xs font-semibold transition-colors ${
                k === "AC" || k === "DEL"
                  ? "bg-error-container/40 text-error hover:bg-error-container/60"
                  : k === "ANS"
                    ? "bg-surface-container-high text-primary hover:bg-surface-variant"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-variant"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1.5 pt-0.5">
          {KEYPAD.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              className={`h-10 rounded-lg font-code text-sm font-semibold transition-colors ${
                k === "="
                  ? "bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container shadow-md"
                  : ["+", "-", "×", "÷"].includes(k)
                    ? "bg-surface-container-highest text-secondary hover:bg-surface-variant"
                    : "bg-surface-container-low text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
