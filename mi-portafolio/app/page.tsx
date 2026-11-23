"use client";

import { useState, FormEvent } from "react";

interface Actividad {
  id: string;
  titulo: string;
  etiqueta: string;
  resumen: string;
  algoritmoEnfoque: string;
  capturas: { src: string; pie: string }[];
  archivoDescarga?: string;
}

// ============================================================================
// 1. ZONA DE EDICIÓN RÁPIDA (Cambia aquí tus datos y rutas de imágenes)
// ============================================================================
const DATOS_PERSONALES = {
  nombre: "Marjorie",
  rol: "Estudiante de Física",
  descripcionCorta:
    "Mi portafolio",
  sobreMi:
    "Soy una estudiante de física, apasionada por la ciencia ",
  ubicacion: "San Salvador",
  correo: "marte.wave@gmail.com",
  github: "https://github.com/marrwww",
  rutaFondoMar: "/recursos/fondomar.png",
  rutaFotoPerfil: "/recursos/perfil.png",
};

const HABILIDADES = [
  { categoria: "Lenguajes y Código", items: ["Python", "HTML & CSS"] }
];

const FORMACION = [
  {
    titulo: "Bachillerato",
    institucion: "Instituto Nacional de Comercio",
    periodo: "2025 – 2026",
    detalle: "Bachillerato general",
  },
  {
    titulo: "Programa Empresarial ¡Supérate!",
    institucion: "Centro ¡Supérate! Fundación Frech",
    periodo: "2024 - 2026",
    detalle: "Formación en inglés, informática y valores",
  },
];

// ============================================================================
// 2. TUS 3 ACTIVIDADES (Con los nombres exactos de tus archivos en /evidencias)
// ============================================================================
const ACTIVIDADES: Actividad[] = [
  {
    id: "laberinto",
    titulo: "Laberinto",
    etiqueta: "Algoritmos y búsqueda",
    resumen:
      "Generación de un laberinto navegable de 15x15 y cálculo de ruta óptima (91 pasos) desde el inicio hasta la meta evitando paredes.",
    algoritmoEnfoque:
      "Cuadrícula de celdas con paredes, retroceso con pila para generar el laberinto y búsqueda en anchura (BFS) para encontrar el camino.",
    capturas: [
      { src: "/evidencias/laberinto.png", pie: "Laberinto –" },
      { src: "/evidencias/laberinto (2).png", pie: "Laberinto –" },
      { src: "/evidencias/laberinto (3).png", pie: "Laberinto –" },
      { src: "/evidencias/laberinto (4).png", pie: "Laberinto –" },
      { src: "/evidencias/laberinto (5).png", pie: "Laberinto –" },
    ],
  },
  {
    id: "ai-challenge",
    titulo: "AI Challenge – K-Means y KNN",
    etiqueta: "Machine Learning",
    resumen:
      "Experimentación con aprendizaje no supervisado (agrupamiento) y clasificación supervisada basada en vecinos cercanos.",
    algoritmoEnfoque:
      "K-Means para segmentar datos por similitud y KNN para clasificar observaciones según los ejemplos más cercanos.",
    capturas: [
      { src: "/evidencias/kmandknn (1).png", pie: "K-Means / KNN –" },
      { src: "/evidencias/kmandknn (2).png", pie: "K-Means / KNN –" },
      { src: "/evidencias/kmandknn (3).png", pie: "K-Means / KNN –" },
      { src: "/evidencias/kmandknn (4).png", pie: "K-Means / KNN –" },
    ],
    archivoDescarga: "/evidencias/km&knn.py",
  },
  {
    id: "hotspots",
    titulo: "Hotspots Comerciales",
    etiqueta: "Análisis y ubicación",
    resumen:
      "Identificación de zonas o puntos de mayor concentración e interés comercial a partir de los datos trabajados.",
    algoritmoEnfoque:
      "Exploración de datos, filtrado y visualización de concentraciones para detectar puntos clave.",
    capturas: [
      { src: "/evidencias/hotspots (1).png", pie: "Hotspots –" },
      { src: "/evidencias/hotspots (2).png", pie: "Hotspots –" },
      { src: "/evidencias/hotspots (3).png", pie: "Hotspots –" },
      { src: "/evidencias/hotspots (4).png", pie: "Hotspots –" },
    ],
  },
];

