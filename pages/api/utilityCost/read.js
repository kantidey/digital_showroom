import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const utilityCost = await prisma.UtilityCost.findMany();
    res.send(utilityCost);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
