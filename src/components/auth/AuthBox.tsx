import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signUp, login, loginWithGoogle } from "@/services/firebase";

type InputType = "email" | "password" | "username" | "";
type Mode = "signin" | "signup";
type AuthInfo = {
  email: string;
  password: string;
  username: string;
};

const AuthBox = () => {
  const [mode, setMode] = useState<Mode>("signin");
  const [focused, setFocused] = useState<InputType>("");
  const [showPassword, setShowPassword] = useState(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    email: "",
    password: "",
    username: "",
  });

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
      await signUp(authInfo.username, authInfo.email, authInfo.password);
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
    const success = await loginWithGoogle();
    if (!success) {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <form
        onSubmit={mode === "signup" ? handleSignup : handleLogIn}
        className="flex flex-col gap-8 w-full mt-10"
      >
        {mode === "signup" && (
          <div className="w-full relative">
            <label
              htmlFor="username"
              className={twMerge(
                "text-sm absolute -top-3 left-5 px-2",
                focused === "username" ? "text-blue-500" : "text-neutral-400"
              )}
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
              onFocus={() => setFocused("username")}
              onBlur={() => setFocused("")}
              className="w-full px-4 py-2 rounded-full border-1 border-neutral-300 text-black focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        )}
        <div className="w-full relative">
          <label
            htmlFor="email"
            className={twMerge(
              "text-sm absolute -top-5 left-5 px-2",
              focused === "email" ? "text-blue-400" : "text-neutral-400"
            )}
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
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused("")}
            className="w-full px-4 py-2 bg-zinc-800 rounded-lg border-1 border-neutral-300 text-black focus:outline-none focus:border-blue-400 placeholder:text-neutral-300 placeholder:font-light"
            placeholder={mode === "signin" ? "test@gmail.com" : ""}
            required
          />
        </div>
        <div className="w-full relative">
          <label
            htmlFor="password"
            className={twMerge(
              "text-sm absolute -top-3 left-5 bg-white px-2 z-5",
              focused === "password" ? "text-blue-500" : "text-neutral-400"
            )}
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
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              className="w-full px-4 py-2 rounded-full border-1 border-neutral-300 text-black focus:outline-none focus:border-blue-500 placeholder:text-neutral-300 placeholder:font-light"
              placeholder={mode === "signin" ? "testpassword" : ""}
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
          className="w-full px-4 py-2.5 rounded-full bg-black text-white text-sm cursor-pointer"
        >
          {mode === "signin" ? "Log in" : "Sign up"}
        </button>
      </form>
      <div className="flex flex-row items-center justify-center gap-4 w-full px-6">
        <hr className="w-full my-4 border-t border-neutral-200" />
        <p className="text-neutral-400 text-sm font-light">OR</p>
        <hr className="w-full my-4 border-t border-neutral-200" />
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full px-4 py-2.5 rounded-full hover:bg-neutral-100 border-1 border-neutral-300 text-black text-sm cursor-pointer flex flex-row items-center justify-center gap-2"
      >
        <img src="/logo/google.svg" alt="" className="size-5" />
        <span>Continue with Google</span>
      </button>

      <p className="text-neutral-400 text-sm font-light">
        <span className="mr-2">Already have an account?</span>
        <span
          className="text-black cursor-pointer font-medium"
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
