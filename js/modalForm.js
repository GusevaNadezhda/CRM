import { createAddContact } from "./contacts.js"
import { serverGetClient } from "./server.js"
import { serverAddClient } from "./server.js"
import { serverChangeClient } from "./server.js"
import { serverDeleteClient } from "./server.js"


export const createModalFormClient = function () {

  const modalClientForm = document.createElement("form")
  const modalFormFio = document.createElement('div')
  const modalСontact = document.createElement('div')
  const modalСontactText = document.createElement('div')
  const modalBtnSave = document.createElement('button')

  const modalError = document.createElement('div')
  const unacceptableLetter = document.createElement('span')
  const writeSurname = document.createElement('span')
  const writeName = document.createElement('span')
  const writeLastname = document.createElement('span')
  const requiredValue = document.createElement('span')
  const requiredContact = document.createElement('span')


  const modalLink = document.createElement('div')
  let modalInputSurname;
  let modalInputName;
  let modalInputLastName;

  modalClientForm.classList.add("modal__form")
  modalFormFio.classList.add("modal__form-fio")
  modalСontact.classList.add("modal__contact")
  modalСontactText.classList.add("modal__contact-text")

  modalError.classList.add("modal__error")
  unacceptableLetter.id = "unacceptableLetter"
  writeSurname.id = "writeSurname"
  writeName.id = "writeName"
  writeLastname.id = "writeLastname"
  requiredValue.id = "requiredValue"
  requiredContact.id = "requiredContact"

  modalBtnSave.classList.add("modal__btn-save")
  modalLink.classList.add("modal__link")

  modalСontactText.textContent = "Добавить контакт";
  modalBtnSave.textContent = "Сохранить"
  modalError.textContent = ""

  for (let i = 0; i < 3; i++) {
    const modalField = document.createElement('label')

    const modalPlaceholder = document.createElement('div')
    const modalSpan = document.createElement('span')
    const modalInputs = document.querySelectorAll(".modal__input")

    modalField.classList.add("modal__field")

    modalPlaceholder.classList.add("modal__placeholder")



    modalField.dataset.number = i + 1

    switch (modalField.getAttribute("data-number")) {
      case "1":
        modalInputSurname = document.createElement('input')
        modalInputSurname.classList.add("modal__input")
        modalInputSurname.id = "surname"
        modalPlaceholder.textContent = "Фамилия"
        modalSpan.textContent = "*"
        // modalInputSurname.required = true
        modalInputSurname.type = "text"
        modalField.append(modalInputSurname);
        break
      case "2":
        modalInputName = document.createElement('input')
        modalInputName.classList.add("modal__input")
        modalInputName.id = "name"
        modalPlaceholder.textContent = "Имя"
        modalSpan.textContent = "*"
        // modalInputName.required = true
        modalInputName.type = "text"
        modalField.append(modalInputName);
        break
      case "3":
        modalInputLastName = document.createElement('input')
        modalInputLastName.classList.add("modal__input")
        modalInputLastName.id = "lastName"
        modalPlaceholder.textContent = "Отчество"
        modalInputLastName.type = "text"
        modalField.append(modalInputLastName);
        break
    }


    modalFormFio.append(modalField)

    modalField.append(modalPlaceholder);
    modalPlaceholder.append(modalSpan)
  }


  // добавление контакта при нажатии на кнопку "Добавить контакт"


  modalСontactText.addEventListener('click', () => {
    createAddContact()
    modalСontact.append(createAddContact().modalContactAdd)
  })



  modalСontact.append(modalСontactText)
  modalClientForm.append(modalFormFio)
  modalClientForm.append(modalСontact)
  modalClientForm.append(modalBtnSave)
  modalClientForm.append(modalLink)
  modalBtnSave.prepend(modalError)
  modalError.append(unacceptableLetter, writeSurname, writeName, writeLastname, requiredValue, requiredContact)
  modalBtnSave.insertAdjacentElement('beforeBegin', modalError)

  return {
    modalClientForm,
    modalFormFio,
    modalСontact,
    modalСontactText,
    modalInputSurname,
    modalInputName,
    modalInputLastName,
    modalError,
    modalBtnSave,
    modalLink
  }
}

