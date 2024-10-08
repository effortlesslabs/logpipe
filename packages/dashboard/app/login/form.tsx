import { Mail, LoaderCircle } from "lucide-react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAGIC_LINK } from "@/graphql/auth";
import { useState } from "react";
import Message from "./message";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter valid email").required("Required"),
});

function Form() {
  const [completed, setCompleted] = useState(false);
  const [magicLink, { loading, error }] = useMutation(MAGIC_LINK, {
    onCompleted: () => {
      setCompleted(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      magicLink({ variables: { email: values.email } });
    },
  });

  if (completed) {
    return <Message />;
  }

  return (
    <form className="flex-col flex gap-2" onSubmit={formik.handleSubmit}>
      <Input
        className="mt-4 w-96"
        placeholder="Email Address"
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <Button
        type="submit"
        className="mt-2 w-96 gap-2"
        disabled={loading || !formik.dirty}
      >
        {loading ? <LoaderCircle className="animate-spin" /> : <Mail />}
        Continue with Email
      </Button>
      {formik.errors.email && formik.touched.email ? (
        <div className="text-red-500 font-thin text-center">
          {formik.errors.email}
        </div>
      ) : null}

      {error && (
        <div className="text-red-500 font-thin text-center">
          {error.message}
        </div>
      )}
    </form>
  );
}

export default Form;
