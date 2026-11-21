const app = document.querySelector("#app");
const headerActions = document.querySelector("#header-actions");
const fileInput = document.querySelector("#document-input");
const toastRegion = document.querySelector("#toast-region");

const appState = {
  screen: "start",
  modal: null,
  signedIn: false,
  file: null,
  sourceLanguage: "Detect language",
  targetLanguage: "French",
  languageSide: "source",
  languageQuery: "",
  recentLanguages: ["French", "English"],
  service: "instant",
  reviewLevel: "professional",
  analysisProgress: 0,
  translationProgress: 0,
  postAuthAction: null,
  paymentContext: null,
  paymentOrigin: null,
  reviewPurchased: false,
  planActive: false,
  passportComplete: false
};

const reviewOptions = {
  proofread: {
    name: "Native proofreading",
    description: "A native speaker checks accuracy, tone, names, and formatting.",
    price: 29,
    delivery: "Within 24 hours",
    icon: "seal-check"
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
    icon: "seal-check"
  }
};

const workspaceDocuments = [
  { name: "Passport Application.pdf", status: "partial", language: "English to French", updated: "Yesterday", words: "3,345", action: "Resume" },
  { name: "Tomi Abe Contract.pdf", status: "complete", language: "English to French", updated: "Today, 10:42", words: "1,340", action: "Open" },
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
    <button type="button" class="header-link" data-action="open-workspace">Documents</button>
    <button type="button" class="account-button" data-action="account-menu">Tomi ${icon("user-circle")}</button>
  `;
}

function stepper(activeStep) {
  const steps = ["Upload", "Check details", "Translate and review"];
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
                <span>${appState.sourceLanguage}</span>
                ${icon("caret-down")}
              </button>
            </div>
            <button type="button" class="swap-button" data-action="swap-languages" aria-label="Swap languages">${icon("arrows-left-right")}</button>
            <div>
              <span class="field-label">To</span>
              <button type="button" class="select-button" data-action="select-target">
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
            <p class="mobile-guidance-summary">We check the file, count the words, and show your options before you create an account.</p>
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
    <section class="screen journey-progress-screen">
      ${stepper(1)}
      ${pageTitle("Checking your document", "We are counting the words and preparing your translation options.")}
      <div class="journey-progress-layout">
        <section class="surface journey-progress-panel" aria-live="polite">
          ${fileCard(file, false, "Uploaded", "journey")}
          <div class="journey-progress-content">
            <div class="journey-progress-heading"><h2>Preparing your quote</h2><strong id="analysis-percent">${appState.analysisProgress}%</strong></div>
            <div class="progress-track"><div id="analysis-progress" class="progress-fill" style="width:${appState.analysisProgress}%"></div></div>
            <ul class="journey-progress-steps" id="analysis-steps">${analysisJourneySteps()}</ul>
          </div>
        </section>
        <aside class="surface journey-progress-aside">
          <h2>While we check your file</h2>
          <p>Your quote will show the word count, what is included for free, and clear options for anything over your allowance.</p>
          <small>This usually takes a few seconds.</small>
        </aside>
      </div>
    </section>
  `;
}

