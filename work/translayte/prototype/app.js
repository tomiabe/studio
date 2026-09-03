const app = document.querySelector("#app");
const headerActions = document.querySelector("#header-actions");
const fileInput = document.querySelector("#document-input");
const toastRegion = document.querySelector("#toast-region");

const appState = {
  screen: "start",
  modal: null,
  signedIn: false,
  credits: 1160,
  file: null,
  sourceLanguage: "Detect language",
  targetLanguage: "French",
  languageSide: "source",
  service: "instant",
  reviewLevel: "professional",
  analysisProgress: 0,
  translationProgress: 0,
  postAuthAction: null,
  paymentContext: null,
  paymentOrigin: null,
  reviewPurchased: false
};

const reviewOptions = {
  proofread: {
    name: "Native proofreading",
    description: "A native speaker checks accuracy, tone, names, and formatting.",
    price: 29,
    delivery: "Within 24 hours",
    icon: "text-aa"
  },
  professional: {
    name: "Professional review",
    description: "An experienced translator reviews the document and corrects the final copy.",
    price: 59,
    delivery: "Within 2 working days",
    icon: "seal-check"
  },
  specialist: {
    name: "Legal specialist review",
    description: "A legal-language specialist checks terminology, context, and document structure.",
    price: 89,
    delivery: "Within 3 working days",
    icon: "scales"
  }
};

const workspaceDocuments = [
  { name: "Tomi Abe Contract.pdf", status: "complete", language: "English to French", updated: "Today, 10:42", words: "1,340", action: "Open" },
  { name: "Passport Application.pdf", status: "partial", language: "English to French", updated: "Yesterday", words: "3,345", action: "Resume" },
  { name: "Utility Bill March.pdf", status: "review", language: "Russian to English", updated: "15 Jun 2023", words: "248", action: "View review" },
  { name: "Birth Certificate.pdf", status: "complete", language: "Spanish to German", updated: "6 Feb 2023", words: "895", action: "Open" }
];

let progressTimer = null;

