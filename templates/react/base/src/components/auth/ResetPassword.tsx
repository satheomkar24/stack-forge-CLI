import { SpinnerContext } from "../../context/SpinnerContext";
import {
  resetPasswordInitialValues,
  resetPasswordValidationSchema,
} from "../../schema/auth";
import {
  type IFormRender,
  renderFieldRowWithSizes,
} from "../../utils/formFieldRender";
import { showError } from "../../utils/showError";
import type { IResetPassword } from "../../types/auth";
import { Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

type ResetPasswordProps = {
  onSubmit: (
    values: IResetPassword,
    formikHelpers: FormikHelpers<IResetPassword>,
  ) => Promise<void>;
};

export const ResetPasswordForm = ({ onSubmit }: ResetPasswordProps) => {
  const initialValues = resetPasswordInitialValues;

  const { setIsLoading } = useContext(SpinnerContext);
  const navigate = useNavigate();

  const submitHandler = async (
    values: IResetPassword,
    formikHelpers: FormikHelpers<IResetPassword>,
  ) => {
    try {
      setIsLoading(true);
      await onSubmit(values, formikHelpers);
      toast.success("Password reset successfully");
      navigate("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("📢[ResetPassword.tsx:37]: error: ", error);
      showError(error, "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = (formikProps: FormikProps<IResetPassword>) => {
    const { errors, touched } = formikProps;
    const formFields: IFormRender[] = [
      {
        field: {
          id: "password",
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "Enter your password",
          errors,
          touched,
        },
        colSize: "md-12",
      },
      {
        field: {
          id: "confirmPassword",
          name: "confirmPassword",
          type: "password",
          label: "Confirm Password",
          placeholder: "Confirm your password",
          errors,
          touched,
        },
        colSize: "md-12",
      },
      {
        field: {
          id: "submitBtn",
          label: "Reset Password",
          buttonType: "submit",
          type: "button",
          className: "d-block mx-auto",
        },
        colSize: "md-12",
      },
    ];
    return formFields;
  };

  return (
    <section className="bg-primary-main">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg={6}>
            <Card>
              <CardBody>
                <h3 className="text-center mb-3 primary-orange">
                  Reset Password
                </h3>
                <Formik
                  initialValues={initialValues}
                  onSubmit={submitHandler}
                  validationSchema={resetPasswordValidationSchema}
                >
                  {(formikProps) => (
                    <Form>
                      {renderFieldRowWithSizes(renderFormFields(formikProps))}
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
