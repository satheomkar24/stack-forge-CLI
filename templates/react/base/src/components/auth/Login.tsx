import { SpinnerContext } from "../../context/SpinnerContext";
import { loginInitialValues, loginValidationSchema } from "../../schema/auth";
import {
  type IFormRender,
  renderFieldRowWithSizes,
} from "../../utils/formFieldRender";
import { showError } from "../../utils/showError";
import type { ILogin } from "../../types/auth";
import { Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

type LoginProps = {
  onSubmit: (
    values: ILogin,
    formikHelpers: FormikHelpers<ILogin>,
  ) => Promise<void>;
};

export const LoginForm = ({ onSubmit }: LoginProps) => {
  const initialValues = loginInitialValues;

  const { setIsLoading } = useContext(SpinnerContext);
  const navigate = useNavigate();

  const submitHandler = async (
    values: ILogin,
    formikHelpers: FormikHelpers<ILogin>,
  ) => {
    try {
      setIsLoading(true);
      await onSubmit(values, formikHelpers);
      toast.success("Login successful");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("📢[Login.tsx:34]: error: ", error);
      showError(error, "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = (formikProps: FormikProps<ILogin>) => {
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
          id: "submitBtn",
          label: "Login",
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
                <h3 className="text-center mb-3 primary-orange">Login</h3>
                <Formik
                  initialValues={initialValues}
                  onSubmit={submitHandler}
                  validationSchema={loginValidationSchema}
                >
                  {(formikProps) => (
                    <Form>
                      {renderFieldRowWithSizes(renderFormFields(formikProps))}
                    </Form>
                  )}
                </Formik>
                <p className="mt-3 text-center">
                  Don't have an account?
                  <Link to="/auth/register" className="ms-2">
                    Register
                  </Link>
                </p>
                <p className="mt-3 text-center">
                  <Link to="/auth/forgot-password" className="ms-2">
                    Forgot Password?
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
