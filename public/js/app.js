(() => {
  const C = window.INVITATION;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), C);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; // selalu mulai dari layar profil
  const [nameA, nameB] = C.couple.short;
  document.title = `The Wedding of ${nameA} & ${nameB}`;

  // ---------- teks & nama ----------
  $$('[data-text]').forEach((el) => { el.textContent = get(el.dataset.text) ?? ''; });
  $$('[data-short]').forEach((el) => { el.textContent = C.couple.short[el.dataset.short] ?? ''; });
  $$('[data-names]').forEach((el) => {
    el.innerHTML = el.classList.contains('bb-title')
      ? `<span>${esc(nameA)}</span><span class="title-second"><em class="amp">&amp;</em>${esc(nameB)}</span>`
      : `${esc(nameA)}<em class="amp">&amp;</em>${esc(nameB)}`;
  });
  $$('[data-mark]').forEach((el) => { el.textContent = (C.brand || 'W').trim().charAt(0); });
  $$('[data-monogram]').forEach((el) => {
    el.innerHTML = `${esc(nameA.charAt(0))}<span>&amp;</span>${esc(nameB.charAt(0))}`;
  });
  if (C.hero.rank) $('#rank').hidden = false;

  const listHTML = (arr) => (arr || []).map((v) => `<span>${esc(v)}</span>`).join('');
  $('#factCast').innerHTML = listHTML([C.couple.groom.name, C.couple.bride.name]);
  $('#factGenre').innerHTML = listHTML(C.details?.genres);
  $('#factMood').innerHTML = listHTML(C.details?.moods);

  // ---------- avatar profil (wajah tersenyum berwarna) ----------
  const AV_COLORS = ['#e50914', '#2f80ed', '#f5b800', '#1db954', '#8e44ad', '#e87c03'];
  const face = '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="28" y="30" width="9" height="16" rx="4.5" fill="#fff"/><rect x="63" y="30" width="9" height="16" rx="4.5" fill="#fff"/><path d="M27 60c6 11 14 16 23 16s17-5 23-16" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/></svg>';
  const colorFor = (s) => AV_COLORS[[...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % AV_COLORS.length];
  const AV_FIXED = { guest: AV_COLORS[1], groom: AV_COLORS[2], bride: AV_COLORS[0] };
  $$('[data-avatar]').forEach((el) => {
    el.style.setProperty('--av', AV_FIXED[el.dataset.avatar]);
    el.innerHTML = face;
  });

  // ---------- foto (dengan placeholder bila file belum ada) ----------
  const phLabel = (src) => (src || '').split('/').pop() || 'foto';
  function setPhoto(img, src, label) {
    const holder = img.parentElement;
    const fail = () => {
      img.classList.add('ph-img');
      holder.classList.add('ph');
      holder.dataset.ph = label || phLabel(src);
    };
    if (!src) return fail();
    img.addEventListener('error', fail, { once: true });
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = src;
  }
  function setBg(el, src) {
    const fail = () => { el.classList.add('ph'); el.dataset.ph = phLabel(src); };
    const probe = new Image();
    probe.onload = () => { el.style.backgroundImage = `url("${src}")`; };
    probe.onerror = fail;
    if (src) probe.src = src; else fail();
  }
  $$('[data-photo]').forEach((el) => {
    const src = get(el.dataset.photo);
    el.tagName === 'IMG' ? setPhoto(el, src) : setBg(el, src);
  });

  // ---------- nama tamu (?to=Nama) ----------
  const guest = new URLSearchParams(location.search).get('to');
  const guestName = guest?.trim().slice(0, 60) || C.cover.defaultGuest;
  $('#guestName').textContent = guestName;
  $$('[data-guest]').forEach((el) => { el.textContent = guestName; });
  if (guest) $('#rsvpName').value = guest.slice(0, 60);

  // ---------- intro "ta-dum" ----------
  const intro = $('#intro');
  const endIntro = () => intro.classList.add('done');
  const introT = setTimeout(endIntro, reduceMotion ? 1200 : 2500);
  intro.addEventListener('click', () => { clearTimeout(introT); endIntro(); });

  // ---------- musik ----------
  const audio = $('#bgm');
  const musicBtn = $('#musicBtn');
  if (C.music) {
    audio.src = C.music;
    audio.addEventListener('error', () => { musicBtn.hidden = true; });
    audio.addEventListener('play', () => musicBtn.classList.add('playing'));
    audio.addEventListener('pause', () => musicBtn.classList.remove('playing'));
    musicBtn.addEventListener('click', () => (audio.paused ? audio.play().catch(() => {}) : audio.pause()));
  }
  const playMusic = () => {
    if (!C.music) return;
    musicBtn.hidden = false;
    audio.play().catch(() => {});
  };

  // ---------- buka undangan (pilih profil) ----------
  const cover = $('#cover');
  const main = $('#main');
  const pageNav = $('#nav');
  main.inert = true;
  pageNav.inert = true;
  let opened = false;
  let coverTimer;
  function openInvitation(profile) {
    if (opened) return;
    opened = true;
    profile?.classList.add('picked');
    playMusic();
    setTimeout(() => {
      cover.classList.add('opened');
      document.body.classList.remove('locked');
      document.documentElement.classList.add('started');
      main.inert = false;
      pageNav.inert = false;
      cover.inert = true;
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
      coverTimer = setTimeout(() => { cover.style.display = 'none'; }, 900);
    }, reduceMotion ? 0 : 380);
  }
  $$('[data-open]', cover).forEach((b) => b.addEventListener('click', () => openInvitation(b.closest('.profile'))));
  $('#profileBtn').addEventListener('click', () => {
    clearTimeout(coverTimer);
    opened = false;
    cover.style.display = '';
    cover.classList.remove('opened');
    cover.inert = false;
    main.inert = true;
    pageNav.inert = true;
    document.body.classList.add('locked');
    $$('.profile', cover).forEach((el) => el.classList.remove('picked'));
    $('#openBtn').focus();
  });

  $('#playBtn').addEventListener('click', () => {
    playMusic();
    $('#episodes').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  // ---------- navbar ----------
  const nav = $('#nav');
  const solidNav = () => nav.classList.toggle('solid', window.scrollY > 40);
  solidNav();
  addEventListener('scroll', solidNav, { passive: true });
  const navLinks = $$('.nav-links a');
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => {
        const active = a.getAttribute('href') === `#${en.target.id}`;
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach((a) => { const sec = $(a.getAttribute('href')); if (sec) navIO.observe(sec); });

  // ---------- countdown ----------
  const target = new Date(C.date).getTime();
  const cd = Object.fromEntries($$('[data-cd]').map((el) => [el.dataset.cd, el]));
  const pad = (n) => String(n).padStart(2, '0');
  function tick() {
    const diff = Math.max(target - Date.now(), 0);
    const s = Math.floor(diff / 1000);
    cd.d.textContent = pad(Math.floor(s / 86400));
    cd.h.textContent = pad(Math.floor((s % 86400) / 3600));
    cd.m.textContent = pad(Math.floor((s % 3600) / 60));
    cd.s.textContent = pad(s % 60);
    if (!diff) $('.premiere-label').textContent = 'Sedang tayang';
  }
  tick();
  setInterval(tick, 1000);

  // ---------- pilihan konten: pintasan seperti katalog streaming ----------
  const browse = [
    { href: '#cast', title: 'Pemeran Utama', subtitle: `${nameA} & ${nameB}`, photo: C.couple.groom.photo, tag: 'KENALI KAMI' },
    { href: '#episodes', title: 'Kisah Kita', subtitle: `${C.story?.length || 0} episode · Romantis`, photo: C.story?.[0]?.photo, tag: 'SERIES' },
    { href: '#schedule', title: 'Hari Bahagia', subtitle: C.dateLabel, photo: C.story?.[3]?.photo || C.hero.photo, tag: 'SEGERA TAYANG' },
    { href: '#moments', title: 'Momen Kita', subtitle: 'Kenangan yang tak terulang', photo: C.gallery?.[1], tag: 'TOP 10' },
    { href: '#rsvp', title: 'Anda Diundang', subtitle: 'Jadilah bagian dari cerita', photo: C.gallery?.[4], tag: 'SPESIAL UNTUKMU' },
  ];
  $('#browse').innerHTML = browse.map((item) => `
    <a class="browse-card" href="${item.href}">
      <div class="browse-art"><img alt="" /><span class="card-mark" aria-hidden="true">${esc((C.brand || 'W').charAt(0))}</span><span class="browse-tag">${esc(item.tag)}</span><h3>${esc(item.title)}</h3><span class="browse-play" aria-hidden="true">▶</span></div>
      <p>${esc(item.subtitle)}</p>
    </a>`).join('');
  $$('#browse img').forEach((img, i) => setPhoto(img, browse[i].photo));

  // ---------- episodes (story) ----------
  $('#story').innerHTML = (C.story || []).map((s, i) => `
    <li class="ep reveal">
      <span class="ep-num">${i + 1}</span>
      <div class="ep-thumb"><img alt="${esc(s.title)}" /></div>
      <div class="ep-body">
        <div class="ep-top"><h3 class="ep-title">${esc(s.title)}</h3><span class="ep-year">${esc(s.year)}</span></div>
        <p class="ep-text">${esc(s.text)}</p>
      </div>
    </li>`).join('');
  $$('#story .ep-thumb img').forEach((img, i) => setPhoto(img, C.story[i].photo, `EP ${i + 1}`));

  // ---------- events (jadwal tayang) ----------
  const mapQ = (e) => e.mapQuery || [e.venue, e.address].filter(Boolean).join(', ');
  const gcalStamp = (iso) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, '');
  const gcal = (e) => {
    if (!e.start) return '';
    const end = e.end || new Date(new Date(e.start).getTime() + 2 * 3600e3).toISOString();
    const p = new URLSearchParams({
      action: 'TEMPLATE',
      text: `${e.label} — ${nameA} & ${nameB}`,
      dates: `${gcalStamp(e.start)}/${gcalStamp(end)}`,
      location: [e.venue, e.address].filter(Boolean).join(', '),
      details: `Undangan pernikahan ${nameA} & ${nameB}`,
    });
    return `https://calendar.google.com/calendar/render?${p}`;
  };
  const pinSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.6" fill="currentColor"/></svg>';
  const bellSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>';
  $('#events').innerHTML = (C.events || []).map((e) => `
    <article class="event reveal">
      <div class="event-map">
        <iframe src="https://maps.google.com/maps?q=${encodeURIComponent(mapQ(e))}&z=15&output=embed"
          title="Peta lokasi ${esc(e.label)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
      <div class="event-info">
        <p class="event-tag">Tayang perdana</p>
        <h3>${esc(e.label)}</h3>
        <dl>
          <div><dt>Tanggal</dt><dd><b>${esc(e.date)}</b>${esc(e.time)}</dd></div>
          <div><dt>Tempat</dt><dd><b>${esc(e.venue)}</b>${esc(e.address)}</dd></div>
        </dl>
        <div class="event-actions">
          <a class="btn btn-play" href="${esc(e.map || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(mapQ(e)))}" target="_blank" rel="noopener">${pinSvg} Lihat Lokasi</a>
          ${e.start ? `<a class="btn btn-info" href="${esc(gcal(e))}" target="_blank" rel="noopener">${bellSvg} Ingatkan Saya</a>` : ''}
        </div>
      </div>
    </article>`).join('');

  // ---------- top 10 momen (gallery) + lightbox ----------
  const gal = $('#gallery');
  const shots = C.gallery || [];
  const captions = C.galleryCaptions || [];
  $('#frameCount').textContent = `${shots.length} momen · Geser untuk menjelajah`;
  gal.innerHTML = shots.map((_, i) => `
    <button type="button" class="top-item" data-i="${i}" aria-label="Buka foto ${i + 1}${captions[i] ? ': ' + esc(captions[i]) : ''}">
      <span class="rank" aria-hidden="true">${i + 1}</span>
      <span class="poster"><img alt="${esc(captions[i] || 'Momen ' + (i + 1))}" /><span class="card-mark" aria-hidden="true">${esc((C.brand || 'W').charAt(0))}</span><span class="poster-caption"><small>KISAH KITA</small><strong>${esc(captions[i] || 'Momen ' + (i + 1))}</strong></span><span class="poster-ribbon">MOMEN PILIHAN</span></span>
    </button>`).join('');
  $$('.poster img', gal).forEach((img, i) => setPhoto(img, shots[i]));

  const prevArrow = $('.slider-arrow.prev');
  const nextArrow = $('.slider-arrow.next');
  const syncArrows = () => {
    prevArrow.disabled = gal.scrollLeft < 8;
    nextArrow.disabled = gal.scrollLeft + gal.clientWidth > gal.scrollWidth - 8;
  };
  prevArrow.addEventListener('click', () => gal.scrollBy({ left: -gal.clientWidth * 0.8, behavior: 'smooth' }));
  nextArrow.addEventListener('click', () => gal.scrollBy({ left: gal.clientWidth * 0.8, behavior: 'smooth' }));
  gal.addEventListener('scroll', syncArrows, { passive: true });
  addEventListener('resize', syncArrows);
  syncArrows();

  const lb = $('#lightbox');
  const lbImg = $('img', lb);
  let cur = 0;
  let lbTrigger;
  const available = () => $$('.top-item', gal).filter((b) => !b.querySelector('.ph')).map((b) => Number(b.dataset.i));
  function updateLightbox() {
    lbImg.src = shots[cur];
    lbImg.alt = captions[cur] || `Momen ${cur + 1}`;
    $('#lbCaption').textContent = `${cur + 1} / ${shots.length} · ${lbImg.alt}`;
  }
  function show(i) {
    const list = available();
    if (!list.length) return;
    cur = list.includes(i) ? i : list[0];
    lbTrigger = document.activeElement;
    updateLightbox();
    lb.hidden = false;
    main.inert = true;
    pageNav.inert = true;
    document.body.classList.add('lightbox-open');
    $('.lb-close', lb).focus();
  }
  function step(d) {
    const list = available();
    const pos = list.indexOf(cur);
    cur = list[(pos + d + list.length) % list.length];
    updateLightbox();
  }
  function closeLightbox() {
    lb.hidden = true;
    main.inert = false;
    pageNav.inert = false;
    document.body.classList.remove('lightbox-open');
    lbTrigger?.focus({ preventScroll: true });
  }
  gal.addEventListener('click', (e) => {
    const b = e.target.closest('.top-item');
    if (b && !b.querySelector('.ph')) show(Number(b.dataset.i));
  });
  $('.lb-close', lb).addEventListener('click', closeLightbox);
  $('.lb-nav.prev', lb).addEventListener('click', () => step(-1));
  $('.lb-nav.next', lb).addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'Tab') {
      const buttons = $$('button', lb);
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // ---------- gift ----------
  const g = C.gift || {};
  const cards = [];
  // Logo diatur lewat `logo` di config.js (file di public/images/).
  // File kosong / tidak ditemukan → kotak logo disembunyikan.
  const logoHTML = (src, alt) => (src
    ? `<span class="gift-logo"><img src="${esc(src)}" alt="${esc(alt)}" onerror="this.parentNode.remove()" /></span>`
    : '');
  const giftSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z"/></svg>`;
  (g.accounts || []).forEach((a) => {
    const wallet = a.type === 'ewallet';
    cards.push(`
    <article class="gift reveal">
      <div class="gift-head">
        <p class="gift-kind">${wallet ? 'E-wallet' : 'Transfer bank'}</p>
        ${logoHTML(a.logo, 'Logo ' + a.name)}
      </div>
      <h3>${esc(a.name)}</h3>
      <span class="label">${wallet ? 'Nomor HP' : 'Nomor rekening'}</span>
      <p class="acc">${esc(a.number)}</p>
      <p class="holder">a.n. ${esc(a.holder)}</p>
      <button class="btn btn-ghost" type="button" data-copy="${esc(String(a.number).replace(/[\s-]/g, ''))}">Salin nomor</button>
    </article>`);
  });
  if (g.qris) cards.push(`
    <article class="gift reveal">
      <p class="gift-kind">Pembayaran digital</p>
      <h3>QRIS</h3>
      <div class="qris-wrap"><img class="qris" alt="Kode QRIS" data-qris /></div>
    </article>`);
  if (g.address) cards.push(`
    <article class="gift reveal">
      <div class="gift-head">
        <p class="gift-kind">Kirim kado</p>
        <span class="gift-icon">${giftSvg}</span>
      </div>
      <h3>Alamat Pengiriman</h3>
      <address>${esc(g.addressRecipient ? g.addressRecipient + ' — ' : '')}${esc(g.address)}</address>
      <button class="btn btn-ghost" type="button" data-copy="${esc(g.address)}">Salin alamat</button>
    </article>`);
  $('#gifts').innerHTML = cards.join('');
  const qris = $('[data-qris]');
  if (qris) setPhoto(qris, g.qris);

  const toast = $('#toast');
  let toastT;
  function notify(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove('show'), 2200);
  }
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      notify('Tersalin ke clipboard');
    } catch {
      notify('Gagal menyalin — salin manual ya');
    }
  });

  // ---------- RSVP & guestbook (ulasan) ----------
  const form = $('#rsvpForm');
  const msg = $('#rsvpMsg');
  const guestsField = $('#guestsField');
  form.addEventListener('change', (e) => {
    if (e.target.name === 'attendance') guestsField.hidden = e.target.value === 'tidak';
  });

  const list = $('#wishes');
  const more = $('#moreWishes');
  const PAGE = 10;
  let cursor = null;
  const fmtTime = (d) => (d ? d.toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '');
  const wishHTML = (w) => `
    <li>
      <span class="avatar wish-av" style="--av:${colorFor(w.name)}">${face}</span>
      <div class="wish-top">
        <span class="wish-name">${esc(w.name)}</span>
        <span class="wish-tag${w.attendance === 'hadir' ? '' : ' no'}">${w.attendance === 'hadir' ? 'Hadir' : 'Berhalangan'}</span>
      </div>
      <p class="wish-msg">${esc(w.message)}</p>
      <p class="wish-time">${esc(fmtTime(w.createdAt))}</p>
    </li>`;

  // db.js (ES module, Firebase) memasang window.RSVP_DB lalu memicu 'db-ready'
  const dbReady = new Promise((resolve, reject) => {
    if (window.RSVP_DB) return resolve(window.RSVP_DB);
    window.addEventListener('db-ready', () => resolve(window.RSVP_DB), { once: true });
    setTimeout(() => reject(new Error('Koneksi database gagal dimuat.')), 15000);
  });

  // Firestore bisa "menggantung" (mis. database belum dibuat / offline) — beri batas waktu
  const withTimeout = (p, ms = 12000) => Promise.race([
    p, new Promise((_, rej) => setTimeout(() => rej(new Error('Ulasan belum dapat dimuat.')), ms)),
  ]);

  async function loadStats() {
    try {
      const db = await dbReady;
      const { hadir, tidak, ucapan } = await withTimeout(db.stats());
      $('#gbStats').textContent = `${hadir} hadir · ${tidak} berhalangan · ${ucapan} ulasan${db.demo ? ' · mode demo' : ''}`;
    } catch { $('#gbStats').textContent = ''; }
  }

  async function loadWishes(reset) {
    if (reset) { cursor = null; list.innerHTML = '<li class="empty">Memuat ulasan…</li>'; }
    more.disabled = true;
    try {
      const db = await dbReady;
      const res = await withTimeout(db.page(PAGE, cursor));
      cursor = res.cursor;
      list.querySelector('.empty')?.remove();
      list.insertAdjacentHTML('beforeend', res.items.map(wishHTML).join(''));
      more.hidden = res.done;
      if (!list.children.length) list.innerHTML = '<li class="empty">Belum ada ulasan. Jadilah penonton pertama yang menulis ucapan.</li>';
    } catch (err) {
      console.error(err);
      if (reset) list.innerHTML = `<li class="empty">${esc(err.message || 'Ulasan belum dapat dimuat.')}</li>`;
      more.hidden = true;
    } finally {
      more.disabled = false;
    }
  }
  more.addEventListener('click', () => loadWishes(false));
  loadWishes(true);
  loadStats();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    msg.className = 'form-msg';
    if (!data.name?.trim()) { msg.textContent = 'Mohon isi nama Anda.'; return; }
    if (!data.attendance) { msg.textContent = 'Mohon pilih konfirmasi kehadiran.'; return; }
    const btn = $('button[type=submit]', form);
    btn.disabled = true;
    try {
      await withTimeout((await dbReady).add(data), 15000);
      msg.textContent = 'Terima kasih! Ulasan & konfirmasi Anda sudah kami terima.';
      msg.classList.add('ok');
      form.message.value = '';
      loadWishes(true);
      loadStats();
    } catch (err) {
      console.error(err);
      msg.textContent = 'Gagal mengirim, coba lagi.';
    } finally {
      btn.disabled = false;
    }
  });

  // ---------- reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.reveal').forEach((el) => io.observe(el));

  // ---------- tag WhatsApp (footer) ----------
  (() => {
    const tag = $('#waTag');
    const raw = String(C.contact?.whatsapp ?? '').replace(/\D/g, '');
    if (!tag || !raw) return;
    const num = raw.startsWith('62') ? raw : raw.startsWith('0') ? `62${raw.slice(1)}` : `62${raw}`;
    const text = C.contact.message ? `?text=${encodeURIComponent(C.contact.message)}` : '';
    tag.href = `https://wa.me/${num}${text}`;
    const local = `0${num.slice(2)}`;
    $('span', tag).textContent = local.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3');
    tag.setAttribute('aria-label', `Hubungi via WhatsApp ${local}`);
    tag.hidden = false;
  })();
})();
