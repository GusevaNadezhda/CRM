import { createAddContact } from "./contacts.js"
import { serverAddClient } from "./server.js"
import { serverChangeClient } from "./server.js"
import { serverDeleteClient } from "./server.js"
import { createPreloader } from "./table.js"
import { getNewClient } from "./table.js"
import { serverGetClients } from "./server.js"
import { Client } from "./client.js"


export const createModalFormClient = function () {

  // создание формы модального окна
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
  modalBtnSave.classList.add("modal__btn-save")
  modalLink.classList.add("modal__link")
  unacceptableLetter.id = "unacceptableLetter"
  writeSurname.id = "writeSurname"
  writeName.id = "writeName"
  writeLastname.id = "writeLastname"
  requiredValue.id = "requiredValue"
  requiredContact.id = "requiredContact"



  modalСontactText.textContent = "Добавить контакт";
  modalBtnSave.textContent = "Сохранить"
  modalError.textContent = ""

  // для создания полей ФИО используем цикл
  for (let i = 0; i < 3; i++) {
    const modalField = document.createElement('label')
    const modalPlaceholder = document.createElement('div')
    const modalSpan = document.createElement('span')

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
    unacceptableLetter,
    writeSurname,
    writeName,
    writeLastname,
    requiredValue,
    requiredContact,
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
  const modalInputSurnameNewClient = modalForm.modalInputSurname
  const modalInputNameNewClient = modalForm.modalInputName
  const modalInputLastNameNewClient = modalForm.modalInputLastName
  const modalNewClientCancel = modalForm.modalLink
  const modalInputs = modalForm.modalClientForm.querySelectorAll("input")

  $modalNewClientElement.classList.add("modal-add")
  $modalNewClientElement.classList.add('open')
  $modalNewClientContent.classList.add("modal-client")
  $modalNewClientTITLE.classList.add("modal__title")
  $modalNewClientClose.classList.add("modal__btn-close")
  modalInputSurnameNewClient.classList.add("surname-new")
  modalInputNameNewClient.classList.add("name-new")
  modalInputLastNameNewClient.classList.add("lastname-new")
  $modalNewClientElement.id = "modal-add-client"
  $modalNewClientClose.id = "modal-close"
  $modalNewClientTITLE.id = "new-client"

  $modalNewClientTITLE.textContent = "Новый клиент"
  modalForm.modalLink.textContent = "Отмена"

  // событие поднятие плейсхолдера вверх при заполнении импута

  modalInputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value !== "") {
        input.classList.add('filled')
      } else {
        input.classList.remove('filled')
      }
    })
  })


  $modalNewClientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // validateModalForm(modalForm)
    console.log(validateModalForm(modalForm))
    console.log(validateContact($modalNewClientForm))

    if (!validateModalForm(modalForm)) {
      return;
    } else if (!validateContact($modalNewClientForm)) {
      return;
    } else {
      const inputsForm = $modalNewClientForm.querySelectorAll('input')
      const $tbody = document.querySelector('tbody')
      let clientAdd = await serverAddClient();
      const client = new Client(clientAdd.id, clientAdd.surname, clientAdd.name, clientAdd.lastName, clientAdd.createdAt, clientAdd.updatedAt, clientAdd.contacts)
      const clientSection = getNewClient(client)
      $tbody.append(clientSection)
      inputsForm.forEach(input => {
        input.disabled = true;
      })
      $modalNewClientElement.remove()
    }
    const inputsForm = $modalNewClientForm.querySelectorAll('input')
    inputsForm.forEach(input => input.disabled = true)
  })

  // закрытие формы при нажатии на крестик
  $modalNewClientClose.addEventListener('click', () => $modalNewClientElement.remove())
  // закрытие формы при нажатии на область вне модального окна
  window.addEventListener('click', (e) => {
    if (e.target == $modalNewClientElement) {
      $modalNewClientElement.remove();
    }
  })
  // закрытие формы при нажатии на кнопку отмена
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
  const modalInput = modalForm.modalFormFio.querySelectorAll("input");

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

  // заполнение полей ФИО в форме согласно данным клиента
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
    if (elem.value !== "") {
      elem.classList.add('filled')
    }
  })
  // заполнение полей контактов в форме согласно данным клиента
  for (const contact of client.contacts) {
    const createContact = createAddContact();
    createAddContact()
    createContact.modalContactSelect.value = contact.type
    createContact.modalContactSelect.dataset.type = contact.type
    createContact.modalContactEnter.value = contact.value
    modalContact.append(createContact.modalContactAdd)
  }

  // при нажатии на кнопку Сохранить отредактированные данные отправляются на сервер
  $modalEditClientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    modalBtnSaveEdit.style.backgroundColor = "#8052FF";
    // включаем прелоадер в кнопке Сохранить при ожидании отправки на сервер
    modalBtnSaveEdit.prepend(createPreloader())
    modalBtnSaveEdit.querySelector('.preloader-block').classList.add('change', 'loading')
    $modalEditClientContent.classList.add("save")
    // проверяем валидацию полей ФИО
    if (!validateModalForm(modalForm)) {
      return;
    } else if (!validateContact($modalEditClientForm)) {
      return;
    } else {
      // собираем измененные данные клиента:
      const contactTypes = document.querySelectorAll('.modal__contact-add');

      let editClient = {};
      let editContactsArr = [];

      editClient.id = client.id
      editClient.name = modalForm.modalInputName.value;
      editClient.surname = modalForm.modalInputSurname.value;
      editClient.lastName = modalForm.modalInputLastName.value;


      // --------------------

      contactTypes.forEach(elem => {
        const contactType = elem.querySelector('select')
        const contactValue = elem.querySelector('input')

        // добавляем контакты для отправки на сервер
        editContactsArr.push({
          type: contactType.value,
          value: contactValue.value
        })
      })
      editClient.contacts = editContactsArr;

      // если валидация не пройдена данные на сервер не отправляются, форма остается открытой,
      //  если пройдена то на момент отправки все поля импутов блокируются до успешного ответа от сервера



      const inputsForm = $modalEditClientForm.querySelectorAll('input')
      inputsForm.forEach(input => {
        input.disabled = true;
      })


      const $tbody = document.querySelector('tbody')
      let clientEdit = await serverChangeClient(editClient);
      let clientList = await serverGetClients()
      $tbody.innerHTML = ''
      clientList.forEach(elem => {
        const clientsInTable = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
        const clientSection = getNewClient(clientsInTable)
        $tbody.append(clientSection)
      })


      $modalEditClientElement.remove()
    }
    const inputsForm = $modalEditClientForm.querySelectorAll('input')
    inputsForm.forEach(input => input.disabled = true)
    return true
  })

  // при нажатии на кнопку Удалить клиента открывается форма с подтверждением удаления
  // modalEditClientCancel.addEventListener('click', function () {
  //   // createDeleteForm(client)
  //   document.querySelector('main').append(createDeleteForm().$modalDeleteElement)
  //   document.querySelector(".modal__delete-btn").addEventListener('click', function () {
  //     document.querySelector("tr").remove();
  //     serverDeleteClient(client.id)
  //     createDeleteForm().$modalDeleteElement.remove()
  //   })
  //   return true
  // })


  modalEditClientCancel.addEventListener('click',  function () {
    const deleteForm = createDeleteForm()
    document.querySelector('main').append(deleteForm.$modalDeleteElement)
    document.querySelector(".modal__delete-btn").addEventListener('click', async function () {
      // getNewClient(client).remove();
      document.querySelector("tr").remove()
      serverDeleteClient(client.id)
      const $tbody = document.querySelector('tbody')
      let clientList = await serverGetClients()
      $tbody.innerHTML = ''
      clientList.forEach(elem => {
        const clientsInTable = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
        const clientSection = getNewClient(clientsInTable)
        $tbody.append(clientSection)
      deleteForm.$modalDeleteElement.remove()
      $modalEditClientElement.remove()
    })
  })
  });
  // закрытие формы при нажатии на крестик
  $modalEditClientClose.addEventListener('click', () => $modalEditClientElement.remove())
  // закрытие формы при нажатии на область вне модального окна
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
  // закрытие модального окна при нажатии на область вне модального окна
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

