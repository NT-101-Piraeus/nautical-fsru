// NTG - M10 LOAD TESTING MATH ENGINE
const calculateProofLoad = (swl, equipmentType) => {
  let proofLoad = 0;

  if (equipmentType === "crane") {
    if (swl <= 20) {
      proofLoad = swl * 1.25; // +25%
    } else if (swl > 20 && swl <= 50) {
      proofLoad = swl + 5;    // SWL + 5t
    } else {
      proofLoad = swl * 1.10; // +10%
    }
  } else if (equipmentType === "davit") {
    proofLoad = swl * 1.10;   // Static/Dynamic ανάλογα το LSA
  }

  return proofLoad.toFixed(2);
};

// Παράδειγμα: Για SWL 16t -> Θα σου βγάλει 20.00t