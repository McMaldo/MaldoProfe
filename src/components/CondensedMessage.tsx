/**
 * `CondensedMessage` returns a condensed message with a tooltip
 * shows an ellipsis icon when the message is truncated, if hovered, it will show the full message in a tooltip.
 *
 * @version 1.0.0
 */
import { FC, useState } from "react";
import FaIcon from "./FaIcon";

const CondensedMessage: FC<{
  msg: string;
  onHoverChange?: (hovered: boolean) => void;
}> = ({ msg, onHoverChange }) => {
  const [isHovered, setHovered] = useState(false);
  const handleEnter = () => {
    setHovered(true);
    onHoverChange?.(true);
  };
  const handleLeave = () => {
    setHovered(false);
    onHoverChange?.(false);
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="z-9 relative px-2 rounded-sm bg-base h-full"
    >
      <FaIcon name="ellipsis" />
      <div
        id="msg"
        className={`z-10 absolute p-2 top-[calc(100%+.25rem)] right-0 bg-crust border border-base rounded-md text-nowrap text-surface-1 ${isHovered ? "flex flex-col gap-1" : "hidden"}`}
      >
        {msg.length ? (
          msg
            .split("\n")
            .map((row: string, index: number) => <span key={index}>{row}</span>)
        ) : (
          <span>{msg}</span>
        )}
      </div>
    </div>
  );
};
export default CondensedMessage;
