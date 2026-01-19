document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(
    "#bouquet-builder input[type='number'], #bouquet-builder input[type='checkbox']",
  );
  const totalPriceEl = document.getElementById("bouquet-price");
  const form = document.getElementById("bouquet-builder");

  // Создаём модальное окно
  const modal = document.createElement("div");
  modal.id = "thankyou-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Thank you for your order! 🌸</h3>
      <p>Your bouquet total is <strong>${totalPriceEl.textContent}</strong></p>
      <label for="phone-input">Please enter your phone number so we can contact you:</label>
      <input type="tel" id="phone-input" placeholder="+353 87 123 4567" />
      <div class="modal-buttons">
        <button id="modal-submit">Submit</button>
        <button id="modal-close">Cancel</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalClose = modal.querySelector("#modal-close");
  const modalSubmit = modal.querySelector("#modal-submit");
  const phoneInput = modal.querySelector("#phone-input");
  const modalTotal = modal.querySelector("strong");

  // =========================
  // Calculate Total Price
  // =========================
  function calculateTotal() {
    let total = 0;
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
    if (modalTotal) modalTotal.textContent = totalPriceEl.textContent;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", calculateTotal);
    input.addEventListener("change", calculateTotal);
  });

  // =========================
  // Custom Bouquet Submit
  // =========================
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (totalPriceEl.textContent === "€0") {
      alert("Please select at least one flower or extra!");
      return;
    }
    modal.style.display = "flex";

    modalSubmit.onclick = () => {
      const phone = phoneInput.value.trim();
      if (!phone) {
        alert("Please enter your phone number before submitting!");
        return;
      }

      modal.style.display = "none";
      phoneInput.value = "";
      alert(
        `Thank you! We will contact you at ${phone}. Your order total is ${price}`,
      );
      form.reset();
      calculateTotal();
    };
  });

  // =========================
  // Buy Buttons for Ready Bouquets
  // =========================
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".bouquet-card");
      const title = card.querySelector("h3").textContent;
      const price = card.querySelector("p").textContent;

      // Обновляем текст модалки
      modalTotal.textContent = price;
      modal.style.display = "flex";

      modalSubmit.onclick = () => {
        const phone = phoneInput.value.trim();
        if (!phone) {
          alert("Please enter your phone number before submitting!");
          return;
        }

        modal.style.display = "none";
        phoneInput.value = "";
        alert(
          `Thank you! We will contact you at ${phone}. Your order total is ${price}`,
        );
      };
    });
  });

  // =========================
  // Modal Close
  // =========================
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  calculateTotal();
});