function icon(name) {
  return `<i class="ph ph-${name}" aria-hidden="true"></i>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

function renderHeader() {
  if (!appState.signedIn) {
    headerActions.innerHTML = `
      <button type="button" class="header-link" data-action="open-signin">Sign in</button>
      <button type="button" class="button button-primary button-small" data-action="open-signup">Create account</button>
    `;
    return;
  }

  headerActions.innerHTML = `
    <span class="credit-summary">Credits <strong>${appState.credits.toLocaleString()}</strong></span>
    <button type="button" class="header-link" data-action="open-workspace">Documents</button>
    <button type="button" class="account-button" data-action="account-menu">Tomi ${icon("user-circle")}</button>
  `;
}

function stepper(activeStep) {
  const steps = ["Upload", "Check details", "Translate"];
  return `
    <div class="stepper" aria-label="Translation progress">
      ${steps.map((label, index) => {
        const stepNumber = index + 1;
        const className = stepNumber === activeStep ? "is-active" : stepNumber < activeStep ? "is-complete" : "";
        return `<div class="step ${className}">${stepNumber}. ${label}</div>`;
      }).join("")}
    </div>
  `;
}

function pageTitle(title, copy) {
  return `<div class="page-title"><h1>${title}</h1><p>${copy}</p></div>`;
}

function startScreen() {
  return `
    <section class="screen">
      ${stepper(1)}
      ${pageTitle("Translate a document", "Upload your file, check the details, then choose how you want it translated.")}
      <div class="workspace-grid">
        <section class="surface setup-panel">
          <h2 class="section-heading">Choose your languages</h2>
          <p class="section-copy">We can detect the source language after you upload the document.</p>

          <div class="language-pair">
            <div>
              <span class="field-label">From</span>
              <button type="button" class="select-button" data-action="select-source">
                <span class="flag">${appState.sourceLanguage === "Detect language" ? "🌐" : languageFlag(appState.sourceLanguage)}</span>
                <span>${appState.sourceLanguage}</span>
                ${icon("caret-down")}
              </button>
            </div>
            <button type="button" class="swap-button" data-action="swap-languages" aria-label="Swap languages">${icon("arrows-left-right")}</button>
            <div>
              <span class="field-label">To</span>
              <button type="button" class="select-button" data-action="select-target">
                <span class="flag">${languageFlag(appState.targetLanguage)}</span>
                <span>${appState.targetLanguage}</span>
                ${icon("caret-down")}
              </button>
            </div>
          </div>

          <div class="drop-zone" id="drop-zone">
            <span class="drop-icon">${icon("file-arrow-up")}</span>
            <h3>Drop your document here</h3>
            <p>or choose a file from your device</p>
            <button type="button" class="button button-primary" data-action="choose-file">Choose document</button>
            <button type="button" class="text-button" data-action="use-sample">Try with a sample document</button>
          </div>
          <p class="support-copy">PDF, Word, PowerPoint, Excel, TXT, and RTF. Maximum file size 100 MB.</p>
        </section>

        <aside class="surface side-panel">
          <div class="side-section">
            <h2>What happens next</h2>
            <ul class="process-list">
              <li><span class="list-icon">${icon("magnifying-glass")}</span><span>We check the file and count the words.</span></li>
              <li><span class="list-icon">${icon("receipt")}</span><span>You see the price before creating an account.</span></li>
              <li><span class="list-icon">${icon("download-simple")}</span><span>You download the translated document in its original format.</span></li>
            </ul>
          </div>
          <div class="side-section">
            <div class="trust-note">${icon("lock-key")}<div><h2>Your document stays private</h2><p>Files are encrypted during upload and processing. You control when they are removed.</p></div></div>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function analysingScreen() {
  const file = appState.file || demoFile();
  return `
    <section class="screen screen-compact">
      ${stepper(1)}
      ${pageTitle("Checking your document", "We are preparing the details you need before translation begins.")}
      <section class="surface analysis-panel" aria-live="polite">
        ${fileCard(file, false)}
        <div class="progress-block">
          <div class="progress-header"><span id="analysis-status">${analysisStatus()}</span><strong id="analysis-percent">${appState.analysisProgress}%</strong></div>
          <div class="progress-track"><div id="analysis-progress" class="progress-fill" style="width:${appState.analysisProgress}%"></div></div>
        </div>
        <div class="analysis-status"><span class="spinner"></span><span>This usually takes less than a minute.</span></div>
      </section>
    </section>
  `;
}

function quoteScreen() {
  const file = appState.file || demoFile();
  const reviewSelected = appState.service === "review";
  const total = reviewSelected ? "£29.00" : "£0.00";
  return `
    <section class="screen">
      ${stepper(2)}
      ${pageTitle("Check the details", "We found 1,340 words. Your free allowance covers the full translation.")}
      <div class="quote-layout">
        <section class="surface quote-panel">
          ${fileCard(file, true)}
          <div class="details-grid">
            <div class="detail-box"><span>Detected language</span><strong>English</strong></div>
            <div class="detail-box"><span>Translate to</span><strong>${appState.targetLanguage}</strong></div>
            <div class="detail-box"><span>Document type</span><strong>Legal agreement</strong></div>
            <div class="detail-box"><span>Estimated time</span><strong>About 2 minutes</strong></div>
          </div>

          <div class="choice-group" aria-label="Choose translation service">
            <button type="button" class="choice-card ${reviewSelected ? "" : "is-selected"}" data-action="choose-service" data-service="instant">
              <span class="radio-mark"></span>
              <span class="choice-content"><strong>Fast translation</strong><span>Translate the document and preserve its layout.</span></span>
              <span class="choice-price">Included</span>
            </button>
            <button type="button" class="choice-card ${reviewSelected ? "is-selected" : ""}" data-action="choose-service" data-service="review">
              <span class="radio-mark"></span>
              <span class="choice-content"><strong>Add native proofreading</strong><span>A native speaker checks meaning, tone, names, and formatting within 24 hours.</span></span>
              <span class="choice-price">+ £29.00</span>
            </button>
          </div>
        </section>

        <aside class="surface price-panel">
          <h2>Your translation</h2>
          <ul class="price-list">
            <li><span>Document words</span><strong>1,340</strong></li>
            <li><span>Free allowance used</span><strong>1,340</strong></li>
            <li><span>Fast translation</span><strong>£0.00</strong></li>
            ${reviewSelected ? `<li><span>Native proofreading</span><strong>£29.00</strong></li>` : ""}
          </ul>
          <div class="price-total"><span>Total</span><span>${total}</span></div>
          <p class="price-note">VAT is calculated at checkout where applicable.</p>
          <button type="button" class="button button-primary button-full" data-action="continue-quote">Continue</button>
          <div class="inline-notice">${icon("info")}<span>Create an account at the next step so your document and translation can be recovered safely.</span></div>
        </aside>
      </div>
    </section>
  `;
}

function processingScreen() {
  return `
    <section class="screen screen-compact">
      ${stepper(3)}
      ${pageTitle("Translating your document", "You can leave this page. We will keep working and save the result to your account.")}
      <section class="surface processing-panel" aria-live="polite">
        <div class="processing-hero">
          <span class="processing-icon">${icon("translate")}</span>
          <div><h2>${escapeHtml(appState.file?.name || "Tomi Abe Contract.pdf")}</h2><p>English to ${appState.targetLanguage}</p></div>
        </div>
        <div class="progress-block">
          <div class="progress-header"><span id="translation-status">${translationStatus()}</span><strong id="translation-percent">${appState.translationProgress}%</strong></div>
          <div class="progress-track"><div id="translation-progress" class="progress-fill" style="width:${appState.translationProgress}%"></div></div>
        </div>
        <ul class="timeline-list" id="translation-timeline">
          ${timelineItem("File uploaded", 1, 10)}
          ${timelineItem("Document prepared", 2, 35)}
          ${timelineItem("Translation in progress", 3, 70)}
          ${timelineItem("Formatting final document", 4, 96)}
        </ul>
      </section>
    </section>
  `;
}

function resultScreen() {
  return `
    <section class="screen">
      ${stepper(3)}
      <section class="surface result-panel">
        <div class="result-header">
          <div>
            <span class="status-line">${icon("check-circle")} Translation complete</span>
            <h2>${escapeHtml(appState.file?.name || "Tomi Abe Contract.pdf")}</h2>
            <p>English to ${appState.targetLanguage}</p>
          </div>
          <div class="result-actions">
            <button type="button" class="button button-primary" data-action="download-result">${icon("download-simple")} Download</button>
            <button type="button" class="button button-secondary" data-action="more-actions" aria-label="More actions">${icon("dots-three")}</button>
          </div>
        </div>

        <div class="result-summary">
          <div class="summary-item"><span>Words translated</span><strong>1,340</strong></div>
          <div class="summary-item"><span>Layout</span><strong>Preserved</strong></div>
          <div class="summary-item"><span>File format</span><strong>PDF</strong></div>
          <div class="summary-item"><span>Credits used</span><strong>0</strong></div>
        </div>

        <div class="preview-grid">
          <article class="preview-panel"><h3>Original document</h3><p>Service Agreement</p><p>This agreement is entered into between the parties named below and sets out the terms of service.</p><p>Payment must be received within fourteen days of the invoice date.</p></article>
          <article class="preview-panel"><h3>French translation</h3><p>Contrat de service</p><p>Le présent contrat est conclu entre les parties désignées ci-dessous et définit les conditions de service.</p><p>Le paiement doit être reçu dans les quatorze jours suivant la date de facturation.</p></article>
        </div>

        ${appState.reviewPurchased ? `<div class="review-callout">${icon("seal-check")}<div class="review-callout-content"><strong>${reviewOptions[appState.reviewLevel].name} requested</strong><span>A reviewer will return the checked document ${reviewOptions[appState.reviewLevel].delivery.toLowerCase()}.</span></div><button type="button" class="button button-secondary button-small" data-action="open-workspace">View documents</button></div>` : `<div class="review-callout">${icon("scales")}<div class="review-callout-content"><strong>This looks like a legal agreement</strong><span>A legal-language specialist can check terminology, context, and structure before you use it.</span></div><button type="button" class="button button-secondary button-small" data-action="open-review">Explore review</button></div>`}
      </section>
    </section>
  `;
}

function reviewScreen() {
  const selected = reviewOptions[appState.reviewLevel];
  return `
    <section class="screen">
      ${pageTitle("Add a professional review", "Choose the level of review based on how the document will be used.")}
      <div class="review-layout">
        <section class="surface review-options">
          <h2 class="section-heading">Review options</h2>
          <p class="section-copy">Each option includes one revision after delivery.</p>
          ${Object.entries(reviewOptions).map(([key, option]) => `
            <button type="button" class="review-card ${appState.reviewLevel === key ? "is-selected" : ""}" data-action="choose-review" data-review="${key}">
              <span class="review-icon">${icon(option.icon)}</span>
              <span><h3>${option.name}</h3><p>${option.description}</p><ul class="review-detail-list"><li>${icon("clock")} ${option.delivery}</li><li>${icon("arrow-counter-clockwise")} One revision included</li></ul></span>
              <span class="choice-price">£${option.price.toFixed(2)}</span>
            </button>
          `).join("")}
        </section>
        <aside class="surface price-panel">
          <h2>Review summary</h2>
          <ul class="price-list"><li><span>Document</span><strong>1,340 words</strong></li><li><span>Review</span><strong>${selected.name}</strong></li><li><span>Delivery</span><strong>${selected.delivery}</strong></li></ul>
          <div class="price-total"><span>Total</span><span>£${selected.price.toFixed(2)}</span></div>
          <p class="price-note">VAT is calculated at checkout where applicable.</p>
          <button type="button" class="button button-primary button-full" data-action="continue-review">Continue to payment</button>
          <button type="button" class="text-button button-full" data-action="back-result">Back to translation</button>
        </aside>
      </div>
    </section>
  `;
}

function workspaceScreen() {
  return `
    <section class="screen">
      <div class="workspace-header">
        <div><h1>Your documents</h1><p>Open a translation, continue unfinished work, or start something new.</p></div>
        <button type="button" class="button button-primary" data-action="new-translation">${icon("plus")} New translation</button>
      </div>
      <div class="workspace-stats">
        <div class="surface workspace-stat"><span>Available credits</span><strong>${appState.credits.toLocaleString()}</strong></div>
        <div class="surface workspace-stat"><span>Documents</span><strong>7</strong></div>
        <div class="surface workspace-stat"><span>Reviews in progress</span><strong>${appState.reviewPurchased ? "1" : "0"}</strong></div>
      </div>
      <section class="surface documents-panel">
        <div class="documents-toolbar">
          <div class="search-wrap">${icon("magnifying-glass")}<input id="document-search" class="search-input" type="search" placeholder="Search documents" aria-label="Search documents" /></div>
          <select id="status-filter" class="filter-select" aria-label="Filter documents"><option value="all">All statuses</option><option value="complete">Completed</option><option value="partial">Partial</option><option value="review">In review</option></select>
        </div>
        <div class="table-scroll">
          <table class="document-table">
            <thead><tr><th>Document</th><th>Status</th><th>Languages</th><th>Updated</th><th>Words</th><th></th></tr></thead>
            <tbody id="document-table-body">${documentRows(workspaceDocuments)}</tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function limitScreen() {
  return `
    <section class="screen">
      ${pageTitle("Complete your translation", "The free allowance covered 2,500 words. There are 845 words left in this document.")}
      <div class="limit-layout">
        <section class="surface limit-panel">
          ${fileCard({ name: "Passport Application.pdf", size: "6.8 MB", type: "PDF" }, false)}
          <div class="limit-progress">
            <div class="progress-header"><span>Translation progress</span><strong>75%</strong></div>
            <div class="progress-track"><div class="progress-fill" style="width:75%"></div></div>
            <div class="limit-numbers"><span>2,500 words translated</span><span>845 words remaining</span></div>
          </div>
          <div class="inline-notice">${icon("info")}<span>Your translated pages are saved. Payment resumes the document from where it stopped.</span></div>
        </section>
        <aside class="option-stack">
          <article class="surface purchase-card is-recommended"><h3>Finish this document</h3><p>Buy exactly the words needed. There is no subscription.</p><div class="purchase-price">£3.38 <span>one-time payment</span></div><button type="button" class="button button-primary button-full" data-action="buy-remaining">Buy 845 words</button></article>
          <article class="surface purchase-card"><h3>Translate regularly?</h3><p>Get 180,000 words for the year, plus professional review benefits.</p><div class="purchase-price">£95.88 <span>billed annually</span></div><button type="button" class="button button-secondary button-full" data-action="buy-plan">See annual plan</button></article>
        </aside>
      </div>
    </section>
  `;
}

function fileCard(file, editable) {
  return `
    <div class="file-card">
      <span class="file-type-icon">${file.type || "PDF"}</span>
      <div class="file-card-content"><strong>${escapeHtml(file.name)}</strong><span>${file.size || "2.4 MB"} · Ready to translate</span></div>
      ${editable ? `<button type="button" class="remove-file" data-action="change-file" aria-label="Change document">${icon("pencil-simple")}</button>` : ""}
    </div>
  `;
}

function timelineItem(label, number, threshold) {
  const isComplete = appState.translationProgress > threshold + 20;
  const isActive = appState.translationProgress >= threshold && !isComplete;
  const className = isComplete ? "is-complete" : isActive ? "is-active" : "";
  const stateIcon = isComplete ? icon("check") : isActive ? icon("spinner-gap") : number;
  const time = isComplete ? "Done" : isActive ? "Working" : "Waiting";
  return `<li class="timeline-item ${className}"><span class="timeline-state">${stateIcon}</span><span>${label}</span><span class="timeline-time">${time}</span></li>`;
}

function documentRows(documents) {
  return documents.map((document, index) => `
    <tr data-document-row data-name="${document.name.toLowerCase()}" data-status="${document.status}">
      <td class="document-name-cell"><span class="document-title-cell">${icon("file-text")}<strong>${document.name}</strong></span></td>
      <td data-label="Status">${statusChip(document.status)}</td>
      <td data-label="Languages">${document.language}</td>
      <td data-label="Updated">${document.updated}</td>
      <td data-label="Words">${document.words}</td>
      <td class="document-actions-cell"><div class="table-actions"><button type="button" class="button button-secondary button-small" data-action="document-action" data-index="${index}">${document.action}</button><button type="button" class="button button-quiet button-small" data-action="document-menu" aria-label="More actions for ${document.name}">${icon("dots-three")}</button></div></td>
    </tr>
  `).join("");
}

function statusChip(status) {
  if (status === "complete") return `<span class="status-chip status-complete">${icon("check-circle")} Completed</span>`;
  if (status === "partial") return `<span class="status-chip status-partial">${icon("warning-circle")} Partial</span>`;
  return `<span class="status-chip status-review">${icon("seal-check")} In review</span>`;
}

function modalMarkup() {
  if (!appState.modal) return "";
  if (appState.modal === "signup") return accountDialog("signup");
  if (appState.modal === "signin") return accountDialog("signin");
  if (appState.modal === "language") return languageDialog();
  if (appState.modal === "payment") return paymentDialog();
  if (appState.modal === "payment-success") return paymentSuccessDialog();
  if (appState.modal === "file-error") return fileErrorDialog();
  if (appState.modal === "account") return accountMenuDialog();
  return "";
}

function dialog(content, small = false) {
  return `<div class="modal-layer" data-action="close-modal"><div class="dialog ${small ? "dialog-small" : ""}" role="dialog" aria-modal="true">${content}</div></div>`;
}

function accountDialog(mode) {
  const signup = mode === "signup";
  const hasPendingDocument = Boolean(appState.postAuthAction);
  const contextualTitle = hasPendingDocument ? "Save your document and continue" : signup ? "Create your Translayte account" : "Welcome back";
  const contextualCopy = hasPendingDocument ? "Your quote is ready. Create an account so we can save this document and return the finished translation to you." : signup ? "Keep your documents, translations, and reviews in one place." : "Sign in to access your documents and translations.";
  return dialog(`
    <button type="button" class="dialog-close" data-action="close-modal" aria-label="Close">${icon("x")}</button>
    <h2>${contextualTitle}</h2>
    <p>${contextualCopy}</p>
    <div class="social-buttons">
      <button type="button" class="button social-button social-google" data-action="social-auth">${icon("google-logo")} Google</button>
      <button type="button" class="button social-button social-apple" data-action="social-auth">${icon("apple-logo")} Apple</button>
      <button type="button" class="button social-button social-facebook" data-action="social-auth">${icon("facebook-logo")} Facebook</button>
    </div>
    <div class="form-divider">or use email</div>
    <form class="form-stack" data-form="${mode}">
      <div class="form-field"><label for="auth-email">Email address</label><input id="auth-email" class="text-input" type="email" autocomplete="email" required /></div>
      <div class="form-field"><label for="auth-password">Password</label><div class="password-wrap"><input id="auth-password" class="text-input" type="password" autocomplete="${signup ? "new-password" : "current-password"}" minlength="6" required /><button type="button" class="password-toggle" data-action="toggle-password" aria-label="Show password">${icon("eye")}</button></div></div>
      ${signup ? `<label class="check-label"><input type="checkbox" required /><span>I agree to the terms of use and privacy policy.</span></label>` : `<button type="button" class="text-button" data-action="forgot-password">Forgot your password?</button>`}
      <button type="submit" class="button button-primary button-full">${signup ? "Create account" : "Sign in"}</button>
    </form>
    <div class="dialog-switch">${signup ? `Already have an account? <button type="button" class="text-button" data-action="switch-signin">Sign in</button>` : `New to Translayte? <button type="button" class="text-button" data-action="switch-signup">Create account</button>`}</div>
  `);
}

function languageDialog() {
  const languages = [
    ["English", "🇬🇧"], ["French", "🇫🇷"], ["Spanish", "🇪🇸"], ["German", "🇩🇪"],
    ["Italian", "🇮🇹"], ["Portuguese", "🇵🇹"], ["Dutch", "🇳🇱"], ["Finnish", "🇫🇮"]
  ];
  return dialog(`
    <button type="button" class="dialog-close" data-action="close-modal" aria-label="Close">${icon("x")}</button>
    <h2>Choose a language</h2>
    <p>Select the ${appState.languageSide === "source" ? "document language" : "language you want"}.</p>
    <div class="language-list">
      ${appState.languageSide === "source" ? `<button type="button" class="language-option" data-action="choose-language" data-language="Detect language"><span>🌐</span> Detect language</button>` : ""}
      ${languages.map(([language, flag]) => `<button type="button" class="language-option" data-action="choose-language" data-language="${language}"><span>${flag}</span> ${language}</button>`).join("")}
    </div>
  `, true);
}

function paymentDialog() {
  let title = "Confirm professional review";
  let item = reviewOptions[appState.reviewLevel].name;
  let price = `£${reviewOptions[appState.reviewLevel].price.toFixed(2)}`;
  let note = reviewOptions[appState.reviewLevel].delivery;

  if (appState.paymentContext === "remaining") {
    title = "Finish this document";
    item = "845 translation words";
    price = "£3.38";
    note = "One-time payment";
  }

  if (appState.paymentContext === "plan") {
    title = "Start the annual plan";
    item = "180,000 words per year";
    price = "£95.88";
    note = "Billed annually";
  }

  return dialog(`
    <button type="button" class="dialog-close" data-action="close-modal" aria-label="Close">${icon("x")}</button>
    <h2>${title}</h2>
    <p>Review the amount before continuing. This prototype does not collect payment details.</p>
    <div class="payment-summary"><span>Item</span><strong>${item}</strong><span>Timing</span><strong>${note}</strong><span>Total</span><strong>${price}</strong></div>
    <button type="button" class="button button-primary button-full" data-action="confirm-payment">Confirm in prototype</button>
    <button type="button" class="text-button button-full" data-action="close-modal">Go back</button>
  `, true);
}

function paymentSuccessDialog() {
  const reviewPayment = appState.paymentContext === "review";
  const reviewBeforeTranslation = reviewPayment && appState.paymentOrigin === "quote";
  return dialog(`
    <span class="success-dialog-icon">${icon("check")}</span>
    <h2>${reviewBeforeTranslation ? "Review added" : reviewPayment ? "Review requested" : "Payment confirmed"}</h2>
    <p>${reviewBeforeTranslation ? "The review is included. We can now translate your document." : reviewPayment ? "The translated document has been sent to the selected reviewer." : "Your words have been added and the document is ready to continue."}</p>
    <button type="button" class="button button-primary button-full" data-action="finish-payment">${reviewBeforeTranslation ? "Start translation" : reviewPayment ? "Return to translation" : "Continue translation"}</button>
  `, true);
}

function fileErrorDialog() {
  return dialog(`
    <button type="button" class="dialog-close" data-action="close-modal" aria-label="Close">${icon("x")}</button>
    <h2>We cannot use this file</h2>
    <p>Choose a PDF, Word, PowerPoint, Excel, TXT, or RTF file smaller than 100 MB.</p>
    <button type="button" class="button button-primary button-full" data-action="choose-file">Choose another document</button>
  `, true);
}

function accountMenuDialog() {
  return dialog(`
    <button type="button" class="dialog-close" data-action="close-modal" aria-label="Close">${icon("x")}</button>
    <h2>Tomi Abe</h2>
    <p>Manage your documents and account.</p>
    <div class="form-stack"><button type="button" class="button button-secondary button-full" data-action="open-workspace">${icon("files")} Documents</button><button type="button" class="button button-secondary button-full" data-action="sign-out">${icon("sign-out")} Sign out</button></div>
  `, true);
}

function render() {
  renderHeader();
  let screenMarkup = startScreen();
  if (appState.screen === "analysing") screenMarkup = analysingScreen();
  if (appState.screen === "quote") screenMarkup = quoteScreen();
  if (appState.screen === "processing") screenMarkup = processingScreen();
  if (appState.screen === "result") screenMarkup = resultScreen();
  if (appState.screen === "review") screenMarkup = reviewScreen();
  if (appState.screen === "workspace") screenMarkup = workspaceScreen();
  if (appState.screen === "limit") screenMarkup = limitScreen();
  app.innerHTML = `${screenMarkup}${modalMarkup()}`;
  bindScreenEvents();
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  if (target.tagName === "A") event.preventDefault();
  const action = target.dataset.action;

  if (action === "close-modal" && target.classList.contains("modal-layer") && event.target !== target) return;

  if (action === "choose-file") return fileInput.click();
  if (action === "use-sample") return startAnalysis(demoFile());
  if (action === "select-source") return openLanguageDialog("source");
  if (action === "select-target") return openLanguageDialog("target");
  if (action === "choose-language") return chooseLanguage(target.dataset.language);
  if (action === "swap-languages") return swapLanguages();
  if (action === "change-file") return resetToStart();
  if (action === "choose-service") return chooseService(target.dataset.service);
  if (action === "continue-quote") return continueFromQuote();
  if (action === "open-signin") return openAccount("signin");
  if (action === "open-signup") return openAccount("signup");
  if (action === "switch-signin") return setModal("signin");
  if (action === "switch-signup") return setModal("signup");
  if (action === "social-auth") return completeAuthentication();
  if (action === "toggle-password") return togglePassword(target);
  if (action === "forgot-password") return showToast("Password reset instructions would be sent to your email.");
  if (action === "close-modal") return setModal(null);
  if (action === "download-result") return downloadResult();
  if (action === "more-actions") return showToast("Rename, delete, and source file actions would appear here.");
  if (action === "open-review") return setScreen("review");
  if (action === "back-result") return setScreen("result");
  if (action === "choose-review") return chooseReview(target.dataset.review);
  if (action === "continue-review") return beginPayment("review");
  if (action === "confirm-payment") return confirmPayment();
  if (action === "finish-payment") return finishPayment();
  if (action === "open-workspace") return openWorkspace();
  if (action === "new-translation") return resetToStart();
  if (action === "document-action") return openDocument(Number(target.dataset.index));
  if (action === "document-menu") return showToast("Document actions would open here.");
  if (action === "buy-remaining") return beginPayment("remaining");
  if (action === "buy-plan") return beginPayment("plan");
  if (action === "account-menu") return setModal("account");
  if (action === "sign-out") return signOut();
  if (action === "nav-services") return showToast("Document translation and professional review are available in this prototype.");
  if (action === "nav-pricing") return showToast("Upload a document to get pricing based on its word count.");
  if (action === "nav-help") return showToast("Help and support would open here.");
}

function handleSubmit(event) {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();
  if (!form.reportValidity()) return;
  completeAuthentication();
}

function openLanguageDialog(side) {
  appState.languageSide = side;
  setModal("language");
}

function chooseLanguage(language) {
  if (appState.languageSide === "source") appState.sourceLanguage = language;
  else appState.targetLanguage = language;
  setModal(null);
}

function swapLanguages() {
  const source = appState.sourceLanguage === "Detect language" ? "English" : appState.sourceLanguage;
  appState.sourceLanguage = appState.targetLanguage;
  appState.targetLanguage = source;
  render();
}

function chooseService(service) {
  appState.service = service;
  render();
}

function chooseReview(review) {
  appState.reviewLevel = review;
  render();
}

function continueFromQuote() {
  if (!appState.signedIn) {
    appState.postAuthAction = appState.service === "review" ? "review-payment" : "translate";
    setModal("signup");
    return;
  }
  if (appState.service === "review") {
    appState.reviewLevel = "proofread";
    beginPayment("review", "quote");
    return;
  }
  startTranslation();
}

function openAccount(mode) {
  appState.postAuthAction = null;
  setModal(mode);
}

function completeAuthentication() {
  appState.signedIn = true;
  const nextAction = appState.postAuthAction;
  appState.postAuthAction = null;
  appState.modal = null;
  showToast("You are signed in.");
  if (nextAction === "translate") startTranslation();
  else if (nextAction === "review-payment") {
    appState.reviewLevel = "proofread";
    beginPayment("review", "quote");
  }
  else setScreen("workspace");
}

function togglePassword(button) {
  const input = button.parentElement.querySelector("input");
  const reveal = input.type === "password";
  input.type = reveal ? "text" : "password";
  button.innerHTML = icon(reveal ? "eye-slash" : "eye");
  button.setAttribute("aria-label", reveal ? "Hide password" : "Show password");
}

function beginPayment(context, origin = "limit") {
  appState.paymentContext = context;
  appState.paymentOrigin = origin;
  setModal("payment");
}

function confirmPayment() {
  if (appState.paymentContext === "remaining") appState.credits += 845;
  if (appState.paymentContext === "plan") appState.credits += 180000;
  if (appState.paymentContext === "review") appState.reviewPurchased = true;
  setModal("payment-success");
}

function finishPayment() {
  const reviewPayment = appState.paymentContext === "review";
  appState.modal = null;
  if (reviewPayment && appState.paymentOrigin === "quote") startTranslation();
  else if (reviewPayment) setScreen("result");
  else startTranslation();
}

function openWorkspace() {
  appState.modal = null;
  setScreen("workspace");
}

function openDocument(index) {
  const document = workspaceDocuments[index];
  if (document.status === "partial") {
    appState.file = { name: document.name, size: "6.8 MB", type: "PDF" };
    return setScreen("limit");
  }
  if (document.status === "review") {
    appState.reviewPurchased = true;
    return setScreen("result");
  }
  appState.file = { name: document.name, size: "2.4 MB", type: "PDF" };
  setScreen("result");
}

function signOut() {
  appState.signedIn = false;
  appState.modal = null;
  showToast("You are signed out.");
  resetToStart();
}

function resetToStart() {
  clearProgressTimer();
  appState.screen = "start";
  appState.modal = null;
  appState.file = null;
  appState.analysisProgress = 0;
  appState.translationProgress = 0;
  appState.service = "instant";
  fileInput.value = "";
  render();
  focusApp();
}

function setScreen(screen) {
  clearProgressTimer();
  appState.screen = screen;
  appState.modal = null;
  render();
  focusApp();
}

function setModal(modal) {
  appState.modal = modal;
  render();
  if (modal) window.setTimeout(() => document.querySelector(".dialog button, .dialog input")?.focus(), 0);
}

function focusApp() {
  window.setTimeout(() => app.focus({ preventScroll: true }), 0);
}

function startAnalysis(file) {
  appState.file = file;
  appState.screen = "analysing";
  appState.modal = null;
  appState.analysisProgress = 8;
  render();
  clearProgressTimer();
  progressTimer = window.setInterval(() => {
    appState.analysisProgress = Math.min(100, appState.analysisProgress + 12);
    updateAnalysisProgress();
    if (appState.analysisProgress >= 100) {
      clearProgressTimer();
      window.setTimeout(() => setScreen("quote"), 250);
    }
  }, 230);
}

function startTranslation() {
  appState.screen = "processing";
  appState.modal = null;
  appState.translationProgress = 4;
  render();
  clearProgressTimer();
  progressTimer = window.setInterval(() => {
    appState.translationProgress = Math.min(100, appState.translationProgress + 8);
    updateTranslationProgress();
    if (appState.translationProgress >= 100) {
      clearProgressTimer();
      window.setTimeout(() => setScreen("result"), 350);
    }
  }, 300);
}

function updateAnalysisProgress() {
  const fill = document.querySelector("#analysis-progress");
  const percent = document.querySelector("#analysis-percent");
  const status = document.querySelector("#analysis-status");
  if (fill) fill.style.width = `${appState.analysisProgress}%`;
  if (percent) percent.textContent = `${appState.analysisProgress}%`;
  if (status) status.textContent = analysisStatus();
}

function updateTranslationProgress() {
  const fill = document.querySelector("#translation-progress");
  const percent = document.querySelector("#translation-percent");
  const status = document.querySelector("#translation-status");
  const timeline = document.querySelector("#translation-timeline");
  if (fill) fill.style.width = `${appState.translationProgress}%`;
  if (percent) percent.textContent = `${appState.translationProgress}%`;
  if (status) status.textContent = translationStatus();
  if (timeline) timeline.innerHTML = `${timelineItem("File uploaded", 1, 10)}${timelineItem("Document prepared", 2, 35)}${timelineItem("Translation in progress", 3, 70)}${timelineItem("Formatting final document", 4, 96)}`;
}

function clearProgressTimer() {
  if (progressTimer) window.clearInterval(progressTimer);
  progressTimer = null;
}

function analysisStatus() {
  if (appState.analysisProgress < 35) return "Checking file quality";
  if (appState.analysisProgress < 70) return "Detecting language and document type";
  return "Counting words and preparing your quote";
}

function translationStatus() {
  if (appState.translationProgress < 30) return "Preparing the document";
  if (appState.translationProgress < 82) return "Translating the content";
  return "Restoring the document layout";
}

function bindScreenEvents() {
  const dropZone = document.querySelector("#drop-zone");
  if (dropZone) {
    dropZone.addEventListener("dragenter", handleDragEnter);
    dropZone.addEventListener("dragover", handleDragEnter);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("drop", handleDrop);
  }

  const search = document.querySelector("#document-search");
  const filter = document.querySelector("#status-filter");
  if (search) search.addEventListener("input", filterDocuments);
  if (filter) filter.addEventListener("change", filterDocuments);
}

function handleDragEnter(event) {
  event.preventDefault();
  event.currentTarget.classList.add("is-dragging");
}

function handleDragLeave(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("is-dragging");
}

function handleDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("is-dragging");
  const file = event.dataTransfer.files?.[0];
  if (file) processFile(file);
}

function processFile(file) {
  const allowed = ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "txt", "rtf"];
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!allowed.includes(extension) || file.size > 100 * 1024 * 1024) {
    setModal("file-error");
    return;
  }
  const formattedFile = {
    name: file.name,
    size: formatBytes(file.size),
    type: extension.toUpperCase()
  };
  startAnalysis(formattedFile);
}

function filterDocuments() {
  const query = document.querySelector("#document-search")?.value.toLowerCase() || "";
  const status = document.querySelector("#status-filter")?.value || "all";
  document.querySelectorAll("[data-document-row]").forEach((row) => {
    const matchesName = row.dataset.name.includes(query);
    const matchesStatus = status === "all" || row.dataset.status === status;
    row.hidden = !(matchesName && matchesStatus);
  });
}

function downloadResult() {
  const blob = new Blob(["Translayte prototype translation\n\nTranslation completed successfully."], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "translayte-translation.txt";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Your download has started.");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastRegion.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function demoFile() {
  return { name: "Tomi Abe Contract.pdf", size: "2.4 MB", type: "PDF" };
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, index)).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function languageFlag(language) {
  return ({ English: "🇬🇧", French: "🇫🇷", Spanish: "🇪🇸", German: "🇩🇪", Italian: "🇮🇹", Portuguese: "🇵🇹", Dutch: "🇳🇱", Finnish: "🇫🇮" })[language] || "🌐";
}

document.addEventListener("click", handleClick);
document.addEventListener("submit", handleSubmit);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && appState.modal) setModal(null);
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) processFile(file);
});

const previewParams = new URLSearchParams(window.location.search);
const previewScreen = previewParams.get("screen");
const previewModal = previewParams.get("modal");
const previewScreens = ["start", "analysing", "quote", "processing", "result", "review", "workspace", "limit"];
const previewModals = ["signup", "signin", "language", "payment", "payment-success", "file-error", "account"];

if (previewScreens.includes(previewScreen)) {
  appState.screen = previewScreen;
  appState.file = demoFile();
  appState.analysisProgress = 58;
  appState.translationProgress = 68;
  appState.signedIn = ["processing", "result", "review", "workspace", "limit"].includes(previewScreen);
}

if (previewModals.includes(previewModal)) {
  appState.modal = previewModal;
}

render();
