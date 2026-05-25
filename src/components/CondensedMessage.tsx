/**
 * `CondensedMessage` returns a condensed message with a tooltip
 * shows an ellipsis icon when the message is truncated, if hovered, it will show the full message in a tooltip.
 *
 * @version 1.0.0
 */
import { FC } from "react";
import FaIcon from "./FaIcon";

const CondensedMessage: FC<{
  msg: string;
}> = ({ msg }) => {
  return (
    <div className="group z-9 relative px-2 rounded-sm bg-base h-full">
      <FaIcon name="ellipsis" />
      <div
        id="msg"
        className="z-10 absolute p-2 top-[calc(100%+.25rem)] right-0 bg-crust border border-base rounded-md text-nowrap text-surface-1 hidden group-hover:flex group-hover:flex-col group-hover:gap-1"
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
