export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      campaigns_mvp_chicago: {
        Row: {
          campaign_day_of_week: string | null
          campaign_id: number | null
          campaign_summary: string | null
          dollar_off_value: string | null
          id: string
          max_redemption: number | null
          offer_end_time: string | null
          offer_menu_id: number | null
          offer_name: string | null
          offer_start_time: string | null
          offer_type: string | null
          percentage_off_value: string | null
          restaurant_id: number | null
          status: string | null
          target_new_customer: boolean | null
          target_returning_customer: boolean | null
          updated_at: string | null
        }
        Insert: {
          campaign_day_of_week?: string | null
          campaign_id?: number | null
          campaign_summary?: string | null
          dollar_off_value?: string | null
          id?: string
          max_redemption?: number | null
          offer_end_time?: string | null
          offer_menu_id?: number | null
          offer_name?: string | null
          offer_start_time?: string | null
          offer_type?: string | null
          percentage_off_value?: string | null
          restaurant_id?: number | null
          status?: string | null
          target_new_customer?: boolean | null
          target_returning_customer?: boolean | null
          updated_at?: string | null
        }
        Update: {
          campaign_day_of_week?: string | null
          campaign_id?: number | null
          campaign_summary?: string | null
          dollar_off_value?: string | null
          id?: string
          max_redemption?: number | null
          offer_end_time?: string | null
          offer_menu_id?: number | null
          offer_name?: string | null
          offer_start_time?: string | null
          offer_type?: string | null
          percentage_off_value?: string | null
          restaurant_id?: number | null
          status?: string | null
          target_new_customer?: boolean | null
          target_returning_customer?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      deal_intent_events: {
        Row: {
          anonymous_install_id: string | null
          app_platform: string | null
          app_version: string | null
          campaign_id: number | null
          city: string | null
          created_at: string
          cta_label: string | null
          distance_miles: number | null
          event_name: string
          intent_event_id: string
          listing_position: number | null
          location_permission_status: string | null
          metadata: Json | null
          neighborhood: string | null
          offer_menu_id: number | null
          priority_listing: boolean | null
          restaurant_id: number | null
          screen_name: string | null
          session_id: string | null
          source: string | null
        }
        Insert: {
          anonymous_install_id?: string | null
          app_platform?: string | null
          app_version?: string | null
          campaign_id?: number | null
          city?: string | null
          created_at?: string
          cta_label?: string | null
          distance_miles?: number | null
          event_name: string
          intent_event_id?: string
          listing_position?: number | null
          location_permission_status?: string | null
          metadata?: Json | null
          neighborhood?: string | null
          offer_menu_id?: number | null
          priority_listing?: boolean | null
          restaurant_id?: number | null
          screen_name?: string | null
          session_id?: string | null
          source?: string | null
        }
        Update: {
          anonymous_install_id?: string | null
          app_platform?: string | null
          app_version?: string | null
          campaign_id?: number | null
          city?: string | null
          created_at?: string
          cta_label?: string | null
          distance_miles?: number | null
          event_name?: string
          intent_event_id?: string
          listing_position?: number | null
          location_permission_status?: string | null
          metadata?: Json | null
          neighborhood?: string | null
          offer_menu_id?: number | null
          priority_listing?: boolean | null
          restaurant_id?: number | null
          screen_name?: string | null
          session_id?: string | null
          source?: string | null
        }
        Relationships: []
      }
      happyhour_chicago: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      happyhour_mvp_chicago: {
        Row: {
          address: string | null
          city: string | null
          description: string | null
          google_rating: number | null
          google_url: string | null
          id: string
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          menu_url: string | null
          name: string | null
          neighborhood: string | null
          phone: string | null
          "postal code": number | null
          priority_listing: string | null
          restaurant_id: number | null
          restaurant_image_url: string | null
          state: string | null
          ticket_size_max: string | null
          ticket_size_min: string | null
          timezone: string | null
          updated_at: string | null
          website_url: string | null
          yelp_rating: number | null
          yelp_url: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          description?: string | null
          google_rating?: number | null
          google_url?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          menu_url?: string | null
          name?: string | null
          neighborhood?: string | null
          phone?: string | null
          "postal code"?: number | null
          priority_listing?: string | null
          restaurant_id?: number | null
          restaurant_image_url?: string | null
          state?: string | null
          ticket_size_max?: string | null
          ticket_size_min?: string | null
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
          yelp_rating?: number | null
          yelp_url?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          description?: string | null
          google_rating?: number | null
          google_url?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          menu_url?: string | null
          name?: string | null
          neighborhood?: string | null
          phone?: string | null
          "postal code"?: number | null
          priority_listing?: string | null
          restaurant_id?: number | null
          restaurant_image_url?: string | null
          state?: string | null
          ticket_size_max?: string | null
          ticket_size_min?: string | null
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
          yelp_rating?: number | null
          yelp_url?: string | null
        }
        Relationships: []
      }
      happyhour_mvp_mapping: {
        Row: {
          category: string | null
          category_id: number | null
          id: string
          is_main_category: boolean | null
          restaurant_id: number | null
        }
        Insert: {
          category?: string | null
          category_id?: number | null
          id?: string
          is_main_category?: boolean | null
          restaurant_id?: number | null
        }
        Update: {
          category?: string | null
          category_id?: number | null
          id?: string
          is_main_category?: boolean | null
          restaurant_id?: number | null
        }
        Relationships: []
      }
      menu_mvp_chicago: {
        Row: {
          category_main: string | null
          category_sub: string | null
          id: string
          item_description: string | null
          item_name: string | null
          menu_item_image_url: string | null
          offer_item_id: number | null
          offer_menu_id: number | null
          offer_price: string | null
          "offer_value_%": string | null
          offer_value_$: string | null
          regular_price: string | null
          restaurant_id: number | null
          updated_at: string | null
        }
        Insert: {
          category_main?: string | null
          category_sub?: string | null
          id?: string
          item_description?: string | null
          item_name?: string | null
          menu_item_image_url?: string | null
          offer_item_id?: number | null
          offer_menu_id?: number | null
          offer_price?: string | null
          "offer_value_%"?: string | null
          offer_value_$?: string | null
          regular_price?: string | null
          restaurant_id?: number | null
          updated_at?: string | null
        }
        Update: {
          category_main?: string | null
          category_sub?: string | null
          id?: string
          item_description?: string | null
          item_name?: string | null
          menu_item_image_url?: string | null
          offer_item_id?: number | null
          offer_menu_id?: number | null
          offer_price?: string | null
          "offer_value_%"?: string | null
          offer_value_$?: string | null
          regular_price?: string | null
          restaurant_id?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      menus: {
        Row: {
          category: string
          created_at: string | null
          id: string
          item_name: string
          price: number
          restaurant_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          item_name: string
          price: number
          restaurant_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          item_name?: string
          price?: number
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menus_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants_chicago"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants_chicago: {
        Row: {
          cuisine: string | null
          happy_hour_deal: string | null
          happy_hour_end: string | null
          happy_hour_start: string | null
          has_happy_hour: boolean | null
          id: string
          image_url: string | null
          name: string
          neighborhood: string | null
          price_range: string | null
        }
        Insert: {
          cuisine?: string | null
          happy_hour_deal?: string | null
          happy_hour_end?: string | null
          happy_hour_start?: string | null
          has_happy_hour?: boolean | null
          id?: string
          image_url?: string | null
          name: string
          neighborhood?: string | null
          price_range?: string | null
        }
        Update: {
          cuisine?: string | null
          happy_hour_deal?: string | null
          happy_hour_end?: string | null
          happy_hour_start?: string | null
          has_happy_hour?: boolean | null
          id?: string
          image_url?: string | null
          name?: string
          neighborhood?: string | null
          price_range?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
