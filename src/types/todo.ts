export type Note = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CreateNoteDto = {
    title: string;
    content: string;
    email: string;
    dueDate?: Date;
  }
  
  export type UpdateNoteDto = {
    title?: string;
    content?: string;
    dueDate?: Date;
  }
  
  export interface NoteFilters {
    search?: string;
    startDate?: Date;
    endDate?: Date;
  }