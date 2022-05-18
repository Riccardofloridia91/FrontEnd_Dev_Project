import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteButtonRenderer from './DBR';
import EditButtonRenderer from './EBR';
import Addcustomer from './ToBeAddedCustomers';
import Addtraining from './ToBeAddedTraining';
import CustomerTrainingsButtonRenderer from './CBR';
import Button from '@mui/material/Button';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef();

  useEffect(()=> fetchData(), []);

  const fetchData =() => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response=>response.json())
    .then(data=>setCustomers(data.content))
    .catch(err=>console.log(err))
  }

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure you want to delete')) {
      fetch(link, {method: 'DELETE'})
      .then(_ => fetchData())
      .catch(err => console.error(err))
    }
  }
  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res=> fetchData())
    .catch(err=>console.error(err))
  }

  const saveCustomer=(customer)=> {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res=> fetchData())
    .catch(err=>console.error(err))
  }

  const saveTraining=(training)=> {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })
    .then(res=> {fetchData()
      if (res.status>=200 && res.status<300) {
        alert(`Training ${training.activity} was added successfully`)
      } else {alert("Something went wrong, please try again")}
    })
    .catch(err=>console.error(err))
  }

  const columns = [
    {field: 'firstname', headerName:'Name', sortable: true, filter: true, width:90},
    {field: 'lastname', headerName:'Surname', sortable: true, filter: true, width:120},
    {field: 'email', headerName:'Mail Adress', sortable: true, filter: true, width:120},
    {field: 'phone', headerName:'Phone number', sortable: true, filter: true, width:140},
    {field: 'streetaddress', headerName:'Street', sortable: true, filter: true, width:160},
    {field: 'postcode', headerName:'Post code', sortable: true, filter: true, width:120},
    {field: 'city', headerName:'City', sortable: true, filter: true, width:100},
    {field: 'links.2.href', sortable: false, filter: false, headerName: "See Training", width:100,
      cellRendererFramework : params => <CustomerTrainingsButtonRenderer link={params.value} />},
    {field: 'links.0.href', sortable: false, filter: false, headerName: "Add Training", width:120,
      cellRendererFramework : params => <Addtraining saveTraining={saveTraining} link={params.value}/>
    },
    {field: 'links.0.href', sortable: false, filter: false, headerName: "Edit", width:80,
      cellRenderer: "editButtonRenderer",
      cellRendererParams: {
        update: updateCustomer,
        text: "customerlist"
      }
    },
    {field: 'links.0.href', sortable: false, filter: false, headerName: "Delete", width:150,
      cellRenderer: "deleteButtonRenderer",
      cellRendererParams: {
        delete: deleteCustomer
      }      
    }
  ]

  const searchStyle = {width:"400px", margin: "15px"}

  function onGridReady(params) {
    setGridApi(params.api);
    // gridApi.sizeColumnsToFit();
  }

  const onBtnExport = () => {
    gridApi.exportDataAsCsv();
  };
  
  const defaultColDef = {
    resizable: true,
  };

  const handleQuickFilter = event => {
    gridApi.setQuickFilter(event.target.value);
  };

                                         // RENDERING

  return (
    <div className="ag-theme-material" style={{marginTop: 40, height: 650, margin: 'auto'}}>
                    <h1 style={{textAlign: 'center', color:'Red'}}>CUSTOMERS</h1>

                    <div >
        <Addcustomer color='secondary' saveCustomer={saveCustomer} />
<Button style={{margin:8}} color='secondary' size="medium" variant="contained" onClick={() => onBtnExport()}>
          CSV Export
        </Button>  
        <input
            style={searchStyle}
            type="search"
            placeholder="Search"
            onChange={handleQuickFilter}
          />
        </div>

        
      
       
        <AgGridReact
          frameworkComponents={{
          deleteButtonRenderer: DeleteButtonRenderer,
          editButtonRenderer: EditButtonRenderer
          }}
          style={{fontweight: 'bold'}}
          ref={gridRef}
          onGridReady={onGridReady}
          rowSelection="single"
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={defaultColDef}
        />


      </div>
    
  )
}