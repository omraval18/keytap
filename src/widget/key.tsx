import { FC, useContext, useEffect, useMemo, useState } from "react";
import { css, cx } from "@emotion/css";
import { onKeydown } from "../events";

import globalContext from "../context/global";

export enum KeyWidth {
    w0 = 72,
    w1 = 84,
    w2 = 98,
    w3 = 128,
    wSpace = 312,
}

interface KeyProps {
    code: string;
    hint?: boolean;
    textPosition?: "cc" | "ct" | "cl" | "cr" | "cb" | "lb" | "rb";
    fontSize?: number;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const Key: FC<KeyProps> = ({
    code,
    hint = false,
    textPosition = "cc",
    fontSize = 14,
    height = 54,
    width = 54,
    style,
    children,
}) => {
    const [highlightCss, setHighlightCss] = useState("");

    const textPositionCss = useMemo<string>(() => {
        switch (textPosition) {
            case "cc":
                return `align-items: center; justify-content: center;`;
            case "cl":
                return "justify-content: center;";
            case "cr":
                return "align-items: flex-end; justify-content: center;";
            case "cb":
                return "align-items: center; justify-content: flex-end;";
            case "lb":
                return "justify-content: flex-end;";
            case "rb":
                return "align-items: flex-end; justify-content: flex-end;";
        }
        return "";
    }, [textPosition]);

    const highlight = (color: string, duration = 3) => {
        setHighlightCss(`
      background-color: ${color};
    `);

        setTimeout(() => {
            setHighlightCss(`
        transition: background-color ${duration}s;
        background-color: unset;
      `);
        }, 200);
    };

    useEffect(() => {
        return onKeydown((e) => {
            if (e.code == code) {
                highlight("var(--key-pressed)", 0.8);
            }
        });
    }, [code]);

    return (
        <div
            style={style}
            className={cx(
                hint ? "key-breath" : "",
                css`
                    font-size: ${fontSize}px;
                    height: ${height}px;
                    width: ${width}px;
                    font-weight: 600;
                    color: var(--key-font);
                    border: 1px solid var(--key-border);
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    padding: 4px;
                    ${highlightCss}
                    ${textPositionCss}
                `
            )}
        >
            {children}
        </div>
    );
};

export default Key;
