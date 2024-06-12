import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import FirstInputFormPDF from '../../InputComponents/PDF/FirstInputFormPDF'
import { firstInputFormData, secondInputFormData } from '../../InputComponents/PDF/data'
import DepartmentHeadStatementPDF from '../../InputComponents/PDF/DepartmentHeadStatementPDF'
import CalendarInputAdvanced from "../../InputComponents/CalendarInputAdvanced/CalendarInputAdvanced";

const ParlovTest = () => {

    return (  
        <div>
            <CalendarInputAdvanced/>
            {/* PDF TESTING */}
            {/* <PDFViewer style={{width : "100%", height: "100vh" }}>
                <FirstInputFormPDF data={firstInputFormData} title={"TRAŽENJE SUGLASNOSTI"}/>
                <DepartmentHeadStatementPDF nameSurname={"Petar Parlov"}/>
            </PDFViewer> */}
        </div>
    );
}
 
export default ParlovTest;