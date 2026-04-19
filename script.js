/* ============================================
   MENÚ HAMBURGUESA
   ============================================ */

const hamburgerBtn = document.getElementById('hamburger-btn');
const navbar = document.getElementById('navbar');

hamburgerBtn.addEventListener('click', function() {
    navbar.classList.toggle('active');
});

const navLinks = navbar.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('active');
    });
});

/* ============================================
   DARK MODE
   ============================================ */

const darkModeBtn = document.getElementById('dark-mode-btn');
const body = document.body;

// Cargar preferencia guardada al abrir la página
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
}

// Alternar dark mode al hacer click
darkModeBtn.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        darkModeBtn.textContent = '☀️';
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        darkModeBtn.textContent = '🌙';
        localStorage.setItem('dark-mode', 'disabled');
    }
});

/* ============================================
   CARRUSEL DE PROYECTOS
   ============================================ */

const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicatorsContainer = document.getElementById('indicators');
const items = document.querySelectorAll('.proyectos-item');

let currentIndex = 0;
let itemsPerView = 3;

// Crear indicadores
function createIndicators() {
    const totalSlides = Math.ceil(items.length - itemsPerView + 1);
    
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('span');
        indicator.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        
        if (i === 0) {
            indicator.classList.add('active');
        }
        
        indicatorsContainer.appendChild(indicator);
    }
}

// Actualizar posición del carrusel
function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 25; // 25px es el gap
    const translateX = -currentIndex * itemWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
    
    // Actualizar indicadores
    const indicators = document.querySelectorAll('.carousel-indicators span');
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentIndex) {
            indicator.classList.add('active');
        }
    });
}

// Botón siguiente
nextBtn.addEventListener('click', function() {
    const maxIndex = items.length - itemsPerView;
    
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0; // Volver al inicio
    }
    
    updateCarousel();
});

// Botón anterior
prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = items.length - itemsPerView; // Ir al final
    }
    
    updateCarousel();
});

// Ajustar items por vista según el tamaño de la pantalla
function updateItemsPerView() {
    if (window.innerWidth < 768) {
        itemsPerView = 1;
    } else if (window.innerWidth < 1024) {
        itemsPerView = 2;
    } else {
        itemsPerView = 3;
    }
    
    currentIndex = 0;
    updateCarousel();
}

// Escuchar cambios de tamaño de pantalla
window.addEventListener('resize', updateItemsPerView);

// Inicializar carrusel
window.addEventListener('load', function() {
    updateItemsPerView();
    createIndicators();
    updateCarousel();
});

/* ============================================
   EFECTOS DE SCROLL AVANZADO
   ============================================ */

// Detectar elementos en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar secciones
document.querySelectorAll('.sobre-mi, .educacion, .experiencia, .proyectos, .contacto').forEach(section => {
    observer.observe(section);
});

/* ============================================
   EFECTOS DE PARALLAX SUAVE
   ============================================ */

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    
    // Efecto parallax en el hero
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

/* ============================================
   SMOOTH SCROLL PARA LINKS INTERNOS (BONUS)
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   ANIMACIÓN AL CARGAR LA PÁGINA
   ============================================ */

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Fading inicial
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';