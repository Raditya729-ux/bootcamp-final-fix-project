import { PrismaClient, Prisma } from "@prisma/client";
import ToDo from "../models/todo.model";
import { CreateNoteDto, UpdateNoteDto, NoteFilters } from "../types/todo";
import { PaginationParams } from "../types/pagination";
import { getErrorMessage } from "../utils/error";

class ToDoRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findAll(
    userId: number,
    pagination?: PaginationParams,
    filters?: NoteFilters
  ): Promise<{ todos: ToDo[]; total: number } | string> {
    try {
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 12;
      const skip = (page - 1) * limit;

      const where: Prisma.ToDoWhereInput = {
        isDeleted: false,
        userId,
        ...(filters?.search && {
          OR: [
            { title: { contains: filters.search, mode: "insensitive" } },
            { content: { contains: filters.search, mode: "insensitive" } },
          ],
        }),
        ...(filters?.startDate && { createdAt: { gte: filters.startDate } }),
        ...(filters?.endDate && { createdAt: { lte: filters.endDate } }),
      };

      const [todos, total] = await Promise.all([
        this.prisma.toDo.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            isDeleted: true,
            userId: true,
            dueDate: true
          },
        }),
        this.prisma.toDo.count({ where }),
      ]);

      return {
        todos: todos.map((todo) => ToDo.fromEntity(todo)),
        total,
      };
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async findById(id: number, userId: number): Promise<ToDo | null | string> {
    try {
      const todo = await this.prisma.toDo.findFirst({
        where: { id, userId, isDeleted: false },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          isDeleted: true,
          userId: true,
          dueDate : true
        },
      });
      return todo ? ToDo.fromEntity(todo) : null;
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  async create(todoData: CreateNoteDto): Promise<ToDo | string> {
    try {
      const todo = await this.prisma.toDo.create({
        data: {
          title: todoData.title,
          content: todoData.content,
          user: {
            connect: { email: todoData.email },
          },
          createdAt: new Date(),
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          isDeleted: true,
          userId: true,
          dueDate : true
        },
      });
      return ToDo.fromEntity(todo);
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  // async create(todoData: CreateNoteDto): Promise<ToDo | string> {
  //   try {
  //     const todo = await this.prisma.toDo.create({
  //       data: {
  //         title: todoData.title,
  //         content: todoData.content,
  //         userId: todoData.userId, // Menggunakan userId langsung
  //         dueDate: todoData.due_date || null, // Jika tidak ada, tetap null
  //       },
  //       select: {
  //         id: true,
  //         title: true,
  //         content: true,
  //         due_date: true, // Menampilkan due_date
  //         createdAt: true,
  //         updatedAt: true,
  //         isDeleted: true,
  //         userId: true,
  //       },
  //     });
  //     return ToDo.fromEntity(todo);
  //   } catch (error) {
  //     return getErrorMessage(error);
  //   }
  // }
  

  async update(id: number, todoData: UpdateNoteDto): Promise<ToDo | string> {
    try {
      const todo = await this.prisma.toDo.update({
        where: { id },
        data: {
          ...todoData,
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          isDeleted: true,
          userId: true,
          dueDate : true
        },
      });
      return ToDo.fromEntity(todo);
    } catch (error) {
      return getErrorMessage(error);
    }
  }

  // async update(id: number, todoData: UpdateNoteDto): Promise<ToDo | string> {
  //   try {
  //     const { title, content, due_date } = todoData; // Tambahkan due_date
  
  //     const todo = await this.prisma.toDo.update({
  //       where: { id },
  //       data: {
  //         ...(title && { title }), // Update hanya jika title ada
  //         ...(content && { content }), // Update hanya jika content ada
  //         ...(due_date !== undefined && { due_date }), // Update jika due_date dikirim
  //       },
  //       select: {
  //         id: true,
  //         title: true,
  //         content: true,
  //         due_date: true, // Menampilkan due_date
  //         createdAt: true,
  //         updatedAt: true,
  //         isDeleted: true,
  //         userId: true,
  //       },
  //     });
  
  //     return ToDo.fromEntity(todo);
  //   } catch (error) {
  //     return getErrorMessage(error);
  //   }
  // }
  

  async softDelete(id: number): Promise<ToDo | string> {
    try {
      const todo = await this.prisma.toDo.update({
        where: { id },
        data: {
          isDeleted: true,
        },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          isDeleted: true,
          userId: true,
          dueDate : true
        },
      });
      return ToDo.fromEntity(todo);
    } catch (error) {
      return getErrorMessage(error);
    }
  }
}

export default ToDoRepository;