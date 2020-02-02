import React, { useState } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { Pomodos } from '../api';
import Button from '../components/Button';

const TaskSuccess = ({ visible, toggleVisibility, timeSpent }) => {
  const [loading, setLoading] = useState(false);

  const savePomodo = async () => {
    setLoading(true)
    try {
      await Pomodos.savePomodo({
        taskNotes: null,
        tagId: null,
        timeSpent,
      });

      toggleVisibility(false);
    } catch (error) {
      console.log('Failed to save pomodo', error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
    >
      <TouchableWithoutFeedback onPress={() => toggleVisibility(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Success!</Text>
            <View style={styles.resultsContent}>
              <Text style={styles.resultsText}>15 minutes of</Text>
              <TouchableOpacity style={styles.tagContainer}>
                <Text style={styles.tagLabel}>Work</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnsContainer}>
              <View style={styles.btnContainer}>
                <Button
                  label="Save"
                  btnStyles={styles.successBtn}
                  loading={loading}
                  onPress={savePomodo}
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  label="Discard"
                  btnStyles={styles.discardBtn}
                  onPress={() => toggleVisibility(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    paddingVertical: 30,
    paddingHorizontal: 50,
    backgroundColor: '#27272E',
    borderRadius: 25,
    width: 250,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  resultsContent: {
    paddingVertical: 20,
  },
  resultsText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  tagContainer: {
    backgroundColor: '#2B2C35',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingVertical: 7,
    marginTop: 8,
  },
  tagLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
  },
  btnsContainer: {

  },
  btnContainer: {
    paddingTop: 10,
  },
  successBtn: {
    borderRadius: 10,
    paddingVertical: 8,
  },
  discardBtn: {
    borderRadius: 10,
    paddingVertical: 8,
    backgroundColor: '#424555'
  },
});  

export default TaskSuccess;
