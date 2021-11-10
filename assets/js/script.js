var currentDayEl = document.querySelector("#currentDay");
var bodyEl = document.querySelector("body");
var containerEl = document.querySelector(".container");
var taskTimeEl = document.querySelector(".taskTime");
var taskEl = document.querySelector(".task");

var taskTimes = [
    "0<span>9</span>:00",
    "<span>10</span>:00",
    "<span>11</span>:00",
    "<span>12</span>:00",
    "<span>13</span>:00",
    "<span>14</span>:00",
    "<span>15</span>:00",
    "<span>16</span>:00", 
    "<span>17</span>:00"
];
var savedTasks = [{
    saved: ""
}
];

var displayToday = function() {
    currentDayEl.textContent = moment().format('dddd, MMMM Do');
};

var createTimeBlocks = function() {
    for (var i = 0; i < taskTimes.length; i++) {
        if (!savedTasks) {
            savedTasks = "";
        };

        var taskTimeEl = $("<div>").addClass("taskTime col-1 py-4 border border-secondary border-left-0 height-66").attr("id", "time" + [i]).html(taskTimes[i]);
        var taskEl = $("<div>").addClass("task text-white col-10 py-4 border-top border-bottom border-white height-66").attr("id", "task" + [i]).text(savedTasks[i]);
        var saveButtonEl = $("<button>").addClass("col-1 btn btn-info border-top border-bottom border-white rounded-lg rounded-right height-66").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save-fill" viewBox="0 0 16 16"><path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z"/></svg>');
        // all new elements are appended to the .container div in the <body>
        $(containerEl).append(taskTimeEl, taskEl, saveButtonEl);
    };
    var btnDelete = $("<button>").addClass(".btn btn-danger col-10 rounded-lg height-66").attr("id", "delete").text("CLEAR ALL TASKS");
    $(".container").append(btnDelete);
};

var loadTasks = function() {
    savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
};

// var saveTasks = function () {
//     $(".task").each(function() {
//         savedTasks.push(taskEl.text());
//     });
//     console.log(savedTasks);
//     localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
// };

var auditTask = function() {
    // has to iterate through each taskEl and number of taskEl === number of taskTimes so we can iterate as many times as indices of taskTimes array
    for (var i = 0; i < taskTimes.length; i++) {
        // get time from <span> and convert to moment object
        var time = $("#time" + [i]).find("span").text();
        var momentTime = moment(time, "LT");

        // remove old classes from .task div (for background color)
        $("#task" + [i]).removeClass("bg-secondary bg-danger bg-success");

        // add new class to element (for background color) accordingly
        if (moment().isAfter(momentTime.add(1, "hours"))) {
            $("#task" + [i]).addClass("bg-secondary");
        } else if (Math.abs(moment().diff(momentTime, "hours")) >= 1) {
            $("#task" + [i]).addClass("bg-success");
        } else {
            $("#task" + [i]).addClass("bg-danger");
        };
    }
};

// .task <div> was clicked to make it editable
$(".container").on("click", ".task", function() {
    var text = $(this).text().trim();
    var id = $(this)[0].id
    var textInput = $("<textarea>").addClass("form-control col-10").attr("id", id).val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

// save button was clicked to save edited field and change it back into a <div> from a <textarea> element
$(".container").on("click", ".btn", function() {
    var id = $(this).siblings("textarea")[0].id
    var text = $("#" + id).val();
    var editedTask = $("<div>").addClass("task text-white col-10 py-4 border-top border-bottom border-white height-66").attr("id", id).text(text);

    $(this).siblings("textarea").replaceWith(editedTask);
    // savedTasks = ($(".task").text());
    // console.log(savedTasks);
    // localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    auditTask();
});

// clears all tasks on new day and on button click
$(".container").on("click", "#delete", function() {
    $(".task").empty();
    savedTasks = [];
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
});

displayToday();
loadTasks();
createTimeBlocks();
auditTask();
// auditTask() is called on page load and every hour on the hour via setInterval()
setInterval(function() {
    var mins = new Date().getMinutes();
    if (mins == "00") {
        auditTask();
    }
}, 1000 * 60);
