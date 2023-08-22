

// // export default

// // создадим массив куда будем добавлять наших клиетов

// let listClients = []


export class Client {

  // * обязательное поле, имя клиента  и фамилия, отчество необязательно
  constructor(id, surname, name, lastName, createdAt, updatedAt, contacts) {

    this.id = id
    this.surname = surname
    this.name = name
    this.lastName = lastName
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

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastName
  }

}








//  export const getNewClient = function (client) {

//   const $clientTR = document.createElement('tr');
//   const $idTD = document.createElement('td');
//   const $fioTD = document.createElement('td');
//   const $createdAtTD = document.createElement('td');
//   const $createDataDIV = document.createElement('div');
//   const $createTimeDIV = document.createElement('div');
//   const $updatedAtTD = document.createElement('td');
//   const $updateDataDIV = document.createElement('div');
//   const $updateTimeDIV = document.createElement('div');
//   const $contactTD = document.createElement('td');
//   const $actionTD = document.createElement('td');
//   const $actionBTN = document.createElement('div');
//   const $changeBTN = document.createElement('btn');
//   const $deleteBTN = document.createElement('btn');



//   $idTD.textContent = client.id
//   $fioTD.textContent = client.fio
//   $createDataDIV.textContent = client.createdAt.date
//   $createTimeDIV.textContent = client.createdAt.time
//   $updateDataDIV.textContent = client.updatedAt.date
//   $updateTimeDIV.textContent = client.updatedAt.time
//   $actionTD.textContent = client.action
//   $changeBTN.textContent = 'Изменить'
//   $deleteBTN.textContent = 'Удалить'

//   $idTD.classList.add('table__body-id')
//   $fioTD.classList.add('table__body-fio')
//   $createdAtTD.classList.add('table__body-createdat')
//   $createDataDIV.classList.add('table__body-date')
//   $createTimeDIV.classList.add('table__body-time')
//   $updatedAtTD.classList.add('table__body-updatedat')
//   $updateDataDIV.classList.add('table__body-date')
//   $updateTimeDIV.classList.add('table__body-time')
//   $contactTD.classList.add('table__body-contacts')
//   $changeBTN.classList.add('btn-change')
//   $deleteBTN.classList.add('btn-delete')
//   $actionBTN.classList.add('btn-group')

//   $changeBTN.addEventListener('click',  function () {
//      createFormEditClient(client);
//     document.querySelector('main').append(createFormEditClient(client).$modalEditClientElement)
//   })


//   const $contactsGroup1 = document.createElement('div');
//   const $contactsGroup2 = document.createElement('div');
//   $contactsGroup1.classList.add('contacts__icon-group1')
//   $contactsGroup2.classList.add('contacts__icon-group2')

//   for (let i = 0; i < client.contacts.length; i++) {

//     const $contactICON = document.createElement('div');
//     $contactICON.classList.add('contacts-icon')

//     $contactICON.dataset.number = i+1

//     // if( !$contactICON.classList.contains("last-icon")) $contactICON.dataset.tippyContent = client.contacts[i].type + ': ' + client.contacts[i].value

//     // console.log(!$contactICON.classList.contains("last-icon"))

//       // const contactTooltip = contactTooltip()

//     if( !$contactICON.classList.contains("last-icon")) $contactICON.append(contactTooltip(client.contacts[i].type, client.contacts[i].value))

//     if (i < 5) {
//       $contactsGroup1.append($contactICON)
//     }


//     if( $contactICON.dataset.number == 5){
//       $contactICON.classList.add("last-icon")
//       const iconNamber = document.createElement('div')

//       iconNamber.classList.add("contacts__icon-number")

//       let count = client.contacts.length - 4;
//       iconNamber.textContent = "+" + count;
//       $contactsGroup2.classList.add('hidden')

//       iconNamber.addEventListener('click', function(){
//         $contactICON.classList.remove("last-icon")
//         iconNamber.innerHTML = ""
//         $contactsGroup2.classList.remove('hidden')
//       })

// $contactICON.append(iconNamber)
//     }



//     if (i >= 5) {
//       $contactsGroup2.append($contactICON)
//     }

//     // console.log( Client.contacts[i].type)
//     // console.log($contactICON)
//     switch (client.contacts[i].type) {
//           case "Телефон":
//             $contactICON.classList.add('tel')
//             break
//           case "Доп. телефон":
//             $contactICON.classList.add('tel')
//             break
//           case "Email":
//             $contactICON.classList.add('email')
//             break
//           case "Vk":
//             $contactICON.classList.add('vk')
//             break
//           case "Facebook":
//             $contactICON.classList.add('fb')
//             break
//         }
//   }

//   $contactTD.append($contactsGroup1)
//   $contactTD.append($contactsGroup2)

//   $deleteBTN.addEventListener('click', function () {
//     createDeleteForm(client)
//     document.querySelector('main').append(createDeleteForm().$modalDeleteElement)
//     document.querySelector(".modal__delete-btn").addEventListener('click', function () {
//       $clientTR.remove();
//       serverDeleteClient(client.id)
//     })
//   });

//   $clientTR.append($idTD)
//   $clientTR.append($fioTD)
//   $clientTR.append($createdAtTD)
//   $clientTR.append($updatedAtTD)
//   $clientTR.append($contactTD)
//   $clientTR.append($actionTD)
//   $createdAtTD.append($createDataDIV)
//   $createdAtTD.append($createTimeDIV)
//   $updatedAtTD.append($updateDataDIV)
//   $updatedAtTD.append($updateTimeDIV)
//   $actionTD.append($actionBTN)
//   $actionBTN.append($changeBTN)
//   $actionBTN.append($deleteBTN)




//   return $clientTR
// }


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








