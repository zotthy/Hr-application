import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List
from huggingface_hub import hf_hub_download

# --- Sekcja Konfiguracji Modelu ---
MODEL_FILE_NAME = 'model_raport.pkl'
# Upewnij się, że ta nazwa repozytorium jest poprawna!
MODEL_REPO_ID = 'zotthytt12/model_hr' 

MODEL_FEATURES_ORDER = [
    'Experience (Years)', 'Education', 'Certifications', 'Job Role', 
    'Salary Expectation ($)', 'Projects Count', 'C++', 'Cybersecurity', 
    'Deep Learning', 'Ethical Hacking', 'Java', 'Linux', 
    'Machine Learning', 'NLP', 'Networking', 'Python', 'Pytorch', 
    'React', 'SQL', 'TensorFlow'
]

# --- Globalna zmienna na model ---
model = None

# --- Definicja API (FastAPI) ---
app = FastAPI(
    title="API Rankingu CV",
    description="API, które przyjmuje listę kandydatów, ocenia ich za pomocą modelu RandomForest i zwraca ranking."
)

# --- 1. Modele danych (Pydantic) ---

class CandidateFeatures(BaseModel):
    """Definiuje cechy JEDNEGO kandydata."""
    identifier: str = Field(..., description="Unikalny identyfikator kandydata, np. email lub ID.")
    Experience_Years: float = Field(..., alias="Experience (Years)")
    Education: float
    Certifications: float
    Job_Role: float = Field(..., alias="Job Role")
    Salary_Expectation: float = Field(..., alias="Salary Expectation ($)")
    Projects_Count: float = Field(..., alias="Projects Count")
    Cpp: float = Field(..., alias="C++")
    Cybersecurity: float
    Deep_Learning: float = Field(..., alias="Deep Learning")
    Ethical_Hacking: float = Field(..., alias="Ethical Hacking")
    Java: float
    Linux: float
    Machine_Learning: float = Field(..., alias="Machine Learning")
    NLP: float
    Networking: float
    Python: float
    Pytorch: float
    React: float
    SQL: float
    TensorFlow: float

    class Config:
        populate_by_name = True

class RankingRequest(BaseModel):
    """Definiuje format zapytania - oczekujemy listy kandydatów."""
    candidates: List[CandidateFeatures]

class RankedCandidate(BaseModel):
    """Definiuje format odpowiedzi dla jednego kandydata."""
    identifier: str
    score: float = Field(..., description="Prawdopodobieństwo zaproszenia (0.0 do 1.0)")

class RankingResponse(BaseModel):
    """Definiuje format odpowiedzi - zwracamy listę ocenionych kandydatów."""
    ranked_candidates: List[RankedCandidate]


# --- 2. Ładowanie modelu ---
# (Używamy nowszego 'lifespan' zamiast 'on_event')
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Kod uruchamiany przy starcie
    global model
    print("--- Rozpoczynanie ładowania modelu z Huba... ---")
    try:
        model_path = hf_hub_download(
            repo_id=MODEL_REPO_ID,
            filename=MODEL_FILE_NAME
        )
    
        model = joblib.load(model_path)
        print(f"--- Pomyślnie pobrano i wczytano model z Huba: {MODEL_REPO_ID} ---")

        # 🧹 Naprawa nazw kolumn – usuwamy spacje z przodu i końca
        if hasattr(model, "feature_names_in_"):
            clean_names = [f.strip() for f in model.feature_names_in_]
            model.feature_names_in_ = clean_names
            print("🧹 Oczyszczone feature_names_in_:", model.feature_names_in_)
        print(f"--- Pomyślnie pobrano i wczytano model z Huba: {MODEL_REPO_ID} ---")
        print("Feature names in model:", model.feature_names_in_)
        
    except Exception as e:
        print(f"BŁĄD KRYTYCZNY: Nie można wczytać modelu z Huba ({MODEL_REPO_ID}). Błąd: {e}")
    
    yield
    # Kod uruchamiany przy zamknięciu (jeśli potrzebny)
    print("--- Zamykanie aplikacji ---")

# Przypisz funkcję lifespan do aplikacji
app.router.lifespan_context = lifespan


# --- 3. Punkty końcowe API (Endpoints) ---

@app.get("/")
def read_root():
    """Podstawowy endpoint (główna strona) do sprawdzania, czy API działa."""
    return {"status": "OK", "message": "Witaj w API do Rankingu CV!"}


@app.post("/rank", response_model=RankingResponse)
def rank_candidates(request: RankingRequest):
    """
    Ten endpoint przyjmuje listę kandydatów, przetwarza ich dane,
    przepuszcza przez model i zwraca posortowany ranking.
    """
    global model
    if model is None:
        # Jeśli model się nie załadował przy starcie, zwróć błąd
        raise HTTPException(status_code=503, detail="Model nie jest jeszcze gotowy. Sprawdź logi serwera.")

    if not request.candidates:
        return {"ranked_candidates": []}

    try:
        # 1. Konwertuj listę kandydatów
        candidate_data_list = [c.model_dump(by_alias=True) for c in request.candidates]
        identifiers = [c['identifier'] for c in candidate_data_list]

        # 2. Stwórz DataFrame
        df = pd.DataFrame(candidate_data_list)
        
        # Upewnij się, że brakuje tylko kolumny 'identifier', a reszta pasuje
        features_df = df.drop(columns=['identifier'])
        
        features_df_ordered = features_df.reindex(columns=model.feature_names_in_, fill_value=0)


        # 3. Predykcja
        probabilities = model.predict_proba(features_df_ordered)[:, 1]

        # 4. Tworzenie odpowiedzi
        ranked_list = []
        for i, identifier in enumerate(identifiers):
            ranked_list.append(RankedCandidate(
                identifier=identifier,
                score=probabilities[i]
            ))

        # 5. Sortowanie
        sorted_ranked_list = sorted(ranked_list, key=lambda x: x.score, reverse=True)

        return {"ranked_candidates": sorted_ranked_list}

    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Brakująca lub błędna cecha (KeyError): {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Wystąpił wewnętrzny błąd serwera: {str(e)}")

# Uruchomienie aplikacji (dla testów lokalnych)
if __name__ == "__main__":
    import uvicorn
    # Uwaga: przy starcie z __main__ lifespan nie zadziała automatycznie
    # Trzeba by go wywołać ręcznie lub po prostu polegać na teście z uvicorn
    print("Uruchamianie lokalne - model zostanie załadowany przez 'lifespan' po starcie uvicorn.")
    uvicorn.run(app, host="0.0.0.0", port=8000)