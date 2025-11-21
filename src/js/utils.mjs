export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector)?.addEventListener('touchend', (e) => {
    e.preventDefault();
    callback();
  });
  qs(selector)?.addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  if (!parentElement) return;
  const htmlStrings = list.map(templateFn);
  if (clear) parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function discountPrice(finalPrice, suggestedRetailPrice) {
  if (finalPrice >= suggestedRetailPrice) return 0;
  const discount =
    ((suggestedRetailPrice - finalPrice) / suggestedRetailPrice) * 100;
  return Math.round(discount);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return;
  let html = template;
  if (callback) html = callback(template, data);
  parentElement.innerHTML = html;
}

async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    console.error(`Failed to load template: ${path}`);
    return '';
  }
  return await res.text();
}

export async function loadHeaderFooter() {
  try {
    const [headerTemplate, footerTemplate] = await Promise.all([
      loadTemplate('../partials/header.html'),
      loadTemplate('../partials/footer.html'),
    ]);

    const headerEl = document.getElementById('main-header');
    const footerEl = document.getElementById('main-footer');

    if (headerEl) renderWithTemplate(headerTemplate, headerEl);
    if (footerEl) renderWithTemplate(footerTemplate, footerEl);

    // Update cart count if cart icon exists
    const cartIcon = document.querySelector('.cart svg');
    if (cartIcon) {
      const count = (getLocalStorage('so-cart') || []).reduce(
        (sum, item) => sum + (item.Quantity || 1),
        0,
      );
      const badge = document.querySelector('.cart-count');
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      }
    }
  } catch (err) {
    console.error('loadHeaderFooter failed:', err);
  }
}

export function alertMessage(message, scroll = true) {
  // Remove old alerts
  document.querySelectorAll('.alert').forEach((a) => a.remove());

  const alert = document.createElement('div');
  alert.className = 'alert';
  alert.innerHTML = `<span>${message}</span><span class="close">×</span>`;

  alert.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) alert.remove();
  });

  const main = document.querySelector('main');
  if (main) {
    main.prepend(alert);
    if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
