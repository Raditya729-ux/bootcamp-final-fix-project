// import { type ToDo as PrismaToDo } from "@prisma/client";

// class ToDo {
//   private id: number;
//   private title: string;
//   private content: string;
//   private createdAt: Date;

//   constructor(id: number, title: string, content: string, createdAt: Date) {
//     this.id = id;
//     this.title = title;
//     this.content = content;
//     this.createdAt = createdAt;
//   }

//   static fromEntity(prismaTodo: PrismaToDo): ToDo {
//     return new ToDo(
//       prismaTodo.id,
//       prismaTodo.title,
//       prismaTodo.content,
//       prismaTodo.createdAt
//     );
//   }

//   toDTO() {
//     return {
//       id: this.id,
//       title: this.title,
//       content: this.content,
//       createdAt: this.createdAt,
//     };
//   }
// }

// export default ToDo;

// import { type ToDo as PrismaToDo } from "@prisma/client";

// class ToDo {
//   private id: number;
//   private title: string;
//   private content: string;
//   private createdAt: Date;
//   private updatedAt: Date;
//   private isDeleted: boolean;
//   private userId: number;

//   constructor(
//     id: number,
//     title: string,
//     content: string,
//     createdAt: Date,
//     updatedAt: Date,
//     isDeleted: boolean,
//     userId: number
//   ) {
//     this.id = id;
//     this.title = title;
//     this.content = content;
//     this.createdAt = createdAt;
//     this.updatedAt = updatedAt;
//     this.isDeleted = isDeleted;
//     this.userId = userId;
//   }

//   static fromEntity(prismaTodo: PrismaToDo): ToDo {
//     return new ToDo(
//       prismaTodo.id,
//       prismaTodo.title,
//       prismaTodo.content,
//       prismaTodo.createdAt,
//       prismaTodo.updatedAt,
//       prismaTodo.isDeleted,
//       prismaTodo.userId
//     );
//   }

//   toDTO() {
//     return {
//       id: this.id,
//       title: this.title,
//       content: this.content,
//       createdAt: this.createdAt,
//       updatedAt: this.updatedAt,
//       isDeleted: this.isDeleted,
//       userId: this.userId,
//     };
//   }
// }

// export default ToDo;
// 

import { type ToDo as PrismaToDo } from "@prisma/client";

class ToDo {
  private id: number;
  private title: string;
  private content: string;
  private createdAt: Date;
  private updatedAt: Date;
  private isDeleted: boolean;
  private userId: number;
  private dueDate: Date | null; // Ganti due_date menjadi dueDate

  constructor(
    id: number,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: boolean,
    userId: number,
    dueDate: Date | null // Ganti due_date menjadi dueDate
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
    this.userId = userId;
    this.dueDate = dueDate; // Ganti due_date menjadi dueDate
  }

  static fromEntity(prismaTodo: PrismaToDo): ToDo {
    return new ToDo(
      prismaTodo.id,
      prismaTodo.title,
      prismaTodo.content,
      prismaTodo.createdAt,
      prismaTodo.updatedAt,
      prismaTodo.isDeleted,
      prismaTodo.userId,
      prismaTodo.dueDate || null // Ganti prismaTodo.due_date menjadi prismaTodo.dueDate
    );
  }

  toDTO() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
      userId: this.userId,
      dueDate: this.dueDate, // Ganti due_date menjadi dueDate
    };
  }
}

export default ToDo;


