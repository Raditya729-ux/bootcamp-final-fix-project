import ToDoRepository from "../repositories/todo.repository";
import Note from "../models/todo.model";
import { CreateNoteDto, UpdateNoteDto, NoteFilters } from "../types/todo";
import { PaginationParams, PaginatedResult } from "../types/pagination";

class NoteService {
  private noteRepository: ToDoRepository;

  constructor(noteRepository: ToDoRepository) {
    this.noteRepository = noteRepository;
  }

  async getAllNotes(
    userId: number,
    pagination?: PaginationParams,
    filters?: NoteFilters
  ): Promise<PaginatedResult<Note> | string> {
    const data = await this.noteRepository.findAll(userId, pagination, filters);

    if (typeof data === "string") {
      return data;
    }

    const { todos, total } = data;

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 12;
    const lastPage = Math.ceil(total / limit);

    return {
      data: todos,
      meta: {
        total,
        page,
        lastPage,
        hasNextPage: page < lastPage,
        hasPrevPage: page > 1,
      },
    };
  }

  async getNoteById(id: number, userId: number): Promise<Note | string> {
    const note = await this.noteRepository.findById(id, userId);
    if (typeof note === "string") {
      return note;
    }

    if (!note) {
      return "Note not found";
    }

    return note;
  }

  // async createNote(noteData: CreateNoteDto): Promise<Note | string> {
  //   if (!noteData.title || !noteData.content) {
  //     return "Title and content are required";
  //   }

  //   const result = await this.noteRepository.create(noteData);
  //   if (typeof result === "string") {
  //     return result;
  //   }

  //   return result;
  // }
  async createNote(noteData: CreateNoteDto): Promise<Note | string> {
    if (!noteData.title || !noteData.content) {
      return "Title and content are required";
    }
  
    const dueDate = noteData.dueDate 
      ? new Date(noteData.dueDate) 
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default 7 hari ke depan
  
    const result = await this.noteRepository.create({
      ...noteData,
      dueDate, // Tambahkan dueDate ke dalam pembuatan note
    });
  
    if (typeof result === "string") {
      return result;
    }
  
    return result;
  }

  // async updateNote(
  //   userId: number,
  //   id: number,
  //   noteData: UpdateNoteDto
  // ): Promise<Note | string> {
  //   const existingNote = await this.noteRepository.findById(id, userId);
  //   if (typeof existingNote === "string") {
  //     return existingNote;
  //   }

  //   if (!existingNote) {
  //     return "Note not found";
  //   }

  //   const result = await this.noteRepository.update(id, noteData);
  //   if (typeof result === "string") {
  //     return result;
  //   }

  //   return result;
  // }

  async updateNote(
    userId: number,
    id: number,
    noteData: UpdateNoteDto
  ): Promise<Note | string> {
    const existingNote = await this.noteRepository.findById(id, userId);
    if (typeof existingNote === "string") {
      return existingNote;
    }
  
    if (!existingNote) {
      return "Note not found";
    }
  
    // const result = await this.noteRepository.update(id, {
    //   ...noteData,
    //   dueDate: noteData.dueDate ? new Date(noteData.dueDate) : existingNote.dueDate, // Perbarui dueDate jika dikirim
    // });
    const result = await this.noteRepository.update(id, {
      ...noteData,
      dueDate: noteData.dueDate ? new Date(noteData.dueDate) : undefined, // ✅ FIXED!
    });
  
    if (typeof result === "string") {
      return result;
    }
  
    return result;
  }

  async softDeleteNote(id: number, userId: number): Promise<Note | string> {
    const existingNote = await this.noteRepository.findById(id, userId);
    if (typeof existingNote === "string") {
      return existingNote;
    }

    if (!existingNote) {
      return "Note not found";
    }

    const result = await this.noteRepository.softDelete(id);
    if (typeof result === "string") {
      return result;
    }
    return result;
  }
}

export default NoteService;