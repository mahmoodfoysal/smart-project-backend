const express = require("express");
const app = express();
const cors = require("cors");
// apply jwt token
const jwt = require("jsonwebtoken");

const { MongoClient, ServerApiVersion, Collection } = require("mongodb");
require("dotenv").config();
const userRoute = require("./collections/user-collection.js");
const projectManagementRoute = require("./collections/project-management-collection.js");
const port = process.env.PORT || 5000;
const dns = require("dns");

app.use(cors());
app.use(express.json());

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.da6po2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    // ############################################ all database collection write here ###########################################

    const database = client.db("smart-project");
    const userCollection = database.collection("users");
    const projectManagementCollections = database.collection(
      "project-management-collection",
    );

    // ############################################ all database collection write here ###########################################

    // ############################################ all collection route write here ###########################################

    // admin controller
    app.use("/", userRoute(userCollection));

    // project management
    app.use("/", projectManagementRoute(projectManagementCollections));

    // ############################################ all collection route write here ###########################################

    // jwt related api
    app.post("/get-token", async (req, res) => {
      const user = req.body;

      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({
        token,
      });
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Smart project server running...!");
});

app.listen(port, () => {
  console.log(`Smart project running at port ${port}`);
});
