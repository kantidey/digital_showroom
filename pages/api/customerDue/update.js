import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();

handler.put(async (req, res) => {
  try {
    await prisma.SellOnDue.update({
      where: {
        id: req.query.id,
      },
      data: req.body,
    });
    res.send("Due information updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
