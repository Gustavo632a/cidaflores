import { FloralImage } from "../ui/FloralImage";
import { ContactButton } from "../ui/ContactButton";
import { site } from "../../config/site";
import type { CSSProperties } from "react";
import styles from "../../styles/Page.module.css";
export function Hero() {
  return (
    <section
      id="inicio"
      className={styles.hero}
      style={
        {
          "--hero-position": site.heroPosition.desktop,
          "--hero-mobile-position": site.heroPosition.mobile,
        } as CSSProperties
      }
    >
      <span id="hero-marker" className={styles.marker} />
      <FloralImage
        name="hero-buque"
        alt="Imagem ilustrativa de um buquê rosado, creme e amarelo, segurado por uma mão contra o céu azul"
        priority
        className={styles.heroImage}
      />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>UM GESTO. INFINITOS SENTIMENTOS.</p>
        <h1>
          Flores para transformar
          <br className={styles.desktopBreak} /> momentos em <em>memórias.</em>
        </h1>
        <p className={styles.heroDescription}>
          Buquês e arranjos florais para celebrar sentimentos,
          <br className={styles.desktopBreak} /> histórias e encontros
          especiais.
        </p>
        <div className={styles.heroActions}>
          <a className="button button-light" href="#colecao">
            Conhecer nossa coleção<span aria-hidden="true">↗</span>
          </a>
          <ContactButton className={styles.heroSecondary}>
            Faça seu pedido
          </ContactButton>
        </div>
      </div>
      <a className={styles.scrollCue} href="#colecao">
        <span>DESCUBRA</span>
        <span aria-hidden="true">↓</span>
      </a>
      <span className={styles.heroSide}>FLORES PARA MOMENTOS ESPECIAIS</span>
    </section>
  );
}
