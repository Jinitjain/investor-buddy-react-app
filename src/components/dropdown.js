import React from 'react';
import companyData  from "../data/companyData"
import { Multiselect } from 'multiselect-react-dropdown';

function DropDown(){

    const companies= companyData

    const dropdownStyle = {
        float: 'left',
        width: "500px",
        margin: "auto",
        border: "3px solid black",
        padding: '20px'
        
    }

    let selectedCompanyList = []

    const selectCompanies = (selectedList)=>{
        console.log(selectedList)
        selectedCompanyList = selectedList
        
    }

    const finalList = () =>{
        console.log("final "+ selectedCompanyList)
        const finalCompanyList = (selectedCompanyList) =>{
            const list1 = []
            selectedCompanyList.forEach(element => {
                list1.push(element.split(" ")[0])
            });

            return list1;
        }
    };

    return(
        <div style={dropdownStyle}>

            <Multiselect  options={companies} isObject={false} onSelect = {selectCompanies}></Multiselect>
            <button onClick = {finalList}>Submit</button>
        </div>
    
    
  )
}
export default DropDown;
