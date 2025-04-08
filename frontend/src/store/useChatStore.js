
import {create} from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
  
    getUsers: async (user) => {
      set({ isUsersLoading: true });
      try {
        console.log("making call");
        const res = await axiosInstance.get("/messages/users",{
          params: { userId: user._id }
        });
        console.log("Comimng call")
        set({ users: res.data });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isUsersLoading: false });
      }
    },

    getMessages : async(userId,user) => {

        set({isMessagesLoading :true});
        try{
            const res = await axiosInstance.get(`/messages/${userId}`,{
              params: { userId: user._id }
            });
            set({messages : res.data});
            // console.log("Message: ",get().messages);
        }catch(e){
            console.log("error in getting messages in chat store");
            toast.error("Failed to load messages");
        }finally{
            set({isMessagesLoading :false});
        }
    },

    sendMessage : async(messageData)=>{

        try{
            const {selectedUser,messages} = get();
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
            // console.log("Message after sending: ",get().messages);
        }catch(e){
            console.log("error in sending message in chat store");
            toast.error("Failed to send message");
        }
    },

    subscribeToMessages : async(socket)=>{

      const { selectedUser } = get();
      if (!selectedUser) return;

      socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;

        set({
          messages: [...get().messages, newMessage],
        });
      });
    },
    unsubscribeFromMessages : async(socket)=>{

      socket.off("newMessage");
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
