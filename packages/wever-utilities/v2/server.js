const chalk = require("chalk");

const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);

/**
 * Add all the middlewares
 */
app.use(require("body-parser").json());
app.use(require("cookie-parser")());
app.use(require("cors")());

app.use("/api/auth", require("./apis/auth"));

app.get('/', (req, res) => {
      res.send('')
})


module.exports = function startServer(port) {
      server.listen(port, (err) => {
            if (err) throw err;
            console.log(chalk.green(`\n>>===> WEVER UTILITY listening on port ${chalk.blue(port)}\n`));
      })
}