'use strict';

const ADMIN_PASSWORD = 'admin123';

function getMessages() {
  try { return JSON.parse(localStorage.getItem('ae_messages')) || []; } catch { return []; }
}

function saveMessages(msgs) {
  localStorage.setItem('ae_messages', JSON.stringify(msgs));
}

function renderMessages() {
  const tbody = document.getElementById('messages-body');
  if (!tbody) return;
  const msgs = getMessages();

  if (!msgs.length) {
    tbody.innerHTML = `<tr class="empty"><td colspan="5">Zatiaľ žiadne správy</td></tr>`;
    return;
  }

  tbody.innerHTML = msgs.reverse().map(m => `
    <tr>
      <td><strong>${esc(m.name)}</strong></td>
      <td>${esc(m.phone)}</td>
      <td>${esc(m.email)}</td>
      <td>${esc(m.service)}</td>
      <td style="white-space:nowrap">
        <span class="badge ${m.status === 'new' ? 'badge-new' : 'badge-done'}">${m.status === 'new' ? 'Nová' : 'Spracovaná'}</span>
        <button class="btn-icon" onclick="toggleMsgStatus('${m.id}')" title="Prepnúť stav">
          ${m.status === 'new' ? '✓' : '↩'}
        </button>
        <button class="btn-icon" onclick="deleteMsg('${m.id}')" title="Vymazať">✕</button>
      </td>
    </tr>
  `).join('');

  document.getElementById('stat-new').textContent = msgs.filter(m => m.status === 'new').length;
  document.getElementById('stat-total').textContent = msgs.length;
}

function esc(s) { return String(s).replace(/[&<>"']/g, ''); }

window.toggleMsgStatus = function(id) {
  const msgs = getMessages();
  const m = msgs.find(x => x.id === id);
  if (m) { m.status = m.status === 'new' ? 'done' : 'new'; saveMessages(msgs); renderMessages(); }
};

window.deleteMsg = function(id) {
  if (!confirm('Vymazať správu?')) return;
  const msgs = getMessages().filter(x => x.id !== id);
  saveMessages(msgs); renderMessages();
};

function handleLogin(e) {
  e.preventDefault();
  const pw = document.getElementById('login-pw').value;
  const err = document.getElementById('login-error');
  if (pw === ADMIN_PASSWORD) {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    renderMessages();
  } else {
    err.textContent = 'Nesprávne heslo';
    err.classList.add('visible');
  }
}

function handleLogout() {
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('dashboard').classList.remove('active');
  document.getElementById('login-pw').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
});
