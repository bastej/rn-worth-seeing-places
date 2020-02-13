import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform } from "react-native";

import * as DeviceCalendar from "expo-calendar";

import omit from "lodash/omit";
import pickBy from "lodash/pickBy";
import keys from "lodash/keys";
import isEmpty from "lodash/isEmpty";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import { CalendarList, Calendar, Agenda, LocaleConfig } from "react-native-calendars";
import moment from "moment";

LocaleConfig.locales["pl"] = {
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: [
    "Sty.",
    "Lut.",
    "Mar.",
    "Kw.",
    "Maj",
    "Czer.",
    "Lip.",
    "Sier.",
    "Wrz.",
    "Paź.",
    "Lis.",
    "Gru.",
  ],
  dayNames: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
  dayNamesShort: ["Pn.", "Wt.", "Śr.", "Czw.", "Pt.", "Sb.", "Nd."],
  today: "Dzisiaj",
};
LocaleConfig.defaultLocale = "pl";

const CalendarScreen = props => {
  const [markedDays, setMarkedDays] = useState({});

  useEffect(() => {
    (async () => {
      const { status } = await DeviceCalendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await DeviceCalendar.getCalendarsAsync();
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        if (isEmpty(markedDays)) return;

        const markedDaysKeys = Object.keys(markedDays);
        const day = moment(markedDaysKeys[0]);
        let title = day.format("D MMM YYYY");

        if (markedDaysKeys.length > 1) {
          const lastDay = moment(markedDaysKeys[markedDaysKeys.length - 1]);
          title = `${day.format("D")} - ${lastDay.format("D MMM YYYY")}`;
        }

        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Add Event"
              iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
              onPress={() =>
                props.navigation.navigate("CalendarDay", {
                  selectedDays: markedDays,
                  title,
                })
              }
            />
          </HeaderButtons>
        );
      },
    });
  }, [markedDays]);

  // endDateString - required when selecting period
  const usePrevAndNextDay = (dateString, endDateString) => {
    const prevDayDateString = moment(dateString)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    let prevDayDateObj = markedDays[prevDayDateString];

    const nextDayDateString = moment(endDateString || dateString)
      .add(1, "days")
      .format("YYYY-MM-DD");
    let nextDayDateObj = markedDays[nextDayDateString];

    return [prevDayDateObj, prevDayDateString, nextDayDateObj, nextDayDateString];
  };

  const selectDay = dateString => {
    const [prevDay, prevDayString, nextDay, nextDayString] = usePrevAndNextDay(dateString);

    let currDay = markedDays[dateString];

    currDay = {
      startingDay: true,
      selected: true,
      endingDay: true,
      color: "lightblue",
    };
    if (prevDay) {
      prevDay.endingDay = false;
      currDay.startingDay = false;
    }
    if (nextDay) {
      nextDay.startingDay = false;
      currDay.endingDay = false;
    }

    const editedDays = {
      [prevDayString]: prevDay,
      [dateString]: currDay,
      [nextDayString]: nextDay,
    };
    const daysToUpdate = pickBy(editedDays, day => !!day);

    return daysToUpdate;
  };

  const unselectDay = dateString => {
    const [prevDay, prevDayString, nextDay, nextDayString] = usePrevAndNextDay(dateString);

    const currentMarkedDays = omit(markedDays, dateString);

    if (prevDay) {
      prevDay.endingDay = true;
    }
    if (nextDay) {
      nextDay.startingDay = true;
    }

    const editedDays = {
      ...currentMarkedDays,
      [prevDayString]: prevDay,
      [nextDayString]: nextDay,
    };
    const daysToUpdate = pickBy(editedDays, day => !!day);

    return daysToUpdate;
  };

  const trySelectPeriod = dateString => {
    // fetching last and before current picked date
    let lastSelectedDayString = keys(markedDays)
      .filter(date => moment(date).isBefore(moment(dateString)))
      .sort()
      .pop();
    // period selecting will work just if there is more than 1 day to select, otherwise simple press will enought to select
    if (
      moment(lastSelectedDayString)
        .add(1, "days")
        .isSame(moment(dateString))
    )
      return;
    const [
      dayBeforePeriodStart,
      dayBeforePeriodStartString,
      dayAfterPeriodEnd,
      dayAfterPeriodEndString,
    ] = usePrevAndNextDay(lastSelectedDayString, dateString);
    const pressedDay = moment(dateString);

    const selectedDaysPeriod = {};

    if (!lastSelectedDayString) return;
    let startDay = moment(lastSelectedDayString);

    while (startDay.isSameOrBefore(pressedDay)) {
      const startDayString = startDay.format("YYYY-MM-DD");
      let day = {
        startingDay: false,
        endingDay: false,
        selected: true,
        color: "lightblue",
      };

      if (startDay.isSame(moment(lastSelectedDayString))) {
        day.startingDay = true;
        selectedDaysPeriod[startDayString] = day;
      } else if (startDay.isSame(pressedDay)) {
        day.endingDay = true;
        selectedDaysPeriod[startDayString] = day;
      } else {
        selectedDaysPeriod[startDayString] = day;
      }

      startDay.add(1, "days");
    }

    if (dayBeforePeriodStart && dayBeforePeriodStart.selected) {
      dayBeforePeriodStart.endingDay = false;
      selectedDaysPeriod[lastSelectedDayString].startingDay = false;
    }

    if (dayAfterPeriodEnd && dayAfterPeriodEnd.selected) {
      dayAfterPeriodEnd.startingDay = false;
      selectedDaysPeriod[dateString].endingDay = false;
    }

    setMarkedDays({
      ...markedDays,
      [dayBeforePeriodStartString]: dayBeforePeriodStart,
      ...selectedDaysPeriod,
      [dayAfterPeriodEndString]: dayAfterPeriodEnd,
    });
  };

  return (
    <View>
      <CalendarList
        pastScrollRange={1}
        futureScrollRange={1}
        onDayPress={({ dateString }) => {
          if (markedDays[dateString]) {
            const daysToUpdate = unselectDay(dateString);

            setMarkedDays(daysToUpdate);
          } else {
            const daysToUpdate = selectDay(dateString);

            setMarkedDays({ ...markedDays, ...daysToUpdate });
          }
        }}
        onDayLongPress={({ dateString }) => trySelectPeriod(dateString)}
        markedDates={markedDays}
        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
        markingType="period"
        theme={{
          calendarBackground: "#333248",
          textSectionTitleColor: "black",
          dayTextColor: "white",
          todayTextColor: "white",
          selectedDayTextColor: "white",
          monthTextColor: "white",
          indicatorColor: "green",
          selectedDayBackgroundColor: "#333248",
          arrowColor: "white",
          "stylesheet.calendar.header": {
            week: {
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
          "stylesheet.day.period": {
            base: {
              overflow: "hidden",
              height: 34,
              alignItems: "center",
              width: 38,
            },
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {},
});

export const CalendarScreenNavOptions = {
  headerTitle: "Calendar tt",
};

export default CalendarScreen;
