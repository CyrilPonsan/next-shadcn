import FormContextProvider from "@/components/forms/context/context-form";
import LoginForm from "@/components/login-form";
import { Locale } from "@/i18n.config";

const LoginPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  return (
    <FormContextProvider>
      <div className="w-full min-h-[80vh] flex justify-center items-center">
        <LoginForm />
      </div>
    </FormContextProvider>
  );
};

export default LoginPage;
