import { SpinnerContext } from "../../context/SpinnerContext";
import {
  forgotPasswordInitialValues,
  forgotPasswordValidationSchema,
} from "../../schema/auth";
import {
  type IFormRender,
  renderFieldRowWithSizes,
} from "../../utils/formFieldRender";
import { showError } from "../../utils/showError";
import type { IForgotPassword } from "../../types/auth";
import { Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

type ForgotProps = {
  onSubmit: (
    values: IForgotPassword,
    formikHelpers: FormikHelpers<IForgotPassword>,
  ) => Promise<void>;
};

export const ForgotPasswordForm = ({ onSubmit }: ForgotProps) => {
  const initialValues = forgotPasswordInitialValues;

  const { setIsLoading } = useContext(SpinnerContext);

  const submitHandler = async (
    values: IForgotPassword,
    formikHelpers: FormikHelpers<IForgotPassword>,
  ) => {
    try {
      setIsLoading(true);
      await onSubmit(values, formikHelpers);
      toast.success("Reset link sent to your email");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("📢[ForgotPassword.tsx:35]: error: ", error);
      showError(error, "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = (formikProps: FormikProps<IForgotPassword>) => {
    const { errors, touched } = formikProps;
    const formFields: IFormRender[] = [
      {
        field: {
          id: "email",
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "Enter your email",
          errors,
          touched,
        },
        colSize: "md-12",
      },
      {
        field: {
          id: "submitBtn",
          label: "Send Reset Link",
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
                  Forgot Password
                </h3>
                <Formik
                  initialValues={initialValues}
                  onSubmit={submitHandler}
                  validationSchema={forgotPasswordValidationSchema}
                >
                  {(formikProps) => (
                    <Form>
                      {renderFieldRowWithSizes(renderFormFields(formikProps))}
                    </Form>
                  )}
                </Formik>
                <p className="mt-3 text-center">
                  <Link to="/auth/login" className="ms-2">
                    Login
                  </Link>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
