//jshint esversion:8

window.addEventListener('load', () => {
    setTimeout(() => {
        const circle = document.getElementById('loader');
        circle.remove();

    }, 3000);
    // console.log(circle);
});

// Class Book: create book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//class UI: manages UI
class UI {

    static displayBooks() {
        const booksList = Storage.getBooks();

        booksList.forEach((book) => {
            UI.addItemsToList(book);
        });
    }

    static addItemsToList(book) {
        const listItems = document.querySelector('#book-list');
        const row = document.createElement('tr');
        // console.log(row);

        const items = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        // console.log(items);
        row.innerHTML = items;
        listItems.appendChild(row);
        //     listItems.append(items);

    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('number').value = '';
    }

    static removeBook(el) {
        console.log(el);
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static alertmsg(msg, className) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${className} my-3 p-2`;
        alertDiv.textContent = msg;
        const container = document.querySelector('.container');
        const form = document.getElementById('myform');

        container.insertBefore(alertDiv, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
        // <div id="alert" class="form-group my-3">
    }

    static displayList() {
        document.querySelector('#table').classList.remove('d-none');
    }

}

//class Storage : Handles Storage

class Storage {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
            UI.displayList();
        }
        return books;
    }

    static addBook(book) {
        var books = Storage.getBooks();
        books.push(book);
        UI.displayList();
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Storage.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add Book
document.querySelector('#myform').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const number = document.getElementById('number').value;

    // validate the form

    if (title === '' || author === '' || number === '') {
        alert('Please Fill up all the Fields First!');
    } else {
        const newBookDetails = new Book(title, author, number);
        UI.addItemsToList(newBookDetails);
        Storage.addBook(newBookDetails);
        UI.clearFields();
        UI.alertmsg('BOOK ADDED SUCCESSFULLY!!!', 'success');
    }

});

//Event: Remove Book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.removeBook(e.target);
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.alertmsg('BOOK REMOVED SUCCESSFULLY!!!', 'danger');
});

