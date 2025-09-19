import { Tasks } from "../Tasks/Tasks";
import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../HomePage/HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../utils/loadingspinner/LoadingSpinner";

export function HomePage() {
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [activeGrid, setActiveGrid] = useState(true);
  const [activeCalander, setActiveCalander] = useState(false);

  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: getTasks,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
  });

  useEffect(() => {
    if (isTaskFormVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isTaskFormVisible]);

  const filtered = data?.pages?.flatMap((page) =>
    page.tasks?.filter((task) =>
      task.title.toLowerCase().includes(inputVal.toLowerCase())
    )
  );

  async function getTasks({ pageParam = 1 }) {
    const response = axios.get(
      `http://localhost:5000/tasks?page=${pageParam}&limit=10`
    );
    return (await response).data;
  }

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <DotLottieReact
        src="https://lottie.host/f90aa3b4-5ebe-4d21-8220-495cb4deb6fb/k4SF16aU6B.lottie"
        loop
        autoplay
        style={{
          width: "300px",
          height: "300px",
          position: "fixed",
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
        }}
      />
    );

  return (
    <>
      <div className="header">
        <div className="header-left">
          <i
            className="fa-solid fa-magnifying-glass fa-sm"
            style={{ color: "#a0a0a2" }}
          ></i>
          <input
            type="text"
            placeholder="Search..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>

        <div className="header-right">
          <i
            className="fa-regular fa-bell fa-sm"
            style={{ color: "#a0a0a2" }}
          ></i>
          <i
            className="fa-solid fa-circle-user"
            style={{ color: "#107bf7" }}
          ></i>
          <p className="account-name">yesehak kebere</p>
        </div>
      </div>

      <p className="task-manager-text">Task Manager</p>

      <div className="display-buttons">
        <div className="display-buttons-left">
          <button
            className={`grid-view-btn ${activeGrid ? "active-btn" : ""}`}
            onClick={() => {
              setActiveGrid(true);
              setActiveCalander(false);
            }}
          >
            <i className="fa-solid fa-grip"></i>
            Roomy
          </button>

          <button
            className={`calender-view-btn ${
              activeCalander ? "active-btn" : ""
            }`}
            onClick={() => {
              setActiveGrid(false);
              setActiveCalander(true);
            }}
          >
            <i className="fa-regular fa-calendar"></i>
            Calander
          </button>
        </div>

        <div className="display-buttons-right">
          <button
            className="add-new-task-btn"
            onClick={() => {
              setIsTaskFormVisible(true);
            }}
          >
            <i className="fa-solid fa-plus" style={{ color: "#fafbfd" }}></i>
            New Task
          </button>
        </div>
      </div>

      <div className="task-grid">
        {filtered?.map((task) => (
          <Tasks
            key={task._id}
            title={task.title}
            description={task.description}
            createdDate={task.createdDate}
            tags={task.tags}
            id={task._id}
          />
        )) || (
          <p className="no-task-text">
            🎉 You have no tasks yet! Click the <strong>"New Task"</strong>{" "}
            button above to add your first task.
          </p>
        )}
      </div>

      {filtered?.length === 0 && isFetching ? (
        <LoadingSpinner />
      ) : hasNextPage ? (
        <p className="no-task-text">Load more</p>
      ) : (
        <p className="no-task-text">You have reached the end</p>
      )}

      {isTaskFormVisible && (
        <AddTaskForm
          isTaskFormVisible={isTaskFormVisible}
          setIsTaskFormVisible={setIsTaskFormVisible}
        />
      )}
    </>
  );
}
