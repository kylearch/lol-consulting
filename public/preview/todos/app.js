// todos.lol - Simple Task Management App

class TodoApp {
    constructor() {
        this.tasks = [];
        this.taskIdCounter = 1;
        this.draggedElement = null;
        this.dragPlaceholder = null;
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.render();
        this.initTheme();
    }

    // Initialize theme based on user preference or system preference
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('todos-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        this.setTheme(currentTheme);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('todos-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        if (theme === 'dark') {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
        
        localStorage.setItem('todos-theme', theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    // Bind all event listeners
    bindEvents() {
        const taskInput = document.getElementById('taskInput');
        const addButton = document.getElementById('addButton');
        const themeToggle = document.getElementById('themeToggle');

        // Add task events
        addButton.addEventListener('click', () => this.addTask());
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Input validation
        taskInput.addEventListener('input', () => {
            const isEmpty = taskInput.value.trim() === '';
            addButton.disabled = isEmpty;
        });

        // Theme toggle
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                taskInput.focus();
            }
        });
    }

    // Add a new task
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const text = taskInput.value.trim();
        
        if (!text) return;

        const task = {
            id: this.taskIdCounter++,
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        taskInput.value = '';
        taskInput.focus();

        this.saveToStorage();
        this.render();
    }

    // Toggle task completion
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.render();
        }
    }

    // Delete a task
    deleteTask(taskId) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            taskElement.classList.add('leaving');
            
            setTimeout(() => {
                this.tasks = this.tasks.filter(t => t.id !== taskId);
                this.saveToStorage();
                this.render();
            }, 250);
        }
    }

    // Reorder tasks after drag and drop
    reorderTasks(draggedId, targetId, insertAfter = false) {
        const draggedIndex = this.tasks.findIndex(t => t.id === draggedId);
        const targetIndex = this.tasks.findIndex(t => t.id === targetId);
        
        if (draggedIndex === -1 || targetIndex === -1) return;

        const [draggedTask] = this.tasks.splice(draggedIndex, 1);
        const newTargetIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
        const insertIndex = insertAfter ? newTargetIndex + 1 : newTargetIndex;
        
        this.tasks.splice(insertIndex, 0, draggedTask);
        this.saveToStorage();
        this.render();
    }

    // Setup drag and drop for a task element
    setupDragAndDrop(taskElement, taskId) {
        taskElement.draggable = true;
        
        taskElement.addEventListener('dragstart', (e) => {
            this.draggedElement = taskElement;
            taskElement.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', taskElement.outerHTML);
        });

        taskElement.addEventListener('dragend', () => {
            taskElement.classList.remove('dragging');
            this.hideDragPlaceholder();
            this.draggedElement = null;
        });

        taskElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            if (this.draggedElement && this.draggedElement !== taskElement) {
                this.showDragPlaceholder(taskElement, e);
            }
        });

        taskElement.addEventListener('drop', (e) => {
            e.preventDefault();
            
            if (this.draggedElement && this.draggedElement !== taskElement) {
                const draggedId = parseInt(this.draggedElement.dataset.taskId);
                const targetId = parseInt(taskElement.dataset.taskId);
                const insertAfter = this.shouldInsertAfter(taskElement, e);
                
                this.reorderTasks(draggedId, targetId, insertAfter);
            }
        });
    }

    // Show drag placeholder
    showDragPlaceholder(targetElement, event) {
        const placeholder = document.getElementById('dragPlaceholder');
        const rect = targetElement.getBoundingClientRect();
        const insertAfter = this.shouldInsertAfter(targetElement, event);
        
        placeholder.classList.add('visible');
        
        if (insertAfter) {
            targetElement.parentNode.insertBefore(placeholder, targetElement.nextSibling);
        } else {
            targetElement.parentNode.insertBefore(placeholder, targetElement);
        }
    }

    // Hide drag placeholder
    hideDragPlaceholder() {
        const placeholder = document.getElementById('dragPlaceholder');
        placeholder.classList.remove('visible');
    }

    // Determine if dragged item should be inserted after target
    shouldInsertAfter(targetElement, event) {
        const rect = targetElement.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        return event.clientY > midpoint;
    }

    // Create HTML for a single task
    createTaskHTML(task) {
        return `
            <div class="task-item entering" data-task-id="${task.id}">
                <div class="drag-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="12" r="1"></circle>
                        <circle cx="9" cy="5" r="1"></circle>
                        <circle cx="9" cy="19" r="1"></circle>
                        <circle cx="15" cy="12" r="1"></circle>
                        <circle cx="15" cy="5" r="1"></circle>
                        <circle cx="15" cy="19" r="1"></circle>
                    </svg>
                </div>
                
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-task-id="${task.id}">
                    <svg class="checkmark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                
                <div class="task-text">${this.escapeHtml(task.text)}</div>
                
                <button class="delete-button" data-task-id="${task.id}" aria-label="Delete task">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="m19 6-1 12c0 2-2 3-4 3H10c-2 0-4-1-4-3L5 6"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                        <path d="M7 6V4c0-1 1-2 2-2h6c0-1 1-2 2-2v2"></path>
                    </svg>
                </button>
            </div>
        `;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    // Update task statistics
    updateStats() {
        const totalCount = this.tasks.length;
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        document.getElementById('totalCount').textContent = totalCount;
        document.getElementById('completedCount').textContent = completedCount;
    }

    // Show or hide empty state
    updateEmptyState() {
        const emptyState = document.getElementById('emptyState');
        const hasTasks = this.tasks.length > 0;
        
        if (hasTasks) {
            emptyState.classList.add('hidden');
        } else {
            emptyState.classList.remove('hidden');
        }
    }

    // Render all tasks
    render() {
        const container = document.getElementById('tasksContainer');
        
        if (this.tasks.length === 0) {
            container.innerHTML = '';
        } else {
            const tasksHTML = this.tasks.map(task => this.createTaskHTML(task)).join('');
            container.innerHTML = tasksHTML;
            
            // Setup event listeners for new elements
            this.tasks.forEach(task => {
                const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
                if (taskElement) {
                    this.setupTaskEvents(taskElement, task.id);
                    this.setupDragAndDrop(taskElement, task.id);
                    
                    // Apply completed class after a brief delay for animation
                    if (task.completed) {
                        setTimeout(() => {
                            taskElement.classList.add('completed');
                        }, 50);
                    }
                }
            });
        }
        
        this.updateStats();
        this.updateEmptyState();
        
        // Update add button state
        const taskInput = document.getElementById('taskInput');
        const addButton = document.getElementById('addButton');
        addButton.disabled = taskInput.value.trim() === '';
    }

    // Setup event listeners for a task element
    setupTaskEvents(taskElement, taskId) {
        const checkbox = taskElement.querySelector('.task-checkbox');
        const deleteButton = taskElement.querySelector('.delete-button');
        
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleTask(taskId);
        });
        
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteTask(taskId);
        });
    }

    // Save tasks to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('todos-tasks', JSON.stringify(this.tasks));
            localStorage.setItem('todos-counter', this.taskIdCounter.toString());
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
        }
    }

    // Load tasks from localStorage
    loadFromStorage() {
        try {
            const savedTasks = localStorage.getItem('todos-tasks');
            const savedCounter = localStorage.getItem('todos-counter');
            
            if (savedTasks) {
                this.tasks = JSON.parse(savedTasks);
            } else {
                // Load sample tasks for first-time users
                this.tasks = [
                    {
                        id: 1,
                        text: "Design new landing page",
                        completed: false,
                        createdAt: "2025-10-05T15:30:00Z"
                    },
                    {
                        id: 2,
                        text: "Review micro SaaS analytics",
                        completed: true,
                        createdAt: "2025-10-05T14:00:00Z"
                    },
                    {
                        id: 3,
                        text: "Update privacy policy",
                        completed: false,
                        createdAt: "2025-10-05T13:15:00Z"
                    }
                ];
            }
            
            if (savedCounter) {
                this.taskIdCounter = parseInt(savedCounter);
            } else {
                this.taskIdCounter = Math.max(...this.tasks.map(t => t.id), 0) + 1;
            }
        } catch (error) {
            console.warn('Failed to load from localStorage:', error);
            this.tasks = [];
            this.taskIdCounter = 1;
        }
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Service worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Only register if we have a service worker file
        // navigator.serviceWorker.register('/sw.js');
    });
}