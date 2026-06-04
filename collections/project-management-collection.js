const express = require("express");
const { ObjectId } = require("mongodb");
const verifyJWT = require("../middlewares/jwtTokenVerify");
const router = express.Router();

const projectManagementRoute = (projectManagementCollections) => {
  // get api
  router.get("/api/smart-project/get-project-list", async (req, res) => {
    const getProjectList = projectManagementCollections.find();
    const result = await getProjectList.toArray();
    res.send({
      status: 200,
      list_data: result,
      message: "Successful",
    });
  });

  router.get(
    "/api/smart-project/get-project-list/:email",
    verifyJWT,
    async (req, res) => {
      const getProjectByEmail = projectManagementCollections.find();
      const result = await getProjectByEmail.toArray();
      res.status(200).send({
        status: 200,
        list_data: result,
        message: "Successful",
      });
    },
  );

  // get single blog
  router.get("/api/smart-project/get-project-details/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const query = {
        _id: new ObjectId(id),
      };

      const result = await projectManagementCollections.findOne(query);

      if (!result) {
        return res.status(404).send({
          status: 404,
          message: "Not found",
        });
      }

      res.status(200).send({
        status: 200,
        details_data: result,
        message: "Successful",
      });
    } catch (error) {
      res.status(500).send({
        error: "Failed to fetch",
      });
    }
  });

  //   post api
  router.post(
    "/api/smart-project/insert-update-project-list",
    verifyJWT,
    async (req, res) => {
      const {
        _id,
        project_id,
        project_name,
        description,
        dead_line,
        status,
        tasks,
        members,
      } = req.body;

      const data = {
        project_id: typeof project_id === "number" ? project_id : null,
        project_name: typeof project_name === "string" ? project_name : null,
        description: typeof description === "string" ? description : null,
        dead_line: typeof dead_line === "string" ? dead_line : null,
        status: typeof status === "string" ? status : null,
      };

      if (tasks !== undefined) {
        if (!Array.isArray(tasks)) {
          return res
            .status(400)
            .send({ error: "Tasks must be an array", status: 400 });
        }
        data.tasks = tasks;
      }

      if (members !== undefined) {
        if (!Array.isArray(members)) {
          return res
            .status(400)
            .send({ error: "members must be an array", status: 400 });
        }
        data.members = members;
      }

      if (
        data.project_id === null ||
        !data.project_name ||
        !data.description ||
        !data.dead_line ||
        !data.status
      ) {
        return res
          .status(400)
          .send({ error: "Invalid or missing required fields", status: 400 });
      }

      try {
        if (_id) {
          const blogId = new ObjectId(_id);
          data.modifiedAt = new Date();
          const result = await projectManagementCollections.updateOne(
            {
              _id: blogId,
            },
            {
              $set: data,
            },
          );
          if (result.modifiedCount === 0) {
            return res
              .status(400)
              .send({ message: "No data modified", status: 400 });
          }
          res
            .status(201)
            .send({ message: "Update Successful", id: _id, status: 201 });
        } else {
          data.createdAt = new Date();
          const result = await projectManagementCollections.insertOne(data);
          res.status(201).send({
            status: 201,
            message: "Successful",
            id: result.insertedId,
            status: 201,
          });
        }
      } catch (error) {
        res
          .status(500)
          .send({ error: "Failed to create or update", status: 500 });
      }
    },
  );

  // delete api
  router.delete(
    "/api/smart-project/delete-project-list/:id",
    verifyJWT,
    async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await projectManagementCollections.deleteOne(filter);
      res.status(200).send({
        status: 200,
        message: "Successful",
        deletedCount: result?.deletedCount,
      });
    },
  );

  return router;
};

module.exports = projectManagementRoute;
