import { useContext } from "react";
import type { SheetItems } from "~/core/types";
import KeymapContext from "~/contexts/keymap";


interface SheetProps {
  sheetItems: SheetItems;
}

function Sheet(props: SheetProps) {
  const keymap = useContext(KeymapContext);

  const { sheetItems } = props;

  return (
    <div id="sheet" className="w-full">
      {
        sheetItems.map((row, i) => (
          <div key={i} className="w-fit mx-auto">
            {row.map((item, j) => {
              const durationClass = "d" + item.quarter * 100;
              switch (item.kind) {
                case "note": return <span key={j} className={durationClass}>{keymap.getKey(item.note)}</span>;
                case "chord": return <span key={j} className={durationClass}>[{item.notes.map(n => keymap.getKey(n)).join('')}]</span>;
                case "rest": return <span key={j} className={durationClass}> </span>;
                default: throw new Error("unknown item kind");
              }
            })}
          </div>
        ))
      }
    </div>
  )
}

export default Sheet;