function quoteScreen() {
  const file = appState.file || demoFile();
  const isPassport = file.name === "Passport Application.pdf";
  const documentWords = isPassport ? "3,345" : "1,340";
  const freeWords = isPassport ? "2,500" : "1,340";
  const documentType = isPassport ? "Passport application" : "Legal agreement";
  const estimatedTime = isPassport ? "About 4 minutes" : "About 2 minutes";
  const reviewSelected = appState.service === "review";
  const total = reviewSelected ? "£29.00" : "£0.00";
  return `
    <section class="screen quote-screen">
      ${stepper(2)}
      ${pageTitle("Check the details", isPassport ? "We found 3,345 words. Your free allowance covers the first 2,500 words." : "We found 1,340 words. Your free allowance covers the full translation.")}
      <div class="quote-layout">
        <section class="surface quote-panel">
          ${fileCard(file, true, "Ready to translate", "quote")}
          <div class="mobile-details-summary"><strong>English → ${appState.targetLanguage} · ${documentType}</strong><span>${documentWords} words · ${estimatedTime}</span></div>
          <div class="details-grid">
            <div class="detail-box"><span>Detected language</span><strong>English</strong></div>
            <div class="detail-box"><span>Translate to</span><strong>${appState.targetLanguage}</strong></div>
            <div class="detail-box"><span>Document type</span><strong>${documentType}</strong></div>
            <div class="detail-box"><span>Estimated time</span><strong>${estimatedTime}</strong></div>
          </div>

          <div class="choice-group" aria-label="Choose translation service">
            <h2 class="choice-group-heading">Choose your translation</h2>
            <button type="button" class="choice-card ${reviewSelected ? "" : "is-selected"}" data-action="choose-service" data-service="instant">
              <span class="radio-mark">${reviewSelected ? "" : icon("check")}</span>
              <span class="choice-content"><strong>Fast translation</strong><span>Translate the document and preserve its layout.</span></span>
              <span class="choice-price">Included</span>
            </button>
            <button type="button" class="choice-card ${reviewSelected ? "is-selected" : ""}" data-action="choose-service" data-service="review">
              <span class="radio-mark">${reviewSelected ? icon("check") : ""}</span>
              <span class="choice-content"><strong>Add native proofreading</strong><span>A native speaker checks meaning, tone, names, and formatting within 24 hours.</span></span>
              <span class="choice-price"><span class="desktop-price">+ £29.00</span><span class="mobile-price">+ £29</span></span>
            </button>
          </div>
        </section>

        <aside class="surface price-panel">
          <h2>Your translation</h2>
          <ul class="price-list">
            <li><span>Document words</span><strong>${documentWords}</strong></li>
            <li><span>Free allowance used</span><strong>${freeWords}</strong></li>
            ${isPassport ? `<li><span>Words beyond allowance</span><strong>845</strong></li>` : ""}
            <li class="fast-price-line"><span>Fast translation</span><strong>£0.00</strong></li>
            ${reviewSelected ? `<li><span>Native proofreading</span><strong>£29.00</strong></li>` : ""}
          </ul>
          <div class="price-total"><span>Due now</span><span>${total}</span></div>
          <p class="price-note">VAT is calculated at checkout where applicable.</p>
          <button type="button" class="button button-primary button-full" data-action="continue-quote">Continue</button>
          <div class="inline-notice">${icon("info")}<span>Create an account next so you can recover your document and translation.</span></div>
        </aside>
      </div>
      <div class="quote-mobile-bar"><div><span>Due now</span><strong>${total}</strong></div><button type="button" class="button button-primary" data-action="continue-quote">Continue</button></div>
    </section>
  `;
}

function processingScreen() {
  return `
    <section class="screen journey-progress-screen">
      ${stepper(3)}
      ${pageTitle("Translating your document", "You can leave this page. We will keep working and save the result to your account.")}
      <div class="journey-progress-layout">
        <section class="surface journey-progress-panel" aria-live="polite">
          ${fileCard(appState.file || demoFile(), false, "Processing", "journey")}
          <div class="journey-progress-content">
            <div class="journey-progress-heading"><h2>Translation in progress</h2><strong id="translation-percent">${appState.translationProgress}%</strong></div>
            <div class="progress-track"><div id="translation-progress" class="progress-fill" style="width:${appState.translationProgress}%"></div></div>
            <ul class="journey-progress-steps" id="translation-timeline">${translationJourneySteps()}</ul>
          </div>
        </section>
        <aside class="surface journey-progress-aside">
          <h2>Your work is saved</h2>
          <p>We will save the finished translation to your documents. You can safely leave this page and come back.</p>
          <small>English to ${appState.targetLanguage} · PDF output</small>
        </aside>
      </div>
    </section>
  `;
}

