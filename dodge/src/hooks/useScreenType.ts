import { useMediaQuery } from "@chakra-ui/react";
export const useScreenType = () => {
    const is3Cols = useMediaQuery("(min-width: 1336)");
    const is2Cols = useMediaQuery("(min-width: 1265)");
    const is1Cols = useMediaQuery("(min-width: 800)");
    if (is3Cols) {
        return "3-cols";
    }
    if (is2Cols) {
        return "2-cols";
    }
    if (is1Cols) {
        return "1-cols";
    }
    return "fullscreen";
};
