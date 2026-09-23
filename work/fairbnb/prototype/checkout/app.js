document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const explicitSelection = params.has('stay') || params.has('experience');
  const hasStay = explicitSelection ? params.has('stay') : true;
  const hasExperience = explicitSelection ? params.has('experience') : true;
  const stayCheckin = document.getElementById('stay-checkin');
  const stayCheckout = document.getElementById('stay-checkout');
  const stayGuests = document.getElementById('stay-guests');
  const experienceDate = document.getElementById('experience-date');
  const experienceGuests = document.getElementById('experience-guests');
  const terms = document.getElementById('terms');
  const termsError = document.getElementById('terms-error');
  const paymentMethods = [...document.querySelectorAll('input[name="payment"]')];
  const money = value => `€${value.toFixed(2)}`;
  let toastTimer;

  if (params.get('checkin')) stayCheckin.value = params.get('checkin');
  if (params.get('checkout')) stayCheckout.value = params.get('checkout');
  if (params.get('experienceDate')) experienceDate.value = params.get('experienceDate');
  else if (params.get('date')) experienceDate.value = params.get('date');
  else if (params.get('checkin')) experienceDate.value = params.get('checkin');
  if (params.get('guests') && ['1', '2'].includes(params.get('guests'))) stayGuests.value = params.get('guests');
  if (params.get('guests') && ['1', '2', '3', '4', '5'].includes(params.get('guests'))) experienceGuests.value = params.get('guests');
  if (params.get('time')) {
    const timeOption = document.querySelector(`input[name="experience-time"][value="${params.get('time')}"]`);
    if (timeOption) timeOption.checked = true;
  }
  document.getElementById('confirmation-recipient').textContent = hasStay && hasExperience ? 'Adriana and Marta have' : hasStay ? 'Adriana has' : 'Marta has';

  function dateAtNoon(value) {
    return new Date(`${value}T12:00:00`);
  }

  function nights() {
    const start = dateAtNoon(stayCheckin.value);
    const end = dateAtNoon(stayCheckout.value);
    return Math.max(0, Math.round((end - start) / 86400000) || 0);
  }

  function formatDate(value, includeYear = false) {
    if (!value) return 'Choose a date';
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', ...(includeYear ? { year: 'numeric' } : {}) }).format(dateAtNoon(value));
  }

  function selectedTime() {
    return document.querySelector('input[name="experience-time"]:checked').value;
  }

  function stayAvailability() {
    if (!stayCheckin.value || !stayCheckout.value || nights() < 1) return { available: false, message: 'Check-out must be after check-in.' };
    const start = dateAtNoon(stayCheckin.value);
    const end = dateAtNoon(stayCheckout.value);
    const blockedStart = new Date('2026-10-24T00:00:00');
    const blockedEnd = new Date('2026-10-28T00:00:00');
    if (start < blockedEnd && end > blockedStart) return { available: false, message: 'This home is unavailable for part of those dates.' };
    return { available: true, message: `Available for ${nights()} night${nights() === 1 ? '' : 's'}` };
  }

  function experienceAvailability() {
    if (!experienceDate.value) return { available: false, message: 'Choose a date to see available sessions.' };
    const weekday = dateAtNoon(experienceDate.value).getDay();
    const time = selectedTime();
    if (weekday === 1) return { available: false, message: 'The studio is closed on Mondays.' };
    if (time === '18:00' && (weekday === 0 || weekday === 6)) return { available: false, message: 'The evening session is unavailable on weekends.' };
    const remaining = time === '10:00' ? 5 : time === '15:00' ? 3 : 2;
    if (Number(experienceGuests.value) > remaining) return { available: false, message: `Only ${remaining} place${remaining === 1 ? '' : 's'} remain at ${time}.` };
    return { available: true, message: `${remaining} places available at ${time}` };
  }

  function setAvailability(element, state) {
    element.classList.toggle('available', state.available);
    element.classList.toggle('unavailable', !state.available);
    element.innerHTML = `<i class="fa-solid fa-${state.available ? 'circle-check' : 'calendar-xmark'}" aria-hidden="true"></i>${state.message}`;
  }

  function updateProgress(step) {
    document.querySelectorAll('.checkout-progress li').forEach((item, index) => item.classList.toggle('active', index === step));
  }

  function updateTrip() {
    const stayNights = hasStay ? nights() : 0;
    const staySubtotal = 112 * stayNights;
    const experienceCount = hasExperience ? Number(experienceGuests.value) : 0;
    const experienceSubtotal = 48 * experienceCount;
    const cleaning = hasStay ? 35 : 0;
    const platformFee = (staySubtotal + experienceSubtotal) * 0.15;
    const contribution = platformFee / 2;
    const total = staySubtotal + experienceSubtotal + cleaning + platformFee;
    const stayState = stayAvailability();
    const experienceState = experienceAvailability();

    document.getElementById('stay-card').hidden = !hasStay;
    document.getElementById('stay-editor').hidden = !hasStay || document.getElementById('stay-editor').dataset.open !== 'true';
    document.getElementById('experience-card').hidden = !hasExperience;
    document.getElementById('experience-editor').hidden = !hasExperience || document.getElementById('experience-editor').dataset.open !== 'true';
    document.getElementById('stay-price-row').hidden = !hasStay;
    document.getElementById('cleaning-row').hidden = !hasStay;
    document.getElementById('experience-price-row').hidden = !hasExperience;

    if (hasStay) {
      document.getElementById('stay-date-display').textContent = `${formatDate(stayCheckin.value)} to ${formatDate(stayCheckout.value, true)}`;
      document.getElementById('stay-guest-display').textContent = `${stayGuests.value} guest${stayGuests.value === '1' ? '' : 's'}`;
      document.getElementById('stay-price-label').textContent = `€112 × ${stayNights} night${stayNights === 1 ? '' : 's'}`;
      document.getElementById('stay-price').textContent = money(staySubtotal);
      setAvailability(document.getElementById('stay-availability'), stayState);
    }
    if (hasExperience) {
      document.getElementById('experience-date-display').textContent = `${formatDate(experienceDate.value)} at ${selectedTime()}`;
      document.getElementById('experience-guest-display').textContent = `${experienceGuests.value} guest${experienceGuests.value === '1' ? '' : 's'}`;
      document.getElementById('experience-price-label').textContent = `€48 × ${experienceCount} guest${experienceCount === 1 ? '' : 's'}`;
      document.getElementById('experience-price').textContent = money(experienceSubtotal);
      setAvailability(document.getElementById('experience-availability'), experienceState);
    }

    const tripParts = [];
    if (hasStay) tripParts.push(`${stayNights} night${stayNights === 1 ? '' : 's'}`);
    if (hasExperience) tripParts.push('one local experience');
    tripParts.push('one supported project');
    document.getElementById('review-copy').textContent = `${tripParts.join(', ')}.`;
    document.getElementById('platform-fee').textContent = money(platformFee);
    document.getElementById('total-price').textContent = money(total);
    document.getElementById('project-total').textContent = money(contribution);
    document.getElementById('summary-impact').textContent = `${money(contribution)} supports Gràcia Community Space`;
    document.getElementById('confirm-button').textContent = `Confirm and pay ${money(total)}`;
    document.getElementById('confirmation-impact').textContent = `${money(contribution)} from Fairbnb's fee will support Gràcia Community Space.`;

    const valid = (!hasStay || stayState.available) && (!hasExperience || experienceState.available);
    document.getElementById('confirm-button').disabled = !valid;

    const nextParams = new URLSearchParams({ city: 'barcelona', guests: hasExperience ? experienceGuests.value : stayGuests.value });
    if (hasStay) {
      nextParams.set('stay', 'stay-0');
      nextParams.set('checkin', stayCheckin.value);
      nextParams.set('checkout', stayCheckout.value);
    }
    if (hasExperience) {
      nextParams.set('experience', 'experience-0');
      nextParams.set('experienceDate', experienceDate.value);
      nextParams.set('time', selectedTime());
    }
    window.history.replaceState({}, '', `?${nextParams}`);
    document.querySelector('.back-link').href = hasExperience ? `../experience/?${nextParams}` : `../stay/?${nextParams}`;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  }

  document.querySelectorAll('[data-edit]').forEach(button => button.addEventListener('click', () => {
    const editor = document.getElementById(button.dataset.edit);
    const open = editor.dataset.open !== 'true';
    document.querySelectorAll('.inline-editor').forEach(item => { item.dataset.open = 'false'; item.hidden = true; });
    document.querySelectorAll('[data-edit]').forEach(item => item.setAttribute('aria-expanded', 'false'));
    editor.dataset.open = String(open);
    editor.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    if (open) editor.querySelector('input, select').focus();
  }));

  document.querySelectorAll('[data-close-editor]').forEach(button => button.addEventListener('click', () => {
    const editor = document.getElementById(button.dataset.closeEditor);
    editor.dataset.open = 'false';
    editor.hidden = true;
    document.querySelector(`[data-edit="${button.dataset.closeEditor}"]`).setAttribute('aria-expanded', 'false');
  }));

  [stayCheckin, stayCheckout, stayGuests, experienceDate, experienceGuests, ...document.querySelectorAll('input[name="experience-time"]')].forEach(control => control.addEventListener('change', updateTrip));

  paymentMethods.forEach(method => method.addEventListener('change', () => {
    const cardSelected = method.value === 'card' && method.checked;
    document.getElementById('card-fields').hidden = !cardSelected;
    document.getElementById('bank-note').hidden = cardSelected;
  }));

  document.getElementById('first-name').addEventListener('focus', () => updateProgress(1));
  document.getElementById('card-number').addEventListener('focus', () => updateProgress(2));
  terms.addEventListener('change', () => {
    if (terms.checked) {
      terms.removeAttribute('aria-invalid');
      termsError.hidden = true;
    }
  });

  document.getElementById('confirm-button').addEventListener('click', () => {
    const required = ['first-name', 'last-name', 'email', 'phone'];
    const missing = required.map(id => document.getElementById(id)).find(field => !field.value.trim() || !field.checkValidity());
    if (missing) {
      updateProgress(1);
      missing.focus();
      missing.reportValidity();
      showToast('Add the lead guest details before confirming.');
      return;
    }
    const cardSelected = document.querySelector('input[name="payment"]:checked').value === 'card';
    if (cardSelected) {
      const cardFields = ['card-number', 'expiry', 'security-code'].map(id => document.getElementById(id));
      const missingCard = cardFields.find(field => !field.value.trim());
      if (missingCard) {
        updateProgress(2);
        missingCard.focus();
        showToast('Complete the card details or choose bank transfer.');
        return;
      }
    }
    if (!terms.checked) {
      terms.setAttribute('aria-invalid', 'true');
      termsError.hidden = false;
      terms.focus();
      showToast('Please accept the booking conditions to continue.');
      return;
    }
    document.getElementById('confirmation-email').textContent = document.getElementById('email').value;
    document.querySelector('.checkout-heading').hidden = true;
    document.querySelector('.checkout-layout').hidden = true;
    document.getElementById('confirmation').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('print-button').addEventListener('click', () => window.print());
  updateTrip();
});
