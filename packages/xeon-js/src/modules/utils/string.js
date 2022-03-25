

export function normalizeString(string) {
      if (typeof string === "string") {
            string = string.trim();
      }
}

export function camalizeString(string) {
      const CAMELIZE = /[\-\:]([a-z])/g;
      // return string[1].toUpperCase();
      string = string.replace(CAMELIZE, function (match, group) {
            return group.toUpperCase();
      });
}