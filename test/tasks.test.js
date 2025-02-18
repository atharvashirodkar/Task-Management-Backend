import { default as chaiHttp, request } from "chai-http";
import * as chai from "chai";
import { app } from "../app.js";

const { expect } = chai;

chai.use(chaiHttp);
// TEST CASE FOR TESTING POST CREATE TASK API
// describe("POST /api/v1/tasks", () => {
//   it("should create a new task and return 201 status", async () => {
//     const res = await request.execute(app)
//       .post("/api/v1/tasks")
//       .send({ title: "Test Task", description: "This is a test task.", status: "Pending" });

//     expect(res).to.have.status(201);
//     expect(res.body).to.be.an("object");
//     expect(res.body).to.have.property("success", true);
//     expect(res.body).to.have.property("message");
//   });

//   it("should return 400 if required fields are missing", async () => {
//     const res = await request.execute(app)
//       .post("/api/v1/tasks")
//       .send({
//         title: 'Test',
//         description: "Missing title"
//       });

//     expect(res).to.have.status(400);
//     expect(res.body).to.be.an("object");
//     expect(res.body).to.have.property("success", false);
//     expect(res.body).to.have.property("message", "All fields are required");
//   });
// });

// TEST CASE FOR TESTING GET ALL TASKS API
// describe('GET /api/v1/tasks', () => {
//   it('should fetch all tasks and return 200 status', async () => {
//     const res = await request.execute(app)
//       .get('/api/v1/tasks')
//     expect(res).to.have.status(200);
//     expect(res.body.data).to.be.an('array');
//   });
// });

// TEST CASE FOR TESTING GET TASK BY ID API
// describe('GET /:taskId', () => {
//   it('should fetch a task by ID and return 200 status', async () => {
//     const taskId = 6; // Replace with an existing task ID
//     const res = await request.execute(app)
//       .get(`/api/v1/tasks/${taskId}`)
//     expect(res).to.have.status(200);
//     // console.log(res.body);
//     expect(res.body).to.have.property("success", true);
//     expect(res.body).to.have.property("message");
//     expect(res.body.data).to.be.an('object');
//   });

//   it('should return 404 if the task does not exist', async () => {
//     const invalidId = 99999; // Non-existent task ID
//     const res = await request.execute(app)
//       .get(`/api/v1/tasks/${invalidId}`)
//     expect(res).to.have.status(404);
//     expect(res.body).to.have.property('message', 'Task not found');
//   });
// });