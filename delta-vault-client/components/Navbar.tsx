import { Avatar, Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from "next/link";

export function Navbar() {
    const address = useAddress();

    return (
        <Box mx={"auto"} px={"40px"} py={"20px"} bg={"black"} color={"white"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Link as={NextLink} href='/'>
                    <Heading>DeltaVault</Heading>
                </Link>
                <Flex dir={"row"} alignItems={"center"} gap={"12"}>
                    <Link as={NextLink} href='/products' mx={2.5}>
                        <Text fontSize={"xl"}>Products</Text>
                    </Link>
                    <Link as={NextLink} href='/portfolio' mx={2.5}>
                        <Text fontSize={"xl"}>Portfolio</Text>
                    </Link>
                    <ConnectWallet theme="dark" />
                </Flex>
            </Flex>
        </Box>

    );

}