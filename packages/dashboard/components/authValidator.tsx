import { navigate } from "@/lib/redireact-actions";
import { useGlobalStore } from "@/zustand";
import { usePathname } from "next/navigation";

type AuthValidatorProps = {
  children: React.ReactNode;
};

function AuthValidator({ children }: AuthValidatorProps) {
  const { logged } = useGlobalStore();
  const pathname = usePathname();

  if (!logged && pathname !== "/login" && pathname !== "/") {
    navigate();
    return <></>;
  }

  return children;
}

export default AuthValidator;
