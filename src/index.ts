interface Todo {
    text: string;
    checked: boolean;
}

const input = document.getElementById("todoinput")! as HTMLInputElement;
const btn = document.getElementById("btn")! as HTMLButtonElement;
const form = document.getElementById("todoform")! as HTMLFormElement;

const todos: Todo[] = getTodos();
todos.forEach(createTodo);

// get todos from locale storage
function getTodos(): Todo[] {
  const data = localStorage.getItem("todos");
  console.log(data);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}   

function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const newTodo: Todo = {
        text: input.value,
        checked: false
    };

    createTodo(newTodo);
    todos.push(newTodo);

    saveTodos();

    input.value = "";

    console.log(todos);
}

function createTodo(todo: Todo) {
    console.log(todo)
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.checked;
    
    checkbox.addEventListener("change", () => {
        todo.checked = checkbox.checked;
        saveTodos();
        if (checkbox.checked) {
            newLi.style.textDecoration = "line-through";
        } else {
            newLi.style.textDecoration = "none";
        }
        console.log(todos)
    });

    newLi.innerText = todo.text;
    newLi.appendChild(checkbox);
    form.appendChild(newLi);
    input.value = "";
}

form.addEventListener("submit", handleSubmit);
    
