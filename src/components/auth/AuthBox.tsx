import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signUp, login, loginWithGoogle } from "@/services/firebase";
import { useUserStore } from "@/stores/useAuthStore";

type Mode = "signin" | "signup";
type AuthInfo = {
  email: string;
  password: string;
  username: string;
};

const AuthBox = () => {
  const [mode, setMode] = useState<Mode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    email: "",
    password: "",
    username: "",
  });
  const { setUser } = useUserStore();

  const handleToggleMode = (mode: Mode) => {
    setMode(mode);
    setAuthInfo({
      email: "",
      password: "",
      username: "",
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      authInfo.username === "" ||
      authInfo.email === "" ||
      authInfo.password === ""
    ) {
      alert("Please fill in required fields");
      return;
    }

    try {
      const user = await signUp(
        authInfo.username,
        authInfo.email,
        authInfo.password
      );
      console.log("USER: ", user);
      setUser(user);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authInfo.email === "" || authInfo.password === "") {
      alert("Please fill in required fields");
      return;
    }

    try {
      await login(authInfo.email, authInfo.password);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleGoogleSignIn = async () => {
    const user = await loginWithGoogle();
    setUser(user);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold">
        {mode === "signin" ? "Log in to Sonicfi" : "Sign up to start listening"}
      </h1>
      <form
        onSubmit={mode === "signup" ? handleSignup : handleLogIn}
        className="flex flex-col gap-6 w-full mt-10"
      >
        {mode === "signup" && (
          <div className="w-full">
            <label
              htmlFor="username"
              className="text-sm font-medium pl-1 text-neutral-200 block mb-1"
            >
              Username
            </label>
            <input
              value={authInfo.username}
              onChange={(e) =>
                setAuthInfo({ ...authInfo, username: e.target.value })
              }
              type="text"
              id="username"
              className="w-full px-4 py-2 bg-zinc-950 rounded-lg border-1 border-neutral-300 text-white focus:outline-none focus:border-white placeholder:text-neutral-600 placeholder:font-light"
              placeholder={"Enter your username"}
              required
            />
          </div>
        )}
        <div className="w-full">
          <label
            htmlFor="email"
            className="text-sm font-medium pl-1 text-neutral-200 block mb-1"
          >
            Email
          </label>
          <input
            value={authInfo.email}
            onChange={(e) =>
              setAuthInfo({ ...authInfo, email: e.target.value })
            }
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-zinc-950 rounded-lg border-1 border-neutral-300 text-white focus:outline-none focus:border-white placeholder:text-neutral-600 placeholder:font-light"
            placeholder={"name@domain.com"}
            required
          />
        </div>
        <div className="w-full relative">
          <label
            htmlFor="password"
            className="text-sm font-medium pl-1 text-neutral-200 block mb-1"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              value={authInfo.password}
              onChange={(e) =>
                setAuthInfo({ ...authInfo, password: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 bg-zinc-950 rounded-lg border-1 border-neutral-300 text-white focus:outline-none focus:border-white placeholder:text-neutral-600 placeholder:font-light"
              placeholder={"Enter your password"}
              required
            />
            {authInfo.password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-5" />
                ) : (
                  <EyeIcon className="size-5" />
                )}
              </button>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2.5 rounded-full hover:bg-neutral-300 bg-neutral-200 text-black text-base font-semibold hover:scale-102 transition-all duration-300 cursor-pointer"
        >
          {mode === "signin" ? "Log in" : "Sign up"}
        </button>
      </form>
      <div className="flex flex-row items-center justify-center gap-4 w-full px-6">
        <hr className="w-full my-4 border-t border-neutral-400" />
        <p className="text-neutral-400 text-sm font-light">OR</p>
        <hr className="w-full my-4 border-t border-neutral-400" />
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full px-4 py-2.5 rounded-full hover:bg-neutral-300 bg-neutral-200 text-black text-base font-semibold hover:scale-102 transition-all duration-300 cursor-pointer flex flex-row items-center justify-center gap-2"
      >
        <img src="/logo/google.svg" alt="" className="size-5" />
        <span>Continue with Google</span>
      </button>

      <p className="text-neutral-400 text-sm font-light">
        <span className="mr-2">Already have an account?</span>
        <span
          className="text-white cursor-pointer font-medium"
          onClick={() =>
            handleToggleMode(mode === "signin" ? "signup" : "signin")
          }
        >
          {mode === "signin" ? "Sign up" : "Sign in"}
        </span>
      </p>
    </>
  );
};
export default AuthBox;
