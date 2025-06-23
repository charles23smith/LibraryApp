//library array
const myLibrary = [] ; 

//write constructor for making book objects 
function Book(title, author, pages) {
    
    //defaults
    this.title = title ; 
    this.author = author ; 
    this.pages = pages ; 
    this.read = false ; 
    this.id = crypto.randomUUID() ; 

};

//second function to take in arguments, create book, and store to library array
function addBookToLibrary(title, author, pages = 'unknown') {
    //create the book with parameters
    const newBook = new Book(title, author, pages) ; 

    //store new book in the array (only if there is < 50 books)
    if (myLibrary.length < 50) {
        myLibrary.push(newBook) ; 
        displayLibrary() ; 
    } else {
        throw Error("Too many books") ; 
    }
    
};

function displayLibrary() {
    //empty if second attempt or more 
    const libraryContainer = document.getElementById("library-container") ; 
    libraryContainer.innerHTML = "" ; 

    //iterate library and print each book
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("book-stats");

        //HTML book card 
        card.innerHTML = `
            <h3 class = "font">${book.title}</h3>
            <p class = "font"><strong>Author:</strong> ${book.author}</p>
            <p class = "font"><strong>Pages:</strong> ${book.pages}</p>
            <p class = "font"><strong>Read:</strong> <span class="read-status">${book.read ? "Yes" : "No"}</span></p>
            <button class="read-button font" data-id="${book.id}">${book.read ? "Mark Unread" : "Mark Read"}</button>
            <button class="remove-button font" data-id="${book.id}">Remove</button>
        `;

        libraryContainer.appendChild(card);
    });

    // Hook up button actions
    document.querySelectorAll(".remove-button").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.dataset.id;
            removeBookById(id);
            displayLibrary();
        });
    });

    document.querySelectorAll(".read-button").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.dataset.id;
            toggleReadStatus(id);
            displayLibrary();
        });
    });
    
};

//hook the form submission to add new books
document.getElementById("form-box").addEventListener("submit", function(e) {
    //prevent form to submit to server
    e.preventDefault() ; 

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = document.getElementById("pages").value.trim() || "unknown";

    if (title && author) {
        addBookToLibrary(title, author, pages);
        displayLibrary();
        closeForm();
        this.reset();
    }
})


//function to pull up addBooks button
function libraryForm() {
    document.getElementById("popup").classList.remove("hidden") ;
}

//function to remove form
function closeForm() {
    document.getElementById("popup").classList.add("hidden") ;
}

//function to remove books
function removeBookById(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

//function to toggle the read status
function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.read = !book.read;
    }
}

//escape functionality
document.addEventListener("keydown", function(event) {
    const popup = document.getElementById("popup") ; 
    if (event.key === "Escape" && !popup.classList.contains("hidden")) {
        closeForm() ; 
    }
});


//add default books
addBookToLibrary("Harry Potter", "JK Rowling", 300) ; 
addBookToLibrary("Harry Potter2", "JK Rowling", 400) ; 
addBookToLibrary("Harry Potter3", "JK Rowling") ; 


//display books
displayLibrary() ; 