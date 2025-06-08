import AuthBox from "@/components/auth/AuthBox";

const LoginBody = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center select-none text-white px-6">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm pb-14">
        <AuthBox />
      </div>
    </div>
  );
};
export default LoginBody;
