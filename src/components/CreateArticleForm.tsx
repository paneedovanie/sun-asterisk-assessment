import { Form, Formik } from "formik";
import { Card } from "./Card";
import { toFormikValidate } from "zod-formik-adapter";
import { CreateArticleInputSchema } from "@/schemas";
import { FormError } from "./FormError";
import { FormController } from "./FormController";
import { Textarea } from "./Textarea";
import { Input } from "./Input";
import { Button } from "./Button";
import { useCreateArticle } from "@/hooks";
import Link from "next/link";

export const CreateArticleForm = () => {
  const { error, mutate } = useCreateArticle();

  return (
    <Card>
      <h1 className="text-center text-2xl text-cyan-700 font-bold mb-3">
        Create Article
      </h1>
      <Formik
        initialValues={{
          title: "",
          content: "",
        }}
        validate={toFormikValidate(CreateArticleInputSchema)}
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
          <Link as="div" className="w-full p-1 text-center" href="/u">
            Cancel
          </Link>
        </Form>
      </Formik>
    </Card>
  );
};
