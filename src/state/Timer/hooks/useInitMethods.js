import { useCallback } from 'react';

import persistTimer from '../persist';
import { ACTIONS } from '../constants';

function useInitMethods({ dispatch, timerId, setTimerId }) {
  const startTimer = useCallback(config => {
    // TODO: Check if not started
    dispatch({ type: ACTIONS.START_TIMER, payload: config });
  }, [dispatch]);

  const pauseTimer = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE_TIMER });
  }, [dispatch]);

  const resumeTimer = useCallback(() => {
    dispatch({ type: ACTIONS.RESUME_TIMER });
  }, [dispatch]);

  const completeTimer = useCallback(() => {
    setTimerId(null);
    dispatch({ type: ACTIONS.COMPLETE_TIMER });
  }, [dispatch, setTimerId]);

  const resetTimer = useCallback(({ clearPersisted }) => {
    if (clearPersisted) persistTimer.clearPersisted();
    clearInterval(timerId);
    setTimerId(null);

    dispatch({ type: ACTIONS.RESEST_TIMER });
  }, [dispatch, timerId, setTimerId]);

  const calculateNextTickState = useCallback(() => {
    dispatch({ type: ACTIONS.NEXT_TICK_TIMER });
  }, [dispatch]);

  const restoreTimer = useCallback(persistedState => {
    dispatch({ type: ACTIONS.RESTORE_TIMER, payload: persistedState });
  }, [dispatch]);

  const skipCurrentStep = useCallback(() => {
    dispatch({ type: ACTIONS.SKIP_CURRENT_STEP });
  }, [dispatch]);

  return {
    startTimer,
    pauseTimer,
    resumeTimer,
    completeTimer,
    resetTimer,
    calculateNextTickState,
    restoreTimer,
    skipCurrentStep,
  };
}

export default useInitMethods;
