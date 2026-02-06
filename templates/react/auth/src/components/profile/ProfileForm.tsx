import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { SpinnerContext } from "../../context/SpinnerContext";
import { useAppSelector } from "../../hooks/redux";
import useUserResolver from "../../resolvers/userResolver";
import type { IUserPayload } from "../../types/user";

const ProfileForm = () => {
  const { setIsLoading } = useContext(SpinnerContext);
  const userData = useAppSelector((state) => state.auth.user!);
  const { updateUserMutation, resetPasswordMutation } = useUserResolver();

  const initialValues: IUserPayload = {
    name: userData.name || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });

  const updateProfileHandler = async (
    values: IUserPayload,
    { resetForm }: FormikHelpers<IUserPayload>,
  ) => {
    setIsLoading(true);
    updateUserMutation.mutate({ data: values });
    resetForm({ values });
  };

  const resetPasswordHandler = async () => {
    setIsLoading(true);
    resetPasswordMutation.mutate(userData.email);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={updateProfileHandler}
      enableReinitialize
    >
      {({ errors, touched, dirty }) => {
        return (
          <>
            <Form id="profileForm">
              <Card className="mb-4">
                <CardHeader>Profile Information</CardHeader>
                <CardBody>
                  <Row className="mb-3">
                    <Col>
                      <Label>Name *</Label>
                      <Field
                        as={Input}
                        name="name"
                        invalid={errors.name && touched.name}
                      />
                      <FormFeedback invalid>
                        <ErrorMessage name="name" />
                      </FormFeedback>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={userData.email}
                        readOnly
                        disabled
                      />
                    </Col>
                  </Row>
                  <Button type="submit" color="primary" disabled={!dirty}>
                    Update Profile
                  </Button>
                </CardBody>
              </Card>
            </Form>

            <Card>
              <CardHeader>
                <span>Reset Password</span>
              </CardHeader>
              <CardBody>
                <p className="text-body-secondary">
                  Click "Reset Password via Email" to receive a password reset
                  link in your email.
                </p>
                <Button
                  color="link"
                  onClick={resetPasswordHandler}
                  className="text-decoration-none p-0"
                >
                  Reset Password via Email
                </Button>
              </CardBody>
            </Card>
          </>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
