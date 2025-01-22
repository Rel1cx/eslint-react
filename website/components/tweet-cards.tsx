import { useMemo } from "react";
import { Tweet } from "react-tweet";

import { chunk } from "#/lib/chunk";
import { cn } from "#/lib/cn";

export function TweetCards({ tweets, className }: { tweets: string[]; className?: string }) {
  const chunkedTweets = useMemo(() => chunk(tweets, 2), [tweets]);
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 md:gap-x-12 mt-8 max-w-3xl", className)}>
      {chunkedTweets.map((chunk) => (
        <div key={chunk.join("_")} className="grid justify-center">
          {chunk.map((id) => (
            <div key={id} className="h-fit max-w-full">
              <Tweet id={id} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
