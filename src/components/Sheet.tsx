import React, { useContext, forwardRef, useImperativeHandle, type Ref } from "react";
import KeymapContext from "~/contexts/keymap";
import type { SheetItems, NoteOrChord, ExpectedKey } from "~/core/types";
import panic from "~/utils/panic";

export interface SheetImperativeHandleAPI {
  start: () => ExpectedKey;
  move: (correct: boolean) => { done: false, next: ExpectedKey } | { done: true, next: null };
  reset: () => void;
}

interface SheetProps {
  sheetItems: SheetItems;
}

const Sheet = forwardRef(
  function Sheet(
    { sheetItems }: SheetProps,
    ref: Ref<SheetImperativeHandleAPI>
  ) {
    const keymap = useContext(KeymapContext);
    
    /* Sheet component only render once, it's UI is updated imperativly */
    /* Here we use local variable from first render to store state that used in imperative code */

    // the sequence of note/chord to play
    const seq: NoteOrChord[] = sheetItems.flat().filter(item => item.kind != "rest") as NoteOrChord[];
    // get the expected key of every note/chord ahead of time
    const expectedKeys: ExpectedKey[] = seq.map(item => {
      switch (item.kind) {
        case "note": return keymap.getKey(item.note)!;
        case "chord": return item.notes.map(n => keymap.getKey(n)!);
        default: throw panic("unreachable");
      }
    });
    // the index of the next note/chord to play
    let activeIdx = 0;
    // note/chord -> span element node, use ref callback to set
    const spanMap = new Map<NoteOrChord, HTMLSpanElement>();

    useImperativeHandle(ref, () => {
      // FIXME: write our own scroll function, scrollIntoView got some bugs
      // build the scroll function based on browser support of scrollIntoViewOptions
      const scroll = "scrollBehavior" in document.documentElement.style 
        ? (span: HTMLSpanElement) => span.scrollIntoView({ behavior: "smooth", block: "center" })
        : (span: HTMLSpanElement) => span.scrollIntoView(true); // fallback
      return {
        // start playing from the first note/chord
        start(): ExpectedKey {
          const span = spanMap.get(seq[activeIdx])!; // should be the first note/chord
          span.classList.add("active");
          return expectedKeys[activeIdx];
        },
        // move to next note/chord
        move(correct: boolean): { done: false, next: ExpectedKey } | { done: true, next: null } {
          const span = spanMap.get(seq[activeIdx])!;
          span.classList.remove("active");
          span.classList.add(correct ? "correct" : "incorrect");
          if (activeIdx == seq.length - 1) {
            return { done: true, next: null };
          } else {
            const nextIdx = ++activeIdx;
            const nextSpan = spanMap.get(seq[nextIdx])!;
            nextSpan.classList.add("active");
            scroll(nextSpan);
            return { done: false, next: expectedKeys[nextIdx] };
          }
        },
        // reset, clear all notes/chords colored
        reset() {
          seq.forEach(noteOrChord => {
            const span = spanMap.get(noteOrChord)!;
            span.classList.remove("active");
            span.classList.remove("correct");
            span.classList.remove("incorrect");
          });
          activeIdx = 0;
          scroll(spanMap.get(seq[0])!);
        },
      };
    });

    function buildItemRefCallback(item: NoteOrChord) {
      return (node: HTMLSpanElement | null) => {
        if (node) {
          spanMap.set(item, node);
        } else {
          spanMap.delete(item);
        }
      };
    }

    return (
      <div id="sheet" className="w-full py-10">
        {
          // it's ok to use index as key here, as the sheet only render once, UI is updated imperatively
          sheetItems.map((row, i) => (
            <div key={i} className="w-fit mx-auto h-10 flex items-center">
              {row.map((item, j) => {
                const cls = "--" + (item.quarter * 1000); // duration class, different margin-right will be applied
                switch (item.kind) {
                  case "note":
                    return (
                      <span key={j} className={cls} ref={buildItemRefCallback(item)}>
                        {keymap.getKey(item.note)}
                      </span>
                    );
                  case "chord":
                    return (
                      <span key={j} className={cls}>
                        [<span ref={buildItemRefCallback(item)}>
                          {item.notes.map(n => keymap.getKey(n)).join('')}
                        </span>]
                      </span>
                    );
                  case "rest": // &nbsp; (non breaking sapce) is exactly what we want
                    return <span key={j} className={cls}>&nbsp;</span>;
                  default:
                    throw panic("unreachable");
                }
              })}
            </div>
          ))
        }
      </div>
    );
  }
);

export default React.memo(Sheet);
