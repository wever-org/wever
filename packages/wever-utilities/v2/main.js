console.clear();
/**
 * Configure the environment variables
 */
require("dotenv").config();



const client = require("./bot")();
require("./server")(5000, client);