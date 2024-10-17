const { Command } = require("./node_modules/commander/typings");

const program = new Command();

program.name("my-program").description("My own CLI program").version("1.0.0");

program
  .command("add <num1> <num2>")
  .description("Add two numbers")
  .action((num1, num2) => {
    console.log(Number(num1) + Number(num2));
  });

program.command("count_words filePath").action((filepath) => {
  const fs = require("fs");
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data.split(" ").length);
  });
});

//add todo to todo.json
program.command("add_todo <todo>").action((todo) => {
  const fs = require("fs");
  fs.readFile("todo.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let todos = JSON.parse(data);
    //add new todo with id
    todo = { id: todos.length + 1, todo: todo };
    todos.push(todo);
    fs.writeFile("todo.json", JSON.stringify(todos), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Todo added");
    });
  });
});

//delete todo from todo.json
program.command("delete_todo <id>").action((id) => {
  const fs = require("fs");
  fs.readFile("todo.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let todos = JSON.parse(data);
    let newTodos = todos.filter((todo) => todo.id != id);
    fs.writeFile("todo.json", JSON.stringify(newTodos), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Todo deleted");
    });
  });
});

program.parse();
