import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import valut_image from "../public/images/vault-case-image.png";
import { NextPage } from "next";
import { Container, Flex, Stack, Heading, Button, color, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Home: NextPage = () => {
    return (
        <Container maxWidth="100%" bg={"linear-gradient(150deg, black 30%, #2b1b42)"} color={"white"} overflow={"hidden"}>
            <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} >
                {/* Flex Top Vault */}
                <Flex width={"95%"} height={"60vh"} alignItems={"center"} justifyContent={"space-between"} margin={"50px 0"}>
                    <div
                        style={{ 'boxShadow': '6px 6px 1px 3px #5e72f2', 'borderRadius': '50%' }}
                    >
                        <Image src={valut_image} alt="logo" width={400} height={400} />
                    </div>
                    <Flex width={"65%"} direction={"column"} alignItems={"flex-end"} justifyContent={"center"} gap={"6"}>
                        <Heading fontSize={"5xl"}>
                            Secured <span style={{ "color": "#aea3ff" }}>
                                Transactions
                            </span> from Delta Vault
                        </Heading>
                        <Text fontSize={"xl"} align={"right"} color={"lightgrey"}>
                            Get the most secured and seamless transactions for Bitcoin with Delta Vault. With advanced encryption and transparent processes, your assets are always protected. Manage your crypto with confidence and ease and secure the future with Delta Vault.
                        </Text>
                        <Flex gap={"18"}>
                            <Flex bg={"#160738"} padding={"10px 40px"} borderRadius={"10px"} direction="column" gap={2} justifyContent={"center"} alignItems={"center"} height={"100%"} rowGap={"1"}>
                                <Heading fontSize="md" >TOTAL VALUE LOCKED</Heading>
                                <Text fontSize="lg" color={"#4287f5"} fontWeight="bold" >$ 9,018,623.78</Text>
                            </Flex>
                            <Button as={NextLink}
                                href='/products'
                                size="lg" // Predefined large size
                                bg="#aea3ff"
                                sx={{
                                    fontSize: '18px', // Custom font size
                                    padding: '35px', // Custom padding
                                }}>Explore Products
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex width={"103%"} justifyContent={"flex-start"} gap={"10"} height={"60vh"} alignItems={"center"}>
                    <div
                        style={{
                            "display": "flex",
                            "justifyContent": "center",
                            alignItems: "center",
                            width: "30%",
                            "borderRight": "4px solid white",
                            padding: "0 30px",
                            height: "40%"
                        }}
                    >
                        <Heading size={"2xl"} textAlign={"right"} color={"#7f79db"}>
                            Higher yields in volatile market environments
                        </Heading>
                    </div>
                    <div
                        style={{
                            "display": "flex",
                            "justifyContent": "center",
                            alignItems: "center",
                            width: "65%",
                            height: "40%"
                        }}
                    >
                        <Text fontSize={"2xl"} align={"left"}>
                            Get the most secured transactions and navigate market fluctuations with confidence using Delta Vault. Our secure transactions and advanced strategies ensure you achieve higher yields while safeguarding your assets. Whether the market rises or falls, we help you stay ahead, grow consistently, and achieve financial goals with ease.
                        </Text>
                    </div>
                </Flex>
            </Flex>
        </Container>
    );
};

export default Home;
