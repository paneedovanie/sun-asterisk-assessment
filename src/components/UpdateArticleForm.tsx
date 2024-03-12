import { Form, Formik } from "formik";
import { Card } from "./Card";
import { toFormikValidate } from "zod-formik-adapter";
import { UpdateArticleInputSchema } from "@/schemas";
import { FormError } from "./FormError";
import { FormController } from "./FormController";
import { Textarea } from "./Textarea";
import { Input } from "./Input";
import { Button } from "./Button";
import { useUpdateArticle } from "@/hooks";
import { Article } from "@prisma/client";
import Link from "next/link";

export const UpdateArticleForm = (props: { article: Article }) => {
  const { error, mutate } = useUpdateArticle(props.article.id);

  return (
    <Card>
      <h1 className="text-center text-2xl text-cyan-700 font-bold mb-3">
        Update Article
      </h1>
      <Formik
        initialValues={{
          title: props.article.title,
          content: props.article.content,
        }}
        validate={toFormikValidate(UpdateArticleInputSchema)}
        onSubmit={(values) => mutate(values)}
      >
        <Form className="flex flex-col gap-3">
          <FormError error={error} />
          <FormController label="Title" name="title">
            <Input name="title" />
          </FormController>
          <FormController label="Content" name="content">
            <Textarea name="content" />
          </FormController>
          <Button type="submit">Post</Button>
          <Link
            className="w-full p-1 text-center"
            href={`/u/articles/${props.article.id}`}
          >
            Cancel
          </Link>
        </Form>
      </Formik>
    </Card>
  );
};