export function validateModalForm(modalForm) {

  const modalError = modalForm.modalError;
  const clientSurname = modalForm.modalInputSurname;
  const clientName = modalForm.modalInputName;
  const clientLastName = modalForm.modalInputLastName;
  const unacceptableLetter = modalForm.unacceptableLetter;
  const writeSurname = modalForm.writeSurname;
  const writeName = modalForm.writeName;
  const writeLastname = modalForm.writeLastname;
  const requiredValue = modalForm.requiredValue;
  const requiredContact = modalForm.requiredContact;
  const validateArray = [unacceptableLetter, writeSurname, writeName, writeLastname, requiredValue, requiredContact];
  const regexp = /[^а-яА-ЯёЁ]+$/g;

  // функция для изменения стилей импута и текста с ошибкой при нажатия на импут с целью редактирования или заполнения
  const onInputValue = input => {

    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--grey)';
      for (const error of validateArray) {
        error.textContent = "";
      }
    });

    input.oncut = input.oncopy = input.onpast = () => {
      input.style.borderColor = 'var(--grey)';
      for (const error of validateArray) {
        error.textContent = "";
      }
    };

    input.onchange = () => {
      input.style.borderColor = 'var(--grey)';

      if (clientSurname.value && clientName.value && clientLastName.value) {
        for (const error of validateArray) {
          error.textContent = "";
        }
      }
    }
  };

  onInputValue(clientSurname)
  onInputValue(clientName)
  onInputValue(clientLastName)
  // функция которая проверяет заполнение текстовых полей
  const checkRequiredName = (input, massage, name) => {
    if (!input.value) {
      modalError.classList.add('active')
      input.style.borderColor = 'var(--red)';
      massage.textContent = `Введите ${name} клиента`
      return false
    } else {
      massage.textContent = ''
    }
    return true
  }
  // функция которая проверяет заполнение текстовых полей ТОЛЬКО русскими буквами
  const checkByRegexp = (input, regexp) => {
    if (regexp.test(input.value)) {
      input.style.borderColor = 'var(--red)';
      modalError.classList.add('active')
      unacceptableLetter.textContent = 'Недопустимые символы!';
      return false;
    }
    return true;
  };

  if (!checkRequiredName(clientSurname, writeSurname, 'Фамилию')) { return false };
  if (!checkRequiredName(clientName, writeName, 'Имя')) { return false };
  if (!checkByRegexp(clientName, regexp)) { return false };
  if (!checkByRegexp(clientSurname, regexp)) { return false };
  if (!checkByRegexp(clientLastName, regexp)) { return false };

  return true
}

