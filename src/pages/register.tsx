import {
  Auth,
  Button,
  Card,
  FormController,
  FormError,
  Input,
} from "@/components";
import { Form, Formik } from "formik";
import { RegisterInputSchema } from "@/schemas";
import { toFormikValidate } from "zod-formik-adapter";
import { useRegister } from "@/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const { error, mutate } = useRegister();
  const router = useRouter();

  return (
    <Auth isAuthorized={false}>
      <main className="max-w-screen-lg mx-auto p-3 flex items-center justify-center h-full">
        <Card className="w-full max-w-sm">
          <h1 className="text-center text-2xl text-cyan-700 font-bold mb-3">
            Register
          </h1>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validate={toFormikValidate(RegisterInputSchema)}
            onSubmit={(values) =>
              mutate(values, {
                onSuccess: () => {
                  router.push("/");
                },
              })
            }
          >
            <Form className="flex flex-col gap-3">
              <FormError error={error} />
              <FormController label="Name" name="name">
                <Input name="name" />
              </FormController>
              <FormController label="E-mail" name="email">
                <Input name="email" />
              </FormController>
              <FormController label="Password" name="password">
                <Input name="password" type="password" />
              </FormController>
              <Button type="submit">Register</Button>
              <Link className="w-full p-1 text-center" href={`/`}>
                Sign In
              </Link>
            </Form>
          </Formik>
        </Card>
      </main>
    </Auth>
  );
}
