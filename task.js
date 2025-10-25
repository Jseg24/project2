document.addEventListener("DOMContentLoaded", function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const form = document.querySelector("#taskForm");
  const list = document.querySelector("#taskList");

 
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.querySelector("#task-title").value.trim();
    const priority = document.querySelector("#priority").value;
    const status = document.querySelector('input[name="status"]:checked')?.value || "To Do";
    if (!title) return;

    const task = { title, priority, status };
    tasks.push(task);
    saveTasks();
    loadTasks();
    form.reset();
  });


 document.addEventListener("click", function (event) {
  const element = event.target;

 if (element.classList.contains("remove")) {
    alert("You took the easy way out...task removed.");
    const li = element.parentElement; 
    const index = li.getAttribute("data-index");
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
  }


  if (element.classList.contains("complete")) {
    const li = element.parentElement;
    const index = li.getAttribute("data-index");
    li.classList.add("completed");
    setTimeout(() => {
      tasks.splice(index, 1);
      saveTasks();
      loadTasks();
    }, 1000);
  }
});

function loadTasks() {
  list.innerHTML = "";
  tasks.forEach((t, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-index", index);
    li.innerHTML = `
  <span>
        ${t.title} - ${t.priority} - ${t.status}
      </span>
      <button class="complete btn btn-success btn-sm">Complete</button>
      <button class="remove btn btn-danger btn-sm">Remove</button>
    `;
    list.appendChild(li);
  });
}


  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  loadTasks();


  const quotes = [
    "Discipline is choosing what you want most over what you want now.",
    "Whether u think u can or u can't ur right",
    "The early bird gets the worm, but the second mouse gets the cheese.",
    "If at first you don't succeed, redefine success.",
    "JUST DO IT!! MAKE YOUR DREAMS COME TRUE!!!"
  ];

  const quoteButton = document.querySelector("#quoteButton");
  const quoteDisplay = document.querySelector("#quoteDisplay");
let i = 0;
  quoteButton.addEventListener("click", function () {
    
    const quote = quotes[i++ % quotes.length];
    quoteDisplay.textContent = quote;
  });
});
