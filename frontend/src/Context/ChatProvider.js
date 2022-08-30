import { createContext, useContext } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

// children will be our whole app
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();

  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    setUser(userInfo);

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

// How we can make all the state accessible to whole app -> Using useContext

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
