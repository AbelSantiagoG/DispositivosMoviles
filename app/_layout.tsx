import { Stack } from "expo-router";

import "../global.css";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name= "index" />
    </Stack>
  )
}

export default HomeLayout 
