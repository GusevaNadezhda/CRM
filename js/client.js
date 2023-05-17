
// export default

// создадим массив куда будем добавлять наших клиетов

let listClients = []


class Client {

  // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
  // get id() {

  // }

  // * обязательное поле, имя клиента  и фамилия, отчество необязательно
  constructor(id, surname, name, lastName, createdAt, updatedAt) {

    this.id = id
    this.surname = surname
    this.name = name
    this.lastName = lastName
    this.createdAt = changeDate(createdAt)
    this.updatedAt = changeDate(updatedAt)

    function changeDate(changeDate) {
      const changeDateArr = changeDate.split("T")
      const date = changeDateArr[0].split('-').reverse().join('.');
      const time = changeDateArr[1].split(':')[0] + ':' + changeDateArr[1].split(':')[1];
      return {
        date: date,
        time: time
      }
    }
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastName
  }



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
  const $createDataDIV = document.createElement('div');
  const $createTimeDIV = document.createElement('div');
  const $updatedAtTD = document.createElement('td');
  const $updateDataDIV = document.createElement('div');
  const $updateTimeDIV = document.createElement('div');
  const $contactTD = document.createElement('td');
  const $actionTD = document.createElement('td');
  const $actionBTN = document.createElement('div');
  const $changeBTN = document.createElement('btn');
  const $deleteBTN = document.createElement('btn');


  $idTD.textContent = Client.id
  $fioTD.textContent = Client.fio
  $createDataDIV.textContent = Client.createdAt.date
  $createTimeDIV.textContent = Client.createdAt.time
  $updateDataDIV.textContent = Client.createdAt.date
  $updateTimeDIV.textContent = Client.createdAt.time
  $contactTD.textContent = Client.contact
  $actionTD.textContent = Client.action
  $changeBTN.textContent = 'Изменить'
  $deleteBTN.textContent = 'Удалить'

  $idTD.classList.add('table__body-id')
  $fioTD.classList.add('table__body-fio')
  $createdAtTD.classList.add('table__body-createdat')
  $createDataDIV.classList.add('table__body-date')
  $createTimeDIV.classList.add('table__body-time')
  $updatedAtTD.classList.add('table__body-updatedat')
  $updateDataDIV.classList.add('table__body-date')
  $updateTimeDIV.classList.add('table__body-time')
  $changeBTN.classList.add('btn-change')
  $deleteBTN.classList.add('btn-delete')
  $actionBTN.classList.add('btn-group')

  $changeBTN.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector("#modal-add-client").classList.add('open');
    createFormChangeClient(Client)
  })

  // метод нажатие на кнопку удалить
  // const onDelete = {
  //   onDelete({ Client, element }) {
      // закрытие текущего модального окна
//       document.querySelector("#modal-add-client").classList.remove('open');

//       const $modalDeleteElement = document.createElement('div')
//       const $modalDeleteTITLE = document.createElement('title')
//       const $modalDeleteTEXT = document.createElement('p')
//       const $modalDeleteBTN = document.createElement('button')
//       const $modalDeleteCencel = document.createElement('p')

//       $modalDeleteTITLE.textContent = "Удалить клиента"
//       $modalDeleteTEXT.textContent ="Вы действительно хотите удалить данного клиента?"
//       $modalDeleteBTN.textContent = "Удалить"
//       $modalDeleteCencel.textContent = "Отмена"

//       $modalDeleteBTN.addEventListener('click', function(){
//         element.remove();
//         fetch(`http://localhost:3000/api/clients/${Client.id}`, {
//           method: 'DELETE',
//         });
//       })

//       $modalDeleteCencel.addEventListener('click', function(){
//  document.querySelector("#modal-add-client").classList.add('open')}
// )

