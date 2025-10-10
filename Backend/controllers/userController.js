import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";
import OTP from "../models/otp.js";

dotenv.config();

export function createUsers(req, res) {
  if (req.body.role == "admin") {
    if (req.user != null) {
      if (req.user.role != "admin") {
        return res.status(403).json({
          message: "You are not authorized to create an admin accounts",
        });

        return;
      }
    } else {
      res.status(403).json({
        message:
          "You are not authorized to create an admin account, please logion first",
      });
      return;
    }
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });

  user
    .save()
    .then(() => {
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to create user", error });
    });
}

export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (user == null) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (isPasswordCorrect) {
        //genarate token and send it to the user

        const token = jwt.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            img: user.img,
          },
          process.env.JWT_KEY
        );

        res.json({
          message: "Login successful",
          token: token,
          type: user.role,
        });
      } else {
        res.status(401).json({
          message: "Incorrect password",
        });
      }
    }
  });
}

export async function loginWithGoogle(req, res) {
  const token = req.body.accessToken;
  if (token == null) {
    res.status(400)({
      message: "Access token is required",
    });
    return;
  }
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);

  const user = await User.findOne({
    email: response.data.email,
  });

  if (user == null) {
    const newUser = new User({
      email: response.data.email,
      firstName: response.data.given_name,
      lastName: response.data.family_name,
      img: response.data.picture,
      password: "googleUser",
    });
    await newUser.save();

    const token = jwt.sign(
      {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        image: newUser.img,
      },
      process.env.JWT_KEY
    );

    res.json({
      token: token,
      message: "User created successfully",
      role: newUser.role,
    });
  } else {
    const token = jwt.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        image: user.img,
      },
      process.env.JWT_KEY
    );

    res.json({
      token: token,
      message: "Login successful",
      role: user.role,
    });
  }
}

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp-gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dndmdsnk@gmail.com",
    pass: "nrkx ptge nkns hmpz",
  },
});

export async function sendOTP(req, res) {
  const randomOTP = Math.floor(100000 + Math.random() * 900000);
  const email = req.body.email;
  if (email == null) {
    res.status(400).json({
      message: "Email is required",
    });
    return;
  }
  const user = await User.findOne({
    email: email,
  });
  if (user == null) {
    res.status(404).json({
      message: "User not found",
    });
  }

  await OTP.deleteMany({
    email: email,
  });

  const message = {
    from: "dndmdsnk@gmail.com",
    to: email,
    subject: "Reseting password for crystal beauty clear.",
    text: "This your password reset OTP :" + randomOTP,
  };

  const otp = new OTP({
    email: email,
    otp: randomOTP,
  });

  await otp.save();

  transport.sendMail(message, (error, info) => {
    if (error) {
      res.status(500).json({
        message: "Failed to send OTP",
        error: error,
      });
    } else {
      res.json({
        message: "OTP sent successful",
        otp: randomOTP,
      });
    }
  });
}

export async function resetPassword(req, res) {
  try {
    const { otp, email, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }

    // ✅ use await
    const response = await OTP.findOne({ email });

    if (!response) {
      return res.status(404).json({ message: "No OTP request found for this email" });
    }

    // ✅ convert both sides to number to avoid string vs number mismatch
    if (Number(otp) === Number(response.otp)) {
      // delete OTP record
      await OTP.deleteMany({ email });

      // hash new password
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      await User.updateOne({ email }, { password: hashedPassword });

      return res.json({ message: "Password reset successful" });
    } else {
      return res.status(403).json({ message: "Invalid OTP" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


export function getUser(req, res) {
	if (req.user == null) {
		res.status(404).json({
			message: "User not found",
		});
	} else {
		console.log(req.user);
		res.json(req.user);
	}
}

export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }

  if (req.user.role != "admin") {
    return false;
  }
  return true;
}





