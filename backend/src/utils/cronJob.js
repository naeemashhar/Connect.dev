const cron = require("node-cron");
const connectionRequest = require("../models/connectionRequest");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const { run } = require("./sendEmail");

cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 0);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequest = await connectionRequest
      .find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd,
        },
      })
      .populate("fromUserId toUserId");

    if (!pendingRequest.length) return console.log("No pending requests");

    const body = `
      <h2>Daily Summary: New Connection Requests</h2>
      <ul>
        ${pendingRequest
          .map(
            (req) =>
              `<li><strong>${req.fromUserId.firstName}</strong> ➝ ${req.toUserId.firstName}</li>`
          )
          .join("")}
      </ul>
      <p>Visit <a href="http://13.48.104.170/">Connect.dev</a> to view requests.</p>
    `;

    await run("🧩 Connect.dev - Daily Connection Requests", body);
  } catch (err) {
    console.error("Cron job failed:", err);
  }
});
