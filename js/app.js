const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const clearBtn = document.getElementById('clear-list');
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');

//Set the list to whatver i stored in the local storage and if it is absent, make it an empty array 
let itemData = JSON.parse(localStorage.getItem('To-dos')) || [];
//if there i anything in the local storage, display it as a list item
if(itemData.length > 0){
    itemData.forEach(function(showEachTodo){
        itemList.insertAdjacentHTML('beforeend',`
        <div class="item my-3">
        <h5 class="item-name text-capitalize">${showEachTodo}</h5>
        <div class="item-icons">
         <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
         <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
         <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div> </div>`);
        handleItem(value);
    })
}

//form submission
itemForm.addEventListener('submit', function(event){
    event.preventDefault();

    const textValueSubmitted = itemInput.value;
    console.log(textValueSubmitted)

    if(textValueSubmitted === ''){
        //show error message and add bootstrap style
        showErrorMsg('Please enter a valid to-do value', 'danger')
    }
  
    else{
        //add Item
        addItem(textValueSubmitted);
        //clear the form by setting th input value to an empty string
        itemInput.value = "";
        //add to item array
        itemData.push(textValueSubmitted);
        console.log(itemData);
        //store item Data in local storage 
        //name of storage and the data

setLocalStorage();

        //add event listeners to icons because they are created in js and can only run after there is a todo so js doent call the function before adding the todo
        handleItem(textValueSubmitted);
    }
});
//feedback function
function showErrorMsg(text, style){
    //feedback is currently set to display none, add the class to show it and a bootstrap alert style to color it red
    feedback.classList.add("showItem", `alert-${style}`);
//add a paragraph tag in the div to display content
    feedback.innerHTML = `<p>${text}</p>`

    setTimeout(function(){
        feedback.classList.remove('showItem', `alert-${style}`);
}, 3000);
}

//add th item function
function addItem(value){
    //create a div and add two classes
    const div = document.createElement('div');
    div.classList.add('item', 'my-3');
    div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;
    //add it to the list item
    itemList.appendChild(div);
}

function handleItem(value){
    const todos = itemList.querySelectorAll('.item');
   
    //loop thru and check if the todo matches whatever we pass last so th event litenr selects the last added todo
todos.forEach(function(todo){
    //check if the query selector item name is the same as what is passed to the function, if it does add an event listener to the todo n  not the previous one
    if(todo.querySelector('.item-name').textContent === value){
console.log('true');
 //add event listener to d icons
 //complete event listener
let completedTodo = todo.querySelector('.complete-item');
completedTodo.addEventListener('click', function(){
    //add class completed  to the todo 
    todo.querySelector('.item-name').classList.toggle('completed');
//    //add class  visibility to the icon uing th this keyword
this.classList.toggle('visibility');
});

//Edit event listener
let editTodo = todo.querySelector('.edit-item');
editTodo.addEventListener('click', function(){
    //get the input value of the text
    itemInput.value = value;
    //remove the todo from the list items 
    itemList.removeChild(todo);
 
    //filter it out from the array too
    itemData = itemData.filter(function(todo){
        //return all not eual to that todo
        return todo !== value;
    });
    //after editing, add to the local storage
    
    setLocalStorage();         
   
});

//Delete event listener
let deleteTodo = todo.querySelector('.delete-item');
deleteTodo.addEventListener('click', function(){
    
    //remove the todo from the list items 
    itemList.removeChild(todo);
    console.log(itemData);
    //filter it out from the array too
    itemData = itemData.filter(function(todo){
        //return all not eual to that todo
        return todo !== value;
    });

    setLocalStorage();
    console.log(itemData);
    showErrorMsg('Todo Deleted', 'success');

});
    }

});

}

clearBtn.addEventListener('click', function(){
    //clear the entire array
    itemData = [];
    localStorage.removeItem("To-dos");
    const todos = itemList.querySelectorAll('.item');
    //check if todos exist
    if(todos.length > 0){
        todos.forEach(function(todo){
            //grab the parent and remove the looped throught child
            itemList.removeChild(todo);
        })
    }

})
function setLocalStorage(){
    localStorage.setItem("To-dos", JSON.stringify(itemData));
}


