const express = require('express');
const Router = express.Router();


Router.post("/getAuthToken", async (req, res) => {
      try {
            const { code } = req.body;

            const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
                  method: 'POST',
                  body: new URLSearchParams({
                        client_id: process.env['CLIENT_ID'],
                        client_secret: process.env["CLIENT_SECRET"],
                        code,
                        grant_type: 'authorization_code',
                        redirect_uri: process.env["REDIRECT_URL"],
                        scope: 'identify',
                  }),
                  headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                  },
            });

            const oauthData = await oauthResult.json();
            return res.status(200).json(oauthData);
      } catch (error) {
            console.error(error);
            return res.status(500).json({ error });
      }
});

module.exports = Router;