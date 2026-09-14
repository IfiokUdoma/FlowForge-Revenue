/* ================================================
   FLOWFORGE REVENUE — script.js v4
   flowforgerevenue.solutions
   Two EmailJS templates:
     template_q7ljfxr  → auto-reply to client
     template_ts9m5i3  → notification to FlowForge
   ================================================ */

var FFR = {
  emailjs: {
    service:           'service_bpxvzcr',
    clientTemplate:    'template_q7ljfxr',   /* confirmation to client */
    ownerTemplate:     'template_ts9m5i3',   /* notification to Ifiok  */
    key:               'mWLpJzYxGdjeg82V4'
  },
  services: {
    'free-diagnosis': {
      badge: 'Free \u00b7 Start Here',
      title: 'Get Your Free Revenue Opportunity Report',
      sub:   'We audit one funnel point and deliver a 5-page report — the leak, the benchmark model with all assumptions listed, the illustrative dollar opportunity with confidence rating, and 3 ranked fixes. 5 business days. No pitch. No obligation.',
      name:  'Free Revenue Opportunity Report'
    },
    'full-audit': {
      badge: 'Paid \u00b7 $2,000 \u2013 $5,000',
      title: 'Apply for Full Revenue Audit',
      sub:   'End-to-end funnel audit with a dollar-quantified leak map, prioritized fix roadmap, and exec-ready report. 50% upfront, 50% on delivery.',
      name:  'Full Revenue Audit ($2K\u2013$5K)'
    },
    'engineering-sprint': {
      badge: 'Most Popular \u00b7 $5,000 \u2013 $20,000',
      title: 'Apply for Revenue Engineering Sprint',
      sub:   'Hands-on implementation of every fix \u2014 messaging rewrites, funnel restructures, checkout optimization \u2014 tracked weekly against revenue baselines. 50% upfront, 50% on delivery.',
      name:  'Revenue Engineering Sprint ($5K\u2013$20K)'
    },
    'partnership': {
      badge: 'Ongoing \u00b7 % of Revenue Uplift',
      title: 'Apply for Revenue Partnership',
      sub:   'Long-term embedded revenue engineering. Monthly sprint cycles, live attribution model, paid purely on results. We win when you win.',
      name:  'Revenue Partnership (% Upside)'
    }
  }
};

/* ── MOBILE NAV ── */
(function () {
  var t = document.getElementById('nav-toggle');
  var m = document.getElementById('nav-mobile');
  if (!t || !m) return;
  t.addEventListener('click', function () { m.classList.toggle('open'); });
  document.addEventListener('click', function (e) {
    if (!t.contains(e.target) && !m.contains(e.target)) m.classList.remove('open');
  });
})();

/* ── NAV SCROLL ── */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.borderBottomColor = window.scrollY > 40 ? '#1c1c22' : '#262630';
  }, { passive: true });
})();

/* ── FAQ ── */
(function () {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', function () {
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!open) item.classList.add('open');
    });
  });
})();

/* ── SCROLL REVEAL ── */
(function () {
  var els = document.querySelectorAll('.reveal');
  function check() {
    var h = window.innerHeight;
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < h * 0.9) el.classList.add('visible');
    });
  }
  check();
  window.addEventListener('scroll', check, { passive: true });
})();

/* ── SMOOTH ANCHOR SCROLL ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });
})();

/* ── EMAILJS: SEND CLIENT CONFIRMATION ── */
function ffrSendClientEmail(params) {
  if (!window.emailjs) { console.warn('EmailJS not loaded'); return; }
  emailjs.send(FFR.emailjs.service, FFR.emailjs.clientTemplate, {
    to_email:     params.email,
    client_name:  params.name,
    client_email: params.email,
    company_name: params.company,
    website:      params.website,
    role:         params.role,
    service_name: params.service
  }).then(function () {
    console.log('EmailJS: client confirmation sent to', params.email);
  }).catch(function (err) {
    console.warn('EmailJS client error:', err);
  });
}

/* ── EMAILJS: SEND OWNER NOTIFICATION ── */
function ffrSendOwnerEmail(params) {
  if (!window.emailjs) { console.warn('EmailJS not loaded'); return; }
  emailjs.send(FFR.emailjs.service, FFR.emailjs.ownerTemplate, {
    service_type: params.service,
    client_name:  params.name,
    company_name: params.company,
    website:      params.website,
    role:         params.role,
    client_email: params.email,
    volume:       params.volume  || 'Not specified',
    leak_notes:   params.message || 'Not provided'
  }).then(function () {
    console.log('EmailJS: owner notification sent');
  }).catch(function (err) {
    console.warn('EmailJS owner error:', err);
  });
}

/* ── COMBINED SEND (client + owner) ── */
function ffrSendBoth(params) {
  ffrSendClientEmail(params);
  ffrSendOwnerEmail(params);
}

