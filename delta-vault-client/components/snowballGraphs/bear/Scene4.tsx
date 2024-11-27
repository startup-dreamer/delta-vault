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
        labels: [
            "Week 1", "", "Week 2", "", "Week 3", ""
        ],
        datasets: [
            {
                label: "BTC Price",
                data: [
                    26300,
                    25000,
                    23000,
                    25000,
                    26300,
                ],
                borderColor: "rgba(0, 255, 0, 1)", // Green line
                backgroundColor: "rgba(0, 255, 0, 0.2)", // Light green fill
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: "white", // Data point color
                pointRadius: 5, // Size of data points
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "#ffffff", // White legend text
                },
            },
            tooltip: {
                enabled: true, // Enable tooltips
                backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background color
                titleColor: "#ffffff", // Tooltip title color
                bodyColor: "#ffffff", // Tooltip text color
                callbacks: {
                    label: (context: { raw: any; }) => `Value: ${context.raw}`, // Customize tooltip label
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#ffffff", // X-axis labels color
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.2)", // Light grid lines
                },
            },
            y: {
                ticks: {
                    color: "#ffffff", // Y-axis labels color
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.2)", // Light grid lines
                },
            },
        },
    };

    return (
        <Flex>
            <Flex flexDirection={"column"} textAlign={"left"}>
                <Heading fontSize={"2xl"} marginTop={"10px"}>
                    Receive converted USDe
                </Heading>
                <Text color={"lightgrey"}>
                    {"If the crypto price breaches the Caution price on any day and expires at or above the Target price, your subscription amount will be converted to USDe at Target price on the settlement date:"}
                </Text>
                <div
                    style={{
                        width: "80%",
                        backgroundColor: "rgba(26, 29, 51, 0.5)", // Outer background color
                        padding: "20px",
                        borderRadius: "10px",
                        margin: "20px 0"
                    }}
                >
                    <div>
                        <Line data={data} options={options} />
                    </div>
                </div>
            </Flex>
        </Flex>
    )
}
