async function getProducts() {
    try {
        const data = await fetch("https://ecommercebackend.fundamentos-29.repl.co/");

        const res = await data.json();

        window.localStorage.setItem("products", JSON.stringify(res));

        return res

    } catch (error) {
        console.log(error);
    }
}

function printProduct(db) {
    const productsHTML = document.querySelector(".products")

    let html = '';

    for (const product of db.products) {

        const buttonAdd = product.quantity ? `<i class="fa-solid fa-plus" id='${product.id}'></i>` : `<span class="soldOut">sold out</span>`


        html +=
            `
        <div class="product">
            <div class=product__img> 
                <img src="${product.image}" alt="image the product" />
            </div>

            <div class="products__info">
                
                <div class="content__plus">${buttonAdd}</div>
                
                <h3> $${product.price} <span>stock: ${product.quantity} </span> </h3>
                <h4> ${product.name} </h4>
            </div>
        </div> 
        `
    }

    productsHTML.innerHTML = html;

}

function bag() {
    const bagHTML = document.querySelector(".content-bag");
    const MybagsHTML = document.querySelector(".Mybags");

    bagHTML.addEventListener("click", function () {
        MybagsHTML.classList.toggle("bag__show");
    });

}


function menu() {
    const bagHTML = document.querySelector(".fa-bars");
    const MybagsHTML = document.querySelector(".menu");

    bagHTML.addEventListener("click", function () {
        MybagsHTML.classList.toggle("bag__show");
    });

}

function addProductToBag(db) {
    const productsHTML = document.querySelector(".products");

    productsHTML.addEventListener("click", function (e) {
        if (e.target.classList.contains("fa-plus")) {
            const id = Number(e.target.id);

            const productFine = db.products.find((products) => products.id === id);

            if (db.bag[productFine.id]) {

                if (productFine.quantity === db.bag[productFine.id].amount) return alert("No tenemos mas en bodega")

                db.bag[productFine.id].amount++;
            } else {
                db.bag[productFine.id] = { ...productFine, amount: 1 }
            }

            window.localStorage.setItem("bag", JSON.stringify(db.bag))
            printProductBag(db);
            notificationInBag(db)

        }
    });

}

function printProductBag(db) {

    const bag__productsHTML = document.querySelector(".bag__products");


    let html = ""
    for (const product in db.bag) {
        const { quantity, price, name, image, id, amount } = db.bag[product];
        html += `
        <div class="bag__product">
            <div class="bag__product--img"> 
                <img src="${image}" alt="imagen">
            </div>
            <div class="bag__product--body"> 
                <h4>${name}</h4>
                <h5><spant>Stock:</spant> ${quantity} | $${(price * amount)}</h5>

                <div class="bag__product--body-op" id="${id}">
                <i class="fa-solid fa-caret-down"></i>
                <span>${amount} units</span>
                <i class="fa-solid fa-caret-up"></i>
                <i class="fa-solid fa-trash"></i>
                </div>

        </div>
        
        </div>
        `
    }
    printTotal(db);
    notificationInBag(db)
    bag__productsHTML.innerHTML = html

}

function sumRestDeletProduct(db) {
    const bagProductsHTML = document.querySelector(".bag__products");

    bagProductsHTML.addEventListener("click", function (e) {

        if (e.target.classList.contains("fa-caret-down")) {
            const id = Number(e.target.parentElement.id)

            const productFine = db.products.find((products) => products.id === id);

            if (db.bag[id].amount === 1) {
                const response = confirm("¿Quieres eliminar este producto?")

                if (!response) return; delete db.bag[id];

            } else {
                db.bag[id].amount--;
            }


        }

        if (e.target.classList.contains("fa-caret-up")) {
            const id = Number(e.target.parentElement.id)

            const productFine = db.products.find((products) => products.id === id);

            if (productFine.quantity === db.bag[productFine.id].amount) return alert("No tenemos mas en bodega")


            db.bag[id].amount++;
        }

        if (e.target.classList.contains("fa-trash")) {
            const id = Number(e.target.parentElement.id)
            const response = confirm("¿Quieres eliminar este producto?")

            if (!response) {

            } else {
                delete db.bag[id];
            }

        }

        window.localStorage.setItem("bag", JSON.stringify(db.bag))

        printProductBag(db)
    })

}

