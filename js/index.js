$(document).ready(function () {
    // Initialize the calendar
    $('#calendar').evoCalendar({
        'eventDisplayDefault': false,
        'eventListToggler': false,
        'sidebarDisplayDefault': false,
        theme: 'Orange Coral'
    });

    // Function to update the clock
    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        // Add leading zeros to single-digit minutes/seconds
        hours = (hours < 10 ? "0" : "") + hours;
        minutes = (minutes < 10 ? "0" : "") + minutes;
        seconds = (seconds < 10 ? "0" : "") + seconds;

        // Format the time string
        var timeString = hours + ":" + minutes + ":" + seconds + " " + ampm;

        // Update the clock
        $('#time').text(timeString);
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Load existing tasks from local storage
    loadTasks();

    // Add new task on Enter key press
    $('#task-input').on('keypress', function (e) {
        if (e.which === 13) { // 13 is the key code for Enter
            var task = $(this).val().trim();

            if (task !== '') {
                addTask(task);
                saveTaskToLocalStorage(task);
                $(this).val(''); // Clear the input field
            }
        }
    });

    // Delete a task when the "x" button is clicked
    $('#tasks').on('click', '.delete-btn', function () {
        var taskText = $(this).parent().text().replace('x', '').trim();
        removeTaskFromLocalStorage(taskText);
        $(this).parent().remove();
    });

    // Function to add a new task to the list with a delete button
    function addTask(task) {
        $('#tasks').append('<li>' + task + '<button class="delete-btn">x</button></li>');
    }

    // Save a new task to local storage
    function saveTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load all tasks from local storage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }

    // Remove a task from local storage
    function removeTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
