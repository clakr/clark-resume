import { MiscellaneousType } from "@prisma/client";
import type { NextPage } from "next";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import Admin from "../../components/Admin";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import SubmitButton from "../../components/SubmitButton";
import Table from "../../components/Table";
import type {
  MiscellaneousFormType,
  TableHeading,
  TableOptions,
} from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";
import useModal from "../../utils/useModal";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.miscellaneous.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

type Form = MiscellaneousFormType;

const Miscellaneous: NextPage = () => {
  const { data = [] } = api.miscellaneous.getAll.useQuery();

  const formInstance = useForm<Form>({
      defaultValues: {
        id: "",
        name: "",
        type: "TECHNICAL",
      },
    }),
    { handleSubmit, reset, setValue } = formInstance;

  const modalStates = useModal(),
    { itemIdState, addModalState, updateModalState, deleteModalState } =
      modalStates,
    [itemId, setItemId] = itemIdState,
    [, setIsAddOpen] = addModalState,
    [, setIsUpdateOpen] = updateModalState,
    [, setIsDeleteOpen] = deleteModalState;

  const utils = api.useContext(),
    addMutation = api.miscellaneous.addOne.useMutation({
      async onMutate() {
        const prevData = utils.miscellaneous.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.miscellaneous.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.miscellaneous.getAll.invalidate();
      },
    }),
    updateMutation = api.miscellaneous.updateOne.useMutation({
      async onMutate() {
        const prevData = utils.miscellaneous.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.miscellaneous.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.miscellaneous.getAll.invalidate();
      },
    }),
    deleteMutation = api.miscellaneous.deleteOne.useMutation({
      async onMutate() {
        const prevData = utils.miscellaneous.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.miscellaneous.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.miscellaneous.getAll.invalidate();
      },
    });

  const submitAdd: SubmitHandler<Form> = ({ name, type }) => {
      addMutation.mutate({
        name,
        type,
      });
      setItemId(null);
      reset();
      setIsAddOpen(false);
    },
    submitUpdate: SubmitHandler<Form> = ({ id, name, type }) => {
      updateMutation.mutate({
        id,
        name,
        type,
      });
      setItemId(null);
      reset();
      setIsUpdateOpen(false);
    },
    submitDelete: SubmitHandler<Form> = ({ id }) => {
      deleteMutation.mutate({
        id,
      });
      setItemId(null);
      reset();
      setIsDeleteOpen(false);
    };

  const options: TableOptions[] = [
    {
      icon: FaEdit,
      intent: "Update",
      onClick(id) {
        setItemId(id);
        setIsUpdateOpen(true);
      },
    },
    {
      icon: FaTrash,
      intent: "Delete",
      onClick(id) {
        setItemId(id);
        setIsDeleteOpen(true);
      },
    },
  ];

  if (itemId) {
    const updateItem = data?.find(({ id }) => itemId === id);
    if (updateItem) {
      setValue("id", updateItem.id);
      setValue("name", updateItem.name);
      setValue("type", updateItem.type);
    }
  }

  return (
    <Admin pageTitle={category}>
      <Table>
        <Table.Head>
          {tableHeadRows.map(({ text, ...rest }, index) => (
            <Table.Heading {...rest} key={index}>
              {text}
            </Table.Heading>
          ))}
        </Table.Head>
        <Table.Body>
          {data.map(({ id, name, type }) => (
            <Table.BodyRow key={id}>
              <Table.Data>{name}</Table.Data>
              <Table.Data>{type}</Table.Data>
              <Table.DataOptions options={options} id={id} />
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.AddCategory
          category={category}
          colSpan={tableHeadRows.length + 1}
          buttonOnClick={() => setIsAddOpen(true)}
        />
      </Table>

      <Modal
        title={`Add ${category}`}
        modalState={addModalState}
        itemIdState={itemIdState}
        reset={reset}
      >
        <form onSubmit={handleSubmit(submitAdd)} className="space-y-3">
          <Form form={formInstance} />
          <SubmitButton intent="Add" category={category} />
        </form>
      </Modal>
      <Modal
        title={`Update ${category}`}
        modalState={updateModalState}
        itemIdState={itemIdState}
        reset={reset}
      >
        <form onSubmit={handleSubmit(submitUpdate)} className="space-y-3">
          <Form form={formInstance} />
          <SubmitButton intent="Update" category={category} />
        </form>
      </Modal>
      <Modal
        title={`Delete ${category}`}
        modalState={deleteModalState}
        itemIdState={itemIdState}
        reset={reset}
      >
        <form onSubmit={handleSubmit(submitDelete)}>
          <SubmitButton intent="Delete" category={category} />
        </form>
      </Modal>
    </Admin>
  );
};

export default Miscellaneous;

const category = "Miscellaneous",
  tableHeadRows: TableHeading[] = [
    {
      text: "Name",
    },
    {
      text: "Type",
    },
  ];

const Form = ({ form }: { form: UseFormReturn<Form> }) => {
  const { register, control } = form;

  return (
    <>
      <FormGroup label="type">
        <Controller
          name="type"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select value={value} onChange={onChange}>
              <Select.Button>{value}</Select.Button>
              <Select.Options>
                {Object.values(MiscellaneousType).map((value, index) => (
                  <Select.Option
                    value={value}
                    key={index}
                    displayName={value}
                  />
                ))}
              </Select.Options>
            </Select>
          )}
        />
      </FormGroup>
      <FormGroup label="desc">
        <Input
          {...register("name", {
            required: true,
          })}
        />
      </FormGroup>
    </>
  );
};
