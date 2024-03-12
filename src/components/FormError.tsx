export const FormError = (props: { error: unknown }) => {
  if (!props.error) {
    return null;
  }
  return (
    <div className="bg-red-200 text-red-700 p-2 rounded-md">
      {props.error as string}
    </div>
  );
};
