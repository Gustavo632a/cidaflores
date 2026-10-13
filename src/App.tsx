import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Collection } from "./components/sections/Collection";
import { About } from "./components/sections/About";
import { Gallery } from "./components/sections/Gallery";
import { Contact } from "./components/sections/Contact";
import { useScrollReveal } from "./hooks/useScrollReveal";
export default function App() {
  useScrollReveal();
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Collection />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
