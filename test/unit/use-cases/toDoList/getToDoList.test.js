const getToDoList = require("../../../../lib/use-cases/ToDoList/getToDoList");

list = [
    {task: "Task 1", status: "done"},
    {task: "Task 2", status: "to do"}
]
const gateway = { execute: jest.fn(() => list) };

describe("getToDoList", () => {
  it("should get a user's to-do list", async () => {
    username = "Maria";
    toDoList = getToDoList({username: username, gateway: gateway});
    expect(gateway.execute).toHaveBeenCalledWith(username);
  });
});
