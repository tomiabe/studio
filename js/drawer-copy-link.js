function copyWithFallback(value) {
  const field = document.createElement('textarea');
  field.value = value;
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.append(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();
  if (!copied) throw new Error('Clipboard unavailable');
}

document.querySelectorAll('[data-copy-link]').forEach(button => {
  const drawer = button.closest('dialog');
  const status = drawer?.querySelector('[data-copy-status]');
  let statusTimer;

  button.addEventListener('click', async () => {
    const link = new URL(location.href);
    link.hash = button.dataset.copyLink;

    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(link.href);
        } catch {
          copyWithFallback(link.href);
        }
      } else {
        copyWithFallback(link.href);
      }
      status.textContent = 'Project link copied';
    } catch {
      status.textContent = 'Could not copy project link';
    }

    status.classList.add('is-visible');
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => status.classList.remove('is-visible'), 2200);
  });
});
