import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1, { message: "Required" }),
  GOOGLE_CLIENT_ID: zod.string().min(1, { message: "Required" }),
  GOOGLE_CLIENT_SECRET: zod.string().min(1, { message: "Required" }),
  NEXTAUTH_URL: zod.string().min(1, { message: "Required" }),
  NEXTAUTH_SECRET: zod.string().min(1, { message: "Required" }),
});

export const env = envSchema.parse(process.env);
