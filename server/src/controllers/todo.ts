import { Request, Response } from "express";
import { TodoInstance } from "../models/todo";
import { v4 as uuidv4 } from "uuid";
class TodoController {
  async create(req: Request, res: Response) {
    try {
      const id = uuidv4();
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Successfully created todo" });
    } catch (e) {
      return res.json({
        msg: "fail to create todo",
        status: 500,
        route: "/create",
      });
    }
  }

  async readWithPagination(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;
      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      res.json(records);
    } catch (e) {
      return res.json({
        msg: "fail to read",
        status: 500,
        route: "/read",
      });
    }
  }

  async readById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      res.json(record);
    } catch (e) {
      return res.json({
        msg: "fail to read",
        status: 500,
        route: "/read",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      if (!record) return res.json({ msg: "Can not find existing record" });
      const updatedRecord = await record.update({
        completed: record.getDataValue("completed"),
      });
      return res.json(updatedRecord);
    } catch (e) {
      return res.json({
        msg: "fail to update",
        status: 500,
        route: "/update/:id",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      if (!record) return res.json({ msg: "Can not find existing record" });
      const deletedRecord = await record.destroy();
      return res.json(deletedRecord);
    } catch (e) {
      return res.json({
        msg: "fail to delete",
        status: 500,
        route: "/delete/:id",
      });
    }
  }
}

export default new TodoController();
