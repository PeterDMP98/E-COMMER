/*la palabra reservada "document" es para llamar todo lo que esta escrito en html

***ACCEDER AL DOM:***

* querySelector: es para buscar una etiqueta o elemento en el DOM. ejemplo: document.querySelector('h1') NOTE :funciona con todo class, id, etiquetas. solo selecciona el primer elemento que encuetre
* querySelectorAll: es para seleccionar todos los elementos que tenga lo que estamos buscando 
* getElementById: es para selecionar id's en el DOM. ejemplo: document.getElementById('unID') NOTE solo puede buscar un id, es mucho mas rapido que querySelector
* textContent = es para agregar o cambiar un texto los datos del selector. ejemplo: document.querySelector('h1').textContent= 'texto'

***METODOS DESPUES SE ACCEDER O SELECCIONAR:***

**Modificar datos de etiquetas: **

const contentID = document.querySelector('#unID);

* .textontent: modificar el contenido, pero solo agrega algo como texto. ejemplo: cintentID.textcontent = "ID Cambiado"
* .innerHTML: tambien modifica el texto, pero se utiliza para agregar etiquetas. ejemplo: contentID.innerHTML= 'texto con inner'
* .classList.add: permite agregar clases espesificas al elemento, con 'add' agregamos . ejemplo: contentID.classList.add('h3-danger')

**Agregar o crear datos al DOM:**

* createElement: en nuestro documento vamos a crear un elelemto. ejemplo: document.createElelemt('li')
* oppendChild(): incorpora en el nodo seleccionado un hijo unos hijos . ejemplo: ul.oppendChild(li - "-el elemnento que se va agregar-")

la mejor manera de crear elementos sin tanto problema con el reflow FRAGMENT

reflow: el reflow crear lo elementos cada vez que se actuliza la pagina por lo tanto afecta mucho el rendimiento

*createDocumentFragment(): con esta funcion se crea un fragmento. ejemplo: const fragment= document.createDocumentFragment()
o new documentFragment(). ejemplo: const fragmen2= new DocuemntFragment()

**TEMPLATE HTML**

los template se hacen en el html, el template no se ve cuando se agrega al html.

* .content: en js es apra ver el contenido de un elemnto document.querySelector('h1').content

**addEventListener (click), Event delegation y stopPropagation**

. addEventListener(,): para un evento que se le quiera agregar ejemplp: elemento.addEventListener('click,() => {})

e.stopPropagation(): se utiliza para que no afecte a otros eventos
*/


