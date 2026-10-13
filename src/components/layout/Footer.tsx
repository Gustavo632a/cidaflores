import { navigation } from "../../data/navigation";
import styles from "../../styles/Page.module.css";
const year = new Date().getFullYear();
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a className={styles.footerBrand} href="#inicio">
          Cida Flores
        </a>
        <p>Flores para momentos especiais.</p>
      </div>
      <nav aria-label="Navegação do rodapé">
        {navigation.slice(1).map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <div className={styles.footerBottom}>
        <span>Recife, Pernambuco</span>
        <span>© {year} Cida Flores</span>
      </div>
    </footer>
  );
}
