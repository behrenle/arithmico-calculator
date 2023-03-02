import { GraphicNode } from "@arithmico/engine/lib/types";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import SvgComponent from "@local-components/graphic/svgComponent";

interface GraphicContainerProps {
  graphic: GraphicNode;
}

export default function GraphicContainer({ graphic }: GraphicContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [viewBoxWidth, setViewBoxWidth] = useState(1);
  const [viewBoxHeight, setViewBoxHeight] = useState(1);

  const setDimensions = () => {
    if (ref.current) {
      setViewBoxWidth(ref.current.offsetWidth);
      setViewBoxHeight(ref.current.offsetHeight);
    }
  };
  useEffect(setDimensions, [ref.current]);

  return (
    <div
      ref={ref}
      onResize={setDimensions}
      className={classNames(
        "flex",
        "w-full",
        "h-full",
        "max-h-full",
        "items-center",
        "justify-center"
      )}
    >
      <SvgComponent
        graphic={graphic}
        viewBoxWidth={viewBoxWidth}
        viewBoxHeight={viewBoxHeight}
      />
    </div>
  );
}
