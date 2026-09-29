/**
 * Mohammed Shuhaib.K — Portfolio Interactions & Scroll Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Smooth Navigation Scrolling
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. Mobile Drawer Toggle
  // --------------------------------------------------------------------------
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      mobileBtn.classList.toggle('active');
    });

    document.querySelectorAll('.mobile-drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileBtn.classList.remove('active');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Scroll Spy (Active State for Top Nav Links)
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    let currentId = 'home';
    const scrollPos = window.scrollY + 220;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const secTarget = link.getAttribute('data-section');
      if (secTarget === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Also update mobile drawer active link
    document.querySelectorAll('.mobile-drawer-link').forEach(mLink => {
      const href = mLink.getAttribute('href');
      if (href === `#${currentId}`) {
        mLink.classList.add('active');
      } else {
        mLink.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // --------------------------------------------------------------------------
  // 4. Ambient Canvas Particles (Ethereal Emerald & Champagne Dust)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -Math.random() * 0.28 - 0.08,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.4 ? '16, 185, 129' : '199, 178, 138'
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        grad.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
        grad.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // --------------------------------------------------------------------------
  // 5. Interactive Contact Form Actions (WhatsApp & Email Dispatch)
  // --------------------------------------------------------------------------
  window.sendViaWhatsApp = function () {
    const name = document.getElementById('contactName')?.value.trim();
    const service = document.getElementById('contactService')?.value;
    const message = document.getElementById('contactMessage')?.value.trim();
    const notice = document.getElementById('formStatusNotice');

    if (!name || !message) {
      if (notice) {
        notice.style.display = 'block';
        notice.style.color = '#FCA5A5';
        notice.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        notice.textContent = 'Please provide both your name and project details.';
      }
      return;
    }

    const encodedText = encodeURIComponent(
      `Hello Mohammed Shuhaib,\n\nMy name is ${name}.\nI'm interested in: ${service}\n\nProject Details:\n${message}\n\nSent via your portfolio website.`
    );

    const waUrl = `https://wa.me/918086648642?text=${encodedText}`;
    window.open(waUrl, '_blank');

    if (notice) {
      notice.style.display = 'block';
      notice.style.color = '#6EE7B7';
      notice.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      notice.textContent = 'Opening WhatsApp with your project message pre-filled...';
    }
  };

  window.handleContactSubmit = function () {
    const name = document.getElementById('contactName')?.value.trim();
    const service = document.getElementById('contactService')?.value;
    const message = document.getElementById('contactMessage')?.value.trim();
    const notice = document.getElementById('formStatusNotice');

    if (!name || !message) {
      if (notice) {
        notice.style.display = 'block';
        notice.style.color = '#FCA5A5';
        notice.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        notice.textContent = 'Please provide both your name and project details.';
      }
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry: ${service} - from ${name}`);
    const body = encodeURIComponent(
      `Hello Mohammed Shuhaib,\n\nName: ${name}\nService: ${service}\n\nProject Details:\n${message}\n\nSent from your portfolio website.`
    );

    const mailtoUrl = `mailto:mohamedshuhaib233@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    if (notice) {
      notice.style.display = 'block';
      notice.style.color = '#6EE7B7';
      notice.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      notice.textContent = 'Opening your email client to dispatch the message...';
    }
  };
});
