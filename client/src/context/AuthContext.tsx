import type { AxiosInstance } from "axios";
import { createContext } from "react";
import type { Socket } from "socket.io-client";

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  bio?: string;
  profilePic?: string;
};

export type CredentialsType = {
  email: string;
  password: string;
  fullName?: string;
  bio?: string;
  profilePic?: string;
};

export type AuthContextType = {
  axios: AxiosInstance;
  authUser: UserType | null;
  onlineUsers: string[];
  socket: Socket | null;
  login: (state: "login" | "signup", credentials: CredentialsType) => Promise<void>;
  logout: () => void;
  updateProfile: (body: Partial<UserType> & { profilePic?: string }) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);