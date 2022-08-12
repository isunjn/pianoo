import pianoo from "~/core/pianoo";

interface KeymapViewProps {
  shift: boolean;
}

function KeymapView({ shift }: KeymapViewProps) {
  return (
    <div
      className="font-mono rounded p-1.5 bg-th-hover
        grid grid-rows-4 grid-cols-30 gap-1"
    >
      {shift ? (
        <>
          <Key width={2} text="~" />
          <Key width={2} text="!" />
          <Key width={2} text="@" />
          <Key width={2} text="#" />
          <Key width={2} text="$" />
          <Key width={2} text="%" />
          <Key width={2} text="^" />
          <Key width={2} text="&" />
          <Key width={2} text="*" />
          <Key width={2} text="(" />
          <Key width={2} text=")" />
          <Key width={2} text="_" />
          <Key width={2} text="+" />
          <Key width={4} text="BACKSPACE" />
          <Key width={3} text="TAB" />
          <Key width={2} text="Q" />
          <Key width={2} text="W" />
          <Key width={2} text="E" />
          <Key width={2} text="R" />
          <Key width={2} text="T" />
          <Key width={2} text="Y" />
          <Key width={2} text="U" />
          <Key width={2} text="I" />
          <Key width={2} text="O" />
          <Key width={2} text="P" />
          <Key width={2} text="{" />
          <Key width={2} text="}" />
          <Key width={3} text="|" />
          <Key width={4} text="CAPSLOCK" />
          <Key width={2} text="A" />
          <Key width={2} text="S" />
          <Key width={2} text="D" />
          <Key width={2} text="F" />
          <Key width={2} text="G" />
          <Key width={2} text="H" />
          <Key width={2} text="J" />
          <Key width={2} text="K" />
          <Key width={2} text="L" />
          <Key width={2} text=":" />
          <Key width={2} text={'"'} />
          <Key width={4} text="ENTER" />
          <Key width={5} text="SHIFT" />
          <Key width={2} text="Z" />
          <Key width={2} text="X" />
          <Key width={2} text="C" />
          <Key width={2} text="V" />
          <Key width={2} text="B" />
          <Key width={2} text="N" />
          <Key width={2} text="M" />
          <Key width={2} text="<" />
          <Key width={2} text=">" />
          <Key width={2} text="?" />
          <Key width={5} text="SHIFT" />
        </>
      ) : (
        <>
          <Key width={2} text="`" />
          <Key width={2} text="1" />
          <Key width={2} text="2" />
          <Key width={2} text="3" />
          <Key width={2} text="4" />
          <Key width={2} text="5" />
          <Key width={2} text="6" />
          <Key width={2} text="7" />
          <Key width={2} text="8" />
          <Key width={2} text="9" />
          <Key width={2} text="0" />
          <Key width={2} text="-" />
          <Key width={2} text="=" />
          <Key width={4} text="BACKSPACE" />
          <Key width={3} text="TAB" />
          <Key width={2} text="q" />
          <Key width={2} text="w" />
          <Key width={2} text="e" />
          <Key width={2} text="r" />
          <Key width={2} text="t" />
          <Key width={2} text="y" />
          <Key width={2} text="u" />
          <Key width={2} text="i" />
          <Key width={2} text="o" />
          <Key width={2} text="p" />
          <Key width={2} text="[" />
          <Key width={2} text="]" />
          <Key width={3} text="\" />
          <Key width={4} text="CAPSLOCK" />
          <Key width={2} text="a" />
          <Key width={2} text="s" />
          <Key width={2} text="d" />
          <Key width={2} text="f" />
          <Key width={2} text="g" />
          <Key width={2} text="h" />
          <Key width={2} text="j" />
          <Key width={2} text="k" />
          <Key width={2} text="l" />
          <Key width={2} text=";" />
          <Key width={2} text="'" />
          <Key width={4} text="ENTER" />
          <Key width={5} text="SHIFT" />
          <Key width={2} text="z" />
          <Key width={2} text="x" />
          <Key width={2} text="c" />
          <Key width={2} text="v" />
          <Key width={2} text="b" />
          <Key width={2} text="n" />
          <Key width={2} text="m" />
          <Key width={2} text="," />
          <Key width={2} text="." />
          <Key width={2} text="/" />
          <Key width={5} text="SHIFT" />
        </>
      )}
    </div>
  );
}

interface KeyProps {
  width: number;
  text: string;
}

function Key({ width, text }: KeyProps) {
  const note = pianoo.getNote(text);

  function handleClick() {
    if (note) {
      pianoo.playNote(note);
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{ gridColumn: `span ${width} / span ${width}` }}
      className="rounded bg-th-hover h-12 border border-th-hover relative"
    >
      <div className="leading-none absolute top-0.5 left-0.5 text-th-hint">
        {text}
      </div>
      <div className="leading-none absolute bottom-0.5 right-0.5">{note}</div>
    </button>
  );
}

export default KeymapView;
