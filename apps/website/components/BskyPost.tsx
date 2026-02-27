import { cn } from "#/lib/cn";
import { Post } from "bsky-react-post";
import "bsky-react-post/theme.css";

export interface BskyPostProps {
  id: string;
  classNames?: string;
  handle: string;
}

export function BskyPost({ id, classNames, handle }: BskyPostProps) {
  return (
    <div className={cn("not-prose my-8", "bsky-post", classNames)}>
      <Post handle={handle} id={id} />
    </div>
  );
}
