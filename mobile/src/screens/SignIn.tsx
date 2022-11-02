import { Center, Text } from "native-base";
import { FunctionComponent } from "react";

export const SignIn: FunctionComponent = () => {
  return (
    <Center flex={1} bgColor="gray.900">
      <Text color="white" fontSize={24}>
        SignIn!
      </Text>
    </Center>
  )
}