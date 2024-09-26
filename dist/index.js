"use strict";
const input = document.getElementById("todoinput");
const btn = document.getElementById("btn");
const form = document.getElementById("todoform");
const todos = getTodos();
todos.forEach(createTodo);
// get todos from locale storage
function getTodos() {
    const data = localStorage.getItem("todos");
    console.log(data);
    if (data) {
        return JSON.parse(data);
    }
    else {
        return [];
    }
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        checked: false
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
    console.log(todos);
}
function createTodo(todo) {
    console.log(todo);
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.checked;
    checkbox.addEventListener("change", () => {
        todo.checked = checkbox.checked;
        saveTodos();
        if (checkbox.checked) {
            newLi.style.textDecoration = "line-through";
        }
        else {
            newLi.style.textDecoration = "none";
        }
        console.log(todos);
    });
    newLi.innerText = todo.text;
    newLi.appendChild(checkbox);
    form.appendChild(newLi);
    input.value = "";
}
form.addEventListener("submit", handleSubmit);
