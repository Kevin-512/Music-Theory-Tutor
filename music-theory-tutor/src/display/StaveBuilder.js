import React, { useEffect, useRef } from "react";
import Vex from "vexflow";

const StaveBuilder = ({ clef = "treble", timeSig = "4/4", notes = "", keySig=""}) => {
  const { Factory } = Vex.Flow;
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.innerHTML = "";

      const vf = new Factory({
        renderer: { elementId: outputRef.current, width: 400, height: 200 },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      system
        .addStave({
          voices: [
            score.voice(score.notes(notes)).setStrict(false),
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
