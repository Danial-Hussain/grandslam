// @ts-nocheck

import * as d3 from "d3";
import { useRef, useEffect } from "react";
import nodeData from "../public/data.json";

export const Bracket = () => {
  const bracketRef = useRef();

  useEffect(() => {
    const width = 1500;
    const height = 1000;
    const radius = Math.min(width, height) / 2;

    const g = d3
      .select(bracketRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const layout = d3.partition().size([2 * Math.PI, radius]);

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1);

    const root = d3.hierarchy(nodeData).sum((d) => d.size);
    const nodes = root.descendants();

    layout(root);

    const handleMouseOver = (d, i) => {
      const xPos = parseFloat(d.screenX);
      const yPos = parseFloat(d.screenY);

      d3.select("#tooltip")
        .style("left", xPos + "px")
        .style("top", yPos + "px")
        .select("#value")
        .text(i.data.name);

      d3.select("#tooltip").classed("hidden", false);
    };

    const handleMouseOut = (d, i) =>
      d3.select("#tooltip").classed("hidden", true);

    const slices = g
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .on("mouseover", (d, i) => handleMouseOver(d, i))
      .on("mouseout", (d, i) => handleMouseOut(d, i));

    const computeAngle = (d) => {
      return ((d.x0 + d.x1) / Math.PI) * 90;
    };

    const computeTextRotation = (d) => {
      let angle = computeAngle(d);
      angle = angle < 90 || angle > 270 ? angle : angle + 180;
      return angle;
    };

    const color = (d, wins) => {
      if (d.data.name === d.parent.data.name) {
        return d.parent.data.w_score >= wins;
      } else {
        return d.parent.data.l_score >= wins;
      }
    };

    slices
      .append("path")
      .filter((d) => d.parent)
      .attr("d", arc)
      .style("stroke", "#222f3e")
      .style("stroke-width", (d) => d.depth * 2)
      .style("fill", (d) => {
        return d.parent && d.parent.data.name == d.data.name
          ? "#33d9b2"
          : "white";
      })
      .attr("class", "player");

    slices
      .append("text")
      .attr("transform", (d) =>
        d.depth !== 0
          ? "translate(" +
            arc.centroid(d) +
            ") rotate(" +
            computeTextRotation(d) +
            ")"
          : null
      )
      .attr("dx", "-27")
      .attr("dy", (d) => {
        let ang = computeAngle(d);
        return ang < 90 || ang > 270 ? "0.1em" : "0.4em";
      })
      .attr("font-size", (d) => (d.depth > 4 ? "1.2em" : "1.4em"))
      .text((d) =>
        d.depth > 5
          ? null
          : d.data.name.split(" ")[1].substring(0, 3).toUpperCase()
      );

    const addCircles = (slices, cx, wins) => {
      slices
        .filter((d) => d.depth < 6 && d.depth !== 0)
        .append("circle")
        .attr("transform", (d) =>
          d.depth !== 0
            ? "translate(" +
              arc.centroid(d) +
              ") rotate(" +
              computeTextRotation(d) +
              ")"
            : null
        )
        .attr("cx", cx)
        .attr("cy", (d) => {
          let ang = computeAngle(d);
          return ang < 90 || ang > 270 ? 20 : -20;
        })
        .attr("r", 5)
        .attr("fill", "#222f3e")
        .attr("fill-opacity", (d) => {
          return color(d, wins) ? "1" : "0.4";
        });
    };

    addCircles(slices, -15, 1);
    addCircles(slices, 0, 2);
    addCircles(slices, 15, 3);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center">
      <div
        id="tooltip"
        class="hidden"
        className="absolute pointer-events-none bg-white p-4 border-[6px] border-black"
      >
        <span id="value"></span>
      </div>
      <svg ref={bracketRef}></svg>
    </div>
  );
};
