import React, { useEffect, useState } from 'react';
import {withStyles} from '@material-ui/core/styles';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from 'axios';

const styles = theme => ({
    
});

const YTSearch = (props) => {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect( () => {
        // Axios.get('https://www.googleapis.com/youtube/v3/search?key=AAAA&part=snippet&q='+
        // encodeURIComponent(inputValue)).then(
        //     resp => {
        //         setOptions(resp.data.items);
        //     },
        //     err => {
        //         console.error(err);
        //     }
        // )
    }, [inputValue]);

    return (
        <Autocomplete options={options}
                      getOptionLabel={option => decodeURIComponent(option.snippet.title)}
                      onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setValue(newValue);
                      }}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Search video..." variant="outlined" fullWidth />
                      )}
        />
    );
}

export default withStyles(styles)(YTSearch);
