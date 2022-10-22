import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const CheckDialog = ({visible, setVisible}) => {

  //const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={setVisible}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>Check Tasks</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure you have finished all the selected tasks?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={setVisible}>Yes, finished</Button>
          <Button onPress={setVisible}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
})

export default CheckDialog;