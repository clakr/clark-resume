import type { SubmitHandler, UseFormReset } from "react-hook-form";
import type { AboutFormType } from "../types";
import { api } from "./api";
import type useModal from "./useModal";

const useFormSubmit = ({
  modalStates: {
    itemIdState: [, setItemId],
    addModalState: [, setIsAddOpen],
    updateModalState: [, setIsUpdateOpen],
    deleteModalState: [, setIsDeleteOpen],
  },
  reset,
}: {
  modalStates: ReturnType<typeof useModal>;
  reset: UseFormReset<AboutFormType>;
}) => {
  const utils = api.useContext();

  const addMutation = api.about.addOne.useMutation({
      async onMutate() {
        const prevData = utils.about.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.about.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.about.getAll.invalidate();
      },
    }),
    updateMutation = api.about.updateOne.useMutation({
      async onMutate() {
        const prevData = utils.about.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.about.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.about.getAll.invalidate();
      },
    }),
    deleteMutation = api.about.deleteOne.useMutation({
      async onMutate() {
        const prevData = utils.about.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.about.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.about.getAll.invalidate();
      },
    });

  const submitAdd: SubmitHandler<AboutFormType> = ({ desc }) => {
    addMutation.mutate({
      desc,
    });
    setItemId(null);
    reset();
    setIsAddOpen(false);
  };

  const submitUpdate: SubmitHandler<AboutFormType> = ({ id, desc }) => {
    updateMutation.mutate({
      id,
      desc,
    });
    setItemId(null);
    reset();
    setIsUpdateOpen(false);
  };

  const submitDelete: SubmitHandler<AboutFormType> = ({ id }) => {
    deleteMutation.mutate({
      id,
    });
    setItemId(null);
    reset();
    setIsDeleteOpen(false);
  };

  return {
    submitAdd,
    submitUpdate,
    submitDelete,
  };
};

export default useFormSubmit;
