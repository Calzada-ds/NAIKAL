// Funcionalidad para el menú de navegación responsive
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
        });
    });

    // Slider de testimonios
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (testimonials.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
                testimonial.style.opacity = i === index ? 1 : 0;
                testimonial.style.transition = 'all 0.5s ease-in-out';
                testimonial.style.position = i === index ? 'relative' : 'absolute';
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        }
        
        // Inicializar el slider
        showSlide(0);
        
        // Evento para los dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
            });
        });
        
        // Autoplay del slider
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % testimonials.length;
            showSlide(nextSlide);
        }, 5000);
    }

    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .value-card, .team-member, .property-card, .reason-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar los elementos con opacidad 0 y transform
    const elementsToAnimate = document.querySelectorAll('.service-card, .value-card, .team-member, .property-card, .reason-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar la animación al cargar la página y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Validación del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validar campos
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Validar nombre
            if (name.value.trim() === '') {
                isValid = false;
                showError(name, 'Por favor, ingrese su nombre');
            } else {
                removeError(name);
            }
            
            // Validar email
            if (email.value.trim() === '') {
                isValid = false;
                showError(email, 'Por favor, ingrese su correo electrónico');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Por favor, ingrese un correo electrónico válido');
            } else {
                removeError(email);
            }
            
            // Validar asunto
            if (subject.value.trim() === '') {
                isValid = false;
                showError(subject, 'Por favor, ingrese el asunto');
            } else {
                removeError(subject);
            }
            
            // Validar mensaje
            if (message.value.trim() === '') {
                isValid = false;
                showError(message, 'Por favor, ingrese su mensaje');
            } else {
                removeError(message);
            }
            
            // Si el formulario es válido, enviar
            if (isValid) {
                // Aquí se puede agregar el código para enviar el formulario
                // Por ahora, solo mostraremos un mensaje de éxito
                showSuccessMessage();
            }
        });
        
        // Función para validar email
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Función para mostrar error
        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.9rem';
            errorMessage.style.marginTop = '5px';
            
            // Eliminar mensaje de error existente
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                formGroup.removeChild(existingError);
            }
            
            formGroup.appendChild(errorMessage);
            input.style.borderColor = 'red';
        }
        
        // Función para eliminar error
        function removeError(input) {
            const formGroup = input.parentElement;
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                formGroup.removeChild(existingError);
            }
            input.style.borderColor = '#ddd';
        }
        
        // Función para mostrar mensaje de éxito
        function showSuccessMessage() {
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Su mensaje ha sido enviado con éxito. Nos pondremos en contacto con usted pronto.';
            successMessage.style.backgroundColor = '#4CAF50';
            successMessage.style.color = 'white';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '4px';
            successMessage.style.marginTop = '20px';
            
            // Eliminar mensaje de éxito existente
            const existingSuccess = formContainer.querySelector('.success-message');
            if (existingSuccess) {
                formContainer.removeChild(existingSuccess);
            }
            
            // Limpiar formulario
            contactForm.reset();
            
            // Agregar mensaje de éxito
            formContainer.appendChild(successMessage);
            
            // Eliminar mensaje después de 5 segundos
            setTimeout(() => {
                formContainer.removeChild(successMessage);
            }, 5000);
        }
    }
});