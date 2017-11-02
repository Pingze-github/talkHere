
module.exports = {
  name: 'message',
  schema: {
    ioid: String,
    msg: String,
    user: {},
    time: Date
  },
  option: {
    versionKey: false
  },
  index: [
    {time: -1}
  ],
  method: {
    async get(size, timeend) {
      let query = {};
      if (timeend) query = {time: {$lte: timeend}};
      const messges = await this.find(query).sort({time: -1}).limit(size);
      messges.reverse();
      return messges;
    },
    async add(msg) {
      return await this.create(msg);
    }
  }
};