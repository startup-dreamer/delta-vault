import React from 'react'
import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, FormLabel, Input, Button, Text, Image, Stack, Heading } from '@chakra-ui/react';

export default function Scene1() {

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
                        <Image src="/images/bear/Bear_C4.png" alt='Bear C4' width={550} />
                    </div>
                </div>
            </Flex>
        </Flex>
    )
}
