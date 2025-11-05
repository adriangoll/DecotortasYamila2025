// Footer.jsx
import { FaInstagram, FaFacebookF, FaEnvelope } from "react-icons/fa";
import {NavLink} from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-pink-200 text-pink-900 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        {/* Contacto */}
        <div>
          <h4 className="text-lg font-bold mb-2">Contacto</h4>
          <p>Email: contacto@decotortasyamila.com</p>
          <p>WhatsApp: +54 9 351 123 4567</p>
        </div>

        {/* Enlaces útiles */}
        <nav className="mb-4">
          <h4 className="text-lg font-bold mb-2">Enlaces</h4>
          <div className="flex flex-col gap-2">
            <NavLink to="/" className="hover:underline">
              Inicio
            </NavLink>
            <NavLink to="/contacto" className="hover:underline">
              Contacto
            </NavLink>
          </div>
        </nav>

        {/* Redes sociales */}
        <div>
          <h4 className="text-lg font-bold mb-2">Seguinos</h4>
          <div className="flex justify-center sm:justify-start gap-4 text-2xl">
            <a href="https://www.instagram.com/decotortasyamila" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-600" />
            </a>
            <a href="https://www.facebook.com/decotortasriocuarto" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:text-pink-600" />
            </a>
            <a href="mailto:contacto@decotortasyamila.com">
              <FaEnvelope className="hover:text-pink-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="text-center text-sm text-pink-800 mt-6">
        © {new Date().getFullYear()} Decotortas Yamila. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
