const fetch = require('node-fetch');

const getQuote = (counts) => {
      return fetch("https://programming-quotes-api.herokuapp.com/Quotes/random")
            .then(res => {
                  return res.json()
            })
            .then(data => {
                  return `**${data["en"]} 
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 *-${data["author"]}***`;
            })
}

module.exports = {
      category: 'Inspiring',
      description: 'Inspiring Quoteas...', // Required for slash commands

      slash: 'both', // Create both a slash and legacy command

      callback: ({ message, interaction }) => {

            getQuote().then(async quote => {
                  const reply = {
                        embeds: [
                              {
                                    color: 0x00ffff,
                                    title: 'Inspiring Quotes',
                                    description: quote,

                              }
                        ]
                  };

                  // message is provided only for a legacy command
                  if (message) {
                        message.reply(reply);
                        return;
                  }

                  // interaction is provided only for a slash command
                  interaction.reply(reply);

                  // Alternatively we can just simply return our reply object
                  // OR just a string as the content.
                  // WOKCommands will handle the proper way to reply with it
                  return reply;
            });
      },
}