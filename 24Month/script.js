document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       SECTION 1: TABS & NAVIGATION STATE
       ========================================================================== */
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.app-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');
            
            // Toggle active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Toggle active section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `section-${targetSection}`) {
                    section.classList.add('active');
                }
            });

            // If entering Memories section, trigger a soft layout refresh
            if (targetSection === 'memories') {
                initializePolaroidEffects();
            }
        });
    });

    /* ==========================================================================
       SECTION 2: RELATIONSHIP TIMER CLOCK
       ========================================================================== */
    const startDate = new Date('2024-05-25T00:00:00'); // Relationship Start Date

    function updateTimer() {
        const now = new Date();
        
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        
        // Adjust for day/month boundaries
        if (days < 0) {
            // Find days in previous month
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        
        if (months < 0) {
            months += 12;
            years--;
        }

        // Calculate hours, minutes, seconds remaining
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const diffMs = now - startOfToday;
        
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        // Update DOM elements with padStart for aesthetic padding
        document.getElementById('years').innerText = String(years).padStart(2, '0');
        document.getElementById('months').innerText = String(months).padStart(2, '0');
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    // Run immediately and then tick every second
    updateTimer();
    setInterval(updateTimer, 1000);

    /* ==========================================================================
       SECTION 3: HIGH-PERFORMANCE ROSE PETALS CANVAS ENGINE
       ========================================================================== */
    const canvas = document.getElementById('canvas-petals');
    const ctx = canvas.getContext('2d');
    
    let petals = [];
    const maxPetals = 45;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Petal {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height; // Spread initially
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 8 + 10; // Width of petal
            this.aspectRatio = Math.random() * 0.4 + 0.6; // Shape
            this.opacity = Math.random() * 0.6 + 0.3;
            this.speedY = Math.random() * 1.2 + 0.8;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 1.5 - 0.75;
            this.swing = Math.random() * 0.03 + 0.01;
            this.swingCount = Math.random() * 100;
        }

        update() {
            this.y += this.speedY;
            this.swingCount += this.swing;
            this.x += this.speedX + Math.sin(this.swingCount) * 0.6;
            this.rotation += this.rotationSpeed;

            // Loop back around screen edges
            if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            
            // Draw a beautiful curved rose petal using cubic/quadratic curves
            ctx.beginPath();
            ctx.moveTo(0, 0);
            
            // Left curve
            ctx.quadraticCurveTo(-this.size * 0.8, -this.size * this.aspectRatio * 0.5, -this.size * 0.3, -this.size * this.aspectRatio);
            // Top indent
            ctx.quadraticCurveTo(0, -this.size * this.aspectRatio * 1.2, this.size * 0.3, -this.size * this.aspectRatio);
            // Right curve
            ctx.quadraticCurveTo(this.size * 0.8, -this.size * this.aspectRatio * 0.5, 0, 0);
            
            // Soft gradient coloring for romantic rose/peach appearance
            const grad = ctx.createRadialGradient(-2, -this.size * 0.5, 1, 0, -this.size * 0.5, this.size);
            grad.addColorStop(0, `rgba(255, 117, 140, ${this.opacity})`);     // Soft rose
            grad.addColorStop(0.7, `rgba(219, 48, 77, ${this.opacity * 0.95})`); // Deeper red
            grad.addColorStop(1, `rgba(140, 20, 36, ${this.opacity * 0.8})`);    // Shadow edge
            
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
        }
    }

    // Initialize particles
    for (let i = 0; i < maxPetals; i++) {
        petals.push(new Petal());
    }

    // Animation loop
    function animatePetals() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        
        requestAnimationFrame(animatePetals);
    }
    animatePetals();

    /* ==========================================================================
       SECTION 4: 3D ENVELOPE WAX-SEAL CLICK SYSTEM & CONFETTI
       ========================================================================== */
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const waxSeal = document.getElementById('wax-seal');
    const instruction = document.getElementById('instruction');

    let isEnvelopeOpen = false;

    function openEnvelope() {
        if (!isEnvelopeOpen) {
            envelopeWrapper.classList.add('open');
            instruction.style.opacity = '0';
            instruction.style.transform = 'translateY(-10px)';
            instruction.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            isEnvelopeOpen = true;

            // Trigger deluxe confetti blast
            setTimeout(() => {
                fireDeluxeConfetti();
            }, 600);

            // Attempt to trigger romantic music player automatically on envelope open
            setTimeout(() => {
                if (audio.paused) {
                    toggleMusic();
                }
            }, 800);
        }
    }

    // Connect envelope and wax-seal to trigger open
    waxSeal.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid double triggers
        openEnvelope();
    });
    
    envelopeWrapper.addEventListener('click', () => {
        openEnvelope();
    });

    // Premium Confetti Burst
    function fireDeluxeConfetti() {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            // Burst from left side
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 60,
                origin: { x: 0, y: 0.8 },
                colors: ['#ff758c', '#ffb3a7', '#ffd700', '#ffffff']
            });
            
            // Burst from right side
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 60,
                origin: { x: 1, y: 0.8 },
                colors: ['#ff758c', '#ffb3a7', '#ffd700', '#ffffff']
            });

            // Burst hearts from the center
            if (Math.random() < 0.15) {
                confetti({
                    particleCount: 3,
                    angle: 90,
                    spread: 80,
                    origin: { x: 0.5, y: 0.65 },
                    colors: ['#ff3b60', '#ffccd5']
                });
            }

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    /* ==========================================================================
       SECTION 5: MUSIC PLAYER & WIDGET MECHANICS
       ========================================================================== */
    const audio = document.getElementById('love-song');
    const playBtn = document.getElementById('play-btn');
    const musicPlayer = document.querySelector('.music-player');
    const vinylDisc = document.getElementById('vinyl-disc');
    
    let isPlaying = false;
    let noteInterval;

    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            musicPlayer.classList.remove('playing');
            isPlaying = false;
            clearInterval(noteInterval);
        } else {
            audio.play().then(() => {
                playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                musicPlayer.classList.add('playing');
                isPlaying = true;
                
                // Start generating floating romantic notes
                noteInterval = setInterval(spawnNote, 800);
            }).catch(err => {
                console.log("Music play blocked by browser. Awaiting user interaction.", err);
            });
        }
    }

    playBtn.addEventListener('click', toggleMusic);

    // Floating note generator
    function spawnNote() {
        if (!isPlaying) return;
        
        const symbols = ['♫', '♪', '♬', '♩', '❤'];
        const note = document.createElement('div');
        note.classList.add('music-note');
        note.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Position relative to vinyl center
        const vinylRect = vinylDisc.getBoundingClientRect();
        const startX = vinylRect.left + (vinylRect.width / 2) + window.scrollX;
        const startY = vinylRect.top + (vinylRect.height / 2) + window.scrollY;
        
        note.style.left = `${startX}px`;
        note.style.top = `${startY}px`;
        
        // Random drift coordinates
        const driftX = (Math.random() * 100 - 50) + 'px';
        const driftY = -(Math.random() * 120 + 80) + 'px';
        const rotation = (Math.random() * 90 - 45) + 'deg';
        
        note.style.setProperty('--x', driftX);
        note.style.setProperty('--y', driftY);
        note.style.setProperty('--r', rotation);
        
        document.body.appendChild(note);
        
        // Clean up notes from DOM
        setTimeout(() => {
            note.remove();
        }, 2500);
    }

    /* ==========================================================================
       SECTION 6: POLAROID PARALLAX & HOVER ENGINE
       ========================================================================== */
    function initializePolaroidEffects() {
        const cards = document.querySelectorAll('.polaroid-card:not(.future-card)');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                
                // Calculate cursor offset relative to card center
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);
                
                // Limit maximum rotation angle to 15 degrees
                const rotateX = -(y / (rect.height / 2)) * 12;
                const rotateY = (x / (rect.width / 2)) * 12;
                
                // Apply 3D perspective transformations
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                // Return to static styled rotation (reset transformations)
                card.style.transform = '';
            });
        });
    }

    // Call once initially to bind effects
    initializePolaroidEffects();

});
