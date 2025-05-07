// Funcionalidad para la barra lateral
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Función para manejar el hover en dispositivos táctiles
    function handleTouchStart(e) {
        sidebar.classList.add('touch-hover');
    }
    
    function handleTouchEnd(e) {
        setTimeout(() => {
            sidebar.classList.remove('touch-hover');
        }, 1000);
    }
    
    // Agregar eventos para dispositivos táctiles
    if (sidebar) {
        sidebar.addEventListener('touchstart', handleTouchStart);
        sidebar.addEventListener('touchend', handleTouchEnd);
    }
    
    // Detectar si es un dispositivo móvil
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Ajustar el comportamiento en dispositivos móviles
    function adjustForMobile() {
        if (isMobile()) {
            if (sidebar) {
                sidebar.style.width = '0';
                sidebar.style.overflow = 'hidden';
                
                // Agregar botón para mostrar/ocultar la barra lateral en móviles
                if (!document.querySelector('.mobile-sidebar-toggle')) {
                    const mobileToggle = document.createElement('div');
                    mobileToggle.className = 'mobile-sidebar-toggle';
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    mobileToggle.style.position = 'fixed';
                    mobileToggle.style.bottom = '20px';
                    mobileToggle.style.left = '20px';
                    mobileToggle.style.width = '50px';
                    mobileToggle.style.height = '50px';
                    mobileToggle.style.backgroundColor = 'var(--primary-color)';
                    mobileToggle.style.color = 'var(--light-color)';
                    mobileToggle.style.borderRadius = '50%';
                    mobileToggle.style.display = 'flex';
                    mobileToggle.style.alignItems = 'center';
                    mobileToggle.style.justifyContent = 'center';
                    mobileToggle.style.fontSize = '1.5rem';
                    mobileToggle.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                    mobileToggle.style.zIndex = '1000';
                    mobileToggle.style.cursor = 'pointer';
                    
                    document.body.appendChild(mobileToggle);
                    
                    mobileToggle.addEventListener('click', function() {
                        if (sidebar.style.width === '0px' || sidebar.style.width === '') {
                            sidebar.style.width = '250px';
                        } else {
                            sidebar.style.width = '0';
                        }
                    });
                }
            }
            
            if (mainContent) {
                mainContent.style.marginLeft = '0';
            }
        } else {
            if (sidebar) {
                sidebar.style.width = '60px';
                sidebar.style.overflow = 'hidden';
            }
            
            if (mainContent) {
                mainContent.style.marginLeft = '60px';
            }
            
            // Eliminar el botón móvil si existe
            const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
            if (mobileToggle) {
                document.body.removeChild(mobileToggle);
            }
        }
    }
    
    // Ejecutar al cargar la página y al cambiar el tamaño de la ventana
    window.addEventListener('load', adjustForMobile);
    window.addEventListener('resize', adjustForMobile);
    
    // Agregar funcionalidad para los enlaces de la barra lateral
    const sidebarLinks = document.querySelectorAll('.sidebar-content ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si es móvil, cerrar la barra lateral al hacer clic en un enlace
            if (isMobile()) {
                sidebar.style.width = '0';
            }
        });
    });
});