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

function addBookToLibrary(title, author, pages, read) {
    let  newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

const library = document.querySelector(".library");




function libraryLoop(myLibrary) {
    for (let book of myLibrary) {
        //  console.log(book.title);
         const libraryCard = document.createElement('div');
         libraryCard.classList.add('libraryCard');
         library.appendChild(libraryCard);
         const cardTitle = document.createElement('p');
         cardTitle.classList.add('bookTitle');
         cardTitle.innerText = book.title;
         libraryCard.appendChild(cardTitle);
         const cardAuthor = document.createElement('p');
         cardAuthor.classList.add('bookAuth');
         cardAuthor.innerText = book.author;
         libraryCard.appendChild(cardAuthor);
    };
}


addBookToLibrary("Another Book!", "Sean Connery", "200 pages", "read");

addBookToLibrary("More Books", "Tim Letterman", "100 pages", "not read");

addBookToLibrary("Book!", "Bob Jones", "300 pages", "read");

addBookToLibrary("Mockingbird", "Sean Jonathan", "900 pages", "not read");