export const createFormNewClient = function () {

  const $modalNewClientElement = document.createElement('div')
  const $modalNewClientContent = document.createElement('div')
  const $modalNewClientClose = document.createElement('button')
  const $modalNewClientTITLE = document.createElement('h2')
  const modalForm = createModalFormClient()
  const $modalNewClientForm = modalForm.modalClientForm
  const modalBtnSave = modalForm.modalBtnSave
  const modalNewClientCancel = modalForm.modalLink

  $modalNewClientElement.classList.add("modal-add")
  $modalNewClientElement.classList.add('open')
  $modalNewClientContent.classList.add("modal-client")
  $modalNewClientTITLE.classList.add("modal__title")
  $modalNewClientClose.classList.add("modal__btn-close")
  $modalNewClientElement.id = "modal-add-client"
  $modalNewClientClose.id = "modal-close"
  $modalNewClientTITLE.id = "new-client"

  $modalNewClientTITLE.textContent = "Новый клиент"
  modalForm.modalLink.textContent = "Отмена"

  console.log(validateModalForm())

  $modalNewClientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!validateModalForm()) {
      return ;
    }else{
        const promise = new Promise(function (resolve) {
          modalBtnSave.classList.add('loading')
          modalBtnSave.append(createPreloader())
          modalBtnSave.querySelector('.preloader-block').classList.add('save');
          serverAddClient()

        window.onload = resolve()
        })

        promise.then(function(){
          modalBtnSave.classList.remove('loading')
          document.querySelector('.preloader-block').classList.remove('loading');
        })
    };

  })

  $modalNewClientClose.addEventListener('click', () => $modalNewClientElement.remove())

  window.addEventListener('click', (e) => {
    if (e.target == $modalNewClientElement) {
      $modalNewClientElement.remove();
    }
  })



  modalNewClientCancel.addEventListener('click', () => $modalNewClientElement.remove())



  $modalNewClientElement.append($modalNewClientContent)
  $modalNewClientContent.append($modalNewClientClose)
  $modalNewClientContent.append($modalNewClientTITLE)
  $modalNewClientContent.append($modalNewClientForm)


  return {
    $modalNewClientElement,
    $modalNewClientContent,
  }
}

export const createFormEditClient = function (client) {

  const $modalEditClientElement = document.createElement('div')
  const $modalEditClientContent = document.createElement('div')
  const $modalEditClientClose = document.createElement('button')
  const $modalEditClientTITLE = document.createElement('h2')
  const $textClientP = document.createElement('p')
  const $idClientP = document.createElement('p')
  const modalForm = createModalFormClient()
  const $modalEditClientForm = modalForm.modalClientForm
  const modalBtnSaveEdit = modalForm.modalBtnSave
  const modalEditClientCancel = modalForm.modalLink
  const modalContact = modalForm.modalСontact
  // const createContact = createAddContact();



  $modalEditClientElement.classList.add("modal-add")
  $modalEditClientElement.classList.add('open')
  $modalEditClientContent.classList.add("modal-client")
  $modalEditClientTITLE.classList.add("modal__title")
  $idClientP.classList.add('modal__title-id')
  $modalEditClientClose.classList.add("modal__btn-close")
  $modalEditClientElement.id = "modal-add-client"
  $modalEditClientClose.id = "modal-close"
  $modalEditClientTITLE.id = "edit-client"


  $modalEditClientTITLE.textContent = ""
  $textClientP.textContent = "Изменить данные"
  $idClientP.textContent = "ID: " + client.id
  modalForm.modalLink.textContent = "Удалить клиента"


  const modalInput = modalForm.modalFormFio.querySelectorAll("input");



  modalInput.forEach(elem => {
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
    }
  })

  for (const contact of client.contacts) {
    const createContact = createAddContact();
    createAddContact()
    createContact.modalContactSelect.value = contact.type
    createContact.modalContactEnter.value = contact.value

    modalContact.append(createContact.modalContactAdd)
  }

  // при нажатии на кнопку Сохранить отредактированные данные отправляются на сервер
  modalBtnSaveEdit.addEventListener('click', (e) => {
    e.preventDefault;
    // собираем измененные данные клиента:


    const contactTypes = document.querySelectorAll('.modal__contact-select');
    const contactValues = document.querySelectorAll('.modal__contact-enter');

    let editClient = {};
    let editContactsArr = [];

    editClient.id = client.id
    editClient.name = modalForm.modalInputName.value;
    editClient.surname = modalForm.modalInputSurname.value;
    editClient.lastName = modalForm.modalInputLastName.value;
    editClient.contacts = editContactsArr;

    for (let i = 0; i < contactTypes.length; i++) {
      editContactsArr.push({
        type: contactTypes[i].value,
        value: contactValues[i].value
      })
    }



    console.log(editClient)

    alert('отправка изменений');
    serverChangeClient(editClient)
  }
  )

  // при нажатии на кнопку Удалить клиента открывается форма с подтверждением удаления
  modalEditClientCancel.addEventListener('click', function () {
    createDeleteForm(client)
    document.querySelector('main').append(createDeleteForm().$modalDeleteElement)
    document.querySelector(".modal__delete-btn").addEventListener('click', function () {
      document.querySelector("tr").remove();
      serverDeleteClient(client.id)
    })
  })

  $modalEditClientClose.addEventListener('click', () => $modalEditClientElement.remove())

  window.addEventListener('click', (e) => {
    if (e.target == $modalEditClientElement) {
      $modalEditClientElement.remove();
    }
  })





  $modalEditClientElement.append($modalEditClientContent)
  $modalEditClientContent.append($modalEditClientClose)
  $modalEditClientContent.append($modalEditClientTITLE)
  $modalEditClientTITLE.append($textClientP)
  $modalEditClientTITLE.append($idClientP)
  $modalEditClientContent.append($modalEditClientForm)


  return {
    $modalEditClientElement,
    $modalEditClientContent,
  }
}


