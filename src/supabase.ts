import {Platform} from 'react-native';
import {setupURLPolyfill} from 'react-native-url-polyfill';

if (Platform.OS !== 'web') {
  setupURLPolyfill();
}

import {SUPABASE_ANON_KEY, SUPABASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import type {Database} from './types/supabase';

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
