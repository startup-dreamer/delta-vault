import { Link, Flex, Grid, GridItem, Text, Image, Button, VStack, HStack, Badge, Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react';
import { EmptyState } from "../components/ui/empty-state";
import { GrInProgress } from "react-icons/gr";
import NextLink from "next/link";

const ProductsPage = () => {
    const products = [
        {
            id: 1,
            name: 'Bullish Snowball (BTC)',
            apy: '18%',
            description: 'UP TO 18% Fixed APY', // Adjust the XX% to match the actual APY you've provided
            underlyingAsset: 'BTC',
            stakingAsset: 'USDe',
            duration: '28 Days',
            imageUrl: '/images/bullishSnowball.png', // Replace with the path to your image
            pageUrl: '/bullish-snowball', // Replace with the path to your product page
            backImage: "linear-gradient(135deg, rgba(38,79,68,1) 50%, #24273d)",
            icon: "/images/USDe_icon.png",
            icon1: "/images/Bitcoin_logo.png"
        },
        {
            id: 2, // Corrected ID for the second product
            name: 'Bearish Snowball (BTC)',
            apy: '19%',
            description: 'UP TO 19% Fixed APY', // Adjust the XX% to match the actual APY you've provided
            underlyingAsset: 'BTC',
            stakingAsset: 'wBTC',
            duration: '28 Days',
            imageUrl: '/images/bearishSnowball.png', // Replace with the path to your image
            pageUrl: '/bearish-snowball', // Replace with the path to your product page
            backImage: "linear-gradient(135deg, rgba(255, 120, 120,0.7) 50%, #24273d)",
            icon: "/images/Bitcoin_logo.png",
            icon1: "/images/USDe_icon.png"
        },
        // ... add more products as needed
    ];

    return (
        <Flex flexDirection={"column"} justifyContent={"flex-start"} width={"100%"} bg={"linear-gradient(160deg, black 40%, #2b1b42)"} color={"white"} padding={"20px 35px"} gap={"20"} height={"100vh"}>
            <Tabs defaultIndex={0} variant="soft-rounded" width={"100%"} colorScheme='blue'>
                <Grid templateColumns="repeat(3, 1fr)" gap="6">
                    <GridItem colSpan={1}></GridItem>
                    <GridItem colSpan={1}>
                        <Heading fontSize="4xl" textAlign={"center"} fontWeight="bold">Products</Heading>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <TabList justifyContent={"right"}>
                            <Tab>Snowballs</Tab>
                            <Tab>Projects</Tab>
                            <Tab>Others</Tab>
                        </TabList>
                    </GridItem>
                </Grid>
                <TabPanels>
                    <TabPanel>
                        <HStack spacing={4} mt={4} wrap="wrap" justify="space-evenly" padding={"20px"}>
                            {products.map((product) => (
                                <VStack key={product.id} background={product.backImage} m={2} spacing={3} borderRadius={8}>
                                    <Flex flexDirection={"column"}>
                                        <div style={{ "position": "relative" }}>
                                            <Image src={product.imageUrl} alt={product.name} height={350} borderRadius={"50%"} p={17} />
                                            <Badge colorScheme="green" textAlign={"center"} position={"absolute"} bottom={7} right={3}>
                                                {product.apy} FIXED APY
                                            </Badge>
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    right: "48px",
                                                    top: "35px",
                                                }}
                                            >
                                                <Image src={product.icon} alt="Ethena Logo" width={"35px"} borderRadius={"50%"}/>
                                                <div
                                                    style={{
                                                        "position": "absolute",
                                                        "top": "-8px",
                                                        "right": "-8px"
                                                    }}
                                                >
                                                    <Image src={product.icon1} alt="Ethena Logo" boxSize="22px" borderRadius={"50%"} />
                                                </div>
                                            </div>
                                        </div>
                                        <Flex direction={"column"} p={"8px 10px 15px 10px"} textAlign={"center"} gap={"3"}>
                                            <Text fontSize="22px" fontWeight="bold">{product.name}</Text>
                                            <Flex direction={"column"} background={"rgba(133, 153, 201, 0.3)"} borderRadius={6} p={3}>
                                                <Text fontSize="sm" fontWeight={"bold"}>{`Duration: ${product.duration}`}</Text>
                                                <Text fontSize="sm" fontWeight={"bold"}>{`Staking Asset: ${product.stakingAsset}`}</Text>
                                                <Text fontSize="sm" fontWeight={"bold"}>{`Underlying Asset: ${product.underlyingAsset}`}</Text>
                                            </Flex>
                                            <Link as={NextLink} href={product.pageUrl}>
                                                <Button width={"100%"} colorScheme="purple">Explore Option</Button>
                                            </Link>
                                        </Flex>
                                    </Flex>
                                </VStack>
                            ))}
                        </HStack>
                    </TabPanel>
                    <TabPanel padding={"30px 0"}>
                        <EmptyState
                            icon={<GrInProgress />}
                            title="Coming Soon"
                            description="This product is under development. Please check back later."
                        />
                    </TabPanel>
                    <TabPanel padding={"30px 0"}>
                        <EmptyState
                            icon={<GrInProgress />}
                            title="Coming Soon"
                            description="This product is under development. Please check back later."
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
};

export default ProductsPage;
