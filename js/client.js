import {createFormEditClient} from "./modalForm.js"
import {createDeleteForm} from "./modalForm.js"
import {serverDeleteClient} from "./server.js"

// export default

// создадим массив куда будем добавлять наших клиетов

let listClients = []


class Client {

  // * обязательное поле, имя клиента  и фамилия, отчество необязательно
  constructor(id, surname, name, lastName, createdAt, updatedAt, contacts) {

    this.id = id
    this.surname = surname
    this.name = name
    this.lastName = lastName
    // this.contacts = createAddContact()
    this.createdAt = changeDate(createdAt)
    this.updatedAt = changeDate(updatedAt)
    this.contacts = contacts

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

 // контакты - необязательное поле, массив контактов
  // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value

  // get contacts(){
  //   return createAddContact()
  // }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastName
  }

}
// Создадим функцию которая будет добавлять tooltip над контактами

function contactTooltip(type, value){
  const tooltip = document.createElement('div');
  const tooltipType = document.createElement('span');
  const tooltipValue = document.createElement('a');

  tooltip.classList.add('contact__tooltip', 'tooltip');
  tooltipType.classList.add('contact__tooltip-type');
  tooltipValue.classList.add('contact__tooltip-value');

  tooltipType.textContent = type + ': ';
  tooltipValue.textContent = value;

  if(type === "Телефон" ){

    tooltipValue.href = `tel:${value.trim()}`;
    tooltipType.style.display = 'none';
    tooltipValue.style.color = 'var(--color-white)';
    tooltipValue.style.textDecoration = 'none';
  }else if(type === "Email" ){
    tooltipValue.href = `mailto:${value.trim()}`;
  }else{
    tooltipValue.href = value.trim()
  }

tooltip.append(tooltipType, tooltipValue)

return tooltip

  // return{
  //   tooltip,
  //   tooltipType,
  //   tooltipValue
  // }
}



