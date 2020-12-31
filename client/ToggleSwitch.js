import React from 'react';
import { Paper, Switch, FormControlLabel } from '@material-ui/core';

const ToggleSwitch = (props) => {
    const switchProps = {...props};
    if(switchProps['labelIcon']) {
        delete switchProps['labelIcon'];
    }
    if(switchProps['labelText']) {
        delete switchProps['labelText'];
    }
    return (
        <Paper style={{padding: 2}}>
            <FormControlLabel
            label={<div style={{display: 'flex', alignItems: 'center'}}>
                    {props.labelIcon}<span>{props.labelText}</span>
                </div>}
            labelPlacement="start"
            control={
                <Switch {...switchProps} /> 
            }
            />
        </Paper>
    )
}

export default ToggleSwitch;