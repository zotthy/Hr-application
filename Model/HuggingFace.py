import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List

MODEL_FILE_NAME = 'model_raport.pkl'

MODEL_FEATURES_ORDER = [
    'Experience (Years)', 'Education', 'Certifications', 'Job Role', 
    'Salary Expectation ($)', 'Projects Count', 'C++', 'Cybersecurity', 
    'Deep Learning', 'Ethical Hacking', 'Java', 'Linux', 
    'Machine Learning', 'NLP', 'Networking', 'Python', 'Pytorch', 
    'React', 'SQL', 'TensorFlow'
]

model = None

app = FastAPI(
    title="API Rankingu CV",
    description="API, które przyjmuje listę kandydatów, ocenia ich za pomocą modelu RandomForest i zwraca ranking."
)

class CandidateFeatures(BaseModel):

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
@app.on_event("startup")
def load_model():
    """Wczytuje model .pkl przy starcie aplikacji."""
    global model
    try:
        model = joblib.load(MODEL_FILE_NAME)
        print(f"--- Pomyślnie wczytano model z pliku: {MODEL_FILE_NAME} ---")
    except FileNotFoundError:
        print(f"BŁĄD KRYTYCZNY: Nie znaleziono pliku modelu: {MODEL_FILE_NAME}")
    except Exception as e:
        print(f"BŁĄD KRYTYCZNY: Nie można wczytać modelu z pliku {MODEL_FILE_NAME}. Błąd: {e}")

# --- 3. Punkty końcowe API (Endpoints) ---

@app.get("/")
def read_root():
    return {"status": "OK", "message": "Witaj w API do Rankingu CV!"}


@app.post("/rank", response_model=RankingResponse)
def rank_candidates(request: RankingRequest):
    global model
    if model is None:
        raise HTTPException(status_code=503, detail="Model nie jest jeszcze gotowy. Spróbuj ponownie za chwilę.")

    if not request.candidates:
        return {"ranked_candidates": []}

    try:
        # 1. Konwertuj listę kandydatów (z Pydantic) na listę słowników
        # Używamy .model_dump(by_alias=True), aby uzyskać nazwy z aliasów (np. "C++")
        candidate_data_list = [c.model_dump(by_alias=True) for c in request.candidates]
        
        # Przechowujemy identyfikatory do późniejszego użycia
        identifiers = [c['identifier'] for c in candidate_data_list]

        # 2. Stwórz DataFrame z poprawną kolejnością kolumn
        # To jest absolutnie krytyczne dla modelu scikit-learn!
        df = pd.DataFrame(candidate_data_list)
        
        # Upewnij się, że brakuje tylko kolumny 'identifier', a reszta pasuje
        features_df = df.drop(columns=['identifier'])
        
        # Ustaw kolejność kolumn DOKŁADNIE tak, jak w treningu
        features_df_ordered = features_df[MODEL_FEATURES_ORDER]

        # 3. Predykcja
        # Używamy predict_proba(), aby dostać prawdopodobieństwo, a nie tylko 0 lub 1
        # [:, 1] oznacza, że bierzemy prawdopodobieństwo dla klasy '1' (Zaproszony)
        probabilities = model.predict_proba(features_df_ordered)[:, 1]

        # 4. Tworzenie odpowiedzi
        ranked_list = []
        for i, identifier in enumerate(identifiers):
            ranked_list.append(RankedCandidate(
                identifier=identifier,
                score=probabilities[i]
            ))

        # 5. Sortowanie
        # Sortuj listę kandydatów malejąco (descending) po wyniku (score)
        sorted_ranked_list = sorted(ranked_list, key=lambda x: x.score, reverse=True)

        return {"ranked_candidates": sorted_ranked_list}

    except KeyError as e:
        # Ten błąd wystąpi, jeśli w danych wejściowych brakuje jakiejś cechy
        raise HTTPException(status_code=400, detail=f"Brakująca lub błędna cecha (KeyError): {e}")
    except Exception as e:
        # Ogólny błąd serwera
        raise HTTPException(status_code=500, detail=f"Wystąpił wewnętrzny błąd serwera: {str(e)}")

# Uruchomienie aplikacji (dla testów lokalnych)
# Hugging Face Spaces użyje własnego serwera (uvicorn), ale to jest przydatne
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
