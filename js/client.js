
export default class Client {

  constructor (surname, name, lastname){
    this.surname = surname
    this.name = name
    this.lastname = lastname
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }


}
