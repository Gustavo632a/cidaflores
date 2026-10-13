import { collection } from "../../data/collection";
import { FloralImage } from "../ui/FloralImage";
import { ContactButton } from "../ui/ContactButton";
import styles from "../../styles/Page.module.css";
export function Collection() {
  return (
    <section id="colecao" className={styles.collection}>
      <div className={styles.sectionIntro} data-reveal>
        <div>
          <p className="eyebrow">01 / NOSSA COLEÇÃO</p>
          <h2>
            Flores que contam
            <br />
            <em>histórias.</em>
          </h2>
        </div>
        <p>
          Descubra composições florais para presentear, celebrar e tornar cada
          ocasião mais especial.
        </p>
      </div>
      <div className={styles.collectionGrid}>
        {collection.map((item, index) => (
          <article
            key={item.title}
            className={styles.collectionItem}
            data-reveal
          >
            <div className={styles.imageWrap}>
              <FloralImage name={item.image} alt={item.alt} />
              <span className={styles.imageNumber}>0{index + 1}</span>
            </div>
            <div className={styles.categoryTitle}>
              <h3>{item.title}</h3>
              <span aria-hidden="true">↗</span>
            </div>
            <p>{item.description}</p>
            <ContactButton
              className="text-link"
              subject={`Gostaria de consultar opções de ${item.title.toLowerCase()}.`}
            >
              Consultar opções
            </ContactButton>
          </article>
        ))}
      </div>
      <p className={styles.imageNote}>
        Categorias e imagens de inspiração. Consulte as opções disponíveis com a
        Cida Flores.
      </p>
    </section>
  );
}
