const database = require("./database");

const dataMapper = {
  async findALLUser() {
    const result = await database.query("SELECT * FROM user");
    const results = result.rows;
    return results;
  },
};

module.exports = dataMapper;
