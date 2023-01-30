import * as d3 from "d3";
import { Slices } from "./chartcomponents/Slices";
import { SlicesDotMarks } from "./chartcomponents/SlicesDotMarks";
import { useChartDimensions } from "./hooks/useChartDimensions";

const chartSettings = {
  marginBottom: 40,
  marginLeft: 40,
  marginTop: 15,
  marginRight: 15,
  height: 400,
  width: 500,
};

const angleGen = d3.pie<any>().value((d: any) => d.value);

const PieChart = () => {
  const radius = 150;
  const [ref, dms] = useChartDimensions(chartSettings);

  // TODO: move this to config
  const data = {
    data: [
      { name: "A", value: "30" },
      { name: "B", value: "40" },
      { name: "C", value: "50" },
      { name: "D", value: "40" },
      { name: "E", value: "60" },
    ],
    selectedIndices: [1, 4],
  };

  const angles = angleGen(data.data);
  const arcsGen = angles.map((angle) =>
    d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(angle.startAngle)
      .endAngle(angle.endAngle)
  );

  const labelArcs = angles
    .map((angle) =>
      d3
        .arc()
        .outerRadius(radius + 10)
        .innerRadius(radius + 10)
        .startAngle(angle.startAngle)
        .endAngle(angle.endAngle)
    )
    .filter((arc, i) => data.selectedIndices.includes(i));

  return (
    <div className="Chart__wrapper" ref={ref} style={{ height: "400px" }}>
      <svg width={dms.width} height={dms.height}>
        <g
          transform={`translate(${[
            dms.marginLeft + radius,
            dms.marginTop + radius,
          ].join(",")})`}
        >
          <Slices arcs={arcsGen} />
          <SlicesDotMarks positions={labelArcs} />
        </g>
      </svg>
    </div>
  );
};

export default PieChart;
