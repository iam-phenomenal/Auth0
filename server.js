require('dotenv').config();
const { auth,requiresAuth } = require('express-openid-connect');
const express = require('express');
const app = express();

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.AUTH_SECRET,
	baseURL: process.env.BASE_URL,
	clientID: process.env.CLIENT_ID,
	issuerBaseURL: process.env.DOMAIN,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
	res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(3000, () => console.log('Server Running'));
