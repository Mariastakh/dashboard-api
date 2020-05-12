"use-strict";
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "this worked yay",
        input: event,
      },
      null,
      2
    ),
  };
};
