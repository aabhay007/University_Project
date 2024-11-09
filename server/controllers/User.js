import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) res.status(404).send({ message: "User already exists 🤷‍♂️" });

    let userInfo = await UserModel.create({
      ...req.body,
      // image: req?.file?.filename,
    });
    if (userInfo) res.status(201).send({ message: "User Created 😊" });
    else res.status(404).send({ message: "unable to create user 😢" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const login = async (req, res) => {
  try {
    let user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET_KEY
      );
      // sessionStorage.setItem('token',token);
      res.status(201).send({
        id: user._id,
        role: user.role,
        token: token,
      });
      // localStorage.getItem("token")
    } else {
      res.status(401).send({ message: "Wrong username and password" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

// export const login = async (req, res) => {
//   try {
//     let user = await UserModel.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     if (user)
//       res.status(201).send({
//         id: user._id,
//         role: user.role,
//       });
//     else res.status(201).send({ message: " wrong username and password" });
//   } catch {
//     res.status(404).send({ error: e?.message });
//   }
// };
