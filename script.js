const myLibrary = [];
const library = document.getElementById("library");
const form = document.getElementById("book-form");
const formPage = document.getElementById("form-page");
const addBook = document.getElementById("add");
const cancel = document.getElementById("cancel");

function Book(title, author, pages, read) {
	// Constructor for creating a Book object
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
	this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
	// Function to add book to library
	myLibrary.push(book);
}

function createCard(book) {
	// Function for creating HTML for new books
	const newBook = document.createElement("div");
	newBook.classList.add("book");
	newBook.id = book.id;

	const title = document.createElement("h2");
	title.textContent = `${book.title}`;
	title.classList.add("title");

	const author = document.createElement("p");
	author.textContent = `Author: ${book.author}`;
	author.classList.add("author");

	const pages = document.createElement("p");
	pages.textContent = `Pages: ${book.pages} pages`;
	pages.classList.add("pages");

	const read = document.createElement("p");
	if (book.read) {
		read.textContent = `Status: Read`;
	} else {
		read.textContent = `Status: Not Read`;
	}
	read.classList.add("read");

	const editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.type = "button";
	editButton.id = "edit";

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.type = "button";
	deleteButton.id = "delete";

	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("button-container");
	buttonContainer.append(editButton, deleteButton);

	deleteButton.addEventListener("click", function (event) {
		const target = document.getElementById(`${newBook.id}`);
		target.remove();
	});

	editButton.addEventListener("click", function (event) {
		formPage.style.display = "inline";
		form.className = "editOld";
		const formTitle = document.getElementById("title");
		const formAuthor = document.getElementById("author");
		const formPages = document.getElementById("pages");
		const formCheckbox = document.getElementById("read");

		formTitle.value = `${book.title}`;
		formAuthor.value = `${book.author}`;
		formPages.value = `${book.pages}`;
		formCheckbox.checked = book.read;
		document.getElementById("edit-book-id").value = newBook.id;
	});

	newBook.append(title, author, pages, read, buttonContainer);
	library.append(newBook);
}
function displayLibrary() {
	// Function to display the books in library in HTML
	for (const book of myLibrary) {
		createCard(book);
	}
}

form.addEventListener("submit", function (event) {
	event.preventDefault();
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const pages = document.getElementById("pages").value;
	const read = document.getElementById("read").checked;

	// Event Listener to process form information
	if (form.className == "editOld") {
		const target = document.getElementById(`edit-book-id`).value;

		if (target) {
			const books = document.querySelectorAll(".book");
			for (let current of books) {
				if (current.id == target) {
					current.querySelector(".title").textContent = title;
					current.querySelector(".author").textContent =
						`Author: ${author}`;
					current.querySelector(".pages").textContent =
						`Pages: ${pages} pages`;
					if (read) {
						current.querySelector(".read").textContent =
							"Status: Read";
					} else {
						current.querySelector(".read").textContent =
							"Status: Not Read";
					}
				}
			}

			for (let current of myLibrary) {
				if (current.id == target) {
					current.title = title;
					current.author = author;
					current.pages = pages;
					current.read = read;
				}
			}
		}
		form.className = "submitNew";
	} else {
		const tempBook = new Book(title, author, pages, read);
		myLibrary.push(tempBook);
		createCard(tempBook);
	}
	formPage.style.display = "none";
	form.reset();
});

addBook.addEventListener("click", function (event) {
	// Event listener to open the form
	formPage.style.display = "inline";
	form.className = "submitNew";
});

cancel.addEventListener("click", function (event) {
	// Event listener to close the form
	form.reset();
	formPage.style.display = "none";
});
const Hobbit = new Book("The Hobbit", "J.R.R. Tolkein", 295, true);
const HP1 = new Book("Harry Potter", "JK ROWLING", 120, false);
const F451 = new Book("Farenheit 451", "IDK", 100, true);
addBookToLibrary(Hobbit);
addBookToLibrary(HP1);
addBookToLibrary(F451);

displayLibrary();
