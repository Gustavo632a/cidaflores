import { useEffect, useRef } from "react";
import { gallery } from "../../data/gallery";
import styles from "../../styles/Page.module.css";
import { trapDialogFocus } from "../../hooks/useDialogKeyboard";
interface Props {
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}
export function ImageLightbox({ index, onClose, onChange }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const modal = dialog.current;
    const overflow = document.body.style.overflow;
    modal?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  const move = (direction: number) =>
    onChange((index + direction + gallery.length) % gallery.length);
  return (
    <dialog
      ref={dialog}
      className={styles.lightbox}
      aria-label="Galeria de inspiração floral"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        trapDialogFocus(event);
        if (event.key === "ArrowRight") move(1);
        if (event.key === "ArrowLeft") move(-1);
      }}
    >
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Fechar galeria"
      >
        ×
      </button>
      <div className={styles.lightboxContent}>
        <img src={gallery[index].src} alt={gallery[index].alt} />
        <div className={styles.lightboxNav}>
          <button onClick={() => move(-1)} aria-label="Imagem anterior">
            ←
          </button>
          <p aria-live="polite">
            {index + 1} / {gallery.length} · {gallery[index].alt}
          </p>
          <button onClick={() => move(1)} aria-label="Próxima imagem">
            →
          </button>
        </div>
      </div>
    </dialog>
  );
}
