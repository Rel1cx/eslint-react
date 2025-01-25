import { useMemo } from "react";
import { Tweet } from "react-tweet";

import { chunk } from "#/lib/chunk";
import { cn } from "#/lib/cn";

export function TweetCards({ className, tweets }: { className?: string; tweets: string[] }) {
  const chunkedTweets = useMemo(() => chunk(tweets, 2), [tweets]);
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 md:gap-x-12 mt-8 max-w-3xl", className)}>
      {chunkedTweets.map((chunk) => (
        <div className="grid justify-center" key={chunk.join("_")}>
          {chunk.map((id) => (
            <div className="h-fit max-w-full" key={id}>
              <Tweet id={id} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
