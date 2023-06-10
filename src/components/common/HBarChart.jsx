import React from "react";
import { ResponsiveBar } from "@nivo/bar";

export default function HBarChart({ data }) {
    return (
        <ResponsiveBar
            data={data}
            keys={["count"]}
            indexBy="url"
            margin={{ top: 50, right: 80, bottom: 50, left: 60 }}
            padding={0.25}
            layout="horizontal"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={["#EED310"]}
            defs={[
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#F0E15B",
                    rotation: -45,
                    lineWidth: 5,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        id: "count",
                    },
                    id: "lines",
                },
            ]}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "url",
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "count",
                legendPosition: "middle",
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 5]],
            }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 1,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            ariaLabel="Horizontal Bar chart"
            barAriaLabel={(e) => e.id + ": " + e.formattedValue + " in url: " + e.indexValue}
        />
    );
}
