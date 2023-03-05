import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    if (req.body.sellingType == "cash") {
      const isExist = await prisma.Sell.findFirst();
      if (isExist) {
        await prisma.Sell.update({
          where: {
            id: isExist.id,
          },
          data: {
            amount: { increment: Number(req.body.totalAmount) },
          },
        });
      } else {
        await prisma.Sell.create({
          data: {
            amount: Number(req.body.totalAmount),
          },
        });
      }
    } else if (req.body.sellingType == "due") {
      await prisma.SellOnDue.create({
        data: {
          customerName: req.body.customerName,
          customerPhone: req.body.customerPhone,
          amount: Number(req.body.totalAmount),
        },
      });
    } else {
      const isExist = await prisma.Sell.findFirst();
      if (isExist) {
        await prisma.Sell.update({
          where: {
            id: isExist.id,
          },
          data: {
            amount: { increment: Number(req.body.cashAmount) },
          },
        });
      } else {
        await prisma.Sell.create({
          data: {
            amount: Number(req.body.cashAmount),
          },
        });
      }
      await prisma.SellOnDue.create({
        data: {
          customerName: req.body.customerName,
          customerPhone: req.body.customerPhone,
          amount: Number(req.body.totalAmount) - Number(req.body.cashAmount),
        },
      });
    }

    req.body.code.forEach(async (element) => {
      await prisma.Product.delete({
        where: {
          code: element,
        },
      });
    });

    res.send("Payment saved successfully");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
