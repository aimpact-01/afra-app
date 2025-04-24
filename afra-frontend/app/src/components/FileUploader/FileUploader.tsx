import { DropzoneOptions, useDropzone, FileRejection } from 'react-dropzone'
import { Grid, Typography,Box, Chip, FormHelperText, Input, FormControl, FormLabel } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useField } from 'formik'
import { alignProperty } from '@mui/material/styles/cssUtils'

const DropContainer = styled(Box)(({theme}) => ({
    '&': {
        border: '2px dashed #ccc',
        padding: '10px',
        backgroundColor: '#EAEEF1',
        maxHeight:'100px',
        maxWidth:'550px',
        alignProperty:'center'
        // cursor: 'pointer',
    }
}))

interface FileUploaderProps{
    dropzoneOptions: DropzoneOptions,
    name: string
    label: string
}

function Errors ({ fileRejections }: { fileRejections: FileRejection[] }) {
    return (
        <>
        {
            fileRejections && fileRejections.map(({file: { name }, errors} , index) => {
                return (
                <FormHelperText key={name} error={true} >{`${index + 1}. ${name} : `}
                     { errors.map(({ message }, i) => { return <li key={i}>{ message }</li>}) }
                </FormHelperText>)
            })
        }
        </>
    )
}

// TO-DO : Stack files on multiple onDrop events. currently previous files are discarded on next drop.
function FileUploader({ dropzoneOptions, name, label } : FileUploaderProps) {
    const [field, meta, helper] = useField(name)
    const { name: fieldName, onBlur, onChange } = field;

    const onDrop =(acceptedFiles:any,fileRejections:any,event:any)=>{
        // helper.setTouched(true)
        helper.setValue(acceptedFiles)
        // if(dropzoneOptions.onDrop){
        //     dropzoneOptions.onDrop(acceptedFiles, fileRejections,event)
        // }
        
    }
    const onDelete = (index: number) => {
        const files = field.value.filter((_: File,fileIndex: number) => fileIndex !== index)
        helper.setValue(files);
    }
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
        })

    // const { getRootProps, getInputProps, fileRejections } = useDropzone({...dropzoneOptions,
    //     onDrop,
    //     onFileDialogOpen() {
          
    //     },
    //     onFileDialogCancel() {
    //         helper.setTouched(true)
    //     },
       
    // })
    return(
        <FormControl variant='standard' fullWidth={true}>
            <FormLabel style={{padding:'10px 0'}}>{label}</FormLabel>
            <DropContainer {...getRootProps()}>
                <Input  {...getInputProps({ name: fieldName, onChange, onBlur })}></Input>
                <Grid container spacing={1}>
                    { 
                        field.value?.map((file:File, index: number) =>{
                            return <Grid key={file.name}><Chip label={file.name} onDelete={()=> onDelete(index)}/></Grid>
                        })
                    }
                </Grid>
                {!field.value?.length && <Typography align='center' padding={'30px'}>Drag & Drop the kickout files here </Typography>}
               
                
            </DropContainer>
         
            {/* {!fileRejections.length && meta.touched && meta.error && <FormHelperText error={true} >{meta.error}</FormHelperText>} */}
            {/* {field.value?.length > 0 && fileRejections && <Errors fileRejections={fileRejections} />} */}
        </FormControl>
    )

}

export default FileUploader



