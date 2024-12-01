import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Flex, VStack, Heading, Text, SimpleGrid, Image } from '@chakra-ui/react';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { GET_USER_PORTFOLIO } from '../components/queries'; // Adjust the import path
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { DELTA_VAULT_PRODUCT_ADDRESS } from '../const/addresses';
import { Web3Button } from "@thirdweb-dev/react";
import { EmptyState } from "../components/ui/empty-state";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import {
    DELTA_VAULT_PRODUCT_ABI
} from '../const/abi';
interface PortfolioItem {
    id: string;
    holdingTargetAmount: string;
}

const PortfolioPage = () => {
    const address = useAddress();
    const { loading, error,
        // data,
        refetch } = useQuery(GET_USER_PORTFOLIO, {
            variables: { id: address },
            skip: !address,
        });

    const data = {
        user: {
            portfolio: [
                {
                    id: "1",
                    holdingTargetAmount: "0.002272727", // Amount of shares or holdings
                },
            ],
        },
    };

    const mockProductDetails = {
        apy: "18%",
        stakingAsset: "USDe",
        underlyingAsset: "BTC",
        duration: "28 days",
        logoUrl: "/images/bullishSnowball.png", // Replace with actual image path
    };
    const getBtcPrice = async () => {
        try {
            const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return parseFloat(data.price);
        } catch (error) {
            console.error('Error fetching BTC price:', error);
            return null; // or a default value
        }
    };


    const [btcPrice, setBtcPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchBtcPrice = async () => {
            const price = await getBtcPrice();
            setBtcPrice(price);
        };

        fetchBtcPrice();
    }, []);

    useEffect(() => {
        if (address) {
            refetch();
        }
    }, [address, refetch]);

    if (!address) {
        return (
            <Flex justifyContent="center" alignItems="center" height="88vh" bg={"black"}>
                <EmptyState
                    icon={<MdNoEncryptionGmailerrorred />}
                    title="You are not authenticated"
                    description={
                        <>
                            <br />
                            <ConnectWallet theme="dark" />
                        </>
                    }
                />
            </Flex>
        );
    }

    if (loading) return <div style={{
        "display": "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        color: "white",
        fontWeight: "bold",
        backgroundColor: "black",
        height: "80vh",
        fontSize: "25px"
    }}>
        Loading...
    </div>;
    if (error) return <Flex justifyContent="center" alignItems="center" height="88vh" bg={"black"}>
        <EmptyState
            icon={<RiErrorWarningFill />}
            title="Error"
            description="Something unexpected happened. Please try again later."
        />
    </Flex>

    return (
        <Box>
            <VStack p={10} spacing={4} align={"left"} bg={"linear-gradient(160deg, black 40%, #2b1b42)"} color={"white"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Heading fontSize={"4xl"} paddingBottom={"20px"}>Portfolio</Heading>
                    <Heading fontSize="3xl" color={"lightpink"}>Investment Summary</Heading>
                </Flex>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
                    {data.user.portfolio.map((item: PortfolioItem) => {

                        // Part 3: BTC Price Status
                        let priceStatus, priceColor, priceIndicator;
                        if (btcPrice !== null) {
                            if (btcPrice > 48000) {
                                priceStatus = "Knock Out";
                                priceColor = "green.400";
                                priceIndicator = "increase";
                            } else if (btcPrice < 40000) {
                                priceStatus = "Knock In";
                                priceColor = "red.400";
                                priceIndicator = "decrease";
                            } else {
                                priceStatus = "At Price";
                                priceColor = "balck";
                                priceIndicator = null;
                            }
                        } else {
                            priceStatus = "Loading...";
                            priceColor = "gray.400";
                            priceIndicator = null;
                        }

                        // Part 4: Expected Profit Calculation
                        const currentTime = Math.floor(Date.now() / 1000);
                        let daysPast = (currentTime - 1702209600) / (60 * 60 * 24);
                        if (daysPast < 0) {
                            daysPast = 0;
                        }
                        const expectedProfit = parseFloat(item.holdingTargetAmount) * 44000 * (1 + 0.18 * (daysPast / 365));

                        return (
                            <Box key={item.id} p={5} shadow="md" bg={"linear-gradient(135deg, rgba(88, 53, 92, 0.3) 30%, #24273d)"} borderRadius={10}>
                                {/* ... Parts 1 and 2 ... */}
                                {/* Part 1: Basic Information */}
                                <Flex justifyContent={"center"} alignItems={"center"} marginBottom={8}>
                                    <Image
                                        src={mockProductDetails.logoUrl}
                                        alt="Product Logo"
                                        boxSize="200px"
                                        objectFit="cover" 
                                        borderRadius={"50%"}                                       
                                    />
                                </Flex>
                                {/* Part 3: BTC Price Status */}
                                <Box marginTop="20px" bg={"rgba(77, 25, 120, 0.3)"} borderRadius={8} p={3} textAlign={"center"} w={"100%"}>
                                    <Stat borderColor={priceColor}>
                                        <StatLabel fontWeight="bold" fontSize={'medium'}>BTC Price Status</StatLabel>
                                        <StatNumber>{btcPrice ? `${btcPrice.toFixed(2)} USDe` : 'Fetching...'}</StatNumber>
                                        <StatHelpText fontSize={'medium'}>
                                            {priceIndicator}{' '}
                                            {priceStatus}
                                        </StatHelpText>
                                    </Stat>
                                </Box>

                                <Flex justifyContent={"space-between"} marginTop={"10px"} fontWeight={"bold"}>
                                    <Flex bg={"rgba(77, 25, 120, 0.3)"} borderRadius={8} p={3} textAlign={"center"} w={"49%"} flexDirection={"column"}>
                                        <Text>APY: {mockProductDetails.apy}</Text>
                                        <Text>Staking Asset: {mockProductDetails.stakingAsset}</Text>
                                    </Flex>
                                    <Flex bg={"rgba(77, 25, 120, 0.3)"} borderRadius={8} p={3} textAlign={"center"} w={"49%"} flexDirection={"column"}>
                                        <Text>Underlying Asset: {mockProductDetails.underlyingAsset}</Text>
                                        <Text>Duration: {mockProductDetails.duration}</Text>
                                    </Flex>
                                </Flex>

                                <Flex justifyContent={"space-between"} marginTop="10px" textAlign={"center"}>
                                    <Box bg={"rgba(77, 25, 120, 0.3)"} borderRadius={8} p={3} w={"49%"}>
                                        <Text fontWeight="bold" fontSize={'medium'}>Your Investment</Text>
                                        <Text>Shares: {item.holdingTargetAmount}</Text>
                                        <Text>Invested: {(parseFloat(item.holdingTargetAmount) * 44000).toFixed(2)} USDe</Text>
                                    </Box>
                                    <Box bg={"rgba(77, 25, 120, 0.3)"} borderRadius={8} p={3} w={"49%"}>
                                        <Text fontWeight="bold" fontSize={'medium'}>Unrealized Return</Text>
                                        <Text>{expectedProfit.toFixed(2)} USDe</Text>
                                    </Box>
                                </Flex>

                                {/* Part 4: Expected Profit */}
                                <Box marginTop="20px" w={"100%"}>
                                    <div style={{ "display": "flex", justifyContent: "center" }}>
                                        <Web3Button
                                            contractAddress={DELTA_VAULT_PRODUCT_ADDRESS}
                                            contractAbi={DELTA_VAULT_PRODUCT_ABI}
                                            action={(contract) => {
                                                contract.call("claimReward")
                                            }}
                                            onSubmit={() => console.log("Transaction submitted")}
                                        >
                                            Withdraw
                                        </Web3Button>
                                    </div>
                                </Box>

                            </Box>
                        );
                    })}
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default PortfolioPage;
