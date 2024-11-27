import { Box, VStack, Text, Flex } from "@chakra-ui/react";
import * as React from "react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: any; // For additional props
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props;

    return (
      <Flex
        ref={ref}
        direction="column"
        align="center"
        justify="center"
        p={40}
        bg="grey.200"
        rounded="lg"
        shadow="md"
        {...rest}
      >
        {icon && (
          <Box mb={4} fontSize="4xl" color={"white"}>
            {icon}
          </Box>
        )}
        <VStack spacing={2} textAlign="center" color={"white"}>
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
          {description && (
            <Text fontSize="md" color="gray.200">
              {description}
            </Text>
          )}
        </VStack>
        {children && <Box mt={4}>{children}</Box>}
      </Flex>
    );
  }
);
