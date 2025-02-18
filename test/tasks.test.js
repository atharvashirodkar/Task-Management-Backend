import { default as chaiHttp, request } from "chai-http";
import * as chai from "chai";
import { app } from "../app.js";

const { expect } = chai;

chai.use(chaiHttp);

let taskId = null;

// TEST CASE FOR TESTING POST CREATE TASK API
describe("POST /api/v1/tasks", () => {
  it("should create a new task and return 201 status", async () => {
    const res = await request.execute(app)
    .post("/api/v1/tasks")
    .send({ title: "Test Task", description: "This is a test task.", status: "Pending" });
    expect(res).to.have.status(201);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("success", true);
    expect(res.body).to.have.property("message");
    expect(res.body).to.have.property('taskId');
    taskId = res.body.taskId;
    // console.log("Log : ",res.body.taskId, " : Here");
  });
  it("should return 400 if required fields are missing", async () => {
    const res = await request.execute(app)
      .post("/api/v1/tasks")
      .send({
        title: 'Test',
        description: "Missing title"
      });

    expect(res).to.have.status(400);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("success", false);
    expect(res.body).to.have.property("message", "All fields are required");
  });
});

// TEST CASE FOR TESTING GET ALL TASKS API
describe('GET /api/v1/tasks', () => {
  it('should fetch all tasks and return 200 status', async () => {
    const res = await request.execute(app)
      .get('/api/v1/tasks')
    expect(res).to.have.status(200);
    expect(res.body.data).to.be.an('array');    
  });
});

// TEST CASE FOR TESTING GET TASK BY ID API
describe('GET /api/v1/tasks/:taskId', () => {
  it('should fetch a task by ID and return 200 status', async () => {
    const res = await request.execute(app)
      .get(`/api/v1/tasks/${taskId}`)
    expect(res).to.have.status(200);
    // console.log(res.body);
    expect(res.body).to.have.property("success", true);
    expect(res.body).to.have.property("message");
    expect(res.body.data).to.be.an('object');
  });

  it('should return 404 if the task does not exist', async () => {
    const invalidId = 99999; // Non-existent task ID
    const res = await request.execute(app)
      .get(`/api/v1/tasks/${invalidId}`)
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', 'Task not found');
  });
});

// TEST CASE FOR TESTING UPDATE TASK API
describe('PUT /tasks/:taskId', () => {
    it('should update a task and return 200 status', async () => {
        const res = await request.execute(app)
        .put(`/api/v1/tasks/${taskId}`)
        .send({ title: 'Updated Task', status: 'In Progress' })
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Task updated successfully');
          console.log(res.body);
    });
  
    it('should return 404 if the task does not exist', async () => {
      const invalidId = 99999;
        const res = await request.execute(app)
        .put(`/api/v1/tasks/${invalidId}`)
        .send({ title: 'Updated Task' })
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success', false);
          expect(res.body).to.have.property('message');
    });
  });

// TEST CASE FOR TESTING DELETE TASK API
describe('DELETE /api/v1/tasks/:taskId', () => {
    it('should delete a task and return 200 status', async () => {
        const res = await request.execute(app)
        .delete(`/api/v1/tasks/${taskId}`)
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message');
    });
  
    it('should return 404 if the task does not exist', async () => {
      const invalidId = 99999;
        const res = await request.execute(app)
        .delete(`/api/v1/tasks/${invalidId}`)
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('success', false);
          expect(res.body).to.have.property('message');
    });
  });