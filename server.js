const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const PORT = process.env.PORT || 8002;
const fetch = require("node-fetch");
require("dotenv").config();

var app = express()
  .use(express.static(path.join(__dirname, "public")))
  .use(express.json())
  .post("/alchemyhook", (req, res) => {
    notificationReceived(req);
    res.status(200).end();
  })
  .get("/*", (req, res) => res.sendFile(path.join(__dirname + "/index.html")))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(app);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("register address", (msg) => {
    addAddress(msg);
  });
});

function notificationReceived(req) {
  console.log("notification received!");
  const res = req.body;
  console.log(res);
  io.emit("notification", JSON.stringify(req.body));
}

async function addAddress(new_address) {
  console.log("adding address " + new_address);

  const body = {
    webhook_id: process.env.ETH_MAINNET_WEBHOOK_ID,
    addresses_to_add: [new_address],
    addresses_to_remove: [],
  };
  const body2 = {
    webhook_id: process.env.ETH_GOERLI_WEBHOOK_ID,
    addresses_to_add: [new_address],
    addresses_to_remove: [],
  };
  const body3 = {
    webhook_id: process.env.MATIC_MAINNET_WEBHOOK_ID,
    addresses_to_add: [new_address],
    addresses_to_remove: [],
  };
  const body4 = {
    webhook_id: process.env.MATIC_MUMBAI_WEBHOOK_ID,
    addresses_to_add: [new_address],
    addresses_to_remove: [],
  };

  try {
    fetch("https://dashboard.alchemyapi.io/api/update-webhook-addresses", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      headers: { "X-Alchemy-Token": "vNH0hCXC-wJeYLNAgsyxP0RG5JB1hKAU" },
    })
      .then((res) => res.json())
      .then((json) => console.log("Successfully added address:", json))
      .catch((err) => console.log("Error! Unable to add address:", err));

    fetch("https://dashboard.alchemyapi.io/api/update-webhook-addresses", {
      method: "PATCH",
      body: JSON.stringify(body2),
      headers: { "Content-Type": "application/json" },
      headers: { "X-Alchemy-Token": "vNH0hCXC-wJeYLNAgsyxP0RG5JB1hKAU" },
    })
      .then((res) => res.json())
      .then((json) => console.log("Successfully added address:", json))
      .catch((err) => console.log("Error! Unable to add address:", err));

    fetch("https://dashboard.alchemyapi.io/api/update-webhook-addresses", {
      method: "PATCH",
      body: JSON.stringify(body3),
      headers: { "Content-Type": "application/json" },
      headers: { "X-Alchemy-Token": "vNH0hCXC-wJeYLNAgsyxP0RG5JB1hKAU" },
    })
      .then((res) => res.json())
      .then((json) => console.log("Successfully added address:", json))
      .catch((err) => console.log("Error! Unable to add address:", err));

    fetch("https://dashboard.alchemyapi.io/api/update-webhook-addresses", {
      method: "PATCH",
      body: JSON.stringify(body4),
      headers: { "Content-Type": "application/json" },
      headers: { "X-Alchemy-Token": "vNH0hCXC-wJeYLNAgsyxP0RG5JB1hKAU" },
    })
      .then((res) => res.json())
      .then((json) => console.log("Successfully added address:", json))
      .catch((err) => console.log("Error! Unable to add address:", err));
  } catch (err) {
    console.error(err);
  }
}
