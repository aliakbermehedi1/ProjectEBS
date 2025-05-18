import {
  HttpTransportType,
  HubConnectionBuilder,
  JsonHubProtocol,
  LogLevel,
} from "@microsoft/signalr";
import { toast } from "react-toastify";

const isDev = process.env.REACT_APP_NODE_ENV === "development";

export const establishConnection = (token) => async (dispatch) => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_MAIN_URL}/Hub`, {
      accessTokenFactory: () => token,
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
      useDefaultCredentials: true,
    })
    .withAutomaticReconnect()
    .configureLogging(isDev ? LogLevel.Information : LogLevel.None)
    .withHubProtocol(new JsonHubProtocol())
    .build();

  try {
    await connection.start();
    dispatch({ type: "ESTABLISH_CONNECTION", connection });
  } catch (err) {
    connection.onreconnecting(() => {
      toast.error(`Connection lost due to error "${err}". Reconnecting.`);
    });
    return () => connection.stop();
  }
};

export const closeConnection = () => (dispatch, getState) => {
  const socketState = getState().socket;

  if (socketState && socketState.connection) {
    socketState.connection.stop();
    dispatch({ type: "CLOSE_CONNECTION" });
  }
};