async function getNewClient(client) {
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



  $idTD.textContent = client.id
  $fioTD.textContent = client.fio
  $createDataDIV.textContent = client.createdAt.date
  $createTimeDIV.textContent = client.createdAt.time
  $updateDataDIV.textContent = client.updatedAt.date
  $updateTimeDIV.textContent = client.updatedAt.time
  $actionTD.textContent = client.action
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
  $contactTD.classList.add('table__body-contacts')
  $changeBTN.classList.add('btn-change')
  $deleteBTN.classList.add('btn-delete')
  $actionBTN.classList.add('btn-group')

  $changeBTN.addEventListener('click',  function () {
     createFormEditClient(client);
    document.querySelector('main').append(createFormEditClient(client).$modalEditClientElement)
  })


  const $contactsGroup1 = document.createElement('div');
  const $contactsGroup2 = document.createElement('div');
  $contactsGroup1.classList.add('contacts__icon-group1')
  $contactsGroup2.classList.add('contacts__icon-group2')

  for (let i = 0; i < client.contacts.length; i++) {

    const $contactICON = document.createElement('div');
    $contactICON.classList.add('contacts-icon')

    $contactICON.dataset.number = i+1

    // if( !$contactICON.classList.contains("last-icon")) $contactICON.dataset.tippyContent = client.contacts[i].type + ': ' + client.contacts[i].value

    // console.log(!$contactICON.classList.contains("last-icon"))

      // const contactTooltip = contactTooltip()

    if( !$contactICON.classList.contains("last-icon")) $contactICON.append(contactTooltip(client.contacts[i].type, client.contacts[i].value))

    if (i < 5) {
      $contactsGroup1.append($contactICON)
    }


    if( $contactICON.dataset.number == 5){
      $contactICON.classList.add("last-icon")
      const iconNamber = document.createElement('div')

      iconNamber.classList.add("contacts__icon-number")

      let count = client.contacts.length - 4;
      iconNamber.textContent = "+" + count;
      $contactsGroup2.classList.add('hidden')

      iconNamber.addEventListener('click', function(){
        $contactICON.classList.remove("last-icon")
        iconNamber.innerHTML = ""
        $contactsGroup2.classList.remove('hidden')
      })

$contactICON.append(iconNamber)
    }



    if (i >= 5) {
      $contactsGroup2.append($contactICON)
    }

    // console.log( Client.contacts[i].type)
    // console.log($contactICON)
    switch (client.contacts[i].type) {
          case "Телефон":
            $contactICON.classList.add('tel')
            break
          case "Доп. телефон":
            $contactICON.classList.add('tel')
            break
          case "Email":
            $contactICON.classList.add('email')
            break
          case "Vk":
            $contactICON.classList.add('vk')
            break
          case "Facebook":
            $contactICON.classList.add('fb')
            break
        }
  }

  $contactTD.append($contactsGroup1)
  $contactTD.append($contactsGroup2)

  $deleteBTN.addEventListener('click', function () {
    createDeleteForm(client)
    document.querySelector('main').append(createDeleteForm().$modalDeleteElement)
    document.querySelector(".modal__delete-btn").addEventListener('click', function () {
      $clientTR.remove();
      serverDeleteClient(client.id)
    })
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


// async function createModalChangeClient(client) {
//   const $changeClientTITLE = document.querySelector(".modal__title")
//   const $textClientP = document.createElement('p')
//   const $idClientP = document.createElement('p')
// const deleteClient =  document.querySelector(".modal__link")

//   $changeClientTITLE.textContent = ""
//   $changeClientTITLE.id = "change-client"

//   $textClientP.textContent = "Изменить данные"
//  deleteClient.textContent = "Удалить клиента"

//   $idClientP.classList.add('modal__title-id')
//   $idClientP.textContent = "ID: " + client.id

//   const response = await fetch(SERVER_URL + '/api/clients/' + client.id, {
//     method: "GET",
//   })

//   //  получаем ответ в виде массива от сервера
//   const data = await response.json()

//   const modalInput = document.querySelectorAll(".modal__input")

//   modalInput.forEach(elem => {
//     console.log(elem)
//     switch (elem.id) {
//       case "surname":
//         elem.value = data.surname
//         break
//       case "name":
//         elem.value = data.name
//         break
//       case "lastName":
//         elem.value = data.lastName
//         break
//     }
//   })



//   const modalBtnSave = document.querySelector(".modal__btn-save")
//   console.log(modalBtnSave)
//   // modalBtnSave.addEventListener('click', serverChangeClient(client))


//   modalBtnSave.addEventListener('submit', async function () {
//     alert("отправляю изменения")
//     // e.preventDefault()
//     // serverChangeClient(data)
//     const modalContactAddArr = document.querySelectorAll(".modal__contact-add")
//   const contactsArr = [];
//   modalContactAddArr.forEach(function(elem){
//     let select= elem.querySelector('select')
// let input= elem.querySelector('input')

//     contactsArr.push({
//       type:select.value,
//       value:input.value
//     })
//   })

//   let response = await fetch(SERVER_URL + '/api/clients/' + client.id, {
//     method: "PATCH",
//     body: JSON.stringify({
//       name: document.querySelector("#name").value.trim(),
//       surname: document.querySelector("#surname").value.trim(),
//       lastName: document.querySelector("#lastName").value.trim(),
//       contacts: contactsArr,
//     }),
//     headers: { 'Content-Type': 'aplication/json' },
//   })
//   console.log(response)
//   //  получаем ответ в виде массива от сервера
//   let data = await response.json()
//   console.log(data)
//   // return data
//   })

//   deleteClient.addEventListener('click', function(){
//     serverDeleteClient(client.id)
//     })



//   $changeClientTITLE.append($textClientP)
//   $changeClientTITLE.append($idClientP)

// }


// функция удаления клиента






// данные клиента мы получаем от сервера, запишем его в константу (при смене сервера также удобно будет поменять его только в одном месте)
const SERVER_URL = 'http://localhost:3000'


//  функция получения массива клиентов с сервера
let promise = new Promise(function(resolve){

})
async function serverGetClients() {
  let response = await fetch(SERVER_URL + '/api/clients', {
    method: "GET",
    headers: { 'Content-Type': 'aplication/json' },
  })

  //  получаем ответ в виде массива от сервера
  let data = await response.json()
  return data
}



// полученный массив запишем в переменную

let serverData = await serverGetClients()


// console.log(serverData)




// назначаем проверку если serverData не пустой, тогда массив listClients будет равен массиву serverData

if (serverData) {
  serverData.forEach(function (elem) {
    const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
    // listClients.push(client)
    getNewClient(client)
  })
}

// const contactTypes = document.querySelectorAll(".modal__contact-select option");
// const contactValues = document.querySelectorAll(".modal__contact-enter").value;
// console.log(contactTypes)
// console.log(contactValues)
// let contacts = []
// for (let i = 0; i < contactTypes.length;i++ ){
//   contacts.push({
//     type:contactTypes[i].getAttribute('data-type'),
//     value:contactValues[i].value
//   })
// }

// console.log(contacts)


// async function serverChangeClient(client) {
//   const modalContactAddArr = document.querySelectorAll(".modal__contact-add")
//   const contactsArr = [];
//   modalContactAddArr.forEach(function(elem){

//     let select= elem.querySelector('select')
// let input= elem.querySelector('input')

//     contactsArr.push({
//       type:select.value,
//       value:input.value
//     })
//   })

//   let response = await fetch(SERVER_URL + '/api/clients/' + client.id, {
//     method: "PATCH",
//     body: JSON.stringify({
//       name: document.querySelector("#name").value.trim(),
//       surname: document.querySelector("#surname").value.trim(),
//       lastName: document.querySelector("#lastName").value.trim(),
//       contacts: contactsArr,
//     }),
//     headers: { 'Content-Type': 'aplication/json' },
//   })

//   //  получаем ответ в виде массива от сервера
//   let data = await response.json()
//   // console.log(data)
//   return data
// }



// и функцию удаления клиента с сервера по id

// async function serverDeleteClient(id) {

//   let response = await fetch(SERVER_URL + '/api/clients' + id, {
//     method: "DELETE",
//   })

//   let data = await response.json()
//   return data
// }

