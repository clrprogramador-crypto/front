export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr] lg:items-start">
          <div className="space-y-4">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
              EMDR Acompaña Ser
            </div>
            <p className="max-w-xl text-slate-400 leading-7">
              Una plataforma de acompañamiento emocional y formación profesional en EMDR. Confianza, calidez y enfoque clínico en cada experiencia.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Secciones
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li><a href="#hero" className="transition hover:text-white">Inicio</a></li>
              <li><a href="#beneficios" className="transition hover:text-white">Beneficios</a></li>
              <li><a href="#proceso" className="transition hover:text-white">Cómo funciona</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Contacto
            </h3>
            <p className="mt-5 text-sm text-slate-400">
              hola@acompaniaser.com
            </p>
            <p className="mt-3 text-sm text-slate-400">+57 300 123 4567</p>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 EMDR Acompaña Ser. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
