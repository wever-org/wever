


export const formatQuery = (queryString) => {
      const object = {};

      if (queryString.startsWith("?")) {
            queryString = queryString.substring(1);
      }

      const queryArray = queryString.split("&");

      for (let i = 0; i < queryArray.length; i++) {
            const query = queryArray[i];
            const keyValue = query.split("=");
            const key = keyValue[0];
            var value = decodeURIComponent(keyValue[1]).trim();

            // If value is an empty string, convert it to null
            if (value === "") {
                  value = null;
            }
            // If value is an array, convert it to an array
            else if (value.startsWith("[") && value.endsWith("]")) {
                  value = value.substring(1, value.length - 1).split(",").map(item => item.trim());
            }
            // If value is a boolean, convert it to a boolean
            else if (value === "true") {
                  value = true;
            } else if (value === "false") {
                  value = false;
            }
            // If value is a number, convert it to a number
            else if (!isNaN(value)) {
                  value = Number(value);
            }
            // If value is an object, convert it to an object
            else if (value.startsWith("{") && value.endsWith("}")) {
                  try {
                        value = JSON.parse(value);
                  } catch (err) {
                        value = value;
                  }
            }

            // If the key already exists, make it an array
            if (key in object) {
                  if (Array.isArray(object[key])) {
                        object[key].push(value);
                  } else {
                        object[key] = [object[key], value];
                  }
            } else {
                  object[key] = value;
            }

      }

      return object
}