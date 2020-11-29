import { Formik, Form } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../../utils/form/MyTextArea";
import MyTextInput from "../../../utils/form/MyTextInput";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../../firestore/firestoreService";

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
          setSubmitting(false);
        } catch (error) {
          toast.error(error.message);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea name="description" placeholder="Description" />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated="right"
            type="submit"
            size="large"
            positive
            content="update profile"
          />
        </Form>
      )}
    </Formik>
  );
}
