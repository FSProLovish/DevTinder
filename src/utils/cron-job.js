const cron = require("node-cron");
const ConnectionRequest = require("../models/connectionRequest");
const { subDays, startOfDay, endOfDay } = require("date-fns");

cron.schedule("* * * * * *", async () => {
  // Send emails to all people who got requests the previous day

  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      // Send Emails
      try {
      } catch (err) {
        
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// to test go to crontab.guru
