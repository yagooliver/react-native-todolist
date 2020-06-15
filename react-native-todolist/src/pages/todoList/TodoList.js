import React, {useEffect} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import TodoItem from './TodoItem';
import { Container, Content, Card, CardItem, List, ListItem, Left, Body, Right, Text, Icon, Fab } from 'native-base';

const TodoList = (props) => {
  useEffect(() => {
    if(props.route.params.type !== null && props.route.params.type !== undefined){
      props.navigation.setOptions({
        title: props.types.find(item => item.value === props.route.params.type).description
      })
    }
    console.log('TYPE: ', props.route.params.type);
  })

  const handleOpenModal = () => {
    props.openModal();
  }

  const handleUpdateStatus = (id) => {
    props.updateItem(id, props.route.params.type);

    return (
      Alert.alert("Status was changed", "Item is done")
    )
  }

  return (
    <Container>
      <Content>
        {props.todoList.length ? props.todoList.map((item, key) => (
        <Card transparent styles={styles.card} key={key}>
          <CardItem style={styles.cardItems} key={key} button={true}>
          <Left>
            <Text>{item.description}</Text>
          </Left>
          <Right>
            {item.status === 0 ? (
            <Icon type="MaterialIcons" name="cached" onPress={() => handleUpdateStatus(item.id)}/>
            ) : (<Icon type="MaterialIcons" style={styles.icon} name="done"/>)}
          </Right>
          </CardItem>
        </Card>
          )) : <View></View>
        } 
      </Content>
      <View style={{flex: 1}}>
          <Fab
            active={true}
            style={{backgroundColor: '#5067FF'}}
            position="bottomRight"
            onPress={() => handleOpenModal()}
          >
            <Icon type="MaterialIcons" name="add" />
          </Fab>
        </View>
      <View>
        {props.openModal && (
          <TodoItem type={props.route.params.type} openModal={props.openModalState} onSubmit={props.onSubmit} onClose={props.closeModal} onChange={props.onChange} todoItem={props.todoItem} />
        )}
      </View>
    </Container>
  )
}
const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    width: '100%',
    height: '100%',
  },
  card: {
    justifyContent: 'center',
    maxWidth: '100%',
    height: '100%',
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 0
  },
  cardItems: {
    alignItems: 'center',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 0.5,
    maxWidth: '90%',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  icon: {
    color: 'green'
  },
  listItemLeft: {
    marginLeft: 10,
    width: 30,
    height: 30
  }
})

export default TodoList;
