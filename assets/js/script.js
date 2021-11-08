var currentDayEl = document.querySelector("#currentDay");
var bodyEl = document.querySelector("body");
var containerEl = document.querySelector(".container");
var taskTimeEl = document.querySelector(".taskTime");
var taskEl = document.querySelector(".task");

var counter = 0;
var taskTimes = ["<span>9</span> AM", "<span>10</span> AM", "<span>11</span> AM", "<span>12</span> PM", "<span>1</span> PM", "<span>2</span> PM", "<span>3</span> PM", "<span>4</span> PM", "<span>5</span> PM"];
var taskTimeElArr = [];
var taskElArr = [];

var displayToday = function() {
    currentDayEl.textContent = moment().format('dddd, MMMM Do');
};

var createTimeBlocks = function() {
    for (var i = 0; i < taskTimes.length; i++) {

        var taskTimeEl = $("<div>").addClass("taskTime col-1 py-4 border border-secondary border-left-0 height-66").html(taskTimes[i]);
        // each new taskTimeEl is pushed to taskTimeElArr to be used in auditTask() -- for some reason, all 9 taskTimeEl's are being pushed to the takTimeElArr here 9 times
        taskTimeElArr.push(taskTimeEl);
        console.log(taskTimeEl);
        console.log(taskTimeElArr);

        var taskEl = $("<div>").addClass("task col-10 py-4 border-top border-bottom border-white height-66").text("task goes here");
        // each new taskEl is pushed to taskElArr to be used in auditTask() -- for some reason, all 9 taskEl's are being pushed to the taskElArr here 9 times
        taskElArr.push(taskEl);
        console.log(taskEl);
        console.log(taskElArr);

        var saveButtonEl = $("<button>").addClass("col-1 btn btn-info border-top border-bottom border-white rounded-lg rounded-right height-66").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save-fill" viewBox="0 0 16 16"><path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z"/></svg>');
        // all new elements are appended to the .container div in the <body>
        $(containerEl).append(taskTimeEl, taskEl, saveButtonEl);
    };
};

var auditTask = () => {
    // has to iterate through each taskEl from taskElArr
    for (var i = 0; i < taskElArr.length; i++) {
        // get time from <span> and convert to moment object
        var time = $(taskTimeElArr[counter]).find("span").text();
        console.log(time);
        var momentTime = moment(time, "LT");
        console.log(momentTime);

        // remove old classes from .task div (for background color)
        $(taskElArr[i]).removeClass("bg-secondary bg-danger bg-success");

        // add new classes to element (for background color) if task is at or after hour accordingly
        if (moment().isAfter(momentTime + 1)) {
            $(taskElArr[counter]).addClass("bg-secondary");
        } else if (moment().isBetween(momentTime, momentTime + 1)) {
            $(taskElArr[counter]).addClass("bg-danger");
        } else {
            $(taskElArr[counter]).addClass("bg-success");
        };
    }
    counter++;
};

displayToday();
createTimeBlocks();
// setInterval(function() {
//     $(taskEl).each(function() {
//         auditTask();
//     });
// }, 1000 * 60 * 60);

auditTask();
