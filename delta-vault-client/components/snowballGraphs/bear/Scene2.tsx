import React from 'react'
import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, FormLabel, Input, Button, Text, Image, Stack, Heading } from '@chakra-ui/react';

export default function Scene1() {
    return (
        <Flex>
            <Flex flexDirection={"column"} textAlign={"left"}>
                <Heading fontSize={"2xl"} marginTop={"10px"}>
                    Receive maximum earnings in BTC
                </Heading>
                <Text color={"lightgrey"}>
                    {"If the price stays between the Profit price and Caution price, you’ll receive your earnings on the settlement date:"}
                </Text>
                <div
                    style={{
                        width: "90%",
                        padding: "5px",
                        borderRadius: "10px",
                        margin: "20px 0"
                    }}
                >
                    <Image src="/images/bear/Bear_C2.png" alt='Bear C2' filter={"invert(1)"} width={600} />
                </div>
            </Flex>
        </Flex>
    )
}
