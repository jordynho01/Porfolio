// portfolio.js - Interactions CV Génial

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  themeToggle.style.background = isLight ? '#ff6b6b' : 'var(--glass)';
});

// Sidebar Mobile Toggle
const sidebar = document.querySelector('.sidebar');
document.querySelector('.theme-toggle').addEventListener('click', (e) => {
  if (window.innerWidth <= 1024) {
    sidebar.classList.toggle('open');
  }
});

// Smooth Scroll Navigation
document.querySelectorAll('.nav-link, .cv-nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Active nav
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    // Close sidebar mobile
    sidebar.classList.remove('open');
  });
});

// Navbar Scroll Active
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('.cv-section').forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Stats Counter Animation
const counters = document.querySelectorAll('.number');
const speed = 200;

counters.forEach(counter => {
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = target + (target > 10 ? '+' : '');
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(counter);
});

// Skills Radar Chart
const ctx = document.getElementById('skillsRadar').getContext('2d');
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Photoshop', 'HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Sécurité'],
    datasets: [{
      label: 'Niveau (%)',
      data: [95, 90, 85, 80, 75, 85],
      borderColor: '#f4b33a',
      backgroundColor: 'rgba(244, 179, 58, 0.2)',
      borderWidth: 3,
      pointBackgroundColor: '#f4b33a',
      pointBorderColor: '#fff',
      pointBorderWidth: 3,
      pointRadius: 8,
      pointHoverRadius: 12
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, color: 'rgba(255,255,255,0.7)' },
        grid: { color: 'rgba(255,255,255,0.1)' },
        pointLabels: { color: '#e6e6fa', font: { size: 13 } }
      }
    },
    plugins: { legend: { display: false } },
    animation: {
      animateRotate: true,
      duration: 2000
    }
  }
});

// Skills Bars Animation
const skillFills = document.querySelectorAll('.skill-fill');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      fill.style.width = width + '%';
    }
  });
});

skillFills.forEach(fill => skillsObserver.observe(fill));

// Timeline Animation
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, index * 200);
    }
  });
});

document.querySelectorAll('.timeline-item').forEach(item => timelineObserver.observe(item));

// Projets Filter + 3D Hover
let activeFilter = 'all';
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    activeFilter = btn.getAttribute('data-filter');
    
    // Filter projects
    document.querySelectorAll('.project-card').forEach(card => {
      const category = card.getAttribute('data-category');
      if (activeFilter === 'all' || category === activeFilter) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
      } else {
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.opacity = '0.5';
      }
    });
  });
});

// 3D Project Cards
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
  
  // Stagger animation
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, index * 150);
});

// Intersection Observer pour sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
});

document.querySelectorAll('.cv-section').forEach(section => {
  section.style.animationPlayState = 'paused';
  sectionObserver.observe(section);
});

// PWA Ready - Service Worker (optionnel)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// PDF Export
window.printBtn = document.createElement('button');
printBtn.innerHTML = '📄 PDF';
printBtn.className = 'print-btn';
printBtn.style.cssText = `
  position: fixed; bottom: 2rem; right: 2rem; z-index: 1000;
  padding: 1rem 1.5rem; background: var(--accent); color: white;
  border: none; border-radius: 50px; font-weight: 600; cursor: pointer;
  box-shadow: var(--shadow); transition: all 0.3s ease;
`;
printBtn.addEventListener('click', () => window.print());
document.body.appendChild(printBtn);

// Smooth loading
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

