import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    const isExist = await prisma.Product.count({
      where: { code: req.body.code },
    });
    if (isExist) {
      res.send(
        "Sorry, this product's code alresdy exists. Please choice another code"
      );
    } else {
      await prisma.Product.create({
        data: req.body,
      });
      res.send("Product saved successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
