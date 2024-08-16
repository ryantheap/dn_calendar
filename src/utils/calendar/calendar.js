import moment from "moment";
const daysList = [
  {
    id: 1,
    name: "Lundi",
    short_name: "Lun",
  },
  {
    id: 2,
    name: "Mardi",
    short_name: "Mar",
  },
  {
    id: 3,
    name: "Mercredi",
    short_name: "Mer",
  },
  {
    id: 4,
    name: "Jeudi",
    short_name: "Jeu",
  },
  {
    id: 5,
    name: "Vendredi",
    short_name: "Ven",
  },
  {
    id: 6,
    name: "Samedi",
    short_name: "Sam",
  },
  {
    id: 7,
    name: "Dimanche",
    short_name: "Dim",
  },
];
const { getDatesRange } = require("./ranges/datesRange");

const getDatesSlots = (date, showType) => {
  const range = getDatesRange(date, showType);

  // Créer des objets Moment à partir des dates de début et de fin
  const startDate = moment(range.start, "DD/MM/YYYY");
  const endDate = moment(range.end, "DD/MM/YYYY");

  // Initialiser le tableau pour stocker les dates
  const datesInRange = [];

  // Ajouter chaque date au tableau
  let currentDate = startDate.clone();
  while (currentDate <= endDate) {
    datesInRange.push(currentDate.format("DD/MM/YYYY"));
    currentDate.add(1, "days");
  }

  return datesInRange;
};

const getTimesSlots = (timeInterval, timeRange) => {
  const start = moment(timeRange.start, "HH:mm");
  const end = moment(timeRange.end, "HH:mm");
  const timeSlots = [];
  while (start <= end) {
    timeSlots.push(start.format("HH:mm"));
    start.add(timeInterval, "minutes");
  }
  return timeSlots;
};

const getDayDetails = (date) => {
  const chosenDate = moment(date, "DD/MM/YYYY");
  const dayOfWeek = chosenDate.isoWeekday();
  return daysList[dayOfWeek - 1];
};

const dateCalc = (date, showType, num) => {
  const currentDate = moment(date, "DD/MM/YYYY");
  const newDate = currentDate.add(num, `${showType}s`).format("DD/MM/YYYY");
  return newDate;
};

const findEvents = (datesRange, eventsList) => {
  const slotStart = moment(
    `${datesRange.date} ${datesRange.start}`,
    "DD/MM/YYYY HH:mm"
  );
  const slotEnd = moment(
    `${datesRange.date} ${datesRange.end}`,
    "DD/MM/YYYY HH:mm"
  );

  const result = eventsList.filter((event) =>
    moment(event.start, "YYYY-MM-DD HH:mm:ss").isBetween(
      slotStart,
      slotEnd,
      null,
      "[)"
    )
  );

  return result;
};

const constructCalendar = (
  date,
  showType,
  timeInterval,
  timeRange,
  eventsList
) => {
  // Récupération de la liste des slot date
  let datesList = getDatesSlots(date, showType);
  datesList = datesList.map((date) => {
    return {
      date: date,
      ...getDayDetails(date),
    };
  });

  // Récupération de la liste des slots times
  let timesList = getTimesSlots(timeInterval, timeRange);

  // Création des cases
  timesList = timesList.map((time) => {
    return {
      time,
      elements: datesList,
    };
  });

  // Intégration des éléments dans les cases
  timesList = timesList.map((time) => {
    return {
      ...time,
      elements: time.elements.map((element) => {
        const events = findEvents(
          {
            date: element.date,
            start: time.time,
            end: moment(time.time, "HH:mm")
              .add(timeInterval, "minutes")
              .format("HH:mm"),
          },
          eventsList
        );
        return {
          ...element,
          events: events,
        };
      }),
    };
  });

  return {
    datesList,
    timesList,
  };
};

export { constructCalendar, dateCalc };
