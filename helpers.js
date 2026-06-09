async function apiGet(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API GET responded with status ${response.status}`);
  }
  return response.json();
}

async function apiPost(url) {
  const response = await fetch(url, { method: "POST" });
  if (!response.ok) {
    throw new Error(`API POST responded with status ${response.status}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

function formatAddress(address) {
  return [
    address.address1,
    address.address2,
    address.city,
    address.region?.region_name + " " + address.postal_code,
    address.country.country_name + `</br>${address.phone}, ${address.first_name} ${address.last_name}`
  ].filter(Boolean).join(", ");
}

module.exports = {
  apiGet,
  apiPost,
  formatAddress,
};