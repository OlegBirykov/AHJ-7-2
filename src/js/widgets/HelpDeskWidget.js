// import EditForm from './EditForm';
// import DeleteForm from './DeleteForm';

export default class PriceListWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.productList = [];
    this.isActive = true;
  }

  static get ctrlId() {
    return {
      form: 'price-list-form',
      list: 'product-list',
      add: 'command-create',
      edit: 'command-edit',
      delete: 'command-delete',
    };
  }

  static get markup() {
    return `
    `;
  }

  static get listSelector() {
    return `[data-id=${this.ctrlId.list}]`;
  }

  static get addSelector() {
    return `[data-id=${this.ctrlId.add}]`;
  }

  static get editSelector() {
    return `[data-id=${this.ctrlId.edit}]`;
  }

  static get deleteSelector() {
    return `[data-id=${this.ctrlId.delete}]`;
  }

  bindToDOM() {
    this.form = document.createElement('form');
    this.form.className = 'price-list-form';
    this.form.dataset.widget = this.constructor.ctrlId.form;
    // this.form.innerHTML = this.constructor.markup;
    this.parentEl.appendChild(this.form);

    this.addButton = this.form.querySelector(this.constructor.addSelector);
    this.listContainer = this.form.querySelector(this.constructor.listSelector);

    // this.editForm = new EditForm(this);
    // this.editForm.bindToDOM();
    // this.deleteForm = new DeleteForm(this);
    // this.deleteForm.bindToDOM();

    this.addButton.addEventListener('click', this.onAddButtonClick.bind(this));
    this.listContainer.addEventListener('click', this.onListContainerClick.bind(this));

    this.redraw();
  }

  onAddButtonClick() {
    //    const xhr = new XMLHttpRequest();

    //    xhr.open('GET', 'https://ahj-7-1.herokuapp.com?method=allTickets');

    //    xhr.addEventListener('load', () => {
    //      if (xhr.status === 200) {
    //        console.log(xhr.responseText);
    //      } else {
    // TODO: handle other status
    //      }
    //    });
    //    xhr.addEventListener('error', () => {
    // TODO: handle error
    //    });
    //    xhr.send();

    if (!this.isActive) {
      return;
    }
    this.editForm.updateProduct();
  }

  onListContainerClick(event) {
    if (!this.isActive) {
      return;
    }

    const { index } = event.target.closest('tr').dataset;

    if (event.target.dataset.id === this.constructor.ctrlId.edit) {
      this.editForm.updateProduct(index);
    } else if (event.target.dataset.id === this.constructor.ctrlId.delete) {
      this.deleteForm.deleteProduct(index);
    }
  }

  redraw() {
    this.listContainer.innerHTML = this.productList.reduce((str, { name, price }, i) => `
      ${str}
      <tr data-index="${i}">
        <td class="name">${name}</td>
        <td class="price">${price}</td>
        <td class="actions">
          <span class="icon" data-id="${this.constructor.ctrlId.edit}">&#x270E;</span>
          <span class="icon delete" data-id="${this.constructor.ctrlId.delete}">&times;</span>
        </td>
      </tr>
    `, '');
  }
}
