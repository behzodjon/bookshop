const app = {

    //create main container
    createContainer() {
        const container = document.createElement('div');
        document.body.prepend(container);
        container.classList.add('container');
    },

    //create simple element
    createElement(element, name, className, position) {
        name = document.createElement(element);
        position.append(name);
        name.classList.add(className);
    },

    //create simple elementprepend
    createElementPrepend(element, name, className, position) {
        name = document.createElement(element);
        position.prepend(name);
        name.classList.add(className);
    },

    //create image
    createImage(name, className, position, src) {
        name = document.createElement('img');
        position.append(name);
        name.classList.add(className);
        name.src = src;
        name.alt = className;
    },


  //init application
  createMainApplication() {
    app.createContainer();
    app.createElement('main', 'main', 'main', document.querySelector('.container'));
    app.createElement('div', 'main-blocks', 'main-blocks', document.querySelector('.main'));
    app.createElement('div', 'books-table', 'books-table', document.querySelector('.main-blocks'));
    app.createElement('div', 'introduction', 'introduction', document.querySelector('.books-table'));
    app.createElement('h1', 'h1', 'h1', document.querySelector('.introduction'));
    document.querySelector('h1').innerHTML = 'Amazing BookShop';
    app.createElement('p', 'intro-text', 'intro-text', document.querySelector('.introduction'));
    document.querySelector('.intro-text').innerHTML = 'There is no friend as loyal as a book.';
    app.createElement('div', 'productcont', 'productcont', document.querySelector('.books-table'));
    for (let i = 0; i < 3; i += 1) {
        app.createBooksList(i);
    }
    app.createElement('div', 'space', 'space', document.querySelector('.main-blocks'));
    app.createElement('div', 'cart', 'cart', document.querySelector('.main-blocks'));
    app.createElement('div', 'cart-text', 'cart-text', document.querySelector('.cart'));
    document.querySelector('.cart-text').innerHTML = 'Cart items';
    app.createElement('div', 'modal', 'modal', document.querySelector('.container'));
    app.createElement('div', 'modal-content', 'modal-content', document.querySelector('.modal'));
    app.createElement('p', 'modal-desc', 'modal-desc', document.querySelector('.modal-content'));
    app.createElement('span', 'closeIcon', 'close', document.querySelector('.modal-content'));
    document.querySelector('.close').innerHTML = 'X';
},
    //populating books list
    createBooksList(item) {
        fetch('../../pages/main/books.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                app.createElement('div', 'product', 'product', document.querySelector('.productcont'));
                app.createElement('div', 'imgWrap', 'imgWrap', document.querySelectorAll('.product')[item]);
                const imageItem = data[`${item}`].img;
                app.createImage(`bookImg${item}`, `bookImg${item}`, document.querySelectorAll('.imgWrap')[item], imageItem);
                document.querySelector(`.bookImg${item}`).classList.add('img');
                document.querySelector(`.bookImg${item}`).draggable = "true";
                app.createElement('div', 'about-book', 'about-book', document.querySelectorAll('.product')[item]);
                app.createElement('p', 'title', 'title', document.querySelectorAll('.about-book')[item]);
                document.querySelectorAll('.title')[item].innerHTML = data[`${item}`].title;
                if (data[`${item}`].title.length < 14) app.createElement('br', 'br', 'br', document.querySelectorAll('.about-book')[item]);
                app.createElement('p', 'author', 'author', document.querySelectorAll('.about-book')[item]);
                document.querySelectorAll('.author')[item].innerHTML = data[`${item}`].author;
                app.createElement('p', 'price', 'price', document.querySelectorAll('.about-book')[item]);
                document.querySelectorAll('.price')[item].innerHTML = `$${data[`${item}`].price}`;
                app.createElement('p', 'show-more', 'show-more', document.querySelectorAll('.about-book')[item]);
                document.querySelectorAll('.show-more')[item].innerHTML = 'Show more';
                app.createElement('button', 'add-to-bag', 'add-to-bag', document.querySelectorAll('.about-book')[item]);
                document.querySelectorAll('button')[item].innerHTML = 'Add to cart';
                document.querySelectorAll('button')[item].addEventListener('click', () => app.createBooksListCart(item));
                document.querySelectorAll('.show-more')[item].addEventListener('click', () => app.showModal(item));
            });
    },

  


    createBooksListCart(item) {
        if (document.querySelectorAll('.book-cart').length == 4) {
            document.querySelector('.space').innerHTML = 'Your cart is full';
        } else {
            fetch('../../pages/main/books.json')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    app.createElementPrepend('div', 'book-cart', 'book-cart', document.querySelector('.cart'));
                    const imageItem = data[`${item}`].img;
                    app.createImage(`book-bag-${item}`, `book-bag-${item}`, document.querySelectorAll('.book-cart')[0], imageItem);
                    app.createElement('div', 'cross', 'cross', document.querySelectorAll('.book-cart')[0]);
                    document.querySelectorAll('.cross')[0].innerHTML = 'x';
                    app.createElement('div', 'about-book-cart', 'about-book-cart', document.querySelectorAll('.book-cart')[0]);
                    app.createElement('p', 'title-bag', 'title-bag', document.querySelectorAll('.about-book-cart')[0]);
                    document.querySelectorAll('.title-bag')[0].innerHTML = data[`${item}`].title;
                    app.createElement('p', 'author-cart', 'author-cart', document.querySelectorAll('.about-book-cart')[0]);
                    document.querySelectorAll('.author-cart')[0].innerHTML = data[`${item}`].author;
                    app.createElement('p', 'book-price', 'book-price', document.querySelectorAll('.about-book-cart')[0]);
                    document.querySelectorAll('.book-price')[0].innerHTML = `$${data[`${item}`].price}`;

                    if (!document.querySelector('.cart-text').innerHTML == '') {
                        document.querySelector('.cart-text').innerHTML = '';
                        app.createElement('div', 'sum', 'sum', document.querySelector('.cart'));
                        app.createElement('p', 'total', 'total', document.querySelector('.sum'));
                        app.createElement('button', 'total-button', 'total-button', document.querySelector('.sum'));
                        app.createElement('a', 'total-button-a', 'total-button-a', document.querySelector('.total-button'));
                        document.querySelector('.total-button-a').innerHTML = 'Checkout';
                        document.querySelector('.total-button-a').setAttribute('href', '../../pages/form');
                        document.querySelector('.total-button-a').setAttribute('target', '_blank');
                    }
                    document.querySelector('.total').innerHTML = `Total:  $ ${app.totalSum()}`;

                    for (let i = 0; i < document.querySelectorAll('.cross').length; i += 1) {
                        document.querySelectorAll('.cross')[i].addEventListener('click', (e) => {
                            e.target.parentElement.remove();
                            document.querySelector('.total').innerHTML = `Total:  $ ${app.totalSum()}`;
                            if (document.querySelectorAll('.book-cart').length == 0) {
                                document.querySelector('.sum').innerHTML = '';
                                document.querySelector('.cart-text').innerHTML = 'Cart items';
                            }

                        })

                    }
                });
        }

    },
    totalSum() {
        let totalSum = 0;
        const cart = document.querySelectorAll('.book-cart');
        for (let i = 0; i < cart.length; i += 1) {
            const x = document.querySelectorAll('.book-price')[i].innerHTML.substring(1, document.querySelectorAll('.book-price')[i].innerHTML.length);
            totalSum += +x;
        }
        return totalSum;
    },

    showModal(item) {
        fetch('../../pages/main/books.json')
            .then(response => {
                return response.json();
            })
            .then(data => {

                document.querySelector('.modal-desc').innerHTML = data[`${item}`].description;
                // Get the modal
                var modal = document.getElementsByClassName("modal");
                modal[0].style.display = "block";
                var span = document.querySelector('.close');

                // When the user clicks on <span> (x), close the modal
                span.onclick = function () {
                    modal[0].style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function (event) {
                    if (event.target == modal[0]) {
                        modal[0].style.display = "none";
                    }
                }
            });
    }
};


//init app
app.createMainApplication();




// drag and drop functionality
let draggedBook;
document.addEventListener("drag", function (event) {
    draggedBook = event.target.alt[event.target.alt.length - 1];
}, false);

document.addEventListener("dragstart", function (event) {
    event.target.style.cursor = 'grabbing';
}, false);

document.addEventListener("dragend", function (event) {
    event.target.style.opacity = "";
}, false);

document.addEventListener("dragenter", function (event) {
    if (event.target.className == "cart") {
        event.target.style.background = "#f3e5d0";
    }
}, false);

document.addEventListener("dragleave", function (event) {
    if (event.target.className == "cart") {
        event.target.style.background = "none";
    }
}, false);

document.addEventListener("dragover", function (event) {
    event.preventDefault();
}, false);

document.addEventListener("drop", function (event) {
    if (event.target.className == "cart") {
        event.target.style.background = "none";
        app.createBooksListCart(draggedBook);
    }
}, false);


