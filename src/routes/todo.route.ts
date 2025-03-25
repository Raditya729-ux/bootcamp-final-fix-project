import { Router } from "express";
import NoteController from "../controllers/todo.controller";
import NoteService from "../services/todo.service";
import ToDoRepository from "../repositories/todo.repository";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prismaClient = new PrismaClient();
const noteRepository = new ToDoRepository(prismaClient);
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

router.get("/", (req, res, next) => noteController.getAllNotes(req, res, next));
router.get("/:id", (req, res, next) =>
  noteController.getNoteById(req, res, next)
);
router.post("/", (req, res, next) => noteController.createNote(req, res, next));
router.put("/:id", (req, res, next) =>
  noteController.updateNote(req, res, next)
);
router.patch("/:id", (req, res, next) =>
  noteController.softDeleteNote(req, res, next)
);

export default router;