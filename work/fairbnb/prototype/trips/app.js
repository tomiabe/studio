document.addEventListener('DOMContentLoaded', () => {
  const conversations = {
    adriana: {
      name: 'Adriana',
      context: 'Your stay in Gràcia',
      avatar: '../assets/adriana-host.jpg',
      messages: [
        { mine: false, text: 'Hello. I am looking forward to welcoming you to Gràcia. Let me know roughly when you expect to arrive.', time: 'Yesterday, 18:42' },
        { mine: true, text: 'Thank you, Adriana. I will confirm my arrival time once the train is booked.', time: 'Yesterday, 19:06' }
      ]
    },
    marta: {
      name: 'Marta',
      context: 'Your pottery session',
      avatar: '../assets/marta-ceramic-host.jpg',
      messages: [
        { mine: false, text: 'Your places are reserved for Friday morning. Wear something comfortable that can handle a little clay.', time: 'Today, 09:14' }
      ]
    },
    support: {
      name: 'Fairbnb support',
      context: 'Help with booking FB-BCN-261016',
      avatar: '../assets/fairbnb-logo.png',
      messages: [
        { mine: false, text: 'Send us your question here. A member of the support team usually replies within one day.', time: 'Today, 10:00' }
      ]
    }
  };
  const completedTasks = new Set(['booking']);
  const dialog = document.getElementById('action-dialog');
  const accountButton = document.querySelector('.account-button');
  const accountMenu = document.getElementById('account-menu');
  let activeConversation = 'adriana';
  let toastTimer;

  function showToast(message) {
    const toast = document.getElementById('toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2500);
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
  }

  function setTab(name) {
    document.body.classList.toggle('compact-view', name !== 'overview');
    document.querySelector('.desktop-nav a[href="./"]').classList.toggle('active', name !== 'messages');
    document.getElementById('messages-nav').classList.toggle('active', name === 'messages');
    document.querySelector('.mobile-nav a[href="./"]').classList.toggle('active', name !== 'messages');
    document.querySelector('.mobile-nav [data-open-messages]').classList.toggle('active', name === 'messages');
    document.querySelectorAll('[data-tab]').forEach(button => {
      const selected = button.dataset.tab === name;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
    });
    document.querySelectorAll('[data-panel]').forEach(panel => { panel.hidden = panel.dataset.panel !== name; });
    window.history.replaceState({}, '', name === 'overview' ? './' : `?view=${name}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateCountdown() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date('2026-10-14T00:00:00');
    const days = Math.max(0, Math.ceil((start - today) / 86400000));
    document.getElementById('countdown').textContent = days === 0 ? 'Your trip starts today' : `${days} day${days === 1 ? '' : 's'} to go`;
  }

  function updateTaskCount() {
    document.getElementById('task-count').textContent = `${completedTasks.size} of 3 complete`;
  }

  function completeTask(task, detail) {
    completedTasks.add(task);
    const card = document.querySelector(`[data-task="${task}"]`).closest('.task');
    card.classList.add('complete');
    card.querySelector('i').className = 'fa-solid fa-circle-check';
    card.querySelector('p').textContent = detail;
    const button = card.querySelector('button');
    const done = document.createElement('span');
    done.textContent = 'Done';
    button.replaceWith(done);
    updateTaskCount();
    dialog.close();
    showToast('Trip checklist updated.');
  }

  function openTask(task) {
    const content = document.getElementById('dialog-content');
    if (task === 'arrival') {
      content.innerHTML = `<h2>When do you expect to arrive?</h2><p>A rough time is enough. You can change it later.</p><form id="task-form"><label for="arrival-time">Expected arrival</label><select id="arrival-time"><option>15:00 to 16:00</option><option>16:00 to 17:00</option><option>17:00 to 18:00</option><option>After 18:00</option></select><div class="dialog-actions"><button class="primary-button" type="submit">Save arrival time</button></div></form>`;
      dialog.showModal();
      document.getElementById('task-form').addEventListener('submit', event => { event.preventDefault(); completeTask('arrival', `Arrival shared: ${document.getElementById('arrival-time').value}.`); });
      return;
    }
    content.innerHTML = `<h2>Complete the local guest details</h2><p>These details are shared with the host only for the required registration.</p><form id="task-form"><label for="nationality">Nationality</label><select id="nationality"><option>Nigerian</option><option>Belgian</option><option>Spanish</option><option>British</option></select><label for="document-number">Travel document number</label><input id="document-number" type="text" autocomplete="off" required><div class="dialog-actions"><button class="primary-button" type="submit">Save guest details</button></div></form>`;
    dialog.showModal();
    document.getElementById('task-form').addEventListener('submit', event => { event.preventDefault(); if (!document.getElementById('document-number').value.trim()) return; completeTask('guest', 'Required guest details have been completed.'); });
  }

  function renderConversation(key) {
    activeConversation = key;
    const conversation = conversations[key];
    document.querySelectorAll('[data-conversation]').forEach(button => button.classList.toggle('active', button.dataset.conversation === key));
    const avatar = document.getElementById('conversation-avatar');
    avatar.src = conversation.avatar;
    avatar.alt = conversation.name;
    avatar.classList.toggle('support-avatar', key === 'support');
    document.getElementById('conversation-title').textContent = conversation.name;
    document.getElementById('conversation-context').textContent = conversation.context;
    document.getElementById('message-thread').innerHTML = conversation.messages.map(message => `<article class="message${message.mine ? ' mine' : ''}"><p>${escapeHtml(message.text)}</p><time>${escapeHtml(message.time)}</time></article>`).join('');
    document.getElementById('message-thread').scrollTop = document.getElementById('message-thread').scrollHeight;
  }

  function markConversationRead(key) {
    document.querySelector(`[data-conversation="${key}"] .contact-badge`)?.remove();
    const remaining = document.querySelectorAll('.contact-badge').length;
    document.querySelectorAll('.desktop-nav span,.trip-tabs span,.mobile-nav span').forEach(badge => {
      badge.textContent = String(remaining);
      badge.hidden = remaining === 0;
    });
  }

  function openMessages(host = 'adriana') {
    setTab('messages');
    markConversationRead(host || 'adriana');
    renderConversation(host || 'adriana');
    accountMenu.hidden = true;
    accountButton.setAttribute('aria-expanded', 'false');
    document.getElementById('mobile-nav').hidden = true;
  }

  function openManage(type) {
    const content = document.getElementById('dialog-content');
    if (type === 'stay') content.innerHTML = `<h2>Manage your stay</h2><p>Review Adriana's cancellation terms or request a date change. Changes are confirmed only after the host accepts them.</p><div class="dialog-actions"><a class="primary-button" href="../stay/?city=barcelona&listing=stay-0&checkin=2026-10-14&checkout=2026-10-19&guests=2">Open stay details</a><button class="outline-button" type="button" data-request-change>Request a change</button></div>`;
    else if (type === 'experience') content.innerHTML = `<h2>Manage your experience</h2><p>Your session is booked for 16 October at 10:00. You can review availability before requesting another time.</p><div class="dialog-actions"><a class="primary-button" href="../experience/?city=barcelona&experience=experience-0&experienceDate=2026-10-16&time=10%3A00&guests=2">Open experience details</a><button class="outline-button" type="button" data-request-change>Request a change</button></div>`;
    else content.innerHTML = `<h2>Change or cancel this trip</h2><p>The stay and experience have separate cancellation conditions. Fairbnb support can help you understand the refund before anything changes.</p><div class="dialog-actions"><button class="primary-button" type="button" data-contact-support>Message support</button><button class="outline-button" type="button" data-cancel-request>Review cancellation</button></div>`;
    dialog.showModal();
    content.querySelector('[data-request-change]')?.addEventListener('click', () => { dialog.close(); openMessages(type === 'experience' ? 'marta' : 'adriana'); showToast('Write the change you would like to request.'); });
    content.querySelector('[data-contact-support]')?.addEventListener('click', () => { dialog.close(); openMessages('support'); });
    content.querySelector('[data-cancel-request]')?.addEventListener('click', () => showToast('Nothing has been cancelled. Support can review the refund first.'));
  }

  function downloadFile(filename, contents, type) {
    const blob = new Blob([contents], { type });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => setTab(button.dataset.tab)));
  document.querySelectorAll('[data-task]').forEach(button => button.addEventListener('click', () => openTask(button.dataset.task)));
  document.querySelectorAll('[data-open-messages]').forEach(button => button.addEventListener('click', () => openMessages(button.dataset.openMessages)));
  document.getElementById('messages-nav').addEventListener('click', () => openMessages());
  document.querySelectorAll('[data-manage]').forEach(button => button.addEventListener('click', () => openManage(button.dataset.manage)));
  document.querySelectorAll('[data-conversation]').forEach(button => button.addEventListener('click', () => {
    markConversationRead(button.dataset.conversation);
    renderConversation(button.dataset.conversation);
  }));

  document.getElementById('message-form').addEventListener('submit', event => {
    event.preventDefault();
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    if (!text) return;
    conversations[activeConversation].messages.push({ mine: true, text, time: 'Just now' });
    input.value = '';
    renderConversation(activeConversation);
  });

  document.getElementById('calendar-button').addEventListener('click', () => {
    const calendar = ['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT','DTSTART:20261014T150000','DTEND:20261019T110000','SUMMARY:Fairbnb trip to Barcelona','LOCATION:Gracia, Barcelona','DESCRIPTION:Stay with Adriana and pottery experience with Marta.','END:VEVENT','END:VCALENDAR'].join('\r\n');
    downloadFile('fairbnb-barcelona-trip.ics', calendar, 'text/calendar');
    showToast('Calendar file downloaded.');
  });

  document.getElementById('receipt-button').addEventListener('click', () => {
    downloadFile('fairbnb-receipt-FB-BCN-261016.txt', 'Fairbnb.coop\nBooking FB-BCN-261016\nBarcelona, 14 to 19 October 2026\nTotal paid: €789.40\nCommunity contribution: €49.20', 'text/plain');
    showToast('Receipt downloaded.');
  });

  document.getElementById('support-button').addEventListener('click', () => openMessages('support'));
  document.querySelectorAll('a[href="#saved"]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); showToast('Your saved places will appear here.'); }));
  accountButton.addEventListener('click', event => {
    event.stopPropagation();
    const open = accountMenu.hidden;
    accountMenu.hidden = !open;
    accountButton.setAttribute('aria-expanded', String(open));
  });
  accountMenu.addEventListener('click', event => event.stopPropagation());
  document.addEventListener('click', () => {
    accountMenu.hidden = true;
    accountButton.setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || accountMenu.hidden) return;
    accountMenu.hidden = true;
    accountButton.setAttribute('aria-expanded', 'false');
    accountButton.focus();
  });
  document.querySelectorAll('[data-account-settings]').forEach(button => button.addEventListener('click', () => showToast('Account settings are represented in this portfolio prototype.')));
  document.querySelectorAll('[data-sign-out]').forEach(button => button.addEventListener('click', () => showToast('You remain signed in while exploring this prototype.')));
  document.getElementById('footer-support').addEventListener('click', () => openMessages('support'));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('menu-button').addEventListener('click', event => {
    const nav = document.getElementById('mobile-nav');
    const open = nav.hidden;
    nav.hidden = !open;
    event.currentTarget.setAttribute('aria-expanded', String(open));
    event.currentTarget.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    event.currentTarget.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}" aria-hidden="true"></i>`;
  });

  const initialView = new URLSearchParams(window.location.search).get('view');
  updateCountdown();
  updateTaskCount();
  renderConversation('adriana');
  if (initialView === 'messages') openMessages('adriana');
  else if (initialView === 'booking') setTab('booking');
});
