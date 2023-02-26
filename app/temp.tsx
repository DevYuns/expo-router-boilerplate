import {Button, EditText, Icon, LoadingIndicator} from 'dooboo-ui';

import styled from '@emotion/native';
import type {ReactElement} from 'react';
import {Suspense, useState, memo} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {todoIdsRecoil, todosRecoil} from '../src/recoils/todoRecoil';
import {supabase} from '../src/supabase';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.bg.basic};
  padding: 20px;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Item = styled.View`
  border: 0.3px solid ${({theme}) => theme.text.placeholder};
  padding: 12px 24px;
  margin-bottom: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type Props = {
  id: string;
};

function Todo({id}: Props): ReactElement {
  const [todo, setTodo] = useRecoilState(todosRecoil({todoId: id}));
  const setTodoIds = useSetRecoilState(todoIdsRecoil);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo?.title || '');

  const handleDelete = async (): Promise<void> => {
    const {error} = await supabase.from('todo').delete().match({id: id});

    if (error) {
      return;
    }

    setTodoIds((prev) => prev.filter((prevId) => prevId !== id));
  };

  const handleEdit = async (): Promise<void> => {
    setTodo((prev) => prev && {...prev, title: value});
    setEditing(false);
  };

  return (
    <Item key={todo?.id}>
      {editing ? (
        <EditText
          style={{flex: 1, marginRight: 20}}
          value={value}
          onChangeText={setValue}
        />
      ) : (
        <Text>{todo?.title}</Text>
      )}
      <View style={{flexDirection: 'row'}}>
        {editing ? (
          <Pressable onPress={handleEdit}>
            <Icon name="Edit" />
          </Pressable>
        ) : (
          <>
            <Pressable onPress={() => setEditing(true)}>
              <Icon name="Edit" />
            </Pressable>
            <View style={{width: 12}} />
            <Pressable onPress={handleDelete}>
              <Icon name="Delete" />
            </Pressable>
          </>
        )}
      </View>
    </Item>
  );
}

const TodoView = memo((): React.ReactElement => {
  const todoIds = useRecoilValue(todoIdsRecoil);

  return (
    <ScrollView>
      {todoIds.map((id) => (
        <Todo key={id} id={id} />
      ))}
    </ScrollView>
  );
});

function PageWrapper(): ReactElement {
  const setTodoIds = useSetRecoilState(todoIdsRecoil);

  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async (): Promise<void> => {
    if (!title) {
      return;
    }

    const newTodo = {
      title,
    };

    setLoading(true);

    try {
      const {error, data} = await supabase
        .from('todo')
        .insert(newTodo)
        .select('*');

      if (error) {
        throw error;
      }

      setTodoIds((prev) => [...prev, data[0].id]);
      setTitle('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Title>Todos</Title>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <EditText
            style={{flex: 1}}
            direction="row"
            placeholder="new Todo"
            value={title}
            onChangeText={setTitle}
          />
          <View style={{width: 20}} />
          <Button text="add" onPress={handleAddTodo} loading={loading} />
        </View>
      </View>

      <View style={{marginTop: 20, flex: 1, alignSelf: 'stretch'}}>
        <Suspense fallback={<LoadingIndicator />}>
          <TodoView />
        </Suspense>
      </View>
    </Container>
  );
}

export default PageWrapper;
