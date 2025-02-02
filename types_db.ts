export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      actions: {
        Row: {
          color_hex: string | null
          icon_name: string | null
          id: string
          note_info: string | null
          title: string | null
        }
        Insert: {
          color_hex?: string | null
          icon_name?: string | null
          id?: string
          note_info?: string | null
          title?: string | null
        }
        Update: {
          color_hex?: string | null
          icon_name?: string | null
          id?: string
          note_info?: string | null
          title?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          customer_type_id: number | null
          description: string | null
          email: string | null
          id: string
          name: string | null
          nip: string | null
          phone: string | null
          regon: string | null
        }
        Insert: {
          address?: string | null
          customer_type_id?: number | null
          description?: string | null
          email?: string | null
          id?: string
          name?: string | null
          nip?: string | null
          phone?: string | null
          regon?: string | null
        }
        Update: {
          address?: string | null
          customer_type_id?: number | null
          description?: string | null
          email?: string | null
          id?: string
          name?: string | null
          nip?: string | null
          phone?: string | null
          regon?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'customers_customer_type_id_fkey'
            columns: ['customer_type_id']
            isOneToOne: false
            referencedRelation: 'customers_types'
            referencedColumns: ['id']
          },
        ]
      }
      customers_types: {
        Row: {
          id: number
          type_name: string
        }
        Insert: {
          id?: number
          type_name: string
        }
        Update: {
          id?: number
          type_name?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          address: string | null
          contact: string | null
          description: string | null
          email: string | null
          group_cost: number | null
          group_description: string | null
          id: string
          invoice_number: string | null
          is_invoice_group: boolean | null
          nip: string | null
          payment_at: string | null
          payment_type: string | null
          phone: string | null
          regon: string | null
          total_amount: number | null
        }
        Insert: {
          address?: string | null
          contact?: string | null
          description?: string | null
          email?: string | null
          group_cost?: number | null
          group_description?: string | null
          id?: string
          invoice_number?: string | null
          is_invoice_group?: boolean | null
          nip?: string | null
          payment_at?: string | null
          payment_type?: string | null
          phone?: string | null
          regon?: string | null
          total_amount?: number | null
        }
        Update: {
          address?: string | null
          contact?: string | null
          description?: string | null
          email?: string | null
          group_cost?: number | null
          group_description?: string | null
          id?: string
          invoice_number?: string | null
          is_invoice_group?: boolean | null
          nip?: string | null
          payment_at?: string | null
          payment_type?: string | null
          phone?: string | null
          regon?: string | null
          total_amount?: number | null
        }
        Relationships: []
      }
      labels: {
        Row: {
          color_hex: string | null
          icon_name: string | null
          id: string
          title: string | null
        }
        Insert: {
          color_hex?: string | null
          icon_name?: string | null
          id?: string
          title?: string | null
        }
        Update: {
          color_hex?: string | null
          icon_name?: string | null
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          bg_color: string | null
          created_at: string
          created_by: string
          id: string
          is_system: boolean | null
          message: string | null
          order_id: string
          pin: boolean
          text_color: string | null
        }
        Insert: {
          bg_color?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_system?: boolean | null
          message?: string | null
          order_id: string
          pin?: boolean
          text_color?: string | null
        }
        Update: {
          bg_color?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_system?: boolean | null
          message?: string | null
          order_id?: string
          pin?: boolean
          text_color?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_note_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
        ]
      }
      orders: {
        Row: {
          address: string | null
          assigned_to: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          description: string | null
          due_at: string | null
          email: string | null
          id: string
          invoice_id: string | null
          name: string | null
          nip: string | null
          phone: string | null
          reference_number: number
          regon: string | null
          service_id: string | null
          shipment_id: string | null
          status_id: string
          title: string
        }
        Insert: {
          address?: string | null
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          description?: string | null
          due_at?: string | null
          email?: string | null
          id?: string
          invoice_id?: string | null
          name?: string | null
          nip?: string | null
          phone?: string | null
          reference_number?: number
          regon?: string | null
          service_id?: string | null
          shipment_id?: string | null
          status_id: string
          title: string
        }
        Update: {
          address?: string | null
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          description?: string | null
          due_at?: string | null
          email?: string | null
          id?: string
          invoice_id?: string | null
          name?: string | null
          nip?: string | null
          phone?: string | null
          reference_number?: number
          regon?: string | null
          service_id?: string | null
          shipment_id?: string | null
          status_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'orders_customer_id_fkey'
            columns: ['customer_id']
            isOneToOne: false
            referencedRelation: 'customers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_order_invoice_id_fkey'
            columns: ['invoice_id']
            isOneToOne: false
            referencedRelation: 'invoices'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_order_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'services'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_order_shipment_id_fkey'
            columns: ['shipment_id']
            isOneToOne: false
            referencedRelation: 'shipments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_order_status_id_fkey'
            columns: ['status_id']
            isOneToOne: false
            referencedRelation: 'orders_statuses'
            referencedColumns: ['id']
          },
        ]
      }
      orders_actions: {
        Row: {
          id: number,
          action_id: string
          order_id: string
          performed: boolean | null
          performed_at: string | null
          performed_by: string | null
        }
        Insert: {
          action_id: string
          order_id: string
          performed?: boolean | null
          performed_at?: string | null
          performed_by?: string | null
        }
        Update: {
          id: number,
          action_id?: string
          order_id?: string
          performed?: boolean | null
          performed_at?: string | null
          performed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'orders_actions_action_id_fkey'
            columns: ['action_id']
            isOneToOne: false
            referencedRelation: 'actions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_order_actions_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
        ]
      }
      orders_labels: {
        Row: {
          id: string
          order_id: string
        }
        Insert: {
          id: string
          order_id: string
        }
        Update: {
          id?: string
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_order_labels_label_id_fkey'
            columns: ['id']
            isOneToOne: false
            referencedRelation: 'labels'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_order_labels_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
        ]
      }
      orders_positions: {
        Row: {
          created_at: string
          description: string
          id: string
          is_optima: boolean
          order_id: string
          position_type: string | null
          price: number | null
          price_type: string | null
          quantity: number | null
          unit: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_optima?: boolean
          order_id: string
          position_type?: string | null
          price?: number | null
          price_type?: string | null
          quantity?: number | null
          unit?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_optima?: boolean
          order_id?: string
          position_type?: string | null
          price?: number | null
          price_type?: string | null
          quantity?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_order_position_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
        ]
      }
      orders_statuses: {
        Row: {
          color_hex: string | null
          id: string
          title: string
        }
        Insert: {
          color_hex?: string | null
          id?: string
          title: string
        }
        Update: {
          color_hex?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      pinned_orders: {
        Row: {
          order_id: string
          user_id: string
        }
        Insert: {
          order_id: string
          user_id: string
        }
        Update: {
          order_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'pinned_orders_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          is_disabled: boolean | null
          email: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          is_disabled?: boolean | null
          email: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          is_disabled?: boolean | null
          email: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          address: string | null
          contact: string | null
          description: string | null
          email: string | null
          end_at: string | null
          id: string
          location: string | null
          phone: string | null
          start_at: string | null
          technician: string | null
        }
        Insert: {
          address?: string | null
          contact?: string | null
          description?: string | null
          email?: string | null
          end_at?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          start_at?: string | null
          technician?: string | null
        }
        Update: {
          address?: string | null
          contact?: string | null
          description?: string | null
          email?: string | null
          end_at?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          start_at?: string | null
          technician?: string | null
        }
        Relationships: []
      }
      services_positions: {
        Row: {
          car_plate: string | null
          description: string | null
          id: string
          is_confirmed: boolean | null
          is_done: boolean | null
          serial_no: string | null
          service_id: string
          technician: string | null
          vehicle_vin: string | null
        }
        Insert: {
          car_plate?: string | null
          description?: string | null
          id?: string
          is_confirmed?: boolean | null
          is_done?: boolean | null
          serial_no?: string | null
          service_id: string
          technician?: string | null
          vehicle_vin?: string | null
        }
        Update: {
          car_plate?: string | null
          description?: string | null
          id?: string
          is_confirmed?: boolean | null
          is_done?: boolean | null
          serial_no?: string | null
          service_id?: string
          technician?: string | null
          vehicle_vin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_service_positions_service_id_fkey'
            columns: ['service_id']
            isOneToOne: false
            referencedRelation: 'services'
            referencedColumns: ['id']
          },
        ]
      }
      shipments: {
        Row: {
          address: string | null
          contact: string | null
          due_at: string | null
          email: string | null
          id: string
          phone: string | null
        }
        Insert: {
          address?: string | null
          contact?: string | null
          due_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
        }
        Update: {
          address?: string | null
          contact?: string | null
          due_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never


export type TablesInsert<
  PublicTableNameOrOptions extends | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
      schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
