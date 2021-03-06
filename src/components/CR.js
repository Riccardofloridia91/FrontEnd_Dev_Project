import React, {useState, useEffect,} from 'react';
// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    console.log(cellValue)
    const [customer, setCustomer] = useState();
    useEffect(()=> fetchData(), []);
    const fetchData =() => {
        fetch(cellValue)
        .then(response=>response.json())
        .then(data=>setCustomer(data.firstname + data.lastname))
        .catch(err=>console.log(err))
      }
      
    return (
        <span>
            {customer}
        </span>
    )

}
