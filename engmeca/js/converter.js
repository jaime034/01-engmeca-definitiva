const conversionType = document.getElementById("conversion-type");
const sourceUnit = document.getElementById("source-unit");
const targetUnit = document.getElementById("target-unit");
const sourceValue = document.getElementById("source-value");
const conversionResult = document.getElementById("conversion-result");
const converterForm = document.getElementById("converter-form");
const swapUnits = document.getElementById("swap-units");

const unitGroups = {
  length: {
    label: "Comprimento",
    units: {
      m: { label: "Metro (m)", factor: 1 },
      cm: { label: "Centímetro (cm)", factor: 0.01 },
      mm: { label: "Milímetro (mm)", factor: 0.001 },
      km: { label: "Quilômetro (km)", factor: 1000 },
      in: { label: "Polegada (in)", factor: 0.0254 },
      ft: { label: "Pé (ft)", factor: 0.3048 },
    },
  },
  mass: {
    label: "Massa",
    units: {
      kg: { label: "Quilograma (kg)", factor: 1 },
      g: { label: "Grama (g)", factor: 0.001 },
      t: { label: "Tonelada (t)", factor: 1000 },
      lb: { label: "Libra (lb)", factor: 0.45359237 },
    },
  },
  pressure: {
    label: "Pressão",
    units: {
      pa: { label: "Pascal (Pa)", factor: 1 },
      kpa: { label: "Quilopascal (kPa)", factor: 1000 },
      mpa: { label: "Megapascal (MPa)", factor: 1000000 },
      bar: { label: "Bar", factor: 100000 },
      psi: { label: "PSI", factor: 6894.757293 },
    },
  },
};

function fillUnitOptions() {
  const units = unitGroups[conversionType.value].units;
  const options = Object.entries(units)
    .map(([value, unit]) => `<option value="${value}">${unit.label}</option>`)
    .join("");

  sourceUnit.innerHTML = options;
  targetUnit.innerHTML = options;
  targetUnit.selectedIndex = Math.min(1, targetUnit.options.length - 1);
  calculateConversion();
}

function calculateConversion() {
  const value = Number(sourceValue.value);

  if (!Number.isFinite(value)) {
    conversionResult.textContent = "Informe um valor numérico válido.";
    return;
  }

  const units = unitGroups[conversionType.value].units;
  const baseValue = value * units[sourceUnit.value].factor;
  const result = baseValue / units[targetUnit.value].factor;
  const formatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 6 });

  conversionResult.textContent = `${formatter.format(value)} ${sourceUnit.value} = ${formatter.format(
    result,
  )} ${targetUnit.value}`;
}

conversionType?.addEventListener("change", fillUnitOptions);
sourceUnit?.addEventListener("change", calculateConversion);
targetUnit?.addEventListener("change", calculateConversion);
sourceValue?.addEventListener("input", calculateConversion);

converterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateConversion();
});

swapUnits?.addEventListener("click", () => {
  const previousSource = sourceUnit.value;
  sourceUnit.value = targetUnit.value;
  targetUnit.value = previousSource;
  calculateConversion();
});

if (conversionType) {
  fillUnitOptions();
}
