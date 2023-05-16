
// export default

// создадим массив куда будем добавлять наших клиетов

let listClients = []


class Client {

  // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
  // get id() {

  // }

  // * обязательное поле, имя клиента  и фамилия, отчество необязательно
  constructor(id,surname, name, lastName,createdAt,updatedAt) {
    this.id = id
    this.surname = surname
    this.name = name
    this.lastName = lastName
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastName
  }

  // // дата и время создания клиента, заполняется сервером автоматически, после создания нельзя изменить
  // get createdAt() {

  // }
  // // дата и время изменения клиента, заполняется сервером автоматически при изменении клиента
  // get updatedAt() {

  // }



  // контакты - необязательное поле, массив контактов
  // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
  // contacts = [
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

function getNewClient(Client) {
  const $tbody = document.querySelector(".table__body")
  const $clientTR = document.createElement('tr');
  const $idTD = document.createElement('td');
  const $fioTD = document.createElement('td');
  const $createdAtTD = document.createElement('td');
  const $updatedAtTD = document.createElement('td');
  const $contactTD = document.createElement('td');
  const $actionTD = document.createElement('td');
  const $actionBTN = document.createElement('div');
  const $changeBTN = document.createElement('btn');
  const $deleteBTN = document.createElement('btn');


  $idTD.textContent = Client.id
  $fioTD.textContent = Client.fio
  $createdAtTD.textContent = Client.createdAt
  $updatedAtTD.textContent = Client.updatedAt
  $contactTD.textContent = Client.contact
  $actionTD.textContent = Client.action
  $changeBTN.textContent = 'Изменить'
  $deleteBTN.textContent = 'Удалить'

$idTD.classList.add('table__body-id')
  $fioTD.classList.add('table__body-fio')
  $createdAtTD.classList.add('table__body-createdat')
  $updatedAtTD.classList.add('table__body-updatedat')
  $changeBTN.classList.add('btn-change')
  $deleteBTN.classList.add('btn-delete')
  $actionBTN.classList.add('btn-group')

  $clientTR.append($idTD)
  $clientTR.append($fioTD)
  $clientTR.append($createdAtTD)
  $clientTR.append($updatedAtTD)
  $clientTR.append($contactTD)
  $clientTR.append($actionTD)
  $actionTD.append($actionBTN)
  $actionBTN.append($changeBTN)
  $actionBTN.append($deleteBTN)

  $tbody.append($clientTR)

  // return $clientTR
}












// данные клиента мы получаем от сервера, запишем его в константу (при смене сервера также удобно будет поменять его только в одном месте)
const SERVER_URL = 'http://localhost:3000'


//  функция получения массива клиентов с сервера

async function serverGetClients() {
  let response = await fetch(SERVER_URL + '/api/clients', {
    method: "GET",
    headers: { 'Content-Type': 'aplication/json' },
  })

  //  получаем ответ в виде массива от сервера
  let data = await response.json()
  // console.log(data)
  return data
}

// полученный массив запишем в переменную

let serverData = await serverGetClients()
console.log(serverData)


// назначаем проверку если serverData не пустой, тогда массив listClients будет равен массиву serverData

if (serverData) {
  serverData.forEach(function (elem) {
    const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt)
    listClients.push(client)
    console.log(client)
    getNewClient(client)
  })
}
console.log(listClients)
// задаем функцию добавления нового клиента на сервер

async function serverAddClient(client) {
  // делаем добавление на сервер
  let response = await fetch(SERVER_URL + '/api/clients', {
    method: "POST",
    headers: { 'Content-Type': 'aplication/json' },
    // body: JSON.stringify({
    //   id: client.id,
    //   createdAt: client.createdAt,
    //   updatedAt: client.updatedAt,
    //   name: client.name,
    //   surname: client.surname,
    //   lastName: client.lastName,
    //   // contacts: [
    //   //   {
    //   //     type: 'Телефон',
    //   //     value: '+71234567890'
    //   //   },
    //   //   {
    //   //     type: 'Email',
    //   //     value: 'abc@xyz.com'
    //   //   },
    //   //   {
    //   //     type: 'Facebook',
    //   //     value: 'https://facebook.com/vasiliy-pupkin-the-best'
    //   //   }
    //   // ]
    // })
    body: JSON.stringify({
      id: '1234567890',
  createdAt: '2021-02-03T13:07:29.554Z',
  updatedAt: '2021-02-03T13:07:29.554Z',
  name: 'Василий',
  surname: 'Пупкин',
  lastName: 'Васильевич',
    })

  })

  //  получаем ответ от сервера
  let data = await response.json()
  // console.log(data)
  return data
}



// и функцию удаления клиента с сервера по id

async function serverDeleteClient(id) {

  let response = await fetch(SERVER_URL + '/api/clients' + id, {
    method: "DELETE",
  })

  let data = await response.json()
  return data
}







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


