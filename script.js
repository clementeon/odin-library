const myLibrary = [];
const library = document.getElementById("library");
const form = document.getElementById("book-form");
const formPage = document.getElementById("form-page");

function Book(title, author, pages, read) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}
	this.title = title;
	this.author = author;
	if (pages < 0) {
		throw Error("Number of pages must be greater than 0");
	}
	this.pages = pages;
	this.read = read;
	const id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

function createCard(book) {
	
}
function displayLibrary() {
	for (const book of myLibrary) {
		const newBook = document.createElement("div");
		newBook.classList.add("book");

		const title = document.createElement("p");
		title.textContent = `${book.title}`;
		title.classList.add("title");

		const author = document.createElement("p");
		author.textContent = `${book.author}`;
		author.classList.add("author");

		const pages = document.createElement("p");
		pages.textContent = `${book.pages}`;
		pages.classList.add("pages");

		const read = document.createElement("p");
		read.textContent = `${book.read}`;
		pages.classList.add("read");

		newBook.append(title, author, pages, read);
		myLibrary.push(newBook);
	}
}

form.addEventListener('submit', function(event) {
	event.preventDefault();
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const pages = document.getElementById('pages').value;
	const read = document.getElementById('read').checked;

	addBookToLibrary(title, author, pages, read);

	formPage.style.display = 'none';

	library.innerHTML = "";
	displayLibrary();
	form.reset();
})

const Hobbit = addBookToLibrary("The Hobbit", "J.R.R. Tolkein", 295, true);
const HP1 = addBookToLibrary("Harry Potter", "JK ROWLING", 120, false);
const F451 = addBookToLibrary("Farenheit 451", "IDK", 100, true);

displayLibrary();