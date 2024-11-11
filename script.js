// Variable to track the index of the user being edited
let editIndex = null;

// Function to render users from localStorage
const renderUsers = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userContainer = document.getElementById('user-list');
    userContainer.innerHTML = '';  // Clear existing user cards

    users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Age:</strong> ${user.age}</p>
            <button id="edit-btn" onclick="editUser(${index})">Edit</button>
            <button id="delete-btn" onclick="deleteUser(${index})">Delete</button>
        `;
        userContainer.appendChild(userCard);
    });
};

// Function to add a user to localStorage
const addUser = function() {
    console.log(this)
    console.log(this.name);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let name=this.name;
    let email=this.email;
    let age=this.age;
    users.push({ name, email,age });
    console.log(name);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();  // Re-render users
};

// Function to delete a user from localStorage
const deleteUser = function(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);  // Remove user at index
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();  // Re-render users
};

// Function to edit a user
const editUser = function(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('age').value = user.age;

    // Store the index of the user being edited
    editIndex = index;
};

// Function to update the user using call to modify the users array at a specific index
const updateUser = function(name, email, age) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users[editIndex] = { name, email, age };  // Update the user at editIndex
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();  // Re-render users
    editIndex = null;  // Reset editIndex after editing
};



// Event listener for form submission (adding or editing a user)
document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    const obj={
        name,
        email,
        age
    }
    
    if (name && email && age) {
        if (editIndex !== null) {
            // If in edit mode, update the user
            updateUser(name, email, age);
        } else {
            // Otherwise, add a new user
            console.log(obj);
            addUser.call(obj);
            
        }

        document.getElementById('user-form').reset();  // Clear the form fields
    }
});

// Function to add user to localStorage (called only for adding new users)
const addUserToStorage = function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    addUser(name, email, age);
};

// Initial render of users from localStorage
renderUsers();
