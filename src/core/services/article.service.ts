import { Article, Comment, PrismaClient, User } from "@prisma/client";
import {
  TCreateArticleInput,
  TCreateCommentInput,
  TUpdateArticleInput,
} from "../../types";
import {
  CreateArticleInputSchema,
  CreateCommentInputSchema,
  UpdateArticleInputSchema,
} from "../../schemas";
import { inputValidation } from "../helpers";
import { ForbiddenError, NotFoundError } from "../errors";
import { TArticleExtended } from "@/types";
import { BaseService } from "./base.service";
import { use } from "react";

export class ArticleService extends BaseService {
  constructor(protected readonly db = new PrismaClient()) {
    super(db);
  }

  async list(): Promise<Article[]> {
    const articles = await this.db.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    return articles;
  }

  async single(id: number, user: User): Promise<TArticleExtended | null> {
    const article = await this.db.article.findFirst({
      where: { id },
    });
    const comments = await this.db.comment.findMany({
      where: { articleId: id },
      include: { user: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    const groupUsers = await this.db.upvote.groupBy({
      by: ["articleId"],
      _count: {
        userId: true,
      },
      where: {
        articleId: id,
      },
    });
    const upvote = await this.db.upvote.findFirst({
      where: {
        articleId: id,
        userId: user?.id,
      },
    });
    if (!article) {
      throw new NotFoundError(`Article with id ${id} not found`);
    }
    return {
      ...article,
      comments,
      upvotesCount: groupUsers?.[0]?._count?.userId ?? 0,
      isUpvoted: !!upvote,
    };
  }

  async create(
    input: TCreateArticleInput,
    author: User
  ): Promise<Article | null> {
    inputValidation(CreateArticleInputSchema, input);
    const article = await this.db.article.create({
      data: { ...input, author: { connect: { id: author.id } } },
    });
    return article;
  }

  async update(
    id: number,
    input: TUpdateArticleInput,
    author: User
  ): Promise<Article | null> {
    inputValidation(UpdateArticleInputSchema, input);

    let article = await this.db.article.findFirst({ where: { id } });
    if (!article) {
      throw new NotFoundError(`Article with id ${id} not found`);
    }
    if (article.authorId !== author.id) {
      throw new ForbiddenError();
    }
    article = await this.db.article.update({
      data: { ...input },
      where: {
        id,
      },
    });
    return article;
  }

  async delete(id: number, author: User): Promise<boolean> {
    const article = await this.db.article.findFirst({ where: { id } });
    if (!article) {
      throw new NotFoundError(`Article with id ${id} not found`);
    }
    if (article.authorId !== author.id) {
      throw new ForbiddenError();
    }
    await this.db.article.delete({ where: { id } });
    return true;
  }

  async createComment(
    id: number,
    input: TCreateCommentInput,
    user: User
  ): Promise<Comment | null> {
    inputValidation(CreateCommentInputSchema, input);
    const article = await this.db.article.findFirst({ where: { id } });
    if (!article) {
      throw new NotFoundError(`Article with id ${id} not found`);
    }
    const comment = await this.db.comment.create({
      data: {
        ...input,
        article: { connect: { id } },
        user: { connect: { id: user.id } },
      },
    });
    return comment;
  }

  async upvote(id: number, user: User): Promise<boolean> {
    const article = await this.db.article.findFirst({ where: { id } });
    if (!article) {
      throw new NotFoundError(`Article with id ${id} not found`);
    }
    const upvote = await this.db.upvote.findFirst({
      where: {
        articleId: id,
        userId: user.id,
      },
    });
    if (upvote) {
      await this.db.upvote.delete({
        where: {
          articleId_userId: {
            articleId: id,
            userId: user.id,
          },
        },
      });
    } else {
      await this.db.upvote.create({
        data: {
          article: { connect: { id } },
          user: { connect: { id: user.id } },
        },
      });
    }
    return true;
  }
}
