import { Menu } from "@headlessui/react";
import type { NextPage } from "next";
import { useState } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import Admin from "../../components/Admin";
import FormGroup from "../../components/FormGroup";
import Modal from "../../components/Modal";
import SubmitButton from "../../components/SubmitButton";
import Table from "../../components/Table";
import Textarea from "../../components/Textarea";
import type { AboutFormType, TableHeading, TableOptions } from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.about.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

const category = "About",
  tableHeadRows: TableHeading[] = [
    {
      text: "Description",
    },
  ];

const Form = ({ form }: { form: UseFormReturn<AboutFormType> }) => {
  const { register } = form;

  return (
    <FormGroup label="Description">
      <Textarea
        {...register("desc", {
          required: true,
        })}
      />
    </FormGroup>
  );
};

const About: NextPage = () => {
  const { data } = api.about.getAll.useQuery();

  const utils = api.useContext();
  const addMutation = api.about.addOne.useMutation({
      async onMutate() {
        const prevData = utils.about.getAll.getData();
        return { prevData };
      },
      onError(err, newAbout, ctx) {
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
      onError(err, newAbout, ctx) {
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

  const itemIdState = useState<string | null>(null),
    addModalState = useState(false),
    updateModalState = useState(false),
    deleteModalState = useState(false),
    [itemId, setItemId] = itemIdState,
    [, setIsAddOpen] = addModalState,
    [, setIsUpdateOpen] = updateModalState,
    [, setIsDeleteOpen] = deleteModalState;

  const formInstance = useForm<AboutFormType>({
    defaultValues: {
      id: "",
      desc: "",
    },
  });

  const { handleSubmit, reset, setValue } = formInstance;

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
          {data?.map(({ id, desc }) => (
            <Table.BodyRow key={id}>
              <Table.Data>{desc}</Table.Data>
              <Table.DataOptions>
                {options.map(({ icon: Icon, intent, onClick }, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        className={`flex items-center justify-start gap-3 rounded p-2 ${
                          active &&
                          "bg-slate-400 text-slate-50 dark:bg-slate-500"
                        }`}
                        onClick={() => onClick(id)}
                      >
                        <Icon />
                        {intent}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Table.DataOptions>
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
        <form onSubmit={handleSubmit(submitAdd)}>
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
        <form onSubmit={handleSubmit(submitUpdate)}>
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

export default About;
