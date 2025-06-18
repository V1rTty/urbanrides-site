// ===== ФОРМА: ЗБІР ДАНИХ, LOCAL STORAGE, GOOGLE SHEETS =====
document.getElementById('application-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value
  };

  // Збереження в localStorage
  localStorage.setItem('urbanrides-form', JSON.stringify(data));

  // Відправка в Google Таблицю
  fetch('https://script.google.com/macros/s/AKfycbxuN2cP5DYUnHAtkawj5e0KabyTz4WBiNqOWf4QtkXj8WdAh5GqHn8Ug46F9CJ8_yZk/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.result === 'success') {
        showThankYouModal();
        document.getElementById('application-form').reset();
        document.getElementById('modal').classList.remove('active');
      } else {
        alert('Сталася помилка при надсиланні форми.');
      }
    })
    .catch(error => {
      console.error('Помилка:', error);
      alert('Не вдалося відправити форму.');
    });
});

// ===== МОДАЛКА ЗАЯВКИ =====
document.getElementById('open-form').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('modal').classList.add('active');
});

document.getElementById('close-modal').addEventListener('click', function () {
  document.getElementById('modal').classList.remove('active');
});

// ===== МОДАЛКА "ДЯКУЄМО ЗА ЗАЯВКУ" =====
function showThankYouModal() {
  const thankYouModal = document.getElementById('thank-you-modal');
  thankYouModal.classList.add('active');

  document.getElementById('close-thank-you').addEventListener('click', () => {
    thankYouModal.classList.remove('active');
  });

  setTimeout(() => {
    thankYouModal.classList.remove('active');
  }, 4000);
}

// ===== МОБІЛЬНЕ МЕНЮ =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const overlay = document.createElement('div');
overlay.classList.add('menu-overlay');
document.body.appendChild(overlay);

hamburger.addEventListener('click', () => {
  navMenu.querySelector('ul').classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  navMenu.querySelector('ul').classList.remove('active');
  overlay.classList.remove('active');
});

// ===== ПЛАВНИЙ СКРОЛ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== ПЛАВНЕ З'ЯВЛЕННЯ СЕКЦІЙ =====
const revealElements = document.querySelectorAll('section');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(50px)';
  el.style.transition = 'all 0.6s ease-out';
  revealObserver.observe(el);
});
