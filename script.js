// 1a. Grab the draggable list & check element
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

// 1b. array of Richest People
const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warrent Buffet',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellision',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

// 1c. Store listsItem
const listItems = [];

let dragStartIndex;

createList();

// 1d. Insert list items into DOM
function createList () {
    // 1e. use spread operator to copy of the lists
    [...richestPeople]
    // 2a. Take array and return new array using map w/ random sort
    .map(a => ({ value: a, sort: Math.random() }))
    // 2b. create a sort value using comparison data
    .sort((a, b) => a.sort - b.sort)
    // 2c. map through the sorted data and return the value
    .map(a => a.value)

    .forEach((person, index)=> {

        // 1f. create HTML element for listItem
        const listItem = document.createElement('li')

        
        // 1g. set the data-index for referencing
        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `;

        // 1h. push put the listItem
        listItems.push(listItem)

        // 1i. append the li into the ul
        draggable_list.appendChild(listItem)
    })

    addEventListeners();
}

// create a function around drags
function dragStart() {
    // console.log('Event: ', 'dragstart')
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    // console.log('Event: ', 'dragenter')
    this.classList.add('over')
}

function dragLeave() {
    // console.log('Event: ', 'dragleave')
    this.classList.remove('over')
}

function dragOver(e) {
    // console.log('Event: ', 'dragover')
    // use preventDefault to stop the default event
    e.preventDefault()
}

function dragDrop() {
    // console.log('Event: ', 'drop')
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)

    // remove the over class so the dark background doesn't stay
    this.classList.remove('over')
}

// Swap list items taht are drag and drop
// create the swap items w/ fromIndex =drag , and toIndex = for drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    // swap the item based on picked references
    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

// check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable')
        .innerText.trim()

         // check if the person name index vs new order index to set right or wrong class
    if(personName !== richestPeople[index]) {
        listItem.classList.add('wrong')
    } else {
        listItem.classList.remove('wrong')
        listItem.classList.add('right')
    }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    // loop through the draggable with forEach
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

     // loop through the dragListItems with forEach
     dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check.addEventListener('click', checkOrder)