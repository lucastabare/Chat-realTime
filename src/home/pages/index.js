import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const classes = useStyle();
  const navigate = useNavigate();
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    navigate("/chat", { replace: true });
  };
  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <h1>{`<>Sala De Chat</>`}</h1>
        <input
          className={classes.input}
          placeholder="Nombre De Usuario..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          className={classes.input}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option className={classes.inputOption}>
            -- Seleccione la sala --
          </option>
          <option className={classes.inputOption} value="javascript">
            JavaScript
          </option>
          <option className={classes.inputOption} value="node">
            Node
          </option>
          <option className={classes.inputOption} value="express">
            Express
          </option>
          <option className={classes.inputOption} value="react">
            React
          </option>
        </select>

        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={joinRoom}
        >
          Unirse a la sala
        </button>
      </div>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(63, 73, 204)",
  },
  formContainer: {
    width: "400px",
    margin: "0 auto 0 auto",
    padding: "32px",
    background: "lightblue",
    borderradius: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid rgb(63, 73, 204)",
    fontSize: "0.9rem",
  },
  inputOption: {
    marginTop: "20px",
  },
}));

export default Home;
