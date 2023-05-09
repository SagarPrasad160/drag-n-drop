const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const listColumns = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];

let listArrays = [];

// currentColumn
let currentColumn;
// Drag Functionality
let draggedItem;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["Release the course", "Sit back and relax"];
    progressListArray = ["Work on projects", "Listen to music"];
    completeListArray = ["Being cool", "Getting stuff done"];
    onHoldListArray = ["Being uncool"];
  }
}
getSavedColumns();
updateSavedColumns();

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const arrayNames = ["backlog", "progress", "complete", "onHold"];

  // Making a copy of listArrays
  const listArraysCopy = [...listArrays];
  arrayNames.forEach((name) => {
    localStorage.setItem(
      `${name}Items`,
      JSON.stringify(listArraysCopy.shift())
    );
  });
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log("columnEl:", columnEl);
  // console.log("column:", column);
  // console.log("item:", item);
  // console.log("index:", index);
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "drag(event)");
  columnEl.append(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  // Backlog Column
  backlogList.innerHTML = "";
  backlogListArray.forEach((backlogEl, index) =>
    createItemEl(backlogList, 0, backlogEl, index)
  );

  // Progress Column
  progressList.innerHTML = "";
  progressListArray.forEach((progressEl, index) =>
    createItemEl(progressList, 0, progressEl, index)
  );

  // Complete Column
  completeList.innerHTML = "";
  completeListArray.forEach((completeEl, index) =>
    createItemEl(completeList, 0, completeEl, index)
  );

  // On Hold Column
  onHoldList.innerHTML = "";
  onHoldListArray.forEach((onHoldEl, index) =>
    createItemEl(onHoldList, 0, onHoldEl, index)
  );
  // Run getSavedColumns only once, Update Local Storage
}

function drag(event) {
  draggedItem = event.target;
}

function allowDrop(event) {
  event.preventDefault();
}

function dragEnter(column) {
  currentColumn = listColumns[column];
  listColumns[column].classList.add("over");
}

function drop(event) {
  event.preventDefault();
  // Remove Background Colors/Padding
  listColumns.forEach((column) => column.classList.remove("over"));
  // Add Item
  currentColumn.append(draggedItem);
}

updateDOM();
