import { Request, Response } from "express";
import NflTeam from "../models/nflTeam";
import Player from "../models/player";
const NflTeamController = {
  create: async (req: Request, res: Response) => {
    try {
      const team = new NflTeam({ ...req.body });
      await team.save();
      return res.json({ team, msg: "Created nfl team" });
    } catch (e) {
      return res.json({
        msg: "Failed to create nfl team",
        status: 500,
        route: "/nfl-team",
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const records = await NflTeam.findAll();
      res.json(records);
    } catch (e) {
      return res.json({
        msg: "Failed to get all nfl teams",
        status: 500,
        route: "/nfl-team",
      });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const record = await NflTeam.findOne({
        include: [Player],
        where: { name },
      });
      if (!record) throw new Error("unablr to find a team with provided name");
      const players = record.players;
      res.json(record);
    } catch (e) {
      console.log(e);
      return res.json({
        msg: "Failed to get nfl team by name",
        status: 500,
        route: "/nfl-team/:name",
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const record = await NflTeam.findOne({ where: { name } });

      if (!record) return res.json({ msg: "Can't find existing nfl team" });
      const updatedRecord = await record.update({
        bye: req.body.bye,
      });
      return res.json(updatedRecord);
    } catch (e) {
      return res.json({
        msg: "Failed to update nfl team bye",
        status: 500,
        route: "/nfl-team/:name",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const record = await NflTeam.findOne({ where: { name } });
      if (!record) return res.json({ msg: "Can't find existing nfl team" });
      const deletedRecord = await record.destroy();
      return res.json(deletedRecord);
    } catch (e) {
      return res.json({
        msg: "Failed to delete nfl team",
        status: 500,
        route: "/nfl-team/:name",
      });
    }
  },
};

export default NflTeamController;