function resultScreen() {
  const isPassport = appState.file?.name === "Passport Application.pdf";
  const translatedWords = isPassport ? "3,345" : "1,340";
  const translatedPreview = isPassport
    ? `<article class="preview-panel"><div class="preview-heading"><h3>French translation</h3><span>French</span></div><div class="document-page-preview" aria-label="Translated page layout preview"><strong>Demande de passeport</strong><span>Détails de la demande</span><i></i><i></i><i></i><i></i><i></i><small>Page 1 of 4</small></div></article>`
    : `<article class="preview-panel"><div class="preview-heading"><h3>French translation</h3><span>French</span></div><div class="document-page-preview" aria-label="Translated page layout preview"><strong>Contrat de service</strong><span>Parties au contrat</span><i></i><i></i><i class="short-line"></i><span>Conditions de service</span><i></i><i></i><i></i><i class="short-line"></i><small>Page 1 of 4</small></div></article>`;
  const originalPreview = isPassport
    ? `<article class="preview-panel"><div class="preview-heading"><h3>Original document</h3><span>English</span></div><div class="document-page-preview" aria-label="Original page layout preview"><strong>Passport Application</strong><span>Application details</span><i></i><i></i><i></i><i></i><i></i><small>Page 1 of 4</small></div></article>`
    : `<article class="preview-panel"><div class="preview-heading"><h3>Original document</h3><span>English</span></div><div class="document-page-preview" aria-label="Original page layout preview"><strong>Service Agreement</strong><span>Parties to this agreement</span><i></i><i></i><i class="short-line"></i><span>Terms of service</span><i></i><i></i><i></i><i class="short-line"></i><small>Page 1 of 4</small></div></article>`;
  return `
    <section class="screen result-screen">
      ${stepper(3)}
      ${pageTitle("Your translation is ready", `${escapeHtml(appState.file?.name || "Tomi Abe Contract.pdf")} is saved to your documents and ready to download.`)}
      <section class="surface result-panel">
        <div class="result-header">
          <div>
            <span class="status-line">${icon("check-circle")} Translation complete</span>
            <h2>${escapeHtml(appState.file?.name || "Tomi Abe Contract.pdf")}</h2>
            <p>English to ${appState.targetLanguage}</p>
          </div>
          <div class="result-actions">
            <button type="button" class="button button-primary" data-action="download-result">${icon("download-simple")} Download</button>
            <button type="button" class="button button-secondary" data-action="more-actions">${icon("dots-three")} <span>More</span></button>
          </div>
        </div>

        <div class="result-summary">
          <div class="summary-item"><span>Words translated</span><strong>${translatedWords}</strong></div>
          <div class="summary-item"><span>Layout</span><strong>Preserved</strong></div>
          <div class="summary-item"><span>File format</span><strong>PDF</strong></div>
        </div>

        <div class="preview-grid">
          ${translatedPreview}
          ${originalPreview}
        </div>

        ${appState.reviewPurchased ? `<div class="review-callout">${icon("seal-check")}<div class="review-callout-content"><strong>${reviewOptions[appState.reviewLevel].name} requested</strong><span>A reviewer will return the checked document ${reviewOptions[appState.reviewLevel].delivery.toLowerCase()}.</span></div><button type="button" class="button button-secondary button-small" data-action="open-workspace">View documents</button></div>` : `<div class="review-callout">${icon("scales")}<div class="review-callout-content"><strong>Need a human check?</strong><span>A professional can review terminology, names, and formatting before you use the document.</span></div><button type="button" class="button button-secondary button-small" data-action="open-review">Explore review</button></div>`}
      </section>
    </section>
  `;
}

