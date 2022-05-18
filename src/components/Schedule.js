
import React, {useEffect, useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function CalendarPage({link}) {
    const [trainings, setTrainings] = useState([]);

    
    useEffect(()=> {
        const fetchData =() => {
            fetch(link)
            .then(response=>response.json())
            .then(data=>setTrainings(data.content))
            .catch(err=>console.log(err));
        };
        fetchData();
     }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
        

    const allEvents = trainings.map((training) => {
        return {
            title: training.activity,
            start: new Date(training.date),
            end: moment(training.date).add(parseInt(training.duration), 'm').toDate()
        }
    })

                            // RENDERING

    return (
        <div>
        <h1>SCHEDULE</h1>

        <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400, width: 'auto'}}
        />
        </div>
    )


}
