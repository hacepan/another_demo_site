const { apiGet, apiPost, formatAddress } = require("./helpers");

const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const { Piano } = require("piano-sdk");

const VX_API_BASE = "https://sandbox.piano.io/api/v3";
const ID_API_BASE = "https://sandbox.piano.io/id/api/v1";
const API_TOKEN = "API_TOKEN";
const AID = "75ddSNJ4su";

const app = express();
const PORT = 3000;

// Use ejs-mate for layout support
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'An online magazine',
    headlines: [
      { id: 1, title: 'Local Cat Elected Mayor', summary: 'In a stunning upset...' },
      { id: 2, title: 'Scientists Discover Coffee is Now a Vegetable', summary: 'Breaking research...' },
      { id: 3, title: 'Moon Found to be Made of Cheese After All', summary: 'NASA confirms...' }
    ]
  });
});

app.get('/article/:id', (req, res) => {
  res.render('article', {
    title: 'An online magazine',
    articleId: req.params.id
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'An online magazine' });
});

app.get('/subscribe', (req, res) => {
  res.render('sublandingpage', { title: 'An online magazine' });
});

app.get('/my-account', (req, res) => {
  res.render('myaccount', { title: 'An online magazine' });
});

app.get("/api/address-list", async (req, res) => {
  const { uid, limit = 100, offset = 0, selected_address } = req.query;

  try {
    const addressURL = new URL(`${VX_API_BASE}/publisher/user/address/list`);
    addressURL.searchParams.set("aid", AID);
    addressURL.searchParams.set("api_token", API_TOKEN);
    addressURL.searchParams.set("uid", uid);
    addressURL.searchParams.set("limit", limit);
    addressURL.searchParams.set("offset", offset);

    const addressData = await apiGet(addressURL);

    const matchedAddress = addressData.user_addresses.find(
      (addr) => addr.user_address_id === selected_address
    );

    if (!matchedAddress) {
      return res.status(404).json({ error: "Selected address not found" });
    }

    const formattedAddress = formatAddress(matchedAddress);

    const customFields = JSON.stringify({
      assigned_address: "true",
      address_string: formattedAddress,
      address_id: selected_address
    });

    const idURL =
      `${ID_API_BASE}/publisher/form`
      + `?aid=${AID}`
      + `&api_token=${API_TOKEN}`
      + `&uid=${uid}`
      + `&custom_fields=${customFields}`;

    console.log("Posting to ID API with URL:", idURL);

    await apiPost(idURL);

    // Step 4: Return result
    res.json({
      success: true,
      selectedAddressToString: formattedAddress
    });
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch from Piano API" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Docker container running at http://0.0.0.0:${PORT}`);
});

