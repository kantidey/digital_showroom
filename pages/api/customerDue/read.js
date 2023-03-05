import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const sellOnDue = await prisma.SellOnDue.findMany();
    res.send(sellOnDue);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
