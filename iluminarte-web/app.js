const products = [
  {
    nombre: "Vela Lavanda Serena",
    aroma: "Lavanda",
    tamano: "220 g",
    precio: 18900,
    imagen: "./assets/vela-lavanda-serena.png",
    message: "Hola Iluminarte! Me interesa la Vela Lavanda Serena (220 g). ¿Tienen disponible y precio final?"
  },
  {
    nombre: "Vela Durazno Acariciante",
    aroma: "Durazno",
    tamano: "220 g",
    precio: 18900,
    imagen: "./assets/vela-durazno-acariciante.png",
    message: "Hola Iluminarte! Me interesa la Vela Durazno Acariciante (220 g). ¿Tienen disponible y precio final?"
  },
  {
    nombre: "Vela Terracota Cálida",
    aroma: "Vainilla & especias",
    tamano: "280 g",
    precio: 22900,
    imagen: "./assets/vela-terracota-calida.png",
    message: "Hola Iluminarte! Me interesa la Vela Terracota Cálida (280 g). ¿Tienen disponible y precio final?"
  },
  {
    nombre: "Set 3 Mini Velas",
    aroma: "Mix (Lavanda/Durazno/Terra)",
    tamano: "3 x 80 g",
    precio: 14900,
    imagen: "./assets/set-3-mini-velas.png",
    message: "Hola Iluminarte! Me interesa el Set 3 Mini Velas (3 x 80 g). ¿Tienen disponible y precio final?"
  },
  {
    nombre: "Vela Morado Nocturno",
    aroma: "Ambar & flores",
    tamano: "300 g",
    precio: 25900,
    imagen: "./assets/vela-morado-nocturno.png",
    message: "Hola Iluminarte! Me interesa la Vela Morado Nocturno (300 g). ¿Tienen disponible y precio final?"
  },
  {
    nombre: "Vela Crema & Vela (Edición Casa)",
    aroma: "Cremoso suave",
    tamano: "240 g",
    precio: 19900,
    imagen: "./assets/vela-crema-edicion-casa.png",
    message: "Hola Iluminarte! Me interesa la Vela Crema & Vela (240 g). ¿Tienen disponible y precio final?"
  }
];

const currencyARS = (value) => {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
  } catch {
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ARS`;
  }
};

function formatWhatsAppLink(phoneE164, text) {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${phoneE164}?text=${encoded}`;
}

function setWhatsAppTargets() {
  // Reemplaza este número por el real en cuanto lo tengas.
  // Formato recomendado: solo dígitos (sin +), por ejemplo 5491123456789
  const WA_PHONE = "50688261409";

  const waFloat = document.getElementById('waFloat');
  if (waFloat) {
    waFloat.href = formatWhatsAppLink(WA_PHONE, "Hola Iluminarte! Quiero consultar sobre sus velas.");
  }

  const whatsappNumber = document.getElementById('whatsappNumber');
  if (whatsappNumber) {
    whatsappNumber.href = formatWhatsAppLink(WA_PHONE, "Hola Iluminarte! Quiero consultar sus productos." );
  }
}

function buildProducts() {
  const grid = document.getElementById('productsGrid');
  const tpl = document.getElementById('productCardTpl');
  if (!grid || !tpl) return;

  const WA_PHONE = "50688261409";

  grid.innerHTML = '';
  products.forEach((p, idx) => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('[data-name]').textContent = p.nombre;
    node.querySelector('[data-aroma]').textContent = p.aroma;
    node.querySelector('[data-tamano]').textContent = p.tamano;
    node.querySelector('[data-precio]').textContent = currencyARS(p.precio);

    const media = node.querySelector('[data-image]');
    if (media) {
      const gradients = [
        'radial-gradient(420px 240px at 50% 20%, rgba(212,184,232,.85), rgba(212,184,232,0) 60%), radial-gradient(360px 220px at 20% 80%, rgba(249,213,200,.68), rgba(249,213,200,0) 62%), linear-gradient(135deg, rgba(247,238,224,.95), rgba(240,230,248,.65))',
        'radial-gradient(420px 240px at 60% 15%, rgba(155,126,200,.45), rgba(155,126,200,0) 62%), radial-gradient(360px 220px at 25% 80%, rgba(196,149,106,.35), rgba(196,149,106,0) 62%), linear-gradient(135deg, rgba(240,230,248,.9), rgba(247,238,224,.75))',
        'radial-gradient(420px 240px at 45% 20%, rgba(249,213,200,.75), rgba(249,213,200,0) 62%), radial-gradient(360px 220px at 10% 80%, rgba(212,184,232,.55), rgba(212,184,232,0) 62%), linear-gradient(135deg, rgba(247,238,224,.9), rgba(240,230,248,.72))'
      ];
      media.style.background = gradients[idx % gradients.length];
      media.style.borderBottom = '1px solid rgba(61,41,101,.08)';
    }

    const waBtn = node.querySelector('.btn-whatsapp');
    if (waBtn) {
      waBtn.href = formatWhatsAppLink(WA_PHONE, p.message);
    }

    // Imagen (si existe en el producto) - fallback si no existe
    const mediaImg = node.querySelector('[data-image]');
    if (mediaImg && p.imagen) {
      mediaImg.innerHTML = `<img alt="${p.nombre}" src="${p.imagen}" class="product-img" loading="lazy" />`;
      const img = mediaImg.querySelector('img');
      if (img) {
        img.addEventListener('error', () => {
          mediaImg.innerHTML = '';
          mediaImg.style.background = mediaImg.style.background ||
            'radial-gradient(420px 240px at 50% 20%, rgba(212,184,232,.85), rgba(212,184,232,0) 60%)';
        });
      }
    }




    grid.appendChild(node);
  });
}

function smoothScroll() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    const el = document.querySelector(href);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function revealOnScroll() {
  const nodes = Array.from(document.querySelectorAll('.reveal'));
  const io = new IntersectionObserver(
    (entries) => {
      for (const ent of entries) {
        if (ent.isIntersecting) ent.target.classList.add('is-visible');
      }
    },
    { threshold: 0.15 }
  );

  nodes.forEach((n) => io.observe(n));
}

function setupYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const nombre = (fd.get('nombre') || '').toString().trim();

    status.textContent = `Gracias, ${nombre || 'por tu mensaje'}! (Demo) Puedes escribirnos por WhatsApp para avanzar.`;
    status.style.color = '#3D2965';
    form.reset();
  });
}

(function init() {
  setWhatsAppTargets();
  buildProducts();
  smoothScroll();
  revealOnScroll();
  setupYear();
  setupContactForm();
})();

