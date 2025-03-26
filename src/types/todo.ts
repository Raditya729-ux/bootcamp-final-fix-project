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
    due_date?: Date;
  }
  
  export type UpdateNoteDto = {
    title?: string;
    content?: string;
    due_date?: Date;
  }
  
  export interface NoteFilters {
    search?: string;
    startDate?: Date;
    endDate?: Date;
  }