const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("message");
const characterCount = document.getElementById("character-count");
const formStatus = document.getElementById("form-status");

contactMessage?.addEventListener("input", () => {
  characterCount.textContent = `${contactMessage.value.length}/600`;
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    formStatus.textContent = "Revise os campos obrigatórios antes de continuar.";
    return;
  }

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const subject = formData.get("subject").trim();
  const message = formData.get("message").trim();
  const body = `Nome: ${name}\nE-mail: ${email}\n\n${message}`;
  const mailto = `mailto:contato@engmeca.com?subject=${encodeURIComponent(
    `[ENGMECA] ${subject}`,
  )}&body=${encodeURIComponent(body)}`;

  formStatus.textContent = "Abrindo seu aplicativo de e-mail para concluir o envio...";
  window.location.href = mailto;
});
