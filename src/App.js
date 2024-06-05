import "./App.css";
import Course from "./Course.js";
import { useEffect, useState } from "react";
import Appbar from "./appbar.js";
import { TextField, Box, Paper, Button } from "@mui/material";

function App() {
  const [courses, setCourses] = useState([]);
  const [input_text, setInput_text] = useState("");
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

  function btnAddHandler() {
    if (input_text.trim() === "") {
      alert("Course name cannot be empty!");
      return;
    }

    const courseExists = courses.some((course) => course.cname === input_text);
    if (courseExists) {
      alert("This course already exists!");
      return;
    }

    const newCourse = {
      cname: input_text,
      isConfirmed: 0, // New courses are not confirmed by default
    };

    setCourses((prevList) => [...prevList, newCourse]);
    setInput_text(""); // Clear input field after adding the course
  }

  function btnConfirmHandler(cname) {
    const updatedList = courses.map((course) =>
      course.cname === cname ? { ...course, isConfirmed: 1 } : course
    );
    setCourses(updatedList);
  }

  function btnEditHandler(oldName, newName) {
    if (newName.trim() === "") {
      alert("Course name cannot be empty!");
      return;
    }
  
    const courseExists = courses.some((course) => course.cname === newName && course.cname !== oldName);
    if (courseExists) {
      alert("This course already exists!");
      return;
    }
  
    const updatedList = courses.map((course) =>
      course.cname === oldName ? { ...course, cname: newName } : course
    );
    setCourses(updatedList);
  
    // Send PUT request to update the course in the database
    fetch("http://localhost/lab.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ oldName: oldName, name: newName, isConfirmed: 1 }]), // Adjust isConfirmed based on your logic
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((responseText) => {
        console.log("Response:", responseText);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  

  function btnDeleteHandler(cname) {
    const updatedList = courses.filter((course) => course.cname !== cname);
    setCourses(updatedList);
    deleteCourseFromDatabase(cname);
  }

  function saveCoursesToDatabase() {
    let manualJSON = {};

    courses.forEach((course, index) => {
      manualJSON[index] = {
        name: course.cname,
        isConfirmed: course.isConfirmed,
      };
    });

    fetch("http://localhost/lab.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(manualJSON),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((responseText) => {
        console.log("Response:", responseText);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteCourseFromDatabase(courseName) {
    fetch("http://localhost/lab.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ name: courseName }]),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((responseText) => {
        console.log("Response:", responseText);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    fetchAndDisplayData();
  }, []);

  useEffect(() => {
    saveCoursesToDatabase();
  }, [courses]);

  function fetchAndDisplayData() {
    if (!courses.length) {
      fetch("http://localhost/reactAss.php")
        .then((response) => response.json())
        .then((data) => {
          const courses = data.map((courseData) => ({
            cname: courseData.name,
            isConfirmed: courseData.isConfirmed,
          }));
          setCourses(courses);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <div className="App">
      <Appbar />
      <Paper elevation={3} style={paperStyle}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Course Name"
            variant="standard"
            value={input_text}
            fullWidth
            onChange={(e) => setInput_text(e.target.value)}
          />

          <Button variant="contained" onClick={btnAddHandler}>
            Add
          </Button>
        </Box>
      </Paper>

      <div>
        {courses.map((course) => (
          <Course
            key={course.cname}
            cname={course.cname}
            isConfirmed={course.isConfirmed}
            confirmHandler={btnConfirmHandler}
            editHandler={btnEditHandler}
            deleteHandler={btnDeleteHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
