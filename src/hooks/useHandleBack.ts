import { router, useRouter } from "expo-router";

type RouterParams = Parameters<typeof router.replace>[0];

const useHandleBack = () => {
  const router = useRouter();

  const handleBack = (path: RouterParams = "/") => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(path);
    }
  };
  
  return handleBack;
};

export default useHandleBack;
