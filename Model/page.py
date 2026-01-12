import joblib
import pandas as pd
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, ConfigDict
from typing import List
from contextlib import asynccontextmanager

# --- KONFIGURACJA LOKALNA ---
MODEL_FILE_PATH = 'model_xgboost.pkl'

# --- 1. Zarządzanie modelem ---
model = None
model_features = None # Dodatkowa zmienna do przechowywania nazw cech

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, model_features
    print(f"--- Próba załadowania modelu z: {MODEL_FILE_PATH} ---")
    try:
        model = joblib.load(MODEL_FILE_PATH)
        
        # Pobieramy nazwy cech, ale NIE próbujemy ich nadpisywać w obiekcie modelu
        if hasattr(model, "feature_names_in_"):
            # Zapisujemy wyczyszczone nazwy do lokalnej zmiennej
            model_features = [f.strip() for f in model.feature_names_in_]
            print(f"✅ Model załadowany. Cechy: {model_features}")
        else:
            print("✅ Model załadowany (brak zdefiniowanych nazw cech).")
            
    except Exception as e:
        print(f"❌ BŁĄD KRYTYCZNY podczas ładowania modelu: {e}")
    
    yield
    print("--- Zamykanie aplikacji ---")

# --- 2. Definicja API ---
app = FastAPI(
    title="API Rankingu CV",
    lifespan=lifespan
)

# --- 3. Modele danych (Naprawiony Pydantic V2) ---

class CandidateFeatures(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    identifier: str = Field(..., description="ID kandydata")
    experience_years: float = Field(..., alias="Experience (Years)")
    education: float = Field(..., alias="Education")
    certifications: float = Field(..., alias="Certifications")
    job_role: float = Field(..., alias="Job Role")
    salary_expectation: float = Field(..., alias="Salary Expectation ($)")
    projects_count: float = Field(..., alias="Projects Count")
    cpp: float = Field(..., alias="C++")
    cybersecurity: float = Field(..., alias="Cybersecurity")
    deep_learning: float = Field(..., alias="Deep Learning")
    ethical_hacking: float = Field(..., alias="Ethical Hacking")
    java: float = Field(..., alias="Java")
    linux: float = Field(..., alias="Linux")
    machine_learning: float = Field(..., alias="Machine Learning")
    nlp: float = Field(..., alias="NLP")
    networking: float = Field(..., alias="Networking")
    python: float = Field(..., alias="Python")
    pytorch: float = Field(..., alias="Pytorch")
    react: float = Field(..., alias="React")
    sql: float = Field(..., alias="SQL")
    tensorflow: float = Field(..., alias="TensorFlow")

class RankingRequest(BaseModel):
    candidates: List[CandidateFeatures]

class RankedCandidate(BaseModel):
    identifier: str
    score: float

class RankingResponse(BaseModel):
    ranked_candidates: List[RankedCandidate]

# --- 4. Endpoints ---

@app.post("/rank", response_model=RankingResponse)
def rank_candidates(request: RankingRequest):
    global model, model_features
    if model is None:
        raise HTTPException(status_code=503, detail="Model nie jest załadowany.")

    try:
        data = [c.model_dump(by_alias=True) for c in request.candidates]
        df = pd.DataFrame(data)
        
        identifiers = df['identifier'].tolist()
        features_df = df.drop(columns=['identifier'])

        if model_features:
            features_df = features_df.reindex(columns=model_features, fill_value=0)

        probabilities = model.predict_proba(features_df.values)[:, 1]

        results = [
            RankedCandidate(identifier=identifiers[i], score=float(probabilities[i]))
            for i in range(len(identifiers))
        ]
        results.sort(key=lambda x: x.score, reverse=True)

        return {"ranked_candidates": results}

    except Exception as e:
        print(f"Błąd szczegółowy: {e}")
        raise HTTPException(status_code=500, detail=f"Błąd: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)