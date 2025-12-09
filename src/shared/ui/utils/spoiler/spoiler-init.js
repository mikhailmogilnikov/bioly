import { useMemo as L, useCallback as w, useSyncExternalStore as yt, useLayoutEffect as wt, useEffect as z, useInsertionEffect as xt, useState as b, useRef as C, createElement as Z, isValidElement as At, cloneElement as St } from "react";
const Mt = "matchMedia" in globalThis && typeof globalThis.matchMedia == "function";
function _t(e, t = !1) {
  const n = L(
    () => Mt ? globalThis.matchMedia(e) : void 0,
    [e]
  ), r = w(
    (s) => n ? (n.addEventListener("change", s), () => n.removeEventListener("change", s)) : () => {
    },
    [n]
  );
  return yt(
    r,
    () => n?.matches ?? !1,
    () => t
    // value on the server
  );
}
const ct = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", H = ct ? wt : z, G = ct ? xt : z, v = /* @__PURE__ */ new Map(), kt = (e, t) => {
  const [n] = b(() => e), [r] = b(
    () => (
      /* note: `document` can be `undefined` in some environments like SSR */
      t.current ? t.current.ownerDocument : globalThis.document
    )
  );
  G(() => {
    if (!(!n || typeof r > "u")) {
      if (!v.has(r)) {
        const s = r.createElement("style");
        s.innerHTML = n, s.setAttribute("data-spoiled", ""), v.set(r, { element: s, refCount: 0 }), r.head.appendChild(s);
      }
      v.get(r).refCount++;
    }
  }, []), G(() => () => {
    if (!n || typeof r > "u") return;
    const s = v.get(r);
    s && --s.refCount <= 0 && (v.delete(r), r.head.removeChild(s.element));
  }, []);
}, Nt = () => {
  if (typeof globalThis > "u")
    return Promise.resolve(!1);
  const e = globalThis.__paintWorkletReady;
  return e && typeof e.then == "function" ? e.catch(() => !1) : Promise.resolve(typeof CSS < "u" && CSS.paintWorklet !== void 0);
}, Wt = (e) => {
  for (; e && e.parentNode; ) {
    const t = e.parentNode;
    if (t.nodeType === 1 && (t.offsetWidth !== 0 || t.offsetHeight !== 0))
      return t;
    e = t;
  }
  return e;
}, J = (e, t) => {
  let { width: n, height: r } = e.getBoundingClientRect();
  return t > 1 && (n = Math.round(n / t) * t, r = Math.round(r / t) * t), [n, r];
};
function Pt(e, t = 4) {
  const [n, r] = b(() => e.current ? J(e.current, t) : [0, 0]);
  return z(() => {
    if (!e.current || typeof ResizeObserver > "u") return;
    const s = Wt(e.current), i = new ResizeObserver((a) => {
      if (!e.current) return;
      const [o, u] = J(e.current, t);
      (o !== n[0] || u !== n[1]) && r([o, u]);
    });
    return i.observe(s), () => {
      i.disconnect();
    };
  }, [e, t]), n;
}
var Et = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, f = function(e) {
  return typeof e == "string" ? e.length > 0 : typeof e == "number";
}, l = function(e, t, n) {
  return t === void 0 && (t = 0), n === void 0 && (n = Math.pow(10, t)), Math.round(n * e) / n + 0;
}, d = function(e, t, n) {
  return t === void 0 && (t = 0), n === void 0 && (n = 1), e > n ? n : e > t ? e : t;
}, lt = function(e) {
  return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
}, X = function(e) {
  return { r: d(e.r, 0, 255), g: d(e.g, 0, 255), b: d(e.b, 0, 255), a: d(e.a) };
}, N = function(e) {
  return { r: l(e.r), g: l(e.g), b: l(e.b), a: l(e.a, 3) };
}, It = /^#([0-9a-f]{3,8})$/i, W = function(e) {
  var t = e.toString(16);
  return t.length < 2 ? "0" + t : t;
}, dt = function(e) {
  var t = e.r, n = e.g, r = e.b, s = e.a, i = Math.max(t, n, r), a = i - Math.min(t, n, r), o = a ? i === t ? (n - r) / a : i === n ? 2 + (r - t) / a : 4 + (t - n) / a : 0;
  return { h: 60 * (o < 0 ? o + 6 : o), s: i ? a / i * 100 : 0, v: i / 255 * 100, a: s };
}, ut = function(e) {
  var t = e.h, n = e.s, r = e.v, s = e.a;
  t = t / 360 * 6, n /= 100, r /= 100;
  var i = Math.floor(t), a = r * (1 - n), o = r * (1 - (t - i) * n), u = r * (1 - (1 - t + i) * n), c = i % 6;
  return { r: 255 * [r, o, a, a, u, r][c], g: 255 * [u, r, r, o, a, a][c], b: 255 * [a, a, u, r, r, o][c], a: s };
}, tt = function(e) {
  return { h: lt(e.h), s: d(e.s, 0, 100), l: d(e.l, 0, 100), a: d(e.a) };
}, et = function(e) {
  return { h: l(e.h), s: l(e.s), l: l(e.l), a: l(e.a, 3) };
}, nt = function(e) {
  var t, n, r;
  return ut((n = (t = e).s, { h: t.h, s: (n *= ((r = t.l) < 50 ? r : 100 - r) / 100) > 0 ? 2 * n / (r + n) * 100 : 0, v: r + n, a: t.a }));
}, x = function(e) {
  var t, n, r, s;
  return { h: (t = dt(e)).h, s: (s = (200 - (n = t.s)) * (r = t.v) / 100) > 0 && s < 200 ? n * r / 100 / (s <= 100 ? s : 200 - s) * 100 : 0, l: s / 2, a: t.a };
}, Dt = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ft = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Rt = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Ct = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, rt = { string: [[function(e) {
  var t = It.exec(e);
  return t ? (e = t[1]).length <= 4 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: e.length === 4 ? l(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : e.length === 6 || e.length === 8 ? { r: parseInt(e.substr(0, 2), 16), g: parseInt(e.substr(2, 2), 16), b: parseInt(e.substr(4, 2), 16), a: e.length === 8 ? l(parseInt(e.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(e) {
  var t = Rt.exec(e) || Ct.exec(e);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : X({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(e) {
  var t = Dt.exec(e) || Ft.exec(e);
  if (!t) return null;
  var n, r, s = tt({ h: (n = t[1], r = t[2], r === void 0 && (r = "deg"), Number(n) * (Et[r] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return nt(s);
}, "hsl"]], object: [[function(e) {
  var t = e.r, n = e.g, r = e.b, s = e.a, i = s === void 0 ? 1 : s;
  return f(t) && f(n) && f(r) ? X({ r: Number(t), g: Number(n), b: Number(r), a: Number(i) }) : null;
}, "rgb"], [function(e) {
  var t = e.h, n = e.s, r = e.l, s = e.a, i = s === void 0 ? 1 : s;
  if (!f(t) || !f(n) || !f(r)) return null;
  var a = tt({ h: Number(t), s: Number(n), l: Number(r), a: Number(i) });
  return nt(a);
}, "hsl"], [function(e) {
  var t = e.h, n = e.s, r = e.v, s = e.a, i = s === void 0 ? 1 : s;
  if (!f(t) || !f(n) || !f(r)) return null;
  var a = function(o) {
    return { h: lt(o.h), s: d(o.s, 0, 100), v: d(o.v, 0, 100), a: d(o.a) };
  }({ h: Number(t), s: Number(n), v: Number(r), a: Number(i) });
  return ut(a);
}, "hsv"]] }, st = function(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n][0](e);
    if (r) return [r, t[n][1]];
  }
  return [null, void 0];
}, Ht = function(e) {
  return typeof e == "string" ? st(e.trim(), rt.string) : typeof e == "object" && e !== null ? st(e, rt.object) : [null, void 0];
}, O = function(e, t) {
  var n = x(e);
  return { h: n.h, s: d(n.s + 100 * t, 0, 100), l: n.l, a: n.a };
}, T = function(e) {
  return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
}, it = function(e, t) {
  var n = x(e);
  return { h: n.h, s: n.s, l: d(n.l + 100 * t, 0, 100), a: n.a };
}, at = function() {
  function e(t) {
    this.parsed = Ht(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return e.prototype.isValid = function() {
    return this.parsed !== null;
  }, e.prototype.brightness = function() {
    return l(T(this.rgba), 2);
  }, e.prototype.isDark = function() {
    return T(this.rgba) < 0.5;
  }, e.prototype.isLight = function() {
    return T(this.rgba) >= 0.5;
  }, e.prototype.toHex = function() {
    var t, n, r, s, i, a;
    return t = N(this.rgba), n = t.r, r = t.g, s = t.b, a = (i = t.a) < 1 ? W(l(255 * i)) : "", "#" + W(n) + W(r) + W(s) + a;
  }, e.prototype.toRgb = function() {
    return N(this.rgba);
  }, e.prototype.toRgbString = function() {
    var t, n, r, s, i;
    return t = N(this.rgba), n = t.r, r = t.g, s = t.b, (i = t.a) < 1 ? "rgba(" + n + ", " + r + ", " + s + ", " + i + ")" : "rgb(" + n + ", " + r + ", " + s + ")";
  }, e.prototype.toHsl = function() {
    return et(x(this.rgba));
  }, e.prototype.toHslString = function() {
    var t, n, r, s, i;
    return t = et(x(this.rgba)), n = t.h, r = t.s, s = t.l, (i = t.a) < 1 ? "hsla(" + n + ", " + r + "%, " + s + "%, " + i + ")" : "hsl(" + n + ", " + r + "%, " + s + "%)";
  }, e.prototype.toHsv = function() {
    var t;
    return t = dt(this.rgba), { h: l(t.h), s: l(t.s), v: l(t.v), a: l(t.a, 3) };
  }, e.prototype.invert = function() {
    var t;
    return p({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
  }, e.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), p(O(this.rgba, t));
  }, e.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), p(O(this.rgba, -t));
  }, e.prototype.grayscale = function() {
    return p(O(this.rgba, -1));
  }, e.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), p(it(this.rgba, t));
  }, e.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), p(it(this.rgba, -t));
  }, e.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, e.prototype.alpha = function(t) {
    var n;
    return typeof t == "number" ? p({ r: (n = this.rgba).r, g: n.g, b: n.b, a: t }) : l(this.rgba.a, 3);
  }, e.prototype.hue = function(t) {
    var n = x(this.rgba);
    return typeof t == "number" ? p({ h: t, s: n.s, l: n.l, a: n.a }) : l(n.h);
  }, e.prototype.isEqual = function(t) {
    return this.toHex() === p(t).toHex();
  }, e;
}(), p = function(e) {
  return e instanceof at ? e : new at(e);
};
const y = {
  fps: 24,
  gap: 6,
  density: 0.12,
  mimicWords: !1,
  fallback: "black"
}, Ot = 24, P = 293, Tt = 333, Bt = 1.5, B = 8, ot = "matchMedia" in globalThis && typeof globalThis.matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
class Lt {
  el;
  maxFPS = Ot;
  #i = !1;
  constructor(t, n = {}) {
    this.el = t, this.#t = 0, this.update(n), n.onlyInViewport === !0 && this.#h();
  }
  #a = !1;
  /**
   * Stops everything and reverts the styles
   */
  destroy() {
    this.#a = !0, this.stopAnimation(), ["background", "--t", "--t-stop", "--fade", "--gap", "--words", "--density"].forEach((t) => {
      this.el.style.removeProperty(t);
    }), this.#n && (this.#n.disconnect(), this.#n = null);
  }
  /**
   * `fps` - the maximum frames per second
   * `mimicWords` - if true, the spoiler will try to mimic the shape of words (cssvar)
   * `density` - overrides the density of the noise (cssvar)
   * `gap` - in px a gap that particles won't spawn within (ignored for elements that exceed
   *         the size limit)
   */
  update({
    fps: t = y.fps,
    gap: n = y.gap,
    mimicWords: r = y.mimicWords,
    density: s = y.density,
    fallback: i = y.fallback,
    forceFallback: a,
    accentColor: o
  } = {}) {
    if (this.#a)
      throw new Error("Painter has been destroyed and can't be used again.");
    // Динамическая проверка поддержки CSS Paint API (полифилл может загрузиться позже)
    const hasPaintWorklet = typeof CSS !== "undefined" && CSS.paintWorklet !== undefined;
    if (this.maxFPS = ot ? 0 : t, this.#i = !!a, !hasPaintWorklet || a) {
      this.el.style.setProperty("--fallback", i || "initial");
      return;
    }
    const u = getComputedStyle(this.el).getPropertyValue("display") !== "inline";
    if (this.useBackgroundStyle("auto", "auto", { tile: !1 }), u) {
      r = !1;
      const c = this.el.getBoundingClientRect();
      if (c.width * c.height > P * P)
        this.useBackgroundStyle(
          Math.min(c.width, P),
          Math.min(c.height, P),
          { tile: !0 }
        );
      else {
        const m = Math.floor(
          Math.min(Number(n), c.width / B, c.height / B)
        );
        this.el.style.setProperty("--gap", `${m}px ${m}px`);
      }
    }
    if (!u) {
      const c = [...this.el.getClientRects()], m = Math.min(...c.map((S) => S.height));
      this.useBackgroundStyle(Tt, m, { tile: !0 });
      const A = Math.floor(Math.min(m / B, Number(n)));
      this.el.style.setProperty("--gap", `0 ${A}px`);
    }
    if (this.el.style.setProperty("--words", String(r)), this.el.style.setProperty("--density", String(s)), o) {
      const c = p(o).toHsl();
      this.el.style.setProperty("--accent", `${c.h}deg ${c.s}% ${c.l}%`);
    } else
      this.el.style.removeProperty("--accent");
  }
  useBackgroundStyle(t, n, r) {
    t = typeof t == "number" ? `${t}px` : t, n = typeof n == "number" ? `${n}px` : n;
    const s = r?.tile ? "repeat left center" : "no-repeat center center";
    const backgroundValue = `paint(spoiler) ${s} / ${t} ${n}`;
    
    // Используем setAttribute для установки style, чтобы полифилл мог обработать paint()
    // Полифилл перехватывает setAttribute для атрибута "style" и обрабатывает paint()
    const currentStyle = this.el.getAttribute("style") || "";
    // Удаляем старое значение background, если оно есть
    const styleWithoutBackground = currentStyle.replace(/background\s*:[^;]+;?/gi, "").trim();
    const newStyle = styleWithoutBackground 
      ? `${styleWithoutBackground}; background: ${backgroundValue}` 
      : `background: ${backgroundValue}`;
    this.el.setAttribute("style", newStyle);
    
    // Также устанавливаем через style для браузеров с нативной поддержкой
    this.el.style.background = backgroundValue;
  }
  /**
   * Hides and reveals the content. Turns the noise animation on and off.
   */
  #o = !1;
  get isHidden() {
    return this.#o;
  }
  #c = 0;
  set #r(t) {
    this.el.style.setProperty("--fade", `${this.#c = Number(t)}s`);
  }
  get #r() {
    return this.#c;
  }
  parseFadeDuration(t) {
    return ot ? 0 : t === !0 ? Bt : Number(t);
  }
  hide({ animate: t = !0 } = {}) {
    const hasPaintWorklet = typeof CSS !== "undefined" && CSS.paintWorklet !== undefined;
    if (this.#o = !0, !hasPaintWorklet || this.#i) {
      this.el.style.setProperty("background", "var(--fallback)");
      return;
    }
    this.#r = this.parseFadeDuration(t), this.#t = null, this.t = 0, this.startAnimation();
  }
  reveal({ animate: t = !0 } = {}) {
    const hasPaintWorklet = typeof CSS !== "undefined" && CSS.paintWorklet !== undefined;
    if (this.#o = !1, !hasPaintWorklet || this.#i) {
      this.el.style.removeProperty("background");
      return;
    }
    const n = this.parseFadeDuration(t);
    this.#r = n, this.#t = this.t, n <= 0 && this.stopAnimation();
  }
  /**
   * Clock states
   */
  #l = 0;
  #s = 0;
  #d = null;
  get #t() {
    return this.#d;
  }
  set #t(t) {
    this.#d = t, t !== null ? this.el.style.setProperty("--t-stop", t.toFixed(3)) : this.el.style.removeProperty("--t-stop");
  }
  get t() {
    return this.#l;
  }
  set t(t) {
    this.#l = t, this.el.style.setProperty("--t", t.toFixed(3));
  }
  // animation loop
  #u = (t) => {
    if (this.#a) return;
    const n = this.#t && this.t > this.#t + this.#r;
    this.maxFPS > 0 && !n && (this.#e = requestAnimationFrame(this.#u));
    const r = t - this.#s;
    r > 0 && r < 1e3 / this.maxFPS || (this.t += r / 1e3, this.#s = t);
  };
  /** Animation state */
  #e = null;
  startAnimation() {
    this.#s = performance.now(), this.#u(this.#s);
  }
  stopAnimation() {
    this.#e && (cancelAnimationFrame(this.#e), this.#e = null);
  }
  get isAnimating() {
    return this.#e !== null;
  }
  #n = null;
  #h() {
    typeof IntersectionObserver > "u" || (this.#n = new IntersectionObserver(
      (t) => {
        t.forEach((n) => {
          n.isIntersecting ? this.startAnimation() : this.stopAnimation();
        });
      },
      {
        root: null,
        // observes the element in the viewport
        threshold: 0.1
        // trigger if 10% of the element is visible
      }
    ), this.#n.observe(this.el));
  }
}
// Worklet регистрируется в index.html до загрузки модулей (как squircle)
// Это гарантирует, что worklet зарегистрирован до использования компонента
const zt = "_spoiler_1cf3f_1", $t = "_hidden_1cf3f_1", Vt = "_transition_1cf3f_1", Qt = "_fade_1cf3f_17", Ut = "_iris_1cf3f_51", E = {
  spoiler: zt,
  hidden: $t,
  transition: Vt,
  fade: Qt,
  iris: Ut,
  "remove-mask": "_remove-mask_1cf3f_1"
}, Kt = "data:image/webp;base64,UklGRuIAAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSHEAAAABJyAQSOFmFxERg4PatlLpIgE0wLcAYwWQ/qXegzuLBBH9nwDsfPyUc2EYAMcwk/ABgDDsZBoAINgFtRWmeuYwzDTczGsw4QHwKgtqfZgjM3o3RBiWwAc7BsO0ophZfcQxZofRzEQPF3Z8WaYVpjrm/wBWUDggSgAAAHADAJ0BKiAAIAA+nUCYSaWkIqE36ACwE4lnAM50PvlSI7/wMAD+7rf8db9v/7SWp6hM/Twt6Iatza3v6Hxf/+ugJP+n55BGQsAA", qt = "data:image/webp;base64,UklGRswAAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSHEAAAABJyAQSOFmFxERg4PatlLpIgE0wLcAYwWQ/qXegzuLBBH9nwDsfPyUc2EYAMcwk/ABgDDsZBoAINgFtRWmeuYwzDTczGsw4QHwKgtqfZgjM3o3RBiWwAc7BsO0ophZfcQxZofRzEQPF3Z8WaYVpjrm/wBWUDggNAAAAFADAJ0BKiAAIAA/MYKzVK6opKM3+qgB0CYJZwAAd47WlJcAAP7tvYyWGro6+OiP70TIoAA=";
let Yt = { css: null };
const jt = (e) => {
  const [t] = b(() => e.hidden !== void 0), [n, r] = b(e.defaultHidden ?? !0);
  if (t !== (e.hidden !== void 0))
    throw new Error("Cannot change from controlled to uncontrolled or vice versa.");
  const s = w(
    (i) => {
      t || r(i), e.onHiddenChange?.(i);
    },
    [t, e.onHiddenChange]
  );
  return t ? [
    e.hidden,
    // we know that it is not `undefined` because of the useState initializer
    s
  ] : [n, s];
}, Zt = (e, t) => {
  const [n, r] = t, s = w(() => r(!1), [r]), i = w(() => r(!0), [r]), a = w(() => r(!n), [n, r]);
  return L(() => {
    switch (e) {
      case "hover":
        return { onMouseEnter: s, onMouseLeave: i };
      case "click":
        return { onClick: a };
      default:
        return {};
    }
  }, [e, s, i, a]);
}, Gt = (e) => {
  const t = _t("(prefers-color-scheme: dark)");
  return e === "system" ? t : e === "dark";
}, Jt = (e, t) => {
  const [n, r = n] = [e].flat();
  return t ? r : n;
}, te = (e) => {
  const {
    asChild: t = !1,
    tagName: n = "span",
    transition: r = "iris",
    hidden: s,
    revealOn: i = s === void 0 ? "hover" : !1,
    defaultHidden: a,
    onHiddenChange: o,
    // background noise settings
    accentColor: u = ["#333", "#fff"],
    theme: c = "system",
    mimicWords: m = !0,
    fps: A = 24,
    gap: S,
    density: $,
    noiseFadeDuration: V,
    fallback: Q,
    forceFallback: U = !1,
    // inherited props
    className: ht,
    children: M,
    ...pt
  } = e, _ = C(null), k = C(), [ft, mt] = Pt(_, 4), K = jt(e), [g] = K, D = Gt(c), q = Jt(u, D), F = C(V);
  F.current = V, kt(Yt.css, _);
  const R = L(() => {
    let h = Q ?? // image is 32x32
    `repeat top left / 16px 16px url(${D ? qt : Kt})`;
    return {
      fps: A,
      gap: S,
      density: $,
      mimicWords: m,
      accentColor: q,
      fallback: h,
      forceFallback: U
    };
  }, [
    A,
    S,
    $,
    m,
    q,
    Q,
    D,
    ft,
    mt,
    U
  ]), [gt] = b(() => R);
  const configRef = C(R);
  configRef.current = R;
  const hiddenRef = C(g);
  hiddenRef.current = g;
  H(() => {
    let h = !1;
    Nt().then(() => {
      if (h || !_.current) return;
      const j = new Lt(_.current, configRef.current ?? gt);
      k.current = j;
      j.update(configRef.current);
      const tt = F.current !== void 0 ? { animate: F.current } : {};
      hiddenRef.current ? j.hide(tt) : j.reveal(tt);
    });
    return () => {
      h = !0, k.current?.destroy(), k.current = void 0;
    };
  }, [gt]), H(() => {
    const h = k.current, j = F.current !== void 0 ? { animate: F.current } : {};
    h && g !== h.isHidden && (g ? h.hide(j) : h.reveal(j));
  }, [g]), H(() => {
    k.current?.update(R);
  }, [R]);
  const bt = [
    E.spoiler,
    g ? `${E.hidden}` : "",
    // append className provided above
    ht
  ].filter((h) => h).join(" ");
  let Y = M;
  (r === "fade" || r === "iris") && (Y = Z(n, {
    className: `${E.transition} ${E[r]}`,
    children: M
  }));
  const vt = t && At(M) ? M : Z(n, {
    children: Y,
    "aria-expanded": !g,
    "data-hidden": g ? !0 : void 0
  });
  return St(vt, {
    ref: _,
    className: bt,
    ...Zt(i, K),
    ...pt
  });
};
export {
  Lt as S,
  Yt as _,
  te as a,
  te as Spoiler  // Экспортируем как Spoiler для совместимости с оригинальной библиотекой
};
