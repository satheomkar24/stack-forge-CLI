import { RingLoader } from "react-spinners";
import React, { useContext } from "react";
import { SpinnerContext } from "../../context/SpinnerContext";

type SpinnerProps = {
  size?: number;
  color?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LoaderComponent?: React.ComponentType<any>;
};

export const Spinner = ({
  size = 80,
  color = "#007099",
  LoaderComponent = RingLoader,
}: SpinnerProps) => {
  const { isLoading } = useContext(SpinnerContext);

  return (
    isLoading && (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 9999,
        }}
      >
        <LoaderComponent
          color={color}
          loading={isLoading}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  );
};
