import { site } from "../../config/site";
import { safeHttps, contactLink } from "../../lib/contact";
import { ContactButton } from "../ui/ContactButton";
import styles from "../../styles/Page.module.css";
export function Contact() {
  const hasContact = contactLink() !== "#contato";
  return (
    <section id="contato" className={styles.contact}>
      <div className={styles.contactGrid}>
        <div data-reveal>
          <p className="eyebrow">04 / ENCONTRE A CIDA FLORES</p>
          <h2>
            Estamos esperando
            <br />
            por <em>você.</em>
          </h2>
          <p className={styles.contactDescription}>
            Conheça nossa localização ou entre em contato para consultar opções
            e fazer seu pedido.
          </p>
          <address>
            {site.address}
            <br />
            {site.neighborhood}
          </address>
          {!site.addressConfirmed && (
            <p className={styles.addressNote}>
              Endereço de referência, a confirmar.
            </p>
          )}
          <div className={styles.contactActions}>
            {hasContact ? (
              <ContactButton>Fazer pedido</ContactButton>
            ) : (
              <p className={styles.contactNotice}>
                Para consultar o contato da floricultura, acesse sua ficha no
                Google Maps.
              </p>
            )}
            <a
              className="text-link"
              href={safeHttps(site.maps)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Como chegar<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className={styles.locationCard}>
          <iframe
            className={styles.mapFrame}
            src={site.mapsEmbed}
            title="Localização da Floricultura Cida Flores Recife no Google Maps"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <a className={styles.mapExternal} href={safeHttps(site.maps)} target="_blank" rel="noopener noreferrer">
            Abrir no Google Maps <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className={styles.contactCta} data-reveal>
        <p>
          Seu próximo gesto especial
          <br />
          começa com <em>flores.</em>
        </p>
        {hasContact ? (
          <ContactButton>Falar com a Cida Flores</ContactButton>
        ) : (
          <a
            className="button"
            href={safeHttps(site.maps)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Encontrar a Cida Flores<span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </section>
  );
}
