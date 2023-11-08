import './App.css';
import {useState, useEffect} from "react";
import {
    Select,
    Checkbox,
    SearchBox,
    Text,
    Button,
    Radio
} from './inputs/ajonjolinput';
import {toast, ToastTypes} from "./toasts/toast/toast";
import ToastContainer from "./toasts/toast/toast_container";

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
    const [radioValue, setRadioValue] = useState(null);
    const [textValue, setTextValue] = useState('');
    const [showLuminarias, setShowLuminarias] = useState(true);

    useEffect(() => {
        console.log(myValues)
    }, [myValues]);

    return (
        <div className="App">
            <div>
                <div style={{
                    margin: '1rem',
                }}>
                    <Select multi options={options} value={myValues} onChange={(data) => setMyValues(data)} showQuantity placeholder={'Grupos'}/>
                </div>

                <div style={{
                    margin: '1rem'
                }}>
                    <Checkbox label={'default'} value={showLuminarias} onChange={(data) => {setShowLuminarias(data)}}/>
                    <Checkbox label={'right'} labelPosition={'right'}/>
                    <Checkbox label={'left'} labelPosition={'left'}/>
                    <Checkbox label={'top'} labelPosition={'top'}/>
                    <Checkbox label={'bottom'} labelPosition={'bottom'}/>
                </div>

                <div style={{
                    margin: '1rem'
                }}>
                    <SearchBox onInput={(val) => console.log(val)} placeholder={'placeholder'}/>
                </div>

                <div style={{
                    margin: '1rem'
                }}>
                    <Text value={textValue} onChange={(val) => setTextValue(val)} placeholder={'placeholder'}/>
                </div>

                <div style={{
                    margin: '1rem',
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <Button variant={'primary'} onSubmit={() => console.log(textValue)} name={'Primary'}/>
                    <Button variant={'secondary'} onSubmit={() => console.log(textValue)} name={'Secondary'}/>
                    <Button variant={'success'} onSubmit={() => console.log(textValue)} name={'Success'}/>
                    <Button variant={'danger'} onSubmit={() => console.log(textValue)} name={'Danger'}/>
                    <Button variant={'warning'} onSubmit={() => console.log(textValue)} name={'Warning'}/>
                    <Button variant={'info'} onSubmit={() => console.log(textValue)} name={'Info'}/>
                    <Button variant={'light'} onSubmit={() => console.log(textValue)} name={'Light'}/>
                    <Button variant={'dark'} onSubmit={() => console.log(textValue)} name={'Dark'}/>
                    <Button variant={'link'} onSubmit={() => console.log(textValue)} name={'Link'}/>
                </div>
                <div style={{
                    margin: '1rem'
                }}>
                    <Radio.Group name={'Radio Group 1'} value={radioValue} onChange={(val) => {
                        setRadioValue(val)
                    }}>
                        <Radio.Input value={'one'}/>
                        <Radio.Input value={'two'}/>
                        <Radio.Input value={'three'}/>
                    </Radio.Group>
                </div>

                <ToastContainer/>
                <Button name={'toast'} onSubmit={() => toast("hello", ToastTypes.SUCCESS)}/>
            </div>
        </div>
    );
}

export default App;
