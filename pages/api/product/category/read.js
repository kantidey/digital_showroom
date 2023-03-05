import nc from "next-connect";
import { prisma } from "../../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const category = await prisma.Category.findMany();
    res.send(category);
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
