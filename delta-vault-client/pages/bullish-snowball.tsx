import React, { useState } from 'react';
import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, FormLabel, Input, Button, Text, Image, Stack } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react';
import { Progress, VStack } from '@chakra-ui/react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Web3Button } from "@thirdweb-dev/react";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { SNOWBOW_PRODUCT_ADDRESS } from '../const/addresses';
import { SNOWBOW_PRODUCT_ABI } from '../const/abi';
import { relative } from 'path';
import Scene1 from '../components/snowballGraphs/bull/Scene1';
import Scene2 from '../components/snowballGraphs/bull/Scene2';
import Scene3 from '../components/snowballGraphs/bull/Scene3';
import Scene4 from '../components/snowballGraphs/bull/Scene4';

function App() {
    const [amount, setAmount] = useState(0);

    return (
        <Box background={"linear-gradient(150deg, black 70%, #2b1b42)"}>
            {/* Upper Part */}
            <Flex w="100%" justifyContent={"center"} alignItems={"center"} p={3}>
                <Flex flexDirection={"column"} w="97%">
                    <Flex p={4} color="white" justifyContent={"center"} alignItems={"center"} position={"relative"}>
                        <Heading color={"white"} fontSize={"4xl"}>Bullish Snowball</Heading>
                        <Image src={"/images/ethena_logo.png"} alt="Polygon Logo" boxSize="22px" position={"absolute"} bottom={3} right={"38.5%"} />
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
                                    <StatNumber fontWeight={"bold"} fontSize={"2xl"}>USDe</StatNumber>
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
                            Snowball is a unique product that allows you to earn lucrative rewards when future crypto prices fall within a certain range.
                        </Text>
                    </Flex>
                </Box>
                <Box w={"43%"} bg={"linear-gradient(150deg, rgba(132, 137, 209, 0.15) 70%, black)"} p={4} borderRadius={8}>
                    <Text textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"}>
                        Deposit
                    </Text>
                    <Stack spacing={4}>
                        <Flex align="center" marginTop={6}>
                            <Flex w={"100%"} bg={"rgba(132, 137, 209, 0.15)"} borderRadius={12} p={1} position={"relative"}>
                                <div
                                    style={{
                                        width:"9%",
                                        backgroundColor: "rgba(91, 154, 189, 0.4)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "10px 0 0 10px"
                                    }}
                                >
                                    <Image src={"/images/USDe_icon.png"} alt="Bullish" boxSize="30px" borderRadius={"50%"} />
                                </div>
                                <input
                                    type='number'
                                    defaultValue={1000}
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
                                    contractAddress={SNOWBOW_PRODUCT_ADDRESS}
                                    contractAbi={SNOWBOW_PRODUCT_ABI}
                                    action={(contract) => {
                                        contract.call("buyShare", [(BigInt(amount) * BigInt(1e18)).toString()])
                                    }}
                                    onSubmit={() => console.log("Transaction submitted")}
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
                                    <Image src={"/images/USDe_icon.png"} alt="Bullish" boxSize="40px" borderRadius={"50%"} />
                                    <div
                                        style={{
                                            "position": "absolute",
                                            "bottom": "-5px",
                                            "right": "-5px"
                                        }}
                                    >
                                        <Image src={"/images/bitcoin_logo.png"} alt="Polygon Logo" boxSize="22px" />
                                    </div>
                                </div>
                                <Heading>
                                    Bullish on BTC
                                </Heading>
                            </Flex>
                            <Box>
                                <Heading fontSize={"xl"}>
                                    Profit price
                                </Heading>
                                <Text>
                                    The Profit price is observed every Friday only. If the average price of the underlying crypto from 07:00 - 08:00 UTC is equal to or above the Profit price on a Friday, your product expires on the same day and you receive earnings early.
                                </Text>
                            </Box>
                            <Box>
                                <Heading fontSize={"xl"}>
                                    Caution price
                                </Heading>
                                <Text>
                                    The Caution price is observed daily. If the average price of the underlying crypto from 07:00 - 08:00 UTC is equal to or below the Caution price on any day, you risk a conversion scenario when the product expires.
                                </Text>
                            </Box>
                            <Box>
                                <Heading fontSize={"xl"}>
                                    Target price
                                </Heading>
                                <Text>
                                    The Target price is determined at the start of your term. In case of a conversion scenario, you’ll buy the underlying crypto at this price, which will be higher than the prevailing market price.
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
        </Box >
    );
}

