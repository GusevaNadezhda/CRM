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
})

document.querySelector("#modal-close").addEventListener('click', function(){
  document.querySelector("#modal-add-client").classList.remove('open')
})

document.querySelector(".modal__link").addEventListener('click', function(){
  document.querySelector("#modal-add-client").classList.remove('open')
})
