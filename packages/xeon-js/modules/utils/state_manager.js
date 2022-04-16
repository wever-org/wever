import autoBind from "./auto-bind";

export default class State {

      constructor(state) {
            autoBind(this);

            this.current_state = state;
            this.old_states = [];
      }

      /**
       * @private
       * @method onChange - On change event.
       * Store all event functions.
       */
      #cb_funcs = [];
      /**
       * @method onChange - On change event listener.
       */
      #changeEventCaller() {
            this.#cb_funcs.forEach((function (func) {

                  /**
                   * @param {Object} current_state - The current state.
                   * @param {Object} this - The class.
                   * @param {Object} old_states - The old states.
                   */
                  func(this.current_state, this, this.old_states);

            }).bind(this));
      }

      get state() {
            return this.current_state;
      }

      set state(value) {
            
            this.old_states.push(this.current_state);
            this.current_state = value;
            this.#changeEventCaller();
      }

      /**
       * On change event.
       * Not Readable.
       */
      set onChange(func) {
            this.#cb_funcs.push(func.bind(this));
      }
      set onchange(func) {
            this.#cb_funcs.push(func.bind(this));
      }

      /**
       * Event Listener.
       */
      on(type, func) {
            if (type === "change") {
                  this.onChange = func;
            }
      }
}

window ? window.State = State : null;









// testing part here below don't see above


const a = new State({
      name: "Arif",
      age: 100000
});
const cb = function (value, state, old_states) {
      console.log("State Changed To: ", value);
      console.log("Old States: ", old_states);
      console.log("State: ", state);
};


a.on("change", cb);
// a.state = {
//       ...a.state,
//       name: "Arif Sardar",
// };
a.state.name = "Arif Sardar";
a.state = {
      name: "Arif",
}
// console.log(a.state);
