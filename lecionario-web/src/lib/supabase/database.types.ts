export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      readings: {
        Row: {
          id: number
          date: string
          cycle: string
          season: string
          reading_type: string
          reference: string
          citation: string | null
          text: string
          translation: string
          created_at: string
        }
        Insert: {
          id?: number
          date: string
          cycle: string
          season: string
          reading_type: string
          reference: string
          citation?: string | null
          text: string
          translation?: string
          created_at?: string
        }
        Update: {
          id?: number
          date?: string
          cycle?: string
          season?: string
          reading_type?: string
          reference?: string
          citation?: string | null
          text?: string
          translation?: string
          created_at?: string
        }
      }
      collects: {
        Row: {
          id: number
          date: string
          cycle: string
          season: string
          title: string
          text: string
          source: string | null
          created_at: string
        }
        Insert: {
          id?: number
          date: string
          cycle: string
          season: string
          title: string
          text: string
          source?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          date?: string
          cycle?: string
          season?: string
          title?: string
          text?: string
          source?: string | null
          created_at?: string
        }
      }
      prayers: {
        Row: {
          id: number
          date: string
          cycle: string
          season: string
          title: string
          text: string
          author: string | null
          source: string | null
          created_at: string
        }
        Insert: {
          id?: number
          date: string
          cycle: string
          season: string
          title: string
          text: string
          author?: string | null
          source?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          date?: string
          cycle?: string
          season?: string
          title?: string
          text?: string
          author?: string | null
          source?: string | null
          created_at?: string
        }
      }
      meditations: {
        Row: {
          id: number
          date: string
          cycle: string
          season: string
          prompt: string
          duration: string | null
          created_at: string
        }
        Insert: {
          id?: number
          date: string
          cycle: string
          season: string
          prompt: string
          duration?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          date?: string
          cycle?: string
          season?: string
          prompt?: string
          duration?: string | null
          created_at?: string
        }
      }
      meditation_questions: {
        Row: {
          id: number
          meditation_id: number
          question: string
          order_index: number
          created_at: string
        }
        Insert: {
          id?: number
          meditation_id: number
          question: string
          order_index: number
          created_at?: string
        }
        Update: {
          id?: number
          meditation_id?: number
          question?: string
          order_index?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
