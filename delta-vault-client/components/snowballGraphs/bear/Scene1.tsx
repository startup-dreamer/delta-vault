import React from 'react'
import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, FormLabel, Input, Button, Text, Image, Stack, Heading } from '@chakra-ui/react';

export default function Scene1() {

    return (
        <Flex>
            <Flex flexDirection={"column"} textAlign={"left"}>
                <Heading fontSize={"2xl"} marginTop={"10px"}>
                    Receive earnings early in BTC
                </Heading>
                <Text color={"lightgrey"}>
                    {"If the price is equal to or below the Profit price on a Friday, you'll receive your earnings on the same day:"}
                </Text>
                <div
                    style={{
                        "display": 'flex',
                        "justifyContent": 'center'
                    }}
                >
                    <div
                        style={{
                            padding: "5px",
                            borderRadius: "10px",
                            paddingTop: "20px",
                        }}
                    >
                        <Image src="/images/bear/Bear_C1.png" alt='Bear C1' width={550} />
                    </div>
                </div>
            </Flex>
        </Flex>
    )
}
