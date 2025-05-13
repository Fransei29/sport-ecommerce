import React from "react";
import Image from "next/image"; 
import styles from "./TestimonialsComponent.module.scss";

const testimonials = [
  { 
    id: 1, 
    name: "Juan Bautista Perez", 
    comment: "La experiencia de compra fue increíble. Desde el momento en que hice el pedido hasta que llegó a mi casa, todo fue perfecto. La calidad de los productos es excepcional, y definitivamente volveré a comprar aquí.", 
    image: "/assets/face1.jpg" 
  },
  { 
    id: 2, 
    name: "Ana Fernanda Gómez", 
    comment: "Me encantaron las zapatillas que compré. No solo son cómodas, sino que también tienen un diseño espectacular. Además, el servicio al cliente fue muy atento y resolvieron todas mis dudas rápidamente.", 
    image: "/assets/face2.jpg" 
  },
  { 
    id: 3, 
    name: "Carlos Jose Ruiz", 
    comment: "Muy rápido el envío y los productos llegaron en perfectas condiciones. Es difícil encontrar tiendas que combinen calidad, buen precio y rapidez, pero esta lo tiene todo. ¡Muy recomendado!", 
    image: "/assets/face3.jpg" 
  },
];
export default function TestimonialsComponent() {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonials}>
        <h2>Testimonios</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <Image 
                src={testimonial.image} 
                alt={testimonial.name} 
                width={60} 
                height={60} 
                className={styles.testimonialImage} // Add a class for styling
              />
              <p>{testimonial.comment}</p>
              <h4>{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
   

  );
}