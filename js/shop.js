// shop.js
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(
    "#bouquet-builder input[type='number'], #bouquet-builder input[type='checkbox']",
  );
  const totalPriceEl = document.getElementById("bouquet-price");
  const form = document.getElementById("bouquet-builder");

  function calculateTotal() {
    let total = 0;

    // Считаем количество цветов
    inputs.forEach((input) => {
      const price = parseFloat(input.dataset.price) || 0;
      if (input.type === "number") {
        const qty = parseInt(input.value) || 0;
        total += qty * price;
      } else if (input.type === "checkbox" && input.checked) {
        total += price;
      }
    });

    totalPriceEl.textContent = `€${total.toFixed(2)}`;
  }

  // Обновляем цену при изменении
  inputs.forEach((input) => {
    input.addEventListener("input", calculateTotal);
    input.addEventListener("change", calculateTotal);
  });

  // Предотвращаем стандартное поведение формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      `Your bouquet total is ${totalPriceEl.textContent}!\nThank you for shopping with Betty Bouquets 🌸`,
    );
  });

  // Начальная цена
  calculateTotal();
});
