const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Разрешаем JSON
app.use(express.json());

// Чтобы отдавать статические файлы (твой HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Путь к JSON "базе данных"
const ordersFile = path.join(__dirname, "orders.json");

// POST /save-order — сохраняем заказ
app.post("/save-order", (req, res) => {
  const order = req.body;
  let orders = [];

  try {
    if (fs.existsSync(ordersFile)) {
      orders = JSON.parse(fs.readFileSync(ordersFile, "utf8"));
    }
  } catch (err) {
    console.error("Error reading orders.json:", err);
  }

  orders.push(order);

  try {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    console.log("Order saved:", order);
    res.json({ success: true, message: "Order saved!" });
  } catch (err) {
    console.error("Error writing orders.json:", err);
    res.status(500).json({ success: false, message: "Failed to save order" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
