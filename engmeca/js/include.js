async function loadHtmlPartial(container) {
  const partialPath = container.dataset.include;

  try {
    const response = await fetch(partialPath);

    if (!response.ok) {
      throw new Error(`Não foi possível carregar ${partialPath} (${response.status}).`);
    }

    container.innerHTML = await response.text();
    container.removeAttribute("data-include");
  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="component-error" role="alert">
        <strong>Componente não carregado.</strong>
        <span>Execute o projeto em um servidor local, como o Live Server.</span>
      </div>
    `;
  }
}

async function loadSharedComponents() {
  const containers = [...document.querySelectorAll("[data-include]")];
  await Promise.all(containers.map(loadHtmlPartial));
  document.dispatchEvent(new CustomEvent("engmeca:components-ready"));
}

loadSharedComponents();
