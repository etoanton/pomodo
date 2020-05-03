import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import persistTimer from '../../state/Timer/persist';
import { Pomodos } from '../../api';
import { TimerContext } from '../../state/Timer';
import { TextInput, Button } from '../../components';
import { MAIN_BACKGROUND_COLOR } from '../../styles/colors';

const SessionComplete = ({ navigation }) => {
  const [notesValue, onChangeText] = React.useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const { timerState, resetTimer } = useContext(TimerContext);

  const handleSaveSession = async () => {
    const focusSessions = timerState.list.filter(item => item.label === 'Focus');

    const payload = {
      sessionDurations: focusSessions.map(s => s.timeCompleted),
      startedAt: timerState.startedAt,
      finishedAt: timerState.finishedAt,
      sessionNotes: notesValue,
      tagId: null,
    };

    setSaveLoading(true);
    try {
      await Pomodos.savePomodo(payload);
      persistTimer.clearPersisted();
      resetTimer();
      navigation.popToTop();
    } catch (error) {
      console.log('Error occured while trying to save completed session', error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView style={styles.screenContentContainer} behavior="position" enabled>
        <View style={styles.contentContainer}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>Success!</Text>
          </View>
          <View style={styles.textAreaContainer}>
            <TextInput
              value={notesValue}
              onChangeText={onChangeText}
              autoFocus
              placeholder="Notes"
              multiline
              numberOfLines={4}
              style={{ height: 300, paddingTop: 20 }}
            />
          </View>
        </View>
        <View style={styles.actionListContainer}>
          <View style={styles.actionContainer}>
            <Button label="Save" loading={saveLoading} onPress={handleSaveSession} />
          </View>
          <View style={styles.actionContainer}>
            <Button label="Discard" onPress={() => navigation.navigate('Home')} btnStyles={styles.cancelBtn} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND_COLOR,
  },
  screenContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleTextContainer: {
    paddingTop: 20,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 36,
  },
  textAreaContainer: {
    marginTop: 15,
  },
  actionListContainer: {},
  actionContainer: {
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#2F2F38',
  },
});

SessionComplete.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SessionComplete;
