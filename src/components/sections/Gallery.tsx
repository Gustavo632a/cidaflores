import { useState } from "react";
import { gallery } from "../../data/gallery";
import { FloralImage } from "../ui/FloralImage";
import { ImageLightbox } from "../ui/ImageLightbox";
import styles from "../../styles/Page.module.css";
export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="galeria" className={styles.gallery}>
      <div className={styles.galleryIntro} data-reveal>
        <p className="eyebrow">03 / INSPIRAÇÃO FLORAL</p>
        <h2>
          Um pouco do nosso <em>universo.</em>
        </h2>
        <p>Flores, cores e composições que inspiram.</p>
      </div>
      <div className={styles.galleryGrid}>
        {gallery.map((item, index) => (
          <button
            key={item.src}
            className={styles.galleryImage}
            onClick={() => setActive(index)}
            aria-label={`Ampliar: ${item.alt}`}
            data-reveal
          >
            <FloralImage name={`galeria-0${index + 1}`} alt={item.alt} />
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <p className={styles.imageNote}>
        Fotografias de inspiração; não representam o catálogo da floricultura.
      </p>
      {active !== null && (
        <ImageLightbox
          index={active}
          onClose={() => setActive(null)}
          onChange={setActive}
        />
      )}
    </section>
  );
}
