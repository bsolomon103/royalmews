import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
//import Calendar from 'react-calendar'
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO, isSameDay } from 'date-fns';
import './datepicker.css';


function MyDatePicker({ availableDates }) {
  console.log(availableDates[0])
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const filterDate = (date) => {
    const dateString = date.toISOString().slice(0, 10);
    //console.log(availableDates[0])
    const matchedDates = availableDates.some((availableDate) => availableDate.startsWith(dateString));
    return matchedDates
  };

  const filterTime = (time) => {
    if (!selectedDate) {
      return false; // Show all times if no date is selected
    }

    const selectedDateString = selectedDate.toISOString().slice(0, 10);
    //console.log(selectedDateString)
    const availableTimesForDate = availableDates
      .filter((date) => {
        date.startsWith(selectedDateString)
        //console.log(date)
      }
        )
      
      .map((date) => date.slice(11, 16));
    //console.log(availableTimesForDate)
    return !availableTimesForDate.includes(time);
  };

  return (
    <div className='datepicker'>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText='Pick a date'
        popperPlacement='top-start'
        dateFormat="yyyy-MM-dd"
        showTimeSelect
        timeIntervals={15}
        timeCaption="Time"
        filterDate={filterDate}
        filterTime={filterTime}
      />
      {selectedDate && (
        <select value={selectedTime} onChange={handleTimeChange}>
          <option value=''>Pick a time</option>
          {availableDates
            .filter((date) => date.startsWith(selectedDate.toISOString().slice(0, 10)))
            .map((date) => (
              <option key={date} value={date.slice(11, 16)}>
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
