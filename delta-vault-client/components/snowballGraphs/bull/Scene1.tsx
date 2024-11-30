import React from 'react'
import { Box, Flex, Accordion, Text, Image, Stack, Heading } from '@chakra-ui/react';

export default function Scene1() {

    return (
        <Flex>
            <Flex flexDirection={"column"} textAlign={"left"}>
                <Heading fontSize={"2xl"} marginTop={"10px"}>
                    Receive earnings early in USDe
                </Heading>
                <Text color={"lightgrey"}>
                    {"If the price is equal to or above the Profit price, you'll receive your earnings immediately:"}
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
                        <Image src="/images/bull/Bull_C1.png" alt='Bull C1' width={550} />
                    </div>
                </div>
            </Flex>
        </Flex>
    )
}
