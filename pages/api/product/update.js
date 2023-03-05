import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  try {
    await prisma.Product.update({
      where: {
        id: req.query.id,
      },
      data: req.body,
    });
    res.send("Product updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
