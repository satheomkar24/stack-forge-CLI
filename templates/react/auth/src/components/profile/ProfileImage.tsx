import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../hooks/redux";
import constant from "../../constant";
import { Card, CardBody, CardHeader } from "reactstrap";
import { ActionButton } from "../reusables/ActionButton";
import { FiSave } from "react-icons/fi";
import ProfileImageSelector from "./ProfileImageSelector";
import useUserResolver from "../../resolvers/userResolver";

const ProfileImage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { updateProfileImageMutation } = useUserResolver();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hasImageChanges, setHasImageChanges] = useState(false);

  const userImage = useMemo(() => {
    return user?.image ? `${constant.backendUrl}${user.image}` : "";
  }, [user?.image]);

  const onChange = (image: File) => {
    setSelectedFile(image);
    setHasImageChanges(true);
  };

  const imageUpdateHandler = async () => {
    if (!selectedFile) {
      toast.error("No image selected");
      return;
    }
    updateProfileImageMutation.mutate({ imageFile: selectedFile });
    setSelectedFile(null);
    setHasImageChanges(false);
  };

  return (
    <Card className="mb-4 h-100">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <span>Profile Image</span>
        {hasImageChanges && (
          <ActionButton
            tooltip="Save Image"
            onClick={imageUpdateHandler}
            icon={FiSave}
          />
        )}
      </CardHeader>
      <CardBody className="d-flex justify-content-center align-items-center">
        <ProfileImageSelector userImage={userImage} onChange={onChange} />
      </CardBody>
    </Card>
  );
};

export default ProfileImage;
