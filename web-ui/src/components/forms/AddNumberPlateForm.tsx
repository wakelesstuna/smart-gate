import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { addNumberPlate } from "../../hooks/useNumberPlates";

const numberPlateRegExp: RegExp = new RegExp("[A-Za-z]{3}[0-9]{2,3}[A-Z]{0,1}");

const NumberPlateSchema = z.object({
  id: z.string().optional(),
  numberPlate: z
    .string()
    .length(6, "must be 6 characters long")
    .regex(numberPlateRegExp, "must be AAA111 or AAA11A pattern"),
  users: z
    .object({
      id: z.string().optional(),
      name: z.string(),
    })
    .array()
    .length(1, "Must be at least 1 person on every numberplate"),
});
type NumberPlateSchemaType = z.infer<typeof NumberPlateSchema>;

const AddNumberPlateForm: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const addPlate = addNumberPlate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NumberPlateSchemaType>({
    resolver: zodResolver(NumberPlateSchema),
    defaultValues: { users: [{ name: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const onSubmit: SubmitHandler<NumberPlateSchemaType> = (data) => {
    addPlate.mutate(
      {
        numberPlate: data.numberPlate.toLocaleUpperCase(),
        users: data.users,
      },
      {
        onSettled: () => {
          reset();
          handleClose();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">
          <span>Enter a valid number plate</span>
          <input
            type="text"
            {...register(`numberPlate`)}
            className="uppercase"
          />
        </label>
        {errors.numberPlate && (
          <p className="text-sm text-red-600 mt-1">
            {errors.numberPlate.message}
          </p>
        )}
      </div>
      <div>
        <label>Add persons to the plate</label>
        {errors.users?.message && (
          <p className="text-sm text-red-600 mt-1">{errors.users.message}</p>
        )}
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <label className="flex">
                  <input type="text" {...register(`users.${index}.name`)} />
                  <button
                    type="button"
                    className="mx-4"
                    onClick={() => remove(index)}
                  >
                    <FaRegTrashAlt color="red" fontSize={25} />
                  </button>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            append({ name: "" });
          }}
          className="px-3 py-1 font-semibold bg-gray-600 rounded-sm flex items-center justify-center space-x-2"
        >
          <BiPlus color="white" fontSize={25} />
          <span>Add more...</span>
        </button>
      </div>
      <div className="w-full flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary bg-green-500"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddNumberPlateForm;
