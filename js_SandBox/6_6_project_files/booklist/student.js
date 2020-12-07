class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //Create a tr (table row) element
    const row = document.createElement('tr');
    //Insert columns
    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
           <td><a href="#" class="delete">X</a></td>
      `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    //create div
    const div = document.createElement('div');

    //Add classes
    div.className = `alert ${className}`;

    //Add text
    div.appendChild(document.createTextNode(message));

    //Get parent
    const container = document.querySelector('.container');

    //Get form
    const form = document.querySelector('#book-form');

    //Insert alert
    container.insertBefore(div, form);

    //timeout after 3 seconds
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {

  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook() {

  }
}

//Event listener for add book
document.getElementById('book-form').addEventListener('submit',
  function (e) {
    //Get form values
    const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;

    //instantiate book
    const book = new Book(title, author, isbn);
    //console.log(book);

    //instantiate UI
    const ui = new UI();

    //Validation
    if (title === '' || author === '' || isbn === '') {
      //Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      //add book to list
      ui.addBookToList(book);

      //show success
      ui.showAlert('Book Added!', 'success');


      //clear fields
      ui.clearFields();
    }



    e.preventDefault();
  });


//Event listener for delete
document.getElementById('book-list').addEventListener('click',
  function (e) {
    console.log(123);

    //instantiate UI
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

    //show alert message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
  });