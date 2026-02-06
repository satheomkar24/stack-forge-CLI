import { useRef, useState, type ChangeEvent } from "react";
import { Card, CardBody, Button } from "reactstrap";

const DEFAULT_IMAGE = "/images/avatar.png";

interface ProfileImageSelectorProps {
  userImage?: string | null;
  onChange: (image: File) => void;
}

const ProfileImageSelector = ({
  userImage,
  onChange,
}: ProfileImageSelectorProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size exceeds 2MB limit");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onChange(file);
  };

  // Priority: preview → user image → fallback
  const imageSrc: string = preview || userImage || DEFAULT_IMAGE;
  console.log("📢[ProfileImageSelector.tsx:38]: imageSrc: ", imageSrc);

  return (
    <Card className="text-center p-3" style={{ maxWidth: 300 }}>
      <CardBody>
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "2px dashed #ccc",
            margin: "0 auto 15px",
            cursor: "pointer",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8f9fa",
          }}
        >
          <img
            src={imageSrc}
            alt="Profile"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.onerror = null;
              img.src = DEFAULT_IMAGE;
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />

        <Button
          color="primary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          Change Image
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProfileImageSelector;
