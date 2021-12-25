export const addTreatment = (newTreatment) => {
  newTreatment.date = new Date(newTreatment.date).toISOString();

  return fetch("http://localhost:5000/treatments", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTreatment),
  });
};

export const getAllTreatments = () =>
  fetch("http://localhost:5000/treatments", {
    method: "GET",
  });

export const updateTreatment = (id, newTreatment) => {
  newTreatment.date = new Date(newTreatment.date).toISOString();

  return fetch(`http://localhost:5000/treatments/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTreatment),
  });
};

export const deleteTreatment = (id) =>
  fetch(`http://localhost:5000/treatments/${id}`, {
    method: "DELETE",
  });
