function isElement(obj) {
      try {
            //Using W3 DOM2 (works for FF, Opera and Chrome)
            return obj instanceof HTMLElement;
      }
      catch (e) {
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have (works on IE7)
            return (typeof obj === "object") &&
                  (obj.nodeType === 1) && (typeof obj.style === "object") &&
                  (typeof obj.ownerDocument === "object");
      }
}

function _typeof(e, ...queries) {
      var matches = {};
      var match = typeof e;

      queries.forEach(query => {
            // query = query.toLowerCase();

            if (typeof e === query) {
                  matches[query] = true;
            } else {
                  matches[query] = false;
            }

            if (query.toLowerCase() === "array" && typeof e === "object" && Array.isArray(e)) {
                  matches[query] = true;
            }

            if (query.toLowerCase() === "class" && typeof e === "function" && /^\s*class\s+/.test(e.toString())) {
                  matches[query] = true;
            }

            if (query.toLowerCase() === "htmlelement" && typeof e === "object" && isElement(e)) {
                  matches[query] = true;
            }
      });

      var allTrue = true;
      Object.entries(matches).forEach(([key, value]) => {
            if (value === false) allTrue = false;
      });

      var allFalse = true;
      Object.entries(matches).forEach(([key, value]) => {
            if (value === true) allFalse = false;
      });

      return [match, matches, allTrue, allFalse];
}

export default _typeof;