import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import ModalWrapper from "../../utils/modals/ModalWrapper";
import MyTextInput from "../../utils/form/MyTextInput";
import { Button, Divider, Label } from "semantic-ui-react";

//store
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/actions/modalActions";
import { registerInFirebase } from "../../firestore/firebaseService";
import SocialLogin from "./SocialLogin";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    displayName: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    displayName: Yup.string().required(),
  });

  return (
    <ModalWrapper size="mini" header="Register to Re-vents">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            console.log(values);
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            setSubmitting(false);
            console.log(error);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, errors }) => (
          <Form className="ui form">
            <MyTextInput name="displayName" placeholder="Display name" />
            <MyTextInput name="email" placeholder="email address" />
            <MyTextInput
              name="password"
              placeholder="enter password"
              type="password"
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              size="large"
              fluid
              color="teal"
              content="Register"
            />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Divider horizontal>or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default RegisterForm;
