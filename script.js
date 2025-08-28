/* ================================
   SCRIPT GENERAL REDSAS
   ================================ */

/* --- Slider automático --- */
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slider .slider-item");

function showSlide(index) {
  if (!slides || slides.length === 0) return;
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  if (!slides || slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides && slides.length > 0) {
  setInterval(nextSlide, 4000); // cambia cada 4 seg
  showSlide(currentSlide);
}

/* --- Botón volver arriba --- */
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 200 ? "block" : "none";
  });
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --- Resaltar menú activo --- */
const currentPageRaw = window.location.pathname.split("/").pop();
const currentPage = currentPageRaw === "" ? "index.html" : currentPageRaw;
document.querySelectorAll(".nav-menu a").forEach(link => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("active-link");
  } else {
    link.classList.remove("active-link");
  }
});

/* --- Validación / manejo simple de formularios --- */
/* Formulario Solicitar Servicio */
const solicitudForm = document.querySelector("#solicitud-form");
if (solicitudForm) {
  solicitudForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Solicitud enviada correctamente");
    solicitudForm.reset();
  });
}

/* Formulario Calificación */
const calificarForm = document.querySelector("#calificacion-form");
if (calificarForm) {
  calificarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("⭐ ¡Gracias por calificar el servicio!");
    calificarForm.reset();
  });
}

/* === PANEL ADMINISTRADOR (datos de ejemplo) === */
const solicitudes = [
  { id: 1, nombre: "Juan Pérez", servicio: "Cita médica", estado: "pendiente", residencia: "Medellín", tiempo: "3 horas" },
  { id: 2, nombre: "María Gómez", servicio: "Compras", estado: "asignado", residencia: "Envigado", tiempo: "2 horas" },
];

const asistentes = [
  { id: 1, nombre: "Carlos López", estudios: "Auxiliar de enfermería", disponibilidad: "Lunes a Viernes", residencia: "Itagüí", vehiculo: "Sí", estado: "pendiente" },
  { id: 2, nombre: "Ana Torres", estudios: "Gerontología", disponibilidad: "Fines de semana", residencia: "Medellín", vehiculo: "No", estado: "verificado" },
];

/* Renderizar solicitudes si existe el contenedor */
const solicitudesList = document.querySelector("#solicitudes-list");
if (solicitudesList) {
  solicitudesList.innerHTML = "";
  solicitudes.forEach(s => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${s.nombre}</h3>
      <p><strong>Servicio:</strong> ${s.servicio}</p>
      <p><strong>Estado:</strong> ${s.estado}</p>
      <p><strong>Residencia:</strong> ${s.residencia}</p>
      <p><strong>Tiempo requerido:</strong> ${s.tiempo}</p>
      <button class="btn">Ver Perfil</button>
    `;
    solicitudesList.appendChild(card);
  });
}

/* Renderizar asistentes si existe el contenedor */
const asistentesList = document.querySelector("#asistentes-list");
if (asistentesList) {
  asistentesList.innerHTML = "";
  asistentes.forEach(a => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${a.nombre}</h3>
      <p><strong>Estudios:</strong> ${a.estudios}</p>
      <p><strong>Disponibilidad:</strong> ${a.disponibilidad}</p>
      <p><strong>Residencia:</strong> ${a.residencia}</p>
      <p><strong>Vehículo:</strong> ${a.vehiculo}</p>
      <p><strong>Estado:</strong> ${a.estado}</p>
      ${
        a.estado === "pendiente"
          ? `<button class="btn verificar-btn" data-id="${a.id}">Verificar</button>`
          : `<span class="badge">✔ Verificado</span>`
      }
    `;
    asistentesList.appendChild(card);
  });

  // Botones de verificar
  document.querySelectorAll(".verificar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      alert(`✅ Asistente ID ${id} verificado`);
      const span = document.createElement("span");
      span.classList.add("badge");
      span.innerText = "✔ Verificado";
      btn.replaceWith(span);
    });
  });
}

/* ===========================
   MODALES (abrir / cerrar)
   =========================== */
document.querySelectorAll('.open-modal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const serviceId = btn.getAttribute('data-service-id');
    const modal = document.getElementById(`${serviceId}-modal`);
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    // disable scroll behind modal
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('.close-button').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modalId = closeBtn.getAttribute('data-modal-id');
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// Cerrar modal clickeando fuera del contenido
window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal.active').forEach(modal => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
});

// Links que cierran modal y navegan (si los hay)
document.querySelectorAll('.close-modal-and-navigate').forEach(link => {
  link.addEventListener('click', (e) => {
    // close parent modal
    const modal = link.closest('.modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    // leave navigation normal (no preventDefault)
  });
});


