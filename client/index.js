
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000"; // Replace with your server URL

export const socket = io(ENDPOINT);

