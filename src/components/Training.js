import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteButtonRenderer from './DBR';
import EditButtonRenderer from './EBR';
import Button from '@mui/material/Button';

export default function Traininglist(props) {
  const [trainings, setTrainings] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef();

  useEffect(()=> fetchData(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData =() => {
    fetch(props.link)
    .then(response=>response.json())
    .then(data=>setTrainings(data.content))
    .catch(err=>console.log(err))
  }

  const deleteTraining = (link) => {
    if (window.confirm('Are you sure')) {
      fetch(link, {method: 'DELETE'})
      .then(_ => fetchData())
      .catch(err => console.error(err))
    }
  }
  const updateTraining = (training, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })
    .then(res=> fetchData())
    .catch(err=>console.error(err))
  }

  let options = { year: 'numeric', month: 'long', day: 'numeric',  hour: '2-digit', minute:'2-digit', hour12: false };

  const columns = [
    
    {field: 'activity', headerName: 'Sport', sortable: true, filter: true},
    {field: 'date', headerName: 'Date', sortable: true, filter: true, width: 250,
      cellRendererFramework : params => new Date(params.value).toLocaleString([], {options})},
    {field: 'duration', headerName:'Duration', sortable: true, filter: true},
    {field: 'links.0.href', sortable: false, filter: false, 
      cellRenderer: "editButtonRenderer",
      cellRendererParams: {
        update: updateTraining,
        text: "traininglist"
    },
    headerName: "Edit",
  },
    {field: 'links.0.href', sortable: false, filter: false, 
      cellRenderer: "deleteButtonRenderer",
      cellRendererParams: {
        delete: deleteTraining
      },
      headerName: "Delete",
    }
  ]

  function onGridReady(params) {
    setGridApi(params.api);
  }
  const handleQuickFilter = event => {
    gridApi.setQuickFilter(event.target.value);
  };

  const searchStyle = {width:"500px", margin: "15px"}

  const onBtnExport = () => {
    gridApi.exportDataAsCsv();
  };

                                // RENDERING

  return (
    <div className="ag-theme-material" style={{marginTop: 20, height: 650,  margin: 'auto'}}>

        <h1>TRAINING</h1>
        <div >
          <input
            style={searchStyle}
            type="search"
            placeholder="Search"
            onChange={handleQuickFilter}
          />
        </div>
        

      
        <Button style={{margin:7}} color="secondary" size="medium" variant="contained" onClick={() => onBtnExport()}>
        CSV EXPORT
        </Button>

      <AgGridReact
        frameworkComponents={{
          deleteButtonRenderer: DeleteButtonRenderer,
          editButtonRenderer: EditButtonRenderer
        }}
        ref={gridRef}
        onGridReady={onGridReady}
        rowSelection="single"
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  )
}