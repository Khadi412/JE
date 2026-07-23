document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('gallerySlider');
  if (!slider) return;

  const track = slider.querySelector('.gallery-track');
  const slides = slider.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  let currentIndex = 0;
  let autoPlay;

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  function startAutoPlay() {
    autoPlay = setInterval(() => goToSlide(currentIndex + 1), 5000);
  }
  function stopAutoPlay() {
    clearInterval(autoPlay);
  }

  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Touch swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoPlay();
  }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
    startAutoPlay();
  });

  startAutoPlay();
});