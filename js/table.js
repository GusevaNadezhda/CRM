<<<<<<< Updated upstream
=======
// создание таблицы с помощью функцию вывода одного клиента в таблицу.
// Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект клиента.

function getNewClient(Client) {
  const $clientTR = document.createElement('tr');
  const $idTD = document.createElement('td');
  const $fioTD = document.createElement('td');
  const $createdAtTD = document.createElement('td');
  const $updatedAtTD = document.createElement('td');
  const $contactTD = document.createElement('td');
  const $actionTD = document.createElement('td');
  const $actionBTN = document.createElement('div');
  const $changeBTN = document.createElement('btn');
  const $deleteBTN = document.createElement('btn');


  $idTD.textContent = Client.id
  $fioTD.textContent = Client.fio
  $createdAtTD.textContent = Client.createdAt
  $updatedAtTD.textContent = Client.updatedAt
  $contactTD.textContent = Client.contact
  $actionTD.textContent = Client.action
  $changeBTN.textContent = 'Изменить'
  $deleteBTN.textContent = 'Удалить'

  $idTD.classList.add('table__body-id')
  $fioTD.classList.add('table__body-fio')
  $createdAtTD.classList.add('table__body-createdat')
  $updatedAtTD.classList.add('table__body-updatedat')
  $changeBTN.classList.add('btn-change')
  $deleteBTN.classList.add('btn-delete')
  $actionBTN.classList.add('btn-group')

  $clientTR.append($idTD)
  $clientTR.append($fioTD)
  $clientTR.append($createdAtTD)
  $clientTR.append($updatedAtTD)
  $clientTR.append($contactTD)
  $clientTR.append($actionTD)
  $actionTD.append($actionBTN)
  $actionBTN.append($changeBTN)
  $actionBTN.append($deleteBTN)

  return $clientTR
}


window.getNewClient()
>>>>>>> Stashed changes
