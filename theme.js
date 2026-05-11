// Theme toggle — persists across pages via localStorage
(function() {
  const saved = localStorage.getItem('eatsd-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  // Create toggle button
  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.id = 'theme-toggle-btn';
  btn.title = 'Toggle dark/light mode';
  btn.innerHTML = saved === 'dark' ? '☀️' : '🌙';
  btn.addEventListener('click', function() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('eatsd-theme', next);
    btn.innerHTML = next === 'dark' ? '☀️' : '🌙';
  });

  // Append to body when DOM is ready
  if (document.body) {
    document.body.appendChild(btn);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(btn);
    });
  }
})();
