// данные клиента мы получаем от сервера, запишем его в константу (при смене сервера также удобно будет поменять его только в одном месте)
const SERVER_URL = 'http://localhost:3000'
let listClients = []
console.log(listClients)
//  функция получения массива клиентов с сервера

async function serverGetClients() {
  const response = await fetch(SERVER_URL + '/api/clients')

  //  получаем ответ в виде массива от сервера
  const data = await response.json()
  console.log(data)
}

async function serverAddClient() {
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    body: JSON.stringify({
      name: document.querySelector("#name").value.trim(),
  surname:    document.querySelector("#surname").value.trim(),
  lastName: document.querySelector("#lastName").value.trim(),
  contacts: JSON.stringify()


      // id: '1234567890',
  // createdAt: '2021-02-03T13:07:29.554Z',
  // updatedAt: '2021-02-03T13:07:29.554Z',
  // name: 'Виталий',
  // surname: 'Пупкин',
  // lastName: 'Васильевич',
  // contacts: [
  //   {
  //     type: 'Телефон',
  //     value: '+71234567890'
  //   },
  //   {
  //     type: 'Email',
  //     value: 'abc@xyz.com'
  //   },
  //   {
  //     type: 'Facebook',
  //     value: 'https://facebook.com/vasiliy-pupkin-the-best'
  //   }
  // ]
    }),
    headers: {
      'Content-Type': 'aplication/json',
    }
  })
console.log(response)
  const client = await response.json();

  // console.log(client)

  listClients.push(client)
  // // делаем добавление на сервер
  // const response = await fetch(SERVER_URL + '/api/clients', {
  //   method: "POST",

  //   body: JSON.stringify({
  //     id: '1234567890',
  // createdAt: '2021-02-03T13:07:29.554Z',
  // updatedAt: '2021-02-03T13:07:29.554Z',
  // name: 'Василий',
  // surname: 'Пупкин',
  // lastName: 'Васильевич',
  // contacts: [
  //   {
  //     type: 'Телефон',
  //     value: '+71234567890'
  //   },
  //   {
  //     type: 'Email',
  //     value: 'abc@xyz.com'
  //   },
  //   {
  //     type: 'Facebook',
  //     value: 'https://facebook.com/vasiliy-pupkin-the-best'
  //   }
  // ]
  //   }),
  //   headers: { 'Content-Type': 'aplication/json' },
  // });

  // //  получаем ответ от сервера
  // let client = await response.json()
  // console.log(client)
  // listClients.push(client)
  // return client
}

serverGetClients()

async function serverChangeClient(client) {
  let response = await fetch(SERVER_URL + '/api/clients/' + client.id, {
    method: "PATCH",
    body: JSON.stringify({
      name: document.querySelector("#name").value.trim(),
  surname:    document.querySelector("#surname").value.trim(),
  lastName: document.querySelector("#lastName").value.trim(),
  contacts: [
    {
      type: 'Телефон',
      value: '+71234567890'
    },
    {
      type: 'Email',
      value: 'abc@xyz.com'
    },
    {
      type: 'Facebook',
      value: 'https://facebook.com/vasiliy-pupkin-the-best'
    }
  ]
    }),
    headers: { 'Content-Type': 'aplication/json' },
  })

  //  получаем ответ в виде массива от сервера
  let data = await response.json()
  // console.log(data)
  return data
}


const modalBtnSave = document.querySelector(".modal__btn-save")



// modalBtnSave.addEventListener('click', function(){
//   console.log(document.querySelector('.modal__title').contains(document.querySelector('.modal__title-id')))
//   console.log(document.querySelector('.modal__title'))
//   console.log(document.querySelector('.modal__title-id'))
//   if(document.querySelector('.modal__title').contains(document.querySelector('.modal__title-id'))) {

//     alert("изменение")
//     serverChangeClient()
//   } else{
//     alert("новое")
//     serverAddClient()
//   }
// })

modalBtnSave.addEventListener('click', function(){
  console.log(document.querySelector('.modal__title').contains(document.querySelector('.modal__title-id')))
  console.log(document.querySelector('.modal__title'))
  console.log(document.querySelector('.modal__title-id'))
  if(!document.querySelector('.modal__title').contains(document.querySelector('.modal__title-id'))) {
    alert("новое")
    serverAddClient()
  }
})







// modalBtnSave.addEventListener('click', serverAddClient)


// serverAddClient()
// await serverGetClients()
// await serverAddClient()

// и функцию удаления клиента с сервера по id

// async function serverDeleteClient(id) {

//   let response = await fetch(SERVER_URL + '/api/clients' + id, {
//     method: "DELETE",
//   })

//   let data = await response.json()
//   return data
// }







// функция создания формы для добавления нового клиента

let testClient = {
  id: '1234567890',
  createdAt: '2021-02-03T13:07:29.554Z',
  updatedAt: '2021-02-03T13:07:29.554Z',
  name: 'Василий',
  surname: 'Пупкин',
  lastName: 'Васильевич',
  // contacts: [
  //   {
  //     type: 'Телефон',
  //     value: '+71234567890'
  //   },
  //   {
  //     type: 'Email',
  //     value: 'abc@xyz.com'
  //   },
  //   {
  //     type: 'Facebook',
  //     value: 'https://facebook.com/vasiliy-pupkin-the-best'
  //   }
  // ]
}

//  функция изменения клиента и отправка измененных данных на сервер



// serverChangeClient()
