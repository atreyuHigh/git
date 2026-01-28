/**
 * To-Do List Application
 * A simple vanilla JavaScript application for managing tasks
 */

// ===========================
// DOM Elements References
// ===========================
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksList = document.getElementById('tasksList');
const emptyMessage = document.getElementById('emptyMessage');

// ===========================
// State Management
// ===========================
// Array to store all tasks with their completion status
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// ===========================
// Initialization
// ===========================
// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    attachEventListeners();
});

// ===========================
// Event Listeners
// ===========================
/**
 * Attach event listeners to interactive elements
 */
function attachEventListeners() {
    // Add task when button is clicked
    addBtn.addEventListener('click', addTask);

    // Add task when Enter key is pressed in input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Clear input focus style when typing
    taskInput.addEventListener('input', () => {
        // Any visual feedback can be added here if needed
    });
}

// ===========================
// Add Task Function
// ===========================
/**
 * Add a new task to the list
 * - Gets text from input field
 * - Validates that input is not empty
 * - Creates new task object
 * - Saves to localStorage
 * - Re-renders the task list
 * - Clears the input field
 */
function addTask() {
    // Get the input value and trim whitespace
    const taskText = taskInput.value.trim();

    // Validate: task text should not be empty
    if (taskText === '') {
        // Add visual feedback for empty input
        taskInput.focus();
        taskInput.style.borderColor = '#ff6b6b';
        setTimeout(() => {
            taskInput.style.borderColor = '#e0e0e0';
        }, 500);
        return;
    }

    // Create a new task object
    const newTask = {
        id: Date.now(), // Use timestamp as unique ID
        text: taskText,
        completed: false
    };

    // Add task to the tasks array
    tasks.push(newTask);

    // Save tasks to localStorage for persistence
    saveTasks();

    // Clear the input field
    taskInput.value = '';
    taskInput.focus();

    // Re-render the task list
    renderTasks();
}

// ===========================
// Delete Task Function
// ===========================
/**
 * Delete a task from the list
 * @param {number} taskId - The unique ID of the task to delete
 */
function deleteTask(taskId) {
    // Filter out the task with matching ID
    tasks = tasks.filter(task => task.id !== taskId);

    // Save updated tasks to localStorage
    saveTasks();

    // Re-render the task list
    renderTasks();
}

// ===========================
// Toggle Task Completion Function
// ===========================
/**
 * Toggle the completed status of a task
 * @param {number} taskId - The unique ID of the task to toggle
 */
function toggleTaskCompletion(taskId) {
    // Find the task and toggle its completed status
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
    }

    // Save updated tasks to localStorage
    saveTasks();

    // Re-render the task list
    renderTasks();
}

// ===========================
// Render Tasks Function
// ===========================
/**
 * Render all tasks to the DOM
 * - Clears the current task list
 * - Creates task elements for each task
 * - Adds event listeners to each task element
 * - Shows/hides empty state message
 */
function renderTasks() {
    // Clear the task list
    tasksList.innerHTML = '';

    // Check if there are any tasks
    if (tasks.length === 0) {
        // Show empty state message
        emptyMessage.classList.add('show');
        return;
    }

    // Hide empty state message
    emptyMessage.classList.remove('show');

    // Loop through each task and create list items
    tasks.forEach(task => {
        // Create list item element
        const li = document.createElement('li');
        li.className = 'task-item';

        // Add completed class if task is completed
        if (task.completed) {
            li.classList.add('completed');
        }

        // Create the checkbox visual indicator
        const checkbox = document.createElement('div');
        checkbox.className = 'task-checkbox';

        // Create the task text element
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        taskText.title = 'Click to toggle completion'; // Tooltip

        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete Task';
        deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);

        // Assemble the list item
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);

        // Add event listeners to task elements
        taskText.addEventListener('click', () => toggleTaskCompletion(task.id));
        checkbox.addEventListener('click', () => toggleTaskCompletion(task.id));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        // Add the list item to the tasks list
        tasksList.appendChild(li);
    });
}

// ===========================
// Save Tasks Function
// ===========================
/**
 * Save tasks to localStorage for data persistence
 * - Converts tasks array to JSON
 * - Stores in browser's localStorage
 */
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
