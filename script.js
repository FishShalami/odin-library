const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
}

Book.prototype.info = function() {
    return this.title + ", " + this.author + ", " + this.pages + ", " + this.read;
}

Book.prototype.readStatus = function() {
    if (this.read === 'notRead') {
        this.read = 'read';
    } else {
        this.read = 'notRead'
    }
    libraryLoop()
};

function addBookToLibrary(title, author, pages, read) {
    let  newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    libraryLoop();
}

const library = document.querySelector(".library");




function libraryLoop() {
    library.innerHTML = ""; // Clear existing content
    // myLibrary sort

    myLibrary.sort((a, b) => {
        const titleA = a.title.toLowerCase(); // Convert to lowercase for case-insensitive comparison
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1; // a comes before b
        if (titleA > titleB) return 1;  // a comes after b
        return 0; // a and b are equal
    });



    for (let book of myLibrary) {
        const libraryCard = document.createElement('div');
        libraryCard.classList.add('libraryCard');
        
        const cardTitle = document.createElement('p');
        cardTitle.classList.add('bookTitle');
        cardTitle.innerText = `${book.title}`;
        
        const cardAuthor = document.createElement('p');
        cardAuthor.classList.add('bookAuth');
        cardAuthor.innerText = `Author: ${book.author}`;

        const cardPages = document.createElement('p');
        cardPages.classList.add('bookPages');
        cardPages.innerText = `Pages: ${book.pages}`;

        const cardRead = document.createElement('p');
        cardRead.classList.add('bookRead');
        cardRead.innerText = `Read: ${book.read === "read" ? "Yes" : "No"}`;

        const cardButtons = document.createElement('div');
        cardButtons.classList.add('cardButtons');
        
        const delBookButton = document.createElement('button');
        delBookButton.classList.add('delBook');
        delBookButton.innerText = 'Delete';

        const readBookButton = document.createElement('button');
        readBookButton.classList.add('readBook');
        readBookButton.innerText = 'Read?';

        cardButtons.append(delBookButton, readBookButton);
        libraryCard.append(cardTitle, cardAuthor, cardPages, cardRead, cardButtons);
        library.appendChild(libraryCard);
    }
}

const dialog = document.querySelector('dialog')

document.querySelector('button.newBook').addEventListener('click', () => {
    dialog.showModal();
}); 

document.querySelector('button.dialogClose').addEventListener("click", (e) => {
    e.preventDefault(); //allows close even if fields empty
    dialog.close();
});

document.querySelector('form[name="addBook"]').addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from reloading page
    
    const form = event.target;
    const title = form.title.value.trim();
    const author = form.author.value.trim();
    const pages = form.pages.value.trim();
    const read = form.readYN.value;

    if (title && author && pages) {
        addBookToLibrary(title, author, pages, read);
        form.reset(); // Reset form fields
        document.querySelector('dialog').close(); // Close dialog
    } else {
        alert("Please fill in all fields.");
    }
});

//remove book from library
library.addEventListener('click', (event) => {
    if (event.target.classList.contains('delBook')) {
        // Find the book index using the card title
        const card = event.target.closest('.libraryCard');
        const title = card.querySelector('.bookTitle').innerText;

        // Find the book in the array and remove it
        const index = myLibrary.findIndex(book => book.title === title);
        if (index !== -1) {
            myLibrary.splice(index, 1); // Remove book from array
            libraryLoop(); // Refresh library display
        }
    }
});

library.addEventListener('click', (event) => {
    if (event.target.classList.contains('readBook')) {
        // Find the book index using the card title
        const card = event.target.closest('.libraryCard');
        const title = card.querySelector('.bookTitle').innerText;

        // Find the book in the array and remove it
        const index = myLibrary.findIndex(book => book.title === title);
        if (index !== -1) {
            myLibrary[index].readStatus()
        }
    }
});



//change read status

// library.addEventListener('click', (event) => {
//     if (event.target.classList.contains('readBook')) {
//         // Find the book index using the card title
//         const card = event.target.closest('.libraryCard');
//         const title = card.querySelector('.bookTitle').innerText;

//         // Find the book in the array and change the read status
//         const index = myLibrary.findIndex(book => book.title === title);
//         if (index !== -1 && myLibrary[index].read === 'notRead') {
//             myLibrary[index].read = 'read' // Remove book from array
//             libraryLoop(); // Refresh library display
//         }
//     }
// });




addBookToLibrary("Another Book Another Book! Another Book! Another Book Another Book!", "Sean Connery", "200 pages", "read");

addBookToLibrary("More Books", "Tim Letterman", "100 pages", "notRead");

addBookToLibrary("Book!", "Bob Jones", "300 pages", "read");

addBookToLibrary("Mockingbird", "Sean Jonathan", "900 pages", "notRead");

addBookToLibrary("More Books", "Tim Letterman", "100 pages", "notRead");

addBookToLibrary("Book!", "Bob Jones", "300 pages", "read");

addBookToLibrary("Mockingbird", "Sean Jonathan", "900 pages", "notRead");

libraryLoop(); 