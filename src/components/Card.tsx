import { HTMLAttributes } from "react";

export const Card = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`p-3 border border-gray-300 rounded-lg ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </div>
  );
};
