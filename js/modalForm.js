

function createFormNewClient() {

  // const $modalNewclient = document.querySelector(".modal-newclient")
  const $newClientTITLE = document.querySelector(".modal__title")
  // const $addClientFORM = document.querySelector('.modal__form')
  // const $addContactDIV = document.createElement('div')
  const $saveClientBTN = document.querySelector('.modal__btn-save')
  const $cancelA = document.querySelector('.modal__link')



  $newClientTITLE.textContent = "Новый клиент"
  // $newClientTITLE.classList.add("modal__title")

  // for (let i = 1; i < 4; i++) {
  //   const $addClientINPUT = document.createElement('input');
  //   $addClientINPUT.id = i;
  //   $addClientINPUT.classList.add("modal__input")
  //   $addClientINPUT.type = "text";
  //   $addClientFORM.append($addClientINPUT)


  //   switch ($addClientINPUT.id) {
  //     case '1':
  //       $addClientINPUT.placeholder = "Фамилия";
  //       $addClientINPUT.required = true
  //       break
  //     case '2':
  //       $addClientINPUT.placeholder = "Имя";
  //       $addClientINPUT.required = true
  //       break
  //     case '3':
  //       $addClientINPUT.placeholder = "Отчество";
  //       break
  //   }
  // }

  // $addContactDIV.textContent = "Добавить контакт"
  // $addContactDIV.classList.add("modal__contact")

  // $saveClientBTN.textContent = "Сохранить"
  // $saveClientBTN.type = "submit"
  // $saveClientBTN.classList.add("save-btn")

 $saveClientBTN
  const modalError = document.createElement('div')
  modalError.classList.add("modal__error")
  modalError.textContent = ""
  // $saveClientBTN.prepend(modalError)
  $saveClientBTN.insertAdjacentElement('beforeBegin', modalError)

  // родитель.insertBefore(элемент, перед кем вставить)

  $cancelA.textContent = "Отмена"
  // $cancelA.classList.add("modal__link")

  // $modalNewclient.append($newClientTITLE)
  // $modalNewclient.append($addClientFORM)
  // $modalNewclient.append($cancelA)
  // $addClientFORM.append($addContactDIV)
  // $addClientFORM.append($saveClientBTN)

  document.querySelector(".modal__link").addEventListener('click', function () {
    document.querySelector("#modal-add-client").classList.remove('open')
  })
  // document.querySelector("#modal-add-client").addEventListener('click', function(){
  //   document.querySelector("#modal-add-client").classList.remove('open')
  // })
}

createFormNewClient()

function createFormChangeClient(client) {
  const $changeClientTITLE = document.querySelector(".modal__title")
const $idClientP = document.createElement('p')

  $changeClientTITLE.textContent = "Изменить данные"
  $idClientP.textContent = client.id

  const modalInput = document.querySelectorAll(".modal__input")

  switch (modalInput.id) {
    case "surname":
      this.value = client.surname
      break
      case "name":
      this.value = client.name
      break
      case "lastName":
      this.value = client.lastName
      break
  }

  // const modalContact = document.querySelector(".modal__contact")
  // modalContact.addEventListener('click', function(){
  //   const modalContactAdd = document.querySelector('.modal__contact-add')
  //   createAddContact()
  //   modalContact.append(modalContactAdd)
  // })

}




// let testClient = {
//   // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
//   id: '1234567890',
//   // дата и время создания клиента, заполняется сервером автоматически, после создания нельзя изменить
//   createdAt: '2021-02-03T13:07:29.554Z',
//   // дата и время изменения клиента, заполняется сервером автоматически при изменении клиента
//   updatedAt: '2021-02-03T13:07:29.554Z',
//   // * обязательное поле, имя клиента
//   name: 'Василий',
//   // * обязательное поле, фамилия клиента
//   surname: 'Пупкин',
//   // необязательное поле, отчество клиента
//   lastName: 'Васильевич',
//   // контакты - необязательное поле, массив контактов
//   // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
//   contacts: [
//     {
//       type: 'Телефон',
//       value: '+71234567890'
//     },
//     {
//       type: 'Email',
//       value: 'abc@xyz.com'
//     },
//     {
//       type: 'Facebook',
//       value: 'https://facebook.com/vasiliy-pupkin-the-best'
//     }
//   ]
// }

// createFormChangeClient(testClient)
