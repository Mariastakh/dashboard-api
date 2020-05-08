module.exports = (options) => {
  const gateway = options.gateway;
  const user = options.username;

  const result = gateway.execute(user);
  return result;
};
