const LoginFooter = () => {
  return (
    <div className="flex flex-row items-center justify-between p-4 text-sm select-none text-neutral-400">
      <div className="flex flex-row gap-2 text-xs justify-center w-full">
        <p className="text-neutral-400">
          By continuing, you agree to Sonicfi's{" "}
          <span className="text-white font-medium">Terms of Service</span> and{" "}
          <span className="text-white font-medium">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};
export default LoginFooter;
