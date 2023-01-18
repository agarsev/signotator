import { createRoot } from "react-dom/client";
import { useRef, useState } from "react";

import { Signotator, SignotationInput } from '..';

function TestApp () {
    const [signot, setSignot] = useState("");
    const ipRef = useRef();
    return <>
        <SignotationInput inputRef={ipRef} value={signot} updateVal={setSignot} />
        <Signotator inputRef={ipRef} updateVal={setSignot} />
    </>;
}

createRoot(document.getElementById("signotator")).render(<TestApp />);