/* ── SERVICE MODAL ── */
(function () {
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'service-modal';
  overlay.innerHTML = [
    '<div class="modal-box">',
    '<button class="modal-close" id="modal-close" aria-label="Close">&times;</button>',
    '<div class="modal-service-badge" id="modal-badge"></div>',
    '<h2 class="modal-title" id="modal-title"></h2>',
    '<p class="modal-sub" id="modal-sub"></p>',
    '<form class="modal-form" id="modal-form" autocomplete="off">',
    '<input type="hidden" id="modal-service-field" name="service" value="" />',
    '<div class="form-row">',
    '<div class="form-group"><label for="m-name">Full Name *</label><input type="text" id="m-name" name="name" placeholder="Jane Smith" required /></div>',
    '<div class="form-group"><label for="m-company">Company *</label><input type="text" id="m-company" name="company" placeholder="Acme Payments Inc." required /></div>',
    '</div>',
    '<div class="form-group form-group--full"><label for="m-website">Company Website *</label><input type="url" id="m-website" name="website" placeholder="https://yourcompany.com" required /></div>',
    '<div class="form-row">',
    '<div class="form-group"><label for="m-role">Your Role *</label>',
    '<select id="m-role" name="role" required>',
    '<option value="" disabled selected>Select your role</option>',
    '<option value="CEO / Founder">CEO / Founder</option>',
    '<option value="Head of Growth">Head of Growth</option>',
    '<option value="Head of Product">Head of Product</option>',
    '<option value="Sales / BD Leader">Sales / BD Leader</option>',
    '<option value="CMO / VP Marketing">CMO / VP Marketing</option>',
    '<option value="Other">Other</option>',
    '</select></div>',
    '<div class="form-group"><label for="m-email">Work Email *</label><input type="email" id="m-email" name="email" placeholder="jane@company.com" required /></div>',
    '</div>',
    '<div class="form-group form-group--full"><label for="m-volume">Monthly Payment Volume <span class="label-optional">(optional)</span></label>',
    '<select id="m-volume" name="volume">',
    '<option value="" disabled selected>Select range</option>',
    '<option value="Under $100K/mo">Under $100K/mo</option>',
    '<option value="$100K\u2013$500K/mo">$100K\u2013$500K/mo</option>',
    '<option value="$500K\u2013$2M/mo">$500K\u2013$2M/mo</option>',
    '<option value="$2M\u2013$10M/mo">$2M\u2013$10M/mo</option>',
    '<option value="Over $10M/mo">Over $10M/mo</option>',
    '</select></div>',
    '<div class="form-group form-group--full"><label for="m-message">Where is revenue leaking most? <span class="label-optional">(optional)</span></label>',
    '<textarea id="m-message" name="message" rows="3" placeholder="e.g. Demo conversion is low, onboarding drops off, pricing page not converting..."></textarea></div>',
    '<button type="submit" class="btn btn-primary btn-submit" id="modal-submit-btn">Submit Application \u2192</button>',
    '<p class="form-disclaimer">We\'ll review your application and respond within 2 business days. No spam.</p>',
    '</form>',
    '<div id="modal-success" style="display:none;text-align:center;padding-top:32px;">',
    '<div class="success-icon">\u2713</div>',
    '<h3 style="font-family:var(--font-display);font-size:26px;font-weight:700;margin-bottom:12px;">Application received.</h3>',
    '<p style="color:var(--text-secondary);font-size:15px;line-height:1.7;margin-bottom:28px;">A confirmation email has been sent to your inbox. We\'ll reach out within 2 business days to confirm scope and next steps.</p>',
    '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">',
    '<a href="work.html" class="btn btn-primary">See Our Work \u2192</a>',
    '<a href="services.html" class="btn btn-outline">Explore Services \u2192</a>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');
  document.body.appendChild(overlay);

  function openModal(key) {
    var s = FFR.services[key] || FFR.services['free-diagnosis'];
    document.getElementById('modal-badge').textContent = s.badge;
    document.getElementById('modal-title').textContent = s.title;
    document.getElementById('modal-sub').textContent = s.sub;
    document.getElementById('modal-form').reset();
    document.getElementById('modal-service-field').value = s.name;
    document.getElementById('modal-form').style.display = '';
    document.getElementById('modal-success').style.display = 'none';
    var btn = document.getElementById('modal-submit-btn');
    btn.textContent = 'Submit Application \u2192';
    btn.disabled = false;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-service]');
    if (el) { e.preventDefault(); openModal(el.getAttribute('data-service')); }
  });

  document.getElementById('modal-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = document.getElementById('modal-submit-btn');
    btn.textContent = 'Sending\u2026'; btn.disabled = true;

    var params = {
      name:    document.getElementById('m-name').value.trim(),
      email:   document.getElementById('m-email').value.trim(),
      company: document.getElementById('m-company').value.trim(),
      website: document.getElementById('m-website').value.trim(),
      role:    document.getElementById('m-role').value,
      volume:  document.getElementById('m-volume').value,
      message: document.getElementById('m-message').value.trim(),
      service: document.getElementById('modal-service-field').value
    };

    /* Send both emails */
    ffrSendBoth(params);

    /* Redirect to dedicated confirmation page */
    setTimeout(function () {
      window.location.href = 'application-received.html';
    }, 800);
  });

  window.openServiceModal = openModal;
})();

/* ── MAIN DIAGNOSIS FORM (homepage) ── */
(function () {
  var form    = document.getElementById('waitlist-form');
  var success = document.getElementById('form-success');
  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('[type="submit"]');
    if (btn) { btn.textContent = 'Sending\u2026'; btn.disabled = true; }

    var g = function (n) { return (form.querySelector('[name="' + n + '"]') || {}).value || ''; };

    var params = {
      name:    g('name'),
      email:   g('email'),
      company: g('company'),
      website: g('website'),
      role:    g('role'),
      volume:  g('monthly-payment-volume'),
      message: g('funnel-point'),
      service: 'Free Revenue Opportunity Report'
    };

    /* Send both emails */
    ffrSendBoth(params);

    /* Redirect to dedicated confirmation page */
    setTimeout(function () {
      window.location.href = 'application-received.html';
    }, 800);
  });
})();
