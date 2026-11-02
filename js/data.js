// Datos de Vitrina Gamarra.
// Edita este archivo para cambiar galerías, tiendas y prendas. Todo lo que hay ahora es de ejemplo.
// - venta: "mayor", "menor" o "ambos"
// - stand: piso * 100 + posición (1 a 6 arriba del pasadizo, 7 a 12 abajo). Ej: 212 = piso 2, posición 12
// - foto: ruta a una imagen dentro de img/prendas/, por ejemplo "img/prendas/LB103-01.jpg". Si es null se muestra un dibujo.
// - demo: true evita que el botón de WhatsApp abra números de ejemplo. Ponlo en false cuando los números sean reales.
window.VG_DATA = {
  "demo": true,
  "galerias": [
    {
      "id": "LB",
      "nombre": "Galería Las Brisas",
      "direccion": "Jr. Gamarra, cuadra 6 · ubicación referencial",
      "entrada": "Jr. Gamarra",
      "pisos": 3,
      "mapa": "Jirón Gamarra 600, La Victoria, Lima"
    },
    {
      "id": "NA",
      "nombre": "C.C. Nueva Aurora",
      "direccion": "Jr. Antonio Bazo, cuadra 7 · ubicación referencial",
      "entrada": "Jr. Antonio Bazo",
      "pisos": 2,
      "mapa": "Jirón Antonio Bazo 700, La Victoria, Lima"
    }
  ],
  "tiendas": [
    {
      "id": "LB-101",
      "galeria": "LB",
      "stand": 101,
      "nombre": "Confecciones Rosita",
      "venta": "ambos",
      "whatsapp": "51994734313",
      "consultas": 7,
      "prendas": [
        {
          "codigo": "LB101-01",
          "nombre": "Polo cuello V slim",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#D98A2B",
            "#3D5FA8",
            "#2F6F4F",
            "#C97B8F",
            "#E8E4DA"
          ],
          "stock": 31,
          "precioUnidad": 12,
          "precioDocena": 105,
          "vistas": 43,
          "foto": null
        },
        {
          "codigo": "LB101-02",
          "nombre": "Polera college",
          "categoria": "poleras",
          "tela": "Franela perchada",
          "tallas": "S · M · L · XL",
          "colores": [
            "#E8E4DA",
            "#9BB7D4",
            "#2F6F4F",
            "#C23B3B"
          ],
          "stock": 82,
          "precioUnidad": 33,
          "precioDocena": 305,
          "vistas": 573,
          "foto": null
        },
        {
          "codigo": "LB101-03",
          "nombre": "Polo estampado anime",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#B5A642",
            "#1F2A44",
            "#C23B3B",
            "#E8E4DA"
          ],
          "stock": 76,
          "precioUnidad": 25,
          "precioDocena": 245,
          "vistas": 48,
          "foto": null
        },
        {
          "codigo": "LB101-04",
          "nombre": "Polera oversize bordada",
          "categoria": "poleras",
          "tela": "Franela perchada",
          "tallas": "S · M · L · XL",
          "colores": [
            "#6B8E23",
            "#2F6F4F",
            "#1F2A44"
          ],
          "stock": 134,
          "precioUnidad": 31,
          "precioDocena": 290,
          "vistas": 256,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-103",
      "galeria": "LB",
      "stand": 103,
      "nombre": "Jeans Bravo",
      "venta": "mayor",
      "whatsapp": "51980894644",
      "consultas": 26,
      "prendas": [
        {
          "codigo": "LB103-01",
          "nombre": "Jean skinny strech",
          "categoria": "jeans",
          "tela": "Denim stretch 11 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#D98A2B",
            "#B5A642",
            "#C23B3B"
          ],
          "stock": 118,
          "precioUnidad": 46,
          "precioDocena": 440,
          "vistas": 493,
          "foto": null
        },
        {
          "codigo": "LB103-02",
          "nombre": "Short de niño",
          "categoria": "shorts",
          "tela": "Dry-fit",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#9BB7D4",
            "#B5A642",
            "#3D5FA8",
            "#D98A2B",
            "#E8E4DA"
          ],
          "stock": 85,
          "precioUnidad": 31,
          "precioDocena": 295,
          "vistas": 130,
          "foto": null
        },
        {
          "codigo": "LB103-03",
          "nombre": "Jean mom fit",
          "categoria": "jeans",
          "tela": "Denim stretch 11 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#2B2B2B",
            "#1F2A44",
            "#7A4B8C"
          ],
          "stock": 103,
          "precioUnidad": 49,
          "precioDocena": 455,
          "vistas": 470,
          "foto": null
        },
        {
          "codigo": "LB103-04",
          "nombre": "Short jean rasgado",
          "categoria": "shorts",
          "tela": "Denim",
          "tallas": "S · M · L · XL",
          "colores": [
            "#3D5FA8",
            "#1F2A44",
            "#C23B3B"
          ],
          "stock": 134,
          "precioUnidad": 20,
          "precioDocena": 175,
          "vistas": 84,
          "foto": null
        },
        {
          "codigo": "LB103-05",
          "nombre": "Jean wide leg",
          "categoria": "jeans",
          "tela": "Denim stretch 11 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#C97B8F",
            "#3D5FA8",
            "#2B2B2B",
            "#1F2A44"
          ],
          "stock": 25,
          "precioUnidad": 45,
          "precioDocena": 395,
          "vistas": 358,
          "foto": null
        },
        {
          "codigo": "LB103-06",
          "nombre": "Short de drill",
          "categoria": "shorts",
          "tela": "Denim",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#1F2A44",
            "#9BB7D4",
            "#B5A642"
          ],
          "stock": 120,
          "precioUnidad": 34,
          "precioDocena": 320,
          "vistas": 260,
          "foto": null
        },
        {
          "codigo": "LB103-08",
          "nombre": "Short deportivo",
          "categoria": "shorts",
          "tela": "Drill",
          "tallas": "S · M · L · XL",
          "colores": [
            "#1F2A44",
            "#6B8E23",
            "#B5A642",
            "#D98A2B",
            "#9BB7D4"
          ],
          "stock": 70,
          "precioUnidad": 20,
          "precioDocena": 175,
          "vistas": 256,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-104",
      "galeria": "LB",
      "stand": 104,
      "nombre": "Moda Kiara",
      "venta": "menor",
      "whatsapp": "51949730463",
      "consultas": 11,
      "prendas": [
        {
          "codigo": "LB104-01",
          "nombre": "Vestido de fiesta satinado",
          "categoria": "vestidos",
          "tela": "Viscosa",
          "tallas": "S · M · L · XL",
          "colores": [
            "#B5A642",
            "#D98A2B",
            "#7A4B8C",
            "#E8E4DA"
          ],
          "stock": 59,
          "precioUnidad": 75,
          "precioDocena": 650,
          "vistas": 867,
          "foto": null
        },
        {
          "codigo": "LB104-05",
          "nombre": "Vestido casual tejido",
          "categoria": "vestidos",
          "tela": "Tejido de punto",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#3D5FA8",
            "#E8E4DA",
            "#C23B3B",
            "#D98A2B"
          ],
          "stock": 109,
          "precioUnidad": 38,
          "precioDocena": 340,
          "vistas": 493,
          "foto": null
        },
        {
          "codigo": "LB104-06",
          "nombre": "Vestido de niña con vuelo",
          "categoria": "vestidos",
          "tela": "Tejido de punto",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#2B2B2B",
            "#2F6F4F",
            "#E8E4DA",
            "#6B8E23"
          ],
          "stock": 28,
          "precioUnidad": 60,
          "precioDocena": 575,
          "vistas": 137,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-107",
      "galeria": "LB",
      "stand": 107,
      "nombre": "Textil San Martín",
      "venta": "mayor",
      "whatsapp": "51934658455",
      "consultas": 19,
      "prendas": [
        {
          "codigo": "LB107-01",
          "nombre": "Polo pima peruano",
          "categoria": "polos",
          "tela": "Algodón pima",
          "tallas": "S · M · L · XL",
          "colores": [
            "#B5A642",
            "#C23B3B",
            "#E8E4DA",
            "#6B8E23",
            "#3D5FA8"
          ],
          "stock": 39,
          "precioUnidad": 14,
          "precioDocena": 125,
          "vistas": 428,
          "foto": null
        },
        {
          "codigo": "LB107-02",
          "nombre": "Polo básico cuello redondo",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#3D5FA8",
            "#C23B3B"
          ],
          "stock": 113,
          "precioUnidad": 22,
          "precioDocena": 210,
          "vistas": 174,
          "foto": null
        },
        {
          "codigo": "LB107-03",
          "nombre": "Polo oversize algodón",
          "categoria": "polos",
          "tela": "Algodón pima",
          "tallas": "S · M · L · XL",
          "colores": [
            "#D98A2B",
            "#1F2A44",
            "#9BB7D4",
            "#B5A642"
          ],
          "stock": 151,
          "precioUnidad": 22,
          "precioDocena": 210,
          "vistas": 779,
          "foto": null
        },
        {
          "codigo": "LB107-05",
          "nombre": "Polo estampado anime",
          "categoria": "polos",
          "tela": "Algodón pima",
          "tallas": "S · M · L · XL",
          "colores": [
            "#6B8E23",
            "#E8E4DA",
            "#9BB7D4"
          ],
          "stock": 147,
          "precioUnidad": 20,
          "precioDocena": 180,
          "vistas": 136,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-109",
      "galeria": "LB",
      "stand": 109,
      "nombre": "Urban Lima",
      "venta": "ambos",
      "whatsapp": "51982314594",
      "consultas": 10,
      "prendas": [
        {
          "codigo": "LB109-01",
          "nombre": "Polera cuello redondo",
          "categoria": "poleras",
          "tela": "Algodón french terry",
          "tallas": "S · M · L · XL",
          "colores": [
            "#1F2A44",
            "#2F6F4F",
            "#E8E4DA",
            "#C23B3B",
            "#7A4B8C"
          ],
          "stock": 79,
          "precioUnidad": 52,
          "precioDocena": 480,
          "vistas": 399,
          "foto": null
        },
        {
          "codigo": "LB109-02",
          "nombre": "Buzo escolar",
          "categoria": "buzos",
          "tela": "Polialgodón",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#E8E4DA",
            "#9BB7D4",
            "#3D5FA8"
          ],
          "stock": 146,
          "precioUnidad": 34,
          "precioDocena": 320,
          "vistas": 641,
          "foto": null
        },
        {
          "codigo": "LB109-03",
          "nombre": "Polera college",
          "categoria": "poleras",
          "tela": "Franela perchada",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C97B8F",
            "#3D5FA8",
            "#E8E4DA",
            "#1F2A44",
            "#B5A642"
          ],
          "stock": 28,
          "precioUnidad": 45,
          "precioDocena": 410,
          "vistas": 92,
          "foto": null
        },
        {
          "codigo": "LB109-04",
          "nombre": "Conjunto buzo franela",
          "categoria": "buzos",
          "tela": "Algodón french terry",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#1F2A44",
            "#D98A2B",
            "#B5A642",
            "#C97B8F"
          ],
          "stock": 28,
          "precioUnidad": 36,
          "precioDocena": 350,
          "vistas": 764,
          "foto": null
        },
        {
          "codigo": "LB109-05",
          "nombre": "Polera con capucha franela",
          "categoria": "poleras",
          "tela": "Algodón french terry",
          "tallas": "S · M · L · XL",
          "colores": [
            "#1F2A44",
            "#D98A2B",
            "#E8E4DA",
            "#2B2B2B"
          ],
          "stock": 105,
          "precioUnidad": 48,
          "precioDocena": 455,
          "vistas": 510,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-112",
      "galeria": "LB",
      "stand": 112,
      "nombre": "Pequeños Pasos",
      "venta": "ambos",
      "whatsapp": "51943969967",
      "consultas": 5,
      "prendas": [
        {
          "codigo": "LB112-01",
          "nombre": "Polo oversize algodón",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#3D5FA8",
            "#1F2A44",
            "#E8E4DA",
            "#C23B3B",
            "#B5A642"
          ],
          "stock": 115,
          "precioUnidad": 25,
          "precioDocena": 225,
          "vistas": 128,
          "foto": null
        },
        {
          "codigo": "LB112-02",
          "nombre": "Short deportivo",
          "categoria": "shorts",
          "tela": "Dry-fit",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#2F6F4F",
            "#6B8E23",
            "#3D5FA8",
            "#9BB7D4",
            "#E8E4DA"
          ],
          "stock": 40,
          "precioUnidad": 20,
          "precioDocena": 180,
          "vistas": 53,
          "foto": null
        },
        {
          "codigo": "LB112-03",
          "nombre": "Vestido floral",
          "categoria": "vestidos",
          "tela": "Satín",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#6B8E23",
            "#9BB7D4",
            "#E8E4DA",
            "#C97B8F",
            "#D98A2B"
          ],
          "stock": 58,
          "precioUnidad": 68,
          "precioDocena": 650,
          "vistas": 1151,
          "foto": null
        },
        {
          "codigo": "LB112-04",
          "nombre": "Polo estampado anime",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#9BB7D4",
            "#C23B3B",
            "#2B2B2B"
          ],
          "stock": 140,
          "precioUnidad": 23,
          "precioDocena": 210,
          "vistas": 477,
          "foto": null
        },
        {
          "codigo": "LB112-05",
          "nombre": "Short jean rasgado",
          "categoria": "shorts",
          "tela": "Dry-fit",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#C23B3B",
            "#C97B8F",
            "#3D5FA8",
            "#9BB7D4"
          ],
          "stock": 39,
          "precioUnidad": 33,
          "precioDocena": 305,
          "vistas": 115,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-201",
      "galeria": "LB",
      "stand": 201,
      "nombre": "Casacas del Centro",
      "venta": "mayor",
      "whatsapp": "51960823118",
      "consultas": 13,
      "prendas": [
        {
          "codigo": "LB201-01",
          "nombre": "Casaca de cuerina",
          "categoria": "casacas",
          "tela": "Nylon acolchado",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#C23B3B",
            "#1F2A44",
            "#6B8E23",
            "#7A4B8C"
          ],
          "stock": 98,
          "precioUnidad": 100,
          "precioDocena": 970,
          "vistas": 283,
          "foto": null
        },
        {
          "codigo": "LB201-03",
          "nombre": "Casaca acolchada",
          "categoria": "casacas",
          "tela": "Denim 12 oz",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#6B8E23",
            "#2B2B2B",
            "#D98A2B",
            "#2F6F4F"
          ],
          "stock": 27,
          "precioUnidad": 87,
          "precioDocena": 830,
          "vistas": 907,
          "foto": null
        },
        {
          "codigo": "LB201-04",
          "nombre": "Casaca cortaviento",
          "categoria": "casacas",
          "tela": "Denim 12 oz",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#7A4B8C",
            "#1F2A44"
          ],
          "stock": 108,
          "precioUnidad": 46,
          "precioDocena": 405,
          "vistas": 56,
          "foto": null
        },
        {
          "codigo": "LB201-06",
          "nombre": "Casaca jean",
          "categoria": "casacas",
          "tela": "Nylon acolchado",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#7A4B8C",
            "#E8E4DA",
            "#3D5FA8",
            "#D98A2B"
          ],
          "stock": 20,
          "precioUnidad": 46,
          "precioDocena": 425,
          "vistas": 545,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-202",
      "galeria": "LB",
      "stand": 202,
      "nombre": "Denim Factory",
      "venta": "mayor",
      "whatsapp": "51990555342",
      "consultas": 19,
      "prendas": [
        {
          "codigo": "LB202-01",
          "nombre": "Jean mom fit",
          "categoria": "jeans",
          "tela": "Denim stretch 11 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#D98A2B",
            "#1F2A44",
            "#2F6F4F"
          ],
          "stock": 51,
          "precioUnidad": 36,
          "precioDocena": 345,
          "vistas": 69,
          "foto": null
        },
        {
          "codigo": "LB202-02",
          "nombre": "Casaca bomber",
          "categoria": "casacas",
          "tela": "Poliéster impermeable",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#C23B3B",
            "#2B2B2B"
          ],
          "stock": 104,
          "precioUnidad": 97,
          "precioDocena": 925,
          "vistas": 152,
          "foto": null
        },
        {
          "codigo": "LB202-03",
          "nombre": "Jean skinny strech",
          "categoria": "jeans",
          "tela": "Denim rígido 13 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#E8E4DA",
            "#3D5FA8",
            "#7A4B8C",
            "#2F6F4F",
            "#D98A2B"
          ],
          "stock": 113,
          "precioUnidad": 59,
          "precioDocena": 525,
          "vistas": 299,
          "foto": null
        },
        {
          "codigo": "LB202-04",
          "nombre": "Casaca de cuerina",
          "categoria": "casacas",
          "tela": "Poliéster impermeable",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#E8E4DA",
            "#C23B3B",
            "#B5A642",
            "#2B2B2B"
          ],
          "stock": 149,
          "precioUnidad": 46,
          "precioDocena": 450,
          "vistas": 124,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-205",
      "galeria": "LB",
      "stand": 205,
      "nombre": "Sport Andes",
      "venta": "ambos",
      "whatsapp": "51951425372",
      "consultas": 9,
      "prendas": [
        {
          "codigo": "LB205-01",
          "nombre": "Conjunto buzo franela",
          "categoria": "buzos",
          "tela": "Franela",
          "tallas": "S · M · L · XL",
          "colores": [
            "#E8E4DA",
            "#B5A642",
            "#1F2A44",
            "#2B2B2B",
            "#6B8E23"
          ],
          "stock": 94,
          "precioUnidad": 30,
          "precioDocena": 270,
          "vistas": 339,
          "foto": null
        },
        {
          "codigo": "LB205-02",
          "nombre": "Short deportivo",
          "categoria": "shorts",
          "tela": "Drill",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2B2B2B",
            "#C23B3B",
            "#D98A2B"
          ],
          "stock": 51,
          "precioUnidad": 21,
          "precioDocena": 200,
          "vistas": 168,
          "foto": null
        },
        {
          "codigo": "LB205-03",
          "nombre": "Buzo jogger",
          "categoria": "buzos",
          "tela": "Algodón french terry",
          "tallas": "S · M · L · XL",
          "colores": [
            "#7A4B8C",
            "#9BB7D4",
            "#6B8E23"
          ],
          "stock": 115,
          "precioUnidad": 45,
          "precioDocena": 405,
          "vistas": 48,
          "foto": null
        },
        {
          "codigo": "LB205-05",
          "nombre": "Buzo escolar",
          "categoria": "buzos",
          "tela": "Polialgodón",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#2F6F4F",
            "#1F2A44",
            "#C23B3B"
          ],
          "stock": 72,
          "precioUnidad": 44,
          "precioDocena": 425,
          "vistas": 769,
          "foto": null
        },
        {
          "codigo": "LB205-06",
          "nombre": "Short de drill",
          "categoria": "shorts",
          "tela": "Drill",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#9BB7D4",
            "#E8E4DA",
            "#3D5FA8"
          ],
          "stock": 42,
          "precioUnidad": 34,
          "precioDocena": 310,
          "vistas": 161,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-208",
      "galeria": "LB",
      "stand": 208,
      "nombre": "Bella Moda",
      "venta": "menor",
      "whatsapp": "51961990320",
      "consultas": 20,
      "prendas": [
        {
          "codigo": "LB208-01",
          "nombre": "Vestido de fiesta satinado",
          "categoria": "vestidos",
          "tela": "Satín",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#3D5FA8",
            "#7A4B8C",
            "#C97B8F"
          ],
          "stock": 127,
          "precioUnidad": 47,
          "precioDocena": 425,
          "vistas": 62,
          "foto": null
        },
        {
          "codigo": "LB208-02",
          "nombre": "Polo oversize algodón",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C97B8F",
            "#1F2A44",
            "#2B2B2B"
          ],
          "stock": 139,
          "precioUnidad": 18,
          "precioDocena": 175,
          "vistas": 45,
          "foto": null
        },
        {
          "codigo": "LB208-03",
          "nombre": "Vestido casual tejido",
          "categoria": "vestidos",
          "tela": "Satín",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#7A4B8C",
            "#C23B3B",
            "#C97B8F",
            "#1F2A44"
          ],
          "stock": 103,
          "precioUnidad": 46,
          "precioDocena": 450,
          "vistas": 589,
          "foto": null
        },
        {
          "codigo": "LB208-04",
          "nombre": "Polo básico cuello redondo",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#D98A2B",
            "#1F2A44",
            "#2B2B2B"
          ],
          "stock": 99,
          "precioUnidad": 26,
          "precioDocena": 240,
          "vistas": 250,
          "foto": null
        },
        {
          "codigo": "LB208-05",
          "nombre": "Vestido de niña con vuelo",
          "categoria": "vestidos",
          "tela": "Viscosa",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#C23B3B",
            "#1F2A44",
            "#E8E4DA",
            "#6B8E23"
          ],
          "stock": 39,
          "precioUnidad": 44,
          "precioDocena": 385,
          "vistas": 227,
          "foto": null
        },
        {
          "codigo": "LB208-06",
          "nombre": "Polo estampado anime",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#D98A2B",
            "#1F2A44"
          ],
          "stock": 50,
          "precioUnidad": 17,
          "precioDocena": 165,
          "vistas": 298,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-210",
      "galeria": "LB",
      "stand": 210,
      "nombre": "Estampados Rímac",
      "venta": "ambos",
      "whatsapp": "51951256254",
      "consultas": 4,
      "prendas": [
        {
          "codigo": "LB210-01",
          "nombre": "Polo oversize algodón",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#E8E4DA",
            "#2B2B2B",
            "#1F2A44"
          ],
          "stock": 81,
          "precioUnidad": 15,
          "precioDocena": 130,
          "vistas": 146,
          "foto": null
        },
        {
          "codigo": "LB210-02",
          "nombre": "Polera college",
          "categoria": "poleras",
          "tela": "Franela perchada",
          "tallas": "S · M · L · XL",
          "colores": [
            "#7A4B8C",
            "#2F6F4F",
            "#6B8E23",
            "#1F2A44"
          ],
          "stock": 39,
          "precioUnidad": 53,
          "precioDocena": 505,
          "vistas": 191,
          "foto": null
        },
        {
          "codigo": "LB210-03",
          "nombre": "Polo manga larga",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#B5A642",
            "#1F2A44",
            "#C97B8F",
            "#2B2B2B",
            "#E8E4DA"
          ],
          "stock": 67,
          "precioUnidad": 27,
          "precioDocena": 245,
          "vistas": 921,
          "foto": null
        },
        {
          "codigo": "LB210-05",
          "nombre": "Polo básico cuello redondo",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#D98A2B",
            "#9BB7D4",
            "#B5A642",
            "#1F2A44",
            "#6B8E23"
          ],
          "stock": 142,
          "precioUnidad": 19,
          "precioDocena": 165,
          "vistas": 75,
          "foto": null
        },
        {
          "codigo": "LB210-06",
          "nombre": "Polera con capucha franela",
          "categoria": "poleras",
          "tela": "Franela perchada",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#7A4B8C",
            "#E8E4DA",
            "#2F6F4F",
            "#3D5FA8"
          ],
          "stock": 130,
          "precioUnidad": 52,
          "precioDocena": 495,
          "vistas": 948,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-301",
      "galeria": "LB",
      "stand": 301,
      "nombre": "Oversize Club",
      "venta": "menor",
      "whatsapp": "51918601572",
      "consultas": 8,
      "prendas": [
        {
          "codigo": "LB301-01",
          "nombre": "Polo manga larga",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#B5A642",
            "#1F2A44",
            "#D98A2B",
            "#6B8E23"
          ],
          "stock": 117,
          "precioUnidad": 21,
          "precioDocena": 185,
          "vistas": 140,
          "foto": null
        },
        {
          "codigo": "LB301-02",
          "nombre": "Polera oversize bordada",
          "categoria": "poleras",
          "tela": "Algodón french terry",
          "tallas": "S · M · L · XL",
          "colores": [
            "#6B8E23",
            "#E8E4DA",
            "#1F2A44",
            "#B5A642",
            "#2B2B2B"
          ],
          "stock": 43,
          "precioUnidad": 34,
          "precioDocena": 295,
          "vistas": 69,
          "foto": null
        },
        {
          "codigo": "LB301-04",
          "nombre": "Polera con capucha franela",
          "categoria": "poleras",
          "tela": "Franela perchada",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#1F2A44",
            "#3D5FA8",
            "#7A4B8C",
            "#2B2B2B"
          ],
          "stock": 149,
          "precioUnidad": 48,
          "precioDocena": 445,
          "vistas": 641,
          "foto": null
        },
        {
          "codigo": "LB301-05",
          "nombre": "Polo cuello V slim",
          "categoria": "polos",
          "tela": "Algodón pima",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#1F2A44",
            "#B5A642",
            "#C97B8F",
            "#9BB7D4"
          ],
          "stock": 103,
          "precioUnidad": 13,
          "precioDocena": 115,
          "vistas": 216,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-304",
      "galeria": "LB",
      "stand": 304,
      "nombre": "Confecciones Yaneth",
      "venta": "mayor",
      "whatsapp": "51963530642",
      "consultas": 9,
      "prendas": [
        {
          "codigo": "LB304-01",
          "nombre": "Vestido casual tejido",
          "categoria": "vestidos",
          "tela": "Viscosa",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#1F2A44",
            "#3D5FA8"
          ],
          "stock": 25,
          "precioUnidad": 88,
          "precioDocena": 810,
          "vistas": 455,
          "foto": null
        },
        {
          "codigo": "LB304-02",
          "nombre": "Vestido floral",
          "categoria": "vestidos",
          "tela": "Satín",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C97B8F",
            "#7A4B8C",
            "#6B8E23"
          ],
          "stock": 109,
          "precioUnidad": 82,
          "precioDocena": 730,
          "vistas": 365,
          "foto": null
        },
        {
          "codigo": "LB304-07",
          "nombre": "Vestido de fiesta satinado",
          "categoria": "vestidos",
          "tela": "Satín",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C97B8F",
            "#3D5FA8",
            "#C23B3B",
            "#1F2A44",
            "#2F6F4F"
          ],
          "stock": 14,
          "precioUnidad": 75,
          "precioDocena": 675,
          "vistas": 409,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-306",
      "galeria": "LB",
      "stand": 306,
      "nombre": "Jogger House",
      "venta": "ambos",
      "whatsapp": "51924726115",
      "consultas": 11,
      "prendas": [
        {
          "codigo": "LB306-01",
          "nombre": "Pantalón cargo jogger",
          "categoria": "buzos",
          "tela": "Algodón french terry",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#C97B8F",
            "#C23B3B"
          ],
          "stock": 68,
          "precioUnidad": 42,
          "precioDocena": 400,
          "vistas": 114,
          "foto": null
        },
        {
          "codigo": "LB306-03",
          "nombre": "Buzo jogger",
          "categoria": "buzos",
          "tela": "Algodón french terry",
          "tallas": "S · M · L · XL",
          "colores": [
            "#1F2A44",
            "#C23B3B",
            "#7A4B8C",
            "#B5A642",
            "#E8E4DA"
          ],
          "stock": 144,
          "precioUnidad": 30,
          "precioDocena": 275,
          "vistas": 414,
          "foto": null
        },
        {
          "codigo": "LB306-05",
          "nombre": "Conjunto buzo franela",
          "categoria": "buzos",
          "tela": "Franela",
          "tallas": "S · M · L · XL",
          "colores": [
            "#6B8E23",
            "#1F2A44",
            "#C23B3B",
            "#B5A642",
            "#2F6F4F"
          ],
          "stock": 23,
          "precioUnidad": 41,
          "precioDocena": 365,
          "vistas": 52,
          "foto": null
        },
        {
          "codigo": "LB306-06",
          "nombre": "Buzo escolar",
          "categoria": "buzos",
          "tela": "Polialgodón",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#D98A2B",
            "#1F2A44",
            "#9BB7D4"
          ],
          "stock": 46,
          "precioUnidad": 43,
          "precioDocena": 390,
          "vistas": 1097,
          "foto": null
        }
      ]
    },
    {
      "id": "LB-311",
      "galeria": "LB",
      "stand": 311,
      "nombre": "Pima Selecto",
      "venta": "mayor",
      "whatsapp": "51983292574",
      "consultas": 12,
      "prendas": [
        {
          "codigo": "LB311-01",
          "nombre": "Polo manga larga",
          "categoria": "polos",
          "tela": "Algodón pima",
          "tallas": "S · M · L · XL",
          "colores": [
            "#B5A642",
            "#E8E4DA",
            "#1F2A44",
            "#6B8E23"
          ],
          "stock": 77,
          "precioUnidad": 22,
          "precioDocena": 200,
          "vistas": 61,
          "foto": null
        },
        {
          "codigo": "LB311-03",
          "nombre": "Polo oversize algodón",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#1F2A44",
            "#6B8E23",
            "#E8E4DA",
            "#C97B8F"
          ],
          "stock": 84,
          "precioUnidad": 18,
          "precioDocena": 170,
          "vistas": 182,
          "foto": null
        },
        {
          "codigo": "LB311-04",
          "nombre": "Polo pima peruano",
          "categoria": "polos",
          "tela": "Algodón pima",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#3D5FA8",
            "#B5A642",
            "#1F2A44"
          ],
          "stock": 142,
          "precioUnidad": 26,
          "precioDocena": 235,
          "vistas": 131,
          "foto": null
        },
        {
          "codigo": "LB311-07",
          "nombre": "Polo estampado anime",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#7A4B8C",
            "#E8E4DA",
            "#C97B8F"
          ],
          "stock": 45,
          "precioUnidad": 16,
          "precioDocena": 150,
          "vistas": 446,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-102",
      "galeria": "NA",
      "stand": 102,
      "nombre": "Moda Juvenil Kevin",
      "venta": "ambos",
      "whatsapp": "51930969425",
      "consultas": 9,
      "prendas": [
        {
          "codigo": "NA102-01",
          "nombre": "Jean skinny strech",
          "categoria": "jeans",
          "tela": "Denim rígido 13 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#9BB7D4",
            "#E8E4DA",
            "#2F6F4F",
            "#1F2A44"
          ],
          "stock": 92,
          "precioUnidad": 72,
          "precioDocena": 685,
          "vistas": 501,
          "foto": null
        },
        {
          "codigo": "NA102-02",
          "nombre": "Polo pima peruano",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#C97B8F",
            "#1F2A44"
          ],
          "stock": 15,
          "precioUnidad": 15,
          "precioDocena": 135,
          "vistas": 148,
          "foto": null
        },
        {
          "codigo": "NA102-03",
          "nombre": "Jean recto clásico",
          "categoria": "jeans",
          "tela": "Denim stretch 11 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#E8E4DA",
            "#2F6F4F",
            "#D98A2B",
            "#3D5FA8"
          ],
          "stock": 12,
          "precioUnidad": 67,
          "precioDocena": 620,
          "vistas": 233,
          "foto": null
        },
        {
          "codigo": "NA102-04",
          "nombre": "Polo manga larga",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#1F2A44",
            "#2F6F4F",
            "#2B2B2B"
          ],
          "stock": 77,
          "precioUnidad": 22,
          "precioDocena": 210,
          "vistas": 1080,
          "foto": null
        },
        {
          "codigo": "NA102-06",
          "nombre": "Polo oversize algodón",
          "categoria": "polos",
          "tela": "Algodón pima",
          "tallas": "S · M · L · XL",
          "colores": [
            "#6B8E23",
            "#C23B3B",
            "#3D5FA8",
            "#2F6F4F"
          ],
          "stock": 56,
          "precioUnidad": 19,
          "precioDocena": 175,
          "vistas": 58,
          "foto": null
        },
        {
          "codigo": "NA102-08",
          "nombre": "Polo estampado anime",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2B2B2B",
            "#E8E4DA",
            "#9BB7D4",
            "#B5A642",
            "#1F2A44"
          ],
          "stock": 102,
          "precioUnidad": 17,
          "precioDocena": 155,
          "vistas": 211,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-105",
      "galeria": "NA",
      "stand": 105,
      "nombre": "Textiles Chincha",
      "venta": "mayor",
      "whatsapp": "51966435238",
      "consultas": 18,
      "prendas": [
        {
          "codigo": "NA105-01",
          "nombre": "Polo básico cuello redondo",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#7A4B8C",
            "#2B2B2B"
          ],
          "stock": 64,
          "precioUnidad": 16,
          "precioDocena": 145,
          "vistas": 550,
          "foto": null
        },
        {
          "codigo": "NA105-02",
          "nombre": "Buzo escolar",
          "categoria": "buzos",
          "tela": "Algodón french terry",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#B5A642",
            "#C97B8F",
            "#2F6F4F",
            "#2B2B2B",
            "#E8E4DA"
          ],
          "stock": 81,
          "precioUnidad": 49,
          "precioDocena": 450,
          "vistas": 586,
          "foto": null
        },
        {
          "codigo": "NA105-03",
          "nombre": "Polo pima peruano",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#6B8E23",
            "#2F6F4F",
            "#C97B8F",
            "#E8E4DA"
          ],
          "stock": 15,
          "precioUnidad": 19,
          "precioDocena": 175,
          "vistas": 244,
          "foto": null
        },
        {
          "codigo": "NA105-04",
          "nombre": "Conjunto buzo franela",
          "categoria": "buzos",
          "tela": "Algodón french terry",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#C23B3B",
            "#1F2A44",
            "#2B2B2B",
            "#D98A2B"
          ],
          "stock": 145,
          "precioUnidad": 46,
          "precioDocena": 430,
          "vistas": 219,
          "foto": null
        },
        {
          "codigo": "NA105-05",
          "nombre": "Polo cuello V slim",
          "categoria": "polos",
          "tela": "Algodón pima",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#3D5FA8",
            "#6B8E23"
          ],
          "stock": 74,
          "precioUnidad": 20,
          "precioDocena": 195,
          "vistas": 66,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-106",
      "galeria": "NA",
      "stand": 106,
      "nombre": "Kids Arcoíris",
      "venta": "ambos",
      "whatsapp": "51912515264",
      "consultas": 4,
      "prendas": [
        {
          "codigo": "NA106-01",
          "nombre": "Polo cuello V slim",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#C23B3B",
            "#9BB7D4",
            "#2F6F4F",
            "#B5A642",
            "#2B2B2B"
          ],
          "stock": 61,
          "precioUnidad": 19,
          "precioDocena": 170,
          "vistas": 304,
          "foto": null
        },
        {
          "codigo": "NA106-02",
          "nombre": "Vestido de fiesta satinado",
          "categoria": "vestidos",
          "tela": "Viscosa",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#1F2A44",
            "#9BB7D4",
            "#3D5FA8"
          ],
          "stock": 69,
          "precioUnidad": 59,
          "precioDocena": 515,
          "vistas": 442,
          "foto": null
        },
        {
          "codigo": "NA106-03",
          "nombre": "Short deportivo",
          "categoria": "shorts",
          "tela": "Dry-fit",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#C97B8F",
            "#C23B3B",
            "#6B8E23",
            "#3D5FA8"
          ],
          "stock": 14,
          "precioUnidad": 32,
          "precioDocena": 305,
          "vistas": 497,
          "foto": null
        },
        {
          "codigo": "NA106-04",
          "nombre": "Polo pima peruano",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#2B2B2B",
            "#E8E4DA",
            "#C23B3B",
            "#6B8E23"
          ],
          "stock": 12,
          "precioUnidad": 21,
          "precioDocena": 205,
          "vistas": 69,
          "foto": null
        },
        {
          "codigo": "NA106-05",
          "nombre": "Vestido de niña con vuelo",
          "categoria": "vestidos",
          "tela": "Satín",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#2F6F4F",
            "#7A4B8C",
            "#9BB7D4",
            "#B5A642",
            "#3D5FA8"
          ],
          "stock": 148,
          "precioUnidad": 69,
          "precioDocena": 640,
          "vistas": 43,
          "foto": null
        },
        {
          "codigo": "NA106-06",
          "nombre": "Short jean rasgado",
          "categoria": "shorts",
          "tela": "Drill",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#B5A642",
            "#2F6F4F",
            "#C23B3B",
            "#C97B8F"
          ],
          "stock": 94,
          "precioUnidad": 21,
          "precioDocena": 185,
          "vistas": 473,
          "foto": null
        },
        {
          "codigo": "NA106-07",
          "nombre": "Polo manga larga",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#C97B8F",
            "#C23B3B",
            "#1F2A44"
          ],
          "stock": 61,
          "precioUnidad": 18,
          "precioDocena": 170,
          "vistas": 347,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-108",
      "galeria": "NA",
      "stand": 108,
      "nombre": "Abrigo Total",
      "venta": "mayor",
      "whatsapp": "51932124803",
      "consultas": 23,
      "prendas": [
        {
          "codigo": "NA108-01",
          "nombre": "Casaca jean",
          "categoria": "casacas",
          "tela": "Poliéster impermeable",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2F6F4F",
            "#7A4B8C",
            "#C97B8F",
            "#E8E4DA",
            "#1F2A44"
          ],
          "stock": 99,
          "precioUnidad": 69,
          "precioDocena": 610,
          "vistas": 281,
          "foto": null
        },
        {
          "codigo": "NA108-02",
          "nombre": "Polera college",
          "categoria": "poleras",
          "tela": "Franela perchada",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#D98A2B",
            "#1F2A44"
          ],
          "stock": 78,
          "precioUnidad": 31,
          "precioDocena": 295,
          "vistas": 48,
          "foto": null
        },
        {
          "codigo": "NA108-03",
          "nombre": "Casaca acolchada",
          "categoria": "casacas",
          "tela": "Denim 12 oz",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2B2B2B",
            "#7A4B8C",
            "#D98A2B"
          ],
          "stock": 148,
          "precioUnidad": 117,
          "precioDocena": 1060,
          "vistas": 309,
          "foto": null
        },
        {
          "codigo": "NA108-05",
          "nombre": "Casaca bomber",
          "categoria": "casacas",
          "tela": "Poliéster impermeable",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#7A4B8C",
            "#2B2B2B",
            "#B5A642",
            "#D98A2B"
          ],
          "stock": 122,
          "precioUnidad": 84,
          "precioDocena": 730,
          "vistas": 144,
          "foto": null
        },
        {
          "codigo": "NA108-06",
          "nombre": "Polera oversize bordada",
          "categoria": "poleras",
          "tela": "Franela perchada",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#6B8E23",
            "#C97B8F"
          ],
          "stock": 17,
          "precioUnidad": 44,
          "precioDocena": 395,
          "vistas": 432,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-111",
      "galeria": "NA",
      "stand": 111,
      "nombre": "Damas & Estilo",
      "venta": "menor",
      "whatsapp": "51998175897",
      "consultas": 3,
      "prendas": [
        {
          "codigo": "NA111-01",
          "nombre": "Vestido floral",
          "categoria": "vestidos",
          "tela": "Viscosa",
          "tallas": "S · M · L · XL",
          "colores": [
            "#B5A642",
            "#2B2B2B",
            "#C97B8F",
            "#7A4B8C",
            "#D98A2B"
          ],
          "stock": 133,
          "precioUnidad": 65,
          "precioDocena": 590,
          "vistas": 221,
          "foto": null
        },
        {
          "codigo": "NA111-02",
          "nombre": "Jean skinny strech",
          "categoria": "jeans",
          "tela": "Denim rígido 13 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#6B8E23",
            "#C97B8F",
            "#7A4B8C"
          ],
          "stock": 127,
          "precioUnidad": 50,
          "precioDocena": 430,
          "vistas": 630,
          "foto": null
        },
        {
          "codigo": "NA111-03",
          "nombre": "Vestido de niña con vuelo",
          "categoria": "vestidos",
          "tela": "Viscosa",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#D98A2B",
            "#3D5FA8",
            "#1F2A44",
            "#C23B3B",
            "#2B2B2B"
          ],
          "stock": 48,
          "precioUnidad": 75,
          "precioDocena": 650,
          "vistas": 494,
          "foto": null
        },
        {
          "codigo": "NA111-06",
          "nombre": "Jean recto clásico",
          "categoria": "jeans",
          "tela": "Denim stretch 11 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#6B8E23",
            "#C23B3B",
            "#2F6F4F",
            "#D98A2B",
            "#C97B8F"
          ],
          "stock": 42,
          "precioUnidad": 54,
          "precioDocena": 470,
          "vistas": 625,
          "foto": null
        },
        {
          "codigo": "NA111-07",
          "nombre": "Vestido casual tejido",
          "categoria": "vestidos",
          "tela": "Satín",
          "tallas": "S · M · L · XL",
          "colores": [
            "#E8E4DA",
            "#1F2A44",
            "#7A4B8C",
            "#D98A2B",
            "#6B8E23"
          ],
          "stock": 98,
          "precioUnidad": 88,
          "precioDocena": 820,
          "vistas": 196,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-203",
      "galeria": "NA",
      "stand": 203,
      "nombre": "Jeans Mayorista Lucho",
      "venta": "mayor",
      "whatsapp": "51913204897",
      "consultas": 10,
      "prendas": [
        {
          "codigo": "NA203-01",
          "nombre": "Jean cargo",
          "categoria": "jeans",
          "tela": "Denim rígido 13 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#1F2A44",
            "#D98A2B",
            "#9BB7D4"
          ],
          "stock": 139,
          "precioUnidad": 49,
          "precioDocena": 430,
          "vistas": 615,
          "foto": null
        },
        {
          "codigo": "NA203-02",
          "nombre": "Jean recto clásico",
          "categoria": "jeans",
          "tela": "Denim stretch 11 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#C97B8F",
            "#D98A2B",
            "#B5A642",
            "#6B8E23"
          ],
          "stock": 129,
          "precioUnidad": 64,
          "precioDocena": 610,
          "vistas": 854,
          "foto": null
        },
        {
          "codigo": "NA203-03",
          "nombre": "Jean wide leg",
          "categoria": "jeans",
          "tela": "Denim stretch 11 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#C23B3B",
            "#7A4B8C",
            "#1F2A44",
            "#3D5FA8",
            "#6B8E23"
          ],
          "stock": 150,
          "precioUnidad": 75,
          "precioDocena": 715,
          "vistas": 91,
          "foto": null
        },
        {
          "codigo": "NA203-04",
          "nombre": "Jean mom fit",
          "categoria": "jeans",
          "tela": "Denim rígido 13 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#C97B8F",
            "#D98A2B",
            "#E8E4DA",
            "#2F6F4F"
          ],
          "stock": 123,
          "precioUnidad": 45,
          "precioDocena": 440,
          "vistas": 65,
          "foto": null
        },
        {
          "codigo": "NA203-07",
          "nombre": "Jean skinny strech",
          "categoria": "jeans",
          "tela": "Denim stretch 11 oz",
          "tallas": "26 · 28 · 30 · 32 · 34 · 36",
          "colores": [
            "#6B8E23",
            "#C97B8F",
            "#E8E4DA",
            "#7A4B8C",
            "#2B2B2B"
          ],
          "stock": 120,
          "precioUnidad": 72,
          "precioDocena": 695,
          "vistas": 419,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-204",
      "galeria": "NA",
      "stand": 204,
      "nombre": "Tendencia Coreana",
      "venta": "menor",
      "whatsapp": "51967374212",
      "consultas": 23,
      "prendas": [
        {
          "codigo": "NA204-01",
          "nombre": "Polo manga larga",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#B5A642",
            "#1F2A44",
            "#C23B3B",
            "#7A4B8C",
            "#D98A2B"
          ],
          "stock": 60,
          "precioUnidad": 14,
          "precioDocena": 125,
          "vistas": 616,
          "foto": null
        },
        {
          "codigo": "NA204-02",
          "nombre": "Vestido de niña con vuelo",
          "categoria": "vestidos",
          "tela": "Tejido de punto",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#C23B3B",
            "#2F6F4F",
            "#D98A2B",
            "#6B8E23",
            "#7A4B8C"
          ],
          "stock": 89,
          "precioUnidad": 57,
          "precioDocena": 535,
          "vistas": 151,
          "foto": null
        },
        {
          "codigo": "NA204-03",
          "nombre": "Polo cuello V slim",
          "categoria": "polos",
          "tela": "Jersey melange",
          "tallas": "S · M · L · XL",
          "colores": [
            "#E8E4DA",
            "#1F2A44",
            "#C97B8F",
            "#6B8E23",
            "#C23B3B"
          ],
          "stock": 129,
          "precioUnidad": 13,
          "precioDocena": 115,
          "vistas": 973,
          "foto": null
        },
        {
          "codigo": "NA204-06",
          "nombre": "Vestido floral",
          "categoria": "vestidos",
          "tela": "Satín",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#1F2A44",
            "#7A4B8C",
            "#D98A2B",
            "#6B8E23"
          ],
          "stock": 94,
          "precioUnidad": 90,
          "precioDocena": 850,
          "vistas": 57,
          "foto": null
        },
        {
          "codigo": "NA204-07",
          "nombre": "Polo estampado anime",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#6B8E23",
            "#1F2A44",
            "#E8E4DA",
            "#B5A642"
          ],
          "stock": 53,
          "precioUnidad": 25,
          "precioDocena": 215,
          "vistas": 120,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-207",
      "galeria": "NA",
      "stand": 207,
      "nombre": "Franela Express",
      "venta": "ambos",
      "whatsapp": "51964387512",
      "consultas": 24,
      "prendas": [
        {
          "codigo": "NA207-01",
          "nombre": "Polera oversize bordada",
          "categoria": "poleras",
          "tela": "Algodón french terry",
          "tallas": "S · M · L · XL",
          "colores": [
            "#3D5FA8",
            "#2F6F4F",
            "#9BB7D4"
          ],
          "stock": 53,
          "precioUnidad": 43,
          "precioDocena": 410,
          "vistas": 1045,
          "foto": null
        },
        {
          "codigo": "NA207-02",
          "nombre": "Buzo jogger",
          "categoria": "buzos",
          "tela": "Polialgodón",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#2F6F4F",
            "#2B2B2B"
          ],
          "stock": 59,
          "precioUnidad": 37,
          "precioDocena": 320,
          "vistas": 329,
          "foto": null
        },
        {
          "codigo": "NA207-04",
          "nombre": "Conjunto buzo franela",
          "categoria": "buzos",
          "tela": "Polialgodón",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C97B8F",
            "#9BB7D4",
            "#1F2A44"
          ],
          "stock": 40,
          "precioUnidad": 28,
          "precioDocena": 270,
          "vistas": 1205,
          "foto": null
        },
        {
          "codigo": "NA207-05",
          "nombre": "Polera cuello redondo",
          "categoria": "poleras",
          "tela": "Franela perchada",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C97B8F",
            "#6B8E23",
            "#2B2B2B",
            "#1F2A44",
            "#E8E4DA"
          ],
          "stock": 122,
          "precioUnidad": 34,
          "precioDocena": 295,
          "vistas": 44,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-209",
      "galeria": "NA",
      "stand": 209,
      "nombre": "Cortaviento Perú",
      "venta": "ambos",
      "whatsapp": "51926971278",
      "consultas": 19,
      "prendas": [
        {
          "codigo": "NA209-01",
          "nombre": "Casaca de cuerina",
          "categoria": "casacas",
          "tela": "Denim 12 oz",
          "tallas": "S · M · L · XL",
          "colores": [
            "#7A4B8C",
            "#D98A2B",
            "#C97B8F",
            "#6B8E23",
            "#1F2A44"
          ],
          "stock": 42,
          "precioUnidad": 113,
          "precioDocena": 1095,
          "vistas": 238,
          "foto": null
        },
        {
          "codigo": "NA209-02",
          "nombre": "Casaca jean",
          "categoria": "casacas",
          "tela": "Poliéster impermeable",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C23B3B",
            "#1F2A44",
            "#C97B8F",
            "#9BB7D4"
          ],
          "stock": 144,
          "precioUnidad": 84,
          "precioDocena": 775,
          "vistas": 501,
          "foto": null
        },
        {
          "codigo": "NA209-03",
          "nombre": "Casaca cortaviento",
          "categoria": "casacas",
          "tela": "Cuerina sintética",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#6B8E23",
            "#2F6F4F",
            "#3D5FA8",
            "#B5A642"
          ],
          "stock": 100,
          "precioUnidad": 65,
          "precioDocena": 575,
          "vistas": 563,
          "foto": null
        },
        {
          "codigo": "NA209-04",
          "nombre": "Casaca bomber",
          "categoria": "casacas",
          "tela": "Nylon acolchado",
          "tallas": "S · M · L · XL",
          "colores": [
            "#2B2B2B",
            "#B5A642",
            "#D98A2B"
          ],
          "stock": 69,
          "precioUnidad": 58,
          "precioDocena": 530,
          "vistas": 374,
          "foto": null
        }
      ]
    },
    {
      "id": "NA-212",
      "galeria": "NA",
      "stand": 212,
      "nombre": "Básicos al Por Mayor",
      "venta": "mayor",
      "whatsapp": "51966544706",
      "consultas": 14,
      "prendas": [
        {
          "codigo": "NA212-01",
          "nombre": "Polo básico cuello redondo",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#9BB7D4",
            "#1F2A44",
            "#E8E4DA",
            "#B5A642",
            "#D98A2B"
          ],
          "stock": 101,
          "precioUnidad": 19,
          "precioDocena": 185,
          "vistas": 284,
          "foto": null
        },
        {
          "codigo": "NA212-02",
          "nombre": "Short de niño",
          "categoria": "shorts",
          "tela": "Dry-fit",
          "tallas": "2 · 4 · 6 · 8 · 10 · 12",
          "colores": [
            "#2B2B2B",
            "#D98A2B",
            "#1F2A44"
          ],
          "stock": 141,
          "precioUnidad": 20,
          "precioDocena": 175,
          "vistas": 1232,
          "foto": null
        },
        {
          "codigo": "NA212-03",
          "nombre": "Polo cuello V slim",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#B5A642",
            "#3D5FA8",
            "#E8E4DA",
            "#6B8E23",
            "#C23B3B"
          ],
          "stock": 74,
          "precioUnidad": 20,
          "precioDocena": 185,
          "vistas": 123,
          "foto": null
        },
        {
          "codigo": "NA212-04",
          "nombre": "Short jean rasgado",
          "categoria": "shorts",
          "tela": "Dry-fit",
          "tallas": "S · M · L · XL",
          "colores": [
            "#D98A2B",
            "#1F2A44",
            "#9BB7D4",
            "#C23B3B"
          ],
          "stock": 111,
          "precioUnidad": 33,
          "precioDocena": 315,
          "vistas": 649,
          "foto": null
        },
        {
          "codigo": "NA212-05",
          "nombre": "Polo manga larga",
          "categoria": "polos",
          "tela": "Algodón jersey 30/1",
          "tallas": "S · M · L · XL",
          "colores": [
            "#3D5FA8",
            "#9BB7D4",
            "#1F2A44",
            "#C23B3B"
          ],
          "stock": 25,
          "precioUnidad": 18,
          "precioDocena": 170,
          "vistas": 239,
          "foto": null
        },
        {
          "codigo": "NA212-06",
          "nombre": "Short deportivo",
          "categoria": "shorts",
          "tela": "Dry-fit",
          "tallas": "S · M · L · XL",
          "colores": [
            "#C97B8F",
            "#B5A642",
            "#2B2B2B"
          ],
          "stock": 111,
          "precioUnidad": 24,
          "precioDocena": 215,
          "vistas": 306,
          "foto": null
        },
        {
          "codigo": "NA212-07",
          "nombre": "Polo estampado anime",
          "categoria": "polos",
          "tela": "Algodón pima",
          "tallas": "S · M · L · XL",
          "colores": [
            "#7A4B8C",
            "#2F6F4F",
            "#B5A642",
            "#3D5FA8"
          ],
          "stock": 58,
          "precioUnidad": 15,
          "precioDocena": 145,
          "vistas": 48,
          "foto": null
        }
      ]
    }
  ]
};
