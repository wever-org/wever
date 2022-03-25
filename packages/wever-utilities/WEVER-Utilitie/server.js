const guildId = process.env['GUILD_ID']
const clientId = process.env['CLIENT_ID']
const clientSecret = "tNoh3MLPgxcuTLF2nXnG0H8AkMmYPLOh";
const publicKey = process.env['PUBLIC_KEY']
const inviteLink = process.env['INVITE_LINK']
const token = process.env['DISCORD_TOKEN']
const REDIRECT_URL = "https://wever-utilitie-psi.vercel.app";


const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");

app.use(require("cors")());
app.use(require("body-parser").json());
app.use(require("cookie-parser")())

function keepAlive(client) {

    app.post("/getToken", async (req, res) => {
        try {
            const { code } = req.body;

            const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: REDIRECT_URL,
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

    app.post("/submitForm", (req, res) => {
        const { user, ...body } = req.body;

        var unFieledProperties = [];
        for (const [key, value] of Object.entries(body)) {
            if (value === undefined || value === null || value === "") {
                unFieledProperties.push(key);
            }
        }
        if (unFieledProperties.length > 0) {
            return res.status(401).send(`Please fill the following fields: ${unFieledProperties.join(', ')}`);
        }

        const channel = client.channels.cache.find(ch => ch.id === '946093504138977300');
        channel.send({
            embeds: [
                {
                    color: 0x00ffff,
                    author: {
                        name: user.username,
                        icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
                    },
                    title: `A new form submision is found.`,
                    description: `This form was filled from the official bot server of @WEVER COMMUNITY.
    This form is filled by <@${user.id}>.
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,
                    fields: [
                        {
                            name: "Full Name: ",
                            value: "**Ans:** " + body.name,
                            inline: true
                        },
                        {
                            name: "Date Of Birth: ",
                            value: "**Ans:** " + body.dob,
                            inline: true
                        },
                        {
                            name: "Gender: ",
                            value: "**Ans:** " + body.gender,
                            inline: true
                        },
                        {
                            name: "Occupation: ",
                            value: "**Ans:** " + body.occupation,
                            inline: true
                        },
                        {
                            name: "Phone Number: ",
                            value: "**Ans:** " + body.phone,
                            inline: true
                        },
                        {
                            name: "Email Address: ",
                            value: "**Ans:** " + body.email,
                            inline: true
                        },
                        {
                            name: "What makes him perfect for this community ?",
                            value: "**Ans:** " + body.desc,
                            inline: false
                        },
                        {
                            name: "\u200b",
                            value: "\u200b"
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: "https://cdn.discordapp.com/attachments/939851406075134013/944301166811041822/logo-figma.png",
                        text: "Form submition of @WEVER Membership"
                    }
                }
            ]
        });

        res.status(200).json({ msg: "Success" });
    });


    app.use(express.static(path.resolve(__dirname, "./public")));
    app.all("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "./public/index.html"));
    })

    server.listen(3000, () => {
        console.log("Server is ready.");
    })
}

module.exports = { app, keepAlive };
// keepAlive();