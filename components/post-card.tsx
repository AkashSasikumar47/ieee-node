"use client";

import { motion } from "motion/react";
import { Badge } from "@ieee/ui/components/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ieee/ui/components/card";
import { revealItem } from "@/components/motion/reveal";
import { formatEventDate } from "@/lib/date";
import type { Post } from "@/lib/posts";

const Title = motion.create(CardTitle);
const Description = motion.create(CardDescription);
const Tag = motion.create(Badge);

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
        <Title variants={revealItem}>{post.title}</Title>
        <Description variants={revealItem} className="whitespace-pre-line">
          {post.description}
        </Description>
      </CardHeader>
      <CardFooter className="justify-between">
        <motion.time
          variants={revealItem}
          dateTime={post.event_date}
          className="text-xs text-muted-foreground"
        >
          {formatEventDate(post.event_date)}
        </motion.time>
        <Tag variants={revealItem} variant="outline">
          {post.type}
        </Tag>
      </CardFooter>
      {actions && (
        <CardFooter className="grid grid-cols-2 gap-2">{actions}</CardFooter>
      )}
    </Card>
  );
}
