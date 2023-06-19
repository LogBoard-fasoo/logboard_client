import React from "react";
import { ResponsivePie } from "@nivo/pie";

export default function PieChart({ data, includeLegend = true }) {
    return (
        <ResponsivePie
            data={data}
            margin={{ top: -100, right: 80, bottom: 30, left: 55 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "set3" }}
            borderWidth={1}
            borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
            }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.3)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            legends={
                includeLegend
                    ? [
                          {
                              anchor: "bottom",
                              direction: "column",
                              justify: false,
                              translateX: -40,
                              translateY: -10,
                              itemsSpacing: 0,
                              itemWidth: 100,
                              itemHeight: 25,
                              itemTextColor: "#999",
                              itemDirection: "left-to-right",
                              itemOpacity: 1,
                              symbolSize: 18,
                              symbolShape: "circle",
                              effects: [
                                  {
                                      on: "hover",
                                      style: {
                                          itemTextColor: "#000",
                                      },
                                  },
                              ],
                          },
                      ]
                    : []
            }
        />
    );
}
