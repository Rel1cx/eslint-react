import { Tweet } from "react-tweet";

export function TweetCards({ tweets }: { tweets: string[] }) {
  return (
    <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 sm:gap-x-8 sm:mt-8 justify-center">
      {tweets.map((id) => <Tweet key={id} id={id} />)}
    </div>
  );
}
