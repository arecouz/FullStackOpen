import {
  Diagnosis,
  Discharge,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewPatient,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown) => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name " + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown) => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing dateOfBirth " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown) => {
  if (!isString(ssn)) {
    throw new Error("Incorrect of missing ssn " + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect of missing gender " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown) => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation " + occupation);
  }
  return occupation;
};

const parseString = (generic: unknown) => {
  if (!isString(generic)) {
    throw new Error(`Incorrect or missing ${generic}` + generic);
  }
  return generic;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const parseDate = (date: unknown) => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date " + date);
  }
  return date;
};

const parseDischarge = (discharge: unknown) => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("date" in discharge && "criteria" in discharge) {
    const d: Discharge = {
      date: parseDate(discharge.date),
      criteria: parseString(discharge.criteria),
    };
    return d;
  } else throw new Error("missing discharge");
};

const parseSickLeave = (sickLeave: unknown) => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    const s: SickLeave = {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate),
    };
    return s;
  } else throw new Error("missing discharge");
};

const isHealthCheck = (param: number): param is HealthCheckRating => {
  const healthCheckValues = Object.values(HealthCheckRating).map(
    (v) => v as number
  );
  return healthCheckValues.includes(param);
};

const parseHealthCheck = (healthCheckRating: unknown): HealthCheckRating => {
  if (healthCheckRating === undefined || healthCheckRating === null) {
    throw new Error(
      `Incorrect Health Rating: ${healthCheckRating}, should be in the range 0 - 3`
    );
  }
  if (!isNumber(healthCheckRating)) {
    throw new Error(
      `Incorrect Health Rating: should be in the range 0 - 3`
    );
  }
  if (!isHealthCheck(healthCheckRating)) {
    throw new Error(
      `Incorrect Health Rating: ${healthCheckRating}, should be in the range 0 - 3`
    );
  }
  return healthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatient;
  }
  throw new Error("Incorrect data: field(s) missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
  console.log("parsing object: ", object);

  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("description" in object && "date" in object && "specialist" in object) {
    const newBaseEntry: NewBaseEntry =
      "diagnosisCodes" in object
        ? {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
          }
        : {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
          };
    if ("type" in object) {
      switch (object.type) {
        case "Hospital":
          if ("discharge" in object) {
            const newHospitalEntry: NewEntry = {
              ...newBaseEntry,
              type: object.type,
              discharge: parseDischarge(object.discharge),
            };
            return newHospitalEntry;
          }
          throw new Error("discharge not found");

        case "OccupationalHealthcare":
          if ("employerName" in object) {
            const noSickLeave: NewEntry = {
              ...newBaseEntry,
              type: object.type,
              employerName: parseString(object.employerName),
            };
            if ("sickLeave" in object) {
              const withSickLeave: NewEntry = {
                ...noSickLeave,
                sickLeave: parseSickLeave(object.sickLeave),
              };
              return withSickLeave;
            } else {
              return noSickLeave;
            }
          }
          throw new Error("employerName not found");

        case "HealthCheck":
          if ("healthCheckRating" in object) {
            const newHealthCheckRating: NewEntry = {
              ...newBaseEntry,
              type: object.type,
              healthCheckRating: parseHealthCheck(object.healthCheckRating),
            };
            return newHealthCheckRating;
          }
          throw new Error("healthCheckRating not found");
      }
    }
    throw new Error("type not found");
  }
  throw new Error("description/date/specialist not found");
};
