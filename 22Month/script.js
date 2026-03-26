document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const instruction = document.getElementById('instruction');
    const bgHearts = document.getElementById('bg-hearts');

    // Create floating hearts background using simple JS to randomize positions
    function createHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-bg');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.setProperty('--duration', (Math.random() * 4 + 4) + 's');
            heart.style.animationDelay = Math.random() * 5 + 's';
            bgHearts.appendChild(heart);
        }
    }
    createHearts();

    // Setup Envelope click mechanics
    let isOpen = false;
    envelopeWrapper.addEventListener('click', () => {
        if (!isOpen) {
            envelopeWrapper.classList.add('open');
            instruction.style.opacity = '0';
            instruction.style.transition = 'opacity 0.5s';
            isOpen = true;

            // Trigger canvas-confetti exactly when the letter pulls up
            setTimeout(() => {
                fireConfetti();
            }, 600);
        }
    });

    // Beautiful Confetti effect using the library
    function fireConfetti() {
        // We set duration and colors designed for a romantic feel
        const duration = 2500;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff5e7e', '#ffb6c1', '#ffffff', '#ffd700']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff5e7e', '#ffb6c1', '#ffffff', '#ffd700']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});