import { Field, FieldInputProps, FieldProps } from "formik";
import { HTMLAttributes } from "react";

type InputProps = HTMLAttributes<HTMLTextAreaElement> & {
  type?: "text" | "password";
  name?: string;
  className?: string;
};

export const Textarea = (props: InputProps) => {
  return (
    <Field
      {...props}
      render={({
        field,
        form: { isSubmitting },
      }: {
        field: FieldInputProps<string>;
        form: { isSubmitting: boolean };
      }) => (
        <textarea
          {...field}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 p-1 ${
            props.className ?? ""
          }`}
          disabled={isSubmitting}
        />
      )}
    />
  );
};
