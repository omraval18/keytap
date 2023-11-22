import { css } from "@emotion/css";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { onKeydown } from "../events";

import globalContext, { KeyboardStatus } from "../context/global";

const TextCheckerCss = css`
    color: var(--font);
    margin: 80px 0px;
    letter-spacing: 0.1rem;
    line-height: 48px;
    text-align: center;

    @media only screen and (min-width: 1025px) {
        padding: 0 10% 0 10%;
    }
    @media only screen and (min-width: 1279px) {
        padding: 0 15% 0 15%;
    }
    @media only screen and (min-width: 1365px) {
        padding: 0 18% 0 18%;
    }
    @media only screen and (min-width: 1439px) {
        padding: 0 20% 0 20%;
    }
    @media only screen and (min-width: 1679px) {
        padding: 0 22% 0 22%;
    }
    @media only screen and (min-width: 1924px) {
        padding: 0 25% 0 25%;
    }
`;

enum LetterStatus {
    cursor,
    correct,
    typo,
}

interface LetterProps {
    children?: React.ReactNode;
    status?: LetterStatus;
}

const Letter: FC<LetterProps> = ({ status, children }) => {
    const statusCss = useMemo(() => {
        switch (status) {
            case LetterStatus.cursor:
                return "background-color: #5AA3E8;";
            case LetterStatus.correct:
                return `color: var(--letter-correct)`;
            case LetterStatus.typo:
                if (children === " ") {
                    return `background-color: var(--letter-typo)`;
                }
                return `color: var(--letter-typo)`;
        }
        return "";
    }, [status]);

    return (
        <span
            className={css`
                ${statusCss}
            `}
        >
            {children}
        </span>
    );
};

interface TextCheckerProps {
    text: string;
    textStyle: string;
}

const TextChecker: FC<TextCheckerProps> = ({ text, textStyle }) => {
    const { input, status, setStatus, setStat } = useContext(globalContext);
    const [inputLen, setInputLen] = useState(input.length);

    const letters = [...text];

    useEffect(() => {
        return onKeydown((e) => {
            if (e.code === "Enter" && status === KeyboardStatus.ready) {
                setStatus(KeyboardStatus.recording);
            }
        });
    }, [status]);

    useEffect(() => {
        if (status !== KeyboardStatus.recording) return;

        // if backspacing, do not record typos.
        if (input.length < inputLen) return;

        if (input[input.length - 1] != text[input.length - 1]) {
            setStat((stat) => ({
                ...stat,
                typos: stat.typos + 1,
            }));
        }
    }, [input, text, status]);

    useEffect(() => {
        setInputLen(input.length);
    }, [input]);

    return (
        <div className={TextCheckerCss} id={textStyle}>
            {letters.map((letter, i) => {
                let status: LetterStatus | undefined;

                if (input.length > i) {
                    status = input[i] == letter ? LetterStatus.correct : LetterStatus.typo;
                } else if (input.length === i) {
                    status = LetterStatus.cursor;
                }

                return (
                    <Letter key={i} status={status}>
                        {letter}
                    </Letter>
                );
            })}
        </div>
    );
};

export default TextChecker;
