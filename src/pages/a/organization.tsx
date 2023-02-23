import type { NextPage } from "next";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import Admin from "../../components/Admin";
import Modal from "../../components/Modal";
import SubmitButton from "../../components/SubmitButton";
import Table from "../../components/Table";
import type {
  OrganizationFormType,
  TableHeading,
  TableOptions,
} from "../../types";
import { api } from "../../utils/api";
import createTRPCSSG from "../../utils/createTRPCSSG";
import getDate from "../../utils/getDate";
import useModal from "../../utils/useModal";

export const getStaticProps = async () => {
  const ssg = await createTRPCSSG();

  await ssg.organization.getAll.fetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};

type Form = OrganizationFormType;

const Organization: NextPage = () => {
  const { data } = api.organization.getAll.useQuery();

  const formInstance = useForm<Form>({
      defaultValues: {
        id: "",
        name: "",
        position: "",
        location: "",
        timeframeFrom: new Date(),
        timeframeTo: new Date(),
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
    addMutation = api.organization.addOne.useMutation({
      async onMutate() {
        const prevData = utils.organization.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.organization.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.organization.getAll.invalidate();
      },
    }),
    updateMutation = api.organization.updateOne.useMutation({
      async onMutate() {
        const prevData = utils.organization.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.organization.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.organization.getAll.invalidate();
      },
    }),
    deleteMutation = api.organization.deleteOne.useMutation({
      async onMutate() {
        const prevData = utils.organization.getAll.getData();
        return { prevData };
      },
      onError(err, newPost, ctx) {
        utils.organization.getAll.setData(undefined, ctx?.prevData);
      },
      onSettled() {
        utils.organization.getAll.invalidate();
      },
    });

  const submitAdd: SubmitHandler<Form> = ({
      name,
      position,
      location,
      timeframeFrom,
      timeframeTo,
    }) => {
      addMutation.mutate({
        name,
        position,
        location,
        timeframeFrom,
        timeframeTo,
      });
      setItemId(null);
      reset();
      setIsAddOpen(false);
    },
    submitUpdate: SubmitHandler<Form> = ({
      id,
      name,
      position,
      location,
      timeframeFrom,
      timeframeTo,
    }) => {
      updateMutation.mutate({
        id,
        name,
        position,
        location,
        timeframeFrom,
        timeframeTo,
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
      setValue("position", updateItem.position);
      setValue("location", updateItem.location);
      setValue("timeframeFrom", updateItem.timeframeFrom);
      setValue("timeframeTo", updateItem.timeframeTo);
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
            {data?.map(
              ({
                id,
                name,
                position,
                location,
                timeframeFrom,
                timeframeTo,
              }) => (
                <Table.BodyRow key={id}>
                  <Table.Data>{name}</Table.Data>
                  <Table.Data>{position}</Table.Data>
                  <Table.Data>{location}</Table.Data>
                  <Table.Data>
                    {getDate(timeframeFrom)} - {getDate(timeframeTo)}
                  </Table.Data>
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

export default Organization;

const category = "Organization",
  tableHeadRows: TableHeading[] = [
    {
      text: "Name",
    },
    {
      text: "Position",
    },
    {
      text: "Location",
    },
    {
      text: "Timeframe",
    },
  ];

const Form = ({ form }: { form: UseFormReturn<Form> }) => {
  const { register } = form;

  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="form__label">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form__input px-4 py-2"
          {...register("name", {
            required: true,
          })}
        />
      </div>
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-5 flex flex-col gap-2">
          <label htmlFor="position" className="form__label">
            Position
          </label>
          <input
            type="text"
            id="position"
            className="form__input px-4 py-2"
            {...register("position", {
              required: true,
            })}
          />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label htmlFor="location" className="form__label">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="form__input px-4 py-2"
            {...register("location", {
              required: true,
            })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="timeframeFrom" className="form__label">
          Start Date
        </label>
        <input
          type="date"
          id="timeframeFrom"
          className="form__input px-4 py-2"
          {...register("timeframeFrom", {
            required: true,
            valueAsDate: true,
          })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="timeframeTo" className="form__label">
          End Date
        </label>
        <input
          type="date"
          id="timeframeTo"
          className="form__input px-4 py-2"
          {...register("timeframeTo", {
            required: true,
            valueAsDate: true,
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
  - [] optional inputs
  - [] valueOnChange


  FormGroup.tsx
  Input.tsx
*/
