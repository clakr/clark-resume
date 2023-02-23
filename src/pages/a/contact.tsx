import { ContactType } from "@prisma/client";
import type { NextPage } from "next";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import Admin from "../../components/Admin";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import SubmitButton from "../../components/SubmitButton";
import Table from "../../components/Table";
import type { ContactFormType, TableHeading, TableOptions } from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";
import useModal from "../../utils/useModal";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.contact.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

type Form = ContactFormType;

const Contact: NextPage = () => {
  const { data } = api.contact.getAll.useQuery();

  const formInstance = useForm<Form>({
      defaultValues: {
        id: "",
        desc: "",
        type: "ADDRESS",
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
    addMutation = api.contact.addOne.useMutation({
      async onMutate() {
        const prevData = utils.contact.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.contact.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.contact.getAll.invalidate();
      },
    }),
    updateMutation = api.contact.updateOne.useMutation({
      async onMutate() {
        const prevData = utils.contact.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.contact.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.contact.getAll.invalidate();
      },
    }),
    deleteMutation = api.contact.deleteOne.useMutation({
      async onMutate() {
        const prevData = utils.contact.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.contact.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.contact.getAll.invalidate();
      },
    });

  const submitAdd: SubmitHandler<Form> = ({ desc, type }) => {
      addMutation.mutate({
        desc,
        type,
      });
      setItemId(null);
      reset();
      setIsAddOpen(false);
    },
    submitUpdate: SubmitHandler<Form> = ({ id, desc, type }) => {
      updateMutation.mutate({
        id,
        desc,
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
      setValue("desc", updateItem.desc);
      setValue("type", updateItem.type);
    }
  }

  return (
    <>
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
            {data?.map(({ id, desc, type }) => (
              <Table.BodyRow key={id}>
                <Table.Data>{desc}</Table.Data>
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
      </Admin>

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
    </>
  );
};

export default Contact;

const category = "Contact",
  tableHeadRows: TableHeading[] = [
    {
      text: "Description",
    },
    {
      text: "Type",
    },
  ];

const Form = ({ form }: { form: UseFormReturn<Form> }) => {
  const { register, control } = form;

  return (
    <>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select field={field}>
            <Select.Label>Type</Select.Label>
            <Select.Button>{field.value}</Select.Button>
            <Select.Options>
              {Object.values(ContactType).map((value, index) => (
                <Select.Option value={value} key={index} displayName={value} />
              ))}
            </Select.Options>
          </Select>
        )}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="form__label">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          className="form__input p-4"
          {...register("desc", {
            required: true,
          })}
        />
      </div>
    </>
  );
};

/*
  TODO:
  - [x] unabstract form inputs
  - [] form validation
    - [] error fields

  Formgroup.tsx
  Textarea.tsx
*/
