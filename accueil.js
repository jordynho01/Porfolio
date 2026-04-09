// Observer pour déclencher les animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

// Sélectionne tous les éléments à animer
document.querySelectorAll(
  '.hero h1, .hero p, .hero .scroll, .profile-pic, .section-title, .services h2, .service, .skill'
).forEach(el => {
  observer.observe(el);
});
