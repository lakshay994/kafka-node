const { Kafka } = require("kafkajs");
const arg = process.argv[2];

(async () => {
  try {
    const kafka = new Kafka({
      clientId: "poc",
      brokers: ["0.0.0.0:9092"]
    });

    const producer = kafka.producer();
    console.log("Connecting.....");
    await producer.connect();
    console.log("Connected!");
    const partition = arg[0] < "N" ? 0 : 1;
    const result = await producer.send({
      topic: "User",
      messages: [
        {
          value: arg,
          partition: partition
        }
      ]
    });

    console.log("Sent Successfully!", JSON.stringify(result));
    await producer.disconnect();
  } catch (err) {
    console.error(":::::ERROR:::::::", err);
  } finally {
    process.exit(0);
  }
})();
