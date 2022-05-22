const app = {
    addWrapper() {
        const wrapper = document.createElement('div');
        document.body.prepend(wrapper);
        wrapper.classList.add('container');
    },

    createElement(element, name, className, position) {
        name = document.createElement(element);
        position.append(name);
        name.classList.add(className);
    },

    createElementPrepend(element, name, className, position) {
        name = document.createElement(element);
        position.prepend(name);
        name.classList.add(className);
    },

    createImg(name, className, position, src) {
        name = document.createElement('img');
        position.append(name);
        name.classList.add(className);
        name.src = src;
        name.alt = className;
    },

    createBooksList(count) {
        fetch('../../pages/main/books.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                app.createElement('div', 'product', 'product', document.querySelector('.productcont'));
                app.createElement('div', 'imgWrap', 'imgWrap', document.querySelectorAll('.product')[count]);
                const imgV = data[`${count}`].img;
                app.createImg(`book${count}`, `book${count}`, document.querySelectorAll('.imgWrap')[count], imgV);
                let imgItem = document.querySelector(`.book${count}`);

                document.querySelector(`.book${count}`).classList.add('img');
                app.createElement('div', 'about-book', 'about-book', document.querySelectorAll('.product')[count]);
                app.createElement('p', 'title', 'title', document.querySelectorAll('.about-book')[count]);
                document.querySelectorAll('.title')[count].innerHTML = data[`${count}`].title;
                if (data[`${count}`].title.length < 14) app.createElement('br', 'br', 'br', document.querySelectorAll('.about-book')[count]);
                app.createElement('p', 'author', 'author', document.querySelectorAll('.about-book')[count]);
                document.querySelectorAll('.author')[count].innerHTML = data[`${count}`].author;
                app.createElement('p', 'price', 'price', document.querySelectorAll('.about-book')[count]);
                document.querySelectorAll('.price')[count].innerHTML = `$${data[`${count}`].price}`;
                app.createElement('p', 'show-more', 'show-more', document.querySelectorAll('.about-book')[count]);
                document.querySelectorAll('.show-more')[count].innerHTML = 'Show more';
                app.createElement('button', 'add-to-bag', 'add-to-bag', document.querySelectorAll('.about-book')[count]);
                document.querySelectorAll('button')[count].innerHTML = 'Add to cart';
                document.querySelectorAll('button')[count].addEventListener('click', () => app.createBooksListCart(count));
                document.querySelectorAll('.show-more')[count].addEventListener('click', () => app.showModal(count));
            });
    },

    createMainApplication() {
        app.addWrapper();
        app.createElement('div', 'fix', 'fix', document.querySelector('.container'));
        app.createElement('main', 'main', 'main', document.querySelector('.fix'));
        app.createElement('div', 'main-blocks', 'main-blocks', document.querySelector('.main'));
        app.createElement('div', 'shelf', 'shelf', document.querySelector('.main-blocks'));
        app.createElement('div', 'introduction', 'introduction', document.querySelector('.shelf'));
        app.createElement('h1', 'h1', 'h1', document.querySelector('.introduction'));
        document.querySelector('h1').innerHTML = 'Incredible Books World';
        app.createElement('p', 'intro-text', 'intro-text', document.querySelector('.introduction'));
        document.querySelector('.intro-text').innerHTML = 'A room without books is like a body without a soul';
        app.createElement('div', 'productcont', 'productcont', document.querySelector('.shelf'));
        for (let i = 0; i < 3; i += 1) {
            app.createBooksList(i);
        }
        app.createElement('div', 'space', 'space', document.querySelector('.main-blocks'));
        app.createElement('div', 'bag', 'bag', document.querySelector('.main-blocks'));
        app.createElement('div', 'bag-text', 'bag-text', document.querySelector('.bag'));
        document.querySelector('.bag-text').innerHTML = 'Cart items';

        app.createElement('footer', 'footer', 'footer', document.querySelector('.fix'));
        app.createElement('div', 'footer-blocks', 'footer-blocks', document.querySelector('.footer'));
        app.createElement('a', 'footer-links', 'footer-links', document.querySelector('.footer-blocks'));
        app.createElement('div', 'modal', 'modal', document.querySelector('.container'));
        app.createElement('div', 'modal-content', 'modal-content', document.querySelector('.modal'));
        app.createElement('p', 'modal-desc', 'modal-desc', document.querySelector('.modal-content'));
        app.createElement('span', 'closeIcon', 'close', document.querySelector('.modal-content'));
        document.querySelector('.close').innerHTML = 'X';
    },


    createBooksListCart(countItem) {
        if (document.querySelectorAll('.book-set-bag').length == 5) {
            document.querySelector('.space').innerHTML = 'Your cart is full';
            setTimeout(() => {
                document.querySelector('.space').innerHTML = ''
            },
                2000);
        } else {
            fetch('../../pages/main/books.json')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    app.createElementPrepend('div', 'book-set-bag', 'book-set-bag', document.querySelector('.bag'));
                    const imgV = data[`${countItem}`].img;
                    app.createImg(`book-bag-${countItem}`, `book-bag-${countItem}`, document.querySelectorAll('.book-set-bag')[0], imgV);
                    app.createElement('div', 'cross', 'cross', document.querySelectorAll('.book-set-bag')[0]);
                    document.querySelectorAll('.cross')[0].innerHTML = 'x';
                    app.createElement('div', 'about-book-bag', 'about-book-bag', document.querySelectorAll('.book-set-bag')[0]);
                    app.createElement('p', 'title-bag', 'title-bag', document.querySelectorAll('.about-book-bag')[0]);
                    document.querySelectorAll('.title-bag')[0].innerHTML = data[`${countItem}`].title;
                    app.createElement('p', 'author-bag', 'author-bag', document.querySelectorAll('.about-book-bag')[0]);
                    document.querySelectorAll('.author-bag')[0].innerHTML = data[`${countItem}`].author;
                    app.createElement('p', 'price-bag', 'price-bag', document.querySelectorAll('.about-book-bag')[0]);
                    document.querySelectorAll('.price-bag')[0].innerHTML = `$${data[`${countItem}`].price}`;

                    if (!document.querySelector('.bag-text').innerHTML == '') {
                        document.querySelector('.bag-text').innerHTML = '';
                        app.createElement('div', 'sum', 'sum', document.querySelector('.bag'));
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
                            if (document.querySelectorAll('.book-set-bag').length == 0) {
                                document.querySelector('.sum').innerHTML = '';
                                document.querySelector('.bag-text').innerHTML = 'Cart items';
                            }

                        })

                    }
                });
        }

    },
    totalSum() {
        let sumInBag = 0;
        const bag = document.querySelectorAll('.book-set-bag');
        for (let i = 0; i < bag.length; i += 1) {
            const x = document.querySelectorAll('.price-bag')[i].innerHTML.substring(1, document.querySelectorAll('.price-bag')[i].innerHTML.length);
            sumInBag += +x;
        }
        localStorage.setItem('sum', sumInBag);
        return sumInBag;
    },

    showModal(countItem) {
        fetch('../../pages/main/books.json')
            .then(response => {
                return response.json();
            })
            .then(data => {

                document.querySelector('.modal-desc').innerHTML = data[`${countItem}`].description;
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



app.createMainApplication();





