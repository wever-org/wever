

export default function createUUID(id, dev) {
      var _uuid = {};

      function uuidv4() {
            return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c =>
                  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
      }

      function uuidv3() {
            return ([1e7] + 1e3).replace(/[018]/g, c =>
                  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
      }

      id.forEach(_id => {
            _uuid[_id] = `${_id}_${dev ? uuidv3() : uuidv4()}`;
      });

      return _uuid;
}

export function uuidv4() {
      return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c =>
      "V4" + (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
}

export function uuidv3() {
      return ([1e7] + 1e3).replace(/[018]/g, c =>
            "V3" + (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
}