export default App;


// {/* <Box flex="2" p="14" color={"white"}>
//     <Accordion allowMultiple>
//         {/* Repeat AccordionItem for each item you need */}
//         <AccordionItem>
//             <h2>
//                 <AccordionButton _expanded={{ bg: '#000000', color: 'white' }}>
//                     <Box flex="1" textAlign="left" fontWeight={"bold"}>
//                         Investment Summary
//                     </Box>
//                     <AccordionIcon />
//                 </AccordionButton>
//             </h2>
//             <AccordionPanel pb={4}>
//                 <Heading fontSize={"large"}>What is Snowball?</Heading>
//                 Snowball is a unique product that allows you to strategize, manage risk, and make lucrative returns in different market conditions<br /><br />
//                 <Heading fontSize={"large"}>Incredible returns</Heading>
//                 Enjoy up to 20% est. APRs on leading crypto such as BTC, ETH or USDT<br /><br />
//                 <Heading fontSize={"large"}>Partial downside protection</Heading>
//                 Markets need to move drastically against you before you experience any losses<br />
//             </AccordionPanel>
//         </AccordionItem>
//         {/* Order Detail Example */}
//         <AccordionItem>
//             <h2>
//                 <AccordionButton _expanded={{ bg: '#000000', color: 'white' }}>
//                     <Box flex="1" textAlign="left" fontWeight={"bold"}>
//                         Order Detail Example
//                     </Box>
//                     <AccordionIcon />

//                 </AccordionButton>
//             </h2>
//             <AccordionPanel pb={4}>
//                 <Card>
//                     <CardBody>
//                         <TableContainer>
//                             <Table variant='simple'>
//                                 <TableCaption>Order details example</TableCaption>

//                                 <Tbody>
//                                     <Tr>
//                                         <Td>Product</Td>
//                                         <Td>Bullish on BTC</Td>
//                                     </Tr>
//                                     <Tr>
//                                         <Td>Principal</Td>
//                                         <Td>100,000 USDT</Td>
//                                     </Tr>
//                                     <Tr>
//                                         <Td>Term</Td>
//                                         <Td>28 days</Td>
//                                     </Tr>
//                                     <Tr>
//                                         <Td>APR
//                                         </Td>
//                                         <Td>18.00%</Td>
//                                     </Tr>
//                                     <Tr>
//                                         <Td>Strike price</Td>
//                                         <Td>$26,000</Td>
//                                     </Tr>
//                                     <Tr>
//                                         <Td>Knock-out price</Td>
//                                         <Td>$26,300</Td>
//                                     </Tr>
//                                     <Tr>
//                                         <Td>Knock-in price</Td>
//                                         <Td>$22,000</Td>
//                                     </Tr>
//                                 </Tbody>

//                             </Table>
//                         </TableContainer>
//                     </CardBody>
//                 </Card>
//                 <Text color={'gray'}>The Knock-out price is observed every Friday, 16:00:00.</Text>
//                 <Text color={'gray'}>The Knock-in price is observed Observed daily, 16:00:00.</Text>
//             </AccordionPanel>
//         </AccordionItem>
//         {/* Scenario 1/4 - Earn more BTC when a knock-out (KO) event occurs */}
//         <AccordionItem>
//             <h2>
//                 <AccordionButton _expanded={{ bg: '#000000', color: 'white' }}>
//                     <Box flex="1" textAlign="left" fontWeight={"bold"}>
//                         Scenario 1/4 - Earn more BTC when a knock-out (KO) event occurs
//                     </Box>
//                     <AccordionIcon />

