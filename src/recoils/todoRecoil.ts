import {atomFamily, selector, atom, DefaultValue} from 'recoil';
import type {Database} from '../types/supabase';
import {supabase} from '../supabase';

type Data = Database['public']['Tables']['todo']['Row'];

export const todoIdsRecoil = atom<string[]>({
  key: 'todoIds',
  default: selector({
    key: 'todoIds/Default',
    get: async () => {
      const {data, error} = await supabase.from('todo').select('id');

      if (error) {
        return [];
      }

      return data.map(({id}) => id);
    },
  }),
});

export const todoRecoil = atomFamily<Data | null, {todoId: string}>({
  key: 'todoRecoil',
  default: async ({todoId}) => {
    const {data, error} = await supabase
      .from('todo')
      .select('*')
      .match({id: todoId});

    if (error) {
      return null;
    }

    return data[0];
  },
  effects: ({todoId}) => [
    ({onSet}) => {
      onSet(async (newValues, oldValues) => {
        if (
          !newValues ||
          !oldValues ||
          oldValues instanceof DefaultValue ||
          newValues === oldValues
        ) {
          return;
        }

        try {
          const {error} = await supabase
            .from('todo')
            .update({
              title: newValues.title,
            })
            .match({id: todoId});

          if (error) {
            throw error;
          }
        } catch (error) {
          console.error(error);
        }
      });
    },
  ],
});
