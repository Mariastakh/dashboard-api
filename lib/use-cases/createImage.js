module.exports = async (options) => {
  const user = options.userId;
  const image = options.imageName;
  const response = await options.gateway.execute(user, image);
  return response;
};
