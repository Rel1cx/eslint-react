import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./purity";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // -------------------------------------------------------------------------
    // Impure function calls in function components
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const id = Math.random();
          return <div key={id}>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const timestamp = Date.now();
          return <div>Created at: {timestamp}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const uuid = crypto.randomUUID();
          return <div id={uuid}>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const buf = new Uint8Array(16);
          crypto.getRandomValues(buf);
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const t = performance.now();
          return <div>{t}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const el = document.getElementById("root");
          return <div>{el?.textContent}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const value = localStorage.getItem("key");
          return <div>{value}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const value = sessionStorage.getItem("key");
          return <div>{value}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          window.fetch("/api/data");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          history.pushState(null, "", "/new");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          location.assign("/new");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          navigator.sendBeacon("/log", "data");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          Notification.requestPermission();
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const url = URL.createObjectURL(new Blob());
          return <img src={url} />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          window.setTimeout(() => {}, 1000);
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          window.addEventListener("resize", () => {});
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          indexedDB.open("myDB");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          Object.assign(window, { foo: "bar" });
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          Object.defineProperty(window, "foo", { value: "bar" });
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          Object.freeze(someObj);
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          Reflect.set(target, "prop", value);
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          Reflect.deleteProperty(target, "prop");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          Atomics.add(sharedArray, 0, 1);
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          process.exit(1);
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          caches.open("v1");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          clipboard.writeText("hello");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          cookieStore.get("session");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          navigation.navigate("/page");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          scheduler.postTask(() => {});
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // Impure constructor calls in function components
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const date = new Date();
          return <div>{date.toISOString()}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const ws = new WebSocket("ws://example.com");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const observer = new MutationObserver(() => {});
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const observer = new IntersectionObserver(() => {});
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const observer = new ResizeObserver(() => {});
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const worker = new Worker("worker.js");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const worker = new SharedWorker("worker.js");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const xhr = new XMLHttpRequest();
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const audio = new Audio("sound.mp3");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const ctx = new AudioContext();
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const channel = new BroadcastChannel("test");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const source = new EventSource("/events");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const reader = new FileReader();
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const img = new Image();
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const recorder = new MediaRecorder(stream);
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const source = new MediaSource();
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const stream = new MediaStream();
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const channel = new MessageChannel();
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const notification = new Notification("Hello");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const ctx = new OfflineAudioContext(2, 44100, 44100);
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const observer = new PerformanceObserver(() => {});
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const observer = new ReportingObserver(() => {});
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const pc = new RTCPeerConnection();
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // Impure calls in custom hooks
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function useTimestamp() {
          const t = Date.now();
          return t;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function useRandomId() {
          return Math.random();
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function useDate() {
          const d = new Date();
          return d;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function useStorage() {
          const value = localStorage.getItem("key");
          return value;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function useWebSocket() {
          const ws = new WebSocket("ws://example.com");
          return ws;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function usePerf() {
          const t = performance.now();
          return t;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function useUUID() {
          return crypto.randomUUID();
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // Arrow function components
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const Component = () => {
          const id = Math.random();
          return <div key={id}>Content</div>;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const Component = () => {
          const date = new Date();
          return <div>{date.toISOString()}</div>;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // Multiple impure calls in a single component (multiple errors)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const id = Math.random();
          const timestamp = Date.now();
          console.log("render", id, timestamp);
          return <div>{id} - {timestamp}</div>;
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        function Component() {
          const date = new Date();
          const ws = new WebSocket("ws://example.com");
          return <div>{date.toISOString()}</div>;
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // -------------------------------------------------------------------------
    // Mixed impure function calls and constructor calls
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const id = Math.random();
          const date = new Date();
          return <div key={id}>{date.toISOString()}</div>;
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // -------------------------------------------------------------------------
    // Various console methods in components
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // document methods in components
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const el = document.createElement("div");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const el = document.querySelector(".foo");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const els = document.querySelectorAll(".foo");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // window methods in components
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const style = window.getComputedStyle(el);
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const mq = window.matchMedia("(max-width: 600px)");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          window.requestAnimationFrame(() => {});
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // performance methods in components
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          performance.mark("render-start");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          performance.measure("render", "start", "end");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // Impure calls in arrow function hooks
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const useRandom = () => {
          return Math.random();
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const useNow = () => {
          return new Date();
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // Component assigned to variable (const)
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // NewExpression with type expressions wrapping the callee
    // (getUnderlyingExpression unwraps TSAsExpression, TSNonNullExpression,
    //  TSSatisfiesExpression, and nested type expressions)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const date = new (Date as any)();
          return <div>{date.toISOString()}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const ws = new (WebSocket as any)("ws://example.com");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const date = new (Date satisfies typeof Date)();
          return <div>{date.toISOString()}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const date = new (Date!)();
          return <div>{date.toISOString()}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      // Nested type expressions — getUnderlyingExpression unwraps recursively
      code: tsx`
        function Component() {
          const date = new (Date as unknown as any)();
          return <div>{date.toISOString()}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      // TSAsExpression wrapping impure constructor in a custom hook
      code: tsx`
        function useDate() {
          const d = new (Date as any)();
          return d;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // Impure call in JSX expression directly
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          return <div>{Math.random()}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          return <div id={crypto.randomUUID()}>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // CallExpression with type expressions wrapping the callee
    // (getUnderlyingExpression unwraps TSAsExpression, TSNonNullExpression,
    //  TSSatisfiesExpression, and nested type expressions)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const id = (Math.random as any)();
          return <div key={id}>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const t = (Date.now as any)();
          return <div>{t}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const t = (performance.now satisfies any)();
          return <div>{t}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const id = (Math.random!)();
          return <div key={id}>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      // Nested type expressions — getUnderlyingExpression unwraps recursively
      code: tsx`
        function Component() {
          const id = (Math.random as unknown as any)();
          return <div key={id}>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // -------------------------------------------------------------------------
    // Aliased builtins (improved scope-aware resolution)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const M = Math;
          const id = M.random();
          return <div key={id}>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const D = Date;
          const t = D.now();
          return <div>{t}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const P = performance;
          const t = P.now();
          return <div>{t}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const C = crypto;
          const id = C.randomUUID();
          return <div>{id}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const W = window;
          W.fetch("/api");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const Alias = Date;
          const date = new Alias();
          return <div>{date.toISOString()}</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Ported from react-main/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler/error.invalid-impure-functions-in-render
    {
      code: tsx`
        function Component() {
          const date = Date.now();
          const now = performance.now();
          const rand = Math.random();
          return <Foo date={date} now={now} rand={rand} />;
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Ported from react-main/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler/timers
    {
      code: tsx`
        function Component(props) {
          const start = performance.now();
          const now = Date.now();
          const time = performance.now() - start;
          return (
            <div>
              rendering took {time} at {now}
            </div>
          );
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // globalThis.fetch called during render (from React Compiler fixtures)
    {
      code: tsx`
        function Component() {
          globalThis.fetch("/api");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Aliased globalThis calling impure function during render (from React Compiler fixtures)
    {
      code: tsx`
        function Component() {
          const g = globalThis;
          g.fetch("/api");
          return <div>Content</div>;
        }
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    // -------------------------------------------------------------------------
    // Impure calls in event handlers (nested functions)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          return (
            <button onClick={() => console.log(Math.random())}>
              Roll
            </button>
          );
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const handleClick = () => {
            console.log("clicked");
            Math.random();
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          function handleClick() {
            const date = new Date();
            console.log(date);
          }
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const handleSubmit = () => {
            localStorage.setItem("key", "value");
            history.pushState(null, "", "/new");
          };
          return <form onSubmit={handleSubmit}><button>Submit</button></form>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Impure calls inside useEffect callbacks
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            const timestamp = Date.now();
            console.log(timestamp);
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            const el = document.getElementById("root");
            console.log(el);
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            const ws = new WebSocket("ws://example.com");
            return () => ws.close();
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const controller = new AbortController();
          return <div>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            const controller = new AbortController();
            window.fetch("/api", { signal: controller.signal });
            return () => controller.abort();
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            const observer = new MutationObserver(() => {});
            observer.observe(document.body, { childList: true });
            return () => observer.disconnect();
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            window.addEventListener("resize", () => {});
            return () => window.removeEventListener("resize", () => {});
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            const timer = window.setTimeout(() => {}, 1000);
            return () => window.clearTimeout(timer);
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Impure calls inside useLayoutEffect callbacks
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          useLayoutEffect(() => {
            const el = document.querySelector(".foo");
            const style = window.getComputedStyle(el);
            console.log(style);
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Impure calls inside useState initializer
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const [id] = useState(() => crypto.randomUUID());
          return <div key={id}>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [id] = useState(() => Math.random());
          return <div key={id}>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [date] = useState(() => new Date());
          return <div>{date.toISOString()}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [time] = useState(() => Date.now());
          return <div>{time}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Impure calls inside useMemo / useCallback callbacks
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const value = useMemo(() => Math.random(), []);
          return <div>{value}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const fn = useCallback(() => {
            console.log("called");
            return Date.now();
          }, []);
          return <button onClick={fn}>Click</button>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Impure calls outside components and hooks (plain functions)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function helperFunction() {
          console.log("not a component");
          const date = new Date();
          return date;
        }
      `,
    },
    {
      code: tsx`
        const getRandomId = () => {
          return Math.random();
        };
      `,
    },
    {
      code: tsx`
        function setup() {
          const ws = new WebSocket("ws://example.com");
          localStorage.setItem("connected", "true");
          return ws;
        }
      `,
    },
    {
      code: tsx`
        const initialize = () => {
          const date = new Date();
          console.log("initialized at", date);
          return date;
        };
      `,
    },
    // -------------------------------------------------------------------------
    // Pure calls in components (should not trigger)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const value = Math.floor(3.14);
          const max = Math.max(1, 2, 3);
          const min = Math.min(1, 2, 3);
          return <div>{value} {max} {min}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const arr = [3, 1, 2];
          const sorted = Array.from(arr).sort();
          return <div>{sorted.join(",")}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const str = String.fromCharCode(65);
          return <div>{str}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const keys = Object.keys({ a: 1, b: 2 });
          const values = Object.values({ a: 1, b: 2 });
          const entries = Object.entries({ a: 1, b: 2 });
          return <div>{keys.length} {values.length} {entries.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const n = Number.parseInt("42", 10);
          return <div>{n}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const json = JSON.stringify({ a: 1 });
          const parsed = JSON.parse(json);
          return <div>{json}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Component with no impure calls at all
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component({ name }) {
          return <div>Hello, {name}!</div>;
        }
      `,
    },
    {
      code: tsx`
        const Component = ({ items }) => {
          return (
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          );
        };
      `,
    },
    // -------------------------------------------------------------------------
    // Hook returning callback with impure call (not called during render)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function useLogger() {
          return (message) => {
            console.log(message);
          };
        }
      `,
    },
    {
      code: tsx`
        function useTimer() {
          return () => {
            return Date.now();
          };
        }
      `,
    },
    {
      code: tsx`
        function useRandom() {
          return () => Math.random();
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Impure calls inside useRef initializer callback pattern
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          useEffect(() => {
            ref.current = new IntersectionObserver(() => {});
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Top-level (module scope) impure calls — not inside any function
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const timestamp = Date.now();
        function Component() {
          return <div>{timestamp}</div>;
        }
      `,
    },
    {
      code: tsx`
        const id = Math.random();
        function Component() {
          return <div key={id}>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        console.log("module loaded");
        function Component() {
          return <div>Content</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Impure calls in nested non-component/non-hook helper functions inside component
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          function formatDate() {
            return new Date().toISOString();
          }
          return <button onClick={() => formatDate()}>Format</button>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const log = () => {
            console.log("logged");
          };
          return <button onClick={log}>Log</button>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Hook with impure calls only inside effect/callback
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function useInterval(callback, delay) {
          useEffect(() => {
            const id = window.setInterval(callback, delay);
            return () => window.clearInterval(id);
          }, [callback, delay]);
        }
      `,
    },
    {
      code: tsx`
        function useFetch(url) {
          useEffect(() => {
            const controller = new AbortController();
            window.fetch(url, { signal: controller.signal });
            return () => controller.abort();
          }, [url]);
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Component using React.createElement (not JSX)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          return React.createElement("div", null, "Content");
        }
      `,
    },
    // -------------------------------------------------------------------------
    // NewExpression with type expressions in valid positions (not in component/hook)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function setup() {
          const date = new (Date as any)();
          return date;
        }
      `,
    },
    {
      code: tsx`
        const initialize = () => {
          const ws = new (WebSocket as any)("ws://example.com");
          return ws;
        };
      `,
    },
    {
      // Type-wrapped impure constructor inside useEffect — not flagged
      code: tsx`
        function Component() {
          useEffect(() => {
            const date = new (Date as any)();
            console.log(date);
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    {
      // Type-wrapped impure constructor inside useState initializer — not flagged
      code: tsx`
        function Component() {
          const [date] = useState(() => new (Date as any)());
          return <div>{date.toISOString()}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // new Date(arg) with arguments is pure (deterministic)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component({ myDate }: { myDate: string }) {
          return new Date(myDate) < new Date("2020-01-01") ? <span>one</span> : <span>two</span>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const date = new Date("2024-01-01");
          return <div>{date.toISOString()}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component({ timestamp }: { timestamp: number }) {
          const date = new Date(timestamp);
          return <div>{date.toISOString()}</div>;
        }
      `,
    },
    {
      code: tsx`
        function useFormattedDate(input: string) {
          const date = new Date(input);
          return date.toLocaleDateString();
        }
      `,
    },
    {
      code: tsx`
        function Component({ year, month, day }: { year: number; month: number; day: number }) {
          const date = new Date(year, month, day);
          return <div>{date.toISOString()}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Local shadowing of builtins (should NOT be flagged)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          const Math = { random: () => 0.5 };
          const id = Math.random();
          return <div>{id}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component(Date: { now: () => number }) {
          const t = Date.now();
          return <div>{t}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          function fetch() { return "mock"; }
          const result = fetch();
          return <div>{result}</div>;
        }
      `,
    },
    // Ported from react-main/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler/renamed-reanimated-math-random
    {
      code: tsx`
        import Animated, { Easing } from "react-native-reanimated";

        function Component({ color }) {
          const animation = Animated.loop(
            Animated.timing(value, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          );
          return (
            <Animated.View style={{
              backgroundColor: color,
              shadowColor: "red",
            }} />
          );
        }
      `,
    },
    // Math.random inside onPress callback (from React Compiler fixtures)
    {
      code: tsx`
        import {useSharedValue} from 'react-native-reanimated';

        function SomeComponent() {
          const sharedVal = useSharedValue(0);
          return (
            <Button
              onPress={() => (sharedVal.value = Math.random())}
              title="Randomize"
            />
          );
        }
      `,
    },
    // globalThis alias for setTimeout in effect (from React Compiler fixtures)
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            const g = globalThis;
            const id = g.setTimeout(() => {}, 1000);
            return () => g.clearTimeout(id);
          }, []);
          return <div>Content</div>;
        }
      `,
    },
  ],
});
