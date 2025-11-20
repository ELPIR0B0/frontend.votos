export type VoterPayload = {
  age?: number;
  gender?: string;
  education?: string;
  employment_status?: string;
  employment_sector?: string;
  income_bracket?: string;
  marital_status?: string;
  household_size?: number;
  has_children?: string;
  urbanicity?: string;
  region?: string;
  voted_last?: string;
  party_id_strength?: number;
  union_member?: string;
  public_sector?: string;
  home_owner?: string;
  small_biz_owner?: string;
  owns_car?: string;
  wa_groups?: string;
  refused_count?: number;
  attention_check?: number;
  will_turnout?: number;
  undecided?: number;
  preference_strength?: number;
  survey_confidence?: number;
  tv_news_hours?: number;
  social_media_hours?: number;
  trust_media?: number;
  civic_participation?: number;
  job_tenure_years?: number;
  primary_choice?: string;
  secondary_choice?: string;
};

export type Probability = { label: string; probability: number };

export type Prediction = {
  predicted_vote: string;
  class_probabilities?: Probability[];
  nearest_neighbors_info?: {
    indices?: number[];
    distances?: number[];
  };
};

export type ModelInfo = {
  model_type: string;
  k_value: number;
  metric: string;
  weights: string;
  trained_at?: string;
  train_size?: number;
  val_accuracy?: number;
  test_accuracy?: number;
  classes: string[];
  feature_columns: string[];
  notes?: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    const message = detail?.detail || res.statusText;
    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }
  return res.json();
}

export async function fetchModelInfo(): Promise<ModelInfo> {
  const res = await fetch(`${API_BASE}/model-info`, { next: { revalidate: 60 } });
  return handleResponse<ModelInfo>(res);
}

export async function predict(payload: VoterPayload): Promise<Prediction> {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Prediction>(res);
}
