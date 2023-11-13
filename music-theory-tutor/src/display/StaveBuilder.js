import React, { useEffect, useRef } from "react";
import Vex from "vexflow";

const StaveBuilder = ({ clef = "bass", timeSig = "4/4", notes = "", keySig="A"}) => {
  const { Factory } = Vex.Flow;
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.innerHTML = "";

      const vf = new Factory({
        renderer: { elementId: outputRef.current, width: 500, height: 200 },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      system
        .addStave({
          voices: [
            score.voice(score.notes(notes)),
          ],
        })
        .addClef(clef)
        .addTimeSignature(timeSig)
        .addKeySignature(keySig);

      vf.draw();
    }
  }, [clef, timeSig, notes, keySig]);

  return <svg ref={outputRef}></svg>;
};

export default StaveBuilder;
