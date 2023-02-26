import {atomFamily} from 'jotai/utils';
import {atom, createStore, getDefaultStore} from 'jotai';
import {supabase} from '../supabase';
import type {Database} from '../types/supabase';

type Data = Database['public']['Tables']['todo']['Row'];

export const todoIdsAtom = atom(
  async () => {
    const {data, error} = await supabase.from('todo').select('id');

    if (error) {
      return [];
    }

    return data.map(({id}) => id);
  },
  async (get, set, data: string[]) => {
    console.log('새', data);

    return data;
  },
);

export const setTodoIdAtom = atom(null, async (get, set, args: string) => {
  const data = await get(todoIdsAtom);
  set(todoIdsAtom, [...data, args]);
});

export const todoAtomFamily = atomFamily((id: string) =>
  atom(async () => {
    const {data, error} = await supabase.from('todo').select('*').eq('id', id);

    if (error) {
      return null;
    }

    return data[0];
  }),
);
