"use client";

import { useState } from "react";
import type { Audience } from "./HomePage";
import type { FormEvent } from "react";

export default function ContactSection({ audience }: { audience: Audience }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 rounded-[2rem] bg-slate-950 px-8 py-12 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-200">
            Contacto y agendamiento
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {audience === "paciente"
              ? "Agenda tu primera sesión con calma"
              : "Escribe para conocer nuestras alianzas profesionales"}
          </h2>
          <p className="max-w-xl text-base leading-7 text-slate-300">
            {audience === "paciente"
              ? "Cuéntanos tu interés y te contactaremos con el terapeuta ideal para ti."
              : "Solicita información sobre formación, supervisión y colaboraciones en EMDR."}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Horario</p>
              <p className="mt-2 text-lg font-semibold text-white">Lun - Vie / 8am - 8pm</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Atención</p>
              <p className="mt-2 text-lg font-semibold text-white">Virtual y presencial</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
          {submitted ? (
            <div className="space-y-4 text-center">
              <p className="text-2xl font-semibold">Gracias por escribirnos</p>
              <p className="text-slate-600">Te contactaremos pronto para avanzar con tu proceso.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                  Nombre completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Tu nombre"
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="ejemplo@mail.com"
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Cuéntanos en qué podemos ayudarte"
                  rows={5}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-slate-950 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
