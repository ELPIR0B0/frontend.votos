"use client";

import { useState } from "react";
import { VoterPayload } from "../lib/api";

type Props = {
  loading?: boolean;
  onSubmit: (payload: VoterPayload) => void;
};

const genders = ["", "M", "F", "NB"];
const educations = ["", "Primaria", "Secundaria", "Universitaria", "Posgrado"];
const employmentStatuses = ["", "Empleado", "Desempleado", "Estudiante", "Jubilado"];
const employmentSectors = ["", "Privado", "Publico", "Autonomo", "Ninguno"];
const incomeBrackets = ["", "Bajo", "Medio", "Alto"];
const maritalStatuses = ["", "Soltero", "Casado", "Divorciado", "Viudo"];
const urbanicity = ["", "Urbana", "Suburbana", "Rural"];
const regions = ["", "Norte", "Sur", "Este", "Oeste", "Centro"];
const yesNo = ["", "Yes", "No"];
const waGroups = ["", "Ninguno", "Comunidad", "Sindicato", "Vecinal"];
const choices = ["", "C1", "C2", "C3", "C4"];

const defaultPayload: VoterPayload = {
  age: 35,
  gender: "F",
  education: "Universitaria",
  employment_status: "Empleado",
  employment_sector: "Privado",
  income_bracket: "Medio",
  marital_status: "Casado",
  household_size: 3,
  has_children: "Yes",
  urbanicity: "Urbana",
  region: "Centro",
  voted_last: "Yes",
  party_id_strength: 6,
  union_member: "No",
  public_sector: "No",
  home_owner: "Yes",
  small_biz_owner: "No",
  owns_car: "Yes",
  wa_groups: "Comunidad",
  refused_count: 0,
  attention_check: 1,
  will_turnout: 0.8,
  undecided: 0.2,
  preference_strength: 7,
  survey_confidence: 0.7,
  tv_news_hours: 6,
  social_media_hours: 2.5,
  trust_media: 0.5,
  civic_participation: 2,
  job_tenure_years: 5,
  primary_choice: "C2",
  secondary_choice: "C1",
};

