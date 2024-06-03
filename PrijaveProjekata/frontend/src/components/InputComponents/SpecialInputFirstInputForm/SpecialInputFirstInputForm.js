import React, { useState, useEffect, useContext } from "react";
import SpecialInputMemberContainer from "./SpecialInputMemberContainer/SpecialInputMemberContainer.js";
import CompletedMember from "../CompletedMember/CompletedMember.js";
import { SpecialInputContext } from "./SpecialInputContext.js";
import { FirstInputFormDataContext } from "../../../context/FirstInputFormDataContext.js";

// styles
import Style from "./SpecialInputFirstInputForm.module.css";

const SpecialInputFirstInputForm = ({ name, pitanje }) => {
  // projectMembers contains members that consist of this fields named: - newItemNameSurname
  //                                                                    - newItemEmail
  //                                                                    - newItemPercentag

  // using projectTeam from context
  const { projectTeam, setProjectTeam } = useContext(FirstInputFormDataContext);

  // project members
  const [projectMembers, setProjectMembers] = useState([]);
  const [addMemberFormIsActive, setAddMemberFormIsActive] = useState(false);

  // when component mounts
  useEffect(() => {
    const sessionStorageProjectMembers = sessionStorage.getItem(name);

    // preventing data from disappearing after refreshing page
    if (sessionStorageProjectMembers) {
      const serializedState = JSON.parse(sessionStorageProjectMembers);
      setProjectTeam(serializedState);
    }
  }, []);

  // add new member
  const addNewMember = (newMember) => {
    setProjectTeam((prevMembers) => {
      // Use the updated state to ensure correctness
      const updatedMembers = [...prevMembers, newMember];

      // Store the updated state in sessionStorage
      const serializedState = JSON.stringify(updatedMembers);
      sessionStorage.setItem(name, serializedState);

      // Return the new state
      return updatedMembers;
    });
  };

  // delete member
  const deleteMember = (memberId) => {
    setProjectTeam((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers.splice(memberId, 1);
      sessionStorage.setItem(name, JSON.stringify(updatedMembers));
      return updatedMembers;
    });
  };

  function manageInputForm() {
    setAddMemberFormIsActive(!addMemberFormIsActive);
    sessionStorage.setItem("member_form_is_active", addMemberFormIsActive);
  }

  return (
    <SpecialInputContext.Provider value={{ projectMembers, setProjectMembers }}>
      <div className={Style.SpecialInputContainer}>
        <p className="question">{pitanje}</p>

        {/* INPUT FORM FOR NEW MEMBER */}
        {addMemberFormIsActive ? (
          <SpecialInputMemberContainer addProjectMember={addNewMember} />
        ) : null}

        <button onClick={manageInputForm} id="special-input-plus">
          {addMemberFormIsActive ? "-" : "DODAJ NOVOG ČLANA"}
        </button>
      </div>

      {/* ALL MEMBERS */}
        <p>Svi članovi:</p>
          <div className={Style.SpecialInputCompletedMembers}>
            {/* GENERATING COMPLETED PROJECT MEMBERS */}
            {projectTeam.length > 0 ? (
              projectTeam?.map((member, index) => (
                <div className={Style.ProjectTeamMember}>
                    <div className={Style.ProjectTeamMemberInfo}>
                        <div style={{marginRight:"10px"}}>{member.nameSurname}</div>
                        <div>{member.thisProjectPercentage}%</div>
                    </div>
                    
                    <div className={Style.ProjectOtherProjectsTitle}>OSTALI PROJEKTI:</div>
                    {member.otherProjects.map((project, index) => (
                        <div className={Style.ProjectTeamMemberOtherProjects}>
                            <div className={Style.ProjectTeamOtherProjectInfo}>
                                {project.otherProjectName} {project.otherProjectPercentage}%
                            </div>
                        </div>
                    
                    ))}
                </div>
            ))
            ) : (
              <p>niste dodali niti jednog člana...</p>
            )}
          </div>
    </SpecialInputContext.Provider>
  );
};

export default SpecialInputFirstInputForm;
