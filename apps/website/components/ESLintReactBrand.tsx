import logo from "@/assets/logo.svg";
import { identity } from "@local/eff";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { P, match } from "ts-pattern";

export function ESLintReactBrand() {
  return (
    <div className="flex flex-col items-center gap-4 m-0 mx-auto p-8 w-fit">
      <Link href="/docs/brand-assets">
        <Image
          alt="logo"
          height="150"
          quality={100}
          src={match(logo)
            .with({ height: P.number, src: P.string, width: P.number }, identity)
            .otherwise(() => "")}
          width="150"
        />
      </Link>
      <span className="text-2xl">ESLint React</span>
      <p className="text-center text-fd-prose-body pt-4">
        Composable ESLint rules for React and friends.
      </p>
    </div>
  );
}
