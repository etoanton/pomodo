import React, { useState, useEffect } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { getTimerMSValues } from '../dateTooklit';
import { Pomodos, Tags, useDataFetching } from '../api';
import Button from '../components/Button';

import TagsPicker from '../components/TagsPicker'

const TaskSuccess = ({ visible, toggleVisibility, timeSpent }) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [isPickerVisible, togglePicker] = useState(false);
  const [tagId, setTagId] = useState(null);

  const { min, sec } = getTimerMSValues(timeSpent);

  const savePomodo = async () => {
    setSaveLoading(true);
    try {
      await Pomodos.savePomodo({ taskNotes: null, tagId, timeSpent });
      toggleVisibility(false);
    } catch (error) {
      console.log('NOTIFICATION: Failed to save pomodo', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const {
    loading: tagsLoading,
    results: { data: tagsData = [] },
  } = useDataFetching(Tags.getTags);

  useEffect(() => {
    if (tagsData.length) {
      const defaultTag = tagsData.find(({ name }) => name.toLowerCase() === 'other').id;
      setTagId(defaultTag);
    }
  }, [tagsData]);

  const tagLabel = tagId ? tagsData.find(({ id }) => id === tagId).name : '';

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={() => toggleVisibility(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Success!</Text>
            <View style={styles.resultsContent}>
              <Text style={styles.resultsText}>{`${min}:${sec} of`}</Text>
              <TouchableOpacity style={styles.tagContainer} onPress={() => togglePicker(true)}>
                {tagsLoading && <ActivityIndicator size="small" color="#F1F1F1" />}
                {!tagsLoading && <Text style={styles.tagLabel}>{tagLabel}</Text>}
              </TouchableOpacity>
            </View>
            <View style={styles.btnsContainer}>
              <View style={styles.btnContainer}>
                <Button
                  label="Save"
                  btnStyles={styles.successBtn}
                  loading={saveLoading}
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

      <TagsPicker
        visible={isPickerVisible}
        value={tagId}
        setValue={setTagId}
        togglePicker={togglePicker}
      />
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
    paddingHorizontal: 30,
    backgroundColor: '#27272E',
    borderRadius: 25,
    width: 300,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  resultsContent: {
    paddingVertical: 24,
  },
  resultsText: {
    fontSize: 18,
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
  btnsContainer: {},
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
    backgroundColor: '#424555',
  },
});

export default TaskSuccess;
