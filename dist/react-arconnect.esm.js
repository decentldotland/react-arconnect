import React, { createContext, useContext, useState, useEffect } from 'react';

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

var defaultSignatureParams = {
  name: 'RSA-PSS',
  saltLength: 32
};
var defaultAlgorithmParams = {
  name: 'RSA-PSS',
  hash: 'sha256',
  saltLength: 32
};
var ANS_URL = 'https://ans-resolver.herokuapp.com/resolve-as-arpage/';
var ArConnectAllPermissions = ['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'ACCESS_ALL_ADDRESSES', 'SIGN_TRANSACTION', 'ENCRYPT', 'DECRYPT', 'SIGNATURE', 'ACCESS_ARWEAVE_CONFIG', 'DISPATCH'];
var ArconnectContext = /*#__PURE__*/createContext({});
function useArconnect() {
  var useArconnectContext = useContext(ArconnectContext);

  if (useArconnectContext === null) {
    throw new Error('useArconnect() can only be used inside of <ArconnectProvider />, ' + 'please declare it at a higher level.');
  }

  return useArconnectContext;
}
var ArconnectProvider = function ArconnectProvider(props) {
  var _useState = useState(false),
      walletConnected = _useState[0],
      setWalletConnected = _useState[1];

  var _useState2 = useState(''),
      address = _useState2[0],
      setAddress = _useState2[1];

  var _useState3 = useState(),
      ANS = _useState3[0],
      setANS = _useState3[1];

  var _useState4 = useState([]),
      walletPermissions = _useState4[0],
      setWalletPermissions = _useState4[1];

  var arconnectConnect = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(permissions, appInfo, gatewayConfig) {
      var currentPerms, correctPerms;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (window.arweaveWallet) {
                _context.next = 3;
                break;
              }

              throw new Error('No ArConnect wallet detected');

            case 3:
              if (!(permissions.length === 0 || !(permissions != null && permissions.includes('ACCESS_ADDRESS')))) {
                _context.next = 5;
                break;
              }

              throw new Error('ArConnect requires ACCESS_ADDRESS permission to connect');

            case 5:
              _context.next = 7;
              return window.arweaveWallet.getPermissions();

            case 7:
              currentPerms = _context.sent;

              if (!(currentPerms.length === 0)) {
                _context.next = 11;
                break;
              }

              _context.next = 11;
              return window.arweaveWallet.connect(permissions, appInfo, gatewayConfig);

            case 11:
              _context.next = 13;
              return window.arweaveWallet.getPermissions();

            case 13:
              currentPerms = _context.sent;
              correctPerms = permissions.sort().toString() === currentPerms.sort().toString();

              if (correctPerms) {
                _context.next = 21;
                break;
              }

              _context.next = 18;
              return window.arweaveWallet.disconnect();

            case 18:
              if (!(currentPerms.length !== 0)) {
                _context.next = 20;
                break;
              }

              throw new Error('Re-connect with correct permissions');

            case 20:
              return _context.abrupt("return");

            case 21:
              setWalletPermissions(permissions);
              _context.t0 = setAddress;
              _context.next = 25;
              return _getAddress();

            case 25:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1);
              setWalletConnected(true);
              _context.next = 33;
              break;

            case 30:
              _context.prev = 30;
              _context.t2 = _context["catch"](0);
              console.error(_context.t2);

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 30]]);
    }));

    return function arconnectConnect(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var arconnectDisconnect = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return window.arweaveWallet.disconnect();

            case 3:
              setWalletConnected(false);
              setAddress(undefined);
              setWalletPermissions([]);
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }));

    return function arconnectDisconnect() {
      return _ref2.apply(this, arguments);
    };
  }();

  var getPublicKey = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return window.arweaveWallet.getActivePublicKey();

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);
              return _context3.abrupt("return", '');

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 6]]);
    }));

    return function getPublicKey() {
      return _ref3.apply(this, arguments);
    };
  }(); // example of params for signature generation:
  // data: new TextEncoder().encode("Hello world!");
  // signatureParams: defaultSignatureParams


  var createSignature = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, signatureParams) {
      var signature;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return window.arweaveWallet.signature(data, signatureParams);

            case 3:
              signature = _context4.sent;

              if (signature) {
                _context4.next = 6;
                break;
              }

              throw new Error('ArConnect signature generation failed');

            case 6:
              return _context4.abrupt("return", signature);

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);
              return _context4.abrupt("return", undefined);

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 9]]);
    }));

    return function createSignature(_x4, _x5) {
      return _ref4.apply(this, arguments);
    };
  }(); // TODO: NEEDS FURTHER IMPROVEMENT


  var encrypt = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(options, data) {
      var encryptedData;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return window.arweaveWallet.encrypt(data, options);

            case 2:
              encryptedData = _context5.sent;
              return _context5.abrupt("return", encryptedData);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function encrypt(_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }(); // TODO: NEEDS FURTHER IMPROVEMENT


  var decrypt = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data, options) {
      var decryptedData;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return window.arweaveWallet.decrypt(data, options);

            case 2:
              decryptedData = _context6.sent;
              return _context6.abrupt("return", decryptedData);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function decrypt(_x8, _x9) {
      return _ref6.apply(this, arguments);
    };
  }();

  var shortenAddress = function shortenAddress(address, maxLength) {
    if (maxLength === void 0) {
      maxLength = 20;
    }

    // to avoid trimming small names by default
    if (address.length < maxLength) return address;
    return address.substring(0, maxLength / 2) + '...' + address.substring(address.length - maxLength / 2, address.length);
  }; // wallet address change event
  // when the user switches wallets


  var _walletSwitchEvent = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(e) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              setAddress(e.detail.address);

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function _walletSwitchEvent(_x10) {
      return _ref7.apply(this, arguments);
    };
  }();

  var _walletLoadedEvent = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var addr;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _getAddress();

            case 3:
              addr = _context8.sent;
              setAddress(addr); // @ts-ignore

              setANS(res);
              setWalletConnected(true);
              _context8.next = 13;
              break;

            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](0);
              setAddress(undefined);
              setWalletConnected(false);

            case 13:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 9]]);
    }));

    return function _walletLoadedEvent() {
      return _ref8.apply(this, arguments);
    };
  }();

  var _getAddress = function _getAddress() {
    return window.arweaveWallet.getActiveAddress();
  };

  var _fetchANS = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(address) {
      var _ans, _ans2, _ans3, response, ans;

      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;

              if (address) {
                _context9.next = 3;
                break;
              }

              throw new Error('No address detected');

            case 3:
              _context9.next = 5;
              return fetch(ANS_URL + address);

            case 5:
              response = _context9.sent;
              _context9.prev = 6;
              _context9.next = 9;
              return response.json();

            case 9:
              ans = _context9.sent;
              _context9.next = 16;
              break;

            case 12:
              _context9.prev = 12;
              _context9.t0 = _context9["catch"](6);
              console.warn("address " + address + " not found");
              ans = undefined;

            case 16:
              return _context9.abrupt("return", {
                address_color: (_ans = ans) == null ? void 0 : _ans.address_color,
                currentLabel: (_ans2 = ans) == null ? void 0 : _ans2.currentLabel,
                avatar: (_ans3 = ans) == null ? void 0 : _ans3.avatar
              });

            case 19:
              _context9.prev = 19;
              _context9.t1 = _context9["catch"](0);
              console.error(_context9.t1);
              return _context9.abrupt("return", undefined);

            case 23:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 19], [6, 12]]);
    }));

    return function _fetchANS(_x11) {
      return _ref9.apply(this, arguments);
    };
  }();

  useEffect(function () {
    // add ArConnect event listeners
    window.addEventListener('arweaveWalletLoaded', _walletLoadedEvent);
    window.addEventListener('walletSwitch', _walletSwitchEvent);
    return function () {
      // remove ArConnect event listeners
      window.removeEventListener('arweaveWalletLoaded', _walletLoadedEvent);
      window.removeEventListener('walletSwitch', _walletSwitchEvent);
    };
  });
  useEffect(function () {
    var fetchANSData = /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var data;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (address) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return");

              case 2:
                _context10.next = 4;
                return _fetchANS(address);

              case 4:
                data = _context10.sent;
                if (data) setANS(_extends({}, data));

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      return function fetchANSData() {
        return _ref10.apply(this, arguments);
      };
    }();

    fetchANSData();
  }, [address]);
  useEffect(function () {
    var apiInjected = false;

    var loadedEvent = /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var currentPerms, correctPerms, addr;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!address) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return");

              case 2:
                apiInjected = true;
                _context11.prev = 3;
                _context11.next = 6;
                return window.arweaveWallet.getPermissions();

              case 6:
                currentPerms = _context11.sent;
                correctPerms = walletPermissions.sort().toString() == currentPerms.sort().toString();

                if (correctPerms) {
                  _context11.next = 16;
                  break;
                }

                _context11.next = 11;
                return window.arweaveWallet.disconnect();

              case 11:
                if (!(currentPerms.length !== 0)) {
                  _context11.next = 13;
                  break;
                }

                throw new Error('Re-connect with correct permissions.');

              case 13:
                return _context11.abrupt("return");

              case 16:
                setWalletPermissions(currentPerms);

              case 17:
                _context11.next = 19;
                return window.arweaveWallet.getActiveAddress();

              case 19:
                addr = _context11.sent;
                setAddress(addr);

                _fetchANS(addr).then(setANS);

                _context11.next = 26;
                break;

              case 24:
                _context11.prev = 24;
                _context11.t0 = _context11["catch"](3);

              case 26:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[3, 24]]);
      }));

      return function loadedEvent() {
        return _ref11.apply(this, arguments);
      };
    }();

    window.addEventListener('arweaveWalletLoaded', loadedEvent); // double check if arconnect was added

    setTimeout(function () {
      if (apiInjected || !window.arweaveWallet) return;
      loadedEvent();
    }, 1000);
    return function () {
      return window.removeEventListener('arweaveWalletLoaded', loadedEvent);
    };
  }, []);
  return /*#__PURE__*/React.createElement(ArconnectContext.Provider, {
    value: {
      walletPermissions: walletPermissions,
      walletConnected: walletConnected,
      address: address,
      ANS: ANS,
      arconnectConnect: arconnectConnect,
      arconnectDisconnect: arconnectDisconnect,
      getPublicKey: getPublicKey,
      createSignature: createSignature,
      decrypt: decrypt,
      encrypt: encrypt,
      shortenAddress: shortenAddress
    }
  }, props.children);
};

export { ANS_URL, ArConnectAllPermissions, ArconnectContext, ArconnectProvider, defaultAlgorithmParams, defaultSignatureParams, useArconnect };
//# sourceMappingURL=react-arconnect.esm.js.map
