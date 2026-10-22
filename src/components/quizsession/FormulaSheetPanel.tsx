import { Icon } from "../ui/Icon";

const FORMULAS = [
  { label: "Doppler (moving observer)", value: "f' = f₀ · (v ± v_o) / v" },
  { label: "Doppler (moving source)", value: "f' = f₀ · v / (v ∓ v_s)" },
  { label: "Speed of sound (air at T)", value: "v ≈ 331.3 + 0.606·T" },
  { label: "Acoustic intensity", value: "I = Δp² / (2 · ρ · v)" },
  { label: "Wave speed", value: "v = f · λ" },
  { label: "Beat frequency", value: "f_beat = |f₁ − f₂|" },
];

export function FormulaSheetPanel() {
  return (
    <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container p-space-md shadow-md">
      <div className="flex items-center gap-space-xs">
        <Icon name="functions" className="text-[18px] text-secondary" />
        <span className="text-sm font-semibold text-secondary">Acoustics &amp; Wave Mechanics Reference</span>
      </div>
      <div className="grid grid-cols-1 gap-space-xs text-on-surface-variant sm:grid-cols-2">
        {FORMULAS.map((f) => (
          <div key={f.label} className="rounded bg-surface-container-lowest p-space-xs">
            <span className="block text-[11px] text-outline">{f.label}</span>
            <span className="font-code text-sm text-primary">{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
