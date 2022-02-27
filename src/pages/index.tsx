import { Accessor, createSignal, Index } from "solid-js";
import { TaskForm, TaskFormSubmitButton } from "~/components/Form";
import { Task, TaskDone, TaskTitle } from "~/components/Task";
import type { Task as ITask } from "~/_types";

export default function Home() {
  const [tasks, setTasks] = createSignal<Array<ITask>>([]);
  const [desc, setDesc] = createSignal<string>("");

  const onSetDoneHandler = ({ task }: { task: Accessor<ITask> }) => {
    setTasks(
      tasks().map((item) =>
        item.id === task().id
          ? {
              ...item,
              done: !item.done,
            }
          : item
      )
    );
  };

  const onAddTaskHandler = (event: SubmitEvent) => {
    event.preventDefault();
    if (desc().trim().length > 0) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          description: desc(),
          id: tasks().length === 0 ? 0 : tasks()[tasks().length - 1].id + 1,
          done: false,
        },
      ]);
      setDesc("");
    }
  };

  return (
    <main>
      <h1>Tasks</h1>

      <TaskForm onAddTaskHandler={onAddTaskHandler}>
        <>
          <input
            type="text"
            name="description"
            id="description"
            value={desc()}
            onChange={(event) => {
              setDesc(event.currentTarget.value);
            }}
          />
          <TaskFormSubmitButton>Add task ➕</TaskFormSubmitButton>
        </>
      </TaskForm>

      <section>
        <ul>
          <Index each={tasks()}>
            {(task, i) => {
              return (
                <Task task={task}>
                  <TaskTitle>
                    {task().id + 1} - {task().description}
                  </TaskTitle>
                  <TaskDone onSetDoneHandler={onSetDoneHandler} task={task} />
                </Task>
              );
            }}
          </Index>
        </ul>

        <pre>{JSON.stringify(tasks(), null, 2)}</pre>
      </section>
    </main>
  );
}
