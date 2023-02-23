import type { NextPage } from "next";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Admin from "../../components/Admin";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import SubmitButton from "../../components/SubmitButton";
import Table from "../../components/Table";
import type {
  LeadershipFormType,
  TableHeading,
  TableOptions,
} from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";
import useModal from "../../utils/useModal";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.leadership.getAll.fetch();
  await ssg.organization.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

type Form = LeadershipFormType;

const Leadership: NextPage = () => {
  const { data } = api.leadership.getAll.useQuery();
  const { data: orgs } = api.organization.getAll.useQuery();

  const formInstance = useForm<Form>({
      defaultValues: {
        id: "",
        organizationId: orgs ? orgs.map(({ id }) => id)[0] : "",
        leadershipProjects: [
          {
            id: "",
            leadershipId: "",
            course: "",
            name: "",
            purpose: "",
            otherPositions: "",
          },
        ],
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
    addMutation = api.leadership.addOne.useMutation({
      async onMutate() {
        const prevData = utils.leadership.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.leadership.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.leadership.getAll.invalidate();
      },
    }),
    updateMutation = api.leadership.updateOne.useMutation({
      async onMutate() {
        const prevData = utils.leadership.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.leadership.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.leadership.getAll.invalidate();
      },
    }),
    deleteMutation = api.leadership.deleteOne.useMutation({
      async onMutate() {
        const prevData = utils.leadership.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.leadership.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.leadership.getAll.invalidate();
      },
    });

  const submitAdd: SubmitHandler<Form> = ({
      organizationId,
      leadershipProjects,
    }) => {
      addMutation.mutate({
        organizationId,
        leadershipProjects,
      });
      setItemId(null);
      reset();
      setIsAddOpen(false);
    },
    submitUpdate: SubmitHandler<Form> = ({
      id,
      organizationId,
      leadershipProjects,
    }) => {
      updateMutation.mutate({
        id,
        organizationId,
        leadershipProjects,
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
      setValue("leadershipProjects", updateItem.leadershipProjects);
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
          {data?.map(({ id, organization, leadershipProjects }) => (
            <Table.BodyRow key={id}>
              <Table.Data>
                <Table.Collapsible name={organization.name}>
                  <div className="ml-8 space-y-6">
                    {leadershipProjects.map(
                      ({ id, name, course, purpose, otherPositions }) => (
                        <Table.Collapsible name={course} key={id} type="sub">
                          <dl className="ml-10 grid grid-cols-10 gap-2">
                            {name && (
                              <DefinitionItem
                                description={name}
                                term="Project"
                              />
                            )}
                            {purpose && (
                              <DefinitionItem
                                description={purpose}
                                term="Purpose"
                              />
                            )}
                            {otherPositions && (
                              <DefinitionItem
                                description={otherPositions}
                                term="Other Position/s"
                              />
                            )}
                          </dl>
                        </Table.Collapsible>
                      )
                    )}
                  </div>
                </Table.Collapsible>
              </Table.Data>
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

export default Leadership;

const category = "Leadership",
  tableHeadRows: TableHeading[] = [
    {
      text: "Organization Name",
    },
  ];

type DefinitionItemProps = {
  term: string;
  description: string;
};

const DefinitionItem = ({ description, term }: DefinitionItemProps) => {
  return (
    <>
      <dd className="col-span-2 font-medium">{term}: </dd>
      <dt className="col-span-8">{description}</dt>
    </>
  );
};

const Form = ({ form }: { form: UseFormReturn<Form> }) => {
  const { register, control } = form;

  const { data = [] } = api.organization.getAll.useQuery();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "leadershipProjects",
  });

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
      {fields.map((project, index) => (
        <div
          key={project.id}
          className="space-y-3 rounded-lg border border-slate-200 p-4"
        >
          <div className="flex items-center justify-between">
            <label className="form__label">
              Course {fields.length > 1 ? `#${index + 1}` : null}
            </label>
            <button type="button" onClick={() => remove(index)}>
              <FaTrash className="h-8 w-8 p-2" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor={`leadershipProjects.${index}.course`}
              className="form__label text-sm"
            >
              Name
            </label>
            <input
              type="text"
              id={`leadershipProjects.${index}.course`}
              className="form__input px-4 py-2 text-xs"
              {...register(`leadershipProjects.${index}.course`)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor={`leadershipProjects.${index}.name`}
              className="form__label text-sm"
            >
              Project
            </label>
            <input
              type="text"
              id={`leadershipProjects.${index}.name`}
              className="form__input px-4 py-2 text-xs"
              {...register(`leadershipProjects.${index}.name`)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor={`leadershipProjects.${index}.purpose`}
              className="form__label text-sm"
            >
              Purpose
            </label>
            <input
              type="text"
              id={`leadershipProjects.${index}.purpose`}
              className="form__input px-4 py-2 text-xs"
              {...register(`leadershipProjects.${index}.purpose`)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor={`leadershipProjects.${index}.otherPositions`}
              className="form__label text-sm"
            >
              Other Position/s
            </label>
            <input
              type="text"
              id={`leadershipProjects.${index}.otherPositions`}
              className="form__input px-4 py-2 text-xs"
              {...register(`leadershipProjects.${index}.otherPositions`)}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        className="form__input flex w-full items-center justify-center gap-2 border-dashed bg-opacity-50 px-4 py-2 text-xs"
        onClick={() =>
          append({
            id: "",
            leadershipId: "",
            course: "",
            name: "",
            purpose: "",
            otherPositions: "",
          })
        }
      >
        <FaPlus className="h-4 w-4" />
        Add Course Field
      </button>
    </>
  );
};

/*
  TODO:
  - [x] unabstract form inputs
  - [] form validation
    - [] error fields
    - [] disable delete button when field === 1
  - [] fix bug from updating 3 inputs to 1
  - [] one example per ORGANIZATION only
  - [] prevent modal scroll

  Formgroup.tsx
  Textarea.tsx
*/