let products = 
[
    {
    "id": 1,
    "name": "Camiseta de manga corta con cuello redondo",
    "price": 10,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270464/eCommerce/shirt1_prckre.png",
    "category": "shirt",
    "quantity": 5,
    "description": "Esta camiseta básica presenta un corte regular y un cuello redondo clásico. Es ideal para el uso diario y se puede combinar con una amplia variedad de looks."
    },
    {
    "id": 2,
    "name": "Camiseta de manga larga con estampado gráfico",
    "price": 15,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270464/eCommerce/shirt2_av4jld.png",
    "category": "shirt",
    "quantity": 3,
    "description": "Perfecta para un look casual, esta camiseta de manga larga presenta un estampado gráfico llamativo en el pecho. Su ajuste regular y suave tejido de algodón la hacen cómoda y fácil de usar."
    },
    {
    "id": 3,
    "name": "Camiseta con detalle de encaje",
    "price": 12,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270464/eCommerce/shirt3_wlm0h3.png",
    "category": "shirt",
    "quantity": 2,
    "description": "Esta camiseta presenta un detalle de encaje en el escote y mangas. Su ajuste regular y tela suave la hacen cómoda y fácil de usar para cualquier ocasión."
    },
    {
    "id": 4,
    "name": "Camiseta de tirantes con espalda cruzada",
    "price": 8,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270464/eCommerce/shirt4_cypl6n.png",
    "category": "shirt",
    "quantity": 10,
    "description": "Con un toque de estilo femenino, esta camiseta de tirantes presenta una espalda cruzada con detalle de encaje. El ajuste es regular y la tela suave y cómoda."
    },
    {
    "id": 5,
    "name": "Camiseta con hombros descubiertos",
    "price": 12,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270464/eCommerce/shirt5_cnwq0w.png",
    "category": "shirt",
    "quantity": 6,
    "description": "Con un toque femenino y coqueto, esta camiseta presenta hombros descubiertos y un ajuste regular. Su tela suave y transpirable la hace ideal para los días calurosos."
    },
    {
    "id": 6,
    "name": "Camiseta con cuello alto y manga larga",
    "price": 18,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270465/eCommerce/shirt6_pnwws6.png",
    "category": "shirt",
    "quantity": 4,
    "description": "Esta camiseta de manga larga presenta un cuello alto y ajuste regular. Es ideal para un look elegante y cómodo."
    },
    {
    "id": 7,
    "name": "Camiseta con cuello en V y manga corta",
    "price": 9,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270450/eCommerce/shirt7_ofhlzd.png",
    "category": "shirt",
    "quantity": 8,
    "description": "Esta camiseta clásica presenta un corte regular, cuello en V y mangas cortas. Es fácil de usar y combinar con diferentes looks."
    },
    {
    "id": 8,
    "name": "Hoddie con estampado de leopardo",
    "price": 20,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270465/eCommerce/hoddie4_wvwaiv.png",
    "category": "hoddie",
    "quantity": 8,
    "description": "Este hoddie presenta un estampado de leopardo y está hecho de una mezcla suave de algodón y poliéster. Es ideal para un look casual y cómodo."
    },
    {
    "id": 9,
    "name": "Hoddie con cremallera",
    "price": 25,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270465/eCommerce/hoddie3_xboa0e.png",
    "category": "hoddie",
    "quantity": 10,
    "description": "Este hoddie presenta una cremallera frontal y bolsillos laterales. Está hecho de una mezcla de algodón y poliéster para mayor comodidad y durabilidad."
    },
    {
    "id": 10,
    "name": "Hoddie con capucha y cordón ajustable",
    "price": 30,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270465/eCommerce/hoddie2_utnolh.png",
    "category": "hoddie",
    "quantity": 6,
    "description": "Este hoddie presenta una capucha con cordón ajustable y un corte holgado para mayor comodidad. Está hecho de una mezcla suave de algodón y poliéster."
    },
    {
    "id": 11,
    "name": "Hoddie con estampado de marca",
    "price": 35,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270465/eCommerce/hoddie1_sxv2ce.png",
    "category": "hoddie",
    "quantity": 4,
    "description": "Este hoddie presenta un estampado de marca en la parte delantera y está hecho de una mezcla suave de algodón y poliéster. Es ideal para un look casual y moderno."
    },
    {
    "id": 12,
    "name": "Hoddie con cierre de botones",
    "price": 40,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270464/eCommerce/hoddie5_sqnwic.png",
    "category": "hoddie",
    "quantity": 3,
    "description": "Este hoddie presenta un cierre de botones en la parte delantera y bolsillos laterales. Está hecho de una mezcla suave de algodón y poliéster para mayor comodidad y durabilidad."
    },
    {
    "id": 13,
    "name": "Hoddie con estampado de camuflaje",
    "price": 45,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270464/eCommerce/hoddie6_i7gdrl.png",
    "category": "hoddie",
    "quantity": 7,
    "description": "Este hoddie presenta un estampado de camuflaje y está hecho de una mezcla suave de algodón y poliéster. Es ideal para un look casual y moderno."
    },
    {
    "id": 14,
    "name": "Sweater de punto grueso",
    "price": 10,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270450/eCommerce/sweater1_o8qh0p.png",
    "category": "sweater",
    "quantity": 5,
    "description": "Este sweater de punto grueso es ideal para los días fríos. Está hecho de una mezcla suave de lana y acrílico para mayor comodidad y calidez."
    },
    {
    "id": 15,
    "name": "Sweater de cuello alto",
    "price": 15,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270450/eCommerce/sweater2_y7yzqs.png",
    "category": "sweater",
    "quantity": 7,
    "description": "Este sweater de cuello alto está hecho de una mezcla suave de lana y acrílico para mayor comodidad y calidez. Es ideal para un look elegante y cálido."
    },
    {
    "id": 16,
    "name": "Sweater de tejido fino",
    "price": 20,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270450/eCommerce/sweater3_nnfctl.png",
    "category": "sweater",
    "quantity": 3,
    "description": "Este sweater de tejido fino es ideal para los días frescos. Está hecho de una mezcla suave de lana y acrílico para mayor comodidad y calidez."
    },
    {
    "id": 17,
    "name": "Sweater con estampado de rayas",
    "price": 25,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270450/eCommerce/sweater4_kxcvab.png",
    "category": "sweater",
    "quantity": 6,
    "description": "Este sweater presenta un estampado de rayas en la parte delantera y está hecho de una mezcla suave de lana y acrílico para mayor comodidad y calidez. Es ideal para un look casual y moderno."
    },
    {
    "id": 18,
    "name": "Sweater con cuello redondo",
    "price": 30,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270450/eCommerce/sweater5_hj94db.png",
    "category": "sweater",
    "quantity": 4,
    "description": "Este sweater con cuello redondo está hecho de una mezcla suave de lana y acrílico para mayor comodidad y calidez. Es ideal para un look casual y cómodo."
    }
    ];

