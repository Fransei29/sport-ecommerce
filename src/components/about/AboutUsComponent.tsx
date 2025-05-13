"use client";

import React from "react";
import styles from "./AboutUsComponent.module.scss";

export default function AboutUsComponent() {
  return (
    <section className={styles.aboutUs}>
      <h2>Sobre Nosotros</h2>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <p>
            En <strong>Sportify</strong>, nuestra pasión por el deporte nos impulsa a ofrecer productos de la más alta calidad para atletas y entusiastas de todo el mundo.<br></br> Desde nuestros humildes comienzos, nos hemos dedicado a proporcionar una experiencia única que combina innovación, estilo y rendimiento.
          </p>
          <p>
            ¿Por qué somos tu mejor opcion? <br></br> <br></br>Porque no solo vendemos productos, sino que también inspiramos a nuestra comunidad a superar sus límites y vivir una vida activa y saludable. <br></br><strong>¡Únete a nosotros y sé parte de la familia Sportify!</strong>
          </p>
        </div>
      </div>
    </section>
  );
}