function printTotal(db) {
    const infoTotalHTML = document.querySelector(".info__total");
    const infoAmountHTML = document.querySelector(".info__amount");

    let totalPreci = 0;
    let amountProduct = 0

    for (const product in db.bag) {
        const { amount, price } = db.bag[product];
        amountProduct += amount;
        totalPreci += price * amount;
    }

    infoTotalHTML.textContent = "$" + totalPreci + ".00";
    infoAmountHTML.textContent = amountProduct + " units";



}

function buyProtuc(db) {
    const btnbuyHTML = document.querySelector(".btn__buy")

    btnbuyHTML.addEventListener("click", function () {

        if (!Object.values(db.bag).length) return alert("Tienes que ingresar algo al carrito")

        const response = confirm("seguro que quieres comprar");
        if (!response) return;

        const currentProduct = [];

        for (const product of db.products) {
            const productbag = db.bag[product.id]

            if (product.id === productbag?.id) {
                currentProduct.push({
                    ...product,
                    quantity: product.quantity - productbag.amount,
                }
                )
            } else {
                currentProduct.push(product)
            }

            db.products = currentProduct;
            db.bag = {}

            window.localStorage.setItem(`products`, JSON.stringify(db.products))
            window.localStorage.setItem(`bag`, JSON.stringify(db.bag))
        }
        printProduct(db)
        printProductBag(db)
        printTotal(db)
        notificationInBag(db)
    })

}

function notificationInBag(db) {
    const amountProductsHTML = document.querySelector(".amountProducts");

    let amount = 0;

    for (const product in db.bag) {
        amount += db.bag[product].amount
    }

    amountProductsHTML.textContent = amount

}

function themes() {
    const userTheme = localStorage.getItem("theme")
    const preferenciacolor = window.matchMedia('(perfers-color-scheme: dark)')

    if (userTheme === "dark" || (!userTheme && preferenciacolor.matches)) {
        setTheme`dark`;
    }

    preferenciacolor.addEventListener("change", function (e) {
        if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "ligth")
        }
    })

    function setTheme(newTheme) {
        document.documentElement.setAttribute("data-theme", newTheme)

    }

    const eventIcomSum = document.querySelector(".btn-sun");
    const eventIcomMoon = document.querySelector(".btn-moon");

    eventIcomSum.addEventListener("click", setLigth);
    eventIcomMoon.addEventListener("click", setDark);


    function setLigth() {
        setUserTheme("ligth")
        eventIcomSum.setAttribute("style", "display: none;")
        eventIcomMoon.setAttribute("style", "display: block;")
    }

    function setDark() {
        setUserTheme("dark")
        eventIcomMoon.setAttribute("style", "display: none;")
        eventIcomSum.setAttribute("style", "display: block;")
    }


    function setUserTheme(newTheme) {
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme)
    }
}

function infoCategory(db) {
    const countsCategory = {};

    for (const counts of db.products) {

        if (countsCategory[counts.category]) {
            countsCategory[counts.category]++;
        } else{
            countsCategory[counts.category]=1;
        }
    }
    return countsCategory
}

function filterShow(db) {
    const allCategory= infoCategory(db)

    let allShow = 0;
    for (const key in allCategory) {
        allShow+=allCategory[key]
    }

    const showAllHTML = document.querySelector(".filter__show-all")

    showAllHTML.innerHTML = `All : ${allShow}`;

    showAllHTML.addEventListener("click", function () {
        printProduct(db);
        
    })
    
}

