import {Button, EditText, LoadingIndicator} from 'dooboo-ui';

import styled from '@emotion/native';

import type {ReactElement} from 'react';
import {useState, Suspense, useCallback, memo, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import {setTodoIdAtom, todoAtomFamily, todoIdsAtom} from '../src/store/todo';
import {supabase} from '../src/supabase';

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

type Props = {
  id: string;
};

function Todo({id}: Props): React.ReactElement {
  const [todo] = useAtom(todoAtomFamily(id));

  return (
    <View>
      <Item>
        <View style={{width: 10}} />
        <Text>{todo?.title}</Text>
      </Item>
    </View>
  );
}

const Todos = memo((): ReactElement => {
  const [todoIds, setTodoIds] = useAtom(todoIdsAtom);

  const [title, setTitle] = useState('');

  const cleanUpState = useCallback(() => {
    setTitle('');
  }, []);

  const handleAddTodo = async (): Promise<void> => {
    if (!title) {
      return;
    }

    const newTodo = {
      title,
    };

    const {error, data} = await supabase
      .from('todo')
      .insert(newTodo)
      .select('*');

    if (error) {
      console.error('error', error);

      return;
    }

    // set new todo
    const ids = await setTodoIds([...todoIds, data[0].id]);

    cleanUpState();
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Title>Todos</Title>
        <View style={{width: '60%'}}>
          <EditText label="title" value={title} onChangeText={setTitle} />
          <View style={{height: 20}} />
          <View style={{height: 20}} />
          <Button text="등록" onPress={handleAddTodo} />
        </View>
      </View>

      <View style={{marginTop: 20, flex: 0.8}}>
        <ScrollView>
          {todoIds.map((id) => (
            <Todo key={id} id={id} />
          ))}
        </ScrollView>
      </View>
    </>
  );
});

function Page(): ReactElement {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Container>
        <Todos />
      </Container>
    </Suspense>
  );
}

export default Page;