// ============================================================================
// 3. COMPONENTE PRINCIPAL DE LA PÁGINA
// ============================================================================
export default function Home() {
  // Controla qué proyecto de los 3 está abierto en el visor
  const [activaId, setActivaId] = useState<string>("laberinto");
  // Controla si la foto de perfil cargó bien o muestra el marco de aviso
  const [fotoCargada, setFotoCargada] = useState<boolean>(true);
  // Controla la imagen ampliada al hacer clic en una captura (Modal)
  const [imagenModal, setImagenModal] = useState<{ src: string; pie: string } | null>(null);

  // Estados del formulario de contacto
  const [nombreContacto, setNombreContacto] = useState("");
  const [emailContacto, setEmailContacto] = useState("");
  const [mensajeContacto, setMensajeContacto] = useState("");
  const [estadoEnvio, setEstadoEnvio] = useState<"idle" | "enviado" | "error">("idle");

  const actividadActual =
    ACTIVIDADES.find((item) => item.id === activaId) ?? ACTIVIDADES[0];

  const manejarEnvioContacto = (e: FormEvent) => {
    e.preventDefault();
    if (!nombreContacto.trim() || !emailContacto.trim() || !mensajeContacto.trim()) {
      setEstadoEnvio("error");
      return;
    }
    setEstadoEnvio("enviado");
    setNombreContacto("");
    setEmailContacto("");
    setMensajeContacto("");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-sky-750 via-blue-750 to-blue-950 text-blue-50 selection:bg-blue-300 selection:text-sky-800 scroll-smooth">
      {/* CAPA 1: Imagen de fondo de mar/olas */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${DATOS_PERSONALES.rutaFondoMar}')` }}
      />

      {/* CAPA 2: Filtro degradado azul para que el texto siempre se lea bien */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
      />


      {/* BARRA DE NAVEGACIÓN SUPERIOR (Botones que llevan a cada sección) */}
      <header className="sticky top-0 z-30 border-b border-blue-700/15 bg-blue-950/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <a
            href="#inicio"
            className="text-xs font-semibold tracking-widest uppercase text-blue-200 hover:text-white transition"
          >
            ✦ {DATOS_PERSONALES.nombre}
          </a>
          <nav className="flex flex-wrap gap-2">
            {[
              { href: "#inicio", label: "Inicio" },
              { href: "#sobre-mi", label: "Sobre mí" },
              { href: "#proyectos", label: "Proyectos (3)" },
              { href: "#habilidades", label: "Habilidades" },
              { href: "#formacion", label: "Formación" },
              { href: "#contacto", label: "Contacto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-blue-300/20 bg-blue-900/45 px-3.5 py-1.5 text-xs font-medium text-blue-100 hover:border-blue-300/60 hover:bg-blue-300 hover:text-sky-950 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* 1. Cambiamos max-w-5xl a max-w-7xl (mucho más ancho) */}
<main className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 py-10 space-y-16">
  
  {/* SECCIÓN 1: INICIO AMPLIADA */}
  <section
    id="inicio"
    /* 2. Agregamos min-h-[82vh] y flex items-center para que ocupe casi toda la pantalla vertical */
    className="relative flex items-center overflow-hidden rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-sky-900/55 via-blue-900/45 to-cyan-900/45 p-8 sm:p-14 lg:p-16 backdrop-blur-md shadow-[0_0_45px_rgba(56,189,248,0.15)] min-h-[82vh]"
  >
    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
      
      {/* COLUMNA IZQUIERDA: Textos, Botones e Íconos */}
      <div className="flex-1 text-center lg:text-left space-y-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent">
          {DATOS_PERSONALES.nombre}
        </h1>
        
        <p className="text-base sm:text-lg font-medium text-cyan-300">
          {DATOS_PERSONALES.rol}
        </p>
        
        <p className="max-w-2xl text-base sm:text-lg text-sky-100/85 leading-relaxed">
          {DATOS_PERSONALES.descripcionCorta}
        </p>

        {/* Botones de acción principales */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
          <a
            href="#proyectos"
            className="rounded-full bg-gradient-to-r from-cyan-300 to-sky-200 px-7 py-3.5 text-sm sm:text-base font-semibold text-sky-950 shadow-[0_0_20px_rgba(103,232,249,0.4)] hover:brightness-105 transition"
          >
            Ver mis proyectos
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-cyan-300/40 bg-sky-950/50 px-7 py-3.5 text-sm sm:text-base font-medium text-cyan-100 hover:bg-sky-900/70 transition"
          >
            Contáctame
          </a>
        </div>

        {/* ESPACIO NUEVO PARA ÍCONOS / REDES / ETIQUETAS */}
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 pt-4 border-t border-cyan-200/15">
          {/* Aquí puedes pegar tus íconos (GitHub, LinkedIn, Instagram, etc.) */}
          <span className="text-xs uppercase tracking-wider text-cyan-200/60">Encuéntrame en:</span>
          <a href={DATOS_PERSONALES.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-sky-950/60 border border-cyan-300/20 hover:border-cyan-300 transition">
            {/* Ícono ejemplo */}
            GitHub
          </a>
          {/* Agrega más íconos aquí */}
        </div>
      </div>

      {/* COLUMNA DERECHA: Foto principal más grande + espacio para más fotos */}
      <div className="shrink-0 flex flex-col items-center gap-4">
        {/* 3. Aumentamos el tamaño de la foto a h-64 w-64 / lg:h-80 lg:w-80 */}
        <div className="relative h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-3xl p-1.5 bg-gradient-to-tr from-cyan-300/75 via-sky-200/45 to-blue-400/75 shadow-[0_0_35px_rgba(103,232,249,0.35)]">
          <div className="h-full w-full overflow-hidden rounded-[20px] bg-sky-950/85 flex items-center justify-center">
            {fotoCargada ? (
              <img
                src={DATOS_PERSONALES.rutaFotoPerfil}
                alt={`Foto de ${DATOS_PERSONALES.nombre}`}
                onError={() => setFotoCargada(false)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="px-3 text-center text-xs text-cyan-200/80">
                <span className="block text-lg mb-1">✦</span>
                Tu foto aquí
              </div>
            )}
          </div>
        </div>

        {/* ESPACIO OPCIONAL PARA MINI-FOTOS O INSIGNIAS DEBAJO DE TU FOTO */}
        <div className="flex gap-3">
          <div className="h-14 w-14 rounded-xl border border-cyan-300/30 bg-sky-950/60 overflow-hidden">
            {/* <img src="..." className="h-full w-full object-cover" /> */}
          </div>
          <div className="h-14 w-14 rounded-xl border border-cyan-300/30 bg-sky-950/60 overflow-hidden">
            {/* <img src="..." className="h-full w-full object-cover" /> */}
          </div>
        </div>
      </div>

    </div>
  </section>

        {/* SECCIÓN 2: SOBRE MÍ */}
        <section
          id="sobre-mi"
          className="rounded-3xl border border-cyan-200/20 bg-sky-950/55 p-7 sm:p-8 backdrop-blur-md space-y-4"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            ✦ Sobre mí
          </span>
          <h2 className="text-2xl font-bold text-white">Un poco de mi historia</h2>
          <p className="text-sm sm:text-base text-sky-100/85 leading-relaxed">
            {DATOS_PERSONALES.sobreMi}
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-cyan-200/90">
            <span className="rounded-full border border-cyan-300/20 bg-sky-900/40 px-3.5 py-1">
               {DATOS_PERSONALES.ubicacion}
            </span>
            <a
              href={DATOS_PERSONALES.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cyan-300/20 bg-sky-900/40 px-3.5 py-1 hover:border-cyan-300/60 transition"
            >
              🔗 GitHub
            </a>
          </div>
        </section>

        {/* SECCIÓN 3: PROYECTOS (Tus 3 actividades con selector y galería de evidencias) */}
        <section id="proyectos" className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              ✦ Evidencias del curso
            </span>
          </div>

          {/* Botones / Tarjetas para elegir entre las 3 actividades */}
          <div className="grid gap-4 sm:grid-cols-3">
            {ACTIVIDADES.map((act) => {
              const esActiva = act.id === activaId;
              return (
                <button
                  key={act.id}
                  onClick={() => setActivaId(act.id)}
                  className={`group text-left rounded-2xl border p-5 backdrop-blur-md transition ${
                    esActiva
                      ? "border-cyan-300 bg-sky-900/70 shadow-[0_0_28px_rgba(103,232,249,0.28)]"
                      : "border-cyan-200/15 bg-sky-950/45 hover:border-cyan-300/45 hover:bg-sky-900/45"
                  }`}
                >
                  <span className="inline-block rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-0.5 text-[11px] text-cyan-200">
                    ✦ {act.etiqueta}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-cyan-200 transition">
                    {act.titulo}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-sky-100/75 line-clamp-2">
                    {act.resumen}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Visor detallado de la actividad seleccionada */}
          <div className="rounded-3xl border border-cyan-200/20 bg-sky-950/60 p-6 sm:p-8 backdrop-blur-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cyan-200/15 pb-5">
              <div>
                <span className="text-xs tracking-wider uppercase text-cyan-300">
                  ✦ {actividadActual.etiqueta}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {actividadActual.titulo}
                </h3>
              </div>
              {actividadActual.archivoDescarga && (
                <a
                  href={actividadActual.archivoDescarga}
                  download
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-sky-200 px-5 py-2 text-xs sm:text-sm font-semibold text-sky-950 shadow-[0_0_20px_rgba(103,232,249,0.4)] hover:brightness-105 transition"
                >
                  Descargar código (.py)
                </a>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-cyan-200/15 bg-sky-900/35 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-200">
                  Descripción
                </h4>
                <p className="mt-2 text-sm text-sky-50/90 leading-relaxed">
                  {actividadActual.resumen}
                </p>
              </div>
              <div className="rounded-2xl border border-cyan-200/15 bg-sky-900/35 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-200">
                  Enfoque / Algoritmo
                </h4>
                <p className="mt-2 text-sm text-sky-50/90 leading-relaxed">
                  {actividadActual.algoritmoEnfoque}
                </p>
              </div>
            </div>

            {/* Galería de capturas (haz clic en cualquiera para ampliarla) */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-200">
                Capturas de evidencia (haz clic para ampliar)
              </h4>
              <div className="grid gap-5 sm:grid-cols-2">
                {actividadActual.capturas.map((cap, idx) => (
                  <figure
                    key={idx}
                    onClick={() => setImagenModal(cap)}
                    className="cursor-pointer group overflow-hidden rounded-2xl border border-cyan-200/20 bg-sky-900/35 hover:border-cyan-300/60 transition"
                  >
                    <img
                      src={cap.src}
                      alt={cap.pie}
                      className="w-full h-56 object-cover group-hover:scale-[1.02] transition duration-300"
                    />
                    <figcaption className="p-3 text-xs text-cyan-100/85 border-t border-cyan-200/15 flex justify-between items-center">
                      <span>{cap.pie}</span>
                      <span className="text-cyan-300">Ampliar ↗</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: HABILIDADES */}
        <section
          id="habilidades"
          className="rounded-3xl border border-cyan-200/20 bg-sky-950/55 p-7 sm:p-8 backdrop-blur-md space-y-6"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              ✦ Stack &amp; Conocimientos
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Habilidades</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {HABILIDADES.map((grupo) => (
              <div
                key={grupo.categoria}
                className="rounded-2xl border border-cyan-200/15 bg-sky-900/35 p-5 space-y-3"
              >
                <h3 className="text-sm font-semibold text-cyan-200">
                  {grupo.categoria}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {grupo.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-cyan-300/25 bg-sky-950/60 px-3 py-1 text-xs text-sky-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 5: FORMACIÓN ACADÉMICA */}
        <section
          id="formacion"
          className="rounded-3xl border border-cyan-200/20 bg-sky-950/55 p-7 sm:p-8 backdrop-blur-md space-y-6"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              ✦ Trayectoria
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Formación Académica
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {FORMACION.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-cyan-200/15 bg-sky-900/35 p-5 space-y-1.5"
              >
                <span className="text-xs font-mono text-cyan-300">
                  {item.periodo}
                </span>
                <h3 className="text-base font-bold text-white">{item.titulo}</h3>
                <p className="text-xs font-medium text-sky-200/80">
                  {item.institucion}
                </p>
                <p className="text-xs sm:text-sm text-sky-100/75 pt-1">
                  {item.detalle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 6: CONTACTO (Formulario interactivo funcionando) */}
        <section
          id="contacto"
          className="rounded-3xl border border-cyan-200/20 bg-sky-950/55 p-7 sm:p-8 backdrop-blur-md space-y-6"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              ✦ Conectemos
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Contacto</h2>
            <p className="text-sm text-sky-100/80 mt-1">
              ¿Tienes alguna duda sobre mis proyectos o quieres dejar un comentario? Escríbeme aquí o a{" "}
              <span className="text-cyan-300 underline">{DATOS_PERSONALES.correo}</span>.
            </p>
          </div>

          <form onSubmit={manejarEnvioContacto} className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombreContacto}
              onChange={(e) => {
                setNombreContacto(e.target.value);
                setEstadoEnvio("idle");
              }}
              className="rounded-xl border border-cyan-200/20 bg-sky-900/40 px-4 py-3 text-sm text-white placeholder:text-sky-200/50 focus:border-cyan-300 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={emailContacto}
              onChange={(e) => {
                setEmailContacto(e.target.value);
                setEstadoEnvio("idle");
              }}
              className="rounded-xl border border-cyan-200/20 bg-sky-900/40 px-4 py-3 text-sm text-white placeholder:text-sky-200/50 focus:border-cyan-300 focus:outline-none"
            />
            <textarea
              rows={3}
              placeholder="Escribe tu mensaje..."
              value={mensajeContacto}
              onChange={(e) => {
                setMensajeContacto(e.target.value);
                setEstadoEnvio("idle");
              }}
              className="sm:col-span-2 rounded-xl border border-cyan-200/20 bg-sky-900/40 px-4 py-3 text-sm text-white placeholder:text-sky-200/50 focus:border-cyan-300 focus:outline-none"
            />

            <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-cyan-300 to-sky-200 px-6 py-2.5 text-sm font-semibold text-sky-950 shadow-[0_0_20px_rgba(103,232,249,0.4)] hover:brightness-105 transition"
              >
                Enviar mensaje ✦
              </button>

              {estadoEnvio === "error" && (
                <p className="text-xs text-rose-300">
                  Por favor completa todos los campos antes de enviar.
                </p>
              )}
              {estadoEnvio === "enviado" && (
                <p className="text-xs text-cyan-300">
                  ¡Mensaje recibido! Gracias por escribir.
                </p>
              )}
            </div>
          </form>
        </section>
      </main>

      {/* PIE DE PÁGINA */}
      <footer className="relative z-10 border-t border-cyan-300/15 py-6 text-center text-xs text-sky-200/65">
        ✦ {DATOS_PERSONALES.nombre} · Portafolio Digital 2026
      </footer>

      {/* MODAL PARA VER CAPTURAS EN GRANDE */}
      {imagenModal && (
        <div
          onClick={() => setImagenModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-sky-950/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full overflow-hidden rounded-3xl border border-cyan-300/40 bg-sky-950 shadow-2xl"
          >
            <img
              src={imagenModal.src}
              alt={imagenModal.pie}
              className="w-full max-h-[75vh] object-contain bg-black/40"
            />
            <div className="flex items-center justify-between p-4 border-t border-cyan-200/20">
              <p className="text-xs sm:text-sm text-cyan-100">{imagenModal.pie}</p>
              <button
                onClick={() => setImagenModal(null)}
                className="rounded-full bg-cyan-300 px-4 py-1.5 text-xs font-semibold text-sky-950 hover:brightness-105"
              >
                Cerrar ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}