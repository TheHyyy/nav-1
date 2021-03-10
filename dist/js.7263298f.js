// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"QvaY":[function(require,module,exports) {
;

(function () {
  var searchInput = document.getElementsByClassName('J_searchInput')[0],
      wdList = document.getElementsByClassName('J_wdList')[0],
      listTpl = document.getElementById('J_listTpl').innerHTML; // 这里通过触发和失去焦点 控制css,再通过css控制如果鼠标在ul中,则还将style设置为block

  searchInput.addEventListener('blur', function () {
    wdList.style.display = 'none';
  });
  searchInput.addEventListener('focus', function () {
    wdList.style.display = 'block';
  });

  function init() {
    bindEvent();
  }

  function bindEvent() {
    searchInput.addEventListener('input', typeInput, false);
  }

  function typeInput() {
    var val = _trimSpace(this.value);

    if (val.length > 0) {
      getDates(val, 'setDatas');
    }
  }

  function getDates(val, cb) {
    var oScript = document.createElement('script');
    oScript.src = "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1422,33222,31253,32974,33284,32938,32846,26350,33199,33239,33266&wd=" + val + "&req=2&csor=4&pwd=123&cb=" + cb;
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
  }

  function renderList(data) {
    var data = data.g,
        len = '',
        list = '';

    try {
      len = data.length;
    } catch (e) {
      len = 0;
    }

    if (len > 0) {
      data.forEach(function (item) {
        list += listTpl.replace(/{{(.*?)}}/gim, function (node, key) {
          return {
            wd: item.q,
            wdLink: item.q
          }[key];
        });
      });
      wdList.innerHTML = list;
    } else {
      wdList.innerHTML = '';
    }
  }

  window.setDatas = function (data) {
    renderList(data);
  };

  function _trimSpace(str) {
    return str.replace(/\s+/, '');
  }

  init();
})();
},{}]},{},["QvaY"], null)
//# sourceMappingURL=js.7263298f.js.map