import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Manager from "../models/manager";
const ManagerController = {
  create: async (req: Request, res: Response) => {
    try {
      const record = await Manager.create({ ...req.body });

      return res.json({ record, msg: "Created manager" });
    } catch (e) {
      return res.json({
        msg: "Failed to create manager",
        status: 500,
        route: "/manager",
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const records = await Manager.findAll();
      res.json(records);
    } catch (e) {
      return res.json({
        msg: "Failed to get all managers",
        status: 500,
        route: "/manager",
      });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await Manager.findOne({ where: { id } });

      console.log("manager players: ", record?.players);
      res.json(record);
    } catch (e) {
      return res.json({
        msg: "Failed to get manager by id",
        status: 500,
        route: "/manager/:id",
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await Manager.findOne({ where: { id } });
      if (!record) return res.json({ msg: "Can't find existing manager" });
      const updatedRecord = await record.update({
        name: req.body.name,
      });
      return res.json(updatedRecord);
    } catch (e) {
      return res.json({
        msg: "Failed to update manager",
        status: 500,
        route: "/manager/:id",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await Manager.findOne({ where: { id } });
      if (!record) return res.json({ msg: "Can't find existing manager" });
      const deletedRecord = await record.destroy();
      return res.json(deletedRecord);
    } catch (e) {
      return res.json({
        msg: "Failed to delete manager",
        status: 500,
        route: "/manager/:id",
      });
    }
  },
};

export default ManagerController;
