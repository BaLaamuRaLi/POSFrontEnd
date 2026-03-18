import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';

export default function TableMui({list,selectedIds, setSelectedIds,onInputchange}) {
      

    if(list===null||list.length===0){
        return null;
    }

  

  const columns =useMemo(()=> (list?.length ? Object.keys(list[0]) : []),[list])
  

  const handleSelect = (id) => {
    setSelectedIds((prev) =>{
  
      const newSet = new Set(prev);
      if(newSet.has(id)){
        newSet.delete(id);
      }else{
        newSet.add(id);
      }
        return newSet;
        
  });
    
  };

  return (
    <TableContainer component={Paper} sx={{maxHeight:'100%'}}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedIds?.size === list.length && list.length > 0}
                indeterminate={selectedIds?.size > 0 && selectedIds?.size < list.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(new Set (list.map((row) => row[columns[0]])));
                  } else {
                    setSelectedIds(new Set());
                  }
                }}
              />
            </TableCell>
            {columns.map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((row,index) => (
            <Row key={row[columns[0]]} row={row} selected={selectedIds.has(row[columns[0]])} 
              onSelect={handleSelect} columns={columns}  whenInputchange={onInputchange} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const Row=React.memo(({row,selected,onSelect,columns,whenInputchange})=>{
  return (

            <TableRow  selected={selected}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected}
                  onChange={() => onSelect(row[columns[0]])}
                />
              </TableCell>
             {
                columns.map((key)=>(
                  key==="Qty" || key==="Profit"
                  ?
                  <TableCell key={key}>
                    <div style={{ display: "flex", alignItems: "center", height:"100%" }}>
                      <input type="text" placeholder="0.00"
                      style={{background:"none",width:"4rem"}}
                      onChange={(e)=>whenInputchange(e,row)} />
                    </div>
                  </TableCell>
                  :
                    (<TableCell key={key}>{row[key]}</TableCell>)
                  
                ))
             }

            </TableRow>
          )
  
})

/* {headers.map((key) => (
                   key==="Qty" || key==="Profit"
                   ?
                   (
                   <td key={key} >
                     <input type="text" placeholder="0.00"
                     style={{background:"none",width:"4rem"}}/>                
                   </td>
                  )
                   :
                   (<td key={key}>{item[key]}</td>)
                  ))} */