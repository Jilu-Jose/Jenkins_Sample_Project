/* ===========================
   INKWELL BLOG — SCRIPT
   =========================== */

let postCount = 0;
let pendingDeleteCard = null;

// --- DOM References ---
const titleInput    = document.getElementById("title");
const contentInput  = document.getElementById("content");
const blogList      = document.getElementById("blogList");
const emptyState    = document.getElementById("emptyState");
const postCountEl   = document.getElementById("postCount");
const charCountEl   = document.getElementById("charCount");
const modalOverlay  = document.getElementById("modalOverlay");
const confirmBtn    = document.getElementById("confirmDelete");

// --- Char Counter ---
contentInput.addEventListener("input", () => {
  const len = contentInput.value.length;
  charCountEl.textContent = `${len} character${len !== 1 ? "s" : ""}`;
});

// --- Add Blog ---
function addBlog() {
  const title   = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    shakeInput(!title ? titleInput : contentInput);
    return;
  }

  const now  = new Date();
  const date = now.toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit"
  });

  const card = document.createElement("div");
  card.classList.add("blog-card");

  card.innerHTML = `
    <div class="blog-card-header">
      <h2>${escapeHTML(title)}</h2>
    </div>
    <div class="blog-meta">
      <span class="tag">Post</span>
      ${date} · ${time}
    </div>
    <p>${escapeHTML(content)}</p>
    <div class="blog-card-footer">
      <button class="delete-btn" onclick="promptDelete(this)">
        ✕ Delete
      </button>
    </div>
  `;

  // Prepend to list
  blogList.prepend(card);

  // Update state
  postCount++;
  updatePostCount();
  toggleEmptyState();

  // Reset form
  titleInput.value   = "";
  contentInput.value = "";
  charCountEl.textContent = "0 characters";

  // Smooth scroll to new post
  card.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// --- Delete Flow ---
function promptDelete(button) {
  pendingDeleteCard = button.closest(".blog-card");
  modalOverlay.classList.add("active");
}

function closeModal() {
  modalOverlay.classList.remove("active");
  pendingDeleteCard = null;
}

confirmBtn.addEventListener("click", () => {
  if (pendingDeleteCard) {
    pendingDeleteCard.style.animation = "none";
    pendingDeleteCard.style.transition = "opacity 0.25s, transform 0.25s";
    pendingDeleteCard.style.opacity = "0";
    pendingDeleteCard.style.transform = "translateX(12px)";

    setTimeout(() => {
      pendingDeleteCard.remove();
      postCount = Math.max(0, postCount - 1);
      updatePostCount();
      toggleEmptyState();
      pendingDeleteCard = null;
    }, 260);

    closeModal();
  }
});

// Close modal on backdrop click
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// --- Keyboard Support ---
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") addBlog();
});

// --- Helpers ---
function updatePostCount() {
  postCountEl.textContent = `${postCount} post${postCount !== 1 ? "s" : ""}`;
}

function toggleEmptyState() {
  emptyState.style.display = postCount === 0 ? "block" : "none";
}

function shakeInput(el) {
  el.style.animation = "none";
  el.offsetHeight; // Reflow
  el.style.animation = "shake 0.38s ease";
  el.focus();
  el.addEventListener("animationend", () => {
    el.style.animation = "";
  }, { once: true });
}

// Inject shake keyframe dynamically
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%   { transform: translateX(0); border-color: #c0392b; }
    20%  { transform: translateX(-6px); }
    40%  { transform: translateX(6px); }
    60%  { transform: translateX(-4px); }
    80%  { transform: translateX(4px); }
    100% { transform: translateX(0); }
  }
`;
document.head.appendChild(shakeStyle);

function escapeHTML(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}