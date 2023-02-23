import type { NextPage } from "next";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import Admin from "../../components/Admin";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import SubmitButton from "../../components/SubmitButton";
import Table from "../../components/Table";
import type {
  EducationFormType,
  TableHeading,
  TableOptions,
} from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";
import useModal from "../../utils/useModal";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.education.getAll.fetch();
  await ssg.organization.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

type Form = EducationFormType;

const Education: NextPage = () => {
  const { data } = api.education.getAll.useQuery();
  const { data: orgs } = api.organization.getAll.useQuery();

  const formInstance = useForm<Form>({
      defaultValues: {
        id: "",
        organizationId: orgs ? orgs.map(({ id }) => id)[0] : "",
        degree: "",
        thesis: "",
        awards: "",
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
    addMutation = api.education.addOne.useMutation({
      async onMutate() {
        const prevData = utils.education.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.education.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.education.getAll.invalidate();
      },
    }),
    updateMutation = api.education.updateOne.useMutation({
      async onMutate() {
        const prevData = utils.education.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.education.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.education.getAll.invalidate();
      },
    }),
    deleteMutation = api.education.deleteOne.useMutation({
      async onMutate() {
        const prevData = utils.education.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.education.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.education.getAll.invalidate();
      },
    });

  const submitAdd: SubmitHandler<Form> = ({
      organizationId,
      degree,
      thesis,
      awards,
    }) => {
      addMutation.mutate({
        organizationId,
        degree,
        thesis,
        awards,
      });
      setItemId(null);
      reset();
      setIsAddOpen(false);
    },
    submitUpdate: SubmitHandler<Form> = ({
      id,
      organizationId,
      degree,
      thesis,
      awards,
    }) => {
      updateMutation.mutate({
        id,
        organizationId,
        degree,
        thesis,
        awards,
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
      setValue("organizationId", updateItem.organizationId);
      setValue("degree", updateItem.degree);
      setValue("thesis", updateItem.thesis);
      setValue("awards", updateItem.awards);
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
          {data?.map(
            ({ id, degree, thesis, awards, organization: { name } }) => (
              <Table.BodyRow key={id}>
                <Table.Data>{name}</Table.Data>
                <Table.Data>{degree}</Table.Data>
                <Table.Data>{thesis}</Table.Data>
                <Table.Data>{awards}</Table.Data>
                <Table.DataOptions options={options} id={id} />
              </Table.BodyRow>
            )
          )}
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

export default Education;

const category = "Education",
  tableHeadRows: TableHeading[] = [
    {
      text: "Organization Name",
    },
    {
      text: "Degree",
    },
    {
      text: "Thesis",
    },
    {
      text: "Awards",
    },
  ];

const Form = ({ form }: { form: UseFormReturn<Form> }) => {
  const { register, control } = form;

  const { data = [] } = api.organization.getAll.useQuery();

  return (
    <>
      <Controller
        name="organizationId"
        control={control}
        render={({ field }) => (
          <Select field={field}>
            <Select.Label>Organization</Select.Label>
            <Select.Button>
              {data.find(({ id }) => id === field.value)?.name}
            </Select.Button>
            <Select.Options>
              {data.map(({ id, name }) => (
                <Select.Option value={id} key={id} displayName={name} />
              ))}
            </Select.Options>
          </Select>
        )}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="degree" className="form__label">
          Degree
        </label>
        <textarea
          id="degree"
          rows={3}
          className="form__input p-4"
          {...register("degree", {
            required: true,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="thesis" className="form__label">
          Thesis
        </label>
        <textarea
          id="thesis"
          rows={3}
          className="form__input p-4"
          {...register("thesis", {
            required: true,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="awards" className="form__label">
          Awards
        </label>
        <textarea
          id="awards"
          rows={3}
          className="form__input p-4"
          {...register("awards", {
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
  - [] one example per ORGANIZATION only

  Formgroup.tsx
  Textarea.tsx
*/
