// ===== Intersection Observer for fade-in =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== VIDEO CAROUSEL — Progress Rumah Baru Mereka =====
(function () {
  const stage         = document.getElementById('vidStage');
  const dotsContainer = document.getElementById('vidDots');
  const btnPrev       = document.getElementById('vidPrev');
  const btnNext       = document.getElementById('vidNext');
  if (!stage) return;

  const slides = Array.from(stage.querySelectorAll('.vid-slide'));
  if (!slides.length) return;

  // Generate dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'vid-dot';
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.querySelectorAll('.vid-dot'));

  let current = 0;

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;

    // Pause current video
    const curVideo = slides[current].querySelector('video');
    if (curVideo) curVideo.pause();

    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');

    // Play new video
    const newVideo = slides[current].querySelector('video');
    if (newVideo) {
      newVideo.currentTime = 0;
      newVideo.play().catch(() => {});
    }

    if (btnPrev) btnPrev.disabled = current === 0;
    if (btnNext) btnNext.disabled = current === slides.length - 1;
  }

  if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
  if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Touch swipe
  let touchStartX = 0;
  let touchStartY = 0;

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  stage.addEventListener('touchmove', (e) => {
    const diffX = touchStartX - e.touches[0].clientX;
    const diffY = touchStartY - e.touches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY)) e.preventDefault();
  }, { passive: false });

  stage.addEventListener('touchend', (e) => {
    const diffX = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diffX) < 50) return;
    if (diffX > 0) goTo(current + 1);
    else goTo(current - 1);
  }, { passive: true });

  // Init
  goTo(0);
})();


// ===== ACTIVITY VIDEO CAROUSEL — Ikuti Perjalanan Kami =====
(function () {
  const stage         = document.getElementById('actStage');
  const dotsContainer = document.getElementById('actDots');
  const btnPrev       = document.getElementById('actPrev');
  const btnNext       = document.getElementById('actNext');
  if (!stage) return;

  const slides = Array.from(stage.querySelectorAll('.vid-slide'));
  if (!slides.length) return;

  // Generate dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'vid-dot';
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.querySelectorAll('.vid-dot'));

  let current = 0;

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;

    const curVideo = slides[current].querySelector('video');
    if (curVideo) curVideo.pause();

    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');

    const newVideo = slides[current].querySelector('video');
    if (newVideo) {
      newVideo.currentTime = 0;
      newVideo.play().catch(() => {});
    }

    if (btnPrev) btnPrev.disabled = current === 0;
    if (btnNext) btnNext.disabled = current === slides.length - 1;
  }

  if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
  if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Touch swipe
  let touchStartX = 0;
  let touchStartY = 0;

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  stage.addEventListener('touchmove', (e) => {
    const diffX = touchStartX - e.touches[0].clientX;
    const diffY = touchStartY - e.touches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY)) e.preventDefault();
  }, { passive: false });

  stage.addEventListener('touchend', (e) => {
    const diffX = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diffX) < 50) return;
    if (diffX > 0) goTo(current + 1);
    else goTo(current - 1);
  }, { passive: true });

  // Init
  goTo(0);
})();
