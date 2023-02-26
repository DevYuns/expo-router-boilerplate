import styled from '@emotion/native';
import {Icon} from 'dooboo-ui';
import {useRouter, useSegments} from 'expo-router';
import type {ReactElement} from 'react';
import {Pressable} from 'react-native';
import {Heading1} from './Typography';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 20px 0px 20px;
  height: 48px;
  border-bottom-width: 0.2px;
  border-bottom-color: ${({theme}) => theme.text.basic};
`;

const Indicator = styled(Pressable)`
  padding: 12px;
`;

export default function Header(): ReactElement {
  const router = useRouter();
  const segments = useSegments();

  return (
    <Container>
      {segments.length !== 0 ? (
        <Indicator onPress={() => router.back()}>
          <Icon name="ChevronLeft" />
        </Indicator>
      ) : null}

      <Heading1>Welcome to expo router Demo!</Heading1>
    </Container>
  );
}
