function VO(c, v) {
  for (var h = 0; h < v.length; h++) {
    const g = v[h];
    if (typeof g != "string" && !Array.isArray(g)) {
      for (const E in g)
        if (E !== "default" && !(E in c)) {
          const T = Object.getOwnPropertyDescriptor(g, E);
          T && Object.defineProperty(c, E, T.get ? T : {
            enumerable: !0,
            get: () => g[E]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(c, Symbol.toStringTag, { value: "Module" }));
}
function BO(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var lE = { exports: {} }, hf = {}, uE = { exports: {} }, gf = { exports: {} };
gf.exports;
(function(c, v) {
  /**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var h = "18.2.0", g = Symbol.for("react.element"), E = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), H = Symbol.for("react.profiler"), U = Symbol.for("react.provider"), O = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), N = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), ee = Symbol.for("react.lazy"), xe = Symbol.for("react.offscreen"), ie = Symbol.iterator, Ce = "@@iterator";
    function $(s) {
      if (s === null || typeof s != "object")
        return null;
      var m = ie && s[ie] || s[Ce];
      return typeof m == "function" ? m : null;
    }
    var ne = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, be = {
      transition: null
    }, ue = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, Xe = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, _e = {}, jt = null;
    function an(s) {
      jt = s;
    }
    _e.setExtraStackFrame = function(s) {
      jt = s;
    }, _e.getCurrentStack = null, _e.getStackAddendum = function() {
      var s = "";
      jt && (s += jt);
      var m = _e.getCurrentStack;
      return m && (s += m() || ""), s;
    };
    var ct = !1, Je = !1, kn = !1, we = !1, Ve = !1, mt = {
      ReactCurrentDispatcher: ne,
      ReactCurrentBatchConfig: be,
      ReactCurrentOwner: Xe
    };
    mt.ReactDebugCurrentFrame = _e, mt.ReactCurrentActQueue = ue;
    function yt(s) {
      {
        for (var m = arguments.length, _ = new Array(m > 1 ? m - 1 : 0), w = 1; w < m; w++)
          _[w - 1] = arguments[w];
        qt("warn", s, _);
      }
    }
    function Ee(s) {
      {
        for (var m = arguments.length, _ = new Array(m > 1 ? m - 1 : 0), w = 1; w < m; w++)
          _[w - 1] = arguments[w];
        qt("error", s, _);
      }
    }
    function qt(s, m, _) {
      {
        var w = mt.ReactDebugCurrentFrame, V = w.getStackAddendum();
        V !== "" && (m += "%s", _ = _.concat([V]));
        var ve = _.map(function(ae) {
          return String(ae);
        });
        ve.unshift("Warning: " + m), Function.prototype.apply.call(console[s], console, ve);
      }
    }
    var Aa = {};
    function Jn(s, m) {
      {
        var _ = s.constructor, w = _ && (_.displayName || _.name) || "ReactClass", V = w + "." + m;
        if (Aa[V])
          return;
        Ee("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", m, w), Aa[V] = !0;
      }
    }
    var da = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function(s) {
        return !1;
      },
      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function(s, m, _) {
        Jn(s, "forceUpdate");
      },
      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function(s, m, _, w) {
        Jn(s, "replaceState");
      },
      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function(s, m, _, w) {
        Jn(s, "setState");
      }
    }, Ht = Object.assign, Rn = {};
    Object.freeze(Rn);
    function zn(s, m, _) {
      this.props = s, this.context = m, this.refs = Rn, this.updater = _ || da;
    }
    zn.prototype.isReactComponent = {}, zn.prototype.setState = function(s, m) {
      if (typeof s != "object" && typeof s != "function" && s != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, s, m, "setState");
    }, zn.prototype.forceUpdate = function(s) {
      this.updater.enqueueForceUpdate(this, s, "forceUpdate");
    };
    {
      var Na = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, va = function(s, m) {
        Object.defineProperty(zn.prototype, s, {
          get: function() {
            yt("%s(...) is deprecated in plain JavaScript React classes. %s", m[0], m[1]);
          }
        });
      };
      for (var pa in Na)
        Na.hasOwnProperty(pa) && va(pa, Na[pa]);
    }
    function Zn() {
    }
    Zn.prototype = zn.prototype;
    function Gt(s, m, _) {
      this.props = s, this.context = m, this.refs = Rn, this.updater = _ || da;
    }
    var Tn = Gt.prototype = new Zn();
    Tn.constructor = Gt, Ht(Tn, zn.prototype), Tn.isPureReactComponent = !0;
    function jn() {
      var s = {
        current: null
      };
      return Object.seal(s), s;
    }
    var Hn = Array.isArray;
    function Et(s) {
      return Hn(s);
    }
    function rn(s) {
      {
        var m = typeof Symbol == "function" && Symbol.toStringTag, _ = m && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return _;
      }
    }
    function Ft(s) {
      try {
        return Vt(s), !1;
      } catch {
        return !0;
      }
    }
    function Vt(s) {
      return "" + s;
    }
    function Dt(s) {
      if (Ft(s))
        return Ee("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", rn(s)), Vt(s);
    }
    function Fn(s, m, _) {
      var w = s.displayName;
      if (w)
        return w;
      var V = m.displayName || m.name || "";
      return V !== "" ? _ + "(" + V + ")" : _;
    }
    function ea(s) {
      return s.displayName || "Context";
    }
    function xn(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && Ee("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case T:
          return "Fragment";
        case E:
          return "Portal";
        case H:
          return "Profiler";
        case f:
          return "StrictMode";
        case N:
          return "Suspense";
        case P:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case O:
            var m = s;
            return ea(m) + ".Consumer";
          case U:
            var _ = s;
            return ea(_._context) + ".Provider";
          case F:
            return Fn(s, s.render, "ForwardRef");
          case Y:
            var w = s.displayName || null;
            return w !== null ? w : xn(s.type) || "Memo";
          case ee: {
            var V = s, ve = V._payload, ae = V._init;
            try {
              return xn(ae(ve));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ha = Object.prototype.hasOwnProperty, ta = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, hn, na, on;
    on = {};
    function Vn(s) {
      if (ha.call(s, "ref")) {
        var m = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function gt(s) {
      if (ha.call(s, "key")) {
        var m = Object.getOwnPropertyDescriptor(s, "key").get;
        if (m && m.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function aa(s, m) {
      var _ = function() {
        hn || (hn = !0, Ee("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
      };
      _.isReactWarning = !0, Object.defineProperty(s, "key", {
        get: _,
        configurable: !0
      });
    }
    function er(s, m) {
      var _ = function() {
        na || (na = !0, Ee("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", m));
      };
      _.isReactWarning = !0, Object.defineProperty(s, "ref", {
        get: _,
        configurable: !0
      });
    }
    function tr(s) {
      if (typeof s.ref == "string" && Xe.current && s.__self && Xe.current.stateNode !== s.__self) {
        var m = xn(Xe.current.type);
        on[m] || (Ee('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', m, s.ref), on[m] = !0);
      }
    }
    var G = function(s, m, _, w, V, ve, ae) {
      var he = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: s,
        key: m,
        ref: _,
        props: ae,
        // Record the component responsible for creating this element.
        _owner: ve
      };
      return he._store = {}, Object.defineProperty(he._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(he, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: w
      }), Object.defineProperty(he, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: V
      }), Object.freeze && (Object.freeze(he.props), Object.freeze(he)), he;
    };
    function oe(s, m, _) {
      var w, V = {}, ve = null, ae = null, he = null, Ue = null;
      if (m != null) {
        Vn(m) && (ae = m.ref, tr(m)), gt(m) && (Dt(m.key), ve = "" + m.key), he = m.__self === void 0 ? null : m.__self, Ue = m.__source === void 0 ? null : m.__source;
        for (w in m)
          ha.call(m, w) && !ta.hasOwnProperty(w) && (V[w] = m[w]);
      }
      var Ge = arguments.length - 2;
      if (Ge === 1)
        V.children = _;
      else if (Ge > 1) {
        for (var et = Array(Ge), tt = 0; tt < Ge; tt++)
          et[tt] = arguments[tt + 2];
        Object.freeze && Object.freeze(et), V.children = et;
      }
      if (s && s.defaultProps) {
        var ut = s.defaultProps;
        for (w in ut)
          V[w] === void 0 && (V[w] = ut[w]);
      }
      if (ve || ae) {
        var pt = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
        ve && aa(V, pt), ae && er(V, pt);
      }
      return G(s, ve, ae, he, Ue, Xe.current, V);
    }
    function De(s, m) {
      var _ = G(s.type, m, s.ref, s._self, s._source, s._owner, s.props);
      return _;
    }
    function Ie(s, m, _) {
      if (s == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + s + ".");
      var w, V = Ht({}, s.props), ve = s.key, ae = s.ref, he = s._self, Ue = s._source, Ge = s._owner;
      if (m != null) {
        Vn(m) && (ae = m.ref, Ge = Xe.current), gt(m) && (Dt(m.key), ve = "" + m.key);
        var et;
        s.type && s.type.defaultProps && (et = s.type.defaultProps);
        for (w in m)
          ha.call(m, w) && !ta.hasOwnProperty(w) && (m[w] === void 0 && et !== void 0 ? V[w] = et[w] : V[w] = m[w]);
      }
      var tt = arguments.length - 2;
      if (tt === 1)
        V.children = _;
      else if (tt > 1) {
        for (var ut = Array(tt), pt = 0; pt < tt; pt++)
          ut[pt] = arguments[pt + 2];
        V.children = ut;
      }
      return G(s.type, ve, ae, he, Ue, Ge, V);
    }
    function qe(s) {
      return typeof s == "object" && s !== null && s.$$typeof === g;
    }
    var _t = ".", bt = ":";
    function Dn(s) {
      var m = /[=:]/g, _ = {
        "=": "=0",
        ":": "=2"
      }, w = s.replace(m, function(V) {
        return _[V];
      });
      return "$" + w;
    }
    var Ze = !1, Bn = /\/+/g;
    function rt(s) {
      return s.replace(Bn, "$&/");
    }
    function it(s, m) {
      return typeof s == "object" && s !== null && s.key != null ? (Dt(s.key), Dn("" + s.key)) : m.toString(36);
    }
    function ka(s, m, _, w, V) {
      var ve = typeof s;
      (ve === "undefined" || ve === "boolean") && (s = null);
      var ae = !1;
      if (s === null)
        ae = !0;
      else
        switch (ve) {
          case "string":
          case "number":
            ae = !0;
            break;
          case "object":
            switch (s.$$typeof) {
              case g:
              case E:
                ae = !0;
            }
        }
      if (ae) {
        var he = s, Ue = V(he), Ge = w === "" ? _t + it(he, 0) : w;
        if (Et(Ue)) {
          var et = "";
          Ge != null && (et = rt(Ge) + "/"), ka(Ue, m, et, "", function(Mf) {
            return Mf;
          });
        } else
          Ue != null && (qe(Ue) && (Ue.key && (!he || he.key !== Ue.key) && Dt(Ue.key), Ue = De(
            Ue,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            _ + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (Ue.key && (!he || he.key !== Ue.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              rt("" + Ue.key) + "/"
            ) : "") + Ge
          )), m.push(Ue));
        return 1;
      }
      var tt, ut, pt = 0, Pe = w === "" ? _t : w + bt;
      if (Et(s))
        for (var Fr = 0; Fr < s.length; Fr++)
          tt = s[Fr], ut = Pe + it(tt, Fr), pt += ka(tt, m, _, ut, V);
      else {
        var to = $(s);
        if (typeof to == "function") {
          var pl = s;
          to === pl.entries && (Ze || yt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Ze = !0);
          for (var Of = to.call(pl), or, hl = 0; !(or = Of.next()).done; )
            tt = or.value, ut = Pe + it(tt, hl++), pt += ka(tt, m, _, ut, V);
        } else if (ve === "object") {
          var ml = String(s);
          throw new Error("Objects are not valid as a React child (found: " + (ml === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : ml) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return pt;
    }
    function ma(s, m, _) {
      if (s == null)
        return s;
      var w = [], V = 0;
      return ka(s, w, "", "", function(ve) {
        return m.call(_, ve, V++);
      }), w;
    }
    function fi(s) {
      var m = 0;
      return ma(s, function() {
        m++;
      }), m;
    }
    function Wi(s, m, _) {
      ma(s, function() {
        m.apply(this, arguments);
      }, _);
    }
    function el(s) {
      return ma(s, function(m) {
        return m;
      }) || [];
    }
    function di(s) {
      if (!qe(s))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return s;
    }
    function vi(s) {
      var m = {
        $$typeof: O,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: s,
        _currentValue2: s,
        // Used to track how many concurrent renderers this context currently
        // supports within in a single renderer. Such as parallel server rendering.
        _threadCount: 0,
        // These are circular
        Provider: null,
        Consumer: null,
        // Add these to use same hidden class in VM as ServerContext
        _defaultValue: null,
        _globalName: null
      };
      m.Provider = {
        $$typeof: U,
        _context: m
      };
      var _ = !1, w = !1, V = !1;
      {
        var ve = {
          $$typeof: O,
          _context: m
        };
        Object.defineProperties(ve, {
          Provider: {
            get: function() {
              return w || (w = !0, Ee("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), m.Provider;
            },
            set: function(ae) {
              m.Provider = ae;
            }
          },
          _currentValue: {
            get: function() {
              return m._currentValue;
            },
            set: function(ae) {
              m._currentValue = ae;
            }
          },
          _currentValue2: {
            get: function() {
              return m._currentValue2;
            },
            set: function(ae) {
              m._currentValue2 = ae;
            }
          },
          _threadCount: {
            get: function() {
              return m._threadCount;
            },
            set: function(ae) {
              m._threadCount = ae;
            }
          },
          Consumer: {
            get: function() {
              return _ || (_ = !0, Ee("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), m.Consumer;
            }
          },
          displayName: {
            get: function() {
              return m.displayName;
            },
            set: function(ae) {
              V || (yt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ae), V = !0);
            }
          }
        }), m.Consumer = ve;
      }
      return m._currentRenderer = null, m._currentRenderer2 = null, m;
    }
    var nr = -1, Lr = 0, ar = 1, za = 2;
    function ya(s) {
      if (s._status === nr) {
        var m = s._result, _ = m();
        if (_.then(function(ve) {
          if (s._status === Lr || s._status === nr) {
            var ae = s;
            ae._status = ar, ae._result = ve;
          }
        }, function(ve) {
          if (s._status === Lr || s._status === nr) {
            var ae = s;
            ae._status = za, ae._result = ve;
          }
        }), s._status === nr) {
          var w = s;
          w._status = Lr, w._result = _;
        }
      }
      if (s._status === ar) {
        var V = s._result;
        return V === void 0 && Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, V), "default" in V || Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, V), V.default;
      } else
        throw s._result;
    }
    function ja(s) {
      var m = {
        // We use these fields to store the result.
        _status: nr,
        _result: s
      }, _ = {
        $$typeof: ee,
        _payload: m,
        _init: ya
      };
      {
        var w, V;
        Object.defineProperties(_, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return w;
            },
            set: function(ve) {
              Ee("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), w = ve, Object.defineProperty(_, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return V;
            },
            set: function(ve) {
              Ee("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), V = ve, Object.defineProperty(_, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return _;
    }
    function pi(s) {
      s != null && s.$$typeof === Y ? Ee("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof s != "function" ? Ee("forwardRef requires a render function but was given %s.", s === null ? "null" : typeof s) : s.length !== 0 && s.length !== 2 && Ee("forwardRef render functions accept exactly two parameters: props and ref. %s", s.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), s != null && (s.defaultProps != null || s.propTypes != null) && Ee("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var m = {
        $$typeof: F,
        render: s
      };
      {
        var _;
        Object.defineProperty(m, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return _;
          },
          set: function(w) {
            _ = w, !s.name && !s.displayName && (s.displayName = w);
          }
        });
      }
      return m;
    }
    var y;
    y = Symbol.for("react.module.reference");
    function z(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === T || s === H || Ve || s === f || s === N || s === P || we || s === xe || ct || Je || kn || typeof s == "object" && s !== null && (s.$$typeof === ee || s.$$typeof === Y || s.$$typeof === U || s.$$typeof === O || s.$$typeof === F || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === y || s.getModuleId !== void 0));
    }
    function q(s, m) {
      z(s) || Ee("memo: The first argument must be a component. Instead received: %s", s === null ? "null" : typeof s);
      var _ = {
        $$typeof: Y,
        type: s,
        compare: m === void 0 ? null : m
      };
      {
        var w;
        Object.defineProperty(_, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return w;
          },
          set: function(V) {
            w = V, !s.name && !s.displayName && (s.displayName = V);
          }
        });
      }
      return _;
    }
    function Z() {
      var s = ne.current;
      return s === null && Ee(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), s;
    }
    function Me(s) {
      var m = Z();
      if (s._context !== void 0) {
        var _ = s._context;
        _.Consumer === s ? Ee("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : _.Provider === s && Ee("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return m.useContext(s);
    }
    function je(s) {
      var m = Z();
      return m.useState(s);
    }
    function Re(s, m, _) {
      var w = Z();
      return w.useReducer(s, m, _);
    }
    function ce(s) {
      var m = Z();
      return m.useRef(s);
    }
    function wt(s, m) {
      var _ = Z();
      return _.useEffect(s, m);
    }
    function ot(s, m) {
      var _ = Z();
      return _.useInsertionEffect(s, m);
    }
    function lt(s, m) {
      var _ = Z();
      return _.useLayoutEffect(s, m);
    }
    function ln(s, m) {
      var _ = Z();
      return _.useCallback(s, m);
    }
    function Ha(s, m) {
      var _ = Z();
      return _.useMemo(s, m);
    }
    function Qi(s, m, _) {
      var w = Z();
      return w.useImperativeHandle(s, m, _);
    }
    function _n(s, m) {
      {
        var _ = Z();
        return _.useDebugValue(s, m);
      }
    }
    function Tf() {
      var s = Z();
      return s.useTransition();
    }
    function rr(s) {
      var m = Z();
      return m.useDeferredValue(s);
    }
    function Le() {
      var s = Z();
      return s.useId();
    }
    function hi(s, m, _) {
      var w = Z();
      return w.useSyncExternalStore(s, m, _);
    }
    var Ur = 0, tl, nl, al, rl, il, ol, ll;
    function es() {
    }
    es.__reactDisabledLog = !0;
    function xf() {
      {
        if (Ur === 0) {
          tl = console.log, nl = console.info, al = console.warn, rl = console.error, il = console.group, ol = console.groupCollapsed, ll = console.groupEnd;
          var s = {
            configurable: !0,
            enumerable: !0,
            value: es,
            writable: !0
          };
          Object.defineProperties(console, {
            info: s,
            log: s,
            warn: s,
            error: s,
            group: s,
            groupCollapsed: s,
            groupEnd: s
          });
        }
        Ur++;
      }
    }
    function ul() {
      {
        if (Ur--, Ur === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ht({}, s, {
              value: tl
            }),
            info: Ht({}, s, {
              value: nl
            }),
            warn: Ht({}, s, {
              value: al
            }),
            error: Ht({}, s, {
              value: rl
            }),
            group: Ht({}, s, {
              value: il
            }),
            groupCollapsed: Ht({}, s, {
              value: ol
            }),
            groupEnd: Ht({}, s, {
              value: ll
            })
          });
        }
        Ur < 0 && Ee("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mi = mt.ReactCurrentDispatcher, ra;
    function Ar(s, m, _) {
      {
        if (ra === void 0)
          try {
            throw Error();
          } catch (V) {
            var w = V.stack.trim().match(/\n( *(at )?)/);
            ra = w && w[1] || "";
          }
        return `
` + ra + s;
      }
    }
    var Nr = !1, Ki;
    {
      var sl = typeof WeakMap == "function" ? WeakMap : Map;
      Ki = new sl();
    }
    function ts(s, m) {
      if (!s || Nr)
        return "";
      {
        var _ = Ki.get(s);
        if (_ !== void 0)
          return _;
      }
      var w;
      Nr = !0;
      var V = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ve;
      ve = mi.current, mi.current = null, xf();
      try {
        if (m) {
          var ae = function() {
            throw Error();
          };
          if (Object.defineProperty(ae.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ae, []);
            } catch (Pe) {
              w = Pe;
            }
            Reflect.construct(s, [], ae);
          } else {
            try {
              ae.call();
            } catch (Pe) {
              w = Pe;
            }
            s.call(ae.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Pe) {
            w = Pe;
          }
          s();
        }
      } catch (Pe) {
        if (Pe && w && typeof Pe.stack == "string") {
          for (var he = Pe.stack.split(`
`), Ue = w.stack.split(`
`), Ge = he.length - 1, et = Ue.length - 1; Ge >= 1 && et >= 0 && he[Ge] !== Ue[et]; )
            et--;
          for (; Ge >= 1 && et >= 0; Ge--, et--)
            if (he[Ge] !== Ue[et]) {
              if (Ge !== 1 || et !== 1)
                do
                  if (Ge--, et--, et < 0 || he[Ge] !== Ue[et]) {
                    var tt = `
` + he[Ge].replace(" at new ", " at ");
                    return s.displayName && tt.includes("<anonymous>") && (tt = tt.replace("<anonymous>", s.displayName)), typeof s == "function" && Ki.set(s, tt), tt;
                  }
                while (Ge >= 1 && et >= 0);
              break;
            }
        }
      } finally {
        Nr = !1, mi.current = ve, ul(), Error.prepareStackTrace = V;
      }
      var ut = s ? s.displayName || s.name : "", pt = ut ? Ar(ut) : "";
      return typeof s == "function" && Ki.set(s, pt), pt;
    }
    function cl(s, m, _) {
      return ts(s, !1);
    }
    function Df(s) {
      var m = s.prototype;
      return !!(m && m.isReactComponent);
    }
    function kr(s, m, _) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return ts(s, Df(s));
      if (typeof s == "string")
        return Ar(s);
      switch (s) {
        case N:
          return Ar("Suspense");
        case P:
          return Ar("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case F:
            return cl(s.render);
          case Y:
            return kr(s.type, m, _);
          case ee: {
            var w = s, V = w._payload, ve = w._init;
            try {
              return kr(ve(V), m, _);
            } catch {
            }
          }
        }
      return "";
    }
    var ns = {}, fl = mt.ReactDebugCurrentFrame;
    function Xi(s) {
      if (s) {
        var m = s._owner, _ = kr(s.type, s._source, m ? m.type : null);
        fl.setExtraStackFrame(_);
      } else
        fl.setExtraStackFrame(null);
    }
    function as(s, m, _, w, V) {
      {
        var ve = Function.call.bind(ha);
        for (var ae in s)
          if (ve(s, ae)) {
            var he = void 0;
            try {
              if (typeof s[ae] != "function") {
                var Ue = Error((w || "React class") + ": " + _ + " type `" + ae + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[ae] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ue.name = "Invariant Violation", Ue;
              }
              he = s[ae](m, ae, w, _, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Ge) {
              he = Ge;
            }
            he && !(he instanceof Error) && (Xi(V), Ee("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", w || "React class", _, ae, typeof he), Xi(null)), he instanceof Error && !(he.message in ns) && (ns[he.message] = !0, Xi(V), Ee("Failed %s type: %s", _, he.message), Xi(null));
          }
      }
    }
    function Be(s) {
      if (s) {
        var m = s._owner, _ = kr(s.type, s._source, m ? m.type : null);
        an(_);
      } else
        an(null);
    }
    var dl;
    dl = !1;
    function vl() {
      if (Xe.current) {
        var s = xn(Xe.current.type);
        if (s)
          return `

Check the render method of \`` + s + "`.";
      }
      return "";
    }
    function Se(s) {
      if (s !== void 0) {
        var m = s.fileName.replace(/^.*[\\\/]/, ""), _ = s.lineNumber;
        return `

Check your code at ` + m + ":" + _ + ".";
      }
      return "";
    }
    function rs(s) {
      return s != null ? Se(s.__source) : "";
    }
    var un = {};
    function yi(s) {
      var m = vl();
      if (!m) {
        var _ = typeof s == "string" ? s : s.displayName || s.name;
        _ && (m = `

Check the top-level render call using <` + _ + ">.");
      }
      return m;
    }
    function zr(s, m) {
      if (!(!s._store || s._store.validated || s.key != null)) {
        s._store.validated = !0;
        var _ = yi(m);
        if (!un[_]) {
          un[_] = !0;
          var w = "";
          s && s._owner && s._owner !== Xe.current && (w = " It was passed a child from " + xn(s._owner.type) + "."), Be(s), Ee('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', _, w), Be(null);
        }
      }
    }
    function is(s, m) {
      if (typeof s == "object") {
        if (Et(s))
          for (var _ = 0; _ < s.length; _++) {
            var w = s[_];
            qe(w) && zr(w, m);
          }
        else if (qe(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var V = $(s);
          if (typeof V == "function" && V !== s.entries)
            for (var ve = V.call(s), ae; !(ae = ve.next()).done; )
              qe(ae.value) && zr(ae.value, m);
        }
      }
    }
    function Bt(s) {
      {
        var m = s.type;
        if (m == null || typeof m == "string")
          return;
        var _;
        if (typeof m == "function")
          _ = m.propTypes;
        else if (typeof m == "object" && (m.$$typeof === F || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        m.$$typeof === Y))
          _ = m.propTypes;
        else
          return;
        if (_) {
          var w = xn(m);
          as(_, s.props, "prop", w, s);
        } else if (m.PropTypes !== void 0 && !dl) {
          dl = !0;
          var V = xn(m);
          Ee("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", V || "Unknown");
        }
        typeof m.getDefaultProps == "function" && !m.getDefaultProps.isReactClassApproved && Ee("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ft(s) {
      {
        for (var m = Object.keys(s.props), _ = 0; _ < m.length; _++) {
          var w = m[_];
          if (w !== "children" && w !== "key") {
            Be(s), Ee("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", w), Be(null);
            break;
          }
        }
        s.ref !== null && (Be(s), Ee("Invalid attribute `ref` supplied to `React.Fragment`."), Be(null));
      }
    }
    function os(s, m, _) {
      var w = z(s);
      if (!w) {
        var V = "";
        (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (V += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var ve = rs(m);
        ve ? V += ve : V += vl();
        var ae;
        s === null ? ae = "null" : Et(s) ? ae = "array" : s !== void 0 && s.$$typeof === g ? (ae = "<" + (xn(s.type) || "Unknown") + " />", V = " Did you accidentally export a JSX literal instead of a component?") : ae = typeof s, Ee("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ae, V);
      }
      var he = oe.apply(this, arguments);
      if (he == null)
        return he;
      if (w)
        for (var Ue = 2; Ue < arguments.length; Ue++)
          is(arguments[Ue], s);
      return s === T ? ft(he) : Bt(he), he;
    }
    var Pn = !1;
    function wn(s) {
      var m = os.bind(null, s);
      return m.type = s, Pn || (Pn = !0, yt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(m, "type", {
        enumerable: !1,
        get: function() {
          return yt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: s
          }), s;
        }
      }), m;
    }
    function Fa(s, m, _) {
      for (var w = Ie.apply(this, arguments), V = 2; V < arguments.length; V++)
        is(arguments[V], w.type);
      return Bt(w), w;
    }
    function _f(s, m) {
      var _ = be.transition;
      be.transition = {};
      var w = be.transition;
      be.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        s();
      } finally {
        if (be.transition = _, _ === null && w._updatedFibers) {
          var V = w._updatedFibers.size;
          V > 10 && yt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), w._updatedFibers.clear();
        }
      }
    }
    var Ji = !1, gi = null;
    function ls(s) {
      if (gi === null)
        try {
          var m = ("require" + Math.random()).slice(0, 7), _ = c && c[m];
          gi = _.call(c, "timers").setImmediate;
        } catch {
          gi = function(V) {
            Ji === !1 && (Ji = !0, typeof MessageChannel > "u" && Ee("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var ve = new MessageChannel();
            ve.port1.onmessage = V, ve.port2.postMessage(void 0);
          };
        }
      return gi(s);
    }
    var jr = 0, us = !1;
    function wf(s) {
      {
        var m = jr;
        jr++, ue.current === null && (ue.current = []);
        var _ = ue.isBatchingLegacy, w;
        try {
          if (ue.isBatchingLegacy = !0, w = s(), !_ && ue.didScheduleLegacyUpdate) {
            var V = ue.current;
            V !== null && (ue.didScheduleLegacyUpdate = !1, eo(V));
          }
        } catch (ut) {
          throw ir(m), ut;
        } finally {
          ue.isBatchingLegacy = _;
        }
        if (w !== null && typeof w == "object" && typeof w.then == "function") {
          var ve = w, ae = !1, he = {
            then: function(ut, pt) {
              ae = !0, ve.then(function(Pe) {
                ir(m), jr === 0 ? Zi(Pe, ut, pt) : ut(Pe);
              }, function(Pe) {
                ir(m), pt(Pe);
              });
            }
          };
          return !us && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            ae || (us = !0, Ee("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), he;
        } else {
          var Ue = w;
          if (ir(m), jr === 0) {
            var Ge = ue.current;
            Ge !== null && (eo(Ge), ue.current = null);
            var et = {
              then: function(ut, pt) {
                ue.current === null ? (ue.current = [], Zi(Ue, ut, pt)) : ut(Ue);
              }
            };
            return et;
          } else {
            var tt = {
              then: function(ut, pt) {
                ut(Ue);
              }
            };
            return tt;
          }
        }
      }
    }
    function ir(s) {
      s !== jr - 1 && Ee("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), jr = s;
    }
    function Zi(s, m, _) {
      {
        var w = ue.current;
        if (w !== null)
          try {
            eo(w), ls(function() {
              w.length === 0 ? (ue.current = null, m(s)) : Zi(s, m, _);
            });
          } catch (V) {
            _(V);
          }
        else
          m(s);
      }
    }
    var Hr = !1;
    function eo(s) {
      if (!Hr) {
        Hr = !0;
        var m = 0;
        try {
          for (; m < s.length; m++) {
            var _ = s[m];
            do
              _ = _(!0);
            while (_ !== null);
          }
          s.length = 0;
        } catch (w) {
          throw s = s.slice(m + 1), w;
        } finally {
          Hr = !1;
        }
      }
    }
    var ss = os, cs = Fa, fs = wn, ds = {
      map: ma,
      forEach: Wi,
      count: fi,
      toArray: el,
      only: di
    };
    v.Children = ds, v.Component = zn, v.Fragment = T, v.Profiler = H, v.PureComponent = Gt, v.StrictMode = f, v.Suspense = N, v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = mt, v.cloneElement = cs, v.createContext = vi, v.createElement = ss, v.createFactory = fs, v.createRef = jn, v.forwardRef = pi, v.isValidElement = qe, v.lazy = ja, v.memo = q, v.startTransition = _f, v.unstable_act = wf, v.useCallback = ln, v.useContext = Me, v.useDebugValue = _n, v.useDeferredValue = rr, v.useEffect = wt, v.useId = Le, v.useImperativeHandle = Qi, v.useInsertionEffect = ot, v.useLayoutEffect = lt, v.useMemo = Ha, v.useReducer = Re, v.useRef = ce, v.useState = je, v.useSyncExternalStore = hi, v.useTransition = Tf, v.version = h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(gf, gf.exports);
var PO = gf.exports;
uE.exports = PO;
var B = uE.exports;
const sE = /* @__PURE__ */ BO(B), $O = /* @__PURE__ */ VO({
  __proto__: null,
  default: sE
}, [B]);
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function() {
  var c = B, v = Symbol.for("react.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), H = Symbol.for("react.context"), U = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), ee = Symbol.iterator, xe = "@@iterator";
  function ie(y) {
    if (y === null || typeof y != "object")
      return null;
    var z = ee && y[ee] || y[xe];
    return typeof z == "function" ? z : null;
  }
  var Ce = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function $(y) {
    {
      for (var z = arguments.length, q = new Array(z > 1 ? z - 1 : 0), Z = 1; Z < z; Z++)
        q[Z - 1] = arguments[Z];
      ne("error", y, q);
    }
  }
  function ne(y, z, q) {
    {
      var Z = Ce.ReactDebugCurrentFrame, Me = Z.getStackAddendum();
      Me !== "" && (z += "%s", q = q.concat([Me]));
      var je = q.map(function(Re) {
        return String(Re);
      });
      je.unshift("Warning: " + z), Function.prototype.apply.call(console[y], console, je);
    }
  }
  var be = !1, ue = !1, Xe = !1, _e = !1, jt = !1, an;
  an = Symbol.for("react.module.reference");
  function ct(y) {
    return !!(typeof y == "string" || typeof y == "function" || y === g || y === T || jt || y === E || y === O || y === F || _e || y === Y || be || ue || Xe || typeof y == "object" && y !== null && (y.$$typeof === P || y.$$typeof === N || y.$$typeof === f || y.$$typeof === H || y.$$typeof === U || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    y.$$typeof === an || y.getModuleId !== void 0));
  }
  function Je(y, z, q) {
    var Z = y.displayName;
    if (Z)
      return Z;
    var Me = z.displayName || z.name || "";
    return Me !== "" ? q + "(" + Me + ")" : q;
  }
  function kn(y) {
    return y.displayName || "Context";
  }
  function we(y) {
    if (y == null)
      return null;
    if (typeof y.tag == "number" && $("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof y == "function")
      return y.displayName || y.name || null;
    if (typeof y == "string")
      return y;
    switch (y) {
      case g:
        return "Fragment";
      case h:
        return "Portal";
      case T:
        return "Profiler";
      case E:
        return "StrictMode";
      case O:
        return "Suspense";
      case F:
        return "SuspenseList";
    }
    if (typeof y == "object")
      switch (y.$$typeof) {
        case H:
          var z = y;
          return kn(z) + ".Consumer";
        case f:
          var q = y;
          return kn(q._context) + ".Provider";
        case U:
          return Je(y, y.render, "ForwardRef");
        case N:
          var Z = y.displayName || null;
          return Z !== null ? Z : we(y.type) || "Memo";
        case P: {
          var Me = y, je = Me._payload, Re = Me._init;
          try {
            return we(Re(je));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var Ve = Object.assign, mt = 0, yt, Ee, qt, Aa, Jn, da, Ht;
  function Rn() {
  }
  Rn.__reactDisabledLog = !0;
  function zn() {
    {
      if (mt === 0) {
        yt = console.log, Ee = console.info, qt = console.warn, Aa = console.error, Jn = console.group, da = console.groupCollapsed, Ht = console.groupEnd;
        var y = {
          configurable: !0,
          enumerable: !0,
          value: Rn,
          writable: !0
        };
        Object.defineProperties(console, {
          info: y,
          log: y,
          warn: y,
          error: y,
          group: y,
          groupCollapsed: y,
          groupEnd: y
        });
      }
      mt++;
    }
  }
  function Na() {
    {
      if (mt--, mt === 0) {
        var y = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Ve({}, y, {
            value: yt
          }),
          info: Ve({}, y, {
            value: Ee
          }),
          warn: Ve({}, y, {
            value: qt
          }),
          error: Ve({}, y, {
            value: Aa
          }),
          group: Ve({}, y, {
            value: Jn
          }),
          groupCollapsed: Ve({}, y, {
            value: da
          }),
          groupEnd: Ve({}, y, {
            value: Ht
          })
        });
      }
      mt < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var va = Ce.ReactCurrentDispatcher, pa;
  function Zn(y, z, q) {
    {
      if (pa === void 0)
        try {
          throw Error();
        } catch (Me) {
          var Z = Me.stack.trim().match(/\n( *(at )?)/);
          pa = Z && Z[1] || "";
        }
      return `
` + pa + y;
    }
  }
  var Gt = !1, Tn;
  {
    var jn = typeof WeakMap == "function" ? WeakMap : Map;
    Tn = new jn();
  }
  function Hn(y, z) {
    if (!y || Gt)
      return "";
    {
      var q = Tn.get(y);
      if (q !== void 0)
        return q;
    }
    var Z;
    Gt = !0;
    var Me = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var je;
    je = va.current, va.current = null, zn();
    try {
      if (z) {
        var Re = function() {
          throw Error();
        };
        if (Object.defineProperty(Re.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(Re, []);
          } catch (_n) {
            Z = _n;
          }
          Reflect.construct(y, [], Re);
        } else {
          try {
            Re.call();
          } catch (_n) {
            Z = _n;
          }
          y.call(Re.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (_n) {
          Z = _n;
        }
        y();
      }
    } catch (_n) {
      if (_n && Z && typeof _n.stack == "string") {
        for (var ce = _n.stack.split(`
`), wt = Z.stack.split(`
`), ot = ce.length - 1, lt = wt.length - 1; ot >= 1 && lt >= 0 && ce[ot] !== wt[lt]; )
          lt--;
        for (; ot >= 1 && lt >= 0; ot--, lt--)
          if (ce[ot] !== wt[lt]) {
            if (ot !== 1 || lt !== 1)
              do
                if (ot--, lt--, lt < 0 || ce[ot] !== wt[lt]) {
                  var ln = `
` + ce[ot].replace(" at new ", " at ");
                  return y.displayName && ln.includes("<anonymous>") && (ln = ln.replace("<anonymous>", y.displayName)), typeof y == "function" && Tn.set(y, ln), ln;
                }
              while (ot >= 1 && lt >= 0);
            break;
          }
      }
    } finally {
      Gt = !1, va.current = je, Na(), Error.prepareStackTrace = Me;
    }
    var Ha = y ? y.displayName || y.name : "", Qi = Ha ? Zn(Ha) : "";
    return typeof y == "function" && Tn.set(y, Qi), Qi;
  }
  function Et(y, z, q) {
    return Hn(y, !1);
  }
  function rn(y) {
    var z = y.prototype;
    return !!(z && z.isReactComponent);
  }
  function Ft(y, z, q) {
    if (y == null)
      return "";
    if (typeof y == "function")
      return Hn(y, rn(y));
    if (typeof y == "string")
      return Zn(y);
    switch (y) {
      case O:
        return Zn("Suspense");
      case F:
        return Zn("SuspenseList");
    }
    if (typeof y == "object")
      switch (y.$$typeof) {
        case U:
          return Et(y.render);
        case N:
          return Ft(y.type, z, q);
        case P: {
          var Z = y, Me = Z._payload, je = Z._init;
          try {
            return Ft(je(Me), z, q);
          } catch {
          }
        }
      }
    return "";
  }
  var Vt = Object.prototype.hasOwnProperty, Dt = {}, Fn = Ce.ReactDebugCurrentFrame;
  function ea(y) {
    if (y) {
      var z = y._owner, q = Ft(y.type, y._source, z ? z.type : null);
      Fn.setExtraStackFrame(q);
    } else
      Fn.setExtraStackFrame(null);
  }
  function xn(y, z, q, Z, Me) {
    {
      var je = Function.call.bind(Vt);
      for (var Re in y)
        if (je(y, Re)) {
          var ce = void 0;
          try {
            if (typeof y[Re] != "function") {
              var wt = Error((Z || "React class") + ": " + q + " type `" + Re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof y[Re] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw wt.name = "Invariant Violation", wt;
            }
            ce = y[Re](z, Re, Z, q, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ot) {
            ce = ot;
          }
          ce && !(ce instanceof Error) && (ea(Me), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Z || "React class", q, Re, typeof ce), ea(null)), ce instanceof Error && !(ce.message in Dt) && (Dt[ce.message] = !0, ea(Me), $("Failed %s type: %s", q, ce.message), ea(null));
        }
    }
  }
  var ha = Array.isArray;
  function ta(y) {
    return ha(y);
  }
  function hn(y) {
    {
      var z = typeof Symbol == "function" && Symbol.toStringTag, q = z && y[Symbol.toStringTag] || y.constructor.name || "Object";
      return q;
    }
  }
  function na(y) {
    try {
      return on(y), !1;
    } catch {
      return !0;
    }
  }
  function on(y) {
    return "" + y;
  }
  function Vn(y) {
    if (na(y))
      return $("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", hn(y)), on(y);
  }
  var gt = Ce.ReactCurrentOwner, aa = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, er, tr, G;
  G = {};
  function oe(y) {
    if (Vt.call(y, "ref")) {
      var z = Object.getOwnPropertyDescriptor(y, "ref").get;
      if (z && z.isReactWarning)
        return !1;
    }
    return y.ref !== void 0;
  }
  function De(y) {
    if (Vt.call(y, "key")) {
      var z = Object.getOwnPropertyDescriptor(y, "key").get;
      if (z && z.isReactWarning)
        return !1;
    }
    return y.key !== void 0;
  }
  function Ie(y, z) {
    if (typeof y.ref == "string" && gt.current && z && gt.current.stateNode !== z) {
      var q = we(gt.current.type);
      G[q] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', we(gt.current.type), y.ref), G[q] = !0);
    }
  }
  function qe(y, z) {
    {
      var q = function() {
        er || (er = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
      };
      q.isReactWarning = !0, Object.defineProperty(y, "key", {
        get: q,
        configurable: !0
      });
    }
  }
  function _t(y, z) {
    {
      var q = function() {
        tr || (tr = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", z));
      };
      q.isReactWarning = !0, Object.defineProperty(y, "ref", {
        get: q,
        configurable: !0
      });
    }
  }
  var bt = function(y, z, q, Z, Me, je, Re) {
    var ce = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: v,
      // Built-in properties that belong on the element
      type: y,
      key: z,
      ref: q,
      props: Re,
      // Record the component responsible for creating this element.
      _owner: je
    };
    return ce._store = {}, Object.defineProperty(ce._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(ce, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Z
    }), Object.defineProperty(ce, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Me
    }), Object.freeze && (Object.freeze(ce.props), Object.freeze(ce)), ce;
  };
  function Dn(y, z, q, Z, Me) {
    {
      var je, Re = {}, ce = null, wt = null;
      q !== void 0 && (Vn(q), ce = "" + q), De(z) && (Vn(z.key), ce = "" + z.key), oe(z) && (wt = z.ref, Ie(z, Me));
      for (je in z)
        Vt.call(z, je) && !aa.hasOwnProperty(je) && (Re[je] = z[je]);
      if (y && y.defaultProps) {
        var ot = y.defaultProps;
        for (je in ot)
          Re[je] === void 0 && (Re[je] = ot[je]);
      }
      if (ce || wt) {
        var lt = typeof y == "function" ? y.displayName || y.name || "Unknown" : y;
        ce && qe(Re, lt), wt && _t(Re, lt);
      }
      return bt(y, ce, wt, Me, Z, gt.current, Re);
    }
  }
  var Ze = Ce.ReactCurrentOwner, Bn = Ce.ReactDebugCurrentFrame;
  function rt(y) {
    if (y) {
      var z = y._owner, q = Ft(y.type, y._source, z ? z.type : null);
      Bn.setExtraStackFrame(q);
    } else
      Bn.setExtraStackFrame(null);
  }
  var it;
  it = !1;
  function ka(y) {
    return typeof y == "object" && y !== null && y.$$typeof === v;
  }
  function ma() {
    {
      if (Ze.current) {
        var y = we(Ze.current.type);
        if (y)
          return `

Check the render method of \`` + y + "`.";
      }
      return "";
    }
  }
  function fi(y) {
    {
      if (y !== void 0) {
        var z = y.fileName.replace(/^.*[\\\/]/, ""), q = y.lineNumber;
        return `

Check your code at ` + z + ":" + q + ".";
      }
      return "";
    }
  }
  var Wi = {};
  function el(y) {
    {
      var z = ma();
      if (!z) {
        var q = typeof y == "string" ? y : y.displayName || y.name;
        q && (z = `

Check the top-level render call using <` + q + ">.");
      }
      return z;
    }
  }
  function di(y, z) {
    {
      if (!y._store || y._store.validated || y.key != null)
        return;
      y._store.validated = !0;
      var q = el(z);
      if (Wi[q])
        return;
      Wi[q] = !0;
      var Z = "";
      y && y._owner && y._owner !== Ze.current && (Z = " It was passed a child from " + we(y._owner.type) + "."), rt(y), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', q, Z), rt(null);
    }
  }
  function vi(y, z) {
    {
      if (typeof y != "object")
        return;
      if (ta(y))
        for (var q = 0; q < y.length; q++) {
          var Z = y[q];
          ka(Z) && di(Z, z);
        }
      else if (ka(y))
        y._store && (y._store.validated = !0);
      else if (y) {
        var Me = ie(y);
        if (typeof Me == "function" && Me !== y.entries)
          for (var je = Me.call(y), Re; !(Re = je.next()).done; )
            ka(Re.value) && di(Re.value, z);
      }
    }
  }
  function nr(y) {
    {
      var z = y.type;
      if (z == null || typeof z == "string")
        return;
      var q;
      if (typeof z == "function")
        q = z.propTypes;
      else if (typeof z == "object" && (z.$$typeof === U || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      z.$$typeof === N))
        q = z.propTypes;
      else
        return;
      if (q) {
        var Z = we(z);
        xn(q, y.props, "prop", Z, y);
      } else if (z.PropTypes !== void 0 && !it) {
        it = !0;
        var Me = we(z);
        $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Me || "Unknown");
      }
      typeof z.getDefaultProps == "function" && !z.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function Lr(y) {
    {
      for (var z = Object.keys(y.props), q = 0; q < z.length; q++) {
        var Z = z[q];
        if (Z !== "children" && Z !== "key") {
          rt(y), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Z), rt(null);
          break;
        }
      }
      y.ref !== null && (rt(y), $("Invalid attribute `ref` supplied to `React.Fragment`."), rt(null));
    }
  }
  function ar(y, z, q, Z, Me, je) {
    {
      var Re = ct(y);
      if (!Re) {
        var ce = "";
        (y === void 0 || typeof y == "object" && y !== null && Object.keys(y).length === 0) && (ce += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var wt = fi(Me);
        wt ? ce += wt : ce += ma();
        var ot;
        y === null ? ot = "null" : ta(y) ? ot = "array" : y !== void 0 && y.$$typeof === v ? (ot = "<" + (we(y.type) || "Unknown") + " />", ce = " Did you accidentally export a JSX literal instead of a component?") : ot = typeof y, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ot, ce);
      }
      var lt = Dn(y, z, q, Me, je);
      if (lt == null)
        return lt;
      if (Re) {
        var ln = z.children;
        if (ln !== void 0)
          if (Z)
            if (ta(ln)) {
              for (var Ha = 0; Ha < ln.length; Ha++)
                vi(ln[Ha], y);
              Object.freeze && Object.freeze(ln);
            } else
              $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            vi(ln, y);
      }
      return y === g ? Lr(lt) : nr(lt), lt;
    }
  }
  function za(y, z, q) {
    return ar(y, z, q, !0);
  }
  function ya(y, z, q) {
    return ar(y, z, q, !1);
  }
  var ja = ya, pi = za;
  hf.Fragment = g, hf.jsx = ja, hf.jsxs = pi;
})();
lE.exports = hf;
var se = lE.exports, kh = {}, cE = { exports: {} }, Xn = {}, fE = { exports: {} }, dE = {};
(function(c) {
  /**
   * @license React
   * scheduler.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var v = !1, h = !1, g = 5;
    function E(G, oe) {
      var De = G.length;
      G.push(oe), H(G, oe, De);
    }
    function T(G) {
      return G.length === 0 ? null : G[0];
    }
    function f(G) {
      if (G.length === 0)
        return null;
      var oe = G[0], De = G.pop();
      return De !== oe && (G[0] = De, U(G, De, 0)), oe;
    }
    function H(G, oe, De) {
      for (var Ie = De; Ie > 0; ) {
        var qe = Ie - 1 >>> 1, _t = G[qe];
        if (O(_t, oe) > 0)
          G[qe] = oe, G[Ie] = _t, Ie = qe;
        else
          return;
      }
    }
    function U(G, oe, De) {
      for (var Ie = De, qe = G.length, _t = qe >>> 1; Ie < _t; ) {
        var bt = (Ie + 1) * 2 - 1, Dn = G[bt], Ze = bt + 1, Bn = G[Ze];
        if (O(Dn, oe) < 0)
          Ze < qe && O(Bn, Dn) < 0 ? (G[Ie] = Bn, G[Ze] = oe, Ie = Ze) : (G[Ie] = Dn, G[bt] = oe, Ie = bt);
        else if (Ze < qe && O(Bn, oe) < 0)
          G[Ie] = Bn, G[Ze] = oe, Ie = Ze;
        else
          return;
      }
    }
    function O(G, oe) {
      var De = G.sortIndex - oe.sortIndex;
      return De !== 0 ? De : G.id - oe.id;
    }
    var F = 1, N = 2, P = 3, Y = 4, ee = 5;
    function xe(G, oe) {
    }
    var ie = typeof performance == "object" && typeof performance.now == "function";
    if (ie) {
      var Ce = performance;
      c.unstable_now = function() {
        return Ce.now();
      };
    } else {
      var $ = Date, ne = $.now();
      c.unstable_now = function() {
        return $.now() - ne;
      };
    }
    var be = 1073741823, ue = -1, Xe = 250, _e = 5e3, jt = 1e4, an = be, ct = [], Je = [], kn = 1, we = null, Ve = P, mt = !1, yt = !1, Ee = !1, qt = typeof setTimeout == "function" ? setTimeout : null, Aa = typeof clearTimeout == "function" ? clearTimeout : null, Jn = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function da(G) {
      for (var oe = T(Je); oe !== null; ) {
        if (oe.callback === null)
          f(Je);
        else if (oe.startTime <= G)
          f(Je), oe.sortIndex = oe.expirationTime, E(ct, oe);
        else
          return;
        oe = T(Je);
      }
    }
    function Ht(G) {
      if (Ee = !1, da(G), !yt)
        if (T(ct) !== null)
          yt = !0, Vn(Rn);
        else {
          var oe = T(Je);
          oe !== null && gt(Ht, oe.startTime - G);
        }
    }
    function Rn(G, oe) {
      yt = !1, Ee && (Ee = !1, aa()), mt = !0;
      var De = Ve;
      try {
        var Ie;
        if (!h)
          return zn(G, oe);
      } finally {
        we = null, Ve = De, mt = !1;
      }
    }
    function zn(G, oe) {
      var De = oe;
      for (da(De), we = T(ct); we !== null && !v && !(we.expirationTime > De && (!G || ea())); ) {
        var Ie = we.callback;
        if (typeof Ie == "function") {
          we.callback = null, Ve = we.priorityLevel;
          var qe = we.expirationTime <= De, _t = Ie(qe);
          De = c.unstable_now(), typeof _t == "function" ? we.callback = _t : we === T(ct) && f(ct), da(De);
        } else
          f(ct);
        we = T(ct);
      }
      if (we !== null)
        return !0;
      var bt = T(Je);
      return bt !== null && gt(Ht, bt.startTime - De), !1;
    }
    function Na(G, oe) {
      switch (G) {
        case F:
        case N:
        case P:
        case Y:
        case ee:
          break;
        default:
          G = P;
      }
      var De = Ve;
      Ve = G;
      try {
        return oe();
      } finally {
        Ve = De;
      }
    }
    function va(G) {
      var oe;
      switch (Ve) {
        case F:
        case N:
        case P:
          oe = P;
          break;
        default:
          oe = Ve;
          break;
      }
      var De = Ve;
      Ve = oe;
      try {
        return G();
      } finally {
        Ve = De;
      }
    }
    function pa(G) {
      var oe = Ve;
      return function() {
        var De = Ve;
        Ve = oe;
        try {
          return G.apply(this, arguments);
        } finally {
          Ve = De;
        }
      };
    }
    function Zn(G, oe, De) {
      var Ie = c.unstable_now(), qe;
      if (typeof De == "object" && De !== null) {
        var _t = De.delay;
        typeof _t == "number" && _t > 0 ? qe = Ie + _t : qe = Ie;
      } else
        qe = Ie;
      var bt;
      switch (G) {
        case F:
          bt = ue;
          break;
        case N:
          bt = Xe;
          break;
        case ee:
          bt = an;
          break;
        case Y:
          bt = jt;
          break;
        case P:
        default:
          bt = _e;
          break;
      }
      var Dn = qe + bt, Ze = {
        id: kn++,
        callback: oe,
        priorityLevel: G,
        startTime: qe,
        expirationTime: Dn,
        sortIndex: -1
      };
      return qe > Ie ? (Ze.sortIndex = qe, E(Je, Ze), T(ct) === null && Ze === T(Je) && (Ee ? aa() : Ee = !0, gt(Ht, qe - Ie))) : (Ze.sortIndex = Dn, E(ct, Ze), !yt && !mt && (yt = !0, Vn(Rn))), Ze;
    }
    function Gt() {
    }
    function Tn() {
      !yt && !mt && (yt = !0, Vn(Rn));
    }
    function jn() {
      return T(ct);
    }
    function Hn(G) {
      G.callback = null;
    }
    function Et() {
      return Ve;
    }
    var rn = !1, Ft = null, Vt = -1, Dt = g, Fn = -1;
    function ea() {
      var G = c.unstable_now() - Fn;
      return !(G < Dt);
    }
    function xn() {
    }
    function ha(G) {
      if (G < 0 || G > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      G > 0 ? Dt = Math.floor(1e3 / G) : Dt = g;
    }
    var ta = function() {
      if (Ft !== null) {
        var G = c.unstable_now();
        Fn = G;
        var oe = !0, De = !0;
        try {
          De = Ft(oe, G);
        } finally {
          De ? hn() : (rn = !1, Ft = null);
        }
      } else
        rn = !1;
    }, hn;
    if (typeof Jn == "function")
      hn = function() {
        Jn(ta);
      };
    else if (typeof MessageChannel < "u") {
      var na = new MessageChannel(), on = na.port2;
      na.port1.onmessage = ta, hn = function() {
        on.postMessage(null);
      };
    } else
      hn = function() {
        qt(ta, 0);
      };
    function Vn(G) {
      Ft = G, rn || (rn = !0, hn());
    }
    function gt(G, oe) {
      Vt = qt(function() {
        G(c.unstable_now());
      }, oe);
    }
    function aa() {
      Aa(Vt), Vt = -1;
    }
    var er = xn, tr = null;
    c.unstable_IdlePriority = ee, c.unstable_ImmediatePriority = F, c.unstable_LowPriority = Y, c.unstable_NormalPriority = P, c.unstable_Profiling = tr, c.unstable_UserBlockingPriority = N, c.unstable_cancelCallback = Hn, c.unstable_continueExecution = Tn, c.unstable_forceFrameRate = ha, c.unstable_getCurrentPriorityLevel = Et, c.unstable_getFirstCallbackNode = jn, c.unstable_next = va, c.unstable_pauseExecution = Gt, c.unstable_requestPaint = er, c.unstable_runWithPriority = Na, c.unstable_scheduleCallback = Zn, c.unstable_shouldYield = ea, c.unstable_wrapCallback = pa, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(dE);
fE.exports = dE;
var YO = fE.exports;
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function() {
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
  var c = B, v = YO, h = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function E(e) {
    g = e;
  }
  function T(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      H("warn", e, n);
    }
  }
  function f(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      H("error", e, n);
    }
  }
  function H(e, t, n) {
    {
      var a = h.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(o) {
        return String(o);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var U = 0, O = 1, F = 2, N = 3, P = 4, Y = 5, ee = 6, xe = 7, ie = 8, Ce = 9, $ = 10, ne = 11, be = 12, ue = 13, Xe = 14, _e = 15, jt = 16, an = 17, ct = 18, Je = 19, kn = 21, we = 22, Ve = 23, mt = 24, yt = 25, Ee = !0, qt = !1, Aa = !1, Jn = !1, da = !1, Ht = !0, Rn = !1, zn = !1, Na = !0, va = !0, pa = !0, Zn = /* @__PURE__ */ new Set(), Gt = {}, Tn = {};
  function jn(e, t) {
    Hn(e, t), Hn(e + "Capture", t);
  }
  function Hn(e, t) {
    Gt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Gt[e] = t;
    {
      var n = e.toLowerCase();
      Tn[n] = e, e === "onDoubleClick" && (Tn.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      Zn.add(t[a]);
  }
  var Et = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", rn = Object.prototype.hasOwnProperty;
  function Ft(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function Vt(e) {
    try {
      return Dt(e), !1;
    } catch {
      return !0;
    }
  }
  function Dt(e) {
    return "" + e;
  }
  function Fn(e, t) {
    if (Vt(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ft(e)), Dt(e);
  }
  function ea(e) {
    if (Vt(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ft(e)), Dt(e);
  }
  function xn(e, t) {
    if (Vt(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ft(e)), Dt(e);
  }
  function ha(e, t) {
    if (Vt(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ft(e)), Dt(e);
  }
  function ta(e) {
    if (Vt(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Ft(e)), Dt(e);
  }
  function hn(e) {
    if (Vt(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Ft(e)), Dt(e);
  }
  var na = 0, on = 1, Vn = 2, gt = 3, aa = 4, er = 5, tr = 6, G = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", oe = G + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", De = new RegExp("^[" + G + "][" + oe + "]*$"), Ie = {}, qe = {};
  function _t(e) {
    return rn.call(qe, e) ? !0 : rn.call(Ie, e) ? !1 : De.test(e) ? (qe[e] = !0, !0) : (Ie[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function bt(e, t, n) {
    return t !== null ? t.type === na : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function Dn(e, t, n, a) {
    if (n !== null && n.type === na)
      return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean": {
        if (a)
          return !1;
        if (n !== null)
          return !n.acceptsBooleans;
        var r = e.toLowerCase().slice(0, 5);
        return r !== "data-" && r !== "aria-";
      }
      default:
        return !1;
    }
  }
  function Ze(e, t, n, a) {
    if (t === null || typeof t > "u" || Dn(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case gt:
          return !t;
        case aa:
          return t === !1;
        case er:
          return isNaN(t);
        case tr:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Bn(e) {
    return it.hasOwnProperty(e) ? it[e] : null;
  }
  function rt(e, t, n, a, r, i, o) {
    this.acceptsBooleans = t === Vn || t === gt || t === aa, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
  }
  var it = {}, ka = [
    "children",
    "dangerouslySetInnerHTML",
    // TODO: This prevents the assignment of defaultValue to regular
    // elements (not just inputs). Now that ReactDOMInput assigns to the
    // defaultValue property -- do we need this?
    "defaultValue",
    "defaultChecked",
    "innerHTML",
    "suppressContentEditableWarning",
    "suppressHydrationWarning",
    "style"
  ];
  ka.forEach(function(e) {
    it[e] = new rt(
      e,
      na,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0], n = e[1];
    it[t] = new rt(
      t,
      on,
      !1,
      // mustUseProperty
      n,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    it[e] = new rt(
      e,
      Vn,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    it[e] = new rt(
      e,
      Vn,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "allowFullScreen",
    "async",
    // Note: there is a special case that prevents it from being written to the DOM
    // on the client side because the browsers are inconsistent. Instead we call focus().
    "autoFocus",
    "autoPlay",
    "controls",
    "default",
    "defer",
    "disabled",
    "disablePictureInPicture",
    "disableRemotePlayback",
    "formNoValidate",
    "hidden",
    "loop",
    "noModule",
    "noValidate",
    "open",
    "playsInline",
    "readOnly",
    "required",
    "reversed",
    "scoped",
    "seamless",
    // Microdata
    "itemScope"
  ].forEach(function(e) {
    it[e] = new rt(
      e,
      gt,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "checked",
    // Note: `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`. We have special logic for handling this.
    "multiple",
    "muted",
    "selected"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    it[e] = new rt(
      e,
      gt,
      !0,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "capture",
    "download"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    it[e] = new rt(
      e,
      aa,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "cols",
    "rows",
    "size",
    "span"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    it[e] = new rt(
      e,
      tr,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["rowSpan", "start"].forEach(function(e) {
    it[e] = new rt(
      e,
      er,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  });
  var ma = /[\-\:]([a-z])/g, fi = function(e) {
    return e[1].toUpperCase();
  };
  [
    "accent-height",
    "alignment-baseline",
    "arabic-form",
    "baseline-shift",
    "cap-height",
    "clip-path",
    "clip-rule",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "dominant-baseline",
    "enable-background",
    "fill-opacity",
    "fill-rule",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-name",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "horiz-adv-x",
    "horiz-origin-x",
    "image-rendering",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "overline-position",
    "overline-thickness",
    "paint-order",
    "panose-1",
    "pointer-events",
    "rendering-intent",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "strikethrough-position",
    "strikethrough-thickness",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "underline-position",
    "underline-thickness",
    "unicode-bidi",
    "unicode-range",
    "units-per-em",
    "v-alphabetic",
    "v-hanging",
    "v-ideographic",
    "v-mathematical",
    "vector-effect",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "word-spacing",
    "writing-mode",
    "xmlns:xlink",
    "x-height"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    var t = e.replace(ma, fi);
    it[t] = new rt(
      t,
      on,
      !1,
      // mustUseProperty
      e,
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "xlink:actuate",
    "xlink:arcrole",
    "xlink:role",
    "xlink:show",
    "xlink:title",
    "xlink:type"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    var t = e.replace(ma, fi);
    it[t] = new rt(
      t,
      on,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/1999/xlink",
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "xml:base",
    "xml:lang",
    "xml:space"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    var t = e.replace(ma, fi);
    it[t] = new rt(
      t,
      on,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    it[e] = new rt(
      e,
      on,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  });
  var Wi = "xlinkHref";
  it[Wi] = new rt(
    "xlinkHref",
    on,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    it[e] = new rt(
      e,
      on,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !0,
      // sanitizeURL
      !0
    );
  });
  var el = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, di = !1;
  function vi(e) {
    !di && el.test(e) && (di = !0, f("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function nr(e, t, n, a) {
    if (a.mustUseProperty) {
      var r = a.propertyName;
      return e[r];
    } else {
      Fn(n, t), a.sanitizeURL && vi("" + n);
      var i = a.attributeName, o = null;
      if (a.type === aa) {
        if (e.hasAttribute(i)) {
          var l = e.getAttribute(i);
          return l === "" ? !0 : Ze(t, n, a, !1) ? l : l === "" + n ? n : l;
        }
      } else if (e.hasAttribute(i)) {
        if (Ze(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === gt)
          return n;
        o = e.getAttribute(i);
      }
      return Ze(t, n, a, !1) ? o === null ? n : o : o === "" + n ? n : o;
    }
  }
  function Lr(e, t, n, a) {
    {
      if (!_t(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return Fn(n, t), r === "" + n ? n : r;
    }
  }
  function ar(e, t, n, a) {
    var r = Bn(t);
    if (!bt(t, r, a)) {
      if (Ze(t, n, r, a) && (n = null), a || r === null) {
        if (_t(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (Fn(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var o = r.mustUseProperty;
      if (o) {
        var l = r.propertyName;
        if (n === null) {
          var u = r.type;
          e[l] = u === gt ? !1 : "";
        } else
          e[l] = n;
        return;
      }
      var d = r.attributeName, p = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(d);
      else {
        var S = r.type, b;
        S === gt || S === aa && n === !0 ? b = "" : (Fn(n, d), b = "" + n, r.sanitizeURL && vi(b.toString())), p ? e.setAttributeNS(p, d, b) : e.setAttribute(d, b);
      }
    }
  }
  var za = Symbol.for("react.element"), ya = Symbol.for("react.portal"), ja = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), z = Symbol.for("react.provider"), q = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), Me = Symbol.for("react.suspense"), je = Symbol.for("react.suspense_list"), Re = Symbol.for("react.memo"), ce = Symbol.for("react.lazy"), wt = Symbol.for("react.scope"), ot = Symbol.for("react.debug_trace_mode"), lt = Symbol.for("react.offscreen"), ln = Symbol.for("react.legacy_hidden"), Ha = Symbol.for("react.cache"), Qi = Symbol.for("react.tracing_marker"), _n = Symbol.iterator, Tf = "@@iterator";
  function rr(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = _n && e[_n] || e[Tf];
    return typeof t == "function" ? t : null;
  }
  var Le = Object.assign, hi = 0, Ur, tl, nl, al, rl, il, ol;
  function ll() {
  }
  ll.__reactDisabledLog = !0;
  function es() {
    {
      if (hi === 0) {
        Ur = console.log, tl = console.info, nl = console.warn, al = console.error, rl = console.group, il = console.groupCollapsed, ol = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: ll,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      hi++;
    }
  }
  function xf() {
    {
      if (hi--, hi === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Le({}, e, {
            value: Ur
          }),
          info: Le({}, e, {
            value: tl
          }),
          warn: Le({}, e, {
            value: nl
          }),
          error: Le({}, e, {
            value: al
          }),
          group: Le({}, e, {
            value: rl
          }),
          groupCollapsed: Le({}, e, {
            value: il
          }),
          groupEnd: Le({}, e, {
            value: ol
          })
        });
      }
      hi < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var ul = h.ReactCurrentDispatcher, mi;
  function ra(e, t, n) {
    {
      if (mi === void 0)
        try {
          throw Error();
        } catch (r) {
          var a = r.stack.trim().match(/\n( *(at )?)/);
          mi = a && a[1] || "";
        }
      return `
` + mi + e;
    }
  }
  var Ar = !1, Nr;
  {
    var Ki = typeof WeakMap == "function" ? WeakMap : Map;
    Nr = new Ki();
  }
  function sl(e, t) {
    if (!e || Ar)
      return "";
    {
      var n = Nr.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    Ar = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var i;
    i = ul.current, ul.current = null, es();
    try {
      if (t) {
        var o = function() {
          throw Error();
        };
        if (Object.defineProperty(o.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(o, []);
          } catch (D) {
            a = D;
          }
          Reflect.construct(e, [], o);
        } else {
          try {
            o.call();
          } catch (D) {
            a = D;
          }
          e.call(o.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (D) {
          a = D;
        }
        e();
      }
    } catch (D) {
      if (D && a && typeof D.stack == "string") {
        for (var l = D.stack.split(`
`), u = a.stack.split(`
`), d = l.length - 1, p = u.length - 1; d >= 1 && p >= 0 && l[d] !== u[p]; )
          p--;
        for (; d >= 1 && p >= 0; d--, p--)
          if (l[d] !== u[p]) {
            if (d !== 1 || p !== 1)
              do
                if (d--, p--, p < 0 || l[d] !== u[p]) {
                  var S = `
` + l[d].replace(" at new ", " at ");
                  return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && Nr.set(e, S), S;
                }
              while (d >= 1 && p >= 0);
            break;
          }
      }
    } finally {
      Ar = !1, ul.current = i, xf(), Error.prepareStackTrace = r;
    }
    var b = e ? e.displayName || e.name : "", x = b ? ra(b) : "";
    return typeof e == "function" && Nr.set(e, x), x;
  }
  function ts(e, t, n) {
    return sl(e, !0);
  }
  function cl(e, t, n) {
    return sl(e, !1);
  }
  function Df(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function kr(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return sl(e, Df(e));
    if (typeof e == "string")
      return ra(e);
    switch (e) {
      case Me:
        return ra("Suspense");
      case je:
        return ra("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Z:
          return cl(e.render);
        case Re:
          return kr(e.type, t, n);
        case ce: {
          var a = e, r = a._payload, i = a._init;
          try {
            return kr(i(r), t, n);
          } catch {
          }
        }
      }
    return "";
  }
  function ns(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case Y:
        return ra(e.type);
      case jt:
        return ra("Lazy");
      case ue:
        return ra("Suspense");
      case Je:
        return ra("SuspenseList");
      case U:
      case F:
      case _e:
        return cl(e.type);
      case ne:
        return cl(e.type.render);
      case O:
        return ts(e.type);
      default:
        return "";
    }
  }
  function fl(e) {
    try {
      var t = "", n = e;
      do
        t += ns(n), n = n.return;
      while (n);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function Xi(e, t, n) {
    var a = e.displayName;
    if (a)
      return a;
    var r = t.displayName || t.name || "";
    return r !== "" ? n + "(" + r + ")" : n;
  }
  function as(e) {
    return e.displayName || "Context";
  }
  function Be(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case ja:
        return "Fragment";
      case ya:
        return "Portal";
      case y:
        return "Profiler";
      case pi:
        return "StrictMode";
      case Me:
        return "Suspense";
      case je:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case q:
          var t = e;
          return as(t) + ".Consumer";
        case z:
          var n = e;
          return as(n._context) + ".Provider";
        case Z:
          return Xi(e, e.render, "ForwardRef");
        case Re:
          var a = e.displayName || null;
          return a !== null ? a : Be(e.type) || "Memo";
        case ce: {
          var r = e, i = r._payload, o = r._init;
          try {
            return Be(o(i));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  function dl(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function vl(e) {
    return e.displayName || "Context";
  }
  function Se(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case mt:
        return "Cache";
      case Ce:
        var a = n;
        return vl(a) + ".Consumer";
      case $:
        var r = n;
        return vl(r._context) + ".Provider";
      case ct:
        return "DehydratedFragment";
      case ne:
        return dl(n, n.render, "ForwardRef");
      case xe:
        return "Fragment";
      case Y:
        return n;
      case P:
        return "Portal";
      case N:
        return "Root";
      case ee:
        return "Text";
      case jt:
        return Be(n);
      case ie:
        return n === pi ? "StrictMode" : "Mode";
      case we:
        return "Offscreen";
      case be:
        return "Profiler";
      case kn:
        return "Scope";
      case ue:
        return "Suspense";
      case Je:
        return "SuspenseList";
      case yt:
        return "TracingMarker";
      case O:
      case U:
      case an:
      case F:
      case Xe:
      case _e:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var rs = h.ReactDebugCurrentFrame, un = null, yi = !1;
  function zr() {
    {
      if (un === null)
        return null;
      var e = un._debugOwner;
      if (e !== null && typeof e < "u")
        return Se(e);
    }
    return null;
  }
  function is() {
    return un === null ? "" : fl(un);
  }
  function Bt() {
    rs.getCurrentStack = null, un = null, yi = !1;
  }
  function ft(e) {
    rs.getCurrentStack = e === null ? null : is, un = e, yi = !1;
  }
  function os() {
    return un;
  }
  function Pn(e) {
    yi = e;
  }
  function wn(e) {
    return "" + e;
  }
  function Fa(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return hn(e), e;
      default:
        return "";
    }
  }
  var _f = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function Ji(e, t) {
    _f[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || f("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || f("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function gi(e) {
    var t = e.type, n = e.nodeName;
    return n && n.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ls(e) {
    return e._valueTracker;
  }
  function jr(e) {
    e._valueTracker = null;
  }
  function us(e) {
    var t = "";
    return e && (gi(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function wf(e) {
    var t = gi(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    hn(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(l) {
          hn(l), a = "" + l, i.call(this, l);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var o = {
        getValue: function() {
          return a;
        },
        setValue: function(l) {
          hn(l), a = "" + l;
        },
        stopTracking: function() {
          jr(e), delete e[t];
        }
      };
      return o;
    }
  }
  function ir(e) {
    ls(e) || (e._valueTracker = wf(e));
  }
  function Zi(e) {
    if (!e)
      return !1;
    var t = ls(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = us(e);
    return a !== n ? (t.setValue(a), !0) : !1;
  }
  function Hr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var eo = !1, ss = !1, cs = !1, fs = !1;
  function ds(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function s(e, t) {
    var n = e, a = t.checked, r = Le({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function m(e, t) {
    Ji("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !ss && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", zr() || "A component", t.type), ss = !0), t.value !== void 0 && t.defaultValue !== void 0 && !eo && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", zr() || "A component", t.type), eo = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: Fa(t.value != null ? t.value : a),
      controlled: ds(t)
    };
  }
  function _(e, t) {
    var n = e, a = t.checked;
    a != null && ar(n, "checked", a, !1);
  }
  function w(e, t) {
    var n = e;
    {
      var a = ds(t);
      !n._wrapperState.controlled && a && !fs && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), fs = !0), n._wrapperState.controlled && !a && !cs && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), cs = !0);
    }
    _(e, t);
    var r = Fa(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = wn(r)) : n.value !== wn(r) && (n.value = wn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? he(n, t.type, r) : t.hasOwnProperty("defaultValue") && he(n, t.type, Fa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function V(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var o = wn(a._wrapperState.initialValue);
      n || o !== a.value && (a.value = o), a.defaultValue = o;
    }
    var l = a.name;
    l !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, l !== "" && (a.name = l);
  }
  function ve(e, t) {
    var n = e;
    w(n, t), ae(n, t);
  }
  function ae(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      Fn(n, "name");
      for (var r = a.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), i = 0; i < r.length; i++) {
        var o = r[i];
        if (!(o === e || o.form !== e.form)) {
          var l = Js(o);
          if (!l)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          Zi(o), w(o, l);
        }
      }
    }
  }
  function he(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || Hr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = wn(e._wrapperState.initialValue) : e.defaultValue !== wn(n) && (e.defaultValue = wn(n)));
  }
  var Ue = !1, Ge = !1, et = !1;
  function tt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? c.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ge || (Ge = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (et || (et = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Ue && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Ue = !0);
  }
  function ut(e, t) {
    t.value != null && e.setAttribute("value", wn(Fa(t.value)));
  }
  var pt = Array.isArray;
  function Pe(e) {
    return pt(e);
  }
  var Fr;
  Fr = !1;
  function to() {
    var e = zr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var pl = ["value", "defaultValue"];
  function Of(e) {
    {
      Ji("select", e);
      for (var t = 0; t < pl.length; t++) {
        var n = pl[t];
        if (e[n] != null) {
          var a = Pe(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, to()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, to());
        }
      }
    }
  }
  function or(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, o = {}, l = 0; l < i.length; l++)
        o["$" + i[l]] = !0;
      for (var u = 0; u < r.length; u++) {
        var d = o.hasOwnProperty("$" + r[u].value);
        r[u].selected !== d && (r[u].selected = d), d && a && (r[u].defaultSelected = !0);
      }
    } else {
      for (var p = wn(Fa(n)), S = null, b = 0; b < r.length; b++) {
        if (r[b].value === p) {
          r[b].selected = !0, a && (r[b].defaultSelected = !0);
          return;
        }
        S === null && !r[b].disabled && (S = r[b]);
      }
      S !== null && (S.selected = !0);
    }
  }
  function hl(e, t) {
    return Le({}, t, {
      value: void 0
    });
  }
  function ml(e, t) {
    var n = e;
    Of(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !Fr && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Fr = !0);
  }
  function Mf(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? or(n, !!t.multiple, a, !1) : t.defaultValue != null && or(n, !!t.multiple, t.defaultValue, !0);
  }
  function xE(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? or(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? or(n, !!t.multiple, t.defaultValue, !0) : or(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function DE(e, t) {
    var n = e, a = t.value;
    a != null && or(n, !!t.multiple, a, !1);
  }
  var Yh = !1;
  function Lf(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = Le({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: wn(n._wrapperState.initialValue)
    });
    return a;
  }
  function Ih(e, t) {
    var n = e;
    Ji("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Yh && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", zr() || "A component"), Yh = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        f("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (Pe(r)) {
            if (r.length > 1)
              throw new Error("<textarea> can only have at most one child.");
            r = r[0];
          }
          i = r;
        }
      }
      i == null && (i = ""), a = i;
    }
    n._wrapperState = {
      initialValue: Fa(a)
    };
  }
  function qh(e, t) {
    var n = e, a = Fa(t.value), r = Fa(t.defaultValue);
    if (a != null) {
      var i = wn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = wn(r));
  }
  function Gh(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function _E(e, t) {
    qh(e, t);
  }
  var lr = "http://www.w3.org/1999/xhtml", wE = "http://www.w3.org/1998/Math/MathML", Uf = "http://www.w3.org/2000/svg";
  function Af(e) {
    switch (e) {
      case "svg":
        return Uf;
      case "math":
        return wE;
      default:
        return lr;
    }
  }
  function Nf(e, t) {
    return e == null || e === lr ? Af(t) : e === Uf && t === "foreignObject" ? lr : e;
  }
  var OE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, vs, Wh = OE(function(e, t) {
    if (e.namespaceURI === Uf && !("innerHTML" in e)) {
      vs = vs || document.createElement("div"), vs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = vs.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), On = 1, ur = 3, Ct = 8, sr = 9, kf = 11, ps = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === ur) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, ME = {
    animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
    background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
    backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
    border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
    borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
    borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
    borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
    borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
    borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
    borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
    borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
    borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
    borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
    borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
    borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
    borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
    borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
    columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
    columns: ["columnCount", "columnWidth"],
    flex: ["flexBasis", "flexGrow", "flexShrink"],
    flexFlow: ["flexDirection", "flexWrap"],
    font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
    fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
    gap: ["columnGap", "rowGap"],
    grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
    gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
    gridColumn: ["gridColumnEnd", "gridColumnStart"],
    gridColumnGap: ["columnGap"],
    gridGap: ["columnGap", "rowGap"],
    gridRow: ["gridRowEnd", "gridRowStart"],
    gridRowGap: ["rowGap"],
    gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
    listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
    margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
    marker: ["markerEnd", "markerMid", "markerStart"],
    mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
    maskPosition: ["maskPositionX", "maskPositionY"],
    outline: ["outlineColor", "outlineStyle", "outlineWidth"],
    overflow: ["overflowX", "overflowY"],
    padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
    placeContent: ["alignContent", "justifyContent"],
    placeItems: ["alignItems", "justifyItems"],
    placeSelf: ["alignSelf", "justifySelf"],
    textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
    textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
    transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
    wordWrap: ["overflowWrap"]
  }, yl = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    // SVG-related properties
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  };
  function LE(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var UE = ["Webkit", "ms", "Moz", "O"];
  Object.keys(yl).forEach(function(e) {
    UE.forEach(function(t) {
      yl[LE(t, e)] = yl[e];
    });
  });
  function zf(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(yl.hasOwnProperty(e) && yl[e]) ? t + "px" : (ha(t, e), ("" + t).trim());
  }
  var AE = /([A-Z])/g, NE = /^ms-/;
  function kE(e) {
    return e.replace(AE, "-$1").toLowerCase().replace(NE, "-ms-");
  }
  var Qh = function() {
  };
  {
    var zE = /^(?:webkit|moz|o)[A-Z]/, jE = /^-ms-/, HE = /-(.)/g, Kh = /;\s*$/, no = {}, jf = {}, Xh = !1, Jh = !1, FE = function(e) {
      return e.replace(HE, function(t, n) {
        return n.toUpperCase();
      });
    }, VE = function(e) {
      no.hasOwnProperty(e) && no[e] || (no[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        FE(e.replace(jE, "ms-"))
      ));
    }, BE = function(e) {
      no.hasOwnProperty(e) && no[e] || (no[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, PE = function(e, t) {
      jf.hasOwnProperty(t) && jf[t] || (jf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Kh, "")));
    }, $E = function(e, t) {
      Xh || (Xh = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, YE = function(e, t) {
      Jh || (Jh = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Qh = function(e, t) {
      e.indexOf("-") > -1 ? VE(e) : zE.test(e) ? BE(e) : Kh.test(t) && PE(e, t), typeof t == "number" && (isNaN(t) ? $E(e, t) : isFinite(t) || YE(e, t));
    };
  }
  var IE = Qh;
  function qE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : kE(a)) + ":", t += zf(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function Zh(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || IE(a, t[a]);
        var i = zf(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function GE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function em(e) {
    var t = {};
    for (var n in e)
      for (var a = ME[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function WE(e, t) {
    {
      if (!t)
        return;
      var n = em(e), a = em(t), r = {};
      for (var i in n) {
        var o = n[i], l = a[i];
        if (l && o !== l) {
          var u = o + "," + l;
          if (r[u])
            continue;
          r[u] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", GE(e[o]) ? "Removing" : "Updating", o, l);
        }
      }
    }
  }
  var QE = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
    // NOTE: menuitem's close tag should be omitted, but that causes problems.
  }, KE = Le({
    menuitem: !0
  }, QE), XE = "__html";
  function Hf(e, t) {
    if (t) {
      if (KE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(XE in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && f("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
  }
  function bi(e, t) {
    if (e.indexOf("-") === -1)
      return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var hs = {
    // HTML
    accept: "accept",
    acceptcharset: "acceptCharset",
    "accept-charset": "acceptCharset",
    accesskey: "accessKey",
    action: "action",
    allowfullscreen: "allowFullScreen",
    alt: "alt",
    as: "as",
    async: "async",
    autocapitalize: "autoCapitalize",
    autocomplete: "autoComplete",
    autocorrect: "autoCorrect",
    autofocus: "autoFocus",
    autoplay: "autoPlay",
    autosave: "autoSave",
    capture: "capture",
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    challenge: "challenge",
    charset: "charSet",
    checked: "checked",
    children: "children",
    cite: "cite",
    class: "className",
    classid: "classID",
    classname: "className",
    cols: "cols",
    colspan: "colSpan",
    content: "content",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    controls: "controls",
    controlslist: "controlsList",
    coords: "coords",
    crossorigin: "crossOrigin",
    dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
    data: "data",
    datetime: "dateTime",
    default: "default",
    defaultchecked: "defaultChecked",
    defaultvalue: "defaultValue",
    defer: "defer",
    dir: "dir",
    disabled: "disabled",
    disablepictureinpicture: "disablePictureInPicture",
    disableremoteplayback: "disableRemotePlayback",
    download: "download",
    draggable: "draggable",
    enctype: "encType",
    enterkeyhint: "enterKeyHint",
    for: "htmlFor",
    form: "form",
    formmethod: "formMethod",
    formaction: "formAction",
    formenctype: "formEncType",
    formnovalidate: "formNoValidate",
    formtarget: "formTarget",
    frameborder: "frameBorder",
    headers: "headers",
    height: "height",
    hidden: "hidden",
    high: "high",
    href: "href",
    hreflang: "hrefLang",
    htmlfor: "htmlFor",
    httpequiv: "httpEquiv",
    "http-equiv": "httpEquiv",
    icon: "icon",
    id: "id",
    imagesizes: "imageSizes",
    imagesrcset: "imageSrcSet",
    innerhtml: "innerHTML",
    inputmode: "inputMode",
    integrity: "integrity",
    is: "is",
    itemid: "itemID",
    itemprop: "itemProp",
    itemref: "itemRef",
    itemscope: "itemScope",
    itemtype: "itemType",
    keyparams: "keyParams",
    keytype: "keyType",
    kind: "kind",
    label: "label",
    lang: "lang",
    list: "list",
    loop: "loop",
    low: "low",
    manifest: "manifest",
    marginwidth: "marginWidth",
    marginheight: "marginHeight",
    max: "max",
    maxlength: "maxLength",
    media: "media",
    mediagroup: "mediaGroup",
    method: "method",
    min: "min",
    minlength: "minLength",
    multiple: "multiple",
    muted: "muted",
    name: "name",
    nomodule: "noModule",
    nonce: "nonce",
    novalidate: "noValidate",
    open: "open",
    optimum: "optimum",
    pattern: "pattern",
    placeholder: "placeholder",
    playsinline: "playsInline",
    poster: "poster",
    preload: "preload",
    profile: "profile",
    radiogroup: "radioGroup",
    readonly: "readOnly",
    referrerpolicy: "referrerPolicy",
    rel: "rel",
    required: "required",
    reversed: "reversed",
    role: "role",
    rows: "rows",
    rowspan: "rowSpan",
    sandbox: "sandbox",
    scope: "scope",
    scoped: "scoped",
    scrolling: "scrolling",
    seamless: "seamless",
    selected: "selected",
    shape: "shape",
    size: "size",
    sizes: "sizes",
    span: "span",
    spellcheck: "spellCheck",
    src: "src",
    srcdoc: "srcDoc",
    srclang: "srcLang",
    srcset: "srcSet",
    start: "start",
    step: "step",
    style: "style",
    summary: "summary",
    tabindex: "tabIndex",
    target: "target",
    title: "title",
    type: "type",
    usemap: "useMap",
    value: "value",
    width: "width",
    wmode: "wmode",
    wrap: "wrap",
    // SVG
    about: "about",
    accentheight: "accentHeight",
    "accent-height": "accentHeight",
    accumulate: "accumulate",
    additive: "additive",
    alignmentbaseline: "alignmentBaseline",
    "alignment-baseline": "alignmentBaseline",
    allowreorder: "allowReorder",
    alphabetic: "alphabetic",
    amplitude: "amplitude",
    arabicform: "arabicForm",
    "arabic-form": "arabicForm",
    ascent: "ascent",
    attributename: "attributeName",
    attributetype: "attributeType",
    autoreverse: "autoReverse",
    azimuth: "azimuth",
    basefrequency: "baseFrequency",
    baselineshift: "baselineShift",
    "baseline-shift": "baselineShift",
    baseprofile: "baseProfile",
    bbox: "bbox",
    begin: "begin",
    bias: "bias",
    by: "by",
    calcmode: "calcMode",
    capheight: "capHeight",
    "cap-height": "capHeight",
    clip: "clip",
    clippath: "clipPath",
    "clip-path": "clipPath",
    clippathunits: "clipPathUnits",
    cliprule: "clipRule",
    "clip-rule": "clipRule",
    color: "color",
    colorinterpolation: "colorInterpolation",
    "color-interpolation": "colorInterpolation",
    colorinterpolationfilters: "colorInterpolationFilters",
    "color-interpolation-filters": "colorInterpolationFilters",
    colorprofile: "colorProfile",
    "color-profile": "colorProfile",
    colorrendering: "colorRendering",
    "color-rendering": "colorRendering",
    contentscripttype: "contentScriptType",
    contentstyletype: "contentStyleType",
    cursor: "cursor",
    cx: "cx",
    cy: "cy",
    d: "d",
    datatype: "datatype",
    decelerate: "decelerate",
    descent: "descent",
    diffuseconstant: "diffuseConstant",
    direction: "direction",
    display: "display",
    divisor: "divisor",
    dominantbaseline: "dominantBaseline",
    "dominant-baseline": "dominantBaseline",
    dur: "dur",
    dx: "dx",
    dy: "dy",
    edgemode: "edgeMode",
    elevation: "elevation",
    enablebackground: "enableBackground",
    "enable-background": "enableBackground",
    end: "end",
    exponent: "exponent",
    externalresourcesrequired: "externalResourcesRequired",
    fill: "fill",
    fillopacity: "fillOpacity",
    "fill-opacity": "fillOpacity",
    fillrule: "fillRule",
    "fill-rule": "fillRule",
    filter: "filter",
    filterres: "filterRes",
    filterunits: "filterUnits",
    floodopacity: "floodOpacity",
    "flood-opacity": "floodOpacity",
    floodcolor: "floodColor",
    "flood-color": "floodColor",
    focusable: "focusable",
    fontfamily: "fontFamily",
    "font-family": "fontFamily",
    fontsize: "fontSize",
    "font-size": "fontSize",
    fontsizeadjust: "fontSizeAdjust",
    "font-size-adjust": "fontSizeAdjust",
    fontstretch: "fontStretch",
    "font-stretch": "fontStretch",
    fontstyle: "fontStyle",
    "font-style": "fontStyle",
    fontvariant: "fontVariant",
    "font-variant": "fontVariant",
    fontweight: "fontWeight",
    "font-weight": "fontWeight",
    format: "format",
    from: "from",
    fx: "fx",
    fy: "fy",
    g1: "g1",
    g2: "g2",
    glyphname: "glyphName",
    "glyph-name": "glyphName",
    glyphorientationhorizontal: "glyphOrientationHorizontal",
    "glyph-orientation-horizontal": "glyphOrientationHorizontal",
    glyphorientationvertical: "glyphOrientationVertical",
    "glyph-orientation-vertical": "glyphOrientationVertical",
    glyphref: "glyphRef",
    gradienttransform: "gradientTransform",
    gradientunits: "gradientUnits",
    hanging: "hanging",
    horizadvx: "horizAdvX",
    "horiz-adv-x": "horizAdvX",
    horizoriginx: "horizOriginX",
    "horiz-origin-x": "horizOriginX",
    ideographic: "ideographic",
    imagerendering: "imageRendering",
    "image-rendering": "imageRendering",
    in2: "in2",
    in: "in",
    inlist: "inlist",
    intercept: "intercept",
    k1: "k1",
    k2: "k2",
    k3: "k3",
    k4: "k4",
    k: "k",
    kernelmatrix: "kernelMatrix",
    kernelunitlength: "kernelUnitLength",
    kerning: "kerning",
    keypoints: "keyPoints",
    keysplines: "keySplines",
    keytimes: "keyTimes",
    lengthadjust: "lengthAdjust",
    letterspacing: "letterSpacing",
    "letter-spacing": "letterSpacing",
    lightingcolor: "lightingColor",
    "lighting-color": "lightingColor",
    limitingconeangle: "limitingConeAngle",
    local: "local",
    markerend: "markerEnd",
    "marker-end": "markerEnd",
    markerheight: "markerHeight",
    markermid: "markerMid",
    "marker-mid": "markerMid",
    markerstart: "markerStart",
    "marker-start": "markerStart",
    markerunits: "markerUnits",
    markerwidth: "markerWidth",
    mask: "mask",
    maskcontentunits: "maskContentUnits",
    maskunits: "maskUnits",
    mathematical: "mathematical",
    mode: "mode",
    numoctaves: "numOctaves",
    offset: "offset",
    opacity: "opacity",
    operator: "operator",
    order: "order",
    orient: "orient",
    orientation: "orientation",
    origin: "origin",
    overflow: "overflow",
    overlineposition: "overlinePosition",
    "overline-position": "overlinePosition",
    overlinethickness: "overlineThickness",
    "overline-thickness": "overlineThickness",
    paintorder: "paintOrder",
    "paint-order": "paintOrder",
    panose1: "panose1",
    "panose-1": "panose1",
    pathlength: "pathLength",
    patterncontentunits: "patternContentUnits",
    patterntransform: "patternTransform",
    patternunits: "patternUnits",
    pointerevents: "pointerEvents",
    "pointer-events": "pointerEvents",
    points: "points",
    pointsatx: "pointsAtX",
    pointsaty: "pointsAtY",
    pointsatz: "pointsAtZ",
    prefix: "prefix",
    preservealpha: "preserveAlpha",
    preserveaspectratio: "preserveAspectRatio",
    primitiveunits: "primitiveUnits",
    property: "property",
    r: "r",
    radius: "radius",
    refx: "refX",
    refy: "refY",
    renderingintent: "renderingIntent",
    "rendering-intent": "renderingIntent",
    repeatcount: "repeatCount",
    repeatdur: "repeatDur",
    requiredextensions: "requiredExtensions",
    requiredfeatures: "requiredFeatures",
    resource: "resource",
    restart: "restart",
    result: "result",
    results: "results",
    rotate: "rotate",
    rx: "rx",
    ry: "ry",
    scale: "scale",
    security: "security",
    seed: "seed",
    shaperendering: "shapeRendering",
    "shape-rendering": "shapeRendering",
    slope: "slope",
    spacing: "spacing",
    specularconstant: "specularConstant",
    specularexponent: "specularExponent",
    speed: "speed",
    spreadmethod: "spreadMethod",
    startoffset: "startOffset",
    stddeviation: "stdDeviation",
    stemh: "stemh",
    stemv: "stemv",
    stitchtiles: "stitchTiles",
    stopcolor: "stopColor",
    "stop-color": "stopColor",
    stopopacity: "stopOpacity",
    "stop-opacity": "stopOpacity",
    strikethroughposition: "strikethroughPosition",
    "strikethrough-position": "strikethroughPosition",
    strikethroughthickness: "strikethroughThickness",
    "strikethrough-thickness": "strikethroughThickness",
    string: "string",
    stroke: "stroke",
    strokedasharray: "strokeDasharray",
    "stroke-dasharray": "strokeDasharray",
    strokedashoffset: "strokeDashoffset",
    "stroke-dashoffset": "strokeDashoffset",
    strokelinecap: "strokeLinecap",
    "stroke-linecap": "strokeLinecap",
    strokelinejoin: "strokeLinejoin",
    "stroke-linejoin": "strokeLinejoin",
    strokemiterlimit: "strokeMiterlimit",
    "stroke-miterlimit": "strokeMiterlimit",
    strokewidth: "strokeWidth",
    "stroke-width": "strokeWidth",
    strokeopacity: "strokeOpacity",
    "stroke-opacity": "strokeOpacity",
    suppresscontenteditablewarning: "suppressContentEditableWarning",
    suppresshydrationwarning: "suppressHydrationWarning",
    surfacescale: "surfaceScale",
    systemlanguage: "systemLanguage",
    tablevalues: "tableValues",
    targetx: "targetX",
    targety: "targetY",
    textanchor: "textAnchor",
    "text-anchor": "textAnchor",
    textdecoration: "textDecoration",
    "text-decoration": "textDecoration",
    textlength: "textLength",
    textrendering: "textRendering",
    "text-rendering": "textRendering",
    to: "to",
    transform: "transform",
    typeof: "typeof",
    u1: "u1",
    u2: "u2",
    underlineposition: "underlinePosition",
    "underline-position": "underlinePosition",
    underlinethickness: "underlineThickness",
    "underline-thickness": "underlineThickness",
    unicode: "unicode",
    unicodebidi: "unicodeBidi",
    "unicode-bidi": "unicodeBidi",
    unicoderange: "unicodeRange",
    "unicode-range": "unicodeRange",
    unitsperem: "unitsPerEm",
    "units-per-em": "unitsPerEm",
    unselectable: "unselectable",
    valphabetic: "vAlphabetic",
    "v-alphabetic": "vAlphabetic",
    values: "values",
    vectoreffect: "vectorEffect",
    "vector-effect": "vectorEffect",
    version: "version",
    vertadvy: "vertAdvY",
    "vert-adv-y": "vertAdvY",
    vertoriginx: "vertOriginX",
    "vert-origin-x": "vertOriginX",
    vertoriginy: "vertOriginY",
    "vert-origin-y": "vertOriginY",
    vhanging: "vHanging",
    "v-hanging": "vHanging",
    videographic: "vIdeographic",
    "v-ideographic": "vIdeographic",
    viewbox: "viewBox",
    viewtarget: "viewTarget",
    visibility: "visibility",
    vmathematical: "vMathematical",
    "v-mathematical": "vMathematical",
    vocab: "vocab",
    widths: "widths",
    wordspacing: "wordSpacing",
    "word-spacing": "wordSpacing",
    writingmode: "writingMode",
    "writing-mode": "writingMode",
    x1: "x1",
    x2: "x2",
    x: "x",
    xchannelselector: "xChannelSelector",
    xheight: "xHeight",
    "x-height": "xHeight",
    xlinkactuate: "xlinkActuate",
    "xlink:actuate": "xlinkActuate",
    xlinkarcrole: "xlinkArcrole",
    "xlink:arcrole": "xlinkArcrole",
    xlinkhref: "xlinkHref",
    "xlink:href": "xlinkHref",
    xlinkrole: "xlinkRole",
    "xlink:role": "xlinkRole",
    xlinkshow: "xlinkShow",
    "xlink:show": "xlinkShow",
    xlinktitle: "xlinkTitle",
    "xlink:title": "xlinkTitle",
    xlinktype: "xlinkType",
    "xlink:type": "xlinkType",
    xmlbase: "xmlBase",
    "xml:base": "xmlBase",
    xmllang: "xmlLang",
    "xml:lang": "xmlLang",
    xmlns: "xmlns",
    "xml:space": "xmlSpace",
    xmlnsxlink: "xmlnsXlink",
    "xmlns:xlink": "xmlnsXlink",
    xmlspace: "xmlSpace",
    y1: "y1",
    y2: "y2",
    y: "y",
    ychannelselector: "yChannelSelector",
    z: "z",
    zoomandpan: "zoomAndPan"
  }, tm = {
    "aria-current": 0,
    // state
    "aria-description": 0,
    "aria-details": 0,
    "aria-disabled": 0,
    // state
    "aria-hidden": 0,
    // state
    "aria-invalid": 0,
    // state
    "aria-keyshortcuts": 0,
    "aria-label": 0,
    "aria-roledescription": 0,
    // Widget Attributes
    "aria-autocomplete": 0,
    "aria-checked": 0,
    "aria-expanded": 0,
    "aria-haspopup": 0,
    "aria-level": 0,
    "aria-modal": 0,
    "aria-multiline": 0,
    "aria-multiselectable": 0,
    "aria-orientation": 0,
    "aria-placeholder": 0,
    "aria-pressed": 0,
    "aria-readonly": 0,
    "aria-required": 0,
    "aria-selected": 0,
    "aria-sort": 0,
    "aria-valuemax": 0,
    "aria-valuemin": 0,
    "aria-valuenow": 0,
    "aria-valuetext": 0,
    // Live Region Attributes
    "aria-atomic": 0,
    "aria-busy": 0,
    "aria-live": 0,
    "aria-relevant": 0,
    // Drag-and-Drop Attributes
    "aria-dropeffect": 0,
    "aria-grabbed": 0,
    // Relationship Attributes
    "aria-activedescendant": 0,
    "aria-colcount": 0,
    "aria-colindex": 0,
    "aria-colspan": 0,
    "aria-controls": 0,
    "aria-describedby": 0,
    "aria-errormessage": 0,
    "aria-flowto": 0,
    "aria-labelledby": 0,
    "aria-owns": 0,
    "aria-posinset": 0,
    "aria-rowcount": 0,
    "aria-rowindex": 0,
    "aria-rowspan": 0,
    "aria-setsize": 0
  }, ao = {}, JE = new RegExp("^(aria)-[" + oe + "]*$"), ZE = new RegExp("^(aria)[A-Z][" + oe + "]*$");
  function eC(e, t) {
    {
      if (rn.call(ao, t) && ao[t])
        return !0;
      if (ZE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = tm.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ao[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ao[t] = !0, !0;
      }
      if (JE.test(t)) {
        var r = t.toLowerCase(), i = tm.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ao[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ao[t] = !0, !0;
      }
    }
    return !0;
  }
  function tC(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = eC(e, a);
        r || n.push(a);
      }
      var i = n.map(function(o) {
        return "`" + o + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function nC(e, t) {
    bi(e, t) || tC(e, t);
  }
  var nm = !1;
  function aC(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !nm && (nm = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var am = function() {
  };
  {
    var mn = {}, rm = /^on./, rC = /^on[^A-Z]/, iC = new RegExp("^(aria)-[" + oe + "]*$"), oC = new RegExp("^(aria)[A-Z][" + oe + "]*$");
    am = function(e, t, n, a) {
      if (rn.call(mn, t) && mn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), mn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, o = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var l = o.hasOwnProperty(r) ? o[r] : null;
        if (l != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, l), mn[t] = !0, !0;
        if (rm.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), mn[t] = !0, !0;
      } else if (rm.test(t))
        return rC.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), mn[t] = !0, !0;
      if (iC.test(t) || oC.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), mn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), mn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), mn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), mn[t] = !0, !0;
      var u = Bn(t), d = u !== null && u.type === na;
      if (hs.hasOwnProperty(r)) {
        var p = hs[r];
        if (p !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, p), mn[t] = !0, !0;
      } else if (!d && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), mn[t] = !0, !0;
      return typeof n == "boolean" && Dn(t, n, u, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), mn[t] = !0, !0) : d ? !0 : Dn(t, n, u, !1) ? (mn[t] = !0, !1) : ((n === "false" || n === "true") && u !== null && u.type === gt && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), mn[t] = !0), !0);
    };
  }
  var lC = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = am(e, r, t[r], n);
        i || a.push(r);
      }
      var o = a.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      a.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", o, e) : a.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", o, e);
    }
  };
  function uC(e, t, n) {
    bi(e, t) || lC(e, t, n);
  }
  var im = 1, Ff = 2, gl = 4, sC = im | Ff | gl, bl = null;
  function cC(e) {
    bl !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), bl = e;
  }
  function fC() {
    bl === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), bl = null;
  }
  function dC(e) {
    return e === bl;
  }
  function Vf(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === ur ? t.parentNode : t;
  }
  var Bf = null, ro = null, io = null;
  function om(e) {
    var t = Gr(e);
    if (t) {
      if (typeof Bf != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = Js(n);
        Bf(t.stateNode, t.type, a);
      }
    }
  }
  function vC(e) {
    Bf = e;
  }
  function lm(e) {
    ro ? io ? io.push(e) : io = [e] : ro = e;
  }
  function pC() {
    return ro !== null || io !== null;
  }
  function um() {
    if (ro) {
      var e = ro, t = io;
      if (ro = null, io = null, om(e), t)
        for (var n = 0; n < t.length; n++)
          om(t[n]);
    }
  }
  var sm = function(e, t) {
    return e(t);
  }, cm = function() {
  }, Pf = !1;
  function hC() {
    var e = pC();
    e && (cm(), um());
  }
  function fm(e, t, n) {
    if (Pf)
      return e(t, n);
    Pf = !0;
    try {
      return sm(e, t, n);
    } finally {
      Pf = !1, hC();
    }
  }
  function mC(e, t, n) {
    sm = e, cm = n;
  }
  function yC(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function gC(e, t, n) {
    switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        return !!(n.disabled && yC(t));
      default:
        return !1;
    }
  }
  function Sl(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var a = Js(n);
    if (a === null)
      return null;
    var r = a[t];
    if (gC(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var $f = !1;
  if (Et)
    try {
      var El = {};
      Object.defineProperty(El, "passive", {
        get: function() {
          $f = !0;
        }
      }), window.addEventListener("test", El, El), window.removeEventListener("test", El, El);
    } catch {
      $f = !1;
    }
  function dm(e, t, n, a, r, i, o, l, u) {
    var d = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, d);
    } catch (p) {
      this.onError(p);
    }
  }
  var vm = dm;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var Yf = document.createElement("react");
    vm = function(t, n, a, r, i, o, l, u, d) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var p = document.createEvent("Event"), S = !1, b = !0, x = window.event, D = Object.getOwnPropertyDescriptor(window, "event");
      function M() {
        Yf.removeEventListener(L, le, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = x);
      }
      var X = Array.prototype.slice.call(arguments, 3);
      function le() {
        S = !0, M(), n.apply(a, X), b = !1;
      }
      var re, ke = !1, Oe = !1;
      function C(R) {
        if (re = R.error, ke = !0, re === null && R.colno === 0 && R.lineno === 0 && (Oe = !0), R.defaultPrevented && re != null && typeof re == "object")
          try {
            re._suppressLogging = !0;
          } catch {
          }
      }
      var L = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", C), Yf.addEventListener(L, le, !1), p.initEvent(L, !1, !1), Yf.dispatchEvent(p), D && Object.defineProperty(window, "event", D), S && b && (ke ? Oe && (re = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : re = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(re)), window.removeEventListener("error", C), !S)
        return M(), dm.apply(this, arguments);
    };
  }
  var bC = vm, oo = !1, ms = null, ys = !1, If = null, SC = {
    onError: function(e) {
      oo = !0, ms = e;
    }
  };
  function qf(e, t, n, a, r, i, o, l, u) {
    oo = !1, ms = null, bC.apply(SC, arguments);
  }
  function EC(e, t, n, a, r, i, o, l, u) {
    if (qf.apply(this, arguments), oo) {
      var d = Gf();
      ys || (ys = !0, If = d);
    }
  }
  function CC() {
    if (ys) {
      var e = If;
      throw ys = !1, If = null, e;
    }
  }
  function RC() {
    return oo;
  }
  function Gf() {
    if (oo) {
      var e = ms;
      return oo = !1, ms = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function lo(e) {
    return e._reactInternals;
  }
  function TC(e) {
    return e._reactInternals !== void 0;
  }
  function xC(e, t) {
    e._reactInternals = t;
  }
  var fe = (
    /*                      */
    0
  ), uo = (
    /*                */
    1
  ), Rt = (
    /*                    */
    2
  ), ze = (
    /*                       */
    4
  ), Si = (
    /*                */
    16
  ), Cl = (
    /*                 */
    32
  ), Wf = (
    /*                     */
    64
  ), $e = (
    /*                   */
    128
  ), cr = (
    /*            */
    256
  ), Vr = (
    /*                          */
    512
  ), Ei = (
    /*                     */
    1024
  ), ga = (
    /*                      */
    2048
  ), fr = (
    /*                    */
    4096
  ), Ci = (
    /*                   */
    8192
  ), gs = (
    /*             */
    16384
  ), DC = ga | ze | Wf | Vr | Ei | gs, _C = (
    /*               */
    32767
  ), Rl = (
    /*                   */
    32768
  ), yn = (
    /*                */
    65536
  ), Qf = (
    /* */
    131072
  ), pm = (
    /*                       */
    1048576
  ), Kf = (
    /*                    */
    2097152
  ), Ri = (
    /*                 */
    4194304
  ), Xf = (
    /*                */
    8388608
  ), dr = (
    /*               */
    16777216
  ), bs = (
    /*              */
    33554432
  ), Jf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    ze | Ei | 0
  ), Zf = Rt | ze | Si | Cl | Vr | fr | Ci, Tl = ze | Wf | Vr | Ci, so = ga | Si, vr = Ri | Xf | Kf, wC = h.ReactCurrentOwner;
  function Ti(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Rt | fr)) !== fe && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === N ? n : null;
  }
  function hm(e) {
    if (e.tag === ue) {
      var t = e.memoizedState;
      if (t === null) {
        var n = e.alternate;
        n !== null && (t = n.memoizedState);
      }
      if (t !== null)
        return t.dehydrated;
    }
    return null;
  }
  function mm(e) {
    return e.tag === N ? e.stateNode.containerInfo : null;
  }
  function OC(e) {
    return Ti(e) === e;
  }
  function MC(e) {
    {
      var t = wC.current;
      if (t !== null && t.tag === O) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Se(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = lo(e);
    return r ? Ti(r) === r : !1;
  }
  function ym(e) {
    if (Ti(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function gm(e) {
    var t = e.alternate;
    if (!t) {
      var n = Ti(e);
      if (n === null)
        throw new Error("Unable to find node on an unmounted component.");
      return n !== e ? null : e;
    }
    for (var a = e, r = t; ; ) {
      var i = a.return;
      if (i === null)
        break;
      var o = i.alternate;
      if (o === null) {
        var l = i.return;
        if (l !== null) {
          a = r = l;
          continue;
        }
        break;
      }
      if (i.child === o.child) {
        for (var u = i.child; u; ) {
          if (u === a)
            return ym(i), e;
          if (u === r)
            return ym(i), t;
          u = u.sibling;
        }
        throw new Error("Unable to find node on an unmounted component.");
      }
      if (a.return !== r.return)
        a = i, r = o;
      else {
        for (var d = !1, p = i.child; p; ) {
          if (p === a) {
            d = !0, a = i, r = o;
            break;
          }
          if (p === r) {
            d = !0, r = i, a = o;
            break;
          }
          p = p.sibling;
        }
        if (!d) {
          for (p = o.child; p; ) {
            if (p === a) {
              d = !0, a = o, r = i;
              break;
            }
            if (p === r) {
              d = !0, r = o, a = i;
              break;
            }
            p = p.sibling;
          }
          if (!d)
            throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
        }
      }
      if (a.alternate !== r)
        throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
    }
    if (a.tag !== N)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function bm(e) {
    var t = gm(e);
    return t !== null ? Sm(t) : null;
  }
  function Sm(e) {
    if (e.tag === Y || e.tag === ee)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Sm(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function LC(e) {
    var t = gm(e);
    return t !== null ? Em(t) : null;
  }
  function Em(e) {
    if (e.tag === Y || e.tag === ee)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== P) {
        var n = Em(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Cm = v.unstable_scheduleCallback, UC = v.unstable_cancelCallback, AC = v.unstable_shouldYield, NC = v.unstable_requestPaint, Pt = v.unstable_now, kC = v.unstable_getCurrentPriorityLevel, Ss = v.unstable_ImmediatePriority, ed = v.unstable_UserBlockingPriority, xi = v.unstable_NormalPriority, zC = v.unstable_LowPriority, td = v.unstable_IdlePriority, jC = v.unstable_yieldValue, HC = v.unstable_setDisableYieldValue, co = null, sn = null, Q = null, Va = !1, ba = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function FC(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      Na && (e = Le({}, e, {
        getLaneLabelMap: IC,
        injectProfilingHooks: YC
      })), co = t.inject(e), sn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function VC(e, t) {
    if (sn && typeof sn.onScheduleFiberRoot == "function")
      try {
        sn.onScheduleFiberRoot(co, e, t);
      } catch (n) {
        Va || (Va = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function BC(e, t) {
    if (sn && typeof sn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & $e) === $e;
        if (va) {
          var a;
          switch (t) {
            case In:
              a = Ss;
              break;
            case hr:
              a = ed;
              break;
            case mr:
              a = xi;
              break;
            case _s:
              a = td;
              break;
            default:
              a = xi;
              break;
          }
          sn.onCommitFiberRoot(co, e, a, n);
        }
      } catch (r) {
        Va || (Va = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function PC(e) {
    if (sn && typeof sn.onPostCommitFiberRoot == "function")
      try {
        sn.onPostCommitFiberRoot(co, e);
      } catch (t) {
        Va || (Va = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function $C(e) {
    if (sn && typeof sn.onCommitFiberUnmount == "function")
      try {
        sn.onCommitFiberUnmount(co, e);
      } catch (t) {
        Va || (Va = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function $t(e) {
    if (typeof jC == "function" && (HC(e), E(e)), sn && typeof sn.setStrictMode == "function")
      try {
        sn.setStrictMode(co, e);
      } catch (t) {
        Va || (Va = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function YC(e) {
    Q = e;
  }
  function IC() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < ad; n++) {
        var a = fR(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function qC(e) {
    Q !== null && typeof Q.markCommitStarted == "function" && Q.markCommitStarted(e);
  }
  function Rm() {
    Q !== null && typeof Q.markCommitStopped == "function" && Q.markCommitStopped();
  }
  function xl(e) {
    Q !== null && typeof Q.markComponentRenderStarted == "function" && Q.markComponentRenderStarted(e);
  }
  function fo() {
    Q !== null && typeof Q.markComponentRenderStopped == "function" && Q.markComponentRenderStopped();
  }
  function GC(e) {
    Q !== null && typeof Q.markComponentPassiveEffectMountStarted == "function" && Q.markComponentPassiveEffectMountStarted(e);
  }
  function WC() {
    Q !== null && typeof Q.markComponentPassiveEffectMountStopped == "function" && Q.markComponentPassiveEffectMountStopped();
  }
  function QC(e) {
    Q !== null && typeof Q.markComponentPassiveEffectUnmountStarted == "function" && Q.markComponentPassiveEffectUnmountStarted(e);
  }
  function KC() {
    Q !== null && typeof Q.markComponentPassiveEffectUnmountStopped == "function" && Q.markComponentPassiveEffectUnmountStopped();
  }
  function XC(e) {
    Q !== null && typeof Q.markComponentLayoutEffectMountStarted == "function" && Q.markComponentLayoutEffectMountStarted(e);
  }
  function JC() {
    Q !== null && typeof Q.markComponentLayoutEffectMountStopped == "function" && Q.markComponentLayoutEffectMountStopped();
  }
  function Tm(e) {
    Q !== null && typeof Q.markComponentLayoutEffectUnmountStarted == "function" && Q.markComponentLayoutEffectUnmountStarted(e);
  }
  function xm() {
    Q !== null && typeof Q.markComponentLayoutEffectUnmountStopped == "function" && Q.markComponentLayoutEffectUnmountStopped();
  }
  function ZC(e, t, n) {
    Q !== null && typeof Q.markComponentErrored == "function" && Q.markComponentErrored(e, t, n);
  }
  function eR(e, t, n) {
    Q !== null && typeof Q.markComponentSuspended == "function" && Q.markComponentSuspended(e, t, n);
  }
  function tR(e) {
    Q !== null && typeof Q.markLayoutEffectsStarted == "function" && Q.markLayoutEffectsStarted(e);
  }
  function nR() {
    Q !== null && typeof Q.markLayoutEffectsStopped == "function" && Q.markLayoutEffectsStopped();
  }
  function aR(e) {
    Q !== null && typeof Q.markPassiveEffectsStarted == "function" && Q.markPassiveEffectsStarted(e);
  }
  function rR() {
    Q !== null && typeof Q.markPassiveEffectsStopped == "function" && Q.markPassiveEffectsStopped();
  }
  function Dm(e) {
    Q !== null && typeof Q.markRenderStarted == "function" && Q.markRenderStarted(e);
  }
  function iR() {
    Q !== null && typeof Q.markRenderYielded == "function" && Q.markRenderYielded();
  }
  function _m() {
    Q !== null && typeof Q.markRenderStopped == "function" && Q.markRenderStopped();
  }
  function oR(e) {
    Q !== null && typeof Q.markRenderScheduled == "function" && Q.markRenderScheduled(e);
  }
  function lR(e, t) {
    Q !== null && typeof Q.markForceUpdateScheduled == "function" && Q.markForceUpdateScheduled(e, t);
  }
  function nd(e, t) {
    Q !== null && typeof Q.markStateUpdateScheduled == "function" && Q.markStateUpdateScheduled(e, t);
  }
  var de = (
    /*                         */
    0
  ), Ae = (
    /*                 */
    1
  ), We = (
    /*                    */
    2
  ), Tt = (
    /*               */
    8
  ), Ba = (
    /*              */
    16
  ), wm = Math.clz32 ? Math.clz32 : cR, uR = Math.log, sR = Math.LN2;
  function cR(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (uR(t) / sR | 0) | 0;
  }
  var ad = 31, k = (
    /*                        */
    0
  ), Yt = (
    /*                          */
    0
  ), me = (
    /*                        */
    1
  ), vo = (
    /*    */
    2
  ), pr = (
    /*             */
    4
  ), Di = (
    /*            */
    8
  ), Pa = (
    /*                     */
    16
  ), Dl = (
    /*                */
    32
  ), po = (
    /*                       */
    4194240
  ), _l = (
    /*                        */
    64
  ), rd = (
    /*                        */
    128
  ), id = (
    /*                        */
    256
  ), od = (
    /*                        */
    512
  ), ld = (
    /*                        */
    1024
  ), ud = (
    /*                        */
    2048
  ), sd = (
    /*                        */
    4096
  ), cd = (
    /*                        */
    8192
  ), fd = (
    /*                        */
    16384
  ), dd = (
    /*                       */
    32768
  ), vd = (
    /*                       */
    65536
  ), pd = (
    /*                       */
    131072
  ), hd = (
    /*                       */
    262144
  ), md = (
    /*                       */
    524288
  ), yd = (
    /*                       */
    1048576
  ), gd = (
    /*                       */
    2097152
  ), Es = (
    /*                            */
    130023424
  ), ho = (
    /*                             */
    4194304
  ), bd = (
    /*                             */
    8388608
  ), Sd = (
    /*                             */
    16777216
  ), Ed = (
    /*                             */
    33554432
  ), Cd = (
    /*                             */
    67108864
  ), Om = ho, wl = (
    /*          */
    134217728
  ), Mm = (
    /*                          */
    268435455
  ), Ol = (
    /*               */
    268435456
  ), _i = (
    /*                        */
    536870912
  ), $n = (
    /*                   */
    1073741824
  );
  function fR(e) {
    {
      if (e & me)
        return "Sync";
      if (e & vo)
        return "InputContinuousHydration";
      if (e & pr)
        return "InputContinuous";
      if (e & Di)
        return "DefaultHydration";
      if (e & Pa)
        return "Default";
      if (e & Dl)
        return "TransitionHydration";
      if (e & po)
        return "Transition";
      if (e & Es)
        return "Retry";
      if (e & wl)
        return "SelectiveHydration";
      if (e & Ol)
        return "IdleHydration";
      if (e & _i)
        return "Idle";
      if (e & $n)
        return "Offscreen";
    }
  }
  var at = -1, Cs = _l, Rs = ho;
  function Ml(e) {
    switch (wi(e)) {
      case me:
        return me;
      case vo:
        return vo;
      case pr:
        return pr;
      case Di:
        return Di;
      case Pa:
        return Pa;
      case Dl:
        return Dl;
      case _l:
      case rd:
      case id:
      case od:
      case ld:
      case ud:
      case sd:
      case cd:
      case fd:
      case dd:
      case vd:
      case pd:
      case hd:
      case md:
      case yd:
      case gd:
        return e & po;
      case ho:
      case bd:
      case Sd:
      case Ed:
      case Cd:
        return e & Es;
      case wl:
        return wl;
      case Ol:
        return Ol;
      case _i:
        return _i;
      case $n:
        return $n;
      default:
        return f("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Ts(e, t) {
    var n = e.pendingLanes;
    if (n === k)
      return k;
    var a = k, r = e.suspendedLanes, i = e.pingedLanes, o = n & Mm;
    if (o !== k) {
      var l = o & ~r;
      if (l !== k)
        a = Ml(l);
      else {
        var u = o & i;
        u !== k && (a = Ml(u));
      }
    } else {
      var d = n & ~r;
      d !== k ? a = Ml(d) : i !== k && (a = Ml(i));
    }
    if (a === k)
      return k;
    if (t !== k && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === k) {
      var p = wi(a), S = wi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        p >= S || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        p === Pa && (S & po) !== k
      )
        return t;
    }
    (a & pr) !== k && (a |= n & Pa);
    var b = e.entangledLanes;
    if (b !== k)
      for (var x = e.entanglements, D = a & b; D > 0; ) {
        var M = Oi(D), X = 1 << M;
        a |= x[M], D &= ~X;
      }
    return a;
  }
  function dR(e, t) {
    for (var n = e.eventTimes, a = at; t > 0; ) {
      var r = Oi(t), i = 1 << r, o = n[r];
      o > a && (a = o), t &= ~i;
    }
    return a;
  }
  function vR(e, t) {
    switch (e) {
      case me:
      case vo:
      case pr:
        return t + 250;
      case Di:
      case Pa:
      case Dl:
      case _l:
      case rd:
      case id:
      case od:
      case ld:
      case ud:
      case sd:
      case cd:
      case fd:
      case dd:
      case vd:
      case pd:
      case hd:
      case md:
      case yd:
      case gd:
        return t + 5e3;
      case ho:
      case bd:
      case Sd:
      case Ed:
      case Cd:
        return at;
      case wl:
      case Ol:
      case _i:
      case $n:
        return at;
      default:
        return f("Should have found matching lanes. This is a bug in React."), at;
    }
  }
  function pR(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = n; o > 0; ) {
      var l = Oi(o), u = 1 << l, d = i[l];
      d === at ? ((u & a) === k || (u & r) !== k) && (i[l] = vR(u, t)) : d <= t && (e.expiredLanes |= u), o &= ~u;
    }
  }
  function hR(e) {
    return Ml(e.pendingLanes);
  }
  function Rd(e) {
    var t = e.pendingLanes & ~$n;
    return t !== k ? t : t & $n ? $n : k;
  }
  function mR(e) {
    return (e & me) !== k;
  }
  function Td(e) {
    return (e & Mm) !== k;
  }
  function Lm(e) {
    return (e & Es) === e;
  }
  function yR(e) {
    var t = me | pr | Pa;
    return (e & t) === k;
  }
  function gR(e) {
    return (e & po) === e;
  }
  function xs(e, t) {
    var n = vo | pr | Di | Pa;
    return (t & n) !== k;
  }
  function bR(e, t) {
    return (t & e.expiredLanes) !== k;
  }
  function Um(e) {
    return (e & po) !== k;
  }
  function Am() {
    var e = Cs;
    return Cs <<= 1, (Cs & po) === k && (Cs = _l), e;
  }
  function SR() {
    var e = Rs;
    return Rs <<= 1, (Rs & Es) === k && (Rs = ho), e;
  }
  function wi(e) {
    return e & -e;
  }
  function Ll(e) {
    return wi(e);
  }
  function Oi(e) {
    return 31 - wm(e);
  }
  function xd(e) {
    return Oi(e);
  }
  function Yn(e, t) {
    return (e & t) !== k;
  }
  function mo(e, t) {
    return (e & t) === t;
  }
  function Te(e, t) {
    return e | t;
  }
  function Ds(e, t) {
    return e & ~t;
  }
  function Nm(e, t) {
    return e & t;
  }
  function SL(e) {
    return e;
  }
  function ER(e, t) {
    return e !== Yt && e < t ? e : t;
  }
  function Dd(e) {
    for (var t = [], n = 0; n < ad; n++)
      t.push(e);
    return t;
  }
  function Ul(e, t, n) {
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = k, e.pingedLanes = k);
    var a = e.eventTimes, r = xd(t);
    a[r] = n;
  }
  function CR(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Oi(a), i = 1 << r;
      n[r] = at, a &= ~i;
    }
  }
  function km(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function RR(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = k, e.pingedLanes = k, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, o = n; o > 0; ) {
      var l = Oi(o), u = 1 << l;
      a[l] = k, r[l] = at, i[l] = at, o &= ~u;
    }
  }
  function _d(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Oi(r), o = 1 << i;
      // Is this one of the newly entangled lanes?
      o & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~o;
    }
  }
  function TR(e, t) {
    var n = wi(t), a;
    switch (n) {
      case pr:
        a = vo;
        break;
      case Pa:
        a = Di;
        break;
      case _l:
      case rd:
      case id:
      case od:
      case ld:
      case ud:
      case sd:
      case cd:
      case fd:
      case dd:
      case vd:
      case pd:
      case hd:
      case md:
      case yd:
      case gd:
      case ho:
      case bd:
      case Sd:
      case Ed:
      case Cd:
        a = Dl;
        break;
      case _i:
        a = Ol;
        break;
      default:
        a = Yt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Yt ? Yt : a;
  }
  function zm(e, t, n) {
    if (ba)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = xd(n), i = 1 << r, o = a[r];
        o.add(t), n &= ~i;
      }
  }
  function jm(e, t) {
    if (ba)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = xd(t), i = 1 << r, o = n[r];
        o.size > 0 && (o.forEach(function(l) {
          var u = l.alternate;
          (u === null || !a.has(u)) && a.add(l);
        }), o.clear()), t &= ~i;
      }
  }
  function Hm(e, t) {
    return null;
  }
  var In = me, hr = pr, mr = Pa, _s = _i, Al = Yt;
  function Sa() {
    return Al;
  }
  function It(e) {
    Al = e;
  }
  function xR(e, t) {
    var n = Al;
    try {
      return Al = e, t();
    } finally {
      Al = n;
    }
  }
  function DR(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function _R(e, t) {
    return e === 0 || e > t ? e : t;
  }
  function wd(e, t) {
    return e !== 0 && e < t;
  }
  function Fm(e) {
    var t = wi(e);
    return wd(In, t) ? wd(hr, t) ? Td(t) ? mr : _s : hr : In;
  }
  function ws(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Vm;
  function wR(e) {
    Vm = e;
  }
  function OR(e) {
    Vm(e);
  }
  var Od;
  function MR(e) {
    Od = e;
  }
  var Bm;
  function LR(e) {
    Bm = e;
  }
  var Pm;
  function UR(e) {
    Pm = e;
  }
  var $m;
  function AR(e) {
    $m = e;
  }
  var Md = !1, Os = [], Br = null, Pr = null, $r = null, Nl = /* @__PURE__ */ new Map(), kl = /* @__PURE__ */ new Map(), Yr = [], NR = [
    "mousedown",
    "mouseup",
    "touchcancel",
    "touchend",
    "touchstart",
    "auxclick",
    "dblclick",
    "pointercancel",
    "pointerdown",
    "pointerup",
    "dragend",
    "dragstart",
    "drop",
    "compositionend",
    "compositionstart",
    "keydown",
    "keypress",
    "keyup",
    "input",
    "textInput",
    // Intentionally camelCase
    "copy",
    "cut",
    "paste",
    "click",
    "change",
    "contextmenu",
    "reset",
    "submit"
  ];
  function kR(e) {
    return NR.indexOf(e) > -1;
  }
  function zR(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Ym(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Br = null;
        break;
      case "dragenter":
      case "dragleave":
        Pr = null;
        break;
      case "mouseover":
      case "mouseout":
        $r = null;
        break;
      case "pointerover":
      case "pointerout": {
        var n = t.pointerId;
        Nl.delete(n);
        break;
      }
      case "gotpointercapture":
      case "lostpointercapture": {
        var a = t.pointerId;
        kl.delete(a);
        break;
      }
    }
  }
  function zl(e, t, n, a, r, i) {
    if (e === null || e.nativeEvent !== i) {
      var o = zR(t, n, a, r, i);
      if (t !== null) {
        var l = Gr(t);
        l !== null && Od(l);
      }
      return o;
    }
    e.eventSystemFlags |= a;
    var u = e.targetContainers;
    return r !== null && u.indexOf(r) === -1 && u.push(r), e;
  }
  function jR(e, t, n, a, r) {
    switch (t) {
      case "focusin": {
        var i = r;
        return Br = zl(Br, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var o = r;
        return Pr = zl(Pr, e, t, n, a, o), !0;
      }
      case "mouseover": {
        var l = r;
        return $r = zl($r, e, t, n, a, l), !0;
      }
      case "pointerover": {
        var u = r, d = u.pointerId;
        return Nl.set(d, zl(Nl.get(d) || null, e, t, n, a, u)), !0;
      }
      case "gotpointercapture": {
        var p = r, S = p.pointerId;
        return kl.set(S, zl(kl.get(S) || null, e, t, n, a, p)), !0;
      }
    }
    return !1;
  }
  function Im(e) {
    var t = Ui(e.target);
    if (t !== null) {
      var n = Ti(t);
      if (n !== null) {
        var a = n.tag;
        if (a === ue) {
          var r = hm(n);
          if (r !== null) {
            e.blockedOn = r, $m(e.priority, function() {
              Bm(n);
            });
            return;
          }
        } else if (a === N) {
          var i = n.stateNode;
          if (ws(i)) {
            e.blockedOn = mm(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function HR(e) {
    for (var t = Pm(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < Yr.length && wd(t, Yr[a].priority); a++)
      ;
    Yr.splice(a, 0, n), a === 0 && Im(n);
  }
  function Ms(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Ad(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        cC(i), r.target.dispatchEvent(i), fC();
      } else {
        var o = Gr(a);
        return o !== null && Od(o), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function qm(e, t, n) {
    Ms(e) && n.delete(t);
  }
  function FR() {
    Md = !1, Br !== null && Ms(Br) && (Br = null), Pr !== null && Ms(Pr) && (Pr = null), $r !== null && Ms($r) && ($r = null), Nl.forEach(qm), kl.forEach(qm);
  }
  function jl(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Md || (Md = !0, v.unstable_scheduleCallback(v.unstable_NormalPriority, FR)));
  }
  function Hl(e) {
    if (Os.length > 0) {
      jl(Os[0], e);
      for (var t = 1; t < Os.length; t++) {
        var n = Os[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Br !== null && jl(Br, e), Pr !== null && jl(Pr, e), $r !== null && jl($r, e);
    var a = function(l) {
      return jl(l, e);
    };
    Nl.forEach(a), kl.forEach(a);
    for (var r = 0; r < Yr.length; r++) {
      var i = Yr[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; Yr.length > 0; ) {
      var o = Yr[0];
      if (o.blockedOn !== null)
        break;
      Im(o), o.blockedOn === null && Yr.shift();
    }
  }
  var yo = h.ReactCurrentBatchConfig, Ld = !0;
  function Gm(e) {
    Ld = !!e;
  }
  function VR() {
    return Ld;
  }
  function BR(e, t, n) {
    var a = Wm(t), r;
    switch (a) {
      case In:
        r = PR;
        break;
      case hr:
        r = $R;
        break;
      case mr:
      default:
        r = Ud;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function PR(e, t, n, a) {
    var r = Sa(), i = yo.transition;
    yo.transition = null;
    try {
      It(In), Ud(e, t, n, a);
    } finally {
      It(r), yo.transition = i;
    }
  }
  function $R(e, t, n, a) {
    var r = Sa(), i = yo.transition;
    yo.transition = null;
    try {
      It(hr), Ud(e, t, n, a);
    } finally {
      It(r), yo.transition = i;
    }
  }
  function Ud(e, t, n, a) {
    Ld && YR(e, t, n, a);
  }
  function YR(e, t, n, a) {
    var r = Ad(e, t, n, a);
    if (r === null) {
      Gd(e, t, a, Ls, n), Ym(e, a);
      return;
    }
    if (jR(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Ym(e, a), t & gl && kR(e)) {
      for (; r !== null; ) {
        var i = Gr(r);
        i !== null && OR(i);
        var o = Ad(e, t, n, a);
        if (o === null && Gd(e, t, a, Ls, n), o === r)
          break;
        r = o;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Gd(e, t, a, null, n);
  }
  var Ls = null;
  function Ad(e, t, n, a) {
    Ls = null;
    var r = Vf(a), i = Ui(r);
    if (i !== null) {
      var o = Ti(i);
      if (o === null)
        i = null;
      else {
        var l = o.tag;
        if (l === ue) {
          var u = hm(o);
          if (u !== null)
            return u;
          i = null;
        } else if (l === N) {
          var d = o.stateNode;
          if (ws(d))
            return mm(o);
          i = null;
        } else
          o !== i && (i = null);
      }
    }
    return Ls = i, null;
  }
  function Wm(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return In;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return hr;
      case "message": {
        var t = kC();
        switch (t) {
          case Ss:
            return In;
          case ed:
            return hr;
          case xi:
          case zC:
            return mr;
          case td:
            return _s;
          default:
            return mr;
        }
      }
      default:
        return mr;
    }
  }
  function IR(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function qR(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function GR(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function WR(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Fl = null, Nd = null, Vl = null;
  function QR(e) {
    return Fl = e, Nd = Km(), !0;
  }
  function KR() {
    Fl = null, Nd = null, Vl = null;
  }
  function Qm() {
    if (Vl)
      return Vl;
    var e, t = Nd, n = t.length, a, r = Km(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var o = n - e;
    for (a = 1; a <= o && t[n - a] === r[i - a]; a++)
      ;
    var l = a > 1 ? 1 - a : void 0;
    return Vl = r.slice(e, l), Vl;
  }
  function Km() {
    return "value" in Fl ? Fl.value : Fl.textContent;
  }
  function Us(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function As() {
    return !0;
  }
  function Xm() {
    return !1;
  }
  function qn(e) {
    function t(n, a, r, i, o) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = o, this.currentTarget = null;
      for (var l in e)
        if (e.hasOwnProperty(l)) {
          var u = e[l];
          u ? this[l] = u(i) : this[l] = i[l];
        }
      var d = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return d ? this.isDefaultPrevented = As : this.isDefaultPrevented = Xm, this.isPropagationStopped = Xm, this;
    }
    return Le(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = As);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = As);
      },
      /**
       * We release all dispatched `SyntheticEvent`s after each event loop, adding
       * them back into the pool. This allows a way to hold onto a reference that
       * won't be added back into the pool.
       */
      persist: function() {
      },
      /**
       * Checks if this event should be released back into the pool.
       *
       * @return {boolean} True if this should not be released, false otherwise.
       */
      isPersistent: As
    }), t;
  }
  var go = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, kd = qn(go), Bl = Le({}, go, {
    view: 0,
    detail: 0
  }), XR = qn(Bl), zd, jd, Pl;
  function JR(e) {
    e !== Pl && (Pl && e.type === "mousemove" ? (zd = e.screenX - Pl.screenX, jd = e.screenY - Pl.screenY) : (zd = 0, jd = 0), Pl = e);
  }
  var Ns = Le({}, Bl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Fd,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (JR(e), zd);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : jd;
    }
  }), Jm = qn(Ns), ZR = Le({}, Ns, {
    dataTransfer: 0
  }), eT = qn(ZR), tT = Le({}, Bl, {
    relatedTarget: 0
  }), Hd = qn(tT), nT = Le({}, go, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), aT = qn(nT), rT = Le({}, go, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), iT = qn(rT), oT = Le({}, go, {
    data: 0
  }), Zm = qn(oT), lT = Zm, uT = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, sT = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  };
  function cT(e) {
    if (e.key) {
      var t = uT[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Us(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? sT[e.keyCode] || "Unidentified" : "";
  }
  var fT = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function dT(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = fT[e];
    return a ? !!n[a] : !1;
  }
  function Fd(e) {
    return dT;
  }
  var vT = Le({}, Bl, {
    key: cT,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fd,
    // Legacy Interface
    charCode: function(e) {
      return e.type === "keypress" ? Us(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Us(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), pT = qn(vT), hT = Le({}, Ns, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), ey = qn(hT), mT = Le({}, Bl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fd
  }), yT = qn(mT), gT = Le({}, go, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), bT = qn(gT), ST = Le({}, Ns, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : (
        // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
        "wheelDeltaX" in e ? -e.wheelDeltaX : 0
      );
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : (
        // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
        "wheelDeltaY" in e ? -e.wheelDeltaY : (
          // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
          "wheelDelta" in e ? -e.wheelDelta : 0
        )
      );
    },
    deltaZ: 0,
    // Browsers without "deltaMode" is reporting in raw wheel delta where one
    // notch on the scroll is always +/- 120, roughly equivalent to pixels.
    // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
    // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
    deltaMode: 0
  }), ET = qn(ST), CT = [9, 13, 27, 32], ty = 229, Vd = Et && "CompositionEvent" in window, $l = null;
  Et && "documentMode" in document && ($l = document.documentMode);
  var RT = Et && "TextEvent" in window && !$l, ny = Et && (!Vd || $l && $l > 8 && $l <= 11), ay = 32, ry = String.fromCharCode(ay);
  function TT() {
    jn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), jn("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), jn("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), jn("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var iy = !1;
  function xT(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function DT(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function _T(e, t) {
    return e === "keydown" && t.keyCode === ty;
  }
  function oy(e, t) {
    switch (e) {
      case "keyup":
        return CT.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== ty;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ly(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function uy(e) {
    return e.locale === "ko";
  }
  var bo = !1;
  function wT(e, t, n, a, r) {
    var i, o;
    if (Vd ? i = DT(t) : bo ? oy(t, a) && (i = "onCompositionEnd") : _T(t, a) && (i = "onCompositionStart"), !i)
      return null;
    ny && !uy(a) && (!bo && i === "onCompositionStart" ? bo = QR(r) : i === "onCompositionEnd" && bo && (o = Qm()));
    var l = Fs(n, i);
    if (l.length > 0) {
      var u = new Zm(i, t, null, a, r);
      if (e.push({
        event: u,
        listeners: l
      }), o)
        u.data = o;
      else {
        var d = ly(a);
        d !== null && (u.data = d);
      }
    }
  }
  function OT(e, t) {
    switch (e) {
      case "compositionend":
        return ly(t);
      case "keypress":
        var n = t.which;
        return n !== ay ? null : (iy = !0, ry);
      case "textInput":
        var a = t.data;
        return a === ry && iy ? null : a;
      default:
        return null;
    }
  }
  function MT(e, t) {
    if (bo) {
      if (e === "compositionend" || !Vd && oy(e, t)) {
        var n = Qm();
        return KR(), bo = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!xT(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ny && !uy(t) ? null : t.data;
      default:
        return null;
    }
  }
  function LT(e, t, n, a, r) {
    var i;
    if (RT ? i = OT(t, a) : i = MT(t, a), !i)
      return null;
    var o = Fs(n, "onBeforeInput");
    if (o.length > 0) {
      var l = new lT("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: l,
        listeners: o
      }), l.data = i;
    }
  }
  function UT(e, t, n, a, r, i, o) {
    wT(e, t, n, a, r), LT(e, t, n, a, r);
  }
  var AT = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function sy(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!AT[e.type] : t === "textarea";
  }
  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */
  function NT(e) {
    if (!Et)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function kT() {
    jn("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function cy(e, t, n, a) {
    lm(a);
    var r = Fs(t, "onChange");
    if (r.length > 0) {
      var i = new kd("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var Yl = null, Il = null;
  function zT(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function jT(e) {
    var t = [];
    cy(t, Il, e, Vf(e)), fm(HT, t);
  }
  function HT(e) {
    wy(e, 0);
  }
  function ks(e) {
    var t = xo(e);
    if (Zi(t))
      return e;
  }
  function FT(e, t) {
    if (e === "change")
      return t;
  }
  var fy = !1;
  Et && (fy = NT("input") && (!document.documentMode || document.documentMode > 9));
  function VT(e, t) {
    Yl = e, Il = t, Yl.attachEvent("onpropertychange", vy);
  }
  function dy() {
    Yl && (Yl.detachEvent("onpropertychange", vy), Yl = null, Il = null);
  }
  function vy(e) {
    e.propertyName === "value" && ks(Il) && jT(e);
  }
  function BT(e, t, n) {
    e === "focusin" ? (dy(), VT(t, n)) : e === "focusout" && dy();
  }
  function PT(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ks(Il);
  }
  function $T(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function YT(e, t) {
    if (e === "click")
      return ks(t);
  }
  function IT(e, t) {
    if (e === "input" || e === "change")
      return ks(t);
  }
  function qT(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || he(e, "number", e.value);
  }
  function GT(e, t, n, a, r, i, o) {
    var l = n ? xo(n) : window, u, d;
    if (zT(l) ? u = FT : sy(l) ? fy ? u = IT : (u = PT, d = BT) : $T(l) && (u = YT), u) {
      var p = u(t, n);
      if (p) {
        cy(e, p, a, r);
        return;
      }
    }
    d && d(t, l, n), t === "focusout" && qT(l);
  }
  function WT() {
    Hn("onMouseEnter", ["mouseout", "mouseover"]), Hn("onMouseLeave", ["mouseout", "mouseover"]), Hn("onPointerEnter", ["pointerout", "pointerover"]), Hn("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function QT(e, t, n, a, r, i, o) {
    var l = t === "mouseover" || t === "pointerover", u = t === "mouseout" || t === "pointerout";
    if (l && !dC(a)) {
      var d = a.relatedTarget || a.fromElement;
      if (d && (Ui(d) || ou(d)))
        return;
    }
    if (!(!u && !l)) {
      var p;
      if (r.window === r)
        p = r;
      else {
        var S = r.ownerDocument;
        S ? p = S.defaultView || S.parentWindow : p = window;
      }
      var b, x;
      if (u) {
        var D = a.relatedTarget || a.toElement;
        if (b = n, x = D ? Ui(D) : null, x !== null) {
          var M = Ti(x);
          (x !== M || x.tag !== Y && x.tag !== ee) && (x = null);
        }
      } else
        b = null, x = n;
      if (b !== x) {
        var X = Jm, le = "onMouseLeave", re = "onMouseEnter", ke = "mouse";
        (t === "pointerout" || t === "pointerover") && (X = ey, le = "onPointerLeave", re = "onPointerEnter", ke = "pointer");
        var Oe = b == null ? p : xo(b), C = x == null ? p : xo(x), L = new X(le, ke + "leave", b, a, r);
        L.target = Oe, L.relatedTarget = C;
        var R = null, j = Ui(r);
        if (j === n) {
          var J = new X(re, ke + "enter", x, a, r);
          J.target = C, J.relatedTarget = Oe, R = J;
        }
        bx(e, L, R, b, x);
      }
    }
  }
  function KT(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Gn = typeof Object.is == "function" ? Object.is : KT;
  function ql(e, t) {
    if (Gn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!rn.call(t, i) || !Gn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function py(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function XT(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function hy(e, t) {
    for (var n = py(e), a = 0, r = 0; n; ) {
      if (n.nodeType === ur) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = py(XT(n));
    }
  }
  function JT(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, o = a.focusNode, l = a.focusOffset;
    try {
      r.nodeType, o.nodeType;
    } catch {
      return null;
    }
    return ZT(e, r, i, o, l);
  }
  function ZT(e, t, n, a, r) {
    var i = 0, o = -1, l = -1, u = 0, d = 0, p = e, S = null;
    e:
      for (; ; ) {
        for (var b = null; p === t && (n === 0 || p.nodeType === ur) && (o = i + n), p === a && (r === 0 || p.nodeType === ur) && (l = i + r), p.nodeType === ur && (i += p.nodeValue.length), (b = p.firstChild) !== null; )
          S = p, p = b;
        for (; ; ) {
          if (p === e)
            break e;
          if (S === t && ++u === n && (o = i), S === a && ++d === r && (l = i), (b = p.nextSibling) !== null)
            break;
          p = S, S = p.parentNode;
        }
        p = b;
      }
    return o === -1 || l === -1 ? null : {
      start: o,
      end: l
    };
  }
  function ex(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, o = Math.min(t.start, i), l = t.end === void 0 ? o : Math.min(t.end, i);
      if (!r.extend && o > l) {
        var u = l;
        l = o, o = u;
      }
      var d = hy(e, o), p = hy(e, l);
      if (d && p) {
        if (r.rangeCount === 1 && r.anchorNode === d.node && r.anchorOffset === d.offset && r.focusNode === p.node && r.focusOffset === p.offset)
          return;
        var S = n.createRange();
        S.setStart(d.node, d.offset), r.removeAllRanges(), o > l ? (r.addRange(S), r.extend(p.node, p.offset)) : (S.setEnd(p.node, p.offset), r.addRange(S));
      }
    }
  }
  function my(e) {
    return e && e.nodeType === ur;
  }
  function yy(e, t) {
    return !e || !t ? !1 : e === t ? !0 : my(e) ? !1 : my(t) ? yy(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function tx(e) {
    return e && e.ownerDocument && yy(e.ownerDocument.documentElement, e);
  }
  function nx(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function gy() {
    for (var e = window, t = Hr(); t instanceof e.HTMLIFrameElement; ) {
      if (nx(t))
        e = t.contentWindow;
      else
        return t;
      t = Hr(e.document);
    }
    return t;
  }
  function Bd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function ax() {
    var e = gy();
    return {
      focusedElem: e,
      selectionRange: Bd(e) ? ix(e) : null
    };
  }
  function rx(e) {
    var t = gy(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && tx(n)) {
      a !== null && Bd(n) && ox(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === On && r.push({
          element: i,
          left: i.scrollLeft,
          top: i.scrollTop
        });
      typeof n.focus == "function" && n.focus();
      for (var o = 0; o < r.length; o++) {
        var l = r[o];
        l.element.scrollLeft = l.left, l.element.scrollTop = l.top;
      }
    }
  }
  function ix(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = JT(e), t || {
      start: 0,
      end: 0
    };
  }
  function ox(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : ex(e, t);
  }
  var lx = Et && "documentMode" in document && document.documentMode <= 11;
  function ux() {
    jn("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var So = null, Pd = null, Gl = null, $d = !1;
  function sx(e) {
    if ("selectionStart" in e && Bd(e))
      return {
        start: e.selectionStart,
        end: e.selectionEnd
      };
    var t = e.ownerDocument && e.ownerDocument.defaultView || window, n = t.getSelection();
    return {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    };
  }
  function cx(e) {
    return e.window === e ? e.document : e.nodeType === sr ? e : e.ownerDocument;
  }
  function by(e, t, n) {
    var a = cx(n);
    if (!($d || So == null || So !== Hr(a))) {
      var r = sx(So);
      if (!Gl || !ql(Gl, r)) {
        Gl = r;
        var i = Fs(Pd, "onSelect");
        if (i.length > 0) {
          var o = new kd("onSelect", "select", null, t, n);
          e.push({
            event: o,
            listeners: i
          }), o.target = So;
        }
      }
    }
  }
  function fx(e, t, n, a, r, i, o) {
    var l = n ? xo(n) : window;
    switch (t) {
      case "focusin":
        (sy(l) || l.contentEditable === "true") && (So = l, Pd = n, Gl = null);
        break;
      case "focusout":
        So = null, Pd = null, Gl = null;
        break;
      case "mousedown":
        $d = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        $d = !1, by(e, a, r);
        break;
      case "selectionchange":
        if (lx)
          break;
      case "keydown":
      case "keyup":
        by(e, a, r);
    }
  }
  function zs(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Eo = {
    animationend: zs("Animation", "AnimationEnd"),
    animationiteration: zs("Animation", "AnimationIteration"),
    animationstart: zs("Animation", "AnimationStart"),
    transitionend: zs("Transition", "TransitionEnd")
  }, Yd = {}, Sy = {};
  Et && (Sy = document.createElement("div").style, "AnimationEvent" in window || (delete Eo.animationend.animation, delete Eo.animationiteration.animation, delete Eo.animationstart.animation), "TransitionEvent" in window || delete Eo.transitionend.transition);
  function js(e) {
    if (Yd[e])
      return Yd[e];
    if (!Eo[e])
      return e;
    var t = Eo[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Sy)
        return Yd[e] = t[n];
    return e;
  }
  var Ey = js("animationend"), Cy = js("animationiteration"), Ry = js("animationstart"), Ty = js("transitionend"), xy = /* @__PURE__ */ new Map(), Dy = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Ir(e, t) {
    xy.set(e, t), jn(t, [e]);
  }
  function dx() {
    for (var e = 0; e < Dy.length; e++) {
      var t = Dy[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Ir(n, "on" + a);
    }
    Ir(Ey, "onAnimationEnd"), Ir(Cy, "onAnimationIteration"), Ir(Ry, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(Ty, "onTransitionEnd");
  }
  function vx(e, t, n, a, r, i, o) {
    var l = xy.get(t);
    if (l !== void 0) {
      var u = kd, d = t;
      switch (t) {
        case "keypress":
          if (Us(a) === 0)
            return;
        case "keydown":
        case "keyup":
          u = pT;
          break;
        case "focusin":
          d = "focus", u = Hd;
          break;
        case "focusout":
          d = "blur", u = Hd;
          break;
        case "beforeblur":
        case "afterblur":
          u = Hd;
          break;
        case "click":
          if (a.button === 2)
            return;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          u = Jm;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          u = eT;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          u = yT;
          break;
        case Ey:
        case Cy:
        case Ry:
          u = aT;
          break;
        case Ty:
          u = bT;
          break;
        case "scroll":
          u = XR;
          break;
        case "wheel":
          u = ET;
          break;
        case "copy":
        case "cut":
        case "paste":
          u = iT;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          u = ey;
          break;
      }
      var p = (i & gl) !== 0;
      {
        var S = !p && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", b = yx(n, l, a.type, p, S);
        if (b.length > 0) {
          var x = new u(l, d, null, a, r);
          e.push({
            event: x,
            listeners: b
          });
        }
      }
    }
  }
  dx(), WT(), kT(), ux(), TT();
  function px(e, t, n, a, r, i, o) {
    vx(e, t, n, a, r, i);
    var l = (i & sC) === 0;
    l && (QT(e, t, n, a, r), GT(e, t, n, a, r), fx(e, t, n, a, r), UT(e, t, n, a, r));
  }
  var Wl = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Id = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Wl));
  function _y(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, EC(a, t, void 0, e), e.currentTarget = null;
  }
  function hx(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], o = i.instance, l = i.currentTarget, u = i.listener;
        if (o !== a && e.isPropagationStopped())
          return;
        _y(e, u, l), a = o;
      }
    else
      for (var d = 0; d < t.length; d++) {
        var p = t[d], S = p.instance, b = p.currentTarget, x = p.listener;
        if (S !== a && e.isPropagationStopped())
          return;
        _y(e, x, b), a = S;
      }
  }
  function wy(e, t) {
    for (var n = (t & gl) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, o = r.listeners;
      hx(i, o, n);
    }
    CC();
  }
  function mx(e, t, n, a, r) {
    var i = Vf(n), o = [];
    px(o, e, a, n, i, t), wy(o, t);
  }
  function st(e, t) {
    Id.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = q0(t), r = Sx(e, n);
    a.has(r) || (Oy(t, e, Ff, n), a.add(r));
  }
  function qd(e, t, n) {
    Id.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= gl), Oy(n, e, a, t);
  }
  var Hs = "_reactListening" + Math.random().toString(36).slice(2);
  function Ql(e) {
    if (!e[Hs]) {
      e[Hs] = !0, Zn.forEach(function(n) {
        n !== "selectionchange" && (Id.has(n) || qd(n, !1, e), qd(n, !0, e));
      });
      var t = e.nodeType === sr ? e : e.ownerDocument;
      t !== null && (t[Hs] || (t[Hs] = !0, qd("selectionchange", !1, t)));
    }
  }
  function Oy(e, t, n, a, r) {
    var i = BR(e, t, n), o = void 0;
    $f && (t === "touchstart" || t === "touchmove" || t === "wheel") && (o = !0), e = e, a ? o !== void 0 ? GR(e, t, i, o) : qR(e, t, i) : o !== void 0 ? WR(e, t, i, o) : IR(e, t, i);
  }
  function My(e, t) {
    return e === t || e.nodeType === Ct && e.parentNode === t;
  }
  function Gd(e, t, n, a, r) {
    var i = a;
    if (!(t & im) && !(t & Ff)) {
      var o = r;
      if (a !== null) {
        var l = a;
        e:
          for (; ; ) {
            if (l === null)
              return;
            var u = l.tag;
            if (u === N || u === P) {
              var d = l.stateNode.containerInfo;
              if (My(d, o))
                break;
              if (u === P)
                for (var p = l.return; p !== null; ) {
                  var S = p.tag;
                  if (S === N || S === P) {
                    var b = p.stateNode.containerInfo;
                    if (My(b, o))
                      return;
                  }
                  p = p.return;
                }
              for (; d !== null; ) {
                var x = Ui(d);
                if (x === null)
                  return;
                var D = x.tag;
                if (D === Y || D === ee) {
                  l = i = x;
                  continue e;
                }
                d = d.parentNode;
              }
            }
            l = l.return;
          }
      }
    }
    fm(function() {
      return mx(e, t, n, i);
    });
  }
  function Kl(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function yx(e, t, n, a, r, i) {
    for (var o = t !== null ? t + "Capture" : null, l = a ? o : t, u = [], d = e, p = null; d !== null; ) {
      var S = d, b = S.stateNode, x = S.tag;
      if (x === Y && b !== null && (p = b, l !== null)) {
        var D = Sl(d, l);
        D != null && u.push(Kl(d, D, p));
      }
      if (r)
        break;
      d = d.return;
    }
    return u;
  }
  function Fs(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, o = i.stateNode, l = i.tag;
      if (l === Y && o !== null) {
        var u = o, d = Sl(r, n);
        d != null && a.unshift(Kl(r, d, u));
        var p = Sl(r, t);
        p != null && a.push(Kl(r, p, u));
      }
      r = r.return;
    }
    return a;
  }
  function Co(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== Y);
    return e || null;
  }
  function gx(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Co(i))
      r++;
    for (var o = 0, l = a; l; l = Co(l))
      o++;
    for (; r - o > 0; )
      n = Co(n), r--;
    for (; o - r > 0; )
      a = Co(a), o--;
    for (var u = r; u--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = Co(n), a = Co(a);
    }
    return null;
  }
  function Ly(e, t, n, a, r) {
    for (var i = t._reactName, o = [], l = n; l !== null && l !== a; ) {
      var u = l, d = u.alternate, p = u.stateNode, S = u.tag;
      if (d !== null && d === a)
        break;
      if (S === Y && p !== null) {
        var b = p;
        if (r) {
          var x = Sl(l, i);
          x != null && o.unshift(Kl(l, x, b));
        } else if (!r) {
          var D = Sl(l, i);
          D != null && o.push(Kl(l, D, b));
        }
      }
      l = l.return;
    }
    o.length !== 0 && e.push({
      event: t,
      listeners: o
    });
  }
  function bx(e, t, n, a, r) {
    var i = a && r ? gx(a, r) : null;
    a !== null && Ly(e, t, a, i, !1), r !== null && n !== null && Ly(e, n, r, i, !0);
  }
  function Sx(e, t) {
    return e + "__" + (t ? "capture" : "bubble");
  }
  var Mn = !1, Xl = "dangerouslySetInnerHTML", Vs = "suppressContentEditableWarning", qr = "suppressHydrationWarning", Uy = "autoFocus", Mi = "children", Li = "style", Bs = "__html", Wd, Ps, Jl, Ay, $s, Ny, ky;
  Wd = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, Ps = function(e, t) {
    nC(e, t), aC(e, t), uC(e, t, {
      registrationNameDependencies: Gt,
      possibleRegistrationNames: Tn
    });
  }, Ny = Et && !document.documentMode, Jl = function(e, t, n) {
    if (!Mn) {
      var a = Ys(n), r = Ys(t);
      r !== a && (Mn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Ay = function(e) {
    if (!Mn) {
      Mn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, $s = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, ky = function(e, t) {
    var n = e.namespaceURI === lr ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var Ex = /\r\n?/g, Cx = /\u0000|\uFFFD/g;
  function Ys(e) {
    ta(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(Ex, `
`).replace(Cx, "");
  }
  function Is(e, t, n, a) {
    var r = Ys(t), i = Ys(e);
    if (i !== r && (a && (Mn || (Mn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && Ee))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function zy(e) {
    return e.nodeType === sr ? e : e.ownerDocument;
  }
  function Rx() {
  }
  function qs(e) {
    e.onclick = Rx;
  }
  function Tx(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var o = a[i];
        if (i === Li)
          o && Object.freeze(o), Zh(t, o);
        else if (i === Xl) {
          var l = o ? o[Bs] : void 0;
          l != null && Wh(t, l);
        } else if (i === Mi)
          if (typeof o == "string") {
            var u = e !== "textarea" || o !== "";
            u && ps(t, o);
          } else
            typeof o == "number" && ps(t, "" + o);
        else
          i === Vs || i === qr || i === Uy || (Gt.hasOwnProperty(i) ? o != null && (typeof o != "function" && $s(i, o), i === "onScroll" && st("scroll", t)) : o != null && ar(t, i, o, r));
      }
  }
  function xx(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], o = t[r + 1];
      i === Li ? Zh(e, o) : i === Xl ? Wh(e, o) : i === Mi ? ps(e, o) : ar(e, i, o, a);
    }
  }
  function Dx(e, t, n, a) {
    var r, i = zy(n), o, l = a;
    if (l === lr && (l = Af(e)), l === lr) {
      if (r = bi(e, t), !r && e !== e.toLowerCase() && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var u = i.createElement("div");
        u.innerHTML = "<script><\/script>";
        var d = u.firstChild;
        o = u.removeChild(d);
      } else if (typeof t.is == "string")
        o = i.createElement(e, {
          is: t.is
        });
      else if (o = i.createElement(e), e === "select") {
        var p = o;
        t.multiple ? p.multiple = !0 : t.size && (p.size = t.size);
      }
    } else
      o = i.createElementNS(l, e);
    return l === lr && !r && Object.prototype.toString.call(o) === "[object HTMLUnknownElement]" && !rn.call(Wd, e) && (Wd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), o;
  }
  function _x(e, t) {
    return zy(t).createTextNode(e);
  }
  function wx(e, t, n, a) {
    var r = bi(t, n);
    Ps(t, n);
    var i;
    switch (t) {
      case "dialog":
        st("cancel", e), st("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        st("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var o = 0; o < Wl.length; o++)
          st(Wl[o], e);
        i = n;
        break;
      case "source":
        st("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        st("error", e), st("load", e), i = n;
        break;
      case "details":
        st("toggle", e), i = n;
        break;
      case "input":
        m(e, n), i = s(e, n), st("invalid", e);
        break;
      case "option":
        tt(e, n), i = n;
        break;
      case "select":
        ml(e, n), i = hl(e, n), st("invalid", e);
        break;
      case "textarea":
        Ih(e, n), i = Lf(e, n), st("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Hf(t, i), Tx(t, e, a, i, r), t) {
      case "input":
        ir(e), V(e, n, !1);
        break;
      case "textarea":
        ir(e), Gh(e);
        break;
      case "option":
        ut(e, n);
        break;
      case "select":
        Mf(e, n);
        break;
      default:
        typeof i.onClick == "function" && qs(e);
        break;
    }
  }
  function Ox(e, t, n, a, r) {
    Ps(t, a);
    var i = null, o, l;
    switch (t) {
      case "input":
        o = s(e, n), l = s(e, a), i = [];
        break;
      case "select":
        o = hl(e, n), l = hl(e, a), i = [];
        break;
      case "textarea":
        o = Lf(e, n), l = Lf(e, a), i = [];
        break;
      default:
        o = n, l = a, typeof o.onClick != "function" && typeof l.onClick == "function" && qs(e);
        break;
    }
    Hf(t, l);
    var u, d, p = null;
    for (u in o)
      if (!(l.hasOwnProperty(u) || !o.hasOwnProperty(u) || o[u] == null))
        if (u === Li) {
          var S = o[u];
          for (d in S)
            S.hasOwnProperty(d) && (p || (p = {}), p[d] = "");
        } else
          u === Xl || u === Mi || u === Vs || u === qr || u === Uy || (Gt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in l) {
      var b = l[u], x = o != null ? o[u] : void 0;
      if (!(!l.hasOwnProperty(u) || b === x || b == null && x == null))
        if (u === Li)
          if (b && Object.freeze(b), x) {
            for (d in x)
              x.hasOwnProperty(d) && (!b || !b.hasOwnProperty(d)) && (p || (p = {}), p[d] = "");
            for (d in b)
              b.hasOwnProperty(d) && x[d] !== b[d] && (p || (p = {}), p[d] = b[d]);
          } else
            p || (i || (i = []), i.push(u, p)), p = b;
        else if (u === Xl) {
          var D = b ? b[Bs] : void 0, M = x ? x[Bs] : void 0;
          D != null && M !== D && (i = i || []).push(u, D);
        } else
          u === Mi ? (typeof b == "string" || typeof b == "number") && (i = i || []).push(u, "" + b) : u === Vs || u === qr || (Gt.hasOwnProperty(u) ? (b != null && (typeof b != "function" && $s(u, b), u === "onScroll" && st("scroll", e)), !i && x !== b && (i = [])) : (i = i || []).push(u, b));
    }
    return p && (WE(p, l[Li]), (i = i || []).push(Li, p)), i;
  }
  function Mx(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && _(e, r);
    var i = bi(n, a), o = bi(n, r);
    switch (xx(e, t, i, o), n) {
      case "input":
        w(e, r);
        break;
      case "textarea":
        qh(e, r);
        break;
      case "select":
        xE(e, r);
        break;
    }
  }
  function Lx(e) {
    {
      var t = e.toLowerCase();
      return hs.hasOwnProperty(t) && hs[t] || null;
    }
  }
  function Ux(e, t, n, a, r, i, o) {
    var l, u;
    switch (l = bi(t, n), Ps(t, n), t) {
      case "dialog":
        st("cancel", e), st("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        st("load", e);
        break;
      case "video":
      case "audio":
        for (var d = 0; d < Wl.length; d++)
          st(Wl[d], e);
        break;
      case "source":
        st("error", e);
        break;
      case "img":
      case "image":
      case "link":
        st("error", e), st("load", e);
        break;
      case "details":
        st("toggle", e);
        break;
      case "input":
        m(e, n), st("invalid", e);
        break;
      case "option":
        tt(e, n);
        break;
      case "select":
        ml(e, n), st("invalid", e);
        break;
      case "textarea":
        Ih(e, n), st("invalid", e);
        break;
    }
    Hf(t, n);
    {
      u = /* @__PURE__ */ new Set();
      for (var p = e.attributes, S = 0; S < p.length; S++) {
        var b = p[S].name.toLowerCase();
        switch (b) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            u.add(p[S].name);
        }
      }
    }
    var x = null;
    for (var D in n)
      if (n.hasOwnProperty(D)) {
        var M = n[D];
        if (D === Mi)
          typeof M == "string" ? e.textContent !== M && (n[qr] !== !0 && Is(e.textContent, M, i, o), x = [Mi, M]) : typeof M == "number" && e.textContent !== "" + M && (n[qr] !== !0 && Is(e.textContent, M, i, o), x = [Mi, "" + M]);
        else if (Gt.hasOwnProperty(D))
          M != null && (typeof M != "function" && $s(D, M), D === "onScroll" && st("scroll", e));
        else if (o && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof l == "boolean") {
          var X = void 0, le = l && Rn ? null : Bn(D);
          if (n[qr] !== !0) {
            if (!(D === Vs || D === qr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            D === "value" || D === "checked" || D === "selected")) {
              if (D === Xl) {
                var re = e.innerHTML, ke = M ? M[Bs] : void 0;
                if (ke != null) {
                  var Oe = ky(e, ke);
                  Oe !== re && Jl(D, re, Oe);
                }
              } else if (D === Li) {
                if (u.delete(D), Ny) {
                  var C = qE(M);
                  X = e.getAttribute("style"), C !== X && Jl(D, X, C);
                }
              } else if (l && !Rn)
                u.delete(D.toLowerCase()), X = Lr(e, D, M), M !== X && Jl(D, X, M);
              else if (!bt(D, le, l) && !Ze(D, M, le, l)) {
                var L = !1;
                if (le !== null)
                  u.delete(le.attributeName), X = nr(e, D, M, le);
                else {
                  var R = a;
                  if (R === lr && (R = Af(t)), R === lr)
                    u.delete(D.toLowerCase());
                  else {
                    var j = Lx(D);
                    j !== null && j !== D && (L = !0, u.delete(j)), u.delete(D);
                  }
                  X = Lr(e, D, M);
                }
                var J = Rn;
                !J && M !== X && !L && Jl(D, X, M);
              }
            }
          }
        }
      }
    switch (o && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[qr] !== !0 && Ay(u), t) {
      case "input":
        ir(e), V(e, n, !0);
        break;
      case "textarea":
        ir(e), Gh(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && qs(e);
        break;
    }
    return x;
  }
  function Ax(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Qd(e, t) {
    {
      if (Mn)
        return;
      Mn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Kd(e, t) {
    {
      if (Mn)
        return;
      Mn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Xd(e, t, n) {
    {
      if (Mn)
        return;
      Mn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Jd(e, t) {
    {
      if (t === "" || Mn)
        return;
      Mn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function Nx(e, t, n) {
    switch (t) {
      case "input":
        ve(e, n);
        return;
      case "textarea":
        _E(e, n);
        return;
      case "select":
        DE(e, n);
        return;
    }
  }
  var Zl = function() {
  }, eu = function() {
  };
  {
    var kx = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], jy = [
      "applet",
      "caption",
      "html",
      "table",
      "td",
      "th",
      "marquee",
      "object",
      "template",
      // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
      // TODO: Distinguish by namespace here -- for <title>, including it here
      // errs on the side of fewer warnings
      "foreignObject",
      "desc",
      "title"
    ], zx = jy.concat(["button"]), jx = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Hy = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null
    };
    eu = function(e, t) {
      var n = Le({}, e || Hy), a = {
        tag: t
      };
      return jy.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), zx.indexOf(t) !== -1 && (n.pTagInButtonScope = null), kx.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var Hx = function(e, t) {
      switch (t) {
        case "select":
          return e === "option" || e === "optgroup" || e === "#text";
        case "optgroup":
          return e === "option" || e === "#text";
        case "option":
          return e === "#text";
        case "tr":
          return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return e === "tr" || e === "style" || e === "script" || e === "template";
        case "colgroup":
          return e === "col" || e === "template";
        case "table":
          return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
        case "head":
          return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
        case "html":
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          return e === "html";
      }
      switch (e) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
        case "rp":
        case "rt":
          return jx.indexOf(t) === -1;
        case "body":
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "head":
        case "html":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return t == null;
      }
      return !0;
    }, Fx = function(e, t) {
      switch (e) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t.pTagInButtonScope;
        case "form":
          return t.formTag || t.pTagInButtonScope;
        case "li":
          return t.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return t.dlItemTagAutoclosing;
        case "button":
          return t.buttonTagInScope;
        case "a":
          return t.aTagInScope;
        case "nobr":
          return t.nobrTagInScope;
      }
      return null;
    }, Fy = {};
    Zl = function(e, t, n) {
      n = n || Hy;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = Hx(e, r) ? null : a, o = i ? null : Fx(e, n), l = i || o;
      if (l) {
        var u = l.tag, d = !!i + "|" + e + "|" + u;
        if (!Fy[d]) {
          Fy[d] = !0;
          var p = e, S = "";
          if (e === "#text" ? /\S/.test(t) ? p = "Text nodes" : (p = "Whitespace text nodes", S = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : p = "<" + e + ">", i) {
            var b = "";
            u === "table" && e === "tr" && (b += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", p, u, S, b);
          } else
            f("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", p, u);
        }
      }
    };
  }
  var Gs = "suppressHydrationWarning", Ws = "$", Qs = "/$", tu = "$?", nu = "$!", Vx = "style", Zd = null, ev = null;
  function Bx(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case sr:
      case kf: {
        t = a === sr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : Nf(null, "");
        break;
      }
      default: {
        var i = a === Ct ? e.parentNode : e, o = i.namespaceURI || null;
        t = i.tagName, n = Nf(o, t);
        break;
      }
    }
    {
      var l = t.toLowerCase(), u = eu(null, l);
      return {
        namespace: n,
        ancestorInfo: u
      };
    }
  }
  function Px(e, t, n) {
    {
      var a = e, r = Nf(a.namespace, t), i = eu(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function EL(e) {
    return e;
  }
  function $x(e) {
    Zd = VR(), ev = ax();
    var t = null;
    return Gm(!1), t;
  }
  function Yx(e) {
    rx(ev), Gm(Zd), Zd = null, ev = null;
  }
  function Ix(e, t, n, a, r) {
    var i;
    {
      var o = a;
      if (Zl(e, null, o.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var l = "" + t.children, u = eu(o.ancestorInfo, e);
        Zl(null, l, u);
      }
      i = o.namespace;
    }
    var d = Dx(e, t, n, i);
    return iu(r, d), uv(d, t), d;
  }
  function qx(e, t) {
    e.appendChild(t);
  }
  function Gx(e, t, n, a, r) {
    switch (wx(e, t, n, a), t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!n.autoFocus;
      case "img":
        return !0;
      default:
        return !1;
    }
  }
  function Wx(e, t, n, a, r, i) {
    {
      var o = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var l = "" + a.children, u = eu(o.ancestorInfo, t);
        Zl(null, l, u);
      }
    }
    return Ox(e, t, n, a);
  }
  function tv(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function Qx(e, t, n, a) {
    {
      var r = n;
      Zl(null, e, r.ancestorInfo);
    }
    var i = _x(e, t);
    return iu(a, i), i;
  }
  function Kx() {
    var e = window.event;
    return e === void 0 ? mr : Wm(e.type);
  }
  var nv = typeof setTimeout == "function" ? setTimeout : void 0, Xx = typeof clearTimeout == "function" ? clearTimeout : void 0, av = -1, Vy = typeof Promise == "function" ? Promise : void 0, Jx = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vy < "u" ? function(e) {
    return Vy.resolve(null).then(e).catch(Zx);
  } : nv;
  function Zx(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function e0(e, t, n, a) {
    switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        n.autoFocus && e.focus();
        return;
      case "img": {
        n.src && (e.src = n.src);
        return;
      }
    }
  }
  function t0(e, t, n, a, r, i) {
    Mx(e, t, n, a, r), uv(e, r);
  }
  function By(e) {
    ps(e, "");
  }
  function n0(e, t, n) {
    e.nodeValue = n;
  }
  function a0(e, t) {
    e.appendChild(t);
  }
  function r0(e, t) {
    var n;
    e.nodeType === Ct ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && qs(n);
  }
  function i0(e, t, n) {
    e.insertBefore(t, n);
  }
  function o0(e, t, n) {
    e.nodeType === Ct ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function l0(e, t) {
    e.removeChild(t);
  }
  function u0(e, t) {
    e.nodeType === Ct ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function rv(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === Ct) {
        var i = r.data;
        if (i === Qs)
          if (a === 0) {
            e.removeChild(r), Hl(t);
            return;
          } else
            a--;
        else
          (i === Ws || i === tu || i === nu) && a++;
      }
      n = r;
    } while (n);
    Hl(t);
  }
  function s0(e, t) {
    e.nodeType === Ct ? rv(e.parentNode, t) : e.nodeType === On && rv(e, t), Hl(e);
  }
  function c0(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function f0(e) {
    e.nodeValue = "";
  }
  function d0(e, t) {
    e = e;
    var n = t[Vx], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = zf("display", a);
  }
  function v0(e, t) {
    e.nodeValue = t;
  }
  function p0(e) {
    e.nodeType === On ? e.textContent = "" : e.nodeType === sr && e.documentElement && e.removeChild(e.documentElement);
  }
  function h0(e, t, n) {
    return e.nodeType !== On || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function m0(e, t) {
    return t === "" || e.nodeType !== ur ? null : e;
  }
  function y0(e) {
    return e.nodeType !== Ct ? null : e;
  }
  function Py(e) {
    return e.data === tu;
  }
  function iv(e) {
    return e.data === nu;
  }
  function g0(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function b0(e, t) {
    e._reactRetry = t;
  }
  function Ks(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === On || t === ur)
        break;
      if (t === Ct) {
        var n = e.data;
        if (n === Ws || n === nu || n === tu)
          break;
        if (n === Qs)
          return null;
      }
    }
    return e;
  }
  function au(e) {
    return Ks(e.nextSibling);
  }
  function S0(e) {
    return Ks(e.firstChild);
  }
  function E0(e) {
    return Ks(e.firstChild);
  }
  function C0(e) {
    return Ks(e.nextSibling);
  }
  function R0(e, t, n, a, r, i, o) {
    iu(i, e), uv(e, n);
    var l;
    {
      var u = r;
      l = u.namespace;
    }
    var d = (i.mode & Ae) !== de;
    return Ux(e, t, n, l, a, d, o);
  }
  function T0(e, t, n, a) {
    return iu(n, e), n.mode & Ae, Ax(e, t);
  }
  function x0(e, t) {
    iu(t, e);
  }
  function D0(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === Ct) {
        var a = t.data;
        if (a === Qs) {
          if (n === 0)
            return au(t);
          n--;
        } else
          (a === Ws || a === nu || a === tu) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function $y(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === Ct) {
        var a = t.data;
        if (a === Ws || a === nu || a === tu) {
          if (n === 0)
            return t;
          n--;
        } else
          a === Qs && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function _0(e) {
    Hl(e);
  }
  function w0(e) {
    Hl(e);
  }
  function O0(e) {
    return e !== "head" && e !== "body";
  }
  function M0(e, t, n, a) {
    var r = !0;
    Is(t.nodeValue, n, a, r);
  }
  function L0(e, t, n, a, r, i) {
    if (t[Gs] !== !0) {
      var o = !0;
      Is(a.nodeValue, r, i, o);
    }
  }
  function U0(e, t) {
    t.nodeType === On ? Qd(e, t) : t.nodeType === Ct || Kd(e, t);
  }
  function A0(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === On ? Qd(n, t) : t.nodeType === Ct || Kd(n, t));
    }
  }
  function N0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && (a.nodeType === On ? Qd(n, a) : a.nodeType === Ct || Kd(n, a));
  }
  function k0(e, t, n) {
    Xd(e, t);
  }
  function z0(e, t) {
    Jd(e, t);
  }
  function j0(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Xd(a, t);
    }
  }
  function H0(e, t) {
    {
      var n = e.parentNode;
      n !== null && Jd(n, t);
    }
  }
  function F0(e, t, n, a, r, i) {
    (i || t[Gs] !== !0) && Xd(n, a);
  }
  function V0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && Jd(n, a);
  }
  function B0(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function P0(e) {
    Ql(e);
  }
  var Ro = Math.random().toString(36).slice(2), To = "__reactFiber$" + Ro, ov = "__reactProps$" + Ro, ru = "__reactContainer$" + Ro, lv = "__reactEvents$" + Ro, $0 = "__reactListeners$" + Ro, Y0 = "__reactHandles$" + Ro;
  function I0(e) {
    delete e[To], delete e[ov], delete e[lv], delete e[$0], delete e[Y0];
  }
  function iu(e, t) {
    t[To] = e;
  }
  function Xs(e, t) {
    t[ru] = e;
  }
  function Yy(e) {
    e[ru] = null;
  }
  function ou(e) {
    return !!e[ru];
  }
  function Ui(e) {
    var t = e[To];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[ru] || n[To], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = $y(e); r !== null; ) {
            var i = r[To];
            if (i)
              return i;
            r = $y(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Gr(e) {
    var t = e[To] || e[ru];
    return t && (t.tag === Y || t.tag === ee || t.tag === ue || t.tag === N) ? t : null;
  }
  function xo(e) {
    if (e.tag === Y || e.tag === ee)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function Js(e) {
    return e[ov] || null;
  }
  function uv(e, t) {
    e[ov] = t;
  }
  function q0(e) {
    var t = e[lv];
    return t === void 0 && (t = e[lv] = /* @__PURE__ */ new Set()), t;
  }
  var Iy = {}, qy = h.ReactDebugCurrentFrame;
  function Zs(e) {
    if (e) {
      var t = e._owner, n = kr(e.type, e._source, t ? t.type : null);
      qy.setExtraStackFrame(n);
    } else
      qy.setExtraStackFrame(null);
  }
  function Ea(e, t, n, a, r) {
    {
      var i = Function.call.bind(rn);
      for (var o in e)
        if (i(e, o)) {
          var l = void 0;
          try {
            if (typeof e[o] != "function") {
              var u = Error((a || "React class") + ": " + n + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw u.name = "Invariant Violation", u;
            }
            l = e[o](t, o, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (d) {
            l = d;
          }
          l && !(l instanceof Error) && (Zs(r), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, o, typeof l), Zs(null)), l instanceof Error && !(l.message in Iy) && (Iy[l.message] = !0, Zs(r), f("Failed %s type: %s", n, l.message), Zs(null));
        }
    }
  }
  var sv = [], ec;
  ec = [];
  var yr = -1;
  function Wr(e) {
    return {
      current: e
    };
  }
  function cn(e, t) {
    if (yr < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== ec[yr] && f("Unexpected Fiber popped."), e.current = sv[yr], sv[yr] = null, ec[yr] = null, yr--;
  }
  function fn(e, t, n) {
    yr++, sv[yr] = e.current, ec[yr] = n, e.current = t;
  }
  var cv;
  cv = {};
  var Wn = {};
  Object.freeze(Wn);
  var gr = Wr(Wn), $a = Wr(!1), fv = Wn;
  function Do(e, t, n) {
    return n && Ya(t) ? fv : gr.current;
  }
  function Gy(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function _o(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return Wn;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var o in a)
        i[o] = t[o];
      {
        var l = Se(e) || "Unknown";
        Ea(a, i, "context", l);
      }
      return r && Gy(e, t, i), i;
    }
  }
  function tc() {
    return $a.current;
  }
  function Ya(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function nc(e) {
    cn($a, e), cn(gr, e);
  }
  function dv(e) {
    cn($a, e), cn(gr, e);
  }
  function Wy(e, t, n) {
    {
      if (gr.current !== Wn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      fn(gr, t, e), fn($a, n, e);
    }
  }
  function Qy(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Se(e) || "Unknown";
          cv[i] || (cv[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var o = a.getChildContext();
      for (var l in o)
        if (!(l in r))
          throw new Error((Se(e) || "Unknown") + '.getChildContext(): key "' + l + '" is not defined in childContextTypes.');
      {
        var u = Se(e) || "Unknown";
        Ea(r, o, "child context", u);
      }
      return Le({}, n, o);
    }
  }
  function ac(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Wn;
      return fv = gr.current, fn(gr, n, e), fn($a, $a.current, e), !0;
    }
  }
  function Ky(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Qy(e, t, fv);
        a.__reactInternalMemoizedMergedChildContext = r, cn($a, e), cn(gr, e), fn(gr, r, e), fn($a, n, e);
      } else
        cn($a, e), fn($a, n, e);
    }
  }
  function G0(e) {
    {
      if (!OC(e) || e.tag !== O)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case N:
            return t.stateNode.context;
          case O: {
            var n = t.type;
            if (Ya(n))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Qr = 0, rc = 1, br = null, vv = !1, pv = !1;
  function Xy(e) {
    br === null ? br = [e] : br.push(e);
  }
  function W0(e) {
    vv = !0, Xy(e);
  }
  function Jy() {
    vv && Kr();
  }
  function Kr() {
    if (!pv && br !== null) {
      pv = !0;
      var e = 0, t = Sa();
      try {
        var n = !0, a = br;
        for (It(In); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        br = null, vv = !1;
      } catch (i) {
        throw br !== null && (br = br.slice(e + 1)), Cm(Ss, Kr), i;
      } finally {
        It(t), pv = !1;
      }
    }
    return null;
  }
  var wo = [], Oo = 0, ic = null, oc = 0, ia = [], oa = 0, Ai = null, Sr = 1, Er = "";
  function Q0(e) {
    return ki(), (e.flags & pm) !== fe;
  }
  function K0(e) {
    return ki(), oc;
  }
  function X0() {
    var e = Er, t = Sr, n = t & ~J0(t);
    return n.toString(32) + e;
  }
  function Ni(e, t) {
    ki(), wo[Oo++] = oc, wo[Oo++] = ic, ic = e, oc = t;
  }
  function Zy(e, t, n) {
    ki(), ia[oa++] = Sr, ia[oa++] = Er, ia[oa++] = Ai, Ai = e;
    var a = Sr, r = Er, i = lc(a) - 1, o = a & ~(1 << i), l = n + 1, u = lc(t) + i;
    if (u > 30) {
      var d = i - i % 5, p = (1 << d) - 1, S = (o & p).toString(32), b = o >> d, x = i - d, D = lc(t) + x, M = l << x, X = M | b, le = S + r;
      Sr = 1 << D | X, Er = le;
    } else {
      var re = l << i, ke = re | o, Oe = r;
      Sr = 1 << u | ke, Er = Oe;
    }
  }
  function hv(e) {
    ki();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Ni(e, n), Zy(e, n, a);
    }
  }
  function lc(e) {
    return 32 - wm(e);
  }
  function J0(e) {
    return 1 << lc(e) - 1;
  }
  function mv(e) {
    for (; e === ic; )
      ic = wo[--Oo], wo[Oo] = null, oc = wo[--Oo], wo[Oo] = null;
    for (; e === Ai; )
      Ai = ia[--oa], ia[oa] = null, Er = ia[--oa], ia[oa] = null, Sr = ia[--oa], ia[oa] = null;
  }
  function Z0() {
    return ki(), Ai !== null ? {
      id: Sr,
      overflow: Er
    } : null;
  }
  function eD(e, t) {
    ki(), ia[oa++] = Sr, ia[oa++] = Er, ia[oa++] = Ai, Sr = t.id, Er = t.overflow, Ai = e;
  }
  function ki() {
    Qt() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var Wt = null, la = null, Ca = !1, zi = !1, Xr = null;
  function tD() {
    Ca && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function eg() {
    zi = !0;
  }
  function nD() {
    return zi;
  }
  function aD(e) {
    var t = e.stateNode.containerInfo;
    return la = E0(t), Wt = e, Ca = !0, Xr = null, zi = !1, !0;
  }
  function rD(e, t, n) {
    return la = C0(t), Wt = e, Ca = !0, Xr = null, zi = !1, n !== null && eD(e, n), !0;
  }
  function tg(e, t) {
    switch (e.tag) {
      case N: {
        U0(e.stateNode.containerInfo, t);
        break;
      }
      case Y: {
        var n = (e.mode & Ae) !== de;
        N0(
          e.type,
          e.memoizedProps,
          e.stateNode,
          t,
          // TODO: Delete this argument when we remove the legacy root API.
          n
        );
        break;
      }
      case ue: {
        var a = e.memoizedState;
        a.dehydrated !== null && A0(a.dehydrated, t);
        break;
      }
    }
  }
  function ng(e, t) {
    tg(e, t);
    var n = lO();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Si) : a.push(n);
  }
  function yv(e, t) {
    {
      if (zi)
        return;
      switch (e.tag) {
        case N: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case Y:
              var a = t.type;
              t.pendingProps, k0(n, a);
              break;
            case ee:
              var r = t.pendingProps;
              z0(n, r);
              break;
          }
          break;
        }
        case Y: {
          var i = e.type, o = e.memoizedProps, l = e.stateNode;
          switch (t.tag) {
            case Y: {
              var u = t.type, d = t.pendingProps, p = (e.mode & Ae) !== de;
              F0(
                i,
                o,
                l,
                u,
                d,
                // TODO: Delete this argument when we remove the legacy root API.
                p
              );
              break;
            }
            case ee: {
              var S = t.pendingProps, b = (e.mode & Ae) !== de;
              V0(
                i,
                o,
                l,
                S,
                // TODO: Delete this argument when we remove the legacy root API.
                b
              );
              break;
            }
          }
          break;
        }
        case ue: {
          var x = e.memoizedState, D = x.dehydrated;
          if (D !== null)
            switch (t.tag) {
              case Y:
                var M = t.type;
                t.pendingProps, j0(D, M);
                break;
              case ee:
                var X = t.pendingProps;
                H0(D, X);
                break;
            }
          break;
        }
        default:
          return;
      }
    }
  }
  function ag(e, t) {
    t.flags = t.flags & ~fr | Rt, yv(e, t);
  }
  function rg(e, t) {
    switch (e.tag) {
      case Y: {
        var n = e.type;
        e.pendingProps;
        var a = h0(t, n);
        return a !== null ? (e.stateNode = a, Wt = e, la = S0(a), !0) : !1;
      }
      case ee: {
        var r = e.pendingProps, i = m0(t, r);
        return i !== null ? (e.stateNode = i, Wt = e, la = null, !0) : !1;
      }
      case ue: {
        var o = y0(t);
        if (o !== null) {
          var l = {
            dehydrated: o,
            treeContext: Z0(),
            retryLane: $n
          };
          e.memoizedState = l;
          var u = uO(o);
          return u.return = e, e.child = u, Wt = e, la = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function gv(e) {
    return (e.mode & Ae) !== de && (e.flags & $e) === fe;
  }
  function bv(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function Sv(e) {
    if (Ca) {
      var t = la;
      if (!t) {
        gv(e) && (yv(Wt, e), bv()), ag(Wt, e), Ca = !1, Wt = e;
        return;
      }
      var n = t;
      if (!rg(e, t)) {
        gv(e) && (yv(Wt, e), bv()), t = au(n);
        var a = Wt;
        if (!t || !rg(e, t)) {
          ag(Wt, e), Ca = !1, Wt = e;
          return;
        }
        ng(a, n);
      }
    }
  }
  function iD(e, t, n) {
    var a = e.stateNode, r = !zi, i = R0(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function oD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = T0(t, n, e);
    if (a) {
      var r = Wt;
      if (r !== null)
        switch (r.tag) {
          case N: {
            var i = r.stateNode.containerInfo, o = (r.mode & Ae) !== de;
            M0(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              o
            );
            break;
          }
          case Y: {
            var l = r.type, u = r.memoizedProps, d = r.stateNode, p = (r.mode & Ae) !== de;
            L0(
              l,
              u,
              d,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              p
            );
            break;
          }
        }
    }
    return a;
  }
  function lD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    x0(n, e);
  }
  function uD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return D0(n);
  }
  function ig(e) {
    for (var t = e.return; t !== null && t.tag !== Y && t.tag !== N && t.tag !== ue; )
      t = t.return;
    Wt = t;
  }
  function uc(e) {
    if (e !== Wt)
      return !1;
    if (!Ca)
      return ig(e), Ca = !0, !1;
    if (e.tag !== N && (e.tag !== Y || O0(e.type) && !tv(e.type, e.memoizedProps))) {
      var t = la;
      if (t)
        if (gv(e))
          og(e), bv();
        else
          for (; t; )
            ng(e, t), t = au(t);
    }
    return ig(e), e.tag === ue ? la = uD(e) : la = Wt ? au(e.stateNode) : null, !0;
  }
  function sD() {
    return Ca && la !== null;
  }
  function og(e) {
    for (var t = la; t; )
      tg(e, t), t = au(t);
  }
  function Mo() {
    Wt = null, la = null, Ca = !1, zi = !1;
  }
  function lg() {
    Xr !== null && (tS(Xr), Xr = null);
  }
  function Qt() {
    return Ca;
  }
  function Ev(e) {
    Xr === null ? Xr = [e] : Xr.push(e);
  }
  var cD = h.ReactCurrentBatchConfig, fD = null;
  function dD() {
    return cD.transition;
  }
  var Ra = {
    recordUnsafeLifecycleWarnings: function(e, t) {
    },
    flushPendingUnsafeLifecycleWarnings: function() {
    },
    recordLegacyContextWarning: function(e, t) {
    },
    flushLegacyContextWarning: function() {
    },
    discardPendingWarnings: function() {
    }
  };
  {
    var vD = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & Tt && (t = n), n = n.return;
      return t;
    }, ji = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, lu = [], uu = [], su = [], cu = [], fu = [], du = [], Hi = /* @__PURE__ */ new Set();
    Ra.recordUnsafeLifecycleWarnings = function(e, t) {
      Hi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && lu.push(e), e.mode & Tt && typeof t.UNSAFE_componentWillMount == "function" && uu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && su.push(e), e.mode & Tt && typeof t.UNSAFE_componentWillReceiveProps == "function" && cu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && fu.push(e), e.mode & Tt && typeof t.UNSAFE_componentWillUpdate == "function" && du.push(e));
    }, Ra.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      lu.length > 0 && (lu.forEach(function(b) {
        e.add(Se(b) || "Component"), Hi.add(b.type);
      }), lu = []);
      var t = /* @__PURE__ */ new Set();
      uu.length > 0 && (uu.forEach(function(b) {
        t.add(Se(b) || "Component"), Hi.add(b.type);
      }), uu = []);
      var n = /* @__PURE__ */ new Set();
      su.length > 0 && (su.forEach(function(b) {
        n.add(Se(b) || "Component"), Hi.add(b.type);
      }), su = []);
      var a = /* @__PURE__ */ new Set();
      cu.length > 0 && (cu.forEach(function(b) {
        a.add(Se(b) || "Component"), Hi.add(b.type);
      }), cu = []);
      var r = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(b) {
        r.add(Se(b) || "Component"), Hi.add(b.type);
      }), fu = []);
      var i = /* @__PURE__ */ new Set();
      if (du.length > 0 && (du.forEach(function(b) {
        i.add(Se(b) || "Component"), Hi.add(b.type);
      }), du = []), t.size > 0) {
        var o = ji(t);
        f(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, o);
      }
      if (a.size > 0) {
        var l = ji(a);
        f(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, l);
      }
      if (i.size > 0) {
        var u = ji(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, u);
      }
      if (e.size > 0) {
        var d = ji(e);
        T(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, d);
      }
      if (n.size > 0) {
        var p = ji(n);
        T(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, p);
      }
      if (r.size > 0) {
        var S = ji(r);
        T(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, S);
      }
    };
    var sc = /* @__PURE__ */ new Map(), ug = /* @__PURE__ */ new Set();
    Ra.recordLegacyContextWarning = function(e, t) {
      var n = vD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!ug.has(e.type)) {
        var a = sc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], sc.set(n, a)), a.push(e));
      }
    }, Ra.flushLegacyContextWarning = function() {
      sc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Se(i) || "Component"), ug.add(i.type);
          });
          var r = ji(a);
          try {
            ft(n), f(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            Bt();
          }
        }
      });
    }, Ra.discardPendingWarnings = function() {
      lu = [], uu = [], su = [], cu = [], fu = [], du = [], sc = /* @__PURE__ */ new Map();
    };
  }
  function Ta(e, t) {
    if (e && e.defaultProps) {
      var n = Le({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var Cv = Wr(null), Rv;
  Rv = {};
  var cc = null, Lo = null, Tv = null, fc = !1;
  function dc() {
    cc = null, Lo = null, Tv = null, fc = !1;
  }
  function sg() {
    fc = !0;
  }
  function cg() {
    fc = !1;
  }
  function fg(e, t, n) {
    fn(Cv, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Rv && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Rv;
  }
  function xv(e, t) {
    var n = Cv.current;
    cn(Cv, t), e._currentValue = n;
  }
  function Dv(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (mo(a.childLanes, t) ? r !== null && !mo(r.childLanes, t) && (r.childLanes = Te(r.childLanes, t)) : (a.childLanes = Te(a.childLanes, t), r !== null && (r.childLanes = Te(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function pD(e, t, n) {
    hD(e, t, n);
  }
  function hD(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var o = i.firstContext; o !== null; ) {
          if (o.context === t) {
            if (a.tag === O) {
              var l = Ll(n), u = Cr(at, l);
              u.tag = pc;
              var d = a.updateQueue;
              if (d !== null) {
                var p = d.shared, S = p.pending;
                S === null ? u.next = u : (u.next = S.next, S.next = u), p.pending = u;
              }
            }
            a.lanes = Te(a.lanes, n);
            var b = a.alternate;
            b !== null && (b.lanes = Te(b.lanes, n)), Dv(a.return, n, e), i.lanes = Te(i.lanes, n);
            break;
          }
          o = o.next;
        }
      } else if (a.tag === $)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === ct) {
        var x = a.return;
        if (x === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        x.lanes = Te(x.lanes, n);
        var D = x.alternate;
        D !== null && (D.lanes = Te(D.lanes, n)), Dv(x, n, e), r = a.sibling;
      } else
        r = a.child;
      if (r !== null)
        r.return = a;
      else
        for (r = a; r !== null; ) {
          if (r === e) {
            r = null;
            break;
          }
          var M = r.sibling;
          if (M !== null) {
            M.return = r.return, r = M;
            break;
          }
          r = r.return;
        }
      a = r;
    }
  }
  function Uo(e, t) {
    cc = e, Lo = null, Tv = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (Yn(n.lanes, t) && Du(), n.firstContext = null);
    }
  }
  function xt(e) {
    fc && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (Tv !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Lo === null) {
        if (cc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Lo = n, cc.dependencies = {
          lanes: k,
          firstContext: n
        };
      } else
        Lo = Lo.next = n;
    }
    return t;
  }
  var Fi = null;
  function _v(e) {
    Fi === null ? Fi = [e] : Fi.push(e);
  }
  function mD() {
    if (Fi !== null) {
      for (var e = 0; e < Fi.length; e++) {
        var t = Fi[e], n = t.interleaved;
        if (n !== null) {
          t.interleaved = null;
          var a = n.next, r = t.pending;
          if (r !== null) {
            var i = r.next;
            r.next = a, n.next = i;
          }
          t.pending = n;
        }
      }
      Fi = null;
    }
  }
  function dg(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, _v(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function yD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, _v(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function gD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, _v(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function Ln(e, t) {
    return vc(e, t);
  }
  var bD = vc;
  function vc(e, t) {
    e.lanes = Te(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Te(n.lanes, t)), n === null && (e.flags & (Rt | fr)) !== fe && vS(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Te(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Te(n.childLanes, t) : (r.flags & (Rt | fr)) !== fe && vS(e), a = r, r = r.return;
    if (a.tag === N) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var vg = 0, pg = 1, pc = 2, wv = 3, hc = !1, Ov, mc;
  Ov = !1, mc = null;
  function Mv(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: k
      },
      effects: null
    };
    e.updateQueue = t;
  }
  function hg(e, t) {
    var n = t.updateQueue, a = e.updateQueue;
    if (n === a) {
      var r = {
        baseState: a.baseState,
        firstBaseUpdate: a.firstBaseUpdate,
        lastBaseUpdate: a.lastBaseUpdate,
        shared: a.shared,
        effects: a.effects
      };
      t.updateQueue = r;
    }
  }
  function Cr(e, t) {
    var n = {
      eventTime: e,
      lane: t,
      tag: vg,
      payload: null,
      callback: null,
      next: null
    };
    return n;
  }
  function Jr(e, t, n) {
    var a = e.updateQueue;
    if (a === null)
      return null;
    var r = a.shared;
    if (mc === r && !Ov && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Ov = !0), bw()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, bD(e, n);
    } else
      return gD(e, r, t, n);
  }
  function yc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Um(n)) {
        var i = r.lanes;
        i = Nm(i, e.pendingLanes);
        var o = Te(i, n);
        r.lanes = o, _d(e, o);
      }
    }
  }
  function Lv(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null) {
      var r = a.updateQueue;
      if (n === r) {
        var i = null, o = null, l = n.firstBaseUpdate;
        if (l !== null) {
          var u = l;
          do {
            var d = {
              eventTime: u.eventTime,
              lane: u.lane,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null
            };
            o === null ? i = o = d : (o.next = d, o = d), u = u.next;
          } while (u !== null);
          o === null ? i = o = t : (o.next = t, o = t);
        } else
          i = o = t;
        n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: o,
          shared: r.shared,
          effects: r.effects
        }, e.updateQueue = n;
        return;
      }
    }
    var p = n.lastBaseUpdate;
    p === null ? n.firstBaseUpdate = t : p.next = t, n.lastBaseUpdate = t;
  }
  function SD(e, t, n, a, r, i) {
    switch (n.tag) {
      case pg: {
        var o = n.payload;
        if (typeof o == "function") {
          sg();
          var l = o.call(i, a, r);
          {
            if (e.mode & Tt) {
              $t(!0);
              try {
                o.call(i, a, r);
              } finally {
                $t(!1);
              }
            }
            cg();
          }
          return l;
        }
        return o;
      }
      case wv:
        e.flags = e.flags & ~yn | $e;
      case vg: {
        var u = n.payload, d;
        if (typeof u == "function") {
          sg(), d = u.call(i, a, r);
          {
            if (e.mode & Tt) {
              $t(!0);
              try {
                u.call(i, a, r);
              } finally {
                $t(!1);
              }
            }
            cg();
          }
        } else
          d = u;
        return d == null ? a : Le({}, a, d);
      }
      case pc:
        return hc = !0, a;
    }
    return a;
  }
  function gc(e, t, n, a) {
    var r = e.updateQueue;
    hc = !1, mc = r.shared;
    var i = r.firstBaseUpdate, o = r.lastBaseUpdate, l = r.shared.pending;
    if (l !== null) {
      r.shared.pending = null;
      var u = l, d = u.next;
      u.next = null, o === null ? i = d : o.next = d, o = u;
      var p = e.alternate;
      if (p !== null) {
        var S = p.updateQueue, b = S.lastBaseUpdate;
        b !== o && (b === null ? S.firstBaseUpdate = d : b.next = d, S.lastBaseUpdate = u);
      }
    }
    if (i !== null) {
      var x = r.baseState, D = k, M = null, X = null, le = null, re = i;
      do {
        var ke = re.lane, Oe = re.eventTime;
        if (mo(a, ke)) {
          if (le !== null) {
            var L = {
              eventTime: Oe,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Yt,
              tag: re.tag,
              payload: re.payload,
              callback: re.callback,
              next: null
            };
            le = le.next = L;
          }
          x = SD(e, r, re, x, t, n);
          var R = re.callback;
          if (R !== null && // If the update was already committed, we should not queue its
          // callback again.
          re.lane !== Yt) {
            e.flags |= Wf;
            var j = r.effects;
            j === null ? r.effects = [re] : j.push(re);
          }
        } else {
          var C = {
            eventTime: Oe,
            lane: ke,
            tag: re.tag,
            payload: re.payload,
            callback: re.callback,
            next: null
          };
          le === null ? (X = le = C, M = x) : le = le.next = C, D = Te(D, ke);
        }
        if (re = re.next, re === null) {
          if (l = r.shared.pending, l === null)
            break;
          var J = l, W = J.next;
          J.next = null, re = W, r.lastBaseUpdate = J, r.shared.pending = null;
        }
      } while (!0);
      le === null && (M = x), r.baseState = M, r.firstBaseUpdate = X, r.lastBaseUpdate = le;
      var pe = r.shared.interleaved;
      if (pe !== null) {
        var ge = pe;
        do
          D = Te(D, ge.lane), ge = ge.next;
        while (ge !== pe);
      } else
        i === null && (r.shared.lanes = k);
      Hu(D), e.lanes = D, e.memoizedState = x;
    }
    mc = null;
  }
  function ED(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function mg() {
    hc = !1;
  }
  function bc() {
    return hc;
  }
  function yg(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], o = i.callback;
        o !== null && (i.callback = null, ED(o, n));
      }
  }
  var Uv = {}, gg = new c.Component().refs, Av, Nv, kv, zv, jv, bg, Sc, Hv, Fv, Vv;
  {
    Av = /* @__PURE__ */ new Set(), Nv = /* @__PURE__ */ new Set(), kv = /* @__PURE__ */ new Set(), zv = /* @__PURE__ */ new Set(), Hv = /* @__PURE__ */ new Set(), jv = /* @__PURE__ */ new Set(), Fv = /* @__PURE__ */ new Set(), Vv = /* @__PURE__ */ new Set();
    var Sg = /* @__PURE__ */ new Set();
    Sc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        Sg.has(n) || (Sg.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, bg = function(e, t) {
      if (t === void 0) {
        var n = Be(e) || "Component";
        jv.has(n) || (jv.add(n), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(Uv, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(Uv);
  }
  function Bv(e, t, n, a) {
    var r = e.memoizedState, i = n(a, r);
    {
      if (e.mode & Tt) {
        $t(!0);
        try {
          i = n(a, r);
        } finally {
          $t(!1);
        }
      }
      bg(t, i);
    }
    var o = i == null ? r : Le({}, r, i);
    if (e.memoizedState = o, e.lanes === k) {
      var l = e.updateQueue;
      l.baseState = o;
    }
  }
  var Pv = {
    isMounted: MC,
    enqueueSetState: function(e, t, n) {
      var a = lo(e), r = Sn(), i = oi(a), o = Cr(r, i);
      o.payload = t, n != null && (Sc(n, "setState"), o.callback = n);
      var l = Jr(a, o, i);
      l !== null && (zt(l, a, i, r), yc(l, a, i)), nd(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = lo(e), r = Sn(), i = oi(a), o = Cr(r, i);
      o.tag = pg, o.payload = t, n != null && (Sc(n, "replaceState"), o.callback = n);
      var l = Jr(a, o, i);
      l !== null && (zt(l, a, i, r), yc(l, a, i)), nd(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = lo(e), a = Sn(), r = oi(n), i = Cr(a, r);
      i.tag = pc, t != null && (Sc(t, "forceUpdate"), i.callback = t);
      var o = Jr(n, i, r);
      o !== null && (zt(o, n, r, a), yc(o, n, r)), lR(n, r);
    }
  };
  function Eg(e, t, n, a, r, i, o) {
    var l = e.stateNode;
    if (typeof l.shouldComponentUpdate == "function") {
      var u = l.shouldComponentUpdate(a, i, o);
      {
        if (e.mode & Tt) {
          $t(!0);
          try {
            u = l.shouldComponentUpdate(a, i, o);
          } finally {
            $t(!1);
          }
        }
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Be(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !ql(n, a) || !ql(r, i) : !0;
  }
  function CD(e, t, n) {
    var a = e.stateNode;
    {
      var r = Be(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !Fv.has(t) && (Fv.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Be(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var o = a.props !== n;
      a.props !== void 0 && o && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !kv.has(t) && (kv.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Be(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var l = a.state;
      l && (typeof l != "object" || Pe(l)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function Cg(e, t) {
    t.updater = Pv, e.stateNode = t, xC(t, e), t._reactInternalInstance = Uv;
  }
  function Rg(e, t, n) {
    var a = !1, r = Wn, i = Wn, o = t.contextType;
    if ("contextType" in t) {
      var l = (
        // Allow null for conditional declaration
        o === null || o !== void 0 && o.$$typeof === q && o._context === void 0
      );
      if (!l && !Vv.has(t)) {
        Vv.add(t);
        var u = "";
        o === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof o != "object" ? u = " However, it is set to a " + typeof o + "." : o.$$typeof === z ? u = " Did you accidentally pass the Context.Provider instead?" : o._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(o).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Be(t) || "Component", u);
      }
    }
    if (typeof o == "object" && o !== null)
      i = xt(o);
    else {
      r = Do(e, t, !0);
      var d = t.contextTypes;
      a = d != null, i = a ? _o(e, r) : Wn;
    }
    var p = new t(n, i);
    if (e.mode & Tt) {
      $t(!0);
      try {
        p = new t(n, i);
      } finally {
        $t(!1);
      }
    }
    var S = e.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null;
    Cg(e, p);
    {
      if (typeof t.getDerivedStateFromProps == "function" && S === null) {
        var b = Be(t) || "Component";
        Nv.has(b) || (Nv.add(b), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", b, p.state === null ? "null" : "undefined", b));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof p.getSnapshotBeforeUpdate == "function") {
        var x = null, D = null, M = null;
        if (typeof p.componentWillMount == "function" && p.componentWillMount.__suppressDeprecationWarning !== !0 ? x = "componentWillMount" : typeof p.UNSAFE_componentWillMount == "function" && (x = "UNSAFE_componentWillMount"), typeof p.componentWillReceiveProps == "function" && p.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? D = "componentWillReceiveProps" : typeof p.UNSAFE_componentWillReceiveProps == "function" && (D = "UNSAFE_componentWillReceiveProps"), typeof p.componentWillUpdate == "function" && p.componentWillUpdate.__suppressDeprecationWarning !== !0 ? M = "componentWillUpdate" : typeof p.UNSAFE_componentWillUpdate == "function" && (M = "UNSAFE_componentWillUpdate"), x !== null || D !== null || M !== null) {
          var X = Be(t) || "Component", le = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          zv.has(X) || (zv.add(X), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, X, le, x !== null ? `
  ` + x : "", D !== null ? `
  ` + D : "", M !== null ? `
  ` + M : ""));
        }
      }
    }
    return a && Gy(e, r, i), p;
  }
  function RD(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Se(e) || "Component"), Pv.enqueueReplaceState(t, t.state, null));
  }
  function Tg(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Se(e) || "Component";
        Av.has(i) || (Av.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Pv.enqueueReplaceState(t, t.state, null);
    }
  }
  function $v(e, t, n, a) {
    CD(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = gg, Mv(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = xt(i);
    else {
      var o = Do(e, t, !0);
      r.context = _o(e, o);
    }
    {
      if (r.state === n) {
        var l = Be(t) || "Component";
        Hv.has(l) || (Hv.add(l), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", l));
      }
      e.mode & Tt && Ra.recordLegacyContextWarning(e, r), Ra.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Bv(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (RD(e, r), gc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var d = ze;
      d |= Ri, (e.mode & Ba) !== de && (d |= dr), e.flags |= d;
    }
  }
  function TD(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var o = r.context, l = t.contextType, u = Wn;
    if (typeof l == "object" && l !== null)
      u = xt(l);
    else {
      var d = Do(e, t, !0);
      u = _o(e, d);
    }
    var p = t.getDerivedStateFromProps, S = typeof p == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !S && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || o !== u) && Tg(e, r, n, u), mg();
    var b = e.memoizedState, x = r.state = b;
    if (gc(e, n, r, a), x = e.memoizedState, i === n && b === x && !tc() && !bc()) {
      if (typeof r.componentDidMount == "function") {
        var D = ze;
        D |= Ri, (e.mode & Ba) !== de && (D |= dr), e.flags |= D;
      }
      return !1;
    }
    typeof p == "function" && (Bv(e, t, p, n), x = e.memoizedState);
    var M = bc() || Eg(e, t, i, n, b, x, u);
    if (M) {
      if (!S && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var X = ze;
        X |= Ri, (e.mode & Ba) !== de && (X |= dr), e.flags |= X;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var le = ze;
        le |= Ri, (e.mode & Ba) !== de && (le |= dr), e.flags |= le;
      }
      e.memoizedProps = n, e.memoizedState = x;
    }
    return r.props = n, r.state = x, r.context = u, M;
  }
  function xD(e, t, n, a, r) {
    var i = t.stateNode;
    hg(e, t);
    var o = t.memoizedProps, l = t.type === t.elementType ? o : Ta(t.type, o);
    i.props = l;
    var u = t.pendingProps, d = i.context, p = n.contextType, S = Wn;
    if (typeof p == "object" && p !== null)
      S = xt(p);
    else {
      var b = Do(t, n, !0);
      S = _o(t, b);
    }
    var x = n.getDerivedStateFromProps, D = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !D && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (o !== u || d !== S) && Tg(t, i, a, S), mg();
    var M = t.memoizedState, X = i.state = M;
    if (gc(t, a, i, r), X = t.memoizedState, o === u && M === X && !tc() && !bc() && !Aa)
      return typeof i.componentDidUpdate == "function" && (o !== e.memoizedProps || M !== e.memoizedState) && (t.flags |= ze), typeof i.getSnapshotBeforeUpdate == "function" && (o !== e.memoizedProps || M !== e.memoizedState) && (t.flags |= Ei), !1;
    typeof x == "function" && (Bv(t, n, x, a), X = t.memoizedState);
    var le = bc() || Eg(t, n, l, a, M, X, S) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    Aa;
    return le ? (!D && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, X, S), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, X, S)), typeof i.componentDidUpdate == "function" && (t.flags |= ze), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= Ei)) : (typeof i.componentDidUpdate == "function" && (o !== e.memoizedProps || M !== e.memoizedState) && (t.flags |= ze), typeof i.getSnapshotBeforeUpdate == "function" && (o !== e.memoizedProps || M !== e.memoizedState) && (t.flags |= Ei), t.memoizedProps = a, t.memoizedState = X), i.props = a, i.state = X, i.context = S, le;
  }
  var Yv, Iv, qv, Gv, Wv, xg = function(e, t) {
  };
  Yv = !1, Iv = !1, qv = {}, Gv = {}, Wv = {}, xg = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Se(t) || "Component";
      Gv[n] || (Gv[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function vu(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & Tt || zn) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self)) {
        var r = Se(e) || "Component";
        qv[r] || (f('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', a), qv[r] = !0);
      }
      if (n._owner) {
        var i = n._owner, o;
        if (i) {
          var l = i;
          if (l.tag !== O)
            throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
          o = l.stateNode;
        }
        if (!o)
          throw new Error("Missing owner for string ref " + a + ". This error is likely caused by a bug in React. Please file an issue.");
        var u = o;
        xn(a, "ref");
        var d = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === d)
          return t.ref;
        var p = function(S) {
          var b = u.refs;
          b === gg && (b = u.refs = {}), S === null ? delete b[d] : b[d] = S;
        };
        return p._stringRef = d, p;
      } else {
        if (typeof a != "string")
          throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
        if (!n._owner)
          throw new Error("Element ref was specified as a string (" + a + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
      }
    }
    return a;
  }
  function Ec(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function Cc(e) {
    {
      var t = Se(e) || "Component";
      if (Wv[t])
        return;
      Wv[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function Dg(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function _g(e) {
    function t(C, L) {
      if (e) {
        var R = C.deletions;
        R === null ? (C.deletions = [L], C.flags |= Si) : R.push(L);
      }
    }
    function n(C, L) {
      if (!e)
        return null;
      for (var R = L; R !== null; )
        t(C, R), R = R.sibling;
      return null;
    }
    function a(C, L) {
      for (var R = /* @__PURE__ */ new Map(), j = L; j !== null; )
        j.key !== null ? R.set(j.key, j) : R.set(j.index, j), j = j.sibling;
      return R;
    }
    function r(C, L) {
      var R = Gi(C, L);
      return R.index = 0, R.sibling = null, R;
    }
    function i(C, L, R) {
      if (C.index = R, !e)
        return C.flags |= pm, L;
      var j = C.alternate;
      if (j !== null) {
        var J = j.index;
        return J < L ? (C.flags |= Rt, L) : J;
      } else
        return C.flags |= Rt, L;
    }
    function o(C) {
      return e && C.alternate === null && (C.flags |= Rt), C;
    }
    function l(C, L, R, j) {
      if (L === null || L.tag !== ee) {
        var J = Eh(R, C.mode, j);
        return J.return = C, J;
      } else {
        var W = r(L, R);
        return W.return = C, W;
      }
    }
    function u(C, L, R, j) {
      var J = R.type;
      if (J === ja)
        return p(C, L, R.props.children, j, R.key);
      if (L !== null && (L.elementType === J || // Keep this check inline so it only runs on the false path:
      yS(L, R) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof J == "object" && J !== null && J.$$typeof === ce && Dg(J) === L.type)) {
        var W = r(L, R.props);
        return W.ref = vu(C, L, R), W.return = C, W._debugSource = R._source, W._debugOwner = R._owner, W;
      }
      var pe = Sh(R, C.mode, j);
      return pe.ref = vu(C, L, R), pe.return = C, pe;
    }
    function d(C, L, R, j) {
      if (L === null || L.tag !== P || L.stateNode.containerInfo !== R.containerInfo || L.stateNode.implementation !== R.implementation) {
        var J = Ch(R, C.mode, j);
        return J.return = C, J;
      } else {
        var W = r(L, R.children || []);
        return W.return = C, W;
      }
    }
    function p(C, L, R, j, J) {
      if (L === null || L.tag !== xe) {
        var W = ui(R, C.mode, j, J);
        return W.return = C, W;
      } else {
        var pe = r(L, R);
        return pe.return = C, pe;
      }
    }
    function S(C, L, R) {
      if (typeof L == "string" && L !== "" || typeof L == "number") {
        var j = Eh("" + L, C.mode, R);
        return j.return = C, j;
      }
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case za: {
            var J = Sh(L, C.mode, R);
            return J.ref = vu(C, null, L), J.return = C, J;
          }
          case ya: {
            var W = Ch(L, C.mode, R);
            return W.return = C, W;
          }
          case ce: {
            var pe = L._payload, ge = L._init;
            return S(C, ge(pe), R);
          }
        }
        if (Pe(L) || rr(L)) {
          var Ke = ui(L, C.mode, R, null);
          return Ke.return = C, Ke;
        }
        Ec(C, L);
      }
      return typeof L == "function" && Cc(C), null;
    }
    function b(C, L, R, j) {
      var J = L !== null ? L.key : null;
      if (typeof R == "string" && R !== "" || typeof R == "number")
        return J !== null ? null : l(C, L, "" + R, j);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case za:
            return R.key === J ? u(C, L, R, j) : null;
          case ya:
            return R.key === J ? d(C, L, R, j) : null;
          case ce: {
            var W = R._payload, pe = R._init;
            return b(C, L, pe(W), j);
          }
        }
        if (Pe(R) || rr(R))
          return J !== null ? null : p(C, L, R, j, null);
        Ec(C, R);
      }
      return typeof R == "function" && Cc(C), null;
    }
    function x(C, L, R, j, J) {
      if (typeof j == "string" && j !== "" || typeof j == "number") {
        var W = C.get(R) || null;
        return l(L, W, "" + j, J);
      }
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case za: {
            var pe = C.get(j.key === null ? R : j.key) || null;
            return u(L, pe, j, J);
          }
          case ya: {
            var ge = C.get(j.key === null ? R : j.key) || null;
            return d(L, ge, j, J);
          }
          case ce:
            var Ke = j._payload, He = j._init;
            return x(C, L, R, He(Ke), J);
        }
        if (Pe(j) || rr(j)) {
          var St = C.get(R) || null;
          return p(L, St, j, J, null);
        }
        Ec(L, j);
      }
      return typeof j == "function" && Cc(L), null;
    }
    function D(C, L, R) {
      {
        if (typeof C != "object" || C === null)
          return L;
        switch (C.$$typeof) {
          case za:
          case ya:
            xg(C, R);
            var j = C.key;
            if (typeof j != "string")
              break;
            if (L === null) {
              L = /* @__PURE__ */ new Set(), L.add(j);
              break;
            }
            if (!L.has(j)) {
              L.add(j);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", j);
            break;
          case ce:
            var J = C._payload, W = C._init;
            D(W(J), L, R);
            break;
        }
      }
      return L;
    }
    function M(C, L, R, j) {
      for (var J = null, W = 0; W < R.length; W++) {
        var pe = R[W];
        J = D(pe, J, C);
      }
      for (var ge = null, Ke = null, He = L, St = 0, Fe = 0, ht = null; He !== null && Fe < R.length; Fe++) {
        He.index > Fe ? (ht = He, He = null) : ht = He.sibling;
        var vn = b(C, He, R[Fe], j);
        if (vn === null) {
          He === null && (He = ht);
          break;
        }
        e && He && vn.alternate === null && t(C, He), St = i(vn, St, Fe), Ke === null ? ge = vn : Ke.sibling = vn, Ke = vn, He = ht;
      }
      if (Fe === R.length) {
        if (n(C, He), Qt()) {
          var nn = Fe;
          Ni(C, nn);
        }
        return ge;
      }
      if (He === null) {
        for (; Fe < R.length; Fe++) {
          var Kn = S(C, R[Fe], j);
          Kn !== null && (St = i(Kn, St, Fe), Ke === null ? ge = Kn : Ke.sibling = Kn, Ke = Kn);
        }
        if (Qt()) {
          var En = Fe;
          Ni(C, En);
        }
        return ge;
      }
      for (var Cn = a(C, He); Fe < R.length; Fe++) {
        var pn = x(Cn, C, Fe, R[Fe], j);
        pn !== null && (e && pn.alternate !== null && Cn.delete(pn.key === null ? Fe : pn.key), St = i(pn, St, Fe), Ke === null ? ge = pn : Ke.sibling = pn, Ke = pn);
      }
      if (e && Cn.forEach(function(Qo) {
        return t(C, Qo);
      }), Qt()) {
        var wr = Fe;
        Ni(C, wr);
      }
      return ge;
    }
    function X(C, L, R, j) {
      var J = rr(R);
      if (typeof J != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        R[Symbol.toStringTag] === "Generator" && (Iv || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Iv = !0), R.entries === J && (Yv || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Yv = !0);
        var W = J.call(R);
        if (W)
          for (var pe = null, ge = W.next(); !ge.done; ge = W.next()) {
            var Ke = ge.value;
            pe = D(Ke, pe, C);
          }
      }
      var He = J.call(R);
      if (He == null)
        throw new Error("An iterable object provided no iterator.");
      for (var St = null, Fe = null, ht = L, vn = 0, nn = 0, Kn = null, En = He.next(); ht !== null && !En.done; nn++, En = He.next()) {
        ht.index > nn ? (Kn = ht, ht = null) : Kn = ht.sibling;
        var Cn = b(C, ht, En.value, j);
        if (Cn === null) {
          ht === null && (ht = Kn);
          break;
        }
        e && ht && Cn.alternate === null && t(C, ht), vn = i(Cn, vn, nn), Fe === null ? St = Cn : Fe.sibling = Cn, Fe = Cn, ht = Kn;
      }
      if (En.done) {
        if (n(C, ht), Qt()) {
          var pn = nn;
          Ni(C, pn);
        }
        return St;
      }
      if (ht === null) {
        for (; !En.done; nn++, En = He.next()) {
          var wr = S(C, En.value, j);
          wr !== null && (vn = i(wr, vn, nn), Fe === null ? St = wr : Fe.sibling = wr, Fe = wr);
        }
        if (Qt()) {
          var Qo = nn;
          Ni(C, Qo);
        }
        return St;
      }
      for (var $u = a(C, ht); !En.done; nn++, En = He.next()) {
        var Ja = x($u, C, nn, En.value, j);
        Ja !== null && (e && Ja.alternate !== null && $u.delete(Ja.key === null ? nn : Ja.key), vn = i(Ja, vn, nn), Fe === null ? St = Ja : Fe.sibling = Ja, Fe = Ja);
      }
      if (e && $u.forEach(function(FO) {
        return t(C, FO);
      }), Qt()) {
        var HO = nn;
        Ni(C, HO);
      }
      return St;
    }
    function le(C, L, R, j) {
      if (L !== null && L.tag === ee) {
        n(C, L.sibling);
        var J = r(L, R);
        return J.return = C, J;
      }
      n(C, L);
      var W = Eh(R, C.mode, j);
      return W.return = C, W;
    }
    function re(C, L, R, j) {
      for (var J = R.key, W = L; W !== null; ) {
        if (W.key === J) {
          var pe = R.type;
          if (pe === ja) {
            if (W.tag === xe) {
              n(C, W.sibling);
              var ge = r(W, R.props.children);
              return ge.return = C, ge._debugSource = R._source, ge._debugOwner = R._owner, ge;
            }
          } else if (W.elementType === pe || // Keep this check inline so it only runs on the false path:
          yS(W, R) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof pe == "object" && pe !== null && pe.$$typeof === ce && Dg(pe) === W.type) {
            n(C, W.sibling);
            var Ke = r(W, R.props);
            return Ke.ref = vu(C, W, R), Ke.return = C, Ke._debugSource = R._source, Ke._debugOwner = R._owner, Ke;
          }
          n(C, W);
          break;
        } else
          t(C, W);
        W = W.sibling;
      }
      if (R.type === ja) {
        var He = ui(R.props.children, C.mode, j, R.key);
        return He.return = C, He;
      } else {
        var St = Sh(R, C.mode, j);
        return St.ref = vu(C, L, R), St.return = C, St;
      }
    }
    function ke(C, L, R, j) {
      for (var J = R.key, W = L; W !== null; ) {
        if (W.key === J)
          if (W.tag === P && W.stateNode.containerInfo === R.containerInfo && W.stateNode.implementation === R.implementation) {
            n(C, W.sibling);
            var pe = r(W, R.children || []);
            return pe.return = C, pe;
          } else {
            n(C, W);
            break;
          }
        else
          t(C, W);
        W = W.sibling;
      }
      var ge = Ch(R, C.mode, j);
      return ge.return = C, ge;
    }
    function Oe(C, L, R, j) {
      var J = typeof R == "object" && R !== null && R.type === ja && R.key === null;
      if (J && (R = R.props.children), typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case za:
            return o(re(C, L, R, j));
          case ya:
            return o(ke(C, L, R, j));
          case ce:
            var W = R._payload, pe = R._init;
            return Oe(C, L, pe(W), j);
        }
        if (Pe(R))
          return M(C, L, R, j);
        if (rr(R))
          return X(C, L, R, j);
        Ec(C, R);
      }
      return typeof R == "string" && R !== "" || typeof R == "number" ? o(le(C, L, "" + R, j)) : (typeof R == "function" && Cc(C), n(C, L));
    }
    return Oe;
  }
  var Ao = _g(!0), wg = _g(!1);
  function DD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Gi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Gi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function _D(e, t) {
    for (var n = e.child; n !== null; )
      nO(n, t), n = n.sibling;
  }
  var pu = {}, Zr = Wr(pu), hu = Wr(pu), Rc = Wr(pu);
  function Tc(e) {
    if (e === pu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Og() {
    var e = Tc(Rc.current);
    return e;
  }
  function Qv(e, t) {
    fn(Rc, t, e), fn(hu, e, e), fn(Zr, pu, e);
    var n = Bx(t);
    cn(Zr, e), fn(Zr, n, e);
  }
  function No(e) {
    cn(Zr, e), cn(hu, e), cn(Rc, e);
  }
  function Kv() {
    var e = Tc(Zr.current);
    return e;
  }
  function Mg(e) {
    Tc(Rc.current);
    var t = Tc(Zr.current), n = Px(t, e.type);
    t !== n && (fn(hu, e, e), fn(Zr, n, e));
  }
  function Xv(e) {
    hu.current === e && (cn(Zr, e), cn(hu, e));
  }
  var wD = 0, Lg = 1, Ug = 1, mu = 2, xa = Wr(wD);
  function Jv(e, t) {
    return (e & t) !== 0;
  }
  function ko(e) {
    return e & Lg;
  }
  function Zv(e, t) {
    return e & Lg | t;
  }
  function OD(e, t) {
    return e | t;
  }
  function ei(e, t) {
    fn(xa, t, e);
  }
  function zo(e) {
    cn(xa, e);
  }
  function MD(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function xc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === ue) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Py(a) || iv(a))
            return t;
        }
      } else if (t.tag === Je && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & $e) !== fe;
        if (r)
          return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e)
        return null;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Un = (
    /*   */
    0
  ), Ot = (
    /* */
    1
  ), Ia = (
    /*  */
    2
  ), Mt = (
    /*    */
    4
  ), Kt = (
    /*   */
    8
  ), ep = [];
  function tp() {
    for (var e = 0; e < ep.length; e++) {
      var t = ep[e];
      t._workInProgressVersionPrimary = null;
    }
    ep.length = 0;
  }
  function LD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var K = h.ReactCurrentDispatcher, yu = h.ReactCurrentBatchConfig, np, jo;
  np = /* @__PURE__ */ new Set();
  var Vi = k, Qe = null, Lt = null, Ut = null, Dc = !1, gu = !1, bu = 0, UD = 0, AD = 25, A = null, ua = null, ti = -1, ap = !1;
  function Ye() {
    {
      var e = A;
      ua === null ? ua = [e] : ua.push(e);
    }
  }
  function I() {
    {
      var e = A;
      ua !== null && (ti++, ua[ti] !== e && ND(e));
    }
  }
  function Ho(e) {
    e != null && !Pe(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", A, typeof e);
  }
  function ND(e) {
    {
      var t = Se(Qe);
      if (!np.has(t) && (np.add(t), ua !== null)) {
        for (var n = "", a = 30, r = 0; r <= ti; r++) {
          for (var i = ua[r], o = r === ti ? e : i, l = r + 1 + ". " + i; l.length < a; )
            l += " ";
          l += o + `
`, n += l;
        }
        f(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, n);
      }
    }
  }
  function dn() {
    throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
  }
  function rp(e, t) {
    if (ap)
      return !1;
    if (t === null)
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", A), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, A, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Gn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Fo(e, t, n, a, r, i) {
    Vi = i, Qe = t, ua = e !== null ? e._debugHookTypes : null, ti = -1, ap = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = k, e !== null && e.memoizedState !== null ? K.current = eb : ua !== null ? K.current = Zg : K.current = Jg;
    var o = n(a, r);
    if (gu) {
      var l = 0;
      do {
        if (gu = !1, bu = 0, l >= AD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        l += 1, ap = !1, Lt = null, Ut = null, t.updateQueue = null, ti = -1, K.current = tb, o = n(a, r);
      } while (gu);
    }
    K.current = Fc, t._debugHookTypes = ua;
    var u = Lt !== null && Lt.next !== null;
    if (Vi = k, Qe = null, Lt = null, Ut = null, A = null, ua = null, ti = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Ae) !== de && f("Internal React error: Expected static flag was missing. Please notify the React team."), Dc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return o;
  }
  function Vo() {
    var e = bu !== 0;
    return bu = 0, e;
  }
  function Ag(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Ba) !== de ? t.flags &= ~(bs | dr | ga | ze) : t.flags &= ~(ga | ze), e.lanes = Ds(e.lanes, n);
  }
  function Ng() {
    if (K.current = Fc, Dc) {
      for (var e = Qe.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Dc = !1;
    }
    Vi = k, Qe = null, Lt = null, Ut = null, ua = null, ti = -1, A = null, Gg = !1, gu = !1, bu = 0;
  }
  function qa() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ut === null ? Qe.memoizedState = Ut = e : Ut = Ut.next = e, Ut;
  }
  function sa() {
    var e;
    if (Lt === null) {
      var t = Qe.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Lt.next;
    var n;
    if (Ut === null ? n = Qe.memoizedState : n = Ut.next, n !== null)
      Ut = n, n = Ut.next, Lt = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      Lt = e;
      var a = {
        memoizedState: Lt.memoizedState,
        baseState: Lt.baseState,
        baseQueue: Lt.baseQueue,
        queue: Lt.queue,
        next: null
      };
      Ut === null ? Qe.memoizedState = Ut = a : Ut = Ut.next = a;
    }
    return Ut;
  }
  function kg() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function ip(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function op(e, t, n) {
    var a = qa(), r;
    n !== void 0 ? r = n(t) : r = t, a.memoizedState = a.baseState = r;
    var i = {
      pending: null,
      interleaved: null,
      lanes: k,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var o = i.dispatch = HD.bind(null, Qe, i);
    return [a.memoizedState, o];
  }
  function lp(e, t, n) {
    var a = sa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = Lt, o = i.baseQueue, l = r.pending;
    if (l !== null) {
      if (o !== null) {
        var u = o.next, d = l.next;
        o.next = d, l.next = u;
      }
      i.baseQueue !== o && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = o = l, r.pending = null;
    }
    if (o !== null) {
      var p = o.next, S = i.baseState, b = null, x = null, D = null, M = p;
      do {
        var X = M.lane;
        if (mo(Vi, X)) {
          if (D !== null) {
            var re = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Yt,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            };
            D = D.next = re;
          }
          if (M.hasEagerState)
            S = M.eagerState;
          else {
            var ke = M.action;
            S = e(S, ke);
          }
        } else {
          var le = {
            lane: X,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null
          };
          D === null ? (x = D = le, b = S) : D = D.next = le, Qe.lanes = Te(Qe.lanes, X), Hu(X);
        }
        M = M.next;
      } while (M !== null && M !== p);
      D === null ? b = S : D.next = x, Gn(S, a.memoizedState) || Du(), a.memoizedState = S, a.baseState = b, a.baseQueue = D, r.lastRenderedState = S;
    }
    var Oe = r.interleaved;
    if (Oe !== null) {
      var C = Oe;
      do {
        var L = C.lane;
        Qe.lanes = Te(Qe.lanes, L), Hu(L), C = C.next;
      } while (C !== Oe);
    } else
      o === null && (r.lanes = k);
    var R = r.dispatch;
    return [a.memoizedState, R];
  }
  function up(e, t, n) {
    var a = sa(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = r.dispatch, o = r.pending, l = a.memoizedState;
    if (o !== null) {
      r.pending = null;
      var u = o.next, d = u;
      do {
        var p = d.action;
        l = e(l, p), d = d.next;
      } while (d !== u);
      Gn(l, a.memoizedState) || Du(), a.memoizedState = l, a.baseQueue === null && (a.baseState = l), r.lastRenderedState = l;
    }
    return [l, i];
  }
  function CL(e, t, n) {
  }
  function RL(e, t, n) {
  }
  function sp(e, t, n) {
    var a = Qe, r = qa(), i, o = Qt();
    if (o) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), jo || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), jo = !0);
    } else {
      if (i = t(), !jo) {
        var l = t();
        Gn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), jo = !0);
      }
      var u = af();
      if (u === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      xs(u, Vi) || zg(a, t, i);
    }
    r.memoizedState = i;
    var d = {
      value: i,
      getSnapshot: t
    };
    return r.queue = d, Lc(Hg.bind(null, a, d, e), [e]), a.flags |= ga, Su(Ot | Kt, jg.bind(null, a, d, i, t), void 0, null), i;
  }
  function _c(e, t, n) {
    var a = Qe, r = sa(), i = t();
    if (!jo) {
      var o = t();
      Gn(i, o) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), jo = !0);
    }
    var l = r.memoizedState, u = !Gn(l, i);
    u && (r.memoizedState = i, Du());
    var d = r.queue;
    if (Cu(Hg.bind(null, a, d, e), [e]), d.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Ut !== null && Ut.memoizedState.tag & Ot) {
      a.flags |= ga, Su(Ot | Kt, jg.bind(null, a, d, i, t), void 0, null);
      var p = af();
      if (p === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      xs(p, Vi) || zg(a, t, i);
    }
    return i;
  }
  function zg(e, t, n) {
    e.flags |= gs;
    var a = {
      getSnapshot: t,
      value: n
    }, r = Qe.updateQueue;
    if (r === null)
      r = kg(), Qe.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function jg(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Fg(t) && Vg(e);
  }
  function Hg(e, t, n) {
    var a = function() {
      Fg(t) && Vg(e);
    };
    return n(a);
  }
  function Fg(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !Gn(n, a);
    } catch {
      return !0;
    }
  }
  function Vg(e) {
    var t = Ln(e, me);
    t !== null && zt(t, e, me, at);
  }
  function wc(e) {
    var t = qa();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: k,
      dispatch: null,
      lastRenderedReducer: ip,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = FD.bind(null, Qe, n);
    return [t.memoizedState, a];
  }
  function cp(e) {
    return lp(ip);
  }
  function fp(e) {
    return up(ip);
  }
  function Su(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = Qe.updateQueue;
    if (i === null)
      i = kg(), Qe.updateQueue = i, i.lastEffect = r.next = r;
    else {
      var o = i.lastEffect;
      if (o === null)
        i.lastEffect = r.next = r;
      else {
        var l = o.next;
        o.next = r, r.next = l, i.lastEffect = r;
      }
    }
    return r;
  }
  function dp(e) {
    var t = qa();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function Oc(e) {
    var t = sa();
    return t.memoizedState;
  }
  function Eu(e, t, n, a) {
    var r = qa(), i = a === void 0 ? null : a;
    Qe.flags |= e, r.memoizedState = Su(Ot | t, n, void 0, i);
  }
  function Mc(e, t, n, a) {
    var r = sa(), i = a === void 0 ? null : a, o = void 0;
    if (Lt !== null) {
      var l = Lt.memoizedState;
      if (o = l.destroy, i !== null) {
        var u = l.deps;
        if (rp(i, u)) {
          r.memoizedState = Su(t, n, o, i);
          return;
        }
      }
    }
    Qe.flags |= e, r.memoizedState = Su(Ot | t, n, o, i);
  }
  function Lc(e, t) {
    return (Qe.mode & Ba) !== de ? Eu(bs | ga | Xf, Kt, e, t) : Eu(ga | Xf, Kt, e, t);
  }
  function Cu(e, t) {
    return Mc(ga, Kt, e, t);
  }
  function vp(e, t) {
    return Eu(ze, Ia, e, t);
  }
  function Uc(e, t) {
    return Mc(ze, Ia, e, t);
  }
  function pp(e, t) {
    var n = ze;
    return n |= Ri, (Qe.mode & Ba) !== de && (n |= dr), Eu(n, Mt, e, t);
  }
  function Ac(e, t) {
    return Mc(ze, Mt, e, t);
  }
  function Bg(e, t) {
    if (typeof t == "function") {
      var n = t, a = e();
      return n(a), function() {
        n(null);
      };
    } else if (t != null) {
      var r = t;
      r.hasOwnProperty("current") || f("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(r).join(", ") + "}");
      var i = e();
      return r.current = i, function() {
        r.current = null;
      };
    }
  }
  function hp(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = ze;
    return r |= Ri, (Qe.mode & Ba) !== de && (r |= dr), Eu(r, Mt, Bg.bind(null, t, e), a);
  }
  function Nc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Mc(ze, Mt, Bg.bind(null, t, e), a);
  }
  function kD(e, t) {
  }
  var kc = kD;
  function mp(e, t) {
    var n = qa(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function zc(e, t) {
    var n = sa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (rp(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function yp(e, t) {
    var n = qa(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function jc(e, t) {
    var n = sa(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (rp(a, i))
        return r[0];
    }
    var o = e();
    return n.memoizedState = [o, a], o;
  }
  function gp(e) {
    var t = qa();
    return t.memoizedState = e, e;
  }
  function Pg(e) {
    var t = sa(), n = Lt, a = n.memoizedState;
    return Yg(t, a, e);
  }
  function $g(e) {
    var t = sa();
    if (Lt === null)
      return t.memoizedState = e, e;
    var n = Lt.memoizedState;
    return Yg(t, n, e);
  }
  function Yg(e, t, n) {
    var a = !yR(Vi);
    if (a) {
      if (!Gn(n, t)) {
        var r = Am();
        Qe.lanes = Te(Qe.lanes, r), Hu(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Du()), e.memoizedState = n, n;
  }
  function zD(e, t, n) {
    var a = Sa();
    It(DR(a, hr)), e(!0);
    var r = yu.transition;
    yu.transition = {};
    var i = yu.transition;
    yu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (It(a), yu.transition = r, r === null && i._updatedFibers) {
        var o = i._updatedFibers.size;
        o > 10 && T("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function bp() {
    var e = wc(!1), t = e[0], n = e[1], a = zD.bind(null, n), r = qa();
    return r.memoizedState = a, [t, a];
  }
  function Ig() {
    var e = cp(), t = e[0], n = sa(), a = n.memoizedState;
    return [t, a];
  }
  function qg() {
    var e = fp(), t = e[0], n = sa(), a = n.memoizedState;
    return [t, a];
  }
  var Gg = !1;
  function jD() {
    return Gg;
  }
  function Sp() {
    var e = qa(), t = af(), n = t.identifierPrefix, a;
    if (Qt()) {
      var r = X0();
      a = ":" + n + "R" + r;
      var i = bu++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var o = UD++;
      a = ":" + n + "r" + o.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Hc() {
    var e = sa(), t = e.memoizedState;
    return t;
  }
  function HD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = oi(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Wg(e))
      Qg(t, r);
    else {
      var i = dg(e, t, r, a);
      if (i !== null) {
        var o = Sn();
        zt(i, e, a, o), Kg(i, t, a);
      }
    }
    Xg(e, a);
  }
  function FD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = oi(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Wg(e))
      Qg(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === k && (i === null || i.lanes === k)) {
        var o = t.lastRenderedReducer;
        if (o !== null) {
          var l;
          l = K.current, K.current = Da;
          try {
            var u = t.lastRenderedState, d = o(u, n);
            if (r.hasEagerState = !0, r.eagerState = d, Gn(d, u)) {
              yD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            K.current = l;
          }
        }
      }
      var p = dg(e, t, r, a);
      if (p !== null) {
        var S = Sn();
        zt(p, e, a, S), Kg(p, t, a);
      }
    }
    Xg(e, a);
  }
  function Wg(e) {
    var t = e.alternate;
    return e === Qe || t !== null && t === Qe;
  }
  function Qg(e, t) {
    gu = Dc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Kg(e, t, n) {
    if (Um(n)) {
      var a = t.lanes;
      a = Nm(a, e.pendingLanes);
      var r = Te(a, n);
      t.lanes = r, _d(e, r);
    }
  }
  function Xg(e, t, n) {
    nd(e, t);
  }
  var Fc = {
    readContext: xt,
    useCallback: dn,
    useContext: dn,
    useEffect: dn,
    useImperativeHandle: dn,
    useInsertionEffect: dn,
    useLayoutEffect: dn,
    useMemo: dn,
    useReducer: dn,
    useRef: dn,
    useState: dn,
    useDebugValue: dn,
    useDeferredValue: dn,
    useTransition: dn,
    useMutableSource: dn,
    useSyncExternalStore: dn,
    useId: dn,
    unstable_isNewReconciler: qt
  }, Jg = null, Zg = null, eb = null, tb = null, Ga = null, Da = null, Vc = null;
  {
    var Ep = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, ye = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Jg = {
      readContext: function(e) {
        return xt(e);
      },
      useCallback: function(e, t) {
        return A = "useCallback", Ye(), Ho(t), mp(e, t);
      },
      useContext: function(e) {
        return A = "useContext", Ye(), xt(e);
      },
      useEffect: function(e, t) {
        return A = "useEffect", Ye(), Ho(t), Lc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return A = "useImperativeHandle", Ye(), Ho(n), hp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return A = "useInsertionEffect", Ye(), Ho(t), vp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return A = "useLayoutEffect", Ye(), Ho(t), pp(e, t);
      },
      useMemo: function(e, t) {
        A = "useMemo", Ye(), Ho(t);
        var n = K.current;
        K.current = Ga;
        try {
          return yp(e, t);
        } finally {
          K.current = n;
        }
      },
      useReducer: function(e, t, n) {
        A = "useReducer", Ye();
        var a = K.current;
        K.current = Ga;
        try {
          return op(e, t, n);
        } finally {
          K.current = a;
        }
      },
      useRef: function(e) {
        return A = "useRef", Ye(), dp(e);
      },
      useState: function(e) {
        A = "useState", Ye();
        var t = K.current;
        K.current = Ga;
        try {
          return wc(e);
        } finally {
          K.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return A = "useDebugValue", Ye(), void 0;
      },
      useDeferredValue: function(e) {
        return A = "useDeferredValue", Ye(), gp(e);
      },
      useTransition: function() {
        return A = "useTransition", Ye(), bp();
      },
      useMutableSource: function(e, t, n) {
        return A = "useMutableSource", Ye(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return A = "useSyncExternalStore", Ye(), sp(e, t, n);
      },
      useId: function() {
        return A = "useId", Ye(), Sp();
      },
      unstable_isNewReconciler: qt
    }, Zg = {
      readContext: function(e) {
        return xt(e);
      },
      useCallback: function(e, t) {
        return A = "useCallback", I(), mp(e, t);
      },
      useContext: function(e) {
        return A = "useContext", I(), xt(e);
      },
      useEffect: function(e, t) {
        return A = "useEffect", I(), Lc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return A = "useImperativeHandle", I(), hp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return A = "useInsertionEffect", I(), vp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return A = "useLayoutEffect", I(), pp(e, t);
      },
      useMemo: function(e, t) {
        A = "useMemo", I();
        var n = K.current;
        K.current = Ga;
        try {
          return yp(e, t);
        } finally {
          K.current = n;
        }
      },
      useReducer: function(e, t, n) {
        A = "useReducer", I();
        var a = K.current;
        K.current = Ga;
        try {
          return op(e, t, n);
        } finally {
          K.current = a;
        }
      },
      useRef: function(e) {
        return A = "useRef", I(), dp(e);
      },
      useState: function(e) {
        A = "useState", I();
        var t = K.current;
        K.current = Ga;
        try {
          return wc(e);
        } finally {
          K.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return A = "useDebugValue", I(), void 0;
      },
      useDeferredValue: function(e) {
        return A = "useDeferredValue", I(), gp(e);
      },
      useTransition: function() {
        return A = "useTransition", I(), bp();
      },
      useMutableSource: function(e, t, n) {
        return A = "useMutableSource", I(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return A = "useSyncExternalStore", I(), sp(e, t, n);
      },
      useId: function() {
        return A = "useId", I(), Sp();
      },
      unstable_isNewReconciler: qt
    }, eb = {
      readContext: function(e) {
        return xt(e);
      },
      useCallback: function(e, t) {
        return A = "useCallback", I(), zc(e, t);
      },
      useContext: function(e) {
        return A = "useContext", I(), xt(e);
      },
      useEffect: function(e, t) {
        return A = "useEffect", I(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return A = "useImperativeHandle", I(), Nc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return A = "useInsertionEffect", I(), Uc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return A = "useLayoutEffect", I(), Ac(e, t);
      },
      useMemo: function(e, t) {
        A = "useMemo", I();
        var n = K.current;
        K.current = Da;
        try {
          return jc(e, t);
        } finally {
          K.current = n;
        }
      },
      useReducer: function(e, t, n) {
        A = "useReducer", I();
        var a = K.current;
        K.current = Da;
        try {
          return lp(e, t, n);
        } finally {
          K.current = a;
        }
      },
      useRef: function(e) {
        return A = "useRef", I(), Oc();
      },
      useState: function(e) {
        A = "useState", I();
        var t = K.current;
        K.current = Da;
        try {
          return cp(e);
        } finally {
          K.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return A = "useDebugValue", I(), kc();
      },
      useDeferredValue: function(e) {
        return A = "useDeferredValue", I(), Pg(e);
      },
      useTransition: function() {
        return A = "useTransition", I(), Ig();
      },
      useMutableSource: function(e, t, n) {
        return A = "useMutableSource", I(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return A = "useSyncExternalStore", I(), _c(e, t);
      },
      useId: function() {
        return A = "useId", I(), Hc();
      },
      unstable_isNewReconciler: qt
    }, tb = {
      readContext: function(e) {
        return xt(e);
      },
      useCallback: function(e, t) {
        return A = "useCallback", I(), zc(e, t);
      },
      useContext: function(e) {
        return A = "useContext", I(), xt(e);
      },
      useEffect: function(e, t) {
        return A = "useEffect", I(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return A = "useImperativeHandle", I(), Nc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return A = "useInsertionEffect", I(), Uc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return A = "useLayoutEffect", I(), Ac(e, t);
      },
      useMemo: function(e, t) {
        A = "useMemo", I();
        var n = K.current;
        K.current = Vc;
        try {
          return jc(e, t);
        } finally {
          K.current = n;
        }
      },
      useReducer: function(e, t, n) {
        A = "useReducer", I();
        var a = K.current;
        K.current = Vc;
        try {
          return up(e, t, n);
        } finally {
          K.current = a;
        }
      },
      useRef: function(e) {
        return A = "useRef", I(), Oc();
      },
      useState: function(e) {
        A = "useState", I();
        var t = K.current;
        K.current = Vc;
        try {
          return fp(e);
        } finally {
          K.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return A = "useDebugValue", I(), kc();
      },
      useDeferredValue: function(e) {
        return A = "useDeferredValue", I(), $g(e);
      },
      useTransition: function() {
        return A = "useTransition", I(), qg();
      },
      useMutableSource: function(e, t, n) {
        return A = "useMutableSource", I(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return A = "useSyncExternalStore", I(), _c(e, t);
      },
      useId: function() {
        return A = "useId", I(), Hc();
      },
      unstable_isNewReconciler: qt
    }, Ga = {
      readContext: function(e) {
        return Ep(), xt(e);
      },
      useCallback: function(e, t) {
        return A = "useCallback", ye(), Ye(), mp(e, t);
      },
      useContext: function(e) {
        return A = "useContext", ye(), Ye(), xt(e);
      },
      useEffect: function(e, t) {
        return A = "useEffect", ye(), Ye(), Lc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return A = "useImperativeHandle", ye(), Ye(), hp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return A = "useInsertionEffect", ye(), Ye(), vp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return A = "useLayoutEffect", ye(), Ye(), pp(e, t);
      },
      useMemo: function(e, t) {
        A = "useMemo", ye(), Ye();
        var n = K.current;
        K.current = Ga;
        try {
          return yp(e, t);
        } finally {
          K.current = n;
        }
      },
      useReducer: function(e, t, n) {
        A = "useReducer", ye(), Ye();
        var a = K.current;
        K.current = Ga;
        try {
          return op(e, t, n);
        } finally {
          K.current = a;
        }
      },
      useRef: function(e) {
        return A = "useRef", ye(), Ye(), dp(e);
      },
      useState: function(e) {
        A = "useState", ye(), Ye();
        var t = K.current;
        K.current = Ga;
        try {
          return wc(e);
        } finally {
          K.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return A = "useDebugValue", ye(), Ye(), void 0;
      },
      useDeferredValue: function(e) {
        return A = "useDeferredValue", ye(), Ye(), gp(e);
      },
      useTransition: function() {
        return A = "useTransition", ye(), Ye(), bp();
      },
      useMutableSource: function(e, t, n) {
        return A = "useMutableSource", ye(), Ye(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return A = "useSyncExternalStore", ye(), Ye(), sp(e, t, n);
      },
      useId: function() {
        return A = "useId", ye(), Ye(), Sp();
      },
      unstable_isNewReconciler: qt
    }, Da = {
      readContext: function(e) {
        return Ep(), xt(e);
      },
      useCallback: function(e, t) {
        return A = "useCallback", ye(), I(), zc(e, t);
      },
      useContext: function(e) {
        return A = "useContext", ye(), I(), xt(e);
      },
      useEffect: function(e, t) {
        return A = "useEffect", ye(), I(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return A = "useImperativeHandle", ye(), I(), Nc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return A = "useInsertionEffect", ye(), I(), Uc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return A = "useLayoutEffect", ye(), I(), Ac(e, t);
      },
      useMemo: function(e, t) {
        A = "useMemo", ye(), I();
        var n = K.current;
        K.current = Da;
        try {
          return jc(e, t);
        } finally {
          K.current = n;
        }
      },
      useReducer: function(e, t, n) {
        A = "useReducer", ye(), I();
        var a = K.current;
        K.current = Da;
        try {
          return lp(e, t, n);
        } finally {
          K.current = a;
        }
      },
      useRef: function(e) {
        return A = "useRef", ye(), I(), Oc();
      },
      useState: function(e) {
        A = "useState", ye(), I();
        var t = K.current;
        K.current = Da;
        try {
          return cp(e);
        } finally {
          K.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return A = "useDebugValue", ye(), I(), kc();
      },
      useDeferredValue: function(e) {
        return A = "useDeferredValue", ye(), I(), Pg(e);
      },
      useTransition: function() {
        return A = "useTransition", ye(), I(), Ig();
      },
      useMutableSource: function(e, t, n) {
        return A = "useMutableSource", ye(), I(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return A = "useSyncExternalStore", ye(), I(), _c(e, t);
      },
      useId: function() {
        return A = "useId", ye(), I(), Hc();
      },
      unstable_isNewReconciler: qt
    }, Vc = {
      readContext: function(e) {
        return Ep(), xt(e);
      },
      useCallback: function(e, t) {
        return A = "useCallback", ye(), I(), zc(e, t);
      },
      useContext: function(e) {
        return A = "useContext", ye(), I(), xt(e);
      },
      useEffect: function(e, t) {
        return A = "useEffect", ye(), I(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return A = "useImperativeHandle", ye(), I(), Nc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return A = "useInsertionEffect", ye(), I(), Uc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return A = "useLayoutEffect", ye(), I(), Ac(e, t);
      },
      useMemo: function(e, t) {
        A = "useMemo", ye(), I();
        var n = K.current;
        K.current = Da;
        try {
          return jc(e, t);
        } finally {
          K.current = n;
        }
      },
      useReducer: function(e, t, n) {
        A = "useReducer", ye(), I();
        var a = K.current;
        K.current = Da;
        try {
          return up(e, t, n);
        } finally {
          K.current = a;
        }
      },
      useRef: function(e) {
        return A = "useRef", ye(), I(), Oc();
      },
      useState: function(e) {
        A = "useState", ye(), I();
        var t = K.current;
        K.current = Da;
        try {
          return fp(e);
        } finally {
          K.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return A = "useDebugValue", ye(), I(), kc();
      },
      useDeferredValue: function(e) {
        return A = "useDeferredValue", ye(), I(), $g(e);
      },
      useTransition: function() {
        return A = "useTransition", ye(), I(), qg();
      },
      useMutableSource: function(e, t, n) {
        return A = "useMutableSource", ye(), I(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return A = "useSyncExternalStore", ye(), I(), _c(e, t);
      },
      useId: function() {
        return A = "useId", ye(), I(), Hc();
      },
      unstable_isNewReconciler: qt
    };
  }
  var ni = v.unstable_now, nb = 0, Bc = -1, Ru = -1, Pc = -1, Cp = !1, $c = !1;
  function ab() {
    return Cp;
  }
  function VD() {
    $c = !0;
  }
  function BD() {
    Cp = !1, $c = !1;
  }
  function PD() {
    Cp = $c, $c = !1;
  }
  function rb() {
    return nb;
  }
  function ib() {
    nb = ni();
  }
  function Rp(e) {
    Ru = ni(), e.actualStartTime < 0 && (e.actualStartTime = ni());
  }
  function ob(e) {
    Ru = -1;
  }
  function Yc(e, t) {
    if (Ru >= 0) {
      var n = ni() - Ru;
      e.actualDuration += n, t && (e.selfBaseDuration = n), Ru = -1;
    }
  }
  function Wa(e) {
    if (Bc >= 0) {
      var t = ni() - Bc;
      Bc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case N:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case be:
            var r = n.stateNode;
            r.effectDuration += t;
            return;
        }
        n = n.return;
      }
    }
  }
  function Tp(e) {
    if (Pc >= 0) {
      var t = ni() - Pc;
      Pc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case N:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case be:
            var r = n.stateNode;
            r !== null && (r.passiveEffectDuration += t);
            return;
        }
        n = n.return;
      }
    }
  }
  function Qa() {
    Bc = ni();
  }
  function xp() {
    Pc = ni();
  }
  function Dp(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function Bi(e, t) {
    return {
      value: e,
      source: t,
      stack: fl(t),
      digest: null
    };
  }
  function _p(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function $D(e, t) {
    return !0;
  }
  function wp(e, t) {
    try {
      var n = $D(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, o = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === O)
          return;
        console.error(a);
      }
      var l = r ? Se(r) : null, u = l ? "The above error occurred in the <" + l + "> component:" : "The above error occurred in one of your React components:", d;
      if (e.tag === N)
        d = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var p = Se(e) || "Anonymous";
        d = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + p + ".");
      }
      var S = u + `
` + o + `

` + ("" + d);
      console.error(S);
    } catch (b) {
      setTimeout(function() {
        throw b;
      });
    }
  }
  var YD = typeof WeakMap == "function" ? WeakMap : Map;
  function lb(e, t, n) {
    var a = Cr(at, n);
    a.tag = wv, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      zw(r), wp(e, t);
    }, a;
  }
  function Op(e, t, n) {
    var a = Cr(at, n);
    a.tag = wv;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        gS(e), wp(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (a.callback = function() {
      gS(e), wp(e, t), typeof r != "function" && Nw(this);
      var u = t.value, d = t.stack;
      this.componentDidCatch(u, {
        componentStack: d !== null ? d : ""
      }), typeof r != "function" && (Yn(e.lanes, me) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Se(e) || "Unknown"));
    }), a;
  }
  function ub(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new YD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = jw.bind(null, e, t, n);
      ba && Fu(e, n), t.then(i, i);
    }
  }
  function ID(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function qD(e, t) {
    var n = e.tag;
    if ((e.mode & Ae) === de && (n === U || n === ne || n === _e)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function sb(e) {
    var t = e;
    do {
      if (t.tag === ue && MD(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function cb(e, t, n, a, r) {
    if ((e.mode & Ae) === de) {
      if (e === t)
        e.flags |= yn;
      else {
        if (e.flags |= $e, n.flags |= Qf, n.flags &= ~(DC | Rl), n.tag === O) {
          var i = n.alternate;
          if (i === null)
            n.tag = an;
          else {
            var o = Cr(at, me);
            o.tag = pc, Jr(n, o, me);
          }
        }
        n.lanes = Te(n.lanes, me);
      }
      return e;
    }
    return e.flags |= yn, e.lanes = r, e;
  }
  function GD(e, t, n, a, r) {
    if (n.flags |= Rl, ba && Fu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      qD(n), Qt() && n.mode & Ae && eg();
      var o = sb(t);
      if (o !== null) {
        o.flags &= ~cr, cb(o, t, n, e, r), o.mode & Ae && ub(e, i, r), ID(o, e, i);
        return;
      } else {
        if (!mR(r)) {
          ub(e, i, r), uh();
          return;
        }
        var l = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = l;
      }
    } else if (Qt() && n.mode & Ae) {
      eg();
      var u = sb(t);
      if (u !== null) {
        (u.flags & yn) === fe && (u.flags |= cr), cb(u, t, n, e, r), Ev(Bi(a, n));
        return;
      }
    }
    a = Bi(a, n), Dw(a);
    var d = t;
    do {
      switch (d.tag) {
        case N: {
          var p = a;
          d.flags |= yn;
          var S = Ll(r);
          d.lanes = Te(d.lanes, S);
          var b = lb(d, p, S);
          Lv(d, b);
          return;
        }
        case O:
          var x = a, D = d.type, M = d.stateNode;
          if ((d.flags & $e) === fe && (typeof D.getDerivedStateFromError == "function" || M !== null && typeof M.componentDidCatch == "function" && !sS(M))) {
            d.flags |= yn;
            var X = Ll(r);
            d.lanes = Te(d.lanes, X);
            var le = Op(d, x, X);
            Lv(d, le);
            return;
          }
          break;
      }
      d = d.return;
    } while (d !== null);
  }
  function WD() {
    return null;
  }
  var Tu = h.ReactCurrentOwner, _a = !1, Mp, xu, Lp, Up, Ap, Pi, Np, Ic;
  Mp = {}, xu = {}, Lp = {}, Up = {}, Ap = {}, Pi = !1, Np = {}, Ic = {};
  function gn(e, t, n, a) {
    e === null ? t.child = wg(t, null, n, a) : t.child = Ao(t, e.child, n, a);
  }
  function QD(e, t, n, a) {
    t.child = Ao(t, e.child, null, a), t.child = Ao(t, null, n, a);
  }
  function fb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ea(
        i,
        a,
        // Resolved props
        "prop",
        Be(n)
      );
    }
    var o = n.render, l = t.ref, u, d;
    Uo(t, r), xl(t);
    {
      if (Tu.current = t, Pn(!0), u = Fo(e, t, o, a, l, r), d = Vo(), t.mode & Tt) {
        $t(!0);
        try {
          u = Fo(e, t, o, a, l, r), d = Vo();
        } finally {
          $t(!1);
        }
      }
      Pn(!1);
    }
    return fo(), e !== null && !_a ? (Ag(e, t, r), Rr(e, t, r)) : (Qt() && d && hv(t), t.flags |= uo, gn(e, t, u, r), t.child);
  }
  function db(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (eO(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var o = i;
        return o = Wo(i), t.tag = _e, t.type = o, jp(t, i), vb(e, t, o, a, r);
      }
      {
        var l = i.propTypes;
        l && Ea(
          l,
          a,
          // Resolved props
          "prop",
          Be(i)
        );
      }
      var u = bh(n.type, null, a, t, t.mode, r);
      return u.ref = t.ref, u.return = t, t.child = u, u;
    }
    {
      var d = n.type, p = d.propTypes;
      p && Ea(
        p,
        a,
        // Resolved props
        "prop",
        Be(d)
      );
    }
    var S = e.child, b = $p(e, r);
    if (!b) {
      var x = S.memoizedProps, D = n.compare;
      if (D = D !== null ? D : ql, D(x, a) && e.ref === t.ref)
        return Rr(e, t, r);
    }
    t.flags |= uo;
    var M = Gi(S, a);
    return M.ref = t.ref, M.return = t, t.child = M, M;
  }
  function vb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === ce) {
        var o = i, l = o._payload, u = o._init;
        try {
          i = u(l);
        } catch {
          i = null;
        }
        var d = i && i.propTypes;
        d && Ea(
          d,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          Be(i)
        );
      }
    }
    if (e !== null) {
      var p = e.memoizedProps;
      if (ql(p, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (_a = !1, t.pendingProps = a = p, $p(e, r))
          (e.flags & Qf) !== fe && (_a = !0);
        else
          return t.lanes = e.lanes, Rr(e, t, r);
    }
    return kp(e, t, n, a, r);
  }
  function pb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Jn)
      if ((t.mode & Ae) === de) {
        var o = {
          baseLanes: k,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = o, rf(t, n);
      } else if (Yn(n, $n)) {
        var S = {
          baseLanes: k,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = S;
        var b = i !== null ? i.baseLanes : n;
        rf(t, b);
      } else {
        var l = null, u;
        if (i !== null) {
          var d = i.baseLanes;
          u = Te(d, n);
        } else
          u = n;
        t.lanes = t.childLanes = $n;
        var p = {
          baseLanes: u,
          cachePool: l,
          transitions: null
        };
        return t.memoizedState = p, t.updateQueue = null, rf(t, u), null;
      }
    else {
      var x;
      i !== null ? (x = Te(i.baseLanes, n), t.memoizedState = null) : x = n, rf(t, x);
    }
    return gn(e, t, r, n), t.child;
  }
  function KD(e, t, n) {
    var a = t.pendingProps;
    return gn(e, t, a, n), t.child;
  }
  function XD(e, t, n) {
    var a = t.pendingProps.children;
    return gn(e, t, a, n), t.child;
  }
  function JD(e, t, n) {
    {
      t.flags |= ze;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return gn(e, t, i, n), t.child;
  }
  function hb(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Vr, t.flags |= Kf);
  }
  function kp(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Ea(
        i,
        a,
        // Resolved props
        "prop",
        Be(n)
      );
    }
    var o;
    {
      var l = Do(t, n, !0);
      o = _o(t, l);
    }
    var u, d;
    Uo(t, r), xl(t);
    {
      if (Tu.current = t, Pn(!0), u = Fo(e, t, n, a, o, r), d = Vo(), t.mode & Tt) {
        $t(!0);
        try {
          u = Fo(e, t, n, a, o, r), d = Vo();
        } finally {
          $t(!1);
        }
      }
      Pn(!1);
    }
    return fo(), e !== null && !_a ? (Ag(e, t, r), Rr(e, t, r)) : (Qt() && d && hv(t), t.flags |= uo, gn(e, t, u, r), t.child);
  }
  function mb(e, t, n, a, r) {
    {
      switch (hO(t)) {
        case !1: {
          var i = t.stateNode, o = t.type, l = new o(t.memoizedProps, i.context), u = l.state;
          i.updater.enqueueSetState(i, u, null);
          break;
        }
        case !0: {
          t.flags |= $e, t.flags |= yn;
          var d = new Error("Simulated error coming from DevTools"), p = Ll(r);
          t.lanes = Te(t.lanes, p);
          var S = Op(t, Bi(d, t), p);
          Lv(t, S);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var b = n.propTypes;
        b && Ea(
          b,
          a,
          // Resolved props
          "prop",
          Be(n)
        );
      }
    }
    var x;
    Ya(n) ? (x = !0, ac(t)) : x = !1, Uo(t, r);
    var D = t.stateNode, M;
    D === null ? (Gc(e, t), Rg(t, n, a), $v(t, n, a, r), M = !0) : e === null ? M = TD(t, n, a, r) : M = xD(e, t, n, a, r);
    var X = zp(e, t, n, M, x, r);
    {
      var le = t.stateNode;
      M && le.props !== a && (Pi || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Se(t) || "a component"), Pi = !0);
    }
    return X;
  }
  function zp(e, t, n, a, r, i) {
    hb(e, t);
    var o = (t.flags & $e) !== fe;
    if (!a && !o)
      return r && Ky(t, n, !1), Rr(e, t, i);
    var l = t.stateNode;
    Tu.current = t;
    var u;
    if (o && typeof n.getDerivedStateFromError != "function")
      u = null, ob();
    else {
      xl(t);
      {
        if (Pn(!0), u = l.render(), t.mode & Tt) {
          $t(!0);
          try {
            l.render();
          } finally {
            $t(!1);
          }
        }
        Pn(!1);
      }
      fo();
    }
    return t.flags |= uo, e !== null && o ? QD(e, t, u, i) : gn(e, t, u, i), t.memoizedState = l.state, r && Ky(t, n, !0), t.child;
  }
  function yb(e) {
    var t = e.stateNode;
    t.pendingContext ? Wy(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Wy(e, t.context, !1), Qv(e, t.containerInfo);
  }
  function ZD(e, t, n) {
    if (yb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    hg(e, t), gc(t, a, null, n);
    var o = t.memoizedState;
    t.stateNode;
    var l = o.element;
    if (r.isDehydrated) {
      var u = {
        element: l,
        isDehydrated: !1,
        cache: o.cache,
        pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
        transitions: o.transitions
      }, d = t.updateQueue;
      if (d.baseState = u, t.memoizedState = u, t.flags & cr) {
        var p = Bi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return gb(e, t, l, n, p);
      } else if (l !== i) {
        var S = Bi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return gb(e, t, l, n, S);
      } else {
        aD(t);
        var b = wg(t, null, l, n);
        t.child = b;
        for (var x = b; x; )
          x.flags = x.flags & ~Rt | fr, x = x.sibling;
      }
    } else {
      if (Mo(), l === i)
        return Rr(e, t, n);
      gn(e, t, l, n);
    }
    return t.child;
  }
  function gb(e, t, n, a, r) {
    return Mo(), Ev(r), t.flags |= cr, gn(e, t, n, a), t.child;
  }
  function e_(e, t, n) {
    Mg(t), e === null && Sv(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = r.children, l = tv(a, r);
    return l ? o = null : i !== null && tv(a, i) && (t.flags |= Cl), hb(e, t), gn(e, t, o, n), t.child;
  }
  function t_(e, t) {
    return e === null && Sv(t), null;
  }
  function n_(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i = n, o = i._payload, l = i._init, u = l(o);
    t.type = u;
    var d = t.tag = tO(u), p = Ta(u, r), S;
    switch (d) {
      case U:
        return jp(t, u), t.type = u = Wo(u), S = kp(null, t, u, p, a), S;
      case O:
        return t.type = u = vh(u), S = mb(null, t, u, p, a), S;
      case ne:
        return t.type = u = ph(u), S = fb(null, t, u, p, a), S;
      case Xe: {
        if (t.type !== t.elementType) {
          var b = u.propTypes;
          b && Ea(
            b,
            p,
            // Resolved for outer only
            "prop",
            Be(u)
          );
        }
        return S = db(
          null,
          t,
          u,
          Ta(u.type, p),
          // The inner type can have defaults too
          a
        ), S;
      }
    }
    var x = "";
    throw u !== null && typeof u == "object" && u.$$typeof === ce && (x = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + x));
  }
  function a_(e, t, n, a, r) {
    Gc(e, t), t.tag = O;
    var i;
    return Ya(n) ? (i = !0, ac(t)) : i = !1, Uo(t, r), Rg(t, n, a), $v(t, n, a, r), zp(null, t, n, !0, i, r);
  }
  function r_(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i;
    {
      var o = Do(t, n, !1);
      i = _o(t, o);
    }
    Uo(t, a);
    var l, u;
    xl(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var d = Be(n) || "Unknown";
        Mp[d] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", d, d), Mp[d] = !0);
      }
      t.mode & Tt && Ra.recordLegacyContextWarning(t, null), Pn(!0), Tu.current = t, l = Fo(null, t, n, r, i, a), u = Vo(), Pn(!1);
    }
    if (fo(), t.flags |= uo, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0) {
      var p = Be(n) || "Unknown";
      xu[p] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", p, p, p), xu[p] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0
    ) {
      {
        var S = Be(n) || "Unknown";
        xu[S] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", S, S, S), xu[S] = !0);
      }
      t.tag = O, t.memoizedState = null, t.updateQueue = null;
      var b = !1;
      return Ya(n) ? (b = !0, ac(t)) : b = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Mv(t), Cg(t, l), $v(t, n, r, a), zp(null, t, n, !0, b, a);
    } else {
      if (t.tag = U, t.mode & Tt) {
        $t(!0);
        try {
          l = Fo(null, t, n, r, i, a), u = Vo();
        } finally {
          $t(!1);
        }
      }
      return Qt() && u && hv(t), gn(null, t, l, a), jp(t, n), t.child;
    }
  }
  function jp(e, t) {
    {
      if (t && t.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = zr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), Ap[r] || (Ap[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var o = Be(t) || "Unknown";
        Up[o] || (f("%s: Function components do not support getDerivedStateFromProps.", o), Up[o] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var l = Be(t) || "Unknown";
        Lp[l] || (f("%s: Function components do not support contextType.", l), Lp[l] = !0);
      }
    }
  }
  var Hp = {
    dehydrated: null,
    treeContext: null,
    retryLane: Yt
  };
  function Fp(e) {
    return {
      baseLanes: e,
      cachePool: WD(),
      transitions: null
    };
  }
  function i_(e, t) {
    var n = null;
    return {
      baseLanes: Te(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function o_(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return Jv(e, mu);
  }
  function l_(e, t) {
    return Ds(e.childLanes, t);
  }
  function bb(e, t, n) {
    var a = t.pendingProps;
    mO(t) && (t.flags |= $e);
    var r = xa.current, i = !1, o = (t.flags & $e) !== fe;
    if (o || o_(r, e) ? (i = !0, t.flags &= ~$e) : (e === null || e.memoizedState !== null) && (r = OD(r, Ug)), r = ko(r), ei(t, r), e === null) {
      Sv(t);
      var l = t.memoizedState;
      if (l !== null) {
        var u = l.dehydrated;
        if (u !== null)
          return d_(t, u);
      }
      var d = a.children, p = a.fallback;
      if (i) {
        var S = u_(t, d, p, n), b = t.child;
        return b.memoizedState = Fp(n), t.memoizedState = Hp, S;
      } else
        return Vp(t, d);
    } else {
      var x = e.memoizedState;
      if (x !== null) {
        var D = x.dehydrated;
        if (D !== null)
          return v_(e, t, o, a, D, x, n);
      }
      if (i) {
        var M = a.fallback, X = a.children, le = c_(e, t, X, M, n), re = t.child, ke = e.child.memoizedState;
        return re.memoizedState = ke === null ? Fp(n) : i_(ke, n), re.childLanes = l_(e, n), t.memoizedState = Hp, le;
      } else {
        var Oe = a.children, C = s_(e, t, Oe, n);
        return t.memoizedState = null, C;
      }
    }
  }
  function Vp(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Bp(r, a);
    return i.return = e, e.child = i, i;
  }
  function u_(e, t, n, a) {
    var r = e.mode, i = e.child, o = {
      mode: "hidden",
      children: t
    }, l, u;
    return (r & Ae) === de && i !== null ? (l = i, l.childLanes = k, l.pendingProps = o, e.mode & We && (l.actualDuration = 0, l.actualStartTime = -1, l.selfBaseDuration = 0, l.treeBaseDuration = 0), u = ui(n, r, a, null)) : (l = Bp(o, r), u = ui(n, r, a, null)), l.return = e, u.return = e, l.sibling = u, e.child = l, u;
  }
  function Bp(e, t, n) {
    return SS(e, t, k, null);
  }
  function Sb(e, t) {
    return Gi(e, t);
  }
  function s_(e, t, n, a) {
    var r = e.child, i = r.sibling, o = Sb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Ae) === de && (o.lanes = a), o.return = t, o.sibling = null, i !== null) {
      var l = t.deletions;
      l === null ? (t.deletions = [i], t.flags |= Si) : l.push(i);
    }
    return t.child = o, o;
  }
  function c_(e, t, n, a, r) {
    var i = t.mode, o = e.child, l = o.sibling, u = {
      mode: "hidden",
      children: n
    }, d;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Ae) === de && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== o
    ) {
      var p = t.child;
      d = p, d.childLanes = k, d.pendingProps = u, t.mode & We && (d.actualDuration = 0, d.actualStartTime = -1, d.selfBaseDuration = o.selfBaseDuration, d.treeBaseDuration = o.treeBaseDuration), t.deletions = null;
    } else
      d = Sb(o, u), d.subtreeFlags = o.subtreeFlags & vr;
    var S;
    return l !== null ? S = Gi(l, a) : (S = ui(a, i, r, null), S.flags |= Rt), S.return = t, d.return = t, d.sibling = S, t.child = d, S;
  }
  function qc(e, t, n, a) {
    a !== null && Ev(a), Ao(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, o = Vp(t, i);
    return o.flags |= Rt, t.memoizedState = null, o;
  }
  function f_(e, t, n, a, r) {
    var i = t.mode, o = {
      mode: "visible",
      children: n
    }, l = Bp(o, i), u = ui(a, i, r, null);
    return u.flags |= Rt, l.return = t, u.return = t, l.sibling = u, t.child = l, (t.mode & Ae) !== de && Ao(t, e.child, null, r), u;
  }
  function d_(e, t, n) {
    return (e.mode & Ae) === de ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = me) : iv(t) ? e.lanes = Di : e.lanes = $n, null;
  }
  function v_(e, t, n, a, r, i, o) {
    if (n)
      if (t.flags & cr) {
        t.flags &= ~cr;
        var C = _p(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return qc(e, t, o, C);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= $e, null;
        var L = a.children, R = a.fallback, j = f_(e, t, L, R, o), J = t.child;
        return J.memoizedState = Fp(o), t.memoizedState = Hp, j;
      }
    else {
      if (tD(), (t.mode & Ae) === de)
        return qc(
          e,
          t,
          o,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (iv(r)) {
        var l, u, d;
        {
          var p = g0(r);
          l = p.digest, u = p.message, d = p.stack;
        }
        var S;
        u ? S = new Error(u) : S = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var b = _p(S, l, d);
        return qc(e, t, o, b);
      }
      var x = Yn(o, e.childLanes);
      if (_a || x) {
        var D = af();
        if (D !== null) {
          var M = TR(D, o);
          if (M !== Yt && M !== i.retryLane) {
            i.retryLane = M;
            var X = at;
            Ln(e, M), zt(D, e, M, X);
          }
        }
        uh();
        var le = _p(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return qc(e, t, o, le);
      } else if (Py(r)) {
        t.flags |= $e, t.child = e.child;
        var re = Hw.bind(null, e);
        return b0(r, re), null;
      } else {
        rD(t, r, i.treeContext);
        var ke = a.children, Oe = Vp(t, ke);
        return Oe.flags |= fr, Oe;
      }
    }
  }
  function Eb(e, t, n) {
    e.lanes = Te(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Te(a.lanes, t)), Dv(e.return, t, n);
  }
  function p_(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === ue) {
        var r = a.memoizedState;
        r !== null && Eb(a, n, e);
      } else if (a.tag === Je)
        Eb(a, n, e);
      else if (a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === e)
        return;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === e)
          return;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
  }
  function h_(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && xc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function m_(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Np[e])
      if (Np[e] = !0, typeof e == "string")
        switch (e.toLowerCase()) {
          case "together":
          case "forwards":
          case "backwards": {
            f('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
            break;
          }
          case "forward":
          case "backward": {
            f('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
            break;
          }
          default:
            f('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
            break;
        }
      else
        f('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
  }
  function y_(e, t) {
    e !== void 0 && !Ic[e] && (e !== "collapsed" && e !== "hidden" ? (Ic[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Ic[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Cb(e, t) {
    {
      var n = Pe(e), a = !n && typeof rr(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function g_(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (Pe(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Cb(e[n], n))
            return;
      } else {
        var a = rr(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), o = 0; !i.done; i = r.next()) {
              if (!Cb(i.value, o))
                return;
              o++;
            }
        } else
          f('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function Pp(e, t, n, a, r) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: r
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = n, i.tailMode = r);
  }
  function Rb(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, o = a.children;
    m_(r), y_(i, r), g_(o, r), gn(e, t, o, n);
    var l = xa.current, u = Jv(l, mu);
    if (u)
      l = Zv(l, mu), t.flags |= $e;
    else {
      var d = e !== null && (e.flags & $e) !== fe;
      d && p_(t, t.child, n), l = ko(l);
    }
    if (ei(t, l), (t.mode & Ae) === de)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var p = h_(t.child), S;
          p === null ? (S = t.child, t.child = null) : (S = p.sibling, p.sibling = null), Pp(
            t,
            !1,
            // isBackwards
            S,
            p,
            i
          );
          break;
        }
        case "backwards": {
          var b = null, x = t.child;
          for (t.child = null; x !== null; ) {
            var D = x.alternate;
            if (D !== null && xc(D) === null) {
              t.child = x;
              break;
            }
            var M = x.sibling;
            x.sibling = b, b = x, x = M;
          }
          Pp(
            t,
            !0,
            // isBackwards
            b,
            null,
            // last
            i
          );
          break;
        }
        case "together": {
          Pp(
            t,
            !1,
            // isBackwards
            null,
            // tail
            null,
            // last
            void 0
          );
          break;
        }
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function b_(e, t, n) {
    Qv(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Ao(t, null, a, n) : gn(e, t, a, n), t.child;
  }
  var Tb = !1;
  function S_(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, o = t.memoizedProps, l = i.value;
    {
      "value" in i || Tb || (Tb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var u = t.type.propTypes;
      u && Ea(u, i, "prop", "Context.Provider");
    }
    if (fg(t, r, l), o !== null) {
      var d = o.value;
      if (Gn(d, l)) {
        if (o.children === i.children && !tc())
          return Rr(e, t, n);
      } else
        pD(t, r, n);
    }
    var p = i.children;
    return gn(e, t, p, n), t.child;
  }
  var xb = !1;
  function E_(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (xb || (xb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Uo(t, n);
    var o = xt(a);
    xl(t);
    var l;
    return Tu.current = t, Pn(!0), l = i(o), Pn(!1), fo(), t.flags |= uo, gn(e, t, l, n), t.child;
  }
  function Du() {
    _a = !0;
  }
  function Gc(e, t) {
    (t.mode & Ae) === de && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Rt);
  }
  function Rr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), ob(), Hu(t.lanes), Yn(n, t.childLanes) ? (DD(e, t), t.child) : null;
  }
  function C_(e, t, n) {
    {
      var a = t.return;
      if (a === null)
        throw new Error("Cannot swap the root fiber.");
      if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, t === a.child)
        a.child = n;
      else {
        var r = a.child;
        if (r === null)
          throw new Error("Expected parent to have a child.");
        for (; r.sibling !== t; )
          if (r = r.sibling, r === null)
            throw new Error("Expected to find the previous sibling.");
        r.sibling = n;
      }
      var i = a.deletions;
      return i === null ? (a.deletions = [e], a.flags |= Si) : i.push(e), n.flags |= Rt, n;
    }
  }
  function $p(e, t) {
    var n = e.lanes;
    return !!Yn(n, t);
  }
  function R_(e, t, n) {
    switch (t.tag) {
      case N:
        yb(t), t.stateNode, Mo();
        break;
      case Y:
        Mg(t);
        break;
      case O: {
        var a = t.type;
        Ya(a) && ac(t);
        break;
      }
      case P:
        Qv(t, t.stateNode.containerInfo);
        break;
      case $: {
        var r = t.memoizedProps.value, i = t.type._context;
        fg(t, i, r);
        break;
      }
      case be:
        {
          var o = Yn(n, t.childLanes);
          o && (t.flags |= ze);
          {
            var l = t.stateNode;
            l.effectDuration = 0, l.passiveEffectDuration = 0;
          }
        }
        break;
      case ue: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return ei(t, ko(xa.current)), t.flags |= $e, null;
          var d = t.child, p = d.childLanes;
          if (Yn(n, p))
            return bb(e, t, n);
          ei(t, ko(xa.current));
          var S = Rr(e, t, n);
          return S !== null ? S.sibling : null;
        } else
          ei(t, ko(xa.current));
        break;
      }
      case Je: {
        var b = (e.flags & $e) !== fe, x = Yn(n, t.childLanes);
        if (b) {
          if (x)
            return Rb(e, t, n);
          t.flags |= $e;
        }
        var D = t.memoizedState;
        if (D !== null && (D.rendering = null, D.tail = null, D.lastEffect = null), ei(t, xa.current), x)
          break;
        return null;
      }
      case we:
      case Ve:
        return t.lanes = k, pb(e, t, n);
    }
    return Rr(e, t, n);
  }
  function Db(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return C_(e, t, bh(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || tc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        _a = !0;
      else {
        var i = $p(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & $e) === fe)
          return _a = !1, R_(e, t, n);
        (e.flags & Qf) !== fe ? _a = !0 : _a = !1;
      }
    } else if (_a = !1, Qt() && Q0(t)) {
      var o = t.index, l = K0();
      Zy(t, l, o);
    }
    switch (t.lanes = k, t.tag) {
      case F:
        return r_(e, t, t.type, n);
      case jt: {
        var u = t.elementType;
        return n_(e, t, u, n);
      }
      case U: {
        var d = t.type, p = t.pendingProps, S = t.elementType === d ? p : Ta(d, p);
        return kp(e, t, d, S, n);
      }
      case O: {
        var b = t.type, x = t.pendingProps, D = t.elementType === b ? x : Ta(b, x);
        return mb(e, t, b, D, n);
      }
      case N:
        return ZD(e, t, n);
      case Y:
        return e_(e, t, n);
      case ee:
        return t_(e, t);
      case ue:
        return bb(e, t, n);
      case P:
        return b_(e, t, n);
      case ne: {
        var M = t.type, X = t.pendingProps, le = t.elementType === M ? X : Ta(M, X);
        return fb(e, t, M, le, n);
      }
      case xe:
        return KD(e, t, n);
      case ie:
        return XD(e, t, n);
      case be:
        return JD(e, t, n);
      case $:
        return S_(e, t, n);
      case Ce:
        return E_(e, t, n);
      case Xe: {
        var re = t.type, ke = t.pendingProps, Oe = Ta(re, ke);
        if (t.type !== t.elementType) {
          var C = re.propTypes;
          C && Ea(
            C,
            Oe,
            // Resolved for outer only
            "prop",
            Be(re)
          );
        }
        return Oe = Ta(re.type, Oe), db(e, t, re, Oe, n);
      }
      case _e:
        return vb(e, t, t.type, t.pendingProps, n);
      case an: {
        var L = t.type, R = t.pendingProps, j = t.elementType === L ? R : Ta(L, R);
        return a_(e, t, L, j, n);
      }
      case Je:
        return Rb(e, t, n);
      case kn:
        break;
      case we:
        return pb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Bo(e) {
    e.flags |= ze;
  }
  function _b(e) {
    e.flags |= Vr, e.flags |= Kf;
  }
  var wb, Yp, Ob, Mb;
  wb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === Y || r.tag === ee)
        qx(e, r.stateNode);
      else if (r.tag !== P) {
        if (r.child !== null) {
          r.child.return = r, r = r.child;
          continue;
        }
      }
      if (r === t)
        return;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t)
          return;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
  }, Yp = function(e, t) {
  }, Ob = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var o = t.stateNode, l = Kv(), u = Wx(o, n, i, a, r, l);
      t.updateQueue = u, u && Bo(t);
    }
  }, Mb = function(e, t, n, a) {
    n !== a && Bo(t);
  };
  function _u(e, t) {
    if (!Qt())
      switch (e.tailMode) {
        case "hidden": {
          for (var n = e.tail, a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        }
        case "collapsed": {
          for (var r = e.tail, i = null; r !== null; )
            r.alternate !== null && (i = r), r = r.sibling;
          i === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : i.sibling = null;
          break;
        }
      }
  }
  function Xt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = k, a = fe;
    if (t) {
      if ((e.mode & We) !== de) {
        for (var u = e.selfBaseDuration, d = e.child; d !== null; )
          n = Te(n, Te(d.lanes, d.childLanes)), a |= d.subtreeFlags & vr, a |= d.flags & vr, u += d.treeBaseDuration, d = d.sibling;
        e.treeBaseDuration = u;
      } else
        for (var p = e.child; p !== null; )
          n = Te(n, Te(p.lanes, p.childLanes)), a |= p.subtreeFlags & vr, a |= p.flags & vr, p.return = e, p = p.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & We) !== de) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, o = e.child; o !== null; )
          n = Te(n, Te(o.lanes, o.childLanes)), a |= o.subtreeFlags, a |= o.flags, r += o.actualDuration, i += o.treeBaseDuration, o = o.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var l = e.child; l !== null; )
          n = Te(n, Te(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, l.return = e, l = l.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function T_(e, t, n) {
    if (sD() && (t.mode & Ae) !== de && (t.flags & $e) === fe)
      return og(t), Mo(), t.flags |= cr | Rl | yn, !1;
    var a = uc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (lD(t), Xt(t), (t.mode & We) !== de) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Mo(), (t.flags & $e) === fe && (t.memoizedState = null), t.flags |= ze, Xt(t), (t.mode & We) !== de) {
          var o = n !== null;
          if (o) {
            var l = t.child;
            l !== null && (t.treeBaseDuration -= l.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return lg(), !0;
  }
  function Lb(e, t, n) {
    var a = t.pendingProps;
    switch (mv(t), t.tag) {
      case F:
      case jt:
      case _e:
      case U:
      case ne:
      case xe:
      case ie:
      case be:
      case Ce:
      case Xe:
        return Xt(t), null;
      case O: {
        var r = t.type;
        return Ya(r) && nc(t), Xt(t), null;
      }
      case N: {
        var i = t.stateNode;
        if (No(t), dv(t), tp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var o = uc(t);
          if (o)
            Bo(t);
          else if (e !== null) {
            var l = e.memoizedState;
            // Check if this is a client root
            (!l.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & cr) !== fe) && (t.flags |= Ei, lg());
          }
        }
        return Yp(e, t), Xt(t), null;
      }
      case Y: {
        Xv(t);
        var u = Og(), d = t.type;
        if (e !== null && t.stateNode != null)
          Ob(e, t, d, a, u), e.ref !== t.ref && _b(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return Xt(t), null;
          }
          var p = Kv(), S = uc(t);
          if (S)
            iD(t, u, p) && Bo(t);
          else {
            var b = Ix(d, a, u, p, t);
            wb(b, t, !1, !1), t.stateNode = b, Gx(b, d, a, u) && Bo(t);
          }
          t.ref !== null && _b(t);
        }
        return Xt(t), null;
      }
      case ee: {
        var x = a;
        if (e && t.stateNode != null) {
          var D = e.memoizedProps;
          Mb(e, t, D, x);
        } else {
          if (typeof x != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var M = Og(), X = Kv(), le = uc(t);
          le ? oD(t) && Bo(t) : t.stateNode = Qx(x, M, X, t);
        }
        return Xt(t), null;
      }
      case ue: {
        zo(t);
        var re = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var ke = T_(e, t, re);
          if (!ke)
            return t.flags & yn ? t : null;
        }
        if ((t.flags & $e) !== fe)
          return t.lanes = n, (t.mode & We) !== de && Dp(t), t;
        var Oe = re !== null, C = e !== null && e.memoizedState !== null;
        if (Oe !== C && Oe) {
          var L = t.child;
          if (L.flags |= Ci, (t.mode & Ae) !== de) {
            var R = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !da);
            R || Jv(xa.current, Ug) ? xw() : uh();
          }
        }
        var j = t.updateQueue;
        if (j !== null && (t.flags |= ze), Xt(t), (t.mode & We) !== de && Oe) {
          var J = t.child;
          J !== null && (t.treeBaseDuration -= J.treeBaseDuration);
        }
        return null;
      }
      case P:
        return No(t), Yp(e, t), e === null && P0(t.stateNode.containerInfo), Xt(t), null;
      case $:
        var W = t.type._context;
        return xv(W, t), Xt(t), null;
      case an: {
        var pe = t.type;
        return Ya(pe) && nc(t), Xt(t), null;
      }
      case Je: {
        zo(t);
        var ge = t.memoizedState;
        if (ge === null)
          return Xt(t), null;
        var Ke = (t.flags & $e) !== fe, He = ge.rendering;
        if (He === null)
          if (Ke)
            _u(ge, !1);
          else {
            var St = _w() && (e === null || (e.flags & $e) === fe);
            if (!St)
              for (var Fe = t.child; Fe !== null; ) {
                var ht = xc(Fe);
                if (ht !== null) {
                  Ke = !0, t.flags |= $e, _u(ge, !1);
                  var vn = ht.updateQueue;
                  return vn !== null && (t.updateQueue = vn, t.flags |= ze), t.subtreeFlags = fe, _D(t, n), ei(t, Zv(xa.current, mu)), t.child;
                }
                Fe = Fe.sibling;
              }
            ge.tail !== null && Pt() > Jb() && (t.flags |= $e, Ke = !0, _u(ge, !1), t.lanes = Om);
          }
        else {
          if (!Ke) {
            var nn = xc(He);
            if (nn !== null) {
              t.flags |= $e, Ke = !0;
              var Kn = nn.updateQueue;
              if (Kn !== null && (t.updateQueue = Kn, t.flags |= ze), _u(ge, !0), ge.tail === null && ge.tailMode === "hidden" && !He.alternate && !Qt())
                return Xt(t), null;
            } else
              // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Pt() * 2 - ge.renderingStartTime > Jb() && n !== $n && (t.flags |= $e, Ke = !0, _u(ge, !1), t.lanes = Om);
          }
          if (ge.isBackwards)
            He.sibling = t.child, t.child = He;
          else {
            var En = ge.last;
            En !== null ? En.sibling = He : t.child = He, ge.last = He;
          }
        }
        if (ge.tail !== null) {
          var Cn = ge.tail;
          ge.rendering = Cn, ge.tail = Cn.sibling, ge.renderingStartTime = Pt(), Cn.sibling = null;
          var pn = xa.current;
          return Ke ? pn = Zv(pn, mu) : pn = ko(pn), ei(t, pn), Cn;
        }
        return Xt(t), null;
      }
      case kn:
        break;
      case we:
      case Ve: {
        lh(t);
        var wr = t.memoizedState, Qo = wr !== null;
        if (e !== null) {
          var $u = e.memoizedState, Ja = $u !== null;
          Ja !== Qo && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Jn && (t.flags |= Ci);
        }
        return !Qo || (t.mode & Ae) === de ? Xt(t) : Yn(Xa, $n) && (Xt(t), t.subtreeFlags & (Rt | ze) && (t.flags |= Ci)), null;
      }
      case mt:
        return null;
      case yt:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function x_(e, t, n) {
    switch (mv(t), t.tag) {
      case O: {
        var a = t.type;
        Ya(a) && nc(t);
        var r = t.flags;
        return r & yn ? (t.flags = r & ~yn | $e, (t.mode & We) !== de && Dp(t), t) : null;
      }
      case N: {
        t.stateNode, No(t), dv(t), tp();
        var i = t.flags;
        return (i & yn) !== fe && (i & $e) === fe ? (t.flags = i & ~yn | $e, t) : null;
      }
      case Y:
        return Xv(t), null;
      case ue: {
        zo(t);
        var o = t.memoizedState;
        if (o !== null && o.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Mo();
        }
        var l = t.flags;
        return l & yn ? (t.flags = l & ~yn | $e, (t.mode & We) !== de && Dp(t), t) : null;
      }
      case Je:
        return zo(t), null;
      case P:
        return No(t), null;
      case $:
        var u = t.type._context;
        return xv(u, t), null;
      case we:
      case Ve:
        return lh(t), null;
      case mt:
        return null;
      default:
        return null;
    }
  }
  function Ub(e, t, n) {
    switch (mv(t), t.tag) {
      case O: {
        var a = t.type.childContextTypes;
        a != null && nc(t);
        break;
      }
      case N: {
        t.stateNode, No(t), dv(t), tp();
        break;
      }
      case Y: {
        Xv(t);
        break;
      }
      case P:
        No(t);
        break;
      case ue:
        zo(t);
        break;
      case Je:
        zo(t);
        break;
      case $:
        var r = t.type._context;
        xv(r, t);
        break;
      case we:
      case Ve:
        lh(t);
        break;
    }
  }
  var Ab = null;
  Ab = /* @__PURE__ */ new Set();
  var Wc = !1, Jt = !1, D_ = typeof WeakSet == "function" ? WeakSet : Set, te = null, Po = null, $o = null;
  function __(e) {
    qf(null, function() {
      throw e;
    }), Gf();
  }
  var w_ = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & We)
      try {
        Qa(), t.componentWillUnmount();
      } finally {
        Wa(e);
      }
    else
      t.componentWillUnmount();
  };
  function Nb(e, t) {
    try {
      ai(Mt, e);
    } catch (n) {
      nt(e, t, n);
    }
  }
  function Ip(e, t, n) {
    try {
      w_(e, n);
    } catch (a) {
      nt(e, t, a);
    }
  }
  function O_(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      nt(e, t, a);
    }
  }
  function kb(e, t) {
    try {
      jb(e);
    } catch (n) {
      nt(e, t, n);
    }
  }
  function Yo(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (va && pa && e.mode & We)
            try {
              Qa(), a = n(null);
            } finally {
              Wa(e);
            }
          else
            a = n(null);
        } catch (r) {
          nt(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Se(e));
      } else
        n.current = null;
  }
  function Qc(e, t, n) {
    try {
      n();
    } catch (a) {
      nt(e, t, a);
    }
  }
  var zb = !1;
  function M_(e, t) {
    $x(e.containerInfo), te = t, L_();
    var n = zb;
    return zb = !1, n;
  }
  function L_() {
    for (; te !== null; ) {
      var e = te, t = e.child;
      (e.subtreeFlags & Jf) !== fe && t !== null ? (t.return = e, te = t) : U_();
    }
  }
  function U_() {
    for (; te !== null; ) {
      var e = te;
      ft(e);
      try {
        A_(e);
      } catch (n) {
        nt(e, e.return, n);
      }
      Bt();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, te = t;
        return;
      }
      te = e.return;
    }
  }
  function A_(e) {
    var t = e.alternate, n = e.flags;
    if ((n & Ei) !== fe) {
      switch (ft(e), e.tag) {
        case U:
        case ne:
        case _e:
          break;
        case O: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Pi && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Se(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Se(e) || "instance"));
            var o = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : Ta(e.type, a), r);
            {
              var l = Ab;
              o === void 0 && !l.has(e.type) && (l.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Se(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = o;
          }
          break;
        }
        case N: {
          {
            var u = e.stateNode;
            p0(u.containerInfo);
          }
          break;
        }
        case Y:
        case ee:
        case P:
        case an:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      Bt();
    }
  }
  function wa(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, o = i;
      do {
        if ((o.tag & e) === e) {
          var l = o.destroy;
          o.destroy = void 0, l !== void 0 && ((e & Kt) !== Un ? QC(t) : (e & Mt) !== Un && Tm(t), (e & Ia) !== Un && Vu(!0), Qc(t, n, l), (e & Ia) !== Un && Vu(!1), (e & Kt) !== Un ? KC() : (e & Mt) !== Un && xm());
        }
        o = o.next;
      } while (o !== i);
    }
  }
  function ai(e, t) {
    var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
    if (a !== null) {
      var r = a.next, i = r;
      do {
        if ((i.tag & e) === e) {
          (e & Kt) !== Un ? GC(t) : (e & Mt) !== Un && XC(t);
          var o = i.create;
          (e & Ia) !== Un && Vu(!0), i.destroy = o(), (e & Ia) !== Un && Vu(!1), (e & Kt) !== Un ? WC() : (e & Mt) !== Un && JC();
          {
            var l = i.destroy;
            if (l !== void 0 && typeof l != "function") {
              var u = void 0;
              (i.tag & Mt) !== fe ? u = "useLayoutEffect" : (i.tag & Ia) !== fe ? u = "useInsertionEffect" : u = "useEffect";
              var d = void 0;
              l === null ? d = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof l.then == "function" ? d = `

It looks like you wrote ` + u + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + u + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : d = " You returned: " + l, f("%s must not return anything besides a function, which is used for clean-up.%s", u, d);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function N_(e, t) {
    if ((t.flags & ze) !== fe)
      switch (t.tag) {
        case be: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, o = rb(), l = t.alternate === null ? "mount" : "update";
          ab() && (l = "nested-update"), typeof i == "function" && i(r, l, n, o);
          var u = t.return;
          e:
            for (; u !== null; ) {
              switch (u.tag) {
                case N:
                  var d = u.stateNode;
                  d.passiveEffectDuration += n;
                  break e;
                case be:
                  var p = u.stateNode;
                  p.passiveEffectDuration += n;
                  break e;
              }
              u = u.return;
            }
          break;
        }
      }
  }
  function k_(e, t, n, a) {
    if ((n.flags & Tl) !== fe)
      switch (n.tag) {
        case U:
        case ne:
        case _e: {
          if (!Jt)
            if (n.mode & We)
              try {
                Qa(), ai(Mt | Ot, n);
              } finally {
                Wa(n);
              }
            else
              ai(Mt | Ot, n);
          break;
        }
        case O: {
          var r = n.stateNode;
          if (n.flags & ze && !Jt)
            if (t === null)
              if (n.type === n.elementType && !Pi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Se(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Se(n) || "instance")), n.mode & We)
                try {
                  Qa(), r.componentDidMount();
                } finally {
                  Wa(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : Ta(n.type, t.memoizedProps), o = t.memoizedState;
              if (n.type === n.elementType && !Pi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Se(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Se(n) || "instance")), n.mode & We)
                try {
                  Qa(), r.componentDidUpdate(i, o, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Wa(n);
                }
              else
                r.componentDidUpdate(i, o, r.__reactInternalSnapshotBeforeUpdate);
            }
          var l = n.updateQueue;
          l !== null && (n.type === n.elementType && !Pi && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Se(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Se(n) || "instance")), yg(n, l, r));
          break;
        }
        case N: {
          var u = n.updateQueue;
          if (u !== null) {
            var d = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case Y:
                  d = n.child.stateNode;
                  break;
                case O:
                  d = n.child.stateNode;
                  break;
              }
            yg(n, u, d);
          }
          break;
        }
        case Y: {
          var p = n.stateNode;
          if (t === null && n.flags & ze) {
            var S = n.type, b = n.memoizedProps;
            e0(p, S, b);
          }
          break;
        }
        case ee:
          break;
        case P:
          break;
        case be: {
          {
            var x = n.memoizedProps, D = x.onCommit, M = x.onRender, X = n.stateNode.effectDuration, le = rb(), re = t === null ? "mount" : "update";
            ab() && (re = "nested-update"), typeof M == "function" && M(n.memoizedProps.id, re, n.actualDuration, n.treeBaseDuration, n.actualStartTime, le);
            {
              typeof D == "function" && D(n.memoizedProps.id, re, X, le), Uw(n);
              var ke = n.return;
              e:
                for (; ke !== null; ) {
                  switch (ke.tag) {
                    case N:
                      var Oe = ke.stateNode;
                      Oe.effectDuration += X;
                      break e;
                    case be:
                      var C = ke.stateNode;
                      C.effectDuration += X;
                      break e;
                  }
                  ke = ke.return;
                }
            }
          }
          break;
        }
        case ue: {
          $_(e, n);
          break;
        }
        case Je:
        case an:
        case kn:
        case we:
        case Ve:
        case yt:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    Jt || n.flags & Vr && jb(n);
  }
  function z_(e) {
    switch (e.tag) {
      case U:
      case ne:
      case _e: {
        if (e.mode & We)
          try {
            Qa(), Nb(e, e.return);
          } finally {
            Wa(e);
          }
        else
          Nb(e, e.return);
        break;
      }
      case O: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && O_(e, e.return, t), kb(e, e.return);
        break;
      }
      case Y: {
        kb(e, e.return);
        break;
      }
    }
  }
  function j_(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === Y) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? c0(r) : d0(a.stateNode, a.memoizedProps);
          } catch (o) {
            nt(e, e.return, o);
          }
        }
      } else if (a.tag === ee) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? f0(i) : v0(i, a.memoizedProps);
          } catch (o) {
            nt(e, e.return, o);
          }
      } else if (!((a.tag === we || a.tag === Ve) && a.memoizedState !== null && a !== e)) {
        if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
      }
      if (a === e)
        return;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === e)
          return;
        n === a && (n = null), a = a.return;
      }
      n === a && (n = null), a.sibling.return = a.return, a = a.sibling;
    }
  }
  function jb(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode, a;
      switch (e.tag) {
        case Y:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & We)
          try {
            Qa(), r = t(a);
          } finally {
            Wa(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Se(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Se(e)), t.current = a;
    }
  }
  function H_(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function Hb(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Hb(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === Y) {
        var n = e.stateNode;
        n !== null && I0(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function F_(e) {
    for (var t = e.return; t !== null; ) {
      if (Fb(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Fb(e) {
    return e.tag === Y || e.tag === N || e.tag === P;
  }
  function Vb(e) {
    var t = e;
    e:
      for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || Fb(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== Y && t.tag !== ee && t.tag !== ct; ) {
          if (t.flags & Rt || t.child === null || t.tag === P)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & Rt))
          return t.stateNode;
      }
  }
  function V_(e) {
    var t = F_(e);
    switch (t.tag) {
      case Y: {
        var n = t.stateNode;
        t.flags & Cl && (By(n), t.flags &= ~Cl);
        var a = Vb(e);
        Gp(e, a, n);
        break;
      }
      case N:
      case P: {
        var r = t.stateNode.containerInfo, i = Vb(e);
        qp(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function qp(e, t, n) {
    var a = e.tag, r = a === Y || a === ee;
    if (r) {
      var i = e.stateNode;
      t ? o0(n, i, t) : r0(n, i);
    } else if (a !== P) {
      var o = e.child;
      if (o !== null) {
        qp(o, t, n);
        for (var l = o.sibling; l !== null; )
          qp(l, t, n), l = l.sibling;
      }
    }
  }
  function Gp(e, t, n) {
    var a = e.tag, r = a === Y || a === ee;
    if (r) {
      var i = e.stateNode;
      t ? i0(n, i, t) : a0(n, i);
    } else if (a !== P) {
      var o = e.child;
      if (o !== null) {
        Gp(o, t, n);
        for (var l = o.sibling; l !== null; )
          Gp(l, t, n), l = l.sibling;
      }
    }
  }
  var Zt = null, Oa = !1;
  function B_(e, t, n) {
    {
      var a = t;
      e:
        for (; a !== null; ) {
          switch (a.tag) {
            case Y: {
              Zt = a.stateNode, Oa = !1;
              break e;
            }
            case N: {
              Zt = a.stateNode.containerInfo, Oa = !0;
              break e;
            }
            case P: {
              Zt = a.stateNode.containerInfo, Oa = !0;
              break e;
            }
          }
          a = a.return;
        }
      if (Zt === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Bb(e, t, n), Zt = null, Oa = !1;
    }
    H_(n);
  }
  function ri(e, t, n) {
    for (var a = n.child; a !== null; )
      Bb(e, t, a), a = a.sibling;
  }
  function Bb(e, t, n) {
    switch ($C(n), n.tag) {
      case Y:
        Jt || Yo(n, t);
      case ee: {
        {
          var a = Zt, r = Oa;
          Zt = null, ri(e, t, n), Zt = a, Oa = r, Zt !== null && (Oa ? u0(Zt, n.stateNode) : l0(Zt, n.stateNode));
        }
        return;
      }
      case ct: {
        Zt !== null && (Oa ? s0(Zt, n.stateNode) : rv(Zt, n.stateNode));
        return;
      }
      case P: {
        {
          var i = Zt, o = Oa;
          Zt = n.stateNode.containerInfo, Oa = !0, ri(e, t, n), Zt = i, Oa = o;
        }
        return;
      }
      case U:
      case ne:
      case Xe:
      case _e: {
        if (!Jt) {
          var l = n.updateQueue;
          if (l !== null) {
            var u = l.lastEffect;
            if (u !== null) {
              var d = u.next, p = d;
              do {
                var S = p, b = S.destroy, x = S.tag;
                b !== void 0 && ((x & Ia) !== Un ? Qc(n, t, b) : (x & Mt) !== Un && (Tm(n), n.mode & We ? (Qa(), Qc(n, t, b), Wa(n)) : Qc(n, t, b), xm())), p = p.next;
              } while (p !== d);
            }
          }
        }
        ri(e, t, n);
        return;
      }
      case O: {
        if (!Jt) {
          Yo(n, t);
          var D = n.stateNode;
          typeof D.componentWillUnmount == "function" && Ip(n, t, D);
        }
        ri(e, t, n);
        return;
      }
      case kn: {
        ri(e, t, n);
        return;
      }
      case we: {
        if (
          // TODO: Remove this dead flag
          n.mode & Ae
        ) {
          var M = Jt;
          Jt = M || n.memoizedState !== null, ri(e, t, n), Jt = M;
        } else
          ri(e, t, n);
        break;
      }
      default: {
        ri(e, t, n);
        return;
      }
    }
  }
  function P_(e) {
    e.memoizedState;
  }
  function $_(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && w0(i);
        }
      }
    }
  }
  function Pb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new D_()), t.forEach(function(a) {
        var r = Fw.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), ba)
            if (Po !== null && $o !== null)
              Fu($o, Po);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function Y_(e, t, n) {
    Po = n, $o = e, ft(t), $b(t, e), ft(t), Po = null, $o = null;
  }
  function Ma(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          B_(e, t, i);
        } catch (u) {
          nt(i, t, u);
        }
      }
    var o = os();
    if (t.subtreeFlags & Zf)
      for (var l = t.child; l !== null; )
        ft(l), $b(l, e), l = l.sibling;
    ft(o);
  }
  function $b(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case U:
      case ne:
      case Xe:
      case _e: {
        if (Ma(t, e), Ka(e), r & ze) {
          try {
            wa(Ia | Ot, e, e.return), ai(Ia | Ot, e);
          } catch (pe) {
            nt(e, e.return, pe);
          }
          if (e.mode & We) {
            try {
              Qa(), wa(Mt | Ot, e, e.return);
            } catch (pe) {
              nt(e, e.return, pe);
            }
            Wa(e);
          } else
            try {
              wa(Mt | Ot, e, e.return);
            } catch (pe) {
              nt(e, e.return, pe);
            }
        }
        return;
      }
      case O: {
        Ma(t, e), Ka(e), r & Vr && a !== null && Yo(a, a.return);
        return;
      }
      case Y: {
        Ma(t, e), Ka(e), r & Vr && a !== null && Yo(a, a.return);
        {
          if (e.flags & Cl) {
            var i = e.stateNode;
            try {
              By(i);
            } catch (pe) {
              nt(e, e.return, pe);
            }
          }
          if (r & ze) {
            var o = e.stateNode;
            if (o != null) {
              var l = e.memoizedProps, u = a !== null ? a.memoizedProps : l, d = e.type, p = e.updateQueue;
              if (e.updateQueue = null, p !== null)
                try {
                  t0(o, p, d, u, l, e);
                } catch (pe) {
                  nt(e, e.return, pe);
                }
            }
          }
        }
        return;
      }
      case ee: {
        if (Ma(t, e), Ka(e), r & ze) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var S = e.stateNode, b = e.memoizedProps, x = a !== null ? a.memoizedProps : b;
          try {
            n0(S, x, b);
          } catch (pe) {
            nt(e, e.return, pe);
          }
        }
        return;
      }
      case N: {
        if (Ma(t, e), Ka(e), r & ze && a !== null) {
          var D = a.memoizedState;
          if (D.isDehydrated)
            try {
              _0(t.containerInfo);
            } catch (pe) {
              nt(e, e.return, pe);
            }
        }
        return;
      }
      case P: {
        Ma(t, e), Ka(e);
        return;
      }
      case ue: {
        Ma(t, e), Ka(e);
        var M = e.child;
        if (M.flags & Ci) {
          var X = M.stateNode, le = M.memoizedState, re = le !== null;
          if (X.isHidden = re, re) {
            var ke = M.alternate !== null && M.alternate.memoizedState !== null;
            ke || Tw();
          }
        }
        if (r & ze) {
          try {
            P_(e);
          } catch (pe) {
            nt(e, e.return, pe);
          }
          Pb(e);
        }
        return;
      }
      case we: {
        var Oe = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Ae
        ) {
          var C = Jt;
          Jt = C || Oe, Ma(t, e), Jt = C;
        } else
          Ma(t, e);
        if (Ka(e), r & Ci) {
          var L = e.stateNode, R = e.memoizedState, j = R !== null, J = e;
          if (L.isHidden = j, j && !Oe && (J.mode & Ae) !== de) {
            te = J;
            for (var W = J.child; W !== null; )
              te = W, q_(W), W = W.sibling;
          }
          j_(J, j);
        }
        return;
      }
      case Je: {
        Ma(t, e), Ka(e), r & ze && Pb(e);
        return;
      }
      case kn:
        return;
      default: {
        Ma(t, e), Ka(e);
        return;
      }
    }
  }
  function Ka(e) {
    var t = e.flags;
    if (t & Rt) {
      try {
        V_(e);
      } catch (n) {
        nt(e, e.return, n);
      }
      e.flags &= ~Rt;
    }
    t & fr && (e.flags &= ~fr);
  }
  function I_(e, t, n) {
    Po = n, $o = t, te = e, Yb(e, t, n), Po = null, $o = null;
  }
  function Yb(e, t, n) {
    for (var a = (e.mode & Ae) !== de; te !== null; ) {
      var r = te, i = r.child;
      if (r.tag === we && a) {
        var o = r.memoizedState !== null, l = o || Wc;
        if (l) {
          Wp(e, t, n);
          continue;
        } else {
          var u = r.alternate, d = u !== null && u.memoizedState !== null, p = d || Jt, S = Wc, b = Jt;
          Wc = l, Jt = p, Jt && !b && (te = r, G_(r));
          for (var x = i; x !== null; )
            te = x, Yb(
              x,
              // New root; bubble back up to here and stop.
              t,
              n
            ), x = x.sibling;
          te = r, Wc = S, Jt = b, Wp(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & Tl) !== fe && i !== null ? (i.return = r, te = i) : Wp(e, t, n);
    }
  }
  function Wp(e, t, n) {
    for (; te !== null; ) {
      var a = te;
      if ((a.flags & Tl) !== fe) {
        var r = a.alternate;
        ft(a);
        try {
          k_(t, r, a, n);
        } catch (o) {
          nt(a, a.return, o);
        }
        Bt();
      }
      if (a === e) {
        te = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, te = i;
        return;
      }
      te = a.return;
    }
  }
  function q_(e) {
    for (; te !== null; ) {
      var t = te, n = t.child;
      switch (t.tag) {
        case U:
        case ne:
        case Xe:
        case _e: {
          if (t.mode & We)
            try {
              Qa(), wa(Mt, t, t.return);
            } finally {
              Wa(t);
            }
          else
            wa(Mt, t, t.return);
          break;
        }
        case O: {
          Yo(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Ip(t, t.return, a);
          break;
        }
        case Y: {
          Yo(t, t.return);
          break;
        }
        case we: {
          var r = t.memoizedState !== null;
          if (r) {
            Ib(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, te = n) : Ib(e);
    }
  }
  function Ib(e) {
    for (; te !== null; ) {
      var t = te;
      if (t === e) {
        te = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, te = n;
        return;
      }
      te = t.return;
    }
  }
  function G_(e) {
    for (; te !== null; ) {
      var t = te, n = t.child;
      if (t.tag === we) {
        var a = t.memoizedState !== null;
        if (a) {
          qb(e);
          continue;
        }
      }
      n !== null ? (n.return = t, te = n) : qb(e);
    }
  }
  function qb(e) {
    for (; te !== null; ) {
      var t = te;
      ft(t);
      try {
        z_(t);
      } catch (a) {
        nt(t, t.return, a);
      }
      if (Bt(), t === e) {
        te = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, te = n;
        return;
      }
      te = t.return;
    }
  }
  function W_(e, t, n, a) {
    te = t, Q_(t, e, n, a);
  }
  function Q_(e, t, n, a) {
    for (; te !== null; ) {
      var r = te, i = r.child;
      (r.subtreeFlags & so) !== fe && i !== null ? (i.return = r, te = i) : K_(e, t, n, a);
    }
  }
  function K_(e, t, n, a) {
    for (; te !== null; ) {
      var r = te;
      if ((r.flags & ga) !== fe) {
        ft(r);
        try {
          X_(t, r, n, a);
        } catch (o) {
          nt(r, r.return, o);
        }
        Bt();
      }
      if (r === e) {
        te = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, te = i;
        return;
      }
      te = r.return;
    }
  }
  function X_(e, t, n, a) {
    switch (t.tag) {
      case U:
      case ne:
      case _e: {
        if (t.mode & We) {
          xp();
          try {
            ai(Kt | Ot, t);
          } finally {
            Tp(t);
          }
        } else
          ai(Kt | Ot, t);
        break;
      }
    }
  }
  function J_(e) {
    te = e, Z_();
  }
  function Z_() {
    for (; te !== null; ) {
      var e = te, t = e.child;
      if ((te.flags & Si) !== fe) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            te = r, nw(r, e);
          }
          {
            var i = e.alternate;
            if (i !== null) {
              var o = i.child;
              if (o !== null) {
                i.child = null;
                do {
                  var l = o.sibling;
                  o.sibling = null, o = l;
                } while (o !== null);
              }
            }
          }
          te = e;
        }
      }
      (e.subtreeFlags & so) !== fe && t !== null ? (t.return = e, te = t) : ew();
    }
  }
  function ew() {
    for (; te !== null; ) {
      var e = te;
      (e.flags & ga) !== fe && (ft(e), tw(e), Bt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, te = t;
        return;
      }
      te = e.return;
    }
  }
  function tw(e) {
    switch (e.tag) {
      case U:
      case ne:
      case _e: {
        e.mode & We ? (xp(), wa(Kt | Ot, e, e.return), Tp(e)) : wa(Kt | Ot, e, e.return);
        break;
      }
    }
  }
  function nw(e, t) {
    for (; te !== null; ) {
      var n = te;
      ft(n), rw(n, t), Bt();
      var a = n.child;
      a !== null ? (a.return = n, te = a) : aw(e);
    }
  }
  function aw(e) {
    for (; te !== null; ) {
      var t = te, n = t.sibling, a = t.return;
      if (Hb(t), t === e) {
        te = null;
        return;
      }
      if (n !== null) {
        n.return = a, te = n;
        return;
      }
      te = a;
    }
  }
  function rw(e, t) {
    switch (e.tag) {
      case U:
      case ne:
      case _e: {
        e.mode & We ? (xp(), wa(Kt, e, t), Tp(e)) : wa(Kt, e, t);
        break;
      }
    }
  }
  function iw(e) {
    switch (e.tag) {
      case U:
      case ne:
      case _e: {
        try {
          ai(Mt | Ot, e);
        } catch (n) {
          nt(e, e.return, n);
        }
        break;
      }
      case O: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          nt(e, e.return, n);
        }
        break;
      }
    }
  }
  function ow(e) {
    switch (e.tag) {
      case U:
      case ne:
      case _e: {
        try {
          ai(Kt | Ot, e);
        } catch (t) {
          nt(e, e.return, t);
        }
        break;
      }
    }
  }
  function lw(e) {
    switch (e.tag) {
      case U:
      case ne:
      case _e: {
        try {
          wa(Mt | Ot, e, e.return);
        } catch (n) {
          nt(e, e.return, n);
        }
        break;
      }
      case O: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && Ip(e, e.return, t);
        break;
      }
    }
  }
  function uw(e) {
    switch (e.tag) {
      case U:
      case ne:
      case _e:
        try {
          wa(Kt | Ot, e, e.return);
        } catch (t) {
          nt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var wu = Symbol.for;
    wu("selector.component"), wu("selector.has_pseudo_class"), wu("selector.role"), wu("selector.test_id"), wu("selector.text");
  }
  var sw = [];
  function cw() {
    sw.forEach(function(e) {
      return e();
    });
  }
  var fw = h.ReactCurrentActQueue;
  function dw(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Gb() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && fw.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var vw = Math.ceil, Qp = h.ReactCurrentDispatcher, Kp = h.ReactCurrentOwner, en = h.ReactCurrentBatchConfig, La = h.ReactCurrentActQueue, At = (
    /*             */
    0
  ), Wb = (
    /*               */
    1
  ), tn = (
    /*                */
    2
  ), ca = (
    /*                */
    4
  ), Tr = 0, Ou = 1, $i = 2, Kc = 3, Mu = 4, Qb = 5, Xp = 6, Ne = At, bn = null, dt = null, Nt = k, Xa = k, Jp = Wr(k), kt = Tr, Lu = null, Xc = k, Uu = k, Jc = k, Au = null, An = null, Zp = 0, Kb = 500, Xb = 1 / 0, pw = 500, xr = null;
  function Nu() {
    Xb = Pt() + pw;
  }
  function Jb() {
    return Xb;
  }
  var Zc = !1, eh = null, Io = null, Yi = !1, ii = null, ku = k, th = [], nh = null, hw = 50, zu = 0, ah = null, rh = !1, ef = !1, mw = 50, qo = 0, tf = null, ju = at, nf = k, Zb = !1;
  function af() {
    return bn;
  }
  function Sn() {
    return (Ne & (tn | ca)) !== At ? Pt() : (ju !== at || (ju = Pt()), ju);
  }
  function oi(e) {
    var t = e.mode;
    if ((t & Ae) === de)
      return me;
    if ((Ne & tn) !== At && Nt !== k)
      return Ll(Nt);
    var n = dD() !== fD;
    if (n) {
      if (en.transition !== null) {
        var a = en.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return nf === Yt && (nf = Am()), nf;
    }
    var r = Sa();
    if (r !== Yt)
      return r;
    var i = Kx();
    return i;
  }
  function yw(e) {
    var t = e.mode;
    return (t & Ae) === de ? me : SR();
  }
  function zt(e, t, n, a) {
    Bw(), Zb && f("useInsertionEffect must not schedule updates."), rh && (ef = !0), Ul(e, n, a), (Ne & tn) !== k && e === bn ? Yw(t) : (ba && zm(e, t, n), Iw(t), e === bn && ((Ne & tn) === At && (Uu = Te(Uu, n)), kt === Mu && li(e, Nt)), Nn(e, a), n === me && Ne === At && (t.mode & Ae) === de && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !La.isBatchingLegacy && (Nu(), Jy()));
  }
  function gw(e, t, n) {
    var a = e.current;
    a.lanes = t, Ul(e, t, n), Nn(e, n);
  }
  function bw(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Ne & tn) !== At
    );
  }
  function Nn(e, t) {
    var n = e.callbackNode;
    pR(e, t);
    var a = Ts(e, e === bn ? Nt : k);
    if (a === k) {
      n !== null && hS(n), e.callbackNode = null, e.callbackPriority = Yt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(La.current !== null && n !== fh)) {
      n == null && i !== me && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && hS(n);
    var o;
    if (r === me)
      e.tag === Qr ? (La.isBatchingLegacy !== null && (La.didScheduleLegacyUpdate = !0), W0(nS.bind(null, e))) : Xy(nS.bind(null, e)), La.current !== null ? La.current.push(Kr) : Jx(function() {
        (Ne & (tn | ca)) === At && Kr();
      }), o = null;
    else {
      var l;
      switch (Fm(a)) {
        case In:
          l = Ss;
          break;
        case hr:
          l = ed;
          break;
        case mr:
          l = xi;
          break;
        case _s:
          l = td;
          break;
        default:
          l = xi;
          break;
      }
      o = dh(l, eS.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = o;
  }
  function eS(e, t) {
    if (BD(), ju = at, nf = k, (Ne & (tn | ca)) !== At)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = _r();
    if (a && e.callbackNode !== n)
      return null;
    var r = Ts(e, e === bn ? Nt : k);
    if (r === k)
      return null;
    var i = !xs(e, r) && !bR(e, r) && !t, o = i ? Ow(e, r) : of(e, r);
    if (o !== Tr) {
      if (o === $i) {
        var l = Rd(e);
        l !== k && (r = l, o = ih(e, l));
      }
      if (o === Ou) {
        var u = Lu;
        throw Ii(e, k), li(e, r), Nn(e, Pt()), u;
      }
      if (o === Xp)
        li(e, r);
      else {
        var d = !xs(e, r), p = e.current.alternate;
        if (d && !Ew(p)) {
          if (o = of(e, r), o === $i) {
            var S = Rd(e);
            S !== k && (r = S, o = ih(e, S));
          }
          if (o === Ou) {
            var b = Lu;
            throw Ii(e, k), li(e, r), Nn(e, Pt()), b;
          }
        }
        e.finishedWork = p, e.finishedLanes = r, Sw(e, o, r);
      }
    }
    return Nn(e, Pt()), e.callbackNode === n ? eS.bind(null, e) : null;
  }
  function ih(e, t) {
    var n = Au;
    if (ws(e)) {
      var a = Ii(e, t);
      a.flags |= cr, B0(e.containerInfo);
    }
    var r = of(e, t);
    if (r !== $i) {
      var i = An;
      An = n, i !== null && tS(i);
    }
    return r;
  }
  function tS(e) {
    An === null ? An = e : An.push.apply(An, e);
  }
  function Sw(e, t, n) {
    switch (t) {
      case Tr:
      case Ou:
        throw new Error("Root did not complete. This is a bug in React.");
      case $i: {
        qi(e, An, xr);
        break;
      }
      case Kc: {
        if (li(e, n), Lm(n) && // do not delay if we're inside an act() scope
        !mS()) {
          var a = Zp + Kb - Pt();
          if (a > 10) {
            var r = Ts(e, k);
            if (r !== k)
              break;
            var i = e.suspendedLanes;
            if (!mo(i, n)) {
              Sn(), km(e, i);
              break;
            }
            e.timeoutHandle = nv(qi.bind(null, e, An, xr), a);
            break;
          }
        }
        qi(e, An, xr);
        break;
      }
      case Mu: {
        if (li(e, n), gR(n))
          break;
        if (!mS()) {
          var o = dR(e, n), l = o, u = Pt() - l, d = Vw(u) - u;
          if (d > 10) {
            e.timeoutHandle = nv(qi.bind(null, e, An, xr), d);
            break;
          }
        }
        qi(e, An, xr);
        break;
      }
      case Qb: {
        qi(e, An, xr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function Ew(e) {
    for (var t = e; ; ) {
      if (t.flags & gs) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], o = i.getSnapshot, l = i.value;
              try {
                if (!Gn(o(), l))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var u = t.child;
      if (t.subtreeFlags & gs && u !== null) {
        u.return = t, t = u;
        continue;
      }
      if (t === e)
        return !0;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return !0;
  }
  function li(e, t) {
    t = Ds(t, Jc), t = Ds(t, Uu), CR(e, t);
  }
  function nS(e) {
    if (PD(), (Ne & (tn | ca)) !== At)
      throw new Error("Should not already be working.");
    _r();
    var t = Ts(e, k);
    if (!Yn(t, me))
      return Nn(e, Pt()), null;
    var n = of(e, t);
    if (e.tag !== Qr && n === $i) {
      var a = Rd(e);
      a !== k && (t = a, n = ih(e, a));
    }
    if (n === Ou) {
      var r = Lu;
      throw Ii(e, k), li(e, t), Nn(e, Pt()), r;
    }
    if (n === Xp)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, qi(e, An, xr), Nn(e, Pt()), null;
  }
  function Cw(e, t) {
    t !== k && (_d(e, Te(t, me)), Nn(e, Pt()), (Ne & (tn | ca)) === At && (Nu(), Kr()));
  }
  function oh(e, t) {
    var n = Ne;
    Ne |= Wb;
    try {
      return e(t);
    } finally {
      Ne = n, Ne === At && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !La.isBatchingLegacy && (Nu(), Jy());
    }
  }
  function Rw(e, t, n, a, r) {
    var i = Sa(), o = en.transition;
    try {
      return en.transition = null, It(In), e(t, n, a, r);
    } finally {
      It(i), en.transition = o, Ne === At && Nu();
    }
  }
  function Dr(e) {
    ii !== null && ii.tag === Qr && (Ne & (tn | ca)) === At && _r();
    var t = Ne;
    Ne |= Wb;
    var n = en.transition, a = Sa();
    try {
      return en.transition = null, It(In), e ? e() : void 0;
    } finally {
      It(a), en.transition = n, Ne = t, (Ne & (tn | ca)) === At && Kr();
    }
  }
  function aS() {
    return (Ne & (tn | ca)) !== At;
  }
  function rf(e, t) {
    fn(Jp, Xa, e), Xa = Te(Xa, t);
  }
  function lh(e) {
    Xa = Jp.current, cn(Jp, e);
  }
  function Ii(e, t) {
    e.finishedWork = null, e.finishedLanes = k;
    var n = e.timeoutHandle;
    if (n !== av && (e.timeoutHandle = av, Xx(n)), dt !== null)
      for (var a = dt.return; a !== null; ) {
        var r = a.alternate;
        Ub(r, a), a = a.return;
      }
    bn = e;
    var i = Gi(e.current, null);
    return dt = i, Nt = Xa = t, kt = Tr, Lu = null, Xc = k, Uu = k, Jc = k, Au = null, An = null, mD(), Ra.discardPendingWarnings(), i;
  }
  function rS(e, t) {
    do {
      var n = dt;
      try {
        if (dc(), Ng(), Bt(), Kp.current = null, n === null || n.return === null) {
          kt = Ou, Lu = t, dt = null;
          return;
        }
        if (va && n.mode & We && Yc(n, !0), Na)
          if (fo(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            eR(n, a, Nt);
          } else
            ZC(n, t, Nt);
        GD(e, n.return, n, t, Nt), uS(n);
      } catch (r) {
        t = r, dt === n && n !== null ? (n = n.return, dt = n) : n = dt;
        continue;
      }
      return;
    } while (!0);
  }
  function iS() {
    var e = Qp.current;
    return Qp.current = Fc, e === null ? Fc : e;
  }
  function oS(e) {
    Qp.current = e;
  }
  function Tw() {
    Zp = Pt();
  }
  function Hu(e) {
    Xc = Te(e, Xc);
  }
  function xw() {
    kt === Tr && (kt = Kc);
  }
  function uh() {
    (kt === Tr || kt === Kc || kt === $i) && (kt = Mu), bn !== null && (Td(Xc) || Td(Uu)) && li(bn, Nt);
  }
  function Dw(e) {
    kt !== Mu && (kt = $i), Au === null ? Au = [e] : Au.push(e);
  }
  function _w() {
    return kt === Tr;
  }
  function of(e, t) {
    var n = Ne;
    Ne |= tn;
    var a = iS();
    if (bn !== e || Nt !== t) {
      if (ba) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Fu(e, Nt), r.clear()), jm(e, t);
      }
      xr = Hm(), Ii(e, t);
    }
    Dm(t);
    do
      try {
        ww();
        break;
      } catch (i) {
        rS(e, i);
      }
    while (!0);
    if (dc(), Ne = n, oS(a), dt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return _m(), bn = null, Nt = k, kt;
  }
  function ww() {
    for (; dt !== null; )
      lS(dt);
  }
  function Ow(e, t) {
    var n = Ne;
    Ne |= tn;
    var a = iS();
    if (bn !== e || Nt !== t) {
      if (ba) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Fu(e, Nt), r.clear()), jm(e, t);
      }
      xr = Hm(), Nu(), Ii(e, t);
    }
    Dm(t);
    do
      try {
        Mw();
        break;
      } catch (i) {
        rS(e, i);
      }
    while (!0);
    return dc(), oS(a), Ne = n, dt !== null ? (iR(), Tr) : (_m(), bn = null, Nt = k, kt);
  }
  function Mw() {
    for (; dt !== null && !AC(); )
      lS(dt);
  }
  function lS(e) {
    var t = e.alternate;
    ft(e);
    var n;
    (e.mode & We) !== de ? (Rp(e), n = sh(t, e, Xa), Yc(e, !0)) : n = sh(t, e, Xa), Bt(), e.memoizedProps = e.pendingProps, n === null ? uS(e) : dt = n, Kp.current = null;
  }
  function uS(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Rl) === fe) {
        ft(t);
        var r = void 0;
        if ((t.mode & We) === de ? r = Lb(n, t, Xa) : (Rp(t), r = Lb(n, t, Xa), Yc(t, !1)), Bt(), r !== null) {
          dt = r;
          return;
        }
      } else {
        var i = x_(n, t);
        if (i !== null) {
          i.flags &= _C, dt = i;
          return;
        }
        if ((t.mode & We) !== de) {
          Yc(t, !1);
          for (var o = t.actualDuration, l = t.child; l !== null; )
            o += l.actualDuration, l = l.sibling;
          t.actualDuration = o;
        }
        if (a !== null)
          a.flags |= Rl, a.subtreeFlags = fe, a.deletions = null;
        else {
          kt = Xp, dt = null;
          return;
        }
      }
      var u = t.sibling;
      if (u !== null) {
        dt = u;
        return;
      }
      t = a, dt = t;
    } while (t !== null);
    kt === Tr && (kt = Qb);
  }
  function qi(e, t, n) {
    var a = Sa(), r = en.transition;
    try {
      en.transition = null, It(In), Lw(e, t, n, a);
    } finally {
      en.transition = r, It(a);
    }
    return null;
  }
  function Lw(e, t, n, a) {
    do
      _r();
    while (ii !== null);
    if (Pw(), (Ne & (tn | ca)) !== At)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (qC(i), r === null)
      return Rm(), null;
    if (i === k && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = k, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Yt;
    var o = Te(r.lanes, r.childLanes);
    RR(e, o), e === bn && (bn = null, dt = null, Nt = k), ((r.subtreeFlags & so) !== fe || (r.flags & so) !== fe) && (Yi || (Yi = !0, nh = n, dh(xi, function() {
      return _r(), null;
    })));
    var l = (r.subtreeFlags & (Jf | Zf | Tl | so)) !== fe, u = (r.flags & (Jf | Zf | Tl | so)) !== fe;
    if (l || u) {
      var d = en.transition;
      en.transition = null;
      var p = Sa();
      It(In);
      var S = Ne;
      Ne |= ca, Kp.current = null, M_(e, r), ib(), Y_(e, r, i), Yx(e.containerInfo), e.current = r, tR(i), I_(r, e, i), nR(), NC(), Ne = S, It(p), en.transition = d;
    } else
      e.current = r, ib();
    var b = Yi;
    if (Yi ? (Yi = !1, ii = e, ku = i) : (qo = 0, tf = null), o = e.pendingLanes, o === k && (Io = null), b || dS(e.current, !1), BC(r.stateNode, a), ba && e.memoizedUpdaters.clear(), cw(), Nn(e, Pt()), t !== null)
      for (var x = e.onRecoverableError, D = 0; D < t.length; D++) {
        var M = t[D], X = M.stack, le = M.digest;
        x(M.value, {
          componentStack: X,
          digest: le
        });
      }
    if (Zc) {
      Zc = !1;
      var re = eh;
      throw eh = null, re;
    }
    return Yn(ku, me) && e.tag !== Qr && _r(), o = e.pendingLanes, Yn(o, me) ? (VD(), e === ah ? zu++ : (zu = 0, ah = e)) : zu = 0, Kr(), Rm(), null;
  }
  function _r() {
    if (ii !== null) {
      var e = Fm(ku), t = _R(mr, e), n = en.transition, a = Sa();
      try {
        return en.transition = null, It(t), Aw();
      } finally {
        It(a), en.transition = n;
      }
    }
    return !1;
  }
  function Uw(e) {
    th.push(e), Yi || (Yi = !0, dh(xi, function() {
      return _r(), null;
    }));
  }
  function Aw() {
    if (ii === null)
      return !1;
    var e = nh;
    nh = null;
    var t = ii, n = ku;
    if (ii = null, ku = k, (Ne & (tn | ca)) !== At)
      throw new Error("Cannot flush passive effects while already rendering.");
    rh = !0, ef = !1, aR(n);
    var a = Ne;
    Ne |= ca, J_(t.current), W_(t, t.current, n, e);
    {
      var r = th;
      th = [];
      for (var i = 0; i < r.length; i++) {
        var o = r[i];
        N_(t, o);
      }
    }
    rR(), dS(t.current, !0), Ne = a, Kr(), ef ? t === tf ? qo++ : (qo = 0, tf = t) : qo = 0, rh = !1, ef = !1, PC(t);
    {
      var l = t.current.stateNode;
      l.effectDuration = 0, l.passiveEffectDuration = 0;
    }
    return !0;
  }
  function sS(e) {
    return Io !== null && Io.has(e);
  }
  function Nw(e) {
    Io === null ? Io = /* @__PURE__ */ new Set([e]) : Io.add(e);
  }
  function kw(e) {
    Zc || (Zc = !0, eh = e);
  }
  var zw = kw;
  function cS(e, t, n) {
    var a = Bi(n, t), r = lb(e, a, me), i = Jr(e, r, me), o = Sn();
    i !== null && (Ul(i, me, o), Nn(i, o));
  }
  function nt(e, t, n) {
    if (__(n), Vu(!1), e.tag === N) {
      cS(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === N) {
        cS(a, e, n);
        return;
      } else if (a.tag === O) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !sS(i)) {
          var o = Bi(n, e), l = Op(a, o, me), u = Jr(a, l, me), d = Sn();
          u !== null && (Ul(u, me, d), Nn(u, d));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function jw(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = Sn();
    km(e, n), qw(e), bn === e && mo(Nt, n) && (kt === Mu || kt === Kc && Lm(Nt) && Pt() - Zp < Kb ? Ii(e, k) : Jc = Te(Jc, n)), Nn(e, r);
  }
  function fS(e, t) {
    t === Yt && (t = yw(e));
    var n = Sn(), a = Ln(e, t);
    a !== null && (Ul(a, t, n), Nn(a, n));
  }
  function Hw(e) {
    var t = e.memoizedState, n = Yt;
    t !== null && (n = t.retryLane), fS(e, n);
  }
  function Fw(e, t) {
    var n = Yt, a;
    switch (e.tag) {
      case ue:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case Je:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), fS(e, n);
  }
  function Vw(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : vw(e / 1960) * 1960;
  }
  function Bw() {
    if (zu > hw)
      throw zu = 0, ah = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    qo > mw && (qo = 0, tf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function Pw() {
    Ra.flushLegacyContextWarning(), Ra.flushPendingUnsafeLifecycleWarnings();
  }
  function dS(e, t) {
    ft(e), lf(e, dr, lw), t && lf(e, bs, uw), lf(e, dr, iw), t && lf(e, bs, ow), Bt();
  }
  function lf(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== fe ? a = a.child : ((a.flags & t) !== fe && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var uf = null;
  function vS(e) {
    {
      if ((Ne & tn) !== At || !(e.mode & Ae))
        return;
      var t = e.tag;
      if (t !== F && t !== N && t !== O && t !== U && t !== ne && t !== Xe && t !== _e)
        return;
      var n = Se(e) || "ReactComponent";
      if (uf !== null) {
        if (uf.has(n))
          return;
        uf.add(n);
      } else
        uf = /* @__PURE__ */ new Set([n]);
      var a = un;
      try {
        ft(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? ft(e) : Bt();
      }
    }
  }
  var sh;
  {
    var $w = null;
    sh = function(e, t, n) {
      var a = ES($w, t);
      try {
        return Db(e, t, n);
      } catch (i) {
        if (nD() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (dc(), Ng(), Ub(e, t), ES(t, a), t.mode & We && Rp(t), qf(null, Db, null, e, t, n), RC()) {
          var r = Gf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var pS = !1, ch;
  ch = /* @__PURE__ */ new Set();
  function Yw(e) {
    if (yi && !jD())
      switch (e.tag) {
        case U:
        case ne:
        case _e: {
          var t = dt && Se(dt) || "Unknown", n = t;
          if (!ch.has(n)) {
            ch.add(n);
            var a = Se(e) || "Unknown";
            f("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case O: {
          pS || (f("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), pS = !0);
          break;
        }
      }
  }
  function Fu(e, t) {
    if (ba) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        zm(e, a, t);
      });
    }
  }
  var fh = {};
  function dh(e, t) {
    {
      var n = La.current;
      return n !== null ? (n.push(t), fh) : Cm(e, t);
    }
  }
  function hS(e) {
    if (e !== fh)
      return UC(e);
  }
  function mS() {
    return La.current !== null;
  }
  function Iw(e) {
    {
      if (e.mode & Ae) {
        if (!Gb())
          return;
      } else if (!dw() || Ne !== At || e.tag !== U && e.tag !== ne && e.tag !== _e)
        return;
      if (La.current === null) {
        var t = un;
        try {
          ft(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Se(e));
        } finally {
          t ? ft(e) : Bt();
        }
      }
    }
  }
  function qw(e) {
    e.tag !== Qr && Gb() && La.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Vu(e) {
    Zb = e;
  }
  var fa = null, Go = null, Gw = function(e) {
    fa = e;
  };
  function Wo(e) {
    {
      if (fa === null)
        return e;
      var t = fa(e);
      return t === void 0 ? e : t.current;
    }
  }
  function vh(e) {
    return Wo(e);
  }
  function ph(e) {
    {
      if (fa === null)
        return e;
      var t = fa(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = Wo(e.render);
          if (e.render !== n) {
            var a = {
              $$typeof: Z,
              render: n
            };
            return e.displayName !== void 0 && (a.displayName = e.displayName), a;
          }
        }
        return e;
      }
      return t.current;
    }
  }
  function yS(e, t) {
    {
      if (fa === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case O: {
          typeof a == "function" && (r = !0);
          break;
        }
        case U: {
          (typeof a == "function" || i === ce) && (r = !0);
          break;
        }
        case ne: {
          (i === Z || i === ce) && (r = !0);
          break;
        }
        case Xe:
        case _e: {
          (i === Re || i === ce) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var o = fa(n);
        if (o !== void 0 && o === fa(a))
          return !0;
      }
      return !1;
    }
  }
  function gS(e) {
    {
      if (fa === null || typeof WeakSet != "function")
        return;
      Go === null && (Go = /* @__PURE__ */ new WeakSet()), Go.add(e);
    }
  }
  var Ww = function(e, t) {
    {
      if (fa === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      _r(), Dr(function() {
        hh(e.current, a, n);
      });
    }
  }, Qw = function(e, t) {
    {
      if (e.context !== Wn)
        return;
      _r(), Dr(function() {
        Bu(t, e, null, null);
      });
    }
  };
  function hh(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, o = e.tag, l = e.type, u = null;
      switch (o) {
        case U:
        case _e:
        case O:
          u = l;
          break;
        case ne:
          u = l.render;
          break;
      }
      if (fa === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var d = !1, p = !1;
      if (u !== null) {
        var S = fa(u);
        S !== void 0 && (n.has(S) ? p = !0 : t.has(S) && (o === O ? p = !0 : d = !0));
      }
      if (Go !== null && (Go.has(e) || a !== null && Go.has(a)) && (p = !0), p && (e._debugNeedsRemount = !0), p || d) {
        var b = Ln(e, me);
        b !== null && zt(b, e, me, at);
      }
      r !== null && !p && hh(r, t, n), i !== null && hh(i, t, n);
    }
  }
  var Kw = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return mh(e.current, a, n), n;
    }
  };
  function mh(e, t, n) {
    {
      var a = e.child, r = e.sibling, i = e.tag, o = e.type, l = null;
      switch (i) {
        case U:
        case _e:
        case O:
          l = o;
          break;
        case ne:
          l = o.render;
          break;
      }
      var u = !1;
      l !== null && t.has(l) && (u = !0), u ? Xw(e, n) : a !== null && mh(a, t, n), r !== null && mh(r, t, n);
    }
  }
  function Xw(e, t) {
    {
      var n = Jw(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case Y:
            t.add(a.stateNode);
            return;
          case P:
            t.add(a.stateNode.containerInfo);
            return;
          case N:
            t.add(a.stateNode.containerInfo);
            return;
        }
        if (a.return === null)
          throw new Error("Expected to reach root first.");
        a = a.return;
      }
    }
  }
  function Jw(e, t) {
    for (var n = e, a = !1; ; ) {
      if (n.tag === Y)
        a = !0, t.add(n.stateNode);
      else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e)
        return a;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e)
          return a;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return !1;
  }
  var yh;
  {
    yh = !1;
    try {
      var bS = Object.preventExtensions({});
    } catch {
      yh = !0;
    }
  }
  function Zw(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = fe, this.subtreeFlags = fe, this.deletions = null, this.lanes = k, this.childLanes = k, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !yh && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Qn = function(e, t, n, a) {
    return new Zw(e, t, n, a);
  };
  function gh(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function eO(e) {
    return typeof e == "function" && !gh(e) && e.defaultProps === void 0;
  }
  function tO(e) {
    if (typeof e == "function")
      return gh(e) ? O : U;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Z)
        return ne;
      if (t === Re)
        return Xe;
    }
    return F;
  }
  function Gi(e, t) {
    var n = e.alternate;
    n === null ? (n = Qn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = fe, n.subtreeFlags = fe, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & vr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case F:
      case U:
      case _e:
        n.type = Wo(e.type);
        break;
      case O:
        n.type = vh(e.type);
        break;
      case ne:
        n.type = ph(e.type);
        break;
    }
    return n;
  }
  function nO(e, t) {
    e.flags &= vr | Rt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = k, e.lanes = t, e.child = null, e.subtreeFlags = fe, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = fe, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
      var a = n.dependencies;
      e.dependencies = a === null ? null : {
        lanes: a.lanes,
        firstContext: a.firstContext
      }, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration;
    }
    return e;
  }
  function aO(e, t, n) {
    var a;
    return e === rc ? (a = Ae, t === !0 && (a |= Tt, a |= Ba)) : a = de, ba && (a |= We), Qn(N, null, null, a);
  }
  function bh(e, t, n, a, r, i) {
    var o = F, l = e;
    if (typeof e == "function")
      gh(e) ? (o = O, l = vh(l)) : l = Wo(l);
    else if (typeof e == "string")
      o = Y;
    else
      e:
        switch (e) {
          case ja:
            return ui(n.children, r, i, t);
          case pi:
            o = ie, r |= Tt, (r & Ae) !== de && (r |= Ba);
            break;
          case y:
            return rO(n, r, i, t);
          case Me:
            return iO(n, r, i, t);
          case je:
            return oO(n, r, i, t);
          case lt:
            return SS(n, r, i, t);
          case ln:
          case wt:
          case Ha:
          case Qi:
          case ot:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case z:
                  o = $;
                  break e;
                case q:
                  o = Ce;
                  break e;
                case Z:
                  o = ne, l = ph(l);
                  break e;
                case Re:
                  o = Xe;
                  break e;
                case ce:
                  o = jt, l = null;
                  break e;
              }
            var u = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var d = a ? Se(a) : null;
              d && (u += `

Check the render method of \`` + d + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + u));
          }
        }
    var p = Qn(o, n, t, r);
    return p.elementType = e, p.type = l, p.lanes = i, p._debugOwner = a, p;
  }
  function Sh(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, o = e.props, l = bh(r, i, o, a, t, n);
    return l._debugSource = e._source, l._debugOwner = e._owner, l;
  }
  function ui(e, t, n, a) {
    var r = Qn(xe, e, a, t);
    return r.lanes = n, r;
  }
  function rO(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Qn(be, e, a, t | We);
    return r.elementType = y, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function iO(e, t, n, a) {
    var r = Qn(ue, e, a, t);
    return r.elementType = Me, r.lanes = n, r;
  }
  function oO(e, t, n, a) {
    var r = Qn(Je, e, a, t);
    return r.elementType = je, r.lanes = n, r;
  }
  function SS(e, t, n, a) {
    var r = Qn(we, e, a, t);
    r.elementType = lt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Eh(e, t, n) {
    var a = Qn(ee, e, null, t);
    return a.lanes = n, a;
  }
  function lO() {
    var e = Qn(Y, null, null, de);
    return e.elementType = "DELETED", e;
  }
  function uO(e) {
    var t = Qn(ct, null, null, de);
    return t.stateNode = e, t;
  }
  function Ch(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Qn(P, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function ES(e, t) {
    return e === null && (e = Qn(F, null, null, de)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function sO(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = av, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Yt, this.eventTimes = Dd(k), this.expirationTimes = Dd(at), this.pendingLanes = k, this.suspendedLanes = k, this.pingedLanes = k, this.expiredLanes = k, this.mutableReadLanes = k, this.finishedLanes = k, this.entangledLanes = k, this.entanglements = Dd(k), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], o = 0; o < ad; o++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case rc:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Qr:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function CS(e, t, n, a, r, i, o, l, u, d) {
    var p = new sO(e, t, n, l, u), S = aO(t, i);
    p.current = S, S.stateNode = p;
    {
      var b = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      S.memoizedState = b;
    }
    return Mv(S), p;
  }
  var Rh = "18.2.0";
  function cO(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return ea(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: ya,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var Th, xh;
  Th = !1, xh = {};
  function RS(e) {
    if (!e)
      return Wn;
    var t = lo(e), n = G0(t);
    if (t.tag === O) {
      var a = t.type;
      if (Ya(a))
        return Qy(t, a, n);
    }
    return n;
  }
  function fO(e, t) {
    {
      var n = lo(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = bm(n);
      if (r === null)
        return null;
      if (r.mode & Tt) {
        var i = Se(n) || "Component";
        if (!xh[i]) {
          xh[i] = !0;
          var o = un;
          try {
            ft(r), n.mode & Tt ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            o ? ft(o) : Bt();
          }
        }
      }
      return r.stateNode;
    }
  }
  function TS(e, t, n, a, r, i, o, l) {
    var u = !1, d = null;
    return CS(e, t, u, d, n, a, r, i, o);
  }
  function xS(e, t, n, a, r, i, o, l, u, d) {
    var p = !0, S = CS(n, a, p, e, r, i, o, l, u);
    S.context = RS(null);
    var b = S.current, x = Sn(), D = oi(b), M = Cr(x, D);
    return M.callback = t ?? null, Jr(b, M, D), gw(S, D, x), S;
  }
  function Bu(e, t, n, a) {
    VC(t, e);
    var r = t.current, i = Sn(), o = oi(r);
    oR(o);
    var l = RS(n);
    t.context === null ? t.context = l : t.pendingContext = l, yi && un !== null && !Th && (Th = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Se(un) || "Unknown"));
    var u = Cr(i, o);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var d = Jr(r, u, o);
    return d !== null && (zt(d, r, o, i), yc(d, r, o)), o;
  }
  function sf(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case Y:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function dO(e) {
    switch (e.tag) {
      case N: {
        var t = e.stateNode;
        if (ws(t)) {
          var n = hR(t);
          Cw(t, n);
        }
        break;
      }
      case ue: {
        Dr(function() {
          var r = Ln(e, me);
          if (r !== null) {
            var i = Sn();
            zt(r, e, me, i);
          }
        });
        var a = me;
        Dh(e, a);
        break;
      }
    }
  }
  function DS(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = ER(n.retryLane, t));
  }
  function Dh(e, t) {
    DS(e, t);
    var n = e.alternate;
    n && DS(n, t);
  }
  function vO(e) {
    if (e.tag === ue) {
      var t = wl, n = Ln(e, t);
      if (n !== null) {
        var a = Sn();
        zt(n, e, t, a);
      }
      Dh(e, t);
    }
  }
  function pO(e) {
    if (e.tag === ue) {
      var t = oi(e), n = Ln(e, t);
      if (n !== null) {
        var a = Sn();
        zt(n, e, t, a);
      }
      Dh(e, t);
    }
  }
  function _S(e) {
    var t = LC(e);
    return t === null ? null : t.stateNode;
  }
  var wS = function(e) {
    return null;
  };
  function hO(e) {
    return wS(e);
  }
  var OS = function(e) {
    return !1;
  };
  function mO(e) {
    return OS(e);
  }
  var MS = null, LS = null, US = null, AS = null, NS = null, kS = null, zS = null, jS = null, HS = null;
  {
    var FS = function(e, t, n) {
      var a = t[n], r = Pe(e) ? e.slice() : Le({}, e);
      return n + 1 === t.length ? (Pe(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = FS(e[a], t, n + 1), r);
    }, VS = function(e, t) {
      return FS(e, t, 0);
    }, BS = function(e, t, n, a) {
      var r = t[a], i = Pe(e) ? e.slice() : Le({}, e);
      if (a + 1 === t.length) {
        var o = n[a];
        i[o] = i[r], Pe(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = BS(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, PS = function(e, t, n) {
      if (t.length !== n.length) {
        T("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            T("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return BS(e, t, n, 0);
    }, $S = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Pe(e) ? e.slice() : Le({}, e);
      return i[r] = $S(e[r], t, n + 1, a), i;
    }, YS = function(e, t, n) {
      return $S(e, t, 0, n);
    }, _h = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    MS = function(e, t, n, a) {
      var r = _h(e, t);
      if (r !== null) {
        var i = YS(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Le({}, e.memoizedProps);
        var o = Ln(e, me);
        o !== null && zt(o, e, me, at);
      }
    }, LS = function(e, t, n) {
      var a = _h(e, t);
      if (a !== null) {
        var r = VS(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Le({}, e.memoizedProps);
        var i = Ln(e, me);
        i !== null && zt(i, e, me, at);
      }
    }, US = function(e, t, n, a) {
      var r = _h(e, t);
      if (r !== null) {
        var i = PS(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Le({}, e.memoizedProps);
        var o = Ln(e, me);
        o !== null && zt(o, e, me, at);
      }
    }, AS = function(e, t, n) {
      e.pendingProps = YS(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Ln(e, me);
      a !== null && zt(a, e, me, at);
    }, NS = function(e, t) {
      e.pendingProps = VS(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Ln(e, me);
      n !== null && zt(n, e, me, at);
    }, kS = function(e, t, n) {
      e.pendingProps = PS(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Ln(e, me);
      a !== null && zt(a, e, me, at);
    }, zS = function(e) {
      var t = Ln(e, me);
      t !== null && zt(t, e, me, at);
    }, jS = function(e) {
      wS = e;
    }, HS = function(e) {
      OS = e;
    };
  }
  function yO(e) {
    var t = bm(e);
    return t === null ? null : t.stateNode;
  }
  function gO(e) {
    return null;
  }
  function bO() {
    return un;
  }
  function SO(e) {
    var t = e.findFiberByHostInstance, n = h.ReactCurrentDispatcher;
    return FC({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: MS,
      overrideHookStateDeletePath: LS,
      overrideHookStateRenamePath: US,
      overrideProps: AS,
      overridePropsDeletePath: NS,
      overridePropsRenamePath: kS,
      setErrorHandler: jS,
      setSuspenseHandler: HS,
      scheduleUpdate: zS,
      currentDispatcherRef: n,
      findHostInstanceByFiber: yO,
      findFiberByHostInstance: t || gO,
      // React Refresh
      findHostInstancesForRefresh: Kw,
      scheduleRefresh: Ww,
      scheduleRoot: Qw,
      setRefreshHandler: Gw,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: bO,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: Rh
    });
  }
  var IS = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function wh(e) {
    this._internalRoot = e;
  }
  cf.prototype.render = wh.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? f("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : ff(arguments[1]) ? f("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && f("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== Ct) {
        var a = _S(t.current);
        a && a.parentNode !== n && f("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Bu(e, t, null, null);
  }, cf.prototype.unmount = wh.prototype.unmount = function() {
    typeof arguments[0] == "function" && f("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      aS() && f("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Dr(function() {
        Bu(null, e, null, null);
      }), Yy(t);
    }
  };
  function EO(e, t) {
    if (!ff(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    qS(e);
    var n = !1, a = !1, r = "", i = IS;
    t != null && (t.hydrate ? T("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === za && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var o = TS(e, rc, null, n, a, r, i);
    Xs(o.current, e);
    var l = e.nodeType === Ct ? e.parentNode : e;
    return Ql(l), new wh(o);
  }
  function cf(e) {
    this._internalRoot = e;
  }
  function CO(e) {
    e && HR(e);
  }
  cf.prototype.unstable_scheduleHydration = CO;
  function RO(e, t, n) {
    if (!ff(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    qS(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, o = !1, l = "", u = IS;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError));
    var d = xS(t, null, e, rc, a, i, o, l, u);
    if (Xs(d.current, e), Ql(e), r)
      for (var p = 0; p < r.length; p++) {
        var S = r[p];
        LD(d, S);
      }
    return new cf(d);
  }
  function ff(e) {
    return !!(e && (e.nodeType === On || e.nodeType === sr || e.nodeType === kf || !Ht));
  }
  function Pu(e) {
    return !!(e && (e.nodeType === On || e.nodeType === sr || e.nodeType === kf || e.nodeType === Ct && e.nodeValue === " react-mount-point-unstable "));
  }
  function qS(e) {
    e.nodeType === On && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), ou(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var TO = h.ReactCurrentOwner, GS;
  GS = function(e) {
    if (e._reactRootContainer && e.nodeType !== Ct) {
      var t = _S(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Oh(e), r = !!(a && Gr(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === On && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function Oh(e) {
    return e ? e.nodeType === sr ? e.documentElement : e.firstChild : null;
  }
  function WS() {
  }
  function xO(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var b = sf(o);
          i.call(b);
        };
      }
      var o = xS(
        t,
        a,
        e,
        Qr,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        WS
      );
      e._reactRootContainer = o, Xs(o.current, e);
      var l = e.nodeType === Ct ? e.parentNode : e;
      return Ql(l), Dr(), o;
    } else {
      for (var u; u = e.lastChild; )
        e.removeChild(u);
      if (typeof a == "function") {
        var d = a;
        a = function() {
          var b = sf(p);
          d.call(b);
        };
      }
      var p = TS(
        e,
        Qr,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        WS
      );
      e._reactRootContainer = p, Xs(p.current, e);
      var S = e.nodeType === Ct ? e.parentNode : e;
      return Ql(S), Dr(function() {
        Bu(t, p, n, a);
      }), p;
    }
  }
  function DO(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function df(e, t, n, a, r) {
    GS(n), DO(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, o;
    if (!i)
      o = xO(n, t, e, r, a);
    else {
      if (o = i, typeof r == "function") {
        var l = r;
        r = function() {
          var u = sf(o);
          l.call(u);
        };
      }
      Bu(t, o, e, r);
    }
    return sf(o);
  }
  function _O(e) {
    {
      var t = TO.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Be(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === On ? e : fO(e, "findDOMNode");
  }
  function wO(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Pu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = ou(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return df(null, e, t, !0, n);
  }
  function OO(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Pu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = ou(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return df(null, e, t, !1, n);
  }
  function MO(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Pu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !TC(e))
      throw new Error("parentComponent must be a valid React Component");
    return df(e, t, n, !1, a);
  }
  function LO(e) {
    if (!Pu(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = ou(e) && e._reactRootContainer === void 0;
      t && f("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = Oh(e), a = n && !Gr(n);
        a && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return Dr(function() {
        df(null, null, e, !1, function() {
          e._reactRootContainer = null, Yy(e);
        });
      }), !0;
    } else {
      {
        var r = Oh(e), i = !!(r && Gr(r)), o = e.nodeType === On && Pu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", o ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  wR(dO), MR(vO), LR(pO), UR(Sa), AR(xR), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), vC(Nx), mC(oh, Rw, Dr);
  function UO(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ff(t))
      throw new Error("Target container is not a DOM element.");
    return cO(e, t, null, n);
  }
  function AO(e, t, n, a) {
    return MO(e, t, n, a);
  }
  var Mh = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [Gr, xo, Js, lm, um, oh]
  };
  function NO(e, t) {
    return Mh.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), EO(e, t);
  }
  function kO(e, t, n) {
    return Mh.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), RO(e, t, n);
  }
  function zO(e) {
    return aS() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Dr(e);
  }
  var jO = SO({
    findFiberByHostInstance: Ui,
    bundleType: 1,
    version: Rh,
    rendererPackageName: "react-dom"
  });
  if (!jO && Et && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var QS = window.location.protocol;
    /^(https?|file):$/.test(QS) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (QS === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  Xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Mh, Xn.createPortal = UO, Xn.createRoot = NO, Xn.findDOMNode = _O, Xn.flushSync = zO, Xn.hydrate = wO, Xn.hydrateRoot = kO, Xn.render = OO, Xn.unmountComponentAtNode = LO, Xn.unstable_batchedUpdates = oh, Xn.unstable_renderSubtreeIntoContainer = AO, Xn.version = Rh, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
cE.exports = Xn;
var IO = cE.exports, Lh = IO;
{
  var vf = Lh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  kh.createRoot = function(c, v) {
    vf.usingClientEntryPoint = !0;
    try {
      return Lh.createRoot(c, v);
    } finally {
      vf.usingClientEntryPoint = !1;
    }
  }, kh.hydrateRoot = function(c, v, h) {
    vf.usingClientEntryPoint = !0;
    try {
      return Lh.hydrateRoot(c, v, h);
    } finally {
      vf.usingClientEntryPoint = !1;
    }
  };
}
/**
 * @remix-run/router v1.15.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Iu() {
  return Iu = Object.assign ? Object.assign.bind() : function(c) {
    for (var v = 1; v < arguments.length; v++) {
      var h = arguments[v];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (c[g] = h[g]);
    }
    return c;
  }, Iu.apply(this, arguments);
}
var si;
(function(c) {
  c.Pop = "POP", c.Push = "PUSH", c.Replace = "REPLACE";
})(si || (si = {}));
const KS = "popstate";
function qO(c) {
  c === void 0 && (c = {});
  function v(g, E) {
    let {
      pathname: T,
      search: f,
      hash: H
    } = g.location;
    return zh(
      "",
      {
        pathname: T,
        search: f,
        hash: H
      },
      // state defaults to `null` because `window.history.state` does
      E.state && E.state.usr || null,
      E.state && E.state.key || "default"
    );
  }
  function h(g, E) {
    return typeof E == "string" ? E : qu(E);
  }
  return WO(v, h, null, c);
}
function vt(c, v) {
  if (c === !1 || c === null || typeof c > "u")
    throw new Error(v);
}
function Za(c, v) {
  if (!c) {
    typeof console < "u" && console.warn(v);
    try {
      throw new Error(v);
    } catch {
    }
  }
}
function GO() {
  return Math.random().toString(36).substr(2, 8);
}
function XS(c, v) {
  return {
    usr: c.state,
    key: c.key,
    idx: v
  };
}
function zh(c, v, h, g) {
  return h === void 0 && (h = null), Iu({
    pathname: typeof c == "string" ? c : c.pathname,
    search: "",
    hash: ""
  }, typeof v == "string" ? Jo(v) : v, {
    state: h,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: v && v.key || g || GO()
  });
}
function qu(c) {
  let {
    pathname: v = "/",
    search: h = "",
    hash: g = ""
  } = c;
  return h && h !== "?" && (v += h.charAt(0) === "?" ? h : "?" + h), g && g !== "#" && (v += g.charAt(0) === "#" ? g : "#" + g), v;
}
function Jo(c) {
  let v = {};
  if (c) {
    let h = c.indexOf("#");
    h >= 0 && (v.hash = c.substr(h), c = c.substr(0, h));
    let g = c.indexOf("?");
    g >= 0 && (v.search = c.substr(g), c = c.substr(0, g)), c && (v.pathname = c);
  }
  return v;
}
function WO(c, v, h, g) {
  g === void 0 && (g = {});
  let {
    window: E = document.defaultView,
    v5Compat: T = !1
  } = g, f = E.history, H = si.Pop, U = null, O = F();
  O == null && (O = 0, f.replaceState(Iu({}, f.state, {
    idx: O
  }), ""));
  function F() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function N() {
    H = si.Pop;
    let ie = F(), Ce = ie == null ? null : ie - O;
    O = ie, U && U({
      action: H,
      location: xe.location,
      delta: Ce
    });
  }
  function P(ie, Ce) {
    H = si.Push;
    let $ = zh(xe.location, ie, Ce);
    h && h($, ie), O = F() + 1;
    let ne = XS($, O), be = xe.createHref($);
    try {
      f.pushState(ne, "", be);
    } catch (ue) {
      if (ue instanceof DOMException && ue.name === "DataCloneError")
        throw ue;
      E.location.assign(be);
    }
    T && U && U({
      action: H,
      location: xe.location,
      delta: 1
    });
  }
  function Y(ie, Ce) {
    H = si.Replace;
    let $ = zh(xe.location, ie, Ce);
    h && h($, ie), O = F();
    let ne = XS($, O), be = xe.createHref($);
    f.replaceState(ne, "", be), T && U && U({
      action: H,
      location: xe.location,
      delta: 0
    });
  }
  function ee(ie) {
    let Ce = E.location.origin !== "null" ? E.location.origin : E.location.href, $ = typeof ie == "string" ? ie : qu(ie);
    return $ = $.replace(/ $/, "%20"), vt(Ce, "No window.location.(origin|href) available to create URL for href: " + $), new URL($, Ce);
  }
  let xe = {
    get action() {
      return H;
    },
    get location() {
      return c(E, f);
    },
    listen(ie) {
      if (U)
        throw new Error("A history only accepts one active listener");
      return E.addEventListener(KS, N), U = ie, () => {
        E.removeEventListener(KS, N), U = null;
      };
    },
    createHref(ie) {
      return v(E, ie);
    },
    createURL: ee,
    encodeLocation(ie) {
      let Ce = ee(ie);
      return {
        pathname: Ce.pathname,
        search: Ce.search,
        hash: Ce.hash
      };
    },
    push: P,
    replace: Y,
    go(ie) {
      return f.go(ie);
    }
  };
  return xe;
}
var JS;
(function(c) {
  c.data = "data", c.deferred = "deferred", c.redirect = "redirect", c.error = "error";
})(JS || (JS = {}));
function QO(c, v, h) {
  h === void 0 && (h = "/");
  let g = typeof v == "string" ? Jo(v) : v, E = ci(g.pathname || "/", h);
  if (E == null)
    return null;
  let T = vE(c);
  KO(T);
  let f = null;
  for (let H = 0; f == null && H < T.length; ++H) {
    let U = lM(E);
    f = iM(T[H], U);
  }
  return f;
}
function vE(c, v, h, g) {
  v === void 0 && (v = []), h === void 0 && (h = []), g === void 0 && (g = "");
  let E = (T, f, H) => {
    let U = {
      relativePath: H === void 0 ? T.path || "" : H,
      caseSensitive: T.caseSensitive === !0,
      childrenIndex: f,
      route: T
    };
    U.relativePath.startsWith("/") && (vt(U.relativePath.startsWith(g), 'Absolute route path "' + U.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), U.relativePath = U.relativePath.slice(g.length));
    let O = Or([g, U.relativePath]), F = h.concat(U);
    T.children && T.children.length > 0 && (vt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      T.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + O + '".')
    ), vE(T.children, v, F, O)), !(T.path == null && !T.index) && v.push({
      path: O,
      score: aM(O, T.index),
      routesMeta: F
    });
  };
  return c.forEach((T, f) => {
    var H;
    if (T.path === "" || !((H = T.path) != null && H.includes("?")))
      E(T, f);
    else
      for (let U of pE(T.path))
        E(T, f, U);
  }), v;
}
function pE(c) {
  let v = c.split("/");
  if (v.length === 0)
    return [];
  let [h, ...g] = v, E = h.endsWith("?"), T = h.replace(/\?$/, "");
  if (g.length === 0)
    return E ? [T, ""] : [T];
  let f = pE(g.join("/")), H = [];
  return H.push(...f.map((U) => U === "" ? T : [T, U].join("/"))), E && H.push(...f), H.map((U) => c.startsWith("/") && U === "" ? "/" : U);
}
function KO(c) {
  c.sort((v, h) => v.score !== h.score ? h.score - v.score : rM(v.routesMeta.map((g) => g.childrenIndex), h.routesMeta.map((g) => g.childrenIndex)));
}
const XO = /^:[\w-]+$/, JO = 3, ZO = 2, eM = 1, tM = 10, nM = -2, ZS = (c) => c === "*";
function aM(c, v) {
  let h = c.split("/"), g = h.length;
  return h.some(ZS) && (g += nM), v && (g += ZO), h.filter((E) => !ZS(E)).reduce((E, T) => E + (XO.test(T) ? JO : T === "" ? eM : tM), g);
}
function rM(c, v) {
  return c.length === v.length && c.slice(0, -1).every((g, E) => g === v[E]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    c[c.length - 1] - v[v.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function iM(c, v) {
  let {
    routesMeta: h
  } = c, g = {}, E = "/", T = [];
  for (let f = 0; f < h.length; ++f) {
    let H = h[f], U = f === h.length - 1, O = E === "/" ? v : v.slice(E.length) || "/", F = jh({
      path: H.relativePath,
      caseSensitive: H.caseSensitive,
      end: U
    }, O);
    if (!F)
      return null;
    Object.assign(g, F.params);
    let N = H.route;
    T.push({
      // TODO: Can this as be avoided?
      params: g,
      pathname: Or([E, F.pathname]),
      pathnameBase: fM(Or([E, F.pathnameBase])),
      route: N
    }), F.pathnameBase !== "/" && (E = Or([E, F.pathnameBase]));
  }
  return T;
}
function jh(c, v) {
  typeof c == "string" && (c = {
    path: c,
    caseSensitive: !1,
    end: !0
  });
  let [h, g] = oM(c.path, c.caseSensitive, c.end), E = v.match(h);
  if (!E)
    return null;
  let T = E[0], f = T.replace(/(.)\/+$/, "$1"), H = E.slice(1);
  return {
    params: g.reduce((O, F, N) => {
      let {
        paramName: P,
        isOptional: Y
      } = F;
      if (P === "*") {
        let xe = H[N] || "";
        f = T.slice(0, T.length - xe.length).replace(/(.)\/+$/, "$1");
      }
      const ee = H[N];
      return Y && !ee ? O[P] = void 0 : O[P] = (ee || "").replace(/%2F/g, "/"), O;
    }, {}),
    pathname: T,
    pathnameBase: f,
    pattern: c
  };
}
function oM(c, v, h) {
  v === void 0 && (v = !1), h === void 0 && (h = !0), Za(c === "*" || !c.endsWith("*") || c.endsWith("/*"), 'Route path "' + c + '" will be treated as if it were ' + ('"' + c.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + c.replace(/\*$/, "/*") + '".'));
  let g = [], E = "^" + c.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, H, U) => (g.push({
    paramName: H,
    isOptional: U != null
  }), U ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return c.endsWith("*") ? (g.push({
    paramName: "*"
  }), E += c === "*" || c === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : h ? E += "\\/*$" : c !== "" && c !== "/" && (E += "(?:(?=\\/|$))"), [new RegExp(E, v ? void 0 : "i"), g];
}
function lM(c) {
  try {
    return c.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (v) {
    return Za(!1, 'The URL path "' + c + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + v + ").")), c;
  }
}
function ci(c, v) {
  if (v === "/")
    return c;
  if (!c.toLowerCase().startsWith(v.toLowerCase()))
    return null;
  let h = v.endsWith("/") ? v.length - 1 : v.length, g = c.charAt(h);
  return g && g !== "/" ? null : c.slice(h) || "/";
}
function uM(c, v) {
  v === void 0 && (v = "/");
  let {
    pathname: h,
    search: g = "",
    hash: E = ""
  } = typeof c == "string" ? Jo(c) : c;
  return {
    pathname: h ? h.startsWith("/") ? h : sM(h, v) : v,
    search: dM(g),
    hash: vM(E)
  };
}
function sM(c, v) {
  let h = v.replace(/\/+$/, "").split("/");
  return c.split("/").forEach((E) => {
    E === ".." ? h.length > 1 && h.pop() : E !== "." && h.push(E);
  }), h.length > 1 ? h.join("/") : "/";
}
function Uh(c, v, h, g) {
  return "Cannot include a '" + c + "' character in a manually specified " + ("`to." + v + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + h + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function cM(c) {
  return c.filter((v, h) => h === 0 || v.route.path && v.route.path.length > 0);
}
function hE(c, v) {
  let h = cM(c);
  return v ? h.map((g, E) => E === c.length - 1 ? g.pathname : g.pathnameBase) : h.map((g) => g.pathnameBase);
}
function mE(c, v, h, g) {
  g === void 0 && (g = !1);
  let E;
  typeof c == "string" ? E = Jo(c) : (E = Iu({}, c), vt(!E.pathname || !E.pathname.includes("?"), Uh("?", "pathname", "search", E)), vt(!E.pathname || !E.pathname.includes("#"), Uh("#", "pathname", "hash", E)), vt(!E.search || !E.search.includes("#"), Uh("#", "search", "hash", E)));
  let T = c === "" || E.pathname === "", f = T ? "/" : E.pathname, H;
  if (f == null)
    H = h;
  else {
    let N = v.length - 1;
    if (!g && f.startsWith("..")) {
      let P = f.split("/");
      for (; P[0] === ".."; )
        P.shift(), N -= 1;
      E.pathname = P.join("/");
    }
    H = N >= 0 ? v[N] : "/";
  }
  let U = uM(E, H), O = f && f !== "/" && f.endsWith("/"), F = (T || f === ".") && h.endsWith("/");
  return !U.pathname.endsWith("/") && (O || F) && (U.pathname += "/"), U;
}
const Or = (c) => c.join("/").replace(/\/\/+/g, "/"), fM = (c) => c.replace(/\/+$/, "").replace(/^\/*/, "/"), dM = (c) => !c || c === "?" ? "" : c.startsWith("?") ? c : "?" + c, vM = (c) => !c || c === "#" ? "" : c.startsWith("#") ? c : "#" + c;
function pM(c) {
  return c != null && typeof c.status == "number" && typeof c.statusText == "string" && typeof c.internal == "boolean" && "data" in c;
}
const yE = ["post", "put", "patch", "delete"];
new Set(yE);
const hM = ["get", ...yE];
new Set(hM);
/**
 * React Router v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Gu() {
  return Gu = Object.assign ? Object.assign.bind() : function(c) {
    for (var v = 1; v < arguments.length; v++) {
      var h = arguments[v];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (c[g] = h[g]);
    }
    return c;
  }, Gu.apply(this, arguments);
}
const Ku = /* @__PURE__ */ B.createContext(null);
Ku.displayName = "DataRouter";
const Fh = /* @__PURE__ */ B.createContext(null);
Fh.displayName = "DataRouterState";
const mM = /* @__PURE__ */ B.createContext(null);
mM.displayName = "Await";
const Ua = /* @__PURE__ */ B.createContext(null);
Ua.displayName = "Navigation";
const Xu = /* @__PURE__ */ B.createContext(null);
Xu.displayName = "Location";
const Mr = /* @__PURE__ */ B.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Mr.displayName = "Route";
const Vh = /* @__PURE__ */ B.createContext(null);
Vh.displayName = "RouteError";
function yM(c, v) {
  let {
    relative: h
  } = v === void 0 ? {} : v;
  Ju() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: E
  } = B.useContext(Ua), {
    hash: T,
    pathname: f,
    search: H
  } = Zu(c, {
    relative: h
  }), U = f;
  return g !== "/" && (U = f === "/" ? g : Or([g, f])), E.createHref({
    pathname: U,
    search: H,
    hash: T
  });
}
function Ju() {
  return B.useContext(Xu) != null;
}
function Zo() {
  return Ju() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), B.useContext(Xu).location;
}
const gE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function bE(c) {
  B.useContext(Ua).static || B.useLayoutEffect(c);
}
function gM() {
  let {
    isDataRoute: c
  } = B.useContext(Mr);
  return c ? UM() : bM();
}
function bM() {
  Ju() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let c = B.useContext(Ku), {
    basename: v,
    future: h,
    navigator: g
  } = B.useContext(Ua), {
    matches: E
  } = B.useContext(Mr), {
    pathname: T
  } = Zo(), f = JSON.stringify(hE(E, h.v7_relativeSplatPath)), H = B.useRef(!1);
  return bE(() => {
    H.current = !0;
  }), B.useCallback(function(O, F) {
    if (F === void 0 && (F = {}), Za(H.current, gE), !H.current)
      return;
    if (typeof O == "number") {
      g.go(O);
      return;
    }
    let N = mE(O, JSON.parse(f), T, F.relative === "path");
    c == null && v !== "/" && (N.pathname = N.pathname === "/" ? v : Or([v, N.pathname])), (F.replace ? g.replace : g.push)(N, F.state, F);
  }, [v, g, f, T, c]);
}
function Zu(c, v) {
  let {
    relative: h
  } = v === void 0 ? {} : v, {
    future: g
  } = B.useContext(Ua), {
    matches: E
  } = B.useContext(Mr), {
    pathname: T
  } = Zo(), f = JSON.stringify(hE(E, g.v7_relativeSplatPath));
  return B.useMemo(() => mE(c, JSON.parse(f), T, h === "path"), [c, f, T, h]);
}
function SM(c, v) {
  return EM(c, v);
}
function EM(c, v, h, g) {
  Ju() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: E
  } = B.useContext(Ua), {
    matches: T
  } = B.useContext(Mr), f = T[T.length - 1], H = f ? f.params : {}, U = f ? f.pathname : "/", O = f ? f.pathnameBase : "/", F = f && f.route;
  {
    let $ = F && F.path || "";
    EE(U, !F || $.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + U + '" (under <Route path="' + $ + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + $ + '"> to <Route ') + ('path="' + ($ === "/" ? "*" : $ + "/*") + '">.'));
  }
  let N = Zo(), P;
  if (v) {
    var Y;
    let $ = typeof v == "string" ? Jo(v) : v;
    O === "/" || (Y = $.pathname) != null && Y.startsWith(O) || vt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + O + '" ') + ('but pathname "' + $.pathname + '" was given in the `location` prop.')), P = $;
  } else
    P = N;
  let ee = P.pathname || "/", xe = ee;
  if (O !== "/") {
    let $ = O.replace(/^\//, "").split("/");
    xe = "/" + ee.replace(/^\//, "").split("/").slice($.length).join("/");
  }
  let ie = QO(c, {
    pathname: xe
  });
  Za(F || ie != null, 'No routes matched location "' + P.pathname + P.search + P.hash + '" '), Za(ie == null || ie[ie.length - 1].route.element !== void 0 || ie[ie.length - 1].route.Component !== void 0 || ie[ie.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + P.pathname + P.search + P.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let Ce = DM(ie && ie.map(($) => Object.assign({}, $, {
    params: Object.assign({}, H, $.params),
    pathname: Or([
      O,
      // Re-encode pathnames that were decoded inside matchRoutes
      E.encodeLocation ? E.encodeLocation($.pathname).pathname : $.pathname
    ]),
    pathnameBase: $.pathnameBase === "/" ? O : Or([
      O,
      // Re-encode pathnames that were decoded inside matchRoutes
      E.encodeLocation ? E.encodeLocation($.pathnameBase).pathname : $.pathnameBase
    ])
  })), T, h, g);
  return v && Ce ? /* @__PURE__ */ B.createElement(Xu.Provider, {
    value: {
      location: Gu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, P),
      navigationType: si.Pop
    }
  }, Ce) : Ce;
}
function CM() {
  let c = LM(), v = pM(c) ? c.status + " " + c.statusText : c instanceof Error ? c.message : JSON.stringify(c), h = c instanceof Error ? c.stack : null, g = "rgba(200,200,200, 0.5)", E = {
    padding: "0.5rem",
    backgroundColor: g
  }, T = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", c), f = /* @__PURE__ */ B.createElement(B.Fragment, null, /* @__PURE__ */ B.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ B.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ B.createElement("code", {
    style: T
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ B.createElement("code", {
    style: T
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ B.createElement(B.Fragment, null, /* @__PURE__ */ B.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ B.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, v), h ? /* @__PURE__ */ B.createElement("pre", {
    style: E
  }, h) : null, f);
}
const RM = /* @__PURE__ */ B.createElement(CM, null);
class TM extends B.Component {
  constructor(v) {
    super(v), this.state = {
      location: v.location,
      revalidation: v.revalidation,
      error: v.error
    };
  }
  static getDerivedStateFromError(v) {
    return {
      error: v
    };
  }
  static getDerivedStateFromProps(v, h) {
    return h.location !== v.location || h.revalidation !== "idle" && v.revalidation === "idle" ? {
      error: v.error,
      location: v.location,
      revalidation: v.revalidation
    } : {
      error: v.error !== void 0 ? v.error : h.error,
      location: h.location,
      revalidation: v.revalidation || h.revalidation
    };
  }
  componentDidCatch(v, h) {
    console.error("React Router caught the following error during render", v, h);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ B.createElement(Mr.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ B.createElement(Vh.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function xM(c) {
  let {
    routeContext: v,
    match: h,
    children: g
  } = c, E = B.useContext(Ku);
  return E && E.static && E.staticContext && (h.route.errorElement || h.route.ErrorBoundary) && (E.staticContext._deepestRenderedBoundaryId = h.route.id), /* @__PURE__ */ B.createElement(Mr.Provider, {
    value: v
  }, g);
}
function DM(c, v, h, g) {
  var E;
  if (v === void 0 && (v = []), h === void 0 && (h = null), g === void 0 && (g = null), c == null) {
    var T;
    if ((T = h) != null && T.errors)
      c = h.matches;
    else
      return null;
  }
  let f = c, H = (E = h) == null ? void 0 : E.errors;
  if (H != null) {
    let F = f.findIndex((N) => N.route.id && (H == null ? void 0 : H[N.route.id]));
    F >= 0 || vt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(H).join(",")), f = f.slice(0, Math.min(f.length, F + 1));
  }
  let U = !1, O = -1;
  if (h && g && g.v7_partialHydration)
    for (let F = 0; F < f.length; F++) {
      let N = f[F];
      if ((N.route.HydrateFallback || N.route.hydrateFallbackElement) && (O = F), N.route.id) {
        let {
          loaderData: P,
          errors: Y
        } = h, ee = N.route.loader && P[N.route.id] === void 0 && (!Y || Y[N.route.id] === void 0);
        if (N.route.lazy || ee) {
          U = !0, O >= 0 ? f = f.slice(0, O + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((F, N, P) => {
    let Y, ee = !1, xe = null, ie = null;
    h && (Y = H && N.route.id ? H[N.route.id] : void 0, xe = N.route.errorElement || RM, U && (O < 0 && P === 0 ? (EE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), ee = !0, ie = null) : O === P && (ee = !0, ie = N.route.hydrateFallbackElement || null)));
    let Ce = v.concat(f.slice(0, P + 1)), $ = () => {
      let ne;
      return Y ? ne = xe : ee ? ne = ie : N.route.Component ? ne = /* @__PURE__ */ B.createElement(N.route.Component, null) : N.route.element ? ne = N.route.element : ne = F, /* @__PURE__ */ B.createElement(xM, {
        match: N,
        routeContext: {
          outlet: F,
          matches: Ce,
          isDataRoute: h != null
        },
        children: ne
      });
    };
    return h && (N.route.ErrorBoundary || N.route.errorElement || P === 0) ? /* @__PURE__ */ B.createElement(TM, {
      location: h.location,
      revalidation: h.revalidation,
      component: xe,
      error: Y,
      children: $(),
      routeContext: {
        outlet: null,
        matches: Ce,
        isDataRoute: !0
      }
    }) : $();
  }, null);
}
var SE = /* @__PURE__ */ function(c) {
  return c.UseBlocker = "useBlocker", c.UseRevalidator = "useRevalidator", c.UseNavigateStable = "useNavigate", c;
}(SE || {}), Wu = /* @__PURE__ */ function(c) {
  return c.UseBlocker = "useBlocker", c.UseLoaderData = "useLoaderData", c.UseActionData = "useActionData", c.UseRouteError = "useRouteError", c.UseNavigation = "useNavigation", c.UseRouteLoaderData = "useRouteLoaderData", c.UseMatches = "useMatches", c.UseRevalidator = "useRevalidator", c.UseNavigateStable = "useNavigate", c.UseRouteId = "useRouteId", c;
}(Wu || {});
function Bh(c) {
  return c + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function _M(c) {
  let v = B.useContext(Ku);
  return v || vt(!1, Bh(c)), v;
}
function wM(c) {
  let v = B.useContext(Fh);
  return v || vt(!1, Bh(c)), v;
}
function OM(c) {
  let v = B.useContext(Mr);
  return v || vt(!1, Bh(c)), v;
}
function Ph(c) {
  let v = OM(c), h = v.matches[v.matches.length - 1];
  return h.route.id || vt(!1, c + ' can only be used on routes that contain a unique "id"'), h.route.id;
}
function MM() {
  return Ph(Wu.UseRouteId);
}
function LM() {
  var c;
  let v = B.useContext(Vh), h = wM(Wu.UseRouteError), g = Ph(Wu.UseRouteError);
  return v !== void 0 ? v : (c = h.errors) == null ? void 0 : c[g];
}
function UM() {
  let {
    router: c
  } = _M(SE.UseNavigateStable), v = Ph(Wu.UseNavigateStable), h = B.useRef(!1);
  return bE(() => {
    h.current = !0;
  }), B.useCallback(function(E, T) {
    T === void 0 && (T = {}), Za(h.current, gE), h.current && (typeof E == "number" ? c.navigate(E) : c.navigate(E, Gu({
      fromRouteId: v
    }, T)));
  }, [c, v]);
}
const eE = {};
function EE(c, v, h) {
  !v && !eE[c] && (eE[c] = !0, Za(!1, h));
}
function CE(c) {
  vt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function AM(c) {
  let {
    basename: v = "/",
    children: h = null,
    location: g,
    navigationType: E = si.Pop,
    navigator: T,
    static: f = !1,
    future: H
  } = c;
  Ju() && vt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let U = v.replace(/^\/*/, "/"), O = B.useMemo(() => ({
    basename: U,
    navigator: T,
    static: f,
    future: Gu({
      v7_relativeSplatPath: !1
    }, H)
  }), [U, H, T, f]);
  typeof g == "string" && (g = Jo(g));
  let {
    pathname: F = "/",
    search: N = "",
    hash: P = "",
    state: Y = null,
    key: ee = "default"
  } = g, xe = B.useMemo(() => {
    let ie = ci(F, U);
    return ie == null ? null : {
      location: {
        pathname: ie,
        search: N,
        hash: P,
        state: Y,
        key: ee
      },
      navigationType: E
    };
  }, [U, F, N, P, Y, ee, E]);
  return Za(xe != null, '<Router basename="' + U + '"> is not able to match the URL ' + ('"' + F + N + P + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), xe == null ? null : /* @__PURE__ */ B.createElement(Ua.Provider, {
    value: O
  }, /* @__PURE__ */ B.createElement(Xu.Provider, {
    children: h,
    value: xe
  }));
}
function NM(c) {
  let {
    children: v,
    location: h
  } = c;
  return SM(Hh(v), h);
}
new Promise(() => {
});
function Hh(c, v) {
  v === void 0 && (v = []);
  let h = [];
  return B.Children.forEach(c, (g, E) => {
    if (!/* @__PURE__ */ B.isValidElement(g))
      return;
    let T = [...v, E];
    if (g.type === B.Fragment) {
      h.push.apply(h, Hh(g.props.children, T));
      return;
    }
    g.type !== CE && vt(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || vt(!1, "An index route cannot have child routes.");
    let f = {
      id: g.props.id || T.join("-"),
      caseSensitive: g.props.caseSensitive,
      element: g.props.element,
      Component: g.props.Component,
      index: g.props.index,
      path: g.props.path,
      loader: g.props.loader,
      action: g.props.action,
      errorElement: g.props.errorElement,
      ErrorBoundary: g.props.ErrorBoundary,
      hasErrorBoundary: g.props.ErrorBoundary != null || g.props.errorElement != null,
      shouldRevalidate: g.props.shouldRevalidate,
      handle: g.props.handle,
      lazy: g.props.lazy
    };
    g.props.children && (f.children = Hh(g.props.children, T)), h.push(f);
  }), h;
}
/**
 * React Router DOM v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Xo() {
  return Xo = Object.assign ? Object.assign.bind() : function(c) {
    for (var v = 1; v < arguments.length; v++) {
      var h = arguments[v];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (c[g] = h[g]);
    }
    return c;
  }, Xo.apply(this, arguments);
}
function $h(c, v) {
  if (c == null)
    return {};
  var h = {}, g = Object.keys(c), E, T;
  for (T = 0; T < g.length; T++)
    E = g[T], !(v.indexOf(E) >= 0) && (h[E] = c[E]);
  return h;
}
const mf = "get", yf = "application/x-www-form-urlencoded";
function Cf(c) {
  return c != null && typeof c.tagName == "string";
}
function kM(c) {
  return Cf(c) && c.tagName.toLowerCase() === "button";
}
function zM(c) {
  return Cf(c) && c.tagName.toLowerCase() === "form";
}
function jM(c) {
  return Cf(c) && c.tagName.toLowerCase() === "input";
}
function HM(c) {
  return !!(c.metaKey || c.altKey || c.ctrlKey || c.shiftKey);
}
function FM(c, v) {
  return c.button === 0 && // Ignore everything but left clicks
  (!v || v === "_self") && // Let browser handle "target=_blank" etc.
  !HM(c);
}
let pf = null;
function VM() {
  if (pf === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), pf = !1;
    } catch {
      pf = !0;
    }
  return pf;
}
const BM = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Ah(c) {
  return c != null && !BM.has(c) ? (Za(!1, '"' + c + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + yf + '"')), null) : c;
}
function PM(c, v) {
  let h, g, E, T, f;
  if (zM(c)) {
    let H = c.getAttribute("action");
    g = H ? ci(H, v) : null, h = c.getAttribute("method") || mf, E = Ah(c.getAttribute("enctype")) || yf, T = new FormData(c);
  } else if (kM(c) || jM(c) && (c.type === "submit" || c.type === "image")) {
    let H = c.form;
    if (H == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let U = c.getAttribute("formaction") || H.getAttribute("action");
    if (g = U ? ci(U, v) : null, h = c.getAttribute("formmethod") || H.getAttribute("method") || mf, E = Ah(c.getAttribute("formenctype")) || Ah(H.getAttribute("enctype")) || yf, T = new FormData(H, c), !VM()) {
      let {
        name: O,
        type: F,
        value: N
      } = c;
      if (F === "image") {
        let P = O ? O + "." : "";
        T.append(P + "x", "0"), T.append(P + "y", "0");
      } else
        O && T.append(O, N);
    }
  } else {
    if (Cf(c))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    h = mf, g = null, E = yf, f = c;
  }
  return T && E === "text/plain" && (f = T, T = void 0), {
    action: g,
    method: h.toLowerCase(),
    encType: E,
    formData: T,
    body: f
  };
}
const $M = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "unstable_viewTransition"], YM = ["aria-current", "caseSensitive", "className", "end", "style", "to", "unstable_viewTransition", "children"], IM = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "unstable_viewTransition"], qM = "6";
try {
  window.__reactRouterVersion = qM;
} catch {
}
const RE = /* @__PURE__ */ B.createContext({
  isTransitioning: !1
});
RE.displayName = "ViewTransition";
const GM = /* @__PURE__ */ B.createContext(/* @__PURE__ */ new Map());
GM.displayName = "Fetchers";
const WM = "startTransition", tE = $O[WM];
function QM(c) {
  let {
    basename: v,
    children: h,
    future: g,
    window: E
  } = c, T = B.useRef();
  T.current == null && (T.current = qO({
    window: E,
    v5Compat: !0
  }));
  let f = T.current, [H, U] = B.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: O
  } = g || {}, F = B.useCallback((N) => {
    O && tE ? tE(() => U(N)) : U(N);
  }, [U, O]);
  return B.useLayoutEffect(() => f.listen(F), [f, F]), /* @__PURE__ */ B.createElement(AM, {
    basename: v,
    children: h,
    location: H.location,
    navigationType: H.action,
    navigator: f,
    future: g
  });
}
const KM = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", XM = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Qu = /* @__PURE__ */ B.forwardRef(function(v, h) {
  let {
    onClick: g,
    relative: E,
    reloadDocument: T,
    replace: f,
    state: H,
    target: U,
    to: O,
    preventScrollReset: F,
    unstable_viewTransition: N
  } = v, P = $h(v, $M), {
    basename: Y
  } = B.useContext(Ua), ee, xe = !1;
  if (typeof O == "string" && XM.test(O) && (ee = O, KM))
    try {
      let ne = new URL(window.location.href), be = O.startsWith("//") ? new URL(ne.protocol + O) : new URL(O), ue = ci(be.pathname, Y);
      be.origin === ne.origin && ue != null ? O = ue + be.search + be.hash : xe = !0;
    } catch {
      Za(!1, '<Link to="' + O + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ie = yM(O, {
    relative: E
  }), Ce = tL(O, {
    replace: f,
    state: H,
    target: U,
    preventScrollReset: F,
    relative: E,
    unstable_viewTransition: N
  });
  function $(ne) {
    g && g(ne), ne.defaultPrevented || Ce(ne);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ B.createElement("a", Xo({}, P, {
      href: ee || ie,
      onClick: xe || T ? g : $,
      ref: h,
      target: U
    }))
  );
});
Qu.displayName = "Link";
const JM = /* @__PURE__ */ B.forwardRef(function(v, h) {
  let {
    "aria-current": g = "page",
    caseSensitive: E = !1,
    className: T = "",
    end: f = !1,
    style: H,
    to: U,
    unstable_viewTransition: O,
    children: F
  } = v, N = $h(v, YM), P = Zu(U, {
    relative: N.relative
  }), Y = Zo(), ee = B.useContext(Fh), {
    navigator: xe,
    basename: ie
  } = B.useContext(Ua), Ce = ee != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  lL(P) && O === !0, $ = xe.encodeLocation ? xe.encodeLocation(P).pathname : P.pathname, ne = Y.pathname, be = ee && ee.navigation && ee.navigation.location ? ee.navigation.location.pathname : null;
  E || (ne = ne.toLowerCase(), be = be ? be.toLowerCase() : null, $ = $.toLowerCase()), be && ie && (be = ci(be, ie) || be);
  const ue = $ !== "/" && $.endsWith("/") ? $.length - 1 : $.length;
  let Xe = ne === $ || !f && ne.startsWith($) && ne.charAt(ue) === "/", _e = be != null && (be === $ || !f && be.startsWith($) && be.charAt($.length) === "/"), jt = {
    isActive: Xe,
    isPending: _e,
    isTransitioning: Ce
  }, an = Xe ? g : void 0, ct;
  typeof T == "function" ? ct = T(jt) : ct = [T, Xe ? "active" : null, _e ? "pending" : null, Ce ? "transitioning" : null].filter(Boolean).join(" ");
  let Je = typeof H == "function" ? H(jt) : H;
  return /* @__PURE__ */ B.createElement(Qu, Xo({}, N, {
    "aria-current": an,
    className: ct,
    ref: h,
    style: Je,
    to: U,
    unstable_viewTransition: O
  }), typeof F == "function" ? F(jt) : F);
});
JM.displayName = "NavLink";
const ZM = /* @__PURE__ */ B.forwardRef((c, v) => {
  let {
    fetcherKey: h,
    navigate: g,
    reloadDocument: E,
    replace: T,
    state: f,
    method: H = mf,
    action: U,
    onSubmit: O,
    relative: F,
    preventScrollReset: N,
    unstable_viewTransition: P
  } = c, Y = $h(c, IM), ee = iL(), xe = oL(U, {
    relative: F
  }), ie = H.toLowerCase() === "get" ? "get" : "post", Ce = ($) => {
    if (O && O($), $.defaultPrevented)
      return;
    $.preventDefault();
    let ne = $.nativeEvent.submitter, be = (ne == null ? void 0 : ne.getAttribute("formmethod")) || H;
    ee(ne || $.currentTarget, {
      fetcherKey: h,
      method: be,
      navigate: g,
      replace: T,
      state: f,
      relative: F,
      preventScrollReset: N,
      unstable_viewTransition: P
    });
  };
  return /* @__PURE__ */ B.createElement("form", Xo({
    ref: v,
    method: ie,
    action: xe,
    onSubmit: E ? O : Ce
  }, Y));
});
ZM.displayName = "Form";
var bf;
(function(c) {
  c.UseScrollRestoration = "useScrollRestoration", c.UseSubmit = "useSubmit", c.UseSubmitFetcher = "useSubmitFetcher", c.UseFetcher = "useFetcher", c.useViewTransitionState = "useViewTransitionState";
})(bf || (bf = {}));
var nE;
(function(c) {
  c.UseFetcher = "useFetcher", c.UseFetchers = "useFetchers", c.UseScrollRestoration = "useScrollRestoration";
})(nE || (nE = {}));
function eL(c) {
  return c + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function TE(c) {
  let v = B.useContext(Ku);
  return v || vt(!1, eL(c)), v;
}
function tL(c, v) {
  let {
    target: h,
    replace: g,
    state: E,
    preventScrollReset: T,
    relative: f,
    unstable_viewTransition: H
  } = v === void 0 ? {} : v, U = gM(), O = Zo(), F = Zu(c, {
    relative: f
  });
  return B.useCallback((N) => {
    if (FM(N, h)) {
      N.preventDefault();
      let P = g !== void 0 ? g : qu(O) === qu(F);
      U(c, {
        replace: P,
        state: E,
        preventScrollReset: T,
        relative: f,
        unstable_viewTransition: H
      });
    }
  }, [O, U, F, g, E, h, c, T, f, H]);
}
function nL() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let aL = 0, rL = () => "__" + String(++aL) + "__";
function iL() {
  let {
    router: c
  } = TE(bf.UseSubmit), {
    basename: v
  } = B.useContext(Ua), h = MM();
  return B.useCallback(function(g, E) {
    E === void 0 && (E = {}), nL();
    let {
      action: T,
      method: f,
      encType: H,
      formData: U,
      body: O
    } = PM(g, v);
    if (E.navigate === !1) {
      let F = E.fetcherKey || rL();
      c.fetch(F, h, E.action || T, {
        preventScrollReset: E.preventScrollReset,
        formData: U,
        body: O,
        formMethod: E.method || f,
        formEncType: E.encType || H,
        unstable_flushSync: E.unstable_flushSync
      });
    } else
      c.navigate(E.action || T, {
        preventScrollReset: E.preventScrollReset,
        formData: U,
        body: O,
        formMethod: E.method || f,
        formEncType: E.encType || H,
        replace: E.replace,
        state: E.state,
        fromRouteId: h,
        unstable_flushSync: E.unstable_flushSync,
        unstable_viewTransition: E.unstable_viewTransition
      });
  }, [c, v, h]);
}
function oL(c, v) {
  let {
    relative: h
  } = v === void 0 ? {} : v, {
    basename: g
  } = B.useContext(Ua), E = B.useContext(Mr);
  E || vt(!1, "useFormAction must be used inside a RouteContext");
  let [T] = E.matches.slice(-1), f = Xo({}, Zu(c || ".", {
    relative: h
  })), H = Zo();
  if (c == null) {
    f.search = H.search;
    let U = new URLSearchParams(f.search);
    U.has("index") && U.get("index") === "" && (U.delete("index"), f.search = U.toString() ? "?" + U.toString() : "");
  }
  return (!c || c === ".") && T.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : Or([g, f.pathname])), qu(f);
}
function lL(c, v) {
  v === void 0 && (v = {});
  let h = B.useContext(RE);
  h == null && vt(!1, "`unstable_useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = TE(bf.useViewTransitionState), E = Zu(c, {
    relative: v.relative
  });
  if (!h.isTransitioning)
    return !1;
  let T = ci(h.currentLocation.pathname, g) || h.currentLocation.pathname, f = ci(h.nextLocation.pathname, g) || h.nextLocation.pathname;
  return jh(E.pathname, f) != null || jh(E.pathname, T) != null;
}
function Rf() {
  return /* @__PURE__ */ se.jsxs("div", { children: [
    /* @__PURE__ */ se.jsx(Qu, { to: "/", children: "Home" }),
    /* @__PURE__ */ se.jsx(Qu, { to: "/about", children: "  [ about ]" }),
    /* @__PURE__ */ se.jsx("hr", {})
  ] });
}
function uL() {
  return /* @__PURE__ */ se.jsxs("div", { className: "container mx-auto my-2 px-8 bg-white", children: [
    /* @__PURE__ */ se.jsx(Rf, {}),
    /* @__PURE__ */ se.jsx(
      "h1",
      {
        className: "text-4xl text-gray-700 font-bold my-2",
        children: "About!!!"
      }
    )
  ] });
}
const sL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: uL
}, Symbol.toStringTag, { value: "Module" }));
function cL() {
  return /* @__PURE__ */ se.jsx("h1", { children: "Contact!" });
}
const fL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cL
}, Symbol.toStringTag, { value: "Module" }));
function dL() {
  return /* @__PURE__ */ se.jsxs("div", { className: "container mx-auto my-2 px-8 bg-white", children: [
    /* @__PURE__ */ se.jsx(Rf, {}),
    /* @__PURE__ */ se.jsx(
      "h1",
      {
        className: "text-4xl text-gray-700 font-bold my-2",
        children: "Welcome"
      }
    )
  ] });
}
const vL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dL
}, Symbol.toStringTag, { value: "Module" })), Sf = {
  OK_CODE: "OK",
  NG_CODE: "NG",
  //
  STORAGE_KEY_DB: "",
  //session_key
  SESSION_KEY_USER: "user"
  //cookie
}, Ko = {
  /**
  * 
  * @param
  *
  * @return
  */
  post: async function(c, v) {
    try {
      console.log("path=", v);
      let h = "";
      const g = JSON.stringify(c);
      return await (await fetch(v, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: g
      })).json();
    } catch (h) {
      throw console.error(h), new Error("Error , post");
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */
  serverPost: async function(c, v) {
    try {
      c.api_key = "", c.api_url = v, console.log(c);
      const h = JSON.stringify(c), g = await fetch("/api/common/send_post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: h
      }), E = await g.json();
      if (g.status !== 200)
        throw console.error("error, status <> 200"), new Error(await g.text());
      return E.ret !== Sf.OK_CODE ? (console.error("Error, json.ret <> OK"), {}) : E;
    } catch (h) {
      throw console.error(h), new Error("Error , post");
    }
  }
}, Ef = {
  /* modal-name */
  modalIdName: {
    show: "page_show_modal_1",
    edit: "page_edit_modal_1"
  },
  /**
   * 
   * @param key: any
   *
   * @return
   */
  getInputValues: function() {
    try {
      const c = {}, v = document.querySelector("#title").value;
      c.title = v;
      const h = document.querySelector("#content").value;
      return c.content = h, c;
    } catch (c) {
      throw console.error(c), new Error("Error , getInputValues");
    }
  },
  /**
   * 
   * @param
   *
   * @return
   */
  clearInputValues: function() {
    try {
      const c = document.querySelector("#title");
      c && (c.value = "");
      const v = document.querySelector("#content");
      v && (v.value = "");
    } catch (c) {
      throw console.error(c), new Error("Error , getInputValues");
    }
  },
  /**
  * startProc
  * @param
  *
  * @return
  */
  startProc: async function() {
  }
}, pL = {
  /**
   * getList
   * @param
   *
   * @return
   */
  getList: async function() {
    try {
      const c = {
        userId: 0
      };
      console.log(c);
      const v = await Ko.post(c, "/api/torso/get_list");
      let h = [];
      return h = v.data, console.log(h), h;
    } catch (c) {
      throw console.error(c), new Error("Error, getList");
    }
  },
  /**
   *
   * @param
   *
   * @return
   */
  addItem: async function() {
    try {
      let c = !1;
      const v = Ef.getInputValues(), h = {
        api_key: "",
        title: v.title,
        //                "content": "content1",
        content: v.content,
        //content
        completed: 0,
        userId: 0
      };
      console.log(h);
      const g = await Ko.post(h, "/api/turso_todo/create");
      return console.log(g), g.ret === Sf.OK_CODE && (c = !0), Ef.clearInputValues(), c;
    } catch (c) {
      throw console.error("Error, addItem"), console.error(c), new Error("Error , addItem");
    }
  },
  /**
  *
  * @param key: any
  *
  * @return
  */
  displayAlert: function(c) {
    const v = document.querySelector(`#${c}`);
    v && v.classList.remove("d-none"), setTimeout(function() {
      v && v.classList.add("d-none");
    }, 4e3);
  }
};
let aE = [];
function hL() {
  const [c, v] = B.useState("");
  B.useEffect(() => {
    (async () => g())();
  }, []);
  const h = async function() {
    await pL.addItem(), location.reload();
  }, g = async function() {
    try {
      console.log("#TursoTodo.getList");
      const E = {
        userId: 0
      }, T = await Ko.post(E, "/api/turso_todo/get_list");
      aE = T.data, console.log(T.data), v((/* @__PURE__ */ new Date()).toString());
    } catch (E) {
      console.error(E);
    }
  };
  return /* @__PURE__ */ se.jsxs("div", { className: "container mx-auto my-2 px-8 bg-white", children: [
    /* @__PURE__ */ se.jsx(Rf, {}),
    /* @__PURE__ */ se.jsx("hr", {}),
    /* @__PURE__ */ se.jsx("h1", { className: "text-4xl font-bold my-2", children: "TursoTodo.tsx" }),
    /* @__PURE__ */ se.jsx("hr", { className: "my-2" }),
    /* @__PURE__ */ se.jsxs("label", { className: "text-3xl font-bold my-2", children: [
      "Title:",
      /* @__PURE__ */ se.jsx(
        "input",
        {
          type: "text",
          id: "title",
          className: "border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        }
      )
    ] }),
    /* @__PURE__ */ se.jsxs("label", { className: "text-3xl font-bold my-2", children: [
      "Content:",
      /* @__PURE__ */ se.jsx(
        "input",
        {
          type: "text",
          id: "content",
          className: "border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        }
      )
    ] }),
    /* @__PURE__ */ se.jsx("hr", { className: "my-2" }),
    /* @__PURE__ */ se.jsx("button", { className: "btn-purple", onClick: () => h(), children: "Save" }),
    /* @__PURE__ */ se.jsx("hr", { className: "my-1" }),
    aE.map((E, T) => /* @__PURE__ */ se.jsxs("div", { children: [
      /* @__PURE__ */ se.jsx("h3", { className: "text-3xl font-bold", children: E.title }),
      /* @__PURE__ */ se.jsxs("span", { children: [
        "ID: ",
        E.id,
        ", ",
        E.createdAt
      ] }),
      /* @__PURE__ */ se.jsx("a", { href: `/tursotodoshow?id=${E.id}`, children: /* @__PURE__ */ se.jsx("button", { className: "btn-outline-purple ms-2", children: "Show" }) }),
      /* @__PURE__ */ se.jsx("hr", {})
    ] }, T))
  ] });
}
const mL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hL
}, Symbol.toStringTag, { value: "Module" })), rE = {
  /**
   *
   * @param
   *
   * @return
   */
  get: async function(c) {
    try {
      let v = {};
      const h = {
        id: c
      }, g = await Ko.post(h, "/api/turso_todo/get");
      let E = [];
      return E = g.data, E.length < 1 && console.error("error, length = 0"), v = E[0], v;
    } catch (v) {
      throw console.error(v), new Error("Error, get");
    }
  },
  /**
  * delete:
  * @param key: any
  *
  * @return
  */
  delete: async function(c) {
    try {
      let v = !1;
      const h = {
        id: c
      }, g = await Ko.post(h, "/api/turso_todo/delete");
      return console.log(g), g.ret === Sf.OK_CODE && (v = !0), v;
    } catch (v) {
      console.error(v);
    }
  },
  /**
  *
  * @param
  *
  * @return
  */
  update: async function(c) {
    try {
      let v = !1;
      const h = Ef.getInputValues();
      h.userId = 0, h.id = c, h.completed = 0, console.log(h);
      const g = await Ko.post(h, "/test/update");
      return console.log(g), g.ret === Sf.OK_CODE && (v = !0), Ef.clearInputValues(), v;
    } catch (v) {
      throw console.error("Error, update"), console.error(v), new Error("Error , update");
    }
  }
};
let Yu = {}, Nh = 0;
function yL() {
  const [c, v] = B.useState("");
  B.useEffect(() => {
    (async () => {
      const T = new URLSearchParams(window.location.search).get("id") || "";
      Nh = Number(T), h(Nh);
    })();
  }, []);
  const h = async function(E) {
    try {
      if (E < 1)
        return;
      Yu = await rE.get(E), console.log(Yu), v((/* @__PURE__ */ new Date()).toString());
    } catch (T) {
      console.error(T);
    }
  }, g = async function() {
    await rE.delete(Nh) && (location.href = "/tursotodo");
  };
  return /* @__PURE__ */ se.jsxs("div", { className: "container mx-auto my-2 px-8 bg-white", children: [
    /* @__PURE__ */ se.jsx(Rf, {}),
    /* @__PURE__ */ se.jsx("a", { className: "my-2", href: "/tursotodo", children: /* @__PURE__ */ se.jsx("button", { className: "btn-outline-purple ms-2", children: "Back" }) }),
    /* @__PURE__ */ se.jsx("hr", { className: "my-2" }),
    /* @__PURE__ */ se.jsx("h1", { className: "text-4xl font-bold my-2", children: "TursoTodo.tsx" }),
    /* @__PURE__ */ se.jsx("hr", { className: "my-2" }),
    /* @__PURE__ */ se.jsx("h1", { className: "text-4xl font-bold", children: Yu.title }),
    /* @__PURE__ */ se.jsxs("p", { children: [
      "ID: ",
      Yu.id
    ] }),
    /* @__PURE__ */ se.jsx("hr", { className: "my-1" }),
    /* @__PURE__ */ se.jsx("pre", { children: Yu.content }),
    /* @__PURE__ */ se.jsx("hr", { className: "my-1" }),
    /* @__PURE__ */ se.jsx("button", { className: "btn-red", onClick: () => g(), children: "Save" }),
    /* @__PURE__ */ se.jsx("hr", { className: "my-1" })
  ] });
}
const gL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yL
}, Symbol.toStringTag, { value: "Module" })), iE = /* @__PURE__ */ Object.assign({ "./client/About.tsx": sL, "./client/Contact.tsx": fL, "./client/Home.tsx": vL, "./client/TursoTodo.tsx": mL, "./client/TursoTodoShow.tsx": gL }), oE = Object.keys(iE).map((c) => {
  const v = c.match(/\.\/client\/(.*)\.tsx$/)[1];
  return {
    name: v,
    path: v === "Home" ? "/" : `/${v.toLowerCase()}`,
    component: iE[c].default
  };
});
function bL() {
  return /* @__PURE__ */ se.jsxs(se.Fragment, { children: [
    /* @__PURE__ */ se.jsx("nav", { children: /* @__PURE__ */ se.jsx("ul", { children: oE.map(({ name: c, path: v }) => /* @__PURE__ */ se.jsx("li", { children: /* @__PURE__ */ se.jsx(Qu, { to: v, children: c }) }, v)) }) }),
    /* @__PURE__ */ se.jsx(NM, { children: oE.map(({ path: c, component: v }) => /* @__PURE__ */ se.jsx(
      CE,
      {
        path: c,
        element: /* @__PURE__ */ se.jsx(v, {})
      },
      c
    )) })
  ] });
}
kh.createRoot(document.getElementById("app")).render(
  /* @__PURE__ */ se.jsx(sE.StrictMode, { children: /* @__PURE__ */ se.jsx(QM, { children: /* @__PURE__ */ se.jsx(bL, {}) }) })
);
console.log("createRoot");
