import { HTMLAttributes } from "react";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit";
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`flex justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </button>
  );
};
