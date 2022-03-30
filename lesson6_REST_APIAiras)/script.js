const baseUrl = 'https://geektech-project.herokuapp.com'

const endpoints = {
    products: `${baseUrl}/products/`,
}

//GET REQUEST (products - all)

const state = {
    products: null
}

function getAllProducts() {
    const products = document.querySelector.products;
    const response = fetch(endpoints.products, {
        method: 'get',
    }).then(res => {
        return res.json();
    }).then(data => {
        state.products = data;

        for (let i = 0; i < data.length; i++) {
            products.innerHTML += `
            <div class='product_block'>
                <img src='${baseUrl}${data[i].image}' alt=''/>
                <h3>${data[i].title}</h3>
                <p class='description'>${data[i].description}</p>
                <p class='price'>${data}[i].price}</p>
                </div>
            `
        }
        return data;

    })

    console.log(response);
}
getAllProducts();//promise
console.log(state.products);//null

const submit = document.getElementById('submit');

function addProduct() {
    const obj = {
        title: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        stock_price: document.getElementById('stock_price').value,
        category_id: document.getElementById('category_id').value,
        image: null
    }
    // console.log(obj);
    fetch(endpoints.products, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then((res) => {
        console.log(res.status, res.statusText);
    })
}

submit.addEventListener('click', addProduct);