export function validateContact(form) {

  const modalContact = form.querySelector(".modal__contact")
  const modalContactAdd = form.querySelectorAll(".modal__contact-add")
  const modalError = form.querySelector(".modal__error")
  const onlyNumbers = /[^0-9]+$/g;
  const onlyEmail = /[^a-zA-Z|@|.]+$/g;



  const onInputValue = input => {

    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--grey)';

    });

    input.oncut = input.oncopy = input.onpast = () => {
      input.style.borderColor = 'var(--grey)';
    };

    input.onchange = () => {
      input.style.borderColor = 'var(--grey)';
      modalError.classList.remove('active')
    }
  };

  const showErrorMassage = (massage, block, input) => {
    block.textContent = massage;
    input.style.borderColor = 'var(--red)'
  }

  modalContactAdd.forEach(elem => {
    const select = elem.querySelector(".modal__contact-select")
    const input = elem.querySelector(".modal__contact-enter")
    const contactType = select.dataset.type
    const contactValue = input.value

    onInputValue(input)
    // проверка на заполнение полей контактов
    if (!contactValue) {
      modalError.classList.add('active')
      showErrorMassage("Заполните поле контакта", modalError, input)
      return false
    }

    switch (contactType) {
      case "Телефон":
        if (onlyNumbers.test(contactValue)) {
          modalError.classList.add('active')
          showErrorMassage("Возможен ввод только цифр", modalError, input)
          return false
        } else if (contactValue.length !== 11) {
          modalError.classList.add('active')
          showErrorMassage("Номер телефона состоит из 11 цифр", modalError, input)
          return false
        }
        return true
      case "Email":
        if (onlyEmail.test(contactValue)) {
          modalError.classList.add('active')
          showErrorMassage("Email введент неверно", modalError, input)
          return false
        }
        return true;
    }
  })

  if (!modalError.classList.contains('active')) return true;
  if (modalContactAdd.length == 0) return true;

}
