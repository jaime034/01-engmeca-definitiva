(() => {
  try {
    const savedTheme = localStorage.getItem("engmeca-theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";

    document.documentElement.dataset.theme =
      savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
  }
})();
