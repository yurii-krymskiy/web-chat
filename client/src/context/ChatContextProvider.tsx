import { useContext, useEffect, useState, type ReactNode } from "react";
import { AuthContext, type UserType } from "./AuthContext";
import toast from "react-hot-toast";
import { ChatContext, type ChatContextType, type MessageInputType, type MessageType, type UnseenMessagesMap } from "./ChatContext";
import type { Socket } from "socket.io-client";
import type { AxiosInstance } from "axios";

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [unseenMessages, setUnseenMessages] = useState<UnseenMessagesMap>({});

  const { socket, axios } = useContext(AuthContext)! as {
    socket: Socket | null;
    axios: AxiosInstance;
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error((error && typeof error === 'object' && 'message' in error) ? (error as { message: string }).message : 'An error occurred')
    }
  };

  const getMessages = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error((error && typeof error === 'object' && 'message' in error) ? (error as { message: string }).message : 'An error occurred')
    }
  };

  const sendMessage = async (messageData: MessageInputType) => {
    try {
      if (!selectedUser) return;

      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error && typeof error === 'object' && 'message' in error) ? (error as { message: string }).message : 'An error occurred')
    }
  };

  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage: MessageType) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
        }));
      }
    });
  };

  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value: ChatContextType = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};