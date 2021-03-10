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
})({"8MgT":[function(require,module,exports) {
var jsonp = function () {
  function _doAjax(opt) {
    var o = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    if (!o) {
      throw new Error('您的浏览器不支持异步发起HTTP请求');
    }

    var opt = opt || {},
        type = (opt.type || 'GET').toUpperCase(),
        async = '' + opt.async === 'false' ? false : true,
        dataType = opt.dataType || 'JSON',
        jsonp = opt.jsonp || 'cb',
        jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date().getTime(),
        url = opt.url,
        data = opt.data || null,
        timeout = opt.timeout || 30000,
        error = opt.error || function () {},
        success = opt.success || function () {},
        complete = opt.complete || function () {},
        t = null;

    if (!url) {
      throw new Error('您没有填写URL');
    }

    if (dataType.toUpperCase() === 'JSONP' && type !== 'GET') {
      throw new Error('如果dataType为JSONP，type请您设置GET或不设置');
    }

    if (dataType.toUpperCase() === 'JSONP') {
      var oScript = document.createElement('script');
      oScript.src = url.indexOf('?') === -1 ? url + '?' + jsonp + '=' + jsonpCallback : url + '&' + jsonp + '=' + jsonpCallback;
      document.body.appendChild(oScript);
      document.body.removeChild(oScript);

      window[jsonpCallback] = function (data) {
        success(data);
      };

      return;
    }

    o.onreadystatechange = function () {
      if (o.readyState === 4) {
        if (o.status >= 200 && o.status < 300 || o.status === 304) {
          switch (dataType.toUpperCase()) {
            case 'JSON':
              success(JSON.parse(o.responseText));
              break;

            case 'TEXT':
              success(o.responseText);
              break;

            case 'XML':
              success(o.responseXML);
              break;

            default:
              success(JSON.parse(o.responseText));
          }
        } else {
          error();
        }

        complete();
        clearTimeout(t);
        t = null;
        o = null;
      }
    };

    o.open(type, url, async);
    type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // o.send(type === 'GET' ? null : formatDatas(data));

    o.send();
    t = setTimeout(function () {
      o.abort();
      clearTimeout(t);
      t = null;
      o = null;
      throw new Error('本次请求已超时，API地址：' + url);
    }, timeout);
  } // function formatDatas(obj) {
  //   var str = '';
  //   for (var key in obj) {
  //     str += key + '=' + obj[key] + '&';
  //   }
  //   return str.replace(/&$/, '');
  // }
  // function randomNum() {
  //   var num = '';
  //   for (var i = 0; i < 20; i++) {
  //     num += Math.floor(Math.random() * 10);
  //   }
  //   return num;
  // }


  return {
    ajax: function ajax(opt) {
      _doAjax(opt);
    },
    post: function post(url, data, dataType, successCB, errorCB, completeCB) {
      _doAjax({
        type: 'POST',
        url: url,
        data: data,
        dataType: dataType,
        success: csuccessCB,
        error: errorCB,
        complete: completeCB
      });
    },
    get: function get(url, dataType, successCB, errorCB, completeCB) {
      _doAjax({
        type: 'GET',
        url: url,
        dataType: dataType,
        success: successCB,
        error: errorCB,
        complete: completeCB
      });
    }
  };
}();
},{}]},{},["8MgT"], null)
//# sourceMappingURL=utils.fb27d1a4.js.map