//                 </AccordionButton>
//             </h2>
//             <AccordionPanel pb={4}>
//                 <Card>
//                     <CardBody>
//                         <Image src={"/images/bull1.png"} />

//                         <Text fontWeight={"bold"}>you will receive your earnings on the KO date:


//                         </Text>
//                         <Text>Earnings = Principal x (1 + APR x Term / 365)

//                         </Text>
//                         <Text>Earnings = 100,000 x (1 + 0.18 x 21 / 365)

//                         </Text>
//                         <Text fontWeight={"bold"}>= 101,035.61 USDT

//                         </Text>

//                     </CardBody>
//                 </Card>
//             </AccordionPanel>
//         </AccordionItem>
//         {/* Scenario 2/4 - Earn more BTC when a knock-out (KO) event occurs */}
//         <AccordionItem>
//             <h2>
//                 <AccordionButton _expanded={{ bg: '#000000', color: 'white' }}>
//                     <Box flex="1" textAlign="left" fontWeight={"bold"}>
//                         Scenario 2/4 – Earn more USDT when neither a knock-out (KO) nor a knock-in (KI) event occurs
//                     </Box>
//                     <AccordionIcon />

//                 </AccordionButton>
//             </h2>
//             <AccordionPanel pb={4}>
//                 <Card>
//                     <CardBody>
//                         <Image src={"/images/bull2.png"} />

//                         <Text fontWeight={"bold"}>you will receive your earnings on the expiration date:




//                         </Text>
//                         <Text>Earnings = Principal x (1 + APR x Term / 365)



//                         </Text>
//                         <Text>100,000 x (1 + 0.18 x 28 / 365)



//                         </Text>
//                         <Text fontWeight={"bold"}>= 101,380.82 USDT

//                         </Text>

//                     </CardBody>
//                 </Card>
//             </AccordionPanel>
//         </AccordionItem>
//         {/* Scenario 3/4 - Earn more BTC when a knock-out (KO) event occurs */}
//         <AccordionItem>
//             <h2>
//                 <AccordionButton _expanded={{ bg: '#000000', color: 'white' }}>
//                     <Box flex="1" textAlign="left" fontWeight={"bold"}>
//                         Scenario 3/4 – No gains or losses if a knock-in (KI) event occurs and the price expires between the strike and knock-out (KO) prices
//                     </Box>
//                     <AccordionIcon />

//                 </AccordionButton>
//             </h2>
//             <AccordionPanel pb={4}>
//                 <Card>
//                     <CardBody>
//                         <Image src={"/images/bull3.png"} />
//                         <Text fontWeight={"bold"}>you will receive your principal on the expiration date:






//                         </Text>
//                         <Text>Earnings = Principal
//                         </Text>
//                         <Text fontWeight={"bold"}>= 100,000 USDT

//                         </Text>

//                     </CardBody>
//                 </Card>
//             </AccordionPanel>
//         </AccordionItem>
//         {/* Scenario 4/4 - Earn more BTC when a knock-out (KO) event occurs */}
//         <AccordionItem>
//             <h2>
//                 <AccordionButton _expanded={{ bg: '#000000', color: 'white' }}>
//                     <Box flex="1" textAlign="left" fontWeight={"bold"}>
//                         Scenario 4/4 – Receive BTC when a knock-in (KI) event occurs and the price expires at or below the strike price
//                     </Box>
//                     <AccordionIcon />

//                 </AccordionButton>
//             </h2>
//             <AccordionPanel pb={4}>
//                 <Card>
//                     <CardBody>
//                         <Image src={"/images/bull4.png"} />
//                         <Text fontWeight={"bold"}>you will receive crypto on the expiration date:






//                         </Text>
//                         <Text>Earnings = Principal x Strike price





//                         </Text>
//                         <Text>Earnings = 100,000 / 26,000





//                         </Text>
//                         <Text fontWeight={"bold"}>= 3.84 BTC





//                         </Text>

//                     </CardBody>
//                 </Card>
//             </AccordionPanel>
//         </AccordionItem>
//     </Accordion>
// </Box> */}