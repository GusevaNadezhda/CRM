

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

}

createFormNewClient()
