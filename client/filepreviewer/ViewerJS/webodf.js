/*

 This is a generated file. DO NOT EDIT.

 Copyright (C) 2010-2015 KO GmbH <copyright@kogmbh.com>
 Copyright (C) 2020-2022 grommunio GmbH <dev@grommunio.com>

 @licstart
 This file is the compiled version of the WebODF library.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
var webodf_version = "0.5.10";
function Runtime() {}
Runtime.prototype.getVariable = function (g) {};
Runtime.prototype.toJson = function (g) {};
Runtime.prototype.fromJson = function (g) {};
Runtime.prototype.byteArrayFromString = function (g, k) {};
Runtime.prototype.byteArrayToString = function (g, k) {};
Runtime.prototype.read = function (g, k, d, b) {};
Runtime.prototype.readFile = function (g, k, d) {};
Runtime.prototype.readFileSync = function (g, k) {};
Runtime.prototype.loadXML = function (g, k) {};
Runtime.prototype.writeFile = function (g, k, d) {};
Runtime.prototype.deleteFile = function (g, k) {};
Runtime.prototype.log = function (g, k) {};
Runtime.prototype.setTimeout = function (g, k) {};
Runtime.prototype.clearTimeout = function (g) {};
Runtime.prototype.libraryPaths = function () {};
Runtime.prototype.currentDirectory = function () {};
Runtime.prototype.setCurrentDirectory = function (g) {};
Runtime.prototype.type = function () {};
Runtime.prototype.getDOMImplementation = function () {};
Runtime.prototype.parseXML = function (g) {};
Runtime.prototype.exit = function (g) {};
Runtime.prototype.getWindow = function () {};
Runtime.prototype.requestAnimationFrame = function (g) {};
Runtime.prototype.cancelAnimationFrame = function (g) {};
Runtime.prototype.assert = function (g, k) {};
var IS_COMPILED_CODE = !0;
Runtime.byteArrayToString = function (g, k) {
  function d(b) {
    var d = "",
      r,
      q = b.length;
    for (r = 0; r < q; r += 1) d += String.fromCharCode(b[r] & 255);
    return d;
  }
  function b(b) {
    var d = "",
      r,
      q = b.length,
      e = [],
      l,
      a,
      c,
      m;
    for (
      r = 3 <= q && 239 === b[0] && 187 === b[1] && 191 === b[2] ? 3 : 0;
      r < q;
      r += 1
    )
      (l = b[r]),
        128 > l
          ? e.push(l)
          : ((r += 1),
            (a = b[r]),
            194 <= l && 224 > l
              ? e.push(((l & 31) << 6) | (a & 63))
              : ((r += 1),
                (c = b[r]),
                224 <= l && 240 > l
                  ? e.push(((l & 15) << 12) | ((a & 63) << 6) | (c & 63))
                  : ((r += 1),
                    (m = b[r]),
                    240 <= l &&
                      245 > l &&
                      ((l =
                        ((l & 7) << 18) |
                        ((a & 63) << 12) |
                        ((c & 63) << 6) |
                        (m & 63)),
                      (l -= 65536),
                      e.push((l >> 10) + 55296, (l & 1023) + 56320))))),
        1e3 <= e.length &&
          ((d += String.fromCharCode.apply(null, e)), (e.length = 0));
    return d + String.fromCharCode.apply(null, e);
  }
  var f;
  "utf8" === k
    ? (f = b(g))
    : ("binary" !== k && this.log("Unsupported encoding: " + k), (f = d(g)));
  return f;
};
Runtime.getVariable = function (g) {
  try {
    return eval(g);
  } catch (k) {}
};
Runtime.toJson = function (g) {
  return JSON.stringify(g);
};
Runtime.fromJson = function (g) {
  return JSON.parse(g);
};
Runtime.getFunctionName = function (g) {
  return void 0 === g.name ? (g = /function\s+(\w+)/.exec(g)) && g[1] : g.name;
};
Runtime.assert = function (g, k) {
  if (!g) throw (this.log("alert", "ASSERTION FAILED:\n" + k), Error(k));
};
function BrowserRuntime() {
  function g(b) {
    var e = b.length,
      l,
      a,
      c = 0;
    for (l = 0; l < e; l += 1)
      (a = b.charCodeAt(l)),
        (c += 1 + (128 < a) + (2048 < a)),
        55040 < a && 57344 > a && ((c += 1), (l += 1));
    return c;
  }
  function k(b, e, l) {
    var a = b.length,
      c,
      m;
    e = new Uint8Array(new ArrayBuffer(e));
    l ? ((e[0] = 239), (e[1] = 187), (e[2] = 191), (m = 3)) : (m = 0);
    for (l = 0; l < a; l += 1)
      (c = b.charCodeAt(l)),
        128 > c
          ? ((e[m] = c), (m += 1))
          : 2048 > c
          ? ((e[m] = 192 | (c >>> 6)), (e[m + 1] = 128 | (c & 63)), (m += 2))
          : 55040 >= c || 57344 <= c
          ? ((e[m] = 224 | ((c >>> 12) & 15)),
            (e[m + 1] = 128 | ((c >>> 6) & 63)),
            (e[m + 2] = 128 | (c & 63)),
            (m += 3))
          : ((l += 1),
            (c = (((c - 55296) << 10) | (b.charCodeAt(l) - 56320)) + 65536),
            (e[m] = 240 | ((c >>> 18) & 7)),
            (e[m + 1] = 128 | ((c >>> 12) & 63)),
            (e[m + 2] = 128 | ((c >>> 6) & 63)),
            (e[m + 3] = 128 | (c & 63)),
            (m += 4));
    return e;
  }
  function d(b) {
    var e = b.length,
      l = new Uint8Array(new ArrayBuffer(e)),
      a;
    for (a = 0; a < e; a += 1) l[a] = b.charCodeAt(a) & 255;
    return l;
  }
  function b(b, e) {
    var l;
    void 0 !== e ? (l = b) : (e = b);
    console.log(e);
    r.enableAlerts && "alert" === l && alert(e);
  }
  function f(b, e, l) {
    if (0 !== l.status || l.responseText)
      if (200 === l.status || 0 === l.status) {
        if (l.response && "string" !== typeof l.response)
          "binary" === e
            ? ((l = l.response), (l = new Uint8Array(l)))
            : (l = String(l.response));
        else if ("binary" === e)
          if (
            null !== l.responseBody &&
            "undefined" !== String(typeof VBArray)
          ) {
            l = new VBArray(l.responseBody).toArray();
            var a = l.length;
            e = new Uint8Array(new ArrayBuffer(a));
            for (b = 0; b < a; b += 1) e[b] = l[b];
            l = e;
          } else {
            (b = l.getResponseHeader("Content-Length")) &&
              (b = parseInt(b, 10));
            if (b && b !== l.responseText.length)
              a: {
                a = l.responseText;
                e = !1;
                var c = g(a);
                if ("number" === typeof b) {
                  if (b !== c && b !== c + 3) {
                    a = void 0;
                    break a;
                  }
                  e = c + 3 === b;
                  c = b;
                }
                a = k(a, c, e);
              }
            void 0 === a && (a = d(l.responseText));
            l = a;
          }
        else l = l.responseText;
        l = { err: null, data: l };
      } else l = { err: l.responseText || l.statusText, data: null };
    else l = { err: "File " + b + " is empty.", data: null };
    return l;
  }
  function n(b, e, l) {
    var a = new XMLHttpRequest();
    a.open("GET", b, l);
    a.overrideMimeType &&
      ("binary" !== e
        ? a.overrideMimeType("text/plain; charset=" + e)
        : a.overrideMimeType("text/plain; charset=x-user-defined"));
    return a;
  }
  function p(b, e, l) {
    var a = n(b, e, !0);
    a.onreadystatechange = function () {
      var c;
      4 === a.readyState && ((c = f(b, e, a)), l(c.err, c.data));
    };
    try {
      a.send(null);
    } catch (c) {
      l(c.message, null);
    }
  }
  var r = this;
  this.byteArrayFromString = function (b, e) {
    var l;
    "utf8" === e
      ? (l = k(b, g(b), !1))
      : ("binary" !== e && r.log("unknown encoding: " + e), (l = d(b)));
    return l;
  };
  this.byteArrayToString = Runtime.byteArrayToString;
  this.getVariable = Runtime.getVariable;
  this.fromJson = Runtime.fromJson;
  this.toJson = Runtime.toJson;
  this.readFile = p;
  this.read = function (b, e, l, a) {
    p(b, "binary", function (c, m) {
      var h = null;
      if (m) {
        if ("string" === typeof m) throw "This should not happen.";
        h = m.subarray(e, e + l);
      }
      a(c, h);
    });
  };
  this.readFileSync = function (b, e) {
    var l = n(b, e, !1),
      a;
    try {
      l.send(null);
      a = f(b, e, l);
      if (a.err) throw a.err;
      if (null === a.data) throw "No data read from " + b + ".";
    } catch (c) {
      throw c;
    }
    return a.data;
  };
  this.writeFile = function (b, e, l) {
    var a = new XMLHttpRequest(),
      c;
    a.open("PUT", b, !0);
    a.onreadystatechange = function () {
      4 === a.readyState &&
        (0 !== a.status || a.responseText
          ? (200 <= a.status && 300 > a.status) || 0 === a.status
            ? l(null)
            : l(
                "Status " + String(a.status) + ": " + a.responseText ||
                  a.statusText
              )
          : l("File " + b + " is empty."));
    };
    c =
      e.buffer && !a.sendAsBinary ? e.buffer : r.byteArrayToString(e, "binary");
    try {
      a.sendAsBinary ? a.sendAsBinary(c) : a.send(c);
    } catch (m) {
      r.log("HUH? " + m + " " + e), l(m.message);
    }
  };
  this.deleteFile = function (b, e) {
    var l = new XMLHttpRequest();
    l.open("DELETE", b, !0);
    l.onreadystatechange = function () {
      4 === l.readyState &&
        (200 > l.status && 300 <= l.status ? e(l.responseText) : e(null));
    };
    l.send(null);
  };
  this.loadXML = function (b, e) {
    var l = new XMLHttpRequest();
    l.open("GET", b, !0);
    l.overrideMimeType && l.overrideMimeType("text/xml");
    l.onreadystatechange = function () {
      4 === l.readyState &&
        (0 !== l.status || l.responseText
          ? 200 === l.status || 0 === l.status
            ? e(null, l.responseXML)
            : e(l.responseText, null)
          : e("File " + b + " is empty.", null));
    };
    try {
      l.send(null);
    } catch (a) {
      e(a.message, null);
    }
  };
  this.log = b;
  this.enableAlerts = !0;
  this.assert = Runtime.assert;
  this.setTimeout = function (b, e) {
    return setTimeout(function () {
      b();
    }, e);
  };
  this.clearTimeout = function (b) {
    clearTimeout(b);
  };
  this.libraryPaths = function () {
    return ["lib"];
  };
  this.setCurrentDirectory = function () {};
  this.currentDirectory = function () {
    return "";
  };
  this.type = function () {
    return "BrowserRuntime";
  };
  this.getDOMImplementation = function () {
    return window.document.implementation;
  };
  this.parseXML = function (b) {
    return new DOMParser().parseFromString(b, "text/xml");
  };
  this.exit = function (d) {
    b(
      "Calling exit with code " + String(d) + ", but exit() is not implemented."
    );
  };
  this.getWindow = function () {
    return window;
  };
  this.requestAnimationFrame = function (b) {
    var e =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame,
      l = 0;
    if (e) e.bind(window), (l = e(b));
    else return setTimeout(b, 15);
    return l;
  };
  this.cancelAnimationFrame = function (b) {
    var e =
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.msCancelAnimationFrame;
    e ? (e.bind(window), e(b)) : clearTimeout(b);
  };
}
function NodeJSRuntime() {
  function g(b) {
    var e = b.length,
      l,
      a = new Uint8Array(new ArrayBuffer(e));
    for (l = 0; l < e; l += 1) a[l] = b[l];
    return a;
  }
  function k(d, e, l) {
    function a(a, m) {
      if (a) return l(a, null);
      if (!m) return l("No data for " + d + ".", null);
      if ("string" === typeof m) return l(a, m);
      l(a, g(m));
    }
    d = f.resolve(n, d);
    "binary" !== e ? b.readFile(d, e, a) : b.readFile(d, null, a);
  }
  var d = this,
    b = require("fs"),
    f = require("path"),
    n = "",
    p,
    r;
  this.byteArrayFromString = function (b, e) {
    var l = new Buffer(b, e),
      a,
      c = l.length,
      m = new Uint8Array(new ArrayBuffer(c));
    for (a = 0; a < c; a += 1) m[a] = l[a];
    return m;
  };
  this.byteArrayToString = Runtime.byteArrayToString;
  this.getVariable = Runtime.getVariable;
  this.fromJson = Runtime.fromJson;
  this.toJson = Runtime.toJson;
  this.readFile = k;
  this.loadXML = function (b, e) {
    k(b, "utf-8", function (l, a) {
      if (l) return e(l, null);
      if (!a) return e("No data for " + b + ".", null);
      e(null, d.parseXML(a));
    });
  };
  this.writeFile = function (d, e, l) {
    e = new Buffer(e);
    d = f.resolve(n, d);
    b.writeFile(d, e, "binary", function (a) {
      l(a || null);
    });
  };
  this.deleteFile = function (d, e) {
    d = f.resolve(n, d);
    b.unlink(d, e);
  };
  this.read = function (d, e, l, a) {
    d = f.resolve(n, d);
    b.open(d, "r+", 666, function (c, m) {
      if (c) a(c, null);
      else {
        var h = new Buffer(l);
        b.read(m, h, 0, l, e, function (c) {
          b.close(m);
          a(c, g(h));
        });
      }
    });
  };
  this.readFileSync = function (d, e) {
    var l;
    l = b.readFileSync(d, "binary" === e ? null : e);
    if (null === l) throw "File " + d + " could not be read.";
    "binary" === e && (l = g(l));
    return l;
  };
  this.log = function (b, e) {
    var l;
    void 0 !== e ? (l = b) : (e = b);
    "alert" === l && process.stderr.write("\n!!!!! ALERT !!!!!\n");
    process.stderr.write(e + "\n");
    "alert" === l && process.stderr.write("!!!!! ALERT !!!!!\n");
  };
  this.assert = Runtime.assert;
  this.setTimeout = function (b, e) {
    return setTimeout(function () {
      b();
    }, e);
  };
  this.clearTimeout = function (b) {
    clearTimeout(b);
  };
  this.libraryPaths = function () {
    return [__dirname];
  };
  this.setCurrentDirectory = function (b) {
    n = b;
  };
  this.currentDirectory = function () {
    return n;
  };
  this.type = function () {
    return "NodeJSRuntime";
  };
  this.getDOMImplementation = function () {
    return r;
  };
  this.parseXML = function (b) {
    return p.parseFromString(b, "text/xml");
  };
  this.exit = process.exit;
  this.getWindow = function () {
    return null;
  };
  this.requestAnimationFrame = function (b) {
    return setTimeout(b, 15);
  };
  this.cancelAnimationFrame = function (b) {
    clearTimeout(b);
  };
  p = new (require("xmldom").DOMParser)();
  r = d.parseXML("<a/>").implementation;
}
function RhinoRuntime() {
  var g = this,
    k = {},
    d = k.javax.xml.parsers.DocumentBuilderFactory.newInstance(),
    b,
    f,
    n = "";
  d.setValidating(!1);
  d.setNamespaceAware(!0);
  d.setExpandEntityReferences(!1);
  d.setSchema(null);
  f = k.org.xml.sax.EntityResolver({
    resolveEntity: function (b, d) {
      var f = new k.java.io.FileReader(d);
      return new k.org.xml.sax.InputSource(f);
    },
  });
  b = d.newDocumentBuilder();
  b.setEntityResolver(f);
  this.byteArrayFromString = function (b, d) {
    var f,
      e = b.length,
      l = new Uint8Array(new ArrayBuffer(e));
    for (f = 0; f < e; f += 1) l[f] = b.charCodeAt(f) & 255;
    return l;
  };
  this.byteArrayToString = Runtime.byteArrayToString;
  this.getVariable = Runtime.getVariable;
  this.fromJson = Runtime.fromJson;
  this.toJson = Runtime.toJson;
  this.loadXML = function (d, f) {
    var n = new k.java.io.File(d),
      e = null;
    try {
      e = b.parse(n);
    } catch (l) {
      return print(l), f(l, null);
    }
    f(null, e);
  };
  this.readFile = function (b, d, f) {
    n && (b = n + "/" + b);
    var e = new k.java.io.File(b),
      l = "binary" === d ? "latin1" : d;
    e.isFile()
      ? ((b = readFile(b, l)) &&
          "binary" === d &&
          (b = g.byteArrayFromString(b, "binary")),
        f(null, b))
      : f(b + " is not a file.", null);
  };
  this.writeFile = function (b, d, f) {
    n && (b = n + "/" + b);
    b = new k.java.io.FileOutputStream(b);
    var e,
      l = d.length;
    for (e = 0; e < l; e += 1) b.write(d[e]);
    b.close();
    f(null);
  };
  this.deleteFile = function (b, d) {
    n && (b = n + "/" + b);
    var f = new k.java.io.File(b),
      e = b + Math.random(),
      e = new k.java.io.File(e);
    f.rename(e) ? (e.deleteOnExit(), d(null)) : d("Could not delete " + b);
  };
  this.read = function (b, d, f, e) {
    n && (b = n + "/" + b);
    var l;
    l = b;
    var a = "binary";
    new k.java.io.File(l).isFile()
      ? ("binary" === a && (a = "latin1"), (l = readFile(l, a)))
      : (l = null);
    l
      ? e(null, this.byteArrayFromString(l.substring(d, d + f), "binary"))
      : e("Cannot read " + b, null);
  };
  this.readFileSync = function (b, d) {
    if (!d) return "";
    var f = readFile(b, d);
    if (null === f) throw "File could not be read.";
    return f;
  };
  this.log = function (b, d) {
    var f;
    void 0 !== d ? (f = b) : (d = b);
    "alert" === f && print("\n!!!!! ALERT !!!!!");
    print(d);
    "alert" === f && print("!!!!! ALERT !!!!!");
  };
  this.assert = Runtime.assert;
  this.setTimeout = function (b) {
    b();
    return 0;
  };
  this.clearTimeout = function () {};
  this.libraryPaths = function () {
    return ["lib"];
  };
  this.setCurrentDirectory = function (b) {
    n = b;
  };
  this.currentDirectory = function () {
    return n;
  };
  this.type = function () {
    return "RhinoRuntime";
  };
  this.getDOMImplementation = function () {
    return b.getDOMImplementation();
  };
  this.parseXML = function (d) {
    d = new k.java.io.StringReader(d);
    d = new k.org.xml.sax.InputSource(d);
    return b.parse(d);
  };
  this.exit = quit;
  this.getWindow = function () {
    return null;
  };
  this.requestAnimationFrame = function (b) {
    b();
    return 0;
  };
  this.cancelAnimationFrame = function () {};
}
Runtime.create = function () {
  return "undefined" !== String(typeof window)
    ? new BrowserRuntime()
    : "undefined" !== String(typeof require)
    ? new NodeJSRuntime()
    : new RhinoRuntime();
};
var runtime = Runtime.create(),
  core = {},
  gui = {},
  xmldom = {},
  odf = {},
  ops = {},
  webodf = {};
(function () {
  webodf.Version =
    "undefined" !== String(typeof webodf_version)
      ? webodf_version
      : "From Source";
})();
(function () {
  function g(b, d, e) {
    var l = b + "/manifest.json",
      a,
      c;
    runtime.log("Loading manifest: " + l);
    try {
      a = runtime.readFileSync(l, "utf-8");
    } catch (m) {
      if (e) runtime.log("No loadable manifest found.");
      else throw (console.log(String(m)), m);
      return;
    }
    e = JSON.parse(a);
    for (c in e) e.hasOwnProperty(c) && (d[c] = { dir: b, deps: e[c] });
  }
  function k(b, d, e) {
    function l(h) {
      if (!m[h] && !e(h)) {
        if (c[h]) throw "Circular dependency detected for " + h + ".";
        c[h] = !0;
        if (!d[h]) throw "Missing dependency information for class " + h + ".";
        var b = d[h],
          f = b.deps,
          n,
          r = f.length;
        for (n = 0; n < r; n += 1) l(f[n]);
        c[h] = !1;
        m[h] = !0;
        a.push(b.dir + "/" + h.replace(".", "/") + ".js");
      }
    }
    var a = [],
      c = {},
      m = {};
    b.forEach(l);
    return a;
  }
  function d(b, d) {
    return d + ("\n//# sourceURL=" + b);
  }
  function b(b) {
    var f, e;
    for (f = 0; f < b.length; f += 1)
      (e = runtime.readFileSync(b[f], "utf-8")), (e = d(b[f], e)), eval(e);
  }
  function f(b) {
    b = b.split(".");
    var d,
      e = p,
      l = b.length;
    for (d = 0; d < l; d += 1) {
      if (!e.hasOwnProperty(b[d])) return !1;
      e = e[b[d]];
    }
    return !0;
  }
  var n,
    p = { core: core, gui: gui, xmldom: xmldom, odf: odf, ops: ops };
  runtime.loadClasses = function (d, p) {
    if (IS_COMPILED_CODE || 0 === d.length) return p && p();
    var e;
    if (!(e = n)) {
      e = [];
      var l = runtime.libraryPaths(),
        a;
      runtime.currentDirectory() &&
        -1 === l.indexOf(runtime.currentDirectory()) &&
        g(runtime.currentDirectory(), e, !0);
      for (a = 0; a < l.length; a += 1) g(l[a], e);
    }
    n = e;
    d = k(d, n, f);
    if (0 === d.length) return p && p();
    if ("BrowserRuntime" === runtime.type() && p) {
      e = d;
      l = document.currentScript || document.documentElement.lastChild;
      a = document.createDocumentFragment();
      var c, m;
      for (m = 0; m < e.length; m += 1)
        (c = document.createElement("script")),
          (c.type = "text/javascript"),
          (c.charset = "utf-8"),
          (c.async = !1),
          c.setAttribute("src", e[m]),
          a.appendChild(c);
      p && (c.onload = p);
      l.parentNode.insertBefore(a, l);
    } else b(d), p && p();
  };
  runtime.loadClass = function (b, d) {
    runtime.loadClasses([b], d);
  };
})();
(function () {
  var g = function (g) {
    return g;
  };
  runtime.getTranslator = function () {
    return g;
  };
  runtime.setTranslator = function (k) {
    g = k;
  };
  runtime.tr = function (k) {
    var d = g(k);
    return d && "string" === String(typeof d) ? d : k;
  };
})();
(function (g) {
  function k(d) {
    if (d.length) {
      var b = d[0];
      runtime.readFile(b, "utf8", function (f, n) {
        function g() {
          var b;
          (b = eval(k)) && runtime.exit(b);
        }
        var r = "",
          r = b.lastIndexOf("/"),
          k = n,
          r = -1 !== r ? b.substring(0, r) : ".";
        runtime.setCurrentDirectory(r);
        f
          ? (runtime.log(f), runtime.exit(1))
          : null === k
          ? (runtime.log("No code found for " + b), runtime.exit(1))
          : g.apply(null, d);
      });
    }
  }
  g = g ? Array.prototype.slice.call(g) : [];
  "NodeJSRuntime" === runtime.type()
    ? k(process.argv.slice(2))
    : "RhinoRuntime" === runtime.type()
    ? k(g)
    : k(g.slice(1));
})("undefined" !== String(typeof arguments) && arguments);
(function () {
  core.Async = (function () {
    return {
      forEach: function (g, k, d) {
        function b(b) {
          p !== n && (b ? ((p = n), d(b)) : ((p += 1), p === n && d(null)));
        }
        var f,
          n = g.length,
          p = 0;
        for (f = 0; f < n; f += 1) k(g[f], b);
      },
      destroyAll: function (g, k) {
        function d(b, f) {
          if (f) k(f);
          else if (b < g.length)
            g[b](function (f) {
              d(b + 1, f);
            });
          else k();
        }
        d(0, void 0);
      },
    };
  })();
})();
function makeBase64() {
  function g(a) {
    var c,
      m = a.length,
      h = new Uint8Array(new ArrayBuffer(m));
    for (c = 0; c < m; c += 1) h[c] = a.charCodeAt(c) & 255;
    return h;
  }
  function k(a) {
    var c,
      m = "",
      h,
      b = a.length - 2;
    for (h = 0; h < b; h += 3)
      (c = (a[h] << 16) | (a[h + 1] << 8) | a[h + 2]),
        (m +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
            c >>> 18
          ]),
        (m +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
            (c >>> 12) & 63
          ]),
        (m +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
            (c >>> 6) & 63
          ]),
        (m +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
            c & 63
          ]);
    h === b + 1
      ? ((c = a[h] << 4),
        (m +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
            c >>> 6
          ]),
        (m +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
            c & 63
          ]),
        (m += "=="))
      : h === b &&
        ((c = (a[h] << 10) | (a[h + 1] << 2)),
        (m +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
            c >>> 12
          ]),
        (m +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
            (c >>> 6) & 63
          ]),
        (m +=
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
            c & 63
          ]),
        (m += "="));
    return m;
  }
  function d(a) {
    a = a.replace(/[^A-Za-z0-9+\/]+/g, "");
    var c = a.length,
      m = new Uint8Array(new ArrayBuffer(3 * c)),
      b = a.length % 4,
      d = 0,
      l,
      e;
    for (l = 0; l < c; l += 4)
      (e =
        ((h[a.charAt(l)] || 0) << 18) |
        ((h[a.charAt(l + 1)] || 0) << 12) |
        ((h[a.charAt(l + 2)] || 0) << 6) |
        (h[a.charAt(l + 3)] || 0)),
        (m[d] = e >> 16),
        (m[d + 1] = (e >> 8) & 255),
        (m[d + 2] = e & 255),
        (d += 3);
    c = 3 * c - [0, 0, 2, 1][b];
    return m.subarray(0, c);
  }
  function b(a) {
    var c,
      m,
      h = a.length,
      b = 0,
      d = new Uint8Array(new ArrayBuffer(3 * h));
    for (c = 0; c < h; c += 1)
      (m = a[c]),
        128 > m
          ? (d[b++] = m)
          : (2048 > m
              ? (d[b++] = 192 | (m >>> 6))
              : ((d[b++] = 224 | ((m >>> 12) & 15)),
                (d[b++] = 128 | ((m >>> 6) & 63))),
            (d[b++] = 128 | (m & 63)));
    return d.subarray(0, b);
  }
  function f(a) {
    var c,
      m,
      h,
      b,
      d = a.length,
      l = new Uint8Array(new ArrayBuffer(d)),
      e = 0;
    for (c = 0; c < d; c += 1)
      (m = a[c]),
        128 > m
          ? (l[e++] = m)
          : ((c += 1),
            (h = a[c]),
            224 > m
              ? (l[e++] = ((m & 31) << 6) | (h & 63))
              : ((c += 1),
                (b = a[c]),
                (l[e++] = ((m & 15) << 12) | ((h & 63) << 6) | (b & 63))));
    return l.subarray(0, e);
  }
  function n(a) {
    return k(g(a));
  }
  function p(a) {
    return String.fromCharCode.apply(String, d(a));
  }
  function r(a) {
    return f(g(a));
  }
  function q(a) {
    a = f(a);
    for (var c = "", m = 0; m < a.length; )
      (c += String.fromCharCode.apply(String, a.subarray(m, m + 45e3))),
        (m += 45e3);
    return c;
  }
  function e(a, c, m) {
    var h,
      b,
      d,
      l = "";
    for (d = c; d < m; d += 1)
      (c = a.charCodeAt(d) & 255),
        128 > c
          ? (l += String.fromCharCode(c))
          : ((d += 1),
            (h = a.charCodeAt(d) & 255),
            224 > c
              ? (l += String.fromCharCode(((c & 31) << 6) | (h & 63)))
              : ((d += 1),
                (b = a.charCodeAt(d) & 255),
                (l += String.fromCharCode(
                  ((c & 15) << 12) | ((h & 63) << 6) | (b & 63)
                ))));
    return l;
  }
  function l(a, c) {
    function m() {
      var d = b + 1e5;
      d > a.length && (d = a.length);
      h += e(a, b, d);
      b = d;
      d = b === a.length;
      c(h, d) && !d && runtime.setTimeout(m, 0);
    }
    var h = "",
      b = 0;
    1e5 > a.length
      ? c(e(a, 0, a.length), !0)
      : ("string" !== typeof a && (a = a.slice()), m());
  }
  function a(a) {
    return b(g(a));
  }
  function c(a) {
    return String.fromCharCode.apply(String, b(a));
  }
  function m(a) {
    return String.fromCharCode.apply(String, b(g(a)));
  }
  var h = (function (a) {
      var c = {},
        m,
        h;
      m = 0;
      for (h = a.length; m < h; m += 1) c[a.charAt(m)] = m;
      return c;
    })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
    y,
    x,
    z = runtime.getWindow(),
    w,
    v;
  z && z.btoa
    ? ((w = z.btoa),
      (y = function (a) {
        return w(m(a));
      }))
    : ((w = n),
      (y = function (c) {
        return k(a(c));
      }));
  z && z.atob
    ? ((v = z.atob),
      (x = function (a) {
        a = v(a);
        return e(a, 0, a.length);
      }))
    : ((v = p),
      (x = function (a) {
        return q(d(a));
      }));
  core.Base64 = function () {
    this.convertByteArrayToBase64 = this.convertUTF8ArrayToBase64 = k;
    this.convertBase64ToByteArray = this.convertBase64ToUTF8Array = d;
    this.convertUTF16ArrayToByteArray = this.convertUTF16ArrayToUTF8Array = b;
    this.convertByteArrayToUTF16Array = this.convertUTF8ArrayToUTF16Array = f;
    this.convertUTF8StringToBase64 = n;
    this.convertBase64ToUTF8String = p;
    this.convertUTF8StringToUTF16Array = r;
    this.convertByteArrayToUTF16String = this.convertUTF8ArrayToUTF16String = q;
    this.convertUTF8StringToUTF16String = l;
    this.convertUTF16StringToByteArray = this.convertUTF16StringToUTF8Array = a;
    this.convertUTF16ArrayToUTF8String = c;
    this.convertUTF16StringToUTF8String = m;
    this.convertUTF16StringToBase64 = y;
    this.convertBase64ToUTF16String = x;
    this.fromBase64 = p;
    this.toBase64 = n;
    this.atob = v;
    this.btoa = w;
    this.utob = m;
    this.btou = l;
    this.encode = y;
    this.encodeURI = function (a) {
      return y(a)
        .replace(/[+\/]/g, function (a) {
          return "+" === a ? "-" : "_";
        })
        .replace(/\\=+$/, "");
    };
    this.decode = function (a) {
      return x(
        a.replace(/[\-_]/g, function (a) {
          return "-" === a ? "+" : "/";
        })
      );
    };
    return this;
  };
  return core.Base64;
}
core.Base64 = makeBase64();
core.CSSUnits = function () {
  var g = this,
    k = { in: 1, cm: 2.54, mm: 25.4, pt: 72, pc: 12, px: 96 };
  this.convert = function (d, b, f) {
    return (d * k[f]) / k[b];
  };
  this.convertMeasure = function (d, b) {
    var f, n;
    d &&
      b &&
      ((f = parseFloat(d)),
      (n = d.replace(f.toString(), "")),
      (f = g.convert(f, n, b)));
    return f;
  };
  this.getUnits = function (d) {
    return d.substr(d.length - 2, d.length);
  };
};
(function () {
  function g() {
    var b, f, n, g, r, k, e, l, a;
    void 0 === d &&
      ((f = (b = runtime.getWindow()) && b.document),
      (k = f.documentElement),
      (e = f.body),
      (d = {
        rangeBCRIgnoresElementBCR: !1,
        unscaledRangeClientRects: !1,
        elementBCRIgnoresBodyScroll: !1,
      }),
      f &&
        ((g = f.createElement("div")),
        (g.style.position = "absolute"),
        (g.style.left = "-99999px"),
        (g.style.transform = "scale(2)"),
        (g.style["-webkit-transform"] = "scale(2)"),
        (r = f.createElement("div")),
        g.appendChild(r),
        e.appendChild(g),
        (b = f.createRange()),
        b.selectNode(r),
        (d.rangeBCRIgnoresElementBCR = 0 === b.getClientRects().length),
        r.appendChild(f.createTextNode("Rect transform test")),
        (f = r.getBoundingClientRect()),
        (n = b.getBoundingClientRect()),
        (d.unscaledRangeClientRects = 2 < Math.abs(f.height - n.height)),
        (g.style.transform = ""),
        (g.style["-webkit-transform"] = ""),
        (f = k.style.overflow),
        (n = e.style.overflow),
        (l = e.style.height),
        (a = e.scrollTop),
        (k.style.overflow = "visible"),
        (e.style.overflow = "visible"),
        (e.style.height = "200%"),
        (e.scrollTop = e.scrollHeight),
        (d.elementBCRIgnoresBodyScroll =
          b.getBoundingClientRect().top !== r.getBoundingClientRect().top),
        (e.scrollTop = a),
        (e.style.height = l),
        (e.style.overflow = n),
        (k.style.overflow = f),
        b.detach(),
        e.removeChild(g),
        (b = Object.keys(d)
          .map(function (a) {
            return a + ":" + String(d[a]);
          })
          .join(", ")),
        runtime.log("Detected browser quirks - " + b)));
    return d;
  }
  function k(b, d, n) {
    for (b = b ? b.firstElementChild : null; b; ) {
      if (b.localName === n && b.namespaceURI === d) return b;
      b = b.nextElementSibling;
    }
    return null;
  }
  var d;
  core.DomUtilsImpl = function () {
    function b(a, c) {
      for (var b = 0, d; a.parentNode !== c; )
        runtime.assert(null !== a.parentNode, "parent is null"),
          (a = a.parentNode);
      for (d = c.firstChild; d !== a; ) (b += 1), (d = d.nextSibling);
      return b;
    }
    function d(a, c) {
      return (
        0 >= a.compareBoundaryPoints(Range.START_TO_START, c) &&
        0 <= a.compareBoundaryPoints(Range.END_TO_END, c)
      );
    }
    function n(a, c) {
      return (
        0 >= a.compareBoundaryPoints(Range.END_TO_START, c) &&
        0 <= a.compareBoundaryPoints(Range.START_TO_END, c)
      );
    }
    function p(a, c) {
      var b = null;
      a.nodeType === Node.TEXT_NODE &&
        (0 === a.length
          ? (a.parentNode.removeChild(a),
            c.nodeType === Node.TEXT_NODE && (b = c))
          : (c.nodeType === Node.TEXT_NODE &&
              (a.appendData(c.data), c.parentNode.removeChild(c)),
            (b = a)));
      return b;
    }
    function r(a) {
      for (var c = a.parentNode; a.firstChild; )
        c.insertBefore(a.firstChild, a);
      c.removeChild(a);
      return c;
    }
    function q(a, c) {
      var b = a.parentNode,
        d = a.firstChild,
        l = c(a),
        e;
      if (l === NodeFilter.FILTER_SKIP) return b;
      for (; d; ) (e = d.nextSibling), q(d, c), (d = e);
      b && l === NodeFilter.FILTER_REJECT && r(a);
      return b;
    }
    function e(a, c) {
      return (
        a === c ||
        Boolean(
          a.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_CONTAINED_BY
        )
      );
    }
    function l(a, c) {
      return g().unscaledRangeClientRects ? a : a / c;
    }
    function a(c, h, b) {
      Object.keys(h).forEach(function (d) {
        var l = d.split(":"),
          e = l[1],
          f = b(l[0]),
          l = h[d],
          n = typeof l;
        "object" === n
          ? Object.keys(l).length &&
            ((d = f
              ? c.getElementsByTagNameNS(f, e)[0] ||
                c.ownerDocument.createElementNS(f, d)
              : c.getElementsByTagName(e)[0] ||
                c.ownerDocument.createElement(d)),
            c.appendChild(d),
            a(d, l, b))
          : f &&
            (runtime.assert(
              "number" === n || "string" === n,
              "attempting to map unsupported type '" + n + "' (key: " + d + ")"
            ),
            c.setAttributeNS(f, d, String(l)));
      });
    }
    var c = null;
    this.splitBoundaries = function (a) {
      var c,
        d = [],
        l,
        e,
        f;
      if (
        a.startContainer.nodeType === Node.TEXT_NODE ||
        a.endContainer.nodeType === Node.TEXT_NODE
      ) {
        l = a.endContainer;
        e =
          a.endContainer.nodeType !== Node.TEXT_NODE
            ? a.endOffset === a.endContainer.childNodes.length
            : !1;
        f = a.endOffset;
        c = a.endContainer;
        if (f < c.childNodes.length)
          for (c = c.childNodes.item(f), f = 0; c.firstChild; )
            c = c.firstChild;
        else
          for (; c.lastChild; )
            (c = c.lastChild),
              (f =
                c.nodeType === Node.TEXT_NODE
                  ? c.textContent.length
                  : c.childNodes.length);
        c === l && (l = null);
        a.setEnd(c, f);
        f = a.endContainer;
        0 !== a.endOffset &&
          f.nodeType === Node.TEXT_NODE &&
          ((c = f),
          a.endOffset !== c.length &&
            (d.push(c.splitText(a.endOffset)), d.push(c)));
        f = a.startContainer;
        0 !== a.startOffset &&
          f.nodeType === Node.TEXT_NODE &&
          ((c = f),
          a.startOffset !== c.length &&
            ((f = c.splitText(a.startOffset)),
            d.push(c),
            d.push(f),
            a.setStart(f, 0)));
        if (null !== l) {
          for (f = a.endContainer; f.parentNode && f.parentNode !== l; )
            f = f.parentNode;
          e = e ? l.childNodes.length : b(f, l);
          a.setEnd(l, e);
        }
      }
      return d;
    };
    this.containsRange = d;
    this.rangesIntersect = n;
    this.rangeIntersection = function (a, c) {
      var b;
      n(a, c) &&
        ((b = a.cloneRange()),
        -1 === a.compareBoundaryPoints(Range.START_TO_START, c) &&
          b.setStart(c.startContainer, c.startOffset),
        1 === a.compareBoundaryPoints(Range.END_TO_END, c) &&
          b.setEnd(c.endContainer, c.endOffset));
      return b;
    };
    this.getNodesInRange = function (a, c, b) {
      var d = [],
        l = a.commonAncestorContainer,
        l = l.nodeType === Node.TEXT_NODE ? l.parentNode : l;
      b = a.startContainer.ownerDocument.createTreeWalker(l, b, c, !1);
      var e, f;
      a.endContainer.childNodes[a.endOffset - 1]
        ? ((e = a.endContainer.childNodes[a.endOffset - 1]),
          (f =
            Node.DOCUMENT_POSITION_PRECEDING |
            Node.DOCUMENT_POSITION_CONTAINED_BY))
        : ((e = a.endContainer), (f = Node.DOCUMENT_POSITION_PRECEDING));
      if (a.startContainer.childNodes[a.startOffset])
        (a = a.startContainer.childNodes[a.startOffset]), (b.currentNode = a);
      else {
        var n = a.startContainer;
        a.startOffset ===
        (n.nodeType === Node.TEXT_NODE ? n.length : n.childNodes.length)
          ? ((a = a.startContainer),
            (b.currentNode = a),
            b.lastChild(),
            (a = b.nextNode()))
          : ((a = a.startContainer), (b.currentNode = a));
      }
      if (a) {
        a = b.currentNode;
        if (a !== l)
          for (a = a.parentNode; a && a !== l; )
            c(a) === NodeFilter.FILTER_REJECT && (b.currentNode = a),
              (a = a.parentNode);
        a = b.currentNode;
        switch (c(a)) {
          case NodeFilter.FILTER_REJECT:
            for (a = b.nextSibling(); !a && b.parentNode(); )
              a = b.nextSibling();
            break;
          case NodeFilter.FILTER_SKIP:
            a = b.nextNode();
        }
        for (; a; ) {
          c = e.compareDocumentPosition(a);
          if (0 !== c && 0 === (c & f)) break;
          d.push(a);
          a = b.nextNode();
        }
      }
      return d;
    };
    this.normalizeTextNodes = function (a) {
      a && a.nextSibling && (a = p(a, a.nextSibling));
      a && a.previousSibling && p(a.previousSibling, a);
    };
    this.rangeContainsNode = function (a, c) {
      var b = c.ownerDocument.createRange(),
        l = c.ownerDocument.createRange(),
        e;
      b.setStart(a.startContainer, a.startOffset);
      b.setEnd(a.endContainer, a.endOffset);
      l.selectNodeContents(c);
      e = d(b, l);
      b.detach();
      l.detach();
      return e;
    };
    this.mergeIntoParent = r;
    this.removeUnwantedNodes = q;
    this.removeAllChildNodes = function (a) {
      for (; a.firstChild; ) a.removeChild(a.firstChild);
    };
    this.getElementsByTagNameNS = function (a, c, b) {
      var d = [];
      a = a.getElementsByTagNameNS(c, b);
      d.length = b = a.length;
      for (c = 0; c < b; c += 1) d[c] = a.item(c);
      return d;
    };
    this.getElementsByTagName = function (a, c) {
      var b = [],
        d,
        l,
        e;
      d = a.getElementsByTagName(c);
      b.length = e = d.length;
      for (l = 0; l < e; l += 1) b[l] = d.item(l);
      return b;
    };
    this.containsNode = function (a, c) {
      return a === c || a.contains(c);
    };
    this.comparePoints = function (a, c, d, l) {
      if (a === d) return l - c;
      var e = a.compareDocumentPosition(d);
      2 === e
        ? (e = -1)
        : 4 === e
        ? (e = 1)
        : 10 === e
        ? ((c = b(a, d)), (e = c < l ? 1 : -1))
        : ((l = b(d, a)), (e = l < c ? -1 : 1));
      return e;
    };
    this.adaptRangeDifferenceToZoomLevel = l;
    this.translateRect = function (a, c, b) {
      return {
        top: l(a.top - c.top, b),
        left: l(a.left - c.left, b),
        bottom: l(a.bottom - c.top, b),
        right: l(a.right - c.left, b),
        width: l(a.width, b),
        height: l(a.height, b),
      };
    };
    this.getBoundingClientRect = function (a) {
      var b = a.ownerDocument,
        d = g(),
        l = b.body;
      if (
        (!1 === d.unscaledRangeClientRects || d.rangeBCRIgnoresElementBCR) &&
        a.nodeType === Node.ELEMENT_NODE
      )
        return (
          (a = a.getBoundingClientRect()),
          d.elementBCRIgnoresBodyScroll
            ? {
                left: a.left + l.scrollLeft,
                right: a.right + l.scrollLeft,
                top: a.top + l.scrollTop,
                bottom: a.bottom + l.scrollTop,
                width: a.width,
                height: a.height,
              }
            : a
        );
      var e;
      c ? (e = c) : (c = e = b.createRange());
      d = e;
      d.selectNode(a);
      return d.getBoundingClientRect();
    };
    this.mapKeyValObjOntoNode = function (a, c, b) {
      Object.keys(c).forEach(function (d) {
        var l = d.split(":"),
          e = l[1],
          l = b(l[0]),
          f = c[d];
        l
          ? ((e = a.getElementsByTagNameNS(l, e)[0]),
            e ||
              ((e = a.ownerDocument.createElementNS(l, d)), a.appendChild(e)),
            (e.textContent = f))
          : runtime.log("Key ignored: " + d);
      });
    };
    this.removeKeyElementsFromNode = function (a, c, b) {
      c.forEach(function (c) {
        var d = c.split(":"),
          h = d[1];
        (d = b(d[0]))
          ? (h = a.getElementsByTagNameNS(d, h)[0])
            ? h.parentNode.removeChild(h)
            : runtime.log("Element for " + c + " not found.")
          : runtime.log("Property Name ignored: " + c);
      });
    };
    this.getKeyValRepresentationOfNode = function (a, c) {
      for (var b = {}, d = a.firstElementChild, l; d; ) {
        if ((l = c(d.namespaceURI))) b[l + ":" + d.localName] = d.textContent;
        d = d.nextElementSibling;
      }
      return b;
    };
    this.mapObjOntoNode = a;
    this.cloneEvent = function (a) {
      var c = Object.create(null);
      Object.keys(a.constructor.prototype).forEach(function (b) {
        c[b] = a[b];
      });
      c.prototype = a.constructor.prototype;
      return c;
    };
    this.getDirectChild = k;
    (function (a) {
      var c, b;
      b = runtime.getWindow();
      null !== b &&
        ((c = b.navigator.appVersion.toLowerCase()),
        (b =
          -1 === c.indexOf("chrome") &&
          (-1 !== c.indexOf("applewebkit") || -1 !== c.indexOf("safari"))),
        (c = -1 !== c.indexOf("msie") || -1 !== c.indexOf("trident")),
        b || c) &&
        (a.containsNode = e);
    })(this);
  };
  core.DomUtils = new core.DomUtilsImpl();
})();
core.Cursor = function (g, k) {
  function d(a) {
    a.parentNode &&
      (r.push(a.previousSibling),
      r.push(a.nextSibling),
      a.parentNode.removeChild(a));
  }
  function b(a, c, b) {
    if (c.nodeType === Node.TEXT_NODE) {
      runtime.assert(Boolean(c), "putCursorIntoTextNode: invalid container");
      var d = c.parentNode;
      runtime.assert(
        Boolean(d),
        "putCursorIntoTextNode: container without parent"
      );
      runtime.assert(
        0 <= b && b <= c.length,
        "putCursorIntoTextNode: offset is out of bounds"
      );
      0 === b
        ? d.insertBefore(a, c)
        : (b !== c.length && c.splitText(b), d.insertBefore(a, c.nextSibling));
    } else
      c.nodeType === Node.ELEMENT_NODE &&
        c.insertBefore(a, c.childNodes.item(b));
    r.push(a.previousSibling);
    r.push(a.nextSibling);
  }
  var f = g.createElementNS("urn:webodf:names:cursor", "cursor"),
    n = g.createElementNS("urn:webodf:names:cursor", "anchor"),
    p,
    r = [],
    q = g.createRange(),
    e,
    l = core.DomUtils;
  this.getNode = function () {
    return f;
  };
  this.getAnchorNode = function () {
    return n.parentNode ? n : f;
  };
  this.getSelectedRange = function () {
    e
      ? (q.setStartBefore(f), q.collapse(!0))
      : (q.setStartAfter(p ? n : f), q.setEndBefore(p ? f : n));
    return q;
  };
  this.setSelectedRange = function (a, c) {
    q && q !== a && q.detach();
    q = a;
    p = !1 !== c;
    (e = a.collapsed)
      ? (d(n), d(f), b(f, a.startContainer, a.startOffset))
      : (d(n),
        d(f),
        b(p ? f : n, a.endContainer, a.endOffset),
        b(p ? n : f, a.startContainer, a.startOffset));
    r.forEach(l.normalizeTextNodes);
    r.length = 0;
  };
  this.hasForwardSelection = function () {
    return p;
  };
  this.remove = function () {
    d(f);
    r.forEach(l.normalizeTextNodes);
    r.length = 0;
  };
  f.setAttributeNS("urn:webodf:names:cursor", "memberId", k);
  n.setAttributeNS("urn:webodf:names:cursor", "memberId", k);
};
core.Destroyable = function () {};
core.Destroyable.prototype.destroy = function (g) {};
core.EventSource = function () {};
core.EventSource.prototype.subscribe = function (g, k) {};
core.EventSource.prototype.unsubscribe = function (g, k) {};
core.EventNotifier = function (g) {
  function k(b) {
    runtime.assert(
      !d.hasOwnProperty(b),
      'Duplicated event ids: "' + b + '" registered more than once.'
    );
    d[b] = [];
  }
  var d = {};
  this.emit = function (b, f) {
    var n, g;
    runtime.assert(d.hasOwnProperty(b), 'unknown event fired "' + b + '"');
    g = d[b];
    for (n = 0; n < g.length; n += 1) g[n](f);
  };
  this.subscribe = function (b, f) {
    runtime.assert(
      d.hasOwnProperty(b),
      'tried to subscribe to unknown event "' + b + '"'
    );
    d[b].push(f);
  };
  this.unsubscribe = function (b, f) {
    var n;
    runtime.assert(
      d.hasOwnProperty(b),
      'tried to unsubscribe from unknown event "' + b + '"'
    );
    n = d[b].indexOf(f);
    runtime.assert(
      -1 !== n,
      'tried to unsubscribe unknown callback from event "' + b + '"'
    );
    -1 !== n && d[b].splice(n, 1);
  };
  this.register = k;
  g && g.forEach(k);
};
core.ScheduledTask = function (g, k, d) {
  function b() {
    p && (d(n), (p = !1));
  }
  function f() {
    b();
    g.apply(void 0, r);
    r = null;
  }
  var n,
    p = !1,
    r = [],
    q = !1;
  this.trigger = function () {
    runtime.assert(!1 === q, "Can't trigger destroyed ScheduledTask instance");
    r = Array.prototype.slice.call(arguments);
    p || ((p = !0), (n = k(f)));
  };
  this.triggerImmediate = function () {
    runtime.assert(!1 === q, "Can't trigger destroyed ScheduledTask instance");
    r = Array.prototype.slice.call(arguments);
    f();
  };
  this.processRequests = function () {
    p && f();
  };
  this.cancel = b;
  this.restart = function () {
    runtime.assert(!1 === q, "Can't trigger destroyed ScheduledTask instance");
    b();
    p = !0;
    n = k(f);
  };
  this.destroy = function (d) {
    b();
    q = !0;
    d();
  };
};
(function () {
  var g;
  core.Task = {};
  core.Task.SUPPRESS_MANUAL_PROCESSING = !1;
  core.Task.processTasks = function () {
    core.Task.SUPPRESS_MANUAL_PROCESSING || g.performRedraw();
  };
  core.Task.createRedrawTask = function (k) {
    return new core.ScheduledTask(k, g.requestRedrawTask, g.cancelRedrawTask);
  };
  core.Task.createTimeoutTask = function (g, d) {
    return new core.ScheduledTask(
      g,
      function (b) {
        return runtime.setTimeout(b, d);
      },
      runtime.clearTimeout
    );
  };
  g = new (function () {
    var g = {};
    this.requestRedrawTask = function (d) {
      var b = runtime.requestAnimationFrame(function () {
        d();
        delete g[b];
      });
      g[b] = d;
      return b;
    };
    this.performRedraw = function () {
      Object.keys(g).forEach(function (d) {
        g[d]();
        runtime.cancelAnimationFrame(parseInt(d, 10));
      });
      g = {};
    };
    this.cancelRedrawTask = function (d) {
      runtime.cancelAnimationFrame(d);
      delete g[d];
    };
  })();
})();
core.EventSubscriptions = function () {
  function g(b, f, n) {
    b.subscribe(f, n);
    d.push({ eventSource: b, eventid: f, callback: n });
  }
  function k() {
    var n = [];
    d.forEach(function (b) {
      b.eventSource.unsubscribe(b.eventid, b.callback);
    });
    d.length = 0;
    Object.keys(f).forEach(function (b) {
      f[b].forEach(function (b) {
        n.push(b.task.destroy);
      });
      delete f[b];
    });
    core.Async.destroyAll(n, function () {});
    b = new core.EventNotifier();
  }
  var d = [],
    b = new core.EventNotifier(),
    f = {},
    n = 0;
  this.addSubscription = g;
  this.addFrameSubscription = function (d, k, q) {
    var e, l, a, c;
    f.hasOwnProperty(k) || (f[k] = []);
    a = f[k];
    for (c = 0; c < a.length; c += 1)
      if (a[c].eventSource === d) {
        e = a[c];
        break;
      }
    e ||
      ((l = "s" + n),
      (n += 1),
      b.register(l),
      (e = {
        frameEventId: l,
        eventSource: d,
        task: core.Task.createRedrawTask(function () {
          b.emit(l, void 0);
        }),
      }),
      a.push(e),
      g(d, k, e.task.trigger));
    b.subscribe(e.frameEventId, q);
  };
  this.unsubscribeAll = k;
  this.destroy = function (b) {
    k();
    b();
  };
};
core.LazyProperty = function (g) {
  var k,
    d = !1;
  this.value = function () {
    d || ((k = g()), (d = !0));
    return k;
  };
  this.reset = function () {
    d = !1;
  };
};
core.LoopWatchDog = function (g, k) {
  var d = Date.now(),
    b = 0;
  this.check = function () {
    var f;
    if (g && ((f = Date.now()), f - d > g))
      throw (runtime.log("alert", "watchdog timeout"), "timeout!");
    if (0 < k && ((b += 1), b > k))
      throw (runtime.log("alert", "watchdog loop overflow"), "loop overflow");
  };
};
core.NodeFilterChain = function (g) {
  var k = NodeFilter.FILTER_REJECT,
    d = NodeFilter.FILTER_ACCEPT;
  this.acceptNode = function (b) {
    var f;
    for (f = 0; f < g.length; f += 1) if (g[f].acceptNode(b) === k) return k;
    return d;
  };
};
core.PositionIterator = function (g, k, d, b) {
  function f() {
    this.acceptNode = function (a) {
      return !a || (a.nodeType === m && 0 === a.length) ? x : y;
    };
  }
  function n(a) {
    this.acceptNode = function (c) {
      return !c || (c.nodeType === m && 0 === c.length) ? x : a.acceptNode(c);
    };
  }
  function p() {
    var c = l.currentNode,
      b = c.nodeType;
    a = b === m ? c.length - 1 : b === h ? 1 : 0;
  }
  function r() {
    if (null === l.previousSibling()) {
      if (!l.parentNode() || l.currentNode === g) return l.firstChild(), !1;
      a = 0;
    } else p();
    return !0;
  }
  function q() {
    var b = l.currentNode,
      d;
    d = c(b);
    if (b !== g)
      for (b = b.parentNode; b && b !== g; )
        c(b) === x && ((l.currentNode = b), (d = x)), (b = b.parentNode);
    d === x
      ? ((a = l.currentNode.nodeType === m ? b.length : 1),
        (b = e.nextPosition()))
      : (b = d === y ? !0 : e.nextPosition());
    b &&
      runtime.assert(
        c(l.currentNode) === y,
        "moveToAcceptedNode did not result in walker being on an accepted node"
      );
    return b;
  }
  var e = this,
    l,
    a,
    c,
    m = Node.TEXT_NODE,
    h = Node.ELEMENT_NODE,
    y = NodeFilter.FILTER_ACCEPT,
    x = NodeFilter.FILTER_REJECT;
  this.nextPosition = function () {
    var c = l.currentNode,
      b = c.nodeType;
    if (c === g) return !1;
    if (0 === a && b === h) null === l.firstChild() && (a = 1);
    else if (b === m && a + 1 < c.length) a += 1;
    else if (null !== l.nextSibling()) a = 0;
    else if (l.parentNode()) a = 1;
    else return !1;
    return !0;
  };
  this.previousPosition = function () {
    var c = !0,
      b = l.currentNode;
    0 === a
      ? (c = r())
      : b.nodeType === m
      ? --a
      : null !== l.lastChild()
      ? p()
      : b === g
      ? (c = !1)
      : (a = 0);
    return c;
  };
  this.previousNode = r;
  this.container = function () {
    var c = l.currentNode,
      b = c.nodeType;
    0 === a && b !== m && (c = c.parentNode);
    return c;
  };
  this.rightNode = function () {
    var b = l.currentNode,
      d = b.nodeType;
    if (d === m && a === b.length)
      for (b = b.nextSibling; b && c(b) !== y; ) b = b.nextSibling;
    else d === h && 1 === a && (b = null);
    return b;
  };
  this.leftNode = function () {
    var b = l.currentNode;
    if (0 === a)
      for (b = b.previousSibling; b && c(b) !== y; ) b = b.previousSibling;
    else if (b.nodeType === h)
      for (b = b.lastChild; b && c(b) !== y; ) b = b.previousSibling;
    return b;
  };
  this.getCurrentNode = function () {
    return l.currentNode;
  };
  this.unfilteredDomOffset = function () {
    if (l.currentNode.nodeType === m) return a;
    for (
      var c = 0,
        b = l.currentNode,
        b = 1 === a ? b.lastChild : b.previousSibling;
      b;

    )
      (c += 1), (b = b.previousSibling);
    return c;
  };
  this.getPreviousSibling = function () {
    var a = l.currentNode,
      c = l.previousSibling();
    l.currentNode = a;
    return c;
  };
  this.getNextSibling = function () {
    var a = l.currentNode,
      c = l.nextSibling();
    l.currentNode = a;
    return c;
  };
  this.setPositionBeforeElement = function (c) {
    runtime.assert(
      Boolean(c),
      "setPositionBeforeElement called without element"
    );
    l.currentNode = c;
    a = 0;
    return q();
  };
  this.setUnfilteredPosition = function (c, b) {
    runtime.assert(
      Boolean(c),
      "PositionIterator.setUnfilteredPosition called without container"
    );
    l.currentNode = c;
    c.nodeType === m
      ? ((a = b),
        runtime.assert(
          b <= c.length,
          "Error in setPosition: " + b + " > " + c.length
        ),
        runtime.assert(0 <= b, "Error in setPosition: " + b + " < 0"),
        b === c.length &&
          (l.nextSibling()
            ? (a = 0)
            : l.parentNode()
            ? (a = 1)
            : runtime.assert(
                !1,
                "Error in setUnfilteredPosition: position not valid."
              )))
      : b < c.childNodes.length
      ? ((l.currentNode = c.childNodes.item(b)), (a = 0))
      : (a = 1);
    return q();
  };
  this.moveToEnd = function () {
    l.currentNode = g;
    a = 1;
  };
  this.moveToEndOfNode = function (c) {
    c.nodeType === m
      ? e.setUnfilteredPosition(c, c.length)
      : ((l.currentNode = c), (a = 1));
  };
  this.isBeforeNode = function () {
    return 0 === a;
  };
  this.getNodeFilter = function () {
    return c;
  };
  c = (d ? new n(d) : new f()).acceptNode;
  c.acceptNode = c;
  k = k || NodeFilter.SHOW_ALL;
  runtime.assert(
    g.nodeType !== Node.TEXT_NODE,
    "Internet Explorer doesn't allow tree walker roots to be text nodes"
  );
  l = g.ownerDocument.createTreeWalker(g, k, c, b);
  a = 0;
  null === l.firstChild() && (a = 1);
};
core.PositionFilter = function () {};
core.PositionFilter.FilterResult = {
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 2,
  FILTER_SKIP: 3,
};
core.PositionFilter.prototype.acceptPosition = function (g) {};
core.PositionFilterChain = function () {
  var g = [],
    k = core.PositionFilter.FilterResult.FILTER_ACCEPT,
    d = core.PositionFilter.FilterResult.FILTER_REJECT;
  this.acceptPosition = function (b) {
    var f;
    for (f = 0; f < g.length; f += 1)
      if (g[f].acceptPosition(b) === d) return d;
    return k;
  };
  this.addFilter = function (b) {
    g.push(b);
  };
};
core.StepDirection = { PREVIOUS: 1, NEXT: 2 };
core.StepIterator = function (g, k) {
  function d() {
    a = null;
    m = c = void 0;
  }
  function b() {
    void 0 === m && (m = g.acceptPosition(k) === e);
    return m;
  }
  function f(a, c) {
    d();
    return k.setUnfilteredPosition(a, c);
  }
  function n() {
    a || (a = k.container());
    return a;
  }
  function p() {
    void 0 === c && (c = k.unfilteredDomOffset());
    return c;
  }
  function r() {
    for (d(); k.nextPosition(); ) if ((d(), b())) return !0;
    return !1;
  }
  function q() {
    for (d(); k.previousPosition(); ) if ((d(), b())) return !0;
    return !1;
  }
  var e = core.PositionFilter.FilterResult.FILTER_ACCEPT,
    l = core.StepDirection.NEXT,
    a,
    c,
    m;
  this.isStep = b;
  this.setPosition = f;
  this.container = n;
  this.offset = p;
  this.nextStep = r;
  this.previousStep = q;
  this.advanceStep = function (a) {
    return a === l ? r() : q();
  };
  this.roundToClosestStep = function () {
    var a,
      c,
      d = b();
    d || ((a = n()), (c = p()), (d = q()), d || (f(a, c), (d = r())));
    return d;
  };
  this.roundToPreviousStep = function () {
    var a = b();
    a || (a = q());
    return a;
  };
  this.roundToNextStep = function () {
    var a = b();
    a || (a = r());
    return a;
  };
  this.leftNode = function () {
    return k.leftNode();
  };
  this.snapshot = function () {
    return new core.StepIterator.StepSnapshot(n(), p());
  };
  this.restore = function (a) {
    f(a.container, a.offset);
  };
};
core.StepIterator.StepSnapshot = function (g, k) {
  this.container = g;
  this.offset = k;
};
core.Utils = function () {
  function g(k, d) {
    if (d && Array.isArray(d)) {
      k = k || [];
      if (!Array.isArray(k)) throw "Destination is not an array.";
      k = k.concat(
        d.map(function (b) {
          return g(null, b);
        })
      );
    } else if (d && "object" === typeof d) {
      k = k || {};
      if ("object" !== typeof k) throw "Destination is not an object.";
      Object.keys(d).forEach(function (b) {
        k[b] = g(k[b], d[b]);
      });
    } else k = d;
    return k;
  }
  this.hashString = function (g) {
    var d = 0,
      b,
      f;
    b = 0;
    for (f = g.length; b < f; b += 1)
      (d = (d << 5) - d + g.charCodeAt(b)), (d |= 0);
    return d;
  };
  this.mergeObjects = function (k, d) {
    Object.keys(d).forEach(function (b) {
      k[b] = g(k[b], d[b]);
    });
    return k;
  };
};
core.Zip = function (g, k) {
  function d(b, d) {
    var a = r.file(b);
    a ? d(null, a.asUint8Array()) : d(b + " not found.", null);
  }
  function b(b, l) {
    d(b, function (a, c) {
      if (a || null === c) return l(a, null);
      var b = runtime.byteArrayToString(c, "utf8");
      l(null, b);
    });
  }
  function f(b, d) {
    try {
      b(r.generate({ type: "uint8array", compression: "STORE" }));
    } catch (a) {
      d(a.message);
    }
  }
  function n(b, d) {
    f(function (a) {
      runtime.writeFile(b, a, d);
    }, d);
  }
  var p = this,
    r,
    q = new core.Base64();
  this.load = d;
  this.save = function (b, d, a, c) {
    r.file(b, d, { date: c, compression: a ? "DEFLATE" : "STORE" });
  };
  this.remove = function (b) {
    var d = null !== r.file(b);
    r.remove(b);
    return d;
  };
  this.write = function (b) {
    n(g, b);
  };
  this.writeAs = n;
  this.createByteArray = f;
  this.loadContentXmlAsFragments = function (d, l) {
    b(d, function (a, c) {
      if (a) return l.rootElementReady(a);
      l.rootElementReady(null, c, !0);
    });
  };
  this.loadAsString = b;
  this.loadAsDOM = function (d, l) {
    b(d, function (a, c) {
      if (a || null === c) l(a, null);
      else {
        var b = new DOMParser().parseFromString(c, "text/xml");
        l(null, b);
      }
    });
  };
  this.loadAsDataURL = function (b, l, a) {
    d(b, function (c, b) {
      if (c || !b) return a(c, null);
      var d = 0,
        e;
      l ||
        (l =
          80 === b[1] && 78 === b[2] && 71 === b[3]
            ? "image/png"
            : 255 === b[0] && 216 === b[1] && 255 === b[2]
            ? "image/jpeg"
            : 71 === b[0] && 73 === b[1] && 70 === b[2]
            ? "image/gif"
            : "");
      for (e = "data:" + l + ";base64,"; d < b.length; )
        (e += q.convertUTF8ArrayToBase64(
          b.subarray(d, Math.min(d + 45e3, b.length))
        )),
          (d += 45e3);
      a(null, e);
    });
  };
  this.getEntries = function () {
    return Object.keys(r.files).map(function (b) {
      return { filename: b, date: r.files[b].date };
    });
  };
  r = new externs.JSZip();
  null !== k &&
    runtime.readFile(g, "binary", function (b, d) {
      "string" === typeof d &&
        (b = "file was read as a string. Should be Uint8Array.");
      if (b || !d || 0 === d.length)
        k("File '" + g + "' cannot be read. Err: " + (b || "[none]"), p);
      else
        try {
          r.load(d, { checkCRC32: !1 }), k(null, p);
        } catch (a) {
          k(a.message, p);
        }
    });
};
core.SimpleClientRect = null;
gui.CommonConstraints = {
  EDIT: {
    ANNOTATIONS: { ONLY_DELETE_OWN: "onlyDeleteOwn" },
    REVIEW_MODE: "reviewMode",
  },
};
gui.SessionConstraints = function () {
  function g(b) {
    k.hasOwnProperty(b) || ((k[b] = !1), d.register(b));
  }
  var k = {},
    d = new core.EventNotifier();
  this.registerConstraint = g;
  this.subscribe = function (b, f) {
    g(b);
    d.subscribe(b, f);
  };
  this.unsubscribe = function (b, f) {
    d.unsubscribe(b, f);
  };
  this.setState = function (b, f) {
    runtime.assert(!0 === k.hasOwnProperty(b), "No such constraint");
    k[b] !== f && ((k[b] = f), d.emit(b, f));
  };
  this.getState = function (b) {
    runtime.assert(!0 === k.hasOwnProperty(b), "No such constraint");
    return k[b];
  };
};
gui.BlacklistNamespaceNodeFilter = function (g) {
  var k = {},
    d = NodeFilter.FILTER_REJECT,
    b = NodeFilter.FILTER_ACCEPT;
  this.acceptNode = function (f) {
    return !f || k.hasOwnProperty(f.namespaceURI) ? d : b;
  };
  (function () {
    g.forEach(function (b) {
      k[b] = !0;
    });
  })();
};
odf.Namespaces = {
  namespaceMap: {
    config: "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
    db: "urn:oasis:names:tc:opendocument:xmlns:database:1.0",
    dc: "http://purl.org/dc/elements/1.1/",
    dr3d: "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
    draw: "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
    chart: "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
    fo: "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
    form: "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
    math: "http://www.w3.org/1998/Math/MathML",
    meta: "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
    number: "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
    office: "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    presentation: "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
    style: "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
    svg: "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
    table: "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    text: "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
    xforms: "http://www.w3.org/2002/xforms",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
  },
  prefixMap: {},
  configns: "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
  dbns: "urn:oasis:names:tc:opendocument:xmlns:database:1.0",
  dcns: "http://purl.org/dc/elements/1.1/",
  dr3dns: "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
  drawns: "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
  chartns: "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
  fons: "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
  formns: "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
  mathns: "http://www.w3.org/1998/Math/MathML",
  metans: "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
  numberns: "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
  officens: "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
  presentationns: "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
  stylens: "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
  svgns: "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
  tablens: "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
  textns: "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
  xformsns: "http://www.w3.org/2002/xforms",
  xlinkns: "http://www.w3.org/1999/xlink",
  xmlns: "http://www.w3.org/XML/1998/namespace",
};
(function () {
  var g = odf.Namespaces.namespaceMap,
    k = odf.Namespaces.prefixMap,
    d;
  for (d in g) g.hasOwnProperty(d) && (k[g[d]] = d);
})();
odf.Namespaces.forEachPrefix = function (g) {
  var k = odf.Namespaces.namespaceMap,
    d;
  for (d in k) k.hasOwnProperty(d) && g(d, k[d]);
};
odf.Namespaces.lookupNamespaceURI = function (g) {
  var k = null;
  odf.Namespaces.namespaceMap.hasOwnProperty(g) &&
    (k = odf.Namespaces.namespaceMap[g]);
  return k;
};
odf.Namespaces.lookupPrefix = function (g) {
  var k = odf.Namespaces.prefixMap;
  return k.hasOwnProperty(g) ? k[g] : null;
};
odf.Namespaces.lookupNamespaceURI.lookupNamespaceURI =
  odf.Namespaces.lookupNamespaceURI;
(function () {
  odf.OdfSchemaImpl = function () {
    var g = [
        ["config:config-item", "uncategorized"],
        ["form:item", "object"],
        ["form:option", "uncategorized"],
        ["math:math", "field"],
        ["meta:user-defined", "uncategorized"],
        ["number:currency-symbol", "uncategorized"],
        ["number:embedded-text", "uncategorized"],
        ["number:text", "uncategorized"],
        ["presentation:date-time-decl", "uncategorized"],
        ["presentation:footer-decl", "uncategorized"],
        ["presentation:header-decl", "uncategorized"],
        ["svg:desc", "text"],
        ["svg:title", "text"],
        ["table:desc", "uncategorized"],
        ["table:title", "uncategorized"],
        ["text:a", "text"],
        ["text:author-initials", "field"],
        ["text:author-name", "field"],
        ["text:bibliography-mark", "field"],
        ["text:bookmark-ref", "field"],
        ["text:chapter", "field"],
        ["text:character-count", "field"],
        ["text:conditional-text", "field"],
        ["text:creation-date", "field"],
        ["text:creation-time", "field"],
        ["text:creator", "field"],
        ["text:database-display", "field"],
        ["text:database-name", "field"],
        ["text:database-row-number", "field"],
        ["text:date", "field"],
        ["text:dde-connection", "field"],
        ["text:description", "field"],
        ["text:editing-cycles", "field"],
        ["text:editing-duration", "field"],
        ["text:execute-macro", "uncategorized"],
        ["text:expression", "uncategorized"],
        ["text:file-name", "field"],
        ["text:h", "text"],
        ["text:hidden-paragraph", "text"],
        ["text:hidden-text", "text"],
        ["text:image-count", "field"],
        ["text:index-entry-span", "uncategorized"],
        ["text:index-title-template", "uncategorized"],
        ["text:initial-creator", "field"],
        ["text:keywords", "field"],
        ["text:linenumbering-separator", "style"],
        ["text:measure", "uncategorized"],
        ["text:meta", "uncategorized"],
        ["text:meta-field", "uncategorized"],
        ["text:modification-date", "field"],
        ["text:modification-time", "field"],
        ["text:note-citation", "field"],
        ["text:note-continuation-notice-backward", "style"],
        ["text:note-continuation-notice-forward", "style"],
        ["text:note-ref", "field"],
        ["text:object-count", "field"],
        ["text:p", "text"],
        ["text:page-continuation", "uncategorized"],
        ["text:page-count", "field"],
        ["text:page-number", "field"],
        ["text:page-variable-get", "field"],
        ["text:page-variable-set", "field"],
        ["text:paragraph-count", "field"],
        ["text:placeholder", "field"],
        ["text:print-date", "field"],
        ["text:print-time", "field"],
        ["text:printed-by", "field"],
        ["text:reference-ref", "field"],
        ["text:ruby-base", "text"],
        ["text:ruby-text", "text"],
        ["text:script", "text"],
        ["text:sender-city", "field"],
        ["text:sender-company", "field"],
        ["text:sender-country", "field"],
        ["text:sender-email", "field"],
        ["text:sender-fax", "field"],
        ["text:sender-firstname", "field"],
        ["text:sender-initials", "field"],
        ["text:sender-lastname", "field"],
        ["text:sender-phone-private", "field"],
        ["text:sender-phone-work", "field"],
        ["text:sender-position", "field"],
        ["text:sender-postal-code", "field"],
        ["text:sender-state-or-province", "field"],
        ["text:sender-street", "field"],
        ["text:sender-title", "field"],
        ["text:sequence", "uncategorized"],
        ["text:sequence-ref", "uncategorized"],
        ["text:sheet-name", "uncategorized"],
        ["text:span", "text"],
        ["text:subject", "field"],
        ["text:table-count", "field"],
        ["text:table-formula", "deprecated"],
        ["text:template-name", "uncategorized"],
        ["text:text-input", "field"],
        ["text:time", "field"],
        ["text:title", "field"],
        ["text:user-defined", "field"],
        ["text:user-field-get", "field"],
        ["text:user-field-input", "field"],
        ["text:variable-get", "field"],
        ["text:variable-input", "field"],
        ["text:variable-set", "field"],
        ["text:word-count", "field"],
        ["xforms:model", "uncategorized"],
      ],
      k = {};
    this.isTextContainer = function (d, b) {
      return "text" === k[d + ":" + b];
    };
    this.isField = function (d, b) {
      return "field" === k[d + ":" + b];
    };
    this.getFields = function () {
      return g
        .filter(function (d) {
          return "field" === d[1];
        })
        .map(function (d) {
          return d[0];
        });
    };
    (function () {
      g.forEach(function (d) {
        var b = d[1],
          f = d[0].split(":");
        d = f[0];
        var f = f[1],
          n = odf.Namespaces.lookupNamespaceURI(d);
        n
          ? (k[n + ":" + f] = b)
          : runtime.log("DEBUG: OdfSchema - unknown prefix '" + d + "'");
      });
    })();
  };
  odf.OdfSchema = new odf.OdfSchemaImpl();
})();
odf.OdfUtilsImpl = function () {
  function g(a) {
    return "image" === (a && a.localName) && a.namespaceURI === R;
  }
  function k(a) {
    return (
      null !== a &&
      a.nodeType === Node.ELEMENT_NODE &&
      "frame" === a.localName &&
      a.namespaceURI === R &&
      "as-char" === a.getAttributeNS(J, "anchor-type")
    );
  }
  function d(a) {
    var c;
    (c =
      "annotation" === (a && a.localName) &&
      a.namespaceURI === odf.Namespaces.officens) ||
      (c = "div" === (a && a.localName) && "annotationWrapper" === a.className);
    return c;
  }
  function b(a) {
    return "a" === (a && a.localName) && a.namespaceURI === J;
  }
  function f(a) {
    var c = a && a.localName;
    return ("p" === c || "h" === c) && a.namespaceURI === J;
  }
  function n(a, c) {
    for (
      a &&
      void 0 !== c &&
      !f(a) &&
      a.childNodes.item(c) &&
      (a = a.childNodes.item(c));
      a && !f(a);

    )
      a = a.parentNode;
    return a;
  }
  function p(a, c) {
    for (; a && a !== c; ) {
      if (
        a.namespaceURI === odf.Namespaces.officens &&
        "annotation" === a.localName
      )
        return a;
      a = a.parentNode;
    }
    return null;
  }
  function r(a) {
    return /^[ \t\r\n]+$/.test(a);
  }
  function q(a) {
    if (null === a || a.nodeType !== Node.ELEMENT_NODE) return !1;
    var c = a.localName;
    return (
      fa.isTextContainer(a.namespaceURI, c) ||
      ("span" === c && "webodf-annotationHighlight" === a.className)
    );
  }
  function e(a) {
    return null === a || a.nodeType !== Node.ELEMENT_NODE
      ? !1
      : fa.isField(a.namespaceURI, a.localName);
  }
  function l(a) {
    var c = a && a.localName,
      b = !1;
    c &&
      ((a = a.namespaceURI),
      a === J && (b = "s" === c || "tab" === c || "line-break" === c));
    return b;
  }
  function a(a) {
    return l(a) || e(a) || k(a) || d(a);
  }
  function c(a) {
    var c = a && a.localName,
      b = !1;
    c && ((a = a.namespaceURI), a === J && (b = "s" === c));
    return b;
  }
  function m(a) {
    return -1 !== S.indexOf(a.namespaceURI);
  }
  function h(a) {
    if (l(a) || e(a)) return !1;
    if (q(a.parentNode) && a.nodeType === Node.TEXT_NODE)
      return 0 === a.textContent.length;
    for (a = a.firstChild; a; ) {
      if (m(a) || !h(a)) return !1;
      a = a.nextSibling;
    }
    return !0;
  }
  function y(a) {
    for (; null !== a.firstChild && q(a); ) a = a.firstChild;
    return a;
  }
  function x(a) {
    for (; null !== a.lastChild && q(a); ) a = a.lastChild;
    return a;
  }
  function z(a) {
    for (; !f(a) && null === a.previousSibling; ) a = a.parentNode;
    return f(a) ? null : x(a.previousSibling);
  }
  function w(a) {
    for (; !f(a) && null === a.nextSibling; ) a = a.parentNode;
    return f(a) ? null : y(a.nextSibling);
  }
  function v(b) {
    for (var d = !1; b; )
      if (b.nodeType === Node.TEXT_NODE)
        if (0 === b.length) b = z(b);
        else return !r(b.data.substr(b.length - 1, 1));
      else a(b) ? ((d = !1 === c(b)), (b = null)) : (b = z(b));
    return d;
  }
  function u(c) {
    var b = !1,
      d;
    for (c = c && y(c); c; ) {
      d = c.nodeType === Node.TEXT_NODE ? c.length : 0;
      if (0 < d && !r(c.data)) {
        b = !0;
        break;
      }
      if (a(c)) {
        b = !0;
        break;
      }
      c = w(c);
    }
    return b;
  }
  function t(a, c) {
    return r(a.data.substr(c)) ? !u(w(a)) : !1;
  }
  function A(c, b) {
    var d = c.data,
      m;
    if (!r(d[b]) || a(c.parentNode)) return !1;
    0 < b ? r(d[b - 1]) || (m = !0) : v(z(c)) && (m = !0);
    return !0 === m ? (t(c, b) ? !1 : !0) : !1;
  }
  function I(a) {
    return (a =
      /(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(
        a
      ))
      ? { value: parseFloat(a[1]), unit: a[3] }
      : null;
  }
  function K(a) {
    return (a = I(a)) && (0 > a.value || "%" === a.unit) ? null : a;
  }
  function L(a) {
    return (a = I(a)) && "%" !== a.unit ? null : a;
  }
  function E(a) {
    switch (a.namespaceURI) {
      case odf.Namespaces.drawns:
      case odf.Namespaces.svgns:
      case odf.Namespaces.dr3dns:
        return !1;
      case odf.Namespaces.textns:
        switch (a.localName) {
          case "note-body":
          case "ruby-text":
            return !1;
        }
        break;
      case odf.Namespaces.officens:
        switch (a.localName) {
          case "annotation":
          case "binary-data":
          case "event-listeners":
            return !1;
        }
        break;
      default:
        switch (a.localName) {
          case "cursor":
          case "editinfo":
            return !1;
        }
    }
    return !0;
  }
  function N(a) {
    return Boolean(n(a) && (!r(a.textContent) || A(a, 0)));
  }
  function O(a, c) {
    for (; 0 < c.length && !aa.rangeContainsNode(a, c[0]); ) c.shift();
    for (; 0 < c.length && !aa.rangeContainsNode(a, c[c.length - 1]); ) c.pop();
  }
  function D(c, b, m) {
    var h;
    h = aa.getNodesInRange(
      c,
      function (c) {
        var b = NodeFilter.FILTER_REJECT;
        if (l(c.parentNode) || e(c.parentNode) || d(c))
          b = NodeFilter.FILTER_REJECT;
        else if (c.nodeType === Node.TEXT_NODE) {
          if (m || N(c)) b = NodeFilter.FILTER_ACCEPT;
        } else if (a(c)) b = NodeFilter.FILTER_ACCEPT;
        else if (E(c) || q(c)) b = NodeFilter.FILTER_SKIP;
        return b;
      },
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
    );
    b || O(c, h);
    return h;
  }
  function V(a, c, b) {
    for (; a; ) {
      if (b(a)) {
        c[0] !== a && c.unshift(a);
        break;
      }
      if (d(a)) break;
      a = a.parentNode;
    }
  }
  function W(a, c) {
    var b = a;
    if (c < b.childNodes.length - 1) b = b.childNodes[c + 1];
    else {
      for (; !b.nextSibling; ) b = b.parentNode;
      b = b.nextSibling;
    }
    for (; b.firstChild; ) b = b.firstChild;
    return b;
  }
  var J = odf.Namespaces.textns,
    R = odf.Namespaces.drawns,
    P = odf.Namespaces.xlinkns,
    aa = core.DomUtils,
    S = [
      odf.Namespaces.dbns,
      odf.Namespaces.dcns,
      odf.Namespaces.dr3dns,
      odf.Namespaces.drawns,
      odf.Namespaces.chartns,
      odf.Namespaces.formns,
      odf.Namespaces.numberns,
      odf.Namespaces.officens,
      odf.Namespaces.presentationns,
      odf.Namespaces.stylens,
      odf.Namespaces.svgns,
      odf.Namespaces.tablens,
      odf.Namespaces.textns,
    ],
    fa = odf.OdfSchema;
  this.isImage = g;
  this.isCharacterFrame = k;
  this.isInlineRoot = d;
  this.isTextSpan = function (a) {
    return "span" === (a && a.localName) && a.namespaceURI === J;
  };
  this.isHyperlink = b;
  this.getHyperlinkTarget = function (a) {
    return a.getAttributeNS(P, "href") || "";
  };
  this.isParagraph = f;
  this.getParagraphElement = n;
  this.getParentAnnotation = p;
  this.isWithinAnnotation = function (a, c) {
    return Boolean(p(a, c));
  };
  this.getAnnotationCreator = function (a) {
    return a.getElementsByTagNameNS(odf.Namespaces.dcns, "creator")[0]
      .textContent;
  };
  this.isListItem = function (a) {
    return "list-item" === (a && a.localName) && a.namespaceURI === J;
  };
  this.isLineBreak = function (a) {
    return "line-break" === (a && a.localName) && a.namespaceURI === J;
  };
  this.isODFWhitespace = r;
  this.isGroupingElement = q;
  this.isFieldElement = e;
  this.isCharacterElement = l;
  this.isAnchoredAsCharacterElement = a;
  this.isSpaceElement = c;
  this.isODFNode = m;
  this.hasNoODFContent = h;
  this.firstChild = y;
  this.lastChild = x;
  this.previousNode = z;
  this.nextNode = w;
  this.scanLeftForNonSpace = v;
  this.lookLeftForCharacter = function (c) {
    var b,
      d = (b = 0);
    c.nodeType === Node.TEXT_NODE && (d = c.length);
    0 < d
      ? ((b = c.data),
        (b = r(b.substr(d - 1, 1))
          ? 1 === d
            ? v(z(c))
              ? 2
              : 0
            : r(b.substr(d - 2, 1))
            ? 0
            : 2
          : 1))
      : a(c) && (b = 1);
    return b;
  };
  this.lookRightForCharacter = function (c) {
    var b = !1,
      d = 0;
    c && c.nodeType === Node.TEXT_NODE && (d = c.length);
    0 < d ? (b = !r(c.data.substr(0, 1))) : a(c) && (b = !0);
    return b;
  };
  this.scanLeftForAnyCharacter = function (c) {
    var b = !1,
      d;
    for (c = c && x(c); c; ) {
      d = c.nodeType === Node.TEXT_NODE ? c.length : 0;
      if (0 < d && !r(c.data)) {
        b = !0;
        break;
      }
      if (a(c)) {
        b = !0;
        break;
      }
      c = z(c);
    }
    return b;
  };
  this.scanRightForAnyCharacter = u;
  this.isTrailingWhitespace = t;
  this.isSignificantWhitespace = A;
  this.isDowngradableSpaceElement = function (a) {
    return c(a) ? v(z(a)) && u(w(a)) : !1;
  };
  this.parseLength = I;
  this.parseNonNegativeLength = K;
  this.parseFoFontSize = function (a) {
    var c;
    c = (c = I(a)) && (0 >= c.value || "%" === c.unit) ? null : c;
    return c || L(a);
  };
  this.parseFoLineHeight = function (a) {
    return K(a) || L(a);
  };
  this.isTextContentContainingNode = E;
  this.getTextNodes = function (a, c) {
    var b;
    b = aa.getNodesInRange(
      a,
      function (a) {
        var c = NodeFilter.FILTER_REJECT;
        a.nodeType === Node.TEXT_NODE
          ? N(a) && (c = NodeFilter.FILTER_ACCEPT)
          : E(a) && (c = NodeFilter.FILTER_SKIP);
        return c;
      },
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
    );
    c || O(a, b);
    return b;
  };
  this.getTextElements = D;
  this.getParagraphElements = function (a) {
    var c;
    c = aa.getNodesInRange(
      a,
      function (a) {
        var c = NodeFilter.FILTER_REJECT;
        if (f(a)) c = NodeFilter.FILTER_ACCEPT;
        else if (E(a) || q(a)) c = NodeFilter.FILTER_SKIP;
        return c;
      },
      NodeFilter.SHOW_ELEMENT
    );
    V(a.startContainer, c, f);
    return c;
  };
  this.getImageElements = function (a) {
    var c;
    c = aa.getNodesInRange(
      a,
      function (a) {
        var c = NodeFilter.FILTER_SKIP;
        g(a) && (c = NodeFilter.FILTER_ACCEPT);
        return c;
      },
      NodeFilter.SHOW_ELEMENT
    );
    V(a.startContainer, c, g);
    return c;
  };
  this.getHyperlinkElements = function (a) {
    var c = [],
      d = a.cloneRange();
    a.collapsed &&
      a.endContainer.nodeType === Node.ELEMENT_NODE &&
      ((a = W(a.endContainer, a.endOffset)),
      a.nodeType === Node.TEXT_NODE && d.setEnd(a, 1));
    D(d, !0, !1).forEach(function (a) {
      for (a = a.parentNode; !f(a); ) {
        if (b(a) && -1 === c.indexOf(a)) {
          c.push(a);
          break;
        }
        a = a.parentNode;
      }
    });
    d.detach();
    return c;
  };
  this.getNormalizedFontFamilyName = function (a) {
    /^(["'])(?:.|[\n\r])*?\1$/.test(a) ||
      ((a = a.replace(/^[ \t\r\n\f]*((?:.|[\n\r])*?)[ \t\r\n\f]*$/, "$1")),
      /[ \t\r\n\f]/.test(a) &&
        (a = "'" + a.replace(/[ \t\r\n\f]+/g, " ") + "'"));
    return a;
  };
};
odf.OdfUtils = new odf.OdfUtilsImpl();
gui.OdfTextBodyNodeFilter = function () {
  var g = odf.OdfUtils,
    k = Node.TEXT_NODE,
    d = NodeFilter.FILTER_REJECT,
    b = NodeFilter.FILTER_ACCEPT,
    f = odf.Namespaces.textns;
  this.acceptNode = function (n) {
    if (n.nodeType === k) {
      if (!g.isGroupingElement(n.parentNode)) return d;
    } else if (n.namespaceURI === f && "tracked-changes" === n.localName)
      return d;
    return b;
  };
};
xmldom.LSSerializerFilter = function () {};
xmldom.LSSerializerFilter.prototype.acceptNode = function (g) {};
odf.OdfNodeFilter = function () {
  this.acceptNode = function (g) {
    return "http://www.w3.org/1999/xhtml" === g.namespaceURI
      ? NodeFilter.FILTER_SKIP
      : g.namespaceURI && g.namespaceURI.match(/^urn:webodf:/)
      ? NodeFilter.FILTER_REJECT
      : NodeFilter.FILTER_ACCEPT;
  };
};
xmldom.XPathIterator = function () {};
xmldom.XPathIterator.prototype.next = function () {};
xmldom.XPathIterator.prototype.reset = function () {};
function createXPathSingleton() {
  function g(b, a, c) {
    return -1 !== b && (b < a || -1 === a) && (b < c || -1 === c);
  }
  function k(b) {
    for (var a = [], c = 0, d = b.length, h; c < d; ) {
      var f = b,
        n = d,
        k = a,
        r = "",
        p = [],
        q = f.indexOf("[", c),
        t = f.indexOf("/", c),
        A = f.indexOf("=", c);
      g(t, q, A)
        ? ((r = f.substring(c, t)), (c = t + 1))
        : g(q, t, A)
        ? ((r = f.substring(c, q)), (c = e(f, q, p)))
        : g(A, t, q)
        ? ((r = f.substring(c, A)), (c = A))
        : ((r = f.substring(c, n)), (c = n));
      k.push({ location: r, predicates: p });
      if (c < d && "=" === b[c]) {
        h = b.substring(c + 1, d);
        if (2 < h.length && ("'" === h[0] || '"' === h[0]))
          h = h.slice(1, h.length - 1);
        else
          try {
            h = parseInt(h, 10);
          } catch (I) {}
        c = d;
      }
    }
    return { steps: a, value: h };
  }
  function d() {
    var b = null,
      a = !1;
    this.setNode = function (a) {
      b = a;
    };
    this.reset = function () {
      a = !1;
    };
    this.next = function () {
      var c = a ? null : b;
      a = !0;
      return c;
    };
  }
  function b(b, a, c) {
    this.reset = function () {
      b.reset();
    };
    this.next = function () {
      for (var d = b.next(); d; ) {
        d.nodeType === Node.ELEMENT_NODE && (d = d.getAttributeNodeNS(a, c));
        if (d) break;
        d = b.next();
      }
      return d;
    };
  }
  function f(b, a) {
    var c = b.next(),
      d = null;
    this.reset = function () {
      b.reset();
      c = b.next();
      d = null;
    };
    this.next = function () {
      for (; c; ) {
        if (d)
          if (a && d.firstChild) d = d.firstChild;
          else {
            for (; !d.nextSibling && d !== c; ) d = d.parentNode;
            d === c ? (c = b.next()) : (d = d.nextSibling);
          }
        else {
          do (d = c.firstChild) || (c = b.next());
          while (c && !d);
        }
        if (d && d.nodeType === Node.ELEMENT_NODE) return d;
      }
      return null;
    };
  }
  function n(b, a) {
    this.reset = function () {
      b.reset();
    };
    this.next = function () {
      for (var c = b.next(); c && !a(c); ) c = b.next();
      return c;
    };
  }
  function p(b, a, c) {
    a = a.split(":", 2);
    var d = c(a[0]),
      h = a[1];
    return new n(b, function (a) {
      return a.localName === h && a.namespaceURI === d;
    });
  }
  function r(b, a, c) {
    var m = new d(),
      h = q(m, a, c),
      e = a.value;
    return void 0 === e
      ? new n(b, function (a) {
          m.setNode(a);
          h.reset();
          return null !== h.next();
        })
      : new n(b, function (a) {
          m.setNode(a);
          h.reset();
          return (a = h.next()) ? a.nodeValue === e : !1;
        });
  }
  var q, e;
  e = function (b, a, c) {
    for (var d = a, h = b.length, e = 0; d < h; )
      "]" === b[d]
        ? (--e, 0 >= e && c.push(k(b.substring(a, d))))
        : "[" === b[d] && (0 >= e && (a = d + 1), (e += 1)),
        (d += 1);
    return d;
  };
  q = function (d, a, c) {
    var m, h, e, n;
    for (m = 0; m < a.steps.length; m += 1) {
      e = a.steps[m];
      h = e.location;
      if ("" === h) d = new f(d, !1);
      else if ("@" === h[0]) {
        h = h.substr(1).split(":", 2);
        n = c(h[0]);
        if (!n) throw "No namespace associated with the prefix " + h[0];
        d = new b(d, n, h[1]);
      } else
        "." !== h &&
          ((d = new f(d, !1)), -1 !== h.indexOf(":") && (d = p(d, h, c)));
      for (h = 0; h < e.predicates.length; h += 1)
        (n = e.predicates[h]), (d = r(d, n, c));
    }
    return d;
  };
  return {
    getODFElementsWithXPath: function (b, a, c) {
      var m = b.ownerDocument,
        h = [],
        e = null;
      if (m && "function" === typeof m.evaluate)
        for (
          c = m.evaluate(
            a,
            b,
            c,
            XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
            null
          ),
            e = c.iterateNext();
          null !== e;

        )
          e.nodeType === Node.ELEMENT_NODE && h.push(e), (e = c.iterateNext());
      else {
        h = new d();
        h.setNode(b);
        b = k(a);
        h = q(h, b, c);
        b = [];
        for (c = h.next(); c; ) b.push(c), (c = h.next());
        h = b;
      }
      return h;
    },
  };
}
xmldom.XPath = createXPathSingleton();
odf.StyleInfo = function () {
  function g(a, c) {
    var b,
      d,
      h,
      m,
      e,
      l = 0;
    if ((b = K[a.localName])) if ((h = b[a.namespaceURI])) l = h.length;
    for (b = 0; b < l; b += 1)
      (d = h[b]),
        (m = d.ns),
        (e = d.localname),
        (d = a.getAttributeNS(m, e)) && a.setAttributeNS(m, A[m] + e, c + d);
    for (h = a.firstElementChild; h; ) g(h, c), (h = h.nextElementSibling);
  }
  function k(a, c) {
    var b,
      d,
      h,
      m,
      e,
      l = 0;
    if ((b = K[a.localName])) if ((h = b[a.namespaceURI])) l = h.length;
    for (b = 0; b < l; b += 1)
      if (
        ((d = h[b]),
        (m = d.ns),
        (e = d.localname),
        (d = a.getAttributeNS(m, e)))
      )
        (d = d.replace(c, "")), a.setAttributeNS(m, A[m] + e, d);
    for (h = a.firstElementChild; h; ) k(h, c), (h = h.nextElementSibling);
  }
  function d(a, c) {
    var b,
      d,
      h,
      m,
      e,
      l = 0;
    if ((b = K[a.localName])) if ((h = b[a.namespaceURI])) l = h.length;
    for (b = 0; b < l; b += 1)
      if (
        ((m = h[b]),
        (d = m.ns),
        (e = m.localname),
        (d = a.getAttributeNS(d, e)))
      )
        (c = c || {}),
          (m = m.keyname),
          c.hasOwnProperty(m)
            ? (c[m][d] = 1)
            : ((e = {}), (e[d] = 1), (c[m] = e));
    return c;
  }
  function b(a, c) {
    var h, m;
    d(a, c);
    for (h = a.firstChild; h; )
      h.nodeType === Node.ELEMENT_NODE && ((m = h), b(m, c)),
        (h = h.nextSibling);
  }
  function f(a, c, b) {
    this.key = a;
    this.name = c;
    this.family = b;
    this.requires = {};
  }
  function n(a, c, b) {
    var d = a + '"' + c,
      h = b[d];
    h || (h = b[d] = new f(d, a, c));
    return h;
  }
  function p(a, c, b) {
    var d,
      h,
      m,
      e,
      l,
      f = 0;
    d = a.getAttributeNS(v, "name");
    e = a.getAttributeNS(v, "family");
    d && e && (c = n(d, e, b));
    if (c) {
      if ((d = K[a.localName])) if ((m = d[a.namespaceURI])) f = m.length;
      for (d = 0; d < f; d += 1)
        if (
          ((e = m[d]),
          (h = e.ns),
          (l = e.localname),
          (h = a.getAttributeNS(h, l)))
        )
          (e = e.keyname), (e = n(h, e, b)), (c.requires[e.key] = e);
    }
    for (a = a.firstElementChild; a; ) p(a, c, b), (a = a.nextElementSibling);
    return b;
  }
  function r(a, c) {
    var b = c[a.family];
    b || (b = c[a.family] = {});
    b[a.name] = 1;
    Object.keys(a.requires).forEach(function (b) {
      r(a.requires[b], c);
    });
  }
  function q(a, c) {
    var b = p(a, null, {});
    Object.keys(b).forEach(function (a) {
      a = b[a];
      var d = c[a.family];
      d && d.hasOwnProperty(a.name) && r(a, c);
    });
  }
  function e(a, c) {
    function b(c) {
      (c = m.getAttributeNS(v, c)) && (a[c] = !0);
    }
    var d = ["font-name", "font-name-asian", "font-name-complex"],
      h,
      m;
    for (h = c && c.firstElementChild; h; )
      (m = h), d.forEach(b), e(a, m), (h = h.nextElementSibling);
  }
  function l(a, c) {
    function b(a) {
      var d = m.getAttributeNS(v, a);
      d && c.hasOwnProperty(d) && m.setAttributeNS(v, "style:" + a, c[d]);
    }
    var d = ["font-name", "font-name-asian", "font-name-complex"],
      h,
      m;
    for (h = a && a.firstElementChild; h; )
      (m = h), d.forEach(b), l(m, c), (h = h.nextElementSibling);
  }
  var a = odf.Namespaces.chartns,
    c = odf.Namespaces.dbns,
    m = odf.Namespaces.dr3dns,
    h = odf.Namespaces.drawns,
    y = odf.Namespaces.formns,
    x = odf.Namespaces.numberns,
    z = odf.Namespaces.officens,
    w = odf.Namespaces.presentationns,
    v = odf.Namespaces.stylens,
    u = odf.Namespaces.tablens,
    t = odf.Namespaces.textns,
    A = {
      "urn:oasis:names:tc:opendocument:xmlns:chart:1.0": "chart:",
      "urn:oasis:names:tc:opendocument:xmlns:database:1.0": "db:",
      "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0": "dr3d:",
      "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0": "draw:",
      "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0": "fo:",
      "urn:oasis:names:tc:opendocument:xmlns:form:1.0": "form:",
      "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0": "number:",
      "urn:oasis:names:tc:opendocument:xmlns:office:1.0": "office:",
      "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0": "presentation:",
      "urn:oasis:names:tc:opendocument:xmlns:style:1.0": "style:",
      "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0": "svg:",
      "urn:oasis:names:tc:opendocument:xmlns:table:1.0": "table:",
      "urn:oasis:names:tc:opendocument:xmlns:text:1.0": "chart:",
      "http://www.w3.org/XML/1998/namespace": "xml:",
    },
    I = {
      text: [
        { ens: v, en: "tab-stop", ans: v, a: "leader-text-style" },
        { ens: v, en: "drop-cap", ans: v, a: "style-name" },
        {
          ens: t,
          en: "notes-configuration",
          ans: t,
          a: "citation-body-style-name",
        },
        { ens: t, en: "notes-configuration", ans: t, a: "citation-style-name" },
        { ens: t, en: "a", ans: t, a: "style-name" },
        { ens: t, en: "alphabetical-index", ans: t, a: "style-name" },
        { ens: t, en: "linenumbering-configuration", ans: t, a: "style-name" },
        { ens: t, en: "list-level-style-number", ans: t, a: "style-name" },
        { ens: t, en: "ruby-text", ans: t, a: "style-name" },
        { ens: t, en: "span", ans: t, a: "style-name" },
        { ens: t, en: "a", ans: t, a: "visited-style-name" },
        {
          ens: v,
          en: "text-properties",
          ans: v,
          a: "text-line-through-text-style",
        },
        {
          ens: t,
          en: "alphabetical-index-source",
          ans: t,
          a: "main-entry-style-name",
        },
        { ens: t, en: "index-entry-bibliography", ans: t, a: "style-name" },
        { ens: t, en: "index-entry-chapter", ans: t, a: "style-name" },
        { ens: t, en: "index-entry-link-end", ans: t, a: "style-name" },
        { ens: t, en: "index-entry-link-start", ans: t, a: "style-name" },
        { ens: t, en: "index-entry-page-number", ans: t, a: "style-name" },
        { ens: t, en: "index-entry-span", ans: t, a: "style-name" },
        { ens: t, en: "index-entry-tab-stop", ans: t, a: "style-name" },
        { ens: t, en: "index-entry-text", ans: t, a: "style-name" },
        { ens: t, en: "index-title-template", ans: t, a: "style-name" },
        { ens: t, en: "list-level-style-bullet", ans: t, a: "style-name" },
        { ens: t, en: "outline-level-style", ans: t, a: "style-name" },
      ],
      paragraph: [
        { ens: h, en: "caption", ans: h, a: "text-style-name" },
        { ens: h, en: "circle", ans: h, a: "text-style-name" },
        { ens: h, en: "connector", ans: h, a: "text-style-name" },
        { ens: h, en: "control", ans: h, a: "text-style-name" },
        { ens: h, en: "custom-shape", ans: h, a: "text-style-name" },
        { ens: h, en: "ellipse", ans: h, a: "text-style-name" },
        { ens: h, en: "frame", ans: h, a: "text-style-name" },
        { ens: h, en: "line", ans: h, a: "text-style-name" },
        { ens: h, en: "measure", ans: h, a: "text-style-name" },
        { ens: h, en: "path", ans: h, a: "text-style-name" },
        { ens: h, en: "polygon", ans: h, a: "text-style-name" },
        { ens: h, en: "polyline", ans: h, a: "text-style-name" },
        { ens: h, en: "rect", ans: h, a: "text-style-name" },
        { ens: h, en: "regular-polygon", ans: h, a: "text-style-name" },
        { ens: z, en: "annotation", ans: h, a: "text-style-name" },
        { ens: y, en: "column", ans: y, a: "text-style-name" },
        { ens: v, en: "style", ans: v, a: "next-style-name" },
        { ens: u, en: "body", ans: u, a: "paragraph-style-name" },
        { ens: u, en: "even-columns", ans: u, a: "paragraph-style-name" },
        { ens: u, en: "even-rows", ans: u, a: "paragraph-style-name" },
        { ens: u, en: "first-column", ans: u, a: "paragraph-style-name" },
        { ens: u, en: "first-row", ans: u, a: "paragraph-style-name" },
        { ens: u, en: "last-column", ans: u, a: "paragraph-style-name" },
        { ens: u, en: "last-row", ans: u, a: "paragraph-style-name" },
        { ens: u, en: "odd-columns", ans: u, a: "paragraph-style-name" },
        { ens: u, en: "odd-rows", ans: u, a: "paragraph-style-name" },
        { ens: t, en: "notes-configuration", ans: t, a: "default-style-name" },
        {
          ens: t,
          en: "alphabetical-index-entry-template",
          ans: t,
          a: "style-name",
        },
        { ens: t, en: "bibliography-entry-template", ans: t, a: "style-name" },
        { ens: t, en: "h", ans: t, a: "style-name" },
        {
          ens: t,
          en: "illustration-index-entry-template",
          ans: t,
          a: "style-name",
        },
        { ens: t, en: "index-source-style", ans: t, a: "style-name" },
        { ens: t, en: "object-index-entry-template", ans: t, a: "style-name" },
        { ens: t, en: "p", ans: t, a: "style-name" },
        { ens: t, en: "table-index-entry-template", ans: t, a: "style-name" },
        {
          ens: t,
          en: "table-of-content-entry-template",
          ans: t,
          a: "style-name",
        },
        { ens: t, en: "table-index-entry-template", ans: t, a: "style-name" },
        { ens: t, en: "user-index-entry-template", ans: t, a: "style-name" },
        {
          ens: v,
          en: "page-layout-properties",
          ans: v,
          a: "register-truth-ref-style-name",
        },
      ],
      chart: [
        { ens: a, en: "axis", ans: a, a: "style-name" },
        { ens: a, en: "chart", ans: a, a: "style-name" },
        { ens: a, en: "data-label", ans: a, a: "style-name" },
        { ens: a, en: "data-point", ans: a, a: "style-name" },
        { ens: a, en: "equation", ans: a, a: "style-name" },
        { ens: a, en: "error-indicator", ans: a, a: "style-name" },
        { ens: a, en: "floor", ans: a, a: "style-name" },
        { ens: a, en: "footer", ans: a, a: "style-name" },
        { ens: a, en: "grid", ans: a, a: "style-name" },
        { ens: a, en: "legend", ans: a, a: "style-name" },
        { ens: a, en: "mean-value", ans: a, a: "style-name" },
        { ens: a, en: "plot-area", ans: a, a: "style-name" },
        { ens: a, en: "regression-curve", ans: a, a: "style-name" },
        { ens: a, en: "series", ans: a, a: "style-name" },
        { ens: a, en: "stock-gain-marker", ans: a, a: "style-name" },
        { ens: a, en: "stock-loss-marker", ans: a, a: "style-name" },
        { ens: a, en: "stock-range-line", ans: a, a: "style-name" },
        { ens: a, en: "subtitle", ans: a, a: "style-name" },
        { ens: a, en: "title", ans: a, a: "style-name" },
        { ens: a, en: "wall", ans: a, a: "style-name" },
      ],
      section: [
        { ens: t, en: "alphabetical-index", ans: t, a: "style-name" },
        { ens: t, en: "bibliography", ans: t, a: "style-name" },
        { ens: t, en: "illustration-index", ans: t, a: "style-name" },
        { ens: t, en: "index-title", ans: t, a: "style-name" },
        { ens: t, en: "object-index", ans: t, a: "style-name" },
        { ens: t, en: "section", ans: t, a: "style-name" },
        { ens: t, en: "table-of-content", ans: t, a: "style-name" },
        { ens: t, en: "table-index", ans: t, a: "style-name" },
        { ens: t, en: "user-index", ans: t, a: "style-name" },
      ],
      ruby: [{ ens: t, en: "ruby", ans: t, a: "style-name" }],
      table: [
        { ens: c, en: "query", ans: c, a: "style-name" },
        { ens: c, en: "table-representation", ans: c, a: "style-name" },
        { ens: u, en: "background", ans: u, a: "style-name" },
        { ens: u, en: "table", ans: u, a: "style-name" },
      ],
      "table-column": [
        { ens: c, en: "column", ans: c, a: "style-name" },
        { ens: u, en: "table-column", ans: u, a: "style-name" },
      ],
      "table-row": [
        { ens: c, en: "query", ans: c, a: "default-row-style-name" },
        {
          ens: c,
          en: "table-representation",
          ans: c,
          a: "default-row-style-name",
        },
        { ens: u, en: "table-row", ans: u, a: "style-name" },
      ],
      "table-cell": [
        { ens: c, en: "column", ans: c, a: "default-cell-style-name" },
        { ens: u, en: "table-column", ans: u, a: "default-cell-style-name" },
        { ens: u, en: "table-row", ans: u, a: "default-cell-style-name" },
        { ens: u, en: "body", ans: u, a: "style-name" },
        { ens: u, en: "covered-table-cell", ans: u, a: "style-name" },
        { ens: u, en: "even-columns", ans: u, a: "style-name" },
        { ens: u, en: "covered-table-cell", ans: u, a: "style-name" },
        { ens: u, en: "even-columns", ans: u, a: "style-name" },
        { ens: u, en: "even-rows", ans: u, a: "style-name" },
        { ens: u, en: "first-column", ans: u, a: "style-name" },
        { ens: u, en: "first-row", ans: u, a: "style-name" },
        { ens: u, en: "last-column", ans: u, a: "style-name" },
        { ens: u, en: "last-row", ans: u, a: "style-name" },
        { ens: u, en: "odd-columns", ans: u, a: "style-name" },
        { ens: u, en: "odd-rows", ans: u, a: "style-name" },
        { ens: u, en: "table-cell", ans: u, a: "style-name" },
      ],
      graphic: [
        { ens: m, en: "cube", ans: h, a: "style-name" },
        { ens: m, en: "extrude", ans: h, a: "style-name" },
        { ens: m, en: "rotate", ans: h, a: "style-name" },
        { ens: m, en: "scene", ans: h, a: "style-name" },
        { ens: m, en: "sphere", ans: h, a: "style-name" },
        { ens: h, en: "caption", ans: h, a: "style-name" },
        { ens: h, en: "circle", ans: h, a: "style-name" },
        { ens: h, en: "connector", ans: h, a: "style-name" },
        { ens: h, en: "control", ans: h, a: "style-name" },
        { ens: h, en: "custom-shape", ans: h, a: "style-name" },
        { ens: h, en: "ellipse", ans: h, a: "style-name" },
        { ens: h, en: "frame", ans: h, a: "style-name" },
        { ens: h, en: "g", ans: h, a: "style-name" },
        { ens: h, en: "line", ans: h, a: "style-name" },
        { ens: h, en: "measure", ans: h, a: "style-name" },
        { ens: h, en: "page-thumbnail", ans: h, a: "style-name" },
        { ens: h, en: "path", ans: h, a: "style-name" },
        { ens: h, en: "polygon", ans: h, a: "style-name" },
        { ens: h, en: "polyline", ans: h, a: "style-name" },
        { ens: h, en: "rect", ans: h, a: "style-name" },
        { ens: h, en: "regular-polygon", ans: h, a: "style-name" },
        { ens: z, en: "annotation", ans: h, a: "style-name" },
      ],
      presentation: [
        { ens: m, en: "cube", ans: w, a: "style-name" },
        { ens: m, en: "extrude", ans: w, a: "style-name" },
        { ens: m, en: "rotate", ans: w, a: "style-name" },
        { ens: m, en: "scene", ans: w, a: "style-name" },
        { ens: m, en: "sphere", ans: w, a: "style-name" },
        { ens: h, en: "caption", ans: w, a: "style-name" },
        { ens: h, en: "circle", ans: w, a: "style-name" },
        { ens: h, en: "connector", ans: w, a: "style-name" },
        { ens: h, en: "control", ans: w, a: "style-name" },
        { ens: h, en: "custom-shape", ans: w, a: "style-name" },
        { ens: h, en: "ellipse", ans: w, a: "style-name" },
        { ens: h, en: "frame", ans: w, a: "style-name" },
        { ens: h, en: "g", ans: w, a: "style-name" },
        { ens: h, en: "line", ans: w, a: "style-name" },
        { ens: h, en: "measure", ans: w, a: "style-name" },
        { ens: h, en: "page-thumbnail", ans: w, a: "style-name" },
        { ens: h, en: "path", ans: w, a: "style-name" },
        { ens: h, en: "polygon", ans: w, a: "style-name" },
        { ens: h, en: "polyline", ans: w, a: "style-name" },
        { ens: h, en: "rect", ans: w, a: "style-name" },
        { ens: h, en: "regular-polygon", ans: w, a: "style-name" },
        { ens: z, en: "annotation", ans: w, a: "style-name" },
      ],
      "drawing-page": [
        { ens: h, en: "page", ans: h, a: "style-name" },
        { ens: w, en: "notes", ans: h, a: "style-name" },
        { ens: v, en: "handout-master", ans: h, a: "style-name" },
        { ens: v, en: "master-page", ans: h, a: "style-name" },
      ],
      "list-style": [
        { ens: t, en: "list", ans: t, a: "style-name" },
        { ens: t, en: "numbered-paragraph", ans: t, a: "style-name" },
        { ens: t, en: "list-item", ans: t, a: "style-override" },
        { ens: v, en: "style", ans: v, a: "list-style-name" },
      ],
      data: [
        { ens: v, en: "style", ans: v, a: "data-style-name" },
        { ens: v, en: "style", ans: v, a: "percentage-data-style-name" },
        { ens: w, en: "date-time-decl", ans: v, a: "data-style-name" },
        { ens: t, en: "creation-date", ans: v, a: "data-style-name" },
        { ens: t, en: "creation-time", ans: v, a: "data-style-name" },
        { ens: t, en: "database-display", ans: v, a: "data-style-name" },
        { ens: t, en: "date", ans: v, a: "data-style-name" },
        { ens: t, en: "editing-duration", ans: v, a: "data-style-name" },
        { ens: t, en: "expression", ans: v, a: "data-style-name" },
        { ens: t, en: "meta-field", ans: v, a: "data-style-name" },
        { ens: t, en: "modification-date", ans: v, a: "data-style-name" },
        { ens: t, en: "modification-time", ans: v, a: "data-style-name" },
        { ens: t, en: "print-date", ans: v, a: "data-style-name" },
        { ens: t, en: "print-time", ans: v, a: "data-style-name" },
        { ens: t, en: "table-formula", ans: v, a: "data-style-name" },
        { ens: t, en: "time", ans: v, a: "data-style-name" },
        { ens: t, en: "user-defined", ans: v, a: "data-style-name" },
        { ens: t, en: "user-field-get", ans: v, a: "data-style-name" },
        { ens: t, en: "user-field-input", ans: v, a: "data-style-name" },
        { ens: t, en: "variable-get", ans: v, a: "data-style-name" },
        { ens: t, en: "variable-input", ans: v, a: "data-style-name" },
        { ens: t, en: "variable-set", ans: v, a: "data-style-name" },
      ],
      "page-layout": [
        { ens: w, en: "notes", ans: v, a: "page-layout-name" },
        { ens: v, en: "handout-master", ans: v, a: "page-layout-name" },
        { ens: v, en: "master-page", ans: v, a: "page-layout-name" },
      ],
    },
    K,
    L = xmldom.XPath;
  this.collectUsedFontFaces = e;
  this.changeFontFaceNames = l;
  this.UsedStyleList = function (a, c) {
    var d = {};
    this.uses = function (a) {
      var c = a.localName,
        b = a.getAttributeNS(h, "name") || a.getAttributeNS(v, "name");
      a =
        "style" === c
          ? a.getAttributeNS(v, "family")
          : a.namespaceURI === x
          ? "data"
          : c;
      return (a = d[a]) ? 0 < a[b] : !1;
    };
    b(a, d);
    c && q(c, d);
  };
  this.getStyleName = function (a, c) {
    var b,
      d,
      h = K[c.localName];
    if (h && (h = h[c.namespaceURI]))
      for (d = 0; d < h.length; d += 1)
        if (
          h[d].keyname === a &&
          ((h = h[d]), c.hasAttributeNS(h.ns, h.localname))
        ) {
          b = c.getAttributeNS(h.ns, h.localname);
          break;
        }
    return b;
  };
  this.hasDerivedStyles = function (a, c, b) {
    var d = b.getAttributeNS(v, "name");
    b = b.getAttributeNS(v, "family");
    return L.getODFElementsWithXPath(
      a,
      '//style:*[@style:parent-style-name="' +
        d +
        '"][@style:family="' +
        b +
        '"]',
      c
    ).length
      ? !0
      : !1;
  };
  this.prefixStyleNames = function (a, c, b) {
    var d;
    if (a) {
      for (d = a.firstChild; d; ) {
        if (d.nodeType === Node.ELEMENT_NODE) {
          var m = d,
            e = c,
            l = m.getAttributeNS(h, "name"),
            f = void 0;
          l ? (f = h) : (l = m.getAttributeNS(v, "name")) && (f = v);
          f && m.setAttributeNS(f, A[f] + "name", e + l);
        }
        d = d.nextSibling;
      }
      g(a, c);
      b && g(b, c);
    }
  };
  this.removePrefixFromStyleNames = function (a, c, b) {
    var d = new RegExp("^" + c);
    if (a) {
      for (c = a.firstChild; c; ) {
        if (c.nodeType === Node.ELEMENT_NODE) {
          var m = c,
            e = d,
            l = m.getAttributeNS(h, "name"),
            f = void 0;
          l ? (f = h) : (l = m.getAttributeNS(v, "name")) && (f = v);
          f && ((l = l.replace(e, "")), m.setAttributeNS(f, A[f] + "name", l));
        }
        c = c.nextSibling;
      }
      k(a, d);
      b && k(b, d);
    }
  };
  this.determineStylesForNode = d;
  K = (function () {
    var a,
      c,
      b,
      d,
      h,
      m = {},
      e,
      l,
      f,
      n;
    for (b in I)
      if (I.hasOwnProperty(b))
        for (d = I[b], c = d.length, a = 0; a < c; a += 1)
          (h = d[a]),
            (f = h.en),
            (n = h.ens),
            m.hasOwnProperty(f) ? (e = m[f]) : (m[f] = e = {}),
            e.hasOwnProperty(n) ? (l = e[n]) : (e[n] = l = []),
            l.push({ ns: h.ans, localname: h.a, keyname: b });
    return m;
  })();
};
"function" !== typeof Object.create &&
  (Object.create = function (g) {
    var k = function () {};
    k.prototype = g;
    return new k();
  });
xmldom.LSSerializer = function () {
  function g(b) {
    var d = b || {},
      g = (function (b) {
        var a = {},
          c;
        for (c in b) b.hasOwnProperty(c) && (a[b[c]] = c);
        return a;
      })(b),
      k = [d],
      q = [g],
      e = 0;
    this.push = function () {
      e += 1;
      d = k[e] = Object.create(d);
      g = q[e] = Object.create(g);
    };
    this.pop = function () {
      k.pop();
      q.pop();
      --e;
      d = k[e];
      g = q[e];
    };
    this.getLocalNamespaceDefinitions = function () {
      return g;
    };
    this.getQName = function (b) {
      var a = b.namespaceURI,
        c = 0,
        m;
      if (!a) return b.localName;
      if ((m = g[a])) return m + ":" + b.localName;
      do {
        m || !b.prefix ? ((m = "ns" + c), (c += 1)) : (m = b.prefix);
        if (d[m] === a) break;
        if (!d[m]) {
          d[m] = a;
          g[a] = m;
          break;
        }
        m = null;
      } while (null === m);
      return m + ":" + b.localName;
    };
  }
  function k(b) {
    return b
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/'/g, "&apos;")
      .replace(/"/g, "&quot;");
  }
  function d(f, n) {
    var g = "",
      r = b.filter ? b.filter.acceptNode(n) : NodeFilter.FILTER_ACCEPT,
      q;
    if (r === NodeFilter.FILTER_ACCEPT && n.nodeType === Node.ELEMENT_NODE) {
      f.push();
      q = f.getQName(n);
      var e,
        l = n.attributes,
        a,
        c,
        m,
        h = "",
        y;
      e = "<" + q;
      a = l.length;
      for (c = 0; c < a; c += 1)
        (m = l.item(c)),
          "http://www.w3.org/2000/xmlns/" !== m.namespaceURI &&
            ((y = b.filter ? b.filter.acceptNode(m) : NodeFilter.FILTER_ACCEPT),
            y === NodeFilter.FILTER_ACCEPT &&
              ((y = f.getQName(m)),
              (m = "string" === typeof m.value ? k(m.value) : m.value),
              (h += " " + (y + '="' + m + '"'))));
      a = f.getLocalNamespaceDefinitions();
      for (c in a)
        a.hasOwnProperty(c) &&
          ((l = a[c])
            ? "xmlns" !== l && (e += " xmlns:" + a[c] + '="' + c + '"')
            : (e += ' xmlns="' + c + '"'));
      g += e + (h + ">");
    }
    if (r === NodeFilter.FILTER_ACCEPT || r === NodeFilter.FILTER_SKIP) {
      for (r = n.firstChild; r; ) (g += d(f, r)), (r = r.nextSibling);
      n.nodeValue && (g += k(n.nodeValue));
    }
    q && ((g += "</" + q + ">"), f.pop());
    return g;
  }
  var b = this;
  this.filter = null;
  this.writeToString = function (b, n) {
    if (!b) return "";
    var k = new g(n);
    return d(k, b);
  };
};
(function () {
  function g(b) {
    var a,
      c = r.length;
    for (a = 0; a < c; a += 1)
      if (
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0" === b.namespaceURI &&
        b.localName === r[a]
      )
        return a;
    return -1;
  }
  function k(b, a) {
    var c = new f.UsedStyleList(b, a),
      d = new odf.OdfNodeFilter();
    this.acceptNode = function (b) {
      var e = d.acceptNode(b);
      e === NodeFilter.FILTER_ACCEPT &&
        b.parentNode === a &&
        b.nodeType === Node.ELEMENT_NODE &&
        (e = c.uses(b) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT);
      return e;
    };
  }
  function d(b, a) {
    var c = new k(b, a);
    this.acceptNode = function (a) {
      var b = c.acceptNode(a);
      b !== NodeFilter.FILTER_ACCEPT ||
        !a.parentNode ||
        a.parentNode.namespaceURI !== odf.Namespaces.textns ||
        ("s" !== a.parentNode.localName && "tab" !== a.parentNode.localName) ||
        (b = NodeFilter.FILTER_REJECT);
      return b;
    };
  }
  function b(b, a) {
    if (a) {
      var c = g(a),
        d,
        h = b.firstChild;
      if (-1 !== c) {
        for (; h; ) {
          d = g(h);
          if (-1 !== d && d > c) break;
          h = h.nextSibling;
        }
        b.insertBefore(a, h);
      }
    }
  }
  var f = new odf.StyleInfo(),
    n = core.DomUtils,
    p = odf.Namespaces.stylens,
    r =
      "meta settings scripts font-face-decls styles automatic-styles master-styles body".split(
        " "
      ),
    q = Date.now() + "_webodf_",
    e = new core.Base64();
  odf.ODFElement = function () {};
  odf.ODFDocumentElement = function () {};
  odf.ODFDocumentElement.prototype = new odf.ODFElement();
  odf.ODFDocumentElement.prototype.constructor = odf.ODFDocumentElement;
  odf.ODFDocumentElement.prototype.fontFaceDecls = null;
  odf.ODFDocumentElement.prototype.manifest = null;
  odf.ODFDocumentElement.prototype.settings = null;
  odf.ODFDocumentElement.namespaceURI =
    "urn:oasis:names:tc:opendocument:xmlns:office:1.0";
  odf.ODFDocumentElement.localName = "document";
  odf.AnnotationElement = function () {};
  odf.OdfPart = function (b, a, c, d) {
    var h = this;
    this.size = 0;
    this.type = null;
    this.name = b;
    this.container = c;
    this.url = null;
    this.mimetype = a;
    this.onstatereadychange = this.document = null;
    this.EMPTY = 0;
    this.LOADING = 1;
    this.DONE = 2;
    this.state = this.EMPTY;
    this.data = "";
    this.load = function () {
      null !== d &&
        ((this.mimetype = a),
        d.loadAsDataURL(b, a, function (a, c) {
          a && runtime.log(a);
          h.url = c;
          if (h.onchange) h.onchange(h);
          if (h.onstatereadychange) h.onstatereadychange(h);
        }));
    };
  };
  odf.OdfPart.prototype.load = function () {};
  odf.OdfPart.prototype.getUrl = function () {
    return this.data ? "data:;base64," + e.toBase64(this.data) : null;
  };
  odf.OdfContainer = function a(c, m) {
    function h(a) {
      for (var c = a.firstChild, b; c; )
        (b = c.nextSibling),
          c.nodeType === Node.ELEMENT_NODE
            ? h(c)
            : c.nodeType === Node.PROCESSING_INSTRUCTION_NODE &&
              a.removeChild(c),
          (c = b);
    }
    function g(a) {
      var c = {},
        b,
        d,
        h = a.ownerDocument.createNodeIterator(
          a,
          NodeFilter.SHOW_ELEMENT,
          null,
          !1
        );
      for (a = h.nextNode(); a; )
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0" === a.namespaceURI &&
          ("annotation" === a.localName
            ? (b = a.getAttributeNS(
                "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
                "name"
              )) &&
              (c.hasOwnProperty(b)
                ? runtime.log(
                    "Warning: annotation name used more than once with <office:annotation/>: '" +
                      b +
                      "'"
                  )
                : (c[b] = a))
            : "annotation-end" === a.localName &&
              ((b = a.getAttributeNS(
                "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
                "name"
              ))
                ? c.hasOwnProperty(b)
                  ? ((d = c[b]),
                    d.annotationEndElement
                      ? runtime.log(
                          "Warning: annotation name used more than once with <office:annotation-end/>: '" +
                            b +
                            "'"
                        )
                      : (d.annotationEndElement = a))
                  : runtime.log(
                      "Warning: annotation end without an annotation start, name: '" +
                        b +
                        "'"
                    )
                : runtime.log("Warning: annotation end without a name found"))),
          (a = h.nextNode());
    }
    function r(a, c) {
      for (var b = a && a.firstChild; b; )
        b.nodeType === Node.ELEMENT_NODE &&
          b.setAttributeNS("urn:webodf:names:scope", "scope", c),
          (b = b.nextSibling);
    }
    function z(a, c) {
      for (
        var b = B.rootElement.meta, b = b && b.firstChild;
        b && (b.namespaceURI !== a || b.localName !== c);

      )
        b = b.nextSibling;
      for (b = b && b.firstChild; b && b.nodeType !== Node.TEXT_NODE; )
        b = b.nextSibling;
      return b ? b.data : null;
    }
    function w(a) {
      var c = {},
        b;
      for (a = a.firstChild; a; )
        a.nodeType === Node.ELEMENT_NODE &&
          a.namespaceURI === p &&
          "font-face" === a.localName &&
          ((b = a.getAttributeNS(p, "name")), (c[b] = a)),
          (a = a.nextSibling);
      return c;
    }
    function v(a, c) {
      var b = null,
        d,
        h,
        e;
      if (a)
        for (b = a.cloneNode(!0), d = b.firstElementChild; d; )
          (h = d.nextElementSibling),
            (e = d.getAttributeNS("urn:webodf:names:scope", "scope")) &&
              e !== c &&
              b.removeChild(d),
            (d = h);
      return b;
    }
    function u(a, c) {
      var b,
        d,
        h,
        e = null,
        m = {};
      if (a)
        for (
          c.forEach(function (a) {
            f.collectUsedFontFaces(m, a);
          }),
            e = a.cloneNode(!0),
            b = e.firstElementChild;
          b;

        )
          (d = b.nextElementSibling),
            (h = b.getAttributeNS(p, "name")),
            m[h] || e.removeChild(b),
            (b = d);
      return e;
    }
    function t(a) {
      var c = B.rootElement.ownerDocument,
        b;
      if (a) {
        h(a.documentElement);
        try {
          b = c.importNode(a.documentElement, !0);
        } catch (d) {}
      }
      return b;
    }
    function A(a) {
      B.state = a;
      if (B.onchange) B.onchange(B);
      if (B.onstatereadychange) B.onstatereadychange(B);
    }
    function I(a) {
      Q = null;
      B.rootElement = a;
      a.fontFaceDecls = n.getDirectChild(
        a,
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "font-face-decls"
      );
      a.styles = n.getDirectChild(
        a,
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "styles"
      );
      a.automaticStyles = n.getDirectChild(
        a,
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "automatic-styles"
      );
      a.masterStyles = n.getDirectChild(
        a,
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "master-styles"
      );
      a.body = n.getDirectChild(
        a,
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "body"
      );
      a.meta = n.getDirectChild(
        a,
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "meta"
      );
      a.settings = n.getDirectChild(
        a,
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "settings"
      );
      a.scripts = n.getDirectChild(
        a,
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "scripts"
      );
      g(a);
    }
    function K(c) {
      var d = t(c),
        h = B.rootElement,
        e;
      d &&
      "document-styles" === d.localName &&
      "urn:oasis:names:tc:opendocument:xmlns:office:1.0" === d.namespaceURI
        ? ((h.fontFaceDecls = n.getDirectChild(
            d,
            "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
            "font-face-decls"
          )),
          b(h, h.fontFaceDecls),
          (e = n.getDirectChild(
            d,
            "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
            "styles"
          )),
          (h.styles =
            e ||
            c.createElementNS(
              "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
              "styles"
            )),
          b(h, h.styles),
          (e = n.getDirectChild(
            d,
            "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
            "automatic-styles"
          )),
          (h.automaticStyles =
            e ||
            c.createElementNS(
              "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
              "automatic-styles"
            )),
          r(h.automaticStyles, "document-styles"),
          b(h, h.automaticStyles),
          (d = n.getDirectChild(
            d,
            "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
            "master-styles"
          )),
          (h.masterStyles =
            d ||
            c.createElementNS(
              "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
              "master-styles"
            )),
          b(h, h.masterStyles),
          f.prefixStyleNames(h.automaticStyles, q, h.masterStyles))
        : A(a.INVALID);
    }
    function L(c) {
      c = t(c);
      var d, h, e, m;
      if (
        c &&
        "document-content" === c.localName &&
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0" === c.namespaceURI
      ) {
        d = B.rootElement;
        e = n.getDirectChild(
          c,
          "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
          "font-face-decls"
        );
        if (d.fontFaceDecls && e) {
          m = d.fontFaceDecls;
          var g,
            k,
            O,
            q,
            D = {};
          h = w(m);
          q = w(e);
          for (e = e.firstElementChild; e; ) {
            g = e.nextElementSibling;
            if (e.namespaceURI === p && "font-face" === e.localName)
              if (((k = e.getAttributeNS(p, "name")), h.hasOwnProperty(k))) {
                if (!e.isEqualNode(h[k])) {
                  O = k;
                  for (
                    var y = h,
                      E = q,
                      u = 0,
                      W = void 0,
                      W = (O = O.replace(/\d+$/, ""));
                    y.hasOwnProperty(W) || E.hasOwnProperty(W);

                  )
                    (u += 1), (W = O + u);
                  O = W;
                  e.setAttributeNS(p, "style:name", O);
                  m.appendChild(e);
                  h[O] = e;
                  delete q[k];
                  D[k] = O;
                }
              } else m.appendChild(e), (h[k] = e), delete q[k];
            e = g;
          }
          m = D;
        } else e && ((d.fontFaceDecls = e), b(d, e));
        h = n.getDirectChild(
          c,
          "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
          "automatic-styles"
        );
        r(h, "document-content");
        m && f.changeFontFaceNames(h, m);
        if (d.automaticStyles && h)
          for (m = h.firstChild; m; )
            d.automaticStyles.appendChild(m), (m = h.firstChild);
        else h && ((d.automaticStyles = h), b(d, h));
        c = n.getDirectChild(
          c,
          "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
          "body"
        );
        if (null === c) throw "<office:body/> tag is mising.";
        d.body = c;
        b(d, d.body);
      } else A(a.INVALID);
    }
    function E(a) {
      a = t(a);
      var c;
      a &&
        "document-meta" === a.localName &&
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0" === a.namespaceURI &&
        ((c = B.rootElement),
        (c.meta = n.getDirectChild(
          a,
          "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
          "meta"
        )),
        b(c, c.meta));
    }
    function N(a) {
      a = t(a);
      var c;
      a &&
        "document-settings" === a.localName &&
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0" === a.namespaceURI &&
        ((c = B.rootElement),
        (c.settings = n.getDirectChild(
          a,
          "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
          "settings"
        )),
        b(c, c.settings));
    }
    function O(a) {
      a = t(a);
      var c;
      if (
        a &&
        "manifest" === a.localName &&
        "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" === a.namespaceURI
      )
        for (
          c = B.rootElement, c.manifest = a, a = c.manifest.firstElementChild;
          a;

        )
          "file-entry" === a.localName &&
            "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" ===
              a.namespaceURI &&
            (M[
              a.getAttributeNS(
                "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
                "full-path"
              )
            ] = a.getAttributeNS(
              "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
              "media-type"
            )),
            (a = a.nextElementSibling);
    }
    function D(a, c, b) {
      a = n.getElementsByTagName(a, c);
      var d;
      for (d = 0; d < a.length; d += 1)
        (c = a[d]),
          b.hasOwnProperty(c.namespaceURI) || c.parentNode.removeChild(c);
    }
    function V(a) {
      D(a, "script", {
        "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0": !0,
        "urn:oasis:names:tc:opendocument:xmlns:office:1.0": !0,
        "urn:oasis:names:tc:opendocument:xmlns:table:1.0": !0,
        "urn:oasis:names:tc:opendocument:xmlns:text:1.0": !0,
        "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0": !0,
      });
      D(a, "style", {
        "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0": !0,
        "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0": !0,
        "urn:oasis:names:tc:opendocument:xmlns:style:1.0": !0,
      });
    }
    function W(a) {
      var c = a.firstElementChild,
        b = [],
        d,
        h,
        e,
        m = a.attributes,
        f = m.length;
      for (d = 0; d < f; d += 1)
        (e = m.item(d)),
          (h = e.localName.substr(0, 2).toLowerCase()),
          null === e.namespaceURI && "on" === h && b.push(e);
      f = b.length;
      for (d = 0; d < f; d += 1) a.removeAttributeNode(b[d]);
      for (; c; ) W(c), (c = c.nextElementSibling);
    }
    function J(c) {
      var b = c.shift();
      b
        ? Y.loadAsDOM(b.path, function (d, h) {
            h && (V(h), W(h.documentElement));
            b.handler(h);
            B.state === a.INVALID
              ? d
                ? runtime.log("ERROR: Unable to load " + b.path + " - " + d)
                : runtime.log("ERROR: Unable to load " + b.path)
              : (d &&
                  runtime.log("DEBUG: Unable to load " + b.path + " - " + d),
                J(c));
          })
        : (g(B.rootElement), A(a.DONE));
    }
    function R(a) {
      var c = "";
      odf.Namespaces.forEachPrefix(function (a, b) {
        c += " xmlns:" + a + '="' + b + '"';
      });
      return (
        '<?xml version="1.0" encoding="UTF-8"?><office:' +
        a +
        " " +
        c +
        ' office:version="1.2">'
      );
    }
    function P() {
      var a = new xmldom.LSSerializer(),
        c = R("document-meta");
      a.filter = new odf.OdfNodeFilter();
      c += a.writeToString(B.rootElement.meta, odf.Namespaces.namespaceMap);
      return c + "</office:document-meta>";
    }
    function aa(a, c) {
      var b = document.createElementNS(
        "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
        "manifest:file-entry"
      );
      b.setAttributeNS(
        "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
        "manifest:full-path",
        a
      );
      b.setAttributeNS(
        "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
        "manifest:media-type",
        c
      );
      return b;
    }
    function S() {
      var a = runtime.parseXML(
          '<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'
        ),
        c = a.documentElement,
        b = new xmldom.LSSerializer(),
        d;
      for (d in M) M.hasOwnProperty(d) && c.appendChild(aa(d, M[d]));
      b.filter = new odf.OdfNodeFilter();
      return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
        b.writeToString(a, odf.Namespaces.namespaceMap)
      );
    }
    function fa() {
      var a,
        c,
        b,
        d = odf.Namespaces.namespaceMap,
        h = new xmldom.LSSerializer(),
        e = R("document-styles");
      c = v(B.rootElement.automaticStyles, "document-styles");
      b = B.rootElement.masterStyles.cloneNode(!0);
      a = u(B.rootElement.fontFaceDecls, [b, B.rootElement.styles, c]);
      f.removePrefixFromStyleNames(c, q, b);
      h.filter = new k(b, c);
      e += h.writeToString(a, d);
      e += h.writeToString(B.rootElement.styles, d);
      e += h.writeToString(c, d);
      e += h.writeToString(b, d);
      return e + "</office:document-styles>";
    }
    function ha() {
      var a,
        c,
        b = odf.Namespaces.namespaceMap,
        h = new xmldom.LSSerializer(),
        e = R("document-content");
      c = v(B.rootElement.automaticStyles, "document-content");
      a = u(B.rootElement.fontFaceDecls, [c]);
      h.filter = new d(B.rootElement.body, c);
      e += h.writeToString(a, b);
      e += h.writeToString(c, b);
      e += h.writeToString(B.rootElement.body, b);
      return e + "</office:document-content>";
    }
    function C(c, b) {
      runtime.loadXML(c, function (c, d) {
        if (c) b(c);
        else if (d) {
          V(d);
          W(d.documentElement);
          var h = t(d);
          h &&
          "document" === h.localName &&
          "urn:oasis:names:tc:opendocument:xmlns:office:1.0" === h.namespaceURI
            ? (I(h), A(a.DONE))
            : A(a.INVALID);
        } else b("No DOM was loaded.");
      });
    }
    function Z(a, c) {
      var d;
      d = B.rootElement;
      var h = d.meta;
      h ||
        ((d.meta = h =
          document.createElementNS(
            "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
            "meta"
          )),
        b(d, h));
      d = h;
      a && n.mapKeyValObjOntoNode(d, a, odf.Namespaces.lookupNamespaceURI);
      c && n.removeKeyElementsFromNode(d, c, odf.Namespaces.lookupNamespaceURI);
    }
    function ba(c, b) {
      function d(a, c) {
        var b;
        c || (c = a);
        b = document.createElementNS(
          "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
          c
        );
        f[a] = b;
        f.appendChild(b);
      }
      var h = new core.Zip("", null),
        e =
          "application/vnd.oasis.opendocument." +
          c +
          (!0 === b ? "-template" : ""),
        m = runtime.byteArrayFromString(e, "utf8"),
        f = B.rootElement,
        g = document.createElementNS(
          "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
          c
        );
      h.save("mimetype", m, !1, new Date());
      d("meta");
      d("settings");
      d("scripts");
      d("fontFaceDecls", "font-face-decls");
      d("styles");
      d("automaticStyles", "automatic-styles");
      d("masterStyles", "master-styles");
      d("body");
      f.body.appendChild(g);
      M["/"] = e;
      M["settings.xml"] = "text/xml";
      M["meta.xml"] = "text/xml";
      M["styles.xml"] = "text/xml";
      M["content.xml"] = "text/xml";
      A(a.DONE);
      return h;
    }
    function U() {
      var a,
        c = new Date();
      if (M["settings.xml"]) {
        a = new xmldom.LSSerializer();
        var b = R("document-settings");
        B.rootElement.settings &&
          B.rootElement.settings.firstElementChild &&
          ((a.filter = new odf.OdfNodeFilter()),
          (b += a.writeToString(
            B.rootElement.settings,
            odf.Namespaces.namespaceMap
          )));
        a = runtime.byteArrayFromString(
          b + "</office:document-settings>",
          "utf8"
        );
        Y.save("settings.xml", a, !0, c);
      } else Y.remove("settings.xml");
      b = runtime.getWindow();
      a = "WebODF/" + webodf.Version;
      b && (a = a + " " + b.navigator.userAgent);
      Z({ "meta:generator": a }, null);
      a = runtime.byteArrayFromString(P(), "utf8");
      Y.save("meta.xml", a, !0, c);
      a = runtime.byteArrayFromString(fa(), "utf8");
      Y.save("styles.xml", a, !0, c);
      a = runtime.byteArrayFromString(ha(), "utf8");
      Y.save("content.xml", a, !0, c);
      a = runtime.byteArrayFromString(S(), "utf8");
      Y.save("META-INF/manifest.xml", a, !0, c);
    }
    function ga(a, c) {
      U();
      Y.writeAs(a, function (a) {
        c(a);
      });
    }
    var B = this,
      Y,
      M = {},
      Q,
      F = "";
    this.onstatereadychange = m;
    this.state = this.onchange = null;
    this.getMetadata = z;
    this.setRootElement = I;
    this.getContentElement = function () {
      var a;
      Q ||
        ((a = B.rootElement.body),
        (Q =
          n.getDirectChild(
            a,
            "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
            "text"
          ) ||
          n.getDirectChild(
            a,
            "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
            "presentation"
          ) ||
          n.getDirectChild(
            a,
            "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
            "spreadsheet"
          )));
      if (!Q) throw "Could not find content element in <office:body/>.";
      return Q;
    };
    this.getDocumentType = function () {
      var a = B.getContentElement();
      return a && a.localName;
    };
    this.isTemplate = function () {
      return "-template" === M["/"].substr(-9);
    };
    this.setIsTemplate = function (a) {
      var c = M["/"],
        b = "-template" === c.substr(-9);
      a !== b &&
        ((c = a ? c + "-template" : c.substr(0, c.length - 9)),
        (M["/"] = c),
        (a = runtime.byteArrayFromString(c, "utf8")),
        Y.save("mimetype", a, !1, new Date()));
    };
    this.getPart = function (a) {
      return new odf.OdfPart(a, M[a], B, Y);
    };
    this.getPartData = function (a, c) {
      Y.load(a, c);
    };
    this.setMetadata = Z;
    this.incrementEditingCycles = function () {
      var a = z(odf.Namespaces.metans, "editing-cycles"),
        a = a ? parseInt(a, 10) : 0;
      isNaN(a) && (a = 0);
      Z({ "meta:editing-cycles": a + 1 }, null);
      return a + 1;
    };
    this.createByteArray = function (a, c) {
      U();
      Y.createByteArray(a, c);
    };
    this.saveAs = ga;
    this.save = function (a) {
      ga(F, a);
    };
    this.getUrl = function () {
      return F;
    };
    this.setBlob = function (a, c, b) {
      b = e.convertBase64ToByteArray(b);
      Y.save(a, b, !1, new Date());
      M.hasOwnProperty(a) && runtime.log(a + " has been overwritten.");
      M[a] = c;
    };
    this.removeBlob = function (a) {
      var c = Y.remove(a);
      runtime.assert(c, "file is not found: " + a);
      delete M[a];
    };
    this.state = a.LOADING;
    this.rootElement = (function (a) {
      var c = document.createElementNS(a.namespaceURI, a.localName),
        b;
      a = new a.Type();
      for (b in a) a.hasOwnProperty(b) && (c[b] = a[b]);
      return c;
    })({
      Type: odf.ODFDocumentElement,
      namespaceURI: odf.ODFDocumentElement.namespaceURI,
      localName: odf.ODFDocumentElement.localName,
    });
    c === odf.OdfContainer.DocumentType.TEXT
      ? (Y = ba("text"))
      : c === odf.OdfContainer.DocumentType.TEXT_TEMPLATE
      ? (Y = ba("text", !0))
      : c === odf.OdfContainer.DocumentType.PRESENTATION
      ? (Y = ba("presentation"))
      : c === odf.OdfContainer.DocumentType.PRESENTATION_TEMPLATE
      ? (Y = ba("presentation", !0))
      : c === odf.OdfContainer.DocumentType.SPREADSHEET
      ? (Y = ba("spreadsheet"))
      : c === odf.OdfContainer.DocumentType.SPREADSHEET_TEMPLATE
      ? (Y = ba("spreadsheet", !0))
      : ((F = c),
        (Y = new core.Zip(F, function (c, b) {
          Y = b;
          c
            ? C(F, function (b) {
                c && ((Y.error = c + "\n" + b), A(a.INVALID));
              })
            : J([
                { path: "styles.xml", handler: K },
                { path: "content.xml", handler: L },
                { path: "meta.xml", handler: E },
                { path: "settings.xml", handler: N },
                { path: "META-INF/manifest.xml", handler: O },
              ]);
        })));
  };
  odf.OdfContainer.EMPTY = 0;
  odf.OdfContainer.LOADING = 1;
  odf.OdfContainer.DONE = 2;
  odf.OdfContainer.INVALID = 3;
  odf.OdfContainer.SAVING = 4;
  odf.OdfContainer.MODIFIED = 5;
  odf.OdfContainer.getContainer = function (a) {
    return new odf.OdfContainer(a, null);
  };
})();
odf.OdfContainer.DocumentType = {
  TEXT: 1,
  TEXT_TEMPLATE: 2,
  PRESENTATION: 3,
  PRESENTATION_TEMPLATE: 4,
  SPREADSHEET: 5,
  SPREADSHEET_TEMPLATE: 6,
};
gui.AnnotatableCanvas = function () {};
gui.AnnotatableCanvas.prototype.refreshSize = function () {};
gui.AnnotatableCanvas.prototype.getZoomLevel = function () {};
gui.AnnotatableCanvas.prototype.getSizer = function () {};
gui.AnnotationViewManager = function (g, k, d, b) {
  function f(c) {
    var b = c.annotationEndElement,
      d = l.createRange(),
      e = c.getAttributeNS(odf.Namespaces.officens, "name");
    b &&
      (d.setStart(c, c.childNodes.length),
      d.setEnd(b, 0),
      (c = a.getTextNodes(d, !1)),
      c.forEach(function (a) {
        var c;
        a: {
          for (
            c = a.parentNode;
            c.namespaceURI !== odf.Namespaces.officens ||
            "body" !== c.localName;

          ) {
            if (
              "http://www.w3.org/1999/xhtml" === c.namespaceURI &&
              "webodf-annotationHighlight" === c.className &&
              c.getAttribute("annotation") === e
            ) {
              c = !0;
              break a;
            }
            c = c.parentNode;
          }
          c = !1;
        }
        c ||
          ((c = l.createElement("span")),
          (c.className = "webodf-annotationHighlight"),
          c.setAttribute("annotation", e),
          a.parentNode.replaceChild(c, a),
          c.appendChild(a));
      }));
    d.detach();
  }
  function n(a) {
    var b = g.getSizer();
    a
      ? ((d.style.display = "inline-block"),
        (b.style.paddingRight = c.getComputedStyle(d).width))
      : ((d.style.display = "none"), (b.style.paddingRight = 0));
    g.refreshSize();
  }
  function p() {
    e.sort(function (a, c) {
      return 0 !==
        (a.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING)
        ? -1
        : 1;
    });
  }
  function r() {
    var a;
    for (a = 0; a < e.length; a += 1) {
      var c = e[a],
        b = c.parentNode,
        f = b.nextElementSibling,
        l = f.nextElementSibling,
        n = b.parentNode,
        k = 0,
        k = e[e.indexOf(c) - 1],
        r = void 0,
        c = g.getZoomLevel();
      b.style.left =
        (d.getBoundingClientRect().left - n.getBoundingClientRect().left) / c +
        "px";
      b.style.width = d.getBoundingClientRect().width / c + "px";
      f.style.width = parseFloat(b.style.left) - 30 + "px";
      k
        ? ((r = k.parentNode.getBoundingClientRect()),
          20 >= (n.getBoundingClientRect().top - r.bottom) / c
            ? (b.style.top =
                Math.abs(n.getBoundingClientRect().top - r.bottom) / c +
                20 +
                "px")
            : (b.style.top = "0px"))
        : (b.style.top = "0px");
      l.style.left = f.getBoundingClientRect().width / c + "px";
      var f = l.style,
        n = l.getBoundingClientRect().left / c,
        k = l.getBoundingClientRect().top / c,
        r = b.getBoundingClientRect().left / c,
        p = b.getBoundingClientRect().top / c,
        q = 0,
        I = 0,
        q = r - n,
        q = q * q,
        I = p - k,
        I = I * I,
        n = Math.sqrt(q + I);
      f.width = n + "px";
      k = Math.asin(
        (b.getBoundingClientRect().top - l.getBoundingClientRect().top) /
          (c * parseFloat(l.style.width))
      );
      l.style.transform = "rotate(" + k + "rad)";
      l.style.MozTransform = "rotate(" + k + "rad)";
      l.style.WebkitTransform = "rotate(" + k + "rad)";
      l.style.msTransform = "rotate(" + k + "rad)";
    }
  }
  function q(a) {
    var c = e.indexOf(a),
      b = a.parentNode.parentNode;
    "div" === b.localName &&
      (b.parentNode.insertBefore(a, b), b.parentNode.removeChild(b));
    a = a.getAttributeNS(odf.Namespaces.officens, "name");
    a = l.querySelectorAll(
      'span.webodf-annotationHighlight[annotation="' + a + '"]'
    );
    for (var d, b = 0; b < a.length; b += 1) {
      for (d = a.item(b); d.firstChild; )
        d.parentNode.insertBefore(d.firstChild, d);
      d.parentNode.removeChild(d);
    }
    -1 !== c && e.splice(c, 1);
    0 === e.length && n(!1);
  }
  var e = [],
    l = k.ownerDocument,
    a = odf.OdfUtils,
    c = runtime.getWindow();
  runtime.assert(
    Boolean(c),
    "Expected to be run in an environment which has a global window, like a browser."
  );
  this.rerenderAnnotations = r;
  this.rehighlightAnnotations = function () {
    e.forEach(function (a) {
      f(a);
    });
  };
  this.getMinimumHeightForAnnotationPane = function () {
    return "none" !== d.style.display && 0 < e.length
      ? (e[e.length - 1].parentNode.getBoundingClientRect().bottom -
          d.getBoundingClientRect().top) /
          g.getZoomLevel() +
          "px"
      : null;
  };
  this.addAnnotations = function (c) {
    0 !== c.length &&
      (n(!0),
      c.forEach(function (c) {
        e.push(c);
        var d = l.createElement("div"),
          m = l.createElement("div"),
          n = l.createElement("div"),
          g = l.createElement("div"),
          k;
        d.className = "annotationWrapper";
        d.setAttribute("creator", a.getAnnotationCreator(c));
        c.parentNode.insertBefore(d, c);
        m.className = "annotationNote";
        m.appendChild(c);
        b &&
          ((k = l.createElement("div")),
          (k.className = "annotationRemoveButton"),
          m.appendChild(k));
        n.className = "annotationConnector horizontal";
        g.className = "annotationConnector angular";
        d.appendChild(m);
        d.appendChild(n);
        d.appendChild(g);
        c.annotationEndElement && f(c);
      }),
      p(),
      r());
  };
  this.forgetAnnotation = q;
  this.forgetAnnotations = function () {
    for (; e.length; ) q(e[0]);
  };
};
gui.Viewport = function () {};
gui.Viewport.prototype.scrollIntoView = function (g, k) {};
gui.SingleScrollViewport = function (g) {
  this.scrollIntoView = function (k, d) {
    var b, f, n, p;
    p = g.offsetHeight - g.clientHeight;
    n = g.offsetWidth - g.clientWidth;
    var r = g.getBoundingClientRect();
    if (k && r) {
      b = r.left + 5;
      f = r.top + 5;
      n = r.right - (n + 5);
      p = r.bottom - (p + 5);
      if (d || k.top < f) g.scrollTop -= f - k.top;
      else if (k.top > p || k.bottom > p)
        g.scrollTop =
          k.bottom - k.top <= p - f
            ? g.scrollTop + (k.bottom - p)
            : g.scrollTop + (k.top - f);
      k.left < b
        ? (g.scrollLeft -= b - k.left)
        : k.right > n &&
          (g.scrollLeft =
            k.right - k.left <= n - b
              ? g.scrollLeft + (k.right - n)
              : g.scrollLeft - (b - k.left));
    }
  };
};
(function () {
  function g(d, n, k, r, q) {
    var e,
      l = 0,
      a;
    for (a in d)
      if (d.hasOwnProperty(a)) {
        if (l === k) {
          e = a;
          break;
        }
        l += 1;
      }
    e
      ? n.getPartData(d[e].href, function (a, m) {
          if (a) runtime.log(a);
          else if (m) {
            var h =
              "@font-face { font-family: " +
              (d[e].family || e) +
              "; src: url(data:application/x-font-ttf;charset=binary;base64," +
              b.convertUTF8ArrayToBase64(m) +
              ') format("truetype"); }';
            try {
              r.insertRule(h, r.cssRules.length);
            } catch (l) {
              runtime.log(
                "Problem inserting rule in CSS: " +
                  runtime.toJson(l) +
                  "\nRule: " +
                  h
              );
            }
          } else runtime.log("missing font data for " + d[e].href);
          g(d, n, k + 1, r, q);
        })
      : q && q();
  }
  var k = xmldom.XPath,
    d = odf.OdfUtils,
    b = new core.Base64();
  odf.FontLoader = function () {
    this.loadFonts = function (b, n) {
      for (var p = b.rootElement.fontFaceDecls; n.cssRules.length; )
        n.deleteRule(n.cssRules.length - 1);
      if (p) {
        var r = {},
          q,
          e,
          l,
          a;
        if (p)
          for (
            p = k.getODFElementsWithXPath(
              p,
              "style:font-face[svg:font-face-src]",
              odf.Namespaces.lookupNamespaceURI
            ),
              q = 0;
            q < p.length;
            q += 1
          )
            (e = p[q]),
              (l = e.getAttributeNS(odf.Namespaces.stylens, "name")),
              (a = d.getNormalizedFontFamilyName(
                e.getAttributeNS(odf.Namespaces.svgns, "font-family")
              )),
              (e = k.getODFElementsWithXPath(
                e,
                "svg:font-face-src/svg:font-face-uri",
                odf.Namespaces.lookupNamespaceURI
              )),
              0 < e.length &&
                ((e = e[0].getAttributeNS(odf.Namespaces.xlinkns, "href")),
                (r[l] = { href: e, family: a }));
        g(r, b, 0, n);
      }
    };
  };
})();
odf.Formatting = function () {
  function g(a) {
    return (a = A[a]) ? u.mergeObjects({}, a) : {};
  }
  function k() {
    for (
      var c = a.rootElement.fontFaceDecls,
        b = {},
        d,
        e,
        c = c && c.firstElementChild;
      c;

    ) {
      if ((d = c.getAttributeNS(h, "name")))
        if (
          (e = c.getAttributeNS(m, "font-family")) ||
          0 < c.getElementsByTagNameNS(m, "font-face-uri").length
        )
          b[d] = e;
      c = c.nextElementSibling;
    }
    return b;
  }
  function d(c) {
    for (var b = a.rootElement.styles.firstElementChild; b; ) {
      if (
        b.namespaceURI === h &&
        "default-style" === b.localName &&
        b.getAttributeNS(h, "family") === c
      )
        return b;
      b = b.nextElementSibling;
    }
    return null;
  }
  function b(c, b, d) {
    var e, m, l;
    d = d || [a.rootElement.automaticStyles, a.rootElement.styles];
    for (l = 0; l < d.length; l += 1)
      for (e = d[l], e = e.firstElementChild; e; ) {
        m = e.getAttributeNS(h, "name");
        if (
          (e.namespaceURI === h &&
            "style" === e.localName &&
            e.getAttributeNS(h, "family") === b &&
            m === c) ||
          ("list-style" === b &&
            e.namespaceURI === y &&
            "list-style" === e.localName &&
            m === c) ||
          ("data" === b && e.namespaceURI === x && m === c)
        )
          return e;
        e = e.nextElementSibling;
      }
    return null;
  }
  function f(a) {
    for (var c, b, d, e, m = {}, l = a.firstElementChild; l; ) {
      if (l.namespaceURI === h)
        for (
          d = m[l.nodeName] = {}, b = l.attributes, c = 0;
          c < b.length;
          c += 1
        )
          (e = b.item(c)), (d[e.name] = e.value);
      l = l.nextElementSibling;
    }
    b = a.attributes;
    for (c = 0; c < b.length; c += 1) (e = b.item(c)), (m[e.name] = e.value);
    return m;
  }
  function n(c, e) {
    for (
      var m = a.rootElement.styles,
        l,
        n = {},
        k = c.getAttributeNS(h, "family"),
        r = c;
      r;

    )
      (l = f(r)),
        (n = u.mergeObjects(l, n)),
        (r = (l = r.getAttributeNS(h, "parent-style-name"))
          ? b(l, k, [m])
          : null);
    if ((r = d(k))) (l = f(r)), (n = u.mergeObjects(l, n));
    !1 !== e && ((l = g(k)), (n = u.mergeObjects(l, n)));
    return n;
  }
  function p(b, d) {
    function h(a) {
      Object.keys(a).forEach(function (c) {
        Object.keys(a[c]).forEach(function (a) {
          f += "|" + c + ":" + a + "|";
        });
      });
    }
    for (
      var e = b.nodeType === Node.TEXT_NODE ? b.parentNode : b,
        m,
        l = [],
        f = "",
        n = !1;
      e && !w.isInlineRoot(e) && e.parentNode !== a.rootElement;

    )
      !n && w.isGroupingElement(e) && (n = !0),
        (m = c.determineStylesForNode(e)) && l.push(m),
        (e = e.parentNode);
    n && (l.forEach(h), d && (d[f] = l));
    return n ? l : void 0;
  }
  function r(c) {
    var d = { orderedStyles: [], styleProperties: {} };
    c.forEach(function (c) {
      Object.keys(c).forEach(function (e) {
        var m = Object.keys(c[e])[0],
          l = { name: m, family: e, displayName: void 0, isCommonStyle: !1 },
          f;
        (f = b(m, e))
          ? ((e = n(f)),
            (d.styleProperties = u.mergeObjects(e, d.styleProperties)),
            (l.displayName = f.getAttributeNS(h, "display-name") || void 0),
            (l.isCommonStyle = f.parentNode === a.rootElement.styles))
          : runtime.log(
              "No style element found for '" + m + "' of family '" + e + "'"
            );
        d.orderedStyles.push(l);
      });
    });
    return d;
  }
  function q(a, c) {
    var b = {},
      d = [];
    c || (c = {});
    a.forEach(function (a) {
      p(a, b);
    });
    Object.keys(b).forEach(function (a) {
      c[a] || (c[a] = r(b[a]));
      d.push(c[a]);
    });
    return d;
  }
  function e(c) {
    for (
      var b = a.rootElement.masterStyles.firstElementChild;
      b &&
      (b.namespaceURI !== h ||
        "master-page" !== b.localName ||
        b.getAttributeNS(h, "name") !== c);

    )
      b = b.nextElementSibling;
    return b;
  }
  function l(a, c) {
    var b;
    a && (b = t.convertMeasure(a, "px"));
    void 0 === b && c && (b = t.convertMeasure(c, "px"));
    return b;
  }
  var a,
    c = new odf.StyleInfo(),
    m = odf.Namespaces.svgns,
    h = odf.Namespaces.stylens,
    y = odf.Namespaces.textns,
    x = odf.Namespaces.numberns,
    z = odf.Namespaces.fons,
    w = odf.OdfUtils,
    v = core.DomUtils,
    u = new core.Utils(),
    t = new core.CSSUnits(),
    A = {
      paragraph: { "style:paragraph-properties": { "fo:text-align": "left" } },
    };
  this.getSystemDefaultStyleAttributes = g;
  this.setOdfContainer = function (c) {
    a = c;
  };
  this.getFontMap = k;
  this.getAvailableParagraphStyles = function () {
    for (
      var c = a.rootElement.styles, b, d, e = [], c = c && c.firstElementChild;
      c;

    )
      "style" === c.localName &&
        c.namespaceURI === h &&
        ((b = c.getAttributeNS(h, "family")),
        "paragraph" === b &&
          ((b = c.getAttributeNS(h, "name")),
          (d = c.getAttributeNS(h, "display-name") || b),
          b && d && e.push({ name: b, displayName: d }))),
        (c = c.nextElementSibling);
    return e;
  };
  this.isStyleUsed = function (b) {
    var d,
      e = a.rootElement;
    d = c.hasDerivedStyles(e, odf.Namespaces.lookupNamespaceURI, b);
    b =
      new c.UsedStyleList(e.styles).uses(b) ||
      new c.UsedStyleList(e.automaticStyles).uses(b) ||
      new c.UsedStyleList(e.body).uses(b);
    return d || b;
  };
  this.getDefaultStyleElement = d;
  this.getStyleElement = b;
  this.getStyleAttributes = f;
  this.getInheritedStyleAttributes = n;
  this.getFirstCommonParentStyleNameOrSelf = function (c) {
    var d = a.rootElement.styles,
      e;
    if ((e = b(c, "paragraph", [a.rootElement.automaticStyles])))
      if (((c = e.getAttributeNS(h, "parent-style-name")), !c)) return null;
    return (e = b(c, "paragraph", [d])) ? c : null;
  };
  this.hasParagraphStyle = function (a) {
    return Boolean(b(a, "paragraph"));
  };
  this.getAppliedStyles = q;
  this.getAppliedStylesForElement = function (a, c) {
    return q([a], c)[0];
  };
  this.updateStyle = function (c, b) {
    var d, e;
    v.mapObjOntoNode(c, b, odf.Namespaces.lookupNamespaceURI);
    (d = (d = b["style:text-properties"]) && d["style:font-name"]) &&
      !k().hasOwnProperty(d) &&
      ((e = c.ownerDocument.createElementNS(h, "style:font-face")),
      e.setAttributeNS(h, "style:name", d),
      e.setAttributeNS(m, "svg:font-family", d),
      a.rootElement.fontFaceDecls.appendChild(e));
  };
  this.createDerivedStyleObject = function (c, d, e) {
    var h = b(c, d);
    runtime.assert(
      Boolean(h),
      "No style element found for '" + c + "' of family '" + d + "'"
    );
    c =
      h.parentNode === a.rootElement.styles
        ? { "style:parent-style-name": c }
        : f(h);
    c["style:family"] = d;
    u.mergeObjects(c, e);
    return c;
  };
  this.getDefaultTabStopDistance = function () {
    for (var a = d("paragraph"), a = a && a.firstElementChild, c; a; )
      a.namespaceURI === h &&
        "paragraph-properties" === a.localName &&
        (c = a.getAttributeNS(h, "tab-stop-distance")),
        (a = a.nextElementSibling);
    c || (c = "1.25cm");
    return w.parseNonNegativeLength(c);
  };
  this.getMasterPageElement = e;
  this.getContentSize = function (c, d) {
    var m, f, n, g, k, r, p, q, y, u;
    a: {
      f = b(c, d);
      runtime.assert(
        "paragraph" === d || "table" === d,
        "styleFamily must be either paragraph or table"
      );
      if (f) {
        if ((f = f.getAttributeNS(h, "master-page-name")))
          (m = e(f)) ||
            runtime.log("WARN: No master page definition found for " + f);
        m || (m = e("Standard"));
        m ||
          (m = a.rootElement.masterStyles.getElementsByTagNameNS(
            h,
            "master-page"
          )[0]) ||
          runtime.log("WARN: Document has no master pages defined");
        if (m)
          for (
            f = m.getAttributeNS(h, "page-layout-name"),
              n = a.rootElement.automaticStyles.getElementsByTagNameNS(
                h,
                "page-layout"
              ),
              g = 0;
            g < n.length;
            g += 1
          )
            if (((m = n.item(g)), m.getAttributeNS(h, "name") === f)) break a;
      }
      m = null;
    }
    m || (m = v.getDirectChild(a.rootElement.styles, h, "default-page-layout"));
    (m = v.getDirectChild(m, h, "page-layout-properties"))
      ? ("landscape" === m.getAttributeNS(h, "print-orientation")
          ? ((f = "29.7cm"), (n = "21.001cm"))
          : ((f = "21.001cm"), (n = "29.7cm")),
        (f = l(m.getAttributeNS(z, "page-width"), f)),
        (n = l(m.getAttributeNS(z, "page-height"), n)),
        (g = l(m.getAttributeNS(z, "margin"))),
        void 0 === g
          ? ((g = l(m.getAttributeNS(z, "margin-left"), "2cm")),
            (k = l(m.getAttributeNS(z, "margin-right"), "2cm")),
            (r = l(m.getAttributeNS(z, "margin-top"), "2cm")),
            (p = l(m.getAttributeNS(z, "margin-bottom"), "2cm")))
          : (g = k = r = p = g),
        (q = l(m.getAttributeNS(z, "padding"))),
        void 0 === q
          ? ((q = l(m.getAttributeNS(z, "padding-left"), "0cm")),
            (y = l(m.getAttributeNS(z, "padding-right"), "0cm")),
            (u = l(m.getAttributeNS(z, "padding-top"), "0cm")),
            (m = l(m.getAttributeNS(z, "padding-bottom"), "0cm")))
          : (q = y = u = m = q))
      : ((f = l("21.001cm")),
        (n = l("29.7cm")),
        (g = k = r = p = g = l("2cm")),
        (q = y = u = m = q = l("0cm")));
    return { width: f - g - k - q - y, height: n - r - p - u - m };
  };
};
(function () {
  var g = odf.Namespaces.stylens,
    k = odf.Namespaces.textns,
    d = {
      graphic: "draw",
      "drawing-page": "draw",
      paragraph: "text",
      presentation: "presentation",
      ruby: "text",
      section: "text",
      table: "table",
      "table-cell": "table",
      "table-column": "table",
      "table-row": "table",
      text: "text",
      list: "text",
      page: "office",
    };
  odf.StyleTreeNode = function (b) {
    this.derivedStyles = {};
    this.element = b;
  };
  odf.StyleTree = function (b, f) {
    function n(b) {
      var a,
        c,
        d,
        e = {};
      if (!b) return e;
      for (b = b.firstElementChild; b; ) {
        if (
          (c =
            b.namespaceURI !== g ||
            ("style" !== b.localName && "default-style" !== b.localName)
              ? b.namespaceURI === k && "list-style" === b.localName
                ? "list"
                : b.namespaceURI !== g ||
                  ("page-layout" !== b.localName &&
                    "default-page-layout" !== b.localName)
                ? void 0
                : "page"
              : b.getAttributeNS(g, "family"))
        )
          (a = b.getAttributeNS(g, "name")) || (a = ""),
            e.hasOwnProperty(c) ? (d = e[c]) : (e[c] = d = {}),
            (d[a] = b);
        b = b.nextElementSibling;
      }
      return e;
    }
    function p(b, a) {
      if (b.hasOwnProperty(a)) return b[a];
      var c = null,
        d = Object.keys(b),
        e;
      for (e = 0; e < d.length && !(c = p(b[d[e]].derivedStyles, a)); e += 1);
      return c;
    }
    function r(b, a, c) {
      var d, e, f;
      if (!a.hasOwnProperty(b)) return null;
      d = new odf.StyleTreeNode(a[b]);
      e = d.element.getAttributeNS(g, "parent-style-name");
      f = null;
      e && (f = p(c, e) || r(e, a, c));
      f ? (f.derivedStyles[b] = d) : (c[b] = d);
      delete a[b];
      return d;
    }
    function q(b, a) {
      b &&
        Object.keys(b).forEach(function (c) {
          r(c, b, a);
        });
    }
    var e = {};
    this.getStyleTree = function () {
      return e;
    };
    (function () {
      var l, a, c;
      a = n(b);
      c = n(f);
      Object.keys(d).forEach(function (b) {
        l = e[b] = {};
        q(a[b], l);
        q(c[b], l);
      });
    })();
  };
})();
(function () {
  function g(b, d) {
    try {
      b.insertRule(d, b.cssRules.length);
    } catch (f) {
      runtime.log("cannot load rule: " + d + " - " + f);
    }
  }
  function k(b, d) {
    this.listCounterCount = 0;
    this.contentRules = b;
    this.counterIdStack = [];
    this.continuedCounterIdStack = d;
  }
  function d(b) {
    function d(c, h, f, l) {
      var k = h.namespaceURI === n && "list" === h.localName,
        r = h.namespaceURI === n && "list-item" === h.localName;
      if (k || r) {
        if (k) {
          var k = (f += 1),
            p,
            u,
            t;
          l.listCounterCount += 1;
          r = c + "-level" + k + "-" + l.listCounterCount;
          h.setAttributeNS("urn:webodf:names:helper", "counter-id", r);
          p = l.continuedCounterIdStack.shift();
          p ||
            ((p = r),
            (a += r + " 1 "),
            (u =
              'text|list[webodfhelper|counter-id="' +
              r +
              '"] > text|list-item:first-child > :not(text|list):first-child:before'),
            (u += "{"),
            (u += "counter-increment: " + p + " 0;"),
            (u += "}"),
            g(b, u));
          for (; l.counterIdStack.length >= k; ) l.counterIdStack.pop();
          l.counterIdStack.push(p);
          t = l.contentRules[k.toString()] || "";
          for (u = 1; u <= k; u += 1)
            t = t.replace(u + "webodf-listLevel", l.counterIdStack[u - 1]);
          u =
            'text|list[webodfhelper|counter-id="' +
            r +
            '"] > text|list-item > :not(text|list):first-child:before';
          u += "{";
          u += t;
          u += "counter-increment: " + p + ";";
          u += "}";
          g(b, u);
        }
        for (h = h.firstElementChild; h; )
          d(c, h, f, l), (h = h.nextElementSibling);
      } else l.continuedCounterIdStack = [];
    }
    var f = 0,
      a = "",
      c = {};
    this.createCounterRules = function (a, b, n) {
      var g = b.getAttributeNS(p, "id"),
        r = [];
      n &&
        ((n = n.getAttributeNS("urn:webodf:names:helper", "counter-id")),
        (r = c[n].slice(0)));
      a = new k(a, r);
      g ? (g = "Y" + g) : ((f += 1), (g = "X" + f));
      d(g, b, 0, a);
      c[g + "-level1-1"] = a.counterIdStack;
    };
    this.initialiseCreatedCounters = function () {
      var c;
      c = "office|document{" + ("counter-reset: " + a + ";");
      c += "}";
      g(b, c);
    };
  }
  var b = odf.Namespaces.fons,
    f = odf.Namespaces.stylens,
    n = odf.Namespaces.textns,
    p = odf.Namespaces.xmlns,
    r = {
      1: "decimal",
      a: "lower-latin",
      A: "upper-latin",
      i: "lower-roman",
      I: "upper-roman",
    };
  odf.ListStyleToCss = function () {
    function k(a) {
      var b = m.parseLength(a);
      return b
        ? c.convert(b.value, b.unit, "px")
        : (runtime.log("Could not parse value '" + a + "'."), 0);
    }
    function e(a) {
      return a.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    }
    function l(a, c) {
      var b;
      a && (b = a.getAttributeNS(n, "style-name"));
      return b === c;
    }
    function a(a, c, b) {
      c = c.getElementsByTagNameNS(n, "list");
      a = new d(a);
      var m,
        g,
        k,
        q,
        t,
        A,
        I = {},
        K;
      for (K = 0; K < c.length; K += 1)
        if (((m = c.item(K)), (A = m.getAttributeNS(n, "style-name")))) {
          k = m.getAttributeNS(n, "continue-numbering");
          q = m.getAttributeNS(n, "continue-list");
          (t = m.getAttributeNS(p, "id")) && (I[t] = m);
          t = b[A].element.firstElementChild;
          for (var L = void 0, E = {}; t; ) {
            var L = (L = t.getAttributeNS(n, "level")) && parseInt(L, 10),
              N = t,
              O = "",
              D = void 0,
              V = void 0,
              W = (D = void 0);
            if ("list-level-style-number" === N.localName) {
              var J = N,
                O = J.getAttributeNS(f, "num-format"),
                D = J.getAttributeNS(f, "num-suffix") || "",
                V = J.getAttributeNS(f, "num-prefix") || "",
                R = "",
                P = J.getAttributeNS(n, "level"),
                J = J.getAttributeNS(n, "display-levels");
              V && (R += '"' + e(V) + '"\n');
              if (r.hasOwnProperty(O))
                for (
                  P = P ? parseInt(P, 10) : 1, J = J ? parseInt(J, 10) : 1;
                  0 < J;

                )
                  (R +=
                    " counter(" +
                    (P - J + 1) +
                    "webodf-listLevel," +
                    r[O] +
                    ")"),
                    1 < J && (R += '"."'),
                    --J;
              else R = O ? R + (' "' + O + '"') : R + ' ""';
              O = "content:" + R + ' "' + e(D) + '"';
            } else
              "list-level-style-image" === N.localName
                ? (O = "content: none")
                : "list-level-style-bullet" === N.localName &&
                  ((O = N.getAttributeNS(n, "bullet-char")),
                  (O = 'content: "' + e(O) + '"'));
            if ((D = N.getElementsByTagNameNS(f, "list-level-properties")[0]))
              (V = D.getAttributeNS(n, "list-level-position-and-space-mode")),
                "label-alignment" === V &&
                  ((D = D.getElementsByTagNameNS(
                    f,
                    "list-level-label-alignment"
                  )[0]) && (W = D.getAttributeNS(n, "label-followed-by")),
                  "space" === W && (O += ' "\\a0"'));
            E[L] = "\n" + O + ";\n";
            t = t.nextElementSibling;
          }
          t = E;
          k && !q && l(g, A)
            ? a.createCounterRules(t, m, g)
            : q && l(I[q], A)
            ? a.createCounterRules(t, m, I[q])
            : a.createCounterRules(t, m);
          g = m;
        }
      a.initialiseCreatedCounters();
    }
    var c = new core.CSSUnits(),
      m = odf.OdfUtils;
    this.applyListStyles = function (c, d, e) {
      var m, l;
      (m = d.list) &&
        Object.keys(m).forEach(function (a) {
          l = m[a];
          for (var d = l.element.firstElementChild; d; ) {
            if (d.namespaceURI === n) {
              for (
                var e = c,
                  r = d,
                  p = 'text|list[text|style-name="' + a + '"]',
                  y = r.getAttributeNS(n, "level"),
                  x = void 0,
                  E = void 0,
                  N = (E = void 0),
                  O = void 0,
                  D = void 0,
                  V = (x = void 0),
                  W = void 0,
                  J = void 0,
                  R = void 0,
                  O = void 0,
                  N =
                    (E = r.getElementsByTagNameNS(
                      f,
                      "list-level-properties"
                    )[0]) &&
                    E.getAttributeNS(n, "list-level-position-and-space-mode"),
                  O =
                    E &&
                    E.getElementsByTagNameNS(
                      f,
                      "list-level-label-alignment"
                    )[0],
                  x = (y = y && parseInt(y, 10));
                1 < x;

              )
                (p += " > text|list-item > text|list"), --x;
              x = (E && E.getAttributeNS(b, "text-align")) || "left";
              switch (x) {
                case "end":
                  x = "right";
                  break;
                case "start":
                  x = "left";
              }
              "label-alignment" === N
                ? ((D = (O && O.getAttributeNS(b, "margin-left")) || "0px"),
                  (J = (O && O.getAttributeNS(b, "text-indent")) || "0px"),
                  (R = O && O.getAttributeNS(n, "label-followed-by")),
                  (O = k(D)))
                : ((D = (E && E.getAttributeNS(n, "space-before")) || "0px"),
                  (V = (E && E.getAttributeNS(n, "min-label-width")) || "0px"),
                  (W =
                    (E && E.getAttributeNS(n, "min-label-distance")) || "0px"),
                  (O = k(D) + k(V)));
              E = p + " > text|list-item";
              E += "{";
              E += "margin-left: " + O + "px;";
              E += "}";
              g(e, E);
              E = p + " > text|list-item > text|list";
              E += "{";
              E += "margin-left: " + -O + "px;";
              E += "}";
              g(e, E);
              E = p + " > text|list-item > :not(text|list):first-child:before";
              E += "{";
              E += "text-align: " + x + ";";
              E += "display: inline-block;";
              "label-alignment" === N
                ? ((E += "margin-left: " + J + ";"),
                  "listtab" === R && (E += "padding-right: 0.2cm;"))
                : ((E += "min-width: " + V + ";"),
                  (E +=
                    "margin-left: " +
                    (0 === parseFloat(V) ? "" : "-") +
                    V +
                    ";"),
                  (E += "padding-right: " + W + ";"));
              E += "}";
              g(e, E);
            }
            d = d.nextElementSibling;
          }
        });
      a(c, e, m);
    };
  };
})();
odf.LazyStyleProperties = function (g, k) {
  var d = {};
  this.value = function (b) {
    var f;
    d.hasOwnProperty(b)
      ? (f = d[b])
      : ((f = k[b]()), void 0 === f && g && (f = g.value(b)), (d[b] = f));
    return f;
  };
  this.reset = function (b) {
    g = b;
    d = {};
  };
};
odf.StyleParseUtils = function () {
  function g(d) {
    var b, f;
    d = (d =
      /(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px))/.exec(
        d
      ))
      ? { value: parseFloat(d[1]), unit: d[3] }
      : null;
    f = d && d.unit;
    "px" === f
      ? (b = d.value)
      : "cm" === f
      ? (b = (d.value / 2.54) * 96)
      : "mm" === f
      ? (b = (d.value / 25.4) * 96)
      : "in" === f
      ? (b = 96 * d.value)
      : "pt" === f
      ? (b = d.value / 0.75)
      : "pc" === f && (b = 16 * d.value);
    return b;
  }
  var k = odf.Namespaces.stylens;
  this.parseLength = g;
  this.parsePositiveLengthOrPercent = function (d, b, f) {
    var n;
    d &&
      ((n = parseFloat(d.substr(0, d.indexOf("%")))), isNaN(n) && (n = void 0));
    var k;
    void 0 !== n
      ? (f && (k = f.value(b)), (n = void 0 === k ? void 0 : (k / 100) * n))
      : (n = g(d));
    return n;
  };
  this.getPropertiesElement = function (d, b, f) {
    for (
      b = f ? f.nextElementSibling : b.firstElementChild;
      null !== b && (b.localName !== d || b.namespaceURI !== k);

    )
      b = b.nextElementSibling;
    return b;
  };
  this.parseAttributeList = function (d) {
    d && (d = d.replace(/^\s*(.*?)\s*$/g, "$1"));
    return d && 0 < d.length ? d.split(/\s+/) : [];
  };
};
odf.Style2CSS = function () {
  function g(a, c, b) {
    var d = [];
    b = b.derivedStyles;
    var e;
    var h = z[a],
      m;
    void 0 === h
      ? (c = null)
      : ((m = c ? "[" + h + '|style-name="' + c + '"]' : ""),
        "presentation" === h &&
          ((h = "draw"),
          (m = c ? '[presentation|style-name="' + c + '"]' : "")),
        (c = h + "|" + w[a].join(m + "," + h + "|") + m));
    null !== c && d.push(c);
    for (e in b)
      b.hasOwnProperty(e) && ((c = g(a, e, b[e])), (d = d.concat(c)));
    return d;
  }
  function k(a) {
    var c = "",
      b = "",
      c = null;
    if ("default-style" === a.localName) return null;
    c = a.getAttributeNS(l, "parent-style-name");
    b = a.getAttributeNS(l, "family");
    return (c = S.getODFElementsWithXPath(
      P,
      c
        ? "//style:*[@style:name='" + c + "'][@style:family='" + b + "']"
        : "//style:default-style[@style:family='" + b + "']",
      odf.Namespaces.lookupNamespaceURI
    )[0]);
  }
  function d(a, c) {
    var b = "",
      d,
      e,
      h;
    for (d = 0; d < c.length; d += 1)
      if (((e = c[d]), (h = a.getAttributeNS(e[0], e[1])))) {
        h = h.trim();
        if (D.hasOwnProperty(e[1])) {
          var m = h,
            f = m.indexOf(" "),
            n = void 0;
          h = void 0;
          -1 !== f
            ? ((n = m.substring(0, f)), (h = m.substring(f)))
            : ((n = m), (h = ""));
          (n = J.parseLength(n)) &&
            "pt" === n.unit &&
            0.75 > n.value &&
            (m = "0.75pt" + h);
          h = m;
        } else if (V.hasOwnProperty(e[1])) {
          var m = a,
            f = e[0],
            n = e[1],
            g = J.parseLength(h),
            r = void 0,
            p = void 0,
            q = void 0,
            O = void 0,
            q = void 0;
          if (g && "%" === g.unit) {
            r = g.value / 100;
            p = k(m.parentNode);
            for (O = "0"; p; ) {
              if ((q = y.getDirectChild(p, l, "paragraph-properties")))
                if ((q = J.parseLength(q.getAttributeNS(f, n)))) {
                  if ("%" !== q.unit) {
                    O = q.value * r + q.unit;
                    break;
                  }
                  r *= q.value / 100;
                }
              p = k(p);
            }
            h = O;
          }
        }
        e[2] && (b += e[2] + ":" + h + ";");
      }
    return b;
  }
  function b(a, c, b, d) {
    return c + c + b + b + d + d;
  }
  function f(a, c) {
    var b = [a],
      d = c.derivedStyles;
    Object.keys(d).forEach(function (a) {
      a = f(a, d[a]);
      b = b.concat(a);
    });
    return b;
  }
  function n(a, c, b, d) {
    function e(c, b) {
      var d = [],
        h;
      c.forEach(function (a) {
        m.forEach(function (c) {
          d.push(
            'draw|page[webodfhelper|page-style-name="' +
              c +
              '"] draw|frame[presentation|class="' +
              a +
              '"]'
          );
        });
      });
      0 < d.length &&
        ((h = d.join(",") + "{visibility:" + b + ";}"),
        a.insertRule(h, a.cssRules.length));
    }
    var m = f(c, d),
      l = [],
      n = [];
    ["page-number", "date-time", "header", "footer"].forEach(function (a) {
      var c;
      c = b.getAttributeNS(h, "display-" + a);
      "true" === c ? l.push(a) : "false" === c && n.push(a);
    });
    e(l, "visible");
    e(n, "hidden");
  }
  function p(a, f, D, V) {
    var z, w;
    if ("page" === f) {
      var B = V.element,
        P = "",
        M,
        Q;
      Q = M = "";
      D = y.getDirectChild(B, l, "page-layout-properties");
      var F;
      if (D)
        if (
          ((F = B.getAttributeNS(l, "name")),
          (P += d(D, N)),
          (M = y.getDirectChild(D, l, "background-image")) &&
            (Q = M.getAttributeNS(m, "href")) &&
            (P = P + ("background-image: url('odfkit:" + Q + "');") + d(M, u)),
          "presentation" === R)
        )
          for (
            B =
              (B = y.getDirectChild(
                B.parentNode.parentNode,
                e,
                "master-styles"
              )) && B.firstElementChild;
            B;

          )
            B.namespaceURI === l &&
              "master-page" === B.localName &&
              B.getAttributeNS(l, "page-layout-name") === F &&
              ((Q = B.getAttributeNS(l, "name")),
              (M = 'draw|page[draw|master-page-name="' + Q + '"] {' + P + "}"),
              (Q =
                'office|body, draw|page[draw|master-page-name="' +
                Q +
                '"] {' +
                d(D, O) +
                " }"),
              a.insertRule(M, a.cssRules.length),
              a.insertRule(Q, a.cssRules.length)),
              (B = B.nextElementSibling);
        else
          "text" === R &&
            ((M = "office|text {" + P + "}"),
            (Q =
              "office|body {width: " +
              D.getAttributeNS(q, "page-width") +
              ";}"),
            a.insertRule(M, a.cssRules.length),
            a.insertRule(Q, a.cssRules.length));
    } else {
      P = g(f, D, V).join(",");
      F = "";
      if ((B = y.getDirectChild(V.element, l, "text-properties"))) {
        var S = B,
          ca = (w = "");
        M = "";
        Q = 1;
        B = "" + d(S, v);
        z = S.getAttributeNS(l, "text-underline-style");
        "solid" === z && (w += " underline");
        z = S.getAttributeNS(l, "text-line-through-style");
        "solid" === z && (w += " line-through");
        w.length &&
          ((B =
            B +
            ("text-decoration:" + w + ";\n") +
            ("text-decoration-line:" + w + ";\n")),
          (B += "-moz-text-decoration-line:" + w + ";\n"));
        z = S.getAttributeNS(l, "text-line-through-type");
        switch (z) {
          case "double":
            ca += " double";
            break;
          case "single":
            ca += " single";
        }
        ca &&
          ((B += "text-decoration-style:" + ca + ";\n"),
          (B += "-moz-text-decoration-style:" + ca + ";\n"));
        if (
          (w =
            S.getAttributeNS(l, "font-name") ||
            S.getAttributeNS(q, "font-family"))
        )
          (z = W[w]), (B += "font-family: " + (z || w) + ";");
        if ((z = S.getAttributeNS(l, "text-position")))
          (w = x.parseAttributeList(z)),
            (z = w[0]),
            (w = w[1]),
            (B += "vertical-align: " + z + "\n; "),
            w && (Q = parseFloat(w) / 100);
        if (S.hasAttributeNS(q, "font-size") || 1 !== Q) {
          for (S = S.parentNode; S; ) {
            if (
              (z = (z = y.getDirectChild(S, l, "text-properties"))
                ? J.parseFoFontSize(z.getAttributeNS(q, "font-size"))
                : null)
            ) {
              if ("%" !== z.unit) {
                M = "font-size: " + z.value * Q + z.unit + ";";
                break;
              }
              Q *= z.value / 100;
            }
            S = k(S);
          }
          M || (M = "font-size: " + parseFloat(aa) * Q + fa.getUnits(aa) + ";");
        }
        B += M;
        F += B;
      }
      if ((B = y.getDirectChild(V.element, l, "paragraph-properties")))
        (M = B),
          (B = "" + d(M, t)),
          (Q = y.getDirectChild(M, l, "background-image")) &&
            (S = Q.getAttributeNS(m, "href")) &&
            (B = B + ("background-image: url('odfkit:" + S + "');") + d(Q, u)),
          (M = M.getAttributeNS(q, "line-height")) &&
            "normal" !== M &&
            ((M = J.parseFoLineHeight(M)),
            (B =
              "%" !== M.unit
                ? B + ("line-height: " + M.value + M.unit + ";")
                : B + ("line-height: " + M.value / 100 + ";"))),
          (F += B);
      if ((B = y.getDirectChild(V.element, l, "graphic-properties")))
        (S = B),
          (B = "" + d(S, A)),
          (M = S.getAttributeNS(r, "opacity")),
          (Q = S.getAttributeNS(r, "fill")),
          (S = S.getAttributeNS(r, "fill-color")),
          "solid" === Q || "hatch" === Q
            ? S && "none" !== S
              ? ((M = isNaN(parseFloat(M)) ? 1 : parseFloat(M) / 100),
                (Q = S.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, b)),
                (S = (Q = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Q))
                  ? {
                      r: parseInt(Q[1], 16),
                      g: parseInt(Q[2], 16),
                      b: parseInt(Q[3], 16),
                    }
                  : null) &&
                  (B +=
                    "background-color: rgba(" +
                    S.r +
                    "," +
                    S.g +
                    "," +
                    S.b +
                    "," +
                    M +
                    ");"))
              : (B += "background: none;")
            : "none" === Q && (B += "background: none;"),
          (F += B);
      if ((B = y.getDirectChild(V.element, l, "drawing-page-properties")))
        (M = B),
          (Q = "" + d(M, A)),
          "true" === M.getAttributeNS(h, "background-visible") &&
            (Q += "background: none;"),
          (F += Q),
          n(a, D, B, V);
      if ((B = y.getDirectChild(V.element, l, "table-cell-properties")))
        (D = F), (F = "" + d(B, I)), (F = D + F);
      if ((B = y.getDirectChild(V.element, l, "table-row-properties")))
        (D = F), (F = "" + d(B, L)), (F = D + F);
      if ((B = y.getDirectChild(V.element, l, "table-column-properties")))
        (D = F), (F = "" + d(B, K)), (F = D + F);
      if ((B = y.getDirectChild(V.element, l, "table-properties")))
        (D = F),
          (F = "" + d(B, E)),
          (B = B.getAttributeNS(c, "border-model")),
          "collapsing" === B
            ? (F += "border-collapse:collapse;")
            : "separating" === B && (F += "border-collapse:separate;"),
          (F = D + F);
      0 !== F.length && a.insertRule(P + "{" + F + "}", a.cssRules.length);
    }
    for (var X in V.derivedStyles)
      V.derivedStyles.hasOwnProperty(X) && p(a, f, X, V.derivedStyles[X]);
  }
  var r = odf.Namespaces.drawns,
    q = odf.Namespaces.fons,
    e = odf.Namespaces.officens,
    l = odf.Namespaces.stylens,
    a = odf.Namespaces.svgns,
    c = odf.Namespaces.tablens,
    m = odf.Namespaces.xlinkns,
    h = odf.Namespaces.presentationns,
    y = core.DomUtils,
    x = new odf.StyleParseUtils(),
    z = {
      graphic: "draw",
      "drawing-page": "draw",
      paragraph: "text",
      presentation: "presentation",
      ruby: "text",
      section: "text",
      table: "table",
      "table-cell": "table",
      "table-column": "table",
      "table-row": "table",
      text: "text",
      list: "text",
      page: "office",
    },
    w = {
      graphic:
        "circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(
          " "
        ),
      paragraph:
        "alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(
          " "
        ),
      presentation:
        "caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(
          " "
        ),
      "drawing-page":
        "caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(
          " "
        ),
      ruby: ["ruby", "ruby-text"],
      section:
        "alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(
          " "
        ),
      table: ["background", "table"],
      "table-cell":
        "body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(
          " "
        ),
      "table-column": ["table-column"],
      "table-row": ["table-row"],
      text: "a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(
        " "
      ),
      list: ["list-item"],
    },
    v = [
      [q, "color", "color"],
      [q, "background-color", "background-color"],
      [q, "font-weight", "font-weight"],
      [q, "font-style", "font-style"],
    ],
    u = [[l, "repeat", "background-repeat"]],
    t = [
      [q, "background-color", "background-color"],
      [q, "text-align", "text-align"],
      [q, "text-indent", "text-indent"],
      [q, "padding", "padding"],
      [q, "padding-left", "padding-left"],
      [q, "padding-right", "padding-right"],
      [q, "padding-top", "padding-top"],
      [q, "padding-bottom", "padding-bottom"],
      [q, "border-left", "border-left"],
      [q, "border-right", "border-right"],
      [q, "border-top", "border-top"],
      [q, "border-bottom", "border-bottom"],
      [q, "margin", "margin"],
      [q, "margin-left", "margin-left"],
      [q, "margin-right", "margin-right"],
      [q, "margin-top", "margin-top"],
      [q, "margin-bottom", "margin-bottom"],
      [q, "border", "border"],
    ],
    A = [
      [q, "background-color", "background-color"],
      [q, "min-height", "min-height"],
      [r, "stroke", "border"],
      [a, "stroke-color", "border-color"],
      [a, "stroke-width", "border-width"],
      [q, "border", "border"],
      [q, "border-left", "border-left"],
      [q, "border-right", "border-right"],
      [q, "border-top", "border-top"],
      [q, "border-bottom", "border-bottom"],
    ],
    I = [
      [q, "background-color", "background-color"],
      [q, "border-left", "border-left"],
      [q, "border-right", "border-right"],
      [q, "border-top", "border-top"],
      [q, "border-bottom", "border-bottom"],
      [q, "border", "border"],
    ],
    K = [[l, "column-width", "width"]],
    L = [
      [l, "row-height", "height"],
      [q, "keep-together", null],
    ],
    E = [
      [l, "width", "width"],
      [q, "margin-left", "margin-left"],
      [q, "margin-right", "margin-right"],
      [q, "margin-top", "margin-top"],
      [q, "margin-bottom", "margin-bottom"],
    ],
    N = [
      [q, "background-color", "background-color"],
      [q, "padding", "padding"],
      [q, "padding-left", "padding-left"],
      [q, "padding-right", "padding-right"],
      [q, "padding-top", "padding-top"],
      [q, "padding-bottom", "padding-bottom"],
      [q, "border", "border"],
      [q, "border-left", "border-left"],
      [q, "border-right", "border-right"],
      [q, "border-top", "border-top"],
      [q, "border-bottom", "border-bottom"],
      [q, "margin", "margin"],
      [q, "margin-left", "margin-left"],
      [q, "margin-right", "margin-right"],
      [q, "margin-top", "margin-top"],
      [q, "margin-bottom", "margin-bottom"],
    ],
    O = [
      [q, "page-width", "width"],
      [q, "page-height", "height"],
    ],
    D = {
      border: !0,
      "border-left": !0,
      "border-right": !0,
      "border-top": !0,
      "border-bottom": !0,
      "stroke-width": !0,
    },
    V = {
      margin: !0,
      "margin-left": !0,
      "margin-right": !0,
      "margin-top": !0,
      "margin-bottom": !0,
    },
    W = {},
    J = odf.OdfUtils,
    R,
    P,
    aa,
    S = xmldom.XPath,
    fa = new core.CSSUnits();
  this.style2css = function (a, c, b, d, e) {
    function h(a, c) {
      m = "@namespace " + a + " url(" + c + ");";
      try {
        b.insertRule(m, b.cssRules.length);
      } catch (d) {}
    }
    var m, f, l;
    for (P = c; b.cssRules.length; ) b.deleteRule(b.cssRules.length - 1);
    odf.Namespaces.forEachPrefix(h);
    h("webodfhelper", "urn:webodf:names:helper");
    W = d;
    R = a;
    aa =
      runtime
        .getWindow()
        .getComputedStyle(document.body, null)
        .getPropertyValue("font-size") || "12pt";
    for (l in z)
      if (z.hasOwnProperty(l))
        for (f in ((a = e[l]), a)) a.hasOwnProperty(f) && p(b, l, f, a[f]);
  };
};
(function () {
  function g(k, d) {
    var b = this;
    this.getDistance = function (d) {
      var n = b.x - d.x;
      d = b.y - d.y;
      return Math.sqrt(n * n + d * d);
    };
    this.getCenter = function (d) {
      return new g((b.x + d.x) / 2, (b.y + d.y) / 2);
    };
    b.x = k;
    b.y = d;
  }
  gui.ZoomHelper = function () {
    function k(a, b, d, e) {
      a = e
        ? "translate3d(" +
          a +
          "px, " +
          b +
          "px, 0) scale3d(" +
          d +
          ", " +
          d +
          ", 1)"
        : "translate(" + a + "px, " + b + "px) scale(" + d + ")";
      c.style.WebkitTransform = a;
      c.style.MozTransform = a;
      c.style.msTransform = a;
      c.style.OTransform = a;
      c.style.transform = a;
    }
    function d(a) {
      a ? k(-m.x, -m.y, x, !0) : (k(0, 0, x, !0), k(0, 0, x, !1));
    }
    function b(a) {
      if (w && I) {
        var c = w.style.overflow,
          b = w.classList.contains("webodf-customScrollbars");
        (a && b) ||
          (!a && !b) ||
          (a
            ? (w.classList.add("webodf-customScrollbars"),
              (w.style.overflow = "hidden"),
              runtime.requestAnimationFrame(function () {
                w.style.overflow = c;
              }))
            : w.classList.remove("webodf-customScrollbars"));
      }
    }
    function f() {
      k(-m.x, -m.y, x, !0);
      w.scrollLeft = 0;
      w.scrollTop = 0;
      K = v.style.overflow;
      v.style.overflow = "visible";
      b(!1);
    }
    function n() {
      k(0, 0, x, !0);
      w.scrollLeft = m.x;
      w.scrollTop = m.y;
      v.style.overflow = K || "";
      b(!0);
    }
    function p(a) {
      return new g(a.pageX - c.offsetLeft, a.pageY - c.offsetTop);
    }
    function r(a) {
      if (h) {
        m.x -= a.x - h.x;
        m.y -= a.y - h.y;
        var b = m;
        m = new g(
          Math.min(
            Math.max(b.x, c.offsetLeft),
            (c.offsetLeft + c.offsetWidth) * x - w.clientWidth
          ),
          Math.min(
            Math.max(b.y, c.offsetTop),
            (c.offsetTop + c.offsetHeight) * x - w.clientHeight
          )
        );
      }
      h = a;
    }
    function q(a) {
      var c = a.touches.length,
        b = 0 < c ? p(a.touches[0]) : null;
      a = 1 < c ? p(a.touches[1]) : null;
      b && a
        ? ((y = b.getDistance(a)),
          (z = x),
          (h = b.getCenter(a)),
          f(),
          (A = t.PINCH))
        : b && ((h = b), (A = t.SCROLL));
    }
    function e(a) {
      var b = a.touches.length,
        e = 0 < b ? p(a.touches[0]) : null,
        b = 1 < b ? p(a.touches[1]) : null;
      if (e && b)
        if ((a.preventDefault(), A === t.SCROLL))
          (A = t.PINCH), f(), (y = e.getDistance(b));
        else {
          a = e.getCenter(b);
          e = e.getDistance(b) / y;
          r(a);
          var b = x,
            h = Math.min(4, c.offsetParent.clientWidth / c.offsetWidth);
          x = z * e;
          x = Math.min(Math.max(x, h), 4);
          e = x / b;
          m.x += (e - 1) * (a.x + m.x);
          m.y += (e - 1) * (a.y + m.y);
          d(!0);
        }
      else e && (A === t.PINCH ? ((A = t.SCROLL), n()) : r(e));
    }
    function l() {
      A === t.PINCH &&
        (u.emit(gui.ZoomHelper.signalZoomChanged, x), n(), d(!1));
      A = t.NONE;
    }
    function a() {
      w &&
        (w.removeEventListener("touchstart", q, !1),
        w.removeEventListener("touchmove", e, !1),
        w.removeEventListener("touchend", l, !1));
    }
    var c,
      m,
      h,
      y,
      x,
      z,
      w,
      v,
      u = new core.EventNotifier([gui.ZoomHelper.signalZoomChanged]),
      t = { NONE: 0, SCROLL: 1, PINCH: 2 },
      A = t.NONE,
      I = runtime.getWindow().hasOwnProperty("ontouchstart"),
      K = "";
    this.subscribe = function (a, c) {
      u.subscribe(a, c);
    };
    this.unsubscribe = function (a, c) {
      u.unsubscribe(a, c);
    };
    this.getZoomLevel = function () {
      return x;
    };
    this.setZoomLevel = function (a) {
      c && ((x = a), d(!1), u.emit(gui.ZoomHelper.signalZoomChanged, x));
    };
    this.destroy = function (c) {
      a();
      b(!1);
      c();
    };
    this.setZoomableElement = function (h) {
      a();
      c = h;
      w = c.offsetParent;
      v = c.parentNode;
      d(!1);
      w &&
        (w.addEventListener("touchstart", q, !1),
        w.addEventListener("touchmove", e, !1),
        w.addEventListener("touchend", l, !1));
      b(!0);
    };
    z = x = 1;
    m = new g(0, 0);
  };
  gui.ZoomHelper.signalZoomChanged = "zoomChanged";
})();
ops.Canvas = function () {};
ops.Canvas.prototype.getZoomLevel = function () {};
ops.Canvas.prototype.getElement = function () {};
ops.Canvas.prototype.getSizer = function () {};
ops.Canvas.prototype.getZoomHelper = function () {};
(function () {
  function g() {
    function a(d) {
      b = !0;
      runtime.setTimeout(function () {
        try {
          d();
        } catch (e) {
          runtime.log(String(e) + "\n" + e.stack);
        }
        b = !1;
        0 < c.length && a(c.pop());
      }, 10);
    }
    var c = [],
      b = !1;
    this.clearQueue = function () {
      c.length = 0;
    };
    this.addToQueue = function (d) {
      if (0 === c.length && !b) return a(d);
      c.push(d);
    };
  }
  function k(a) {
    function c() {
      for (; 0 < b.cssRules.length; ) b.deleteRule(0);
      b.insertRule("#shadowContent draw|page {display:none;}", 0);
      b.insertRule("office|presentation draw|page {display:none;}", 1);
      b.insertRule(
        "#shadowContent draw|page:nth-of-type(" + d + ") {display:block;}",
        2
      );
      b.insertRule(
        "office|presentation draw|page:nth-of-type(" + d + ") {display:block;}",
        3
      );
    }
    var b = a.sheet,
      d = 1;
    this.showFirstPage = function () {
      d = 1;
      c();
    };
    this.showNextPage = function () {
      d += 1;
      c();
    };
    this.showPreviousPage = function () {
      1 < d && (--d, c());
    };
    this.showPage = function (a) {
      0 < a && ((d = a), c());
    };
    this.css = a;
    this.destroy = function (c) {
      a.parentNode.removeChild(a);
      c();
    };
  }
  function d(a) {
    a = a.sheet;
    for (var c = a.cssRules; c.length; ) a.deleteRule(c.length - 1);
  }
  function b(a, c, b) {
    var d = new odf.Style2CSS(),
      e = new odf.ListStyleToCss();
    b = b.sheet;
    var h = new odf.StyleTree(
      a.rootElement.styles,
      a.rootElement.automaticStyles
    ).getStyleTree();
    d.style2css(a.getDocumentType(), a.rootElement, b, c.getFontMap(), h);
    e.applyListStyles(b, h, a.rootElement.body);
  }
  function f(a, c) {
    new odf.FontLoader().loadFonts(a, c.sheet);
  }
  function n(a, c, b) {
    var d = null;
    a = a.rootElement.body.getElementsByTagNameNS(L, b + "-decl");
    b = c.getAttributeNS(L, "use-" + b + "-name");
    var e;
    if (b && 0 < a.length)
      for (c = 0; c < a.length; c += 1)
        if (((e = a[c]), e.getAttributeNS(L, "name") === b)) {
          d = e.textContent;
          break;
        }
    return d;
  }
  function p(a, c, b, d) {
    var e = a.ownerDocument;
    c = N.getElementsByTagNameNS(a, c, b);
    for (a = 0; a < c.length; a += 1)
      N.removeAllChildNodes(c[a]),
        d && ((b = c[a]), b.appendChild(e.createTextNode(d)));
  }
  function r(a, c, b) {
    c.setAttributeNS("urn:webodf:names:helper", "styleid", a);
    var d,
      e = c.getAttributeNS(I, "anchor-type"),
      h = c.getAttributeNS(t, "x"),
      m = c.getAttributeNS(t, "y"),
      f = c.getAttributeNS(t, "width"),
      l = c.getAttributeNS(t, "height"),
      n = c.getAttributeNS(w, "min-height"),
      g = c.getAttributeNS(w, "min-width");
    if ("as-char" === e) d = "display: inline-block;";
    else if (e || h || m) d = "position: absolute;";
    else if (f || l || n || g) d = "display: block;";
    h && (d += "left: " + h + ";");
    m && (d += "top: " + m + ";");
    f && (d += "width: " + f + ";");
    l && (d += "height: " + l + ";");
    n && (d += "min-height: " + n + ";");
    g && (d += "min-width: " + g + ";");
    d &&
      ((d =
        "draw|" +
        c.localName +
        '[webodfhelper|styleid="' +
        a +
        '"] {' +
        d +
        "}"),
      b.insertRule(d, b.cssRules.length));
  }
  function q(a) {
    for (a = a.firstChild; a; ) {
      if (a.namespaceURI === v && "binary-data" === a.localName)
        return (
          "data:image/png;base64," + a.textContent.replace(/[\r\n\s]/g, "")
        );
      a = a.nextSibling;
    }
    return "";
  }
  function e(a, c, b, d) {
    function e(c) {
      c &&
        ((c =
          'draw|image[webodfhelper|styleid="' +
          a +
          '"] {' +
          ("background-image: url(" + c + ");") +
          "}"),
        d.insertRule(c, d.cssRules.length));
    }
    function h(a) {
      e(a.url);
    }
    b.setAttributeNS("urn:webodf:names:helper", "styleid", a);
    var m = b.getAttributeNS(K, "href"),
      f;
    if (m)
      try {
        (f = c.getPart(m)), (f.onchange = h), f.load();
      } catch (l) {
        runtime.log("slight problem: " + String(l));
      }
    else (m = q(b)), e(m);
  }
  function l(a) {
    var c = a.ownerDocument;
    N.getElementsByTagNameNS(a, I, "line-break").forEach(function (a) {
      a.hasChildNodes() || a.appendChild(c.createElement("br"));
    });
  }
  function a(a) {
    var c = a.ownerDocument;
    N.getElementsByTagNameNS(a, I, "s").forEach(function (a) {
      var b, d;
      N.removeAllChildNodes(a);
      a.appendChild(c.createTextNode(" "));
      d = parseInt(a.getAttributeNS(I, "c"), 10);
      if (1 < d)
        for (a.removeAttributeNS(I, "c"), b = 1; b < d; b += 1)
          a.parentNode.insertBefore(a.cloneNode(!0), a);
    });
  }
  function c(a) {
    N.getElementsByTagNameNS(a, I, "tab").forEach(function (a) {
      a.textContent = "\t";
    });
  }
  function m(a, c) {
    function b(a, d) {
      var m = f.documentElement.namespaceURI;
      "video/" === d.substr(0, 6)
        ? ((e = f.createElementNS(m, "video")),
          e.setAttribute("controls", "controls"),
          (h = f.createElementNS(m, "source")),
          a && h.setAttribute("src", a),
          h.setAttribute("type", d),
          e.appendChild(h),
          c.parentNode.appendChild(e))
        : (c.innerHtml = "Unrecognised Plugin");
    }
    function d(a) {
      b(a.url, a.mimetype);
    }
    var e,
      h,
      m,
      f = c.ownerDocument,
      l;
    if ((m = c.getAttributeNS(K, "href")))
      try {
        (l = a.getPart(m)), (l.onchange = d), l.load();
      } catch (n) {
        runtime.log("slight problem: " + String(n));
      }
    else runtime.log("using MP4 data fallback"), (m = q(c)), b(m, "video/mp4");
  }
  function h(a) {
    var c = a.getElementsByTagName("head")[0],
      b,
      d;
    b = a.styleSheets.length;
    for (
      d = c.firstElementChild;
      d && ("style" !== d.localName || !d.hasAttribute("webodfcss"));

    )
      d = d.nextElementSibling;
    if (d)
      return (
        (b = parseInt(d.getAttribute("webodfcss"), 10)),
        d.setAttribute("webodfcss", b + 1),
        d
      );
    "string" === String(typeof webodf_css)
      ? (b = webodf_css)
      : ((d = "webodf.css"),
        runtime.currentDirectory &&
          ((d = runtime.currentDirectory()),
          0 < d.length && "/" !== d.substr(-1) && (d += "/"),
          (d += "../webodf.css")),
        (b = runtime.readFileSync(d, "utf-8")));
    d = a.createElementNS(c.namespaceURI, "style");
    d.setAttribute("media", "screen, print, handheld, projection");
    d.setAttribute("type", "text/css");
    d.setAttribute("webodfcss", "1");
    d.appendChild(a.createTextNode(b));
    c.appendChild(d);
    return d;
  }
  function y(a) {
    var c = parseInt(a.getAttribute("webodfcss"), 10);
    1 === c ? a.parentNode.removeChild(a) : a.setAttribute("count", c - 1);
  }
  function x(a) {
    var c = a.getElementsByTagName("head")[0],
      b = a.createElementNS(c.namespaceURI, "style"),
      d = "";
    b.setAttribute("type", "text/css");
    b.setAttribute("media", "screen, print, handheld, projection");
    odf.Namespaces.forEachPrefix(function (a, c) {
      d += "@namespace " + a + " url(" + c + ");\n";
    });
    d += "@namespace webodfhelper url(urn:webodf:names:helper);\n";
    b.appendChild(a.createTextNode(d));
    c.appendChild(b);
    return b;
  }
  var z = odf.Namespaces.drawns,
    w = odf.Namespaces.fons,
    v = odf.Namespaces.officens,
    u = odf.Namespaces.stylens,
    t = odf.Namespaces.svgns,
    A = odf.Namespaces.tablens,
    I = odf.Namespaces.textns,
    K = odf.Namespaces.xlinkns,
    L = odf.Namespaces.presentationns,
    E = xmldom.XPath,
    N = core.DomUtils;
  odf.OdfCanvas = function (q, D) {
    function t(a, c, b) {
      function d(a, c, b, h) {
        na.addToQueue(function () {
          e(a, c, b, h);
        });
      }
      var h, m;
      h = c.getElementsByTagNameNS(z, "image");
      for (c = 0; c < h.length; c += 1)
        (m = h.item(c)), d("image" + String(c), a, m, b);
    }
    function W(a, c) {
      function b(a, c) {
        na.addToQueue(function () {
          m(a, c);
        });
      }
      var d, e, h;
      e = c.getElementsByTagNameNS(z, "plugin");
      for (d = 0; d < e.length; d += 1) (h = e.item(d)), b(a, h);
    }
    function w() {
      var a;
      a = U.firstChild;
      var c = ea.getZoomLevel();
      a &&
        ((U.style.WebkitTransformOrigin = "0% 0%"),
        (U.style.MozTransformOrigin = "0% 0%"),
        (U.style.msTransformOrigin = "0% 0%"),
        (U.style.OTransformOrigin = "0% 0%"),
        (U.style.transformOrigin = "0% 0%"),
        M &&
          ((a = M.getMinimumHeightForAnnotationPane())
            ? (U.style.minHeight = a)
            : U.style.removeProperty("min-height")),
        (q.style.width = Math.round(c * U.offsetWidth) + "px"),
        (q.style.height = Math.round(c * U.offsetHeight) + "px"),
        (q.style.display = "inline-block"));
    }
    function K(b, d) {
      var e = ca.sheet;
      N.removeAllChildNodes(q);
      U = ha.createElementNS(q.namespaceURI, "div");
      U.style.display = "inline-block";
      U.style.background = "white";
      U.style.setProperty("float", "left", "important");
      U.appendChild(d);
      q.appendChild(U);
      ga = ha.createElementNS(q.namespaceURI, "div");
      ga.id = "annotationsPane";
      X = ha.createElementNS(q.namespaceURI, "div");
      X.id = "shadowContent";
      X.style.position = "absolute";
      X.style.top = 0;
      X.style.left = 0;
      b.getContentElement().appendChild(X);
      var h = d.body,
        m,
        f = [],
        g;
      for (m = h.firstElementChild; m && m !== h; )
        if ((m.namespaceURI === z && (f[f.length] = m), m.firstElementChild))
          m = m.firstElementChild;
        else {
          for (; m && m !== h && !m.nextElementSibling; ) m = m.parentNode;
          m && m.nextElementSibling && (m = m.nextElementSibling);
        }
      for (g = 0; g < f.length; g += 1)
        (m = f[g]), r("frame" + String(g), m, e);
      f = E.getODFElementsWithXPath(
        h,
        ".//*[*[@text:anchor-type='paragraph']]",
        odf.Namespaces.lookupNamespaceURI
      );
      for (m = 0; m < f.length; m += 1)
        (h = f[m]),
          h.setAttributeNS &&
            h.setAttributeNS(
              "urn:webodf:names:helper",
              "containsparagraphanchor",
              !0
            );
      h = Z;
      m = X;
      var k,
        D,
        y,
        x,
        w = 0,
        J;
      g = b.rootElement.ownerDocument;
      if (
        (f = d.body.firstElementChild) &&
        f.namespaceURI === v &&
        ("presentation" === f.localName || "drawing" === f.localName)
      )
        for (f = f.firstElementChild; f; ) {
          if (
            (k = (k = f.getAttributeNS(z, "master-page-name"))
              ? h.getMasterPageElement(k)
              : null)
          ) {
            D = f.getAttributeNS("urn:webodf:names:helper", "styleid");
            y = g.createElementNS(z, "draw:page");
            J = k.firstElementChild;
            for (w = 0; J; )
              "true" !== J.getAttributeNS(L, "placeholder") &&
                ((x = J.cloneNode(!0)), y.appendChild(x)),
                (J = J.nextElementSibling),
                (w += 1);
            J = x = w = void 0;
            for (
              var B = N.getElementsByTagNameNS(y, z, "frame"), w = 0;
              w < B.length;
              w += 1
            )
              (x = B[w]),
                (J = x.getAttributeNS(L, "class")) &&
                  !/^(date-time|footer|header|page-number)$/.test(J) &&
                  x.parentNode.removeChild(x);
            x = N.getElementsByTagNameNS(y, z, "*");
            for (w = 0; w < x.length; w += 1) r(D + "_" + w, x[w], e);
            m.appendChild(y);
            w = String(m.getElementsByTagNameNS(z, "page").length);
            p(y, I, "page-number", w);
            p(y, L, "header", n(b, f, "header"));
            p(y, L, "footer", n(b, f, "footer"));
            r(D, y, e);
            y.setAttributeNS(
              "urn:webodf:names:helper",
              "page-style-name",
              f.getAttributeNS(z, "style-name")
            );
            y.setAttributeNS(
              z,
              "draw:master-page-name",
              k.getAttributeNS(u, "name")
            );
          }
          f = f.nextElementSibling;
        }
      h = q.namespaceURI;
      f = N.getElementsByTagNameNS(d.body, A, "table-cell");
      for (m = 0; m < f.length; m += 1)
        (g = f[m]),
          g.hasAttributeNS(A, "number-columns-spanned") &&
            g.setAttributeNS(
              h,
              "colspan",
              g.getAttributeNS(A, "number-columns-spanned")
            ),
          g.hasAttributeNS(A, "number-rows-spanned") &&
            g.setAttributeNS(
              h,
              "rowspan",
              g.getAttributeNS(A, "number-rows-spanned")
            );
      l(d.body);
      a(d.body);
      c(d.body);
      t(b, d.body, e);
      W(b, d.body);
      U.insertBefore(X, U.firstChild);
      ea.setZoomableElement(U);
    }
    function P(a) {
      B
        ? (ga.parentNode || U.appendChild(ga),
          M && M.forgetAnnotations(),
          (M = new gui.AnnotationViewManager(fa, a.body, ga, Y)),
          (a = N.getElementsByTagNameNS(a.body, v, "annotation")),
          M.addAnnotations(a),
          w())
        : ga.parentNode && (U.removeChild(ga), M.forgetAnnotations(), w());
    }
    function aa(a) {
      function c() {
        d(F);
        d(ja);
        d(ca);
        N.removeAllChildNodes(q);
        q.style.display = "inline-block";
        var e = C.rootElement;
        q.ownerDocument.importNode(e, !0);
        Z.setOdfContainer(C);
        f(C, F);
        b(C, Z, ja);
        K(C, e);
        P(e);
        a ||
          na.addToQueue(function () {
            var a = [C];
            if (da.hasOwnProperty("statereadychange")) {
              var c = da.statereadychange,
                b;
              for (b = 0; b < c.length; b += 1) c[b].apply(null, a);
            }
          });
      }
      C.state === odf.OdfContainer.DONE
        ? c()
        : (runtime.log("WARNING: refreshOdf called but ODF was not DONE."),
          (qa = runtime.setTimeout(function T() {
            C.state === odf.OdfContainer.DONE
              ? c()
              : (runtime.log("will be back later..."),
                (qa = runtime.setTimeout(T, 500)));
          }, 100)));
    }
    function S(a) {
      na.clearQueue();
      N.removeAllChildNodes(q);
      q.appendChild(
        q.ownerDocument.createTextNode(runtime.tr("Loading") + a + "...")
      );
      q.removeAttribute("style");
      C = new odf.OdfContainer(a, function (a) {
        C = a;
        aa(!1);
      });
    }
    runtime.assert(
      null !== q && void 0 !== q,
      "odf.OdfCanvas constructor needs DOM element"
    );
    runtime.assert(
      null !== q.ownerDocument && void 0 !== q.ownerDocument,
      "odf.OdfCanvas constructor needs DOM"
    );
    var fa = this,
      ha = q.ownerDocument,
      C,
      Z = new odf.Formatting(),
      ba,
      U = null,
      ga = null,
      B = !1,
      Y = !1,
      M = null,
      Q,
      F,
      ja,
      ca,
      X,
      da = {},
      qa,
      la,
      ia = !1,
      ma = !1,
      na = new g(),
      ea = new gui.ZoomHelper(),
      ka = D || new gui.SingleScrollViewport(q.parentNode);
    this.refreshCSS = function () {
      ia = !0;
      la.trigger();
    };
    this.refreshSize = function () {
      la.trigger();
    };
    this.odfContainer = function () {
      return C;
    };
    this.setOdfContainer = function (a, c) {
      C = a;
      aa(!0 === c);
    };
    this.load = this.load = S;
    this.save = function (a) {
      C.save(a);
    };
    this.addListener = function (a, c) {
      switch (a) {
        case "click":
          var b = a;
          q.addEventListener
            ? q.addEventListener(b, c, !1)
            : q.attachEvent
            ? q.attachEvent("on" + b, c)
            : (q["on" + b] = c);
          break;
        default:
          (b = da.hasOwnProperty(a) ? da[a] : (da[a] = [])),
            c && -1 === b.indexOf(c) && b.push(c);
      }
    };
    this.getFormatting = function () {
      return Z;
    };
    this.getAnnotationViewManager = function () {
      return M;
    };
    this.refreshAnnotations = function () {
      P(C.rootElement);
    };
    this.rerenderAnnotations = function () {
      M && ((ma = !0), la.trigger());
    };
    this.getSizer = function () {
      return U;
    };
    this.enableAnnotations = function (a, c) {
      a !== B && ((B = a), (Y = c), C && P(C.rootElement));
    };
    this.addAnnotation = function (a) {
      M && (M.addAnnotations([a]), w());
    };
    this.forgetAnnotation = function (a) {
      M && (M.forgetAnnotation(a), w());
    };
    this.getZoomHelper = function () {
      return ea;
    };
    this.setZoomLevel = function (a) {
      ea.setZoomLevel(a);
    };
    this.getZoomLevel = function () {
      return ea.getZoomLevel();
    };
    this.fitToContainingElement = function (a, c) {
      var b = ea.getZoomLevel(),
        d = q.offsetHeight / b,
        b = a / (q.offsetWidth / b);
      c / d < b && (b = c / d);
      ea.setZoomLevel(b);
    };
    this.fitToWidth = function (a) {
      var c = q.offsetWidth / ea.getZoomLevel();
      ea.setZoomLevel(a / c);
    };
    this.fitSmart = function (a, c) {
      var b, d;
      d = ea.getZoomLevel();
      b = q.offsetWidth / d;
      d = q.offsetHeight / d;
      b = a / b;
      void 0 !== c && c / d < b && (b = c / d);
      ea.setZoomLevel(Math.min(1, b));
    };
    this.fitToHeight = function (a) {
      var c = q.offsetHeight / ea.getZoomLevel();
      ea.setZoomLevel(a / c);
    };
    this.showFirstPage = function () {
      ba.showFirstPage();
    };
    this.showNextPage = function () {
      ba.showNextPage();
    };
    this.showPreviousPage = function () {
      ba.showPreviousPage();
    };
    this.showPage = function (a) {
      ba.showPage(a);
      w();
    };
    this.getElement = function () {
      return q;
    };
    this.getViewport = function () {
      return ka;
    };
    this.addCssForFrameWithImage = function (a) {
      var c = a.getAttributeNS(z, "name"),
        b = a.firstElementChild;
      r(c, a, ca.sheet);
      b && e(c + "img", C, b, ca.sheet);
    };
    this.destroy = function (a) {
      var c = ha.getElementsByTagName("head")[0],
        b = [ba.destroy, la.destroy];
      runtime.clearTimeout(qa);
      ga && ga.parentNode && ga.parentNode.removeChild(ga);
      ea.destroy(function () {
        U && (q.removeChild(U), (U = null));
      });
      y(Q);
      c.removeChild(F);
      c.removeChild(ja);
      c.removeChild(ca);
      core.Async.destroyAll(b, a);
    };
    Q = h(ha);
    ba = new k(x(ha));
    F = x(ha);
    ja = x(ha);
    ca = x(ha);
    la = core.Task.createRedrawTask(function () {
      ia && (b(C, Z, ja), (ia = !1));
      ma && (M && M.rerenderAnnotations(), (ma = !1));
      w();
    });
    ea.subscribe(gui.ZoomHelper.signalZoomChanged, w);
  };
})();
odf.StepUtils = function () {
  this.getContentBounds = function (g) {
    var k = g.container(),
      d,
      b;
    runtime.assert(g.isStep(), "Step iterator must be on a step");
    k.nodeType === Node.TEXT_NODE && 0 < g.offset()
      ? (d = g.offset())
      : (k = g.leftNode()) && k.nodeType === Node.TEXT_NODE && (d = k.length);
    k &&
      (k.nodeType === Node.TEXT_NODE
        ? (runtime.assert(0 < d, "Empty text node found"),
          (b = { container: k, startOffset: d - 1, endOffset: d }))
        : (b = {
            container: k,
            startOffset: 0,
            endOffset: k.childNodes.length,
          }));
    return b;
  };
};
ops.MemberProperties = function () {};
ops.Member = function (g, k) {
  var d = new ops.MemberProperties();
  this.getMemberId = function () {
    return g;
  };
  this.getProperties = function () {
    return d;
  };
  this.setProperties = function (b) {
    Object.keys(b).forEach(function (f) {
      d[f] = b[f];
    });
  };
  this.removeProperties = function (b) {
    Object.keys(b).forEach(function (b) {
      "fullName" !== b &&
        "color" !== b &&
        "imageUrl" !== b &&
        d.hasOwnProperty(b) &&
        delete d[b];
    });
  };
  runtime.assert(Boolean(g), "No memberId was supplied!");
  k.fullName || (k.fullName = runtime.tr("Unknown Author"));
  k.color || (k.color = "black");
  k.imageUrl || (k.imageUrl = "avatar-joe.png");
  d = k;
};
ops.Document = function () {};
ops.Document.prototype.getMemberIds = function () {};
ops.Document.prototype.removeCursor = function (g) {};
ops.Document.prototype.getDocumentElement = function () {};
ops.Document.prototype.getRootNode = function () {};
ops.Document.prototype.getDOMDocument = function () {};
ops.Document.prototype.cloneDocumentElement = function () {};
ops.Document.prototype.setDocumentElement = function (g) {};
ops.Document.prototype.subscribe = function (g, k) {};
ops.Document.prototype.unsubscribe = function (g, k) {};
ops.Document.prototype.getCanvas = function () {};
ops.Document.prototype.createRootFilter = function (g) {};
ops.Document.prototype.createPositionIterator = function (g) {};
ops.Document.prototype.hasCursor = function (g) {};
ops.Document.signalCursorAdded = "cursor/added";
ops.Document.signalCursorRemoved = "cursor/removed";
ops.Document.signalCursorMoved = "cursor/moved";
ops.Document.signalMemberAdded = "member/added";
ops.Document.signalMemberUpdated = "member/updated";
ops.Document.signalMemberRemoved = "member/removed";
ops.OdtCursor = function (g, k) {
  var d = this,
    b = {},
    f,
    n,
    p = new core.EventNotifier([ops.OdtCursor.signalCursorUpdated]);
  this.removeFromDocument = function () {
    n.remove();
  };
  this.subscribe = function (b, d) {
    p.subscribe(b, d);
  };
  this.unsubscribe = function (b, d) {
    p.unsubscribe(b, d);
  };
  this.getMemberId = function () {
    return g;
  };
  this.getNode = function () {
    return n.getNode();
  };
  this.getAnchorNode = function () {
    return n.getAnchorNode();
  };
  this.getSelectedRange = function () {
    return n.getSelectedRange();
  };
  this.setSelectedRange = function (b, f) {
    n.setSelectedRange(b, f);
    p.emit(ops.OdtCursor.signalCursorUpdated, d);
  };
  this.hasForwardSelection = function () {
    return n.hasForwardSelection();
  };
  this.getDocument = function () {
    return k;
  };
  this.getSelectionType = function () {
    return f;
  };
  this.setSelectionType = function (d) {
    b.hasOwnProperty(d) ? (f = d) : runtime.log("Invalid selection type: " + d);
  };
  this.resetSelectionType = function () {
    d.setSelectionType(ops.OdtCursor.RangeSelection);
  };
  n = new core.Cursor(k.getDOMDocument(), g);
  b[ops.OdtCursor.RangeSelection] = !0;
  b[ops.OdtCursor.RegionSelection] = !0;
  d.resetSelectionType();
};
ops.OdtCursor.RangeSelection = "Range";
ops.OdtCursor.RegionSelection = "Region";
ops.OdtCursor.signalCursorUpdated = "cursorUpdated";
(function () {
  var g = 0;
  ops.StepsCache = function (k, d, b) {
    function f(a, c) {
      var d = this;
      this.nodeId = a;
      this.steps = -1;
      this.node = c;
      this.previousBookmark = this.nextBookmark = null;
      this.setIteratorPosition = function (a) {
        a.setPositionBeforeElement(c);
        b(d.steps, a);
      };
    }
    function n(a, c, d) {
      var e = this;
      this.nodeId = a;
      this.steps = c;
      this.node = d;
      this.previousBookmark = this.nextBookmark = null;
      this.setIteratorPosition = function (a) {
        a.setUnfilteredPosition(d, 0);
        b(e.steps, a);
      };
    }
    function p(a, c) {
      var b = "[" + a.nodeId;
      c && (b += " => " + c.nodeId);
      return b + "]";
    }
    function r() {
      if (!0 === ops.StepsCache.ENABLE_CACHE_VERIFICATION) {
        for (
          var a = x, c, b, d, e = new core.LoopWatchDog(0, 1e5), h = {};
          a;

        ) {
          e.check();
          (c = a.previousBookmark)
            ? runtime.assert(
                c.nextBookmark === a,
                "Broken bookmark link to previous @" + p(c, a)
              )
            : (runtime.assert(a === x, "Broken bookmark link @" + p(a)),
              runtime.assert(
                void 0 === z || x === x || x.steps <= z,
                "Base point is damaged @" + p(a)
              ));
          (b = a.nextBookmark) &&
            runtime.assert(
              b.previousBookmark === a,
              "Broken bookmark link to next @" + p(a, b)
            );
          if (void 0 === z || a === x || a.steps <= z)
            runtime.assert(
              y.containsNode(k, a.node),
              "Disconnected node is being reported as undamaged @" + p(a)
            ),
              c &&
                ((d = a.node.compareDocumentPosition(c.node)),
                runtime.assert(
                  0 === d || 0 !== (d & v),
                  "Bookmark order with previous does not reflect DOM order @" +
                    p(c, a)
                )),
              b &&
                y.containsNode(k, b.node) &&
                ((d = a.node.compareDocumentPosition(b.node)),
                runtime.assert(
                  0 === d || 0 !== (d & w),
                  "Bookmark order with next does not reflect DOM order @" +
                    p(a, b)
                ));
          a = a.nextBookmark;
        }
        Object.keys(m).forEach(function (a) {
          var c = m[a];
          (void 0 === z || a <= z) &&
            runtime.assert(
              c.steps <= a,
              "Bookmark step of " +
                c.steps +
                " exceeds cached step lookup for " +
                a +
                " @" +
                p(c)
            );
          runtime.assert(
            !1 === h.hasOwnProperty(c.nodeId),
            "Bookmark " +
              p(c) +
              " appears twice in cached step lookup at steps " +
              h[c.nodeId] +
              " and " +
              a
          );
          h[c.nodeId] = a;
        });
      }
    }
    function q(a) {
      var c = "";
      a.nodeType === Node.ELEMENT_NODE &&
        (c = a.getAttributeNS("urn:webodf:names:steps", "nodeId") || "");
      return c;
    }
    function e(a) {
      var c = g.toString();
      a.setAttributeNS("urn:webodf:names:steps", "nodeId", c);
      g += 1;
      return c;
    }
    function l(a) {
      var c,
        b,
        e = new core.LoopWatchDog(0, 1e4);
      void 0 !== z && a > z && (a = z);
      for (c = Math.floor(a / d) * d; !b && 0 <= c; ) (b = m[c]), (c -= d);
      for (b = b || x; b.nextBookmark && b.nextBookmark.steps <= a; )
        e.check(), (b = b.nextBookmark);
      runtime.assert(
        -1 === a || b.steps <= a,
        "Bookmark @" +
          p(b) +
          " at step " +
          b.steps +
          " exceeds requested step of " +
          a
      );
      return b;
    }
    function a(a) {
      a.previousBookmark && (a.previousBookmark.nextBookmark = a.nextBookmark);
      a.nextBookmark && (a.nextBookmark.previousBookmark = a.previousBookmark);
    }
    function c(a) {
      for (var c, b = null; !b && a && a !== k; )
        (c = q(a)) &&
          (b = h[c]) &&
          b.node !== a &&
          (runtime.log("Cloned node detected. Creating new bookmark"),
          (b = null),
          a.removeAttributeNS("urn:webodf:names:steps", "nodeId")),
          (a = a.parentNode);
      return b;
    }
    var m = {},
      h = {},
      y = core.DomUtils,
      x,
      z,
      w = Node.DOCUMENT_POSITION_FOLLOWING,
      v = Node.DOCUMENT_POSITION_PRECEDING;
    this.updateBookmark = function (c, b) {
      var g,
        n = Math.ceil(c / d) * d,
        p,
        v,
        E;
      if (void 0 !== z && z < c) {
        p = l(z);
        for (v = p.nextBookmark; v && v.steps <= c; )
          (g = v.nextBookmark),
            (E = Math.ceil(v.steps / d) * d),
            m[E] === v && delete m[E],
            y.containsNode(k, v.node)
              ? (v.steps = c + 1)
              : (a(v), delete h[v.nodeId]),
            (v = g);
        z = c;
      } else p = l(c);
      v = q(b) || e(b);
      g = h[v];
      g
        ? g.node !== b &&
          (runtime.log("Cloned node detected. Creating new bookmark"),
          (v = e(b)),
          (g = h[v] = new f(v, b)))
        : (g = h[v] = new f(v, b));
      v = g;
      v.steps !== c &&
        ((g = Math.ceil(v.steps / d) * d),
        g !== n && m[g] === v && delete m[g],
        (v.steps = c));
      if (p !== v && p.nextBookmark !== v) {
        if (p.steps === v.steps)
          for (
            ;
            0 !== (v.node.compareDocumentPosition(p.node) & w) && p !== x;

          )
            p = p.previousBookmark;
        p !== v &&
          p.nextBookmark !== v &&
          (a(v),
          (g = p.nextBookmark),
          (v.nextBookmark = p.nextBookmark),
          (v.previousBookmark = p),
          (p.nextBookmark = v),
          g && (g.previousBookmark = v));
      }
      p = m[n];
      if (!p || v.steps > p.steps) m[n] = v;
      r();
    };
    this.setToClosestStep = function (a, c) {
      var b;
      r();
      b = l(a);
      b.setIteratorPosition(c);
      return b.steps;
    };
    this.setToClosestDomPoint = function (a, b, d) {
      var e, h;
      r();
      if (a === k && 0 === b) e = x;
      else if (a === k && b === k.childNodes.length)
        for (h in ((e = x), m))
          m.hasOwnProperty(h) && ((a = m[h]), a.steps > e.steps && (e = a));
      else if (((e = c(a.childNodes.item(b) || a)), !e))
        for (d.setUnfilteredPosition(a, b); !e && d.previousNode(); )
          e = c(d.getCurrentNode());
      e = e || x;
      void 0 !== z && e.steps > z && (e = l(z));
      e.setIteratorPosition(d);
      return e.steps;
    };
    this.damageCacheAfterStep = function (a) {
      0 > a && (a = -1);
      void 0 === z ? (z = a) : a < z && (z = a);
      r();
    };
    (function () {
      var a = q(k) || e(k);
      x = new n(a, 0, k);
    })();
  };
  ops.StepsCache.ENABLE_CACHE_VERIFICATION = !1;
  ops.StepsCache.Bookmark = function () {};
  ops.StepsCache.Bookmark.prototype.setIteratorPosition = function (g) {};
})();
(function () {
  ops.OdtStepsTranslator = function (g, k, d, b) {
    function f(a, b, d) {
      var e = b.getCurrentNode();
      b.isBeforeNode() &&
        r.isParagraph(e) &&
        (d || (a += 1), p.updateBookmark(a, e));
    }
    function n(c, b) {
      if (!b || d.acceptPosition(c) === e) return !0;
      for (; c.previousPosition(); )
        if (d.acceptPosition(c) === e) {
          if (b(l, c.container(), c.unfilteredDomOffset())) return !0;
          break;
        }
      for (; c.nextPosition(); )
        if (d.acceptPosition(c) === e) {
          if (b(a, c.container(), c.unfilteredDomOffset())) return !0;
          break;
        }
      return !1;
    }
    var p,
      r = odf.OdfUtils,
      q = core.DomUtils,
      e = core.PositionFilter.FilterResult.FILTER_ACCEPT,
      l = core.StepDirection.PREVIOUS,
      a = core.StepDirection.NEXT;
    this.convertStepsToDomPoint = function (a) {
      var b, h;
      if (isNaN(a))
        throw new TypeError("Requested steps is not numeric (" + a + ")");
      if (0 > a)
        throw new RangeError("Requested steps is negative (" + a + ")");
      for (b = p.setToClosestStep(a, k); b < a && k.nextPosition(); )
        (h = d.acceptPosition(k) === e) && (b += 1), f(b, k, h);
      if (b !== a)
        throw new RangeError(
          "Requested steps (" + a + ") exceeds available steps (" + b + ")"
        );
      return { node: k.container(), offset: k.unfilteredDomOffset() };
    };
    this.convertDomPointToSteps = function (a, b, h) {
      var l;
      q.containsNode(g, a) ||
        ((b = 0 > q.comparePoints(g, 0, a, b)),
        (a = g),
        (b = b ? 0 : g.childNodes.length));
      k.setUnfilteredPosition(a, b);
      n(k, h) || k.setUnfilteredPosition(a, b);
      h = k.container();
      b = k.unfilteredDomOffset();
      a = p.setToClosestDomPoint(h, b, k);
      if (0 > q.comparePoints(k.container(), k.unfilteredDomOffset(), h, b))
        return 0 < a ? a - 1 : a;
      for (
        ;
        (k.container() !== h || k.unfilteredDomOffset() !== b) &&
        k.nextPosition();

      )
        (l = d.acceptPosition(k) === e) && (a += 1), f(a, k, l);
      return a + 0;
    };
    this.prime = function () {
      var a, b;
      for (a = p.setToClosestStep(0, k); k.nextPosition(); )
        (b = d.acceptPosition(k) === e) && (a += 1), f(a, k, b);
    };
    this.handleStepsInserted = function (a) {
      p.damageCacheAfterStep(a.position);
    };
    this.handleStepsRemoved = function (a) {
      p.damageCacheAfterStep(a.position - 1);
    };
    p = new ops.StepsCache(g, b, function (a, b) {
      do {
        if (d.acceptPosition(b) === e) {
          f(a, b, !0);
          break;
        }
        f(a - 1, b, !1);
      } while (b.nextPosition());
    });
  };
})();
ops.Operation = function () {};
ops.Operation.prototype.init = function (g) {};
ops.Operation.prototype.execute = function (g) {};
ops.Operation.prototype.spec = function () {};
ops.TextPositionFilter = function () {
  function g(b, d) {
    for (; b && d(b) !== n; ) b = b.previousSibling;
    return b;
  }
  function k(b, f, e, l) {
    var a;
    if (f) {
      if (d.isInlineRoot(f) && d.isGroupingElement(e)) return p;
      l = d.lookLeftForCharacter(f);
      if (
        1 === l ||
        (2 === l &&
          (d.scanRightForAnyCharacter(e) ||
            d.scanRightForAnyCharacter(d.nextNode(b))))
      )
        return n;
    } else if (
      d.isGroupingElement(b) &&
      d.isInlineRoot(g(b.previousSibling, l))
    )
      return n;
    l = null === f && d.isParagraph(b);
    a = d.lookRightForCharacter(e);
    if (l) return a ? n : d.scanRightForAnyCharacter(e) ? p : n;
    if (!a) return p;
    f = f || d.previousNode(b);
    return d.scanLeftForAnyCharacter(f) ? p : n;
  }
  var d = odf.OdfUtils,
    b = Node.ELEMENT_NODE,
    f = Node.TEXT_NODE,
    n = core.PositionFilter.FilterResult.FILTER_ACCEPT,
    p = core.PositionFilter.FilterResult.FILTER_REJECT;
  this.acceptPosition = function (g) {
    var q = g.container(),
      e = q.nodeType,
      l,
      a,
      c;
    if (e !== b && e !== f) return p;
    if (e === f) {
      e = g.unfilteredDomOffset();
      l = q.data;
      runtime.assert(e !== l.length, "Unexpected offset.");
      if (0 < e) {
        g = l[e - 1];
        if (!d.isODFWhitespace(g)) return n;
        if (1 < e)
          if (((g = l[e - 2]), !d.isODFWhitespace(g))) c = n;
          else {
            if (!d.isODFWhitespace(l.substr(0, e))) return p;
          }
        else (a = d.previousNode(q)), d.scanLeftForNonSpace(a) && (c = n);
        if (c === n) return d.isTrailingWhitespace(q, e) ? p : n;
        g = l[e];
        return d.isODFWhitespace(g)
          ? p
          : d.scanLeftForAnyCharacter(d.previousNode(q))
          ? p
          : n;
      }
      a = g.leftNode();
      c = q;
      q = q.parentNode;
      c = k(q, a, c, g.getNodeFilter());
    } else
      d.isGroupingElement(q)
        ? ((a = g.leftNode()),
          (c = g.rightNode()),
          (c = k(q, a, c, g.getNodeFilter())))
        : (c = p);
    return c;
  };
};
function RootFilter(g, k, d) {
  var b = core.PositionFilter.FilterResult.FILTER_ACCEPT,
    f = core.PositionFilter.FilterResult.FILTER_REJECT;
  this.acceptPosition = function (n) {
    n = n.container();
    var p;
    p = "string" === typeof g ? k[g].getNode() : g;
    return d(n) === d(p) ? b : f;
  };
}
ops.OdtDocument = function (g) {
  function k(a) {
    return new core.PositionIterator(a, A, L, !1);
  }
  function d() {
    var a = g.odfContainer().getContentElement(),
      c = a && a.localName;
    runtime.assert(
      "text" === c,
      "Unsupported content element type '" + c + "' for OdtDocument"
    );
    return a;
  }
  function b() {
    return a.getDocumentElement().ownerDocument;
  }
  function f(a) {
    for (
      ;
      a &&
      !(
        (a.namespaceURI === odf.Namespaces.officens &&
          "text" === a.localName) ||
        (a.namespaceURI === odf.Namespaces.officens &&
          "annotation" === a.localName)
      );

    )
      a = a.parentNode;
    return a;
  }
  function n(a, c, b, d) {
    d = k(d);
    var e;
    1 === b.length
      ? (e = b[0])
      : ((e = new core.PositionFilterChain()), b.forEach(e.addFilter));
    b = new core.StepIterator(e, d);
    b.setPosition(a, c);
    return b;
  }
  function p(a) {
    var c = k(d());
    a = u.convertStepsToDomPoint(a);
    c.setUnfilteredPosition(a.node, a.offset);
    return c;
  }
  function r(a) {
    return a === w;
  }
  function q(c) {
    var b = c.spec(),
      d = b.memberid,
      e = new Date(b.timestamp).toISOString(),
      b = g.odfContainer();
    c.isEdit &&
      ((d = a.getMember(d).getProperties().fullName),
      b.setMetadata({ "dc:creator": d, "dc:date": e }, null),
      (d = {
        setProperties: { "dc:creator": d, "dc:date": e },
        removedProperties: [],
      }),
      t ||
        ((d.setProperties["meta:editing-cycles"] = b.incrementEditingCycles()),
        b.setMetadata(null, [
          "meta:editing-duration",
          "meta:document-statistic",
        ])),
      (t = c),
      a.emit(ops.OdtDocument.signalMetadataUpdated, d));
  }
  function e(a) {
    var b,
      d = [],
      e,
      f = 2;
    runtime.assert(a.isStep(), "positionIterator is not at a step");
    do {
      if ((b = c.getContentBounds(a)))
        if (((b = b.container), m.isDowngradableSpaceElement(b))) {
          for (e = b.lastChild; b.firstChild; )
            d.push(b.firstChild), b.parentNode.insertBefore(b.firstChild, b);
          b.parentNode.removeChild(b);
          a.setPosition(
            e,
            e.nodeType === Node.TEXT_NODE ? e.length : e.childNodes.length
          );
          a.roundToPreviousStep();
        }
      --f;
    } while (0 < f && a.nextStep());
    d.forEach(h.normalizeTextNodes);
  }
  function l(a, c, b) {
    a = a.childNodes.item(c) || a;
    return (a = m.getParagraphElement(a)) && h.containsNode(b, a) ? a : b;
  }
  var a = this,
    c,
    m = odf.OdfUtils,
    h = core.DomUtils,
    y = {},
    x = {},
    z = new core.EventNotifier([
      ops.Document.signalMemberAdded,
      ops.Document.signalMemberUpdated,
      ops.Document.signalMemberRemoved,
      ops.Document.signalCursorAdded,
      ops.Document.signalCursorRemoved,
      ops.Document.signalCursorMoved,
      ops.OdtDocument.signalParagraphChanged,
      ops.OdtDocument.signalParagraphStyleModified,
      ops.OdtDocument.signalCommonStyleCreated,
      ops.OdtDocument.signalCommonStyleDeleted,
      ops.OdtDocument.signalTableAdded,
      ops.OdtDocument.signalOperationStart,
      ops.OdtDocument.signalOperationEnd,
      ops.OdtDocument.signalProcessingBatchStart,
      ops.OdtDocument.signalProcessingBatchEnd,
      ops.OdtDocument.signalUndoStackChanged,
      ops.OdtDocument.signalStepsInserted,
      ops.OdtDocument.signalStepsRemoved,
      ops.OdtDocument.signalMetadataUpdated,
      ops.OdtDocument.signalAnnotationAdded,
    ]),
    w = core.StepDirection.NEXT,
    v,
    u,
    t,
    A = NodeFilter.SHOW_ALL,
    I = new gui.BlacklistNamespaceNodeFilter([
      "urn:webodf:names:cursor",
      "urn:webodf:names:editinfo",
    ]),
    K = new gui.OdfTextBodyNodeFilter(),
    L = new core.NodeFilterChain([I, K]);
  this.createPositionIterator = k;
  this.getDocumentElement = function () {
    return g.odfContainer().rootElement;
  };
  this.cloneDocumentElement = function () {
    var c = a.getDocumentElement(),
      b = g.getAnnotationViewManager();
    b && b.forgetAnnotations();
    c = c.cloneNode(!0);
    g.refreshAnnotations();
    a.fixCursorPositions();
    return c;
  };
  this.setDocumentElement = function (a) {
    var c = g.odfContainer();
    z.unsubscribe(ops.OdtDocument.signalStepsInserted, u.handleStepsInserted);
    z.unsubscribe(ops.OdtDocument.signalStepsRemoved, u.handleStepsRemoved);
    c.setRootElement(a);
    g.setOdfContainer(c, !0);
    g.refreshCSS();
    a = d();
    u = new ops.OdtStepsTranslator(a, k(a), v, 500);
    z.subscribe(ops.OdtDocument.signalStepsInserted, u.handleStepsInserted);
    z.subscribe(ops.OdtDocument.signalStepsRemoved, u.handleStepsRemoved);
  };
  this.getDOMDocument = b;
  this.getRootElement = f;
  this.createStepIterator = n;
  this.getIteratorAtPosition = p;
  this.convertCursorStepToDomPoint = function (a) {
    return u.convertStepsToDomPoint(a);
  };
  this.convertDomPointToCursorStep = function (a, c, b) {
    var d;
    b === w && (d = r);
    return u.convertDomPointToSteps(a, c, d);
  };
  this.convertDomToCursorRange = function (a) {
    var c;
    c = u.convertDomPointToSteps(a.anchorNode, a.anchorOffset);
    a =
      a.anchorNode === a.focusNode && a.anchorOffset === a.focusOffset
        ? c
        : u.convertDomPointToSteps(a.focusNode, a.focusOffset);
    return { position: c, length: a - c };
  };
  this.convertCursorToDomRange = function (a, c) {
    var d = b().createRange(),
      e,
      h;
    e = u.convertStepsToDomPoint(a);
    c
      ? ((h = u.convertStepsToDomPoint(a + c)),
        0 < c
          ? (d.setStart(e.node, e.offset), d.setEnd(h.node, h.offset))
          : (d.setStart(h.node, h.offset), d.setEnd(e.node, e.offset)))
      : d.setStart(e.node, e.offset);
    return d;
  };
  this.upgradeWhitespacesAtPosition = function (a) {
    var b = p(a),
      b = new core.StepIterator(v, b),
      d,
      e = 2;
    runtime.assert(
      b.isStep(),
      "positionIterator is not at a step (requested step: " + a + ")"
    );
    do {
      if ((d = c.getContentBounds(b)))
        if (
          ((a = d.container),
          (d = d.startOffset),
          a.nodeType === Node.TEXT_NODE && m.isSignificantWhitespace(a, d))
        ) {
          runtime.assert(
            " " === a.data[d],
            "upgradeWhitespaceToElement: textNode.data[offset] should be a literal space"
          );
          var h = a.ownerDocument.createElementNS(
              odf.Namespaces.textns,
              "text:s"
            ),
            f = a.parentNode,
            l = a;
          h.appendChild(a.ownerDocument.createTextNode(" "));
          1 === a.length
            ? f.replaceChild(h, a)
            : (a.deleteData(d, 1),
              0 < d && (d < a.length && a.splitText(d), (l = a.nextSibling)),
              f.insertBefore(h, l));
          a = h;
          b.setPosition(a, a.childNodes.length);
          b.roundToPreviousStep();
        }
      --e;
    } while (0 < e && b.nextStep());
  };
  this.downgradeWhitespaces = e;
  this.downgradeWhitespacesAtPosition = function (a) {
    a = p(a);
    a = new core.StepIterator(v, a);
    e(a);
  };
  this.getTextNodeAtStep = function (c, d) {
    var e = p(c),
      h = e.container(),
      m,
      f = 0,
      l = null;
    h.nodeType === Node.TEXT_NODE
      ? ((m = h),
        (f = e.unfilteredDomOffset()),
        0 < m.length &&
          (0 < f && (m = m.splitText(f)),
          m.parentNode.insertBefore(b().createTextNode(""), m),
          (m = m.previousSibling),
          (f = 0)))
      : ((m = b().createTextNode("")),
        (f = 0),
        h.insertBefore(m, e.rightNode()));
    if (d) {
      if (y[d] && a.getCursorPosition(d) === c) {
        for (
          l = y[d].getNode();
          l.nextSibling && "cursor" === l.nextSibling.localName;

        )
          l.parentNode.insertBefore(l.nextSibling, l);
        0 < m.length &&
          m.nextSibling !== l &&
          ((m = b().createTextNode("")), (f = 0));
        l.parentNode.insertBefore(m, l);
      }
    } else
      for (; m.nextSibling && "cursor" === m.nextSibling.localName; )
        m.parentNode.insertBefore(m.nextSibling, m);
    for (; m.previousSibling && m.previousSibling.nodeType === Node.TEXT_NODE; )
      (e = m.previousSibling),
        e.appendData(m.data),
        (f = e.length),
        (m = e),
        m.parentNode.removeChild(m.nextSibling);
    for (; m.nextSibling && m.nextSibling.nodeType === Node.TEXT_NODE; )
      (e = m.nextSibling), m.appendData(e.data), m.parentNode.removeChild(e);
    return { textNode: m, offset: f };
  };
  this.fixCursorPositions = function () {
    Object.keys(y).forEach(function (c) {
      var b = y[c],
        d = f(b.getNode()),
        e = a.createRootFilter(d),
        h,
        m,
        g,
        k = !1;
      g = b.getSelectedRange();
      h = l(g.startContainer, g.startOffset, d);
      m = n(g.startContainer, g.startOffset, [v, e], h);
      g.collapsed
        ? (d = m)
        : ((h = l(g.endContainer, g.endOffset, d)),
          (d = n(g.endContainer, g.endOffset, [v, e], h)));
      m.isStep() && d.isStep()
        ? m.container() !== d.container() ||
          m.offset() !== d.offset() ||
          (g.collapsed && b.getAnchorNode() === b.getNode()) ||
          ((k = !0), g.setStart(m.container(), m.offset()), g.collapse(!0))
        : ((k = !0),
          runtime.assert(
            m.roundToClosestStep(),
            "No walkable step found for cursor owned by " + c
          ),
          g.setStart(m.container(), m.offset()),
          runtime.assert(
            d.roundToClosestStep(),
            "No walkable step found for cursor owned by " + c
          ),
          g.setEnd(d.container(), d.offset()));
      k &&
        (b.setSelectedRange(g, b.hasForwardSelection()),
        a.emit(ops.Document.signalCursorMoved, b));
    });
  };
  this.getCursorPosition = function (a) {
    return (a = y[a]) ? u.convertDomPointToSteps(a.getNode(), 0) : 0;
  };
  this.getCursorSelection = function (a) {
    a = y[a];
    var c = 0,
      b = 0;
    a &&
      ((c = u.convertDomPointToSteps(a.getNode(), 0)),
      (b = u.convertDomPointToSteps(a.getAnchorNode(), 0)));
    return { position: b, length: c - b };
  };
  this.getPositionFilter = function () {
    return v;
  };
  this.getOdfCanvas = function () {
    return g;
  };
  this.getCanvas = function () {
    return g;
  };
  this.getRootNode = d;
  this.addMember = function (a) {
    runtime.assert(void 0 === x[a.getMemberId()], "This member already exists");
    x[a.getMemberId()] = a;
  };
  this.getMember = function (a) {
    return x.hasOwnProperty(a) ? x[a] : null;
  };
  this.removeMember = function (a) {
    delete x[a];
  };
  this.getCursor = function (a) {
    return y[a];
  };
  this.hasCursor = function (a) {
    return y.hasOwnProperty(a);
  };
  this.getMemberIds = function () {
    return Object.keys(x);
  };
  this.addCursor = function (c) {
    runtime.assert(Boolean(c), "OdtDocument::addCursor without cursor");
    var b = c.getMemberId(),
      d = a.convertCursorToDomRange(0, 0);
    runtime.assert(
      "string" === typeof b,
      "OdtDocument::addCursor has cursor without memberid"
    );
    runtime.assert(
      !y[b],
      "OdtDocument::addCursor is adding a duplicate cursor with memberid " + b
    );
    c.setSelectedRange(d, !0);
    y[b] = c;
  };
  this.removeCursor = function (c) {
    var b = y[c];
    return b
      ? (b.removeFromDocument(),
        delete y[c],
        a.emit(ops.Document.signalCursorRemoved, c),
        !0)
      : !1;
  };
  this.moveCursor = function (c, b, d, e) {
    c = y[c];
    b = a.convertCursorToDomRange(b, d);
    c &&
      (c.setSelectedRange(b, 0 <= d),
      c.setSelectionType(e || ops.OdtCursor.RangeSelection));
  };
  this.getFormatting = function () {
    return g.getFormatting();
  };
  this.emit = function (a, c) {
    z.emit(a, c);
  };
  this.subscribe = function (a, c) {
    z.subscribe(a, c);
  };
  this.unsubscribe = function (a, c) {
    z.unsubscribe(a, c);
  };
  this.createRootFilter = function (a) {
    return new RootFilter(a, y, f);
  };
  this.close = function (a) {
    a();
  };
  this.destroy = function (a) {
    a();
  };
  (function () {
    var a = d();
    v = new ops.TextPositionFilter();
    c = new odf.StepUtils();
    u = new ops.OdtStepsTranslator(a, k(a), v, 500);
    z.subscribe(ops.OdtDocument.signalStepsInserted, u.handleStepsInserted);
    z.subscribe(ops.OdtDocument.signalStepsRemoved, u.handleStepsRemoved);
    z.subscribe(ops.OdtDocument.signalOperationEnd, q);
    z.subscribe(
      ops.OdtDocument.signalProcessingBatchEnd,
      core.Task.processTasks
    );
  })();
};
ops.OdtDocument.signalParagraphChanged = "paragraph/changed";
ops.OdtDocument.signalTableAdded = "table/added";
ops.OdtDocument.signalCommonStyleCreated = "style/created";
ops.OdtDocument.signalCommonStyleDeleted = "style/deleted";
ops.OdtDocument.signalParagraphStyleModified = "paragraphstyle/modified";
ops.OdtDocument.signalOperationStart = "operation/start";
ops.OdtDocument.signalOperationEnd = "operation/end";
ops.OdtDocument.signalProcessingBatchStart = "router/batchstart";
ops.OdtDocument.signalProcessingBatchEnd = "router/batchend";
ops.OdtDocument.signalUndoStackChanged = "undo/changed";
ops.OdtDocument.signalStepsInserted = "steps/inserted";
ops.OdtDocument.signalStepsRemoved = "steps/removed";
ops.OdtDocument.signalMetadataUpdated = "metadata/updated";
ops.OdtDocument.signalAnnotationAdded = "annotation/added";
ops.OpAddAnnotation = function () {
  function g(b, d, e) {
    var f = b.getTextNodeAtStep(e, k);
    f &&
      ((b = f.textNode),
      (e = b.parentNode),
      f.offset !== b.length && b.splitText(f.offset),
      e.insertBefore(d, b.nextSibling),
      0 === b.length && e.removeChild(b));
  }
  var k, d, b, f, n, p;
  this.init = function (g) {
    k = g.memberid;
    d = parseInt(g.timestamp, 10);
    b = parseInt(g.position, 10);
    f = void 0 !== g.length ? parseInt(g.length, 10) || 0 : void 0;
    n = g.name;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (r) {
    var q = r.getCursor(k),
      e,
      l;
    p = r.getDOMDocument();
    var a = new Date(d),
      c,
      m,
      h;
    c = p.createElementNS(odf.Namespaces.officens, "office:annotation");
    c.setAttributeNS(odf.Namespaces.officens, "office:name", n);
    e = p.createElementNS(odf.Namespaces.dcns, "dc:creator");
    e.setAttributeNS("urn:webodf:names:editinfo", "editinfo:memberid", k);
    e.textContent = r.getMember(k).getProperties().fullName;
    l = p.createElementNS(odf.Namespaces.dcns, "dc:date");
    l.appendChild(p.createTextNode(a.toISOString()));
    a = p.createElementNS(odf.Namespaces.textns, "text:list");
    m = p.createElementNS(odf.Namespaces.textns, "text:list-item");
    h = p.createElementNS(odf.Namespaces.textns, "text:p");
    m.appendChild(h);
    a.appendChild(m);
    c.appendChild(e);
    c.appendChild(l);
    c.appendChild(a);
    void 0 !== f &&
      ((e = p.createElementNS(
        odf.Namespaces.officens,
        "office:annotation-end"
      )),
      e.setAttributeNS(odf.Namespaces.officens, "office:name", n),
      (c.annotationEndElement = e),
      g(r, e, b + f));
    g(r, c, b);
    r.emit(ops.OdtDocument.signalStepsInserted, { position: b });
    q &&
      ((e = p.createRange()),
      (l = c.getElementsByTagNameNS(odf.Namespaces.textns, "p")[0]),
      e.selectNodeContents(l),
      q.setSelectedRange(e, !1),
      q.setSelectionType(ops.OdtCursor.RangeSelection),
      r.emit(ops.Document.signalCursorMoved, q));
    r.getOdfCanvas().addAnnotation(c);
    r.fixCursorPositions();
    r.emit(ops.OdtDocument.signalAnnotationAdded, {
      memberId: k,
      annotation: c,
    });
    return !0;
  };
  this.spec = function () {
    return {
      optype: "AddAnnotation",
      memberid: k,
      timestamp: d,
      position: b,
      length: f,
      name: n,
    };
  };
};
ops.OpAddCursor = function () {
  var g, k;
  this.init = function (d) {
    g = d.memberid;
    k = d.timestamp;
  };
  this.isEdit = !1;
  this.group = void 0;
  this.execute = function (d) {
    var b = d.getCursor(g);
    if (b) return !1;
    b = new ops.OdtCursor(g, d);
    d.addCursor(b);
    d.emit(ops.Document.signalCursorAdded, b);
    return !0;
  };
  this.spec = function () {
    return { optype: "AddCursor", memberid: g, timestamp: k };
  };
};
ops.OpAddMember = function () {
  var g, k, d;
  this.init = function (b) {
    g = b.memberid;
    k = parseInt(b.timestamp, 10);
    d = b.setProperties;
  };
  this.isEdit = !1;
  this.group = void 0;
  this.execute = function (b) {
    var f;
    if (b.getMember(g)) return !1;
    f = new ops.Member(g, d);
    b.addMember(f);
    b.emit(ops.Document.signalMemberAdded, f);
    return !0;
  };
  this.spec = function () {
    return { optype: "AddMember", memberid: g, timestamp: k, setProperties: d };
  };
};
ops.OpAddStyle = function () {
  var g,
    k,
    d,
    b,
    f,
    n,
    p = odf.Namespaces.stylens;
  this.init = function (p) {
    g = p.memberid;
    k = p.timestamp;
    d = p.styleName;
    b = p.styleFamily;
    f = "true" === p.isAutomaticStyle || !0 === p.isAutomaticStyle;
    n = p.setProperties;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (g) {
    var k = g.getOdfCanvas().odfContainer(),
      e = g.getFormatting(),
      l = g.getDOMDocument().createElementNS(p, "style:style");
    if (!l) return !1;
    n && e.updateStyle(l, n);
    l.setAttributeNS(p, "style:family", b);
    l.setAttributeNS(p, "style:name", d);
    f
      ? k.rootElement.automaticStyles.appendChild(l)
      : k.rootElement.styles.appendChild(l);
    g.getOdfCanvas().refreshCSS();
    f ||
      g.emit(ops.OdtDocument.signalCommonStyleCreated, { name: d, family: b });
    return !0;
  };
  this.spec = function () {
    return {
      optype: "AddStyle",
      memberid: g,
      timestamp: k,
      styleName: d,
      styleFamily: b,
      isAutomaticStyle: f,
      setProperties: n,
    };
  };
};
odf.ObjectNameGenerator = function (g, k) {
  function d(a, c) {
    var b = {};
    this.generateName = function () {
      var d = c(),
        e = 0,
        f;
      do (f = a + e), (e += 1);
      while (b[f] || d[f]);
      b[f] = !0;
      return f;
    };
  }
  function b() {
    var a = {};
    [g.rootElement.automaticStyles, g.rootElement.styles].forEach(function (c) {
      for (c = c.firstElementChild; c; )
        c.namespaceURI === f &&
          "style" === c.localName &&
          (a[c.getAttributeNS(f, "name")] = !0),
          (c = c.nextElementSibling);
    });
    return a;
  }
  var f = odf.Namespaces.stylens,
    n = odf.Namespaces.drawns,
    p = odf.Namespaces.xlinkns,
    r = new core.Utils().hashString(k),
    q = null,
    e = null,
    l = null,
    a = {},
    c = {};
  this.generateStyleName = function () {
    null === q &&
      (q = new d("auto" + r + "_", function () {
        return b();
      }));
    return q.generateName();
  };
  this.generateFrameName = function () {
    var c, b, f;
    if (null === e) {
      b = g.rootElement.body.getElementsByTagNameNS(n, "frame");
      for (c = 0; c < b.length; c += 1)
        (f = b.item(c)), (a[f.getAttributeNS(n, "name")] = !0);
      e = new d("fr" + r + "_", function () {
        return a;
      });
    }
    return e.generateName();
  };
  this.generateImageName = function () {
    var a, b, e;
    if (null === l) {
      e = g.rootElement.body.getElementsByTagNameNS(n, "image");
      for (a = 0; a < e.length; a += 1)
        (b = e.item(a)),
          (b = b.getAttributeNS(p, "href")),
          (b = b.substring(9, b.lastIndexOf("."))),
          (c[b] = !0);
      l = new d("img" + r + "_", function () {
        return c;
      });
    }
    return l.generateName();
  };
};
odf.TextStyleApplicator = function (g, k, d) {
  function b(b) {
    function d(a, b) {
      return "object" === typeof a && "object" === typeof b
        ? Object.keys(a).every(function (e) {
            return d(a[e], b[e]);
          })
        : a === b;
    }
    var a = {};
    this.isStyleApplied = function (c) {
      c = k.getAppliedStylesForElement(c, a).styleProperties;
      return d(b, c);
    };
  }
  function f(b) {
    var f = {};
    this.applyStyleToContainer = function (a) {
      var c;
      c = a.getAttributeNS(r, "style-name");
      var m = a.ownerDocument;
      c = c || "";
      if (!f.hasOwnProperty(c)) {
        var h = c,
          n;
        n = c ? k.createDerivedStyleObject(c, "text", b) : b;
        m = m.createElementNS(q, "style:style");
        k.updateStyle(m, n);
        m.setAttributeNS(q, "style:name", g.generateStyleName());
        m.setAttributeNS(q, "style:family", "text");
        m.setAttributeNS("urn:webodf:names:scope", "scope", "document-content");
        d.appendChild(m);
        f[h] = m;
      }
      c = f[c].getAttributeNS(q, "name");
      a.setAttributeNS(r, "text:style-name", c);
    };
  }
  function n(b, d) {
    var a = b.ownerDocument,
      c = b.parentNode,
      m,
      h,
      f,
      g = new core.LoopWatchDog(1e4);
    h = [];
    h.push(b);
    for (f = b.nextSibling; f && p.rangeContainsNode(d, f); )
      g.check(), h.push(f), (f = f.nextSibling);
    "span" !== c.localName || c.namespaceURI !== r
      ? ((m = a.createElementNS(r, "text:span")),
        c.insertBefore(m, b),
        (a = !1))
      : (b.previousSibling && !p.rangeContainsNode(d, c.firstChild)
          ? ((m = c.cloneNode(!1)), c.parentNode.insertBefore(m, c.nextSibling))
          : (m = c),
        (a = !0));
    h.forEach(function (a) {
      a.parentNode !== m && m.appendChild(a);
    });
    if (f && a)
      for (
        h = m.cloneNode(!1), m.parentNode.insertBefore(h, m.nextSibling);
        f;

      )
        g.check(), (a = f.nextSibling), h.appendChild(f), (f = a);
    return m;
  }
  var p = core.DomUtils,
    r = odf.Namespaces.textns,
    q = odf.Namespaces.stylens;
  this.applyStyle = function (d, g, a) {
    var c = {},
      m,
      h,
      k,
      p;
    runtime.assert(
      a && a.hasOwnProperty("style:text-properties"),
      "applyStyle without any text properties"
    );
    c["style:text-properties"] = a["style:text-properties"];
    k = new f(c);
    p = new b(c);
    d.forEach(function (a) {
      m = p.isStyleApplied(a);
      !1 === m && ((h = n(a, g)), k.applyStyleToContainer(h));
    });
  };
};
ops.OpApplyDirectStyling = function () {
  function g(b, d, f) {
    var a = b.getOdfCanvas().odfContainer(),
      c = r.splitBoundaries(d),
      m = p.getTextNodes(d, !1);
    new odf.TextStyleApplicator(
      new odf.ObjectNameGenerator(a, k),
      b.getFormatting(),
      a.rootElement.automaticStyles
    ).applyStyle(m, d, f);
    c.forEach(r.normalizeTextNodes);
  }
  var k,
    d,
    b,
    f,
    n,
    p = odf.OdfUtils,
    r = core.DomUtils;
  this.init = function (g) {
    k = g.memberid;
    d = g.timestamp;
    b = parseInt(g.position, 10);
    f = parseInt(g.length, 10);
    n = g.setProperties;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (r) {
    var e = r.convertCursorToDomRange(b, f),
      l = p.getParagraphElements(e);
    g(r, e, n);
    e.detach();
    r.getOdfCanvas().refreshCSS();
    r.fixCursorPositions();
    l.forEach(function (a) {
      r.emit(ops.OdtDocument.signalParagraphChanged, {
        paragraphElement: a,
        memberId: k,
        timeStamp: d,
      });
    });
    r.getOdfCanvas().rerenderAnnotations();
    return !0;
  };
  this.spec = function () {
    return {
      optype: "ApplyDirectStyling",
      memberid: k,
      timestamp: d,
      position: b,
      length: f,
      setProperties: n,
    };
  };
};
ops.OpApplyHyperlink = function () {
  function g(b) {
    for (; b; ) {
      if (r.isHyperlink(b)) return !0;
      b = b.parentNode;
    }
    return !1;
  }
  var k,
    d,
    b,
    f,
    n,
    p = core.DomUtils,
    r = odf.OdfUtils;
  this.init = function (g) {
    k = g.memberid;
    d = g.timestamp;
    b = g.position;
    f = g.length;
    n = g.hyperlink;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (q) {
    var e = q.getDOMDocument(),
      l = q.convertCursorToDomRange(b, f),
      a = p.splitBoundaries(l),
      c = [],
      m = r.getTextNodes(l, !1);
    if (0 === m.length) return !1;
    m.forEach(function (a) {
      var b = r.getParagraphElement(a);
      runtime.assert(
        !1 === g(a),
        "The given range should not contain any link."
      );
      var d = n,
        m = e.createElementNS(odf.Namespaces.textns, "text:a");
      m.setAttributeNS(odf.Namespaces.xlinkns, "xlink:type", "simple");
      m.setAttributeNS(odf.Namespaces.xlinkns, "xlink:href", d);
      a.parentNode.insertBefore(m, a);
      m.appendChild(a);
      -1 === c.indexOf(b) && c.push(b);
    });
    a.forEach(p.normalizeTextNodes);
    l.detach();
    q.fixCursorPositions();
    q.getOdfCanvas().refreshSize();
    q.getOdfCanvas().rerenderAnnotations();
    c.forEach(function (a) {
      q.emit(ops.OdtDocument.signalParagraphChanged, {
        paragraphElement: a,
        memberId: k,
        timeStamp: d,
      });
    });
    return !0;
  };
  this.spec = function () {
    return {
      optype: "ApplyHyperlink",
      memberid: k,
      timestamp: d,
      position: b,
      length: f,
      hyperlink: n,
    };
  };
};
ops.OpInsertImage = function () {
  var g,
    k,
    d,
    b,
    f,
    n,
    p,
    r,
    q = odf.Namespaces.drawns,
    e = odf.Namespaces.svgns,
    l = odf.Namespaces.textns,
    a = odf.Namespaces.xlinkns,
    c = odf.OdfUtils;
  this.init = function (a) {
    g = a.memberid;
    k = a.timestamp;
    d = a.position;
    b = a.filename;
    f = a.frameWidth;
    n = a.frameHeight;
    p = a.frameStyleName;
    r = a.frameName;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (m) {
    var h = m.getOdfCanvas(),
      y = m.getTextNodeAtStep(d, g),
      x,
      z;
    if (!y) return !1;
    x = y.textNode;
    z = c.getParagraphElement(x);
    var y = y.offset !== x.length ? x.splitText(y.offset) : x.nextSibling,
      w = m.getDOMDocument(),
      v = w.createElementNS(q, "draw:image"),
      w = w.createElementNS(q, "draw:frame");
    v.setAttributeNS(a, "xlink:href", b);
    v.setAttributeNS(a, "xlink:type", "simple");
    v.setAttributeNS(a, "xlink:show", "embed");
    v.setAttributeNS(a, "xlink:actuate", "onLoad");
    w.setAttributeNS(q, "draw:style-name", p);
    w.setAttributeNS(q, "draw:name", r);
    w.setAttributeNS(l, "text:anchor-type", "as-char");
    w.setAttributeNS(e, "svg:width", f);
    w.setAttributeNS(e, "svg:height", n);
    w.appendChild(v);
    x.parentNode.insertBefore(w, y);
    m.emit(ops.OdtDocument.signalStepsInserted, { position: d });
    0 === x.length && x.parentNode.removeChild(x);
    h.addCssForFrameWithImage(w);
    h.refreshCSS();
    m.emit(ops.OdtDocument.signalParagraphChanged, {
      paragraphElement: z,
      memberId: g,
      timeStamp: k,
    });
    h.rerenderAnnotations();
    return !0;
  };
  this.spec = function () {
    return {
      optype: "InsertImage",
      memberid: g,
      timestamp: k,
      filename: b,
      position: d,
      frameWidth: f,
      frameHeight: n,
      frameStyleName: p,
      frameName: r,
    };
  };
};
ops.OpInsertTable = function () {
  function g(a, c) {
    var d;
    if (1 === e.length) d = e[0];
    else if (3 === e.length)
      switch (a) {
        case 0:
          d = e[0];
          break;
        case b - 1:
          d = e[2];
          break;
        default:
          d = e[1];
      }
    else d = e[a];
    if (1 === d.length) return d[0];
    if (3 === d.length)
      switch (c) {
        case 0:
          return d[0];
        case f - 1:
          return d[2];
        default:
          return d[1];
      }
    return d[c];
  }
  var k,
    d,
    b,
    f,
    n,
    p,
    r,
    q,
    e,
    l = odf.OdfUtils;
  this.init = function (a) {
    k = a.memberid;
    d = a.timestamp;
    n = a.position;
    b = a.initialRows;
    f = a.initialColumns;
    p = a.tableName;
    r = a.tableStyleName;
    q = a.tableColumnStyleName;
    e = a.tableCellStyleMatrix;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (a) {
    var c = a.getTextNodeAtStep(n),
      e = a.getRootNode();
    if (c) {
      var h = a.getDOMDocument(),
        y = h.createElementNS(
          "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
          "table:table"
        ),
        x = h.createElementNS(
          "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
          "table:table-column"
        ),
        z,
        w,
        v,
        u;
      r &&
        y.setAttributeNS(
          "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
          "table:style-name",
          r
        );
      p &&
        y.setAttributeNS(
          "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
          "table:name",
          p
        );
      x.setAttributeNS(
        "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
        "table:number-columns-repeated",
        f
      );
      q &&
        x.setAttributeNS(
          "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
          "table:style-name",
          q
        );
      y.appendChild(x);
      for (v = 0; v < b; v += 1) {
        x = h.createElementNS(
          "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
          "table:table-row"
        );
        for (u = 0; u < f; u += 1)
          (z = h.createElementNS(
            "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
            "table:table-cell"
          )),
            (w = g(v, u)) &&
              z.setAttributeNS(
                "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
                "table:style-name",
                w
              ),
            (w = h.createElementNS(
              "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
              "text:p"
            )),
            z.appendChild(w),
            x.appendChild(z);
        y.appendChild(x);
      }
      c = l.getParagraphElement(c.textNode);
      e.insertBefore(y, c.nextSibling);
      a.emit(ops.OdtDocument.signalStepsInserted, { position: n });
      a.getOdfCanvas().refreshSize();
      a.emit(ops.OdtDocument.signalTableAdded, {
        tableElement: y,
        memberId: k,
        timeStamp: d,
      });
      a.getOdfCanvas().rerenderAnnotations();
      return !0;
    }
    return !1;
  };
  this.spec = function () {
    return {
      optype: "InsertTable",
      memberid: k,
      timestamp: d,
      position: n,
      initialRows: b,
      initialColumns: f,
      tableName: p,
      tableStyleName: r,
      tableColumnStyleName: q,
      tableCellStyleMatrix: e,
    };
  };
};
ops.OpInsertText = function () {
  function g(b) {
    return "\t" !== b && p.isODFWhitespace(b);
  }
  var k,
    d,
    b,
    f,
    n,
    p = odf.OdfUtils;
  this.init = function (g) {
    k = g.memberid;
    d = g.timestamp;
    b = g.position;
    n = g.text;
    f = "true" === g.moveCursor || !0 === g.moveCursor;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (r) {
    var q,
      e,
      l,
      a = null,
      c = r.getDOMDocument(),
      m,
      h = 0,
      y,
      x = r.getCursor(k),
      z;
    r.upgradeWhitespacesAtPosition(b);
    if ((q = r.getTextNodeAtStep(b))) {
      e = q.textNode;
      a = e.nextSibling;
      l = e.parentNode;
      m = p.getParagraphElement(e);
      for (z = 0; z < n.length; z += 1) {
        if (!(y = "\t" === n[z])) {
          y = n;
          var w = z;
          y = g(y[w]) && (0 === w || w === y.length - 1 || g(y[w - 1]));
        }
        y &&
          (0 === h
            ? (q.offset !== e.length && (a = e.splitText(q.offset)),
              0 < z && e.appendData(n.substring(0, z)))
            : h < z &&
              ((h = n.substring(h, z)), l.insertBefore(c.createTextNode(h), a)),
          (h = z + 1),
          "\t" === n[z]
            ? ((y = c.createElementNS(
                "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
                "text:tab"
              )),
              y.appendChild(c.createTextNode("\t")))
            : (" " !== n[z] &&
                runtime.log(
                  "WARN: InsertText operation contains non-tab, non-space whitespace character (character code " +
                    n.charCodeAt(z) +
                    ")"
                ),
              (y = c.createElementNS(
                "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
                "text:s"
              )),
              y.appendChild(c.createTextNode(" "))),
          l.insertBefore(y, a));
      }
      0 === h
        ? e.insertData(q.offset, n)
        : h < n.length &&
          ((q = n.substring(h)), l.insertBefore(c.createTextNode(q), a));
      l = e.parentNode;
      a = e.nextSibling;
      l.removeChild(e);
      l.insertBefore(e, a);
      0 === e.length && e.parentNode.removeChild(e);
      r.emit(ops.OdtDocument.signalStepsInserted, { position: b });
      x &&
        f &&
        (r.moveCursor(k, b + n.length, 0),
        r.emit(ops.Document.signalCursorMoved, x));
      r.downgradeWhitespacesAtPosition(b);
      r.downgradeWhitespacesAtPosition(b + n.length);
      r.getOdfCanvas().refreshSize();
      r.emit(ops.OdtDocument.signalParagraphChanged, {
        paragraphElement: m,
        memberId: k,
        timeStamp: d,
      });
      r.getOdfCanvas().rerenderAnnotations();
      return !0;
    }
    return !1;
  };
  this.spec = function () {
    return {
      optype: "InsertText",
      memberid: k,
      timestamp: d,
      position: b,
      text: n,
      moveCursor: f,
    };
  };
};
odf.CollapsingRules = function (g) {
  function k(d) {
    return b.isODFNode(d) ||
      ("br" === d.localName && b.isLineBreak(d.parentNode)) ||
      (d.nodeType === Node.TEXT_NODE && b.isODFNode(d.parentNode))
      ? NodeFilter.FILTER_REJECT
      : NodeFilter.FILTER_ACCEPT;
  }
  function d(n) {
    var p;
    n.nodeType === Node.TEXT_NODE
      ? ((p = n.parentNode), p.removeChild(n))
      : (p = f.removeUnwantedNodes(n, k));
    if ((n = p))
      (n = p), (n = !b.isParagraph(n) && n !== g && b.hasNoODFContent(n));
    return n ? d(p) : p;
  }
  var b = odf.OdfUtils,
    f = core.DomUtils;
  this.mergeChildrenIntoParent = d;
};
ops.OpMergeParagraph = function () {
  function g(a) {
    return odf.OdfUtils.isInlineRoot(a)
      ? NodeFilter.FILTER_SKIP
      : l.isGroupingElement(a) && l.hasNoODFContent(a)
      ? NodeFilter.FILTER_REJECT
      : NodeFilter.FILTER_ACCEPT;
  }
  function k(a) {
    if (a.nodeType === Node.TEXT_NODE) {
      if (0 === a.length)
        return (
          runtime.log("WARN: Empty text node found during merge operation"), !0
        );
      if (l.isODFWhitespace(a.data) && !1 === l.isSignificantWhitespace(a, 0))
        return !0;
      a = "#text";
    } else a = (a.prefix ? a.prefix + ":" : "") + a.localName;
    runtime.log(
      "WARN: Unexpected text element found near paragraph boundary [" + a + "]"
    );
    return !1;
  }
  function d(c) {
    c.collapsed ||
      (a.splitBoundaries(c),
      (c = l.getTextElements(c, !1, !0).filter(k)),
      c.forEach(function (a) {
        a.parentNode.removeChild(a);
      }));
  }
  function b(a, c, b) {
    a = a.convertCursorStepToDomPoint(c);
    var d = l.getParagraphElement(a.node, a.offset);
    runtime.assert(Boolean(d), "Paragraph not found at step " + c);
    b && b.setPosition(a.node, a.offset);
    return d;
  }
  var f,
    n,
    p,
    r,
    q,
    e,
    l = odf.OdfUtils,
    a = core.DomUtils,
    c = odf.Namespaces.textns;
  this.init = function (a) {
    f = a.memberid;
    n = a.timestamp;
    p = a.moveCursor;
    r = a.paragraphStyleName;
    q = parseInt(a.sourceStartPosition, 10);
    e = parseInt(a.destinationStartPosition, 10);
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (m) {
    var h,
      l,
      k = m.getCursor(f);
    h = m.getRootNode();
    var z = new odf.CollapsingRules(h),
      w = m.createStepIterator(h, 0, [m.getPositionFilter()], h),
      v;
    runtime.assert(
      e < q,
      "Destination paragraph (" +
        e +
        ") must be before source paragraph (" +
        q +
        ")"
    );
    l = b(m, e);
    h = b(m, q, w);
    w.previousStep();
    runtime.assert(
      a.containsNode(l, w.container()),
      "Destination paragraph must be adjacent to the source paragraph"
    );
    v = l.ownerDocument.createRange();
    w.setPosition(l, l.childNodes.length);
    w.roundToPreviousStep();
    v.setStart(w.container(), w.offset());
    v.setEnd(l, l.childNodes.length);
    d(v);
    v = l.childNodes.length;
    var u = h.ownerDocument.createRange();
    w.setPosition(h, 0);
    w.roundToNextStep();
    u.setStart(h, 0);
    u.setEnd(w.container(), w.offset());
    d(u);
    for (u = h.firstChild; u; )
      "editinfo" === u.localName
        ? h.removeChild(u)
        : (l.appendChild(u), a.removeUnwantedNodes(u, g)),
        (u = h.firstChild);
    runtime.assert(
      0 === h.childNodes.length,
      "Source paragraph should be empty before it is removed"
    );
    z.mergeChildrenIntoParent(h);
    m.emit(ops.OdtDocument.signalStepsRemoved, { position: q - 1 });
    w.setPosition(l, v);
    w.roundToClosestStep();
    w.previousStep() || w.roundToNextStep();
    m.downgradeWhitespaces(w);
    r
      ? l.setAttributeNS(c, "text:style-name", r)
      : l.removeAttributeNS(c, "style-name");
    k &&
      p &&
      (m.moveCursor(f, q - 1, 0), m.emit(ops.Document.signalCursorMoved, k));
    m.fixCursorPositions();
    m.getOdfCanvas().refreshSize();
    m.emit(ops.OdtDocument.signalParagraphChanged, {
      paragraphElement: l,
      memberId: f,
      timeStamp: n,
    });
    m.getOdfCanvas().rerenderAnnotations();
    return !0;
  };
  this.spec = function () {
    return {
      optype: "MergeParagraph",
      memberid: f,
      timestamp: n,
      moveCursor: p,
      paragraphStyleName: r,
      sourceStartPosition: q,
      destinationStartPosition: e,
    };
  };
};
ops.OpMoveCursor = function () {
  var g, k, d, b, f;
  this.init = function (n) {
    g = n.memberid;
    k = n.timestamp;
    d = n.position;
    b = n.length || 0;
    f = n.selectionType || ops.OdtCursor.RangeSelection;
  };
  this.isEdit = !1;
  this.group = void 0;
  this.execute = function (n) {
    var k = n.getCursor(g),
      r;
    if (!k) return !1;
    r = n.convertCursorToDomRange(d, b);
    k.setSelectedRange(r, 0 <= b);
    k.setSelectionType(f);
    n.emit(ops.Document.signalCursorMoved, k);
    return !0;
  };
  this.spec = function () {
    return {
      optype: "MoveCursor",
      memberid: g,
      timestamp: k,
      position: d,
      length: b,
      selectionType: f,
    };
  };
};
ops.OpRemoveAnnotation = function () {
  var g,
    k,
    d,
    b,
    f = core.DomUtils;
  this.init = function (f) {
    g = f.memberid;
    k = f.timestamp;
    d = parseInt(f.position, 10);
    b = parseInt(f.length, 10);
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (b) {
    function g(b) {
      q.parentNode.insertBefore(b, q);
    }
    for (
      var k = b.getIteratorAtPosition(d).container(), q;
      k.namespaceURI !== odf.Namespaces.officens ||
      "annotation" !== k.localName;

    )
      k = k.parentNode;
    if (null === k) return !1;
    q = k;
    k = q.annotationEndElement;
    b.getOdfCanvas().forgetAnnotation(q);
    f.getElementsByTagNameNS(q, "urn:webodf:names:cursor", "cursor").forEach(g);
    f.getElementsByTagNameNS(q, "urn:webodf:names:cursor", "anchor").forEach(g);
    q.parentNode.removeChild(q);
    k && k.parentNode.removeChild(k);
    b.emit(ops.OdtDocument.signalStepsRemoved, { position: 0 < d ? d - 1 : d });
    b.getOdfCanvas().rerenderAnnotations();
    b.fixCursorPositions();
    return !0;
  };
  this.spec = function () {
    return {
      optype: "RemoveAnnotation",
      memberid: g,
      timestamp: k,
      position: d,
      length: b,
    };
  };
};
ops.OpRemoveBlob = function () {
  var g, k, d;
  this.init = function (b) {
    g = b.memberid;
    k = b.timestamp;
    d = b.filename;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (b) {
    b.getOdfCanvas().odfContainer().removeBlob(d);
    return !0;
  };
  this.spec = function () {
    return { optype: "RemoveBlob", memberid: g, timestamp: k, filename: d };
  };
};
ops.OpRemoveCursor = function () {
  var g, k;
  this.init = function (d) {
    g = d.memberid;
    k = d.timestamp;
  };
  this.isEdit = !1;
  this.group = void 0;
  this.execute = function (d) {
    return d.removeCursor(g) ? !0 : !1;
  };
  this.spec = function () {
    return { optype: "RemoveCursor", memberid: g, timestamp: k };
  };
};
ops.OpRemoveHyperlink = function () {
  var g,
    k,
    d,
    b,
    f = core.DomUtils,
    n = odf.OdfUtils;
  this.init = function (f) {
    g = f.memberid;
    k = f.timestamp;
    d = f.position;
    b = f.length;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (p) {
    var r = p.convertCursorToDomRange(d, b),
      q = n.getHyperlinkElements(r);
    runtime.assert(
      1 === q.length,
      "The given range should only contain a single link."
    );
    q = f.mergeIntoParent(q[0]);
    r.detach();
    p.fixCursorPositions();
    p.getOdfCanvas().refreshSize();
    p.getOdfCanvas().rerenderAnnotations();
    p.emit(ops.OdtDocument.signalParagraphChanged, {
      paragraphElement: n.getParagraphElement(q),
      memberId: g,
      timeStamp: k,
    });
    return !0;
  };
  this.spec = function () {
    return {
      optype: "RemoveHyperlink",
      memberid: g,
      timestamp: k,
      position: d,
      length: b,
    };
  };
};
ops.OpRemoveMember = function () {
  var g, k;
  this.init = function (d) {
    g = d.memberid;
    k = parseInt(d.timestamp, 10);
  };
  this.isEdit = !1;
  this.group = void 0;
  this.execute = function (d) {
    if (!d.getMember(g)) return !1;
    d.removeMember(g);
    d.emit(ops.Document.signalMemberRemoved, g);
    return !0;
  };
  this.spec = function () {
    return { optype: "RemoveMember", memberid: g, timestamp: k };
  };
};
ops.OpRemoveStyle = function () {
  var g, k, d, b;
  this.init = function (f) {
    g = f.memberid;
    k = f.timestamp;
    d = f.styleName;
    b = f.styleFamily;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (f) {
    var g = f.getFormatting().getStyleElement(d, b);
    if (!g) return !1;
    g.parentNode.removeChild(g);
    f.getOdfCanvas().refreshCSS();
    f.emit(ops.OdtDocument.signalCommonStyleDeleted, { name: d, family: b });
    return !0;
  };
  this.spec = function () {
    return {
      optype: "RemoveStyle",
      memberid: g,
      timestamp: k,
      styleName: d,
      styleFamily: b,
    };
  };
};
ops.OpRemoveText = function () {
  var g,
    k,
    d,
    b,
    f = odf.OdfUtils,
    n = core.DomUtils;
  this.init = function (f) {
    runtime.assert(
      0 <= f.length,
      "OpRemoveText only supports positive lengths"
    );
    g = f.memberid;
    k = f.timestamp;
    d = parseInt(f.position, 10);
    b = parseInt(f.length, 10);
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (p) {
    var r,
      q,
      e,
      l = p.getCursor(g),
      a = new odf.CollapsingRules(p.getRootNode());
    p.upgradeWhitespacesAtPosition(d);
    p.upgradeWhitespacesAtPosition(d + b);
    r = p.convertCursorToDomRange(d, b);
    n.splitBoundaries(r);
    q = f.getTextElements(r, !1, !0);
    e = f.getParagraphElement(r.startContainer, r.startOffset);
    runtime.assert(
      void 0 !== e,
      "Attempting to remove text outside a paragraph element"
    );
    r.detach();
    q.forEach(function (c) {
      c.parentNode
        ? (runtime.assert(
            n.containsNode(e, c),
            "RemoveText only supports removing elements within the same paragraph"
          ),
          a.mergeChildrenIntoParent(c))
        : runtime.log(
            "WARN: text element has already been removed from it's container"
          );
    });
    p.emit(ops.OdtDocument.signalStepsRemoved, { position: d });
    p.downgradeWhitespacesAtPosition(d);
    p.fixCursorPositions();
    p.getOdfCanvas().refreshSize();
    p.emit(ops.OdtDocument.signalParagraphChanged, {
      paragraphElement: e,
      memberId: g,
      timeStamp: k,
    });
    l && (l.resetSelectionType(), p.emit(ops.Document.signalCursorMoved, l));
    p.getOdfCanvas().rerenderAnnotations();
    return !0;
  };
  this.spec = function () {
    return {
      optype: "RemoveText",
      memberid: g,
      timestamp: k,
      position: d,
      length: b,
    };
  };
};
ops.OpSetBlob = function () {
  var g, k, d, b, f;
  this.init = function (n) {
    g = n.memberid;
    k = n.timestamp;
    d = n.filename;
    b = n.mimetype;
    f = n.content;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (g) {
    g.getOdfCanvas().odfContainer().setBlob(d, b, f);
    return !0;
  };
  this.spec = function () {
    return {
      optype: "SetBlob",
      memberid: g,
      timestamp: k,
      filename: d,
      mimetype: b,
      content: f,
    };
  };
};
ops.OpSetParagraphStyle = function () {
  function g(b, d, f) {
    var e = [b.getPositionFilter()],
      g = f.container();
    f = f.unfilteredDomOffset();
    return !1 === b.createStepIterator(g, f, e, d).previousStep();
  }
  var k,
    d,
    b,
    f,
    n = odf.OdfUtils;
  this.init = function (g) {
    k = g.memberid;
    d = g.timestamp;
    b = g.position;
    f = g.styleName;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (p) {
    var r, q;
    r = p.getIteratorAtPosition(b);
    return (q = n.getParagraphElement(r.container()))
      ? (runtime.assert(
          g(p, q, r),
          "SetParagraphStyle position should be the first position in the paragraph"
        ),
        f
          ? q.setAttributeNS(
              "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
              "text:style-name",
              f
            )
          : q.removeAttributeNS(
              "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
              "style-name"
            ),
        p.getOdfCanvas().refreshSize(),
        p.emit(ops.OdtDocument.signalParagraphChanged, {
          paragraphElement: q,
          timeStamp: d,
          memberId: k,
        }),
        p.getOdfCanvas().rerenderAnnotations(),
        !0)
      : !1;
  };
  this.spec = function () {
    return {
      optype: "SetParagraphStyle",
      memberid: k,
      timestamp: d,
      position: b,
      styleName: f,
    };
  };
};
ops.OpSplitParagraph = function () {
  var g,
    k,
    d,
    b,
    f,
    n,
    p = odf.OdfUtils,
    r = odf.Namespaces.textns;
  this.init = function (p) {
    g = p.memberid;
    k = p.timestamp;
    b = p.position;
    d = p.sourceParagraphPosition;
    n = p.paragraphStyleName;
    f = "true" === p.moveCursor || !0 === p.moveCursor;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (d) {
    var e,
      l,
      a,
      c,
      m,
      h,
      y,
      x = d.getCursor(g);
    d.upgradeWhitespacesAtPosition(b);
    e = d.getTextNodeAtStep(b);
    if (!e) return !1;
    l = p.getParagraphElement(e.textNode);
    if (!l) return !1;
    a = p.isListItem(l.parentNode) ? l.parentNode : l;
    0 === e.offset
      ? ((y = e.textNode.previousSibling), (h = null))
      : ((y = e.textNode),
        (h =
          e.offset >= e.textNode.length
            ? null
            : e.textNode.splitText(e.offset)));
    for (c = e.textNode; c !== a; ) {
      c = c.parentNode;
      m = c.cloneNode(!1);
      h && m.appendChild(h);
      if (y) for (; y && y.nextSibling; ) m.appendChild(y.nextSibling);
      else for (; c.firstChild; ) m.appendChild(c.firstChild);
      c.parentNode.insertBefore(m, c.nextSibling);
      y = c;
      h = m;
    }
    p.isListItem(h) && (h = h.childNodes.item(0));
    n
      ? h.setAttributeNS(r, "text:style-name", n)
      : h.removeAttributeNS(r, "style-name");
    0 === e.textNode.length && e.textNode.parentNode.removeChild(e.textNode);
    d.emit(ops.OdtDocument.signalStepsInserted, { position: b });
    x &&
      f &&
      (d.moveCursor(g, b + 1, 0), d.emit(ops.Document.signalCursorMoved, x));
    d.fixCursorPositions();
    d.getOdfCanvas().refreshSize();
    d.emit(ops.OdtDocument.signalParagraphChanged, {
      paragraphElement: l,
      memberId: g,
      timeStamp: k,
    });
    d.emit(ops.OdtDocument.signalParagraphChanged, {
      paragraphElement: h,
      memberId: g,
      timeStamp: k,
    });
    d.getOdfCanvas().rerenderAnnotations();
    return !0;
  };
  this.spec = function () {
    return {
      optype: "SplitParagraph",
      memberid: g,
      timestamp: k,
      position: b,
      sourceParagraphPosition: d,
      paragraphStyleName: n,
      moveCursor: f,
    };
  };
};
ops.OpUpdateMember = function () {
  function g(d) {
    var f = "//dc:creator[@editinfo:memberid='" + k + "']";
    d = xmldom.XPath.getODFElementsWithXPath(d.getRootNode(), f, function (b) {
      return "editinfo" === b
        ? "urn:webodf:names:editinfo"
        : odf.Namespaces.lookupNamespaceURI(b);
    });
    for (f = 0; f < d.length; f += 1) d[f].textContent = b.fullName;
  }
  var k, d, b, f;
  this.init = function (g) {
    k = g.memberid;
    d = parseInt(g.timestamp, 10);
    b = g.setProperties;
    f = g.removedProperties;
  };
  this.isEdit = !1;
  this.group = void 0;
  this.execute = function (d) {
    var p = d.getMember(k);
    if (!p) return !1;
    f && p.removeProperties(f);
    b && (p.setProperties(b), b.fullName && g(d));
    d.emit(ops.Document.signalMemberUpdated, p);
    return !0;
  };
  this.spec = function () {
    return {
      optype: "UpdateMember",
      memberid: k,
      timestamp: d,
      setProperties: b,
      removedProperties: f,
    };
  };
};
ops.OpUpdateMetadata = function () {
  var g, k, d, b;
  this.init = function (f) {
    g = f.memberid;
    k = parseInt(f.timestamp, 10);
    d = f.setProperties;
    b = f.removedProperties;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (f) {
    var g = f.getOdfCanvas().odfContainer(),
      k = null;
    b && (k = b.attributes.split(","));
    g.setMetadata(d, k);
    f.emit(ops.OdtDocument.signalMetadataUpdated, {
      setProperties: null !== d ? d : {},
      removedProperties: null !== k ? k : [],
    });
    return !0;
  };
  this.spec = function () {
    return {
      optype: "UpdateMetadata",
      memberid: g,
      timestamp: k,
      setProperties: d,
      removedProperties: b,
    };
  };
};
ops.OpUpdateParagraphStyle = function () {
  function g(b, d) {
    var e,
      f,
      a = d ? d.split(",") : [];
    for (e = 0; e < a.length; e += 1)
      (f = a[e].split(":")),
        b.removeAttributeNS(odf.Namespaces.lookupNamespaceURI(f[0]), f[1]);
  }
  var k,
    d,
    b,
    f,
    n,
    p = odf.Namespaces.stylens;
  this.init = function (g) {
    k = g.memberid;
    d = g.timestamp;
    b = g.styleName;
    f = g.setProperties;
    n = g.removedProperties;
  };
  this.isEdit = !0;
  this.group = void 0;
  this.execute = function (d) {
    var k = d.getFormatting(),
      e,
      l,
      a;
    return (e =
      "" !== b
        ? k.getStyleElement(b, "paragraph")
        : k.getDefaultStyleElement("paragraph"))
      ? ((l = e.getElementsByTagNameNS(p, "paragraph-properties").item(0)),
        (a = e.getElementsByTagNameNS(p, "text-properties").item(0)),
        f && k.updateStyle(e, f),
        n &&
          ((k = n["style:paragraph-properties"]),
          l &&
            k &&
            (g(l, k.attributes), 0 === l.attributes.length && e.removeChild(l)),
          (k = n["style:text-properties"]),
          a &&
            k &&
            (g(a, k.attributes), 0 === a.attributes.length && e.removeChild(a)),
          g(e, n.attributes)),
        d.getOdfCanvas().refreshCSS(),
        d.emit(ops.OdtDocument.signalParagraphStyleModified, b),
        d.getOdfCanvas().rerenderAnnotations(),
        !0)
      : !1;
  };
  this.spec = function () {
    return {
      optype: "UpdateParagraphStyle",
      memberid: k,
      timestamp: d,
      styleName: b,
      setProperties: f,
      removedProperties: n,
    };
  };
};
ops.OperationFactory = function () {
  function g(d) {
    return function (b) {
      return new d();
    };
  }
  var k;
  this.register = function (d, b) {
    k[d] = b;
  };
  this.create = function (d) {
    var b = null,
      f = k[d.optype];
    f && ((b = f(d)), b.init(d));
    return b;
  };
  k = {
    AddMember: g(ops.OpAddMember),
    UpdateMember: g(ops.OpUpdateMember),
    RemoveMember: g(ops.OpRemoveMember),
    AddCursor: g(ops.OpAddCursor),
    ApplyDirectStyling: g(ops.OpApplyDirectStyling),
    SetBlob: g(ops.OpSetBlob),
    RemoveBlob: g(ops.OpRemoveBlob),
    InsertImage: g(ops.OpInsertImage),
    InsertTable: g(ops.OpInsertTable),
    InsertText: g(ops.OpInsertText),
    RemoveText: g(ops.OpRemoveText),
    MergeParagraph: g(ops.OpMergeParagraph),
    SplitParagraph: g(ops.OpSplitParagraph),
    SetParagraphStyle: g(ops.OpSetParagraphStyle),
    UpdateParagraphStyle: g(ops.OpUpdateParagraphStyle),
    AddStyle: g(ops.OpAddStyle),
    RemoveStyle: g(ops.OpRemoveStyle),
    MoveCursor: g(ops.OpMoveCursor),
    RemoveCursor: g(ops.OpRemoveCursor),
    AddAnnotation: g(ops.OpAddAnnotation),
    RemoveAnnotation: g(ops.OpRemoveAnnotation),
    UpdateMetadata: g(ops.OpUpdateMetadata),
    ApplyHyperlink: g(ops.OpApplyHyperlink),
    RemoveHyperlink: g(ops.OpRemoveHyperlink),
  };
};
ops.OperationRouter = function () {};
ops.OperationRouter.prototype.setOperationFactory = function (g) {};
ops.OperationRouter.prototype.setPlaybackFunction = function (g) {};
ops.OperationRouter.prototype.push = function (g) {};
ops.OperationRouter.prototype.close = function (g) {};
ops.OperationRouter.prototype.subscribe = function (g, k) {};
ops.OperationRouter.prototype.unsubscribe = function (g, k) {};
ops.OperationRouter.prototype.hasLocalUnsyncedOps = function () {};
ops.OperationRouter.prototype.hasSessionHostConnection = function () {};
ops.OperationRouter.signalProcessingBatchStart = "router/batchstart";
ops.OperationRouter.signalProcessingBatchEnd = "router/batchend";
ops.TrivialOperationRouter = function () {
  var g = new core.EventNotifier([
      ops.OperationRouter.signalProcessingBatchStart,
      ops.OperationRouter.signalProcessingBatchEnd,
    ]),
    k,
    d,
    b = 0;
  this.setOperationFactory = function (b) {
    k = b;
  };
  this.setPlaybackFunction = function (b) {
    d = b;
  };
  this.push = function (f) {
    b += 1;
    g.emit(ops.OperationRouter.signalProcessingBatchStart, {});
    f.forEach(function (f) {
      f = f.spec();
      f.timestamp = Date.now();
      f = k.create(f);
      f.group = "g" + b;
      d(f);
    });
    g.emit(ops.OperationRouter.signalProcessingBatchEnd, {});
  };
  this.close = function (b) {
    b();
  };
  this.subscribe = function (b, d) {
    g.subscribe(b, d);
  };
  this.unsubscribe = function (b, d) {
    g.unsubscribe(b, d);
  };
  this.hasLocalUnsyncedOps = function () {
    return !1;
  };
  this.hasSessionHostConnection = function () {
    return !0;
  };
};
ops.Session = function (g) {
  function k(b) {
    f.emit(ops.OdtDocument.signalProcessingBatchStart, b);
  }
  function d(b) {
    f.emit(ops.OdtDocument.signalProcessingBatchEnd, b);
  }
  var b = new ops.OperationFactory(),
    f = new ops.OdtDocument(g),
    n = null;
  this.setOperationFactory = function (d) {
    b = d;
    n && n.setOperationFactory(b);
  };
  this.setOperationRouter = function (g) {
    n &&
      (n.unsubscribe(ops.OperationRouter.signalProcessingBatchStart, k),
      n.unsubscribe(ops.OperationRouter.signalProcessingBatchEnd, d));
    n = g;
    n.subscribe(ops.OperationRouter.signalProcessingBatchStart, k);
    n.subscribe(ops.OperationRouter.signalProcessingBatchEnd, d);
    g.setPlaybackFunction(function (b) {
      f.emit(ops.OdtDocument.signalOperationStart, b);
      return b.execute(f)
        ? (f.emit(ops.OdtDocument.signalOperationEnd, b), !0)
        : !1;
    });
    g.setOperationFactory(b);
  };
  this.getOperationFactory = function () {
    return b;
  };
  this.getOdtDocument = function () {
    return f;
  };
  this.enqueue = function (b) {
    n.push(b);
  };
  this.close = function (b) {
    n.close(function (d) {
      d ? b(d) : f.close(b);
    });
  };
  this.destroy = function (b) {
    f.destroy(b);
  };
  this.setOperationRouter(new ops.TrivialOperationRouter());
};
gui.AnnotationController = function (g, k, d) {
  function b() {
    var a = r.getCursor(d),
      a = a && a.getNode(),
      b = !1;
    a && (b = !l.isWithinAnnotation(a, r.getRootNode()));
    b !== q &&
      ((q = b), e.emit(gui.AnnotationController.annotatableChanged, q));
  }
  function f(a) {
    a.getMemberId() === d && b();
  }
  function n(a) {
    a === d && b();
  }
  function p(a) {
    a.getMemberId() === d && b();
  }
  var r = g.getOdtDocument(),
    q = !1,
    e = new core.EventNotifier([gui.AnnotationController.annotatableChanged]),
    l = odf.OdfUtils,
    a = core.StepDirection.NEXT;
  this.isAnnotatable = function () {
    return q;
  };
  this.addAnnotation = function () {
    var a = new ops.OpAddAnnotation(),
      b = r.getCursorSelection(d),
      e = b.length,
      b = b.position;
    q &&
      (0 === e ? (e = void 0) : ((b = 0 <= e ? b : b + e), (e = Math.abs(e))),
      a.init({ memberid: d, position: b, length: e, name: d + Date.now() }),
      g.enqueue([a]));
  };
  this.removeAnnotation = function (c) {
    var b, e;
    b = r.getMember(d).getProperties().fullName;
    if (
      !0 !==
        k.getState(gui.CommonConstraints.EDIT.ANNOTATIONS.ONLY_DELETE_OWN) ||
      b === l.getAnnotationCreator(c)
    )
      (b = r.convertDomPointToCursorStep(c, 0, a)),
        (e = r.convertDomPointToCursorStep(c, c.childNodes.length)),
        (c = new ops.OpRemoveAnnotation()),
        c.init({ memberid: d, position: b, length: e - b }),
        (e = new ops.OpMoveCursor()),
        e.init({ memberid: d, position: 0 < b ? b - 1 : b, length: 0 }),
        g.enqueue([c, e]);
  };
  this.subscribe = function (a, b) {
    e.subscribe(a, b);
  };
  this.unsubscribe = function (a, b) {
    e.unsubscribe(a, b);
  };
  this.destroy = function (a) {
    r.unsubscribe(ops.Document.signalCursorAdded, f);
    r.unsubscribe(ops.Document.signalCursorRemoved, n);
    r.unsubscribe(ops.Document.signalCursorMoved, p);
    a();
  };
  k.registerConstraint(gui.CommonConstraints.EDIT.ANNOTATIONS.ONLY_DELETE_OWN);
  r.subscribe(ops.Document.signalCursorAdded, f);
  r.subscribe(ops.Document.signalCursorRemoved, n);
  r.subscribe(ops.Document.signalCursorMoved, p);
  b();
};
gui.AnnotationController.annotatableChanged = "annotatable/changed";
gui.Avatar = function (g, k) {
  var d = this,
    b,
    f,
    n;
  this.setColor = function (b) {
    f.style.borderColor = b;
  };
  this.setImageUrl = function (b) {
    d.isVisible() ? (f.src = b) : (n = b);
  };
  this.isVisible = function () {
    return "block" === b.style.display;
  };
  this.show = function () {
    n && ((f.src = n), (n = void 0));
    b.style.display = "block";
  };
  this.hide = function () {
    b.style.display = "none";
  };
  this.markAsFocussed = function (d) {
    d ? b.classList.add("active") : b.classList.remove("active");
  };
  this.destroy = function (d) {
    g.removeChild(b);
    d();
  };
  (function () {
    var d = g.ownerDocument;
    b = d.createElement("div");
    f = d.createElement("img");
    b.appendChild(f);
    b.style.display = k ? "block" : "none";
    b.className = "handle";
    g.appendChild(b);
  })();
};
gui.StepInfo = function () {};
gui.StepInfo.VisualDirection = { LEFT_TO_RIGHT: 0, RIGHT_TO_LEFT: 1 };
gui.StepInfo.prototype.container = function () {};
gui.StepInfo.prototype.offset = function () {};
gui.VisualStepScanner = function () {};
gui.VisualStepScanner.prototype.process = function (g, k, d) {};
gui.GuiStepUtils = function () {
  function g(f) {
    f = d.getContentBounds(f);
    var g,
      e = null;
    if (f)
      if (f.container.nodeType === Node.TEXT_NODE)
        (g = f.container.ownerDocument.createRange()),
          g.setStart(f.container, f.startOffset),
          g.setEnd(f.container, f.endOffset),
          (e =
            0 < g.getClientRects().length ? g.getBoundingClientRect() : null) &&
            " " === f.container.data.substring(f.startOffset, f.endOffset) &&
            1 >= e.width &&
            (e = null),
          g.detach();
      else if (
        k.isCharacterElement(f.container) ||
        k.isCharacterFrame(f.container)
      )
        e = b.getBoundingClientRect(f.container);
    return e;
  }
  var k = odf.OdfUtils,
    d = new odf.StepUtils(),
    b = core.DomUtils,
    f = core.StepDirection.NEXT,
    n = gui.StepInfo.VisualDirection.LEFT_TO_RIGHT,
    p = gui.StepInfo.VisualDirection.RIGHT_TO_LEFT;
  this.getContentRect = g;
  this.moveToFilteredStep = function (b, d, e) {
    function l(a, b) {
      b.process(w, h, k) && ((a = !0), !x && b.token && (x = b.token));
      return a;
    }
    var a = d === f,
      c,
      m,
      h,
      k,
      x,
      z = b.snapshot();
    c = !1;
    var w;
    do
      (c = g(b)),
        (w = {
          token: b.snapshot(),
          container: b.container,
          offset: b.offset,
          direction: d,
          visualDirection: d === f ? n : p,
        }),
        (m = b.nextStep() ? g(b) : null),
        b.restore(w.token),
        a ? ((h = c), (k = m)) : ((h = m), (k = c)),
        (c = e.reduce(l, !1));
    while (!c && b.advanceStep(d));
    c ||
      e.forEach(function (a) {
        !x && a.token && (x = a.token);
      });
    b.restore(x || z);
    return Boolean(x);
  };
};
gui.Caret = function (g, k, d, b) {
  function f() {
    a.style.opacity = "0" === a.style.opacity ? "1" : "0";
    t.trigger();
  }
  function n() {
    y.selectNodeContents(h);
    return y.getBoundingClientRect();
  }
  function p(a) {
    return E[a] !== L[a];
  }
  function r() {
    Object.keys(L).forEach(function (a) {
      E[a] = L[a];
    });
  }
  function q() {
    if (
      !1 === L.isShown ||
      g.getSelectionType() !== ops.OdtCursor.RangeSelection ||
      (!b && !g.getSelectedRange().collapsed)
    )
      (L.visibility = "hidden"), (a.style.visibility = "hidden"), t.cancel();
    else if (
      ((L.visibility = "visible"),
      (a.style.visibility = "visible"),
      !1 === L.isFocused)
    )
      (a.style.opacity = "1"), t.cancel();
    else {
      if (A || p("visibility")) (a.style.opacity = "1"), t.cancel();
      t.trigger();
    }
    if (K || I) {
      var d;
      d = g.getNode();
      var e,
        h,
        f = z.getBoundingClientRect(x.getSizer()),
        q = !1,
        y = 0;
      d.removeAttributeNS("urn:webodf:names:cursor", "caret-sizer-active");
      if (0 < d.getClientRects().length)
        (h = n()), (y = h.left - z.getBoundingClientRect(d).left), (q = !0);
      else if (
        (v.setPosition(d, 0),
        (h = w.getContentRect(v)),
        !h && v.nextStep() && (e = w.getContentRect(v)) && ((h = e), (q = !0)),
        h ||
          (d.setAttributeNS(
            "urn:webodf:names:cursor",
            "caret-sizer-active",
            "true"
          ),
          (h = n()),
          (q = !0)),
        !h)
      )
        for (
          runtime.log(
            "WARN: No suitable client rectangle found for visual caret for " +
              g.getMemberId()
          );
          d;

        ) {
          if (0 < d.getClientRects().length) {
            h = z.getBoundingClientRect(d);
            q = !0;
            break;
          }
          d = d.parentNode;
        }
      h = z.translateRect(h, f, x.getZoomLevel());
      d = {
        top: h.top,
        height: h.height,
        right: q ? h.left : h.right,
        width: z.adaptRangeDifferenceToZoomLevel(y, x.getZoomLevel()),
      };
      8 > d.height &&
        (d = { top: d.top - (8 - d.height) / 2, height: 8, right: d.right });
      l.style.height = d.height + "px";
      l.style.top = d.top + "px";
      l.style.left = d.right - d.width + "px";
      l.style.width = d.width ? d.width + "px" : "";
      m &&
        ((d = runtime.getWindow().getComputedStyle(g.getNode(), null)),
        d.font
          ? (m.style.font = d.font)
          : ((m.style.fontStyle = d.fontStyle),
            (m.style.fontVariant = d.fontVariant),
            (m.style.fontWeight = d.fontWeight),
            (m.style.fontSize = d.fontSize),
            (m.style.lineHeight = d.lineHeight),
            (m.style.fontFamily = d.fontFamily)));
    }
    L.isShown && I && k.scrollIntoView(a.getBoundingClientRect());
    p("isFocused") && c.markAsFocussed(L.isFocused);
    r();
    K = I = A = !1;
  }
  function e(a) {
    l.parentNode.removeChild(l);
    h.parentNode.removeChild(h);
    a();
  }
  var l,
    a,
    c,
    m,
    h,
    y,
    x = g.getDocument().getCanvas(),
    z = core.DomUtils,
    w = new gui.GuiStepUtils(),
    v,
    u,
    t,
    A = !1,
    I = !1,
    K = !1,
    L = { isFocused: !1, isShown: !0, visibility: "hidden" },
    E = { isFocused: !L.isFocused, isShown: !L.isShown, visibility: "hidden" };
  this.handleUpdate = function () {
    K = !0;
    u.trigger();
  };
  this.refreshCursorBlinking = function () {
    A = !0;
    u.trigger();
  };
  this.setFocus = function () {
    L.isFocused = !0;
    u.trigger();
  };
  this.removeFocus = function () {
    L.isFocused = !1;
    u.trigger();
  };
  this.show = function () {
    L.isShown = !0;
    u.trigger();
  };
  this.hide = function () {
    L.isShown = !1;
    u.trigger();
  };
  this.setAvatarImageUrl = function (a) {
    c.setImageUrl(a);
  };
  this.setColor = function (b) {
    a.style.borderColor = b;
    c.setColor(b);
  };
  this.getCursor = function () {
    return g;
  };
  this.getFocusElement = function () {
    return a;
  };
  this.toggleHandleVisibility = function () {
    c.isVisible() ? c.hide() : c.show();
  };
  this.showHandle = function () {
    c.show();
  };
  this.hideHandle = function () {
    c.hide();
  };
  this.setOverlayElement = function (a) {
    m = a;
    l.appendChild(a);
    K = !0;
    u.trigger();
  };
  this.ensureVisible = function () {
    I = !0;
    u.trigger();
  };
  this.getBoundingClientRect = function () {
    return z.getBoundingClientRect(l);
  };
  this.destroy = function (a) {
    core.Async.destroyAll([u.destroy, t.destroy, c.destroy, e], a);
  };
  (function () {
    var b = g.getDocument(),
      e = [b.createRootFilter(g.getMemberId()), b.getPositionFilter()],
      m = b.getDOMDocument();
    y = m.createRange();
    h = m.createElement("span");
    h.className = "webodf-caretSizer";
    h.textContent = "|";
    g.getNode().appendChild(h);
    l = m.createElement("div");
    l.setAttributeNS(
      "urn:webodf:names:editinfo",
      "editinfo:memberid",
      g.getMemberId()
    );
    l.className = "webodf-caretOverlay";
    a = m.createElement("div");
    a.className = "caret";
    l.appendChild(a);
    c = new gui.Avatar(l, d);
    x.getSizer().appendChild(l);
    v = b.createStepIterator(g.getNode(), 0, e, b.getRootNode());
    u = core.Task.createRedrawTask(q);
    t = core.Task.createTimeoutTask(f, 500);
    u.triggerImmediate();
  })();
};
odf.TextSerializer = function () {
  function g(b) {
    var f = "",
      n = k.filter ? k.filter.acceptNode(b) : NodeFilter.FILTER_ACCEPT,
      p = b.nodeType,
      r;
    if (
      (n === NodeFilter.FILTER_ACCEPT || n === NodeFilter.FILTER_SKIP) &&
      d.isTextContentContainingNode(b)
    )
      for (r = b.firstChild; r; ) (f += g(r)), (r = r.nextSibling);
    n === NodeFilter.FILTER_ACCEPT &&
      (p === Node.ELEMENT_NODE && d.isParagraph(b)
        ? (f += "\n")
        : p === Node.TEXT_NODE && b.textContent && (f += b.textContent));
    return f;
  }
  var k = this,
    d = odf.OdfUtils;
  this.filter = null;
  this.writeToString = function (b) {
    if (!b) return "";
    b = g(b);
    "\n" === b[b.length - 1] && (b = b.substr(0, b.length - 1));
    return b;
  };
};
gui.MimeDataExporter = function () {
  var g;
  this.exportRangeToDataTransfer = function (k, d) {
    var b;
    b = d.startContainer.ownerDocument.createElement("span");
    b.appendChild(d.cloneContents());
    b = g.writeToString(b);
    try {
      k.setData("text/plain", b);
    } catch (f) {
      k.setData("Text", b);
    }
  };
  g = new odf.TextSerializer();
  g.filter = new odf.OdfNodeFilter();
};
gui.Clipboard = function (g) {
  this.setDataFromRange = function (k, d) {
    var b,
      f = k.clipboardData;
    b = runtime.getWindow();
    !f && b && (f = b.clipboardData);
    f
      ? ((b = !0), g.exportRangeToDataTransfer(f, d), k.preventDefault())
      : (b = !1);
    return b;
  };
};
gui.SessionContext = function (g, k) {
  var d = g.getOdtDocument(),
    b = odf.OdfUtils;
  this.isLocalCursorWithinOwnAnnotation = function () {
    var f = d.getCursor(k),
      g;
    if (!f) return !1;
    g = f && f.getNode();
    f = d.getMember(k).getProperties().fullName;
    return (g = b.getParentAnnotation(g, d.getRootNode())) &&
      b.getAnnotationCreator(g) === f
      ? !0
      : !1;
  };
};
gui.StyleSummary = function (g) {
  function k(b, d) {
    var k = b + "|" + d,
      q;
    f.hasOwnProperty(k) ||
      ((q = []),
      g.forEach(function (e) {
        e = (e = e.styleProperties[b]) && e[d];
        -1 === q.indexOf(e) && q.push(e);
      }),
      (f[k] = q));
    return f[k];
  }
  function d(b, d, f) {
    return function () {
      var g = k(b, d);
      return (
        f.length >= g.length &&
        g.every(function (b) {
          return -1 !== f.indexOf(b);
        })
      );
    };
  }
  function b(b, d) {
    var f = k(b, d);
    return 1 === f.length ? f[0] : void 0;
  }
  var f = {};
  this.getPropertyValues = k;
  this.getCommonValue = b;
  this.isBold = d("style:text-properties", "fo:font-weight", ["bold"]);
  this.isItalic = d("style:text-properties", "fo:font-style", ["italic"]);
  this.hasUnderline = d("style:text-properties", "style:text-underline-style", [
    "solid",
  ]);
  this.hasStrikeThrough = d(
    "style:text-properties",
    "style:text-line-through-style",
    ["solid"]
  );
  this.fontSize = function () {
    var d = b("style:text-properties", "fo:font-size");
    return d && parseFloat(d);
  };
  this.fontName = function () {
    return b("style:text-properties", "style:font-name");
  };
  this.isAlignedLeft = d("style:paragraph-properties", "fo:text-align", [
    "left",
    "start",
  ]);
  this.isAlignedCenter = d("style:paragraph-properties", "fo:text-align", [
    "center",
  ]);
  this.isAlignedRight = d("style:paragraph-properties", "fo:text-align", [
    "right",
    "end",
  ]);
  this.isAlignedJustified = d("style:paragraph-properties", "fo:text-align", [
    "justify",
  ]);
  this.text = {
    isBold: this.isBold,
    isItalic: this.isItalic,
    hasUnderline: this.hasUnderline,
    hasStrikeThrough: this.hasStrikeThrough,
    fontSize: this.fontSize,
    fontName: this.fontName,
  };
  this.paragraph = {
    isAlignedLeft: this.isAlignedLeft,
    isAlignedCenter: this.isAlignedCenter,
    isAlignedRight: this.isAlignedRight,
    isAlignedJustified: this.isAlignedJustified,
  };
};
gui.DirectFormattingController = function (g, k, d, b, f, n, p) {
  function r() {
    return U.value().styleSummary;
  }
  function q() {
    return U.value().enabledFeatures;
  }
  function e(a) {
    var b;
    a.collapsed
      ? ((b = a.startContainer),
        b.hasChildNodes() &&
          a.startOffset < b.childNodes.length &&
          (b = b.childNodes.item(a.startOffset)),
        (a = [b]))
      : (a = S.getTextElements(a, !0, !1));
    return a;
  }
  function l() {
    var a = P.getCursor(b),
      c = a && a.getSelectedRange(),
      h = [],
      h = [],
      f = !0,
      g = { directTextStyling: !0, directParagraphStyling: !0 };
    c &&
      ((h = e(c)),
      0 === h.length && ((h = [c.startContainer, c.endContainer]), (f = !1)),
      (h = P.getFormatting().getAppliedStyles(h)));
    void 0 !== h[0] &&
      Z &&
      (h[0].styleProperties = aa.mergeObjects(h[0].styleProperties, Z));
    !0 === k.getState(gui.CommonConstraints.EDIT.REVIEW_MODE) &&
      (g.directTextStyling = g.directParagraphStyling =
        d.isLocalCursorWithinOwnAnnotation());
    g.directTextStyling &&
      (g.directTextStyling =
        f &&
        void 0 !== a &&
        a.getSelectionType() === ops.OdtCursor.RangeSelection);
    return {
      enabledFeatures: g,
      appliedStyles: h,
      styleSummary: new gui.StyleSummary(h),
    };
  }
  function a(a, b) {
    var c = {};
    Object.keys(a).forEach(function (d) {
      var e = a[d](),
        h = b[d]();
      e !== h && (c[d] = h);
    });
    return c;
  }
  function c() {
    var b, c;
    c = ba.styleSummary;
    var d = U.value(),
      e = d.styleSummary,
      h = ba.enabledFeatures,
      f = d.enabledFeatures;
    b = a(c.text, e.text);
    c = a(c.paragraph, e.paragraph);
    h = !(
      f.directTextStyling === h.directTextStyling &&
      f.directParagraphStyling === h.directParagraphStyling
    );
    ba = d;
    h && fa.emit(gui.DirectFormattingController.enabledChanged, f);
    0 < Object.keys(b).length &&
      fa.emit(gui.DirectFormattingController.textStylingChanged, b);
    0 < Object.keys(c).length &&
      fa.emit(gui.DirectFormattingController.paragraphStylingChanged, c);
  }
  function m() {
    U.reset();
    c();
  }
  function h(a) {
    ("string" === typeof a ? a : a.getMemberId()) === b && U.reset();
  }
  function y() {
    U.reset();
  }
  function x(a) {
    var c = P.getCursor(b);
    a = a.paragraphElement;
    c && S.getParagraphElement(c.getNode()) === a && U.reset();
  }
  function z(a, b) {
    b(!a());
    return !0;
  }
  function w(a) {
    if (q().directTextStyling) {
      var c = P.getCursorSelection(b),
        d = { "style:text-properties": a };
      0 !== c.length
        ? ((a = new ops.OpApplyDirectStyling()),
          a.init({
            memberid: b,
            position: c.position,
            length: c.length,
            setProperties: d,
          }),
          g.enqueue([a]))
        : ((Z = aa.mergeObjects(Z || {}, d)), U.reset());
    }
  }
  function v(a, b) {
    var c = {};
    c[a] = b;
    w(c);
  }
  function u(a) {
    a = a.spec();
    Z &&
      a.memberid === b &&
      "SplitParagraph" !== a.optype &&
      ((Z = null), U.reset());
  }
  function t(a) {
    v("fo:font-weight", a ? "bold" : "normal");
  }
  function A(a) {
    v("fo:font-style", a ? "italic" : "normal");
  }
  function I(a) {
    v("style:text-underline-style", a ? "solid" : "none");
  }
  function K(a) {
    v("style:text-line-through-style", a ? "solid" : "none");
  }
  function L(a) {
    if (q().directParagraphStyling) {
      var c = P.getCursor(b).getSelectedRange(),
        c = S.getParagraphElements(c),
        d = P.getFormatting(),
        e = [],
        h = {},
        m;
      c.forEach(function (c) {
        var g = P.convertDomPointToCursorStep(c, 0, C),
          l = c.getAttributeNS(odf.Namespaces.textns, "style-name"),
          k;
        c = l ? (h.hasOwnProperty(l) ? h[l] : void 0) : m;
        c ||
          ((c = f.generateStyleName()),
          l
            ? ((h[l] = c), (k = d.createDerivedStyleObject(l, "paragraph", {})))
            : ((m = c), (k = {})),
          (k = a(k)),
          (l = new ops.OpAddStyle()),
          l.init({
            memberid: b,
            styleName: c.toString(),
            styleFamily: "paragraph",
            isAutomaticStyle: !0,
            setProperties: k,
          }),
          e.push(l));
        l = new ops.OpSetParagraphStyle();
        l.init({ memberid: b, styleName: c.toString(), position: g });
        e.push(l);
      });
      g.enqueue(e);
    }
  }
  function E(a) {
    L(function (b) {
      return aa.mergeObjects(b, a);
    });
  }
  function N(a) {
    E({ "style:paragraph-properties": { "fo:text-align": a } });
  }
  function O(a, b) {
    var c = P.getFormatting().getDefaultTabStopDistance(),
      d = b["style:paragraph-properties"],
      e;
    d && ((d = d["fo:margin-left"]), (e = S.parseLength(d)));
    return aa.mergeObjects(b, {
      "style:paragraph-properties": {
        "fo:margin-left":
          e && e.unit === c.unit
            ? e.value + a * c.value + e.unit
            : a * c.value + c.unit,
      },
    });
  }
  function D(a, b) {
    var c = e(a),
      c = 0 === c.length ? [a.startContainer] : c,
      c = P.getFormatting().getAppliedStyles(c),
      d = 0 < c.length ? c[0].styleProperties : void 0,
      h = P.getFormatting().getAppliedStylesForElement(b).styleProperties;
    if (!d || "text" !== d["style:family"] || !d["style:text-properties"])
      return !1;
    if (!h || !h["style:text-properties"]) return !0;
    d = d["style:text-properties"];
    h = h["style:text-properties"];
    return !Object.keys(d).every(function (a) {
      return d[a] === h[a];
    });
  }
  function V() {}
  function W() {
    return !1;
  }
  function J() {
    return !1;
  }
  var R = this,
    P = g.getOdtDocument(),
    aa = new core.Utils(),
    S = odf.OdfUtils,
    fa = new core.EventNotifier([
      gui.DirectFormattingController.enabledChanged,
      gui.DirectFormattingController.textStylingChanged,
      gui.DirectFormattingController.paragraphStylingChanged,
    ]),
    ha = odf.Namespaces.textns,
    C = core.StepDirection.NEXT,
    Z = null,
    ba,
    U;
  this.enabledFeatures = q;
  this.formatTextSelection = w;
  this.createCursorStyleOp = function (a, c, d) {
    var e = null,
      h = Z;
    d && (h = (d = U.value().appliedStyles[0]) && d.styleProperties);
    h &&
      h["style:text-properties"] &&
      ((e = new ops.OpApplyDirectStyling()),
      e.init({
        memberid: b,
        position: a,
        length: c,
        setProperties: { "style:text-properties": h["style:text-properties"] },
      }),
      (Z = null),
      U.reset());
    return e;
  };
  this.setBold = t;
  this.setItalic = A;
  this.setHasUnderline = I;
  this.setHasStrikethrough = K;
  this.setFontSize = function (a) {
    v("fo:font-size", a + "pt");
  };
  this.setFontName = function (a) {
    v("style:font-name", a);
  };
  this.getAppliedStyles = function () {
    return U.value().appliedStyles;
  };
  this.toggleBold = z.bind(
    R,
    function () {
      return r().isBold();
    },
    t
  );
  this.toggleItalic = z.bind(
    R,
    function () {
      return r().isItalic();
    },
    A
  );
  this.toggleUnderline = z.bind(
    R,
    function () {
      return r().hasUnderline();
    },
    I
  );
  this.toggleStrikethrough = z.bind(
    R,
    function () {
      return r().hasStrikeThrough();
    },
    K
  );
  this.isBold = function () {
    return r().isBold();
  };
  this.isItalic = function () {
    return r().isItalic();
  };
  this.hasUnderline = function () {
    return r().hasUnderline();
  };
  this.hasStrikeThrough = function () {
    return r().hasStrikeThrough();
  };
  this.fontSize = function () {
    return r().fontSize();
  };
  this.fontName = function () {
    return r().fontName();
  };
  this.isAlignedLeft = function () {
    return r().isAlignedLeft();
  };
  this.isAlignedCenter = function () {
    return r().isAlignedCenter();
  };
  this.isAlignedRight = function () {
    return r().isAlignedRight();
  };
  this.isAlignedJustified = function () {
    return r().isAlignedJustified();
  };
  this.alignParagraphLeft = function () {
    N("left");
    return !0;
  };
  this.alignParagraphCenter = function () {
    N("center");
    return !0;
  };
  this.alignParagraphRight = function () {
    N("right");
    return !0;
  };
  this.alignParagraphJustified = function () {
    N("justify");
    return !0;
  };
  this.indent = function () {
    L(O.bind(null, 1));
    return !0;
  };
  this.outdent = function () {
    L(O.bind(null, -1));
    return !0;
  };
  this.createParagraphStyleOps = function (a) {
    if (!q().directParagraphStyling) return [];
    var c = P.getCursor(b),
      d = c.getSelectedRange(),
      e = [],
      h,
      g;
    c.hasForwardSelection()
      ? ((h = c.getAnchorNode()), (g = c.getNode()))
      : ((h = c.getNode()), (g = c.getAnchorNode()));
    c = S.getParagraphElement(g);
    runtime.assert(
      Boolean(c),
      "DirectFormattingController: Cursor outside paragraph"
    );
    var m = c,
      l = [P.getPositionFilter(), P.createRootFilter(b)];
    if (
      !1 !== P.createStepIterator(d.endContainer, d.endOffset, l, m).nextStep()
    )
      return e;
    g !== h && (c = S.getParagraphElement(h));
    if (!Z && !D(d, c)) return e;
    d = (d = U.value().appliedStyles[0]) && d.styleProperties;
    if (!d) return e;
    if ((c = c.getAttributeNS(ha, "style-name")))
      (d = { "style:text-properties": d["style:text-properties"] }),
        (d = P.getFormatting().createDerivedStyleObject(c, "paragraph", d));
    h = f.generateStyleName();
    c = new ops.OpAddStyle();
    c.init({
      memberid: b,
      styleName: h,
      styleFamily: "paragraph",
      isAutomaticStyle: !0,
      setProperties: d,
    });
    e.push(c);
    c = new ops.OpSetParagraphStyle();
    c.init({ memberid: b, styleName: h, position: a });
    e.push(c);
    return e;
  };
  this.subscribe = function (a, c) {
    fa.subscribe(a, c);
  };
  this.unsubscribe = function (a, c) {
    fa.unsubscribe(a, c);
  };
  this.destroy = function (a) {
    P.unsubscribe(ops.Document.signalCursorAdded, h);
    P.unsubscribe(ops.Document.signalCursorRemoved, h);
    P.unsubscribe(ops.Document.signalCursorMoved, h);
    P.unsubscribe(ops.OdtDocument.signalParagraphStyleModified, y);
    P.unsubscribe(ops.OdtDocument.signalParagraphChanged, x);
    P.unsubscribe(ops.OdtDocument.signalOperationEnd, u);
    P.unsubscribe(ops.OdtDocument.signalProcessingBatchEnd, c);
    k.unsubscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, m);
    a();
  };
  (function () {
    P.subscribe(ops.Document.signalCursorAdded, h);
    P.subscribe(ops.Document.signalCursorRemoved, h);
    P.subscribe(ops.Document.signalCursorMoved, h);
    P.subscribe(ops.OdtDocument.signalParagraphStyleModified, y);
    P.subscribe(ops.OdtDocument.signalParagraphChanged, x);
    P.subscribe(ops.OdtDocument.signalOperationEnd, u);
    P.subscribe(ops.OdtDocument.signalProcessingBatchEnd, c);
    k.subscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, m);
    U = new core.LazyProperty(l);
    ba = U.value();
    n ||
      ((R.formatTextSelection = V),
      (R.setBold = V),
      (R.setItalic = V),
      (R.setHasUnderline = V),
      (R.setHasStrikethrough = V),
      (R.setFontSize = V),
      (R.setFontName = V),
      (R.toggleBold = J),
      (R.toggleItalic = J),
      (R.toggleUnderline = J),
      (R.toggleStrikethrough = J));
    p ||
      ((R.alignParagraphCenter = W),
      (R.alignParagraphJustified = W),
      (R.alignParagraphLeft = W),
      (R.alignParagraphRight = W),
      (R.createParagraphStyleOps = function () {
        return [];
      }),
      (R.indent = W),
      (R.outdent = W));
  })();
};
gui.DirectFormattingController.enabledChanged = "enabled/changed";
gui.DirectFormattingController.textStylingChanged = "textStyling/changed";
gui.DirectFormattingController.paragraphStylingChanged =
  "paragraphStyling/changed";
gui.DirectFormattingController.SelectionInfo = function () {};
gui.KeyboardHandler = function () {
  function g(b, d) {
    d || (d = k.None);
    switch (b) {
      case gui.KeyboardHandler.KeyCode.LeftMeta:
      case gui.KeyboardHandler.KeyCode.RightMeta:
      case gui.KeyboardHandler.KeyCode.MetaInMozilla:
        d |= k.Meta;
        break;
      case gui.KeyboardHandler.KeyCode.Ctrl:
        d |= k.Ctrl;
        break;
      case gui.KeyboardHandler.KeyCode.Alt:
        d |= k.Alt;
        break;
      case gui.KeyboardHandler.KeyCode.Shift:
        d |= k.Shift;
    }
    return b + ":" + d;
  }
  var k = gui.KeyboardHandler.Modifier,
    d = null,
    b = {};
  this.setDefault = function (b) {
    d = b;
  };
  this.bind = function (d, k, p, r) {
    d = g(d, k);
    runtime.assert(
      r || !1 === b.hasOwnProperty(d),
      "tried to overwrite the callback handler of key combo: " + d
    );
    b[d] = p;
  };
  this.unbind = function (d, k) {
    var p = g(d, k);
    delete b[p];
  };
  this.reset = function () {
    d = null;
    b = {};
  };
  this.handleEvent = function (f) {
    var n = f.keyCode,
      p = k.None;
    f.metaKey && (p |= k.Meta);
    f.ctrlKey && (p |= k.Ctrl);
    f.altKey && (p |= k.Alt);
    f.shiftKey && (p |= k.Shift);
    n = g(n, p);
    n = b[n];
    p = !1;
    n ? (p = n()) : null !== d && (p = d(f));
    p && (f.preventDefault ? f.preventDefault() : (f.returnValue = !1));
  };
};
gui.KeyboardHandler.Modifier = {
  None: 0,
  Meta: 1,
  Ctrl: 2,
  Alt: 4,
  CtrlAlt: 6,
  Shift: 8,
  MetaShift: 9,
  CtrlShift: 10,
  AltShift: 12,
};
gui.KeyboardHandler.KeyCode = {
  Backspace: 8,
  Tab: 9,
  Clear: 12,
  Enter: 13,
  Shift: 16,
  Ctrl: 17,
  Alt: 18,
  End: 35,
  Home: 36,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Delete: 46,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  LeftMeta: 91,
  RightMeta: 93,
  MetaInMozilla: 224,
};
gui.HyperlinkClickHandler = function (g, k, d) {
  function b() {
    var a = g();
    runtime.assert(
      Boolean(a.classList),
      "Document container has no classList element"
    );
    a.classList.remove("webodf-inactiveLinks");
  }
  function f() {
    var a = g();
    runtime.assert(
      Boolean(a.classList),
      "Document container has no classList element"
    );
    a.classList.add("webodf-inactiveLinks");
  }
  function n() {
    a.removeEventListener("focus", f, !1);
    m.forEach(function (a) {
      k.unbind(a.keyCode, a.modifier);
      d.unbind(a.keyCode, a.modifier);
    });
    m.length = 0;
  }
  function p(c) {
    n();
    if (c !== r.None) {
      a.addEventListener("focus", f, !1);
      switch (c) {
        case r.Ctrl:
          m.push({ keyCode: q.Ctrl, modifier: r.None });
          break;
        case r.Meta:
          m.push({ keyCode: q.LeftMeta, modifier: r.None }),
            m.push({ keyCode: q.RightMeta, modifier: r.None }),
            m.push({ keyCode: q.MetaInMozilla, modifier: r.None });
      }
      m.forEach(function (a) {
        k.bind(a.keyCode, a.modifier, b);
        d.bind(a.keyCode, a.modifier, f);
      });
    }
  }
  var r = gui.KeyboardHandler.Modifier,
    q = gui.KeyboardHandler.KeyCode,
    e = xmldom.XPath,
    l = odf.OdfUtils,
    a = runtime.getWindow(),
    c = r.None,
    m = [];
  runtime.assert(
    null !== a,
    "Expected to be run in an environment which has a global window, like a browser."
  );
  this.handleClick = function (b) {
    var d = b.target || b.srcElement,
      f,
      m;
    b.ctrlKey ? (f = r.Ctrl) : b.metaKey && (f = r.Meta);
    if (c === r.None || c === f) {
      a: {
        for (; null !== d; ) {
          if (l.isHyperlink(d)) break a;
          if (l.isParagraph(d)) break;
          d = d.parentNode;
        }
        d = null;
      }
      d &&
        ((d = l.getHyperlinkTarget(d)),
        "" !== d &&
          ("#" === d[0]
            ? ((d = d.substring(1)),
              (f = g()),
              (m = e.getODFElementsWithXPath(
                f,
                "//text:bookmark-start[@text:name='" + d + "']",
                odf.Namespaces.lookupNamespaceURI
              )),
              0 === m.length &&
                (m = e.getODFElementsWithXPath(
                  f,
                  "//text:bookmark[@text:name='" + d + "']",
                  odf.Namespaces.lookupNamespaceURI
                )),
              0 < m.length && m[0].scrollIntoView(!0))
            : /^\s*(javascript|data):/.test(d)
            ? runtime.log("WARN:", "potentially malicious URL ignored")
            : a.open(d),
          b.preventDefault ? b.preventDefault() : (b.returnValue = !1)));
    }
  };
  this.setModifier = function (a) {
    c !== a &&
      (runtime.assert(
        a === r.None || a === r.Ctrl || a === r.Meta,
        "Unsupported KeyboardHandler.Modifier value: " + a
      ),
      (c = a),
      c !== r.None ? f() : b(),
      p(c));
  };
  this.getModifier = function () {
    return c;
  };
  this.destroy = function (a) {
    f();
    n();
    a();
  };
};
gui.EventManager = function (g) {
  function k(a) {
    function c(a, b, d) {
      var e,
        h = !1;
      e = "on" + b;
      a.attachEvent && (a.attachEvent(e, d), (h = !0));
      !h && a.addEventListener && (a.addEventListener(b, d, !1), (h = !0));
      (h && !u[b]) || !a.hasOwnProperty(e) || (a[e] = d);
    }
    function b(a, c, d) {
      var e = "on" + c;
      a.detachEvent && a.detachEvent(e, d);
      a.removeEventListener && a.removeEventListener(c, d, !1);
      a[e] === d && (a[e] = null);
    }
    function d(c) {
      if (-1 === h.indexOf(c)) {
        h.push(c);
        if (
          e.filters.every(function (a) {
            return a(c);
          })
        )
          try {
            f.emit(a, c);
          } catch (b) {
            runtime.log(
              "Error occurred while processing " +
                a +
                ":\n" +
                b.message +
                "\n" +
                b.stack
            );
          }
        runtime.setTimeout(function () {
          h.splice(h.indexOf(c), 1);
        }, 0);
      }
    }
    var e = this,
      h = [],
      f = new core.EventNotifier([a]);
    this.filters = [];
    this.subscribe = function (c) {
      f.subscribe(a, c);
    };
    this.unsubscribe = function (c) {
      f.unsubscribe(a, c);
    };
    this.destroy = function () {
      b(v, a, d);
      b(K, a, d);
      b(L, a, d);
    };
    t[a] && c(v, a, d);
    c(K, a, d);
    c(L, a, d);
  }
  function d(a, c, b) {
    function d(c) {
      b(c, e, function (c) {
        c.type = a;
        h.emit(a, c);
      });
    }
    var e = {},
      h = new core.EventNotifier([a]);
    this.subscribe = function (c) {
      h.subscribe(a, c);
    };
    this.unsubscribe = function (c) {
      h.unsubscribe(a, c);
    };
    this.destroy = function () {
      c.forEach(function (a) {
        E.unsubscribe(a, d);
      });
    };
    (function () {
      c.forEach(function (a) {
        E.subscribe(a, d);
      });
    })();
  }
  function b(a) {
    runtime.clearTimeout(a);
    delete N[a];
  }
  function f(a, c) {
    var d = runtime.setTimeout(function () {
      a();
      b(d);
    }, c);
    N[d] = !0;
    return d;
  }
  function n(a, c, d) {
    var e = a.touches.length,
      h = a.touches[0],
      g = c.timer;
    "touchmove" === a.type || "touchend" === a.type
      ? g && b(g)
      : "touchstart" === a.type &&
        (1 !== e
          ? runtime.clearTimeout(g)
          : (g = f(function () {
              d({
                clientX: h.clientX,
                clientY: h.clientY,
                pageX: h.pageX,
                pageY: h.pageY,
                target: a.target || a.srcElement || null,
                detail: 1,
              });
            }, 400)));
    c.timer = g;
  }
  function p(a, c, b) {
    var d = a.touches[0],
      e = a.target || a.srcElement || null,
      h = c.target;
    1 !== a.touches.length || "touchend" === a.type
      ? (h = null)
      : "touchstart" === a.type &&
        "webodf-draggable" === e.getAttribute("class")
      ? (h = e)
      : "touchmove" === a.type &&
        h &&
        (a.preventDefault(),
        a.stopPropagation(),
        b({
          clientX: d.clientX,
          clientY: d.clientY,
          pageX: d.pageX,
          pageY: d.pageY,
          target: h,
          detail: 1,
        }));
    c.target = h;
  }
  function r(a, c, b) {
    var d = a.target || a.srcElement || null,
      e = c.dragging;
    "drag" === a.type
      ? (e = !0)
      : "touchend" === a.type &&
        e &&
        ((e = !1),
        (a = a.changedTouches[0]),
        b({
          clientX: a.clientX,
          clientY: a.clientY,
          pageX: a.pageX,
          pageY: a.pageY,
          target: d,
          detail: 1,
        }));
    c.dragging = e;
  }
  function q() {
    L.classList.add("webodf-touchEnabled");
    E.unsubscribe("touchstart", q);
  }
  function e(a) {
    var c = a.scrollX,
      b = a.scrollY;
    this.restore = function () {
      (a.scrollX === c && a.scrollY === b) || a.scrollTo(c, b);
    };
  }
  function l(a) {
    var c = a.scrollTop,
      b = a.scrollLeft;
    this.restore = function () {
      if (a.scrollTop !== c || a.scrollLeft !== b)
        (a.scrollTop = c), (a.scrollLeft = b);
    };
  }
  function a(a, c) {
    var b = I[a] || A[a] || null;
    !b && c && (b = I[a] = new k(a));
    return b;
  }
  function c(c, b) {
    a(c, !0).subscribe(b);
  }
  function m(c, b) {
    var d = a(c, !1);
    d && d.unsubscribe(b);
  }
  function h() {
    return g.getDOMDocument().activeElement === K;
  }
  function y() {
    h() && K.blur();
    K.setAttribute("disabled", "true");
  }
  function x() {
    K.removeAttribute("disabled");
  }
  function z(a) {
    for (var c = []; a; )
      (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight) &&
        c.push(new l(a)),
        (a = a.parentNode);
    c.push(new e(v));
    return c;
  }
  function w() {
    var a;
    h() ||
      ((a = z(K)),
      x(),
      K.focus(),
      a.forEach(function (a) {
        a.restore();
      }));
  }
  var v = runtime.getWindow(),
    u = {
      beforecut: !0,
      beforepaste: !0,
      longpress: !0,
      drag: !0,
      dragstop: !0,
    },
    t = { mousedown: !0, mouseup: !0, focus: !0 },
    A = {},
    I = {},
    K,
    L = g.getCanvas().getElement(),
    E = this,
    N = {};
  this.addFilter = function (c, b) {
    a(c, !0).filters.push(b);
  };
  this.removeFilter = function (c, b) {
    var d = a(c, !0),
      e = d.filters.indexOf(b);
    -1 !== e && d.filters.splice(e, 1);
  };
  this.subscribe = c;
  this.unsubscribe = m;
  this.hasFocus = h;
  this.focus = w;
  this.getEventTrap = function () {
    return K;
  };
  this.setEditing = function (a) {
    var c = h();
    c && K.blur();
    a ? K.removeAttribute("readOnly") : K.setAttribute("readOnly", "true");
    c && w();
  };
  this.destroy = function (a) {
    m("touchstart", q);
    Object.keys(N).forEach(function (a) {
      b(parseInt(a, 10));
    });
    N.length = 0;
    Object.keys(A).forEach(function (a) {
      A[a].destroy();
    });
    A = {};
    m("mousedown", y);
    m("mouseup", x);
    m("contextmenu", x);
    Object.keys(I).forEach(function (a) {
      I[a].destroy();
    });
    I = {};
    K.parentNode.removeChild(K);
    a();
  };
  (function () {
    var a = g.getOdfCanvas().getSizer(),
      b = a.ownerDocument;
    runtime.assert(
      Boolean(v),
      "EventManager requires a window object to operate correctly"
    );
    K = b.createElement("textarea");
    K.id = "eventTrap";
    K.setAttribute("tabindex", "-1");
    K.setAttribute("readOnly", "true");
    K.setAttribute("rows", "1");
    a.appendChild(K);
    c("mousedown", y);
    c("mouseup", x);
    c("contextmenu", x);
    A.longpress = new d(
      "longpress",
      ["touchstart", "touchmove", "touchend"],
      n
    );
    A.drag = new d("drag", ["touchstart", "touchmove", "touchend"], p);
    A.dragstop = new d("dragstop", ["drag", "touchend"], r);
    c("touchstart", q);
  })();
};
gui.IOSSafariSupport = function (g) {
  function k() {
    d.innerHeight !== d.outerHeight &&
      ((b.style.display = "none"),
      runtime.requestAnimationFrame(function () {
        b.style.display = "block";
      }));
  }
  var d = runtime.getWindow(),
    b = g.getEventTrap();
  this.destroy = function (d) {
    g.unsubscribe("focus", k);
    b.removeAttribute("autocapitalize");
    b.style.WebkitTransform = "";
    d();
  };
  g.subscribe("focus", k);
  b.setAttribute("autocapitalize", "off");
  b.style.WebkitTransform = "translateX(-10000px)";
};
gui.HyperlinkController = function (g, k, d, b) {
  function f() {
    var b = !0;
    !0 === k.getState(gui.CommonConstraints.EDIT.REVIEW_MODE) &&
      (b = d.isLocalCursorWithinOwnAnnotation());
    b !== e && ((e = b), q.emit(gui.HyperlinkController.enabledChanged, e));
  }
  function n(d) {
    d.getMemberId() === b && f();
  }
  var p = odf.OdfUtils,
    r = g.getOdtDocument(),
    q = new core.EventNotifier([gui.HyperlinkController.enabledChanged]),
    e = !1;
  this.isEnabled = function () {
    return e;
  };
  this.subscribe = function (b, a) {
    q.subscribe(b, a);
  };
  this.unsubscribe = function (b, a) {
    q.unsubscribe(b, a);
  };
  this.addHyperlink = function (d, a) {
    if (e) {
      var c = r.getCursorSelection(b),
        f = new ops.OpApplyHyperlink(),
        h = [];
      if (0 === c.length || a)
        (a = a || d),
          (f = new ops.OpInsertText()),
          f.init({ memberid: b, position: c.position, text: a }),
          (c.length = a.length),
          h.push(f);
      f = new ops.OpApplyHyperlink();
      f.init({
        memberid: b,
        position: c.position,
        length: c.length,
        hyperlink: d,
      });
      h.push(f);
      g.enqueue(h);
    }
  };
  this.removeHyperlinks = function () {
    if (e) {
      var d = r.createPositionIterator(r.getRootNode()),
        a = r.getCursor(b).getSelectedRange(),
        c = p.getHyperlinkElements(a),
        f = a.collapsed && 1 === c.length,
        h = r.getDOMDocument().createRange(),
        k = [],
        n,
        q;
      0 !== c.length &&
        (c.forEach(function (a) {
          h.selectNodeContents(a);
          n = r.convertDomToCursorRange({
            anchorNode: h.startContainer,
            anchorOffset: h.startOffset,
            focusNode: h.endContainer,
            focusOffset: h.endOffset,
          });
          q = new ops.OpRemoveHyperlink();
          q.init({ memberid: b, position: n.position, length: n.length });
          k.push(q);
        }),
        f ||
          ((f = c[0]),
          -1 === a.comparePoint(f, 0) &&
            (h.setStart(f, 0),
            h.setEnd(a.startContainer, a.startOffset),
            (n = r.convertDomToCursorRange({
              anchorNode: h.startContainer,
              anchorOffset: h.startOffset,
              focusNode: h.endContainer,
              focusOffset: h.endOffset,
            })),
            0 < n.length &&
              ((q = new ops.OpApplyHyperlink()),
              q.init({
                memberid: b,
                position: n.position,
                length: n.length,
                hyperlink: p.getHyperlinkTarget(f),
              }),
              k.push(q))),
          (c = c[c.length - 1]),
          d.moveToEndOfNode(c),
          (d = d.unfilteredDomOffset()),
          1 === a.comparePoint(c, d) &&
            (h.setStart(a.endContainer, a.endOffset),
            h.setEnd(c, d),
            (n = r.convertDomToCursorRange({
              anchorNode: h.startContainer,
              anchorOffset: h.startOffset,
              focusNode: h.endContainer,
              focusOffset: h.endOffset,
            })),
            0 < n.length &&
              ((q = new ops.OpApplyHyperlink()),
              q.init({
                memberid: b,
                position: n.position,
                length: n.length,
                hyperlink: p.getHyperlinkTarget(c),
              }),
              k.push(q)))),
        g.enqueue(k),
        h.detach());
    }
  };
  this.destroy = function (b) {
    r.unsubscribe(ops.Document.signalCursorMoved, n);
    k.unsubscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, f);
    b();
  };
  r.subscribe(ops.Document.signalCursorMoved, n);
  k.subscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, f);
  f();
};
gui.HyperlinkController.enabledChanged = "enabled/changed";
gui.ImageController = function (g, k, d, b, f) {
  function n() {
    var a = !0;
    !0 === k.getState(gui.CommonConstraints.EDIT.REVIEW_MODE) &&
      (a = d.isLocalCursorWithinOwnAnnotation());
    a !== m && ((m = a), c.emit(gui.ImageController.enabledChanged, m));
  }
  function p(a) {
    a.getMemberId() === b && n();
  }
  var r = { "image/gif": ".gif", "image/jpeg": ".jpg", "image/png": ".png" },
    q = odf.Namespaces.textns,
    e = g.getOdtDocument(),
    l = odf.OdfUtils,
    a = e.getFormatting(),
    c = new core.EventNotifier([gui.HyperlinkController.enabledChanged]),
    m = !1;
  this.isEnabled = function () {
    return m;
  };
  this.subscribe = function (a, b) {
    c.subscribe(a, b);
  };
  this.unsubscribe = function (a, b) {
    c.unsubscribe(a, b);
  };
  this.insertImage = function (c, d, k, n) {
    if (m) {
      var p = new core.CSSUnits();
      runtime.assert(
        0 < k && 0 < n,
        "Both width and height of the image should be greater than 0px."
      );
      n = { width: k, height: n };
      if (
        (k = l
          .getParagraphElement(e.getCursor(b).getNode())
          .getAttributeNS(q, "style-name"))
      ) {
        k = a.getContentSize(k, "paragraph");
        var v = 1,
          u = 1;
        n.width > k.width && (v = k.width / n.width);
        n.height > k.height && (u = k.height / n.height);
        k = Math.min(v, u);
        n = { width: n.width * k, height: n.height * k };
      }
      k = p.convert(n.width, "px", "cm") + "cm";
      p = p.convert(n.height, "px", "cm") + "cm";
      u = e.getOdfCanvas().odfContainer().rootElement.styles;
      n = c.toLowerCase();
      var v = r.hasOwnProperty(n) ? r[n] : null,
        t;
      n = [];
      runtime.assert(null !== v, "Image type is not supported: " + c);
      v = "Pictures/" + f.generateImageName() + v;
      t = new ops.OpSetBlob();
      t.init({ memberid: b, filename: v, mimetype: c, content: d });
      n.push(t);
      a.getStyleElement("Graphics", "graphic", [u]) ||
        ((c = new ops.OpAddStyle()),
        c.init({
          memberid: b,
          styleName: "Graphics",
          styleFamily: "graphic",
          isAutomaticStyle: !1,
          setProperties: {
            "style:graphic-properties": {
              "text:anchor-type": "paragraph",
              "svg:x": "0cm",
              "svg:y": "0cm",
              "style:wrap": "dynamic",
              "style:number-wrapped-paragraphs": "no-limit",
              "style:wrap-contour": "false",
              "style:vertical-pos": "top",
              "style:vertical-rel": "paragraph",
              "style:horizontal-pos": "center",
              "style:horizontal-rel": "paragraph",
            },
          },
        }),
        n.push(c));
      c = f.generateStyleName();
      d = new ops.OpAddStyle();
      d.init({
        memberid: b,
        styleName: c,
        styleFamily: "graphic",
        isAutomaticStyle: !0,
        setProperties: {
          "style:parent-style-name": "Graphics",
          "style:graphic-properties": {
            "style:vertical-pos": "top",
            "style:vertical-rel": "baseline",
            "style:horizontal-pos": "center",
            "style:horizontal-rel": "paragraph",
            "fo:background-color": "transparent",
            "style:background-transparency": "100%",
            "style:shadow": "none",
            "style:mirror": "none",
            "fo:clip": "rect(0cm, 0cm, 0cm, 0cm)",
            "draw:luminance": "0%",
            "draw:contrast": "0%",
            "draw:red": "0%",
            "draw:green": "0%",
            "draw:blue": "0%",
            "draw:gamma": "100%",
            "draw:color-inversion": "false",
            "draw:image-opacity": "100%",
            "draw:color-mode": "standard",
          },
        },
      });
      n.push(d);
      t = new ops.OpInsertImage();
      t.init({
        memberid: b,
        position: e.getCursorPosition(b),
        filename: v,
        frameWidth: k,
        frameHeight: p,
        frameStyleName: c,
        frameName: f.generateFrameName(),
      });
      n.push(t);
      g.enqueue(n);
    }
  };
  this.destroy = function (a) {
    e.unsubscribe(ops.Document.signalCursorMoved, p);
    k.unsubscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, n);
    a();
  };
  e.subscribe(ops.Document.signalCursorMoved, p);
  k.subscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, n);
  n();
};
gui.ImageController.enabledChanged = "enabled/changed";
gui.ImageSelector = function (g) {
  function k() {
    var d = g.getSizer(),
      k = f.createElement("div");
    k.id = "imageSelector";
    k.style.borderWidth = "1px";
    d.appendChild(k);
    b.forEach(function (b) {
      var d = f.createElement("div");
      d.className = b;
      k.appendChild(d);
    });
    return k;
  }
  var d = odf.Namespaces.svgns,
    b =
      "topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(
        " "
      ),
    f = g.getElement().ownerDocument,
    n = !1;
  this.select = function (b) {
    var r,
      q,
      e = f.getElementById("imageSelector");
    e || (e = k());
    n = !0;
    r = e.parentNode;
    q = b.getBoundingClientRect();
    var l = r.getBoundingClientRect(),
      a = g.getZoomLevel();
    r = (q.left - l.left) / a - 1;
    q = (q.top - l.top) / a - 1;
    e.style.display = "block";
    e.style.left = r + "px";
    e.style.top = q + "px";
    e.style.width = b.getAttributeNS(d, "width");
    e.style.height = b.getAttributeNS(d, "height");
  };
  this.clearSelection = function () {
    var b;
    n && (b = f.getElementById("imageSelector")) && (b.style.display = "none");
    n = !1;
  };
  this.isSelectorElement = function (b) {
    var d = f.getElementById("imageSelector");
    return d ? b === d || b.parentNode === d : !1;
  };
};
(function () {
  function g(g) {
    function d(b) {
      p = b.which && String.fromCharCode(b.which) === n;
      n = void 0;
      return !1 === p;
    }
    function b() {
      p = !1;
    }
    function f(b) {
      n = b.data;
      p = !1;
    }
    var n,
      p = !1;
    this.destroy = function (n) {
      g.unsubscribe("textInput", b);
      g.unsubscribe("compositionend", f);
      g.removeFilter("keypress", d);
      n();
    };
    g.subscribe("textInput", b);
    g.subscribe("compositionend", f);
    g.addFilter("keypress", d);
  }
  gui.InputMethodEditor = function (k, d) {
    function b(c) {
      a &&
        (c
          ? a
              .getNode()
              .setAttributeNS("urn:webodf:names:cursor", "composing", "true")
          : (a
              .getNode()
              .removeAttributeNS("urn:webodf:names:cursor", "composing"),
            (h.textContent = "")));
    }
    function f() {
      x &&
        ((x = !1),
        b(!1),
        w.emit(gui.InputMethodEditor.signalCompositionEnd, { data: z }),
        (z = ""));
    }
    function n() {
      I ||
        ((I = !0),
        f(),
        a && a.getSelectedRange().collapsed
          ? (c.value = "")
          : (c.value = u.writeToString(a.getSelectedRange().cloneContents())),
        c.setSelectionRange(0, c.value.length),
        (I = !1));
    }
    function p() {
      d.hasFocus() && y.trigger();
    }
    function r() {
      v = void 0;
      y.cancel();
      b(!0);
      x || w.emit(gui.InputMethodEditor.signalCompositionStart, { data: "" });
    }
    function q(a) {
      a = v = a.data;
      x = !0;
      z += a;
      y.trigger();
    }
    function e(a) {
      a.data !== v && ((a = a.data), (x = !0), (z += a), y.trigger());
      v = void 0;
    }
    function l() {
      h.textContent = c.value;
    }
    var a = null,
      c = d.getEventTrap(),
      m = c.ownerDocument,
      h,
      y,
      x = !1,
      z = "",
      w = new core.EventNotifier([
        gui.InputMethodEditor.signalCompositionStart,
        gui.InputMethodEditor.signalCompositionEnd,
      ]),
      v,
      u,
      t = [],
      A,
      I = !1;
    this.subscribe = w.subscribe;
    this.unsubscribe = w.unsubscribe;
    this.registerCursor = function (c) {
      c.getMemberId() === k &&
        ((a = c),
        a.getNode().appendChild(h),
        c.subscribe(ops.OdtCursor.signalCursorUpdated, p),
        d.subscribe("input", l),
        d.subscribe("compositionupdate", l));
    };
    this.removeCursor = function (c) {
      a &&
        c === k &&
        (a.getNode().removeChild(h),
        a.unsubscribe(ops.OdtCursor.signalCursorUpdated, p),
        d.unsubscribe("input", l),
        d.unsubscribe("compositionupdate", l),
        (a = null));
    };
    this.destroy = function (a) {
      d.unsubscribe("compositionstart", r);
      d.unsubscribe("compositionend", q);
      d.unsubscribe("textInput", e);
      d.unsubscribe("keypress", f);
      d.unsubscribe("focus", n);
      core.Async.destroyAll(A, a);
    };
    (function () {
      u = new odf.TextSerializer();
      u.filter = new odf.OdfNodeFilter();
      d.subscribe("compositionstart", r);
      d.subscribe("compositionend", q);
      d.subscribe("textInput", e);
      d.subscribe("keypress", f);
      d.subscribe("focus", n);
      t.push(new g(d));
      A = t.map(function (a) {
        return a.destroy;
      });
      h = m.createElement("span");
      h.setAttribute("id", "composer");
      y = core.Task.createTimeoutTask(n, 1);
      A.push(y.destroy);
    })();
  };
  gui.InputMethodEditor.signalCompositionStart = "input/compositionstart";
  gui.InputMethodEditor.signalCompositionEnd = "input/compositionend";
})();
gui.MetadataController = function (g, k) {
  function d(b) {
    n.emit(gui.MetadataController.signalMetadataChanged, b);
  }
  function b(b) {
    var d = -1 === p.indexOf(b);
    d || runtime.log("Setting " + b + " is restricted.");
    return d;
  }
  var f = g.getOdtDocument(),
    n = new core.EventNotifier([gui.MetadataController.signalMetadataChanged]),
    p = [
      "dc:creator",
      "dc:date",
      "meta:editing-cycles",
      "meta:editing-duration",
      "meta:document-statistic",
    ];
  this.setMetadata = function (d, f) {
    var e = {},
      l = "",
      a;
    d &&
      Object.keys(d)
        .filter(b)
        .forEach(function (a) {
          e[a] = d[a];
        });
    f && (l = f.filter(b).join(","));
    if (0 < l.length || 0 < Object.keys(e).length)
      (a = new ops.OpUpdateMetadata()),
        a.init({
          memberid: k,
          setProperties: e,
          removedProperties: 0 < l.length ? { attributes: l } : null,
        }),
        g.enqueue([a]);
  };
  this.getMetadata = function (b) {
    var d;
    runtime.assert("string" === typeof b, "Property must be a string");
    d = b.split(":");
    runtime.assert(
      2 === d.length,
      "Property must be a namespace-prefixed string"
    );
    b = odf.Namespaces.lookupNamespaceURI(d[0]);
    runtime.assert(Boolean(b), "Prefix must be for an ODF namespace.");
    return f.getOdfCanvas().odfContainer().getMetadata(b, d[1]);
  };
  this.subscribe = function (b, d) {
    n.subscribe(b, d);
  };
  this.unsubscribe = function (b, d) {
    n.unsubscribe(b, d);
  };
  this.destroy = function (b) {
    f.unsubscribe(ops.OdtDocument.signalMetadataUpdated, d);
    b();
  };
  f.subscribe(ops.OdtDocument.signalMetadataUpdated, d);
};
gui.MetadataController.signalMetadataChanged = "metadata/changed";
gui.PasteController = function (g, k, d, b) {
  function f() {
    r =
      !0 === k.getState(gui.CommonConstraints.EDIT.REVIEW_MODE)
        ? d.isLocalCursorWithinOwnAnnotation()
        : !0;
  }
  function n(a) {
    a.getMemberId() === b && f();
  }
  var p = g.getOdtDocument(),
    r = !1,
    q = odf.Namespaces.textns,
    e = core.StepDirection.NEXT,
    l = odf.OdfUtils;
  this.isEnabled = function () {
    return r;
  };
  this.paste = function (a) {
    if (r) {
      var c = p.getCursorPosition(b),
        d = p.getCursor(b).getNode(),
        d = l.getParagraphElement(d),
        h = d.getAttributeNS(q, "style-name") || "",
        f = c,
        k = [],
        n = p.convertDomPointToCursorStep(d, 0, e);
      a.replace(/\r/g, "")
        .split("\n")
        .forEach(function (a) {
          var c = new ops.OpInsertText(),
            d = new ops.OpSplitParagraph();
          c.init({ memberid: b, position: f, text: a, moveCursor: !0 });
          k.push(c);
          f += a.length;
          d.init({
            memberid: b,
            position: f,
            paragraphStyleName: h,
            sourceParagraphPosition: n,
            moveCursor: !0,
          });
          k.push(d);
          n = f += 1;
        });
      k.pop();
      g.enqueue(k);
    }
  };
  this.destroy = function (a) {
    p.unsubscribe(ops.Document.signalCursorMoved, n);
    k.unsubscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, f);
    a();
  };
  p.subscribe(ops.Document.signalCursorMoved, n);
  k.subscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, f);
  f();
};
gui.ClosestXOffsetScanner = function (g) {
  function k(b) {
    return null !== b && void 0 !== f ? Math.abs(b - g) > f : !1;
  }
  function d(b) {
    null !== b && !1 === k(b) && (f = Math.abs(b - g));
  }
  var b = this,
    f,
    n = gui.StepInfo.VisualDirection.LEFT_TO_RIGHT;
  this.token = void 0;
  this.process = function (f, g, q) {
    var e, l;
    f.visualDirection === n
      ? ((e = g && g.right), (l = q && q.left))
      : ((e = g && g.left), (l = q && q.right));
    if (k(e) || k(l)) return !0;
    if (g || q) d(e), d(l), (b.token = f.token);
    return !1;
  };
};
gui.LineBoundaryScanner = function () {
  var g = this,
    k = null;
  this.token = void 0;
  this.process = function (d, b, f) {
    var n;
    if ((n = f))
      if (k) {
        var p = k;
        n = Math.min(p.bottom - p.top, f.bottom - f.top);
        var r = Math.max(p.top, f.top),
          p = Math.min(p.bottom, f.bottom) - r;
        n = 0.4 >= (0 < n ? p / n : 0);
      } else n = !1;
    !b || (f && !n) || (g.token = d.token);
    if (n) return !0;
    k =
      (d = k) && b
        ? {
            left: Math.min(d.left, b.left),
            right: Math.max(d.right, b.right),
            top: Math.min(d.top, b.top),
            bottom: Math.min(d.bottom, b.bottom),
          }
        : d || b;
    return !1;
  };
};
gui.ParagraphBoundaryScanner = function () {
  var g = this,
    k = !1,
    d,
    b = odf.OdfUtils;
  this.token = void 0;
  this.process = function (f) {
    var n = b.getParagraphElement(f.container());
    k || ((d = n), (k = !0));
    if (d !== n) return !0;
    g.token = f.token;
    return !1;
  };
};
odf.WordBoundaryFilter = function (g, k) {
  function d(a, b, c) {
    for (
      var d = null, e = g.getRootNode(), f;
      a !== e && null !== a && null === d;

    )
      (f = 0 > b ? a.previousSibling : a.nextSibling),
        c(f) === NodeFilter.FILTER_ACCEPT && (d = f),
        (a = a.parentNode);
    return d;
  }
  function b(a, b) {
    var c;
    return null === a
      ? m.NO_NEIGHBOUR
      : p.isCharacterElement(a)
      ? m.SPACE_CHAR
      : a.nodeType === f || p.isTextSpan(a) || p.isHyperlink(a)
      ? ((c = a.textContent.charAt(b())),
        q.test(c) ? m.SPACE_CHAR : r.test(c) ? m.PUNCTUATION_CHAR : m.WORD_CHAR)
      : m.OTHER;
  }
  var f = Node.TEXT_NODE,
    n = Node.ELEMENT_NODE,
    p = odf.OdfUtils,
    r =
      /[!-#%-*,-\/:-;?-@\[-\]_{}\u00a1\u00ab\u00b7\u00bb\u00bf;\u00b7\u055a-\u055f\u0589-\u058a\u05be\u05c0\u05c3\u05c6\u05f3-\u05f4\u0609-\u060a\u060c-\u060d\u061b\u061e-\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0964-\u0965\u0970\u0df4\u0e4f\u0e5a-\u0e5b\u0f04-\u0f12\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u104a-\u104f\u10fb\u1361-\u1368\u166d-\u166e\u169b-\u169c\u16eb-\u16ed\u1735-\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944-\u1945\u19de-\u19df\u1a1e-\u1a1f\u1b5a-\u1b60\u1c3b-\u1c3f\u1c7e-\u1c7f\u2000-\u206e\u207d-\u207e\u208d-\u208e\u3008-\u3009\u2768-\u2775\u27c5-\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc-\u29fd\u2cf9-\u2cfc\u2cfe-\u2cff\u2e00-\u2e7e\u3000-\u303f\u30a0\u30fb\ua60d-\ua60f\ua673\ua67e\ua874-\ua877\ua8ce-\ua8cf\ua92e-\ua92f\ua95f\uaa5c-\uaa5f\ufd3e-\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a-\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a-\uff1b\uff1f-\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]|\ud800[\udd00-\udd01\udf9f\udfd0]|\ud802[\udd1f\udd3f\ude50-\ude58]|\ud809[\udc00-\udc7e]/,
    q = /\s/,
    e = core.PositionFilter.FilterResult.FILTER_ACCEPT,
    l = core.PositionFilter.FilterResult.FILTER_REJECT,
    a = odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,
    c = odf.WordBoundaryFilter.IncludeWhitespace.LEADING,
    m = {
      NO_NEIGHBOUR: 0,
      SPACE_CHAR: 1,
      PUNCTUATION_CHAR: 2,
      WORD_CHAR: 3,
      OTHER: 4,
    };
  this.acceptPosition = function (f) {
    var g = f.container(),
      p = f.leftNode(),
      r = f.rightNode(),
      q = f.unfilteredDomOffset,
      v = function () {
        return f.unfilteredDomOffset() - 1;
      };
    g.nodeType === n &&
      (null === r && (r = d(g, 1, f.getNodeFilter())),
      null === p && (p = d(g, -1, f.getNodeFilter())));
    g !== r &&
      (q = function () {
        return 0;
      });
    g !== p &&
      null !== p &&
      (v = function () {
        return p.textContent.length - 1;
      });
    g = b(p, v);
    r = b(r, q);
    return (g === m.WORD_CHAR && r === m.WORD_CHAR) ||
      (g === m.PUNCTUATION_CHAR && r === m.PUNCTUATION_CHAR) ||
      (k === a && g !== m.NO_NEIGHBOUR && r === m.SPACE_CHAR) ||
      (k === c && g === m.SPACE_CHAR && r !== m.NO_NEIGHBOUR)
      ? l
      : e;
  };
};
odf.WordBoundaryFilter.IncludeWhitespace = { None: 0, TRAILING: 1, LEADING: 2 };
gui.SelectionController = function (g, k) {
  function d(a) {
    var b = a.spec();
    if (a.isEdit || b.memberid === k) (I = void 0), K.cancel();
  }
  function b() {
    var a = x.getCursor(k).getNode();
    return x.createStepIterator(a, 0, [v, t], x.getRootElement(a));
  }
  function f(a, b, c) {
    c = new odf.WordBoundaryFilter(x, c);
    var d = x.getRootElement(a) || x.getRootNode(),
      e = x.createRootFilter(d);
    return x.createStepIterator(a, b, [v, e, c], d);
  }
  function n(a, b) {
    return b
      ? {
          anchorNode: a.startContainer,
          anchorOffset: a.startOffset,
          focusNode: a.endContainer,
          focusOffset: a.endOffset,
        }
      : {
          anchorNode: a.endContainer,
          anchorOffset: a.endOffset,
          focusNode: a.startContainer,
          focusOffset: a.startOffset,
        };
  }
  function p(a, b, c) {
    var d = new ops.OpMoveCursor();
    d.init({ memberid: k, position: a, length: b || 0, selectionType: c });
    return d;
  }
  function r(a, b, c) {
    var d;
    d = x.getCursor(k);
    d = n(d.getSelectedRange(), d.hasForwardSelection());
    d.focusNode = a;
    d.focusOffset = b;
    c || ((d.anchorNode = d.focusNode), (d.anchorOffset = d.focusOffset));
    a = x.convertDomToCursorRange(d);
    g.enqueue([p(a.position, a.length)]);
  }
  function q(a) {
    var b;
    b = f(a.startContainer, a.startOffset, L);
    b.roundToPreviousStep() && a.setStart(b.container(), b.offset());
    b = f(a.endContainer, a.endOffset, E);
    b.roundToNextStep() && a.setEnd(b.container(), b.offset());
  }
  function e(a) {
    var b = w.getParagraphElements(a),
      c = b[0],
      b = b[b.length - 1];
    c && a.setStart(c, 0);
    b &&
      (w.isParagraph(a.endContainer) && 0 === a.endOffset
        ? a.setEndBefore(b)
        : a.setEnd(b, b.childNodes.length));
  }
  function l(a, b, c, d) {
    var e, f;
    d
      ? ((e = c.startContainer), (f = c.startOffset))
      : ((e = c.endContainer), (f = c.endOffset));
    z.containsNode(a, e) ||
      ((f = 0 > z.comparePoints(a, 0, e, f) ? 0 : a.childNodes.length),
      (e = a));
    a = x.createStepIterator(e, f, b, w.getParagraphElement(e) || a);
    a.roundToClosestStep() ||
      runtime.assert(!1, "No step found in requested range");
    d
      ? c.setStart(a.container(), a.offset())
      : c.setEnd(a.container(), a.offset());
  }
  function a(a, c) {
    var d = b();
    d.advanceStep(a) && r(d.container(), d.offset(), c);
  }
  function c(a, c) {
    var d,
      e = I,
      f = [new gui.LineBoundaryScanner(), new gui.ParagraphBoundaryScanner()];
    void 0 === e && A && (e = A());
    isNaN(e) ||
      ((d = b()),
      u.moveToFilteredStep(d, a, f) &&
        d.advanceStep(a) &&
        ((f = [
          new gui.ClosestXOffsetScanner(e),
          new gui.LineBoundaryScanner(),
          new gui.ParagraphBoundaryScanner(),
        ]),
        u.moveToFilteredStep(d, a, f) &&
          (r(d.container(), d.offset(), c), (I = e), K.restart())));
  }
  function m(a, c) {
    var d = b(),
      e = [new gui.LineBoundaryScanner(), new gui.ParagraphBoundaryScanner()];
    u.moveToFilteredStep(d, a, e) && r(d.container(), d.offset(), c);
  }
  function h(a, b) {
    var c = x.getCursor(k),
      c = n(c.getSelectedRange(), c.hasForwardSelection()),
      c = f(c.focusNode, c.focusOffset, L);
    c.advanceStep(a) && r(c.container(), c.offset(), b);
  }
  function y(a, b, c) {
    var d = !1,
      e = x.getCursor(k),
      e = n(e.getSelectedRange(), e.hasForwardSelection()),
      d = x.getRootElement(e.focusNode);
    runtime.assert(Boolean(d), "SelectionController: Cursor outside root");
    e = x.createStepIterator(e.focusNode, e.focusOffset, [v, t], d);
    e.roundToClosestStep();
    e.advanceStep(a) &&
      (c = c(e.container())) &&
      (a === N
        ? (e.setPosition(c, 0), (d = e.roundToNextStep()))
        : (e.setPosition(c, c.childNodes.length),
          (d = e.roundToPreviousStep())),
      d && r(e.container(), e.offset(), b));
  }
  var x = g.getOdtDocument(),
    z = core.DomUtils,
    w = odf.OdfUtils,
    v = x.getPositionFilter(),
    u = new gui.GuiStepUtils(),
    t = x.createRootFilter(k),
    A = null,
    I,
    K,
    L = odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,
    E = odf.WordBoundaryFilter.IncludeWhitespace.LEADING,
    N = core.StepDirection.PREVIOUS,
    O = core.StepDirection.NEXT;
  this.selectionToRange = function (a) {
    var b =
        0 <=
        z.comparePoints(
          a.anchorNode,
          a.anchorOffset,
          a.focusNode,
          a.focusOffset
        ),
      c = a.focusNode.ownerDocument.createRange();
    b
      ? (c.setStart(a.anchorNode, a.anchorOffset),
        c.setEnd(a.focusNode, a.focusOffset))
      : (c.setStart(a.focusNode, a.focusOffset),
        c.setEnd(a.anchorNode, a.anchorOffset));
    return { range: c, hasForwardSelection: b };
  };
  this.rangeToSelection = n;
  this.selectImage = function (a) {
    var c = x.getRootElement(a),
      b = x.createRootFilter(c),
      c = x.createStepIterator(a, 0, [b, x.getPositionFilter()], c),
      d;
    c.roundToPreviousStep() ||
      runtime.assert(!1, "No walkable position before frame");
    b = c.container();
    d = c.offset();
    c.setPosition(a, a.childNodes.length);
    c.roundToNextStep() ||
      runtime.assert(!1, "No walkable position after frame");
    a = x.convertDomToCursorRange({
      anchorNode: b,
      anchorOffset: d,
      focusNode: c.container(),
      focusOffset: c.offset(),
    });
    a = p(a.position, a.length, ops.OdtCursor.RegionSelection);
    g.enqueue([a]);
  };
  this.expandToWordBoundaries = q;
  this.expandToParagraphBoundaries = e;
  this.selectRange = function (a, c, b) {
    var d = x.getOdfCanvas().getElement(),
      f,
      h = [v];
    f = z.containsNode(d, a.startContainer);
    d = z.containsNode(d, a.endContainer);
    if (f || d)
      if (
        (f && d && (2 === b ? q(a) : 3 <= b && e(a)),
        (b = c
          ? x.getRootElement(a.startContainer)
          : x.getRootElement(a.endContainer)) || (b = x.getRootNode()),
        h.push(x.createRootFilter(b)),
        l(b, h, a, !0),
        l(b, h, a, !1),
        (a = n(a, c)),
        (c = x.convertDomToCursorRange(a)),
        (a = x.getCursorSelection(k)),
        c.position !== a.position || c.length !== a.length)
      )
        (a = p(c.position, c.length, ops.OdtCursor.RangeSelection)),
          g.enqueue([a]);
  };
  this.moveCursorToLeft = function () {
    a(N, !1);
    return !0;
  };
  this.moveCursorToRight = function () {
    a(O, !1);
    return !0;
  };
  this.extendSelectionToLeft = function () {
    a(N, !0);
    return !0;
  };
  this.extendSelectionToRight = function () {
    a(O, !0);
    return !0;
  };
  this.setCaretXPositionLocator = function (a) {
    A = a;
  };
  this.moveCursorUp = function () {
    c(N, !1);
    return !0;
  };
  this.moveCursorDown = function () {
    c(O, !1);
    return !0;
  };
  this.extendSelectionUp = function () {
    c(N, !0);
    return !0;
  };
  this.extendSelectionDown = function () {
    c(O, !0);
    return !0;
  };
  this.moveCursorBeforeWord = function () {
    h(N, !1);
    return !0;
  };
  this.moveCursorPastWord = function () {
    h(O, !1);
    return !0;
  };
  this.extendSelectionBeforeWord = function () {
    h(N, !0);
    return !0;
  };
  this.extendSelectionPastWord = function () {
    h(O, !0);
    return !0;
  };
  this.moveCursorToLineStart = function () {
    m(N, !1);
    return !0;
  };
  this.moveCursorToLineEnd = function () {
    m(O, !1);
    return !0;
  };
  this.extendSelectionToLineStart = function () {
    m(N, !0);
    return !0;
  };
  this.extendSelectionToLineEnd = function () {
    m(O, !0);
    return !0;
  };
  this.extendSelectionToParagraphStart = function () {
    y(N, !0, w.getParagraphElement);
    return !0;
  };
  this.extendSelectionToParagraphEnd = function () {
    y(O, !0, w.getParagraphElement);
    return !0;
  };
  this.moveCursorToParagraphStart = function () {
    y(N, !1, w.getParagraphElement);
    return !0;
  };
  this.moveCursorToParagraphEnd = function () {
    y(O, !1, w.getParagraphElement);
    return !0;
  };
  this.moveCursorToDocumentStart = function () {
    y(N, !1, x.getRootElement);
    return !0;
  };
  this.moveCursorToDocumentEnd = function () {
    y(O, !1, x.getRootElement);
    return !0;
  };
  this.extendSelectionToDocumentStart = function () {
    y(N, !0, x.getRootElement);
    return !0;
  };
  this.extendSelectionToDocumentEnd = function () {
    y(O, !0, x.getRootElement);
    return !0;
  };
  this.extendSelectionToEntireDocument = function () {
    var a = x.getCursor(k),
      a = x.getRootElement(a.getNode()),
      c,
      b,
      d;
    runtime.assert(Boolean(a), "SelectionController: Cursor outside root");
    d = x.createStepIterator(a, 0, [v, t], a);
    d.roundToClosestStep();
    c = d.container();
    b = d.offset();
    d.setPosition(a, a.childNodes.length);
    d.roundToClosestStep();
    a = x.convertDomToCursorRange({
      anchorNode: c,
      anchorOffset: b,
      focusNode: d.container(),
      focusOffset: d.offset(),
    });
    g.enqueue([p(a.position, a.length)]);
    return !0;
  };
  this.destroy = function (a) {
    x.unsubscribe(ops.OdtDocument.signalOperationStart, d);
    core.Async.destroyAll([K.destroy], a);
  };
  (function () {
    K = core.Task.createTimeoutTask(function () {
      I = void 0;
    }, 2e3);
    x.subscribe(ops.OdtDocument.signalOperationStart, d);
  })();
};
gui.TextController = function (g, k, d, b, f, n) {
  function p() {
    y =
      !0 === k.getState(gui.CommonConstraints.EDIT.REVIEW_MODE)
        ? d.isLocalCursorWithinOwnAnnotation()
        : !0;
  }
  function r(a) {
    a.getMemberId() === b && p();
  }
  function q(a, b, d) {
    var e = [c.getPositionFilter()];
    d && e.push(c.createRootFilter(a.startContainer));
    d = c.createStepIterator(a.startContainer, a.startOffset, e, b);
    d.roundToClosestStep() ||
      runtime.assert(
        !1,
        "No walkable step found in paragraph element at range start"
      );
    b = c.convertDomPointToCursorStep(d.container(), d.offset());
    a.collapsed
      ? (a = b)
      : (d.setPosition(a.endContainer, a.endOffset),
        d.roundToClosestStep() ||
          runtime.assert(
            !1,
            "No walkable step found in paragraph element at range end"
          ),
        (a = c.convertDomPointToCursorStep(d.container(), d.offset())));
    return { position: b, length: a - b };
  }
  function e(a) {
    var c,
      d,
      e,
      f = m.getParagraphElements(a),
      g = a.cloneRange(),
      l = [];
    c = f[0];
    1 < f.length &&
      (m.hasNoODFContent(c) && (c = f[f.length - 1]),
      (d = c.getAttributeNS(odf.Namespaces.textns, "style-name") || ""));
    f.forEach(function (c, f) {
      var m, k;
      g.setStart(c, 0);
      g.collapse(!0);
      m = q(g, c, !1).position;
      0 < f &&
        ((k = new ops.OpMergeParagraph()),
        k.init({
          memberid: b,
          paragraphStyleName: d,
          destinationStartPosition: e,
          sourceStartPosition: m,
          moveCursor: 1 === f,
        }),
        l.unshift(k));
      e = m;
      g.selectNodeContents(c);
      if ((m = h.rangeIntersection(g, a)))
        (m = q(m, c, !0)),
          0 < m.length &&
            ((k = new ops.OpRemoveText()),
            k.init({ memberid: b, position: m.position, length: m.length }),
            l.unshift(k));
    });
    return l;
  }
  function l(a) {
    0 > a.length && ((a.position += a.length), (a.length = -a.length));
    return a;
  }
  function a(a) {
    if (!y) return !1;
    var d,
      f = c.getCursor(b).getSelectedRange().cloneRange(),
      h = l(c.getCursorSelection(b)),
      m;
    if (0 === h.length) {
      h = void 0;
      d = c.getCursor(b).getNode();
      m = c.getRootElement(d);
      var k = [c.getPositionFilter(), c.createRootFilter(m)];
      m = c.createStepIterator(d, 0, k, m);
      m.roundToClosestStep() &&
        (a ? m.nextStep() : m.previousStep()) &&
        ((h = l(
          c.convertDomToCursorRange({
            anchorNode: d,
            anchorOffset: 0,
            focusNode: m.container(),
            focusOffset: m.offset(),
          })
        )),
        a
          ? (f.setStart(d, 0), f.setEnd(m.container(), m.offset()))
          : (f.setStart(m.container(), m.offset()), f.setEnd(d, 0)));
    }
    h && g.enqueue(e(f));
    return void 0 !== h;
  }
  var c = g.getOdtDocument(),
    m = odf.OdfUtils,
    h = core.DomUtils,
    y = !1,
    x = odf.Namespaces.textns,
    z = core.StepDirection.NEXT;
  this.isEnabled = function () {
    return y;
  };
  this.enqueueParagraphSplittingOps = function () {
    if (!y) return !1;
    var a = c.getCursor(b),
      d = a.getSelectedRange(),
      f = l(c.getCursorSelection(b)),
      h = [],
      a = m.getParagraphElement(a.getNode()),
      k = a.getAttributeNS(x, "style-name") || "";
    0 < f.length && (h = h.concat(e(d)));
    d = new ops.OpSplitParagraph();
    d.init({
      memberid: b,
      position: f.position,
      paragraphStyleName: k,
      sourceParagraphPosition: c.convertDomPointToCursorStep(a, 0, z),
      moveCursor: !0,
    });
    h.push(d);
    n && ((f = n(f.position + 1)), (h = h.concat(f)));
    g.enqueue(h);
    return !0;
  };
  this.removeTextByBackspaceKey = function () {
    return a(!1);
  };
  this.removeTextByDeleteKey = function () {
    return a(!0);
  };
  this.removeCurrentSelection = function () {
    if (!y) return !1;
    var a = c.getCursor(b).getSelectedRange();
    g.enqueue(e(a));
    return !0;
  };
  this.insertText = function (a) {
    if (y) {
      var d = c.getCursor(b).getSelectedRange(),
        h = l(c.getCursorSelection(b)),
        m = [],
        k = !1;
      0 < h.length && ((m = m.concat(e(d))), (k = !0));
      d = new ops.OpInsertText();
      d.init({ memberid: b, position: h.position, text: a, moveCursor: !0 });
      m.push(d);
      f && (a = f(h.position, a.length, k)) && m.push(a);
      g.enqueue(m);
    }
  };
  this.destroy = function (a) {
    c.unsubscribe(ops.Document.signalCursorMoved, r);
    k.unsubscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, p);
    a();
  };
  c.subscribe(ops.Document.signalCursorMoved, r);
  k.subscribe(gui.CommonConstraints.EDIT.REVIEW_MODE, p);
  p();
};
gui.UndoManager = function () {};
gui.UndoManager.prototype.subscribe = function (g, k) {};
gui.UndoManager.prototype.unsubscribe = function (g, k) {};
gui.UndoManager.prototype.setDocument = function (g) {};
gui.UndoManager.prototype.setInitialState = function () {};
gui.UndoManager.prototype.initialize = function () {};
gui.UndoManager.prototype.purgeInitialState = function () {};
gui.UndoManager.prototype.setPlaybackFunction = function (g) {};
gui.UndoManager.prototype.hasUndoStates = function () {};
gui.UndoManager.prototype.hasRedoStates = function () {};
gui.UndoManager.prototype.moveForward = function (g) {};
gui.UndoManager.prototype.moveBackward = function (g) {};
gui.UndoManager.prototype.onOperationExecuted = function (g) {};
gui.UndoManager.prototype.isDocumentModified = function () {};
gui.UndoManager.prototype.setDocumentModified = function (g) {};
gui.UndoManager.signalUndoStackChanged = "undoStackChanged";
gui.UndoManager.signalUndoStateCreated = "undoStateCreated";
gui.UndoManager.signalUndoStateModified = "undoStateModified";
gui.UndoManager.signalDocumentModifiedChanged = "documentModifiedChanged";
gui.SessionControllerOptions = function () {
  this.annotationsEnabled =
    this.directParagraphStylingEnabled =
    this.directTextStylingEnabled =
      !1;
};
(function () {
  var g = core.PositionFilter.FilterResult.FILTER_ACCEPT;
  gui.SessionController = function (k, d, b, f) {
    function n(a, c) {
      var b = J.getDOMDocument(),
        d = null;
      b.caretRangeFromPoint
        ? ((b = b.caretRangeFromPoint(a, c)),
          (d = { container: b.startContainer, offset: b.startOffset }))
        : b.caretPositionFromPoint &&
          (b = b.caretPositionFromPoint(a, c)) &&
          b.offsetNode &&
          (d = { container: b.offsetNode, offset: b.offset });
      return d;
    }
    function p(a) {
      var c = J.getCursor(d).getSelectedRange();
      c.collapsed
        ? a.preventDefault()
        : ha.setDataFromRange(a, c)
        ? da.removeCurrentSelection()
        : runtime.log("Cut operation failed");
    }
    function r() {
      return !1 !== J.getCursor(d).getSelectedRange().collapsed;
    }
    function q(a) {
      var c = J.getCursor(d).getSelectedRange();
      c.collapsed
        ? a.preventDefault()
        : ha.setDataFromRange(a, c) || runtime.log("Copy operation failed");
    }
    function e(a) {
      var c;
      W.clipboardData && W.clipboardData.getData
        ? (c = W.clipboardData.getData("Text"))
        : a.clipboardData &&
          a.clipboardData.getData &&
          (c = a.clipboardData.getData("text/plain"));
      c && (da.removeCurrentSelection(), ea.paste(c));
      a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
    }
    function l() {
      return !1;
    }
    function a(a) {
      if (Q) Q.onOperationExecuted(a);
    }
    function c(a) {
      J.emit(ops.OdtDocument.signalUndoStackChanged, a);
    }
    function m() {
      var a;
      return Q
        ? ((a = F.hasFocus()), Q.moveBackward(1), a && F.focus(), !0)
        : !1;
    }
    function h() {
      var a;
      return Q
        ? ((a = F.hasFocus()), Q.moveForward(1), a && F.focus(), !0)
        : !1;
    }
    function y(a) {
      var c = J.getCursor(d).getSelectedRange(),
        e = (a.target || a.srcElement || null).getAttribute("end");
      c &&
        e &&
        (a = n(a.clientX, a.clientY)) &&
        (ia.setUnfilteredPosition(a.container, a.offset),
        Y.acceptPosition(ia) === g &&
          ((c = c.cloneRange()),
          "left" === e
            ? c.setStart(ia.container(), ia.unfilteredDomOffset())
            : c.setEnd(ia.container(), ia.unfilteredDomOffset()),
          b.setSelectedRange(c, "right" === e),
          J.emit(ops.Document.signalCursorMoved, b)));
    }
    function x() {
      T.selectRange(b.getSelectedRange(), b.hasForwardSelection(), 1);
    }
    function z() {
      var a = W.getSelection(),
        c = 0 < a.rangeCount && T.selectionToRange(a);
      U &&
        c &&
        ((B = !0),
        la.clearSelection(),
        ia.setUnfilteredPosition(a.focusNode, a.focusOffset),
        Y.acceptPosition(ia) === g &&
          (2 === oa
            ? T.expandToWordBoundaries(c.range)
            : 3 <= oa && T.expandToParagraphBoundaries(c.range),
          b.setSelectedRange(c.range, c.hasForwardSelection),
          J.emit(ops.Document.signalCursorMoved, b)));
    }
    function w(a) {
      var c = a.target || a.srcElement || null,
        b = J.getCursor(d);
      if ((U = null !== c && aa.containsNode(J.getOdfCanvas().getElement(), c)))
        (B = !1),
          (c = J.getRootElement(c) || J.getRootNode()),
          (Y = J.createRootFilter(c)),
          (oa = 0 === a.button ? a.detail : 0),
          b && a.shiftKey
            ? W.getSelection().collapse(b.getAnchorNode(), 0)
            : ((a = W.getSelection()),
              (c = b.getSelectedRange()),
              a.extend
                ? b.hasForwardSelection()
                  ? (a.collapse(c.startContainer, c.startOffset),
                    a.extend(c.endContainer, c.endOffset))
                  : (a.collapse(c.endContainer, c.endOffset),
                    a.extend(c.startContainer, c.startOffset))
                : (a.removeAllRanges(), a.addRange(c.cloneRange()))),
          1 < oa && z();
    }
    function v(a) {
      var c = J.getRootElement(a),
        b = J.createRootFilter(c),
        c = J.createStepIterator(a, 0, [b, J.getPositionFilter()], c);
      c.setPosition(a, a.childNodes.length);
      return c.roundToNextStep()
        ? { container: c.container(), offset: c.offset() }
        : null;
    }
    function u(a) {
      var c;
      c = (c = W.getSelection())
        ? {
            anchorNode: c.anchorNode,
            anchorOffset: c.anchorOffset,
            focusNode: c.focusNode,
            focusOffset: c.focusOffset,
          }
        : null;
      var b = W.getSelection().isCollapsed,
        d,
        e;
      c.anchorNode ||
        c.focusNode ||
        !(d = n(a.clientX, a.clientY)) ||
        ((c.anchorNode = d.container),
        (c.anchorOffset = d.offset),
        (c.focusNode = c.anchorNode),
        (c.focusOffset = c.anchorOffset));
      if (
        S.isImage(c.focusNode) &&
        0 === c.focusOffset &&
        S.isCharacterFrame(c.focusNode.parentNode)
      ) {
        if (
          ((e = c.focusNode.parentNode),
          (d = e.getBoundingClientRect()),
          a.clientX > d.left && (d = v(e)))
        )
          (c.focusNode = d.container),
            (c.focusOffset = d.offset),
            b &&
              ((c.anchorNode = c.focusNode), (c.anchorOffset = c.focusOffset));
      } else
        S.isImage(c.focusNode.firstChild) &&
          1 === c.focusOffset &&
          S.isCharacterFrame(c.focusNode) &&
          (d = v(c.focusNode)) &&
          ((c.anchorNode = c.focusNode = d.container),
          (c.anchorOffset = c.focusOffset = d.offset));
      c.anchorNode &&
        c.focusNode &&
        ((c = T.selectionToRange(c)),
        T.selectRange(
          c.range,
          c.hasForwardSelection,
          0 === a.button ? a.detail : 0
        ));
      F.focus();
    }
    function t(a) {
      var c;
      if ((c = n(a.clientX, a.clientY)))
        (a = c.container),
          (c = c.offset),
          (a = {
            anchorNode: a,
            anchorOffset: c,
            focusNode: a,
            focusOffset: c,
          }),
          (a = T.selectionToRange(a)),
          T.selectRange(a.range, a.hasForwardSelection, 2),
          F.focus();
    }
    function A(a) {
      var c = a.target || a.srcElement || null,
        d,
        e,
        f;
      ma.processRequests();
      U &&
        (S.isImage(c) &&
        S.isCharacterFrame(c.parentNode) &&
        W.getSelection().isCollapsed
          ? (T.selectImage(c.parentNode), F.focus())
          : la.isSelectorElement(c)
          ? F.focus()
          : B
          ? ((c = b.getSelectedRange()),
            (e = c.collapsed),
            S.isImage(c.endContainer) &&
              0 === c.endOffset &&
              S.isCharacterFrame(c.endContainer.parentNode) &&
              ((f = c.endContainer.parentNode), (f = v(f))) &&
              (c.setEnd(f.container, f.offset), e && c.collapse(!1)),
            T.selectRange(
              c,
              b.hasForwardSelection(),
              0 === a.button ? a.detail : 0
            ),
            F.focus())
          : ua
          ? u(a)
          : ((d = aa.cloneEvent(a)),
            (M = runtime.setTimeout(function () {
              u(d);
            }, 0))),
        (oa = 0),
        (B = U = !1));
    }
    function I(a) {
      var c = J.getCursor(d).getSelectedRange();
      c.collapsed || fa.exportRangeToDataTransfer(a.dataTransfer, c);
    }
    function K() {
      U && F.focus();
      oa = 0;
      B = U = !1;
    }
    function L(a) {
      A(a);
    }
    function E(a) {
      var c = a.target || a.srcElement || null,
        b = null;
      "annotationRemoveButton" === c.className
        ? (runtime.assert(
            ja,
            "Remove buttons are displayed on annotations while annotation editing is disabled in the controller."
          ),
          (b = c.parentNode
            .getElementsByTagNameNS(odf.Namespaces.officens, "annotation")
            .item(0)),
          ca.removeAnnotation(b),
          F.focus())
        : "webodf-draggable" !== c.getAttribute("class") && A(a);
    }
    function N(a) {
      (a = a.data) && (-1 === a.indexOf("\n") ? da.insertText(a) : ea.paste(a));
    }
    function O(a) {
      return function () {
        a();
        return !0;
      };
    }
    function D(a) {
      return function (c) {
        return J.getCursor(d).getSelectionType() ===
          ops.OdtCursor.RangeSelection
          ? a(c)
          : !0;
      };
    }
    function V(c) {
      F.unsubscribe("keydown", C.handleEvent);
      F.unsubscribe("keypress", Z.handleEvent);
      F.unsubscribe("keyup", ba.handleEvent);
      F.unsubscribe("copy", q);
      F.unsubscribe("mousedown", w);
      F.unsubscribe("mousemove", ma.trigger);
      F.unsubscribe("mouseup", E);
      F.unsubscribe("contextmenu", L);
      F.unsubscribe("dragstart", I);
      F.unsubscribe("dragend", K);
      F.unsubscribe("click", pa.handleClick);
      F.unsubscribe("longpress", t);
      F.unsubscribe("drag", y);
      F.unsubscribe("dragstop", x);
      J.unsubscribe(ops.OdtDocument.signalOperationEnd, na.trigger);
      J.unsubscribe(ops.Document.signalCursorAdded, ka.registerCursor);
      J.unsubscribe(ops.Document.signalCursorRemoved, ka.removeCursor);
      J.unsubscribe(ops.OdtDocument.signalOperationEnd, a);
      c();
    }
    var W = runtime.getWindow(),
      J = k.getOdtDocument(),
      R = new gui.SessionConstraints(),
      P = new gui.SessionContext(k, d),
      aa = core.DomUtils,
      S = odf.OdfUtils,
      fa = new gui.MimeDataExporter(),
      ha = new gui.Clipboard(fa),
      C = new gui.KeyboardHandler(),
      Z = new gui.KeyboardHandler(),
      ba = new gui.KeyboardHandler(),
      U = !1,
      ga = new odf.ObjectNameGenerator(J.getOdfCanvas().odfContainer(), d),
      B = !1,
      Y = null,
      M,
      Q = null,
      F = new gui.EventManager(J),
      ja = f.annotationsEnabled,
      ca = new gui.AnnotationController(k, R, d),
      X = new gui.DirectFormattingController(
        k,
        R,
        P,
        d,
        ga,
        f.directTextStylingEnabled,
        f.directParagraphStylingEnabled
      ),
      da = new gui.TextController(
        k,
        R,
        P,
        d,
        X.createCursorStyleOp,
        X.createParagraphStyleOps
      ),
      qa = new gui.ImageController(k, R, P, d, ga),
      la = new gui.ImageSelector(J.getOdfCanvas()),
      ia = J.createPositionIterator(J.getRootNode()),
      ma,
      na,
      ea = new gui.PasteController(k, R, P, d),
      ka = new gui.InputMethodEditor(d, F),
      oa = 0,
      pa = new gui.HyperlinkClickHandler(J.getOdfCanvas().getElement, C, ba),
      ta = new gui.HyperlinkController(k, R, P, d),
      T = new gui.SelectionController(k, d),
      va = new gui.MetadataController(k, d),
      G = gui.KeyboardHandler.Modifier,
      H = gui.KeyboardHandler.KeyCode,
      ra = -1 !== W.navigator.appVersion.toLowerCase().indexOf("mac"),
      ua = -1 !== ["iPad", "iPod", "iPhone"].indexOf(W.navigator.platform),
      sa;
    runtime.assert(
      null !== W,
      "Expected to be run in an environment which has a global window, like a browser."
    );
    this.undo = m;
    this.redo = h;
    this.insertLocalCursor = function () {
      runtime.assert(
        void 0 === k.getOdtDocument().getCursor(d),
        "Inserting local cursor a second time."
      );
      var a = new ops.OpAddCursor();
      a.init({ memberid: d });
      k.enqueue([a]);
      F.focus();
    };
    this.removeLocalCursor = function () {
      runtime.assert(
        void 0 !== k.getOdtDocument().getCursor(d),
        "Removing local cursor without inserting before."
      );
      var a = new ops.OpRemoveCursor();
      a.init({ memberid: d });
      k.enqueue([a]);
    };
    this.startEditing = function () {
      ka.subscribe(
        gui.InputMethodEditor.signalCompositionStart,
        da.removeCurrentSelection
      );
      ka.subscribe(gui.InputMethodEditor.signalCompositionEnd, N);
      F.subscribe("beforecut", r);
      F.subscribe("cut", p);
      F.subscribe("beforepaste", l);
      F.subscribe("paste", e);
      Q && Q.initialize();
      F.setEditing(!0);
      pa.setModifier(ra ? G.Meta : G.Ctrl);
      C.bind(H.Backspace, G.None, O(da.removeTextByBackspaceKey), !0);
      C.bind(H.Delete, G.None, da.removeTextByDeleteKey);
      C.bind(
        H.Tab,
        G.None,
        D(function () {
          da.insertText("\t");
          return !0;
        })
      );
      ra
        ? (C.bind(H.Clear, G.None, da.removeCurrentSelection),
          C.bind(H.B, G.Meta, D(X.toggleBold)),
          C.bind(H.I, G.Meta, D(X.toggleItalic)),
          C.bind(H.U, G.Meta, D(X.toggleUnderline)),
          C.bind(H.L, G.MetaShift, D(X.alignParagraphLeft)),
          C.bind(H.E, G.MetaShift, D(X.alignParagraphCenter)),
          C.bind(H.R, G.MetaShift, D(X.alignParagraphRight)),
          C.bind(H.J, G.MetaShift, D(X.alignParagraphJustified)),
          ja && C.bind(H.C, G.MetaShift, ca.addAnnotation),
          C.bind(H.Z, G.Meta, m),
          C.bind(H.Z, G.MetaShift, h))
        : (C.bind(H.B, G.Ctrl, D(X.toggleBold)),
          C.bind(H.I, G.Ctrl, D(X.toggleItalic)),
          C.bind(H.U, G.Ctrl, D(X.toggleUnderline)),
          C.bind(H.L, G.CtrlShift, D(X.alignParagraphLeft)),
          C.bind(H.E, G.CtrlShift, D(X.alignParagraphCenter)),
          C.bind(H.R, G.CtrlShift, D(X.alignParagraphRight)),
          C.bind(H.J, G.CtrlShift, D(X.alignParagraphJustified)),
          ja && C.bind(H.C, G.CtrlAlt, ca.addAnnotation),
          C.bind(H.Z, G.Ctrl, m),
          C.bind(H.Z, G.CtrlShift, h));
      Z.setDefault(
        D(function (a) {
          var c;
          c =
            null === a.which || void 0 === a.which
              ? String.fromCharCode(a.keyCode)
              : 0 !== a.which && 0 !== a.charCode
              ? String.fromCharCode(a.which)
              : null;
          return !c || a.altKey || a.ctrlKey || a.metaKey
            ? !1
            : (da.insertText(c), !0);
        })
      );
      Z.bind(H.Enter, G.None, D(da.enqueueParagraphSplittingOps));
    };
    this.endEditing = function () {
      ka.unsubscribe(
        gui.InputMethodEditor.signalCompositionStart,
        da.removeCurrentSelection
      );
      ka.unsubscribe(gui.InputMethodEditor.signalCompositionEnd, N);
      F.unsubscribe("cut", p);
      F.unsubscribe("beforecut", r);
      F.unsubscribe("paste", e);
      F.unsubscribe("beforepaste", l);
      F.setEditing(!1);
      pa.setModifier(G.None);
      C.bind(
        H.Backspace,
        G.None,
        function () {
          return !0;
        },
        !0
      );
      C.unbind(H.Delete, G.None);
      C.unbind(H.Tab, G.None);
      ra
        ? (C.unbind(H.Clear, G.None),
          C.unbind(H.B, G.Meta),
          C.unbind(H.I, G.Meta),
          C.unbind(H.U, G.Meta),
          C.unbind(H.L, G.MetaShift),
          C.unbind(H.E, G.MetaShift),
          C.unbind(H.R, G.MetaShift),
          C.unbind(H.J, G.MetaShift),
          ja && C.unbind(H.C, G.MetaShift),
          C.unbind(H.Z, G.Meta),
          C.unbind(H.Z, G.MetaShift))
        : (C.unbind(H.B, G.Ctrl),
          C.unbind(H.I, G.Ctrl),
          C.unbind(H.U, G.Ctrl),
          C.unbind(H.L, G.CtrlShift),
          C.unbind(H.E, G.CtrlShift),
          C.unbind(H.R, G.CtrlShift),
          C.unbind(H.J, G.CtrlShift),
          ja && C.unbind(H.C, G.CtrlAlt),
          C.unbind(H.Z, G.Ctrl),
          C.unbind(H.Z, G.CtrlShift));
      Z.setDefault(null);
      Z.unbind(H.Enter, G.None);
    };
    this.getInputMemberId = function () {
      return d;
    };
    this.getSession = function () {
      return k;
    };
    this.getSessionConstraints = function () {
      return R;
    };
    this.setUndoManager = function (a) {
      Q && Q.unsubscribe(gui.UndoManager.signalUndoStackChanged, c);
      if ((Q = a))
        Q.setDocument(J),
          Q.setPlaybackFunction(k.enqueue),
          Q.subscribe(gui.UndoManager.signalUndoStackChanged, c);
    };
    this.getUndoManager = function () {
      return Q;
    };
    this.getMetadataController = function () {
      return va;
    };
    this.getAnnotationController = function () {
      return ca;
    };
    this.getDirectFormattingController = function () {
      return X;
    };
    this.getHyperlinkClickHandler = function () {
      return pa;
    };
    this.getHyperlinkController = function () {
      return ta;
    };
    this.getImageController = function () {
      return qa;
    };
    this.getSelectionController = function () {
      return T;
    };
    this.getTextController = function () {
      return da;
    };
    this.getEventManager = function () {
      return F;
    };
    this.getKeyboardHandlers = function () {
      return { keydown: C, keypress: Z };
    };
    this.destroy = function (a) {
      var c = [
        ma.destroy,
        na.destroy,
        X.destroy,
        ka.destroy,
        F.destroy,
        pa.destroy,
        ta.destroy,
        va.destroy,
        T.destroy,
        da.destroy,
        V,
      ];
      sa && c.unshift(sa.destroy);
      runtime.clearTimeout(M);
      core.Async.destroyAll(c, a);
    };
    ma = core.Task.createRedrawTask(z);
    na = core.Task.createRedrawTask(function () {
      var a = J.getCursor(d);
      if (
        a &&
        a.getSelectionType() === ops.OdtCursor.RegionSelection &&
        (a = S.getImageElements(a.getSelectedRange())[0])
      ) {
        la.select(a.parentNode);
        return;
      }
      la.clearSelection();
    });
    C.bind(H.Left, G.None, D(T.moveCursorToLeft));
    C.bind(H.Right, G.None, D(T.moveCursorToRight));
    C.bind(H.Up, G.None, D(T.moveCursorUp));
    C.bind(H.Down, G.None, D(T.moveCursorDown));
    C.bind(H.Left, G.Shift, D(T.extendSelectionToLeft));
    C.bind(H.Right, G.Shift, D(T.extendSelectionToRight));
    C.bind(H.Up, G.Shift, D(T.extendSelectionUp));
    C.bind(H.Down, G.Shift, D(T.extendSelectionDown));
    C.bind(H.Home, G.None, D(T.moveCursorToLineStart));
    C.bind(H.End, G.None, D(T.moveCursorToLineEnd));
    C.bind(H.Home, G.Ctrl, D(T.moveCursorToDocumentStart));
    C.bind(H.End, G.Ctrl, D(T.moveCursorToDocumentEnd));
    C.bind(H.Home, G.Shift, D(T.extendSelectionToLineStart));
    C.bind(H.End, G.Shift, D(T.extendSelectionToLineEnd));
    C.bind(H.Up, G.CtrlShift, D(T.extendSelectionToParagraphStart));
    C.bind(H.Down, G.CtrlShift, D(T.extendSelectionToParagraphEnd));
    C.bind(H.Home, G.CtrlShift, D(T.extendSelectionToDocumentStart));
    C.bind(H.End, G.CtrlShift, D(T.extendSelectionToDocumentEnd));
    ra
      ? (C.bind(H.Left, G.Alt, D(T.moveCursorBeforeWord)),
        C.bind(H.Right, G.Alt, D(T.moveCursorPastWord)),
        C.bind(H.Left, G.Meta, D(T.moveCursorToLineStart)),
        C.bind(H.Right, G.Meta, D(T.moveCursorToLineEnd)),
        C.bind(H.Home, G.Meta, D(T.moveCursorToDocumentStart)),
        C.bind(H.End, G.Meta, D(T.moveCursorToDocumentEnd)),
        C.bind(H.Left, G.AltShift, D(T.extendSelectionBeforeWord)),
        C.bind(H.Right, G.AltShift, D(T.extendSelectionPastWord)),
        C.bind(H.Left, G.MetaShift, D(T.extendSelectionToLineStart)),
        C.bind(H.Right, G.MetaShift, D(T.extendSelectionToLineEnd)),
        C.bind(H.Up, G.AltShift, D(T.extendSelectionToParagraphStart)),
        C.bind(H.Down, G.AltShift, D(T.extendSelectionToParagraphEnd)),
        C.bind(H.Up, G.MetaShift, D(T.extendSelectionToDocumentStart)),
        C.bind(H.Down, G.MetaShift, D(T.extendSelectionToDocumentEnd)),
        C.bind(H.A, G.Meta, D(T.extendSelectionToEntireDocument)))
      : (C.bind(H.Left, G.Ctrl, D(T.moveCursorBeforeWord)),
        C.bind(H.Right, G.Ctrl, D(T.moveCursorPastWord)),
        C.bind(H.Left, G.CtrlShift, D(T.extendSelectionBeforeWord)),
        C.bind(H.Right, G.CtrlShift, D(T.extendSelectionPastWord)),
        C.bind(H.A, G.Ctrl, D(T.extendSelectionToEntireDocument)));
    ua && (sa = new gui.IOSSafariSupport(F));
    F.subscribe("keydown", C.handleEvent);
    F.subscribe("keypress", Z.handleEvent);
    F.subscribe("keyup", ba.handleEvent);
    F.subscribe("copy", q);
    F.subscribe("mousedown", w);
    F.subscribe("mousemove", ma.trigger);
    F.subscribe("mouseup", E);
    F.subscribe("contextmenu", L);
    F.subscribe("dragstart", I);
    F.subscribe("dragend", K);
    F.subscribe("click", pa.handleClick);
    F.subscribe("longpress", t);
    F.subscribe("drag", y);
    F.subscribe("dragstop", x);
    J.subscribe(ops.OdtDocument.signalOperationEnd, na.trigger);
    J.subscribe(ops.Document.signalCursorAdded, ka.registerCursor);
    J.subscribe(ops.Document.signalCursorRemoved, ka.removeCursor);
    J.subscribe(ops.OdtDocument.signalOperationEnd, a);
  };
})();
gui.CaretManager = function (g, k) {
  function d(b) {
    return n.hasOwnProperty(b) ? n[b] : null;
  }
  function b() {
    return Object.keys(n).map(function (b) {
      return n[b];
    });
  }
  function f(b) {
    var d = n[b];
    d &&
      (delete n[b],
      b === g.getInputMemberId()
        ? (r.unsubscribe(
            ops.OdtDocument.signalProcessingBatchEnd,
            d.ensureVisible
          ),
          r.unsubscribe(
            ops.Document.signalCursorMoved,
            d.refreshCursorBlinking
          ),
          q.unsubscribe("compositionupdate", d.handleUpdate),
          q.unsubscribe("compositionend", d.handleUpdate),
          q.unsubscribe("focus", d.setFocus),
          q.unsubscribe("blur", d.removeFocus),
          p.removeEventListener("focus", d.show, !1),
          p.removeEventListener("blur", d.hide, !1))
        : r.unsubscribe(
            ops.OdtDocument.signalProcessingBatchEnd,
            d.handleUpdate
          ),
      d.destroy(function () {}));
  }
  var n = {},
    p = runtime.getWindow(),
    r = g.getSession().getOdtDocument(),
    q = g.getEventManager();
  this.registerCursor = function (b, d, a) {
    var c = b.getMemberId();
    b = new gui.Caret(b, k, d, a);
    n[c] = b;
    c === g.getInputMemberId()
      ? (runtime.log("Starting to track input on new cursor of " + c),
        r.subscribe(ops.OdtDocument.signalProcessingBatchEnd, b.ensureVisible),
        r.subscribe(ops.Document.signalCursorMoved, b.refreshCursorBlinking),
        q.subscribe("compositionupdate", b.handleUpdate),
        q.subscribe("compositionend", b.handleUpdate),
        q.subscribe("focus", b.setFocus),
        q.subscribe("blur", b.removeFocus),
        p.addEventListener("focus", b.show, !1),
        p.addEventListener("blur", b.hide, !1),
        b.setOverlayElement(q.getEventTrap()))
      : r.subscribe(ops.OdtDocument.signalProcessingBatchEnd, b.handleUpdate);
    return b;
  };
  this.getCaret = d;
  this.getCarets = b;
  this.destroy = function (d) {
    var l = b().map(function (a) {
      return a.destroy;
    });
    g.getSelectionController().setCaretXPositionLocator(null);
    r.unsubscribe(ops.Document.signalCursorRemoved, f);
    n = {};
    core.Async.destroyAll(l, d);
  };
  g.getSelectionController().setCaretXPositionLocator(function () {
    var b = d(g.getInputMemberId()),
      f;
    b && (f = b.getBoundingClientRect());
    return f ? f.right : void 0;
  });
  r.subscribe(ops.Document.signalCursorRemoved, f);
};
gui.EditInfoHandle = function (g) {
  var k = [],
    d,
    b = g.ownerDocument,
    f = b.documentElement.namespaceURI;
  this.setEdits = function (g) {
    k = g;
    var p, r, q, e;
    core.DomUtils.removeAllChildNodes(d);
    for (g = 0; g < k.length; g += 1)
      (p = b.createElementNS(f, "div")),
        (p.className = "editInfo"),
        (r = b.createElementNS(f, "span")),
        (r.className = "editInfoColor"),
        r.setAttributeNS(
          "urn:webodf:names:editinfo",
          "editinfo:memberid",
          k[g].memberid
        ),
        (q = b.createElementNS(f, "span")),
        (q.className = "editInfoAuthor"),
        q.setAttributeNS(
          "urn:webodf:names:editinfo",
          "editinfo:memberid",
          k[g].memberid
        ),
        (e = b.createElementNS(f, "span")),
        (e.className = "editInfoTime"),
        e.setAttributeNS(
          "urn:webodf:names:editinfo",
          "editinfo:memberid",
          k[g].memberid
        ),
        e.appendChild(b.createTextNode(k[g].time.toString())),
        p.appendChild(r),
        p.appendChild(q),
        p.appendChild(e),
        d.appendChild(p);
  };
  this.show = function () {
    d.style.display = "block";
  };
  this.hide = function () {
    d.style.display = "none";
  };
  this.destroy = function (b) {
    g.removeChild(d);
    b();
  };
  d = b.createElementNS(f, "div");
  d.setAttribute("class", "editInfoHandle");
  d.style.display = "none";
  g.appendChild(d);
};
ops.EditInfo = function (g, k) {
  function d() {
    var b = [],
      d;
    for (d in f)
      f.hasOwnProperty(d) && b.push({ memberid: d, time: f[d].time });
    b.sort(function (b, d) {
      return b.time - d.time;
    });
    return b;
  }
  var b,
    f = {};
  this.getNode = function () {
    return b;
  };
  this.getOdtDocument = function () {
    return k;
  };
  this.getEdits = function () {
    return f;
  };
  this.getSortedEdits = function () {
    return d();
  };
  this.addEdit = function (b, d) {
    f[b] = { time: d };
  };
  this.clearEdits = function () {
    f = {};
  };
  this.destroy = function (d) {
    g.parentNode && g.removeChild(b);
    d();
  };
  b = k
    .getDOMDocument()
    .createElementNS("urn:webodf:names:editinfo", "editinfo");
  g.insertBefore(b, g.firstChild);
};
gui.EditInfoMarker = function (g, k) {
  function d(b, a) {
    return runtime.setTimeout(function () {
      p.style.opacity = b;
    }, a);
  }
  var b = this,
    f,
    n,
    p,
    r,
    q,
    e;
  this.addEdit = function (b, a) {
    var c = Date.now() - a;
    g.addEdit(b, a);
    n.setEdits(g.getSortedEdits());
    p.setAttributeNS("urn:webodf:names:editinfo", "editinfo:memberid", b);
    runtime.clearTimeout(q);
    runtime.clearTimeout(e);
    1e4 > c
      ? ((r = d(1, 0)), (q = d(0.5, 1e4 - c)), (e = d(0.2, 2e4 - c)))
      : 1e4 <= c && 2e4 > c
      ? ((r = d(0.5, 0)), (e = d(0.2, 2e4 - c)))
      : (r = d(0.2, 0));
  };
  this.getEdits = function () {
    return g.getEdits();
  };
  this.clearEdits = function () {
    g.clearEdits();
    n.setEdits([]);
    p.hasAttributeNS("urn:webodf:names:editinfo", "editinfo:memberid") &&
      p.removeAttributeNS("urn:webodf:names:editinfo", "editinfo:memberid");
  };
  this.getEditInfo = function () {
    return g;
  };
  this.show = function () {
    p.style.display = "block";
  };
  this.hide = function () {
    b.hideHandle();
    p.style.display = "none";
  };
  this.showHandle = function () {
    n.show();
  };
  this.hideHandle = function () {
    n.hide();
  };
  this.destroy = function (b) {
    runtime.clearTimeout(r);
    runtime.clearTimeout(q);
    runtime.clearTimeout(e);
    f.removeChild(p);
    n.destroy(function (a) {
      a ? b(a) : g.destroy(b);
    });
  };
  (function () {
    var d = g.getOdtDocument().getDOMDocument();
    p = d.createElementNS(d.documentElement.namespaceURI, "div");
    p.setAttribute("class", "editInfoMarker");
    p.onmouseover = function () {
      b.showHandle();
    };
    p.onmouseout = function () {
      b.hideHandle();
    };
    f = g.getNode();
    f.appendChild(p);
    n = new gui.EditInfoHandle(f);
    k || b.hide();
  })();
};
gui.HyperlinkTooltipView = function (g, k) {
  var d = core.DomUtils,
    b = odf.OdfUtils,
    f = runtime.getWindow(),
    n,
    p,
    r;
  runtime.assert(
    null !== f,
    "Expected to be run in an environment which has a global window, like a browser."
  );
  this.showTooltip = function (q) {
    var e = q.target || q.srcElement,
      l = g.getSizer(),
      a = g.getZoomLevel(),
      c;
    a: {
      for (; e; ) {
        if (b.isHyperlink(e)) break a;
        if (b.isParagraph(e) || b.isInlineRoot(e)) break;
        e = e.parentNode;
      }
      e = null;
    }
    if (e) {
      d.containsNode(l, r) || l.appendChild(r);
      c = p;
      var m;
      switch (k()) {
        case gui.KeyboardHandler.Modifier.Ctrl:
          m = runtime.tr("Ctrl-click to follow link");
          break;
        case gui.KeyboardHandler.Modifier.Meta:
          m = runtime.tr("\u2318-click to follow link");
          break;
        default:
          m = "";
      }
      c.textContent = m;
      n.textContent = b.getHyperlinkTarget(e);
      r.style.display = "block";
      c = f.innerWidth - r.offsetWidth - 15;
      e = q.clientX > c ? c : q.clientX + 15;
      c = f.innerHeight - r.offsetHeight - 10;
      q = q.clientY > c ? c : q.clientY + 10;
      l = l.getBoundingClientRect();
      e = (e - l.left) / a;
      q = (q - l.top) / a;
      r.style.left = e + "px";
      r.style.top = q + "px";
    }
  };
  this.hideTooltip = function () {
    r.style.display = "none";
  };
  this.destroy = function (b) {
    r.parentNode && r.parentNode.removeChild(r);
    b();
  };
  (function () {
    var b = g.getElement().ownerDocument;
    n = b.createElement("span");
    p = b.createElement("span");
    n.className = "webodf-hyperlinkTooltipLink";
    p.className = "webodf-hyperlinkTooltipText";
    r = b.createElement("div");
    r.className = "webodf-hyperlinkTooltip";
    r.appendChild(n);
    r.appendChild(p);
    g.getElement().appendChild(r);
  })();
};
gui.OdfFieldView = function (g) {
  function k() {
    var b = odf.OdfSchema.getFields().map(function (b) {
        return b.replace(":", "|");
      }),
      d = b.join(",\n") + "\n{ background-color: #D0D0D0; }\n",
      b =
        b
          .map(function (b) {
            return b + ":empty::after";
          })
          .join(",\n") + "\n{ content:' '; white-space: pre; }\n";
    return d + "\n" + b;
  }
  var d,
    b = g.getElement().ownerDocument;
  this.showFieldHighlight = function () {
    d.appendChild(b.createTextNode(k()));
  };
  this.hideFieldHighlight = function () {
    for (var b = d.sheet, g = b.cssRules; g.length; )
      b.deleteRule(g.length - 1);
  };
  this.destroy = function (b) {
    d.parentNode && d.parentNode.removeChild(d);
    b();
  };
  d = (function () {
    var d = b.getElementsByTagName("head").item(0),
      g = b.createElement("style"),
      k = "";
    g.type = "text/css";
    g.media = "screen, print, handheld, projection";
    odf.Namespaces.forEachPrefix(function (b, d) {
      k += "@namespace " + b + " url(" + d + ");\n";
    });
    g.appendChild(b.createTextNode(k));
    d.appendChild(g);
    return g;
  })();
};
gui.ShadowCursor = function (g) {
  var k = g.getDOMDocument().createRange(),
    d = !0;
  this.removeFromDocument = function () {};
  this.getMemberId = function () {
    return gui.ShadowCursor.ShadowCursorMemberId;
  };
  this.getSelectedRange = function () {
    return k;
  };
  this.setSelectedRange = function (b, f) {
    k = b;
    d = !1 !== f;
  };
  this.hasForwardSelection = function () {
    return d;
  };
  this.getDocument = function () {
    return g;
  };
  this.getSelectionType = function () {
    return ops.OdtCursor.RangeSelection;
  };
  k.setStart(g.getRootNode(), 0);
};
gui.ShadowCursor.ShadowCursorMemberId = "";
gui.SelectionView = function (g) {};
gui.SelectionView.prototype.rerender = function () {};
gui.SelectionView.prototype.show = function () {};
gui.SelectionView.prototype.hide = function () {};
gui.SelectionView.prototype.destroy = function (g) {};
gui.SelectionViewManager = function (g) {
  function k() {
    return Object.keys(d).map(function (b) {
      return d[b];
    });
  }
  var d = {};
  this.getSelectionView = function (b) {
    return d.hasOwnProperty(b) ? d[b] : null;
  };
  this.getSelectionViews = k;
  this.removeSelectionView = function (b) {
    d.hasOwnProperty(b) && (d[b].destroy(function () {}), delete d[b]);
  };
  this.hideSelectionView = function (b) {
    d.hasOwnProperty(b) && d[b].hide();
  };
  this.showSelectionView = function (b) {
    d.hasOwnProperty(b) && d[b].show();
  };
  this.rerenderSelectionViews = function () {
    Object.keys(d).forEach(function (b) {
      d[b].rerender();
    });
  };
  this.registerCursor = function (b, f) {
    var k = b.getMemberId(),
      p = new g(b);
    f ? p.show() : p.hide();
    return (d[k] = p);
  };
  this.destroy = function (b) {
    function d(k, r) {
      r
        ? b(r)
        : k < g.length
        ? g[k].destroy(function (b) {
            d(k + 1, b);
          })
        : b();
    }
    var g = k();
    d(0, void 0);
  };
};
gui.SessionViewOptions = function () {
  this.caretBlinksOnRangeSelect =
    this.caretAvatarsInitiallyVisible =
    this.editInfoMarkersInitiallyVisible =
      !0;
};
(function () {
  function g(g, d) {
    return void 0 !== g ? Boolean(g) : d;
  }
  gui.SessionView = function (k, d, b, f, n, p) {
    function r(a) {
      a.memberId === d &&
        I.getViewport().scrollIntoView(a.annotation.getBoundingClientRect());
    }
    function q() {
      var a = document.getElementsByTagName("head").item(0),
        c = document.createElement("style");
      c.type = "text/css";
      c.media = "screen, print, handheld, projection";
      a.appendChild(c);
      return c;
    }
    function e(a, c, b) {
      function e(c, b, d) {
        b = c + '[editinfo|memberid="' + a + '"]' + d + b;
        a: {
          var f = v.firstChild;
          for (c = c + '[editinfo|memberid="' + a + '"]' + d + "{"; f; ) {
            if (f.nodeType === Node.TEXT_NODE && 0 === f.data.indexOf(c)) {
              c = f;
              break a;
            }
            f = f.nextSibling;
          }
          c = null;
        }
        c ? (c.data = b) : v.appendChild(document.createTextNode(b));
      }
      e("div.editInfoMarker", "{ background-color: " + b + "; }", "");
      e("span.editInfoColor", "{ background-color: " + b + "; }", "");
      e("span.editInfoAuthor", '{ content: "' + c + '"; }', ":before");
      e("dc|creator", "{ background-color: " + b + "; }", "");
      e(
        ".webodf-selectionOverlay",
        "{ fill: " + b + "; stroke: " + b + ";}",
        ""
      );
      a === d &&
        (e(
          ".webodf-touchEnabled .webodf-selectionOverlay",
          "{ display: block; }",
          " > .webodf-draggable"
        ),
        (a = gui.ShadowCursor.ShadowCursorMemberId),
        e(
          ".webodf-selectionOverlay",
          "{ fill: " + b + "; stroke: " + b + ";}",
          ""
        ),
        e(
          ".webodf-touchEnabled .webodf-selectionOverlay",
          "{ display: block; }",
          " > .webodf-draggable"
        ));
    }
    function l(a) {
      var c, b;
      for (b in t) t.hasOwnProperty(b) && ((c = t[b]), a ? c.show() : c.hide());
    }
    function a(a) {
      n.getCarets().forEach(function (c) {
        a ? c.showHandle() : c.hideHandle();
      });
    }
    function c(a) {
      var c = a.getMemberId();
      a = a.getProperties();
      e(c, a.fullName, a.color);
    }
    function m(a) {
      var c = a.getMemberId(),
        d = b.getOdtDocument().getMember(c).getProperties();
      n.registerCursor(a, E, N);
      p.registerCursor(a, !0);
      if ((a = n.getCaret(c)))
        a.setAvatarImageUrl(d.imageUrl), a.setColor(d.color);
      runtime.log(
        "+++ View here +++ eagerly created an Caret for '" + c + "'! +++"
      );
    }
    function h(a) {
      a = a.getMemberId();
      var c = p.getSelectionView(d),
        b = p.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),
        e = n.getCaret(d);
      a === d
        ? (b.hide(), c && c.show(), e && e.show())
        : a === gui.ShadowCursor.ShadowCursorMemberId &&
          (b.show(), c && c.hide(), e && e.hide());
    }
    function y(a) {
      p.removeSelectionView(a);
    }
    function x(a) {
      var c = a.paragraphElement,
        d = a.memberId;
      a = a.timeStamp;
      var e,
        f = "",
        h = c
          .getElementsByTagNameNS("urn:webodf:names:editinfo", "editinfo")
          .item(0);
      h
        ? ((f = h.getAttributeNS("urn:webodf:names:editinfo", "id")),
          (e = t[f]))
        : ((f = Math.random().toString()),
          (e = new ops.EditInfo(c, b.getOdtDocument())),
          (e = new gui.EditInfoMarker(e, L)),
          (h = c
            .getElementsByTagNameNS("urn:webodf:names:editinfo", "editinfo")
            .item(0)),
          h.setAttributeNS("urn:webodf:names:editinfo", "id", f),
          (t[f] = e));
      e.addEdit(d, new Date(a));
      K.trigger();
    }
    function z() {
      var a;
      u.hasChildNodes() && core.DomUtils.removeAllChildNodes(u);
      !0 ===
        f.getState(gui.CommonConstraints.EDIT.ANNOTATIONS.ONLY_DELETE_OWN) &&
        (a = b.getOdtDocument().getMember(d)) &&
        ((a = a.getProperties().fullName),
        u.appendChild(
          document.createTextNode(
            ".annotationWrapper:not([creator = '" +
              a +
              "']) .annotationRemoveButton { display: none; }"
          )
        ));
    }
    function w(a) {
      var b = Object.keys(t).map(function (a) {
        return t[a];
      });
      A.unsubscribe(ops.Document.signalMemberAdded, c);
      A.unsubscribe(ops.Document.signalMemberUpdated, c);
      A.unsubscribe(ops.Document.signalCursorAdded, m);
      A.unsubscribe(ops.Document.signalCursorRemoved, y);
      A.unsubscribe(ops.OdtDocument.signalParagraphChanged, x);
      A.unsubscribe(ops.Document.signalCursorMoved, h);
      A.unsubscribe(
        ops.OdtDocument.signalParagraphChanged,
        p.rerenderSelectionViews
      );
      A.unsubscribe(ops.OdtDocument.signalTableAdded, p.rerenderSelectionViews);
      A.unsubscribe(
        ops.OdtDocument.signalParagraphStyleModified,
        p.rerenderSelectionViews
      );
      f.unsubscribe(gui.CommonConstraints.EDIT.ANNOTATIONS.ONLY_DELETE_OWN, z);
      A.unsubscribe(ops.Document.signalMemberAdded, z);
      A.unsubscribe(ops.Document.signalMemberUpdated, z);
      v.parentNode.removeChild(v);
      u.parentNode.removeChild(u);
      (function W(c, d) {
        d
          ? a(d)
          : c < b.length
          ? b[c].destroy(function (a) {
              W(c + 1, a);
            })
          : a();
      })(0, void 0);
    }
    var v,
      u,
      t = {},
      A,
      I,
      K,
      L = g(k.editInfoMarkersInitiallyVisible, !0),
      E = g(k.caretAvatarsInitiallyVisible, !0),
      N = g(k.caretBlinksOnRangeSelect, !0);
    this.showEditInfoMarkers = function () {
      L || ((L = !0), l(L));
    };
    this.hideEditInfoMarkers = function () {
      L && ((L = !1), l(L));
    };
    this.showCaretAvatars = function () {
      E || ((E = !0), a(E));
    };
    this.hideCaretAvatars = function () {
      E && ((E = !1), a(E));
    };
    this.getSession = function () {
      return b;
    };
    this.getCaret = function (a) {
      return n.getCaret(a);
    };
    this.destroy = function (a) {
      var c = [K.destroy, w];
      A.unsubscribe(ops.OdtDocument.signalAnnotationAdded, r);
      core.Async.destroyAll(c, a);
    };
    A = b.getOdtDocument();
    I = A.getOdfCanvas();
    A.subscribe(ops.OdtDocument.signalAnnotationAdded, r);
    A.subscribe(ops.Document.signalMemberAdded, c);
    A.subscribe(ops.Document.signalMemberUpdated, c);
    A.subscribe(ops.Document.signalCursorAdded, m);
    A.subscribe(ops.Document.signalCursorRemoved, y);
    A.subscribe(ops.OdtDocument.signalParagraphChanged, x);
    A.subscribe(ops.Document.signalCursorMoved, h);
    A.subscribe(
      ops.OdtDocument.signalParagraphChanged,
      p.rerenderSelectionViews
    );
    A.subscribe(ops.OdtDocument.signalTableAdded, p.rerenderSelectionViews);
    A.subscribe(
      ops.OdtDocument.signalParagraphStyleModified,
      p.rerenderSelectionViews
    );
    f.subscribe(gui.CommonConstraints.EDIT.ANNOTATIONS.ONLY_DELETE_OWN, z);
    A.subscribe(ops.Document.signalMemberAdded, z);
    A.subscribe(ops.Document.signalMemberUpdated, z);
    v = q();
    v.appendChild(
      document.createTextNode(
        "@namespace editinfo url(urn:webodf:names:editinfo);"
      )
    );
    v.appendChild(
      document.createTextNode(
        "@namespace dc url(http://purl.org/dc/elements/1.1/);"
      )
    );
    u = q();
    z();
    K = core.Task.createRedrawTask(function () {
      var a = I.getAnnotationViewManager();
      a && (a.rehighlightAnnotations(), A.fixCursorPositions());
    });
  };
})();
gui.SvgSelectionView = function (g) {
  function k() {
    var a = c.getRootNode();
    m !== a &&
      ((m = a),
      (h = c.getCanvas().getSizer()),
      h.appendChild(x),
      x.setAttribute("class", "webodf-selectionOverlay"),
      w.setAttribute("class", "webodf-draggable"),
      v.setAttribute("class", "webodf-draggable"),
      w.setAttribute("end", "left"),
      v.setAttribute("end", "right"),
      w.setAttribute("r", 8),
      v.setAttribute("r", 8),
      x.appendChild(z),
      x.appendChild(w),
      x.appendChild(v));
  }
  function d(a) {
    a = a.getBoundingClientRect();
    return Boolean(a && 0 !== a.height);
  }
  function b(a) {
    var c = u.getTextElements(a, !0, !1),
      b = a.cloneRange(),
      e = a.cloneRange();
    a = a.cloneRange();
    if (!c.length) return null;
    var f;
    a: {
      f = 0;
      var h = c[f],
        g = b.startContainer === h ? b.startOffset : 0,
        m = g;
      b.setStart(h, g);
      for (b.setEnd(h, m); !d(b); ) {
        if (h.nodeType === Node.ELEMENT_NODE && m < h.childNodes.length)
          m = h.childNodes.length;
        else if (h.nodeType === Node.TEXT_NODE && m < h.length) m += 1;
        else if (c[f]) (h = c[f]), (f += 1), (g = m = 0);
        else {
          f = !1;
          break a;
        }
        b.setStart(h, g);
        b.setEnd(h, m);
      }
      f = !0;
    }
    if (!f) return null;
    a: {
      f = c.length - 1;
      h = c[f];
      m = g =
        e.endContainer === h
          ? e.endOffset
          : h.nodeType === Node.TEXT_NODE
          ? h.length
          : h.childNodes.length;
      e.setStart(h, g);
      for (e.setEnd(h, m); !d(e); ) {
        if (h.nodeType === Node.ELEMENT_NODE && 0 < g) g = 0;
        else if (h.nodeType === Node.TEXT_NODE && 0 < g) --g;
        else if (c[f])
          (h = c[f]), --f, (g = m = h.length || h.childNodes.length);
        else {
          c = !1;
          break a;
        }
        e.setStart(h, g);
        e.setEnd(h, m);
      }
      c = !0;
    }
    if (!c) return null;
    a.setStart(b.startContainer, b.startOffset);
    a.setEnd(e.endContainer, e.endOffset);
    return { firstRange: b, lastRange: e, fillerRange: a };
  }
  function f(a, c) {
    var b = {};
    b.top = Math.min(a.top, c.top);
    b.left = Math.min(a.left, c.left);
    b.right = Math.max(a.right, c.right);
    b.bottom = Math.max(a.bottom, c.bottom);
    b.width = b.right - b.left;
    b.height = b.bottom - b.top;
    return b;
  }
  function n(a, c) {
    c && 0 < c.width && 0 < c.height && (a = a ? f(a, c) : c);
    return a;
  }
  function p(a) {
    function b(a) {
      K.setUnfilteredPosition(a, 0);
      return v.acceptNode(a) === L && x.acceptPosition(K) === L ? L : E;
    }
    function d(a) {
      var c = null;
      b(a) === L && (c = t.getBoundingClientRect(a));
      return c;
    }
    var e = a.commonAncestorContainer,
      f = a.startContainer,
      h = a.endContainer,
      g = a.startOffset,
      m = a.endOffset,
      k,
      l,
      p = null,
      r,
      q = y.createRange(),
      x,
      v = new odf.OdfNodeFilter(),
      w;
    if (f === e || h === e)
      return (
        (q = a.cloneRange()), (p = q.getBoundingClientRect()), q.detach(), p
      );
    for (a = f; a.parentNode !== e; ) a = a.parentNode;
    for (l = h; l.parentNode !== e; ) l = l.parentNode;
    x = c.createRootFilter(f);
    for (e = a.nextSibling; e && e !== l; )
      (r = d(e)), (p = n(p, r)), (e = e.nextSibling);
    if (u.isParagraph(a)) p = n(p, t.getBoundingClientRect(a));
    else if (a.nodeType === Node.TEXT_NODE)
      (e = a),
        q.setStart(e, g),
        q.setEnd(e, e === l ? m : e.length),
        (r = q.getBoundingClientRect()),
        (p = n(p, r));
    else
      for (
        w = y.createTreeWalker(a, NodeFilter.SHOW_TEXT, b, !1),
          e = w.currentNode = f;
        e && e !== h;

      )
        q.setStart(e, g),
          q.setEnd(e, e.length),
          (r = q.getBoundingClientRect()),
          (p = n(p, r)),
          (k = e),
          (g = 0),
          (e = w.nextNode());
    k || (k = f);
    if (u.isParagraph(l)) p = n(p, t.getBoundingClientRect(l));
    else if (l.nodeType === Node.TEXT_NODE)
      (e = l),
        q.setStart(e, e === a ? g : 0),
        q.setEnd(e, m),
        (r = q.getBoundingClientRect()),
        (p = n(p, r));
    else
      for (
        w = y.createTreeWalker(l, NodeFilter.SHOW_TEXT, b, !1),
          e = w.currentNode = h;
        e && e !== k;

      )
        if (
          (q.setStart(e, 0),
          q.setEnd(e, m),
          (r = q.getBoundingClientRect()),
          (p = n(p, r)),
          (e = w.previousNode()))
        )
          m = e.length;
    return p;
  }
  function r(a, c) {
    var b = a.getBoundingClientRect(),
      d = { width: 0 };
    d.top = b.top;
    d.bottom = b.bottom;
    d.height = b.height;
    d.left = d.right = c ? b.right : b.left;
    return d;
  }
  function q() {
    var a = g.getSelectedRange(),
      c;
    if (
      (c =
        I &&
        g.getSelectionType() === ops.OdtCursor.RangeSelection &&
        !a.collapsed)
    ) {
      k();
      var d = t.getBoundingClientRect(h),
        e = A.getZoomLevel(),
        a = b(a),
        m,
        l,
        n,
        q,
        y,
        u;
      if (a) {
        c = a.firstRange;
        m = a.lastRange;
        l = a.fillerRange;
        n = t.translateRect(r(c, !1), d, e);
        y = t.translateRect(r(m, !0), d, e);
        q = (q = p(l)) ? t.translateRect(q, d, e) : f(n, y);
        u = q.left;
        q = n.left + Math.max(0, q.width - (n.left - q.left));
        d = Math.min(n.top, y.top);
        e = y.top + y.height;
        u = [
          { x: n.left, y: d + n.height },
          { x: n.left, y: d },
          { x: q, y: d },
          { x: q, y: e - y.height },
          { x: y.right, y: e - y.height },
          { x: y.right, y: e },
          { x: u, y: e },
          { x: u, y: d + n.height },
          { x: n.left, y: d + n.height },
        ];
        q = "";
        var E;
        for (E = 0; E < u.length; E += 1) q += u[E].x + "," + u[E].y + " ";
        z.setAttribute("points", q);
        w.setAttribute("cx", n.left);
        w.setAttribute("cy", d + n.height / 2);
        v.setAttribute("cx", y.right);
        v.setAttribute("cy", e - y.height / 2);
        c.detach();
        m.detach();
        l.detach();
      }
      c = Boolean(a);
    }
    x.style.display = c ? "block" : "none";
  }
  function e(a) {
    I && a === g && N.trigger();
  }
  function l(a) {
    a = 8 / a;
    w.setAttribute("r", a);
    v.setAttribute("r", a);
  }
  function a(a) {
    h.removeChild(x);
    h.classList.remove("webodf-virtualSelections");
    g.getDocument().unsubscribe(ops.Document.signalCursorMoved, e);
    A.unsubscribe(gui.ZoomHelper.signalZoomChanged, l);
    a();
  }
  var c = g.getDocument(),
    m,
    h,
    y = c.getDOMDocument(),
    x = y.createElementNS("http://www.w3.org/2000/svg", "svg"),
    z = y.createElementNS("http://www.w3.org/2000/svg", "polygon"),
    w = y.createElementNS("http://www.w3.org/2000/svg", "circle"),
    v = y.createElementNS("http://www.w3.org/2000/svg", "circle"),
    u = odf.OdfUtils,
    t = core.DomUtils,
    A = c.getCanvas().getZoomHelper(),
    I = !0,
    K = g.getDocument().createPositionIterator(c.getRootNode()),
    L = NodeFilter.FILTER_ACCEPT,
    E = NodeFilter.FILTER_REJECT,
    N;
  this.rerender = function () {
    I && N.trigger();
  };
  this.show = function () {
    I = !0;
    N.trigger();
  };
  this.hide = function () {
    I = !1;
    N.trigger();
  };
  this.destroy = function (c) {
    core.Async.destroyAll([N.destroy, a], c);
  };
  (function () {
    var a = g.getMemberId();
    N = core.Task.createRedrawTask(q);
    k();
    x.setAttributeNS("urn:webodf:names:editinfo", "editinfo:memberid", a);
    h.classList.add("webodf-virtualSelections");
    g.getDocument().subscribe(ops.Document.signalCursorMoved, e);
    A.subscribe(gui.ZoomHelper.signalZoomChanged, l);
    l(A.getZoomLevel());
  })();
};
gui.UndoStateRules = function () {
  function g(b, d) {
    var g = b.length;
    this.previous = function () {
      for (--g; 0 <= g; --g) if (d(b[g])) return b[g];
      return null;
    };
  }
  function k(b) {
    b = b.spec();
    var d;
    b.hasOwnProperty("position") && (d = b.position);
    return d;
  }
  function d(b) {
    return b.isEdit;
  }
  function b(b, d, g) {
    if (!g) return (g = k(b) - k(d)), 0 === g || 1 === Math.abs(g);
    b = k(b);
    d = k(d);
    g = k(g);
    return b - d === d - g;
  }
  this.isEditOperation = d;
  this.isPartOfOperationSet = function (f, k) {
    var p = void 0 !== f.group,
      r;
    if (!f.isEdit || 0 === k.length) return !0;
    r = k[k.length - 1];
    if (p && f.group === r.group) return !0;
    a: switch (f.spec().optype) {
      case "RemoveText":
      case "InsertText":
        r = !0;
        break a;
      default:
        r = !1;
    }
    if (r && k.some(d)) {
      if (p) {
        var q;
        p = f.spec().optype;
        r = new g(k, d);
        var e = r.previous(),
          l = null,
          a,
          c;
        runtime.assert(Boolean(e), "No edit operations found in state");
        c = e.group;
        runtime.assert(void 0 !== c, "Operation has no group");
        for (a = 1; e && e.group === c; ) {
          if (p === e.spec().optype) {
            q = e;
            break;
          }
          e = r.previous();
        }
        if (q) {
          for (e = r.previous(); e; ) {
            if (e.group !== c) {
              if (2 === a) break;
              c = e.group;
              a += 1;
            }
            if (p === e.spec().optype) {
              l = e;
              break;
            }
            e = r.previous();
          }
          q = b(f, q, l);
        } else q = !1;
        return q;
      }
      q = f.spec().optype;
      p = new g(k, d);
      r = p.previous();
      runtime.assert(Boolean(r), "No edit operations found in state");
      q = q === r.spec().optype ? b(f, r, p.previous()) : !1;
      return q;
    }
    return !1;
  };
};
(function () {
  function g(b, d) {
    this.mainId = void 0 !== b ? b : -1;
    this.subId = void 0 !== d ? d : -1;
  }
  function k(b, f, k) {
    function p(d, a) {
      return d + (b.isEditOperation(a) ? 1 : 0);
    }
    var r, q, e;
    this.addOperation = function (d) {
      b.isEditOperation(d) && (e += 1);
      q.push(d);
    };
    this.isNextStateId = function (b) {
      return b.mainId === r && b.subId === e;
    };
    this.getNextStateId = function () {
      return new g(r, e);
    };
    this.getOperations = function () {
      return q;
    };
    r = d += 1;
    q = f || [];
    e = f && k ? f.reduce(p, 0) : 0;
  }
  var d = 0;
  gui.TrivialUndoManager = function (b) {
    function d() {
      return !0 !== u.isNextStateId(v);
    }
    function n(a) {
      a = a.getOperations();
      0 < a.length && ((L = !0), z(a), (L = !1));
    }
    function p() {
      I.emit(gui.UndoManager.signalUndoStackChanged, {
        undoAvailable: m.hasUndoStates(),
        redoAvailable: m.hasRedoStates(),
      });
    }
    function r(a) {
      var c = d();
      a !== c && I.emit(gui.UndoManager.signalDocumentModifiedChanged, c);
    }
    function q() {
      u !== x && u !== t[t.length - 1] && t.push(u);
    }
    function e(a) {
      var c = a.previousSibling || a.nextSibling;
      a.parentNode.removeChild(a);
      h.normalizeTextNodes(c);
    }
    function l(a) {
      return Object.keys(a).map(function (c) {
        return a[c];
      });
    }
    function a(a) {
      function c(a) {
        var h = a.spec();
        if (e[h.memberid])
          switch (h.optype) {
            case "AddCursor":
              b[h.memberid] || ((b[h.memberid] = a), delete e[h.memberid], --f);
              break;
            case "MoveCursor":
              d[h.memberid] || (d[h.memberid] = a);
          }
      }
      var b = {},
        d = {},
        e = {},
        f,
        h;
      h = a.pop();
      w.getMemberIds().forEach(function (a) {
        e[a] = !0;
      });
      for (f = Object.keys(e).length; h && 0 < f; )
        (h = h.getOperations()), h.reverse(), h.forEach(c), (h = a.pop());
      return new k(K, l(b).concat(l(d)));
    }
    function c() {
      var c = d(),
        b = (y = w.cloneDocumentElement());
      h.getElementsByTagNameNS(b, "urn:webodf:names:cursor", "cursor").forEach(
        e
      );
      h.getElementsByTagNameNS(b, "urn:webodf:names:cursor", "anchor").forEach(
        e
      );
      q();
      u = x = a([x].concat(t));
      t.length = 0;
      A.length = 0;
      c || (v = u.getNextStateId());
      p();
      r(c);
    }
    var m = this,
      h = core.DomUtils,
      y,
      x,
      z,
      w,
      v,
      u,
      t = [],
      A = [],
      I = new core.EventNotifier([
        gui.UndoManager.signalUndoStackChanged,
        gui.UndoManager.signalUndoStateCreated,
        gui.UndoManager.signalUndoStateModified,
        gui.UndoManager.signalDocumentModifiedChanged,
        gui.TrivialUndoManager.signalDocumentRootReplaced,
      ]),
      K = b || new gui.UndoStateRules(),
      L = !1;
    this.subscribe = function (a, c) {
      I.subscribe(a, c);
    };
    this.unsubscribe = function (a, c) {
      I.unsubscribe(a, c);
    };
    this.isDocumentModified = d;
    this.setDocumentModified = function (a) {
      d() !== a &&
        ((v = a ? new g() : u.getNextStateId()),
        I.emit(gui.UndoManager.signalDocumentModifiedChanged, a));
    };
    this.hasUndoStates = function () {
      return 0 < t.length;
    };
    this.hasRedoStates = function () {
      return 0 < A.length;
    };
    this.setDocument = function (a) {
      w = a;
    };
    this.purgeInitialState = function () {
      var a = d();
      t.length = 0;
      A.length = 0;
      u = x = new k(K);
      v = u.getNextStateId();
      y = null;
      p();
      r(a);
    };
    this.setInitialState = c;
    this.initialize = function () {
      y || c();
    };
    this.setPlaybackFunction = function (a) {
      z = a;
    };
    this.onOperationExecuted = function (a) {
      if (!L) {
        var c = d();
        (K.isEditOperation(a) && (u === x || 0 < A.length)) ||
        !K.isPartOfOperationSet(a, u.getOperations())
          ? ((A.length = 0),
            q(),
            (u = new k(K, [a], !0)),
            t.push(u),
            I.emit(gui.UndoManager.signalUndoStateCreated, {
              operations: u.getOperations(),
            }),
            p())
          : (u.addOperation(a),
            I.emit(gui.UndoManager.signalUndoStateModified, {
              operations: u.getOperations(),
            }));
        r(c);
      }
    };
    this.moveForward = function (a) {
      for (var c = 0, b = d(), e; a && A.length; )
        (e = A.pop()), t.push(e), n(e), --a, (c += 1);
      c && ((u = t[t.length - 1]), p(), r(b));
      return c;
    };
    this.moveBackward = function (a) {
      for (var c = 0, b = d(); a && t.length; ) A.push(t.pop()), --a, (c += 1);
      c &&
        (w.getMemberIds().forEach(function (a) {
          w.hasCursor(a) && w.removeCursor(a);
        }),
        w.setDocumentElement(y.cloneNode(!0)),
        I.emit(gui.TrivialUndoManager.signalDocumentRootReplaced, {}),
        n(x),
        t.forEach(n),
        (u = t[t.length - 1] || x),
        p(),
        r(b));
      return c;
    };
    u = x = new k(K);
    v = u.getNextStateId();
  };
  gui.TrivialUndoManager.signalDocumentRootReplaced = "documentRootReplaced";
})();
odf.GraphicProperties = function (g, k, d) {
  var b = this,
    f = odf.Namespaces.stylens,
    n = odf.Namespaces.svgns;
  this.verticalPos = function () {
    return b.data.value("verticalPos");
  };
  this.verticalRel = function () {
    return b.data.value("verticalRel");
  };
  this.horizontalPos = function () {
    return b.data.value("horizontalPos");
  };
  this.horizontalRel = function () {
    return b.data.value("horizontalRel");
  };
  this.strokeWidth = function () {
    return b.data.value("strokeWidth");
  };
  b.data = new odf.LazyStyleProperties(void 0 === d ? void 0 : d.data, {
    verticalPos: function () {
      var b = g.getAttributeNS(f, "vertical-pos");
      return "" === b ? void 0 : b;
    },
    verticalRel: function () {
      var b = g.getAttributeNS(f, "vertical-rel");
      return "" === b ? void 0 : b;
    },
    horizontalPos: function () {
      var b = g.getAttributeNS(f, "horizontal-pos");
      return "" === b ? void 0 : b;
    },
    horizontalRel: function () {
      var b = g.getAttributeNS(f, "horizontal-rel");
      return "" === b ? void 0 : b;
    },
    strokeWidth: function () {
      var b = g.getAttributeNS(n, "stroke-width");
      return k.parseLength(b);
    },
  });
};
odf.ComputedGraphicProperties = function () {
  var g;
  this.setGraphicProperties = function (k) {
    g = k;
  };
  this.verticalPos = function () {
    return (g && g.verticalPos()) || "from-top";
  };
  this.verticalRel = function () {
    return (g && g.verticalRel()) || "page";
  };
  this.horizontalPos = function () {
    return (g && g.horizontalPos()) || "from-left";
  };
  this.horizontalRel = function () {
    return (g && g.horizontalRel()) || "page";
  };
};
odf.PageLayoutProperties = function (g, k, d) {
  var b = this,
    f = odf.Namespaces.fons;
  this.pageHeight = function () {
    return b.data.value("pageHeight") || 1123;
  };
  this.pageWidth = function () {
    return b.data.value("pageWidth") || 794;
  };
  b.data = new odf.LazyStyleProperties(void 0 === d ? void 0 : d.data, {
    pageHeight: function () {
      var b;
      g && ((b = g.getAttributeNS(f, "page-height")), (b = k.parseLength(b)));
      return b;
    },
    pageWidth: function () {
      var b;
      g && ((b = g.getAttributeNS(f, "page-width")), (b = k.parseLength(b)));
      return b;
    },
  });
};
odf.PageLayout = function (g, k, d) {
  var b = null;
  g && (b = k.getPropertiesElement("page-layout-properties", g));
  this.pageLayout = new odf.PageLayoutProperties(b, k, d && d.pageLayout);
};
odf.PageLayoutCache = function () {};
odf.PageLayoutCache.prototype.getPageLayout = function (g) {};
odf.PageLayoutCache.prototype.getDefaultPageLayout = function () {};
odf.ParagraphProperties = function (g, k, d) {
  var b = this,
    f = odf.Namespaces.fons;
  this.marginTop = function () {
    return b.data.value("marginTop");
  };
  b.data = new odf.LazyStyleProperties(void 0 === d ? void 0 : d.data, {
    marginTop: function () {
      var b = g.getAttributeNS(f, "margin-top");
      return k.parsePositiveLengthOrPercent(b, "marginTop", d && d.data);
    },
  });
};
odf.ComputedParagraphProperties = function () {
  var g = {},
    k = [];
  this.setStyleChain = function (d) {
    k = d;
    g = {};
  };
  this.marginTop = function () {
    var d, b;
    if (g.hasOwnProperty("marginTop")) d = g.marginTop;
    else {
      for (b = 0; void 0 === d && b < k.length; b += 1) d = k[b].marginTop();
      g.marginTop = d;
    }
    return d || 0;
  };
};
odf.TextProperties = function (g, k, d) {
  var b = this,
    f = odf.Namespaces.fons;
  this.fontSize = function () {
    return b.data.value("fontSize");
  };
  b.data = new odf.LazyStyleProperties(void 0 === d ? void 0 : d.data, {
    fontSize: function () {
      var b = g.getAttributeNS(f, "font-size");
      return k.parsePositiveLengthOrPercent(b, "fontSize", d && d.data);
    },
  });
};
odf.ComputedTextProperties = function () {
  var g = {},
    k = [];
  this.setStyleChain = function (d) {
    k = d;
    g = {};
  };
  this.fontSize = function () {
    var d, b;
    if (g.hasOwnProperty("fontSize")) d = g.fontSize;
    else {
      for (b = 0; void 0 === d && b < k.length; b += 1) d = k[b].fontSize();
      g.fontSize = d;
    }
    return d || 12;
  };
};
odf.MasterPage = function (g, k) {
  var d;
  g
    ? ((d = g.getAttributeNS(odf.Namespaces.stylens, "page-layout-name")),
      (this.pageLayout = k.getPageLayout(d)))
    : (this.pageLayout = k.getDefaultPageLayout());
};
odf.MasterPageCache = function () {};
odf.MasterPageCache.prototype.getMasterPage = function (g) {};
odf.StylePileEntry = function (g, k, d, b) {
  this.masterPage = function () {
    var b = g.getAttributeNS(odf.Namespaces.stylens, "master-page-name"),
      k = null;
    b && (k = d.getMasterPage(b));
    return k;
  };
  (function (d) {
    var n = g.getAttributeNS(odf.Namespaces.stylens, "family"),
      p = null;
    if ("graphic" === n || "chart" === n)
      (d.graphic = void 0 === b ? void 0 : b.graphic),
        (p = k.getPropertiesElement("graphic-properties", g, p)),
        null !== p && (d.graphic = new odf.GraphicProperties(p, k, d.graphic));
    if (
      "paragraph" === n ||
      "table-cell" === n ||
      "graphic" === n ||
      "presentation" === n ||
      "chart" === n
    )
      (d.paragraph = void 0 === b ? void 0 : b.paragraph),
        (p = k.getPropertiesElement("paragraph-properties", g, p)),
        null !== p &&
          (d.paragraph = new odf.ParagraphProperties(p, k, d.paragraph));
    if (
      "text" === n ||
      "paragraph" === n ||
      "table-cell" === n ||
      "graphic" === n ||
      "presentation" === n ||
      "chart" === n
    )
      (d.text = void 0 === b ? void 0 : b.text),
        (p = k.getPropertiesElement("text-properties", g, p)),
        null !== p && (d.text = new odf.TextProperties(p, k, d.text));
  })(this);
};
odf.StylePile = function (g, k) {
  function d(d, a) {
    var c, f;
    d.hasAttributeNS(b, "parent-style-name") &&
      ((f = d.getAttributeNS(b, "parent-style-name")),
      -1 === a.indexOf(f) && (c = e(f, a)));
    return new odf.StylePileEntry(d, g, k, c);
  }
  var b = odf.Namespaces.stylens,
    f = {},
    n = {},
    p,
    r = {},
    q = {},
    e;
  e = function (b, a) {
    var c = r[b],
      e;
    !c && (e = f[b]) && (a.push(b), (c = d(e, a)), (r[b] = c));
    return c;
  };
  this.getStyle = function (b) {
    var a = q[b] || r[b],
      c,
      e = [];
    a || ((c = n[b]), c || ((c = f[b]) && e.push(b)), c && (a = d(c, e)));
    return a;
  };
  this.addCommonStyle = function (d) {
    var a;
    d.hasAttributeNS(b, "name") &&
      ((a = d.getAttributeNS(b, "name")), f.hasOwnProperty(a) || (f[a] = d));
  };
  this.addAutomaticStyle = function (d) {
    var a;
    d.hasAttributeNS(b, "name") &&
      ((a = d.getAttributeNS(b, "name")), n.hasOwnProperty(a) || (n[a] = d));
  };
  this.setDefaultStyle = function (b) {
    void 0 === p && (p = d(b, []));
  };
  this.getDefaultStyle = function () {
    return p;
  };
};
odf.ComputedGraphicStyle = function () {
  this.text = new odf.ComputedTextProperties();
  this.paragraph = new odf.ComputedParagraphProperties();
  this.graphic = new odf.ComputedGraphicProperties();
};
odf.ComputedParagraphStyle = function () {
  this.text = new odf.ComputedTextProperties();
  this.paragraph = new odf.ComputedParagraphProperties();
};
odf.ComputedTextStyle = function () {
  this.text = new odf.ComputedTextProperties();
};
odf.StyleCache = function (g) {
  function k(a, c, b, d) {
    c = b.getAttributeNS(c, "class-names");
    var e;
    if (c)
      for (c = c.split(" "), e = 0; e < c.length; e += 1)
        if ((b = c[e])) d.push(a), d.push(b);
  }
  function d(a, c) {
    var b = x.getStyleName("paragraph", a);
    void 0 !== b && (c.push("paragraph"), c.push(b));
    a.namespaceURI !== h ||
      ("h" !== a.localName && "p" !== a.localName) ||
      k("paragraph", h, a, c);
    return c;
  }
  function b(a, c, b) {
    var d = [],
      e,
      h,
      f,
      g;
    for (e = 0; e < a.length; e += 2)
      (f = a[e]),
        (g = a[e + 1]),
        (f = r[f]),
        (g = f.getStyle(g)),
        void 0 !== g &&
          ((g = g[c]), void 0 !== g && g !== h && (d.push(g), (h = g)));
    f = r[b];
    if ((g = f.getDefaultStyle()))
      (g = g[c]), void 0 !== g && g !== h && d.push(g);
    return d;
  }
  function f(a, c) {
    var b = x.getStyleName("text", a),
      e = a.parentNode;
    void 0 !== b && (c.push("text"), c.push(b));
    "span" === a.localName && a.namespaceURI === h && k("text", h, a, c);
    if (!e || e === g) return c;
    e.namespaceURI !== h || ("p" !== e.localName && "h" !== e.localName)
      ? f(e, c)
      : d(e, c);
    return c;
  }
  function n(a) {
    a = a.getAttributeNS(y, "family");
    return r[a];
  }
  var p = this,
    r,
    q,
    e,
    l,
    a,
    c,
    m,
    h = odf.Namespaces.textns,
    y = odf.Namespaces.stylens,
    x = new odf.StyleInfo(),
    z = new odf.StyleParseUtils(),
    w,
    v,
    u,
    t,
    A,
    I;
  this.getComputedGraphicStyle = function (a) {
    var c = [];
    a = x.getStyleName("graphic", a);
    void 0 !== a && (c.push("graphic"), c.push(a));
    a = c.join("/");
    var d = l[a];
    runtime.assert(0 === c.length % 2, "Invalid style chain.");
    void 0 === d &&
      ((d = new odf.ComputedGraphicStyle()),
      d.graphic.setGraphicProperties(b(c, "graphic", "graphic")[0]),
      d.text.setStyleChain(b(c, "text", "graphic")),
      d.paragraph.setStyleChain(b(c, "paragraph", "graphic")),
      (l[a] = d));
    return d;
  };
  this.getComputedParagraphStyle = function (a) {
    a = d(a, []);
    var c = a.join("/"),
      f = e[c];
    runtime.assert(0 === a.length % 2, "Invalid style chain.");
    void 0 === f &&
      ((f = new odf.ComputedParagraphStyle()),
      f.text.setStyleChain(b(a, "text", "paragraph")),
      f.paragraph.setStyleChain(b(a, "paragraph", "paragraph")),
      (e[c] = f));
    return f;
  };
  this.getComputedTextStyle = function (a) {
    a = f(a, []);
    var c = a.join("/"),
      d = q[c];
    runtime.assert(0 === a.length % 2, "Invalid style chain.");
    void 0 === d &&
      ((d = new odf.ComputedTextStyle()),
      d.text.setStyleChain(b(a, "text", "text")),
      (q[c] = d));
    return d;
  };
  this.getPageLayout = function (a) {
    var c = I[a];
    c ||
      ((c = A[a]) ? ((c = new odf.PageLayout(c, z, t)), (I[a] = c)) : (c = t));
    return c;
  };
  this.getDefaultPageLayout = function () {
    return t;
  };
  this.getMasterPage = function (a) {
    var c = v[a];
    void 0 === c &&
      ((c = w[a]) ? ((c = new odf.MasterPage(c, p)), (v[a] = c)) : (c = null));
    return c;
  };
  this.getDefaultMasterPage = function () {
    return u;
  };
  this.update = function () {
    var b,
      d,
      f = null,
      h = null;
    q = {};
    e = {};
    l = {};
    w = {};
    v = {};
    I = {};
    A = {};
    a = new odf.StylePile(z, p);
    c = new odf.StylePile(z, p);
    m = new odf.StylePile(z, p);
    r = { text: a, paragraph: c, graphic: m };
    for (b = g.styles.firstElementChild; b; )
      b.namespaceURI === y &&
        ((d = n(b))
          ? "style" === b.localName
            ? d.addCommonStyle(b)
            : "default-style" === b.localName && d.setDefaultStyle(b)
          : "default-page-layout" === b.localName && (f = b)),
        (b = b.nextElementSibling);
    t = new odf.PageLayout(f, z);
    for (b = g.automaticStyles.firstElementChild; b; )
      b.namespaceURI === y &&
        ((d = n(b)) && "style" === b.localName
          ? d.addAutomaticStyle(b)
          : "page-layout" === b.localName &&
            (A[b.getAttributeNS(y, "name")] = b)),
        (b = b.nextElementSibling);
    for (b = g.masterStyles.firstElementChild; b; )
      b.namespaceURI === y &&
        "master-page" === b.localName &&
        ((h = h || b),
        (d = b),
        (f = d.getAttributeNS(y, "name")),
        0 < f.length && !w.hasOwnProperty(f) && (w[f] = d)),
        (b = b.nextElementSibling);
    u = new odf.MasterPage(h, p);
  };
};
ops.OperationTransformMatrix = function () {
  function g(a) {
    a.position += a.length;
    a.length *= -1;
  }
  function k(a) {
    var c = 0 > a.length;
    c && g(a);
    return c;
  }
  function d(a, c) {
    function b(e) {
      a[e] === c && d.push(e);
    }
    var d = [];
    a && ["style:parent-style-name", "style:next-style-name"].forEach(b);
    return d;
  }
  function b(a, c) {
    function b(d) {
      a[d] === c && delete a[d];
    }
    a && ["style:parent-style-name", "style:next-style-name"].forEach(b);
  }
  function f(a) {
    var c = {};
    Object.keys(a).forEach(function (b) {
      c[b] = "object" === typeof a[b] ? f(a[b]) : a[b];
    });
    return c;
  }
  function n(a, c, b, d) {
    var e,
      f = !1,
      g = !1,
      k,
      l = [];
    d && d.attributes && (l = d.attributes.split(","));
    a &&
      (b || 0 < l.length) &&
      Object.keys(a).forEach(function (c) {
        var d = a[c],
          e;
        "object" !== typeof d &&
          (b && (e = b[c]),
          void 0 !== e
            ? (delete a[c], (g = !0), e === d && (delete b[c], (f = !0)))
            : -1 !== l.indexOf(c) && (delete a[c], (g = !0)));
      });
    if (c && c.attributes && (b || 0 < l.length)) {
      k = c.attributes.split(",");
      for (d = 0; d < k.length; d += 1)
        if (((e = k[d]), (b && void 0 !== b[e]) || (l && -1 !== l.indexOf(e))))
          k.splice(d, 1), --d, (g = !0);
      0 < k.length ? (c.attributes = k.join(",")) : delete c.attributes;
    }
    return { majorChanged: f, minorChanged: g };
  }
  function p(a) {
    for (var c in a) if (a.hasOwnProperty(c)) return !0;
    return !1;
  }
  function r(a) {
    for (var c in a)
      if (
        a.hasOwnProperty(c) &&
        ("attributes" !== c || 0 < a.attributes.length)
      )
        return !0;
    return !1;
  }
  function q(a, c, b, d, e) {
    var f = a ? a[e] : null,
      g = c ? c[e] : null,
      k = b ? b[e] : null,
      l = d ? d[e] : null,
      q;
    q = n(f, g, k, l);
    f && !p(f) && delete a[e];
    g && !r(g) && delete c[e];
    k && !p(k) && delete b[e];
    l && !r(l) && delete d[e];
    return q;
  }
  function e(a, c) {
    return { opSpecsA: [a], opSpecsB: [c] };
  }
  var l;
  l = {
    AddAnnotation: {
      AddAnnotation: function (a, c, b) {
        var d;
        a.position < c.position
          ? ((d = a), (b = c))
          : c.position < a.position
          ? ((d = c), (b = a))
          : ((d = b ? a : c), (b = b ? c : a));
        b.position < d.position + d.length && (d.length += 2);
        b.position += 2;
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      AddCursor: e,
      AddMember: e,
      AddStyle: e,
      ApplyDirectStyling: function (a, c) {
        a.position <= c.position
          ? (c.position += 2)
          : a.position <= c.position + c.length && (c.length += 2);
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      InsertText: function (a, c) {
        c.position <= a.position
          ? (a.position += c.text.length)
          : (void 0 !== a.length &&
              c.position <= a.position + a.length &&
              (a.length += c.text.length),
            (c.position += 2));
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      MergeParagraph: function (a, c) {
        c.sourceStartPosition <= a.position
          ? --a.position
          : (void 0 !== a.length &&
              c.sourceStartPosition <= a.position + a.length &&
              --a.length,
            (c.sourceStartPosition += 2),
            a.position < c.destinationStartPosition &&
              (c.destinationStartPosition += 2));
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      MoveCursor: function (a, c) {
        var b = k(c);
        a.position < c.position
          ? (c.position += 2)
          : a.position < c.position + c.length && (c.length += 2);
        b && g(c);
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      RemoveAnnotation: function (a, c) {
        a.position < c.position
          ? (c.position < a.position + a.length && (a.length -= c.length + 2),
            (c.position += 2))
          : (a.position -= c.length + 2);
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      RemoveCursor: e,
      RemoveMember: e,
      RemoveStyle: e,
      RemoveText: function (a, c) {
        var b = c.position,
          d = c.position + c.length,
          e,
          f = [a],
          g = [c];
        a.position <= c.position
          ? (c.position += 2)
          : a.position < d &&
            ((c.length = a.position - c.position),
            (e = {
              optype: "RemoveText",
              memberid: c.memberid,
              timestamp: c.timestamp,
              position: a.position + 2,
              length: d - a.position,
            }),
            g.unshift(e));
        c.position + c.length <= a.position
          ? ((a.position -= c.length),
            void 0 !== a.length &&
              e &&
              (a.length = e.length >= a.length ? 0 : a.length - e.length))
          : void 0 !== a.length &&
            ((e = a.position + a.length),
            d <= e
              ? (a.length -= c.length)
              : b < e && (a.length = b - a.position));
        return { opSpecsA: f, opSpecsB: g };
      },
      SetParagraphStyle: function (a, c) {
        a.position < c.position && (c.position += 2);
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      SplitParagraph: function (a, c) {
        a.position < c.sourceParagraphPosition &&
          (c.sourceParagraphPosition += 2);
        c.position <= a.position
          ? (a.position += 1)
          : (void 0 !== a.length &&
              c.position <= a.position + a.length &&
              (a.length += 1),
            (c.position += 2));
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    AddCursor: {
      AddCursor: e,
      AddMember: e,
      AddStyle: e,
      ApplyDirectStyling: e,
      InsertText: e,
      MergeParagraph: e,
      MoveCursor: e,
      RemoveAnnotation: e,
      RemoveCursor: e,
      RemoveMember: e,
      RemoveStyle: e,
      RemoveText: e,
      SetParagraphStyle: e,
      SplitParagraph: e,
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    AddMember: {
      AddStyle: e,
      ApplyDirectStyling: e,
      InsertText: e,
      MergeParagraph: e,
      MoveCursor: e,
      RemoveAnnotation: e,
      RemoveCursor: e,
      RemoveStyle: e,
      RemoveText: e,
      SetParagraphStyle: e,
      SplitParagraph: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    AddStyle: {
      AddStyle: e,
      ApplyDirectStyling: e,
      InsertText: e,
      MergeParagraph: e,
      MoveCursor: e,
      RemoveAnnotation: e,
      RemoveCursor: e,
      RemoveMember: e,
      RemoveStyle: function (a, c) {
        var e,
          f = [a],
          g = [c];
        a.styleFamily === c.styleFamily &&
          ((e = d(a.setProperties, c.styleName)),
          0 < e.length &&
            ((e = {
              optype: "UpdateParagraphStyle",
              memberid: c.memberid,
              timestamp: c.timestamp,
              styleName: a.styleName,
              removedProperties: { attributes: e.join(",") },
            }),
            g.unshift(e)),
          b(a.setProperties, c.styleName));
        return { opSpecsA: f, opSpecsB: g };
      },
      RemoveText: e,
      SetParagraphStyle: e,
      SplitParagraph: e,
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    ApplyDirectStyling: {
      ApplyDirectStyling: function (a, c, b) {
        var d, e, g, k, l, n, r, t;
        k = [a];
        g = [c];
        if (
          !(
            a.position + a.length <= c.position ||
            a.position >= c.position + c.length
          )
        ) {
          d = b ? a : c;
          e = b ? c : a;
          if (a.position !== c.position || a.length !== c.length)
            (n = f(d)), (r = f(e));
          c = q(
            e.setProperties,
            null,
            d.setProperties,
            null,
            "style:text-properties"
          );
          if (c.majorChanged || c.minorChanged)
            (g = []),
              (a = []),
              (k = d.position + d.length),
              (l = e.position + e.length),
              e.position < d.position
                ? c.minorChanged &&
                  ((t = f(r)),
                  (t.length = d.position - e.position),
                  a.push(t),
                  (e.position = d.position),
                  (e.length = l - e.position))
                : d.position < e.position &&
                  c.majorChanged &&
                  ((t = f(n)),
                  (t.length = e.position - d.position),
                  g.push(t),
                  (d.position = e.position),
                  (d.length = k - d.position)),
              l > k
                ? c.minorChanged &&
                  ((n = r),
                  (n.position = k),
                  (n.length = l - k),
                  a.push(n),
                  (e.length = k - e.position))
                : k > l &&
                  c.majorChanged &&
                  ((n.position = l),
                  (n.length = k - l),
                  g.push(n),
                  (d.length = l - d.position)),
              d.setProperties && p(d.setProperties) && g.push(d),
              e.setProperties && p(e.setProperties) && a.push(e),
              b ? ((k = g), (g = a)) : (k = a);
        }
        return { opSpecsA: k, opSpecsB: g };
      },
      InsertText: function (a, c) {
        c.position <= a.position
          ? (a.position += c.text.length)
          : c.position <= a.position + a.length && (a.length += c.text.length);
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      MergeParagraph: function (a, c) {
        var b = a.position,
          d = a.position + a.length;
        b >= c.sourceStartPosition && --b;
        d >= c.sourceStartPosition && --d;
        a.position = b;
        a.length = d - b;
        return { opSpecsA: [a], opSpecsB: [c] };
      },
      MoveCursor: e,
      RemoveAnnotation: function (a, c) {
        var b = a.position,
          d = a.position + a.length,
          e = c.position + c.length,
          f = [a],
          g = [c];
        c.position <= b && d <= e
          ? (f = [])
          : (e < b && (b -= c.length + 2),
            e < d && (d -= c.length + 2),
            (a.position = b),
            (a.length = d - b));
        return { opSpecsA: f, opSpecsB: g };
      },
      RemoveCursor: e,
      RemoveMember: e,
      RemoveStyle: e,
      RemoveText: function (a, b) {
        var d = a.position + a.length,
          e = b.position + b.length,
          f = [a],
          g = [b];
        e <= a.position
          ? (a.position -= b.length)
          : b.position < d &&
            (a.position < b.position
              ? (a.length =
                  e < d ? a.length - b.length : b.position - a.position)
              : ((a.position = b.position),
                e < d ? (a.length = d - e) : (f = [])));
        return { opSpecsA: f, opSpecsB: g };
      },
      SetParagraphStyle: e,
      SplitParagraph: function (a, b) {
        b.position < a.position
          ? (a.position += 1)
          : b.position < a.position + a.length && (a.length += 1);
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    InsertText: {
      InsertText: function (a, b, d) {
        a.position < b.position
          ? (b.position += a.text.length)
          : a.position > b.position
          ? (a.position += b.text.length)
          : d
          ? (b.position += a.text.length)
          : (a.position += b.text.length);
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      MergeParagraph: function (a, b) {
        a.position >= b.sourceStartPosition
          ? --a.position
          : (a.position < b.sourceStartPosition &&
              (b.sourceStartPosition += a.text.length),
            a.position < b.destinationStartPosition &&
              (b.destinationStartPosition += a.text.length));
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      MoveCursor: function (a, b) {
        var d = k(b);
        a.position < b.position
          ? (b.position += a.text.length)
          : a.position < b.position + b.length && (b.length += a.text.length);
        d && g(b);
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      RemoveAnnotation: function (a, b) {
        var d = a.position,
          e = b.position + b.length,
          f = [a],
          g = [b];
        b.position <= d && d <= e
          ? ((f = []), (b.length += a.text.length))
          : e < a.position
          ? (a.position -= b.length + 2)
          : (b.position += a.text.length);
        return { opSpecsA: f, opSpecsB: g };
      },
      RemoveCursor: e,
      RemoveMember: e,
      RemoveStyle: e,
      RemoveText: function (a, b) {
        var d;
        d = b.position + b.length;
        var e = [a],
          f = [b];
        d <= a.position
          ? (a.position -= b.length)
          : a.position <= b.position
          ? (b.position += a.text.length)
          : ((b.length = a.position - b.position),
            (d = {
              optype: "RemoveText",
              memberid: b.memberid,
              timestamp: b.timestamp,
              position: a.position + a.text.length,
              length: d - a.position,
            }),
            f.unshift(d),
            (a.position = b.position));
        return { opSpecsA: e, opSpecsB: f };
      },
      SetParagraphStyle: function (a, b) {
        b.position > a.position && (b.position += a.text.length);
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      SplitParagraph: function (a, b) {
        a.position < b.sourceParagraphPosition &&
          (b.sourceParagraphPosition += a.text.length);
        a.position <= b.position
          ? (b.position += a.text.length)
          : (a.position += 1);
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    MergeParagraph: {
      MergeParagraph: function (a, b, d) {
        var e = [a],
          f = [b],
          g;
        a.destinationStartPosition === b.destinationStartPosition
          ? ((e = []),
            (f = []),
            a.moveCursor &&
              ((g = {
                optype: "MoveCursor",
                memberid: a.memberid,
                timestamp: a.timestamp,
                position: a.sourceStartPosition - 1,
              }),
              e.push(g)),
            b.moveCursor &&
              ((g = {
                optype: "MoveCursor",
                memberid: b.memberid,
                timestamp: b.timestamp,
                position: b.sourceStartPosition - 1,
              }),
              f.push(g)),
            (a = d ? a : b),
            (a = {
              optype: "SetParagraphStyle",
              memberid: a.memberid,
              timestamp: a.timestamp,
              position: a.destinationStartPosition,
              styleName: a.paragraphStyleName,
            }),
            d ? e.push(a) : f.push(a))
          : b.sourceStartPosition === a.destinationStartPosition
          ? ((a.destinationStartPosition = b.destinationStartPosition),
            --a.sourceStartPosition,
            (a.paragraphStyleName = b.paragraphStyleName))
          : a.sourceStartPosition === b.destinationStartPosition
          ? ((b.destinationStartPosition = a.destinationStartPosition),
            --b.sourceStartPosition,
            (b.paragraphStyleName = a.paragraphStyleName))
          : a.destinationStartPosition < b.destinationStartPosition
          ? (--b.destinationStartPosition, --b.sourceStartPosition)
          : (--a.destinationStartPosition, --a.sourceStartPosition);
        return { opSpecsA: e, opSpecsB: f };
      },
      MoveCursor: function (a, b) {
        var d = b.position,
          e = b.position + b.length,
          f = Math.min(d, e),
          d = Math.max(d, e);
        f >= a.sourceStartPosition && --f;
        d >= a.sourceStartPosition && --d;
        0 <= b.length
          ? ((b.position = f), (b.length = d - f))
          : ((b.position = d), (b.length = f - d));
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      RemoveAnnotation: function (a, b) {
        var d = b.position + b.length,
          e = [a],
          f = [b];
        b.position <= a.destinationStartPosition && a.sourceStartPosition <= d
          ? ((e = []), --b.length)
          : a.sourceStartPosition < b.position
          ? --b.position
          : (d < a.destinationStartPosition &&
              (a.destinationStartPosition -= b.length + 2),
            d < a.sourceStartPosition &&
              (a.sourceStartPosition -= b.length + 2));
        return { opSpecsA: e, opSpecsB: f };
      },
      RemoveCursor: e,
      RemoveMember: e,
      RemoveStyle: e,
      RemoveText: function (a, b) {
        b.position >= a.sourceStartPosition
          ? --b.position
          : (b.position < a.destinationStartPosition &&
              (a.destinationStartPosition -= b.length),
            b.position < a.sourceStartPosition &&
              (a.sourceStartPosition -= b.length));
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      SetParagraphStyle: function (a, b) {
        var d = [a],
          e = [b];
        if (b.position > a.sourceStartPosition) --b.position;
        else if (
          b.position === a.destinationStartPosition ||
          b.position === a.sourceStartPosition
        )
          (b.position = a.destinationStartPosition),
            (a.paragraphStyleName = b.styleName);
        return { opSpecsA: d, opSpecsB: e };
      },
      SplitParagraph: function (a, b) {
        var d,
          e = [a],
          f = [b];
        b.position < a.destinationStartPosition
          ? ((a.destinationStartPosition += 1), (a.sourceStartPosition += 1))
          : b.position >= a.destinationStartPosition &&
            b.position < a.sourceStartPosition
          ? ((b.paragraphStyleName = a.paragraphStyleName),
            (d = {
              optype: "SetParagraphStyle",
              memberid: a.memberid,
              timestamp: a.timestamp,
              position: a.destinationStartPosition,
              styleName: a.paragraphStyleName,
            }),
            e.push(d),
            b.position === a.sourceStartPosition - 1 &&
              a.moveCursor &&
              ((d = {
                optype: "MoveCursor",
                memberid: a.memberid,
                timestamp: a.timestamp,
                position: b.position,
                length: 0,
              }),
              e.push(d)),
            (a.destinationStartPosition = b.position + 1),
            (a.sourceStartPosition += 1))
          : b.position >= a.sourceStartPosition &&
            (--b.position, --b.sourceParagraphPosition);
        return { opSpecsA: e, opSpecsB: f };
      },
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    MoveCursor: {
      MoveCursor: e,
      RemoveAnnotation: function (a, b) {
        var d = k(a),
          e = a.position + a.length,
          f = b.position + b.length;
        b.position <= a.position && e <= f
          ? ((a.position = b.position - 1), (a.length = 0))
          : (f < a.position
              ? (a.position -= b.length + 2)
              : f < e && (a.length -= b.length + 2),
            d && g(a));
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      RemoveCursor: function (a, b) {
        return {
          opSpecsA: a.memberid === b.memberid ? [] : [a],
          opSpecsB: [b],
        };
      },
      RemoveMember: e,
      RemoveStyle: e,
      RemoveText: function (a, b) {
        var d = k(a),
          e = a.position + a.length,
          f = b.position + b.length;
        f <= a.position
          ? (a.position -= b.length)
          : b.position < e &&
            (a.position < b.position
              ? (a.length =
                  f < e ? a.length - b.length : b.position - a.position)
              : ((a.position = b.position), (a.length = f < e ? e - f : 0)));
        d && g(a);
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      SetParagraphStyle: e,
      SplitParagraph: function (a, b) {
        var d = k(a);
        b.position < a.position
          ? (a.position += 1)
          : b.position < a.position + a.length && (a.length += 1);
        d && g(a);
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    RemoveAnnotation: {
      RemoveAnnotation: function (a, b) {
        var d = [a],
          e = [b];
        a.position === b.position && a.length === b.length
          ? ((d = []), (e = []))
          : a.position < b.position
          ? (b.position -= a.length + 2)
          : (a.position -= b.length + 2);
        return { opSpecsA: d, opSpecsB: e };
      },
      RemoveCursor: e,
      RemoveMember: e,
      RemoveStyle: e,
      RemoveText: function (a, b) {
        var d = a.position + a.length,
          e = b.position + b.length,
          f = [a],
          g = [b];
        a.position <= b.position && e <= d
          ? ((g = []), (a.length -= b.length))
          : e < a.position
          ? (a.position -= b.length)
          : b.position < a.position
          ? ((a.position = b.position + 1), (b.length -= a.length + 2))
          : (b.position -= a.length + 2);
        return { opSpecsA: f, opSpecsB: g };
      },
      SetParagraphStyle: function (a, b) {
        var d = b.position,
          e = a.position + a.length,
          f = [a],
          g = [b];
        a.position <= d && d <= e
          ? (g = [])
          : e < d && (b.position -= a.length + 2);
        return { opSpecsA: f, opSpecsB: g };
      },
      SplitParagraph: function (a, b) {
        var d = b.position,
          e = a.position + a.length,
          f = [a],
          g = [b];
        a.position <= d && d <= e
          ? ((g = []), (a.length += 1))
          : (e < b.sourceParagraphPosition &&
              (b.sourceParagraphPosition -= a.length + 2),
            e < d ? (b.position -= a.length + 2) : (a.position += 1));
        return { opSpecsA: f, opSpecsB: g };
      },
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    RemoveCursor: {
      RemoveCursor: function (a, b) {
        var d = a.memberid === b.memberid;
        return { opSpecsA: d ? [] : [a], opSpecsB: d ? [] : [b] };
      },
      RemoveMember: e,
      RemoveStyle: e,
      RemoveText: e,
      SetParagraphStyle: e,
      SplitParagraph: e,
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    RemoveMember: {
      RemoveStyle: e,
      RemoveText: e,
      SetParagraphStyle: e,
      SplitParagraph: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    RemoveStyle: {
      RemoveStyle: function (a, b) {
        var d = a.styleName === b.styleName && a.styleFamily === b.styleFamily;
        return { opSpecsA: d ? [] : [a], opSpecsB: d ? [] : [b] };
      },
      RemoveText: e,
      SetParagraphStyle: function (a, b) {
        var d,
          e = [a],
          f = [b];
        "paragraph" === a.styleFamily &&
          a.styleName === b.styleName &&
          ((d = {
            optype: "SetParagraphStyle",
            memberid: a.memberid,
            timestamp: a.timestamp,
            position: b.position,
            styleName: "",
          }),
          e.unshift(d),
          (b.styleName = ""));
        return { opSpecsA: e, opSpecsB: f };
      },
      SplitParagraph: e,
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: function (a, c) {
        var e,
          f = [a],
          g = [c];
        "paragraph" === a.styleFamily &&
          ((e = d(c.setProperties, a.styleName)),
          0 < e.length &&
            ((e = {
              optype: "UpdateParagraphStyle",
              memberid: a.memberid,
              timestamp: a.timestamp,
              styleName: c.styleName,
              removedProperties: { attributes: e.join(",") },
            }),
            f.unshift(e)),
          a.styleName === c.styleName
            ? (g = [])
            : b(c.setProperties, a.styleName));
        return { opSpecsA: f, opSpecsB: g };
      },
    },
    RemoveText: {
      RemoveText: function (a, b) {
        var d = a.position + a.length,
          e = b.position + b.length,
          f = [a],
          g = [b];
        e <= a.position
          ? (a.position -= b.length)
          : d <= b.position
          ? (b.position -= a.length)
          : b.position < d &&
            (a.position < b.position
              ? ((a.length =
                  e < d ? a.length - b.length : b.position - a.position),
                d < e
                  ? ((b.position = a.position), (b.length = e - d))
                  : (g = []))
              : (d < e
                  ? (b.length -= a.length)
                  : b.position < a.position
                  ? (b.length = a.position - b.position)
                  : (g = []),
                e < d
                  ? ((a.position = b.position), (a.length = d - e))
                  : (f = [])));
        return { opSpecsA: f, opSpecsB: g };
      },
      SetParagraphStyle: function (a, b) {
        a.position < b.position && (b.position -= a.length);
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      SplitParagraph: function (a, b) {
        var d = a.position + a.length,
          e = [a],
          f = [b];
        b.position <= a.position
          ? (a.position += 1)
          : b.position < d &&
            ((a.length = b.position - a.position),
            (d = {
              optype: "RemoveText",
              memberid: a.memberid,
              timestamp: a.timestamp,
              position: b.position + 1,
              length: d - b.position,
            }),
            e.unshift(d));
        a.position + a.length <= b.position
          ? (b.position -= a.length)
          : a.position < b.position && (b.position = a.position);
        a.position + a.length < b.sourceParagraphPosition &&
          (b.sourceParagraphPosition -= a.length);
        return { opSpecsA: e, opSpecsB: f };
      },
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    SetParagraphStyle: {
      SetParagraphStyle: function (a, b, d) {
        a.position === b.position &&
          (d ? (b.styleName = a.styleName) : (a.styleName = b.styleName));
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      SplitParagraph: function (a, b) {
        var d = [a],
          e = [b],
          g;
        a.position > b.position
          ? (a.position += 1)
          : a.position === b.sourceParagraphPosition &&
            ((b.paragraphStyleName = a.styleName),
            (g = f(a)),
            (g.position = b.position + 1),
            d.push(g));
        return { opSpecsA: d, opSpecsB: e };
      },
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    SplitParagraph: {
      SplitParagraph: function (a, b, d) {
        var e, f;
        a.position < b.position
          ? (e = !0)
          : b.position < a.position
          ? (f = !0)
          : a.position === b.position && (d ? (e = !0) : (f = !0));
        e
          ? ((b.position += 1),
            (b.sourceParagraphPosition =
              a.position < b.sourceParagraphPosition
                ? b.sourceParagraphPosition + 1
                : a.position + 1))
          : f &&
            ((a.position += 1),
            (a.sourceParagraphPosition =
              b.position < b.sourceParagraphPosition
                ? a.sourceParagraphPosition + 1
                : b.position + 1));
        return { opSpecsA: [a], opSpecsB: [b] };
      },
      UpdateMember: e,
      UpdateMetadata: e,
      UpdateParagraphStyle: e,
    },
    UpdateMember: { UpdateMetadata: e, UpdateParagraphStyle: e },
    UpdateMetadata: {
      UpdateMetadata: function (a, b, d) {
        var e,
          f = [a],
          g = [b];
        e = d ? a : b;
        a = d ? b : a;
        n(
          a.setProperties || null,
          a.removedProperties || null,
          e.setProperties || null,
          e.removedProperties || null
        );
        (e.setProperties && p(e.setProperties)) ||
          (e.removedProperties && r(e.removedProperties)) ||
          (d ? (f = []) : (g = []));
        (a.setProperties && p(a.setProperties)) ||
          (a.removedProperties && r(a.removedProperties)) ||
          (d ? (g = []) : (f = []));
        return { opSpecsA: f, opSpecsB: g };
      },
      UpdateParagraphStyle: e,
    },
    UpdateParagraphStyle: {
      UpdateParagraphStyle: function (a, b, d) {
        var e,
          f = [a],
          g = [b];
        a.styleName === b.styleName &&
          ((e = d ? a : b),
          (a = d ? b : a),
          q(
            a.setProperties,
            a.removedProperties,
            e.setProperties,
            e.removedProperties,
            "style:paragraph-properties"
          ),
          q(
            a.setProperties,
            a.removedProperties,
            e.setProperties,
            e.removedProperties,
            "style:text-properties"
          ),
          n(
            a.setProperties || null,
            a.removedProperties || null,
            e.setProperties || null,
            e.removedProperties || null
          ),
          (e.setProperties && p(e.setProperties)) ||
            (e.removedProperties && r(e.removedProperties)) ||
            (d ? (f = []) : (g = [])),
          (a.setProperties && p(a.setProperties)) ||
            (a.removedProperties && r(a.removedProperties)) ||
            (d ? (g = []) : (f = [])));
        return { opSpecsA: f, opSpecsB: g };
      },
    },
  };
  this.passUnchanged = e;
  this.extendTransformations = function (a) {
    Object.keys(a).forEach(function (b) {
      var d = a[b],
        e,
        f = l.hasOwnProperty(b);
      runtime.log((f ? "Extending" : "Adding") + " map for optypeA: " + b);
      f || (l[b] = {});
      e = l[b];
      Object.keys(d).forEach(function (a) {
        var f = e.hasOwnProperty(a);
        runtime.assert(b <= a, "Wrong order:" + b + ", " + a);
        runtime.log(
          "  " + (f ? "Overwriting" : "Adding") + " entry for optypeB: " + a
        );
        e[a] = d[a];
      });
    });
  };
  this.transformOpspecVsOpspec = function (a, b) {
    var d = a.optype <= b.optype,
      e;
    runtime.log("Crosstransforming:");
    runtime.log(runtime.toJson(a));
    runtime.log(runtime.toJson(b));
    d || ((e = a), (a = b), (b = e));
    (e = (e = l[a.optype]) && e[b.optype])
      ? ((e = e(a, b, !d)),
        d || null === e || (e = { opSpecsA: e.opSpecsB, opSpecsB: e.opSpecsA }))
      : (e = null);
    runtime.log("result:");
    e
      ? (runtime.log(runtime.toJson(e.opSpecsA)),
        runtime.log(runtime.toJson(e.opSpecsB)))
      : runtime.log("null");
    return e;
  };
};
ops.OperationTransformer = function () {
  function g(d, b) {
    for (var f, n, p = [], r = []; 0 < d.length && b; ) {
      f = d.shift();
      f = k.transformOpspecVsOpspec(f, b);
      if (!f) return null;
      p = p.concat(f.opSpecsA);
      if (0 === f.opSpecsB.length) {
        p = p.concat(d);
        b = null;
        break;
      }
      for (; 1 < f.opSpecsB.length; ) {
        n = g(d, f.opSpecsB.shift());
        if (!n) return null;
        r = r.concat(n.opSpecsB);
        d = n.opSpecsA;
      }
      b = f.opSpecsB.pop();
    }
    b && r.push(b);
    return { opSpecsA: p, opSpecsB: r };
  }
  var k = new ops.OperationTransformMatrix();
  this.getOperationTransformMatrix = function () {
    return k;
  };
  this.transform = function (d, b) {
    for (var f, k = []; 0 < b.length; ) {
      f = g(d, b.shift());
      if (!f) return null;
      d = f.opSpecsA;
      k = k.concat(f.opSpecsB);
    }
    return { opSpecsA: d, opSpecsB: k };
  };
};
var webodf_css =
  '@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);@namespace webodfhelper url(urn:webodf:names:helper);@namespace cursor url(urn:webodf:names:cursor);@namespace editinfo url(urn:webodf:names:editinfo);@namespace annotation url(urn:webodf:names:annotation);@namespace dc url(http://purl.org/dc/elements/1.1/);@namespace svgns url(http://www.w3.org/2000/svg);office|document > *, office|document-content > * {display: none;}office|body, office|document {display: inline-block;position: relative;}text|p, text|h {display: block;padding: 0;margin: 0;line-height: normal;position: relative;}text|p::after, text|h::after {content: "\\200B";white-space: pre;}*[webodfhelper|containsparagraphanchor] {position: relative;}text|s {white-space: pre;}text|tab {display: inline;white-space: pre;}text|tracked-changes {display: none;}office|binary-data {display: none;}office|text {display: block;text-align: left;overflow: visible;word-wrap: break-word;}office|text::selection {background: transparent;}.webodf-virtualSelections *::selection {background: transparent;}.webodf-virtualSelections *::-moz-selection {background: transparent;}office|text * draw|text-box {display: block;border: 1px solid #d3d3d3;}office|text draw|frame {z-index: 1;}office|spreadsheet {display: block;border-collapse: collapse;empty-cells: show;font-family: sans-serif;font-size: 10pt;text-align: left;page-break-inside: avoid;overflow: hidden;}office|presentation {display: inline-block;text-align: left;}#shadowContent {display: inline-block;text-align: left;}draw|page {display: block;position: relative;overflow: hidden;}presentation|notes, presentation|footer-decl, presentation|date-time-decl {display: none;}@media print {draw|page {border: 1pt solid black;page-break-inside: avoid;}presentation|notes {}}office|spreadsheet text|p {border: 0px;padding: 1px;margin: 0px;}office|spreadsheet table|table {margin: 3px;}office|spreadsheet table|table:after {}office|spreadsheet table|table-row {counter-increment: row;}office|spreadsheet table|table-row:before {width: 3em;background: #cccccc;border: 1px solid black;text-align: center;content: counter(row);display: table-cell;}office|spreadsheet table|table-cell {border: 1px solid #cccccc;}table|table {display: table;}draw|frame table|table {width: 100%;height: 100%;background: white;}table|table-header-rows {display: table-header-group;}table|table-row {display: table-row;}table|table-column {display: table-column;}table|table-cell {width: 0.889in;display: table-cell;word-break: break-all;}draw|frame {display: block;}draw|image {display: block;width: 100%;height: 100%;top: 0px;left: 0px;background-repeat: no-repeat;background-size: 100% 100%;-moz-background-size: 100% 100%;}draw|frame > draw|image:nth-of-type(n+2) {display: none;}text|list:before {display: none;content:"";}text|list {display: block;}text|list-item {display: block;}text|number {display:none;}text|a {color: blue;text-decoration: underline;cursor: pointer;}.webodf-inactiveLinks text|a {cursor: text;}text|note-citation {vertical-align: super;font-size: smaller;}text|note-body {display: none;}text|note:hover text|note-citation {background: #dddddd;}text|note:hover text|note-body {display: block;left:1em;max-width: 80%;position: absolute;background: #ffffaa;}text|bibliography-source {display: none;}svg|title, svg|desc {display: none;}video {width: 100%;height: 100%}cursor|anchor {display: none;}cursor|cursor {display: none;}.webodf-caretOverlay {position: absolute;top: 5%;height: 1em;z-index: 10;padding-left: 1px;pointer-events: none;}.webodf-caretOverlay .caret {position: absolute;border-left: 2px solid black;top: 0;bottom: 0;right: 0;}.webodf-caretOverlay .handle {position: absolute;margin-top: 5px;padding-top: 3px;margin-left: auto;margin-right: auto;width: 64px;height: 68px;border-radius: 5px;opacity: 0.3;text-align: center;background-color: black;box-shadow: 0px 0px 5px rgb(90, 90, 90);border: 1px solid black;top: -85px;right: -32px;}.webodf-caretOverlay .handle > img {box-shadow: 0px 0px 5px rgb(90, 90, 90) inset;background-color: rgb(200, 200, 200);border-radius: 5px;border: 2px solid;height: 60px;width: 60px;display: block;margin: auto;}.webodf-caretOverlay .handle.active {opacity: 0.8;}.webodf-caretOverlay .handle:after {content: " ";position: absolute;width: 0px;height: 0px;border-style: solid;border-width: 8.7px 5px 0 5px;border-color: black transparent transparent transparent;top: 100%;left: 43%;}.webodf-caretSizer {display: inline-block;width: 0;visibility: hidden;}#eventTrap {display: block;position: absolute;bottom: 0;left: 0;outline: none;opacity: 0;color: rgba(255, 255, 255, 0);pointer-events: none;white-space: pre;overflow: hidden;}cursor|cursor > #composer {text-decoration: underline;}cursor|cursor[cursor|caret-sizer-active="true"],cursor|cursor[cursor|composing="true"] {display: inline;}editinfo|editinfo {display: inline-block;}.editInfoMarker {position: absolute;width: 10px;height: 100%;left: -20px;opacity: 0.8;top: 0;border-radius: 5px;background-color: transparent;box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);}.editInfoMarker:hover {box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);}.editInfoHandle {position: absolute;background-color: black;padding: 5px;border-radius: 5px;opacity: 0.8;box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);bottom: 100%;margin-bottom: 10px;z-index: 3;left: -25px;}.editInfoHandle:after {content: " ";position: absolute;width: 0px;height: 0px;border-style: solid;border-width: 8.7px 5px 0 5px;border-color: black transparent transparent transparent;top: 100%;left: 5px;}.editInfo {font-family: sans-serif;font-weight: normal;font-style: normal;text-decoration: none;color: white;width: 100%;height: 12pt;}.editInfoColor {float: left;width: 10pt;height: 10pt;border: 1px solid white;}.editInfoAuthor {float: left;margin-left: 5pt;font-size: 10pt;text-align: left;height: 12pt;line-height: 12pt;}.editInfoTime {float: right;margin-left: 30pt;font-size: 8pt;font-style: italic;color: yellow;height: 12pt;line-height: 12pt;}.annotationWrapper {display: inline;position: relative;}.annotationRemoveButton:before {content: "\u00d7";color: white;padding: 5px;line-height: 1em;}.annotationRemoveButton {width: 20px;height: 20px;border-radius: 10px;background-color: black;box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);position: absolute;top: -10px;left: -10px;z-index: 3;text-align: center;font-family: sans-serif;font-style: normal;font-weight: normal;text-decoration: none;font-size: 15px;}.annotationRemoveButton:hover {cursor: pointer;box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);}.annotationNote {width: 4cm;position: absolute;display: inline;z-index: 10;top: 0;}.annotationNote > office|annotation {display: block;text-align: left;}.annotationConnector {position: absolute;display: inline;top: 0;z-index: 2;border-top: 1px dashed brown;}.annotationConnector.angular {-moz-transform-origin: left top;-webkit-transform-origin: left top;-ms-transform-origin: left top;transform-origin: left top;}.annotationConnector.horizontal {left: 0;}.annotationConnector.horizontal:before {content: "";display: inline;position: absolute;width: 0px;height: 0px;border-style: solid;border-width: 8.7px 5px 0 5px;border-color: brown transparent transparent transparent;top: -1px;left: -5px;}office|annotation {width: 100%;height: 100%;display: none;background: rgb(198, 238, 184);background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);box-shadow: 0 3px 4px -3px #ccc;}office|annotation > dc|creator {display: block;font-size: 10pt;font-weight: normal;font-style: normal;font-family: sans-serif;color: white;background-color: brown;padding: 4px;}office|annotation > dc|date {display: block;font-size: 10pt;font-weight: normal;font-style: normal;font-family: sans-serif;border: 4px solid transparent;color: black;}office|annotation > text|list {display: block;padding: 5px;}office|annotation text|p {font-size: 10pt;color: black;font-weight: normal;font-style: normal;text-decoration: none;font-family: sans-serif;}#annotationsPane {background-color: #EAEAEA;width: 4cm;height: 100%;display: none;position: absolute;outline: 1px solid #ccc;}.webodf-annotationHighlight {background-color: yellow;position: relative;}.webodf-selectionOverlay {position: absolute;pointer-events: none;top: 0;left: 0;top: 0;left: 0;width: 100%;height: 100%;z-index: 15;}.webodf-selectionOverlay > polygon {fill-opacity: 0.3;stroke-opacity: 0.8;stroke-width: 1;fill-rule: evenodd;}.webodf-selectionOverlay > .webodf-draggable {fill-opacity: 0.8;stroke-opacity: 0;stroke-width: 8;pointer-events: all;display: none;-moz-transform-origin: center center;-webkit-transform-origin: center center;-ms-transform-origin: center center;transform-origin: center center;}#imageSelector {display: none;position: absolute;border-style: solid;border-color: black;}#imageSelector > div {width: 5px;height: 5px;display: block;position: absolute;border: 1px solid black;background-color: #ffffff;}#imageSelector > .topLeft {top: -4px;left: -4px;}#imageSelector > .topRight {top: -4px;right: -4px;}#imageSelector > .bottomRight {right: -4px;bottom: -4px;}#imageSelector > .bottomLeft {bottom: -4px;left: -4px;}#imageSelector > .topMiddle {top: -4px;left: 50%;margin-left: -2.5px;}#imageSelector > .rightMiddle {top: 50%;right: -4px;margin-top: -2.5px;}#imageSelector > .bottomMiddle {bottom: -4px;left: 50%;margin-left: -2.5px;}#imageSelector > .leftMiddle {top: 50%;left: -4px;margin-top: -2.5px;}div.webodf-customScrollbars::-webkit-scrollbar{width: 8px;height: 8px;background-color: transparent;}div.webodf-customScrollbars::-webkit-scrollbar-track{background-color: transparent;}div.webodf-customScrollbars::-webkit-scrollbar-thumb{background-color: #444;border-radius: 4px;}.webodf-hyperlinkTooltip {display: none;color: white;background-color: black;border-radius: 5px;box-shadow: 2px 2px 5px gray;padding: 3px;position: absolute;max-width: 210px;text-align: left;word-break: break-all;z-index: 16;}.webodf-hyperlinkTooltipText {display: block;font-weight: bold;}'; /*

 @licstart
JSZip - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2014 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
 @licend
*/
!(function (e) {
  var globalScope =
      typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : {},
    externs = globalScope.externs || (globalScope.externs = {});
  externs.JSZip = e();
})(function () {
  var define, module, exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        var f = (n[o] = { exports: {} });
        t[o][0].call(
          f.exports,
          function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          },
          f,
          f.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  })(
    {
      1: [
        function (_dereq_, module, exports) {
          var _keyStr =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          exports.encode = function (input, utf8) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            while (i < input.length) {
              chr1 = input.charCodeAt(i++);
              chr2 = input.charCodeAt(i++);
              chr3 = input.charCodeAt(i++);
              enc1 = chr1 >> 2;
              enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
              enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
              enc4 = chr3 & 63;
              if (isNaN(chr2)) enc3 = enc4 = 64;
              else if (isNaN(chr3)) enc4 = 64;
              output =
                output +
                _keyStr.charAt(enc1) +
                _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) +
                _keyStr.charAt(enc4);
            }
            return output;
          };
          exports.decode = function (input, utf8) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
              enc1 = _keyStr.indexOf(input.charAt(i++));
              enc2 = _keyStr.indexOf(input.charAt(i++));
              enc3 = _keyStr.indexOf(input.charAt(i++));
              enc4 = _keyStr.indexOf(input.charAt(i++));
              chr1 = (enc1 << 2) | (enc2 >> 4);
              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
              chr3 = ((enc3 & 3) << 6) | enc4;
              output = output + String.fromCharCode(chr1);
              if (enc3 != 64) output = output + String.fromCharCode(chr2);
              if (enc4 != 64) output = output + String.fromCharCode(chr3);
            }
            return output;
          };
        },
        {},
      ],
      2: [
        function (_dereq_, module, exports) {
          function CompressedObject() {
            this.compressedSize = 0;
            this.uncompressedSize = 0;
            this.crc32 = 0;
            this.compressionMethod = null;
            this.compressedContent = null;
          }
          CompressedObject.prototype = {
            getContent: function () {
              return null;
            },
            getCompressedContent: function () {
              return null;
            },
          };
          module.exports = CompressedObject;
        },
        {},
      ],
      3: [
        function (_dereq_, module, exports) {
          exports.STORE = {
            magic: "\x00\x00",
            compress: function (content) {
              return content;
            },
            uncompress: function (content) {
              return content;
            },
            compressInputType: null,
            uncompressInputType: null,
          };
          exports.DEFLATE = _dereq_("./flate");
        },
        { "./flate": 8 },
      ],
      4: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("./utils");
          var table = [
            0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615,
            3915621685, 2657392035, 249268274, 2044508324, 3772115230,
            2547177864, 162941995, 2125561021, 3887607047, 2428444049,
            498536548, 1789927666, 4089016648, 2227061214, 450548861,
            1843258603, 4107580753, 2211677639, 325883990, 1684777152,
            4251122042, 2321926636, 335633487, 1661365465, 4195302755,
            2366115317, 997073096, 1281953886, 3579855332, 2724688242,
            1006888145, 1258607687, 3524101629, 2768942443, 901097722,
            1119000684, 3686517206, 2898065728, 853044451, 1172266101,
            3705015759, 2882616665, 651767980, 1373503546, 3369554304,
            3218104598, 565507253, 1454621731, 3485111705, 3099436303,
            671266974, 1594198024, 3322730930, 2970347812, 795835527,
            1483230225, 3244367275, 3060149565, 1994146192, 31158534,
            2563907772, 4023717930, 1907459465, 112637215, 2680153253,
            3904427059, 2013776290, 251722036, 2517215374, 3775830040,
            2137656763, 141376813, 2439277719, 3865271297, 1802195444,
            476864866, 2238001368, 4066508878, 1812370925, 453092731,
            2181625025, 4111451223, 1706088902, 314042704, 2344532202,
            4240017532, 1658658271, 366619977, 2362670323, 4224994405,
            1303535960, 984961486, 2747007092, 3569037538, 1256170817,
            1037604311, 2765210733, 3554079995, 1131014506, 879679996,
            2909243462, 3663771856, 1141124467, 855842277, 2852801631,
            3708648649, 1342533948, 654459306, 3188396048, 3373015174,
            1466479909, 544179635, 3110523913, 3462522015, 1591671054,
            702138776, 2966460450, 3352799412, 1504918807, 783551873,
            3082640443, 3233442989, 3988292384, 2596254646, 62317068,
            1957810842, 3939845945, 2647816111, 81470997, 1943803523,
            3814918930, 2489596804, 225274430, 2053790376, 3826175755,
            2466906013, 167816743, 2097651377, 4027552580, 2265490386,
            503444072, 1762050814, 4150417245, 2154129355, 426522225,
            1852507879, 4275313526, 2312317920, 282753626, 1742555852,
            4189708143, 2394877945, 397917763, 1622183637, 3604390888,
            2714866558, 953729732, 1340076626, 3518719985, 2797360999,
            1068828381, 1219638859, 3624741850, 2936675148, 906185462,
            1090812512, 3747672003, 2825379669, 829329135, 1181335161,
            3412177804, 3160834842, 628085408, 1382605366, 3423369109,
            3138078467, 570562233, 1426400815, 3317316542, 2998733608,
            733239954, 1555261956, 3268935591, 3050360625, 752459403,
            1541320221, 2607071920, 3965973030, 1969922972, 40735498,
            2617837225, 3943577151, 1913087877, 83908371, 2512341634,
            3803740692, 2075208622, 213261112, 2463272603, 3855990285,
            2094854071, 198958881, 2262029012, 4057260610, 1759359992,
            534414190, 2176718541, 4139329115, 1873836001, 414664567,
            2282248934, 4279200368, 1711684554, 285281116, 2405801727,
            4167216745, 1634467795, 376229701, 2685067896, 3608007406,
            1308918612, 956543938, 2808555105, 3495958263, 1231636301,
            1047427035, 2932959818, 3654703836, 1088359270, 936918e3,
            2847714899, 3736837829, 1202900863, 817233897, 3183342108,
            3401237130, 1404277552, 615818150, 3134207493, 3453421203,
            1423857449, 601450431, 3009837614, 3294710456, 1567103746,
            711928724, 3020668471, 3272380065, 1510334235, 755167117,
          ];
          module.exports = function crc32(input, crc) {
            if (typeof input === "undefined" || !input.length) return 0;
            var isArray = utils.getTypeOf(input) !== "string";
            if (typeof crc == "undefined") crc = 0;
            var x = 0;
            var y = 0;
            var b = 0;
            crc = crc ^ -1;
            for (var i = 0, iTop = input.length; i < iTop; i++) {
              b = isArray ? input[i] : input.charCodeAt(i);
              y = (crc ^ b) & 255;
              x = table[y];
              crc = (crc >>> 8) ^ x;
            }
            return crc ^ -1;
          };
        },
        { "./utils": 21 },
      ],
      5: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("./utils");
          function DataReader(data) {
            this.data = null;
            this.length = 0;
            this.index = 0;
          }
          DataReader.prototype = {
            checkOffset: function (offset) {
              this.checkIndex(this.index + offset);
            },
            checkIndex: function (newIndex) {
              if (this.length < newIndex || newIndex < 0)
                throw new Error(
                  "End of data reached (data length = " +
                    this.length +
                    ", asked index = " +
                    newIndex +
                    "). Corrupted zip ?"
                );
            },
            setIndex: function (newIndex) {
              this.checkIndex(newIndex);
              this.index = newIndex;
            },
            skip: function (n) {
              this.setIndex(this.index + n);
            },
            byteAt: function (i) {},
            readInt: function (size) {
              var result = 0,
                i;
              this.checkOffset(size);
              for (i = this.index + size - 1; i >= this.index; i--)
                result = (result << 8) + this.byteAt(i);
              this.index += size;
              return result;
            },
            readString: function (size) {
              return utils.transformTo("string", this.readData(size));
            },
            readData: function (size) {},
            lastIndexOfSignature: function (sig) {},
            readDate: function () {
              var dostime = this.readInt(4);
              return new Date(
                ((dostime >> 25) & 127) + 1980,
                ((dostime >> 21) & 15) - 1,
                (dostime >> 16) & 31,
                (dostime >> 11) & 31,
                (dostime >> 5) & 63,
                (dostime & 31) << 1
              );
            },
          };
          module.exports = DataReader;
        },
        { "./utils": 21 },
      ],
      6: [
        function (_dereq_, module, exports) {
          exports.base64 = false;
          exports.binary = false;
          exports.dir = false;
          exports.createFolders = false;
          exports.date = null;
          exports.compression = null;
          exports.comment = null;
        },
        {},
      ],
      7: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("./utils");
          exports.string2binary = function (str) {
            return utils.string2binary(str);
          };
          exports.string2Uint8Array = function (str) {
            return utils.transformTo("uint8array", str);
          };
          exports.uint8Array2String = function (array) {
            return utils.transformTo("string", array);
          };
          exports.string2Blob = function (str) {
            var buffer = utils.transformTo("arraybuffer", str);
            return utils.arrayBuffer2Blob(buffer);
          };
          exports.arrayBuffer2Blob = function (buffer) {
            return utils.arrayBuffer2Blob(buffer);
          };
          exports.transformTo = function (outputType, input) {
            return utils.transformTo(outputType, input);
          };
          exports.getTypeOf = function (input) {
            return utils.getTypeOf(input);
          };
          exports.checkSupport = function (type) {
            return utils.checkSupport(type);
          };
          exports.MAX_VALUE_16BITS = utils.MAX_VALUE_16BITS;
          exports.MAX_VALUE_32BITS = utils.MAX_VALUE_32BITS;
          exports.pretty = function (str) {
            return utils.pretty(str);
          };
          exports.findCompression = function (compressionMethod) {
            return utils.findCompression(compressionMethod);
          };
          exports.isRegExp = function (object) {
            return utils.isRegExp(object);
          };
        },
        { "./utils": 21 },
      ],
      8: [
        function (_dereq_, module, exports) {
          var USE_TYPEDARRAY =
            typeof Uint8Array !== "undefined" &&
            typeof Uint16Array !== "undefined" &&
            typeof Uint32Array !== "undefined";
          var pako = _dereq_("pako");
          exports.uncompressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
          exports.compressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
          exports.magic = "\b\x00";
          exports.compress = function (input) {
            return pako.deflateRaw(input);
          };
          exports.uncompress = function (input) {
            return pako.inflateRaw(input);
          };
        },
        { pako: 24 },
      ],
      9: [
        function (_dereq_, module, exports) {
          var base64 = _dereq_("./base64");
          function JSZip(data, options) {
            if (!(this instanceof JSZip)) return new JSZip(data, options);
            this.files = {};
            this.comment = null;
            this.root = "";
            if (data) this.load(data, options);
            this.clone = function () {
              var newObj = new JSZip();
              for (var i in this)
                if (typeof this[i] !== "function") newObj[i] = this[i];
              return newObj;
            };
          }
          JSZip.prototype = _dereq_("./object");
          JSZip.prototype.load = _dereq_("./load");
          JSZip.support = _dereq_("./support");
          JSZip.defaults = _dereq_("./defaults");
          JSZip.utils = _dereq_("./deprecatedPublicUtils");
          JSZip.base64 = {
            encode: function (input) {
              return base64.encode(input);
            },
            decode: function (input) {
              return base64.decode(input);
            },
          };
          JSZip.compressions = _dereq_("./compressions");
          module.exports = JSZip;
        },
        {
          "./base64": 1,
          "./compressions": 3,
          "./defaults": 6,
          "./deprecatedPublicUtils": 7,
          "./load": 10,
          "./object": 13,
          "./support": 17,
        },
      ],
      10: [
        function (_dereq_, module, exports) {
          var base64 = _dereq_("./base64");
          var ZipEntries = _dereq_("./zipEntries");
          module.exports = function (data, options) {
            var files, zipEntries, i, input;
            options = options || {};
            if (options.base64) data = base64.decode(data);
            zipEntries = new ZipEntries(data, options);
            files = zipEntries.files;
            for (i = 0; i < files.length; i++) {
              input = files[i];
              this.file(input.fileName, input.decompressed, {
                binary: true,
                optimizedBinaryString: true,
                date: input.date,
                dir: input.dir,
                comment: input.fileComment.length ? input.fileComment : null,
                createFolders: options.createFolders,
              });
            }
            if (zipEntries.zipComment.length)
              this.comment = zipEntries.zipComment;
            return this;
          };
        },
        { "./base64": 1, "./zipEntries": 22 },
      ],
      11: [
        function (_dereq_, module, exports) {
          (function (Buffer) {
            module.exports = function (data, encoding) {
              return new Buffer(data, encoding);
            };
            module.exports.test = function (b) {
              return Buffer.isBuffer(b);
            };
          }).call(this, typeof Buffer !== "undefined" ? Buffer : undefined);
        },
        {},
      ],
      12: [
        function (_dereq_, module, exports) {
          var Uint8ArrayReader = _dereq_("./uint8ArrayReader");
          function NodeBufferReader(data) {
            this.data = data;
            this.length = this.data.length;
            this.index = 0;
          }
          NodeBufferReader.prototype = new Uint8ArrayReader();
          NodeBufferReader.prototype.readData = function (size) {
            this.checkOffset(size);
            var result = this.data.slice(this.index, this.index + size);
            this.index += size;
            return result;
          };
          module.exports = NodeBufferReader;
        },
        { "./uint8ArrayReader": 18 },
      ],
      13: [
        function (_dereq_, module, exports) {
          var support = _dereq_("./support");
          var utils = _dereq_("./utils");
          var crc32 = _dereq_("./crc32");
          var signature = _dereq_("./signature");
          var defaults = _dereq_("./defaults");
          var base64 = _dereq_("./base64");
          var compressions = _dereq_("./compressions");
          var CompressedObject = _dereq_("./compressedObject");
          var nodeBuffer = _dereq_("./nodeBuffer");
          var utf8 = _dereq_("./utf8");
          var StringWriter = _dereq_("./stringWriter");
          var Uint8ArrayWriter = _dereq_("./uint8ArrayWriter");
          var getRawData = function (file) {
            if (file._data instanceof CompressedObject) {
              file._data = file._data.getContent();
              file.options.binary = true;
              file.options.base64 = false;
              if (utils.getTypeOf(file._data) === "uint8array") {
                var copy = file._data;
                file._data = new Uint8Array(copy.length);
                if (copy.length !== 0) file._data.set(copy, 0);
              }
            }
            return file._data;
          };
          var getBinaryData = function (file) {
            var result = getRawData(file),
              type = utils.getTypeOf(result);
            if (type === "string") {
              if (!file.options.binary)
                if (support.nodebuffer) return nodeBuffer(result, "utf-8");
              return file.asBinary();
            }
            return result;
          };
          var dataToString = function (asUTF8) {
            var result = getRawData(this);
            if (result === null || typeof result === "undefined") return "";
            if (this.options.base64) result = base64.decode(result);
            if (asUTF8 && this.options.binary) result = out.utf8decode(result);
            else result = utils.transformTo("string", result);
            if (!asUTF8 && !this.options.binary)
              result = utils.transformTo("string", out.utf8encode(result));
            return result;
          };
          var ZipObject = function (name, data, options) {
            this.name = name;
            this.dir = options.dir;
            this.date = options.date;
            this.comment = options.comment;
            this._data = data;
            this.options = options;
            this._initialMetadata = { dir: options.dir, date: options.date };
          };
          ZipObject.prototype = {
            asText: function () {
              return dataToString.call(this, true);
            },
            asBinary: function () {
              return dataToString.call(this, false);
            },
            asNodeBuffer: function () {
              var result = getBinaryData(this);
              return utils.transformTo("nodebuffer", result);
            },
            asUint8Array: function () {
              var result = getBinaryData(this);
              return utils.transformTo("uint8array", result);
            },
            asArrayBuffer: function () {
              return this.asUint8Array().buffer;
            },
          };
          var decToHex = function (dec, bytes) {
            var hex = "",
              i;
            for (i = 0; i < bytes; i++) {
              hex += String.fromCharCode(dec & 255);
              dec = dec >>> 8;
            }
            return hex;
          };
          var extend = function () {
            var result = {},
              i,
              attr;
            for (i = 0; i < arguments.length; i++)
              for (attr in arguments[i])
                if (
                  arguments[i].hasOwnProperty(attr) &&
                  typeof result[attr] === "undefined"
                )
                  result[attr] = arguments[i][attr];
            return result;
          };
          var prepareFileAttrs = function (o) {
            o = o || {};
            if (
              o.base64 === true &&
              (o.binary === null || o.binary === undefined)
            )
              o.binary = true;
            o = extend(o, defaults);
            o.date = o.date || new Date();
            if (o.compression !== null)
              o.compression = o.compression.toUpperCase();
            return o;
          };
          var fileAdd = function (name, data, o) {
            var dataType = utils.getTypeOf(data),
              parent;
            o = prepareFileAttrs(o);
            if (o.createFolders && (parent = parentFolder(name)))
              folderAdd.call(this, parent, true);
            if (o.dir || data === null || typeof data === "undefined") {
              o.base64 = false;
              o.binary = false;
              data = null;
            } else if (dataType === "string") {
              if (o.binary && !o.base64)
                if (o.optimizedBinaryString !== true)
                  data = utils.string2binary(data);
            } else {
              o.base64 = false;
              o.binary = true;
              if (!dataType && !(data instanceof CompressedObject))
                throw new Error(
                  "The data of '" + name + "' is in an unsupported format !"
                );
              if (dataType === "arraybuffer")
                data = utils.transformTo("uint8array", data);
            }
            var object = new ZipObject(name, data, o);
            this.files[name] = object;
            return object;
          };
          var parentFolder = function (path) {
            if (path.slice(-1) == "/")
              path = path.substring(0, path.length - 1);
            var lastSlash = path.lastIndexOf("/");
            return lastSlash > 0 ? path.substring(0, lastSlash) : "";
          };
          var folderAdd = function (name, createFolders) {
            if (name.slice(-1) != "/") name += "/";
            createFolders =
              typeof createFolders !== "undefined" ? createFolders : false;
            if (!this.files[name])
              fileAdd.call(this, name, null, {
                dir: true,
                createFolders: createFolders,
              });
            return this.files[name];
          };
          var generateCompressedObjectFrom = function (file, compression) {
            var result = new CompressedObject(),
              content;
            if (file._data instanceof CompressedObject) {
              result.uncompressedSize = file._data.uncompressedSize;
              result.crc32 = file._data.crc32;
              if (result.uncompressedSize === 0 || file.dir) {
                compression = compressions["STORE"];
                result.compressedContent = "";
                result.crc32 = 0;
              } else if (file._data.compressionMethod === compression.magic)
                result.compressedContent = file._data.getCompressedContent();
              else {
                content = file._data.getContent();
                result.compressedContent = compression.compress(
                  utils.transformTo(compression.compressInputType, content)
                );
              }
            } else {
              content = getBinaryData(file);
              if (!content || content.length === 0 || file.dir) {
                compression = compressions["STORE"];
                content = "";
              }
              result.uncompressedSize = content.length;
              result.crc32 = crc32(content);
              result.compressedContent = compression.compress(
                utils.transformTo(compression.compressInputType, content)
              );
            }
            result.compressedSize = result.compressedContent.length;
            result.compressionMethod = compression.magic;
            return result;
          };
          var generateZipParts = function (
            name,
            file,
            compressedObject,
            offset
          ) {
            var data = compressedObject.compressedContent,
              utfEncodedFileName = utils.transformTo(
                "string",
                utf8.utf8encode(file.name)
              ),
              comment = file.comment || "",
              utfEncodedComment = utils.transformTo(
                "string",
                utf8.utf8encode(comment)
              ),
              useUTF8ForFileName =
                utfEncodedFileName.length !== file.name.length,
              useUTF8ForComment = utfEncodedComment.length !== comment.length,
              o = file.options,
              dosTime,
              dosDate,
              extraFields = "",
              unicodePathExtraField = "",
              unicodeCommentExtraField = "",
              dir,
              date;
            if (file._initialMetadata.dir !== file.dir) dir = file.dir;
            else dir = o.dir;
            if (file._initialMetadata.date !== file.date) date = file.date;
            else date = o.date;
            dosTime = date.getHours();
            dosTime = dosTime << 6;
            dosTime = dosTime | date.getMinutes();
            dosTime = dosTime << 5;
            dosTime = dosTime | (date.getSeconds() / 2);
            dosDate = date.getFullYear() - 1980;
            dosDate = dosDate << 4;
            dosDate = dosDate | (date.getMonth() + 1);
            dosDate = dosDate << 5;
            dosDate = dosDate | date.getDate();
            if (useUTF8ForFileName) {
              unicodePathExtraField =
                decToHex(1, 1) +
                decToHex(crc32(utfEncodedFileName), 4) +
                utfEncodedFileName;
              extraFields +=
                "up" +
                decToHex(unicodePathExtraField.length, 2) +
                unicodePathExtraField;
            }
            if (useUTF8ForComment) {
              unicodeCommentExtraField =
                decToHex(1, 1) +
                decToHex(this.crc32(utfEncodedComment), 4) +
                utfEncodedComment;
              extraFields +=
                "uc" +
                decToHex(unicodeCommentExtraField.length, 2) +
                unicodeCommentExtraField;
            }
            var header = "";
            header += "\n\x00";
            header +=
              useUTF8ForFileName || useUTF8ForComment ? "\x00\b" : "\x00\x00";
            header += compressedObject.compressionMethod;
            header += decToHex(dosTime, 2);
            header += decToHex(dosDate, 2);
            header += decToHex(compressedObject.crc32, 4);
            header += decToHex(compressedObject.compressedSize, 4);
            header += decToHex(compressedObject.uncompressedSize, 4);
            header += decToHex(utfEncodedFileName.length, 2);
            header += decToHex(extraFields.length, 2);
            var fileRecord =
              signature.LOCAL_FILE_HEADER +
              header +
              utfEncodedFileName +
              extraFields;
            var dirRecord =
              signature.CENTRAL_FILE_HEADER +
              "\u0014\x00" +
              header +
              decToHex(utfEncodedComment.length, 2) +
              "\x00\x00" +
              "\x00\x00" +
              (dir === true ? "\u0010\x00\x00\x00" : "\x00\x00\x00\x00") +
              decToHex(offset, 4) +
              utfEncodedFileName +
              extraFields +
              utfEncodedComment;
            return {
              fileRecord: fileRecord,
              dirRecord: dirRecord,
              compressedObject: compressedObject,
            };
          };
          var out = {
            load: function (stream, options) {
              throw new Error(
                "Load method is not defined. Is the file jszip-load.js included ?"
              );
            },
            filter: function (search) {
              var result = [],
                filename,
                relativePath,
                file,
                fileClone;
              for (filename in this.files) {
                if (!this.files.hasOwnProperty(filename)) continue;
                file = this.files[filename];
                fileClone = new ZipObject(
                  file.name,
                  file._data,
                  extend(file.options)
                );
                relativePath = filename.slice(
                  this.root.length,
                  filename.length
                );
                if (
                  filename.slice(0, this.root.length) === this.root &&
                  search(relativePath, fileClone)
                )
                  result.push(fileClone);
              }
              return result;
            },
            file: function (name, data, o) {
              if (arguments.length === 1)
                if (utils.isRegExp(name)) {
                  var regexp = name;
                  return this.filter(function (relativePath, file) {
                    return !file.dir && regexp.test(relativePath);
                  });
                } else
                  return (
                    this.filter(function (relativePath, file) {
                      return !file.dir && relativePath === name;
                    })[0] || null
                  );
              else {
                name = this.root + name;
                fileAdd.call(this, name, data, o);
              }
              return this;
            },
            folder: function (arg) {
              if (!arg) return this;
              if (utils.isRegExp(arg))
                return this.filter(function (relativePath, file) {
                  return file.dir && arg.test(relativePath);
                });
              var name = this.root + arg;
              var newFolder = folderAdd.call(this, name);
              var ret = this.clone();
              ret.root = newFolder.name;
              return ret;
            },
            remove: function (name) {
              name = this.root + name;
              var file = this.files[name];
              if (!file) {
                if (name.slice(-1) != "/") name += "/";
                file = this.files[name];
              }
              if (file && !file.dir) delete this.files[name];
              else {
                var kids = this.filter(function (relativePath, file) {
                  return file.name.slice(0, name.length) === name;
                });
                for (var i = 0; i < kids.length; i++)
                  delete this.files[kids[i].name];
              }
              return this;
            },
            generate: function (options) {
              options = extend(options || {}, {
                base64: true,
                compression: "STORE",
                type: "base64",
                comment: null,
              });
              utils.checkSupport(options.type);
              var zipData = [],
                localDirLength = 0,
                centralDirLength = 0,
                writer,
                i,
                utfEncodedComment = utils.transformTo(
                  "string",
                  this.utf8encode(options.comment || this.comment || "")
                );
              for (var name in this.files) {
                if (!this.files.hasOwnProperty(name)) continue;
                var file = this.files[name];
                var compressionName =
                  file.options.compression || options.compression.toUpperCase();
                var compression = compressions[compressionName];
                if (!compression)
                  throw new Error(
                    compressionName + " is not a valid compression method !"
                  );
                var compressedObject = generateCompressedObjectFrom.call(
                  this,
                  file,
                  compression
                );
                var zipPart = generateZipParts.call(
                  this,
                  name,
                  file,
                  compressedObject,
                  localDirLength
                );
                localDirLength +=
                  zipPart.fileRecord.length + compressedObject.compressedSize;
                centralDirLength += zipPart.dirRecord.length;
                zipData.push(zipPart);
              }
              var dirEnd = "";
              dirEnd =
                signature.CENTRAL_DIRECTORY_END +
                "\x00\x00" +
                "\x00\x00" +
                decToHex(zipData.length, 2) +
                decToHex(zipData.length, 2) +
                decToHex(centralDirLength, 4) +
                decToHex(localDirLength, 4) +
                decToHex(utfEncodedComment.length, 2) +
                utfEncodedComment;
              var typeName = options.type.toLowerCase();
              if (
                typeName === "uint8array" ||
                typeName === "arraybuffer" ||
                typeName === "blob" ||
                typeName === "nodebuffer"
              )
                writer = new Uint8ArrayWriter(
                  localDirLength + centralDirLength + dirEnd.length
                );
              else
                writer = new StringWriter(
                  localDirLength + centralDirLength + dirEnd.length
                );
              for (i = 0; i < zipData.length; i++) {
                writer.append(zipData[i].fileRecord);
                writer.append(zipData[i].compressedObject.compressedContent);
              }
              for (i = 0; i < zipData.length; i++)
                writer.append(zipData[i].dirRecord);
              writer.append(dirEnd);
              var zip = writer.finalize();
              switch (options.type.toLowerCase()) {
                case "uint8array":
                case "arraybuffer":
                case "nodebuffer":
                  return utils.transformTo(options.type.toLowerCase(), zip);
                case "blob":
                  return utils.arrayBuffer2Blob(
                    utils.transformTo("arraybuffer", zip)
                  );
                case "base64":
                  return options.base64 ? base64.encode(zip) : zip;
                default:
                  return zip;
              }
            },
            crc32: function (input, crc) {
              return crc32(input, crc);
            },
            utf8encode: function (string) {
              return utils.transformTo("string", utf8.utf8encode(string));
            },
            utf8decode: function (input) {
              return utf8.utf8decode(input);
            },
          };
          module.exports = out;
        },
        {
          "./base64": 1,
          "./compressedObject": 2,
          "./compressions": 3,
          "./crc32": 4,
          "./defaults": 6,
          "./nodeBuffer": 11,
          "./signature": 14,
          "./stringWriter": 16,
          "./support": 17,
          "./uint8ArrayWriter": 19,
          "./utf8": 20,
          "./utils": 21,
        },
      ],
      14: [
        function (_dereq_, module, exports) {
          exports.LOCAL_FILE_HEADER = "PK\u0003\u0004";
          exports.CENTRAL_FILE_HEADER = "PK\u0001\u0002";
          exports.CENTRAL_DIRECTORY_END = "PK\u0005\u0006";
          exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\u0006\u0007";
          exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\u0006\u0006";
          exports.DATA_DESCRIPTOR = "PK\u0007\b";
        },
        {},
      ],
      15: [
        function (_dereq_, module, exports) {
          var DataReader = _dereq_("./dataReader");
          var utils = _dereq_("./utils");
          function StringReader(data, optimizedBinaryString) {
            this.data = data;
            if (!optimizedBinaryString)
              this.data = utils.string2binary(this.data);
            this.length = this.data.length;
            this.index = 0;
          }
          StringReader.prototype = new DataReader();
          StringReader.prototype.byteAt = function (i) {
            return this.data.charCodeAt(i);
          };
          StringReader.prototype.lastIndexOfSignature = function (sig) {
            return this.data.lastIndexOf(sig);
          };
          StringReader.prototype.readData = function (size) {
            this.checkOffset(size);
            var result = this.data.slice(this.index, this.index + size);
            this.index += size;
            return result;
          };
          module.exports = StringReader;
        },
        { "./dataReader": 5, "./utils": 21 },
      ],
      16: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("./utils");
          var StringWriter = function () {
            this.data = [];
          };
          StringWriter.prototype = {
            append: function (input) {
              input = utils.transformTo("string", input);
              this.data.push(input);
            },
            finalize: function () {
              return this.data.join("");
            },
          };
          module.exports = StringWriter;
        },
        { "./utils": 21 },
      ],
      17: [
        function (_dereq_, module, exports) {
          (function (Buffer) {
            exports.base64 = true;
            exports.array = true;
            exports.string = true;
            exports.arraybuffer =
              typeof ArrayBuffer !== "undefined" &&
              typeof Uint8Array !== "undefined";
            exports.nodebuffer = typeof Buffer !== "undefined";
            exports.uint8array = typeof Uint8Array !== "undefined";
            if (typeof ArrayBuffer === "undefined") exports.blob = false;
            else {
              var buffer = new ArrayBuffer(0);
              try {
                exports.blob =
                  new Blob([buffer], { type: "application/zip" }).size === 0;
              } catch (e) {
                try {
                  var Builder =
                    window.BlobBuilder ||
                    window.WebKitBlobBuilder ||
                    window.MozBlobBuilder ||
                    window.MSBlobBuilder;
                  var builder = new Builder();
                  builder.append(buffer);
                  exports.blob = builder.getBlob("application/zip").size === 0;
                } catch (e) {
                  exports.blob = false;
                }
              }
            }
          }).call(this, typeof Buffer !== "undefined" ? Buffer : undefined);
        },
        {},
      ],
      18: [
        function (_dereq_, module, exports) {
          var DataReader = _dereq_("./dataReader");
          function Uint8ArrayReader(data) {
            if (data) {
              this.data = data;
              this.length = this.data.length;
              this.index = 0;
            }
          }
          Uint8ArrayReader.prototype = new DataReader();
          Uint8ArrayReader.prototype.byteAt = function (i) {
            return this.data[i];
          };
          Uint8ArrayReader.prototype.lastIndexOfSignature = function (sig) {
            var sig0 = sig.charCodeAt(0),
              sig1 = sig.charCodeAt(1),
              sig2 = sig.charCodeAt(2),
              sig3 = sig.charCodeAt(3);
            for (var i = this.length - 4; i >= 0; --i)
              if (
                this.data[i] === sig0 &&
                this.data[i + 1] === sig1 &&
                this.data[i + 2] === sig2 &&
                this.data[i + 3] === sig3
              )
                return i;
            return -1;
          };
          Uint8ArrayReader.prototype.readData = function (size) {
            this.checkOffset(size);
            if (size === 0) return new Uint8Array(0);
            var result = this.data.subarray(this.index, this.index + size);
            this.index += size;
            return result;
          };
          module.exports = Uint8ArrayReader;
        },
        { "./dataReader": 5 },
      ],
      19: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("./utils");
          var Uint8ArrayWriter = function (length) {
            this.data = new Uint8Array(length);
            this.index = 0;
          };
          Uint8ArrayWriter.prototype = {
            append: function (input) {
              if (input.length !== 0) {
                input = utils.transformTo("uint8array", input);
                this.data.set(input, this.index);
                this.index += input.length;
              }
            },
            finalize: function () {
              return this.data;
            },
          };
          module.exports = Uint8ArrayWriter;
        },
        { "./utils": 21 },
      ],
      20: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("./utils");
          var support = _dereq_("./support");
          var nodeBuffer = _dereq_("./nodeBuffer");
          var _utf8len = new Array(256);
          for (var i = 0; i < 256; i++)
            _utf8len[i] =
              i >= 252
                ? 6
                : i >= 248
                ? 5
                : i >= 240
                ? 4
                : i >= 224
                ? 3
                : i >= 192
                ? 2
                : 1;
          _utf8len[254] = _utf8len[254] = 1;
          var string2buf = function (str) {
            var buf,
              c,
              c2,
              m_pos,
              i,
              str_len = str.length,
              buf_len = 0;
            for (m_pos = 0; m_pos < str_len; m_pos++) {
              c = str.charCodeAt(m_pos);
              if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
                c2 = str.charCodeAt(m_pos + 1);
                if ((c2 & 64512) === 56320) {
                  c = 65536 + ((c - 55296) << 10) + (c2 - 56320);
                  m_pos++;
                }
              }
              buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
            }
            if (support.uint8array) buf = new Uint8Array(buf_len);
            else buf = new Array(buf_len);
            for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
              c = str.charCodeAt(m_pos);
              if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
                c2 = str.charCodeAt(m_pos + 1);
                if ((c2 & 64512) === 56320) {
                  c = 65536 + ((c - 55296) << 10) + (c2 - 56320);
                  m_pos++;
                }
              }
              if (c < 128) buf[i++] = c;
              else if (c < 2048) {
                buf[i++] = 192 | (c >>> 6);
                buf[i++] = 128 | (c & 63);
              } else if (c < 65536) {
                buf[i++] = 224 | (c >>> 12);
                buf[i++] = 128 | ((c >>> 6) & 63);
                buf[i++] = 128 | (c & 63);
              } else {
                buf[i++] = 240 | (c >>> 18);
                buf[i++] = 128 | ((c >>> 12) & 63);
                buf[i++] = 128 | ((c >>> 6) & 63);
                buf[i++] = 128 | (c & 63);
              }
            }
            return buf;
          };
          var utf8border = function (buf, max) {
            var pos;
            max = max || buf.length;
            if (max > buf.length) max = buf.length;
            pos = max - 1;
            while (pos >= 0 && (buf[pos] & 192) === 128) pos--;
            if (pos < 0) return max;
            if (pos === 0) return max;
            return pos + _utf8len[buf[pos]] > max ? pos : max;
          };
          var buf2string = function (buf) {
            var str, i, out, c, c_len;
            var len = buf.length;
            var utf16buf = new Array(len * 2);
            for (out = 0, i = 0; i < len; ) {
              c = buf[i++];
              if (c < 128) {
                utf16buf[out++] = c;
                continue;
              }
              c_len = _utf8len[c];
              if (c_len > 4) {
                utf16buf[out++] = 65533;
                i += c_len - 1;
                continue;
              }
              c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
              while (c_len > 1 && i < len) {
                c = (c << 6) | (buf[i++] & 63);
                c_len--;
              }
              if (c_len > 1) {
                utf16buf[out++] = 65533;
                continue;
              }
              if (c < 65536) utf16buf[out++] = c;
              else {
                c -= 65536;
                utf16buf[out++] = 55296 | ((c >> 10) & 1023);
                utf16buf[out++] = 56320 | (c & 1023);
              }
            }
            if (utf16buf.length !== out)
              if (utf16buf.subarray) utf16buf = utf16buf.subarray(0, out);
              else utf16buf.length = out;
            return utils.applyFromCharCode(utf16buf);
          };
          exports.utf8encode = function utf8encode(str) {
            if (support.nodebuffer) return nodeBuffer(str, "utf-8");
            return string2buf(str);
          };
          exports.utf8decode = function utf8decode(buf) {
            if (support.nodebuffer)
              return utils.transformTo("nodebuffer", buf).toString("utf-8");
            buf = utils.transformTo(
              support.uint8array ? "uint8array" : "array",
              buf
            );
            var result = [],
              k = 0,
              len = buf.length,
              chunk = 65536;
            while (k < len) {
              var nextBoundary = utf8border(buf, Math.min(k + chunk, len));
              if (support.uint8array)
                result.push(buf2string(buf.subarray(k, nextBoundary)));
              else result.push(buf2string(buf.slice(k, nextBoundary)));
              k = nextBoundary;
            }
            return result.join("");
          };
        },
        { "./nodeBuffer": 11, "./support": 17, "./utils": 21 },
      ],
      21: [
        function (_dereq_, module, exports) {
          var support = _dereq_("./support");
          var compressions = _dereq_("./compressions");
          var nodeBuffer = _dereq_("./nodeBuffer");
          exports.string2binary = function (str) {
            var result = "";
            for (var i = 0; i < str.length; i++)
              result += String.fromCharCode(str.charCodeAt(i) & 255);
            return result;
          };
          exports.arrayBuffer2Blob = function (buffer) {
            exports.checkSupport("blob");
            try {
              return new Blob([buffer], { type: "application/zip" });
            } catch (e) {
              try {
                var Builder =
                  window.BlobBuilder ||
                  window.WebKitBlobBuilder ||
                  window.MozBlobBuilder ||
                  window.MSBlobBuilder;
                var builder = new Builder();
                builder.append(buffer);
                return builder.getBlob("application/zip");
              } catch (e) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };
          function identity(input) {
            return input;
          }
          function stringToArrayLike(str, array) {
            for (var i = 0; i < str.length; ++i)
              array[i] = str.charCodeAt(i) & 255;
            return array;
          }
          function arrayLikeToString(array) {
            var chunk = 65536;
            var result = [],
              len = array.length,
              type = exports.getTypeOf(array),
              k = 0,
              canUseApply = true;
            try {
              switch (type) {
                case "uint8array":
                  String.fromCharCode.apply(null, new Uint8Array(0));
                  break;
                case "nodebuffer":
                  String.fromCharCode.apply(null, nodeBuffer(0));
                  break;
              }
            } catch (e) {
              canUseApply = false;
            }
            if (!canUseApply) {
              var resultStr = "";
              for (var i = 0; i < array.length; i++)
                resultStr += String.fromCharCode(array[i]);
              return resultStr;
            }
            while (k < len && chunk > 1)
              try {
                if (type === "array" || type === "nodebuffer")
                  result.push(
                    String.fromCharCode.apply(
                      null,
                      array.slice(k, Math.min(k + chunk, len))
                    )
                  );
                else
                  result.push(
                    String.fromCharCode.apply(
                      null,
                      array.subarray(k, Math.min(k + chunk, len))
                    )
                  );
                k += chunk;
              } catch (e) {
                chunk = Math.floor(chunk / 2);
              }
            return result.join("");
          }
          exports.applyFromCharCode = arrayLikeToString;
          function arrayLikeToArrayLike(arrayFrom, arrayTo) {
            for (var i = 0; i < arrayFrom.length; i++)
              arrayTo[i] = arrayFrom[i];
            return arrayTo;
          }
          var transform = {};
          transform["string"] = {
            string: identity,
            array: function (input) {
              return stringToArrayLike(input, new Array(input.length));
            },
            arraybuffer: function (input) {
              return transform["string"]["uint8array"](input).buffer;
            },
            uint8array: function (input) {
              return stringToArrayLike(input, new Uint8Array(input.length));
            },
            nodebuffer: function (input) {
              return stringToArrayLike(input, nodeBuffer(input.length));
            },
          };
          transform["array"] = {
            string: arrayLikeToString,
            array: identity,
            arraybuffer: function (input) {
              return new Uint8Array(input).buffer;
            },
            uint8array: function (input) {
              return new Uint8Array(input);
            },
            nodebuffer: function (input) {
              return nodeBuffer(input);
            },
          };
          transform["arraybuffer"] = {
            string: function (input) {
              return arrayLikeToString(new Uint8Array(input));
            },
            array: function (input) {
              return arrayLikeToArrayLike(
                new Uint8Array(input),
                new Array(input.byteLength)
              );
            },
            arraybuffer: identity,
            uint8array: function (input) {
              return new Uint8Array(input);
            },
            nodebuffer: function (input) {
              return nodeBuffer(new Uint8Array(input));
            },
          };
          transform["uint8array"] = {
            string: arrayLikeToString,
            array: function (input) {
              return arrayLikeToArrayLike(input, new Array(input.length));
            },
            arraybuffer: function (input) {
              return input.buffer;
            },
            uint8array: identity,
            nodebuffer: function (input) {
              return nodeBuffer(input);
            },
          };
          transform["nodebuffer"] = {
            string: arrayLikeToString,
            array: function (input) {
              return arrayLikeToArrayLike(input, new Array(input.length));
            },
            arraybuffer: function (input) {
              return transform["nodebuffer"]["uint8array"](input).buffer;
            },
            uint8array: function (input) {
              return arrayLikeToArrayLike(input, new Uint8Array(input.length));
            },
            nodebuffer: identity,
          };
          exports.transformTo = function (outputType, input) {
            if (!input) input = "";
            if (!outputType) return input;
            exports.checkSupport(outputType);
            var inputType = exports.getTypeOf(input);
            var result = transform[inputType][outputType](input);
            return result;
          };
          exports.getTypeOf = function (input) {
            if (typeof input === "string") return "string";
            if (Object.prototype.toString.call(input) === "[object Array]")
              return "array";
            if (support.nodebuffer && nodeBuffer.test(input))
              return "nodebuffer";
            if (support.uint8array && input instanceof Uint8Array)
              return "uint8array";
            if (support.arraybuffer && input instanceof ArrayBuffer)
              return "arraybuffer";
          };
          exports.checkSupport = function (type) {
            var supported = support[type.toLowerCase()];
            if (!supported)
              throw new Error(type + " is not supported by this browser");
          };
          exports.MAX_VALUE_16BITS = 65535;
          exports.MAX_VALUE_32BITS = -1;
          exports.pretty = function (str) {
            var res = "",
              code,
              i;
            for (i = 0; i < (str || "").length; i++) {
              code = str.charCodeAt(i);
              res +=
                "\\x" +
                (code < 16 ? "0" : "") +
                code.toString(16).toUpperCase();
            }
            return res;
          };
          exports.findCompression = function (compressionMethod) {
            for (var method in compressions) {
              if (!compressions.hasOwnProperty(method)) continue;
              if (compressions[method].magic === compressionMethod)
                return compressions[method];
            }
            return null;
          };
          exports.isRegExp = function (object) {
            return Object.prototype.toString.call(object) === "[object RegExp]";
          };
        },
        { "./compressions": 3, "./nodeBuffer": 11, "./support": 17 },
      ],
      22: [
        function (_dereq_, module, exports) {
          var StringReader = _dereq_("./stringReader");
          var NodeBufferReader = _dereq_("./nodeBufferReader");
          var Uint8ArrayReader = _dereq_("./uint8ArrayReader");
          var utils = _dereq_("./utils");
          var sig = _dereq_("./signature");
          var ZipEntry = _dereq_("./zipEntry");
          var support = _dereq_("./support");
          var jszipProto = _dereq_("./object");
          function ZipEntries(data, loadOptions) {
            this.files = [];
            this.loadOptions = loadOptions;
            if (data) this.load(data);
          }
          ZipEntries.prototype = {
            checkSignature: function (expectedSignature) {
              var signature = this.reader.readString(4);
              if (signature !== expectedSignature)
                throw new Error(
                  "Corrupted zip or bug : unexpected signature " +
                    "(" +
                    utils.pretty(signature) +
                    ", expected " +
                    utils.pretty(expectedSignature) +
                    ")"
                );
            },
            readBlockEndOfCentral: function () {
              this.diskNumber = this.reader.readInt(2);
              this.diskWithCentralDirStart = this.reader.readInt(2);
              this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
              this.centralDirRecords = this.reader.readInt(2);
              this.centralDirSize = this.reader.readInt(4);
              this.centralDirOffset = this.reader.readInt(4);
              this.zipCommentLength = this.reader.readInt(2);
              this.zipComment = this.reader.readString(this.zipCommentLength);
              this.zipComment = jszipProto.utf8decode(this.zipComment);
            },
            readBlockZip64EndOfCentral: function () {
              this.zip64EndOfCentralSize = this.reader.readInt(8);
              this.versionMadeBy = this.reader.readString(2);
              this.versionNeeded = this.reader.readInt(2);
              this.diskNumber = this.reader.readInt(4);
              this.diskWithCentralDirStart = this.reader.readInt(4);
              this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
              this.centralDirRecords = this.reader.readInt(8);
              this.centralDirSize = this.reader.readInt(8);
              this.centralDirOffset = this.reader.readInt(8);
              this.zip64ExtensibleData = {};
              var extraDataSize = this.zip64EndOfCentralSize - 44,
                index = 0,
                extraFieldId,
                extraFieldLength,
                extraFieldValue;
              while (index < extraDataSize) {
                extraFieldId = this.reader.readInt(2);
                extraFieldLength = this.reader.readInt(4);
                extraFieldValue = this.reader.readString(extraFieldLength);
                this.zip64ExtensibleData[extraFieldId] = {
                  id: extraFieldId,
                  length: extraFieldLength,
                  value: extraFieldValue,
                };
              }
            },
            readBlockZip64EndOfCentralLocator: function () {
              this.diskWithZip64CentralDirStart = this.reader.readInt(4);
              this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
              this.disksCount = this.reader.readInt(4);
              if (this.disksCount > 1)
                throw new Error("Multi-volumes zip are not supported");
            },
            readLocalFiles: function () {
              var i, file;
              for (i = 0; i < this.files.length; i++) {
                file = this.files[i];
                this.reader.setIndex(file.localHeaderOffset);
                this.checkSignature(sig.LOCAL_FILE_HEADER);
                file.readLocalPart(this.reader);
                file.handleUTF8();
              }
            },
            readCentralDir: function () {
              var file;
              this.reader.setIndex(this.centralDirOffset);
              while (this.reader.readString(4) === sig.CENTRAL_FILE_HEADER) {
                file = new ZipEntry({ zip64: this.zip64 }, this.loadOptions);
                file.readCentralPart(this.reader);
                this.files.push(file);
              }
            },
            readEndOfCentral: function () {
              var offset = this.reader.lastIndexOfSignature(
                sig.CENTRAL_DIRECTORY_END
              );
              if (offset === -1)
                throw new Error(
                  "Corrupted zip : can't find end of central directory"
                );
              this.reader.setIndex(offset);
              this.checkSignature(sig.CENTRAL_DIRECTORY_END);
              this.readBlockEndOfCentral();
              if (
                this.diskNumber === utils.MAX_VALUE_16BITS ||
                this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS ||
                this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS ||
                this.centralDirRecords === utils.MAX_VALUE_16BITS ||
                this.centralDirSize === utils.MAX_VALUE_32BITS ||
                this.centralDirOffset === utils.MAX_VALUE_32BITS
              ) {
                this.zip64 = true;
                offset = this.reader.lastIndexOfSignature(
                  sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR
                );
                if (offset === -1)
                  throw new Error(
                    "Corrupted zip : can't find the ZIP64 end of central directory locator"
                  );
                this.reader.setIndex(offset);
                this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
                this.readBlockZip64EndOfCentralLocator();
                this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
                this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                this.readBlockZip64EndOfCentral();
              }
            },
            prepareReader: function (data) {
              var type = utils.getTypeOf(data);
              if (type === "string" && !support.uint8array)
                this.reader = new StringReader(
                  data,
                  this.loadOptions.optimizedBinaryString
                );
              else if (type === "nodebuffer")
                this.reader = new NodeBufferReader(data);
              else
                this.reader = new Uint8ArrayReader(
                  utils.transformTo("uint8array", data)
                );
            },
            load: function (data) {
              this.prepareReader(data);
              this.readEndOfCentral();
              this.readCentralDir();
              this.readLocalFiles();
            },
          };
          module.exports = ZipEntries;
        },
        {
          "./nodeBufferReader": 12,
          "./object": 13,
          "./signature": 14,
          "./stringReader": 15,
          "./support": 17,
          "./uint8ArrayReader": 18,
          "./utils": 21,
          "./zipEntry": 23,
        },
      ],
      23: [
        function (_dereq_, module, exports) {
          var StringReader = _dereq_("./stringReader");
          var utils = _dereq_("./utils");
          var CompressedObject = _dereq_("./compressedObject");
          var jszipProto = _dereq_("./object");
          function ZipEntry(options, loadOptions) {
            this.options = options;
            this.loadOptions = loadOptions;
          }
          ZipEntry.prototype = {
            isEncrypted: function () {
              return (this.bitFlag & 1) === 1;
            },
            useUTF8: function () {
              return (this.bitFlag & 2048) === 2048;
            },
            prepareCompressedContent: function (reader, from, length) {
              return function () {
                var previousIndex = reader.index;
                reader.setIndex(from);
                var compressedFileData = reader.readData(length);
                reader.setIndex(previousIndex);
                return compressedFileData;
              };
            },
            prepareContent: function (
              reader,
              from,
              length,
              compression,
              uncompressedSize
            ) {
              return function () {
                var compressedFileData = utils.transformTo(
                  compression.uncompressInputType,
                  this.getCompressedContent()
                );
                var uncompressedFileData =
                  compression.uncompress(compressedFileData);
                if (uncompressedFileData.length !== uncompressedSize)
                  throw new Error("Bug : uncompressed data size mismatch");
                return uncompressedFileData;
              };
            },
            readLocalPart: function (reader) {
              var compression, localExtraFieldsLength;
              reader.skip(22);
              this.fileNameLength = reader.readInt(2);
              localExtraFieldsLength = reader.readInt(2);
              this.fileName = reader.readString(this.fileNameLength);
              reader.skip(localExtraFieldsLength);
              if (this.compressedSize == -1 || this.uncompressedSize == -1)
                throw new Error(
                  "Bug or corrupted zip : didn't get enough informations from the central directory " +
                    "(compressedSize == -1 || uncompressedSize == -1)"
                );
              compression = utils.findCompression(this.compressionMethod);
              if (compression === null)
                throw new Error(
                  "Corrupted zip : compression " +
                    utils.pretty(this.compressionMethod) +
                    " unknown (inner file : " +
                    this.fileName +
                    ")"
                );
              this.decompressed = new CompressedObject();
              this.decompressed.compressedSize = this.compressedSize;
              this.decompressed.uncompressedSize = this.uncompressedSize;
              this.decompressed.crc32 = this.crc32;
              this.decompressed.compressionMethod = this.compressionMethod;
              this.decompressed.getCompressedContent =
                this.prepareCompressedContent(
                  reader,
                  reader.index,
                  this.compressedSize,
                  compression
                );
              this.decompressed.getContent = this.prepareContent(
                reader,
                reader.index,
                this.compressedSize,
                compression,
                this.uncompressedSize
              );
              if (this.loadOptions.checkCRC32) {
                this.decompressed = utils.transformTo(
                  "string",
                  this.decompressed.getContent()
                );
                if (jszipProto.crc32(this.decompressed) !== this.crc32)
                  throw new Error("Corrupted zip : CRC32 mismatch");
              }
            },
            readCentralPart: function (reader) {
              this.versionMadeBy = reader.readString(2);
              this.versionNeeded = reader.readInt(2);
              this.bitFlag = reader.readInt(2);
              this.compressionMethod = reader.readString(2);
              this.date = reader.readDate();
              this.crc32 = reader.readInt(4);
              this.compressedSize = reader.readInt(4);
              this.uncompressedSize = reader.readInt(4);
              this.fileNameLength = reader.readInt(2);
              this.extraFieldsLength = reader.readInt(2);
              this.fileCommentLength = reader.readInt(2);
              this.diskNumberStart = reader.readInt(2);
              this.internalFileAttributes = reader.readInt(2);
              this.externalFileAttributes = reader.readInt(4);
              this.localHeaderOffset = reader.readInt(4);
              if (this.isEncrypted())
                throw new Error("Encrypted zip are not supported");
              this.fileName = reader.readString(this.fileNameLength);
              this.readExtraFields(reader);
              this.parseZIP64ExtraField(reader);
              this.fileComment = reader.readString(this.fileCommentLength);
              this.dir = this.externalFileAttributes & 16 ? true : false;
            },
            parseZIP64ExtraField: function (reader) {
              if (!this.extraFields[1]) return;
              var extraReader = new StringReader(this.extraFields[1].value);
              if (this.uncompressedSize === utils.MAX_VALUE_32BITS)
                this.uncompressedSize = extraReader.readInt(8);
              if (this.compressedSize === utils.MAX_VALUE_32BITS)
                this.compressedSize = extraReader.readInt(8);
              if (this.localHeaderOffset === utils.MAX_VALUE_32BITS)
                this.localHeaderOffset = extraReader.readInt(8);
              if (this.diskNumberStart === utils.MAX_VALUE_32BITS)
                this.diskNumberStart = extraReader.readInt(4);
            },
            readExtraFields: function (reader) {
              var start = reader.index,
                extraFieldId,
                extraFieldLength,
                extraFieldValue;
              this.extraFields = this.extraFields || {};
              while (reader.index < start + this.extraFieldsLength) {
                extraFieldId = reader.readInt(2);
                extraFieldLength = reader.readInt(2);
                extraFieldValue = reader.readString(extraFieldLength);
                this.extraFields[extraFieldId] = {
                  id: extraFieldId,
                  length: extraFieldLength,
                  value: extraFieldValue,
                };
              }
            },
            handleUTF8: function () {
              if (this.useUTF8()) {
                this.fileName = jszipProto.utf8decode(this.fileName);
                this.fileComment = jszipProto.utf8decode(this.fileComment);
              } else {
                var upath = this.findExtraFieldUnicodePath();
                if (upath !== null) this.fileName = upath;
                var ucomment = this.findExtraFieldUnicodeComment();
                if (ucomment !== null) this.fileComment = ucomment;
              }
            },
            findExtraFieldUnicodePath: function () {
              var upathField = this.extraFields[28789];
              if (upathField) {
                var extraReader = new StringReader(upathField.value);
                if (extraReader.readInt(1) !== 1) return null;
                if (jszipProto.crc32(this.fileName) !== extraReader.readInt(4))
                  return null;
                return jszipProto.utf8decode(
                  extraReader.readString(upathField.length - 5)
                );
              }
              return null;
            },
            findExtraFieldUnicodeComment: function () {
              var ucommentField = this.extraFields[25461];
              if (ucommentField) {
                var extraReader = new StringReader(ucommentField.value);
                if (extraReader.readInt(1) !== 1) return null;
                if (
                  jszipProto.crc32(this.fileComment) !== extraReader.readInt(4)
                )
                  return null;
                return jszipProto.utf8decode(
                  extraReader.readString(ucommentField.length - 5)
                );
              }
              return null;
            },
          };
          module.exports = ZipEntry;
        },
        {
          "./compressedObject": 2,
          "./object": 13,
          "./stringReader": 15,
          "./utils": 21,
        },
      ],
      24: [
        function (_dereq_, module, exports) {
          var assign = _dereq_("./lib/utils/common").assign;
          var deflate = _dereq_("./lib/deflate");
          var inflate = _dereq_("./lib/inflate");
          var constants = _dereq_("./lib/zlib/constants");
          var pako = {};
          assign(pako, deflate, inflate, constants);
          module.exports = pako;
        },
        {
          "./lib/deflate": 25,
          "./lib/inflate": 26,
          "./lib/utils/common": 27,
          "./lib/zlib/constants": 30,
        },
      ],
      25: [
        function (_dereq_, module, exports) {
          var zlib_deflate = _dereq_("./zlib/deflate.js");
          var utils = _dereq_("./utils/common");
          var strings = _dereq_("./utils/strings");
          var msg = _dereq_("./zlib/messages");
          var zstream = _dereq_("./zlib/zstream");
          var Z_NO_FLUSH = 0;
          var Z_FINISH = 4;
          var Z_OK = 0;
          var Z_STREAM_END = 1;
          var Z_DEFAULT_COMPRESSION = -1;
          var Z_DEFAULT_STRATEGY = 0;
          var Z_DEFLATED = 8;
          var Deflate = function (options) {
            this.options = utils.assign(
              {
                level: Z_DEFAULT_COMPRESSION,
                method: Z_DEFLATED,
                chunkSize: 16384,
                windowBits: 15,
                memLevel: 8,
                strategy: Z_DEFAULT_STRATEGY,
                to: "",
              },
              options || {}
            );
            var opt = this.options;
            if (opt.raw && opt.windowBits > 0) opt.windowBits = -opt.windowBits;
            else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16)
              opt.windowBits += 16;
            this.err = 0;
            this.msg = "";
            this.ended = false;
            this.chunks = [];
            this.strm = new zstream();
            this.strm.avail_out = 0;
            var status = zlib_deflate.deflateInit2(
              this.strm,
              opt.level,
              opt.method,
              opt.windowBits,
              opt.memLevel,
              opt.strategy
            );
            if (status !== Z_OK) throw new Error(msg[status]);
            if (opt.header)
              zlib_deflate.deflateSetHeader(this.strm, opt.header);
          };
          Deflate.prototype.push = function (data, mode) {
            var strm = this.strm;
            var chunkSize = this.options.chunkSize;
            var status, _mode;
            if (this.ended) return false;
            _mode =
              mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;
            if (typeof data === "string") strm.input = strings.string2buf(data);
            else strm.input = data;
            strm.next_in = 0;
            strm.avail_in = strm.input.length;
            do {
              if (strm.avail_out === 0) {
                strm.output = new utils.Buf8(chunkSize);
                strm.next_out = 0;
                strm.avail_out = chunkSize;
              }
              status = zlib_deflate.deflate(strm, _mode);
              if (status !== Z_STREAM_END && status !== Z_OK) {
                this.onEnd(status);
                this.ended = true;
                return false;
              }
              if (
                strm.avail_out === 0 ||
                (strm.avail_in === 0 && _mode === Z_FINISH)
              )
                if (this.options.to === "string")
                  this.onData(
                    strings.buf2binstring(
                      utils.shrinkBuf(strm.output, strm.next_out)
                    )
                  );
                else this.onData(utils.shrinkBuf(strm.output, strm.next_out));
            } while (
              (strm.avail_in > 0 || strm.avail_out === 0) &&
              status !== Z_STREAM_END
            );
            if (_mode === Z_FINISH) {
              status = zlib_deflate.deflateEnd(this.strm);
              this.onEnd(status);
              this.ended = true;
              return status === Z_OK;
            }
            return true;
          };
          Deflate.prototype.onData = function (chunk) {
            this.chunks.push(chunk);
          };
          Deflate.prototype.onEnd = function (status) {
            if (status === Z_OK)
              if (this.options.to === "string")
                this.result = this.chunks.join("");
              else this.result = utils.flattenChunks(this.chunks);
            this.chunks = [];
            this.err = status;
            this.msg = this.strm.msg;
          };
          function deflate(input, options) {
            var deflator = new Deflate(options);
            deflator.push(input, true);
            if (deflator.err) throw deflator.msg;
            return deflator.result;
          }
          function deflateRaw(input, options) {
            options = options || {};
            options.raw = true;
            return deflate(input, options);
          }
          function gzip(input, options) {
            options = options || {};
            options.gzip = true;
            return deflate(input, options);
          }
          exports.Deflate = Deflate;
          exports.deflate = deflate;
          exports.deflateRaw = deflateRaw;
          exports.gzip = gzip;
        },
        {
          "./utils/common": 27,
          "./utils/strings": 28,
          "./zlib/deflate.js": 32,
          "./zlib/messages": 37,
          "./zlib/zstream": 39,
        },
      ],
      26: [
        function (_dereq_, module, exports) {
          var zlib_inflate = _dereq_("./zlib/inflate.js");
          var utils = _dereq_("./utils/common");
          var strings = _dereq_("./utils/strings");
          var c = _dereq_("./zlib/constants");
          var msg = _dereq_("./zlib/messages");
          var zstream = _dereq_("./zlib/zstream");
          var gzheader = _dereq_("./zlib/gzheader");
          var Inflate = function (options) {
            this.options = utils.assign(
              { chunkSize: 16384, windowBits: 0, to: "" },
              options || {}
            );
            var opt = this.options;
            if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
              opt.windowBits = -opt.windowBits;
              if (opt.windowBits === 0) opt.windowBits = -15;
            }
            if (
              opt.windowBits >= 0 &&
              opt.windowBits < 16 &&
              !(options && options.windowBits)
            )
              opt.windowBits += 32;
            if (opt.windowBits > 15 && opt.windowBits < 48)
              if ((opt.windowBits & 15) === 0) opt.windowBits |= 15;
            this.err = 0;
            this.msg = "";
            this.ended = false;
            this.chunks = [];
            this.strm = new zstream();
            this.strm.avail_out = 0;
            var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits);
            if (status !== c.Z_OK) throw new Error(msg[status]);
            this.header = new gzheader();
            zlib_inflate.inflateGetHeader(this.strm, this.header);
          };
          Inflate.prototype.push = function (data, mode) {
            var strm = this.strm;
            var chunkSize = this.options.chunkSize;
            var status, _mode;
            var next_out_utf8, tail, utf8str;
            if (this.ended) return false;
            _mode =
              mode === ~~mode
                ? mode
                : mode === true
                ? c.Z_FINISH
                : c.Z_NO_FLUSH;
            if (typeof data === "string")
              strm.input = strings.binstring2buf(data);
            else strm.input = data;
            strm.next_in = 0;
            strm.avail_in = strm.input.length;
            do {
              if (strm.avail_out === 0) {
                strm.output = new utils.Buf8(chunkSize);
                strm.next_out = 0;
                strm.avail_out = chunkSize;
              }
              status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
              if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
                this.onEnd(status);
                this.ended = true;
                return false;
              }
              if (strm.next_out)
                if (
                  strm.avail_out === 0 ||
                  status === c.Z_STREAM_END ||
                  (strm.avail_in === 0 && _mode === c.Z_FINISH)
                )
                  if (this.options.to === "string") {
                    next_out_utf8 = strings.utf8border(
                      strm.output,
                      strm.next_out
                    );
                    tail = strm.next_out - next_out_utf8;
                    utf8str = strings.buf2string(strm.output, next_out_utf8);
                    strm.next_out = tail;
                    strm.avail_out = chunkSize - tail;
                    if (tail)
                      utils.arraySet(
                        strm.output,
                        strm.output,
                        next_out_utf8,
                        tail,
                        0
                      );
                    this.onData(utf8str);
                  } else
                    this.onData(utils.shrinkBuf(strm.output, strm.next_out));
            } while (strm.avail_in > 0 && status !== c.Z_STREAM_END);
            if (status === c.Z_STREAM_END) _mode = c.Z_FINISH;
            if (_mode === c.Z_FINISH) {
              status = zlib_inflate.inflateEnd(this.strm);
              this.onEnd(status);
              this.ended = true;
              return status === c.Z_OK;
            }
            return true;
          };
          Inflate.prototype.onData = function (chunk) {
            this.chunks.push(chunk);
          };
          Inflate.prototype.onEnd = function (status) {
            if (status === c.Z_OK)
              if (this.options.to === "string")
                this.result = this.chunks.join("");
              else this.result = utils.flattenChunks(this.chunks);
            this.chunks = [];
            this.err = status;
            this.msg = this.strm.msg;
          };
          function inflate(input, options) {
            var inflator = new Inflate(options);
            inflator.push(input, true);
            if (inflator.err) throw inflator.msg;
            return inflator.result;
          }
          function inflateRaw(input, options) {
            options = options || {};
            options.raw = true;
            return inflate(input, options);
          }
          exports.Inflate = Inflate;
          exports.inflate = inflate;
          exports.inflateRaw = inflateRaw;
          exports.ungzip = inflate;
        },
        {
          "./utils/common": 27,
          "./utils/strings": 28,
          "./zlib/constants": 30,
          "./zlib/gzheader": 33,
          "./zlib/inflate.js": 35,
          "./zlib/messages": 37,
          "./zlib/zstream": 39,
        },
      ],
      27: [
        function (_dereq_, module, exports) {
          var TYPED_OK =
            typeof Uint8Array !== "undefined" &&
            typeof Uint16Array !== "undefined" &&
            typeof Int32Array !== "undefined";
          exports.assign = function (obj) {
            var sources = Array.prototype.slice.call(arguments, 1);
            while (sources.length) {
              var source = sources.shift();
              if (!source) continue;
              if (typeof source !== "object")
                throw new TypeError(source + "must be non-object");
              for (var p in source)
                if (source.hasOwnProperty(p)) obj[p] = source[p];
            }
            return obj;
          };
          exports.shrinkBuf = function (buf, size) {
            if (buf.length === size) return buf;
            if (buf.subarray) return buf.subarray(0, size);
            buf.length = size;
            return buf;
          };
          var fnTyped = {
            arraySet: function (dest, src, src_offs, len, dest_offs) {
              if (src.subarray && dest.subarray) {
                dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
                return;
              }
              for (var i = 0; i < len; i++)
                dest[dest_offs + i] = src[src_offs + i];
            },
            flattenChunks: function (chunks) {
              var i, l, len, pos, chunk, result;
              len = 0;
              for (i = 0, l = chunks.length; i < l; i++)
                len += chunks[i].length;
              result = new Uint8Array(len);
              pos = 0;
              for (i = 0, l = chunks.length; i < l; i++) {
                chunk = chunks[i];
                result.set(chunk, pos);
                pos += chunk.length;
              }
              return result;
            },
          };
          var fnUntyped = {
            arraySet: function (dest, src, src_offs, len, dest_offs) {
              for (var i = 0; i < len; i++)
                dest[dest_offs + i] = src[src_offs + i];
            },
            flattenChunks: function (chunks) {
              return [].concat.apply([], chunks);
            },
          };
          exports.setTyped = function (on) {
            if (on) {
              exports.Buf8 = Uint8Array;
              exports.Buf16 = Uint16Array;
              exports.Buf32 = Int32Array;
              exports.assign(exports, fnTyped);
            } else {
              exports.Buf8 = Array;
              exports.Buf16 = Array;
              exports.Buf32 = Array;
              exports.assign(exports, fnUntyped);
            }
          };
          exports.setTyped(TYPED_OK);
        },
        {},
      ],
      28: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("./common");
          var STR_APPLY_OK = true;
          var STR_APPLY_UIA_OK = true;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch (__) {
            STR_APPLY_OK = false;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (__) {
            STR_APPLY_UIA_OK = false;
          }
          var _utf8len = new utils.Buf8(256);
          for (var i = 0; i < 256; i++)
            _utf8len[i] =
              i >= 252
                ? 6
                : i >= 248
                ? 5
                : i >= 240
                ? 4
                : i >= 224
                ? 3
                : i >= 192
                ? 2
                : 1;
          _utf8len[254] = _utf8len[254] = 1;
          exports.string2buf = function (str) {
            var buf,
              c,
              c2,
              m_pos,
              i,
              str_len = str.length,
              buf_len = 0;
            for (m_pos = 0; m_pos < str_len; m_pos++) {
              c = str.charCodeAt(m_pos);
              if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
                c2 = str.charCodeAt(m_pos + 1);
                if ((c2 & 64512) === 56320) {
                  c = 65536 + ((c - 55296) << 10) + (c2 - 56320);
                  m_pos++;
                }
              }
              buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
            }
            buf = new utils.Buf8(buf_len);
            for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
              c = str.charCodeAt(m_pos);
              if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
                c2 = str.charCodeAt(m_pos + 1);
                if ((c2 & 64512) === 56320) {
                  c = 65536 + ((c - 55296) << 10) + (c2 - 56320);
                  m_pos++;
                }
              }
              if (c < 128) buf[i++] = c;
              else if (c < 2048) {
                buf[i++] = 192 | (c >>> 6);
                buf[i++] = 128 | (c & 63);
              } else if (c < 65536) {
                buf[i++] = 224 | (c >>> 12);
                buf[i++] = 128 | ((c >>> 6) & 63);
                buf[i++] = 128 | (c & 63);
              } else {
                buf[i++] = 240 | (c >>> 18);
                buf[i++] = 128 | ((c >>> 12) & 63);
                buf[i++] = 128 | ((c >>> 6) & 63);
                buf[i++] = 128 | (c & 63);
              }
            }
            return buf;
          };
          function buf2binstring(buf, len) {
            if (len < 65537)
              if (
                (buf.subarray && STR_APPLY_UIA_OK) ||
                (!buf.subarray && STR_APPLY_OK)
              )
                return String.fromCharCode.apply(
                  null,
                  utils.shrinkBuf(buf, len)
                );
            var result = "";
            for (var i = 0; i < len; i++) result += String.fromCharCode(buf[i]);
            return result;
          }
          exports.buf2binstring = function (buf) {
            return buf2binstring(buf, buf.length);
          };
          exports.binstring2buf = function (str) {
            var buf = new utils.Buf8(str.length);
            for (var i = 0, len = buf.length; i < len; i++)
              buf[i] = str.charCodeAt(i);
            return buf;
          };
          exports.buf2string = function (buf, max) {
            var i, out, c, c_len;
            var len = max || buf.length;
            var utf16buf = new Array(len * 2);
            for (out = 0, i = 0; i < len; ) {
              c = buf[i++];
              if (c < 128) {
                utf16buf[out++] = c;
                continue;
              }
              c_len = _utf8len[c];
              if (c_len > 4) {
                utf16buf[out++] = 65533;
                i += c_len - 1;
                continue;
              }
              c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
              while (c_len > 1 && i < len) {
                c = (c << 6) | (buf[i++] & 63);
                c_len--;
              }
              if (c_len > 1) {
                utf16buf[out++] = 65533;
                continue;
              }
              if (c < 65536) utf16buf[out++] = c;
              else {
                c -= 65536;
                utf16buf[out++] = 55296 | ((c >> 10) & 1023);
                utf16buf[out++] = 56320 | (c & 1023);
              }
            }
            return buf2binstring(utf16buf, out);
          };
          exports.utf8border = function (buf, max) {
            var pos;
            max = max || buf.length;
            if (max > buf.length) max = buf.length;
            pos = max - 1;
            while (pos >= 0 && (buf[pos] & 192) === 128) pos--;
            if (pos < 0) return max;
            if (pos === 0) return max;
            return pos + _utf8len[buf[pos]] > max ? pos : max;
          };
        },
        { "./common": 27 },
      ],
      29: [
        function (_dereq_, module, exports) {
          function adler32(adler, buf, len, pos) {
            var s1 = (adler & 65535) | 0,
              s2 = ((adler >>> 16) & 65535) | 0,
              n = 0;
            while (len !== 0) {
              n = len > 2e3 ? 2e3 : len;
              len -= n;
              do {
                s1 = (s1 + buf[pos++]) | 0;
                s2 = (s2 + s1) | 0;
              } while (--n);
              s1 %= 65521;
              s2 %= 65521;
            }
            return s1 | (s2 << 16) | 0;
          }
          module.exports = adler32;
        },
        {},
      ],
      30: [
        function (_dereq_, module, exports) {
          module.exports = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8,
          };
        },
        {},
      ],
      31: [
        function (_dereq_, module, exports) {
          function makeTable() {
            var c,
              table = [];
            for (var n = 0; n < 256; n++) {
              c = n;
              for (var k = 0; k < 8; k++)
                c = c & 1 ? 3988292384 ^ (c >>> 1) : c >>> 1;
              table[n] = c;
            }
            return table;
          }
          var crcTable = makeTable();
          function crc32(crc, buf, len, pos) {
            var t = crcTable,
              end = pos + len;
            crc = crc ^ -1;
            for (var i = pos; i < end; i++)
              crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 255];
            return crc ^ -1;
          }
          module.exports = crc32;
        },
        {},
      ],
      32: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("../utils/common");
          var trees = _dereq_("./trees");
          var adler32 = _dereq_("./adler32");
          var crc32 = _dereq_("./crc32");
          var msg = _dereq_("./messages");
          var Z_NO_FLUSH = 0;
          var Z_PARTIAL_FLUSH = 1;
          var Z_FULL_FLUSH = 3;
          var Z_FINISH = 4;
          var Z_BLOCK = 5;
          var Z_OK = 0;
          var Z_STREAM_END = 1;
          var Z_STREAM_ERROR = -2;
          var Z_DATA_ERROR = -3;
          var Z_BUF_ERROR = -5;
          var Z_DEFAULT_COMPRESSION = -1;
          var Z_FILTERED = 1;
          var Z_HUFFMAN_ONLY = 2;
          var Z_RLE = 3;
          var Z_FIXED = 4;
          var Z_DEFAULT_STRATEGY = 0;
          var Z_UNKNOWN = 2;
          var Z_DEFLATED = 8;
          var MAX_MEM_LEVEL = 9;
          var MAX_WBITS = 15;
          var DEF_MEM_LEVEL = 8;
          var LENGTH_CODES = 29;
          var LITERALS = 256;
          var L_CODES = LITERALS + 1 + LENGTH_CODES;
          var D_CODES = 30;
          var BL_CODES = 19;
          var HEAP_SIZE = 2 * L_CODES + 1;
          var MAX_BITS = 15;
          var MIN_MATCH = 3;
          var MAX_MATCH = 258;
          var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
          var PRESET_DICT = 32;
          var INIT_STATE = 42;
          var EXTRA_STATE = 69;
          var NAME_STATE = 73;
          var COMMENT_STATE = 91;
          var HCRC_STATE = 103;
          var BUSY_STATE = 113;
          var FINISH_STATE = 666;
          var BS_NEED_MORE = 1;
          var BS_BLOCK_DONE = 2;
          var BS_FINISH_STARTED = 3;
          var BS_FINISH_DONE = 4;
          var OS_CODE = 3;
          function err(strm, errorCode) {
            strm.msg = msg[errorCode];
            return errorCode;
          }
          function rank(f) {
            return (f << 1) - (f > 4 ? 9 : 0);
          }
          function zero(buf) {
            var len = buf.length;
            while (--len >= 0) buf[len] = 0;
          }
          function flush_pending(strm) {
            var s = strm.state;
            var len = s.pending;
            if (len > strm.avail_out) len = strm.avail_out;
            if (len === 0) return;
            utils.arraySet(
              strm.output,
              s.pending_buf,
              s.pending_out,
              len,
              strm.next_out
            );
            strm.next_out += len;
            s.pending_out += len;
            strm.total_out += len;
            strm.avail_out -= len;
            s.pending -= len;
            if (s.pending === 0) s.pending_out = 0;
          }
          function flush_block_only(s, last) {
            trees._tr_flush_block(
              s,
              s.block_start >= 0 ? s.block_start : -1,
              s.strstart - s.block_start,
              last
            );
            s.block_start = s.strstart;
            flush_pending(s.strm);
          }
          function put_byte(s, b) {
            s.pending_buf[s.pending++] = b;
          }
          function putShortMSB(s, b) {
            s.pending_buf[s.pending++] = (b >>> 8) & 255;
            s.pending_buf[s.pending++] = b & 255;
          }
          function read_buf(strm, buf, start, size) {
            var len = strm.avail_in;
            if (len > size) len = size;
            if (len === 0) return 0;
            strm.avail_in -= len;
            utils.arraySet(buf, strm.input, strm.next_in, len, start);
            if (strm.state.wrap === 1)
              strm.adler = adler32(strm.adler, buf, len, start);
            else if (strm.state.wrap === 2)
              strm.adler = crc32(strm.adler, buf, len, start);
            strm.next_in += len;
            strm.total_in += len;
            return len;
          }
          function longest_match(s, cur_match) {
            var chain_length = s.max_chain_length;
            var scan = s.strstart;
            var match;
            var len;
            var best_len = s.prev_length;
            var nice_match = s.nice_match;
            var limit =
              s.strstart > s.w_size - MIN_LOOKAHEAD
                ? s.strstart - (s.w_size - MIN_LOOKAHEAD)
                : 0;
            var _win = s.window;
            var wmask = s.w_mask;
            var prev = s.prev;
            var strend = s.strstart + MAX_MATCH;
            var scan_end1 = _win[scan + best_len - 1];
            var scan_end = _win[scan + best_len];
            if (s.prev_length >= s.good_match) chain_length >>= 2;
            if (nice_match > s.lookahead) nice_match = s.lookahead;
            do {
              match = cur_match;
              if (
                _win[match + best_len] !== scan_end ||
                _win[match + best_len - 1] !== scan_end1 ||
                _win[match] !== _win[scan] ||
                _win[++match] !== _win[scan + 1]
              )
                continue;
              scan += 2;
              match++;
              do;
              while (
                _win[++scan] === _win[++match] &&
                _win[++scan] === _win[++match] &&
                _win[++scan] === _win[++match] &&
                _win[++scan] === _win[++match] &&
                _win[++scan] === _win[++match] &&
                _win[++scan] === _win[++match] &&
                _win[++scan] === _win[++match] &&
                _win[++scan] === _win[++match] &&
                scan < strend
              );
              len = MAX_MATCH - (strend - scan);
              scan = strend - MAX_MATCH;
              if (len > best_len) {
                s.match_start = cur_match;
                best_len = len;
                if (len >= nice_match) break;
                scan_end1 = _win[scan + best_len - 1];
                scan_end = _win[scan + best_len];
              }
            } while (
              (cur_match = prev[cur_match & wmask]) > limit &&
              --chain_length !== 0
            );
            if (best_len <= s.lookahead) return best_len;
            return s.lookahead;
          }
          function fill_window(s) {
            var _w_size = s.w_size;
            var p, n, m, more, str;
            do {
              more = s.window_size - s.lookahead - s.strstart;
              if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
                utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
                s.match_start -= _w_size;
                s.strstart -= _w_size;
                s.block_start -= _w_size;
                n = s.hash_size;
                p = n;
                do {
                  m = s.head[--p];
                  s.head[p] = m >= _w_size ? m - _w_size : 0;
                } while (--n);
                n = _w_size;
                p = n;
                do {
                  m = s.prev[--p];
                  s.prev[p] = m >= _w_size ? m - _w_size : 0;
                } while (--n);
                more += _w_size;
              }
              if (s.strm.avail_in === 0) break;
              n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
              s.lookahead += n;
              if (s.lookahead + s.insert >= MIN_MATCH) {
                str = s.strstart - s.insert;
                s.ins_h = s.window[str];
                s.ins_h =
                  ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
                while (s.insert) {
                  s.ins_h =
                    ((s.ins_h << s.hash_shift) ^
                      s.window[str + MIN_MATCH - 1]) &
                    s.hash_mask;
                  s.prev[str & s.w_mask] = s.head[s.ins_h];
                  s.head[s.ins_h] = str;
                  str++;
                  s.insert--;
                  if (s.lookahead + s.insert < MIN_MATCH) break;
                }
              }
            } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
          }
          function deflate_stored(s, flush) {
            var max_block_size = 65535;
            if (max_block_size > s.pending_buf_size - 5)
              max_block_size = s.pending_buf_size - 5;
            for (;;) {
              if (s.lookahead <= 1) {
                fill_window(s);
                if (s.lookahead === 0 && flush === Z_NO_FLUSH)
                  return BS_NEED_MORE;
                if (s.lookahead === 0) break;
              }
              s.strstart += s.lookahead;
              s.lookahead = 0;
              var max_start = s.block_start + max_block_size;
              if (s.strstart === 0 || s.strstart >= max_start) {
                s.lookahead = s.strstart - max_start;
                s.strstart = max_start;
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) return BS_NEED_MORE;
              }
              if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) return BS_NEED_MORE;
              }
            }
            s.insert = 0;
            if (flush === Z_FINISH) {
              flush_block_only(s, true);
              if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
              return BS_FINISH_DONE;
            }
            if (s.strstart > s.block_start) {
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) return BS_NEED_MORE;
            }
            return BS_NEED_MORE;
          }
          function deflate_fast(s, flush) {
            var hash_head;
            var bflush;
            for (;;) {
              if (s.lookahead < MIN_LOOKAHEAD) {
                fill_window(s);
                if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH)
                  return BS_NEED_MORE;
                if (s.lookahead === 0) break;
              }
              hash_head = 0;
              if (s.lookahead >= MIN_MATCH) {
                s.ins_h =
                  ((s.ins_h << s.hash_shift) ^
                    s.window[s.strstart + MIN_MATCH - 1]) &
                  s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              }
              if (
                hash_head !== 0 &&
                s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD
              )
                s.match_length = longest_match(s, hash_head);
              if (s.match_length >= MIN_MATCH) {
                bflush = trees._tr_tally(
                  s,
                  s.strstart - s.match_start,
                  s.match_length - MIN_MATCH
                );
                s.lookahead -= s.match_length;
                if (
                  s.match_length <= s.max_lazy_match &&
                  s.lookahead >= MIN_MATCH
                ) {
                  s.match_length--;
                  do {
                    s.strstart++;
                    s.ins_h =
                      ((s.ins_h << s.hash_shift) ^
                        s.window[s.strstart + MIN_MATCH - 1]) &
                      s.hash_mask;
                    hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                    s.head[s.ins_h] = s.strstart;
                  } while (--s.match_length !== 0);
                  s.strstart++;
                } else {
                  s.strstart += s.match_length;
                  s.match_length = 0;
                  s.ins_h = s.window[s.strstart];
                  s.ins_h =
                    ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) &
                    s.hash_mask;
                }
              } else {
                bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
                s.lookahead--;
                s.strstart++;
              }
              if (bflush) {
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) return BS_NEED_MORE;
              }
            }
            s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
            if (flush === Z_FINISH) {
              flush_block_only(s, true);
              if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
              return BS_FINISH_DONE;
            }
            if (s.last_lit) {
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) return BS_NEED_MORE;
            }
            return BS_BLOCK_DONE;
          }
          function deflate_slow(s, flush) {
            var hash_head;
            var bflush;
            var max_insert;
            for (;;) {
              if (s.lookahead < MIN_LOOKAHEAD) {
                fill_window(s);
                if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH)
                  return BS_NEED_MORE;
                if (s.lookahead === 0) break;
              }
              hash_head = 0;
              if (s.lookahead >= MIN_MATCH) {
                s.ins_h =
                  ((s.ins_h << s.hash_shift) ^
                    s.window[s.strstart + MIN_MATCH - 1]) &
                  s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              }
              s.prev_length = s.match_length;
              s.prev_match = s.match_start;
              s.match_length = MIN_MATCH - 1;
              if (
                hash_head !== 0 &&
                s.prev_length < s.max_lazy_match &&
                s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD
              ) {
                s.match_length = longest_match(s, hash_head);
                if (
                  s.match_length <= 5 &&
                  (s.strategy === Z_FILTERED ||
                    (s.match_length === MIN_MATCH &&
                      s.strstart - s.match_start > 4096))
                )
                  s.match_length = MIN_MATCH - 1;
              }
              if (
                s.prev_length >= MIN_MATCH &&
                s.match_length <= s.prev_length
              ) {
                max_insert = s.strstart + s.lookahead - MIN_MATCH;
                bflush = trees._tr_tally(
                  s,
                  s.strstart - 1 - s.prev_match,
                  s.prev_length - MIN_MATCH
                );
                s.lookahead -= s.prev_length - 1;
                s.prev_length -= 2;
                do
                  if (++s.strstart <= max_insert) {
                    s.ins_h =
                      ((s.ins_h << s.hash_shift) ^
                        s.window[s.strstart + MIN_MATCH - 1]) &
                      s.hash_mask;
                    hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                    s.head[s.ins_h] = s.strstart;
                  }
                while (--s.prev_length !== 0);
                s.match_available = 0;
                s.match_length = MIN_MATCH - 1;
                s.strstart++;
                if (bflush) {
                  flush_block_only(s, false);
                  if (s.strm.avail_out === 0) return BS_NEED_MORE;
                }
              } else if (s.match_available) {
                bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
                if (bflush) flush_block_only(s, false);
                s.strstart++;
                s.lookahead--;
                if (s.strm.avail_out === 0) return BS_NEED_MORE;
              } else {
                s.match_available = 1;
                s.strstart++;
                s.lookahead--;
              }
            }
            if (s.match_available) {
              bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
              s.match_available = 0;
            }
            s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
            if (flush === Z_FINISH) {
              flush_block_only(s, true);
              if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
              return BS_FINISH_DONE;
            }
            if (s.last_lit) {
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) return BS_NEED_MORE;
            }
            return BS_BLOCK_DONE;
          }
          function deflate_rle(s, flush) {
            var bflush;
            var prev;
            var scan, strend;
            var _win = s.window;
            for (;;) {
              if (s.lookahead <= MAX_MATCH) {
                fill_window(s);
                if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH)
                  return BS_NEED_MORE;
                if (s.lookahead === 0) break;
              }
              s.match_length = 0;
              if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
                scan = s.strstart - 1;
                prev = _win[scan];
                if (
                  prev === _win[++scan] &&
                  prev === _win[++scan] &&
                  prev === _win[++scan]
                ) {
                  strend = s.strstart + MAX_MATCH;
                  do;
                  while (
                    prev === _win[++scan] &&
                    prev === _win[++scan] &&
                    prev === _win[++scan] &&
                    prev === _win[++scan] &&
                    prev === _win[++scan] &&
                    prev === _win[++scan] &&
                    prev === _win[++scan] &&
                    prev === _win[++scan] &&
                    scan < strend
                  );
                  s.match_length = MAX_MATCH - (strend - scan);
                  if (s.match_length > s.lookahead)
                    s.match_length = s.lookahead;
                }
              }
              if (s.match_length >= MIN_MATCH) {
                bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
                s.lookahead -= s.match_length;
                s.strstart += s.match_length;
                s.match_length = 0;
              } else {
                bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
                s.lookahead--;
                s.strstart++;
              }
              if (bflush) {
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) return BS_NEED_MORE;
              }
            }
            s.insert = 0;
            if (flush === Z_FINISH) {
              flush_block_only(s, true);
              if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
              return BS_FINISH_DONE;
            }
            if (s.last_lit) {
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) return BS_NEED_MORE;
            }
            return BS_BLOCK_DONE;
          }
          function deflate_huff(s, flush) {
            var bflush;
            for (;;) {
              if (s.lookahead === 0) {
                fill_window(s);
                if (s.lookahead === 0) {
                  if (flush === Z_NO_FLUSH) return BS_NEED_MORE;
                  break;
                }
              }
              s.match_length = 0;
              bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
              s.lookahead--;
              s.strstart++;
              if (bflush) {
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) return BS_NEED_MORE;
              }
            }
            s.insert = 0;
            if (flush === Z_FINISH) {
              flush_block_only(s, true);
              if (s.strm.avail_out === 0) return BS_FINISH_STARTED;
              return BS_FINISH_DONE;
            }
            if (s.last_lit) {
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) return BS_NEED_MORE;
            }
            return BS_BLOCK_DONE;
          }
          var Config = function (
            good_length,
            max_lazy,
            nice_length,
            max_chain,
            func
          ) {
            this.good_length = good_length;
            this.max_lazy = max_lazy;
            this.nice_length = nice_length;
            this.max_chain = max_chain;
            this.func = func;
          };
          var configuration_table;
          configuration_table = [
            new Config(0, 0, 0, 0, deflate_stored),
            new Config(4, 4, 8, 4, deflate_fast),
            new Config(4, 5, 16, 8, deflate_fast),
            new Config(4, 6, 32, 32, deflate_fast),
            new Config(4, 4, 16, 16, deflate_slow),
            new Config(8, 16, 32, 32, deflate_slow),
            new Config(8, 16, 128, 128, deflate_slow),
            new Config(8, 32, 128, 256, deflate_slow),
            new Config(32, 128, 258, 1024, deflate_slow),
            new Config(32, 258, 258, 4096, deflate_slow),
          ];
          function lm_init(s) {
            s.window_size = 2 * s.w_size;
            zero(s.head);
            s.max_lazy_match = configuration_table[s.level].max_lazy;
            s.good_match = configuration_table[s.level].good_length;
            s.nice_match = configuration_table[s.level].nice_length;
            s.max_chain_length = configuration_table[s.level].max_chain;
            s.strstart = 0;
            s.block_start = 0;
            s.lookahead = 0;
            s.insert = 0;
            s.match_length = s.prev_length = MIN_MATCH - 1;
            s.match_available = 0;
            s.ins_h = 0;
          }
          function DeflateState() {
            this.strm = null;
            this.status = 0;
            this.pending_buf = null;
            this.pending_buf_size = 0;
            this.pending_out = 0;
            this.pending = 0;
            this.wrap = 0;
            this.gzhead = null;
            this.gzindex = 0;
            this.method = Z_DEFLATED;
            this.last_flush = -1;
            this.w_size = 0;
            this.w_bits = 0;
            this.w_mask = 0;
            this.window = null;
            this.window_size = 0;
            this.prev = null;
            this.head = null;
            this.ins_h = 0;
            this.hash_size = 0;
            this.hash_bits = 0;
            this.hash_mask = 0;
            this.hash_shift = 0;
            this.block_start = 0;
            this.match_length = 0;
            this.prev_match = 0;
            this.match_available = 0;
            this.strstart = 0;
            this.match_start = 0;
            this.lookahead = 0;
            this.prev_length = 0;
            this.max_chain_length = 0;
            this.max_lazy_match = 0;
            this.level = 0;
            this.strategy = 0;
            this.good_match = 0;
            this.nice_match = 0;
            this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
            this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
            this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
            zero(this.dyn_ltree);
            zero(this.dyn_dtree);
            zero(this.bl_tree);
            this.l_desc = null;
            this.d_desc = null;
            this.bl_desc = null;
            this.bl_count = new utils.Buf16(MAX_BITS + 1);
            this.heap = new utils.Buf16(2 * L_CODES + 1);
            zero(this.heap);
            this.heap_len = 0;
            this.heap_max = 0;
            this.depth = new utils.Buf16(2 * L_CODES + 1);
            zero(this.depth);
            this.l_buf = 0;
            this.lit_bufsize = 0;
            this.last_lit = 0;
            this.d_buf = 0;
            this.opt_len = 0;
            this.static_len = 0;
            this.matches = 0;
            this.insert = 0;
            this.bi_buf = 0;
            this.bi_valid = 0;
          }
          function deflateResetKeep(strm) {
            var s;
            if (!strm || !strm.state) return err(strm, Z_STREAM_ERROR);
            strm.total_in = strm.total_out = 0;
            strm.data_type = Z_UNKNOWN;
            s = strm.state;
            s.pending = 0;
            s.pending_out = 0;
            if (s.wrap < 0) s.wrap = -s.wrap;
            s.status = s.wrap ? INIT_STATE : BUSY_STATE;
            strm.adler = s.wrap === 2 ? 0 : 1;
            s.last_flush = Z_NO_FLUSH;
            trees._tr_init(s);
            return Z_OK;
          }
          function deflateReset(strm) {
            var ret = deflateResetKeep(strm);
            if (ret === Z_OK) lm_init(strm.state);
            return ret;
          }
          function deflateSetHeader(strm, head) {
            if (!strm || !strm.state) return Z_STREAM_ERROR;
            if (strm.state.wrap !== 2) return Z_STREAM_ERROR;
            strm.state.gzhead = head;
            return Z_OK;
          }
          function deflateInit2(
            strm,
            level,
            method,
            windowBits,
            memLevel,
            strategy
          ) {
            if (!strm) return Z_STREAM_ERROR;
            var wrap = 1;
            if (level === Z_DEFAULT_COMPRESSION) level = 6;
            if (windowBits < 0) {
              wrap = 0;
              windowBits = -windowBits;
            } else if (windowBits > 15) {
              wrap = 2;
              windowBits -= 16;
            }
            if (
              memLevel < 1 ||
              memLevel > MAX_MEM_LEVEL ||
              method !== Z_DEFLATED ||
              windowBits < 8 ||
              windowBits > 15 ||
              level < 0 ||
              level > 9 ||
              strategy < 0 ||
              strategy > Z_FIXED
            )
              return err(strm, Z_STREAM_ERROR);
            if (windowBits === 8) windowBits = 9;
            var s = new DeflateState();
            strm.state = s;
            s.strm = strm;
            s.wrap = wrap;
            s.gzhead = null;
            s.w_bits = windowBits;
            s.w_size = 1 << s.w_bits;
            s.w_mask = s.w_size - 1;
            s.hash_bits = memLevel + 7;
            s.hash_size = 1 << s.hash_bits;
            s.hash_mask = s.hash_size - 1;
            s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
            s.window = new utils.Buf8(s.w_size * 2);
            s.head = new utils.Buf16(s.hash_size);
            s.prev = new utils.Buf16(s.w_size);
            s.lit_bufsize = 1 << (memLevel + 6);
            s.pending_buf_size = s.lit_bufsize * 4;
            s.pending_buf = new utils.Buf8(s.pending_buf_size);
            s.d_buf = s.lit_bufsize >> 1;
            s.l_buf = (1 + 2) * s.lit_bufsize;
            s.level = level;
            s.strategy = strategy;
            s.method = method;
            return deflateReset(strm);
          }
          function deflateInit(strm, level) {
            return deflateInit2(
              strm,
              level,
              Z_DEFLATED,
              MAX_WBITS,
              DEF_MEM_LEVEL,
              Z_DEFAULT_STRATEGY
            );
          }
          function deflate(strm, flush) {
            var old_flush, s;
            var beg, val;
            if (!strm || !strm.state || flush > Z_BLOCK || flush < 0)
              return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
            s = strm.state;
            if (
              !strm.output ||
              (!strm.input && strm.avail_in !== 0) ||
              (s.status === FINISH_STATE && flush !== Z_FINISH)
            )
              return err(
                strm,
                strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR
              );
            s.strm = strm;
            old_flush = s.last_flush;
            s.last_flush = flush;
            if (s.status === INIT_STATE)
              if (s.wrap === 2) {
                strm.adler = 0;
                put_byte(s, 31);
                put_byte(s, 139);
                put_byte(s, 8);
                if (!s.gzhead) {
                  put_byte(s, 0);
                  put_byte(s, 0);
                  put_byte(s, 0);
                  put_byte(s, 0);
                  put_byte(s, 0);
                  put_byte(
                    s,
                    s.level === 9
                      ? 2
                      : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2
                      ? 4
                      : 0
                  );
                  put_byte(s, OS_CODE);
                  s.status = BUSY_STATE;
                } else {
                  put_byte(
                    s,
                    (s.gzhead.text ? 1 : 0) +
                      (s.gzhead.hcrc ? 2 : 0) +
                      (!s.gzhead.extra ? 0 : 4) +
                      (!s.gzhead.name ? 0 : 8) +
                      (!s.gzhead.comment ? 0 : 16)
                  );
                  put_byte(s, s.gzhead.time & 255);
                  put_byte(s, (s.gzhead.time >> 8) & 255);
                  put_byte(s, (s.gzhead.time >> 16) & 255);
                  put_byte(s, (s.gzhead.time >> 24) & 255);
                  put_byte(
                    s,
                    s.level === 9
                      ? 2
                      : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2
                      ? 4
                      : 0
                  );
                  put_byte(s, s.gzhead.os & 255);
                  if (s.gzhead.extra && s.gzhead.extra.length) {
                    put_byte(s, s.gzhead.extra.length & 255);
                    put_byte(s, (s.gzhead.extra.length >> 8) & 255);
                  }
                  if (s.gzhead.hcrc)
                    strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
                  s.gzindex = 0;
                  s.status = EXTRA_STATE;
                }
              } else {
                var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
                var level_flags = -1;
                if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2)
                  level_flags = 0;
                else if (s.level < 6) level_flags = 1;
                else if (s.level === 6) level_flags = 2;
                else level_flags = 3;
                header |= level_flags << 6;
                if (s.strstart !== 0) header |= PRESET_DICT;
                header += 31 - (header % 31);
                s.status = BUSY_STATE;
                putShortMSB(s, header);
                if (s.strstart !== 0) {
                  putShortMSB(s, strm.adler >>> 16);
                  putShortMSB(s, strm.adler & 65535);
                }
                strm.adler = 1;
              }
            if (s.status === EXTRA_STATE)
              if (s.gzhead.extra) {
                beg = s.pending;
                while (s.gzindex < (s.gzhead.extra.length & 65535)) {
                  if (s.pending === s.pending_buf_size) {
                    if (s.gzhead.hcrc && s.pending > beg)
                      strm.adler = crc32(
                        strm.adler,
                        s.pending_buf,
                        s.pending - beg,
                        beg
                      );
                    flush_pending(strm);
                    beg = s.pending;
                    if (s.pending === s.pending_buf_size) break;
                  }
                  put_byte(s, s.gzhead.extra[s.gzindex] & 255);
                  s.gzindex++;
                }
                if (s.gzhead.hcrc && s.pending > beg)
                  strm.adler = crc32(
                    strm.adler,
                    s.pending_buf,
                    s.pending - beg,
                    beg
                  );
                if (s.gzindex === s.gzhead.extra.length) {
                  s.gzindex = 0;
                  s.status = NAME_STATE;
                }
              } else s.status = NAME_STATE;
            if (s.status === NAME_STATE)
              if (s.gzhead.name) {
                beg = s.pending;
                do {
                  if (s.pending === s.pending_buf_size) {
                    if (s.gzhead.hcrc && s.pending > beg)
                      strm.adler = crc32(
                        strm.adler,
                        s.pending_buf,
                        s.pending - beg,
                        beg
                      );
                    flush_pending(strm);
                    beg = s.pending;
                    if (s.pending === s.pending_buf_size) {
                      val = 1;
                      break;
                    }
                  }
                  if (s.gzindex < s.gzhead.name.length)
                    val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
                  else val = 0;
                  put_byte(s, val);
                } while (val !== 0);
                if (s.gzhead.hcrc && s.pending > beg)
                  strm.adler = crc32(
                    strm.adler,
                    s.pending_buf,
                    s.pending - beg,
                    beg
                  );
                if (val === 0) {
                  s.gzindex = 0;
                  s.status = COMMENT_STATE;
                }
              } else s.status = COMMENT_STATE;
            if (s.status === COMMENT_STATE)
              if (s.gzhead.comment) {
                beg = s.pending;
                do {
                  if (s.pending === s.pending_buf_size) {
                    if (s.gzhead.hcrc && s.pending > beg)
                      strm.adler = crc32(
                        strm.adler,
                        s.pending_buf,
                        s.pending - beg,
                        beg
                      );
                    flush_pending(strm);
                    beg = s.pending;
                    if (s.pending === s.pending_buf_size) {
                      val = 1;
                      break;
                    }
                  }
                  if (s.gzindex < s.gzhead.comment.length)
                    val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
                  else val = 0;
                  put_byte(s, val);
                } while (val !== 0);
                if (s.gzhead.hcrc && s.pending > beg)
                  strm.adler = crc32(
                    strm.adler,
                    s.pending_buf,
                    s.pending - beg,
                    beg
                  );
                if (val === 0) s.status = HCRC_STATE;
              } else s.status = HCRC_STATE;
            if (s.status === HCRC_STATE)
              if (s.gzhead.hcrc) {
                if (s.pending + 2 > s.pending_buf_size) flush_pending(strm);
                if (s.pending + 2 <= s.pending_buf_size) {
                  put_byte(s, strm.adler & 255);
                  put_byte(s, (strm.adler >> 8) & 255);
                  strm.adler = 0;
                  s.status = BUSY_STATE;
                }
              } else s.status = BUSY_STATE;
            if (s.pending !== 0) {
              flush_pending(strm);
              if (strm.avail_out === 0) {
                s.last_flush = -1;
                return Z_OK;
              }
            } else if (
              strm.avail_in === 0 &&
              rank(flush) <= rank(old_flush) &&
              flush !== Z_FINISH
            )
              return err(strm, Z_BUF_ERROR);
            if (s.status === FINISH_STATE && strm.avail_in !== 0)
              return err(strm, Z_BUF_ERROR);
            if (
              strm.avail_in !== 0 ||
              s.lookahead !== 0 ||
              (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)
            ) {
              var bstate =
                s.strategy === Z_HUFFMAN_ONLY
                  ? deflate_huff(s, flush)
                  : s.strategy === Z_RLE
                  ? deflate_rle(s, flush)
                  : configuration_table[s.level].func(s, flush);
              if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE)
                s.status = FINISH_STATE;
              if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
                if (strm.avail_out === 0) s.last_flush = -1;
                return Z_OK;
              }
              if (bstate === BS_BLOCK_DONE) {
                if (flush === Z_PARTIAL_FLUSH) trees._tr_align(s);
                else if (flush !== Z_BLOCK) {
                  trees._tr_stored_block(s, 0, 0, false);
                  if (flush === Z_FULL_FLUSH) {
                    zero(s.head);
                    if (s.lookahead === 0) {
                      s.strstart = 0;
                      s.block_start = 0;
                      s.insert = 0;
                    }
                  }
                }
                flush_pending(strm);
                if (strm.avail_out === 0) {
                  s.last_flush = -1;
                  return Z_OK;
                }
              }
            }
            if (flush !== Z_FINISH) return Z_OK;
            if (s.wrap <= 0) return Z_STREAM_END;
            if (s.wrap === 2) {
              put_byte(s, strm.adler & 255);
              put_byte(s, (strm.adler >> 8) & 255);
              put_byte(s, (strm.adler >> 16) & 255);
              put_byte(s, (strm.adler >> 24) & 255);
              put_byte(s, strm.total_in & 255);
              put_byte(s, (strm.total_in >> 8) & 255);
              put_byte(s, (strm.total_in >> 16) & 255);
              put_byte(s, (strm.total_in >> 24) & 255);
            } else {
              putShortMSB(s, strm.adler >>> 16);
              putShortMSB(s, strm.adler & 65535);
            }
            flush_pending(strm);
            if (s.wrap > 0) s.wrap = -s.wrap;
            return s.pending !== 0 ? Z_OK : Z_STREAM_END;
          }
          function deflateEnd(strm) {
            var status;
            if (!strm || !strm.state) return Z_STREAM_ERROR;
            status = strm.state.status;
            if (
              status !== INIT_STATE &&
              status !== EXTRA_STATE &&
              status !== NAME_STATE &&
              status !== COMMENT_STATE &&
              status !== HCRC_STATE &&
              status !== BUSY_STATE &&
              status !== FINISH_STATE
            )
              return err(strm, Z_STREAM_ERROR);
            strm.state = null;
            return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
          }
          exports.deflateInit = deflateInit;
          exports.deflateInit2 = deflateInit2;
          exports.deflateReset = deflateReset;
          exports.deflateResetKeep = deflateResetKeep;
          exports.deflateSetHeader = deflateSetHeader;
          exports.deflate = deflate;
          exports.deflateEnd = deflateEnd;
          exports.deflateInfo = "pako deflate (from Nodeca project)";
        },
        {
          "../utils/common": 27,
          "./adler32": 29,
          "./crc32": 31,
          "./messages": 37,
          "./trees": 38,
        },
      ],
      33: [
        function (_dereq_, module, exports) {
          function GZheader() {
            this.text = 0;
            this.time = 0;
            this.xflags = 0;
            this.os = 0;
            this.extra = null;
            this.extra_len = 0;
            this.name = "";
            this.comment = "";
            this.hcrc = 0;
            this.done = false;
          }
          module.exports = GZheader;
        },
        {},
      ],
      34: [
        function (_dereq_, module, exports) {
          var BAD = 30;
          var TYPE = 12;
          module.exports = function inflate_fast(strm, start) {
            var state;
            var _in;
            var last;
            var _out;
            var beg;
            var end;
            var dmax;
            var wsize;
            var whave;
            var wnext;
            var window;
            var hold;
            var bits;
            var lcode;
            var dcode;
            var lmask;
            var dmask;
            var here;
            var op;
            var len;
            var dist;
            var from;
            var from_source;
            var input, output;
            state = strm.state;
            _in = strm.next_in;
            input = strm.input;
            last = _in + (strm.avail_in - 5);
            _out = strm.next_out;
            output = strm.output;
            beg = _out - (start - strm.avail_out);
            end = _out + (strm.avail_out - 257);
            dmax = state.dmax;
            wsize = state.wsize;
            whave = state.whave;
            wnext = state.wnext;
            window = state.window;
            hold = state.hold;
            bits = state.bits;
            lcode = state.lencode;
            dcode = state.distcode;
            lmask = (1 << state.lenbits) - 1;
            dmask = (1 << state.distbits) - 1;
            top: do {
              if (bits < 15) {
                hold += input[_in++] << bits;
                bits += 8;
                hold += input[_in++] << bits;
                bits += 8;
              }
              here = lcode[hold & lmask];
              dolen: for (;;) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = (here >>> 16) & 255;
                if (op === 0) output[_out++] = here & 65535;
                else if (op & 16) {
                  len = here & 65535;
                  op &= 15;
                  if (op) {
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                    len += hold & ((1 << op) - 1);
                    hold >>>= op;
                    bits -= op;
                  }
                  if (bits < 15) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                  here = dcode[hold & dmask];
                  dodist: for (;;) {
                    op = here >>> 24;
                    hold >>>= op;
                    bits -= op;
                    op = (here >>> 16) & 255;
                    if (op & 16) {
                      dist = here & 65535;
                      op &= 15;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                        }
                      }
                      dist += hold & ((1 << op) - 1);
                      if (dist > dmax) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD;
                        break top;
                      }
                      hold >>>= op;
                      bits -= op;
                      op = _out - beg;
                      if (dist > op) {
                        op = dist - op;
                        if (op > whave)
                          if (state.sane) {
                            strm.msg = "invalid distance too far back";
                            state.mode = BAD;
                            break top;
                          }
                        from = 0;
                        from_source = window;
                        if (wnext === 0) {
                          from += wsize - op;
                          if (op < len) {
                            len -= op;
                            do output[_out++] = window[from++];
                            while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        } else if (wnext < op) {
                          from += wsize + wnext - op;
                          op -= wnext;
                          if (op < len) {
                            len -= op;
                            do output[_out++] = window[from++];
                            while (--op);
                            from = 0;
                            if (wnext < len) {
                              op = wnext;
                              len -= op;
                              do output[_out++] = window[from++];
                              while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          }
                        } else {
                          from += wnext - op;
                          if (op < len) {
                            len -= op;
                            do output[_out++] = window[from++];
                            while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                        while (len > 2) {
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          len -= 3;
                        }
                        if (len) {
                          output[_out++] = from_source[from++];
                          if (len > 1) output[_out++] = from_source[from++];
                        }
                      } else {
                        from = _out - dist;
                        do {
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          len -= 3;
                        } while (len > 2);
                        if (len) {
                          output[_out++] = output[from++];
                          if (len > 1) output[_out++] = output[from++];
                        }
                      }
                    } else if ((op & 64) === 0) {
                      here = dcode[(here & 65535) + (hold & ((1 << op) - 1))];
                      continue dodist;
                    } else {
                      strm.msg = "invalid distance code";
                      state.mode = BAD;
                      break top;
                    }
                    break;
                  }
                } else if ((op & 64) === 0) {
                  here = lcode[(here & 65535) + (hold & ((1 << op) - 1))];
                  continue dolen;
                } else if (op & 32) {
                  state.mode = TYPE;
                  break top;
                } else {
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD;
                  break top;
                }
                break;
              }
            } while (_in < last && _out < end);
            len = bits >> 3;
            _in -= len;
            bits -= len << 3;
            hold &= (1 << bits) - 1;
            strm.next_in = _in;
            strm.next_out = _out;
            strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
            strm.avail_out =
              _out < end ? 257 + (end - _out) : 257 - (_out - end);
            state.hold = hold;
            state.bits = bits;
            return;
          };
        },
        {},
      ],
      35: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("../utils/common");
          var adler32 = _dereq_("./adler32");
          var crc32 = _dereq_("./crc32");
          var inflate_fast = _dereq_("./inffast");
          var inflate_table = _dereq_("./inftrees");
          var CODES = 0;
          var LENS = 1;
          var DISTS = 2;
          var Z_FINISH = 4;
          var Z_BLOCK = 5;
          var Z_TREES = 6;
          var Z_OK = 0;
          var Z_STREAM_END = 1;
          var Z_NEED_DICT = 2;
          var Z_STREAM_ERROR = -2;
          var Z_DATA_ERROR = -3;
          var Z_MEM_ERROR = -4;
          var Z_BUF_ERROR = -5;
          var Z_DEFLATED = 8;
          var HEAD = 1;
          var FLAGS = 2;
          var TIME = 3;
          var OS = 4;
          var EXLEN = 5;
          var EXTRA = 6;
          var NAME = 7;
          var COMMENT = 8;
          var HCRC = 9;
          var DICTID = 10;
          var DICT = 11;
          var TYPE = 12;
          var TYPEDO = 13;
          var STORED = 14;
          var COPY_ = 15;
          var COPY = 16;
          var TABLE = 17;
          var LENLENS = 18;
          var CODELENS = 19;
          var LEN_ = 20;
          var LEN = 21;
          var LENEXT = 22;
          var DIST = 23;
          var DISTEXT = 24;
          var MATCH = 25;
          var LIT = 26;
          var CHECK = 27;
          var LENGTH = 28;
          var DONE = 29;
          var BAD = 30;
          var MEM = 31;
          var SYNC = 32;
          var ENOUGH_LENS = 852;
          var ENOUGH_DISTS = 592;
          var MAX_WBITS = 15;
          var DEF_WBITS = MAX_WBITS;
          function ZSWAP32(q) {
            return (
              ((q >>> 24) & 255) +
              ((q >>> 8) & 65280) +
              ((q & 65280) << 8) +
              ((q & 255) << 24)
            );
          }
          function InflateState() {
            this.mode = 0;
            this.last = false;
            this.wrap = 0;
            this.havedict = false;
            this.flags = 0;
            this.dmax = 0;
            this.check = 0;
            this.total = 0;
            this.head = null;
            this.wbits = 0;
            this.wsize = 0;
            this.whave = 0;
            this.wnext = 0;
            this.window = null;
            this.hold = 0;
            this.bits = 0;
            this.length = 0;
            this.offset = 0;
            this.extra = 0;
            this.lencode = null;
            this.distcode = null;
            this.lenbits = 0;
            this.distbits = 0;
            this.ncode = 0;
            this.nlen = 0;
            this.ndist = 0;
            this.have = 0;
            this.next = null;
            this.lens = new utils.Buf16(320);
            this.work = new utils.Buf16(288);
            this.lendyn = null;
            this.distdyn = null;
            this.sane = 0;
            this.back = 0;
            this.was = 0;
          }
          function inflateResetKeep(strm) {
            var state;
            if (!strm || !strm.state) return Z_STREAM_ERROR;
            state = strm.state;
            strm.total_in = strm.total_out = state.total = 0;
            strm.msg = "";
            if (state.wrap) strm.adler = state.wrap & 1;
            state.mode = HEAD;
            state.last = 0;
            state.havedict = 0;
            state.dmax = 32768;
            state.head = null;
            state.hold = 0;
            state.bits = 0;
            state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
            state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
            state.sane = 1;
            state.back = -1;
            return Z_OK;
          }
          function inflateReset(strm) {
            var state;
            if (!strm || !strm.state) return Z_STREAM_ERROR;
            state = strm.state;
            state.wsize = 0;
            state.whave = 0;
            state.wnext = 0;
            return inflateResetKeep(strm);
          }
          function inflateReset2(strm, windowBits) {
            var wrap;
            var state;
            if (!strm || !strm.state) return Z_STREAM_ERROR;
            state = strm.state;
            if (windowBits < 0) {
              wrap = 0;
              windowBits = -windowBits;
            } else {
              wrap = (windowBits >> 4) + 1;
              if (windowBits < 48) windowBits &= 15;
            }
            if (windowBits && (windowBits < 8 || windowBits > 15))
              return Z_STREAM_ERROR;
            if (state.window !== null && state.wbits !== windowBits)
              state.window = null;
            state.wrap = wrap;
            state.wbits = windowBits;
            return inflateReset(strm);
          }
          function inflateInit2(strm, windowBits) {
            var ret;
            var state;
            if (!strm) return Z_STREAM_ERROR;
            state = new InflateState();
            strm.state = state;
            state.window = null;
            ret = inflateReset2(strm, windowBits);
            if (ret !== Z_OK) strm.state = null;
            return ret;
          }
          function inflateInit(strm) {
            return inflateInit2(strm, DEF_WBITS);
          }
          var virgin = true;
          var lenfix, distfix;
          function fixedtables(state) {
            if (virgin) {
              var sym;
              lenfix = new utils.Buf32(512);
              distfix = new utils.Buf32(32);
              sym = 0;
              while (sym < 144) state.lens[sym++] = 8;
              while (sym < 256) state.lens[sym++] = 9;
              while (sym < 280) state.lens[sym++] = 7;
              while (sym < 288) state.lens[sym++] = 8;
              inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
                bits: 9,
              });
              sym = 0;
              while (sym < 32) state.lens[sym++] = 5;
              inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
                bits: 5,
              });
              virgin = false;
            }
            state.lencode = lenfix;
            state.lenbits = 9;
            state.distcode = distfix;
            state.distbits = 5;
          }
          function updatewindow(strm, src, end, copy) {
            var dist;
            var state = strm.state;
            if (state.window === null) {
              state.wsize = 1 << state.wbits;
              state.wnext = 0;
              state.whave = 0;
              state.window = new utils.Buf8(state.wsize);
            }
            if (copy >= state.wsize) {
              utils.arraySet(
                state.window,
                src,
                end - state.wsize,
                state.wsize,
                0
              );
              state.wnext = 0;
              state.whave = state.wsize;
            } else {
              dist = state.wsize - state.wnext;
              if (dist > copy) dist = copy;
              utils.arraySet(state.window, src, end - copy, dist, state.wnext);
              copy -= dist;
              if (copy) {
                utils.arraySet(state.window, src, end - copy, copy, 0);
                state.wnext = copy;
                state.whave = state.wsize;
              } else {
                state.wnext += dist;
                if (state.wnext === state.wsize) state.wnext = 0;
                if (state.whave < state.wsize) state.whave += dist;
              }
            }
            return 0;
          }
          function inflate(strm, flush) {
            var state;
            var input, output;
            var next;
            var put;
            var have, left;
            var hold;
            var bits;
            var _in, _out;
            var copy;
            var from;
            var from_source;
            var here = 0;
            var here_bits, here_op, here_val;
            var last_bits, last_op, last_val;
            var len;
            var ret;
            var hbuf = new utils.Buf8(4);
            var opts;
            var n;
            var order = [
              16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
            ];
            if (
              !strm ||
              !strm.state ||
              !strm.output ||
              (!strm.input && strm.avail_in !== 0)
            )
              return Z_STREAM_ERROR;
            state = strm.state;
            if (state.mode === TYPE) state.mode = TYPEDO;
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            _in = have;
            _out = left;
            ret = Z_OK;
            inf_leave: for (;;)
              switch (state.mode) {
                case HEAD:
                  if (state.wrap === 0) {
                    state.mode = TYPEDO;
                    break;
                  }
                  while (bits < 16) {
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (state.wrap & 2 && hold === 35615) {
                    state.check = 0;
                    hbuf[0] = hold & 255;
                    hbuf[1] = (hold >>> 8) & 255;
                    state.check = crc32(state.check, hbuf, 2, 0);
                    hold = 0;
                    bits = 0;
                    state.mode = FLAGS;
                    break;
                  }
                  state.flags = 0;
                  if (state.head) state.head.done = false;
                  if (
                    !(state.wrap & 1) ||
                    (((hold & 255) << 8) + (hold >> 8)) % 31
                  ) {
                    strm.msg = "incorrect header check";
                    state.mode = BAD;
                    break;
                  }
                  if ((hold & 15) !== Z_DEFLATED) {
                    strm.msg = "unknown compression method";
                    state.mode = BAD;
                    break;
                  }
                  hold >>>= 4;
                  bits -= 4;
                  len = (hold & 15) + 8;
                  if (state.wbits === 0) state.wbits = len;
                  else if (len > state.wbits) {
                    strm.msg = "invalid window size";
                    state.mode = BAD;
                    break;
                  }
                  state.dmax = 1 << len;
                  strm.adler = state.check = 1;
                  state.mode = hold & 512 ? DICTID : TYPE;
                  hold = 0;
                  bits = 0;
                  break;
                case FLAGS:
                  while (bits < 16) {
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.flags = hold;
                  if ((state.flags & 255) !== Z_DEFLATED) {
                    strm.msg = "unknown compression method";
                    state.mode = BAD;
                    break;
                  }
                  if (state.flags & 57344) {
                    strm.msg = "unknown header flags set";
                    state.mode = BAD;
                    break;
                  }
                  if (state.head) state.head.text = (hold >> 8) & 1;
                  if (state.flags & 512) {
                    hbuf[0] = hold & 255;
                    hbuf[1] = (hold >>> 8) & 255;
                    state.check = crc32(state.check, hbuf, 2, 0);
                  }
                  hold = 0;
                  bits = 0;
                  state.mode = TIME;
                case TIME:
                  while (bits < 32) {
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (state.head) state.head.time = hold;
                  if (state.flags & 512) {
                    hbuf[0] = hold & 255;
                    hbuf[1] = (hold >>> 8) & 255;
                    hbuf[2] = (hold >>> 16) & 255;
                    hbuf[3] = (hold >>> 24) & 255;
                    state.check = crc32(state.check, hbuf, 4, 0);
                  }
                  hold = 0;
                  bits = 0;
                  state.mode = OS;
                case OS:
                  while (bits < 16) {
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (state.head) {
                    state.head.xflags = hold & 255;
                    state.head.os = hold >> 8;
                  }
                  if (state.flags & 512) {
                    hbuf[0] = hold & 255;
                    hbuf[1] = (hold >>> 8) & 255;
                    state.check = crc32(state.check, hbuf, 2, 0);
                  }
                  hold = 0;
                  bits = 0;
                  state.mode = EXLEN;
                case EXLEN:
                  if (state.flags & 1024) {
                    while (bits < 16) {
                      if (have === 0) break inf_leave;
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    state.length = hold;
                    if (state.head) state.head.extra_len = hold;
                    if (state.flags & 512) {
                      hbuf[0] = hold & 255;
                      hbuf[1] = (hold >>> 8) & 255;
                      state.check = crc32(state.check, hbuf, 2, 0);
                    }
                    hold = 0;
                    bits = 0;
                  } else if (state.head) state.head.extra = null;
                  state.mode = EXTRA;
                case EXTRA:
                  if (state.flags & 1024) {
                    copy = state.length;
                    if (copy > have) copy = have;
                    if (copy) {
                      if (state.head) {
                        len = state.head.extra_len - state.length;
                        if (!state.head.extra)
                          state.head.extra = new Array(state.head.extra_len);
                        utils.arraySet(
                          state.head.extra,
                          input,
                          next,
                          copy,
                          len
                        );
                      }
                      if (state.flags & 512)
                        state.check = crc32(state.check, input, copy, next);
                      have -= copy;
                      next += copy;
                      state.length -= copy;
                    }
                    if (state.length) break inf_leave;
                  }
                  state.length = 0;
                  state.mode = NAME;
                case NAME:
                  if (state.flags & 2048) {
                    if (have === 0) break inf_leave;
                    copy = 0;
                    do {
                      len = input[next + copy++];
                      if (state.head && len && state.length < 65536)
                        state.head.name += String.fromCharCode(len);
                    } while (len && copy < have);
                    if (state.flags & 512)
                      state.check = crc32(state.check, input, copy, next);
                    have -= copy;
                    next += copy;
                    if (len) break inf_leave;
                  } else if (state.head) state.head.name = null;
                  state.length = 0;
                  state.mode = COMMENT;
                case COMMENT:
                  if (state.flags & 4096) {
                    if (have === 0) break inf_leave;
                    copy = 0;
                    do {
                      len = input[next + copy++];
                      if (state.head && len && state.length < 65536)
                        state.head.comment += String.fromCharCode(len);
                    } while (len && copy < have);
                    if (state.flags & 512)
                      state.check = crc32(state.check, input, copy, next);
                    have -= copy;
                    next += copy;
                    if (len) break inf_leave;
                  } else if (state.head) state.head.comment = null;
                  state.mode = HCRC;
                case HCRC:
                  if (state.flags & 512) {
                    while (bits < 16) {
                      if (have === 0) break inf_leave;
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    if (hold !== (state.check & 65535)) {
                      strm.msg = "header crc mismatch";
                      state.mode = BAD;
                      break;
                    }
                    hold = 0;
                    bits = 0;
                  }
                  if (state.head) {
                    state.head.hcrc = (state.flags >> 9) & 1;
                    state.head.done = true;
                  }
                  strm.adler = state.check = 0;
                  state.mode = TYPE;
                  break;
                case DICTID:
                  while (bits < 32) {
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  strm.adler = state.check = ZSWAP32(hold);
                  hold = 0;
                  bits = 0;
                  state.mode = DICT;
                case DICT:
                  if (state.havedict === 0) {
                    strm.next_out = put;
                    strm.avail_out = left;
                    strm.next_in = next;
                    strm.avail_in = have;
                    state.hold = hold;
                    state.bits = bits;
                    return Z_NEED_DICT;
                  }
                  strm.adler = state.check = 1;
                  state.mode = TYPE;
                case TYPE:
                  if (flush === Z_BLOCK || flush === Z_TREES) break inf_leave;
                case TYPEDO:
                  if (state.last) {
                    hold >>>= bits & 7;
                    bits -= bits & 7;
                    state.mode = CHECK;
                    break;
                  }
                  while (bits < 3) {
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.last = hold & 1;
                  hold >>>= 1;
                  bits -= 1;
                  switch (hold & 3) {
                    case 0:
                      state.mode = STORED;
                      break;
                    case 1:
                      fixedtables(state);
                      state.mode = LEN_;
                      if (flush === Z_TREES) {
                        hold >>>= 2;
                        bits -= 2;
                        break inf_leave;
                      }
                      break;
                    case 2:
                      state.mode = TABLE;
                      break;
                    case 3:
                      strm.msg = "invalid block type";
                      state.mode = BAD;
                  }
                  hold >>>= 2;
                  bits -= 2;
                  break;
                case STORED:
                  hold >>>= bits & 7;
                  bits -= bits & 7;
                  while (bits < 32) {
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if ((hold & 65535) !== ((hold >>> 16) ^ 65535)) {
                    strm.msg = "invalid stored block lengths";
                    state.mode = BAD;
                    break;
                  }
                  state.length = hold & 65535;
                  hold = 0;
                  bits = 0;
                  state.mode = COPY_;
                  if (flush === Z_TREES) break inf_leave;
                case COPY_:
                  state.mode = COPY;
                case COPY:
                  copy = state.length;
                  if (copy) {
                    if (copy > have) copy = have;
                    if (copy > left) copy = left;
                    if (copy === 0) break inf_leave;
                    utils.arraySet(output, input, next, copy, put);
                    have -= copy;
                    next += copy;
                    left -= copy;
                    put += copy;
                    state.length -= copy;
                    break;
                  }
                  state.mode = TYPE;
                  break;
                case TABLE:
                  while (bits < 14) {
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.nlen = (hold & 31) + 257;
                  hold >>>= 5;
                  bits -= 5;
                  state.ndist = (hold & 31) + 1;
                  hold >>>= 5;
                  bits -= 5;
                  state.ncode = (hold & 15) + 4;
                  hold >>>= 4;
                  bits -= 4;
                  if (state.nlen > 286 || state.ndist > 30) {
                    strm.msg = "too many length or distance symbols";
                    state.mode = BAD;
                    break;
                  }
                  state.have = 0;
                  state.mode = LENLENS;
                case LENLENS:
                  while (state.have < state.ncode) {
                    while (bits < 3) {
                      if (have === 0) break inf_leave;
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    state.lens[order[state.have++]] = hold & 7;
                    hold >>>= 3;
                    bits -= 3;
                  }
                  while (state.have < 19) state.lens[order[state.have++]] = 0;
                  state.lencode = state.lendyn;
                  state.lenbits = 7;
                  opts = { bits: state.lenbits };
                  ret = inflate_table(
                    CODES,
                    state.lens,
                    0,
                    19,
                    state.lencode,
                    0,
                    state.work,
                    opts
                  );
                  state.lenbits = opts.bits;
                  if (ret) {
                    strm.msg = "invalid code lengths set";
                    state.mode = BAD;
                    break;
                  }
                  state.have = 0;
                  state.mode = CODELENS;
                case CODELENS:
                  while (state.have < state.nlen + state.ndist) {
                    for (;;) {
                      here = state.lencode[hold & ((1 << state.lenbits) - 1)];
                      here_bits = here >>> 24;
                      here_op = (here >>> 16) & 255;
                      here_val = here & 65535;
                      if (here_bits <= bits) break;
                      if (have === 0) break inf_leave;
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    if (here_val < 16) {
                      hold >>>= here_bits;
                      bits -= here_bits;
                      state.lens[state.have++] = here_val;
                    } else {
                      if (here_val === 16) {
                        n = here_bits + 2;
                        while (bits < n) {
                          if (have === 0) break inf_leave;
                          have--;
                          hold += input[next++] << bits;
                          bits += 8;
                        }
                        hold >>>= here_bits;
                        bits -= here_bits;
                        if (state.have === 0) {
                          strm.msg = "invalid bit length repeat";
                          state.mode = BAD;
                          break;
                        }
                        len = state.lens[state.have - 1];
                        copy = 3 + (hold & 3);
                        hold >>>= 2;
                        bits -= 2;
                      } else if (here_val === 17) {
                        n = here_bits + 3;
                        while (bits < n) {
                          if (have === 0) break inf_leave;
                          have--;
                          hold += input[next++] << bits;
                          bits += 8;
                        }
                        hold >>>= here_bits;
                        bits -= here_bits;
                        len = 0;
                        copy = 3 + (hold & 7);
                        hold >>>= 3;
                        bits -= 3;
                      } else {
                        n = here_bits + 7;
                        while (bits < n) {
                          if (have === 0) break inf_leave;
                          have--;
                          hold += input[next++] << bits;
                          bits += 8;
                        }
                        hold >>>= here_bits;
                        bits -= here_bits;
                        len = 0;
                        copy = 11 + (hold & 127);
                        hold >>>= 7;
                        bits -= 7;
                      }
                      if (state.have + copy > state.nlen + state.ndist) {
                        strm.msg = "invalid bit length repeat";
                        state.mode = BAD;
                        break;
                      }
                      while (copy--) state.lens[state.have++] = len;
                    }
                  }
                  if (state.mode === BAD) break;
                  if (state.lens[256] === 0) {
                    strm.msg = "invalid code -- missing end-of-block";
                    state.mode = BAD;
                    break;
                  }
                  state.lenbits = 9;
                  opts = { bits: state.lenbits };
                  ret = inflate_table(
                    LENS,
                    state.lens,
                    0,
                    state.nlen,
                    state.lencode,
                    0,
                    state.work,
                    opts
                  );
                  state.lenbits = opts.bits;
                  if (ret) {
                    strm.msg = "invalid literal/lengths set";
                    state.mode = BAD;
                    break;
                  }
                  state.distbits = 6;
                  state.distcode = state.distdyn;
                  opts = { bits: state.distbits };
                  ret = inflate_table(
                    DISTS,
                    state.lens,
                    state.nlen,
                    state.ndist,
                    state.distcode,
                    0,
                    state.work,
                    opts
                  );
                  state.distbits = opts.bits;
                  if (ret) {
                    strm.msg = "invalid distances set";
                    state.mode = BAD;
                    break;
                  }
                  state.mode = LEN_;
                  if (flush === Z_TREES) break inf_leave;
                case LEN_:
                  state.mode = LEN;
                case LEN:
                  if (have >= 6 && left >= 258) {
                    strm.next_out = put;
                    strm.avail_out = left;
                    strm.next_in = next;
                    strm.avail_in = have;
                    state.hold = hold;
                    state.bits = bits;
                    inflate_fast(strm, _out);
                    put = strm.next_out;
                    output = strm.output;
                    left = strm.avail_out;
                    next = strm.next_in;
                    input = strm.input;
                    have = strm.avail_in;
                    hold = state.hold;
                    bits = state.bits;
                    if (state.mode === TYPE) state.back = -1;
                    break;
                  }
                  state.back = 0;
                  for (;;) {
                    here = state.lencode[hold & ((1 << state.lenbits) - 1)];
                    here_bits = here >>> 24;
                    here_op = (here >>> 16) & 255;
                    here_val = here & 65535;
                    if (here_bits <= bits) break;
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (here_op && (here_op & 240) === 0) {
                    last_bits = here_bits;
                    last_op = here_op;
                    last_val = here_val;
                    for (;;) {
                      here =
                        state.lencode[
                          last_val +
                            ((hold & ((1 << (last_bits + last_op)) - 1)) >>
                              last_bits)
                        ];
                      here_bits = here >>> 24;
                      here_op = (here >>> 16) & 255;
                      here_val = here & 65535;
                      if (last_bits + here_bits <= bits) break;
                      if (have === 0) break inf_leave;
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= last_bits;
                    bits -= last_bits;
                    state.back += last_bits;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  state.back += here_bits;
                  state.length = here_val;
                  if (here_op === 0) {
                    state.mode = LIT;
                    break;
                  }
                  if (here_op & 32) {
                    state.back = -1;
                    state.mode = TYPE;
                    break;
                  }
                  if (here_op & 64) {
                    strm.msg = "invalid literal/length code";
                    state.mode = BAD;
                    break;
                  }
                  state.extra = here_op & 15;
                  state.mode = LENEXT;
                case LENEXT:
                  if (state.extra) {
                    n = state.extra;
                    while (bits < n) {
                      if (have === 0) break inf_leave;
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    state.length += hold & ((1 << state.extra) - 1);
                    hold >>>= state.extra;
                    bits -= state.extra;
                    state.back += state.extra;
                  }
                  state.was = state.length;
                  state.mode = DIST;
                case DIST:
                  for (;;) {
                    here = state.distcode[hold & ((1 << state.distbits) - 1)];
                    here_bits = here >>> 24;
                    here_op = (here >>> 16) & 255;
                    here_val = here & 65535;
                    if (here_bits <= bits) break;
                    if (have === 0) break inf_leave;
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if ((here_op & 240) === 0) {
                    last_bits = here_bits;
                    last_op = here_op;
                    last_val = here_val;
                    for (;;) {
                      here =
                        state.distcode[
                          last_val +
                            ((hold & ((1 << (last_bits + last_op)) - 1)) >>
                              last_bits)
                        ];
                      here_bits = here >>> 24;
                      here_op = (here >>> 16) & 255;
                      here_val = here & 65535;
                      if (last_bits + here_bits <= bits) break;
                      if (have === 0) break inf_leave;
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= last_bits;
                    bits -= last_bits;
                    state.back += last_bits;
                  }
                  hold >>>= here_bits;
                  bits -= here_bits;
                  state.back += here_bits;
                  if (here_op & 64) {
                    strm.msg = "invalid distance code";
                    state.mode = BAD;
                    break;
                  }
                  state.offset = here_val;
                  state.extra = here_op & 15;
                  state.mode = DISTEXT;
                case DISTEXT:
                  if (state.extra) {
                    n = state.extra;
                    while (bits < n) {
                      if (have === 0) break inf_leave;
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    state.offset += hold & ((1 << state.extra) - 1);
                    hold >>>= state.extra;
                    bits -= state.extra;
                    state.back += state.extra;
                  }
                  if (state.offset > state.dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD;
                    break;
                  }
                  state.mode = MATCH;
                case MATCH:
                  if (left === 0) break inf_leave;
                  copy = _out - left;
                  if (state.offset > copy) {
                    copy = state.offset - copy;
                    if (copy > state.whave)
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD;
                        break;
                      }
                    if (copy > state.wnext) {
                      copy -= state.wnext;
                      from = state.wsize - copy;
                    } else from = state.wnext - copy;
                    if (copy > state.length) copy = state.length;
                    from_source = state.window;
                  } else {
                    from_source = output;
                    from = put - state.offset;
                    copy = state.length;
                  }
                  if (copy > left) copy = left;
                  left -= copy;
                  state.length -= copy;
                  do output[put++] = from_source[from++];
                  while (--copy);
                  if (state.length === 0) state.mode = LEN;
                  break;
                case LIT:
                  if (left === 0) break inf_leave;
                  output[put++] = state.length;
                  left--;
                  state.mode = LEN;
                  break;
                case CHECK:
                  if (state.wrap) {
                    while (bits < 32) {
                      if (have === 0) break inf_leave;
                      have--;
                      hold |= input[next++] << bits;
                      bits += 8;
                    }
                    _out -= left;
                    strm.total_out += _out;
                    state.total += _out;
                    if (_out)
                      strm.adler = state.check = state.flags
                        ? crc32(state.check, output, _out, put - _out)
                        : adler32(state.check, output, _out, put - _out);
                    _out = left;
                    if ((state.flags ? hold : ZSWAP32(hold)) !== state.check) {
                      strm.msg = "incorrect data check";
                      state.mode = BAD;
                      break;
                    }
                    hold = 0;
                    bits = 0;
                  }
                  state.mode = LENGTH;
                case LENGTH:
                  if (state.wrap && state.flags) {
                    while (bits < 32) {
                      if (have === 0) break inf_leave;
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    if (hold !== (state.total & 4294967295)) {
                      strm.msg = "incorrect length check";
                      state.mode = BAD;
                      break;
                    }
                    hold = 0;
                    bits = 0;
                  }
                  state.mode = DONE;
                case DONE:
                  ret = Z_STREAM_END;
                  break inf_leave;
                case BAD:
                  ret = Z_DATA_ERROR;
                  break inf_leave;
                case MEM:
                  return Z_MEM_ERROR;
                case SYNC:
                default:
                  return Z_STREAM_ERROR;
              }
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            if (
              state.wsize ||
              (_out !== strm.avail_out &&
                state.mode < BAD &&
                (state.mode < CHECK || flush !== Z_FINISH))
            )
              if (
                updatewindow(
                  strm,
                  strm.output,
                  strm.next_out,
                  _out - strm.avail_out
                )
              ) {
                state.mode = MEM;
                return Z_MEM_ERROR;
              }
            _in -= strm.avail_in;
            _out -= strm.avail_out;
            strm.total_in += _in;
            strm.total_out += _out;
            state.total += _out;
            if (state.wrap && _out)
              strm.adler = state.check = state.flags
                ? crc32(state.check, output, _out, strm.next_out - _out)
                : adler32(state.check, output, _out, strm.next_out - _out);
            strm.data_type =
              state.bits +
              (state.last ? 64 : 0) +
              (state.mode === TYPE ? 128 : 0) +
              (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
            if (
              ((_in === 0 && _out === 0) || flush === Z_FINISH) &&
              ret === Z_OK
            )
              ret = Z_BUF_ERROR;
            return ret;
          }
          function inflateEnd(strm) {
            if (!strm || !strm.state) return Z_STREAM_ERROR;
            var state = strm.state;
            if (state.window) state.window = null;
            strm.state = null;
            return Z_OK;
          }
          function inflateGetHeader(strm, head) {
            var state;
            if (!strm || !strm.state) return Z_STREAM_ERROR;
            state = strm.state;
            if ((state.wrap & 2) === 0) return Z_STREAM_ERROR;
            state.head = head;
            head.done = false;
            return Z_OK;
          }
          exports.inflateReset = inflateReset;
          exports.inflateReset2 = inflateReset2;
          exports.inflateResetKeep = inflateResetKeep;
          exports.inflateInit = inflateInit;
          exports.inflateInit2 = inflateInit2;
          exports.inflate = inflate;
          exports.inflateEnd = inflateEnd;
          exports.inflateGetHeader = inflateGetHeader;
          exports.inflateInfo = "pako inflate (from Nodeca project)";
        },
        {
          "../utils/common": 27,
          "./adler32": 29,
          "./crc32": 31,
          "./inffast": 34,
          "./inftrees": 36,
        },
      ],
      36: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("../utils/common");
          var MAXBITS = 15;
          var ENOUGH_LENS = 852;
          var ENOUGH_DISTS = 592;
          var CODES = 0;
          var LENS = 1;
          var DISTS = 2;
          var lbase = [
            3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51,
            59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
          ];
          var lext = [
            16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19,
            19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
          ];
          var dbase = [
            1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
            513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385,
            24577, 0, 0,
          ];
          var dext = [
            16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23,
            23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
          ];
          module.exports = function inflate_table(
            type,
            lens,
            lens_index,
            codes,
            table,
            table_index,
            work,
            opts
          ) {
            var bits = opts.bits;
            var len = 0;
            var sym = 0;
            var min = 0,
              max = 0;
            var root = 0;
            var curr = 0;
            var drop = 0;
            var left = 0;
            var used = 0;
            var huff = 0;
            var incr;
            var fill;
            var low;
            var mask;
            var next;
            var base = null;
            var base_index = 0;
            var end;
            var count = new utils.Buf16(MAXBITS + 1);
            var offs = new utils.Buf16(MAXBITS + 1);
            var extra = null;
            var extra_index = 0;
            var here_bits, here_op, here_val;
            for (len = 0; len <= MAXBITS; len++) count[len] = 0;
            for (sym = 0; sym < codes; sym++) count[lens[lens_index + sym]]++;
            root = bits;
            for (max = MAXBITS; max >= 1; max--) if (count[max] !== 0) break;
            if (root > max) root = max;
            if (max === 0) {
              table[table_index++] = (1 << 24) | (64 << 16) | 0;
              table[table_index++] = (1 << 24) | (64 << 16) | 0;
              opts.bits = 1;
              return 0;
            }
            for (min = 1; min < max; min++) if (count[min] !== 0) break;
            if (root < min) root = min;
            left = 1;
            for (len = 1; len <= MAXBITS; len++) {
              left <<= 1;
              left -= count[len];
              if (left < 0) return -1;
            }
            if (left > 0 && (type === CODES || max !== 1)) return -1;
            offs[1] = 0;
            for (len = 1; len < MAXBITS; len++)
              offs[len + 1] = offs[len] + count[len];
            for (sym = 0; sym < codes; sym++)
              if (lens[lens_index + sym] !== 0)
                work[offs[lens[lens_index + sym]]++] = sym;
            if (type === CODES) {
              base = extra = work;
              end = 19;
            } else if (type === LENS) {
              base = lbase;
              base_index -= 257;
              extra = lext;
              extra_index -= 257;
              end = 256;
            } else {
              base = dbase;
              extra = dext;
              end = -1;
            }
            huff = 0;
            sym = 0;
            len = min;
            next = table_index;
            curr = root;
            drop = 0;
            low = -1;
            used = 1 << root;
            mask = used - 1;
            if (
              (type === LENS && used > ENOUGH_LENS) ||
              (type === DISTS && used > ENOUGH_DISTS)
            )
              return 1;
            var i = 0;
            for (;;) {
              i++;
              here_bits = len - drop;
              if (work[sym] < end) {
                here_op = 0;
                here_val = work[sym];
              } else if (work[sym] > end) {
                here_op = extra[extra_index + work[sym]];
                here_val = base[base_index + work[sym]];
              } else {
                here_op = 32 + 64;
                here_val = 0;
              }
              incr = 1 << (len - drop);
              fill = 1 << curr;
              min = fill;
              do {
                fill -= incr;
                table[next + (huff >> drop) + fill] =
                  (here_bits << 24) | (here_op << 16) | here_val | 0;
              } while (fill !== 0);
              incr = 1 << (len - 1);
              while (huff & incr) incr >>= 1;
              if (incr !== 0) {
                huff &= incr - 1;
                huff += incr;
              } else huff = 0;
              sym++;
              if (--count[len] === 0) {
                if (len === max) break;
                len = lens[lens_index + work[sym]];
              }
              if (len > root && (huff & mask) !== low) {
                if (drop === 0) drop = root;
                next += min;
                curr = len - drop;
                left = 1 << curr;
                while (curr + drop < max) {
                  left -= count[curr + drop];
                  if (left <= 0) break;
                  curr++;
                  left <<= 1;
                }
                used += 1 << curr;
                if (
                  (type === LENS && used > ENOUGH_LENS) ||
                  (type === DISTS && used > ENOUGH_DISTS)
                )
                  return 1;
                low = huff & mask;
                table[low] =
                  (root << 24) | (curr << 16) | (next - table_index) | 0;
              }
            }
            if (huff !== 0)
              table[next + huff] = ((len - drop) << 24) | (64 << 16) | 0;
            opts.bits = root;
            return 0;
          };
        },
        { "../utils/common": 27 },
      ],
      37: [
        function (_dereq_, module, exports) {
          module.exports = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version",
          };
        },
        {},
      ],
      38: [
        function (_dereq_, module, exports) {
          var utils = _dereq_("../utils/common");
          var Z_FIXED = 4;
          var Z_BINARY = 0;
          var Z_TEXT = 1;
          var Z_UNKNOWN = 2;
          function zero(buf) {
            var len = buf.length;
            while (--len >= 0) buf[len] = 0;
          }
          var STORED_BLOCK = 0;
          var STATIC_TREES = 1;
          var DYN_TREES = 2;
          var MIN_MATCH = 3;
          var MAX_MATCH = 258;
          var LENGTH_CODES = 29;
          var LITERALS = 256;
          var L_CODES = LITERALS + 1 + LENGTH_CODES;
          var D_CODES = 30;
          var BL_CODES = 19;
          var HEAP_SIZE = 2 * L_CODES + 1;
          var MAX_BITS = 15;
          var Buf_size = 16;
          var MAX_BL_BITS = 7;
          var END_BLOCK = 256;
          var REP_3_6 = 16;
          var REPZ_3_10 = 17;
          var REPZ_11_138 = 18;
          var extra_lbits = [
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
            4, 5, 5, 5, 5, 0,
          ];
          var extra_dbits = [
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
            10, 10, 11, 11, 12, 12, 13, 13,
          ];
          var extra_blbits = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
          ];
          var bl_order = [
            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
          ];
          var DIST_CODE_LEN = 512;
          var static_ltree = new Array((L_CODES + 2) * 2);
          zero(static_ltree);
          var static_dtree = new Array(D_CODES * 2);
          zero(static_dtree);
          var _dist_code = new Array(DIST_CODE_LEN);
          zero(_dist_code);
          var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
          zero(_length_code);
          var base_length = new Array(LENGTH_CODES);
          zero(base_length);
          var base_dist = new Array(D_CODES);
          zero(base_dist);
          var StaticTreeDesc = function (
            static_tree,
            extra_bits,
            extra_base,
            elems,
            max_length
          ) {
            this.static_tree = static_tree;
            this.extra_bits = extra_bits;
            this.extra_base = extra_base;
            this.elems = elems;
            this.max_length = max_length;
            this.has_stree = static_tree && static_tree.length;
          };
          var static_l_desc;
          var static_d_desc;
          var static_bl_desc;
          var TreeDesc = function (dyn_tree, stat_desc) {
            this.dyn_tree = dyn_tree;
            this.max_code = 0;
            this.stat_desc = stat_desc;
          };
          function d_code(dist) {
            return dist < 256
              ? _dist_code[dist]
              : _dist_code[256 + (dist >>> 7)];
          }
          function put_short(s, w) {
            s.pending_buf[s.pending++] = w & 255;
            s.pending_buf[s.pending++] = (w >>> 8) & 255;
          }
          function send_bits(s, value, length) {
            if (s.bi_valid > Buf_size - length) {
              s.bi_buf |= (value << s.bi_valid) & 65535;
              put_short(s, s.bi_buf);
              s.bi_buf = value >> (Buf_size - s.bi_valid);
              s.bi_valid += length - Buf_size;
            } else {
              s.bi_buf |= (value << s.bi_valid) & 65535;
              s.bi_valid += length;
            }
          }
          function send_code(s, c, tree) {
            send_bits(s, tree[c * 2], tree[c * 2 + 1]);
          }
          function bi_reverse(code, len) {
            var res = 0;
            do {
              res |= code & 1;
              code >>>= 1;
              res <<= 1;
            } while (--len > 0);
            return res >>> 1;
          }
          function bi_flush(s) {
            if (s.bi_valid === 16) {
              put_short(s, s.bi_buf);
              s.bi_buf = 0;
              s.bi_valid = 0;
            } else if (s.bi_valid >= 8) {
              s.pending_buf[s.pending++] = s.bi_buf & 255;
              s.bi_buf >>= 8;
              s.bi_valid -= 8;
            }
          }
          function gen_bitlen(s, desc) {
            var tree = desc.dyn_tree;
            var max_code = desc.max_code;
            var stree = desc.stat_desc.static_tree;
            var has_stree = desc.stat_desc.has_stree;
            var extra = desc.stat_desc.extra_bits;
            var base = desc.stat_desc.extra_base;
            var max_length = desc.stat_desc.max_length;
            var h;
            var n, m;
            var bits;
            var xbits;
            var f;
            var overflow = 0;
            for (bits = 0; bits <= MAX_BITS; bits++) s.bl_count[bits] = 0;
            tree[s.heap[s.heap_max] * 2 + 1] = 0;
            for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
              n = s.heap[h];
              bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
              if (bits > max_length) {
                bits = max_length;
                overflow++;
              }
              tree[n * 2 + 1] = bits;
              if (n > max_code) continue;
              s.bl_count[bits]++;
              xbits = 0;
              if (n >= base) xbits = extra[n - base];
              f = tree[n * 2];
              s.opt_len += f * (bits + xbits);
              if (has_stree) s.static_len += f * (stree[n * 2 + 1] + xbits);
            }
            if (overflow === 0) return;
            do {
              bits = max_length - 1;
              while (s.bl_count[bits] === 0) bits--;
              s.bl_count[bits]--;
              s.bl_count[bits + 1] += 2;
              s.bl_count[max_length]--;
              overflow -= 2;
            } while (overflow > 0);
            for (bits = max_length; bits !== 0; bits--) {
              n = s.bl_count[bits];
              while (n !== 0) {
                m = s.heap[--h];
                if (m > max_code) continue;
                if (tree[m * 2 + 1] !== bits) {
                  s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
                  tree[m * 2 + 1] = bits;
                }
                n--;
              }
            }
          }
          function gen_codes(tree, max_code, bl_count) {
            var next_code = new Array(MAX_BITS + 1);
            var code = 0;
            var bits;
            var n;
            for (bits = 1; bits <= MAX_BITS; bits++)
              next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
            for (n = 0; n <= max_code; n++) {
              var len = tree[n * 2 + 1];
              if (len === 0) continue;
              tree[n * 2] = bi_reverse(next_code[len]++, len);
            }
          }
          function tr_static_init() {
            var n;
            var bits;
            var length;
            var code;
            var dist;
            var bl_count = new Array(MAX_BITS + 1);
            length = 0;
            for (code = 0; code < LENGTH_CODES - 1; code++) {
              base_length[code] = length;
              for (n = 0; n < 1 << extra_lbits[code]; n++)
                _length_code[length++] = code;
            }
            _length_code[length - 1] = code;
            dist = 0;
            for (code = 0; code < 16; code++) {
              base_dist[code] = dist;
              for (n = 0; n < 1 << extra_dbits[code]; n++)
                _dist_code[dist++] = code;
            }
            dist >>= 7;
            for (; code < D_CODES; code++) {
              base_dist[code] = dist << 7;
              for (n = 0; n < 1 << (extra_dbits[code] - 7); n++)
                _dist_code[256 + dist++] = code;
            }
            for (bits = 0; bits <= MAX_BITS; bits++) bl_count[bits] = 0;
            n = 0;
            while (n <= 143) {
              static_ltree[n * 2 + 1] = 8;
              n++;
              bl_count[8]++;
            }
            while (n <= 255) {
              static_ltree[n * 2 + 1] = 9;
              n++;
              bl_count[9]++;
            }
            while (n <= 279) {
              static_ltree[n * 2 + 1] = 7;
              n++;
              bl_count[7]++;
            }
            while (n <= 287) {
              static_ltree[n * 2 + 1] = 8;
              n++;
              bl_count[8]++;
            }
            gen_codes(static_ltree, L_CODES + 1, bl_count);
            for (n = 0; n < D_CODES; n++) {
              static_dtree[n * 2 + 1] = 5;
              static_dtree[n * 2] = bi_reverse(n, 5);
            }
            static_l_desc = new StaticTreeDesc(
              static_ltree,
              extra_lbits,
              LITERALS + 1,
              L_CODES,
              MAX_BITS
            );
            static_d_desc = new StaticTreeDesc(
              static_dtree,
              extra_dbits,
              0,
              D_CODES,
              MAX_BITS
            );
            static_bl_desc = new StaticTreeDesc(
              new Array(0),
              extra_blbits,
              0,
              BL_CODES,
              MAX_BL_BITS
            );
          }
          function init_block(s) {
            var n;
            for (n = 0; n < L_CODES; n++) s.dyn_ltree[n * 2] = 0;
            for (n = 0; n < D_CODES; n++) s.dyn_dtree[n * 2] = 0;
            for (n = 0; n < BL_CODES; n++) s.bl_tree[n * 2] = 0;
            s.dyn_ltree[END_BLOCK * 2] = 1;
            s.opt_len = s.static_len = 0;
            s.last_lit = s.matches = 0;
          }
          function bi_windup(s) {
            if (s.bi_valid > 8) put_short(s, s.bi_buf);
            else if (s.bi_valid > 0) s.pending_buf[s.pending++] = s.bi_buf;
            s.bi_buf = 0;
            s.bi_valid = 0;
          }
          function copy_block(s, buf, len, header) {
            bi_windup(s);
            if (header) {
              put_short(s, len);
              put_short(s, ~len);
            }
            utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
            s.pending += len;
          }
          function smaller(tree, n, m, depth) {
            var _n2 = n * 2;
            var _m2 = m * 2;
            return (
              tree[_n2] < tree[_m2] ||
              (tree[_n2] === tree[_m2] && depth[n] <= depth[m])
            );
          }
          function pqdownheap(s, tree, k) {
            var v = s.heap[k];
            var j = k << 1;
            while (j <= s.heap_len) {
              if (
                j < s.heap_len &&
                smaller(tree, s.heap[j + 1], s.heap[j], s.depth)
              )
                j++;
              if (smaller(tree, v, s.heap[j], s.depth)) break;
              s.heap[k] = s.heap[j];
              k = j;
              j <<= 1;
            }
            s.heap[k] = v;
          }
          function compress_block(s, ltree, dtree) {
            var dist;
            var lc;
            var lx = 0;
            var code;
            var extra;
            if (s.last_lit !== 0) {
              do {
                dist =
                  (s.pending_buf[s.d_buf + lx * 2] << 8) |
                  s.pending_buf[s.d_buf + lx * 2 + 1];
                lc = s.pending_buf[s.l_buf + lx];
                lx++;
                if (dist === 0) send_code(s, lc, ltree);
                else {
                  code = _length_code[lc];
                  send_code(s, code + LITERALS + 1, ltree);
                  extra = extra_lbits[code];
                  if (extra !== 0) {
                    lc -= base_length[code];
                    send_bits(s, lc, extra);
                  }
                  dist--;
                  code = d_code(dist);
                  send_code(s, code, dtree);
                  extra = extra_dbits[code];
                  if (extra !== 0) {
                    dist -= base_dist[code];
                    send_bits(s, dist, extra);
                  }
                }
              } while (lx < s.last_lit);
            }
            send_code(s, END_BLOCK, ltree);
          }
          function build_tree(s, desc) {
            var tree = desc.dyn_tree;
            var stree = desc.stat_desc.static_tree;
            var has_stree = desc.stat_desc.has_stree;
            var elems = desc.stat_desc.elems;
            var n, m;
            var max_code = -1;
            var node;
            s.heap_len = 0;
            s.heap_max = HEAP_SIZE;
            for (n = 0; n < elems; n++)
              if (tree[n * 2] !== 0) {
                s.heap[++s.heap_len] = max_code = n;
                s.depth[n] = 0;
              } else tree[n * 2 + 1] = 0;
            while (s.heap_len < 2) {
              node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
              tree[node * 2] = 1;
              s.depth[node] = 0;
              s.opt_len--;
              if (has_stree) s.static_len -= stree[node * 2 + 1];
            }
            desc.max_code = max_code;
            for (n = s.heap_len >> 1; n >= 1; n--) pqdownheap(s, tree, n);
            node = elems;
            do {
              n = s.heap[1];
              s.heap[1] = s.heap[s.heap_len--];
              pqdownheap(s, tree, 1);
              m = s.heap[1];
              s.heap[--s.heap_max] = n;
              s.heap[--s.heap_max] = m;
              tree[node * 2] = tree[n * 2] + tree[m * 2];
              s.depth[node] =
                (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
              tree[n * 2 + 1] = tree[m * 2 + 1] = node;
              s.heap[1] = node++;
              pqdownheap(s, tree, 1);
            } while (s.heap_len >= 2);
            s.heap[--s.heap_max] = s.heap[1];
            gen_bitlen(s, desc);
            gen_codes(tree, max_code, s.bl_count);
          }
          function scan_tree(s, tree, max_code) {
            var n;
            var prevlen = -1;
            var curlen;
            var nextlen = tree[0 * 2 + 1];
            var count = 0;
            var max_count = 7;
            var min_count = 4;
            if (nextlen === 0) {
              max_count = 138;
              min_count = 3;
            }
            tree[(max_code + 1) * 2 + 1] = 65535;
            for (n = 0; n <= max_code; n++) {
              curlen = nextlen;
              nextlen = tree[(n + 1) * 2 + 1];
              if (++count < max_count && curlen === nextlen) continue;
              else if (count < min_count) s.bl_tree[curlen * 2] += count;
              else if (curlen !== 0) {
                if (curlen !== prevlen) s.bl_tree[curlen * 2]++;
                s.bl_tree[REP_3_6 * 2]++;
              } else if (count <= 10) s.bl_tree[REPZ_3_10 * 2]++;
              else s.bl_tree[REPZ_11_138 * 2]++;
              count = 0;
              prevlen = curlen;
              if (nextlen === 0) {
                max_count = 138;
                min_count = 3;
              } else if (curlen === nextlen) {
                max_count = 6;
                min_count = 3;
              } else {
                max_count = 7;
                min_count = 4;
              }
            }
          }
          function send_tree(s, tree, max_code) {
            var n;
            var prevlen = -1;
            var curlen;
            var nextlen = tree[0 * 2 + 1];
            var count = 0;
            var max_count = 7;
            var min_count = 4;
            if (nextlen === 0) {
              max_count = 138;
              min_count = 3;
            }
            for (n = 0; n <= max_code; n++) {
              curlen = nextlen;
              nextlen = tree[(n + 1) * 2 + 1];
              if (++count < max_count && curlen === nextlen) continue;
              else if (count < min_count) {
                do send_code(s, curlen, s.bl_tree);
                while (--count !== 0);
              } else if (curlen !== 0) {
                if (curlen !== prevlen) {
                  send_code(s, curlen, s.bl_tree);
                  count--;
                }
                send_code(s, REP_3_6, s.bl_tree);
                send_bits(s, count - 3, 2);
              } else if (count <= 10) {
                send_code(s, REPZ_3_10, s.bl_tree);
                send_bits(s, count - 3, 3);
              } else {
                send_code(s, REPZ_11_138, s.bl_tree);
                send_bits(s, count - 11, 7);
              }
              count = 0;
              prevlen = curlen;
              if (nextlen === 0) {
                max_count = 138;
                min_count = 3;
              } else if (curlen === nextlen) {
                max_count = 6;
                min_count = 3;
              } else {
                max_count = 7;
                min_count = 4;
              }
            }
          }
          function build_bl_tree(s) {
            var max_blindex;
            scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
            scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
            build_tree(s, s.bl_desc);
            for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--)
              if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) break;
            s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
            return max_blindex;
          }
          function send_all_trees(s, lcodes, dcodes, blcodes) {
            var rank;
            send_bits(s, lcodes - 257, 5);
            send_bits(s, dcodes - 1, 5);
            send_bits(s, blcodes - 4, 4);
            for (rank = 0; rank < blcodes; rank++)
              send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
            send_tree(s, s.dyn_ltree, lcodes - 1);
            send_tree(s, s.dyn_dtree, dcodes - 1);
          }
          function detect_data_type(s) {
            var black_mask = 4093624447;
            var n;
            for (n = 0; n <= 31; n++, black_mask >>>= 1)
              if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) return Z_BINARY;
            if (
              s.dyn_ltree[9 * 2] !== 0 ||
              s.dyn_ltree[10 * 2] !== 0 ||
              s.dyn_ltree[13 * 2] !== 0
            )
              return Z_TEXT;
            for (n = 32; n < LITERALS; n++)
              if (s.dyn_ltree[n * 2] !== 0) return Z_TEXT;
            return Z_BINARY;
          }
          var static_init_done = false;
          function _tr_init(s) {
            if (!static_init_done) {
              tr_static_init();
              static_init_done = true;
            }
            s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
            s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
            s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
            s.bi_buf = 0;
            s.bi_valid = 0;
            init_block(s);
          }
          function _tr_stored_block(s, buf, stored_len, last) {
            send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
            copy_block(s, buf, stored_len, true);
          }
          function _tr_align(s) {
            send_bits(s, STATIC_TREES << 1, 3);
            send_code(s, END_BLOCK, static_ltree);
            bi_flush(s);
          }
          function _tr_flush_block(s, buf, stored_len, last) {
            var opt_lenb, static_lenb;
            var max_blindex = 0;
            if (s.level > 0) {
              if (s.strm.data_type === Z_UNKNOWN)
                s.strm.data_type = detect_data_type(s);
              build_tree(s, s.l_desc);
              build_tree(s, s.d_desc);
              max_blindex = build_bl_tree(s);
              opt_lenb = (s.opt_len + 3 + 7) >>> 3;
              static_lenb = (s.static_len + 3 + 7) >>> 3;
              if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
            } else opt_lenb = static_lenb = stored_len + 5;
            if (stored_len + 4 <= opt_lenb && buf !== -1)
              _tr_stored_block(s, buf, stored_len, last);
            else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
              send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
              compress_block(s, static_ltree, static_dtree);
            } else {
              send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
              send_all_trees(
                s,
                s.l_desc.max_code + 1,
                s.d_desc.max_code + 1,
                max_blindex + 1
              );
              compress_block(s, s.dyn_ltree, s.dyn_dtree);
            }
            init_block(s);
            if (last) bi_windup(s);
          }
          function _tr_tally(s, dist, lc) {
            s.pending_buf[s.d_buf + s.last_lit * 2] = (dist >>> 8) & 255;
            s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
            s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
            s.last_lit++;
            if (dist === 0) s.dyn_ltree[lc * 2]++;
            else {
              s.matches++;
              dist--;
              s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
              s.dyn_dtree[d_code(dist) * 2]++;
            }
            return s.last_lit === s.lit_bufsize - 1;
          }
          exports._tr_init = _tr_init;
          exports._tr_stored_block = _tr_stored_block;
          exports._tr_flush_block = _tr_flush_block;
          exports._tr_tally = _tr_tally;
          exports._tr_align = _tr_align;
        },
        { "../utils/common": 27 },
      ],
      39: [
        function (_dereq_, module, exports) {
          function ZStream() {
            this.input = null;
            this.next_in = 0;
            this.avail_in = 0;
            this.total_in = 0;
            this.output = null;
            this.next_out = 0;
            this.avail_out = 0;
            this.total_out = 0;
            this.msg = "";
            this.state = null;
            this.data_type = 2;
            this.adler = 0;
          }
          module.exports = ZStream;
        },
        {},
      ],
    },
    {},
    [9]
  )(9);
});
