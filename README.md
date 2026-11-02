# Vitrina Gamarra

Prototipo web para encontrar prendas en las galerías de Gamarra (Lima): buscas la prenda, ves en el plano qué stands la tienen y abres la vitrina de cada tienda con sus prendas más vistas, la ficha de cada prenda y un botón para escribir por WhatsApp.

Es un sitio estático: HTML, CSS y JavaScript sin frameworks ni backend. **Todos los datos actuales son de ejemplo.**

## Estructura

```
gamarra-mvp/
├── index.html          Página principal (incluye la vista previa para LinkedIn)
├── css/styles.css      Estilos (modo claro y oscuro)
├── js/data.js          Galerías, tiendas y prendas. Es el archivo que editas
├── js/catalogo.js      Tipos de prenda, descripciones y tipos de venta
├── js/app.js           Búsqueda, plano, vitrina de tienda y ficha de prenda
└── img/
    ├── og-cover.png    Imagen de la vista previa al compartir el link
    ├── favicon.svg
    └── prendas/        Aquí van las fotos reales de las prendas
```

`vitrina-gamarra.html` es el prototipo original en un solo archivo; ya no se usa.

## Verlo en tu computadora

Abre `index.html` con doble clic. Funciona sin servidor.

Si prefieres un servidor local:

```bash
npx serve .
```

## Cambiar los datos

Todo está en `js/data.js`:

- **Galería:** `nombre`, `direccion`, `entrada`, número de `pisos` y `mapa` (el texto que se busca en Google Maps).
- **Tienda:** `stand` = piso × 100 + posición. Las posiciones 1 a 6 van arriba del pasadizo y 7 a 12 abajo. `venta` es `"mayor"`, `"menor"` o `"ambos"`. `whatsapp` va con código de país y sin espacios: `"51987654321"`.
- **Prenda:** `categoria` es una de `polos`, `poleras`, `casacas`, `jeans`, `shorts`, `vestidos` o `buzos`. `descripcion` es opcional; si falta, se usa la de la categoría.

### Fotos reales

1. Guarda la foto en `img/prendas/`, por ejemplo `img/prendas/LB103-01.jpg`. Usa JPG de unos 800 px de ancho para que cargue rápido en el celular.
2. En `js/data.js`, en esa prenda, cambia `"foto": null` por `"foto": "img/prendas/LB103-01.jpg"`.

Las prendas y tiendas sin foto propia muestran una foto referencial de Unsplash (licencia libre), con su crédito. La lista está en `js/fotos.js`. Una tienda también acepta `"foto"` con la ruta a una imagen del local.

### Activar WhatsApp

Con `"demo": true` el botón no abre WhatsApp, para no escribir a números inventados. Cuando los números sean reales, pon `"demo": false` y el botón abrirá `wa.me` con el mensaje ya escrito.

## Pruebas

- **Datos:** `node tests/validar-datos.js` revisa galerías, stands, tiendas, prendas, precios y fotos. Ejecútalo cada vez que edites `js/data.js`.
- **Página:** abre la web, pega el contenido de `tests/pruebas-navegador.js` en la consola del navegador (F12) y ejecuta `await vgPruebas()`. Prueba cada tienda, cada prenda, búsquedas, filtros, plano, teclado, enlaces, portada y fotos.

## Enlace directo a una tienda

Cada tienda tiene su propio enlace: `https://tu-dominio/#LB-103`. Sirve para compartir una tienda concreta.

## Publicar en Vercel (gratis)

1. Sube esta carpeta a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com), entra con GitHub, elige **Add New → Project** e importa el repositorio. No hay que configurar nada porque es un sitio estático. Pulsa **Deploy**.
3. Vercel te da una dirección como `vitrina-gamarra.vercel.app`.
4. En `index.html`, reemplaza las dos apariciones de `TU-PROYECTO.vercel.app` por tu dirección real y vuelve a subir el cambio. LinkedIn necesita la dirección completa de la imagen para mostrar la tarjeta.
5. Revisa cómo se verá la tarjeta en el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/). Si cambias la imagen después, pasa el link por ahí otra vez para que LinkedIn la actualice.

Netlify o GitHub Pages también sirven: es un sitio estático.

## Medir visitas

1. En el proyecto de Vercel, abre **Analytics** y activa **Web Analytics**.
2. En `index.html`, quita el comentario de la línea `<script defer src="/_vercel/insights/script.js"></script>`.

Verás visitas, países y dispositivos. La página también envía eventos de búsquedas, tiendas abiertas, prendas vistas y clics en WhatsApp. Esos eventos personalizados pueden requerir un plan pago de Vercel; las visitas se ven en el plan gratis.

## Siguiente paso: backend

Las vistas y consultas que muestra cada tienda son de ejemplo, más lo que suma cada visitante en su propio navegador. Para que los comerciantes editen su tienda y vean sus números reales hace falta un backend (Supabase, Firebase o una API propia). La lógica de `js/app.js` se mantiene; solo cambia de dónde salen los datos.
