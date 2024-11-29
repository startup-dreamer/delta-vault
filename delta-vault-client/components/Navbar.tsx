import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from "next/link";
import Image from "next/image";
export function Navbar() {
    const address = useAddress();

    return (
        <Box mx={"auto"} px={"40px"} py={"20px"} bg={"black"} color={"white"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Link as={NextLink} href='/'>
                    <Flex justifyContent={"center"} alignItems={"center"} gap={3}>
                        <Image src={"/images/DV_Logo_nobg.png"} alt="Delta Vault Logo" width={45} height={25} />
                        <Heading>DeltaVault</Heading>
                    </Flex>
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