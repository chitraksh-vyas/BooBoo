const scenes = document.querySelectorAll('.scene');
const rainAudio = document.getElementById('rain');
const ambientAudio = document.getElementById('ambient');

/* Scroll reveal */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lines = entry.target.querySelectorAll('.line, .final');
      lines.forEach((line, i) => {
        setTimeout(() => {
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        }, i * 400);
      });

      const photo = entry.target.querySelector('.photo');
      if (photo) {
        photo.style.opacity = '1';
        photo.style.transform = 'scale(1)';
      }

      /* Rain effect */
      if (entry.target.classList.contains('rain') || entry.target.classList.contains('adventure')) {
        rainAudio.volume = 0.3;
        rainAudio.play();
      } else {
        rainAudio.pause();
      }
    }
  });
}, { threshold: 0.4 });

scenes.forEach(scene => observer.observe(scene));

/* Parallax */
window.addEventListener('scroll', () => {
  scenes.forEach(scene => {
    const offset = scene.getBoundingClientRect().top * 0.15;
    scene.style.transform = `translateY(${offset}px)`;
  });
});

/* Ambient audio on first click */
document.body.addEventListener('click', () => {
  ambientAudio.volume = 0.25;
  ambientAudio.play();
}, { once: true });

/* Service worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
