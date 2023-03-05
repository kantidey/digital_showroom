import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.post(async (req, res) => {
  try {
    const sell = await prisma.Sell.findMany({
      select: {
        amount: true,
      },
    });
    const withdraw = await prisma.withdraw.findMany({
      select: {
        amount: true,
      },
    });
    const utilityCost = await prisma.UtilityCost.findMany({
      select: {
        amount: true,
      },
    });
    const totalWithdraw = withdraw.reduce((a, c) => a + c.amount, 0);
    const totalUtilityCost = utilityCost.reduce((a, c) => a + c.amount, 0);
    const totalCashOnSell = sell.reduce((a, c) => a + c.amount, 0);
    const balance = totalCashOnSell - (totalWithdraw + totalUtilityCost);
    if (Number(req.query.amount) <= balance) {
      await prisma.withdraw.create({
        data: {
          amount: Number(req.query.amount),
        },
      });
      res.send("Your transaction processed successfully");
    } else {
      res.send("Sorry, found insufficient balance");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
