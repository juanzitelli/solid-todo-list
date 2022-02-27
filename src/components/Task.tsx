import { JSX, Accessor, PropsWithChildren } from "solid-js";
import type { Task as ITask } from "~/_types";
//@ts-expect-error
import { completed } from "./../styles/task.module.css";

export const Task = ({
  children,
  task,
}: PropsWithChildren<{ task: Accessor<ITask> }>) => {
  return (
    <li classList={{ [completed]: task().done }}>
      <article>{children}</article>
    </li>
  );
};

export const TaskTitle = ({ children }: PropsWithChildren<{}>) => {
  return <h2>{children}</h2>;
};

export const TaskDone = ({
  onSetDoneHandler,
  task,
}: PropsWithChildren<{
  onSetDoneHandler: ({ task }: { task: Accessor<ITask> }) => void;
  task: Accessor<ITask>;
}>) => {
  return (
    <label htmlFor="done">
      Completed
      <input
        onChange={() => onSetDoneHandler({ task })}
        type="checkbox"
        name="done"
        id="done"
        checked={task().done}
      />
    </label>
  );
};
