import { IManager } from "@models/manager";
import axios from "axios";
const SERVER = "http://127.0.0.1:3001";

export const getManagers = async () => {
  const managers = (await axios.get(`${SERVER}/manager`)).data as IManager[];
  managers.sort((a, b) =>
    a.name > b.name || b.name === "Me" ? 1 : a.name < b.name ? -1 : 0
  );
  return managers;
};

export const updateManagerName = (managerId: number, name: string) =>
  axios.put(`${SERVER}/manager/${managerId}`, {
    name,
  });
