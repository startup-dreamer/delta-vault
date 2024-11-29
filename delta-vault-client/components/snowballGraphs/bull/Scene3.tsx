import React from 'react'
import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, FormLabel, Input, Button, Text, Image, Stack, Heading } from '@chakra-ui/react';

export default function Scene1() {
    return (
        <Flex>
            <Flex flexDirection={"column"} textAlign={"left"}>
                <Heading fontSize={"2xl"} marginTop={"10px"}>
                    Recover subscription amount in USDe
                </Heading>
                <Text color={"lightgrey"}>
                    {"If the price is equal to or below the Caution price on any day and expires above the Target price, you'll recover your subscription amount on the settlement date:"}
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
                        <Image src="/images/bull/Bull_C3.png" alt='Bull C3' width={550} />
                    </div>
                </div>
            </Flex>
        </Flex>
    )
}
