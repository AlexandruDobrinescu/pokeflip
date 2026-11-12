// ===== DOM ELEMENTS =====
const flipper = document.getElementById('flipper');

// ===== STATE =====
let isFlipping = false;

// ===== AUDIO CONTEXT FOR FLIP SOUND =====
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playFlipSound() {
  if (!audioCtx) return;
  
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.15);
  
  gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
  
  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + 0.15);
}

// ===== FLIP LOGIC =====
function performFlip() {
  if (isFlipping) return;
  isFlipping = true;

  initAudio();
  playFlipSound();

  const statIcons = flipper.querySelectorAll('.flipper-front .stat-icon');
  const statIndex = Math.floor(Math.random() * statIcons.length);
  const rotation = ((3 - statIndex + statIcons.length) % statIcons.length) * 60;

  flipper.style.setProperty('--coin-rotation', `${rotation}deg`);
  flipper.style.setProperty('--coin-counter-rotation', `${-rotation}deg`);
  flipper.classList.toggle('flipped');
  flipper.classList.add('has-result');
  flipper.setAttribute('aria-pressed', String(flipper.classList.contains('flipped')));

  window.setTimeout(() => {
    isFlipping = false;
  }, 600);
}

// ===== EVENT LISTENERS =====
flipper.addEventListener('click', performFlip);
flipper.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    performFlip();
  }
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    const swUrl = new URL('./sw.js', window.location.href);

    navigator.serviceWorker.register(swUrl.href)
      .then((registration) => {
        console.log('SW registered: ', registration.scope);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// ===== INSTALL PROMPT =====
let deferredPrompt;
const installBanner = document.createElement('div');
installBanner.className = 'install-banner';
installBanner.innerHTML = `
  <div>Install Pokemon Flipper for offline use!</div>
  <button class="install-btn" id="install-btn">Install</button>
`;
document.body.appendChild(installBanner);

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBanner.classList.add('visible');
});

document.getElementById('install-btn')?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;
  
  if (result.outcome === 'accepted') {
    installBanner.classList.remove('visible');
  }
  deferredPrompt = null;
});

// Hide install banner after 10 seconds
setTimeout(() => {
  installBanner.classList.remove('visible');
}, 10000);
