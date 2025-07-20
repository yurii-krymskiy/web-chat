import { createContext } from "react";

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  bio?: string;
  profilePic?: string;
};

export type MessageType = {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp?: string;
  seen?: boolean;
};

export type MessageInputType = {
  content: string;
};

export type UnseenMessagesMap = Record<string, number>;

export type ChatContextType = {
  messages: MessageType[];
  users: UserType[];
  selectedUser: UserType | null;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: MessageInputType) => Promise<void>;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  unseenMessages: UnseenMessagesMap;
  setUnseenMessages: React.Dispatch<React.SetStateAction<UnseenMessagesMap>>;
};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);