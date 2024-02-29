document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById('todoList');
    const newTodoInput = document.getElementById('newTodoInput');
    const markAllCompletedBtn = document.getElementById('markAllCompletedBtn');
    let todolist = [];

    // Load tasks from local storage on page load
    if (localStorage.getItem('todoList')) {
        todolist = JSON.parse(localStorage.getItem('todoList'));
        renderTodoList();
    }

    function renderTodoList() {
        todoList.innerHTML = '';
        todolist.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'mx-2';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => completeTodo(index));

            const textSpan = document.createElement('span');
            textSpan.className = todo.completed ? 'fw-bold text-success completed' : 'fw-bold text-danger';
            textSpan.textContent = todo.text;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger d-flex justify-content-end mt-2';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTodo(index));
            
            const completeButton = document.createElement('button');
            completeButton.className = 'btn btn-success d-flex justify-content-end mt-2';
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => completeTodo(index));

            li.appendChild(checkbox);
            li.appendChild(textSpan);
            li.appendChild(completeButton);
            li.appendChild(deleteButton);

            todoList.appendChild(li);
        });
    }

    function addNewTodo() {
        if (newTodoInput.value.trim() !== '') {
            todolist.push({ text: newTodoInput.value.trim(), completed: false });
            saveTodoListToLocalStorage();
            renderTodoList();
            newTodoInput.value = '';
        }
    }

    function completeTodo(index) {
        todolist[index].completed = !todolist[index].completed;
        saveTodoListToLocalStorage();
        renderTodoList();
    }

    function deleteTodo(index) {
        todolist.splice(index, 1);
        saveTodoListToLocalStorage();
        renderTodoList();
    }

    function markAllCompleted() {
        todolist.forEach(todo => {
            todo.completed = true;
        });
        saveTodoListToLocalStorage();
        renderTodoList();
    }

    // Function to save todo list to local storage
    function saveTodoListToLocalStorage() {
        localStorage.setItem('todoList', JSON.stringify(todolist));
    }

    newTodoInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addNewTodo();
        }
    });

    markAllCompletedBtn.addEventListener('click', markAllCompleted);
});