function reviewScreen() {
  const selected = reviewOptions[appState.reviewLevel];
  return `
    <section class="screen review-screen">
      ${stepper(3)}
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
          <ul class="price-list"><li><span>Document</span><strong>${escapeHtml(appState.file?.name || "Tomi Abe Contract.pdf")}</strong></li><li><span>Scope</span><strong>${appState.file?.name === "Passport Application.pdf" ? "Passport application" : "Legal agreement"} · English to ${appState.targetLanguage}</strong></li><li><span>Estimated delivery</span><strong>${selected.delivery}</strong></li></ul>
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
  const documents = workspaceDocuments.map((document) => document.name === "Passport Application.pdf" && appState.passportComplete
    ? { ...document, status: "complete", updated: "Today", action: "Open" }
    : document);
  return `
    <section class="screen">
      <div class="workspace-header">
        <div><h1>Your documents</h1><p>Open a translation, continue unfinished work, or start something new.</p></div>
        <button type="button" class="button button-primary" data-action="new-translation">${icon("plus")} New translation</button>
      </div>
      ${appState.planActive ? `<div class="active-plan-banner"><div><span class="eyebrow">Annual plan active</span><h2>Ready for your next document</h2><p>Translate throughout the year with your 180,000-word plan.</p></div><div class="active-plan-allowance"><strong>180,000</strong><span>words for the year</span></div></div>` : ""}
      <div class="workspace-stats">
        <div class="surface workspace-stat"><span>Documents</span><strong>${documents.length}</strong></div>
        <div class="surface workspace-stat"><span>Reviews in progress</span><strong>${documents.filter((document) => document.status === "review").length}</strong></div>
      </div>
      <section class="surface documents-panel">
        <div class="documents-toolbar">
          <div class="search-wrap">${icon("magnifying-glass")}<input id="document-search" class="search-input" type="search" placeholder="Search documents" aria-label="Search documents" /></div>
          <div class="filter-wrap"><select id="status-filter" class="filter-select" aria-label="Filter documents"><option value="all">All statuses</option><option value="complete">Completed</option><option value="partial">Partial</option><option value="review">In review</option></select>${icon("caret-down")}</div>
        </div>
        <div class="table-scroll">
          <table class="document-table">
            <thead><tr><th>Document</th><th>Status</th><th>Languages</th><th>Updated</th><th>Words</th><th></th></tr></thead>
            <tbody id="document-table-body">${documentRows(documents)}</tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function limitScreen() {
  return `
    <section class="screen limit-screen">
      ${stepper(3)}
      ${pageTitle("Complete your translation", "The free allowance covered 2,500 words. There are 845 words left in this document.")}
      <div class="limit-layout">
        <section class="surface limit-panel">
          <div class="limit-intro"><span class="eyebrow">Free allowance reached</span><h2>845 words left to translate</h2><p>Your completed pages are saved. Choose how to finish this document.</p></div>
          <div class="file-card"><span class="file-type-icon">PDF</span><div class="file-card-content"><strong>Passport Application.pdf</strong><span>2,500 of 3,345 words translated</span></div></div>
          <div class="limit-progress">
            <div class="progress-header"><span>Translation progress</span><strong>75%</strong></div>
            <div class="progress-track"><div class="progress-fill" style="width:75%"></div></div>
            <div class="limit-numbers"><span>2,500 words translated</span><span>845 words remaining</span></div>
          </div>
          <div class="inline-notice">${icon("info")}<span>The translated pages will stay in your workspace while you decide.</span></div>
        </section>
        <aside class="option-stack">
          <article class="surface purchase-card"><h3>One-time payment</h3><p>Finish this document with exactly the 845 words you need.</p><div class="purchase-price">£3.38 <span>pay once</span></div><button type="button" class="button button-primary button-full" data-action="buy-remaining">Pay £3.38 and continue</button></article>
          <article class="surface purchase-card purchase-card-plan"><h3>Annual plan</h3><p>Finish this document and keep translating throughout the year. Includes 180,000 words.</p><div class="purchase-price">£95.88 <span>billed once a year</span></div><button type="button" class="button button-secondary button-full" data-action="buy-plan">View annual plan details</button></article>
        </aside>
      </div>
    </section>
  `;
}

function planScreen() {
  return `
    <section class="screen plan-screen">
      ${stepper(3)}
      ${pageTitle("Translate beyond this document", "See how the annual plan covers your remaining words and future translations.")}
      <div class="plan-layout">
        <section class="surface plan-details">
          <div class="plan-intro"><span class="eyebrow">For ongoing translation</span><h2>Annual plan</h2><p>Finish this document now, then use the plan for translations throughout the year.</p></div>
          <div class="plan-allowance"><strong>180,000</strong><span>words for the year</span></div>
          <div class="plan-coverage"><div><strong>Current document</strong><span>The remaining 845 words in Passport Application.pdf</span></div><div><strong>Future translations</strong><span>Continue translating other documents during the year</span></div><div><strong>Saved work</strong><span>Return to your documents and translation history</span></div></div>
          <div class="plan-file"><span class="file-type-icon">PDF</span><div><strong>Passport Application.pdf</strong><span>2,500 translated, 845 remaining</span></div></div>
        </section>
        <aside class="surface plan-summary"><h2>Your plan</h2><div class="plan-summary-lines"><div><span>Annual allowance</span><strong>180,000 words</strong></div><div><span>Billing</span><strong>Annually</strong></div></div><div class="plan-summary-total"><strong>Total today</strong><strong>£95.88</strong></div><p>VAT calculated at checkout where applicable.</p><button type="button" class="button button-primary button-full" data-action="continue-plan">Continue to payment</button><button type="button" class="text-button button-full" data-action="buy-remaining">Pay only for this document</button></aside>
      </div>
    </section>
  `;
}

function fileCard(file, editable, status = "Ready to translate", variant = "default") {
  if (variant === "quote") {
    return `
      <div class="file-card quote-file-card">
        <span class="file-type-icon">${icon("file-pdf")}</span>
        <div class="file-card-content"><strong>${escapeHtml(file.name)}</strong><span>${file.type || "PDF"} document · ${file.size || "2.4 MB"}</span></div>
        <button type="button" class="quote-change-file" data-action="change-file"><span class="change-file-full">Change file</span><span class="change-file-short">Change</span></button>
      </div>
    `;
  }
  if (variant === "journey") {
    return `
      <div class="file-card journey-file-card">
        <span class="file-type-icon">${file.type || "PDF"}</span>
        <div class="file-card-content"><strong>${escapeHtml(file.name)}</strong><span>1 file · English to ${appState.targetLanguage}</span></div>
        <span class="journey-file-status">${status}</span>
      </div>
    `;
  }
  return `
    <div class="file-card">
      <span class="file-type-icon">${file.type || "PDF"}</span>
      <div class="file-card-content"><strong>${escapeHtml(file.name)}</strong><span>${file.size || "2.4 MB"} · ${status}</span></div>
      ${editable ? `<button type="button" class="remove-file" data-action="change-file" aria-label="Change document">${icon("pencil-simple")}</button>` : ""}
    </div>
  `;
}

function journeyStep(label, state) {
  const stateIcon = state === "complete" ? icon("check-circle") : state === "active" ? icon("circle-notch") : icon("circle");
  return `<li class="journey-progress-step is-${state}"><span class="journey-step-icon">${stateIcon}</span><span>${label}</span></li>`;
}

function analysisJourneySteps() {
  const progress = appState.analysisProgress;
  return [
    journeyStep("Document uploaded securely", "complete"),
    journeyStep("Counting words and checking file quality", progress >= 70 ? "complete" : "active"),
    journeyStep("Preparing translation options", progress >= 70 ? "active" : "pending")
  ].join("");
}

function translationJourneySteps() {
  const progress = appState.translationProgress;
  return [
    journeyStep("File uploaded", "complete"),
    journeyStep("Document prepared", progress >= 35 ? "complete" : "active"),
    journeyStep("Translating content", progress >= 35 ? "active" : "pending")
  ].join("");
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
  if (appState.modal === "plan-confirm") return planConfirmDialog();
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
      <button type="button" class="button social-button" data-action="social-auth">${icon("google-logo")}<span>Google</span></button>
      <button type="button" class="button social-button" data-action="social-auth">${icon("apple-logo")}<span>Apple</span></button>
      <button type="button" class="button social-button" data-action="social-auth">${icon("facebook-logo")}<span>Facebook</span></button>
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
    "English", "French", "Spanish", "German", "Italian", "Portuguese", "Dutch", "Finnish", "Arabic", "Chinese",
    "Greek", "Hindi", "Japanese", "Korean", "Polish", "Romanian", "Russian", "Swedish", "Turkish", "Ukrainian"
  ];
  const otherLanguages = languages.filter((language) => !appState.recentLanguages.includes(language));
  const matchesQuery = (language) => language.toLowerCase().includes(appState.languageQuery.toLowerCase());
  const visibleLanguages = [...appState.recentLanguages, ...otherLanguages].filter(matchesQuery);
  return dialog(`
    <button type="button" class="dialog-close" data-action="close-modal" aria-label="Close">${icon("x")}</button>
    <h2>Choose a language</h2>
    <p>Select the ${appState.languageSide === "source" ? "document language" : "language you want"}.</p>
    <div class="language-picker">
      <label class="language-search-label">${icon("magnifying-glass")}<span class="visually-hidden">Search languages</span><input class="text-input" id="language-search" type="search" placeholder="Search languages" value="${escapeHtml(appState.languageQuery)}" /></label>
      ${appState.recentLanguages.length ? `<h3 class="language-section-label">Recent</h3>` : ""}
      <div class="language-list language-recent-list">
        ${appState.languageSide === "source" ? `<button type="button" class="language-option" data-action="choose-language" data-language="Detect language" ${matchesQuery("Detect language") ? "" : "hidden"}><span>Detect language</span></button>` : ""}
        ${appState.recentLanguages.map((language) => `<button type="button" class="language-option" data-action="choose-language" data-language="${language}" ${matchesQuery(language) ? "" : "hidden"}><span>${language}</span><small>Recent</small></button>`).join("")}
      </div>
      <h3 class="language-section-label">All languages</h3>
      <div class="language-list">
        ${otherLanguages.map((language) => `<button type="button" class="language-option" data-action="choose-language" data-language="${language}" ${matchesQuery(language) ? "" : "hidden"}><span>${language}</span></button>`).join("")}
        <p class="language-empty" ${visibleLanguages.length || (appState.languageSide === "source" && matchesQuery("Detect language")) ? "hidden" : ""}>No languages match “${escapeHtml(appState.languageQuery)}”.</p>
      </div>
    </div>
  `);
}

