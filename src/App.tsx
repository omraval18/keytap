import { FC, useContext, useEffect, useState } from "react";
import { MacKeyBoard } from "./widget/keyboard";

import TextChecker from "./widget/text-checker";
import Statistics from "./widget/statistics";

import generateText from "./generator/text";
import globalContext from "./context/global";
import HiddenInput from "./widget/hidden-input";
import { Keyboard } from "lucide-react";

const App: FC = () => {
    const { text, setText } = useContext(globalContext);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                setVisible((prevVisible) => !prevVisible);
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div>
            <p
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    marginLeft: "20px",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "10px",
                    color: "GrayText",
                }}
            >
                {" "}
                Press &nbsp;
                <p
                    style={{
                        padding: "2px",
                        border: "solid 0.5px grey",
                        borderRadius: "2px",
                        background: "grey",
                        color: "black",
                    }}
                >
                    enter
                </p>{" "}
                &nbsp; to start Typing
            </p>
            <p
                style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    marginRight: "20px",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "10px",
                    color: "GrayText",
                }}
            >
                {" "}
                Toggle Keyboard with CTRL + K or &nbsp;
                <Keyboard
                    color={visible ? "#ffffff" : "GrayText"}
                    onClick={() => setVisible(!visible)}
                />
            </p>
            <div className="f-col a-c">
                <Statistics />
                <TextChecker
                    text={text}
                    fontSize={visible ? "16px" : "32px"}
                    lineHeight={visible ? "24px" : "48px"}
                />
                <HiddenInput
                    onFinished={() => {
                        setText(generateText({}));
                    }}
                />
                {visible && <MacKeyBoard />}
            </div>
        </div>
    );
};

export default App;
