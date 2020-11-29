import { Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Segment, Form, Button, Label } from "semantic-ui-react";
import * as Yup from "yup";
import { updateUserPassword } from "../../firestore/firebaseService";

import MyTextInput from "../../utils/form/MyTextInput";

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);

  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {currentUser && currentUser.providerId === "password" && (
        <React.Fragment>
          <Header color="teal" sub content="Change password" />
          <p>use this form to change your password</p>
          <Formik
            initialValues={{ newPassword1: "", newPassword2: "" }}
            validationSchema={Yup.object({
              newPassword1: Yup.string().required("Password is required"),
              newPassword2: Yup.string().oneOf(
                [Yup.ref("newPassword1"), null],
                "Passwords do not match"
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              console.log(values);
              try {
                await updateUserPassword(values);
                setSubmitting(false);
              } catch (error) {
                setErrors({ auth: error.message });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <MyTextInput
                  name="newPassword1"
                  type="password"
                  placeholder="New password"
                />
                <MyTextInput
                  name="newPassword2"
                  type="password"
                  placeholder="Confirm password"
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
                  type="submit"
                  style={{ display: "block" }}
                  disabled={!isValid || !dirty || isSubmitting}
                  loading={isSubmitting}
                  size="large"
                  positive
                  content="update password"
                />
              </Form>
            )}
          </Formik>
        </React.Fragment>
      )}
      {currentUser && currentUser.providerId === "facebook.com" && (
        <React.Fragment>
          <Header color="teal" sub content="Facebook account" />
          <p>Please visit Facebook to update your account</p>
          <Button
            icon="facebook"
            color="facebook"
            as={Link}
            to="https://facebook.com"
            content="go to Facebook"
          />
        </React.Fragment>
      )}
      {currentUser && currentUser.providerId === "google.com" && (
        <React.Fragment>
          <Header color="teal" sub content="Google account" />
          <p>Please visit Google to update your account</p>
          <Button
            icon="google"
            color="google plus"
            as={Link}
            to="https://google.com"
            content="go to Google"
          />
        </React.Fragment>
      )}
    </Segment>
  );
}
