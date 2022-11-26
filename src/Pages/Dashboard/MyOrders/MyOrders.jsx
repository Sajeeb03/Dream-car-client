import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';

const MyOrders = () => {
    const [selected, setSelected] = useState(new Date());
    const [open, setOpen] = useState(false)
    const date = new Date();
    return (
        <div>
            <button onClick={(() => setOpen(!open))} className="btn btn-primary">Open</button>
            {
                open && <div onClick={() => setOpen(false)}>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>
            }
            <p>{format(date, "PP")}</p>
            <p>{format(selected, "PP")}</p>
        </div>
    );
};

export default MyOrders;