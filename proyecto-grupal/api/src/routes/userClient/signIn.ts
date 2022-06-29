import { Request, Response, NextFunction } from "express";
import userClientModel from "../../models/userClients";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const logInClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and Password are both required." });
    } else {
      const user = await userClientModel.findOne({ email });

      user?.role === 'client' ? null : res.status(401).json({error: "invalid user or password"});

      const passwordCorrect =
        user === null ? false : await bcrypt.compare(password, user.password);

      if (!(user && passwordCorrect)) {
        res.status(401).json({
          error: "invalid user or password",
        });
      } else {
        const userForToken = {
          id: user._id,
          role: user.role
        };

        const token = jwt.sign(userForToken, process.env.SECRETWORD, {
          expiresIn: 60 * 60 * 24 * 7,
        });

        res.send({
          name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null,
          // name: `${user?.firstName} ${user?.lastName}`,
          email: user.email ? user.email : null,
          // email: user?.email,
          token,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default logInClient;
