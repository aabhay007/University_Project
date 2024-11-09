import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";
import TemplateDemo from "../../../components/navy";

function Home() {
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("http://localhost:8085/university").then((d) => {
      setUniversities(d.data.univData);
    });
  }

  function renderUniversities() {
    return universities.map((item) => (
      <div className="col-4 p-2" key={item._id}>
        <div className="card">
        <img
            // autoPlay
            // muted  // Muted attribute added here
            className="card-img-top"
            src={"http://localhost:8085/" + item.image}
            height="300"
            width="150"
            alt="University Image"
          />
          <div className="card-body">
            <h3 className="card-title">{item.name}</h3>
            <button
              onClick={() => {
                navigate(ROUTES.department.name + "?id=" + item._id);
              }}
              className="btn btn-primary"
            >
              View Departments
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div
      style={{
        background: "",
      }}
    >
      <Header />
      {/* <TemplateDemo/> */}
      <div className="container mt-4">
        <h2 className="mb-4 text-center text-uppercase font-weight-bold ">
          Explore Universities
        </h2>
        <div className="row">{renderUniversities()}</div>
      </div>
    </div>
  );
}

export default Home;
