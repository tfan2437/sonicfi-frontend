import { axiosInstance } from "@/lib/axios";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  User,
} from "firebase/auth";
import { AxiosError } from "axios";
import { User as UserType } from "@/types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const defaultPhotoURL = "";

const signUp = async (
  name: string,
  email: string,
  password: string
): Promise<UserType> => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;

    // Update displayName in the Firebase Auth user profile
    await updateProfile(user, {
      displayName: name,
      photoURL: defaultPhotoURL,
    });

    return await createUser({
      uid: user.uid,
      username: name || "Sonicfi User",
      email: email,
      photoURL: user.photoURL || defaultPhotoURL,
    });
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string; message: string };
      console.error("Error during Sign Up:", firebaseError.message);
      console.error("Error code:", firebaseError.code);
      alert(firebaseError.code.split("/")[1].split("-").join(" "));
    } else {
      console.error("Unknown error during sign up:", error);
    }

    throw new Error("Failed to sign up");
  }
};

const login = async (email: string, password: string): Promise<void> => {
  try {
    const respose = await signInWithEmailAndPassword(auth, email, password);
    const user = respose.user;
    console.log("Login successfully! User: " + user.displayName);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string; message: string };
      console.error("Error during Login:", firebaseError.message);
      console.error("Error code:", firebaseError.code);
      alert(firebaseError.code.split("/")[1].split("-").join(" "));
    } else {
      console.error("Unknown error during login:", error);
    }
  }
};

const loginWithGoogle = async (): Promise<UserType> => {
  let user: User | null = null;
  try {
    const respose = await signInWithPopup(auth, provider);
    user = respose.user;
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string; message: string };
      console.error("Error during Google Login:", firebaseError.message);
      console.error("Error code:", firebaseError.code);
      alert(firebaseError.code.split("/")[1].split("-").join(" "));
    } else {
      console.error("Unknown error during Google login:", error);
    }
  }
  console.log("GOOGLE USER: ", user);

  if (!user) throw new Error("Failed to login with Google");
  console.log({
    uid: user.uid,
    username: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });

  return await createUser({
    uid: user.uid,
    username: user.displayName || "Sonicfi User",
    email: user.email || "",
    photoURL: user.photoURL || defaultPhotoURL,
  });
};

const signOut = (): Promise<void> => {
  return firebaseSignOut(auth);
};

const createUser = async ({
  uid,
  username,
  email,
  photoURL,
}: {
  uid: string;
  username: string;
  email: string;
  photoURL: string;
}): Promise<UserType> => {
  try {
    const { data } = await axiosInstance.post(`/users/${uid}`, {
      username,
      email,
      image_url: photoURL,
    });

    if (!data.user) {
      throw new Error(
        "Failed to create user: " + (data.message || "Unknown error")
      );
    }
    return data.user;
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof AxiosError && error.response) {
      console.error("Server response:", error.response.data);
    }
    throw error;
  }
};

export { auth, signUp, login, loginWithGoogle, signOut, createUser };
