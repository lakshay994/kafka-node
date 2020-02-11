const { Kafka } = require("kafkajs");

(async () => {
  try {
    const kafka = new Kafka({
      clientId: "poc",
      brokers: ["0.0.0.0:9092"]
    });

    const admin = kafka.admin();
    console.log("Connecting.....");
    await admin.connect();
    console.log("Connected!");
    await admin.createTopics({
      topics: [
        {
          topic: "User",
          numPartitions: 2
        }
      ]
    });
    console.log("Topic Created!");
    await admin.disconnect();
  } catch (err) {
    console.error(":::::ERROR::::::::", err);
  } finally {
    process.exit(0);
  }
})();
