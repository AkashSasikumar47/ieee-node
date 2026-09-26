import { Badge } from "@ieee/ui/components/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ieee/ui/components/card";
import { formatEventDate, relativeLabel } from "@/lib/date";
import type { Post } from "@/lib/posts";

export function PostCard({
  post,
  past = false,
}: {
  post: Post;
  past?: boolean;
}) {
  const soon = past ? null : relativeLabel(post.event_date);

  return (
    <Card className={past ? "opacity-60" : undefined}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{post.type}</Badge>
          {soon && <Badge>{soon}</Badge>}
        </div>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription className="whitespace-pre-line">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <time
          dateTime={post.event_date}
          className="text-xs text-muted-foreground"
        >
          {formatEventDate(post.event_date)}
        </time>
      </CardFooter>
    </Card>
  );
}