function planConfirmDialog() {
  return dialog(`
    <button type="button" class="dialog-close" data-action="close-modal" aria-label="Close">${icon("x")}</button>
    <h2>Start the annual plan</h2>
    <p>Review the amount due before continuing to payment.</p>
    <div class="plan-confirm-summary"><div><span>Plan</span><strong>180,000 words for the year</strong></div><div><span>Current document</span><strong>845 words included</strong></div><div><span>Billing</span><strong>Annually</strong></div><div class="plan-confirm-total"><strong>Total today</strong><strong>£95.88</strong></div></div>
    <button type="button" class="button button-primary button-full" data-action="confirm-plan">Continue to payment</button>
    <button type="button" class="text-button button-full" data-action="close-modal">Back to plan details</button>
  `);
}

function paymentDialog() {
  let title = "Confirm professional review";
  let item = reviewOptions[appState.reviewLevel].name;
  let price = `£${reviewOptions[appState.reviewLevel].price.toFixed(2)}`;
  let note = "One-time payment";
  let description = "Review the amount due for your document review.";

  if (appState.paymentContext === "remaining") {
    title = "Finish this document";
    item = "845 translation words";
    price = "£3.38";
    note = "One-time payment";
    description = "Review the amount due to translate the remaining 845 words.";
  }

  if (appState.paymentContext === "plan") {
    title = "Start the annual plan";
    item = "180,000 words per year";
    price = "£95.88";
    note = "Annually";
    description = "Review the amount due for your annual translation plan.";
  }

  return dialog(`
    <button type="button" class="dialog-close" data-action="close-modal" aria-label="Close">${icon("x")}</button>
    <h2>${title}</h2>
    <p>${description}</p>
    <div class="payment-summary"><span>Item</span><strong>${item}</strong><span>Billing</span><strong>${note}</strong><div class="payment-summary-total"><span>Total today</span><strong>${price}</strong></div></div>
    <button type="button" class="button button-primary button-full" data-action="confirm-payment">Confirm and continue</button>
    <button type="button" class="text-button button-full" data-action="close-modal">Go back</button>
  `);
}

