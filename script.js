// Gestión de formularios
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');
const forgotPasswordBtn = document.getElementById('forgotPassword');

// Cambio entre formularios
showRegisterBtn.addEventListener('click', () => {
    loginForm.classList.add('d-none');
    registerForm.classList.remove('d-none');
});

showLoginBtn.addEventListener('click', () => {
    registerForm.classList.add('d-none');
    loginForm.classList.remove('d-none');
});

// Función para mostrar notificaciones
function showNotification(message, success = true) {
    const toast = document.getElementById('notification');
    const toastBody = toast.querySelector('.toast-body');
    const icon = toast.querySelector('.fas');

    icon.className = success ? 'fas fa-check-circle me-2' : 'fas fa-exclamation-circle me-2';
    icon.style.color = success ? '#28a745' : '#dc3545';

    toastBody.textContent = message;

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

// Gestión del registro
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
    }

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Verificar si el usuario ya existe
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === email)) {
        showNotification('Este correo ya está registrado', false);
        return;
    }

    // Guardar nuevo usuario
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    showNotification('Registro exitoso. Ya puedes iniciar sesión.');
    this.reset();
    this.classList.remove('was-validated');

    // Mostrar formulario de login
    registerForm.classList.add('d-none');
    loginForm.classList.remove('d-none');
});

// Gestión del login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
    }

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Verificar credenciales
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Guardar sesión
        localStorage.setItem('currentUser', JSON.stringify(user));
        showNotification('Login exitoso. Redirigiendo...');

        // Redirigir a página de bienvenida
        setTimeout(() => {
            window.location.href = 'welcome.html';
        }, 1500);
    } else {
        showNotification('Credenciales incorrectas', false);
    }
});

// Gestión de "Olvidé mi contraseña"
forgotPasswordBtn.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    if (!email) {
        showNotification('Por favor, ingresa tu correo electrónico', false);
        return;
    }
    showNotification('Se ha enviado un enlace de recuperación a tu correo (simulado)');
});

// Proteger rutas
if (window.location.pathname.includes('welcome.html')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
    }
}