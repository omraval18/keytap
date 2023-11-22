import { FC, useContext, useRef, useMemo, useEffect, useState } from "react";
import { css } from "@emotion/css";

import WindSvg from "../assets/wind.svg";
import MedalSvg from "../assets/medal.svg";
import TypoSvg from "../assets/typo.svg";
import { SpaceBox } from "./common";
import { KeyboardStatus } from "../context/global";

import globalContext from "../context/global";

interface ItemProps {
    icon: string;
    data: number;
    label: string;
    isPercent?: boolean;
}

const Item: FC<ItemProps> = ({ icon, data, label, isPercent = false }) => {
    return (
        <div className="f a-c">
            <div
                className={css`
                    width: 60px;
                    height: 60px;
                    background-color: #414044;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `}
            >
                <img src={icon} height={30}></img>
            </div>
            <div
                className={css`
                    color: white;
                    margin-left: 16px;
                `}
            >
                <div>
                    <span
                        className={css`
                            font-size: 44px;
                        `}
                    >
                        {data}
                    </span>
                    {isPercent && (
                        <span
                            className={css`
                                font-size: 14px;
                                margin-left: 4px;
                            `}
                        >
                            %
                        </span>
                    )}
                </div>
                <div
                    className={css`
                        color: #9b9c9a;
                        font-size: 12px;
                    `}
                >
                    {label}
                </div>
            </div>
        </div>
    );
};

const Statistics: FC<{}> = () => {
    const { text, stat, input, setInput, setStat, durationTimer, status } =
        useContext(globalContext);
    const accuracy = useRef(stat.accuracy);
    const [speeds, setSpeeds] = useState<number[]>([]);

    useEffect(() => {
        if (input.length === 0) {
            accuracy.current = 100;
        } else {
            accuracy.current = ((input.length - stat.typos) / input.length) * 100;
        }
        console.log(durationTimer.duration);
    }, [text, input.length]);

    useEffect(() => {
        if (text !== prevText.current) {
            setInput("");
            setStat((prevStat) => ({ ...prevStat, typos: 0 }));
        }
        prevText.current = text;
    }, [text]);

    const prevText = useRef(text);

    const speed = useMemo(() => {
        if (durationTimer.duration == 0) return 0;
        return Math.floor((input.length / 5 / durationTimer.duration) * 60);
    }, [durationTimer.duration, text]);

    return (
        <div className="f">
            <Item icon={WindSvg} data={speed} label="Words/Min" />
            <SpaceBox width={120} />
            <Item icon={MedalSvg} data={Math.floor(accuracy.current)} label="Accuracy" isPercent />
            <SpaceBox width={120} />
            <Item icon={TypoSvg} data={stat.typos} label="Typos" />
        </div>
    );
};

export default Statistics;
