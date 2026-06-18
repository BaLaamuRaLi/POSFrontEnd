import { Autocomplete, TextField } from "@mui/material";


export default function({options,label, style,...props}){
    return(
        <div style={style||{width:'50%', padding:'5px',backgroundColor:'white'}}>
            <Autocomplete options={options} freeSolo  disableClearable
            {...props}
            renderInput={(params)=><TextField {...params} label={label} />}
            />
        </div>
    );
}
