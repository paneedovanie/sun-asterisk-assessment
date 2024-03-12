import { Field } from "formik";
import { HTMLAttributes } from "react";

type InputProps = HTMLAttributes<HTMLInputElement> & {
  type?: "text" | "password";
  name?: string;
};

export const Input = (props: InputProps) => {
  return (
    <Field
      {...props}
      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 p-1 ${
        props.className ?? ""
      }`}
    />
  );
};
