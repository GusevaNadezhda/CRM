import {createModalFormClient} from "./modalForm.js"

// данные клиента мы получаем от сервера, запишем его в константу (при смене сервера также удобно будет поменять его только в одном месте)
const SERVER_URL = 'http://localhost:3000'
// let listClients = []

// функция получения массива клиентов с сервера

export async function serverGetClients() {
  let response = await fetch(SERVER_URL + '/api/clients', {
    method: "GET",
    headers: { 'Content-Type': 'aplication/json' },
  })

  //  получаем ответ в виде массива от сервера
  let data = await response.json()
  return data
}

//  функция получения данных клиента с сервера
export async function serverGetClient(client){
  const response = await fetch(SERVER_URL + '/api/clients/' + client.id, {
    method: "GET",
  })

  //  получаем ответ в виде массива от сервера
  const data = await response.json()
  console.log( data)
  console.log( data.surname)
  console.log( data.name)
  console.log( data.lastName)
return data
}

export async function serverAddClient() {
  const modalContactAddArr = document.querySelectorAll(".modal__contact-add")
  const contactsArr = [];
  modalContactAddArr.forEach(function(elem){

    let select= elem.querySelector('select')
let input= elem.querySelector('input')
// const contact = new Contact(select.value, input.value)
    contactsArr.push({
      type:select.value,
      value:input.value
    })
    console.log(elem)
    console.log(select.value)
    console.log(input.value)
  })
  console.log(contactsArr);

  const response = await fetch(SERVER_URL + '/api/clients/', {
    method: 'POST',
    body: JSON.stringify({
      name: document.querySelector("#name").value.trim(),
  surname:    document.querySelector("#surname").value.trim(),
  lastName: document.querySelector("#lastName").value.trim(),
  contacts: contactsArr,
    }),
    headers: {
      'Content-Type': 'aplication/json',
    }
  })
console.log(response)
  const client = await response.json();
}

serverGetClients()

// функцию удаления клиента с сервера по id

export const serverDeleteClient = async  (id) =>{
  fetch(SERVER_URL + '/api/clients/' + id, {
      method: 'DELETE',
    });
    let data = await response.json()
  return data
}

//  функция отправки измененных данных клиента на сервер
export  const serverChangeClient = async (editClient) =>{
alert('включилась функция отправки на сервер')
console.log(editClient)
console.log(editClient.id)


alert('продолжается функция отправки на сервер')
  let response = await fetch(SERVER_URL + '/api/clients/' + editClient.id, {
    method: "PATCH",
    body: JSON.stringify({
      name: editClient.name,
    surname:    editClient.surname,
    lastName: editClient.lastName,
    contacts: editClient.contacts,
    }),
    headers: { 'Content-Type': 'aplication/json' },
  })
  //  получаем ответ в виде массива от сервера
  let data = await response.json()
  console.log(data)
  return data
}

// функция создания формы для добавления нового клиента




