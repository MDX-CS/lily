import SayHelloWorld from '../Listeners/SayHelloWorld';

export default class EventHandler {
  /**
   * We boot up the service
   *
   */
  constructor(RTM, Events) {
    this.RTM = RTM;
    this.Events = Events;

    // We register all our listeners
    this.registerListeners();

    // Start up the real time messaging channel
    this.RTM.start();
  }


  /**
   * Listen to various events
   *
   */
  listen() {
    for (let event in this.listeners) {
      this.RTM.on(event, (message) => {
        this.listeners[event].forEach((listener) => listener.trigger(message));
      });
    }
  }


  /**
   * Register all event listeners
   *
   */
  registerListeners() {
    this.listeners = new Array();

    // Registering the global array of events and their listeners
    this.listeners[this.Events.MESSAGE] = [
        new SayHelloWorld(this.RTM),
    ];
  }
}
