import { children, JSX, PropsWithChildren } from "solid-js";

export const TaskForm = ({
  children,
  onAddTaskHandler,
}: PropsWithChildren<{
  onAddTaskHandler: (
    event: Event & {
      submitter: HTMLElement;
    }
  ) => void;
}>) => <form onSubmit={onAddTaskHandler}>{children}</form>;

export const TaskFormSubmitButton = (props: PropsWithChildren<{}>) => (
  <button type="submit">{props.children}</button>
);
