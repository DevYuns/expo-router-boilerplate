import {supabase} from './../supabase';
import {atom} from 'jotai';

export const todosAtom = atom(async () => {
  const {data, error} = await supabase.from('todo').select('*');

  if (error) {
    console.error(error);

    return [];
  }

  return data;
});
