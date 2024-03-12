import { Form, Formik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import { CreateCommentInputSchema } from "@/schemas";
import { FormController } from "./FormController";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { useCreateComment } from "@/hooks";

export const CreateCommentForm = (props: {
  articleId: number;
  onSuccess: () => void;
}) => {
  const { mutate } = useCreateComment(props.articleId);

  return (
    <Formik
      initialValues={{
        content: "",
      }}
      validate={toFormikValidate(CreateCommentInputSchema)}
      onSubmit={(values, { resetForm }) =>
        mutate(values, {
          onSuccess: () => {
            resetForm();
            props.onSuccess();
          },
        })
      }
    >
      <Form className="flex items-start gap-3">
        <FormController name="content" className="flex-1">
          <Textarea name="content" />
        </FormController>
        <Button type="submit">Comment</Button>
      </Form>
    </Formik>
  );
};
