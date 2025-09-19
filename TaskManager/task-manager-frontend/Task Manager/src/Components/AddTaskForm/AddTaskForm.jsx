import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import "../AddTaskForm/AddTaskForm.css";

export function AddTaskForm({ isTaskFormVisible, setIsTaskFormVisible }) {
  const [titleVal, setTitleVal] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");
  const [tagsVal, setTagsVal] = useState("");

  const { mutate } = useMutation({
    mutationFn: (data) => createTask(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      setTitleVal("");
      setDescriptionVal("");
      setTagsVal("");
      setIsTaskFormVisible(false);
    },

    onError: (error) => console.log(error),
  });

  async function createTask(data) {
    await axios.post("http://localhost:5000/tasks", {
      title: data.title,
      description: data.description,
      tags: data.tags,
    });
  }

  const queryClient = useQueryClient();

  return (
    <>
      <div className="blur-background"></div>
      <div className={`add-new-task-form ${isTaskFormVisible ? "show" : ""}`}>
        <form className="add-new-task-body">
          <h2>Add New Task</h2>

          <fieldset className="form-field">
            <label htmlFor="title" className="label-text">
              Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter task title"
              required
              onChange={(e) => setTitleVal(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-field">
            <label htmlFor="tags" className="label-text">
              Tags:
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="e.g., work, personal"
              onChange={(e) => setTagsVal(e.target.value)}
            />
          </fieldset>

          <fieldset className="form-field">
            <label htmlFor="description" className="label-text">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              cols="50"
              rows="10"
              placeholder="Enter task description"
              onChange={(e) => setDescriptionVal(e.target.value)}
            ></textarea>
          </fieldset>

          <div className="form-actions">
            <button
              type="button"
              className="close-task-btn"
              onClick={() => {
                setIsTaskFormVisible(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-task-btn"
              onClick={() =>
                mutate({
                  title: titleVal,
                  description: descriptionVal,
                  tags: tagsVal
                    .split(" ")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0),
                })
              }
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
