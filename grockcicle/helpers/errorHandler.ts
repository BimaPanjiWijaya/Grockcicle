import { ZodError } from "zod";

export default function errorHandler(err: unknown) {
  const error = err as { status: number; message: string };

  let message = error.message || "An Unexpected error occurred";

  let status = error.status || 500;

  if (err instanceof ZodError) {
    console.log(err);
    message = err.issues.map((e) => e.message).join(", ");
    status = 400;
  }
  return Response.json(
    {
      mesage: message,
    },
    {
      status: status,
    },
  );
}
