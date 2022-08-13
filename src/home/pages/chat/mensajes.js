import { useState, useEffect , useRef} from "react";
import { makeStyles } from "@material-ui/core/styles";

const Mensajes = ({ socket }) => {
  const classes = useStyle();
  const [messagesRecieved, setMessagesReceived] = useState([])
const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    socket.on('last_100_messages',(last_100_messages)=>{
        console.log('Ultimos 100 mensajes: ',
        JSON.parse(last100messages));
        last100messages = JSON.parse(last100messages);
        last100messages = sortMessagesByDate(last100messages);
        setMessagesReceived((state) => [...last100Messages, ...state]);
    })

    return () => socket.off('last_100_messages');
  }, [socket]);

    useEffect(() => {
        messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
    }, [messagesRecieved]);

    function sortMessagesByDate(messages) {
        return messages.sort((a.__createdtime__)-parseInt(b.__createdtime__))
    }

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={classes.mensajeColumna} ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className={classes.mensaje} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={classes.msgMeta}>{msg.username}</span>
            <span className={classes.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={classes.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Mensajes;

const useStyle = makeStyles((theme) => ({
    mensajeColumna: {
        height : "85vh",
        overflow : "auto",
        padding : "10px 10px 10px 40px",
    },
    mensaje : {
        background : "rgb(0, 24, 111)",
        borderRadius : "6px",
        marginBottom : "24px",
        maxWidth : "600px",
        padding : "12px",
    },
    msgMeta : {
        color: "rgb(153, 217, 234)",
        fontSize : "0.75rem",
    },
    msgText : {
        color : "#fff",
    }
}));
