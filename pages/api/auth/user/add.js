import bcryptjs from "bcryptjs";
import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();

handler.post(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: bcryptjs.hashSync(password),
      },
    });
    res.send("User addded successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
