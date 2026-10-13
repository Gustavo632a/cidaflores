import { FloralImage } from "../ui/FloralImage";
import { ContactButton } from "../ui/ContactButton";
import styles from "../../styles/Page.module.css";
export function About() {
  return (
    <section id="sobre" className={styles.about}>
      <div className={styles.aboutImage} data-reveal>
        <FloralImage
          name="sobre"
          alt="Detalhes delicados de pétalas e flores rosadas"
        />
        <span>O carinho mora nos detalhes.</span>
      </div>
      <div className={styles.aboutCopy} data-reveal>
        <p className="eyebrow">02 / NOSSA ESSÊNCIA</p>
        <h2>
          Há sentimentos
          <br />
          que <em>florescem.</em>
        </h2>
        <span className={styles.sageLine} />
        <p>
          Na Cida Flores, as flores fazem parte de momentos que merecem atenção
          e carinho. Uma forma delicada de presentear, celebrar e transformar
          pequenas ocasiões em lembranças especiais.
        </p>
        <ContactButton className="text-link">Fale conosco</ContactButton>
      </div>
    </section>
  );
}
