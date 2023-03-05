import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
  try {
    const Showroom = await prisma.Showroom.findFirst({
      select: {
        vat: true,
        discount: true,
      },
    });
    const product = await prisma.Product.findMany();
    res.send({
      product,
      vat: Showroom.vat,
      discount: Showroom.discount,
    });
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
