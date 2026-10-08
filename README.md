# Sitio web Tangelo — Guía de implementación

Sitio estático (HTML + CSS + JS, sin dependencias ni frameworks). Se puede publicar tal cual.

## Estructura

```
tangelo-web/
├── index.html                  Inicio
├── arrendamiento.html          Arrendamiento (comparativo, requisitos, opciones al final)
├── equipo-medico.html          Equipo médico
├── equipo-ti.html              Equipo de TI
├── equipo-transporte.html      Equipo de transporte
├── proveedores.html            Programa de Aliados Comerciales + registro
├── nosotros.html               Historia, misión, mensaje de dirección, cultura
├── preguntas-frecuentes.html   18 preguntas en 5 temas + datos estructurados FAQPage
├── contacto.html               Cotización, WhatsApp, teléfono, mapa y "Hagamos negocios juntos"
├── aviso-de-privacidad.html    Aviso de Privacidad Simplificado (Clientes), texto completo
├── legal/                      PDF del aviso (agregar aquí el Aviso Integral y los demás PDFs)
├── sitemap.xml / robots.txt
└── assets/
    ├── css/styles.css          Todo el diseño (variables de marca al inicio)
    ├── js/main.js              Menú móvil, cookies, envío de formularios
    ├── fonts/                  DM Sans (respaldo de Apercu)
    ├── img/                    (crear) logo, favicon, imagen para redes
    └── legal/                  (crear) PDFs legales
```

## Opción A (recomendada): publicar fuera de Google Sites

Google Sites no permite controlar títulos, metadatos, URLs ni formularios propios. Cualquier hosting estático sirve:

1. **Netlify / Vercel / Cloudflare Pages** (gratuitos): arrastrar la carpeta `tangelo-web` o conectar un repositorio.
2. Apuntar el dominio **tangelo.mx** (DNS) al nuevo hosting y activar HTTPS.
   El dominio canónico ya está configurado como `https://www.tangelo.mx` en metadatos y sitemap.
   Redirigir **tangelo.lat** completo a tangelo.mx con un 301 para no perder a quien tenga guardada la dirección actual.
3. Configurar las redirecciones de las URLs anteriores (conserva el posicionamiento):

| URL actual | Nueva URL |
|---|---|
| /inicio | / |
| /quiénes-somos | /nosotros |
| /arrendamiento | /arrendamiento |
| /contáctanos | /contacto |
| /contáctanos/acerca-de-nosotros | /nosotros |
| /contáctanos/política-de-privacidad | /aviso-de-privacidad |
| /tercond | /legal/terminos-y-condiciones.pdf |

Ejemplo para Netlify (archivo `_redirects` en la raíz):
```
/inicio                 /                                   301
/qui%C3%A9nes-somos     /nosotros                           301
/cont%C3%A1ctanos/pol%C3%ADtica-de-privacidad  /aviso-de-privacidad  301
/cont%C3%A1ctanos       /contacto                           301
/cont%C3%A1ctanos/*     /nosotros                           301
/tercond                /legal/terminos-y-condiciones.pdf   301
```
Netlify y Vercel sirven `/arrendamiento` sin la extensión `.html` automáticamente.

## Opción B: seguir en Google Sites (temporal)

En Google Sites: **Insertar → Insertar código → Código incrustado**, y pegar por bloque el HTML de la sección + el contenido de `styles.css` dentro de `<style>…</style>`.
Limitación: Google Sites muestra el código en un iframe, por lo que el texto **no se indexa** en buscadores. Sirve para mejorar la imagen mientras se migra.

## Pendientes antes de publicar

- [x] **Logo**: logotipo tipográfico "Tangelo", sin imagen (clase `.logo`).
- [ ] **Fuente Apercu**: si la licencia incluye uso web, colocar los `.woff2` en `assets/fonts/` y activar el bloque comentado al inicio de `styles.css`.
- [ ] **Formularios**: pegar la URL receptora en `ENDPOINTS` (inicio de `assets/js/main.js`). Opciones: Formspree, Google Apps Script → Google Sheet, o el CRM.
- [ ] **Aviso de Privacidad Integral** en `/legal/aviso-de-privacidad-integral.pdf`: el aviso simplificado remite a él en www.tangelo.mx.
- [ ] **Otros PDFs** en `/legal/`: términos y condiciones actualizados, código de ética, política anticorrupción, política antimonopolio.
- [ ] **Imágenes**: `assets/img/favicon.png`, `assets/img/og-tangelo.png` (1200×630 para vista previa en WhatsApp/LinkedIn).
- [ ] **Validar contenido** marcado con `<!-- VALIDAR -->`: requisitos (Riesgo), mensaje y cargo de dirección.
- [ ] **Analítica**: agregar Google Analytics 4 activándolo solo si el usuario acepta cookies (ver comentario en `main.js`).

## Editar

- Colores y tipografía: variables `:root` al inicio de `styles.css`.
- Preguntas frecuentes: cada pregunta es un bloque `<details>`. Si se agrega o cambia una, actualizar también el bloque `application/ld+json` de `preguntas-frecuentes.html` (lo lee Google para mostrar las preguntas en resultados).
