import { Signotator } from '..';
import { createRoot } from "react-dom/client";

const textbox = document.getElementById("textbox");

function TestApp () {
    return <Signotator 
        inputRef={{current: textbox}}
        updateVal={val => { textbox.value = val; }}
    />;
}

createRoot(document.getElementById("signotator")).render(<TestApp />);
