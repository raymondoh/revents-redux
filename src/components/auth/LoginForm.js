import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ModalWrapper from "../../utils/modals/ModalWrapper";
import MyTextInput from "../../utils/form/MyTextInput";
import { Button, Divider, Label } from "semantic-ui-react";

//store
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/actions/modalActions";
import { signInWithEmail } from "../../firestore/firebaseService";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  return (
    <ModalWrapper size="mini" header="sign in to Re-vents">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            console.log(values);
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: "Problem with username or password" });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className="ui form">
            <MyTextInput name="email" placeholder="email address" />
            <MyTextInput
              name="password"
              placeholder="enter password"
              type="password"
            />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              size="large"
              fluid
              color="teal"
              content="Login"
            />
            <Divider horizontal>or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;
