import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SalaUsuarios =({socket, username, room}) =>{
    const [roomUsers, setRoomUsers] = useState([]);
    const classes = useStyle();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('chatroom_users',(data)=>{
            console.log(data);
            setRoomUsers(data);
        })
        return () => socket.off('chatroom_users');
    }, [socket]);

    const leaveRoom =()=>{
        const __createtime__ = Date.now();
        socket.emit('leave_room',{username, room, __createtime__});
        navigate('/',{replace:true});
    };
    return (
        <div className={classes.roomAndUsersColumn}>
          <h2 className={classes.roomTitle}>{room}</h2>
    
          <div>
            {roomUsers.length > 0 && <h5 className={classes.usersTitle}>Users:</h5>}
            <ul className={classes.usersList}>
              {roomUsers.map((user) => (
                <li
                  style={{
                    fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
                  }}
                  key={user.id}
                >
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
    
          <button className='btn btn-outline' onClick={leaveRoom}>
            Abandonar Sala
          </button>
        </div>
      );
}

export default SalaUsuarios

const useStyle = makeStyles((theme) => ({
    roomAndUsersColumn: {
        borderRight: "1px solid #dfdfdf",
    },
    roomTitle: {
        marginBottom: "60px",
        textTransform : "uppercase",
        fontSize : "2rem",
        color : "#fff",
    },
    usersTitle: {
        listStyle: "none",
        paddingLeft: "0",
        marginBottom: "60px",
        color: "rgb(153, 217, 234)",
    },
    usersList: {
        li : {
            marginBottom : "12px",
        }
    },
    
}));