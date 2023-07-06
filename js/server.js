import {createModalFormClient} from "./modalForm.js"
import { validateContact } from "./modalForm.js"

// данные клиента мы получаем от сервера, запишем его в константу (при смене сервера также удобно будет поменять его только в одном месте)
const SERVER_URL = 'http://localhost:3000'

// функция получения массива клиентов с сервера

export const serverGetClients = async ()=> {
  let response = await fetch(SERVER_URL + '/api/clients', {
    method: "GET",
    headers: { 'Content-Type': 'aplication/json' },
  })

  //  получаем ответ в виде массива от сервера
  let data = await response.json()
  console.log( response.status)
  return data
}

//  функция получения данных клиента с сервера
export const serverGetClient = async ()=> {
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
//  функция получения данных добавления клиента на сервер
  export const serverAddClient = async ()=> {
  const modalContactAddArr = document.querySelectorAll(".modal__contact-add")
  const contactsArr = [];

  modalContactAddArr.forEach(function(elem){
    let select= elem.querySelector('select')
    let input= elem.querySelector('input')

    contactsArr.push({
      type:select.value,
      value:input.value
    })
  })

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

  serverResponceMistake(response)

}

// функцию удаления клиента с сервера по id
export const serverDeleteClient = async  (id) =>{
  fetch(SERVER_URL + '/api/clients/' + id, {
      method: 'DELETE',
    });
    let data = await response.json()
    console.log( data)
  return data
}

//  функция отправки измененных данных клиента на сервер
export  const serverChangeClient = async (editClient) =>{
alert('включилась функция отправки на сервер')
console.log(editClient)
console.log(editClient.id)

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
  serverResponceMistake(response)
  //  получаем ответ в виде массива от сервера
  let data = await response.json()
   return data
}

// функция поиска клиента на сервере

export const findClient = async (value) => {
  // используем синтаксическую конструкцию try..catch, которая позволяет «ловить» ошибки
  try {
    const response = await fetch(SERVER_URL + '/api/clients?' + `search=${value}`, {
      method: "GET",
    })
    const data = await response.json();

    return data
  } catch (error) {
    console.log(error)
  }
}
// функция создания формы для ответов сервера

 function serverResponceMistake(response){
  const modalError = document.querySelector('.modal__error')
  console.log(response.status)

  if(response.status === 200 || response.status === 201){
    modalError.classList.remove('active-server')
    modalError.textContent = " "
  }else if(response.status === 422) {
    modalError.classList.add('active-server')
    modalError.textContent = "Cервер успешно принял запрос, может работать с указанным видом данных , однако имеется какая-то логическая ошибка, из-за которой невозможно произвести операцию над ресурсом"
    console.log("Cервер успешно принял запрос, может работать с указанным видом данных , однако имеется какая-то логическая ошибка, из-за которой невозможно произвести операцию над ресурсом")
  }else if(response.status === 404){
    modalError.classList.add('active-server')
    modalError.textContent = "Сервер понял запрос, но не нашёл соответствующего ресурса по указанному URL."
    console.log("Сервер понял запрос, но не нашёл соответствующего ресурса по указанному URL.")
  }else if(response.status === 500){
    modalError.classList.add('active-server')
    modalError.textContent = "Внутренняя ошибка сервера"
    console.log(modalError.textContent)
} else if(response.status == "" || response.status !== 200 || response.status !== 201 ){
  modalError.classList.add('active-server')
  modalError.textContent = "Что-то пошло не так..."

}
return response.status
}




