import React from 'react'
import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, FormLabel, Input, Button, Text, Image, Stack, Heading } from '@chakra-ui/react';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Scene1() {
    const data = {
        labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Expiry"],
        datasets: [
            {
                label: "Asset Price",
                data: [
                    { "x": 1, "y": 5.761 },
                    { "x": 2, "y": 5.705 },
                    { "x": 3, "y": 5.545 },
                    { "x": 4, "y": 5.376 },
                    { "x": 5, "y": 5.262 },
                    { "x": 6, "y": 5.408 },
                    { "x": 7, "y": 5.657 },
                    { "x": 8, "y": 5.93 },
                    { "x": 9, "y": 6.192 },
                    { "x": 10, "y": 6.202 },
                    { "x": 11, "y": 6.13 },
                    { "x": 12, "y": 5.837 },
                    { "x": 13, "y": 5.382 },
                    { "x": 14, "y": 5.127 },
                    { "x": 15, "y": 5.192 },
                    { "x": 16, "y": 5.814 },
                    { "x": 17, "y": 6.724 },
                    { "x": 18, "y": 7.411 },
                    { "x": 19, "y": 7.551 },
                    { "x": 20, "y": 7.384 },
                    { "x": 21, "y": 7.376 },
                    { "x": 22, "y": 8.127 }
                ],
                borderColor: "rgba(0, 255, 0, 1)", // Green line
                backgroundColor: "rgba(0, 255, 0, 0.2)", // Light green fill
                pointRadius: [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5], // First and last points
                pointHoverRadius: [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
                borderWidth: 2,
                tension: 0.1, // Smooth curve
                pointBackgroundColor: "white", // Data point color
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hide legend
            },
        },
        scales: {
            x: {
                type: "category" as const, // Enables XY data
                grid: {
                    display: false,
                    drawBorder: false,
                    color: "rgba(200, 200, 200, 0.3)", // Light grid lines
                },
                ticks: {
                    autoSkip: false,
                    callback: function (_value: any, index: number) {
                        // Only show Expiry label for last point
                        if (index === data.datasets[0].data.length - 1) return "Expiry";
                        return "";
                    },
                },
            },
            y: {
                type: "linear" as const,
                grid: {
                    display: true,
                    drawBorder: false,
                    color: "rgba(200, 200, 200, 0.3)", // Light grid lines
                },
                ticks: {
                    callback: function (tickValue: string | number, index: number) {
                        // Map Y-axis labels
                        if (tickValue === 5) return "Caution Price";
                        const firstPointY = data.datasets[0].data[0].y; // Y value of the first point
                        const lastPointY = data.datasets[0].data[data.datasets[0].data.length - 1].y; // Y value of the last point

                        // Check if the current tick value matches the Y value of the first point (Target Price)
                        if (tickValue === firstPointY) {
                            return "Target Price"; // Label for the first point
                        }

                        // Check if the current tick value matches the Y value of the last point (Profit Price)
                        if (tickValue === lastPointY) {
                            return "Profit Price"; // Label for the last point
                        }
                        return ""; // Hide other ticks
                    },
                },
                min: Math.min(...data.datasets[0].data.map(point => point.y)) - 1, // Adjust lower limit for visibility
                max: Math.max(...data.datasets[0].data.map(point => point.y)) + 1, // Adjust range to show desired labels
            },
        },
    };

    return (
        <Flex>
            <Flex flexDirection={"column"} textAlign={"left"}>
                <Heading fontSize={"2xl"} marginTop={"10px"}>
                    Receive earnings early in USDe
                </Heading>
                <Text color={"lightgrey"}>
                    {"If the price is equal to or above the Profit price on a Friday, you'll receive your earnings on the same day:"}
                </Text>
                <div
                    style={{
                        width: "80%",
                        backgroundColor: "rgba(26, 29, 51, 0.5)", // Outer background color
                        padding: "5px",
                        borderRadius: "10px",
                        margin: "20px 0"
                    }}
                >
                    <div style={{ width: "600px", height: "400px" }}>
                        <Line data={data} options={options} />
                    </div>
                </div>
            </Flex>
        </Flex>
    )
}
