const { Client } = require("@elastic/elasticsearch");

const ESClient = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "mmB171LB4_6J*OvcY1ln",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const connectToES = async () => {
  try {
    const { status } = await ESClient.cluster.health();
    console.log("Elasticsearch Cluster health:", status);
  } catch (error) {
    console.error("Error checking cluster health:", error);
  }
};

module.exports = { ESClient, connectToES };
