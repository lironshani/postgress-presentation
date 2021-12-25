import { useState, useEffect } from "react";
import { Modal } from "antd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "antd/dist/antd.css";
import moment from "moment";

import TreatmentsTable from "./components/TreatmentsTable";
import AddTreatmentModal from "./components/AddTreatmentModal";
import Loading from "./Loading";

import { getLocaleDateTime } from "./utils";
import {
  getAllTreatments,
  updateTreatment,
  addTreatment,
  deleteTreatment,
} from "./api";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    setInterval(() => {
      getAllTreatments()
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => setLoading(false), 1000);
          setTreatments(
            data.map((item) => ({
              ...item,
              key: item.treatment_number,
              date: moment(item.date),
            }))
          );
        })
        .catch((err) => console.log(err.message));
    }, 1000);
  }, []);

  return (
    <div className="App">
      <div className="cars-table-container">
        <Loading className={`loading ${loading ? "" : "hide"}`} />
        <TreatmentsTable
          className={`treatments ${loading ? "hide" : ""}`}
          treatments={treatments}
          onUpdateTreatment={updateTreatment}
          onDeleteTreatment={deleteTreatment}
        />

        <div className={`buttons-container ${loading ? "hide" : ""}`}>
          <button
            className="footer-button"
            onClick={() => setIsAddModalVisible(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <AddTreatmentModal
          visible={isAddModalVisible}
          onAdd={addTreatment}
          onCancel={() => setIsAddModalVisible(false)}
        />
      </div>
    </div>
  );
}

export default App;
