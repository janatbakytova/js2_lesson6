//CRUD

// C - create method 'POST'
// R - read method 'GET' 
// U - update method 'PUT' and 'PATH' 
// D - delete method 'DELETE'

const url = 'https://jsonplaceholder.typicode.com/posts/' //PUT


const btn = document.getElementById('get_btn');
const user_id = document.getElementById('user_id');


const post = {
    userID: 1,
    title: 'madagascar',
    body: 'moto-moto'
}

function putFunc(e) {
    e.preventDefault();

    const id = user_id.value
    fetch(`${url}${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(post)
    }).then(Response => Response.json())
        .then(data => console.log(data))
}

btn.addEventListener('click', putFunc);



// const btn = document.getElementById('get_btn');
// const user_id = document.getElementById('user_id');

// const user = {
//     id: 1,
//     name: 'Janat',
//     lastname: 'Bakytova',
//     age: 105
// }

// btn.addEventListener('click', () => {
//     const user_id_value = user_id;
//     console.log(`${url}?name=${user_id_value}`)

//     fetch(`${url}${user_id_value}`)
//         .then(Response => Response.json())
//         .then(data => console.log(data));
// })


