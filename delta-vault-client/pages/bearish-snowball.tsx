import React, { useState } from 'react';
import { Box, Flex, Stack, Text, Image } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Web3Button } from "@thirdweb-dev/react";
import { DELTA_VAULT_PRODUCT_ADDRESS } from '../const/addresses';
import { DELTA_VAULT_PRODUCT_ABI } from '../const/abi';
import {
    Stat,
    StatLabel,
    StatNumber,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Scene1 from '../components/snowballGraphs/bear/Scene1';
import Scene2 from '../components/snowballGraphs/bear/Scene2';
import Scene3 from '../components/snowballGraphs/bear/Scene3';
import Scene4 from '../components/snowballGraphs/bear/Scene4';

function App() {
    const [amount, setAmount] = useState(0);
    return (
        <Box background={"linear-gradient(150deg, black 70%, #2b1b42)"}>
            {/* Upper Part */}
            <Flex w="100%" justifyContent={"center"} alignItems={"center"} p={3}>
                <Flex flexDirection={"column"} w="97%">
                    <Flex p={4} color="white" justifyContent={"center"} alignItems={"center"} position={"relative"}>
                        <Heading color={"white"} fontSize={"4xl"}>Bearish Snowball</Heading>
                        <Image src={"/images/ethena_logo.png"} alt="Ethena Logo" boxSize="22px" position={"absolute"} bottom={3} right={"38.5%"} />
                    </Flex>

                    {/* Bottom 1/3 with Stat */}
                    <Flex justifyContent={"center"} marginTop={5}>
                        <Flex w={"100%"} p={6} color="white" flexDirection={"column"} justifyContent={"center"} textAlign={"center"} gap={4} bg="linear-gradient(160deg, rgba(132, 137, 209, 0.15) 15%, rgba(6, 24, 36, 0.2))" borderRadius={8}>
                            <Stat p={1}>
                                <StatLabel fontSize={"2xl"} color={"#fca3ff"}>Product TVL</StatLabel>
                                <StatNumber fontWeight={"bold"} fontSize={"4xl"}>$186,964,44</StatNumber>
                            </Stat>
                            <Flex gap={4}>
                                <Stat bg={"rgba(132, 137, 209, 0.15)"} borderRadius={8} p={3}>
                                    <StatLabel color={"#fca3ff"}>Staking Asset</StatLabel>
                                    <StatNumber fontWeight={"bold"} fontSize={"2xl"}>wBTC</StatNumber>
                                </Stat>
                                <Stat bg={"rgba(132, 137, 209, 0.15)"} borderRadius={8} p={3}>
                                    <StatLabel color={"#fca3ff"}>Underlying Asset</StatLabel>
                                    <StatNumber fontWeight={"bold"} fontSize={"2xl"}>BTC</StatNumber>
                                </Stat>
                            </Flex>
                            <Flex gap={4}>
                                <Stat bg={"rgba(132, 137, 209, 0.15)"} borderRadius={8} p={3}>
                                    <StatLabel color={"#fca3ff"}>Duration</StatLabel>
                                    <StatNumber fontWeight={"bold"} fontSize={"2xl"}>28 DAYS</StatNumber>
                                </Stat>
                                <Stat bg={"rgba(132, 137, 209, 0.15)"} borderRadius={8} p={3}>
                                    <StatLabel color={"#fca3ff"}>Fixed APY</StatLabel>
                                    <StatNumber fontWeight={"bold"} fontSize={"2xl"}>18%</StatNumber>
                                </Stat>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Flex justifyContent={"space-between"} color={"white"} p={8} margin={"30px 0"}>
                <Box color={"white"} w={"55%"} bg={"rgba(132, 137, 209, 0.15)"} p={8} borderRadius={8}>
                    <Flex justifyContent={"center"} flexDirection={"column"} textAlign={"left"} gap={2}>
                        <Heading>What is Snowball?</Heading>
                        <Text fontSize={"xl"} color={"lightgrey"}>
                            Snowball is a unique product that allows you to earn lucrative rewards when future crypto prices rise/fall within a certain range.
                        </Text>
                    </Flex>
                </Box>
                <Box w={"43%"} bg={"linear-gradient(150deg, rgba(132, 137, 209, 0.15) 70%, black)"} p={4} borderRadius={8}>
                    <Text textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"}>
                        Subscribe
                    </Text>
                    <Stack spacing={4}>
                        <Flex align="center" marginTop={6}>
                            <Flex w={"100%"} bg={"rgba(132, 137, 209, 0.15)"} borderRadius={12} p={1} position={"relative"}>
                                <div
                                    style={{
                                        width: "9%",
                                        backgroundColor: "rgba(91, 154, 189, 0.4)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "10px 0 0 10px"
                                    }}
                                >
                                    <Image src={"/images/Bitcoin_logo.png"} alt="Bullish" boxSize="30px" borderRadius={"50%"} />
                                </div>
                                <input
                                    type='number'
                                    defaultValue={100}
                                    onChange={(event) => setAmount(parseFloat(event.target.value))}
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        border: "none",
                                        fontSize: "18px",
                                        outline: "none",
                                        width: "80%",
                                        paddingLeft: "15px",
                                    }}
                                />
                                <Web3Button
                                    contractAddress={DELTA_VAULT_PRODUCT_ADDRESS}
                                    contractAbi={DELTA_VAULT_PRODUCT_ABI}
                                    action={async (contract) => {
                                        try {
                                            await contract.call("buyShare", [(BigInt(amount) * BigInt(1e18)).toString()]);
                                        } catch (error) {
                                            console.error("Transaction failed:", error);
                                        }
                                    }}
                                    onSuccess={() => console.log("Transaction successful")}
                                    onError={(error) => console.error("Error:", error)}
                                >
                                    Deposit
                                </Web3Button>
                            </Flex>
                        </Flex>
                    </Stack>
                </Box>
            </Flex>

            {/* Bottom Section */}
            <Box>
                <Flex justifyContent={"center"} textAlign={"center"} alignItems={"center"} paddingBottom={"45px"}>
                    <Flex w={"96%"} bg={"rgba(132, 137, 209, 0.15)"} p={6} color={"white"} borderRadius={10} justifyContent={"space-between"}>
                        {/* Left Section */}
                        <Flex flexDirection={"column"} textAlign={"left"} gap={8} width={"45%"}>
                            <Flex gap={4}>
                                <div
                                    style={{
                                        "position": "relative"
                                    }}
                                >
                                    <Image src={"/images/bitcoin_logo.png"} alt="Bullish" boxSize="40px" />
                                    <div
                                        style={{
                                            "position": "absolute",
                                            "bottom": "-5px",
                                            "right": "-5px"
                                        }}
                                    >
                                        <Image src={"/images/USDe_icon.png"} alt="Ethena Logo" boxSize="22px" borderRadius={"50%"} />
                                    </div>
                                </div>
                                <Heading>
                                    Bearish on BTC
                                </Heading>
                            </Flex>
                            <Box>
                                <Heading fontSize={"xl"}>
                                    Profit price
                                </Heading>
                                <Text>
                                    If the average price of the underlying crypto is equal to or below the Profit price, your product expires and you receive earnings early.
                                </Text>
                            </Box>
                            <Box>
                                <Heading fontSize={"xl"}>
                                    Caution price
                                </Heading>
                                <Text>
                                    If the average price of the underlying crypto is equal to or above the Caution price, you risk a conversion scenario when the product expires.
                                </Text>
                            </Box>
                            <Box>
                                <Heading fontSize={"xl"}>
                                    Target price
                                </Heading>
                                <Text>
                                    In case of a conversion scenario, you’ll sell the underlying crypto at this price, which will be lower than the prevailing market price.
                                </Text>
                            </Box>
                        </Flex>

                        {/* Bottom Section */}
                        <Tabs defaultIndex={0} variant="soft-rounded" width={"50%"} colorScheme='blue'>
                            <TabList justifyContent={"right"}>
                                <Tab>Early profit</Tab>
                                <Tab>Max profit</Tab>
                                <Tab>Recovery</Tab>
                                <Tab>Conversion</Tab>
                            </TabList>
                            <TabPanels width={"100%"}>
                                <TabPanel>
                                    <Scene1 />
                                </TabPanel>
                                <TabPanel>
                                    <Scene2 />
                                </TabPanel>
                                <TabPanel>
                                    <Scene3 />
                                </TabPanel>
                                <TabPanel>
                                    <Scene4 />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
}

export default App;