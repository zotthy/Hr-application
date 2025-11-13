import React from "react";

export default function Footer() {
  return (
    <>
      <footer class="footer mt-5 p-4 bg-dark text-white">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start mb-2 mb-md-0">
              <small>
                &copy; 2025 Twoja Firma. Wszelkie prawa zastrzeżone.
              </small>
            </div>

            <div class="col-md-6 text-center text-md-end">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a href="#" class="text-white text-decoration-none">
                    Polityka prywatności
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#" class="text-white text-decoration-none">
                    Warunki
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#" class="text-white text-decoration-none">
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