export default function VoterForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<VoterPayload>(defaultPayload);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = [
      "age",
      "household_size",
      "party_id_strength",
      "refused_count",
      "attention_check",
      "will_turnout",
      "undecided",
      "preference_strength",
      "survey_confidence",
      "tv_news_hours",
      "social_media_hours",
      "trust_media",
      "civic_participation",
      "job_tenure_years",
    ];
    if (numericFields.includes(name)) {
      setForm({ ...form, [name]: value === "" ? undefined : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleReset = () => {
    setForm(defaultPayload);
  };

  return (
    <form className="panel grid" onSubmit={handleSubmit}>
      <div className="badge">Datos del votante</div>
      <p style={{ margin: 0, color: "#3b4b49" }}>
        Consejo: usa el botón “Ejemplo rápido” para precargar valores realistas y solo ajusta lo que necesites.
      </p>
      <div className="grid two" style={{ gap: "10px" }}>
        <button type="button" className="btn-secondary" onClick={() => setForm(defaultPayload)} disabled={loading}>
          Ejemplo rápido
        </button>
        <button type="button" className="btn-secondary" onClick={handleReset} disabled={loading}>
          Reiniciar a ejemplo
        </button>
      </div>

      <section>
        <h3 className="section-title">Datos demográficos</h3>
        <div className="grid two">
          <label>
            Edad
            <input
              className="input"
              type="number"
              name="age"
              min={18}
              max={100}
              value={form.age ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Género
            <select
              className="input"
              name="gender"
              value={form.gender ?? ""}
              onChange={handleChange}
            >
              {genders.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Educación
            <select
              className="input"
              name="education"
              value={form.education ?? ""}
              onChange={handleChange}
            >
              {educations.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Región
            <select
              className="input"
              name="region"
              value={form.region ?? ""}
              onChange={handleChange}
            >
              {regions.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Urbanicidad
            <select
              className="input"
              name="urbanicity"
              value={form.urbanicity ?? ""}
              onChange={handleChange}
            >
              {urbanicity.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tamaño del hogar
            <input
              className="input"
              type="number"
              name="household_size"
              min={1}
              max={10}
              value={form.household_size ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Tiene hijos
            <select
              className="input"
              name="has_children"
              value={form.has_children ?? ""}
              onChange={handleChange}
            >
              {yesNo.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section>
        <h3 className="section-title">Situación socioeconómica</h3>
        <div className="grid two">
          <label>
            Estado laboral
            <select
              className="input"
              name="employment_status"
              value={form.employment_status ?? ""}
              onChange={handleChange}
            >
              {employmentStatuses.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sector laboral
            <select
              className="input"
              name="employment_sector"
              value={form.employment_sector ?? ""}
              onChange={handleChange}
            >
              {employmentSectors.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tramo de ingresos
            <select
              className="input"
              name="income_bracket"
              value={form.income_bracket ?? ""}
              onChange={handleChange}
            >
              {incomeBrackets.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Estado civil
            <select
              className="input"
              name="marital_status"
              value={form.marital_status ?? ""}
              onChange={handleChange}
            >
              {maritalStatuses.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Propietario vivienda
            <select
              className="input"
              name="home_owner"
              value={form.home_owner ?? ""}
              onChange={handleChange}
            >
              {yesNo.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Propietario vehículo
            <select
              className="input"
              name="owns_car"
              value={form.owns_car ?? ""}
              onChange={handleChange}
            >
              {yesNo.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Dueño de pequeño negocio
            <select
              className="input"
              name="small_biz_owner"
              value={form.small_biz_owner ?? ""}
              onChange={handleChange}
            >
              {yesNo.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section>
        <h3 className="section-title">Participación y actitudes</h3>
        <div className="grid two">
          <label>
            Votó en la última elección
            <select
              className="input"
              name="voted_last"
              value={form.voted_last ?? ""}
              onChange={handleChange}
            >
              {yesNo.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Fuerza partidista (0-10)
            <input
              className="input"
              type="number"
              name="party_id_strength"
              min={0}
              max={10}
              value={form.party_id_strength ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Probabilidad de votar (0-1)
            <input
              className="input"
              type="number"
              step="0.01"
              name="will_turnout"
              min={0}
              max={1}
              value={form.will_turnout ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Nivel de indecisión (0-1)
            <input
              className="input"
              type="number"
              step="0.01"
              name="undecided"
              min={0}
              max={1}
              value={form.undecided ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Intensidad de preferencia (0-10)
            <input
              className="input"
              type="number"
              name="preference_strength"
              min={0}
              max={10}
              value={form.preference_strength ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Confianza en encuesta (0-1)
            <input
              className="input"
              type="number"
              step="0.01"
              name="survey_confidence"
              min={0}
              max={1}
              value={form.survey_confidence ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Preguntas rehusadas (conteo)
            <input
              className="input"
              type="number"
              name="refused_count"
              min={0}
              max={10}
              value={form.refused_count ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Chequeo de atención
            <input
              className="input"
              type="number"
              name="attention_check"
              min={0}
              max={1}
              value={form.attention_check ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Horas TV noticias/semana
            <input
              className="input"
              type="number"
              step="0.5"
              name="tv_news_hours"
              min={0}
              max={60}
              value={form.tv_news_hours ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Horas redes/día
            <input
              className="input"
              type="number"
              step="0.5"
              name="social_media_hours"
              min={0}
              max={24}
              value={form.social_media_hours ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Confianza en medios (0-1)
            <input
              className="input"
              type="number"
              step="0.01"
              name="trust_media"
              min={0}
              max={1}
              value={form.trust_media ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Participación cívica (0-5)
            <input
              className="input"
              type="number"
              name="civic_participation"
              min={0}
              max={5}
              value={form.civic_participation ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Antigüedad laboral (años)
            <input
              className="input"
              type="number"
              step="0.5"
              name="job_tenure_years"
              min={0}
              max={50}
              value={form.job_tenure_years ?? ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Miembro sindicato
            <select
              className="input"
              name="union_member"
              value={form.union_member ?? ""}
              onChange={handleChange}
            >
              {yesNo.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sector público
            <select
              className="input"
              name="public_sector"
              value={form.public_sector ?? ""}
              onChange={handleChange}
            >
              {yesNo.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section>
        <h3 className="section-title">Preferencias declaradas</h3>
        <div className="grid two">
          <label>
            Primary choice
            <select
              className="input"
              name="primary_choice"
              value={form.primary_choice ?? ""}
              onChange={handleChange}
            >
              {choices.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Secondary choice
            <select
              className="input"
              name="secondary_choice"
              value={form.secondary_choice ?? ""}
              onChange={handleChange}
            >
              {choices.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
          <label>
            Participa en grupos (WA u otros)
            <select
              className="input"
              name="wa_groups"
              value={form.wa_groups ?? ""}
              onChange={handleChange}
            >
              {waGroups.map((g) => (
                <option key={g} value={g}>
                  {g === "" ? "Seleccione" : g}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="grid" style={{ gap: "10px" }}>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Calculando..." : "Predecir intencion de voto"}
        </button>
        <button
          className="btn-secondary"
          type="button"
          onClick={handleReset}
          disabled={loading}
        >
          Limpiar formulario
        </button>
      </div>
    </form>
  );
}
