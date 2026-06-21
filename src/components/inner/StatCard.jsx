import { Counter } from "./Counter";

export function StatCard({ value, suffix = "", label, lead }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-7 text-center transition hover:-translate-y-1 hover:shadow-lg">
      <div className="font-bold text-[56px] leading-none text-primary mb-2">
        <Counter to={value} suffix={suffix} />
      </div>
      {label && (
        <p className="text-sm text-neutral-600">
          <strong className="text-secondary font-bold block">{label}</strong>
          {lead}
        </p>
      )}
    </div>
  );
}
