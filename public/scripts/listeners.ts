class EventListeners {
  private element: HTMLElement;
  private listeners: Map<string, Function>;

  constructor(element: HTMLElement, listeners: Map<string, Function>) {
    this.element = element;
    this.listeners = listeners;

    this.addEventListeners();
  }

  private addEventListeners() {
    const events = Array.from(this.listeners.keys());
    events.forEach((event: any) => {
      // this.element.addEventListener(event, this.listeners.get(event));
    });
  }
}

export default EventListeners;
