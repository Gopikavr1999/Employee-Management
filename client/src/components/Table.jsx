import React, { useState } from "react";
import remove from "../assets/delete-bin-5-line.svg";
import "../styles/table.css";

const Table = ({ head1, head2, head3, head4, head5, head6, datas }) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Extract unique department names
  const uniqueDepartments = [...new Set(datas.map((data) => data.department))];

  const filteredData = selectedDepartment
    ? datas.filter((data) => data.department === selectedDepartment)
    : datas;

  console.log("filteredData", filteredData);
  console.log("datas", datas);
  return (
    <div className="col-md-12 table-main">
      <div className="filter">
        <label htmlFor="department">Filter by Department:
        <select
          id="department"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All</option>

          {uniqueDepartments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
        </label>
      </div>
      <table className="table bordered"  style={{ width: "80%" }}>
        <thead>
          <tr>
            <th>{head1}</th>
            <th>{head2}</th>
            <th>{head3}</th>
            <th>{head4}</th>
            <th>{head5}</th>
            <th>{head6}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data) => (
            <tr key={data._id}>
              <td>{data.firstName}</td> 
              <td>{data.lastName}</td>
              <td>{data.employeeCode}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
