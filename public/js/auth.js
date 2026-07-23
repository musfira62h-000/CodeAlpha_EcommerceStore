// Login + register handling

const alertBox = document.getElementById('alert');
const redirect = new URLSearchParams(location.search).get('redirect') || 'index.html';

function showError(msg) {
  alertBox.innerHTML = `<div class="alert alert-error">${escapeHtml(msg)}</div>`;
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(loginForm);
    try {
      const { user, token } = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      setAuth(token, user);
      window.location.href = redirect;
    } catch (err) {
      showError(err.message);
    }
  });
}

const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(registerForm);
    try {
      const { user, token } = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      setAuth(token, user);
      window.location.href = redirect;
    } catch (err) {
      showError(err.message);
    }
  });
}
