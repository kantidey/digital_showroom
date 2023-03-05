import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();

handler.put(async (req, res) => {
  try {
    await prisma.UtilityCost.update({
      where: {
        id: req.body.id,
      },
      data: {
        costTitle: req.body.title,
        amount: Number(req.body.amount),
      },
    });
    res.send("Utility cost updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
