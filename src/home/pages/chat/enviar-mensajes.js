import { useState } from "react";
import { makeStyles } from "@material-ui/core";

const EnviarMensajes = ({ socket, username, room }) => {
  const classes = useStyle();
  const [message, setMessage] = useState("");

  const enviarMensaje = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
      console.log(message);
    }
  };
  return (
    <div className={classes.enviarMensajeContainer}>
      <input
        className={classes.mensajeInput}
        placeholder="Mensaje..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='btn btn-primary' onClick={enviarMensaje}>Enviar</button>
    </div>
  );
};

export default EnviarMensajes;

const useStyle = makeStyles((theme) => ({
    enviarMensajeContainer: {
        padding: "16px 20px 20px 16px",
    },
    mensajeInput: {
        padding : "14px",
        marginRight : "16px",
        width : "60%",
        borderRadius : "6px",
        border : "1px solid rgb(153, 217, 234)",
        fontsize : "0.9rem"
    }
}));