import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";

import * as DeviceCalendar from "expo-calendar";
import moment from "moment";
import Input from "../components/Input";
import ColorPalette from "../constants/ColorPalette";
import { useDispatch } from "react-redux";
import PlainText from "../components/PlainText";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE: {
      const updatedInputValues = {
        ...state.inputValues,
        [action.name]: action.value,
      };
      const updatedInputValidities = {
        ...state.inputValidities,
        [action.name]: action.isValid,
      };

      let updatedFormIsValid = true;
      for (const key in updatedInputValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
      }

      return {
        ...state,
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        formIsValid: updatedFormIsValid,
      };
    }
  }
  return state;
};

const CalendarDay = props => {
  const [selectedDays, setSelectedDays] = useState(props.route.params.selectedDays);
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      description: "",
    },
    inputValidities: {
      title: false,
      description: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (hasError) {
      Alert.alert("An error occurred!");
    }
  }, [hasError]);

  async function createCalendar() {
    try {
      const defaultCalendarSource =
        Platform.OS === "ios"
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: "Expo Calendar" };
      const newCalendarID = await DeviceCalendar.createCalendarAsync({
        title: "Expo Calendar",
        color: "blue",
        entityType: DeviceCalendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: "internalCalendarName",
        ownerAccount: "personal",
        accessLevel: DeviceCalendar.CalendarAccessLevel.OWNER,
      });
      console.log(`Your new calendar ID is: ${newCalendarID}`);
    } catch (e) {
      console.log(e);
    }
  }

  const getEvents = async () => {
    const calendarIds = ["078E155E-87F9-4FCD-A374-6B042B3211AA"];
    setIsLoading(true);
    try {
      const events = await DeviceCalendar.getEventsAsync(
        calendarIds,
        new Date("2020-01-01"),
        new Date("2021-01-01")
      );
      setEvents(events);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const createEvent = async (title, notes, date) => {
    const calendarId = "078E155E-87F9-4FCD-A374-6B042B3211AA";
    const options = {
      title,
      startDate: date,
      endDate: date,
      notes,
      timeZone: "Europe/Warsaw",
    };

    try {
      const newEvent = await DeviceCalendar.createEventAsync(calendarId, options);

      console.log(newEvent);
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = useCallback(async () => {
    const { title, description } = formState.inputValues;

    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form", [{ text: "Okay" }]);
      return;
    }
    setHasError(false);
    setIsLoading(true);
    try {
      // temporary adding event for first passed day
      const firstDay = new Date(Object.keys(selectedDays)[0]);
      await createEvent(title, description, firstDay);
      props.navigation.goBack();
      Alert.alert("Event has added to calendar");
    } catch {
      setHasError(true);
    }
    setIsLoading(false);
  }, [dispatch, formState]);

  const inputChangeHandler = useCallback(
    (name, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value,
        isValid,
        name,
      });
    },
    [dispatchFormState]
  );

  const { title, description } = formState.inputValues;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={ColorPalette.green} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <View style={styles.singleEvent}>
              <PlainText textWeight="bold">{item.title}</PlainText>
              <PlainText>{moment(item.startDate).format("D MMM YYYY")}</PlainText>
            </View>
          )}
          horizontal
        />
        <View style={styles.form}>
          <Input
            label="Title"
            name="title"
            value={title}
            errorMessage="Please enter a valid title"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={title}
            initiallyValid={!!title}
            required
          />
          <Input
            label="Description"
            name="description"
            value={description}
            errorMessage="Please enter a valid description"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            autoCapitalize="sentences"
            autoCorrect
            multiline
            // prop works just on android
            numberOfLines={3}
            initialValue={description}
            initiallyValid={!!description}
            required
            minLength={5}
          />
        </View>
        <Button title="Add event" onPress={submitHandler} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  singleEvent: {
    width: 150,
    padding: 20,
    borderWidth: 1,
  },
});

export const CalendarDayNavOptions = navData => ({
  title: navData.route.params.title,
});

export default CalendarDay;
