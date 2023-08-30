import { IManager } from "@models/manager";
import axios from "axios";
const SERVER = "http://127.0.0.1:3001";

export const getManagers = async () =>
  (await axios.get(`${SERVER}/manager`)).data as IManager[];
