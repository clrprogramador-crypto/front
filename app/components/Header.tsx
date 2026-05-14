"use client";

import type { Audience } from "./HomePage";

type HeaderProps = {
  audience: Audience;
  setAudience: (value: Audience) => void;
};

export default function Header({ audience, setAudience }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5">
            EM
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">EMDR</p>
            <p className="text-base font-semibold text-slate-900">Acompaña Ser</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex text-sm font-medium text-slate-600">
          <a href="#hero" className="transition hover:text-slate-900">Inicio</a>
          <a href="#beneficios" className="transition hover:text-slate-900">Beneficios</a>
          <a href="#proceso" className="transition hover:text-slate-900">Cómo funciona</a>
          <a href="#terapeutas" className="transition hover:text-slate-900">Terapeutas</a>
          <a href="#faq" className="transition hover:text-slate-900">FAQ</a>
          <a href="#contacto" className="transition hover:text-slate-900">Contacto</a>
        </nav>

        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setAudience("paciente")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              audience === "paciente"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Soy paciente
          </button>
          <button
            type="button"
            onClick={() => setAudience("terapeuta")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              audience === "terapeuta"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Soy terapeuta
          </button>
        </div>
      </div>
    </header>
  );
}
