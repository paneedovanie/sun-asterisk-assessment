import {
  Auth,
  Button,
  Card,
  FormController,
  FormError,
  Input,
} from "@/components";
import { Form, Formik } from "formik";
import { LoginInputSchema } from "@/schemas";
import { toFormikValidate } from "zod-formik-adapter";
import { useLogin } from "@/hooks";
import Link from "next/link";

export default function Home() {
  const { error, mutate } = useLogin();

  return (
    <Auth isAuthorized={false}>
      <main className="max-w-screen-lg mx-auto p-3 flex items-center justify-center h-full">
        <Card className="w-full max-w-sm">
          <h1 className="text-center text-2xl text-cyan-700 font-bold mb-3">
            Sign In
          </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={toFormikValidate(LoginInputSchema)}
            onSubmit={(values) => mutate(values)}
          >
            <Form className="flex flex-col gap-3">
              <FormError error={error} />
              <FormController label="E-mail" name="email">
                <Input name="email" />
              </FormController>
              <FormController label="Password" name="password">
                <Input name="password" type="password" />
              </FormController>
              <Button type="submit"> Sign In</Button>
              <Link className="w-full p-1 text-center" href={`/register`}>
                Register
              </Link>
            </Form>
          </Formik>
        </Card>
      </main>
    </Auth>
  );
}
