import { useState } from "react";

import { Q } from './q.js';
import { O, isInH2 } from './space.js';
import { L } from './body.js';
import { Dynam, Syllab } from './dynam.js';

const tabs = { Q, O, L,
    M: Dynam, S: Syllab,
    "⚙": Options,
};

const tooltips = {
    Q: "Configuración de los dedos",
    O: "Orientación de la mano",
    L: "Lugar de articulación",
    M: "Movimiento",
    S: "Sílaba"
};

const endSegment = /:|.(?= )/;

export function Signotator ({ inputRef, updateVal }) {
    const [options, setOptions] = useOptions();
    const [tab, setTab] = useState("Q");
    const Component = tabs[tab];
    const setCursor = pos => {
        const ip = inputRef.current;
        ip.setSelectionRange(pos, pos);
        setTimeout(() => ip.setSelectionRange(pos, pos), 0);
    };
    const clickTab = tab => { // If we change segment and inside a H2 bracket, move cursor too
        setTab(tab);
        if (!"MS".includes(tab)) return;
        const ip = inputRef.current;
        const start = ip.selectionStart;
        const end = ip.selectionEnd;
        if (start != end) return;
        const before = ip.value.slice(0, start);
        const after = ip.value.slice(end);
        if (!isInH2(before, after)) return;
        const endseg = after.search(endSegment);
        setCursor(before.length+(endseg>=0?endseg+1:after.length));
    };
    const appendSN = (SN, nextTab) => {
        const ip = inputRef.current;
        const start = ip.selectionStart;
        const end = ip.selectionEnd;
        let before = ip.value.slice(0, start);
        let after = ip.value.slice(end);
        if (SN.length > 0 && before.length > 0 && !":[ ".includes(before[before.length-1])) {
            before = before + ":";
        }
        if (SN.length > 0 && after.length > 0 && !":] ".includes(after[0])) {
            after = ":" + after;
        }
        if (typeof SN == "function") {
            [before, after, nextTab] = SN(before, after);
        } else {
            before = before + SN;
        }
        updateVal(before+after);
        setTab(nextTab);
        if (isInH2(before, after) && "MS".includes(nextTab)) {
            const endseg = after.search(endSegment);
            setCursor(before.length+(endseg>=0?endseg+1:after.length));
        } else {
            setCursor(before.length);
        }
    };
    return <div className="Signotator" onClick={e => {
        e.preventDefault(); e.stopPropagation();
        }} >
        <nav>{Object.keys(tabs).map(seg=> <button key={seg}
                title={tooltips[seg]}
                disabled={tab==seg} onClick={() => clickTab(seg)}>
            {seg}</button>)}</nav>
        <Component done={appendSN} options={options} setOptions={setOptions} />
    </div>;
}

function Options ({ options, setOptions }) {

    function set(pref, val) { setOptions({ ...options, [pref]: val }); }

    function Radio({ text, pref, val }) {
        return <label onClick={() => set(pref, val)}>
            <input type="radio" name={pref} value={val} onChange={e => set(pref, e.target.value)}
                checked={options[pref]==val} /> {text}</label>;
    }

    return <div><table><tbody>
        <tr>
            <th className="py-3">Perspectiva:</th>
            <td><Radio pref="perspective" text="Observador" val="obs" /></td>
            <td><Radio pref="perspective" text="Signante" val="sign" /></td>
        </tr>
        <tr>
            <th className="py-3">Signante:</th>
            <td><Radio pref="dominant" text="Diestro" val="right" /></td>
            <td><Radio pref="dominant" text="Zurdo" val="left" /></td>
        </tr>
    </tbody></table></div>;
}

const DEF_OPTIONS = {
    perspective: "sign",
    dominant: "right"
};

const OPTS_KEY = "signotator-opts";

function useOptions() {
    let stored;
    try {
        stored = JSON.parse(localStorage.getItem(OPTS_KEY));
    } catch {}
    stored = { ...DEF_OPTIONS, ...stored };
    const [ val, set ] = useState(stored);
    return [ val, new_val => {
        localStorage.setItem(OPTS_KEY, JSON.stringify(new_val));
        set(new_val);
    }];
}

