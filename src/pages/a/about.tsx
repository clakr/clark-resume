import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form/dist/types";
import { FaPlus } from "react-icons/fa";
import Admin from "../../components/Admin";
import FormGroup from "../../components/FormGroup";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import Textarea from "../../components/Textarea";
import type { AboutFormType, TableHeading } from "../../types";
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

const Form = () => {
  const aboutMutation = api.about.addOne.useMutation();

  const { handleSubmit, register } = useForm<AboutFormType>({
    defaultValues: {
      desc: "",
    },
  });

  const onSubmit: SubmitHandler<AboutFormType> = (values) =>
    aboutMutation.mutate(values);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="form">
        <FormGroup label="Description">
          <Textarea
            {...register("desc", {
              required: true,
            })}
          />
        </FormGroup>
      </form>
      <button
        form="form"
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-200 p-2 text-sm outline-slate-400"
      >
        <FaPlus />
        Add {intent}
      </button>
    </>
  );
};

const About: NextPage = () => {
  const { data } = api.about.getAll.useQuery();

  const addModalState = useState(false),
    updateModalState = useState(false),
    deleteModalState = useState(false);

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
              <Table.DataOptions
                updateState={updateModalState}
                deleteState={deleteModalState}
              />
            </Table.BodyRow>
          ))}
        </Table.Body>
        <Table.AddIntent
          intent={intent}
          colSpan={tableHeadRows.length + 1}
          state={addModalState}
        />
      </Table>

      <Modal title={`Add ${intent}`} state={addModalState}></Modal>
      <Modal title={`Update ${intent}`} state={updateModalState}></Modal>
      <Modal title={`Delete ${intent}`} state={deleteModalState}></Modal>
    </Admin>
  );
};

export default About;
