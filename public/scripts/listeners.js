
class EventListeners {
    /**
     * @constructor
     * @param {any} element The element to add the listeners
     * @param {Map<string, Function>} listeners The listeners
     */
    constructor(element, listeners) {
        this.element = element
        this.listeners = listeners

        this.addEventListeners()
    }

    addEventListeners() {
        const events = Array.from(this.listeners.keys())
        events.forEach((event) => {
            this.element.addEventListener(event, this.listeners.get(event))
        })
    }
}

export default EventListeners;