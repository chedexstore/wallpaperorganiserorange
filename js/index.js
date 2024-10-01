$(document).ready(function() {
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

    // Load tasks from local storage on page load
    loadTasks();

    // Add new task on Enter key press
    $('#task-input').on('keypress', function(e) {
        if (e.which === 13) { // 13 is the key code for Enter
            var task = $(this).val().trim();
            
            if (task !== '') {
                addTask(task);
                $(this).val(''); // Clear the input field
            }
        }
    });
    
    // Delete a task when the "x" button is clicked
    $('#tasks').on('click', '.delete-btn', function() {
        $(this).parent().remove();
        saveTasks(); // Update local storage after deletion
    });

    // Check if all tasks are checked and delete them
    $('#tasks').on('change', '.task-checkbox', function() {
        // Check if all checkboxes are checked
        if ($('.task-checkbox:checked').length === $('.task-checkbox').length) {
            $('#tasks').empty(); // Clear all tasks
            saveTasks(); // Update local storage after clearing
        } else {
            saveTasks(); // Update local storage if any checkbox is changed
        }
    });

    // Function to add a task
    function addTask(task) {
        $('#tasks').append(
            '<li>' + 
            '<input type="checkbox" class="task-checkbox"> ' + 
            '<span class="task-text">' + task + '</span>' + 
            '<button class="delete-btn">x</button>' + 
            '</li>'
        );
        saveTasks(); // Update local storage after adding
    }

    // Function to save tasks to local storage
    function saveTasks() {
        let tasks = [];
        $('#tasks li').each(function() {
            let taskText = $(this).find('.task-text').text();
            let isChecked = $(this).find('.task-checkbox').is(':checked');
            tasks.push({ text: taskText, completed: isChecked });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            $('#tasks').append(
                '<li>' + 
                '<input type="checkbox" class="task-checkbox"' + (task.completed ? ' checked' : '') + '> ' + 
                '<span class="task-text">' + task.text + '</span>' + 
                '<button class="delete-btn">x</button>' + 
                '</li>'
            );
        });
    }
});
