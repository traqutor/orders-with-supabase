import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { TableName, Tables, TablesInsert, TablesUpdate } from '@/types_db';

export const getUserQuery = cache(async (supabase: SupabaseClient) => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw new Error(`Get User ${user} error:`, error);
  return user;
});

export const getUserProfileQuery = cache(async (supabase: SupabaseClient): Promise<Tables<'profiles'>> => {
  const { data: profile, error } = await supabase.from('profiles').select('*').single();
  if (error) throw new Error(`Get Profile error:`, error);
  return profile;
});


export const getListQuery = cache(async (supabase: SupabaseClient, tableName: TableName): Promise<Tables<TableName>[]> => {
  const { data, error } = await supabase.from(tableName).select(`*`);
  if (error) throw new Error(`Get list of ${tableName} error:`, error);
  return [...data];
});

export const insertRowQuery = async (supabase: SupabaseClient, tableName: TableName, payload: TablesInsert<TableName>) => {
  const { data, error } = await supabase.from(tableName).insert(payload);
  if (error) throw new Error(`Insert to ${tableName} error:`, error);
  return data;
};

export const updateRowQuery = async (supabase: SupabaseClient, tableName: TableName, payload: TablesUpdate<TableName>) => {
  const { data, error } = await supabase.from(tableName).update(payload).eq('id', payload.id);
  if (error) throw new Error(`Update ${tableName} error:`, error);
  return data;
};

export const upsertRowQuery = async (supabase: SupabaseClient, tableName: TableName, payload: TablesUpdate<TableName>) => {
  const { data, error } = await supabase.from(tableName).upsert(payload).eq('id', payload.id);
  if (error) throw new Error(`Update ${tableName} error:`, error);
  return data;
};

export const deleteRowQuery = async (supabase: SupabaseClient, tableName: TableName, payload: Tables<TableName>) => {
  const { error } = await supabase.from(tableName).delete().eq('id', payload.id);
  if (error) throw new Error(`Delete Order error:`, error);
  return true;
};