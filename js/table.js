import {contactTooltip} from "./contacts.js"
import {createFormEditClient} from "./modalForm.js"
import {createDeleteForm} from "./modalForm.js"
import {serverGetClient} from "./server.js"
import {serverDeleteClient} from "./server.js"


// создание таблицы с помощью функцию вывода одного клиента в таблицу.
// Функция должна вернуть html элемент с информацией и пользователе.У функции один аргумент - объект клиента.

 export const getNewClient = function (client) {

  const $clientTR = document.createElement('tr');
  const $idTD = document.createElement('td');
  const $fioTD = document.createElement('td');
  const $createdAtTD = document.createElement('td');
  const $createDataDIV = document.createElement('div');
  const $createTimeDIV = document.createElement('div');
  const $updatedAtTD = document.createElement('td');
  const $updateDataDIV = document.createElement('div');
  const $updateTimeDIV = document.createElement('div');
  const $contactTD = document.createElement('td');
  const $actionTD = document.createElement('td');
  const $actionBTN = document.createElement('div');
  const $changeBTN = document.createElement('btn');
  const $deleteBTN = document.createElement('btn');

  $idTD.textContent = client.id
  $fioTD.textContent = client.fio
  $createDataDIV.textContent = client.createdAt.date
  $createTimeDIV.textContent = client.createdAt.time
  $updateDataDIV.textContent = client.updatedAt.date
  $updateTimeDIV.textContent = client.updatedAt.time
  $actionTD.textContent = client.action
  $changeBTN.textContent = 'Изменить'
  $deleteBTN.textContent = 'Удалить'

  $idTD.classList.add('table__body-id')
  $fioTD.classList.add('table__body-fio')
  $createdAtTD.classList.add('table__body-createdat')
  $createDataDIV.classList.add('table__body-date')
  $createTimeDIV.classList.add('table__body-time')
  $updatedAtTD.classList.add('table__body-updatedat')
  $updateDataDIV.classList.add('table__body-date')
  $updateTimeDIV.classList.add('table__body-time')
  $contactTD.classList.add('table__body-contacts')
  $changeBTN.classList.add('btn-change')
  $deleteBTN.classList.add('btn-delete')
  $actionBTN.classList.add('btn-group')

// событие открытия модального окна при нажатии на кнопку Изменить, на время получения данных от сервера включается прелоадер
  $changeBTN.addEventListener('click', function () {
    $changeBTN.classList.add('loading')
        $changeBTN.append(createPreloader())
        $changeBTN.querySelector('.preloader-block').classList.add('change', 'loading')

  let promise = new Promise(function(resolve) {
    const data = serverGetClient(client)
    resolve(data)})

    promise.then( data =>  {
      createFormEditClient(data)
        document.querySelector('main').append(createFormEditClient(data).$modalEditClientElement)
        $changeBTN.classList.remove('loading')
        $changeBTN.querySelector('.preloader-block').classList.remove('change', 'loading');
      })
	});

// формирование логики отражения иконок в поле контакты
// создадим две группы для отображения верхней и нижней строчек контактов (максимум по 5 контактов)
  const $contactsGroup1 = document.createElement('div');
  const $contactsGroup2 = document.createElement('div');

  $contactsGroup1.classList.add('contacts__icon-group1')
  $contactsGroup2.classList.add('contacts__icon-group2')

  for (let i = 0; i < client.contacts.length; i++) {
    const $contactICON = document.createElement('div');
    $contactICON.classList.add('contacts-icon');
    $contactICON.dataset.number = i+1
// если количество контактов меньше 5 добавляем в первую группу
    if (i < 5) {
      $contactsGroup1.append($contactICON)
    }
// если контактов больше 5, тогда пятому нонтакту меняем иконку и включаем счетчик контактов. При нажатии на иконку открываются все контакты
// т.е добавляем вторую скрытую группу
    if( $contactICON.dataset.number == 5){
      $contactICON.classList.add("last-icon")
      const iconNamber = document.createElement('div')

      iconNamber.classList.add("contacts__icon-number")

      let count = client.contacts.length - 4;
      iconNamber.textContent = "+" + count;
      $contactsGroup2.classList.add('hidden')

      iconNamber.addEventListener('click', function(){
        $contactICON.classList.remove("last-icon")
        $contactICON.append(contactTooltip(client.contacts[i].type, client.contacts[i].value))
        iconNamber.remove()
        $contactsGroup2.classList.remove('hidden')
      })

$contactICON.append(iconNamber)
    }
// если контактов более или равно 5 добавляем во вторую группу
    if (i >= 5) {
      $contactsGroup2.append($contactICON)
    }

    switch (client.contacts[i].type) {
          case "Телефон":
            $contactICON.classList.add('tel')
            break
          case "Доп.телефон":
            $contactICON.classList.add('tel')
            break
          case "Email":
            $contactICON.classList.add('email')
            break
          case "Vk":
            $contactICON.classList.add('vk')
            break
          case "Facebook":
            $contactICON.classList.add('fb')
            break
        }

        // над кнопками контактов при наведении появляются тултипы с типов и значением контакта.
        // Реализована возможность сразу перейти на набор номера при типе контакта телефон и переходна почту при типе контакта email
  if( !$contactICON.classList.contains("last-icon")) $contactICON.append(contactTooltip(client.contacts[i].type, client.contacts[i].value))
  }

  $contactTD.append($contactsGroup1)
  $contactTD.append($contactsGroup2)

// при нажатии на кнопку удалить, удаляем клиента с сервера и таблицы
  $deleteBTN.addEventListener('click', function () {
    createDeleteForm(client)
    document.querySelector('main').append(createDeleteForm().$modalDeleteElement)
    document.querySelector(".modal__delete-btn").addEventListener('click', function () {
      $clientTR.remove();
      serverDeleteClient(client.id)
    })
  });

  $clientTR.append($idTD)
  $clientTR.append($fioTD)
  $clientTR.append($createdAtTD)
  $clientTR.append($updatedAtTD)
  $clientTR.append($contactTD)
  $clientTR.append($actionTD)
  $createdAtTD.append($createDataDIV)
  $createdAtTD.append($createTimeDIV)
  $updatedAtTD.append($updateDataDIV)
  $updatedAtTD.append($updateTimeDIV)
  $actionTD.append($actionBTN)
  $actionBTN.append($changeBTN)
  $actionBTN.append($deleteBTN)

  return $clientTR
}

// создадим функцию прелоадера

export const createPreloader = function(){
  const preloaderBlock = document.createElement('div')
  const preloader= document.createElement('div')
  const preloaderCircle1 = document.createElement('div')
  const preloaderCircle2 = document.createElement('div')
  const preloaderCircle3 = document.createElement('div')
  const preloaderCircle4 = document.createElement('div')

  preloaderBlock.classList.add("preloader-block")
  preloader.classList.add("lds-ring")

  preloaderBlock.append(preloader)
  preloader.append(preloaderCircle1,
                        preloaderCircle2,
                        preloaderCircle3,
                        preloaderCircle4)

  return preloaderBlock
}


// сортировка таблицы
export function sortClient(prop, dir = false, arr) {
  const clientsCopy = [...arr]

  clientsCopy.forEach(client => {
    if(prop== 'fio') client.fio = client.surname +client.name + client.Lastname
  })

  return clientsCopy.sort(function (clientA, clientB) {
    if (!dir == false ? clientA[prop] < clientB[prop] : clientA[prop] > clientB[prop])
      return -1
  });
}




