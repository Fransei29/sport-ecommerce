"use client";

import React from "react";
import styles from "./CategoryComponent.module.scss";

export default function Category() {

  return (
    <section className={styles.categories}>
        <h2>Categorías Populares</h2>
        <div className={styles.categoryGrid}>
          <div className={styles.categoryCard}>Camisetas</div>
          <div className={styles.categoryCard}>Zapatillas</div>
          <div className={styles.categoryCard}>Accesorios</div>
        </div>
      </section>
  );
}
