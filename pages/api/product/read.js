import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const product = await prisma.Product.findMany();
    res.send(product);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