// document.querySelector('.main').append($modalDeleteElement)
// $modalDeleteElement.append($modalDeleteTITLE)
// $modalDeleteElement.append($modalDeleteTEXT)
// $modalDeleteElement.append($modalDeleteBTN)
// $modalDeleteElement.append($modalDeleteCencel)
// }}

  $deleteBTN.addEventListener('click', function (e) {
    e.preventDefault;
    // onDelete({ Client, element: $clientTR });


    document.querySelector("#modal-add-client").classList.add('open');
    const $modalDeleteElement = document.createElement('div')
    const $modalDeleteTITLE = document.createElement('h2')
    const $modalDeleteTEXT = document.createElement('p')
    const $modalDeleteBTN = document.createElement('button')
    const $modalDeleteCencel = document.createElement('p')
    const $modalDeleteClose = document.createElement('button')

     $modalDeleteElement.classList.add("modal__delete-element")
     $modalDeleteTITLE.classList.add("modal__delete-title")
     $modalDeleteTEXT.classList.add("modal__delete-text")
     $modalDeleteBTN.classList.add("modal__delete-btn")
     $modalDeleteCencel.classList.add("modal__delete-cencel")
     $modalDeleteClose.classList.add("modal__btn-close")

    $modalDeleteTITLE.textContent = "Удалить клиента"
    $modalDeleteTEXT.textContent ="Вы действительно хотите удалить данного клиента?"
    $modalDeleteBTN.textContent = "Удалить"
    $modalDeleteCencel.textContent = "Отмена"

    $modalDeleteBTN.addEventListener('click', function(){
      element.remove();
      fetch(`http://localhost:3000/api/clients/${Client.id}`, {
        method: 'DELETE',
      });
    })

    $modalDeleteCencel.addEventListener('click', function(){
document.querySelector("#modal-add-client").classList.add('open')
})
document.querySelector('.modal-add').removeChild(document.querySelector('.modal-newclient'))
document.querySelector('.modal-add').append($modalDeleteElement)
$modalDeleteElement.append($modalDeleteClose)
$modalDeleteElement.append($modalDeleteTITLE)
$modalDeleteElement.append($modalDeleteTEXT)
$modalDeleteElement.append($modalDeleteBTN)
$modalDeleteElement.append($modalDeleteCencel)


  });


  $clientTR.append($idTD)
  $clientTR.append($fioTD)
  $clientTR.append($createdAtTD)
  $clientTR.append($updatedAtTD)
  $clientTR.append($contactTD)
  $clientTR.append($actionTD)
  $createdAtTD.append($createDataDIV)
  $createdAtTD.append($createTimeDIV)
  $updatedAtTD.append($updateDataDIV)
  $updatedAtTD.append($updateTimeDIV)
  $actionTD.append($actionBTN)
  $actionBTN.append($changeBTN)
  $actionBTN.append($deleteBTN)

  $tbody.append($clientTR)

  // return $clientTR
}


function createFormChangeClient(client) {
  const $changeClientTITLE = document.querySelector(".modal__title")
const $idClientP = document.createElement('p')

  $changeClientTITLE.textContent = "Изменить данные"
  $changeClientTITLE.id = "change-client"

  $idClientP.classList.add('modal__title-id')
  $idClientP.textContent = client.id

  const modalInput = document.querySelectorAll(".modal__input")

modalInput.forEach(elem =>{
  switch (elem.id) {
    case "surname":
      elem.value = client.surname
      break
      case "name":
      elem.value = client.name
      break
      case "lastName":
      elem.value = client.lastName
      break
}})

const modalBtnSave = document.querySelector(".modal__btn-save")

// modalBtnSave.addEventListener('click', serverChangeClient(client))


modalBtnSave.addEventListener('click', function(){
  alert("csefsdv")
})
  $changeClientTITLE.append($idClientP)
}


// функция удаления клиента






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

// async function serverAddClient(client) {
//   // делаем добавление на сервер
//   let response = await fetch(SERVER_URL + '/api/clients', {
//     method: "POST",
//     headers: { 'Content-Type': 'aplication/json' },
//     // body: JSON.stringify({
//     //   id: client.id,
//     //   createdAt: client.createdAt,
//     //   updatedAt: client.updatedAt,
//     //   name: client.name,
//     //   surname: client.surname,
//     //   lastName: client.lastName,
//     //   // contacts: [
//     //   //   {
//     //   //     type: 'Телефон',
//     //   //     value: '+71234567890'
//     //   //   },
//     //   //   {
//     //   //     type: 'Email',
//     //   //     value: 'abc@xyz.com'
//     //   //   },
//     //   //   {
//     //   //     type: 'Facebook',
//     //   //     value: 'https://facebook.com/vasiliy-pupkin-the-best'
//     //   //   }
//     //   // ]
//     // })
//     body: JSON.stringify({
//       id: '1234567890',
//       createdAt: '2021-02-03T13:07:29.554Z',
//       updatedAt: '2021-02-03T13:07:29.554Z',
//       name: 'Василий',
//       surname: 'Пупкин',
//       lastName: 'Васильевич',
//     })

//   })

//   //  получаем ответ от сервера
//   let data = await response.json()
//   // console.log(data)
//   return data
// }

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


