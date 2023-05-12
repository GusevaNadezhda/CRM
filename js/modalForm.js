

function createFormNewClient() {

  // const $modalNewclient = document.querySelector(".modal-newclient")
  const $newClientTITLE = document.querySelector(".modal__title")
  // const $addClientFORM = document.querySelector('.modal__form')
  // const $addContactDIV = document.createElement('div')
  const $saveClientBTN = document.querySelector('.mmodal__btn-save')
  const $cancelA = document.querySelector('.modal__link')



  $newClientTITLE.textContent = "Новый клиент"
  $newClientTITLE.classList.add("modal__title")

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
  createFormNewClient()
  const modalPlaceholder = document.querySelectorAll(".modal__placeholder")
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
}
