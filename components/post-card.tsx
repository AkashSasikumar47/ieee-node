import { Badge } from "@ieee/ui/components/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ieee/ui/components/card";
import { formatEventDate } from "@/lib/date";
import type { Post } from "@/lib/posts";

export function PostCard({
  post,
  actions,
}: {
  post: Post;
  actions?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription className="whitespace-pre-line">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <time
          dateTime={post.event_date}
          className="text-xs text-muted-foreground"
        >
          {formatEventDate(post.event_date)}
        </time>
        <Badge variant="outline">{post.type}</Badge>
      </CardFooter>
      {actions && (
        <CardFooter className="grid grid-cols-2 gap-2">{actions}</CardFooter>
      )}
    </Card>
  );
}
