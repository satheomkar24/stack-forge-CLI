import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SpinnerContextProvider } from "./context/provider/SpinnerContextProvider";
import { Spinner } from "./components/reusables/Spinner";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <SpinnerContextProvider>
          <RouterProvider router={router} />
          <Spinner />
        </SpinnerContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
