
import { validateContact } from "./modalForm.js"
// Создадим функцию которая будет добавлять в форму новые контакты

export const createAddContact = function () {

  const modalContact = document.querySelector(".modal__contact")
  const modalContactText = document.querySelector(".modal__contact-text")
  const modalContactAdd = document.createElement('div');
  const modalContactContent = document.createElement('div');
  const modalContactSelect = document.createElement('select');
  const modalContactEnter = document.createElement('input');
  const modalBtnSave = document.querySelector(".modal__btn-save");
  const modalContactButton = document.createElement('button');
  const modalContactTooltip = document.createElement('div');
  const modalContactAddArr = document.querySelectorAll(".modal__contact-add")

  modalContactTooltip.textContent = "Удалить контакт";

  modalContactAdd.classList.add('modal__contact-add');
  modalContactContent.classList.add('modal__contact-content');
  modalContactSelect.classList.add('modal__contact-select');
  modalContactEnter.classList.add('modal__contact-enter');
  modalContactButton.classList.add("modal__contact-button");
  modalContactTooltip.classList.add("tooltip");

  modalContactSelect.addEventListener('click', () => modalContactContent.classList.toggle('active'))

  for (let i = 1; i < 6; i++) {
    const modalOption = document.createElement('option')
    modalOption.id = "option" + i
    modalOption.classList.add('modal__contact-option')
    modalContactSelect.append(modalOption)

    // исправить modalContactEnter.type

    switch (modalOption.id) {
      case 'option1':
        modalOption.textContent = 'Телефон'
        modalOption.value = "Телефон"
        break

      case 'option2':
        modalOption.textContent = "Доп.телефон"
        modalOption.value = "Доп.телефон"
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

  modalContactSelect.dataset.type = "Телефон"

  modalContactSelect.addEventListener('change', function () {
    this.dataset.type = this.value
  })

  // удаление контакта при нажатии на крестик

  modalContactButton.addEventListener('click', (e) => {
    e.preventDefault();
    modalContactAdd.remove();
    modalContactText.classList.remove('hidden')
  })

  // сделаем ограничение на количество контактов(не более 10)

  if (modalContactAddArr.length > 8) {
    const modalError = document.querySelector(".modal__error")
    modalError.classList.add('active')
    modalError.textContent = "Ошибка: Нельзя ввести более 10 контактов"
    modalContactText.classList.add('hidden')
  }

  // если контактов больше 4 уменьшаем top модального окна до 70%, чтоб окно было видно полностью

  if (modalContactAddArr.length >= 4) {
    document.querySelector(".modal-client").style.top = '70%'
  }

  modalContactAdd.append(modalContactContent)
  modalContactContent.append(modalContactSelect)
  modalContactAdd.append(modalContactEnter)
  modalContactAdd.append(modalContactButton)
  modalContactButton.append(modalContactTooltip)
  return {
    modalContactAdd,
    modalContactContent,
    modalContactAddArr,
    modalContactSelect,
    modalContactEnter
  }
}

// Создадим функцию которая будет добавлять tooltip над контактами

export const contactTooltip = function (type, value) {
  const tooltip = document.createElement('div');
  const tooltipType = document.createElement('span');
  const tooltipValue = document.createElement('a');

  tooltip.classList.add('contact__tooltip', 'tooltip');
  tooltipType.classList.add('contact__tooltip-type');
  tooltipValue.classList.add('contact__tooltip-value');

  tooltipType.textContent = type + ': ';
  tooltipValue.textContent = value;

  if (type === "Телефон") {
    tooltipValue.href = `tel:${value.trim()}`;
    tooltipType.style.display = 'none';
    tooltipValue.style.color = 'var(--color-white)';
    tooltipValue.style.textDecoration = 'none';
  } else if (type === "Email") {
    tooltipValue.href = `mailto:${value.trim()}`;
  } else {
    tooltipValue.href = value.trim()
  }

  tooltip.append(tooltipType, tooltipValue)

  return tooltip
}



