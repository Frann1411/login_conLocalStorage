// Obtener datos del usuario
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Si no hay usuario logueado, redirigir al login
if (!currentUser) {
    window.location.href = 'index.html';
}

// Actualizar nombre de usuario
document.getElementById('userName').textContent = currentUser.name;

// Establecer último acceso
const now = new Date();
document.getElementById('lastLogin').textContent = now.toLocaleString();

// Contador de tiempo de sesión
let sessionSeconds = 0;
setInterval(() => {
    sessionSeconds++;
    const minutes = Math.floor(sessionSeconds / 60);
    const seconds = sessionSeconds % 60;
    document.getElementById('sessionTime').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}, 1000);

// Contador de visitas
let visitCount = parseInt(localStorage.getItem('visitCount') || '0');
visitCount++;
localStorage.setItem('visitCount', visitCount);
document.getElementById('visitCount').textContent = visitCount;

// Animaciones para las tarjetas de estadísticas
const statCards = document.querySelectorAll('.stat-card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

statCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Gestión del cierre de sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Simulación de acciones rápidas
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.textContent.trim();
        alert(`La acción "${action}" estará disponible próximamente.`);
    });
});