const joystick = new (require('joystick'))(0, 3500, 350);
const bindings = {
  button: {
    0: { 1: "a:press", 0: "a:up" },
    1: { 1: "b:press", 0: "b:up" },
    2: { 1: "x:press", 0: "x:up" },
    3: { 1: "y:press", 0: "y:up" },
    5: { 1: "rb:press", 0: "rb:up" },
    4: { 1: "lb:press", 0: "lb:up" },
    8: { 1: "xbox:press", 0: "xbox:up" },
    6: { 1: "back:press", 0: "back:up" },
    7: { 1: "start:press", 0: "start:up" }
  },
};

const eventMapper = function(event) {
  if (!event.init && button[event.type] && button[event.type][event.number] && button[event.type][event.number][event.value]) {
    return button[event.type][event.number][event.value];
  }

  return false;
}

module.exports = {
  bindCallback: (cb) => {
    joystick.on('button', (event) => {
      const foundEvent = eventMapper(event);

      if(foundEvent) {
        cb(foundEvent);
      }
    });
  }
}
