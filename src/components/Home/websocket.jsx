import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { downloadCompleted, increment } from "../slices/statusUpdateSlice";
import { updateLocalStorage } from "../common/utils/localStorageUtils";

export default function WebSocketHandler() {
    const dispatch = useDispatch();
    const socketUrl = "https://d18jyfeuf17gzw.cloudfront.net/ws";

    useEffect(() => {
        const socket = new WebSocket(socketUrl);
    
        // Connection opened
        socket.addEventListener("open", (event) => {
          console.log("Connection Open");
        })
    
        // Listen for messages
        socket.addEventListener("message", (event) => {
          const response = JSON.parse(event.data);
          console.log(response);
          const {jobType, uid, status} = response;
          if(status === "Job completed") {
            dispatch(downloadCompleted(String(uid)));
          }

          updateLocalStorage(uid, status);
          dispatch(increment(jobType));
        })
    
        // cleanup function is run when component is re-rendered/unmounted
        return () => socket.close();
    }, []) // [] to ensure effect runs only once after initial render
}