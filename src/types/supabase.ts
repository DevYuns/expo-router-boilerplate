export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json}
  | Json[];

export interface Database {
  public: {
    Tables: {
      todo: {
        Row: {
          completed: boolean | null;
          createdAt: string | null;
          deletedAt: string | null;
          id: string;
          title: string;
          updatedAt: string | null;
        };
        Insert: {
          completed?: boolean | null;
          createdAt?: string | null;
          deletedAt?: string | null;
          id?: string;
          title: string;
          updatedAt?: string | null;
        };
        Update: {
          completed?: boolean | null;
          createdAt?: string | null;
          deletedAt?: string | null;
          id?: string;
          title?: string;
          updatedAt?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