function paymentSuccessDialog() {
  const reviewPayment = appState.paymentContext === "review";
  const reviewBeforeTranslation = reviewPayment && appState.paymentOrigin === "quote";
  const planPayment = appState.paymentContext === "plan";
  return dialog(`
    <span class="success-dialog-icon">${icon("check")}</span>
    <h2>${reviewBeforeTranslation ? "Review added" : reviewPayment ? "Review requested" : planPayment ? "Annual plan active" : "Payment confirmed"}</h2>
    <p>${reviewBeforeTranslation ? "The review is included. We can now translate your document." : reviewPayment ? "The translated document has been sent to the selected reviewer." : planPayment ? "Your plan covers the remaining 845 words. Continue to finish this document." : "Your words have been added and the document is ready to continue."}</p>
    <button type="button" class="button button-primary button-full" data-action="finish-payment">${reviewBeforeTranslation ? "Start translation" : reviewPayment ? "Return to translation" : "Continue translation"}</button>
  `);
}

function fileErrorDialog() {
  return dialog(`
    <button type="button" class="dialog-close" data-action="close-modal" aria-label="Close">${icon("x")}</button>
    <span class="error-dialog-icon">${icon("warning-circle")}</span>
    <h2>We cannot use this file</h2>
    <p>Choose a PDF, Word, PowerPoint, Excel, TXT, or RTF file smaller than 100 MB.</p>
    <button type="button" class="button button-primary button-full" data-action="choose-file">Choose another document</button>
  `);
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
  document.body?.classList?.toggle("modal-open", Boolean(appState.modal));
  renderHeader();
  let screenMarkup = startScreen();
  if (appState.screen === "analysing") screenMarkup = analysingScreen();
  if (appState.screen === "quote") screenMarkup = quoteScreen();
  if (appState.screen === "processing") screenMarkup = processingScreen();
  if (appState.screen === "result") screenMarkup = resultScreen();
  if (appState.screen === "review") screenMarkup = reviewScreen();
  if (appState.screen === "workspace") screenMarkup = workspaceScreen();
  if (appState.screen === "limit") screenMarkup = limitScreen();
  if (appState.screen === "plan") screenMarkup = planScreen();
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
  if (action === "use-sample") {
    appState.sourceLanguage = "English";
    appState.targetLanguage = "French";
    return startAnalysis({ name: "Passport Application.pdf", size: "6.8 MB", type: "PDF" });
  }
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
  if (action === "buy-plan") return setScreen("plan");
  if (action === "continue-plan") return setModal("plan-confirm");
  if (action === "confirm-plan") return beginPayment("plan");
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
  appState.languageQuery = "";
  setModal("language");
}

