// TextField.js
import './TextField.css';
import FileUploader from './FileUploader/FileUploader';
import { DropzoneOptions } from 'react-dropzone/.';
import { ExcelMimeTypes } from './FileUploader/mimeTypes';
import AutoComplete from './AutoComplete';
import { TextField } from '@mui/material';

const dropzoneOptions: DropzoneOptions = {
    accept: ExcelMimeTypes,
    maxFiles: 5,
}

const options=[
 { name:'Citco',id:'CITCO'},{name:'Citco Bank',id:'CITCOBANK'},{name:'Citco FA',id:'CITCOFA'},{name:'Citco PE',id:'CITCOPE'}
]
    const onSelect=()=>{

    }


const TextField1 =() =>{
//   { 
//   label, 
//   variant,
//   value, 
//   onChange, 
//   placeholder, 
//   type = 'text',
//   error,
//   required 
// }:any) => {
  return (

    <div className="text-field-container">
       <AutoComplete
                            label={'Client Name'}
                            name='client'
                            options={options}
                            disableClearable={true}
                            editable={false}
                            sx={{width:'63%'}}
                            onChange={onSelect}
                        />
      {/* {label && (
        <label className="text-field-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )} */}
      {/* <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`text-field ${error ? 'error' : ''}`}
        required={required}
      />
      {error && <span className="error-message">{error}</span>} */}
      <TextField style={{width:'40%'}} variant='standard' label='Summary'></TextField>
     
      <FileUploader dropzoneOptions={dropzoneOptions} name='files' label='Files'></FileUploader>
    </div>
  );
};

export default TextField1;