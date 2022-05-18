import React, {useState, useEffect} from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import _ from 'lodash';

export default function Chart({link}) {

    const [trainings, setTrainings] = useState([]);

    useEffect(()=> {
    function fetchData(){
        fetch(link)
        .then(response=>response.json())
        .then(data=>setTrainings(data.content))
        .catch(err=>console.log(err))
    }
    fetchData();   
    } , []); // eslint-disable-line react-hooks/exhaustive-deps

    
    const chartData = trainings.map((training) => {
        return {
            name: training.activity,
            mins: parseInt(training.duration)
        }
    })

    const data = _(chartData)
    .groupBy('name')
    .map((activity, id)=> ({
        name: id,
        mins: _.sumBy(activity, 'mins')

    }))
    .value()

                                        // RENDERING

return (
    <div>
    <h1>STATS</h1>

    <BarChart width={1200} height={500} data={data}   style={{ margin: 'auto' }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <Bar dataKey="mins" fill="#00394e" />
    </BarChart>
    </div>
  );
}