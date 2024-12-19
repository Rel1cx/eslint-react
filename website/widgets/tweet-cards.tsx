import { Tweet } from "react-tweet";

export function TweetCards({ tweets }: { tweets: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-0 mt-10">
      {tweets.map((id) => <Tweet key={id} id={id} />)}
    </div>
  );
}
