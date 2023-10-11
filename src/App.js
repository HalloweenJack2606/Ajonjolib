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
    const [showLuminarias, setShowLuminarias] = useState(true);

    useEffect(() => {
        console.log(showLuminarias)
    }, [showLuminarias]);

    return (
        <div className="App">
            <div style={{
                margin: '1rem',
            }}>
                <Select searchable multi options={options} value={myValues} onChange={(data) => setMyValues(data)} showQuantity placeholder={'Grupos'}/>

                <div style={{
                    margin: '1rem'
                }}>
                    <Checkbox label={'default'} value={showLuminarias} onChange={(data) => {setShowLuminarias(data)}}/>
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
