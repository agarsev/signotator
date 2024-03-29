import { useRef } from "react";

import { Signotation } from '..';

export function SignotationInput ({ value, updateVal, inputName="", inputRef }) {
    const hili = useRef();
    return <div className="relative">
        <div ref={hili} className="py-1 px-2 w-full pointer-events-none bg-white rounded whitespace-nowrap overflow-hidden">
            <Signotation sn={value || "\u00A0"} />
        </div>
        <input className="py-1 px-2 w-full font-mono absolute top-0 bg-transparent rounded border border-signotatormain-600 outline-none" type="text"
            style={{color: "transparent", caretColor: "black" }}
            value={value || ""} ref={inputRef} name={inputName}
            onScroll={e => { hili.current.scrollLeft = e.target.scrollLeft; }}
            onChange={e => updateVal(e.target.value)} />
    </div>;
}
