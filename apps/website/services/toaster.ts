import type { ToastActionElement, ToastProps } from "#/components/ui/Toast";
import { Atom, Registry } from "@effect-atom/atom-react";
import * as Array from "effect/Array";
import * as Effect from "effect/Effect";
import * as Queue from "effect/Queue";
import * as Ref from "effect/Ref";

export interface Toast extends ToastProps {
  readonly id: string;
  readonly description?: React.ReactNode;
  readonly title?: string;
  readonly action?: ToastActionElement;
}

export const toastsAtom = Atom.make(Array.empty<Toast>());

export class Toaster extends Effect.Service<Toaster>()("app/Toaster", {
  scoped: Effect.gen(function*() {
    const counter = yield* Ref.make(0);
    const removeQueue = yield* Queue.unbounded<string>();
    const registry = yield* Registry.AtomRegistry;

    const nextId = Ref.getAndUpdate(counter, (n) => n + 1).pipe(
      Effect.map((n) => (n % Number.MAX_SAFE_INTEGER).toString()),
    );

    function createToast(id: string, toast: Omit<Toast, "id">): Toast {
      return {
        ...toast,
        id,
        onOpenChange: (open) => !open && dismissToast(id),
        open: true,
      };
    }

    function addToast(toast: Omit<Toast, "id">) {
      return nextId.pipe(Effect.andThen((id) => registry.update(toastsAtom, Array.prepend(createToast(id, toast)))));
    }

    function removeToast(id: string) {
      return Effect.sync(() =>
        registry.update(
          toastsAtom,
          Array.filter((toast) => toast.id !== id),
        )
      );
    }

    function dismissToast(id: string) {
      Queue.unsafeOffer(removeQueue, id);
      registry.update(
        toastsAtom,
        Array.map((toast) => (toast.id === id ? { ...toast, open: false } : toast)),
      );
    }

    yield* Queue.take(removeQueue).pipe(
      Effect.flatMap((id) => removeToast(id).pipe(Effect.delay("5 seconds"), Effect.fork)),
      Effect.forever,
      Effect.forkScoped,
      Effect.interruptible,
    );

    return {
      toast: addToast,
    } as const;
  }),
}) {}
