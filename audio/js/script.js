// ---------- Nav scroll shadow ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, {passive:true});

// ---------- Mobile menu ----------
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
navToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileMenuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ---------- Pétalos flotantes ----------
const petalContainer = document.getElementById('petals');
const petalCount = window.innerWidth < 640 ? 8 : 14;
for(let i=0; i<petalCount; i++){
  const p = document.createElement('div');
  p.className = 'petal';
  const size = 6 + Math.random()*8;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.left = Math.random()*100 + 'vw';
  p.style.setProperty('--drift', (Math.random()*80 - 40) + 'px');
  p.style.animationDuration = (14 + Math.random()*12) + 's';
  p.style.animationDelay = (Math.random()*-20) + 's';
  petalContainer.appendChild(p);
}

// ---------- Barra de progreso ----------
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
}, {passive:true});

// ---------- Dot nav activo ----------
const dotLinks = document.querySelectorAll('#dot-nav a');
const navSections = Array.from(dotLinks).map(a => document.querySelector(a.getAttribute('href')));
const dotIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const idx = navSections.indexOf(entry.target);
      dotLinks.forEach(a => a.classList.remove('active'));
      if(idx > -1) dotLinks[idx].classList.add('active');
    }
  });
}, {threshold:0.4});
navSections.forEach(s => { if(s) dotIO.observe(s); });

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
revealEls.forEach(el => io.observe(el));

// ---------- Countdown ----------
const weddingDate = new Date('2027-02-14T17:00:00');
function updateCountdown(){
  const now = new Date();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-min').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-sec').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Música ----------
const bgm = document.getElementById('bgm');
const musicBtn = document.getElementById('music-toggle');
let isPlaying = false;
musicBtn.addEventListener('click', () => {
  if(!isPlaying){
    bgm.play().catch(() => {
      alert('Agrega tu archivo "musica.mp3" dentro de la carpeta "audio" para activar la música de fondo.');
    });
    isPlaying = true;
    musicBtn.classList.add('playing');
    musicBtn.setAttribute('aria-label','Pausar música');
  } else {
    bgm.pause();
    isPlaying = false;
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('aria-label','Reproducir música');
  }
});

// ---------- RSVP ----------
const rsvpForm = document.getElementById('rsvp-form');
const rsvpError = document.getElementById('rsvp-error');
rsvpForm.addEventListener('submit', function(e){
  e.preventDefault();
  const btn = this.querySelector('.submit-btn');
  const formData = new FormData(this);
  rsvpError.style.display = 'none';
  fetch(this.action, { method: 'POST', mode: 'no-cors', body: formData })
    .then(() => {
      btn.textContent = '¡Gracias por confirmar!';
      btn.style.background = '#7C8B6F';
      setTimeout(() => { rsvpForm.reset(); btn.textContent = 'Enviar confirmación'; btn.style.background = ''; }, 2600);
    })
    .catch(() => { rsvpError.style.display = 'block'; });
});
