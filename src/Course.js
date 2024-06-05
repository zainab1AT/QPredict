import React, { useState } from "react";
import { Button,TextField,Box} from '@mui/material';


function Course(props) {
  const { cname, isConfirmed, confirmHandler, editHandler, deleteHandler } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(cname);

  const handleConfirm = () => {
    confirmHandler(cname);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editHandler(cname, newName);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteHandler(cname);
  };

  return (
    <div className="course">
      {isEditing ? (
     
        <TextField id="outlined-disabled" value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus/>

      ) : (
        <TextField disabled id="outlined-disabled" value={cname}/>

      )}
      {isConfirmed == 0 && (
        <>
          {isEditing ? (
            <Button
            style={{ color: "#FFFFFF", backgroundColor: "#378CE7" }}
            onClick={handleSave}
          >
            Save
          </Button>

          ) : (
            <>
              <Button
                style={{ color: "#FFFFFF", backgroundColor: "#378CE7" }}
                onClick={handleEdit}
              >
                Edit
              </Button>
              
              <Button
                style={{ backgroundColor: "#54B435", color: "#FFFFFF" }}
                onClick={handleConfirm}
              >
                {isConfirmed ? "Confirmed" : "Confirm"}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleDelete}
                style={{ backgroundColor: "red", color: "#FFFFFF" }}
              >
                Delete
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Course;
