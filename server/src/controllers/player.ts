import { Request, Response } from "express";
import Player from "../models/player";
const PlayerController = {
  create: async (req: Request, res: Response) => {
    try {
      const record = await Player.create({ ...req.body });
      return res.json({ record, msg: "Created player" });
    } catch (e) {
      console.log("ERROR: ", e);
      return res.json({
        msg: "Failed to create player",
        status: 500,
        route: "/player",
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const records = await Player.findAll();
      res.json(records);
    } catch (e) {
      return res.json({
        msg: "Failed to get all players",
        status: 500,
        route: "/player",
      });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await Player.findOne({ where: { id } });
      res.json(record);
    } catch (e) {
      console.log("error:", e);
      return res.json({
        msg: "Failed to get player by id",
        status: 500,
        route: "/player/:id",
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await Player.findOne({ where: { id } });
      if (!record) return res.json({ msg: "Can't find existing player" });
      console.log("update body", req.body);
      const updatedRecord = await record.update({
        ...req.body,
        totalPoints: record.totalPoints + 1,
      });
      return res.json(updatedRecord);
    } catch (e) {
      return res.json({
        msg: "Failed to update player",
        status: 500,
        route: "/player/:id",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await Player.findOne({ where: { id } });
      if (!record) return res.json({ msg: "Can't find existing player" });
      const deletedRecord = await record.destroy();
      return res.json(deletedRecord);
    } catch (e) {
      return res.json({
        msg: "Failed to delete player",
        status: 500,
        route: "/player/:id",
      });
    }
  },
};

export default PlayerController;