function chooseLanguage(language) {
  if (language !== "Detect language") appState.recentLanguages = [language, ...appState.recentLanguages.filter((recent) => recent !== language)].slice(0, 2);
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
  if (appState.paymentContext === "review") appState.reviewPurchased = true;
  if (appState.paymentContext === "plan") appState.planActive = true;
  setModal("payment-success");
}

function finishPayment() {
  const reviewPayment = appState.paymentContext === "review";
  appState.modal = null;
  if (reviewPayment && appState.paymentOrigin === "quote") startTranslation();
  else if (reviewPayment) setScreen("result");
  else {
    appState.passportComplete = true;
    startTranslation();
  }
}

function openWorkspace() {
  appState.modal = null;
  setScreen("workspace");
}

function openDocument(index) {
  const document = workspaceDocuments[index];
  if (!document) return;
  if (document.name === "Passport Application.pdf" && appState.passportComplete) {
    appState.file = { name: document.name, size: "6.8 MB", type: "PDF" };
    return setScreen("result");
  }
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
    const allowanceReached = appState.file?.name === "Passport Application.pdf" && !appState.passportComplete;
    const endProgress = allowanceReached ? 75 : 100;
    appState.translationProgress = Math.min(endProgress, appState.translationProgress + 8);
    updateTranslationProgress();
    if (appState.translationProgress >= endProgress) {
      clearProgressTimer();
      window.setTimeout(() => setScreen(allowanceReached ? "limit" : "result"), 350);
    }
  }, 300);
}

