import React from 'react';
import { Stack } from '@mui/material';
import SavedItem from './SavedItem';
const SavedItems = () => {
    return (
        <>
           <div className='order-account-header'> 
            <h3>Saved Items (99)</h3>
            </div>
                <Stack spacing={2}>
                    <SavedItem/>
                </Stack>
        </>
    );
}

export default SavedItems;
