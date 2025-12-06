/* Smooth page reveal */
document.addEventListener('DOMContentLoaded', () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, {threshold: 0.1});

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* Parallax hero on mouse */
  const heroImg = document.querySelector('.hero .image img');
  const hero = document.querySelector('.hero');
  if (hero && heroImg) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroImg.style.transform = `scale(1.05) translate(${x * 12}px, ${y * 8}px)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'scale(1.04)';
    });
  }

  /* Cursor spark trail */
  const trail = document.createElement('div');
  trail.style.position = 'fixed';
  trail.style.inset = '0';
  trail.style.pointerEvents = 'none';
  document.body.appendChild(trail);

  const sparks = [];
  window.addEventListener('mousemove', (e) => {
    const s = document.createElement('span');
    s.style.position = 'absolute';
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    s.style.width = s.style.height = '6px';
    s.style.borderRadius = '50%';
    s.style.background = `radial-gradient(circle, rgba(231,111,81,.9), rgba(231,111,81,.1))`;
    s.style.filter = 'blur(0.5px)';
    s.style.transform = 'translate(-50%, -50%)';
    s.style.transition = 'transform .6s ease, opacity .6s ease';
    trail.appendChild(s);
    const dx = (Math.random() - 0.5) * 40;
    const dy = (Math.random() - 0.5) * 40;
    requestAnimationFrame(() => {
      s.style.transform = `translate(${dx}px, ${dy}px) scale(.6)`;
      s.style.opacity = '0';
    });
    sparks.push(s);
    if (sparks.length > 50) {
      const old = sparks.shift();
      old.remove();
    }
    setTimeout(() => s.remove(), 700);
  });

  /* Booking: simple validation & toast */
  const bookingForm = document.querySelector('#bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = bookingForm.querySelector('[name="name"]').value.trim();
      const phone = bookingForm.querySelector('[name="phone"]').value.trim();
      const time = bookingForm.querySelector('[name="time"]').value;
      if (!name || !phone || !time) return toast('Заполните все поля', 'warn');
      toast('Заявка отправлена! Мы скоро перезвоним.', 'ok');
      bookingForm.reset();
    });
  }

  function toast(text, type='ok'){
    const t = document.createElement('div');
    t.textContent = text;
    t.className = 'toast';
    Object.assign(t.style, {
      position:'fixed', bottom:'24px', left:'50%', transform:'translateX(-50%)',
      background: type==='ok' ? 'rgba(42,157,143,.9)' : 'rgba(231,111,81,.9)',
      color:'#100', padding:'12px 16px', borderRadius:'12px', fontWeight:'700',
      boxShadow:'0 10px 30px rgba(0,0,0,.4)', zIndex:'1000'
    });
    document.body.appendChild(t);
    setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)'; }, 1600);
    setTimeout(()=> t.remove(), 2100);
  }
});