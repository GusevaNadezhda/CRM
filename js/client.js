
// export default

// создадим массив куда будем добавлять наших клиетов

let listClients = []

 // данные клиента мы получаем от сервера, запишем его в константу (при смене сервера также удобно будет поменять его только в одном месте)
 const SERVER_URL = 'http://localhost:3000'


//  функция получения массива клиентов с сервера

async function serverGetClients(){
  let response = await fetch (SERVER_URL + '/api/clients',{
    method:"GET",
    headers: {'Content-Type': 'aplication/json'},
   })

  //  получаем ответ в виде массива от сервера
  let data = await response.json()
  return data
}

// полученный массив запишем в переменную

let serverData = await serverGetClients()

// назначаем проверку если serverData не пустой, тогда массив listClients будет равен массиву serverData

if(serverData){
  serverData.forEach(function (elem){
    listClients.push(new Client(elem.id, elem.surname, elem.name, elem.lastName, elem.createdAt, elem.updatedAt))
  })

}

 // задаем функцию добавления нового клиента на сервер

 async function serverAddClient(obj) {
  // делаем добавление на сервер
   let response = await fetch (SERVER_URL + '/api/clients',{
    method:"POST",
    headers: {'Content-Type': 'aplication/json'},
    body:JSON.stringify()
   })

  //  получаем ответ от сервера
  let data = await response.json(obj)
  return data
 }

// и функцию удаления клиента с сервера по id

async function serverDeleteClient(id){

  let response = await fetch (SERVER_URL + '/api/clients' + id,{
    method:"DELETE",
   })

  let data = await response.json()
  return data
}



class Client {

 // ID клиента, заполняется сервером автоматически, после создания нельзя изменить
  get id(){

  }

   // * обязательное поле, имя клиента  и фамилия, отчество необязательно
  constructor (surname, name, lastName){
    this.surname = surname
    this.name = name
    this.lastName = lastName
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }

// дата и время создания клиента, заполняется сервером автоматически, после создания нельзя изменить
  get createdAt(){

  }
// дата и время изменения клиента, заполняется сервером автоматически при изменении клиента
  get updatedAt(){

  }



    // контакты - необязательное поле, массив контактов
    // каждый объект в массиве (если он передан) должен содержать непустые свойства type и value
    contacts = [
      {
        type: 'Телефон',
        value: '+71234567890'
      },
      {
        type: 'Email',
        value: 'abc@xyz.com'
      },
      {
        type: 'Facebook',
        value: 'https://facebook.com/vasiliy-pupkin-the-best'
      }
    ]
  }
