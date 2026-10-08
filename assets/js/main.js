/* ==========================================================================
   Tangelo — Comportamiento del sitio (sin dependencias)
   ========================================================================== */

/* ---- CONFIGURACIÓN: conectar formularios ----------------------------------
   Pegar aquí la URL que recibirá los datos (POST, JSON). Opciones habituales:
   · Formspree / Getform (sin servidor)            → https://formspree.io/f/xxxx
   · Google Apps Script que escribe en un Sheet     → https://script.google.com/macros/s/xxxx/exec
   · CRM (HubSpot, Zoho) o API interna de Tangelo
   Mientras esté vacío, el formulario valida y muestra el mensaje de éxito
   sin enviar datos (modo demostración).                                     */
const ENDPOINTS = {
  cotizacion: "",  // formulario de /contacto
  proveedor: ""    // formulario de /proveedores
};

document.addEventListener("DOMContentLoaded", () => {
  /* Menú móvil */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav-principal");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const abierto = nav.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", abierto);
    });
  }

  /* Año en el pie */
  document.querySelectorAll("[data-anio]").forEach(el => (el.textContent = new Date().getFullYear()));

  /* Aviso de cookies */
  const aviso = document.querySelector(".cookies");
  const leer = () => { try { return localStorage.getItem("tg-cookies"); } catch (e) { return null; } };
  const guardar = v => { try { localStorage.setItem("tg-cookies", v); } catch (e) {} };
  if (aviso && !leer()) aviso.classList.add("visible");
  document.querySelectorAll("[data-cookies]").forEach(btn =>
    btn.addEventListener("click", () => {
      guardar(btn.dataset.cookies);           // "aceptar" | "rechazar"
      aviso.classList.remove("visible");
      // Aquí se activa Google Analytics / Meta Pixel solo si es "aceptar".
    })
  );

  /* Formularios */
  document.querySelectorAll("form[data-form]").forEach(form => {
    const estado = form.querySelector(".form__estado");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      estado.className = "form__estado";
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const datos = Object.fromEntries(new FormData(form).entries());
      datos.origen = form.dataset.form;
      datos.pagina = location.pathname;
      const url = ENDPOINTS[form.dataset.form];
      const boton = form.querySelector("button[type=submit]");
      boton.disabled = true;
      try {
        if (url) {
          const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) });
          if (!r.ok) throw new Error(r.status);
        }
        form.reset();
        estado.textContent = form.dataset.exito || "¡Gracias! Recibimos su información y su asesor le contactará pronto.";
        estado.classList.add("ok");
      } catch (err) {
        estado.textContent = "No pudimos enviar su información. Intente de nuevo o escríbanos por WhatsApp.";
        estado.classList.add("error");
      } finally {
        boton.disabled = false;
      }
    });
  });
});
