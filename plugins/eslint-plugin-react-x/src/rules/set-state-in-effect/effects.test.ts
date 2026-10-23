import { type TestRuleContext, runCollector } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { createFactCollector } from "./collect";
import { inferViolations } from "./effects";

const NO_ADDITIONAL_HOOKS = { test: () => false };

function inferViolationNames(code: string): string[] {
  let context: TestRuleContext | null = null;
  return runCollector(
    code,
    (ctx) => {
      context = ctx;
      const collector = createFactCollector(NO_ADDITIONAL_HOOKS, NO_ADDITIONAL_HOOKS);
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts) => {
      if (context == null) throw new Error("The rule context was not captured");
      return inferViolations(context, facts).map((violation) => violation.name);
    },
  );
}

describe("inferViolations", () => {
  it("should report a setState call directly in the effect setup", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { setData(1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report multiple setState calls in report order", () => {
    const code = "function C() { const [a, setA] = useState(0); const [b, setB] = useState(0); useEffect(() => { setA(1); setB(2); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setA", "setB"]);
  });

  it("should report a setState call in an IIFE inside the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { (() => { setData(1); })(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should not report a setState call in a then callback", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { promise.then(() => { setData(1); }); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in an async setup function", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(async () => { setData(1); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in a cleanup function", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { return () => { setData(1); }; }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call outside of any effect", () => {
    const code = "function C() { const [data, setData] = useState(0); const onClick = () => { setData(1); }; }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a setState call without arguments", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { setData(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call reached through a local function invoked from the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); function helper() { setData(1); } useEffect(() => { helper(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call reached through a useCallback invoked from the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); const cb = useCallback(() => { setData(1); }, []); useEffect(() => { cb(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState reference aliased through useMemo and passed to the effect", () => {
    const code = "function C() { const [state, setState] = useState(0); const set = useMemo(() => setState, []); useEffect(set, []); }";
    expect(inferViolationNames(code)).toEqual(["setState"]);
  });

  it("should report a setState function passed directly as the effect setup", () => {
    const code = "function C() { const [state, setState] = useState(0); useEffect(setState); }";
    expect(inferViolationNames(code)).toEqual(["setState"]);
  });

  it("should report a setState call reached through a setup identifier passed to the effect", () => {
    const code = "function C() { const [data, setData] = useState(0); function setup() { setData(1); } useEffect(setup, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should not resolve a function received through props", () => {
    const code = "function C({ onInit }) { const [data, setData] = useState(0); useEffect(() => { onInit(); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a member-style setState call with its qualified name", () => {
    const code = "function C() { const data = useState(0); useEffect(() => { data[1](1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["data[1]"]);
  });

  it("should not report a setState call whose argument is derived from a ref", () => {
    const code = "function C() { const ref = useRef(null); const [w, setW] = useState(0); useEffect(() => { setW(ref.current.offsetWidth); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call gated by a ref-derived condition", () => {
    const code = "function C() { const ref = useRef(0); const [data, setData] = useState(0); useEffect(() => { if (ref.current > 0) { setData(1); } }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in a helper whose call-site argument is ref-derived", () => {
    const code =
      "function C() { const ref = useRef(null); const [t, setT] = useState(false); const update = (el) => { setT(el.scrollTop === 0); }; useEffect(() => { update(ref.current); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a setState call in a helper whose call-site argument is not ref-derived", () => {
    const code =
      "function C() { const [t, setT] = useState(false); const update = (el) => { setT(el.scrollTop === 0); }; useEffect(() => { update(document.body); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setT"]);
  });

  it("should report a setState call in a namespace effect call", () => {
    const code = "function C() { const [data, setData] = useState(0); React.useEffect(() => { setData(1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call in a useLayoutEffect setup", () => {
    const code = "function C() { const [data, setData] = useState(0); useLayoutEffect(() => { setData(1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call in an effect of a custom hook", () => {
    const code = "function useCustom() { const [data, setData] = useState(0); useEffect(() => { setData(1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setter destructured from a tuple with a hole", () => {
    const code = "function C() { const [, setData] = useState(0); useEffect(() => { setData(1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setter destructured by numeric key from an object pattern", () => {
    const code = "function C() { const { 1: setData } = useState(0); useEffect(() => { setData(1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should not report the state value destructured by numeric key 0", () => {
    const code = "function C() { const { 0: data } = useState(0); useEffect(() => { data(1); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report an at(1) setState call with its qualified name", () => {
    const code = "function C() { const data = useState(0); useEffect(() => { data.at(1)(1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["data.at(1)"]);
  });

  it("should report setState calls in both branches of a conditional expression", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { cond ? setData(1) : setData(2); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData", "setData"]);
  });

  it("should not report a setState call on the right of a logical-and with a ref read on the left", () => {
    const code = "function C() { const ref = useRef(0); const [data, setData] = useState(0); useEffect(() => { ref.current && setData(1); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a setState call on the left of a logical-and with a ref read on the right", () => {
    const code = "function C() { const ref = useRef(0); const [data, setData] = useState(0); useEffect(() => { setData(1) && ref.current; }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call on the right of a logical-and with a non-ref left", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { cond && setData(1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call gated by a prop-derived condition", () => {
    const code = "function C({ cond }) { const [data, setData] = useState(0); useEffect(() => { if (cond) { setData(1); } }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a call of a setter reached through an alias variable", () => {
    const code = "function C() { const [data, setData] = useState(0); const alias = setData; useEffect(() => { alias(1); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should not report a setter identifier assigned to a local variable in the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { const s = setData; }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in a timer callback", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { setTimeout(() => { setData(1); }); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a setState call in a function declared inside the setup and called from the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { function helper() { setData(1); } helper(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call behind a local function invoked via optional call", () => {
    const code = "function C() { const [data, setData] = useState(0); const helper = () => { setData(1); }; useEffect(() => { helper?.(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call behind a local function invoked in a conditional expression", () => {
    const code =
      "function C() { const [data, setData] = useState(0); const helper = () => { setData(1); }; useEffect(() => { cond ? helper() : null; }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call in a doubly nested IIFE inside the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { (() => { (() => { setData(1); })(); })(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call in a for-of loop body in the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { for (const item of items) { setData(item); } }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call behind two levels of local helpers", () => {
    const code =
      "function C() { const [data, setData] = useState(0); const inner = () => { setData(1); }; const outer = () => { inner(); }; useEffect(() => { outer(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should not report a setState call in an uninvoked function inside the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { const handler = () => { setData(1); }; }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in an IIFE inside a then callback", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => { promise.then(() => { (() => { setData(1); })(); }); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in an async function invoked from the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); async function load() { setData(1); } useEffect(() => { load(); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in the deps array of an inline setup", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(() => {}, [setData(1)]); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call in a function owned by another component scope", () => {
    const code = "function helper() { setData(1); } function C() { const [data, setData] = useState(0); useEffect(() => { helper(); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a setState call reached through a parenthesized setup identifier", () => {
    const code = "function C() { const [data, setData] = useState(0); function setup() { setData(1); } useEffect((setup), []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should not report a setup referenced through a member expression", () => {
    const code = "function C() { const [data, setData] = useState(0); useEffect(obj.setup, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a setState call reached through a useEffectEvent invoked from the setup", () => {
    const code =
      "function C() { const [data, setData] = useState(0); const handler = useEffectEvent(() => { setData(1); }); useEffect(() => { handler(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report a setState call in a helper whose mixed arguments include a plain value used by the setter", () => {
    const code =
      "function C() { const ref = useRef(null); const [t, setT] = useState(false); const update = (el, flag) => { setT(flag); }; useEffect(() => { update(ref.current, true); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setT"]);
  });

  it("should report direct setState calls before indirectly reached ones in the same setup", () => {
    const code =
      "function C() { const [a, setA] = useState(0); const [b, setB] = useState(0); function helper() { setA(1); } useEffect(() => { setB(1); helper(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setB", "setA"]);
  });

  it("should not treat a function referenced only in the deps array as the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); function setup() {} function helper() { setData(1); } useEffect(setup, [helper]); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call gated by a ref-derived logical-and left in a helper invoked from the setup", () => {
    const code =
      "function C() { const ref = useRef(0); const [data, setData] = useState(0); const update = () => { ref.current && setData(1); }; useEffect(() => { update(); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a setState call gated by a ref-fed parameter on the left of a logical-and in a helper", () => {
    const code =
      "function C() { const ref = useRef(null); const [data, setData] = useState(0); const update = (el) => { el && setData(1); }; useEffect(() => { update(ref.current); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a setState call gated by a plainly-fed parameter on the left of a logical-and in a helper", () => {
    const code =
      "function C() { const [data, setData] = useState(0); const update = (el) => { el && setData(1); }; useEffect(() => { update(document.body); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should not report a setState call in an IIFE on the right of a ref-gated logical-and", () => {
    const code =
      "function C() { const ref = useRef(0); const [data, setData] = useState(0); useEffect(() => { ref.current && (() => { setData(1); })(); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should report a helper called from a named setup", () => {
    const code = "function C() { const [data, setData] = useState(0); const helper = () => setData(1); function setup() { helper(); } useEffect(setup, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report an IIFE inside a named setup", () => {
    const code = "function C() { const [data, setData] = useState(0); function setup() { (() => setData(1))(); } useEffect(setup, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report an IIFE inside a helper called from the setup", () => {
    const code = "function C() { const [data, setData] = useState(0); const helper = () => { (() => setData(1))(); }; useEffect(() => { helper(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should terminate on pure recursion without a setter", () => {
    const code = "function C() { const recurse = () => recurse(); useEffect(() => { recurse(); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should terminate and report recursion that reaches a setter", () => {
    const code = "function C() { const [data, setData] = useState(0); const recurse = () => { recurse(); setData(1); }; useEffect(() => { recurse(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should terminate on mutually recursive helpers and report their setter", () => {
    const code =
      "function C() { const [data, setData] = useState(0); const a = () => b(); const b = () => { a(); setData(1); }; useEffect(() => { a(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should not report a timer callback nested in a useCallback helper", () => {
    const code =
      "function C() { const [data, setData] = useState(0); const helper = useCallback(() => { setTimeout(() => setData(1), 0); }, []); useEffect(() => { helper(); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not report a timer callback nested in a useEffectEvent helper", () => {
    const code =
      "function C() { const [data, setData] = useState(0); const helper = useEffectEvent(() => { setTimeout(() => setData(1), 0); }); useEffect(() => { helper(); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should deduplicate the same sink reached by two calls", () => {
    const code = "function C() { const [data, setData] = useState(0); const helper = () => setData(1); useEffect(() => { helper(); helper(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should deduplicate the same named setup used by two effects", () => {
    const code = "function C() { const [data, setData] = useState(0); function setup() { setData(1); } useEffect(setup, []); useEffect(setup, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report an indirect zero-argument setter with the same policy as a direct one", () => {
    const code = "function C() { const [data, setData] = useState(0); const helper = () => setData(); useEffect(() => { helper(); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should allow a value returned by a local ref-reading getter", () => {
    const code =
      "function C() { const ref = useRef(0); const getValue = () => ref.current; const [data, setData] = useState(0); useEffect(() => { setData(getValue()); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should allow a ref read in a computed member key", () => {
    const code = "function C() { const ref = useRef('key'); const [data, setData] = useState(0); useEffect(() => { setData(lookup[ref.current]); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should not allow an earlier ref write after a later plain overwrite", () => {
    const code =
      "function C() { const ref = useRef(0); const [data, setData] = useState(0); useEffect(() => { let next = 0; next = ref.current; next = 42; setData(next); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report an unconditional setter inside an if test containing a ref", () => {
    const code =
      "function C() { const ref = useRef(0); const [data, setData] = useState(0); useEffect(() => { if ((setData(1), ref.current)) { console.log(data); } }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should re-map recursive parameters at each call site", () => {
    const code =
      "function C() { const ref = useRef(0); const [data, setData] = useState(0); const update = (value) => { if (cond) { update(0); } else { setData(value); } }; useEffect(() => { update(ref.current); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should report after a ref-fed parameter is overwritten with a plain value", () => {
    const code =
      "function C() { const ref = useRef(0); const [data, setData] = useState(0); const update = (value) => { value = 0; setData(value); }; useEffect(() => { update(ref.current); }, []); }";
    expect(inferViolationNames(code)).toEqual(["setData"]);
  });

  it("should allow a compound update of a ref-derived local", () => {
    const code =
      "function C() { const ref = useRef(0); const [data, setData] = useState(0); useEffect(() => { let next = ref.current; next += 1; setData(next); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });

  it("should allow a conditional plain overwrite when another path remains ref-derived", () => {
    const code =
      "function C() { const ref = useRef(0); const [data, setData] = useState(0); useEffect(() => { let next = ref.current; if (cond) { next = 0; } setData(next); }, []); }";
    expect(inferViolationNames(code)).toEqual([]);
  });
});
