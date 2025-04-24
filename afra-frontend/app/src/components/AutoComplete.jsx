import { TextField as MUITextField, Autocomplete as MUIAutoComplete } from '@mui/material';

const AutoComplete = ({options, disableClearable = false, ...otherProps}) => {  

    const configTextfield = {
        type: 'text',
        variant: 'standard',
        style: {verticalAlign: 'middle'},
        InputLabelProps: { shrink: true },
        inputProps: { spellCheck: false },
        ...otherProps,
    }

    return (
        <MUIAutoComplete 
            options={options}
            getOptionLabel={(option) => option.name}
            style={otherProps.style}
            isOptionEqualToValue={(option, value) => option.id === value?.id }
            disableClearable={disableClearable}
            renderInput={(params) => <MUITextField {...configTextfield} {...params} />}
            {...otherProps}
        />
    );
}

export default AutoComplete;