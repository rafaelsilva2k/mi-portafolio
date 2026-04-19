

// Obtener elementos del HTML 
const hamburgerBtn = document.getElementById('hamburger-btn'); 
const navbar = document.getElementById('navbar'); 
// Cuando haces click en el botón hamburguesa hamburgerBtn.addEventListener('click', function() { // Toggle: si tiene clase 'active', la quita; si no la tiene, la agrega navbar.classList.toggle('active'); }); // Cuando haces click en un link del menú, cierra el menú const navLinks = navbar.querySelectorAll('a'); navLinks.forEach(link => { link.addEventListener('click', function() { navbar.classList.remove('active'); // Quita la clase active }); });