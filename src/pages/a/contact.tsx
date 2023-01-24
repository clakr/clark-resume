import { Listbox, Transition } from "@headlessui/react";
import { ContactType } from "@prisma/client";
import type { NextPage } from "next";
import { Fragment } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import Admin from "../../components/Admin";
import FormGroup from "../../components/FormGroup";
import Modal from "../../components/Modal";
import SubmitButton from "../../components/SubmitButton";
import Table from "../../components/Table";
import Textarea from "../../components/Textarea";
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
  const utils = api.useContext();

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

  const addMutation = api.contact.addOne.useMutation({
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
  };

  const submitUpdate: SubmitHandler<Form> = ({ id, desc, type }) => {
    updateMutation.mutate({
      id,
      desc,
      type,
    });
    setItemId(null);
    reset();
    setIsUpdateOpen(false);
  };

  const submitDelete: SubmitHandler<Form> = ({ id }) => {
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
        <form onSubmit={handleSubmit(submitAdd)} className="space-y-2">
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
        <form onSubmit={handleSubmit(submitUpdate)} className="space-y-2">
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
      <FormGroup label="type">
        <Controller
          name="type"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Listbox
              as="div"
              className="flex flex-col gap-1"
              value={value}
              onChange={onChange}
            >
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-slate-300 bg-slate-200 px-4 py-2 text-left text-sm capitalize outline-slate-400 dark:border-slate-700 dark:bg-slate-800">
                  {value}
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform opacity-0 -translate-y-8"
                  enterTo="transform opacity-100 translate-y-0"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform opacity-100 translate-y-0"
                  leaveTo="transform opacity-0 -translate-y-8"
                >
                  <Listbox.Options className="absolute mt-2 w-full rounded-md border-2 border-slate-200 bg-white p-1 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-800">
                    {Object.values(ContactType).map((value) => (
                      <Listbox.Option value={value} key={value} as={Fragment}>
                        {({ active, selected }) => (
                          <li
                            className={`flex cursor-pointer items-center justify-between rounded-sm px-4 py-2 ${
                              active && "bg-slate-200 dark:bg-slate-700"
                            } ${selected && "font-medium"}`}
                          >
                            {value}
                            {selected && <FaCheck />}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          )}
        />
      </FormGroup>
      <FormGroup label="desc">
        <Textarea
          {...register("desc", {
            required: true,
          })}
        />
      </FormGroup>
    </>
  );
};