function filterShirt(db) {
    const allCategory= infoCategory(db)

    const filterShirtHTML = document.querySelector(".filter__shirt")

    filterShirtHTML.innerHTML = `Shirt products: ${allCategory.shirt}`;
    
    filterShirtHTML.addEventListener("click", function () {

        const productsHTML = document.querySelector(".products")

        let html = '';
    
        for (const product of db.products) {
    
            const buttonAdd = product.quantity ? `<i class="fa-solid fa-plus" id='${product.id}'></i>` : `<span class="soldOut">sold out</span>`
    
            if (product.category == 'shirt') {
                html +=
                `
            <div class="product">
                <div class=product__img> 
                    <img src="${product.image}" alt="image the product" />
                </div>
    
                <div class="products__info">
                    
                    <div class="content__plus">${buttonAdd}</div>
                    
                    <h3> $${product.price} <span>stock: ${product.quantity} </span> </h3>
                    <h4> ${product.name} </h4>
                </div>
            </div> 
            `
            }
    
        productsHTML.innerHTML = html;
                
        }

    
        // let html ={};

        // for (const allShirt of db.products) {

        //     if (allShirt.category == 'shirt') {
        //         html[allShirt.id]= allShirt
                
                
        //     }
        // }
        // console.log(html);
        
    })
        
    
}

function filterHoddie(db) {
    const allCategory= infoCategory(db)

    const filterHoddieHTML = document.querySelector(".filter__hoddie")

    filterHoddieHTML.innerHTML = `Hoddie products: ${allCategory.hoddie}`;

    filterHoddieHTML.addEventListener("click", function () {

        const productsHTML = document.querySelector(".products")

        let html = '';
    
        for (const product of db.products) {
    
            const buttonAdd = product.quantity ? `<i class="fa-solid fa-plus" id='${product.id}'></i>` : `<span class="soldOut">sold out</span>`
    
            if (product.category == 'hoddie') {
                html +=
                `
            <div class="product">
                <div class=product__img> 
                    <img src="${product.image}" alt="image the product" />
                </div>
    
                <div class="products__info">
                    
                    <div class="content__plus">${buttonAdd}</div>
                    
                    <h3> $${product.price} <span>stock: ${product.quantity} </span> </h3>
                    <h4> ${product.name} </h4>
                </div>
            </div> 
            `
            }
    
        productsHTML.innerHTML = html;
                
        }

    })
    
}

function filterSweater(db) {
    const allCategory= infoCategory(db)

    const filterSweaterHTML = document.querySelector(".filter__sweater")

    filterSweaterHTML.innerHTML = `Sweater products: ${allCategory.sweater}`;

    filterSweaterHTML.addEventListener("click", function () {

        const productsHTML = document.querySelector(".products")

        let html = '';
    
        for (const product of db.products) {
    
            const buttonAdd = product.quantity ? `<i class="fa-solid fa-plus" id='${product.id}'></i>` : `<span class="soldOut">sold out</span>`
    
            if (product.category == 'sweater') {
                html +=
                `
            <div class="product">
                <div class=product__img> 
                    <img src="${product.image}" alt="image the product" />
                </div>
    
                <div class="products__info">
                    
                    <div class="content__plus">${buttonAdd}</div>
                    
                    <h3> $${product.price} <span>stock: ${product.quantity} </span> </h3>
                    <h4> ${product.name} </h4>
                </div>
            </div> 
            `
            }
    
        productsHTML.innerHTML = html;
                
        }

        // let html ={};
        // for (const allSweater of db.products) {

        //     if (allSweater.category == 'sweater') {
        //         html[allSweater.id]= allSweater
        //     }
        // }
        // console.log(html);
    })
}

async function main() {
    const db = {
        products: JSON.parse(window.localStorage.getItem('products')) || (await getProducts()),
        bag: JSON.parse(window.localStorage.getItem("bag")) || {},
    };

    printProduct(db);
    bag();
    menu();
    addProductToBag(db);
    printProductBag(db);
    sumRestDeletProduct(db);
    printTotal(db);
    buyProtuc(db);
    notificationInBag(db)
    themes()
    filterShow(db)
    filterShirt(db)
    filterHoddie(db)
    filterSweater(db)

}

main()