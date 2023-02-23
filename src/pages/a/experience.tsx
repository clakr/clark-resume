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
  ExperienceFormType,
  TableHeading,
  TableOptions,
} from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";
import useModal from "../../utils/useModal";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.experience.getAll.fetch();
  await ssg.organization.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

type Form = ExperienceFormType;

const Experience: NextPage = () => {
  const { data } = api.experience.getAll.useQuery();
  const { data: orgs } = api.organization.getAll.useQuery();

  const formInstance = useForm<Form>({
      defaultValues: {
        id: "",
        organizationId: orgs ? orgs.map(({ id }) => id)[0] : "",
        experienceDescs: [
          {
            id: "",
            experienceId: "",
            desc: "",
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
    addMutation = api.experience.addOne.useMutation({
      async onMutate() {
        const prevData = utils.experience.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.experience.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.experience.getAll.invalidate();
      },
    }),
    updateMutation = api.experience.updateOne.useMutation({
      async onMutate() {
        const prevData = utils.experience.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.experience.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.experience.getAll.invalidate();
      },
    }),
    deleteMutation = api.experience.deleteOne.useMutation({
      async onMutate() {
        const prevData = utils.experience.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.experience.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.experience.getAll.invalidate();
      },
    });

  const submitAdd: SubmitHandler<Form> = ({
      organizationId,
      experienceDescs,
    }) => {
      addMutation.mutate({
        organizationId,
        experienceDescs,
      });
      setItemId(null);
      reset();
      setIsAddOpen(false);
    },
    submitUpdate: SubmitHandler<Form> = ({
      id,
      organizationId,
      experienceDescs,
    }) => {
      updateMutation.mutate({
        id,
        organizationId,
        experienceDescs,
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
      setValue("experienceDescs", updateItem.experienceDescs);
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
          {data?.map(({ id, organization: { name }, experienceDescs }) => (
            <Table.BodyRow key={id}>
              <Table.Data>
                <Table.Collapsible name={name}>
                  <ul className="ml-12 list-outside list-disc text-justify text-sm">
                    {experienceDescs.map(({ desc }, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
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

export default Experience;

const category = "Experience",
  tableHeadRows: TableHeading[] = [
    {
      text: "Organization Name",
    },
  ];

const Form = ({ form }: { form: UseFormReturn<Form> }) => {
  const { register, control } = form;

  const { data = [] } = api.organization.getAll.useQuery();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experienceDescs",
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
      <div className="flex flex-col gap-2">
        <label htmlFor="descriptions" className="form__label">
          Descriptions
        </label>
        {fields.map((input, index) => (
          <div key={input.id} className="flex">
            <input
              type="text"
              className="form__input flex-grow px-4 py-2"
              {...register(`experienceDescs.${index}.desc`)}
            />
            <button className="flex-shrink px-4" onClick={() => remove(index)}>
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        className="form__input flex w-full items-center justify-center gap-2 border-dashed bg-opacity-50 px-4 py-2 text-xs"
        onClick={() =>
          append({
            id: "",
            experienceId: "",
            desc: "",
          })
        }
        type="button"
      >
        <FaPlus className="h-4 w-4" />
        Add Description Input
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

  Formgroup.tsx
  Input.tsx
*/
