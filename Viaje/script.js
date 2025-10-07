// Configuración de Particles.js (optimizado para móviles)
const isMobile = window.innerWidth < 768;

particlesJS('particles-js', {
    particles: {
        number: {
            value: isMobile ? 30 : 60,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#ec4899', '#f472b6', '#fbbf24']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.4,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: !isMobile,
            distance: 150,
            color: '#ec4899',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: isMobile ? 1 : 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: !isMobile,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Fecha del viaje
const tripDate = new Date('2025-11-24T11:55:00-03:00'); // Hora de salida desde Santiago

// Función de cuenta regresiva
function updateCountdown() {
    const now = new Date();
    const difference = tripDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Actualizar los valores con formato de 2 dígitos
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // El viaje ha comenzado!
        document.getElementById('countdown').innerHTML = `
            <div class="col-span-4">
                <div class="text-6xl mb-4">✈️🎉</div>
                <div class="text-4xl font-bold text-white">¡El viaje ha comenzado!</div>
                <div class="text-2xl text-pink-200 mt-4">¡Disfruten cada momento juntos! 💕</div>
            </div>
        `;
    }
}

// Inicializar contador (sin animaciones)
updateCountdown();
setInterval(updateCountdown, 1000);

// Botón para mostrar vuelos (animación mejorada)
document.getElementById('show-flights-btn').addEventListener('click', function() {
    const countdownSection = document.getElementById('countdown-section');
    const flightsSection = document.getElementById('flights-section');
    
    // Animar salida del contador
    gsap.to(countdownSection, {
        duration: 0.4,
        opacity: 0,
        scale: 0.95,
        ease: 'power2.in',
        onComplete: function() {
            countdownSection.classList.add('hidden');
            flightsSection.classList.remove('hidden');
            
            // Animar entrada de los vuelos
            gsap.from('.glass-card', {
                duration: 0.6,
                opacity: 0,
                y: 30,
                stagger: 0.15,
                ease: 'power2.out'
            });
            
            // Scroll suave hacia arriba
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Botón para volver al contador (animación mejorada)
document.getElementById('back-to-countdown-btn').addEventListener('click', function() {
    const countdownSection = document.getElementById('countdown-section');
    const flightsSection = document.getElementById('flights-section');
    
    // Animar salida de los vuelos
    gsap.to(flightsSection, {
        duration: 0.4,
        opacity: 0,
        scale: 0.95,
        ease: 'power2.in',
        onComplete: function() {
            flightsSection.classList.add('hidden');
            countdownSection.classList.remove('hidden');
            
            // Animar entrada del contador
            gsap.from(countdownSection, {
                duration: 0.6,
                opacity: 0,
                scale: 0.95,
                ease: 'power2.out'
            });
            
            // Scroll suave hacia arriba
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Animación de los aviones en las rutas de vuelo (removida - causaba problemas)

// Efecto de hover en las tarjetas de vuelo (simplificado)
const flightCards = document.querySelectorAll('.flight-card');
flightCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!isMobile) {
            anime({
                targets: this,
                scale: 1.02,
                duration: 200,
                easing: 'easeOutQuad'
            });
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!isMobile) {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        }
    });
});

// Animación de entrada inicial (más suave)
window.addEventListener('load', function() {
    // Animar el título principal
    gsap.from('header h1', {
        duration: 1,
        opacity: 0,
        y: -50,
        ease: 'power2.out'
    });
    
    gsap.from('header p', {
        duration: 0.8,
        opacity: 0,
        delay: 0.3,
        y: 30,
        ease: 'power2.out'
    });
    
    // Efecto de corazón palpitante (más sutil)
    if (!isMobile) {
        anime({
            targets: '.heart-beat',
            scale: [1, 1.15, 1],
            duration: 1200,
            loop: true,
            easing: 'easeInOutQuad'
        });
    }
});

// Efecto parallax en scroll (desactivado en móviles para mejor performance)
if (!isMobile) {
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.glass-card');
                
                parallaxElements.forEach((element, index) => {
                    const speed = 0.02 + (index * 0.01);
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Crear corazones flotantes (reducido para móviles)
function createFloatingHearts() {
    const container = document.querySelector('body');
    const symbols = ['💕', '✈️', '💖'];
    const interval = isMobile ? 5000 : 3000;
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.opacity = '0.5';
        heart.style.zIndex = '5';
        heart.style.pointerEvents = 'none';
        
        container.appendChild(heart);
        
        // Animar el corazón hacia arriba
        anime({
            targets: heart,
            translateY: [0, -window.innerHeight - 100],
            translateX: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 180],
            opacity: [0.5, 0],
            duration: Math.random() * 2000 + 4000,
            easing: 'easeOutQuad',
            complete: function() {
                heart.remove();
            }
        });
    }, interval);
}

createFloatingHearts();

// Efecto de texto brillante en los títulos (simplificado)
function createGlowEffect() {
    if (isMobile) return; // Desactivar en móviles
    
    const titles = document.querySelectorAll('h1, h2');
    
    titles.forEach(title => {
        setInterval(() => {
            anime({
                targets: title,
                textShadow: [
                    '0 0 20px rgba(236, 72, 153, 0.5)',
                    '0 0 30px rgba(236, 72, 153, 0.7)',
                    '0 0 20px rgba(236, 72, 153, 0.5)'
                ],
                duration: 1500,
                easing: 'easeInOutQuad'
            });
        }, 4000);
    });
}

createGlowEffect();

// Easter egg: Click en el corazón del título (simplificado)
document.querySelector('header .heart-beat').addEventListener('click', function() {
    const numHearts = isMobile ? 10 : 15;
    // Crear explosión de corazones
    for (let i = 0; i < numHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💕';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '15%';
            heart.style.fontSize = isMobile ? '20px' : '25px';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            
            document.body.appendChild(heart);
            
            anime({
                targets: heart,
                translateX: (Math.random() - 0.5) * (isMobile ? 300 : 400),
                translateY: (Math.random() - 0.5) * (isMobile ? 300 : 400),
                rotate: Math.random() * 360,
                opacity: [1, 0],
                scale: [1, 0],
                duration: 1500,
                easing: 'easeOutExpo',
                complete: function() {
                    heart.remove();
                }
            });
        }, i * 40);
    }
});

// Mensaje especial cuando llega la fecha
function checkIfTripStarted() {
    const now = new Date();
    if (now >= tripDate && now < new Date('2024-11-27T00:00:00')) {
        // Mostrar mensaje especial
        const specialMessage = document.createElement('div');
        specialMessage.className = 'fixed top-0 left-0 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-3 md:py-4 z-50 text-base md:text-xl font-bold';
        specialMessage.innerHTML = '✈️ ¡Ya voy en camino a verte! 💕';
        document.body.prepend(specialMessage);
    }
}

checkIfTripStarted();
setInterval(checkIfTripStarted, 60000); // Verificar cada minuto

// Smooth scroll para toda la página
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Preloader (opcional)
window.addEventListener('load', () => {
    gsap.to('.preloader', {
        opacity: 0,
        duration: 1,
        onComplete: function() {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.style.display = 'none';
            }
        }
    });
});

console.log('🎉 ¡Página cargada con amor! 💕');
console.log('Destino: Manila, Filipinas 🇵🇭');
console.log('Fecha de salida: 24 de Noviembre, 2024');
console.log('¡Voy a verte pronto! ✈️');
