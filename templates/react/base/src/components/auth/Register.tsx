import { SpinnerContext } from "../../context/SpinnerContext";
import {
  registerInitialValues,
  registerValidationSchema,
} from "../../schema/auth";
import {
  type IFormRender,
  renderFieldRowWithSizes,
} from "../../utils/formFieldRender";
import { showError } from "../../utils/showError";
import type { IRegister } from "../../types/auth";
import { Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

type RegisterProps = {
  onSubmit: (
    values: IRegister,
    formikHelpers: FormikHelpers<IRegister>,
  ) => Promise<void>;
};

export const RegisterForm = ({ onSubmit }: RegisterProps) => {
  const initialValues = registerInitialValues;

  const { setIsLoading } = useContext(SpinnerContext);
  const navigate = useNavigate();

  const submitHandler = async (
    values: IRegister,
    formikHelpers: FormikHelpers<IRegister>,
  ) => {
    try {
      setIsLoading(true);
      await onSubmit(values, formikHelpers);
      toast.success("Registration successful");
      navigate("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("📢[Register.tsx:34]: error: ", error);
      showError(error, "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = (formikProps: FormikProps<IRegister>) => {
    const { errors, touched } = formikProps;
    const formFields: IFormRender[] = [
      {
        field: {
          id: "name",
          name: "name",
          type: "text",
          label: "Name",
          placeholder: "Enter your name",
          errors,
          touched,
        },
        colSize: "md-12",
      },
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
          id: "confirmPassword",
          name: "confirmPassword",
          type: "password",
          label: "Confirm Password",
          placeholder: "Re-enter your password",
          errors,
          touched,
        },
        colSize: "md-12",
      },
      {
        field: {
          id: "submitBtn",
          label: "Register",
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
                <h3 className="text-center mb-3 primary-orange">Register</h3>
                <Formik
                  initialValues={initialValues}
                  onSubmit={submitHandler}
                  validationSchema={registerValidationSchema}
                >
                  {(formikProps) => (
                    <Form>
                      {renderFieldRowWithSizes(renderFormFields(formikProps))}
                    </Form>
                  )}
                </Formik>
                <p className="mt-3 text-center">
                  Already have an account?
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
