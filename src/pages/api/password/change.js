import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";
import User from "models/user";
import { databaseOnly } from "middlewares/middleware";

const handler = nextConnect();

handler.use(databaseOnly);

handler.patch(async (req, res) => {
  const { password, newPassword } = req.body;
  const { email } = req.body;
  if (!isEmail(email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }

  if (!password) {
    res.status(400).send("Missing field(s)");
    return;
  }

  let user = null;

  try {
    user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // now we can update the password
  const hashedPassword = await bcrypt.hash(newPassword, 14);
  user.password = hashedPassword;

  try {
    await user.save();
    return res.json({ message: "Password updated" });
  } catch (error) {
    return res.status(500).json({ message: "Password update failed" });
  }
});

export default handler;
