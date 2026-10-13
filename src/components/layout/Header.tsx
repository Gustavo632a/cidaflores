import { trapDialogFocus } from "../../hooks/useDialogKeyboard";
import { useEffect, useRef, useState } from "react";
import { ContactButton } from "../ui/ContactButton";
import styles from "../../styles/Page.module.css";
import { navigation } from "../../data/navigation";
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    const marker = document.getElementById("hero-marker");
    if (marker) observer.observe(marker);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const dialog = modal.current;
    const opener = toggle.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [open]);
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <a
        href="#inicio"
        className={styles.wordmark}
        aria-label="Cida Flores, início"
      >
        Cida Flores<span>RECIFE · PE</span>
      </a>
      <nav className={styles.desktopNav} aria-label="Navegação principal">
        {navigation.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <ContactButton className={styles.headerOrder}>Fazer pedido</ContactButton>
      <button
        ref={toggle}
        className={styles.menuToggle}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Abrir menu"
      >
        <span />
        <span />
      </button>
      <dialog
        id="mobile-menu"
        ref={modal}
        onKeyDown={trapDialogFocus}
        className={styles.mobileMenu}
        onCancel={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div>
          <button
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            ×
          </button>
          <span className={styles.menuBrand}>Cida Flores</span>
          <nav aria-label="Navegação mobile">
            {navigation.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
                <span>↗</span>
              </a>
            ))}
          </nav>
          <p>Flores para momentos especiais.</p>
        </div>
      </dialog>
    </header>
  );
}
