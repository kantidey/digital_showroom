import nc from "next-connect";
import { prisma } from "../../utils/db.ts";
const handler = nc();
handler.get(async (req, res) => {
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
    const sellOnDue = await prisma.SellOnDue.findMany({
      select: {
        amount: true,
      },
    });
    const totalCashOnSell = sell.reduce((a, c) => a + c.amount, 0);
    const totalWithdraw = withdraw.reduce((a, c) => a + c.amount, 0);
    const totalUtilityCost = utilityCost.reduce((a, c) => a + c.amount, 0);
    const totalDueOnSell = sellOnDue.reduce((a, c) => a + c.amount, 0);

    res.send({
      
      totalSell: totalCashOnSell + totalDueOnSell,
      totalWithdraw,
      totalUtilityCost,
      totalDueOnSell,
      balance: totalCashOnSell - (totalWithdraw + totalUtilityCost),
    });
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
