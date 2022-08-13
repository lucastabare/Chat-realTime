import MensajesRecividos from './mensajes'
import {makeStyles} from '@material-ui/core/styles'
import EnviarMensajes from './enviar-mensajes'
import SalaUsers from './sala-usuarios'
const Chat = ({socket, room , username}) => {
    const classes = useStyle()

    return (
        <div className={classes.chatContainer}>
            <SalaUsers socket={socket} username={username} room={room} />
            <div>
                <MensajesRecividos socket={socket}/>
                <EnviarMensajes socket={socket} username={username} room={room} />
            </div>
        </div>
    )
}


export default Chat;

const useStyle = makeStyles((theme) => ({
    chatContainer : {
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 4fr",
        gridGap: "20px",
    }
}));
