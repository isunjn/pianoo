import { forwardRef, useRef, useImperativeHandle, type Ref } from "react";

const PlayerVisual = forwardRef(function PlalyerVisual(props, ref: Ref<unknown>) {
  const noteRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    playNote(note: string) {
      if (noteRef.current) {
        noteRef.current.innerText = note;
      }
    }
  }));

  return (
    <div className="h-48 flex justify-center items-center border border-blue-300">
      <div ref={noteRef} className="border border-pink-300"></div>
    </div>
  );
});

export default PlayerVisual;
