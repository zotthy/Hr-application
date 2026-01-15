import React from "react";
import { Link } from "react-router-dom"; // Kluczowy import!

export default function Footer() {
  return (
    <footer className="footer mt-5 p-5 bg-dark text-white">
      <div className="container">
        {/* Sekcja Lorem Ipsum w stopce */}

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <small>&copy; 2026 Twoja Firma. Wszelkie prawa zastrzeżone.</small>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item ms-3">
                <Link to="/privacy" className="text-white text-decoration-none small">
                  Polityka prywatności
                </Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link to="/terms" className="text-white text-decoration-none small">
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}