async function getProducts() {
    try {
        const data = await fetch("https://ecommercebackend.fundamentos-29.repl.co/");

        const res= await data.json();

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

        html +=
        `
        <div class="product">
            <div class=product__img> 
                <img src="${product.image}" alt="image the product" />
            </div>

            <div class="products__info">
                <div class="icono__suma"> <i class="fa-solid fa-plus" id='${product.id}'></i> </div>
                <h3> $${product.price} <span>stock: ${product.quantity} </span> </h3>
                <h4> ${product.name} </h4>
            </div>
        </div> 
        `
    }

    productsHTML.innerHTML= html;
    // console.log(productsHTML);
    
}

function bag() {
    const bagHTML= document.querySelector(".fa-bag-shopping");
    const MyCardsHTML= document.querySelector(".MyCards");

    bagHTML.addEventListener("click", function () {
    MyCardsHTML.classList.toggle("card__show");
});
    
}


function menu() {
    const bagHTML= document.querySelector(".fa-bars");
    const MyCardsHTML= document.querySelector(".menu");

    bagHTML.addEventListener("click", function () {
    MyCardsHTML.classList.toggle("card__show");
});
    
}

function addProductToBag(db) {
    const productsHTML = document.querySelector(".products");

    productsHTML.addEventListener("click", function (e) {
        if (e.target.classList.contains("fa-plus")) {
            const id = Number(e.target.id);

            const productFine = db.products.find((products) => products.id === id);

            if (db.card[productFine.id]) {

                if (productFine.quantity=== db.card[productFine.id].amount) return alert("No tenemos mas en bodega")

                db.card[productFine.id].amount++;
            } else{
                db.card[productFine.id] = {...productFine,  amount: 1}
            }

            window.localStorage.setItem("card", JSON.stringify(db.card))
            console.log(db.card);
        }
    });
    
}

async function main() {
    const db = {
        products: JSON.parse(window.localStorage.getItem("products")) || (await getProducts()),
        card: JSON.parse(window.localStorage.getItem("card")) || {},
    };

    printProduct(db)
    bag()
    menu()
    addProductToBag(db)


    const card__productsHTML = document.querySelector(".card__products");
    
    
    let html= ""
    for (const product in db.card) {
        const {quantity,price,name,image,id,amount} = db.card[product];
        html += `
        <div class="card__product">
            <div class="card__product--img"> 
                <img src="${image}" alt="imagen">
            </div>
            <div class="card__product--body"> 
                <h4>${name}</h4>
                <h5><spant>Stock:</spant> ${quantity} | $${price}</h5>

                <div class="card__product--body-op">
                <i class="fa-solid fa-caret-down"></i>
                <span>${amount} units</span>
                <i class="fa-solid fa-caret-up"></i>
                <i class="fa-solid fa-trash"></i>
                </div>

        </div>
        
        </div>
        `
    }

    card__productsHTML.innerHTML = html

}

main()
// async ()=> {
//     const res= await getProducts();

//     console.log(res);
// }
