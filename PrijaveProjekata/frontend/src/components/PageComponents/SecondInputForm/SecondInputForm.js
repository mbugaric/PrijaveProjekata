import { useState, useEffect, useContext } from "react";
import Style from "./SecondInputForm.module.css";

// styles
import "../../../index.css";

//my components
import Question from "../../InputComponents/Question/Question.js";
import TextInput from "../../InputComponents/TextInput/TextInput.js";
import TextInputWithoutTitle from "../../InputComponents/TextInputWithoutTitle/TextInputWithoutTitle.js";
import DropdownMenuInputOther from "../../InputComponents/DropdownMenuInputOther/DropdownMenuInputOther.js";
import DropdownMenuInput from "../../InputComponents/DropdownMenuInput/DropdownMenuInput.js";
import RadioButtonInput from "../../InputComponents/RadioButtonInput/RadioButtonInput.js";
import SpecialInputForm from "../../InputComponents/SpecialInputForm/SpecialInputForm.js";
import GenerateHeadOfDepartmentStatement from "../../InputComponents/GenerateHeadOfDepartmentStatement/GenerateHeadOfDepartmentStatement.js";
import AttachAdditionalDocumentation from "../../InputComponents/AttachAdditionalDocumentation/AttachAdditionalDocumentation.js";
import AttachCurrentlyAvailableBudget from "../../InputComponents/AttachCurrentlyAvailableBudget/AttachCurrentlyAvailableBudget.jsx";
import AttachHeadOfDepartmentStatement from "../../InputComponents/AttachHeadOfDepartmentStatement/AttachHeadOfDepartmentStatement.js";
import AutomaticInput from "../../InputComponents/AutomaticInput/AutomaticInput.js";
import CalendarInput from "../../InputComponents/CalendarInput/CalendarInput.js";
import ProjectSummary from "../../InputComponents/ProjectSummary/ProjectSummary.js";
import NumberInput from "../../InputComponents/NumberInput/NumberInput.js";
import NumberInputSelect from "../../InputComponents/NumberInputSelect/NumberInputSelect.js";

// data
import {
  sourceOfFundingData,
  projectTypesData,
} from "../../data/dropdownMenuData.js";
import { questions, radioButtonData1 } from "../../data/secondInputFormData.js";

// api request
import { getDepartments } from "../../PageComponents/FirstInputForm/firstInputFormApi.js";

// context
import { SecondInputFormDataContext } from "../../../context/SecondInputFormDataContext.js";
import { useAuthContext } from "../../../hooks/useAuthContext.js";
import ModalApplicationUpdated from "../../InputComponents/ModalApplicationUpdated/ModalApplicationUpdated.js";
import { set } from "date-fns";
import CalendarInputAdvanced from "../../InputComponents/CalendarInputAdvanced/CalendarInputAdvanced.js";
import TotalExpenseWarning from "../../InputComponents/TotalExpenseWarning/TotalExpenseWarning.js";

