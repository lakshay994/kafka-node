const { Kafka } = require("kafkajs");

(async () => {
  try {
    const kafka = new Kafka({
      clientId: "poc",
      brokers: ["0.0.0.0:9092"]
    });

    const consumer = kafka.consumer({ groupId: "test" });
    console.log("Connecting.....");
    await consumer.connect();
    console.log("Connected!");

    await consumer.subscribe({
      topic: "User",
      fromBeginning: true
    });

    await consumer.run({
      eachMessage: async result => {
        console.log(
          `Received Message => ${result.message.value} on partition ${result.partition}`
        );
      }
    });
  } catch (err) {
    console.error(":::::ERROR:::::::", err);
  }
})();
