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
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          completed?: boolean | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          completed?: boolean | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          title?: string;
          updated_at?: string | null;
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
