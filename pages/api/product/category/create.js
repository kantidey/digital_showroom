import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
import { isAuth } from "../../../../utils/auth.js";
handler.use(isAuth);
handler.post(async (req, res) => {
  try {
    await prisma.Category.create({
      data: req.body,
    });
    res.send("Product category created successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
