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

export default function TableMui({list,selectedIds,columns, setSelectedIds,isSingleSelect=false,onClick=null}) { 
    if(!list||list?.length===0){
        return null;
    }

  const handleSelect = (id) => {
    if(isSingleSelect){
      setSelectedIds(prev=>{
        if(prev.has(id)){
          return new Set();
        }
        return new Set().add(id);
      })
      return;
    }
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
      <Table stickyHeader > 
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedIds?.size === list.length && list.length > 0}
                indeterminate={!isSingleSelect&&selectedIds?.size > 0 && selectedIds?.size < list.length}
                onChange={(e) => {
                  if (e.target.checked) { if(isSingleSelect)return;
                    setSelectedIds(new Set (list.map((row) => row[columns[0].field])));
                  } else {
                    setSelectedIds(new Set());
                  }
                }}
              />
            </TableCell>
            <TableCell>SNo</TableCell>
            {columns.map((col) => (
                  <TableCell key={col.field}>{col.header}</TableCell>
                ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((row,index) => (
            <Row key={row[columns[0].field]} SNo={index+1} row={row} selected={selectedIds.has(row[columns[0].field])} 
              onSelect={handleSelect} columns={columns}  onClick={onClick}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const Row=React.memo(({SNo,row,selected,onSelect,columns,onClick})=>{
  return (

            <TableRow  selected={selected} hover>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected}
                  onChange={() => onSelect(row[columns[0].field])}
                />
              </TableCell>
              <TableCell sx={{fontWeight:"500"}} onClick={()=>onClick&&onClick(row)}>{SNo}</TableCell>
             {
                columns.map((col)=>(
                  
                  <TableCell key={col.field} sx={{fontWeight:"500"}} onClick={()=>onClick&&onClick(row)}>
                    {col.render
                    ?
                    col.render(row)
                    :
                    row[col.field]
                    }
                  </TableCell>
                  
                    
                  
                ))
             }

            </TableRow>
          )
  
})

