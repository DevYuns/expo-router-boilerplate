import {Button, Icon, LoadingIndicator, useDooboo} from 'dooboo-ui';

import styled from '@emotion/native';
import {useRouter} from 'expo-router';
import {useAtom} from 'jotai';
import {todosAtom} from '../src/store/todos';
import type {ReactElement} from 'react';
import {Suspense} from 'react';
import {Text, View} from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.bg.basic};

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Item = styled.View`
  border-bottom-width: 0.3px;
  border-style: solid;
  border-color: ${({theme}) => theme.text.placeholder};
  padding: 12px 24px;

  flex-direction: row;
`;

type Props = {};

function Page({}: Props): React.ReactElement {
  const [todos] = useAtom(todosAtom);

  return (
    <View>
      {todos.map((todo, i) => (
        <Item key={todo.id}>
          <Text>{++i}.</Text>
          <View style={{width: 10}} />
          <Text>{todo.title}</Text>
          <View style={{width: 20}} />
          <Text>{todo.content}</Text>
        </Item>
      ))}
    </View>
  );
}

function PageWrapper(): ReactElement {
  const {theme} = useDooboo();
  const router = useRouter();

  return (
    <Container>
      <Title>Todos</Title>
      <Button
        testID="btn-back"
        onPress={() => router.back()}
        startElement={
          <Icon
            name="ChevronLeftAlt"
            size={16}
            color={theme.text.contrast}
            style={{
              marginRight: 12,
            }}
          />
        }
        text={'Back'}
      />

      <View style={{marginTop: 20, height: 200, overflow: 'scroll'}}>
        <Suspense fallback={<LoadingIndicator />}>
          <Page />
        </Suspense>
      </View>
    </Container>
  );
}

export default PageWrapper;
