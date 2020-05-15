module.exports = async (options) => {
  const tasks = await options.gateway.execute(options.user);
};
