import { ErrorMessage } from "formik";
import { HTMLAttributes } from "react";

type FormControllerProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  error?: string;
  name: string;
};

export const FormController = (props: FormControllerProps) => {
  return (
    <div {...props}>
      <label>{props.label}</label>
      {props.children}
      <ErrorMessage
        className="text-red-700 text-sm"
        name={props.name}
        component="div"
      />
    </div>
  );
};
