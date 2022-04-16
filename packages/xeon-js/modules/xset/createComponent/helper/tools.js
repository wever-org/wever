

export const isClass = (func) => {
      var _isClass = false;
      
      if (typeof func !== "function") {
            return false;
      }
      
      if (/^\s*class\s+/.test(func.toString())) {
            _isClass = true;
      }

      return _isClass;

}