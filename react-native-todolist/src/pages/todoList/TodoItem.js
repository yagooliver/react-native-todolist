import React from 'react';
import {Field, reduxForm} from 'redux-form'
import {  Alert,
  Modal,
  StyleSheet,
  Text,
  View } from 'react-native';  
import InputText from '../../lib/components/InputText';
import { Container, Button, Spinner } from 'native-base';

const TodoItem = (props) => {
  const handleChange = (event, name ) => {
    console.log(event.nativeEvent.text);
    props.onChange({
      ...props.todoItem,
      [name]: event.nativeEvent.text
    })
  }
  const handleClose = () => {
    props.onClose()
  }
  const handleSubmit = () => {
    let item = {
      ...props.todoItem,
      dateItem: new Date().toISOString(),
      type: props.type
    }
    props.onSubmit(item);
    
    return (
      Alert.alert("Item was saved", "Item saved successfully")
    )
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.openModal}
      onDismiss={handleClose}      
      onRequestClose={() => handleClose()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Register new item</Text>
          <Field 
            type="text" 
            name="description" 
            style={styles.text}
            props={{
              onChange: text => handleChange(text, 'description'),
              placeholder: 'description',
              value: props.todoItem.description
            }}
            component={InputText}/>
          <View style={{flex: 1,position: 'relative' ,justifyContent: 'center', alignItems: 'center', marginTop: 20, width: '100%'}}>  
            <Button primary style={styles.button} onPress={handleSubmit}>
              <Text>Save</Text>
            </Button>
            <Button primary style={styles.button} onPress={handleClose}>
              <Text>Close</Text>
            </Button>
          </View> 
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width:  '90%',
    height: 250,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    justifyContent: "center",
    width: '40%',
    opacity: 1,
    marginTop: 10,
    borderRadius: 20,
  },
  text: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    width: '90%',
    borderStyle: 'solid',
    borderWidth: 0.1,
    backgroundColor: 'rgba(255,255, 255, 0.5)',
  },
});

export default reduxForm({
  form: 'TodoItem'
})(TodoItem)