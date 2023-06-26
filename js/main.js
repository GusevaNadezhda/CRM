import { createFormNewClient } from "./modalForm.js"
import { createPreloader } from "./table.js"
import { getNewClient } from "./table.js"
import { Client } from "./client.js"
import { serverGetClients } from "./server.js"
import { sortClient } from "./table.js"

document.querySelector("tbody").append(createPreloader())
document.querySelector('.preloader-block').classList.add('start');
let serverData = await serverGetClients()
const $tbody = document.querySelector("tbody")
const promiseArr = []
// $tbody.prepend(createPreloader())
// document.querySelector("tbody").append(createPreloader())

if (serverData) {


  serverData.forEach(function (elem) {
    const promise = new Promise(function (resolve) {
      const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
      const clientSection = getNewClient(client)
      clientSection.classList.add("hidden")

      window.onload = resolve()

      $tbody.append(clientSection)
    })
    promiseArr.push(promise)

    Promise.all(promiseArr).then(
      function () {
        document.querySelector('.preloader-block').classList.remove('loading');
        $tbody.querySelectorAll('tr').forEach(function (elem) {
          // console.log(elem)
          elem.classList.remove("hidden")
        })
      })
  })


}

console.log(promiseArr)





// сортировка

let copyServerData = [...serverData]
let column;
let columDir = false;
const headers = document.querySelectorAll('th')

// событие сортировки
headers.forEach(element => {
  element.addEventListener('click', function () {
    element.classList.toggle('active')
    column = this.id
    columDir = !columDir
    console.log(column)
    console.log(columDir)
    $tbody.innerHTML = ""
    copyServerData = sortClient(column, columDir, serverData)
    copyServerData.forEach(function (elem) {
      const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
      const clientSection = getNewClient(client)
      // console.log(clientSection)
      $tbody.append(clientSection)
    })
  })
  });



  // window.onload = () => {
  //   alert("удалим прелоадер")
  //         const preloader = document.querySelector('.preloader-block');
  //         preloader.remove();
  //         preloader.classList.add('hidden')

  // if (serverData) {
  //   serverData.forEach(function (elem) {
  //     const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
  //     $tbody.append(getNewClient(client))
  //   })
  // }
  // };

  // const createApp = async () => {
  //   let serverData =  await serverGetClients()


  //   const clients = await getClients();
  //   const clientSection = createClientsSection();
  //   document.body.append(header, clientSection.main);

  //   window.onload = () => {
  //       const preloader = document.querySelector('.preloader');
  //       preloader.remove();

  //       for (const client of clients) {
  //           document.querySelector('.clients__tbody').append(createClientItem(client));
  //       }
  //   };

  // }

  // createApp();

  // document.querySelector("tbody").classList.add("preloader-block")
  // document.querySelector("tbody").prepend(createPreloader())


  // данные клиента мы получаем от сервера, запишем его в константу (при смене сервера также удобно будет поменять его только в одном месте)
  //  const SERVER_URL = 'http://localhost:3000'


  //   // функция получения массива клиентов с сервера

  //  async function serverGetClients() {
  //    let response = await fetch(SERVER_URL + '/api/clients', {
  //      method: "GET",
  //      headers: { 'Content-Type': 'aplication/json' },
  //    })

  //    //  получаем ответ в виде массива от сервера
  //    let data = await response.json()
  //    return data
  //  }


  //  let serverData =  await serverGetClients()


  // назначаем проверку если serverData не пустой, тогда массив listClients будет равен массиву serverData
  //  const $tbody = document.querySelector("tbody")
  //  if (serverData) {
  //    serverData.forEach(function (elem) {
  //      const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
  //      $tbody.append(getNewClient(client))
  //    })
  //  }

  // полученный массив запишем в переменную



  // document.querySelector(".table__body").addEventListener("load", function(){
  //   const preloader = document.querySelector(".preloader__block");
  //   preloader.remove()
  // })

  // serverData.addEventListener('loadend', () => {

  //   const preloader = document.querySelector(".preloader-block");
  //   preloader.innerHTML = '';
  // })

  // serverData.onload = ()=>{
  //   alert("удалим прелоадер")
  // }
  document.querySelector("#btn-add-client").addEventListener('click', function () {
    createFormNewClient()
    document.querySelector('main').append(createFormNewClient().$modalNewClientElement)
  })



















// // Построение таблицы из данных API

// async function renderClientsTable() {
//   let clientsCopy = [...listClients]

//   // удаление студента из списка и с сервера
//   const onDelete = {
//     onDelete({ student, element }) {
//       if (!confirm('Вы уверены?')) {
//         return
//       }
//       element.remove();
//       fetch(`http://localhost:3000/api/students/${student.id}`, {
//         method: 'DELETE',
//       });
//     }
//   }

//   $studentList.innerHTML = ""

//   // отрисовка таблицы после перезагрузки страницы с индикатором загрузки пока таблица не построена

//   const promiseTable = new Promise (function(resolve){
//     serverGetClients()
//     const $tbody = document.querySelector('tbody')
//     const $tbodyTD = document.querySelectorAll('tbody td')
//     const loadImg = document.querySelector('".table__body"')
//     loadImg.classList.add('img-load')
//     $tbodyTD.classList.add('hidden')

//     $tbodyTD.addEventListener('load', function(){

//       resolve()
//     })

//     $tbody.append('loadImg')

//     })

//    Promise.all(promiseTable).then(
//     function(){
//       $tbodyTD.forEach(td => {
//         td.classList.add('show')
//       });
//     }
//    )




//   $studentList.innerHTML = ""

//   for (const student of studentsCopy) {
//     $studentList.append(getNewStudent(student, onDelete))
//   }
// }

// событие добавления нового клиента















