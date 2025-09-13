import User from "../models/User";

// Get User Data using userId
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: false, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update User Data
export const updateUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { username, bio, location, full_name } = req.body;

    const tempUser = await User.findById(userId);

    !username && username == tempUser.username;

    if (tempUser.username !== username) {
      const user = User.findOne({ username });
      // do not update username if already taken
      if (user) {
        username = tempUser.username;
      }
    }

    const updatedData = {
      username,
      bio,
      location,
      full_name,
    };
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
