import { useDispatch, useSelector } from "react-redux";
import ChatContainer from "../components/core/Chat/ChatContainer";
import NoChatSelected from "../components/core/Chat/NoChatSelected";
import Sidebar from "../components/core/Chat/Sidebar";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { connectSocket } from "../services/operations/authAPI";


const Chat = () => {
  const { selectedUser } = useChatStore();
  const { token } = useSelector( (state)=>state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      // Dispatch connectSocket when token is available
      dispatch(connectSocket());

    }
  }, [token, dispatch]);
  
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;