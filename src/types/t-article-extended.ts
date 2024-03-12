import { Article, Comment, User } from "@prisma/client";

export type TArticleExtended = Article & {
  comments: (Comment & { user: User })[];
  upvotesCount: number;
  isUpvoted: boolean;
};
