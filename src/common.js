export function Icon ({ path, stroke=1.25, title }) {
    return <svg style={{ width: "100%", padding: 0,
            fill: "none", strokeWidth: stroke,
            strokeLinecap: "round", strokeLinejoin: "round"
        }} viewBox="0 0 32 32">
        {title?<title>{title}</title>:null}
        <path d={path} />
    </svg>;
}

export const TouchButton = (props) => <button {...props}>
    <Icon path="M 9.8659954,3.922198 V 16.100796 M 4.4288279,13.219771 15.402557,6.884086 M 4.425939,6.820169 15.344755,13.12415 M -0.11107846,14.296876 C 7.8334169,17.313842 14.263315,23.552251 16.599534,32.350518 M 11.786148,20.028753 c 5.186495,-0.727003 4.833503,-3.321 4.833503,-3.321 m 14.145723,1.696031 -13.068554,4.993152 c -4.370387,1.66981 -6.16033,-1.484613 -6.311563,-4.812827 l 18.695134,-7.142921 c 0.678746,-0.447867 1.394678,-0.775796 2.108353,-0.976927" title="Hay contacto" />
</button>;
