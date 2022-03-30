const buttonAddProduct = document.querySelector('.addProduct')


const newData_class_title = document.querySelector('newData_class_title');
const newData_class_description = document.querySelector('newData_class_description');
const newData_class_price = document.querySelector('newData_class_price');
const newData_class_stockprice = document.querySelector('newData_class_stockprice');
const newData_class_category = document.querySelector('newData_class_category');


const baseUrl = 'https://geektech-project.herokuapp.com'
const endpoints = {
    products: `${baseUrl}/products/`,
}

const state = {
    products: [],
    newData: {
        title: '',
        description: '',
        price: '',
        stock_price: '',
        category: ''
    },
    editProducts: {}
}

const cleanData = () => {
    state.newData.title = '';
    state.newData.description = '';
    state.newData.price = '';
    state.newData.stock_price = '';
    state.newData.category = '';


    productTitle.value = '';
    productDescription.value = '';
    productPrice.value = '';
    productStock_price.value = '';
    productCategory.value = '';

}

const editProducts = (index) => {
    const editebleProducts = state.products[index];
    state.editProducts = editebleProducts;

    productTitle.value = state.editProducts.title;
    productDescription.value = state.editProducts.description;
    productPrice.value = state.editProducts.price;
    productStock_price.value = state.editProducts.stock_price;
    productCategory.value = state.editProducts.category;

}

productTitle.addEventListener('change', (e) => {
    if (!!state.editProducts.title) {
        return state.editProducts.title = e.target.value;
    }

    return state.newData.title = e.target.value;
});

productDescription.addEventListener('change', (e) => {
    if (!!state.editProducts.description) {
        return state.editProducts.description = e.target.value;
    }
    return state.newData.description = e.target.value;
})

productPrice.addEventListener('change', (e) => {
    if (!!state.editProducts.price) {
        return state.newData.description = e.target.value;
    }
    return state.newData.price = e.target.value;
})

productStock_price.addEventListener('change', (e) => {
    if (!!state.editProducts.stock_price) {
        return state.newData.description = e.target.value;
    }
    return state.newData.stock_price = e.target.value;
})

productCategory.addEventListener('change', (e) => {
    if (!!state.editProducts.category) {
        return state.newData.category = e.target.value;
    }
    return state.newData.category = e.target.value;
})

buttonAddProduct.addEventListener('click', async () => {
    if (!!state.editProducts.title || state.editProducts.description) {
        await updateProductRequest();
    } else {
        await createProductRequest();
    }
    cleanData();
})



function getAllProducts() {
    const products = document.querySelector('.products');
    const response = fetch(endpoints.products, {
        method: 'GET',
    }).then(res => {
        return res.json();
    }).then(product => {
        state.products = product;
        products.innerHTML = ''; // очищаем контейнер с товарами перед тем как добавить новые

        for (let i = 0; i < product.length; i++) {
            products.innerHTML += `
            <div class='product_block'>
                <img src='${baseUrl}${product[i].image}' alt=''/>
                <h3>${product[i].title}</h3>
                <p class='description'>${product[i].description}</p>
                <p class='price'>${product[i].price}</p>
                <button id=${product[i].id} onclick='deleteProduct(state.products,event)'>Delete</button>
                <button id=${product[i].id} onclick='editProduct(state.products,event)'>Edit</button>
                </div>
            `
        }
        return product;
    })
}

getAllProducts();//promise get product

async function deleteProduct(prod, event) {
    let delId = event.target.id;
    let wrap = document.getElementById(delId).parentNode; // Находим родительский блок товара
    let deleteProduct = prod.filter((product) => product.id === +delId);
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch(`https://geektech-project.herokuapp.com/products/${deleteProduct[0].id}`, options)
        .then((res) => {
            wrap.remove(); // Удаляем
            console.log(res)
        })
        .catch((e) => {
            console.log(e);
        })
    // const data = await response.json()

    // return await response.json()
}



const submit = document.getElementById('submit');

function addProduct() {
    let { value: title } = document.getElementById('name')
    console.log(title);

    const obj = {
        title: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        stock_price: document.getElementById('stock_price').value,
        category_id: document.getElementById('category_id').value,
        image: null
    }

    fetch(endpoints.products, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            getAllProducts() // Вызываем функцию для добавления товара
            console.log(res.status, res.statusText);
        })
        .catch((e) => {
            console.log(e);
        })
}

function createProductRequest() {
    return fetch('https://geektech-project.herokuapp.com/products/', {
        method: 'POST',
        title: JSON.stringify(state.newData),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((products) => state.products.push(products))
}

function updateProductRequest() {
    return fetch(`https://geektech-project.herokuapp.com/products/${state.editProducts.id}`, {
        method: 'PUT',
        title: JSON.stringify(state.editProducts),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => data)
}



submit.addEventListener('click', addProduct);