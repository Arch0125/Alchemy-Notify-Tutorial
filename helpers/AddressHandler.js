export const AddressHandler=(body)=>{
    fetch("https://dashboard.alchemyapi.io/api/update-webhook-addresses", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      headers: { "X-Alchemy-Token": "vNH0hCXC-wJeYLNAgsyxP0RG5JB1hKAU" },
    })
      .then((res) => res.json())
      .then((json) => console.log("Successfully added address:", json))
      .catch((err) => console.log("Error! Unable to add address:", err));
}