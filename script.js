/* ================================
   SCRIPT GENERAL REDSAS
   ================================ */

// === SLIDER AUTOMÁTICO (Inicio) ===
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slider .slider-item");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  setInterval(nextSlide, 4000); // cambia cada 4 seg
  showSlide(currentSlide);
}

// === BOTÓN VOLVER ARRIBA ===
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

// === RESALTAR MENÚ ACTIVO ===
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-menu a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active-link");
  } else {
    link.classList.remove("active-link");
  }
});

// === VALIDACIÓN DE FORMULARIOS ===

// Formulario Solicitar Servicio
const solicitudForm = document.querySelector("#solicitud-form");
if (solicitudForm) {
  solicitudForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Solicitud enviada correctamente");
    solicitudForm.reset();
  });
}

// Formulario Calificación
const calificarForm = document.querySelector("#calificacion-form");
if (calificarForm) {
  calificarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("⭐ ¡Gracias por calificar el servicio!");
    calificarForm.reset();
  });
}

// === PANEL ADMINISTRADOR ===

// Datos de ejemplo
const solicitudes = [
  { id: 1, nombre: "Juan Pérez", servicio: "Cita médica", estado: "pendiente", residencia: "Medellín", tiempo: "3 horas" },
  { id: 2, nombre: "María Gómez", servicio: "Compras", estado: "asignado", residencia: "Envigado", tiempo: "2 horas" },
];

const asistentes = [
  { id: 1, nombre: "Carlos López", estudios: "Auxiliar de enfermería", disponibilidad: "Lunes a Viernes", residencia: "Itagüí", vehiculo: "Sí", estado: "pendiente" },
  { id: 2, nombre: "Ana Torres", estudios: "Gerontología", disponibilidad: "Fines de semana", residencia: "Medellín", vehiculo: "No", estado: "verificado" },
];

// Renderizar solicitudes
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

// Renderizar asistentes
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
      btn.replaceWith(document.createElement("span"));
      btn.parentElement.querySelector("span").classList.add("badge");
      btn.parentElement.querySelector("span").innerText = "✔ Verificado";
    });
  });
}

