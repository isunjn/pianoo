import type { PlayerState } from "~/components/Player";

interface PlayerSheetProps {
  state: PlayerState;
}

function PlayerSheet({ state }: PlayerSheetProps) {

  return (
    <div className="mx-auto h-48 overflow-scroll p-10 pb-16 w-fit border border-yellow-300">
      {state == "idle" 
        ? <div>Click or press any key to start</div> 
        : <div>
            w t y tyu ooo uyt<br />
            w t y tyu oooo uyt<br />
            o oo p os o u y u<br />
            ytytytyty tyuio<br />
            tyuu uuu iuyu <br />
            tyuu uu ouyt yuu<br />
            uop ops opu uyu<br />
            t yyyyy ou yy <br />
            opss opss<br />
            ops sdd sas <br />
          </div>
      }
    </div>
  );
}

export default PlayerSheet;
