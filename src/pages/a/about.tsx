import type { NextPage } from "next";
import { useState } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import Admin from "../../components/Admin";
import FormGroup from "../../components/FormGroup";
import Modal from "../../components/Modal";
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

const intent = "About",
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

  const addModalState = useState(false),
    updateModalState = useState(false),
    deleteModalState = useState(false),
    [, setIsAddOpen] = addModalState,
    [, setIsUpdateOpen] = updateModalState,
    [, setIsDeleteOpen] = deleteModalState;

  const formInstance = useForm<AboutFormType>({
    defaultValues: {
      id: "",
      desc: "",
    },
  });

  const addMutation = api.about.addOne.useMutation(),
    updateMutation = api.about.updateOne.useMutation(),
    deleteMutation = api.about.deleteOne.useMutation();

  const { handleSubmit, reset } = formInstance;

  const submitAdd: SubmitHandler<AboutFormType> = ({ desc }) => {
    addMutation.mutate({
      desc,
    });
    reset();
    setIsAddOpen(false);
  };

  const submitUpdate: SubmitHandler<AboutFormType> = ({ id, desc }) => {
    updateMutation.mutate({
      id,
      desc,
    });
    reset();
    setIsUpdateOpen(false);
  };

  const submitDelete: SubmitHandler<AboutFormType> = ({ id }) => {
    deleteMutation.mutate({
      id,
    });
    reset();
    setIsDeleteOpen(false);
  };

  const options: TableOptions[] = [
    {
      icon: FaEdit,
      intent: "Update",
      onClick: () => setIsUpdateOpen(true),
    },
    {
      icon: FaTrash,
      intent: "Delete",
      onClick: () => setIsDeleteOpen(true),
    },
  ];

  return (
    <Admin pageTitle={intent}>
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
              <Table.DataOptions options={options} />
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.AddIntent
          intent={intent}
          colSpan={tableHeadRows.length + 1}
          buttonOnClick={() => setIsAddOpen(true)}
        />
      </Table>

      <Modal title={`Add ${intent}`} state={addModalState} reset={reset}>
        <form onSubmit={handleSubmit(submitAdd)}>
          <Form form={formInstance} />
          <button type="submit">add</button>
        </form>
      </Modal>
      <Modal title={`Update ${intent}`} state={updateModalState} reset={reset}>
        <form onSubmit={handleSubmit(submitUpdate)}>
          <Form form={formInstance} />
          <button type="submit">update</button>
        </form>
      </Modal>
      <Modal title={`Delete ${intent}`} state={deleteModalState}>
        <form onSubmit={handleSubmit(submitDelete)}>
          <button type="submit">delete</button>
        </form>
      </Modal>
    </Admin>
  );
};

export default About;
