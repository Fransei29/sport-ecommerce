"use client";

import React from "react";
import styles from "./BannerComponent.module.scss";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi"; 
import Image from "next/image";

export default function Banner() {
  return (
    <section data-testid="banner" className={styles.banner}> 
      <div className={styles.contentContainer}>
         <div className={styles.contentLeft}>
            <p className={styles.BannerTitle}><span className={styles.highlight}>Q</span>uiero</p>
            <p className={styles.BannerSubtitle} >Movete con <span className={styles.underline}>Energia</span></p>
            <p>Estilo y confort para tu entrenamiento</p>
            <Link href="/shop" className={styles.shopButton}>
              Visitar Tienda <FiArrowUpRight className={styles.icon} />
            </Link>

         </div>
         <div className={styles.contentRight}>
         <Image  
              src='/assets/brand.jpg'
              alt="Image Runner"
              fill
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center 90%'
              }}
            />
              <div className={styles.imageOverlay}></div>
         </div>
      </div>
    </section>
  );
}