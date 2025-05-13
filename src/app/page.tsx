'use client'

import React from "react";
import styles from "./home.module.scss";
import Banner from "@/components/banner/BannerComponent";

// Importación dinámica para otros componentes que se cargan solo cuando se necesiten
import dynamic from 'next/dynamic';

const Featured = dynamic(() => import("@/components/featured/FeaturedComponent"), {
  loading: () => <p>Cargando productos destacados...</p>,
  ssr: false, // Para evitar la renderización en el servidor si solo es relevante en el cliente
});

const AboutUsComponent = dynamic(() => import("@/components/about/AboutUsComponent"), {
  loading: () => <p>Cargando sobre nosotros...</p>,
  ssr: false,
});

const Testimonials = dynamic(() => import("@/components/testimonials/TestimonialsComponent"), {
  loading: () => <p>Cargando testimonios...</p>,
  ssr: false,
});

const FooterComponent = dynamic(() => import("@/components/footer/FooterComponent"), {
  loading: () => <p>Cargando pie de página...</p>,
  ssr: false,
});

export default async function HomePage() {
  return (
    <main className={styles.homeContainer}>
      {/* Banner Principal */}
      <Banner />

      {/* Productos Destacados */}
      <Featured />

      {/* Sección de Categorías */}
      <AboutUsComponent />

      {/* Testimonios de Clientes */}
      <Testimonials />

      {/* Footer */}
      <FooterComponent />
    </main>
  );
}
