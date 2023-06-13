const $form = document.querySelector('#bookform');
const $titleInput = $form.querySelector('#title');
const $authorInput = $form.querySelector('#author');
const $pagesInput = $form.querySelector('#pages');
const $readInput = $form.querySelector('#read');
const newBookButton = document.querySelector('.addnewbookbutton');
const submitButton = document.querySelector('.submit');
const library = document.querySelector('.library');
const validationMessage = document.querySelectorAll('.validationmessage');
const bookExists = document.querySelector('#bookexistence');
const overlay = document.querySelector('.overlay')

let myLibrary = [];

/* Object Constructor */
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/* Add book to the myLibrary array */
function addBookToLibrary() {
  const title = $titleInput.value;
  const author = $authorInput.value;
  const pages = $pagesInput.value;
  const read = $readInput.checked ? 'read' : 'not read yet';

  if (title && author && pages) {
    const existingBook = myLibrary.find(book => (
      book.title === title &&
      book.author === author &&
      book.pages === pages
    ));

    if (existingBook) {
      bookExists.style.display = 'block';
      overlay.style.display='block';
    } else {
      const newBook = new Book(title, author, pages, read);
      myLibrary.push(newBook);
      displayBooks();
      $form.reset();
      $form.style.display = 'none';
      bookExists.style.display = 'none';
      hideValidationMessages();
    }
  }
}

/* Display myLibrary on the page */
function displayBooks() {
  library.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const newBook = document.createElement('div');
    newBook.classList.add('book');

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = '"' + book.title + '"';

    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = 'by ' + book.author;

    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = book.pages + " pages";

    const bookButtons=document.createElement('div');
    bookButtons.className="bookbuttons";

    const read = document.createElement('button');
    read.type = 'button';
    read.className = book.read === 'read' ? 'read' : 'notread';
    read.addEventListener('click', function (event) {
      toggleReadStatus(read);
    });
    read.textContent = book.read;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.type = 'button';
    deleteButton.className="delete";
    deleteButton.addEventListener('click', function (event) {
      deleteBook(i);
    });

    bookButtons.appendChild(read);
    bookButtons.appendChild(deleteButton);

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(bookButtons);
    

    library.appendChild(newBook);
  }
}

function toggleReadStatus(button) {
  if (button.className === 'read') {
    button.className = 'notread';
    button.textContent = 'not read';
  } else if (button.className === 'notread') {
    button.className = 'read';
    button.textContent = 'read';
  }
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

newBookButton.addEventListener('click', () => {
  $form.style.display = 'block';
  overlay.style.display='block';
});

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  if (!$form.checkValidity()) {
    showValidationMessages();
  } else {
    overlay.style.display='none';
    addBookToLibrary();
  }
});

function showValidationMessages() {
  validationMessage.forEach((div) => {
    const targetInputId = div.dataset.validationFor;
    const targetInput = document.querySelector(`#${targetInputId}`);
    div.style.display = targetInput && !targetInput.validity.valid ? 'block' : 'none';
  });
}

function hideValidationMessages() {
  validationMessage.forEach((div) => {
    div.style.display = 'none';
  });
}

function closeForm() {
  $form.reset();
  $form.style.display = 'none';
  overlay.style.display='none';
  hideValidationMessages();
}

window.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeForm();
    }
});