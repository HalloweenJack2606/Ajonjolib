import './App.css';
import {useState, useEffect} from "react";
import { Select, Checkbox } from './inputs/ajonjolinput';

function App() {
    const options = [
        {name: "Option 1", value: 1},
        {name: "Option 2", value: 2},
        {name: "Option 3", value: 3},
        {name: "Option 4", value: 4},
        {name: "Option 5", value: 5},
        {name: "Option 6", value: 6},
        {name: "Option 7", value: 7},
    ];

    const [myValues, setMyValues] = useState([]);

    useEffect(() => {
        console.log(myValues)
    }, [myValues]);

    return (
        <div className="App">
            <div style={{
                margin: '1rem',
            }}>
                <Select searchable multi value={myValues} options={options} onChange={(data) => setMyValues(data)}></Select>

                <div style={{
                    margin: '1rem'
                }}>
                    <Checkbox label={'default'}/>
                    <Checkbox label={'right'} labelPosition={'right'}/>
                    <Checkbox label={'left'} labelPosition={'left'}/>
                    <Checkbox label={'top'} labelPosition={'top'}/>
                    <Checkbox label={'bottom'} labelPosition={'bottom'}/>
                </div>
            </div>
        </div>
    );
}

export default App;
