// Построение таблицы из данных API

async function renderClientsTable() {
  let clientsCopy = [...listClients]

  // удаление студента из списка и с сервера
  const onDelete = {
    onDelete({ student, element }) {
      if (!confirm('Вы уверены?')) {
        return
      }
      element.remove();
      fetch(`http://localhost:3000/api/students/${student.id}`, {
        method: 'DELETE',
      });
    }
  }

  $studentList.innerHTML = ""

  // отрисовка таблицы после перезагрузки страницы с индикатором загрузки пока таблица не построена

  const promiseTable = new Promise (function(resolve){
    serverGetClients()
    const $tbody = document.querySelector('tbody')
    const $tbodyTD = document.querySelectorAll('tbody td')
    const loadImg = document.createElement('img')
    loadImg.classList.add('img-load')
    $tbodyTD.classList.add('hidden')

    $tbodyTD.addEventListener('load', function(){

      resolve()
    })

    $tbody.append('loadImg')

    })

   Promise.all(promiseTable).then(
    function(){
      $tbodyTD.forEach(td => {
        td.classList.add('show')
      });
    }
   )




  $studentList.innerHTML = ""

  for (const student of studentsCopy) {
    $studentList.append(getNewStudent(student, onDelete))
  }
}

// событие добавления нового клиента

document.querySelector("#btn-add-client").addEventListener('click', function(){
  document.querySelector("#modal-add-client").classList.add('open')
  createFormNewClient()
})

document.querySelector("#modal-close").addEventListener('click', function(){
  document.querySelector("#modal-add-client").classList.remove('open')
})

// добавление контакта при нажатии на кнопку "Добавить контакт"

const modalContactText = document.querySelector(".modal__contact-text")
modalContactText.addEventListener('click',function(){
  if(modalContactText.id != 'grey') createAddContact()
})


function createFormNewClient() {

  const $newClientTITLE = document.querySelector(".modal__title")
  const $saveClientBTN = document.querySelector('.modal__btn-save')
  const $cancelA = document.querySelector('.modal__link')

  const modalInput = document.querySelectorAll(".modal__input")

  modalInput.forEach(elem =>
        elem.value = "")

  $newClientTITLE.textContent = "Новый клиент"
  $newClientTITLE.id = "new-client"

 $saveClientBTN
  const modalError = document.createElement('div')
  modalError.classList.add("modal__error")
  modalError.textContent = ""
  $saveClientBTN.insertAdjacentElement('beforeBegin', modalError)

  $cancelA.textContent = "Отмена"


  document.querySelector(".modal__link").addEventListener('click', function () {
    document.querySelector("#modal-add-client").classList.remove('open')
  })
}






