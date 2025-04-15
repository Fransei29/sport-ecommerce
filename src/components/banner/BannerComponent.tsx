"use client";

import React from "react";
import styles from "./BannerComponent.module.scss";
import Link from "next/link";

export default function Banner() {

  return (
    <section className={styles.banner}>
        <h1>Encuentra tu Estilo Deportivo</h1>
        <p>Descubre la mejor ropa deportiva con la mejor calidad y precio.</p>
        <Link href="/shop">
         <button className={styles.shopButton}>Ver Tienda</button>
        </Link>
    </section>
  );
}
