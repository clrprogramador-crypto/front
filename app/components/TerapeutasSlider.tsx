"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Terapeuta = {
  id: number;
  nombre: string;
  descripcion: string;
  ciudad: string;
  departamento: string;
  modalidad: string;
  especialidad: string;
  imagen: string | null;
};

export default function TerapeutasSlider() {
  const [terapeutas, setTerapeutas] = useState<Terapeuta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/terapeutas")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.data) {
          setTerapeutas(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (terapeutas.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No hay terapeutas disponibles.
      </div>
    );
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 text-sm font-semibold tracking-wide uppercase rounded-full bg-emerald-100 text-emerald-700 mb-4">
            Nuestros terapeutas
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Profesionales EMDR certificados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Conoce a nuestros especialistas, listos para acompañarte en tu proceso de sanación.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={terapeutas.length > 3}
          className="terapeutas-swiper"
        >
          {terapeutas.map((terapeuta) => (
            <SwiperSlide key={terapeuta.id}>
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Imagen */}
                <div className="relative h-64 w-full bg-gray-100">
                  {terapeuta.imagen ? (
                    <Image
                      src={terapeuta.imagen}
                      alt={terapeuta.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Sin foto</span>
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {terapeuta.nombre}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-1">
                    <span>📍 {terapeuta.ciudad}</span>
                    <span>•</span>
                    <span>💻 {terapeuta.modalidad}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                    {terapeuta.descripcion || "Terapeuta especializado en EMDR, con enfoque humano y basado en la evidencia."}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/terapeutas/${terapeuta.id}`}
                      className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition"
                    >
                      Ver perfil
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .terapeutas-swiper .swiper-button-prev,
        .terapeutas-swiper .swiper-button-next {
          color: #059669;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .terapeutas-swiper .swiper-button-prev:after,
        .terapeutas-swiper .swiper-button-next:after {
          font-size: 18px;
          font-weight: bold;
        }
        .terapeutas-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 0.7;
        }
        .terapeutas-swiper .swiper-pagination-bullet-active {
          background: #059669;
        }
      `}</style>
    </section>
  );
}