import React, { forwardRef, useImperativeHandle, useRef, type Ref } from "react";
import type { SheetItems } from "~/core/player";
import panic from "~/utils/panic";

export interface SheetImperativeHandleAPI {
  start: (firstNonRest: number) => void;
  move: (correct: boolean, idx: number, nextIdx: number) => void;
  reset: () => void;
}

interface SheetProps {
  sheetItems: SheetItems;
}

const Sheet = forwardRef(function Sheet(
  { sheetItems }: SheetProps, ref: Ref<SheetImperativeHandleAPI>
) {
  const spans = useRef<HTMLSpanElement[]>([]);

  useImperativeHandle(ref, () => {
    return {
      // start playing from the first note/chord
      start(firstNonRest: number) {
        const span = spans.current[firstNonRest];
        span.classList.add("active");
        scroll(span);
      },
      // move to next note/chord
      move(correct: boolean, idx: number, nextIdx: number) {
        const span = spans.current[idx];
        span.classList.remove("active");
        span.classList.add(correct ? "correct" : "incorrect");
        const nextSpan = spans.current[nextIdx];
        if (nextSpan) {
          nextSpan.classList.add("active");
          scroll(nextSpan);
        }
      },
      // reset, clear all notes/chords colored
      reset() {
        spans.current.forEach(span => {
          span.classList.remove("active");
          span.classList.remove("correct");
          span.classList.remove("incorrect");
        });
        scroll(spans.current[0]);
      },
    };
  });

  function itemRefCallback(span: HTMLSpanElement | null) {
    if (span) {
      spans.current.push(span);
    } else {
      spans.current.pop();
    }
  }

  return (
    <div id="sheet" className="w-full py-10">
      {
        sheetItems.map((row, i) => (
          <div key={i} className="w-fit mx-auto h-10 flex items-center">
            {row.map((item, j) => {
              // rythm is visualized by the spacing
              // 1/16 note is handled specially to avoid too much overlapping
              const mr = item.quarter == 0.25 ? -0.6 : (item.quarter * 3 - 1.5);
              const style = { marginRight: `${mr}ch` };
              switch (item.kind) {
                case "note":
                  return (
                    <span key={j} style={style} ref={itemRefCallback}>
                      {item.key}
                    </span>
                  );
                case "chord":
                  return (
                    <span key={j} style={style}>
                      [<span ref={itemRefCallback}>
                        {item.keys.join("")}
                      </span>]
                    </span>
                  );
                case "rest": // &nbsp; is exactly what we want
                  return (
                    <span key={j} style={style} ref={itemRefCallback}>
                      &nbsp;
                    </span>
                  );
                default:
                  throw panic("unreachable");
              }
            })}
          </div>
        ))
      }
    </div>
  );
});

// build the scroll function based on browser support of scrollIntoViewOptions
const scroll = "scrollBehavior" in document.documentElement.style
  ? (el: HTMLElement) => el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
  : (el: HTMLElement) => el.scrollIntoView(true); // fallback

export default React.memo(Sheet);
