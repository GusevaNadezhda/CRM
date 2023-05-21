

const contactsArr = [];

console.log(contactsArr);

class Contact {

  constructor(type, value) {
    this.type = type
    this.value = value
  }
}



// Создадим функцию которая будет добавлять в форму новые контакты

function createAddContact() {
  // тултип

tippy('[data-tippy-content]');

  const modalContact = document.querySelector(".modal__contact")
  const modalContactText = document.querySelector(".modal__contact-text")
  const modalContactAdd = document.createElement('div');
  const modalContactContent = document.createElement('div');
  const modalContactSelect = document.createElement('select');
  const modalContactEnter = document.createElement('input');
  const modalBtnSave = document.querySelector(".modal__btn-save")

  modalContactAdd.classList.add('modal__contact-add');
  modalContactContent.classList.add('modal__contact-content');
  modalContactSelect.classList.add('modal__contact-select');
  modalContactEnter.classList.add('modal__contact-enter');

  for (let i = 1; i < 6; i++) {
    const modalOption = document.createElement('option')
    modalOption.id = "option" + i
    modalContactSelect.append(modalOption)

    // исправить modalContactEnter.type

    switch (modalOption.id) {
      case 'option1':
        modalOption.textContent = 'Телефон'
        modalOption.value = "Телефон"

        break

      case 'option2':
        modalOption.textContent = "Доп. телефон"
        modalOption.value = "Доп. телефон"

        break

      case 'option3':
        modalOption.textContent = "Email"
        modalOption.value = "Email"
        break

      case 'option4':
        modalOption.textContent = "Vk"
        modalOption.value = "Vk"

        break

      case 'option5':
        modalOption.textContent = "Facebook"
        modalOption.value = "Facebook"

        break
    }

  }

  // при изменении значения в селекте, меняем тип данных которые вводим в импут

  modalContactSelect.addEventListener('change', function () {
    this.dataset.type = this.value
    console.log(this.value);
    console.log(this.dataset.type);

    if (this.value == "Доп. телефон" || this.value === "Телефон") modalContactEnter.type = "number"
    if (this.value == "Email") modalContactEnter.type = "email"
    if (this.value == "Vk" || this.value == "Facebook") modalContactEnter.type = "text"
  })

  const modalContactAddArr = document.querySelectorAll(".modal__contact-add")



  // появление крестика после введения контакта в импут


  modalContactEnter.addEventListener('blur', function buttonCencelAdd() {

    // const select = document.querySelector('select')
    // const enter = document.querySelector('input')
    // const contact = new Contact(select.value, enter.value)
    // contactsArr.push(contact)

    const modalContactButton = document.createElement('button')
    modalContactButton.classList.add("modal__contact-button")
    modalContactButton.dataset.tippyContent = "Удалить контакт"
    modalContactAdd.append(modalContactButton)
    modalContactButton.addEventListener('click', () => modalContactAdd.remove())





    modalContactEnter.removeEventListener('blur', buttonCencelAdd)
  })



  // сделаем ограничение на количество контактов(не более 10)

  if (modalContactAddArr.length > 8) {
    document.querySelector(".modal__error").textContent = "Нельзя ввести более 10 контактов"
    modalContactText.innerHTML = " "
    modalContactText.id = "grey"
  }

  // сохранение данных контакта в виде объекта

    const contact = new Contact()


  //   modalBtnSave.addEventListener('submit', async function(){

  //     modalContactAddArr.forEach(function(elem){
  //       let select= elem.querySelector('select')
  // let input= elem.querySelector('input')
  // const contact = new Contact(select.value, input.value)
  //       contactsArr.push(contact)
  //       console.log(elem)
  //       console.log(select.value)
  //       console.log(input.value)
  //     })

  //     let response = await fetch(SERVER_URL + '/api/clients/' + client.id, {
  //           method: "PATCH",
  //           body: JSON.stringify({
  //         contacts:  contactsArr
  //           }),
  //           headers: { 'Content-Type': 'aplication/json' },
  //         })

  //         //  получаем ответ в виде массива от сервера
  //         let data = await response.json()
  //         console.log(data)
  //   })




  //   document.querySelectorAll('.modal__title-id').addEventListener('click', function(){
  //     modalContactAddArr.forEach(function(elem){
  //       let select= elem.querySelector('select')
  // let input= elem.querySelector('input')
  // const contact = new Contact(select.value, input.value)
  //       contactsArr.push(contact)
  //       console.log(elem)
  //       console.log(select.value)
  //       console.log(input.value)
  //     })
  //   })



  modalContactAddArr.forEach(function(elem){
    let select= elem.querySelector('select')
let input= elem.querySelector('input')
const contact = new Contact(select.value, input.value)
    contactsArr.push(contact)
    console.log(elem)
    console.log(select.value)
    console.log(input.value)
  })


  // присвоить каждому котакту тип контакта


  modalContact.append(modalContactAdd)
  modalContactAdd.append(modalContactContent)
  modalContactContent.append(modalContactSelect)
  modalContactAdd.append(modalContactEnter)

  // return contactsArr
}

console.log(createAddContact())



window.createAddContact()
