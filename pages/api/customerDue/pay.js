import nc from "next-connect";
import { prisma } from "../../../utils/db.ts";
const handler = nc();
handler.put(async (req, res) => {
  const amount = Number(req.query.amount);
  try {
    const due = await prisma.SellOnDue.findFirst({
      where: {
        id: req.query.id,
      },
      select: {
        amount: true,
      },
    });
    if (amount < 1) {
      res.send(
        "Sorry, found invalid amount. You can't pay nagative or zero amount"
      );
    } else if (amount > due.amount) {
      res.send(`Sorry, found invalid amount. Current due ${due.amount}`);
    } else {
      await prisma.SellOnDue.update({
        where: {
          id: req.query.id,
        },
        data: {
          amount: { decrement: Number(amount) },
        },
      });
      await prisma.Sell.updateMany({
        data: {
          amount: { increment: Number(amount) },
        },
      });

      if (due.amount == amount) {
        await prisma.SellOnDue.delete({
          where: {
            id: req.query.id,
          },
        });
      }
      res.send("Payment saved successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
