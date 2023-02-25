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
          checked: boolean;
          content: string | null;
          createdAt: string;
          deletedAt: string | null;
          id: number;
          title: string | null;
          updatedAt: string;
        };
        Insert: {
          checked?: boolean;
          content?: string | null;
          createdAt?: string;
          deletedAt?: string | null;
          id?: number;
          title?: string | null;
          updatedAt: string;
        };
        Update: {
          checked?: boolean;
          content?: string | null;
          createdAt?: string;
          deletedAt?: string | null;
          id?: number;
          title?: string | null;
          updatedAt?: string;
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
