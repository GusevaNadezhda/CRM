import { createFormNewClient } from "./modalForm.js"
import { createFormEditClient } from "./modalForm.js"
import { createPreloader } from "./table.js"
import { getNewClient } from "./table.js"
import { Client } from "./client.js"
import { serverGetClients } from "./server.js"
import { findClient } from "./server.js"
import { sortClient } from "./table.js"



const createApp = async () => {
// запишем константы которые будут использоваться в нескольких функциях и событиях

const $tbody = document.querySelector("tbody")

// загрузка страницы начинается с появления прелодера до момента передачи данных в таблицу с сервера

window.addEventListener('load', function () {
// появление прелоадера

$tbody.append(createPreloader());
  const preloader = document.querySelector('.preloader-block');
  preloader.classList.add('loading','start');

// используем промис для ожидания ответа от сервера, заполнения таблицы данными полученными с сервера и удаления прелоадера
let promise = new Promise(function(resolve) {
 let serverGetClient = serverGetClients()
  resolve(serverGetClient)})

  promise.then( serverData =>  {
    serverData.forEach(function (elem) {
      const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
      const clientSection = getNewClient(client)
      clientSection.classList.add("hidden")
      $tbody.append(clientSection)
      preloader.classList.remove('loading');
      $tbody.querySelectorAll('tr').forEach(function (elem) {
        elem.classList.remove("hidden")
      })
    })
  })
});

// событие нажатия на кнопку добавить клиента - открывается модальное окно с формой для заполнения данными

document.querySelector("#btn-add-client").addEventListener('click', function () {
  createFormNewClient()
  document.querySelector('main').append(createFormNewClient().$modalNewClientElement)
})

// сортировка
let serverData = await serverGetClients();
let copyServerData = [...serverData]
let column;
let columDir = false;
const headers = document.querySelectorAll('th')

// событие сортировки при нажатии на заголовки в таблице
headers.forEach(element => {
  element.addEventListener('click', function () {
    element.classList.toggle('active')
    column = this.id
    columDir = !columDir
    $tbody.innerHTML = ""
    copyServerData = sortClient(column, columDir, serverData)
    copyServerData.forEach(function (elem) {
      const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
      const clientSection = getNewClient(client)
      $tbody.append(clientSection)
    })
  })
  });

  // фильтрация (поиск)

  // создание списка найденных клиентов
  const createSearchClient = () =>{
    const form = document.querySelector('.header__form');
    const input = document.querySelector('.header__input');
    const inner = document.createElement('div');
    const findList = document.createElement('ul');

    inner.classList.add("header__inner")
    findList.classList.add("header__list", "hidden")
    inner.append(input, findList);
form.append(inner)
  }

  // заполнение списка клиентами которые были найдены. ФИО клиента заполняют в ссылках, при нажатии на которые открывается модальное окно

  const searchClient = (clients) => {
    const findList = document.querySelector('.header__list');
    const input = document.querySelector('.header__input');

    clients.forEach(client => {
      const findItem = document.createElement('li');
      const findLink = document.createElement('a');

      findItem.classList.add('header__item');
      findLink.classList.add('header__link');

      findLink.textContent = ` ${client.surname} ${client.name} ${client.lastName}`
      findLink.href = `#${client.id}`;

      findLink.addEventListener('click', function(){
        createFormEditClient (client)
        document.querySelector('main').append(createFormEditClient(client).$modalEditClientElement)
      })

      findItem.append(findLink);
      findList.append(findItem)
    });

    // отрисовка таблицы после фильтрации только клиентами которые соответствуют поиску

    const rewriteTable = async(str) => {
      copyServerData = await findClient(str);
      const tbody = document.querySelector('.table__body')
      tbody.innerHTML = '';

      copyServerData.forEach(function (elem) {
        const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
        const clientSection = getNewClient(client)
        $tbody.append(clientSection)
      })
    }

// запуск процесса поиска начинается с введения символов в строуку поиска. Делаем задержку в 300 мс, согласно заданию.
    input.addEventListener('input', async ()=> {
      // используем таймер в 300 мс
      setTimeout(() => {
      const value = input.value.trim();
      const founditems = document.querySelectorAll('.header__link');
// если импут не пустой включаем функцию отрисовки таблицы
      if(value !== ''){
        rewriteTable(value);
// находим среди списка клиентов, тех которые соответствуют заданному поиску по символам. Их показываем, остальных скрываем с помощью класса hidden
        founditems.forEach(link =>{
          if(link.innerText.search(value) == -1){
            link.classList.add('hidden');
            link.innerHTML = link.innerText;
          }else{
            link.classList.remove('hidden');
            findList.classList.remove('hidden');
            const str = link.innerText;
            link.innerHTML = insertMark(str, link.innerText.search(value), value.length )
          }
        })
      }else{
        founditems.forEach(link => {
          $tbody.innerHTML = '';
          copyServerData.forEach(function (elem) {
            const client = new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt, elem.contacts)
            const clientSection = getNewClient(client)
            $tbody.append(clientSection)
          })

          link.classList.remove('hidden');
          findList.classList.add('hidden');
          link.innerHTML = link.innerText;

        })
      }
    }, 300);
    })

    // функция для выделения символов в списке клиентов которые совпадают с поисковым запросом
    const insertMark = (str,pos,len) =>
    str.slice(0, pos) + '<mark>' + str.slice(pos, pos+len) + '</mark>' + str.slice(pos+len)
  }


// делаем попытку найти клиентов, в случае ошибки можем отловить ее с помощью catch
  try {
    const clients = await serverGetClients();
    createSearchClient()
    searchClient(clients)
  } catch (error) {
    console.log(error)
  }
}

createApp()





















