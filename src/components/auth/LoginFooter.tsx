const LoginFooter = () => {
  return (
    <div className="flex flex-row items-center justify-between p-4 text-sm text-black">
      <div className="flex flex-row gap-2 text-xs justify-center w-full">
        <p className="text-neutral-500">
          By continuing, you agree to Orbit AI's{" "}
          <span className="text-black font-medium">Terms of Service</span> and{" "}
          <span className="text-black font-medium">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};
export default LoginFooter;
