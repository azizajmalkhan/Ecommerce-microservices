const generateTokens = require("../utills/generateToken")
//user registration
const resgiterUser = async (req, res) => {
//   logger.info("Registration endpoint hit...");
  try {
    console.log("log - 1");
    
    //validate the schema
    // const { error } = validateRegistration(req.body);
    // if (error) {
    //   logger.warn("Validation error", error.details[0].message);
    //   return res.status(400).json({
    //     success: false,
    //     message: error.details[0].message,
    //   });
    // }

    const { email, password, username } = req.body;

    // let user = await User.findOne({ $or: [{ email }, { username }] });
    // if (user) {
    //   logger.warn("User already exists");
    //   return res.status(400).json({
    //     success: false,
    //     message: "User already exists",
    //   });
    // }

    // user = new User({ username, email, password });
    user = { username, email, password }

    // await user.save();
    // logger.warn("User saved successfully", user._id);

    // const { accessToken, refreshToken } = await generateTokens(user);
    const { accessToken } = await generateTokens(user);

    // console.log(accessToken);
    
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      accessToken,
    //   refreshToken,
    });
  } catch (e) {
    // logger.error("Registration error occured", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {resgiterUser}