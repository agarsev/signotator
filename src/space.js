import { useState } from "react";

import { Icon, TouchButton } from './common.js';

export function isInH2 (before, after) {
    const open = before.lastIndexOf("[");
    if (open < 0) return false;
    if (open < before.lastIndexOf("]")) return false;
    return true;
}

const opposite = {
    F: "B", B: "F",
    X: "Y", Y: "X",
    H: "L", L: "H"
};

export function rotate (dir) {
    if ("HL".includes(dir)) return dir;
    return opposite[dir];
}

export function mirror (dir) {
    if (dir=="Y") return "X";
    if (dir=="X") return "Y";
    return dir;
}

const dirOrder = ["H", "L", "B", "F", "Y", "X"];

export function Direction ({ val, set, options }) {
    const invert = options.perspective == "obs";
    function Arrow({ invariant, dir, path }) {
        if (options.perspective=="obs") {
            dir = rotate(dir);
        }
        const opo = opposite[dir];
        let cn = "Arrow";
        let click = null;
        if (val === null) {
            cn += " disabled";
        } else if (val.includes(dir)) {
            cn += " actual";
            click = () => set(val.filter(d => d!=dir));
        } else if (val.length == 2 || val.includes(opo)) {
            cn += " disabled";
        } else {
            cn += " enabled";
            click = () => set(val.concat([dir]).sort((a, b) => dirOrder.indexOf(a)-dirOrder.indexOf(b)));
        }
        return <path d={path} className={cn} onClick={click} />;
    }
    return <svg className="w-full h-full" viewBox="90 52 62 58">
        <Arrow dir="F" path="m 133.66599,62.189793 -16.63545,6.86199 8.18301,0.0785 -5.84265,8.538184 7.35789,0.07058 5.84265,-8.538184 8.18299,0.0785 z" />
        <Arrow dir="H" invariant={true} path="m 120.15121,52.244762 -9.71724,10.715056 h 6.70347 v 13.114959 h 6.02754 V 62.959818 h 6.70346 z" />
        <Arrow dir="X" path="m 91.006791,81.042921 5.856436,7.820849 3.351733,-5.395239 h 13.11496 l 3.01377,-4.851221 h -13.11496 l 3.35173,-5.395231 z" />
        <Arrow dir="Y" path="m 150.49164,81.125927 -5.85643,-7.820849 -3.35174,5.395239 h -13.11496 l -3.01377,4.851221 h 13.11496 l -3.35173,5.395231 z" />
        <Arrow dir="L" invariant={true} path="m 121.34719,109.92412 9.71724,-10.715056 h -6.70347 V 86.094105 h -6.02754 v 13.114959 h -6.70346 z" />
        <Arrow dir="B" path="m 107.83243,99.97909 16.63545,-6.86199 -8.18301,-0.0785 5.84265,-8.538184 -7.35789,-0.07059 -5.84264,8.538184 -8.183,-0.0785 z" />
    </svg>;
}

export function O ({ done, options }) {
    const [palmar, setPalmar] = useState([]);
    const [distal, setDistal] = useState([]);
    const finish = () => done((before, after) => {
        let res = before;
        const H2 = isInH2(before, after);
        if (palmar.length != 0 || distal.length != 0) {
            let p, d;
            if (H2) {
                p = palmar.map(mirror);
                d = distal.map(mirror);
            } else {
                p = palmar; d = distal;
            }
            res += p.join('')+d.join('').toLowerCase();
        }
        return [res, after, H2?"M":"L"];
    });

    return <div><table>
        <tbody>
            <tr><td className="!pb-8">
                <div className="absolute w-16 h-16 VectorIcon">
                    <Icon path="m 24.755949,16.747314 4.545571,-3.46777 M 13.88524,20.867058 6.8799906,18.393651 M 14.902387,17.10466 6.0241576,11.708799 M 17.123612,14.040864 9.8054266,4.9257448 M 21.267543,12.074273 16.527476,2.2785438 M 15.026485,22.272334 C 14.347126,21.484519 13.88524,20.867058 13.88524,20.867058 l 1.017147,-3.762398 2.221225,-3.063796 4.143931,-1.966591 3.488378,4.673063 c 1.281451,1.673814 1.658492,2.968018 1.293089,3.774043 l -6.61826,5.049003 c -0.698447,0.08244 -1.652766,-0.558177 -2.572882,-1.391222 M 8.809266,29.171943 18.880263,20.737275 M 12.612597,29.537808 8.809266,29.171943 8.772695,25.318277" />
                </div>
            </td><td className="!pb-8">
                <div className="absolute w-16 h-16 VectorIcon">
                    <Icon path="m 25.467249,18.838047 4.663029,-3.308142 M 14.460286,22.578549 7.54497,19.863834 M 15.607223,18.853665 6.9213409,13.153336 M 17.9333,15.868695 10.935432,6.5054103 m 11.20747,7.5414987 -4.39771,-9.9541302 m -3.284906,18.4857702 1.146937,-3.724884 2.326077,-2.98497 4.209602,-1.821786 3.324318,4.791159 c 1.222669,1.717222 1.554628,3.023716 1.161508,3.816593 l -6.789276,4.816588 c -1.869263,0.15518 -5.379166,-4.8927 -5.379166,-4.8927 z M 3.4169722,1.3380864 11.892754,11.374508 M 3.0666639,5.1428829 3.4169722,1.3380864 7.2704565,1.285758" />
                </div>
            </td></tr>
            <tr><td>
                <Direction val={palmar} set={setPalmar} options={options} />
            </td><td>
                <Direction val={distal} set={setDistal} options={options} />
            </td></tr>
            <tr><td colSpan="2" className="text-right"><button className="finish"
                onClick={finish}>✔</button>
            </td></tr>
        </tbody>
    </table></div>;
}