function updateAnalysisProgress() {
  const fill = document.querySelector("#analysis-progress");
  const percent = document.querySelector("#analysis-percent");
  const steps = document.querySelector("#analysis-steps");
  if (fill) fill.style.width = `${appState.analysisProgress}%`;
  if (percent) percent.textContent = `${appState.analysisProgress}%`;
  if (steps) steps.innerHTML = analysisJourneySteps();
}

function updateTranslationProgress() {
  const fill = document.querySelector("#translation-progress");
  const percent = document.querySelector("#translation-percent");
  const timeline = document.querySelector("#translation-timeline");
  if (fill) fill.style.width = `${appState.translationProgress}%`;
  if (percent) percent.textContent = `${appState.translationProgress}%`;
  if (timeline) timeline.innerHTML = translationJourneySteps();
}

function clearProgressTimer() {
  if (progressTimer) window.clearInterval(progressTimer);
  progressTimer = null;
}

function bindScreenEvents() {
  const languageSearch = document.querySelector("#language-search");
  if (languageSearch) languageSearch.addEventListener("input", (event) => {
    appState.languageQuery = event.currentTarget.value;
    const query = appState.languageQuery.toLowerCase();
    document.querySelectorAll(".language-option[data-language]").forEach((option) => {
      option.hidden = !option.dataset.language.toLowerCase().includes(query);
    });
    const empty = document.querySelector(".language-empty");
    if (empty) empty.hidden = [...document.querySelectorAll(".language-option[data-language]")].some((option) => !option.hidden);
  });
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
const previewPayment = previewParams.get("payment");
const previewScreens = ["start", "analysing", "quote", "processing", "result", "review", "workspace", "limit", "plan"];
const previewModals = ["signup", "signin", "language", "plan-confirm", "payment", "payment-success", "file-error", "account"];

if (previewScreens.includes(previewScreen)) {
  appState.screen = previewScreen;
  appState.file = previewScreen === "start" ? null : { name: "Passport Application.pdf", size: "6.8 MB", type: "PDF" };
  appState.analysisProgress = 58;
  appState.translationProgress = 75;
  appState.signedIn = ["processing", "result", "review", "workspace", "limit", "plan"].includes(previewScreen);
  if (["result", "workspace"].includes(previewScreen)) appState.passportComplete = true;
  if (previewScreen === "workspace") appState.planActive = true;
}

if (previewModals.includes(previewModal)) {
  appState.modal = previewModal;
  if (["remaining", "plan", "review"].includes(previewPayment)) appState.paymentContext = previewPayment;
}

render();
