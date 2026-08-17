const root = document.documentElement;
let sharedInterfaceReady = false;

function saveTheme(theme) {
  try {
    localStorage.setItem("engmeca-theme", theme);
  } catch (error) {
    // A troca de tema continua funcionando quando o armazenamento está indisponível.
  }
}

function initializeSharedInterface() {
  if (sharedInterfaceReady) {
    return;
  }

  sharedInterfaceReady = true;

  const themeToggle = document.getElementById("theme-toggle");
  const themeColor = document.getElementById("theme-color");
  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("primary-navigation");

  function applyTheme(theme, persist = false) {
    const isLight = theme === "light";

    root.dataset.theme = isLight ? "light" : "dark";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", isLight ? "Ativar tema escuro" : "Ativar tema claro");
      themeToggle.title = isLight ? "Ativar tema escuro" : "Ativar tema claro";
    }

    if (themeColor) {
      themeColor.content = isLight ? "#f4f7fb" : "#08111f";
    }

    if (persist) {
      saveTheme(isLight ? "light" : "dark");
    }
  }

  function setMenu(open, returnFocus = false) {
    if (!navigation || !menuToggle) {
      return;
    }

    navigation.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", open);

    if (returnFocus) {
      menuToggle.focus();
    }
  }

  applyTheme(root.dataset.theme === "light" ? "light" : "dark");

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme, true);
  });

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  navigation?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
    const clickedInsideHeader = event.target.closest?.(".site-header");

    if (isOpen && !clickedInsideHeader) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800 && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
    }
  });

  const currentPage = document.body.dataset.page;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

if (document.querySelector("[data-include]")) {
  document.addEventListener("engmeca:components-ready", initializeSharedInterface, { once: true });
} else {
  initializeSharedInterface();
}