export const createDeleteForm = function (Client) {

  const $modalDeleteElement = document.createElement('div')
  const $modalDeleteContent = document.createElement('div')
  const $modalDeleteTITLE = document.createElement('h2')
  const $modalDeleteTEXT = document.createElement('p')
  const $modalDeleteBTN = document.createElement('button')
  const $modalDeleteCencel = document.createElement('p')
  const $modalDeleteClose = document.createElement('button')

  $modalDeleteElement.classList.add("modal__delete-element")
  $modalDeleteElement.classList.add('open')
  $modalDeleteContent.classList.add("modal__delete-content")
  $modalDeleteTITLE.classList.add("modal__delete-title")
  $modalDeleteTEXT.classList.add("modal__delete-text")
  $modalDeleteBTN.classList.add("modal__delete-btn")
  $modalDeleteCencel.classList.add("modal__delete-cencel")
  $modalDeleteClose.classList.add("modal__btn-close")


  $modalDeleteTITLE.textContent = "Удалить клиента"
  $modalDeleteTEXT.textContent = "Вы действительно хотите удалить данного клиента?"
  $modalDeleteBTN.textContent = "Удалить"
  $modalDeleteCencel.textContent = "Отмена"

  // закрытие модального окна при нажатии на крестик

  $modalDeleteClose.addEventListener('click', () => $modalDeleteElement.remove())


  // отмена модального окна при нажатии на кнопку отмена

  $modalDeleteCencel.addEventListener('click', () => $modalDeleteElement.remove())

  window.addEventListener('click', (e) => {
    if (e.target == $modalDeleteElement) {
      $modalDeleteElement.remove();
    }
  })


  $modalDeleteContent.append(
    $modalDeleteClose,
    $modalDeleteTITLE,
    $modalDeleteTEXT,
    $modalDeleteBTN,
    $modalDeleteCencel
  )
  $modalDeleteElement.append($modalDeleteContent)

  return {
    $modalDeleteElement,
    $modalDeleteContent,
    $modalDeleteBTN,
  }
}

export function validateModalForm(){

  const modalForm = createModalFormClient()
  const modalError = modalForm.modalError;
  const userSurname = modalForm.modalInputSurname;
  // const userSurname = document.getElementById('surname');
  const userName = modalForm.modalInputName;
  const userLastName = modalForm.modalInputLastName;
  const regexp = /[^а-яА-ЯёЁ]+$/g;

  // console.log(modalForm.modalError)
  // console.log(modalForm.modalInputName)
  // console.log(userLastName)

  // const onInputValue = input => {
  //   input.addEventListener('input', () => {
  //     input.style.borderColor = "var(--red)";
  //     // modalError.textContent = ''
  //   });

  //   input.oncut = input.oncopy = input.onpast = () => {
  //     input.style.borderColor = "var(--red)";
  //     // modalError.textContent = ''
  //   };

  //   input.onchange = () => {
  //     input.style.borderColor = "var(--red)";

  //     if (userSurname && userName && userLastName) {
  //       // modalError.textContent = ''
  //     }
  //   }
  // };

  // onInputValue(userSurname)
  // onInputValue(userName)
  // onInputValue(userLastName)
  console.log(userName)
  console.log(userName.value)
  console.log(userName.textContent)
  console.log(userName.innerHTML)

  const checkRequiredName = (input,massage,name) => {
    console.log(input.value)
    if(!input.value){
      massage.classList.add('active')
      input.style.borderColor = "var(--red)";
      massage.textContent = `Введите ${name} клиента`
      return false
    }else{
      massage.textContent = ''
    }
    return true
  }

  const checkByRegexp = (input, regexp) => {
    if (regexp.test(input.value)) {
        input.style.borderColor = "var(--red)";
        modalError.classList.add('active')
        modalError.textContent = 'Недопустимые символы!';
        return false;
    }

    return true;
};
// checkRequiredName(userSurname, modalError, 'Фамилию')
// checkRequiredName(userName, modalError, 'Имя')
// console.log(checkRequiredName(userSurname, modalError, 'Фамилию'))


if (!checkRequiredName(userSurname, modalError, 'Фамилию')) { return false };
if (!checkRequiredName(userName, modalError, 'Имя')) { return false };
if (!checkRequiredName(userLastName, modalError, 'Отчество')) { return false };
if (!checkByRegexp(userName, regexp)) { return false };
if (!checkByRegexp(userSurname, regexp)) { return false };
if (!checkByRegexp(userLastName, regexp)) { return false };


return true
}


