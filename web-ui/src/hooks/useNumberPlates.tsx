import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { z } from "zod";

const pythonServerErrorResponse = z.object({
  detail: z.string(),
});

const errorResponse = z.object({
  statusCode: z.number(),
  response: pythonServerErrorResponse,
});

type ErrorResponse = z.infer<typeof errorResponse>;
type PythonServerErrorResponse = z.infer<typeof pythonServerErrorResponse>;

export const numberPlateRegExp: RegExp = new RegExp(
  "[A-Za-z]{3}[0-9]{2,3}[A-Z]{0,1}"
);

const numberPlate = z.object({
  id: z.string().optional(),
  numberPlate: z.string(),
  users: z
    .object({
      id: z.string().optional(),
      name: z.string(),
    })
    .array(),
});

export type NumberPlate = z.infer<typeof numberPlate>;

export const useNumberPlates = () => {
  const { data, isLoading, error } = useQuery(
    ["numberPlate"],
    async (): Promise<Array<NumberPlate>> => {
      const { data } = await axios.get(
        "http://localhost:8001/v1/number-plate/all"
      );
      return data;
    }
  );
  let er: ErrorResponse | null = null;
  if (error) {
    const t = error as AxiosError;
    er = {
      response: t.response?.data as PythonServerErrorResponse,
      statusCode: t.response?.status as number,
    };
  }

  return { data, isLoading, er };
};

export const addNumberPlate = () => {
  const queryClient = useQueryClient();
  const addNumberPlate = useMutation(
    (body: NumberPlate) =>
      axios.post("http://localhost:8001/v1/number-plate", body),
    {
      onSuccess: () => queryClient.invalidateQueries(["numberPlate"]),
    }
  );

  return addNumberPlate;
};

export const deleteNumberPlate = () => {
  const queryClient = useQueryClient();
  const deleteNumberPlate = useMutation(
    (plateId: string) =>
      axios.delete(`http://localhost:8001/v1/number-plate/${plateId}`),
    {
      /* // When mutate is called:
      onMutate: async (plateId: string) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["numberPlate"]);

        // Snapshot the previous value
        const previousNumberPlates = queryClient.getQueryData<
          Array<NumberPlate>
        >(["numberPlate"]);

        // Optimistically update to the new value
        if (previousNumberPlates) {
          queryClient.setQueryData<Array<NumberPlate>>(["numberPlate"], {
            ...previousNumberPlates.filter(
              (numberPlate) => numberPlate.id !== plateId
            ),
          });
        }

        return previousNumberPlates;
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context) {
          queryClient.setQueryData<Array<NumberPlate>>(
            ["numberPlate"],
            context
          );
        }
      }, */
      onSuccess: () => queryClient.invalidateQueries(["numberPlate"]),
    }
  );
  return deleteNumberPlate;
};
