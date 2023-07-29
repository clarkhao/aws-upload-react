import { z } from "zod";

type InputChecks = Record<string, z.ZodString>;

const inputChecks: InputChecks = {
  password: z.string().min(8).max(32),
  name: z.string().min(4).max(32),
  email: z.string().email(),
};

export const inputCheck = (inputName: string) => {
  return inputChecks[inputName];
};

export const getErrMsg = (msg: string) => {
  const errObj = JSON.parse(msg);
  return errObj.reduce(
    (acc: string, err: Record<string, any>) => acc + err.message,
    ""
  ) as string;
};
