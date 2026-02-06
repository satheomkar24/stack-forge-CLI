import { useContext, useEffect } from "react";
import { useApiMutation, useApiQuery } from "../services/queryService";
import { userService } from "../services/userService";
import toast from "react-hot-toast";
import type { IUser, IUserPayload } from "../types/user";
import { SpinnerContext } from "../context/SpinnerContext";
import { showError } from "../utils/showError";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { storageService } from "../services/storageService";
import type { IUserAuth } from "../types/auth";
import { setAuth } from "../store/authSlice";

const useUserResolver = () => {
  const { setIsLoading } = useContext(SpinnerContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  authService.init(navigate, dispatch);

  //  Fetch current user data
  const { data: userData } = useApiQuery<IUser | undefined>(["user"], () =>
    userService.getData(),
  );

  //  Mutation: update values
  const updateUserMutation = useApiMutation(
    ({ data }: { data: IUserPayload }) => userService.update(data),
    {
      onSuccess: (data) => {
        storageService.setLocal("userData", data);
        dispatch(setAuth({ user: data }));
        toast.success("Profile updated successfully");
      },
      onError: (error) => {
        showError(error, "Failed to update profile");
      },
      invalidateKeys: [["user"]],
    },
  );

  //  Mutation: update profile image
  const updateProfileImageMutation = useApiMutation(
    ({ imageFile }: { imageFile: File }) => userService.uploadImage(imageFile),
    {
      onSuccess: (data) => {
        const prevUser = storageService.getLocal<IUserAuth>("userData");
        const newUser = {
          ...prevUser!,
          image: data.url,
        };
        storageService.setLocal("userData", newUser);
        dispatch(setAuth({ user: newUser }));
        toast.success("Profile image updated successfully");
      },
      onError: (error) => {
        showError(error, "Failed to update profile image");
      },
      invalidateKeys: [["user"]],
    },
  );
  //  Mutation: reset password
  const resetPasswordMutation = useApiMutation(
    (email: string) => authService.forgotPassword({ email }),
    {
      onSuccess: () => {
        toast.success("Please check your email to reset the password!");
      },
      onError: (error) => {
        showError(error, "Failed to generate reset password link");
      },
    },
  );

  //  Mutation: delete values
  const deleteUserMutation = useApiMutation(() => userService.delete(), {
    onSuccess: () => {
      toast.success("Profile deleted successfully");
      authService.logout();
    },
    onError: (error) => {
      showError(error, "Failed to delete profile");
    },
    invalidateKeys: [["user"]],
  });

  //  Set loading spinner based on mutation state
  useEffect(() => {
    setIsLoading(
      updateUserMutation.isPending ||
        deleteUserMutation.isPending ||
        updateProfileImageMutation.isPending ||
        resetPasswordMutation.isPending,
    );
  }, [
    updateUserMutation.isPending,
    deleteUserMutation.isPending,
    updateProfileImageMutation.isPending,
    resetPasswordMutation.isPending,
    setIsLoading,
  ]);

  return {
    userData,
    updateUserMutation,
    deleteUserMutation,
    updateProfileImageMutation,
    resetPasswordMutation,
  };
};

export default useUserResolver;
