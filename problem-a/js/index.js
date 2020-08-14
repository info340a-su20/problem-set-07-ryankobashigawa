'use strict';

/* your code goes here! */
class Task {
  constructor(string, boolean) {
    this.description = string;
    this.complete = boolean;
  }

  render() {
    let elem = document.createElement('li');
    //let complete = this.complete
    elem.textContent = this.description;
    if(this.complete) {
      elem.classList.add('font-strike');
    }
    elem.addEventListener('click', () => {
      this.toggleFinished();
      elem.classList.toggle('font-strike');
      console.log(elem);
    })
    return elem;
  }

  toggleFinished() {
    this.complete = !this.complete; //make opposite
  }
}

class TaskList {
  constructor(taskArray) {
    this.tasks = taskArray;
  }

  addTask(string) {
    this.tasks.push(new Task(string, false));
  }

  render() {
    let olElem = document.createElement('ol');
    this.tasks.forEach(task => {
      olElem.appendChild(new Task(task.description, task.complete).render());
    });
    return olElem;
  }
}

class NewTaskForm {
  constructor(callback) {
    this.submitCallback = callback;
  }
 
  render() {
    let formElem = document.createElement('form');

    // children
    let inputElem = document.createElement('input');
    inputElem.classList.add('form-control', 'mb-3');
    inputElem.setAttribute('placeholder', "What else do you have to do?");
    formElem.appendChild(inputElem);
    let buttonElem = document.createElement('button');
    buttonElem.classList.add('btn', 'btn-primary');
    buttonElem.textContent = "Add task to list";
    formElem.appendChild(buttonElem);

    buttonElem.addEventListener('click', (event) => {
      event.preventDefault();
      this.submitCallback(inputElem.value);
    });

    return formElem;
  }
}

class App {
  constructor(app, tasks) {
    this.parentElement = app;
    this.taskList = tasks;
  }

  render() {
    this.parentElement.appendChild(this.taskList.render());
    this.parentElement.appendChild(new NewTaskForm((string) => this.addTaskToList(string)).render());
  }

  addTaskToList(string) {
    this.taskList.addTask(string);
    this.parentElement.innerHTML = '';
    this.render();
  }
}

let taskListObj = new TaskList([
  new Task("Make some classes", true), 
  new Task("Arrow some functions", false)
]);
//taskListObj.addTask("A second task");


let appElem = document.querySelector('#app');
let appObj = new App(appElem, taskListObj); //instantiates app
appObj.render();

//Make functions and variables available to tester. DO NOT MODIFY THIS.
if (typeof module !== 'undefined' && module.exports) {
  /* eslint-disable */
  if (typeof Task !== 'undefined')
    module.exports.Task = Task;
  if (typeof TaskList !== 'undefined')
    module.exports.TaskList = TaskList;
  if (typeof NewTaskForm !== 'undefined')
    module.exports.NewTaskForm = NewTaskForm;
  if (typeof App !== 'undefined')
    module.exports.App = App;
}