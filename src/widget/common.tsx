import { FC } from "react";

export const SpaceBox: FC<{ width?: number; height?: number }> = ({ width = 0, height = 0 }) => {
    return <div style={{ width, height }}></div>;
};
