
const $form = document.querySelector('fieldset')
const $titleInput = $form.querySelector('#title');
const $authorInput = $form.querySelector('#author');
const $pagesInput = $form.querySelector('#pages');
const $readInput = $form.querySelector('#read');
const $notreadInput = $form.querySelector('#notread');
const newBookButton = document.querySelector(".addnewbookbutton")
const bookForm = document.querySelector(".bookform")
const addNewBookButton = document.querySelector(".submit")
const library = document.querySelector(".library");

let myLibrary=[];

/* Object Constructor */
function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

/* Add book to the myLibrary array */
function addBookToLibrary(){
    let title = $titleInput.value;
    let author = $authorInput.value;
    let pages = $pagesInput.value;
    if ($readInput.checked === true ){
        read = "read";
    }
    else if ($notreadInput.checked === true){
        read = "not read yet";
    }

    let newBook = new Book(title,author,pages,read)
    myLibrary.push(newBook);
    displayBook();
}

/* displsy myLibrary on page */
function displayBook(){
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    const title = document.createElement('div');
    title.classList.add('title');
    const author = document.createElement('div');
    author.classList.add('author');
    const pages = document.createElement('div');
    pages.classList.add('pages');
    const read = document.createElement('div');
    read.classList.add('read');

    for (let i = 0, l = myLibrary.length;i<l;i++){
        let obj = myLibrary[i];
        title.textContent = "Title: "+ obj.title;
        author.textContent = "Author: "+ obj.author;
        pages.textContent = "Pages: " + obj.pages;
        read.textContent = "Read? " + obj.read;
    }

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);

    library.appendChild(newBook);
}

newBookButton.addEventListener('click',()=>{
    bookForm.style.visibility="visible";
})

addNewBookButton.addEventListener('click',function(event){
    event.preventDefault();
    addBookToLibrary();
})
