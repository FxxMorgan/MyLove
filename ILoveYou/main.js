// ILoveYou - lógica actualizada para el nuevo index/style (sin jQuery)
// - Corazones flotantes en #floatingHearts
// - Botón sorpresa (#loveButton) que muestra mensajes y revela una carta con efecto typewriter

(function () {
  const el = {
    loveButton: document.getElementById('loveButton'),
    messageDisplay: document.getElementById('messageDisplay'),
    letterSection: document.getElementById('letterSection'),
    letterContent: document.getElementById('letterContent'),
    floatingHearts: document.getElementById('floatingHearts')
  };

  // Mensajes sorpresa que aparecen encima del botón
  const surpriseMessages = [
    'Eres mi universo, Gelly 💖',
    'Contigo todo es más bonito ✨',
    'Tu sonrisa ilumina mi mundo 🌟',
    'Siempre tú, hoy y siempre ❤️',
    'Gracias por existir, mi amor 💞'
  ];

  // Texto de la carta (se escribirá con efecto máquina)
  const letterParagraphs = [
    'As I pen these words, my heart races with a blend of excitement and a touch of nerves. For within these lines lies a confession I have held close to my chest.',
    "From the moment our paths crossed, you've captivated me in a way I never thought possible. Your laughter, a melody; your smile, a beacon; every little detail about you fascinates me endlessly.",
    "You've become the muse of my thoughts, the constant echo in the quiet moments of my day. As time has woven its tapestry, you've grown ever closer, becoming an integral part of my world.",
    "Today, I stand before you—vulnerable yet hopeful—as I share a sentiment so profound, it's reserved only for you. I love you so much, my girlfriend. With a fervor as boundless as the skies and as deep as the oceans.",
    'You are the one who has captured my heart in its entirety. Always yours.'
  ];

  // Utilidad: aleatorio entero [min, max]
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Corazones flotantes de fondo (emoji + estilos aleatorios)
  const heartEmojis = ['💖', '💗', '💘', '💝', '❤️'];

  function spawnHeart(opts) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[randInt(0, heartEmojis.length - 1)];
    const left = Math.random() * 100; // porcentaje
    const sizeRem = Math.random() * 1.5 + 1; // 1rem - 2.5rem aprox
    const duration = Math.random() * 6 + 6; // 6s - 12s
    const delay = (opts?.randomPhase ? -Math.random() * 4 : Math.random() * 2); // negativo = empieza avanzado

    heart.style.left = left + '%';
    heart.style.fontSize = sizeRem + 'rem';
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';

    el.floatingHearts && el.floatingHearts.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  }

  // Generador continuo
  let heartInterval = null;
  function startHearts() {
    if (heartInterval) return;
    // ritmo suave para no saturar
    heartInterval = setInterval(spawnHeart, 900);
  }

  function stopHearts() {
    if (!heartInterval) return;
    clearInterval(heartInterval);
    heartInterval = null;
  }

  // Pequeña ráfaga de corazones al interactuar
  function heartBurst(count = 16) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => spawnHeart({ randomPhase: true }), i * 50);
    }
  }

  // Efecto máquina de escribir para varios párrafos
  function typewriterParagraphs(container, paragraphs, speed = 22, onDone) {
    container.innerHTML = '';
    let pIndex = 0;
    let cIndex = 0;
    let pEl = null;

    function typeNext() {
      if (pIndex >= paragraphs.length) {
        onDone && onDone();
        return;
      }
      if (!pEl) {
        pEl = document.createElement('p');
        container.appendChild(pEl);
      }
      const text = paragraphs[pIndex];
      if (cIndex < text.length) {
        pEl.textContent += text.charAt(cIndex);
        cIndex++;
        setTimeout(typeNext, speed);
      } else {
        // párrafo terminado
        pEl = null;
        cIndex = 0;
        pIndex++;
        // pequeña pausa entre párrafos
        setTimeout(typeNext, 300);
      }
    }
    typeNext();
  }

  // Lógica del botón
  let letterShown = false;
  let msgIndex = 0;

  function showMessage() {
    if (!el.messageDisplay) return;
    const msg = surpriseMessages[msgIndex % surpriseMessages.length];
    msgIndex++;
    el.messageDisplay.textContent = msg;
    el.messageDisplay.classList.add('show');
    // Ocultar suavemente después de unos segundos
    setTimeout(() => el.messageDisplay && el.messageDisplay.classList.remove('show'), 2800);
  }

  el.loveButton?.addEventListener('click', () => {
    showMessage();
    heartBurst(18);

    if (!letterShown && el.letterSection && el.letterContent) {
      letterShown = true;
      el.letterSection.classList.add('show');
      typewriterParagraphs(el.letterContent, letterParagraphs, 18);

      // Cambiar texto del botón tras mostrar la carta
      const span = el.loveButton.querySelector('span');
      if (span) span.textContent = 'Otra sorpresita';
    }
  });

  // Inicio
  startHearts();
  // Pausa cuando la pestaña no está visible, reanuda al volver
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopHearts(); else startHearts();
  });

  // Limpieza si fuese necesario (opcional en SPA simple)
  window.addEventListener('beforeunload', () => stopHearts());
})();
