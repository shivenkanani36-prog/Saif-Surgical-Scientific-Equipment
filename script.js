// ============================================================
//  SAIF SURGICAL & SCIENTIFIC EQUIPMENT — script.js
// ============================================================

(function () {
  'use strict';

  var pages = ['home', 'about', 'products', 'contact', 'blog', 'get-quote', 'quote-submitted'];

  function getPageFromHash() {
    var hash = window.location.hash.replace('#', '').trim();
    if (!hash || hash === '/') return 'home';
    return pages.indexOf(hash) !== -1 ? hash : 'home';
  }

  function showPage(name) {
    pages.forEach(function (p) {
      var el = document.getElementById('page-' + p);
      if (el) el.classList.add('hidden');
    });
    var target = document.getElementById('page-' + name);
    if (target) {
      target.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    updateActiveNav(name);
    closeMobileMenu();
  }

  function updateActiveNav(name) {
    document.querySelectorAll('.nav-link').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-page') === name);
    });
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.nav-trigger');
    if (trigger) {
      var page = trigger.getAttribute('data-page');
      if (page) {
        e.preventDefault();
        window.location.hash = '#' + page;
        showPage(page);
      }
    }
  });

  window.addEventListener('hashchange', function () {
    showPage(getPageFromHash());
  });

  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }
  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('hidden');
  }

  var header = document.getElementById('site-header');
  window.addEventListener('scroll', function () {
    if (header) {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.12)'
        : '0 1px 8px rgba(0,0,0,0.08)';
    }
  });

  var contactForm = document.getElementById('contact-form');
  var contactSuccess = document.getElementById('contact-success');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name  = document.getElementById('c-name').value.trim();
      var phone = document.getElementById('c-phone').value.trim();
      var email = document.getElementById('c-email').value.trim();
      var req   = document.getElementById('c-req').value.trim();
      var text =
        'Hello, I would like to get in touch:\n\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        (email ? 'Email: ' + email + '\n' : '') +
        'Message: ' + req;
      window.open('https://wa.me/919898056315?text=' + encodeURIComponent(text), '_blank');
      contactForm.reset();
      if (contactSuccess) {
        contactSuccess.classList.remove('hidden');
        setTimeout(function () { contactSuccess.classList.add('hidden'); }, 4000);
      }
    });
  }

  var quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = document.getElementById('q-name').value.trim();
      var phone   = document.getElementById('q-phone').value.trim();
      var product = document.getElementById('q-product').value.trim();
      var qty     = document.getElementById('q-qty').value.trim();
      var message = document.getElementById('q-msg').value.trim();
      var text =
        'Hello, I would like to request a quote:\n\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Requirement: ' + product + '\n' +
        'Quantity: ' + (qty || 'Not specified') + '\n' +
        'Message: ' + (message || 'N/A');
      window.open('https://wa.me/919898056315?text=' + encodeURIComponent(text), '_blank');
      quoteForm.reset();
      window.location.hash = '#quote-submitted';
      showPage('quote-submitted');
    });
  }

  showPage(getPageFromHash());

})();