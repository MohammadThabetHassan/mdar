// js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
  /* 1. Generate twinkling stars */
  const starContainer = document.querySelector('.starfield');
  if (starContainer) {
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${(Math.random() * 5).toFixed(2)}s`;
      star.style.animationDuration = `${(2 + Math.random() * 3).toFixed(2)}s`;
      starContainer.appendChild(star);
    }
  }

  /* 2. Parallax scroll for starfield */
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    if (starContainer) {
      starContainer.style.transform = `translateY(${y * 0.1}px)`;
    }
  });

  /* 3. Reveal on scroll */
  const items = document.querySelectorAll(
    '.service-summary-list li, .diff-list li, .orbit-animate'
  );
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(i => io.observe(i));

  /* 4. Smooth scroll for anchors */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* 5. Contact form validation */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const msg = form.querySelector('#message').value.trim();
      if (!name || !email || !msg) {
        alert('Please fill in all required fields.');
        e.preventDefault();
        return;
      }
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(email)) {
        alert('Please enter a valid email address.');
        e.preventDefault();
      }
    });
  }
});
