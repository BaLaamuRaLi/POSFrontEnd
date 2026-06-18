
import { Box } from "@mui/material";
import { DataGrid, } from "@mui/x-data-grid";
export default function MTable({rows,columns,EmptyRowMessage,setClickedItems}){

    function onNoRows() {
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
     {EmptyRowMessage}
    </Box>
  );
}
  
    return (
        <Box sx={{height:'100%',width:'100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                slots={{noRowsOverlay:onNoRows}}
                onRowSelectionModelChange={(rowSelections)=>{
                 setClickedItems(rowSelections);
                }}  
            />
        </Box>
    );
}