const SecondInputForm = (docId) => {
  const { user } = useAuthContext();
  // const [projectToUpdateId, setProjectToUpdateId] = useState(documentId)
  const [intentionFormToUpdate, setIntentionFormToUpdate] = useState(null); // data loaded from document

  const [inputFormData, setInputFormData] = useState({});
  const [secondInputMarker, setSecondInputMarker] = useState(true);
  const [nameSurname, setNameSurname] = useState("");
  const [vocation, setVocation] = useState("");
  const [department, setDepartment] = useState("");
  // fetched departments
  const [departmentsData, setDepartmentsData] = useState([]);
//////////////////////////////////////////////////////////////
  const [email, setEmail] = useState("");
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState(0);
  const [workTimeThisPercentage, setWorkTimeThisPercentage] = useState(0);
  const [workTimeOtherPercentage, setWorkTimeOtherPercentage] = useState(0);
  const [teamLeaderNote, setTeamLeaderNote] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectAcronym, setProjectAcronym] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [applicationURL, setApplicationURL] = useState("");
  const [sourceOfFunding, setSourceOfFunding] = useState("");
  const [projectType, setProjectType] = useState("");
  const [expectedProjectBeginning, setExpectedProjectBeginning] = useState("");
  const [expectedProjectDurationInMonths, setExpectedProjectDurationInMonths] =
    useState(0);
  const [projectApplicant, setProjectAplicant] = useState("");
  const [projectPartners, setProjectPartners] = useState("");
  const [economicSubjectInvolvement, setEconomicSubjectInvolvement] =
    useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [fesbValuePart, setFesbValuePart] = useState(0);
  const [currentPersonnelExpense, setCurrentPersonnelExpense] = useState(0);
  const [newPersonnelExpense, setNewPersonnelExpense] = useState(0);
  const [indirectExpenses, setIndirectExpenses] = useState(0);
  const [equipmentDescriptionAndExpense, setEquipmentDescriptionAndExpense] =
    useState("");
  const [equipmentAmortizationExpense, setEquipmentAmortizationExpense] =
    useState(0);
  const [otherServicesExpense, setOtherServicesExpense] = useState(0);
  const [materialExpense, setMaterialExpense] = useState(0);
  const [
    travelRegistrationEducationExpense,
    setTravelRegistrationEducationExpense,
  ] = useState(0);
  const [expenseNote, setExpenseNote] = useState("");
  const [partnerExpense, setPartnerExpense] = useState(0);
  const [requestedFunding, setRequestedFunding] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [personalFinancingExpense, setPersonalFinancingExpense] = useState("");
  const [newEmploymentBoolean, setNewEmploymentBoolean] = useState(false);
  const [projectTeam, setProjectTeam] = useState([]);
  const [consultantServices, setConsultantServices] = useState(false);
  const [consultantExpense, setConsultantExpense] = useState(0);
  const [consultantExpenseSource, setConsultantExpenseSource] = useState("");
  const [requiredDocumentationFESB, setRequiredDocumentationFESB] =
    useState("");
  const [pdfDocuments, setPdfDocuments] = useState([]);

  // application updated modal - after application is submitted
  const [modalApplicationUpdatedIsOpen, setModalApplicationUpdatedIsOpen] = useState(false);

  // this component is used to calculate total expense
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    setInputFormData({
      userId: user?.userId,
      secondInputMarker,
      nameSurname,
      vocation,
      department,
      email,
      projectTitle,
      projectAcronym,
      applicationDeadline,
      projectSummary,
      applicationURL,
      projectApplicant,
      projectPartners,
      totalValue,
      fesbValuePart,
      newEmploymentBoolean,
      projectTeam,
      mobilePhoneNumber,
      workTimeThisPercentage,
      workTimeOtherPercentage,
      teamLeaderNote,
      sourceOfFunding,
      projectType,
      expectedProjectBeginning,
      expectedProjectDurationInMonths,
      economicSubjectInvolvement,
      currentPersonnelExpense,
      newPersonnelExpense,
      equipmentDescriptionAndExpense,
      equipmentAmortizationExpense,
      otherServicesExpense,
      materialExpense,
      travelRegistrationEducationExpense,
      expenseNote,
      partnerExpense,
      requestedFunding,
      downPayment,
      personalFinancingExpense,
      newEmploymentBoolean,
      consultantServices,
      consultantExpense,
      consultantExpenseSource,
      requiredDocumentationFESB,
      pdfDocuments,
    });
    //console.log(JSON.stringify(inputFormData));
  }, [
    nameSurname,
    vocation,
    department,
    email,
    projectTitle,
    projectAcronym,
    applicationDeadline,
    projectSummary,
    applicationURL,
    projectApplicant,
    projectPartners,
    totalValue,
    fesbValuePart,
    newEmploymentBoolean,
    projectTeam,
    mobilePhoneNumber,
    workTimeThisPercentage,
    workTimeOtherPercentage,
    teamLeaderNote,
    sourceOfFunding,
    projectType,
    expectedProjectBeginning,
    expectedProjectDurationInMonths,
    economicSubjectInvolvement,
    currentPersonnelExpense,
    newPersonnelExpense,
    equipmentDescriptionAndExpense,
    equipmentAmortizationExpense,
    otherServicesExpense,
    materialExpense,
    travelRegistrationEducationExpense,
    expenseNote,
    partnerExpense,
    requestedFunding,
    downPayment,
    personalFinancingExpense,
    newEmploymentBoolean,
    consultantServices,
    consultantExpense,
    consultantExpenseSource,
    requiredDocumentationFESB,
    pdfDocuments,
  ]);

  // fetching initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/projectInfo/${docId.docId.documentId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data fetched: ", data);
        // setting up data loaded from document(_id)
        setIntentionFormToUpdate(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const getDepartments = async () => {
      try {
          const response = await fetch('/api/department');
          if (response.ok) {
              const fetchedDepartments = await response.json();

              const departments = fetchedDepartments.map(
                (department) => (department.name + " - " + department.headName)
              );
              // Update state with fetched department nam
              setDepartmentsData(departments);
          } else {
              console.error('Failed to fetch department data');
              throw new Error('Failed to fetch department data');
          }
      } catch (error) {
          console.error('Error during getDepartments:', error);
          throw new Error('Error during getDepartments');
      }
    }

    getDepartments();
  }, []);

  // after data is loaded completely, update states
  useEffect(() => {
    if (intentionFormToUpdate?.nameSurname) {
      setNameSurname(intentionFormToUpdate.nameSurname);
      setVocation(intentionFormToUpdate?.vocation);
      setDepartment(intentionFormToUpdate?.department);
      setEmail(intentionFormToUpdate?.email);
      setProjectTitle(intentionFormToUpdate?.projectTitle);
      setProjectAcronym(intentionFormToUpdate?.projectAcronym);
      setApplicationDeadline(intentionFormToUpdate?.applicationDeadline);
      setProjectSummary(intentionFormToUpdate?.projectSummary);
      setApplicationURL(intentionFormToUpdate?.applicationURL);
      setProjectAplicant(intentionFormToUpdate?.projectApplicant);
      setProjectPartners(intentionFormToUpdate?.projectPartners);
      setTotalValue(intentionFormToUpdate?.totalValue);
      setFesbValuePart(intentionFormToUpdate?.fesbValuePart);
      setNewEmploymentBoolean(intentionFormToUpdate?.setNewEmploymentBoolean);
      setProjectTeam(intentionFormToUpdate?.projectTeam);
    }

    console.log("Intention form to update: ", intentionFormToUpdate);

  }, [intentionFormToUpdate]);

  useEffect(() => {
    setIndirectExpenses(0.15 * fesbValuePart);
  }, [fesbValuePart]);


  const checkNaN = (value) => {
    if (isNaN(value)) {
      return 0;
    } else {
      return value;
    }
  
  }
  useEffect(() => {
    const calculatedTotalExpense = 
      Number(checkNaN(currentPersonnelExpense)) + 
      Number(checkNaN(newPersonnelExpense)) + 
      Number(checkNaN(equipmentDescriptionAndExpense)) + 
      Number(checkNaN(equipmentAmortizationExpense)) + 
      Number(checkNaN(otherServicesExpense)) + 
      Number(checkNaN(materialExpense)) + 
      Number(checkNaN(travelRegistrationEducationExpense)) + 
      Number(checkNaN(partnerExpense));

      setTotalExpense(calculatedTotalExpense);

    console.log("Partner expense test: " + partnerExpense ?? 0);

    console.log("Total expense: ", totalExpense);
    console.log("FESB value part: ", fesbValuePart);
  }, [
    currentPersonnelExpense,
    newPersonnelExpense, 
    fesbValuePart, 
    equipmentDescriptionAndExpense, 
    equipmentAmortizationExpense, 
    otherServicesExpense, 
    materialExpense, 
    travelRegistrationEducationExpense]);

  // callback
  const updateProjectTeam = (projectMembersList) => {
    setProjectTeam(projectMembersList);
  };

  const handleFilesSelect = (selectedFile) => {
    // Update the pdfDocuments state with the selected file
    setPdfDocuments((prevDocuments) => [...prevDocuments, ...selectedFile]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    const cleanData = {
      userId: user?.userId,
      secondInputMarker,
      nameSurname,
      vocation,
      department,
      email,
      projectTitle,
      projectAcronym,
      applicationDeadline,
      projectSummary,
      applicationURL,
      projectApplicant,
      projectPartners,
      totalValue,
      fesbValuePart,
      newEmploymentBoolean,
      projectTeam,
      mobilePhoneNumber,
      workTimeThisPercentage,
      workTimeOtherPercentage,
      teamLeaderNote,
      sourceOfFunding,
      projectType,
      expectedProjectBeginning,
      expectedProjectDurationInMonths,
      economicSubjectInvolvement,
      currentPersonnelExpense,
      newPersonnelExpense,
      equipmentDescriptionAndExpense,
      equipmentAmortizationExpense,
      otherServicesExpense,
      materialExpense,
      travelRegistrationEducationExpense,
      expenseNote,
      partnerExpense,
      requestedFunding,
      downPayment,
      personalFinancingExpense,
      newEmploymentBoolean,
      consultantServices,
      consultantExpense,
      consultantExpenseSource,
      requiredDocumentationFESB,
    };

    pdfDocuments.forEach((file, index) => {
      formData.append(`pdfDocuments`, file);
    });

    Object.entries(cleanData).forEach(([key, value]) => {
      if (key === "projectTeam") {
        formData.append("projectTeam", JSON.stringify(projectTeam));
      } else if (key !== "pdfDocuments") {
        formData.append(key, value);
      }
    });
    console.log(formData);
    try {
      const response = await fetch(
        `/api/projectInfo/${docId.docId.documentId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (response.ok) {
        const responseData = await response.json();

        console.log("Update successful:", responseData);

        setModalApplicationUpdatedIsOpen(true);
      } else {
        // handle potentional non-JSON response
        const errorData = await response.json().catch(() => null);
        // if response is not null
        const errorMessage = errorData
          ? errorData.error
          : `Error: ${response.status} ${response.statusText}`;

        console.error("Error posting data1: ", errorMessage);
        window.alert(`Error posting data1: ${errorMessage}`);

        // printing missing field if there are any and displaying them
        if (
          errorData &&
          errorData.emptyFields &&
          errorData.emptyFields.length > 0
        ) {
          const missingFieldsMessage = `Missing fields: ${errorData.emptyFields.join(", ")}`;
          console.error(missingFieldsMessage);
          window.alert(missingFieldsMessage);
        }
      }
    } catch (error) {
      console.error("Error posting data2:", error.message);
      window.alert(`Error posting data1: ${error.message}`);
    }
  };

  return (
    // all the child components inside SecondInputFormDataConext.Provide have access value data
    <div className={Style.InputFormContainer}>
      <div className={Style.InputForm}>
        <SecondInputFormDataContext.Provider
          value={{
            projectTeam,
            setProjectTeam,
            totalValue,
            department,
            nameSurname,
            projectTitle,
            setModalApplicationUpdatedIsOpen,
            totalExpense,
            fesbValuePart
          }}
        >

          {modalApplicationUpdatedIsOpen && <ModalApplicationUpdated />}

          <h1 className="document-title">TRAŽENJE SUGLASNOSTI</h1>

          <Question questionText={questions[0]} />
          <div className={Style.NameSurnameContainer}>
            <label className={Style.NameSurnameLabel}>IME I PREZIME*</label>
            <p className={Style.NameSurnameData}>{nameSurname}</p>
          </div>
          <TextInput
            label={"TITULA*"}
            name={"vocation_2"}
            setSpecificState={setVocation}
            initialValue={vocation}
          />
          <DropdownMenuInput
            label={"ZAVOD (ODSJEK)"}
            name={"department_2"}
            data={departmentsData}
            setSpecificState={setDepartment}
            isDepartment={true}
            initialValue={department}
          />
          <TextInput
            label={"E-MAIL*"}
            name={"email_2"}
            setSpecificState={setEmail}
            initialValue={email}
          />
          <TextInput
            label={"MOBITEL*"}
            name={"phone_number_2"}
            setSpecificState={setMobilePhoneNumber}
            initialValue={mobilePhoneNumber}
          />
          <TextInput
            label={"POSTOTAK RADNOG VREMENA U OKVIRU PREDLOŽENOG PROJEKTA*"}
            name={"work_time_this_percentage"}
            setSpecificState={setWorkTimeThisPercentage}
            initialValue={workTimeThisPercentage}
          />
          <TextInput
            label={
              "POSTOTAK RADNOG VREMENA U OKVIRU OSTALIH PROJEKATA U PROVEDBI"
            }
            name={"work_time_other_percentage"}
            setSpecificState={setWorkTimeOtherPercentage}
            initialValue={workTimeOtherPercentage}
          />
          <TextInput
            label={"NAPOMENA"}
            name={"team_leader_disclamer"}
            setSpecificState={setTeamLeaderNote}
            initialValue={teamLeaderNote}
          />

          <Question questionText={questions[1]} />
          <TextInput
            label={"NAZIV PROJEKTA"}
            name={"project_title"}
            setSpecificState={setProjectTitle}
            initialValue={projectTitle}
          />
          <TextInput
            label={"AKRONIM PROJEKTA"}
            name={"project_acronym_2"}
            setSpecificState={setProjectAcronym}
            initialValue={projectAcronym}
          />
          <CalendarInputAdvanced
            label={"ROK ZA PRIJAVU PROJEKTA"}
            name={"application_dead_line"}
            setSpecificState={setApplicationDeadline}
            initialDate={applicationDeadline}
            workingDaysLimit={7}
          />

          <Question questionText={questions[2]} />
          <ProjectSummary
            name={"project_summary"}
            initialValue={projectSummary}
            setSpecificState={setProjectSummary}
          />

          <Question questionText={questions[3]} />
          <TextInput
            label={
              "LINK NA INTERNETSKU STRANICU NA KOJOJ SE NALAZI POTPUNA DOKUMENTACIJA S TEKSTOM NATJEČAJA"
            }
            name={"application_url"}
            setSpecificState={setApplicationURL}
            initialValue={applicationURL}
          />

          <Question questionText={questions[4]} />
          <DropdownMenuInputOther
            label={""}
            name={"source_of_funding"}
            data={sourceOfFundingData}
            setSpecificState={setSourceOfFunding}
          />

          <Question questionText={questions[5]} />
          <DropdownMenuInput
            name={"type_of_projects"}
            data={projectTypesData}
            setSpecificState={setProjectType}
          />

          <Question questionText={questions[6]} />
          <CalendarInputAdvanced
            label={"POČETAK PROJEKTA"}
            name={"expected_project_beginning"}
            setSpecificState={setExpectedProjectBeginning}
            initialDate={expectedProjectBeginning}
            workingDaysLimit={7}
          />

          <Question questionText={questions[7]} />
          <NumberInput
            name={"expected_project_duration_in_months"}
            setSpecificState={setExpectedProjectDurationInMonths}
            currencySign={""}
          />

          <Question questionText={questions[8]} />
          <TextInput
            label={
              "PRIJAVITELJ PROJKETA/VODEĆI PARTNER (INSTITUCIJA, TVRTKA, ...)"
            }
            name={"project_applicant"}
            setSpecificState={setProjectAplicant}
            initialValue={projectApplicant}
          />

          <Question questionText={questions[9]} />
          <TextInputWithoutTitle
            name={"project_partners"}
            setSpecificState={setProjectPartners}
            initialValue={projectPartners}
          />

          <Question questionText={questions[10]} />
          <RadioButtonInput
            name={"economic_subjet_involvment"}
            simpleQuestionValue={radioButtonData1}
            setSelectionState={setEconomicSubjectInvolvement}
          />

          <Question questionText={questions[11]} />
          <NumberInput
            label={""}
            name={"total_value"}
            setSpecificState={setTotalValue}
            initialValue={totalValue}
            currencySign={"€"}
          />

          <Question questionText={questions[12]} />
          <NumberInputSelect
            label={"DIO PRORAČUNA KOJI PRIPADA FESB-u"}
            name={"fesb_value_part"}
            setSpecificState={setFesbValuePart}
            initialValue={fesbValuePart}
            isSecondInputForm={true}
            isFirstInputForm={false}
          />
          <NumberInput
            label={"TROŠAK POSTOJEĆEG OSOBLJA"}
            name={"current_personnel_expense"}
            setSpecificState={setCurrentPersonnelExpense}
            isSecondInputForm={true}
            isFirstInputForm={false}
            currencySign={"€"}
          />
          <NumberInput
            label={"TROŠAK NOVOZAPOSLENOG OSOBLJA"}
            name={"new_personnel_expense"}
            setSpecificState={setNewPersonnelExpense}
            isSecondInputForm={true}
            isFirstInputForm={false}
            currencySign={"€"}
          />
          <AutomaticInput
            label={"NEIZRAVNI TROŠKOVI (15% NA TROŠKOVE OSOBLJA)"}
            value={0.15 * fesbValuePart}
          />
          <NumberInputSelect
            label={
              "TROŠAK I POPIS OPREME KOJA SE NABAVLJA (OZNAČITI NABAVU IZNAD 26.544,00 E)"
            }
            name={"equipment_description_and_expense"}
            setSpecificState={setEquipmentDescriptionAndExpense}
            isSecondInputForm={true}
            isFirstInputForm={false}
          />
          <NumberInputSelect
            label={"TROŠAK AMORTIZACIJE OPREME"}
            name={"equipment_amortization_expense"}
            setSpecificState={setEquipmentAmortizationExpense}
            isSecondInputForm={true}
            isFirstInputForm={false}
          />
          <NumberInputSelect
            label={"TROŠAK VANJSKIH USLUGA"}
            name={"other_services_expense"}
            setSpecificState={setOtherServicesExpense}
            isSecondInputForm={true}
            isFirstInputForm={false}
          />
          <NumberInputSelect
            label={"TROŠAK MATERIJALA I SITNOG INVENTARA"}
            name={"material_expense"}
            setSpecificState={setMaterialExpense}
            isSecondInputForm={true}
            isFirstInputForm={false}
          />
          <NumberInputSelect
            label={"PUTNI TROŠAK/TROŠAK KOTIZACIJA/STRUČNOG USAVRŠAVANJA"}
            name={"travel_registration_education_expense"}
            setSpecificState={setTravelRegistrationEducationExpense}
            isSecondInputForm={true}
            isFirstInputForm={false}
          />
          <TotalExpenseWarning />

          <TextInput
            label={"NAPOMENA"}
            name={"expense_note"}
            setSpecificState={setExpenseNote}
          />

          <Question questionText={questions[13]} />
          <NumberInputSelect
            label={""}
            name={"partner_expense"}
            setSpecificState={setPartnerExpense}
            isSecondInputForm={true}
            isFirstInputForm={false}
          />

          <Question questionText={questions[14]} />
          <NumberInputSelect
            label={""}
            name={"requested_funding"}
            setSpecificState={setRequestedFunding}
            isSecondInputForm={true}
            isFirstInputForm={false}
          />

          <Question questionText={questions[15]} />
          <NumberInputSelect
            label={""}
            name={"down_payment"}
            setSpecificState={setDownPayment}
            isSecondInputForm={true}
            isFirstInputForm={false}
          />

          <Question questionText={questions[16]} />
          <p>
            Ukoliko projekt nije 100% financiran, kako planirate sufinancirati
            nefinancirani dio?
          </p>
          <TextInputWithoutTitle
            name={"personal_financing_expense"}
            setSpecificState={setPersonalFinancingExpense}
          />

          <Question questionText={questions[17]} />
          <RadioButtonInput
            name={"new_employment_boolean"}
            setSelectionState={setNewEmploymentBoolean}
            initialValue={newEmploymentBoolean}
          />

          <Question questionText={questions[18]} />
          <SpecialInputForm
            name="project_team_members"
            questionText={""}
            formType={"second"}
          />

          <Question questionText={questions[19]} />
          <RadioButtonInput
            name={"consultant_services"}
            setSelectionState={setConsultantServices}
          />
          {consultantServices && (
            <div>
              <p>Ukoliko je odgovor DA:</p>
              <NumberInput
                label={"TROŠAK KONZULTANTSKE USLUGE"}
                name={"consultant_expense"}
                setSpecificState={setConsultantExpense}
                initialValue={consultantExpense}
                currencySign={"€"}
              />
              <TextInput
                label={"IZVOR SREDSTAVA ZA KONZULTANTSKE USLUGE"}
                name={"consultant_expense_source"}
                setSpecificState={setConsultantExpenseSource}
              />
            </div>
          )}

          <Question questionText={questions[20]} />
          <p>
            Naznačite u kakvom obliku je potrebna dokumentacija (elektronski,
            preslika,ovjerena preslika, izvornik, i sl.)
          </p>
          <TextInputWithoutTitle
            name={"required_documentation_FESB"}
            setSpecificState={setRequiredDocumentationFESB}
          />

          <GenerateHeadOfDepartmentStatement />

          <Question questionText={questions[21]} />

          <AttachHeadOfDepartmentStatement onFilesSelect={handleFilesSelect} />

          <AttachCurrentlyAvailableBudget onFilesSelect={handleFilesSelect} />

          <AttachAdditionalDocumentation onFilesSelect={handleFilesSelect} />

          <button className="default-button" onClick={handleSubmit}>
            PODNESI TRAZENJE SUGLASNOSTI
          </button>
        </SecondInputFormDataContext.Provider>
      </div>
    </div>
  );
};
export default SecondInputForm;
