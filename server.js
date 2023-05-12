const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const PORT = process.env.PORT || 8002;
const fetch = require("node-fetch");
const AddressHandler = require("./helpers/AddressHandler");
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
  const event = res.event;
    const network = event.network;
    const activity = event.activity[0];
    const toaddr = activity.toAddress;
    const value = activity.value;
    const asset = activity.asset;
  console.log("toaddr: " + toaddr);
  console.log("value: " + value);
  console.log("asset: " + asset);
  
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
    await AddressHandler(body);
    await AddressHandler(body2);
    await AddressHandler(body3);
    await AddressHandler(body4);
  } catch (err) {
    console.error(err);
  }
}
