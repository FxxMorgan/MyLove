document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('openLetter');
    const letterCard = document.getElementById('letterCard');
    const heartsLayer = document.getElementById('hearts');
    const sparklesLayer = document.getElementById('sparkles');

    const createFloatingElements = (layer, className, count) => {
        for (let index = 0; index < count; index += 1) {
            const element = document.createElement('span');
            element.className = className;
            element.style.left = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 12}s`;
            element.style.animationDuration = className === 'heart'
                ? `${10 + Math.random() * 10}s`
                : `${5 + Math.random() * 5}s`;
            if (className === 'sparkle') {
                element.style.top = `${Math.random() * 100}%`;
            }
            layer.appendChild(element);
        }
    };

    createFloatingElements(heartsLayer, 'heart', 18);
    createFloatingElements(sparklesLayer, 'sparkle', 24);

    const triggerConfetti = () => {
        if (typeof confetti !== 'function') {
            return;
        }

        const end = Date.now() + 2200;
        const colors = ['#ff6f91', '#ffd6a8', '#ffffff', '#8ec5ff'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 60,
                origin: { x: 0 },
                colors,
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 60,
                origin: { x: 1 },
                colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    openButton.addEventListener('click', () => {
        letterCard.classList.remove('hidden');
        letterCard.classList.add('visible');
        openButton.disabled = true;
        openButton.textContent = 'Carta abierta';
        triggerConfetti();
    });
});