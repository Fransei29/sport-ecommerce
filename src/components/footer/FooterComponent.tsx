import React from "react";
import styles from "./FooterComponent.module.scss";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Importa los íconos

export default function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h3>Quiero</h3>
          <p>Tu compañero en el deporte.</p>
        </div>
        <div className={styles.linksSection}>
          <ul>
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#services">Servicios</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>
        <div className={styles.socialSection}>
          <p>Síguenos:</p>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className={styles.icon} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className={styles.icon} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Sportify. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}