import 'react-native';

import {useEffect} from 'react';
import type {ReactElement} from 'react';
import RootProvider from '../../src/providers';
import type {ThemeType} from 'dooboo-ui';
import type {RecoilState} from 'recoil';
import {useRecoilValue} from 'recoil';
import type {SupabaseClient} from '@supabase/supabase-js';

export const createTestElement = (
  child: ReactElement,
  themeType?: ThemeType,
): ReactElement => (
  <RootProvider initialThemeType={themeType}>{child}</RootProvider>
);

export const createTestProps = (
  obj?: object,
  moreScreenProps?: object,
): object | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  screenProps: {
    changeThemeType: jest.fn(),
    ...moreScreenProps,
  },
  ...obj,
});

export const RecoilObserver = ({
  node,
  onChange,
}: {
  node: RecoilState<any>;
  onChange: (_args: any) => any;
}): null => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);

  return null;
};

export const mockSupabase =
  jest.createMockFromModule<SupabaseClient>('../../src/supabase');
