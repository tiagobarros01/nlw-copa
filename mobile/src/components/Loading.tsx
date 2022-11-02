import { Center, Spinner } from "native-base";
import { FunctionComponent } from "react";

export const Loading: FunctionComponent = () => {
  return (
    <Center flex={1} bg="gray.900">
      <Spinner color="yellow.500" />
    </Center>
  )
}