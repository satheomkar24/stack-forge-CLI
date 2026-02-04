import { SpinnerContext } from "../../context/SpinnerContext";
import {
  changePasswordInitialValues,
  changePasswordValidationSchema,
} from "../../schema/auth";
import { Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Card, CardBody } from "reactstrap";
import type { IChangePassword } from "../../types/auth";
import {
  renderFieldRowWithSizes,
  type IFormRender,
} from "../../utils/formFieldRender";
import { showError } from "../../utils/showError";

type ChangePasswordProps = {
  onSubmit: (
    values: IChangePassword,
    formikHelpers: FormikHelpers<IChangePassword>,
  ) => Promise<void>;
};

export const ChangePasswordForm = ({ onSubmit }: ChangePasswordProps) => {
  const initialValues = changePasswordInitialValues;

  const { setIsLoading } = useContext(SpinnerContext);

  const submitHandler = async (
    values: IChangePassword,
    formikHelpers: FormikHelpers<IChangePassword>,
  ) => {
    try {
      setIsLoading(true);
      await onSubmit(values, formikHelpers);
      toast.success("Password changed successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("📢[ChangePassword.tsx:34]: error: ", error);
      showError(error, "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormFields = (formikProps: FormikProps<IChangePassword>) => {
    const { errors, touched } = formikProps;
    const formFields: IFormRender[] = [
      {
        field: {
          id: "currentPassword",
          name: "currentPassword",
          type: "password",
          label: "Current Password",
          placeholder: "Enter your current password",
          errors,
          touched,
        },
        colSize: "md-12",
      },
      {
        field: {
          id: "newPassword",
          name: "newPassword",
          type: "password",
          label: "New Password",
          placeholder: "Enter your new password",
          errors,
          touched,
        },
        colSize: "md-12",
      },
      {
        field: {
          id: "confirmNewPassword",
          name: "confirmNewPassword",
          type: "password",
          label: "Confirm New Password",
          placeholder: "Confirm your new password",
          errors,
          touched,
        },
        colSize: "md-12",
      },
      {
        field: {
          id: "submitBtn",
          label: "Change Password",
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
    <Card>
      <CardBody>
        <h3 className="text-center mb-3 primary-orange">ChangePassword</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={changePasswordValidationSchema}
        >
          {(formikProps) => (
            <Form>
              {renderFieldRowWithSizes(renderFormFields(formikProps))}
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
