import { useRef } from "react";
import { Button } from ".";
import { useDeleteArticle } from "@/hooks";
import { useRouter } from "next/navigation";

export function DeleteArticleButton(props: { articleId: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { mutate } = useDeleteArticle({
    onSuccess: () => {
      closeDialog();
      router.push("/u");
    },
  });

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <div
        className="inline-block text-red-700 cursor-pointer"
        onClick={openDialog}
      >
        Delete
      </div>
      <dialog
        ref={dialogRef}
        className="w-full max-w-[350px] bg-primary bg-opacity-80 rounded-md"
      >
        <div className="p-3">
          <h4 className="mb-3 font-bold">
            Are you sure to delete this article?
          </h4>
          <div className="flex gap-3 justify-center items-center">
            <Button onClick={() => mutate(props.articleId)}>Delete</Button>
            <div className="p-1 cursor-pointer" onClick={closeDialog}>
              Cancel
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
