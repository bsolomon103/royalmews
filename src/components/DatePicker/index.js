import React, { useState } from "react";
import DatePicker from "react-datepicker";
//import Calendar from 'react-calendar'
import "react-datepicker/dist/react-datepicker.css";
import { setHours } from "date-fns";
import "./datepicker.css";

function MyDatePicker({ availableDates, setDateInput }) {
  const [fullDate, setFullDate] = useState(null);
  // e.g 2023-07-01
  const [justDate, setJustDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (value) => {
    let day = value.toLocaleDateString("en-GB").split("T")[0];
    day = day.split("/").reverse().join("-");

    setFullDate(value);
    setJustDate(day);
    setSelectedTime(null);
  };

  const handleTimeChange = (value) => {
    let hour = value.getHours();
    // Modify the time on `fullDate`'s  value. It is 12:00am by default
    const selectedTimeAndDay = setHours(new Date(fullDate), hour);

    setSelectedTime(selectedTimeAndDay);
    setDateInput(selectedTimeAndDay);
  };

  const datesToInclude = () => {
    const dates = availableDates.map((date) => {
      const dateString = date.split("T")[0]; //remove
      return new Date(dateString);
    });

    return dates;
  };

  const availableTimes = () => {
    let groupTimesByDate = availableDates.reduce((acc, dateTime) => {
      let day = dateTime.split("T")[0]; //remove

      if (acc.hasOwnProperty(day)) {
        acc[day].push(new Date(dateTime)); //remove
      } else {
        acc[day] = [new Date(dateTime)]; //remove
      }

      return acc;
    }, {});

    return groupTimesByDate;
  };

  const timesToInclude = availableTimes();

  return (
    <div className="datepicker">
      <DatePicker
        selected={fullDate}
        onChange={handleDateChange}
        placeholderText="Pick a date"
        popperPlacement="top-start"
        dateFormat="yyyy-MM-dd"
        includeDates={datesToInclude()}
      />

      {fullDate ? (
        <DatePicker
          selected={selectedTime}
          onChange={handleTimeChange}
          placeholderText="Pick a time"
          popperPlacement="top-start"
          showTimeSelect
          timeIntervals={60}
          timeCaption="Time"
          showTimeSelectOnly
          dateFormat="h:mm aa"
          includeTimes={timesToInclude[justDate]}
        />
      ) : null}
    </div>
  );
}

export default MyDatePicker;

/*
//const URL = "https://api.eazibots.com/api/response/"
function MyDatePicker({ availableDates }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  

  const filterDates = (date) => {
    const parsedDates = availableDates.map((strDate) => parseISO(strDate));
    // Disable the date if it is not included in the parsedDates array
    const returnDates =  parsedDates.some((availableDate) => isSameDay(date, availableDate));
    return returnDates;
    
  };
  
  
  const filterTimes = (time) => {
    // Filter the available time options based on the selected date
     if (!selectedDate) {
       return true; // Return true if no selected date
  }
    if (selectedDate) {
      const selectedDateString = selectedDate.toISOString().slice(0,10);
      const availableTimes = availableDates
        .filter((date) => date.startsWith(selectedDateString))
        .map((date) => date.slice(11, 16));
      return !availableTimes.includes(time);
    }
    return true;
  };


  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    console.log(selectedDate)
   //const formattedDate = date.toISOString(); 
  };
  
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };


  return (
        <div className='datepicker'>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            filterDate={filterDates}
            placeholderText='Pick a date'
            popperPlacement="top-start"
          />
        {selectedDate && (
        <select value={selectedTime} onChange={handleTimeChange}>
          <option value=''>Pick a time</option>
          {availableDates
            .filter((date) => date.startsWith(selectedDate.toISOString()))
            .map((date) => (
              <option
                key={date}
                value={date.slice(11, 16)}
                disabled={filterTimes(date.slice(11, 16))}
              >
                {date.slice(11, 16)}
              </option>
            ))}
        </select>
      )}
    </div>
   
  );
}

export default MyDatePicker;


/*
 <div className='datepicker'>
      <DatePicker className='datepicker__input'
        selected={selectedDate}
        onChange={handleDateChange}
        filterDate={filterDates}
        placeholderText="Available time slots"
      />
    </div>
    
     {selectedDate && (
        <select value={selectedTime} onChange={handleTimeChange}>
          <option value=''>Select a time</option>
          {availableDates
            .filter((date) => date.start.startsWith(selectedDate.toISOString()))
            .map((date) => (
              <option key={date.start} value={date.start.slice(11, 16)} disabled={filterTimes(date.start.slice(11, 16))}>
                {date.start.slice(11, 16)}
                
              </option>
            ))}
        </select>
      )}
      
      {selectedDate && (
        <select value={selectedTime} onChange={handleTimeChange}>
          <option value=''>Pick a time</option>
          {availableTimes.map((time) => (
            <option
              key={time}
              value={time}
              disabled={filterTimes(time)}
            >
              {time}
            </option>
          ))}
        </select>
      )}
*/
