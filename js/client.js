// создадим класс для клиента
export class Client {

  constructor(id, surname, name, lastName, createdAt, updatedAt, contacts) {

    this.id = id
    this.surname = surname
    this.name = name
    this.lastName = lastName
    this.createdAt = changeDate(createdAt)
    this.updatedAt = changeDate(updatedAt)
    this.contacts = contacts

    function changeDate(changeDate) {
      const changeDateArr = changeDate.split("T")
      const date = changeDateArr[0].split('-').reverse().join('.');
      const time = changeDateArr[1].split(':')[0] + ':' + changeDateArr[1].split(':')[1];
      return {
        date: date,
        time: time
      }
    }
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastName
  }

}














