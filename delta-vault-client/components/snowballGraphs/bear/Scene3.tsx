import React from 'react'
import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, FormLabel, Input, Button, Text, Image, Stack, Heading } from '@chakra-ui/react';

export default function Scene1() {

    return (
        <Flex>
            <Flex flexDirection={"column"} textAlign={"left"}>
                <Heading fontSize={"2xl"} marginTop={"10px"}>
                    Recover subscription amount in BTC
                </Heading>
                <Text color={"lightgrey"}>
                    {"If the price is equal to or above the Caution price on any day and expires below the Target price, you'll recover your subscription amount on the settlement date:"}
                </Text>
                <div
                    style={{
                        width: "90%",
                        padding: "5px",
                        borderRadius: "10px",
                        margin: "20px 0"
                    }}
                >
                    <Image src="/images/bear/Bear_C3.png" alt='Bear C3' filter={"invert(1)"} width={600} />
                </div>
            </Flex>
        </Flex>
    )
}
