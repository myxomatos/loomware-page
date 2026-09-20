import { useEffect, useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Soluciones", href: "#soluciones" },
  { label: "Industrias", href: "#industrias" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 991 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  // El panel móvil va como hermano del header, no dentro: el backdrop-filter
  // del header lo convertiría en contenedor del position: fixed y el panel
  // quedaría atrapado en sus 64 px de alto.
  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="container nav__inner">
          <a
            href="#inicio"
            className="nav__brand"
            aria-label="Loomware — inicio"
            onClick={close}
          >
            <Logo />
          </a>

          <nav className="nav__links" aria-label="Principal">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            className="btn btn--outline btn--pill btn--sm nav__cta"
          >
            Diagnóstico
            <Icon name="arrow-right" size={16} />
          </a>

          <button
            type="button"
            className="nav__toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} size={24} />
          </button>
        </div>
      </header>

      <div
        id="nav-mobile"
        className={`nav__mobile ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav
          className="container nav__mobile-links"
          aria-label="Principal móvil"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav__mobile-link"
              onClick={close}
            >
              {l.label}
              <Icon name="chevron-right" size={18} />
            </a>
          ))}
          <a
            href="#contacto"
            className="btn btn--primary btn--block"
            onClick={close}
          >
            Solicitar diagnóstico
            <Icon name="arrow-right" size={16} />
          </a>
        </nav>
      </div>
    </>
  );
}
