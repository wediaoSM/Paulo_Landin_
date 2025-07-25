// ================================
// FUNÇÃO DE TRANSIÇÃO COM FADE
// ================================
function navigateWithFade(url) {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = url;
  }, 400); // tempo deve ser igual ao do CSS transition
}

// ================================
// REMOVER FADE AO ENTRAR
// ================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('fade-out');
});

// Caso volte do cache do navegador (bfcache), remove o fade
window.addEventListener('pageshow', () => {
  document.body.classList.remove('fade-out');
});

// ================================
// INTERCEPTA LINKS INTERNOS
// ================================
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');

  // Ignora âncoras e links especiais
  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('https://wa.me')
  ) return;

  link.addEventListener('click', e => {
    e.preventDefault();
    navigateWithFade(href);
  });
});

// ================================
// MANUSEAR BOTÕES VOLTAR / AVANÇAR
// ================================

// Salva o estado inicial
history.replaceState({ page: window.location.href }, '', window.location.href);

window.addEventListener('popstate', () => {
  // Usa a página anterior real como destino, se existir
  const target =
    document.referrer && document.referrer !== location.href
      ? document.referrer
      : 'index.html';

  navigateWithFade(target);
});

// ================================
// NAVBAR SHRINK
// ================================
window.addEventListener('scroll', () => {
  document.querySelector('.header')
    .classList.toggle('shrink', window.scrollY > 50);
});

// ================================
// SCROLLSPY SIMPLES
// ================================
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', e => {
    document.querySelectorAll('.nav-list a')
      .forEach(el => el.classList.remove('active'));
    e.currentTarget.classList.add('active');
  });
});

// ================================
// CONTADOR REGRESSIVO BANNER
// ================================
function startCountdown(durationSeconds, displayElement) {
  let timer = durationSeconds;

  const interval = setInterval(() => {
    if (timer < 0) {
      clearInterval(interval);
      displayElement.textContent = "Promoção encerrada!";
      return;
    }

    const days = Math.floor(timer / (3600 * 24));
    const hours = Math.floor((timer % (3600 * 24)) / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = Math.floor(timer % 60);

    displayElement.textContent =
      `Termina em: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    timer--;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  const countdownEl = document.querySelector('#diagnostico-banner .countdown');
  if (!countdownEl) return;

  const duration = 4 * 24 * 3600 + 27 * 60 + 36; // 4 dias + 27 min + 36 seg
  startCountdown(duration, countdownEl);
});
