// Fotos referenciales de Unsplash (licencia libre: https://unsplash.com/license).
// No son fotos de las tiendas ni de sus prendas reales. Cuando tengas fotos propias,
// ponlas en img/prendas/ y cambia el campo "foto" en js/data.js.
// Formato: [id de la imagen, fotógrafo, página de la foto]
window.VG_FOTOS = {
  polos: [
    ['1529374255404-311a2a4f1fd9', 'Masaaki Komori', '9ugEeqflo70'],
    ['1759572095384-1a7e646d0d4f', 'tian dayong', 'EFCpLBQbxIU'],
    ['1620799139834-6b8f844fbe61', 'Mediamodifier', 'JskqEILt-ds'],
    ['1586363104862-3a5e2ab60d99', 'Lena Kudryavtseva', 'itUsEU7GgDU'],
    ['1624124959348-86710fef6630', 'Zoe', 'ywgxkUJgSF8'],
    ['1651761179569-4ba2aa054997', 'mockupbee', '4rUYuwJ2vGw'],
    ['1562157873-818bc0726f68', 'Md Salman', 'tWOz2_EK5EQ'],
    ['1716541425103-fcfd4bf88c27', 'TuanAnh Blue', 'W-xN3466GfI']
  ],
  poleras: [
    ['1620799140188-3b2a02fd9a77', 'Mediamodifier', 'kJXGTOY1wLQ'],
    ['1556821840-3a63f95609a7', 'Jannes Jacobs', 'a_KC8ocB650'],
    ['1680292783974-a9a336c10366', 'Chris Lynch', 'SXpun7pdECU'],
    ['1609873814058-a8928924184a', 'Gab', 'mWSXyWe2H9Q'],
    ['1685354218016-3899c9ef79ad', 'Redicul Pict', 'ggcJKGpx3pI'],
    ['1578768079052-aa76e52ff62e', 'Ali Saadat', 'ikLELWYbyxk']
  ],
  casacas: [
    ['1591047139829-d91aecb6caea', 'Tobias Tullius', 'Fg15LdqpWrs'],
    ['1551028719-00167b16eac5', 'Lea Øchel', 'nsRBbE6-YLs'],
    ['1706765779494-2705542ebe74', 'CGXL MEDIA', '92_tCTr9rtw'],
    ['1543076447-215ad9ba6923', 'kemal alkan', '_BDBEP0ePQc'],
    ['1623854156816-4c4fc355ffc7', 'Derick McKinney', '3OFBcQQTN64'],
    ['1594587639708-095eb3778067', 'Toa Heftiba', 'gX8dF8Zoegg'],
    ['1649937408746-4d2f603f91c8', 'Nikola Tasic', 'gJtwWqMiyUw']
  ],
  jeans: [
    ['1602293589930-45aad59ba3ab', 'Jason Leung', 'EtOMMg1nSR8'],
    ['1637069585336-827b298fe84a', 'Claire Abdo', 'aWLTXw6kbDw'],
    ['1714143136372-ddaf8b606da7', 'TuanAnh Blue', '9yoXrG6Er_g'],
    ['1542272604-787c3835535d', 'Mnz', 'm1m2EZOZVwA'],
    ['1565084888279-aca607ecce0c', 'Waldemar Brandt', 'UP9DtTjRYpI'],
    ['1576995853123-5a10305d93c0', 'Jason Leung', 'DmD8HVOjy4c'],
    ['1605518216938-7c31b7b14ad0', 'Eduardo Pastor', '3oejsU5OQVk'],
    ['1560243563-062bfc001d68', 'lan deng', 'quddu_dZKkQ']
  ],
  shorts: [
    ['1591195853828-11db59a44f6b', 'engin akyurt', 'Hd4nlxLgIbA'],
    ['1789110853967-ba316ccbdfb2', 'engin akyurt', '-xDfV-kuBO0'],
    ['1789110520350-db58d2271c63', 'engin akyurt', 'dmQuh6QZVHw'],
    ['1789110853422-48e169b8205c', 'engin akyurt', 'LCk96TD_kv8'],
    ['1789110853613-4ace8d4041e3', 'engin akyurt', 'E8N3b5l1Ed0'],
    ['1789110853409-5a13c90a4450', 'engin akyurt', 'hgUYYUY86Ak'],
    ['1789110519985-b1bce47eb35d', 'engin akyurt', '7D2sPwRGGC0']
  ],
  vestidos: [
    ['1591221662157-6f62de5508eb', 'Cate Bligh', 'B_P6nONZk58'],
    ['1760097679488-f808c6aca11d', 'mdreza jalali', '2EKY6Nrm6cQ'],
    ['1544586947-3e09d1a036f1', 'Sandra Seitamaa', 'TaJQaxEkpq0'],
    ['1540459920617-415d62f1f76b', 'Alessandra Caretto', 'pHA6KL_HpoE'],
    ['1668996415041-8a6a1602a3a7', 'Jason Hawke', 'H-ekR_aPm1M']
  ],
  buzos: [
    ['1775836214303-416ff5ce9f81', 'Jadon Johnson', '4Xh8twzRKcs'],
    ['1779675789410-85a43261a172', 'ola szkolda', '-tXpFr7QoEg'],
    ['1779676086744-a83b1f0e00bd', 'ola szkolda', 'CYEjtXJKJt0'],
    ['1779675789087-ca737ecf175a', 'ola szkolda', 'Tkxd7yU2a5M'],
    ['1779676086590-b003acb94c7b', 'ola szkolda', 'g49VXct90u8']
  ],
  tiendas: [
    ['1768758533474-5cd148638a98', 'Luca', 'a-_PeeYVfQk'],
    ['1441984904996-e0b6ba687e04', 'Clark Street Mercantile', 'qnKhZJPKFD8'],
    ['1532453288672-3a27e9be9efd', 'Marcus Loke', 'xXJ6utyoSw0'],
    ['1441986300917-64674bd600d8', 'Clark Street Mercantile', 'P3pI6xzovu0'],
    ['1784537642955-9d371c0cbf91', 'Jie Yeu Teoh', 'uNnx31GSPxk'],
    ['1767968037382-8eb9c564339f', 'Polina Kuzovkova', 'pt3EBzQcxP0'],
    ['1603400521630-9f2de124b33b', 'Thom Bradley', 'mwa_nzFpnJw'],
    ['1489987707025-afc232f7ea0f', 'Parker Burchfield', 'tvG4WvjgsEY'],
    ['1582719188393-bb71ca45dbb9', 'Markus Winkler', 'PQmXUxmfR44'],
    ['1558769132-cb1aea458c5e', 'Alyssa Strohmann', 'TS--uNw-JqE'],
    ['1546213290-e1b492ab3eee', 'Korie Cull', 'IzIME1jwjCY']
  ]
};
