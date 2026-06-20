# China 2026

Web del viaje familiar a China (julio 2026). Sitio **estático multipágina**, sin backend, preparado para funcionar también en China (fuentes, Tailwind y Leaflet auto-alojados).

## Páginas
- `index.html` — Inicio: portada + resumen de la ruta.
- `itinerario.html` — Itinerario día a día (21 jornadas, con anclas `#dia-N`).
- `hoteles.html` — Hoteles por ciudad (Pekín y Xi'an reservados; el resto, ejemplos por confirmar).
- `logistica.html` — Mapa interactivo + transporte interno.
- `preparativos.html` — Checklist con progreso guardado en el navegador.

Todas comparten cabecera, menú móvil, pie y el popup **"¿dónde estamos?"** (calcula la etapa actual según la fecha, en hora de China).

## Recompilar el CSS (tras editar clases de Tailwind)

```
npx tailwindcss@3 -c tailwind.config.js -i tailwind.input.css -o assets/tailwind.css --minify
```

`tailwind.config.js` escanea `./*.html`. Recursos en `assets/` (CSS compilado, fuentes `woff2`, Leaflet).
