import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableNativeFeedback} from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  list: {
    justifyContent: 'center',
    maxWidth: '100%',
    height: 700,
    borderRadius: 20
  },
  listItems: {
    marginTop: 10,
    margin: 20,
    width:  '90%',
    height: 120,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 19
  },
  listItemLeft: {
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 1,
    maxWidth: 100,
    height: 40,
  },
  listItemRight: {
    marginRight: 20,
    marginTop: 20
  },
  icon: {
    fontSize: 27,
    width: 100,
    height: 40,
    color: 'blue'
  }
})

const TypeList = (props) => {
  useEffect(() => {
    props.createDatabase();
    props.navigation.setOptions({title: 'Reminders'});
  })
  const getIcon = (type) => {
    switch(type){
      case 0: 
        return (
          <Icon style={styles.icon} primary type="MaterialIcons" name="today" 
              onPress={() => handleClick(type)}/>
        )
      case 1:
        return (
          <Icon style={styles.icon} primary type="MaterialIcons" name="work" 
              onPress={() => handleClick(type)}/>
        )
      case 2:
        return (
          <Icon style={styles.icon} primary type="MaterialIcons" name="feedback" 
              onPress={() => handleClick(type)}/>
        )
      case 3: 
        return (
          <Icon style={styles.icon} primary type="MaterialIcons" name="poll" 
            onPress={() => handleClick(type)}/>
        )
    }
  }
  const handleClick = (type) => {
    props.getList(type);
    props.navigation.push("TodoList", {type: type});
  }
  return (
    <Container style={styles.root}>
      <Content>
        <View style={styles.root}>
        <List style={styles.list}>
        {props.types.length ? props.types.map((item, key) => (
          <ListItem  style={styles.listItems} key={key} button={true} onPress={() => handleClick(item.value)}>
          <Left style={styles.listItemLeft}>
            {getIcon(item.value)}
          </Left>
          <Body style={{justifyContent: 'center', marginRight:60, marginBottom: 1, marginTop: 15, marginLeft: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontFamily: 'Arial, Helvetica, sans-serif'}}>{item.description}</Text>
          </Body>
          <Right style={styles.listItemRight}>
            <Icon active name="arrow-forward" />
          </Right>
          </ListItem>
          )) : <ListItem></ListItem>
        } 
        </List>
        </View>
      </Content>
    </Container>
  )
}


export default TypeList;
