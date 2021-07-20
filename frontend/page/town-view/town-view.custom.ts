enum State {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ADD = 'add',
}

export class TownViewElement extends HTMLElement {
  private state: State = State.ADD;
  private name: string | null = null;

  constructor() {
    super();
    this.classList.add('button', 'large', 'location');
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.render();
  }

  static get observedAttributes() {
    return ['state', 'name'];
  }

  stateToClass(state: State): { classname: string; icon: string } {
    switch (state) {
      case State.ACTIVE:
        return { classname: 'location--active', icon: 'wmi-close' };
      case State.ADD:
        return { classname: 'location--add', icon: 'wmi-add' };
      case State.INACTIVE:
        return { classname: 'location--inactive', icon: 'wmi-close' };
    }
  }

  render() {
    this.state = this.getAttribute('state') as State;
    this.classList.remove('location--add', 'location--inactive', 'location--active');
    const { classname, icon } = this.stateToClass(this.state);
    this.classList.add(classname);

    this.name = this.getAttribute('name');

    this.innerHTML = `
    <span>${this.name ?? ''}</span>
    <button type="button">
      <i class="wmi ${icon} large"></i>
    </button>
    `;
  }
}
