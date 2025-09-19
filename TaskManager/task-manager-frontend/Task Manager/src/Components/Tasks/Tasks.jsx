import { useMutation , useQueryClient} from "@tanstack/react-query";
import "../Tasks/Tasks.css";
import axios from "axios";

export function Tasks({ id , title, description, createdDate , tags }) {

  const {mutate} =useMutation({
    mutationFn: (id) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"]
      })
    }

  })
  
  const queryClient = useQueryClient();

  async function deleteTask(id){
    await axios.delete(`http://localhost:5000/tasks/${id}`)
  }

  return (
    <>
      <div className="task-container">
        <div className="task-header">
          <p className="task-title">{title}</p>
          <button 
            className="delete-task-btn"
            onClick={() => {mutate(id)}}
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>

        <div className="task-body">
          <p className="task-description">
            {description}
          </p>
        </div>

        <div className="task-footer">
          <p className="task-created-date">
            <i
              className="fa-regular fa-calendar"
              style={{ color: "#969697" }}
            ></i>
            2023-08-20
          </p>

          <div className="tags-container">
            {
              tags.length !== 0 && tags.map(tag => (
                <Tags
                  tagsName={tag}
                  key={crypto.randomUUID()}
                />
              ))
            }
            
          </div>
        </div>
      </div>
    </>
  );
}

function Tags({tagsName}) {
  return (
    <span className="task-tags">
      <i
        className="fa-solid fa-tag fa-xs"
        style={{ color: "rgba(52, 83, 209, 0.847)" }}
      ></i>
      {tagsName}
    </span>
  );
}
