import React from 'react'
import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, FormLabel, Input, Button, Text, Image, Stack, Heading } from '@chakra-ui/react';

export default function Scene1() {
    return (
        <Flex>
            <Flex flexDirection={"column"} textAlign={"left"}>
                <Heading fontSize={"2xl"} marginTop={"10px"}>
                    Receive converted BTC
                </Heading>
                <Text color={"lightgrey"}>
                    {"If the crypto price breaches the Caution price on any day and expires at or below the Target price, your subscription amount will be converted to BTC at Target price on the settlement date:"}
                </Text>
                <div
                    style={{
                        width: "90%",
                        padding: "5px",
                        borderRadius: "10px",
                        margin: "20px 0"
                    }}
                >
                    <Image src="/images/bull/Bull_C4.png" alt='Bull C4' filter={"invert(1)"} width={600} />
                </div>
            </Flex>
        </Flex>
    )
}
