// import EditForm from './EditForm';
// import DeleteForm from './DeleteForm';
import createRequest from '../api/request';

export default class HelpDeskWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.productList = [];
  }

  static get ctrlId() {
    return {
      widget: 'help-desk-widget',
      add: 'button-add',
      tickets: 'tickets',
      ticket: 'ticket',
      status: 'button-status',
      name: 'name',
      description: 'description',
      created: 'created',
      edit: 'button-edit',
      delete: 'button-delete',
    };
  }

  static get markup() {
    return `
      <div class="header">
        <button class="help-desk-button" data-id="${this.ctrlId.add}">Добавить тикет</button>
      </div>
      <div data-id="${this.ctrlId.tickets}">
      </div>
    `;
  }

  static get widgetSelector() {
    return `[data-widget=${this.ctrlId.widget}]`;
  }

  static get addSelector() {
    return `[data-id=${this.ctrlId.add}]`;
  }

  static get ticketsSelector() {
    return `[data-id=${this.ctrlId.tickets}]`;
  }

  static get ticketSelector() {
    return `[data-id=${this.ctrlId.ticket}]`;
  }

  static get statusSelector() {
    return `[data-id=${this.ctrlId.status}]`;
  }

  static get nameSelector() {
    return `[data-id=${this.ctrlId.name}]`;
  }

  static get descriptionSelector() {
    return `[data-id=${this.ctrlId.description}]`;
  }

  static get createdSelector() {
    return `[data-id=${this.ctrlId.created}]`;
  }

  static get editSelector() {
    return `[data-id=${this.ctrlId.edit}]`;
  }

  static get deleteSelector() {
    return `[data-id=${this.ctrlId.delete}]`;
  }

  bindToDOM() {
    this.widget = document.createElement('div');
    this.widget.dataset.widget = this.constructor.ctrlId.widget;
    this.widget.innerHTML = this.constructor.markup;
    this.parentEl.appendChild(this.widget);

    this.addButton = this.widget.querySelector(this.constructor.addSelector);
    this.tickets = this.widget.querySelector(this.constructor.ticketsSelector);

    // this.editForm = new EditForm(this);
    // this.editForm.bindToDOM();
    // this.deleteForm = new DeleteForm(this);
    // this.deleteForm.bindToDOM();

    //    this.addButton.addEventListener('click', this.onAddButtonClick.bind(this));
    //    this.listContainer.addEventListener('click', this.onListContainerClick.bind(this));

    createRequest({
      data: {
        method: 'allTickets',
      },
      responseType: 'json',
      method: 'GET',
      callback: this.redraw.bind(this),
    });
  }

  onAddButtonClick() {
    this.editForm.updateProduct();
  }

  onListContainerClick(event) {
    const { index } = event.target.closest('tr').dataset;

    if (event.target.dataset.id === this.constructor.ctrlId.edit) {
      this.editForm.updateProduct(index);
    } else if (event.target.dataset.id === this.constructor.ctrlId.delete) {
      this.deleteForm.deleteProduct(index);
    }
  }

  redraw(response) {
    this.tickets.innerHTML = response.reduce((str, {
      id, status, name, created,
    }) => `
      ${str}
      <div data-id="${this.constructor.ctrlId.ticket}" data-index="${id}">
        <button class="help-desk-ticket-button" data-id="this.constructor.ctrlId.status">
          ${status ? '&#x2713;' : '&#x00A0;'}
        </button>
        <div class="text">
          <p data-id="this.constructor.ctrlId.name">
            ${name}
          </p>
        </div>
        <p data-id="this.constructor.ctrlId.created">
          ${this.constructor.dateToString(created)}
        </p>
        <button class="help-desk-ticket-button" data-id="this.constructor.ctrlId.edit">&#x270E;</button>
        <button class="help-desk-ticket-button" data-id="this.constructor.ctrlId.delete">&#x2716;</button>
      </div>
    `, '');
  }

  static dateToString(timestamp) {
    const date = new Date(timestamp);

    const result = `0${date.getDate()
    }.0${date.getMonth() + 1
    }.0${date.getFullYear() % 100
    } 0${date.getHours()
    }:0${date.getMinutes()}`;

    return result.replace(/\d(\d{2})/g, '$1');
  }
}
