import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModels.js";


export const  registerController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      instagram,
      github,
      linkedin,
      role,
      image,
    } = req.body;
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }

    // existing users

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ success: false, message: "already exist" });
    }

    // hash password

    const hashpass = await hashPassword(password);

    // save user

    const user = await User.create({
      name,
      email,
      role,
      password: hashpass,
      instagram,
      phone,
      github,
      linkedin,
      image
    });

    res.status(201).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in registration", error });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      instagram,
      github,
      linkedin,
      role,
      image,
    } = req.body;

    // Debugging logs
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);

    if (!Object.keys(req.body).length) {
      return res.status(400).send({ message: "No data provided to update" });
    }

    // Validate User ID format
    const userId = req.params.pid;
    if (!userId?.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({ message: "Invalid user ID format" });
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Hash password if provided
    let hashpass = existingUser.password; // Keep existing password
    if (password) {
      hashpass = await hashPassword(password);
    }
 let existingImage ="";

if(!image || image.length < 1){
existingImage = existingUser?.image
}
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        role,
        password: hashpass,
        instagram,
        phone,
        github,
        linkedin,
        image:image?image:existingImage,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "User updated successfully",
     user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .send({ success: false, message: "Error updating user", error });
  }
};



export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "invalid email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "email does not exists" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }

    // Token

    const token = await JWT.sign(
      { id: user._id, role: 1 },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    user.role = 1;
    await user.save();

    res.status(200).send({
      success: true,
      message: "login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error in login", error });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!answer) {
      return res.status(400).send({
        success: false,
        message: "answer is required",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: "newPassword is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user || user.answer !== answer) {
      // Added check for answer
      return res.status(404).send({
        success: false,
        message: "wrong email or answer",
      });
    }

    const hashed = await hashPassword(newPassword); // Ensure to await if needed
    await User.findByIdAndUpdate(user._id, { password: hashed });

    return res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      error: error.message, // Including error message for debugging
    });
  }
};

export const getAllController = async (req, res) => {
  try {
    const getAll = await User.find();
    console.log(getAll);
    return res.status(200).send({
      success: true,
      getAll,
      message: "getalluser",
    });
  } catch (error) {
    console.log(error);
    res.send("server");
  }
};

export const getUserController = async (req, res) => {
  try {
    const get = await User.findById(req.params.id);
    console.log(get);
    return res.status(200).send({
      success: true,
      get,
      message: "getalluser",
    });
  } catch (error) {
    console.log(error);
    res.send("server");
  }
};
