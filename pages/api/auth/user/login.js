import nc from "next-connect";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../utils/db.ts";
import { userSignToken } from "../../../../utils/auth.js";
const handler = nc();
handler.post(async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.query.email },
    });

    if (user && bcryptjs.compareSync(req.query.password, user.password)) {
      const token = userSignToken(user);
      res.send({
        token,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        gender: user.gender,
      });
    } else if (user) {
      res.send("Invalid email or password");
    } else {
      res.send("Sorry, no user exists with this email address");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
