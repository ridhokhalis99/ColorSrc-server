function errorHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";
  const { name } = err;
  console.log(name);

  if (name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors.map((error) => error.message);
  } else if (
    name === `Email can't be empty` ||
    name === `Password can't be empty`
  ) {
    code = 400;
    msg = name;
  } else if (name === "Invalid email/password") {
    code = 401;
    msg = "Invalid Username/Password";
  } else if (name === "Palette not found") {
    code = 404;
    msg = name;
  } else if (name === "InvalidToken" || name === "JsonWebTokenError") {
    code = 401;
    msg = "Invalid token";
  } else if (name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = "Email must be unique";
  } else if (name === "Color palettes has reached the limit") {
    code = 403;
    msg = name;
  } else if (name === "Forbidden") {
    code = 403;
    msg = `You Don't Have Access`;
  }

  res.status(code).json({
    statusCode: code,
    error: {
      message: msg,
    },
  });
}

module.exports = errorHandler;
