const database = require("./database");

const dataMapper = {
  async findALLUser() {
    const result = await database.query(`SELECT * FROM "user"`);
    const results = result.rows;
    return results;
  },

  async getAllAdvertWithTag() {
    const result = await database.query("SELECT * FROM advert JOIN tag ON advert.tag_id = tag.id");
    const results = result.rows;
    return results;
  }

};



module.exports = dataMapper;
