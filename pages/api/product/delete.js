import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.delete(async (req, res) => {
  try {
    await prisma.Product.delete({
      where: {
        id: req.query.id,
      },
    });
    res.send("Prouct deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
