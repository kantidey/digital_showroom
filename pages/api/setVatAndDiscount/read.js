import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const vatAndDiscount = await prisma.Showroom.findFirst();
    res.send(vatAndDiscount);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
