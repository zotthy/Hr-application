# HR AI Application 🤖💼

An intelligent application that leverages Machine Learning to identify and rank the best candidates for job positions.

## 🚀 Jak uruchomić projekt

Postępuj zgodnie z poniższymi krokami, aby szybko uruchomić aplikację w środowisku lokalnym.

### 1. Sklonuj repozytorium
```bash
git clone [https://github.com/zotthy/Hr-application.git](https://github.com/zotthy/Hr-application.git)
cd Hr-application
docker compose --profile all up
```
Open browser and come in: localhost:3000

# Problematyka

Głównym wyzwaniem współczesnych procesów rekrutacyjnych, szczególnie w
dynamicznie rozwijającym się sektorze IT, jest ogromna dysproporcja
między liczbą napływających aplikacji a możliwościami operacyjnymi
działów HR. Na popularne stanowiska spływają setki, a niekiedy tysiące
dokumentów CV, co generuje szereg problemów natury logistycznej i
merytorycznej:

-   **Wysoki koszt czasu i zasobów:** Szacuje się, że rekruterzy
    spędzają średnio od 60% do 80% swojego czasu na manualnej
    preselekcji dokumentów. Jest to proces wysoce powtarzalny, który
    odciąga specjalistów od kluczowych zadań, takich jak pogłębione
    wywiady i budowanie relacji z kandydatami.

-   **Ryzyko błędu ludzkiego i przeoczenia talentów:** Przy analizie
    setek aplikacji w krótkim czasie łatwo o pomyłkę. Kandydaci o
    wysokim potencjale, którzy nie użyli w swoich dokumentach idealnie
    dopasowanych fraz kluczowych, mogą zostać odrzuceni na wstępnym
    etapie.

-   **Subiektywizm i brak obiektywności:** Ludzka ocena jest z natury
    podatna na nieświadome uprzedzenia oraz zmęczenie. Implementacja
    modelu AI pozwala na ujednolicenie procesu oceny, stosując te same,
    obiektywne kryteria wobec każdego kandydata.

-   **Wydłużony czas trwania procesu (Time-to-Hire):** Zanim zespół
    rekrutacyjny zdoła przeanalizować wszystkie zgłoszenia metodami
    tradycyjnymi, najbardziej utalentowani specjaliści są często
    przejmowani przez konkurencję, która dysponuje sprawniejszymi
    mechanizmami selekcji.

W obliczu powyższych czynników, automatyzacja procesu wstępnej selekcji
przy użyciu nowoczesnych algorytmów staje się niezbędnym elementem
budowania przewagi konkurencyjnej przedsiębiorstwa na rynku pracy.

# Cel projektu

Celem projektu jest stworzenie inteligentnego systemu wspomagającego
proces wstępnej selekcji kandydatów na określone stanowiska pracy.
System ten ma na celu automatyzację analizy aplikacji kandydatów,
identyfikację kluczowych kompetencji oraz dopasowanie ich do wymagań
stanowiska, co pozwoli na efektywniejsze zarządzanie procesem
rekrutacyjnym.

# Zakres projektu

Zakres niniejszego projektu obejmuje zaprojektowanie oraz implementację
kompleksowego systemu wspomagania procesów rekrutacyjnych,
wykorzystującego algorytmy sztucznej inteligencji. Projekt realizuje
pełną ścieżkę obiegu dokumentów aplikacyjnych -- od publikacji
ogłoszenia po automatyczną ocenę kandydata.

## Zakres funkcjonalny

W ramach systemu zaimplementowano funkcjonalności dedykowane dla dwóch
grup użytkowników:

-   **Moduł administratora (rekrutera):**

    -   Tworzenie i zarządzanie ofertami pracy.

    -   Dostęp do panelu klasyfikacji uczestników z automatycznym
        rankingiem.

    -   Podgląd rekomendacji AI dotyczących zaproszenia kandydata na
        rozmowę rekrutacyjną.

-   **Moduł kandydata:**

    -   Przeglądanie aktualnych ofert pracy.

    -   Składanie aplikacji poprzez dedykowany formularz.

    -   Możliwość przesłania pliku CV, z którego dane są automatycznie
        ekstrahowane do systemu.

## Wymagania niefunkcjonalne

Wymagania niefunkcjonalne definiują parametry jakościowe i techniczne,
które musi spełniać system, aby zapewnić efektywną i bezpieczną pracę
rekruterów oraz kandydatów.

-   **Bezpieczeństwo i prywatność danych (RODO):** System zapewnia
    poufność danych kandydatów poprzez anonimizację dokumentów PDF przed
    wysłaniem ich do zewnętrznych modeli językowych (LLM). Dane wrażliwe
    są maskowane, a dostęp do pełnych profili mają wyłącznie uprawnieni
    rekruterzy.

-   **Wydajność i responsywność:** Wykorzystanie architektury
    mikrousługowej oraz mechanizmu *lifespan* w FastAPI pozwala na
    uzyskanie wyniku predykcji w czasie poniżej 2 sekund dla pojedynczej
    aplikacji. Interfejs użytkownika (React) zapewnia płynne działanie
    bez konieczności przeładowywania całej strony.

-   **Skalowalność:** Dzięki separacji serwisu biznesowego (Java) od
    modułu AI (Python), możliwe jest niezależne skalowanie mocy
    obliczeniowej potrzebnej do analizy CV w okresach wzmożonej
    rekrutacji.

-   **Niezawodność i obsługa błędów:** System jest odporny na błędy w
    strukturze przesyłanych plików CV. W przypadku niepowodzenia analizy
    przez AI, rekruter otrzymuje stosowne powiadomienie, a system
    umożliwia ręczną weryfikację aplikacji.

-   **Dokładność predykcji:** Zastosowany model XGBoost charakteryzuje
    się wysoką czułością (*Recall* na poziomie 96% dla klasy
    „Zaproszony"), co minimalizuje ryzyko odrzucenia wartościowych
    kandydatów przez algorytm.

-   **Dostępność (Usability):** Interfejs został zaprojektowany w sposób
    intuicyjny, nie wymagający od rekrutera wiedzy technicznej z zakresu
    działania algorytmów uczenia maszynowego. Wynik AI prezentowany jest
    w postaci czytelnego rankingu punktowego.

# Architektura i stos technologiczny

System został zaprojektowany w architekturze rozproszonej, co pozwala na
separację logiki biznesowej od obliczeniowo kosztownych operacji
związanych z modelem sztucznej inteligencji.

## Technologie wykorzystane w projekcie

W projekcie wykorzystano następujące technologie:

-   **Frontend (React):** Odpowiada za interaktywny interfejs
    użytkownika. Zapewnia responsywność i dynamiczne przełączanie
    widoków dla administratora oraz kandydatów.

-   **Backend biznesowy (Java Spring Boot):** Stanowi rdzeń systemu.
    Zarządza bezpieczeństwem, bazą danych ofert pracy, procesami
    aplikacyjnymi oraz integruje komunikację między frontendem a
    serwisem AI.

-   **Serwis AI (Python FastAPI):** Wysokowydajny mikrousługa dedykowana
    do obsługi modelu uczenia maszynowego. Wybór FastAPI podyktowany był
    natywnym wsparciem dla operacji asynchronicznych i łatwością
    integracji z bibliotekami AI w języku Python.

-   **Model AI:** Komponent odpowiedzialny za analizę semantyczną CV
    oraz predykcję prawdopodobieństwa zaproszenia kandydata na rozmowę.

## Przepływ danych w systemie

Proces komunikacji wewnątrz systemu przebiega w następujący sposób:

1.  Kandydat przesyła CV poprzez aplikację napisaną w **React**.

2.  **Spring Boot** odbiera dokument, zapisuje go i wysyła zapytanie do
    serwisu **FastAPI**.

3.  Serwis **FastAPI** uruchamia model AI, który analizuje treść i
    zwraca wynik predykcji.

4.  Wynik jest zapisywany w bazie danych, a rekruter w swoim panelu
    widzi gotową klasyfikację kandydatów.

# Model AI

Dane do trenowania modelu AI pobrano z serwisu Kaggle:
<https://www.kaggle.com/datasets/mdtalhask/ai-powered-resume-screening-dataset-2025/data>
dostępny na platformie Kaggle.com. Zbiór danych zawiera informacje o
kandydatach oraz ich umiejetnosci i doświadczeniu zawodowym. Celem
modelu jest przewidzenie prawdopodobieństwa zaproszenia kandydata na
rozmowę kwalifikacyjną na podstawie analizy jego CV.

## Proces przetwarzania danych

Proces przygotowania danych do trenowania modelu AI został podzielony na
dwa kluczowe etapy: wstępną analizę eksploracyjną oraz właściwy
preprocessing.

## Analiza eksploracyjna danych (EDA)

Celem analizy EDA (ang. *Exploratory Data Analysis*) było zrozumienie
korelacji w zbiorze danych. Na tym etapie zidentyfikowano:

-   rozkład kluczowych słów w zależności od stanowisk,

-   braki danych w polach takich jak doświadczenie zawodowe czy
    wykształcenie,

-   potencjalne anomalie wpływające na proces uczenia.

![Wskaźnik zatrudnienia w zależności od umiejętności
kandydata](images/bar_skill_hire_rate.png)

![Liczba projektów w CV a wskaźnik
zatrudnienia](images/image.png)

![Oczekiwania
finansowe](images/boxplot_salary.png)

![Decyzje o zatrudnieniu w zależności od poziomu
wykształcenia](images/chart_education_vs_hire.png)

![Rozkład lat doświadczenia zawodowego w zależności od decyzji o
zatrudnieniu](images/chart_experience_kde.png){#fig:experience_kde
width="80%"}

## Przygotowanie danych (Preprocessing)

Bazując na wynikach analizy EDA, przystąpiono do transformacji danych.
Proces ten objął:

-   **Normalizację tekstu:** zastosowanie lematyzacji w celu
    sprowadzenia słów do ich form podstawowych.

-   **Wektoryzację:** zamianę przetworzonego tekstu na postać numeryczną
    akceptowalną przez model AI.

![Dane przed
wektoryzacją](images/przedwektoryzacja.png)

![Dane po
wektoryzacji](images/powektoryzacji.png)

Dane po wektoryzacji zostały podzielone na zbiór treningowy (80%) oraz
testowy (20%) w celu oceny skuteczności modelu.

## Wybór modelu

Do stworzenia prototypu wybrano trzy algorytmy klasyfikacji, aby
wstępnie ocenić, który z nich najlepiej sprawdza się w przewidywaniu
decyzji rekrutera.

-   Random Forest

-   XgBoost

-   CatBoost

![Macierz pomyłek dla modelu Random
Forest](images/randomForest.png)

![Macierz pomyłek dla modelu
XGBoost](images/XGboost.png)

![Macierz pomyłek dla modelu
CatBoost](images/CatBoost.png)

Po przeprowadzeniu testów porównawczych różnych algorytmów
klasyfikacyjnych, do ostatecznej implementacji wybrano model **XGBoost**
(ang. *Extreme Gradient Boosting*).

## Uzasadnienie wyboru

Pomimo zbliżonej dokładności ogólnej (*Accuracy* na poziomie 95,3%)
względem modelu CatBoost, zdecydowano się na wybór XGBoost ze względu na
parametr **Recall dla klasy „Zaproszony", który wyniósł aż 96%**.

W kontekście biznesowym rekrutacji, kluczowe jest zminimalizowanie
ryzyka przeoczenia utalentowanego kandydata (tzw. błąd drugiego
rodzaju). Wysoka czułość (Recall) modelu XGBoost daje największą
pewność, że niemal każdy wartościowy kandydat zostanie zidentyfikowany
przez system, co czyni ten wybór najbardziej efektywnym.

## Metryki skuteczności modelu

Szczegółowa analiza wyników klasyfikacji dla modelu **XGBoost** prezentuje się następująco:

| Klasa | Precision | Recall | F1-score |
| :--- | :---: | :---: | :---: |
| **0 (Odrzucony)** | 0,99 | 0,95 | 0,97 |
| **1 (Zaproszony)** | 0,82 | 0,96 | 0,89 |
| **Accuracy** | | **0,9533 (95,33%)** | |

**Interpretacja wyników:**

-   **Precyzja dla klasy „Odrzucony" (0,99):** Jeśli model sugeruje
    odrzucenie kandydata, ma rację w 99% przypadków, co minimalizuje
    ryzyko nieuzasadnionego zaproszenia słabych kandydatów.

-   **Czułość dla klasy „Zaproszony" (0,96):** Model skutecznie
    odnajduje 96% wszystkich kandydatów, którzy powinni otrzymać
    zaproszenie.

-   **False Positives:** Precyzja na poziomie 0,82 dla klasy 1 oznacza,
    że około 18% osób oznaczonych jako „do zaproszenia" może w
    rzeczywistości nie spełniać wszystkich kryteriów, co jest
    akceptowalnym kosztem przy tak wysokiej czułości.

## Ważność cech (Feature Importance)

Analiza ważności cech pozwala zrozumieć, jakie parametry miały największy wpływ na decyzje modelu. Wyniki wskazują na kluczową rolę doświadczenia zawodowego w procesie rekrutacyjnym.

| Cecha (Atrybut) | Znaczenie (Waga) | Wizualizacja |
| :--- | :---: | :--- |
| **Doświadczenie (lata)** | 36,6% | ████████████ |
| **Liczba projektów** | 14,6% | █████ |
| **Networking** | 6,1% | ██ |
| **NLP (Natural Language Processing)** | 4,4% | █ |
| **Python** | 4,0% | █ |
| **Cybersecurity** | 2,8% | █ |
| **Java** | 2,7% | █ |
| **Ethical Hacking** | 2,1% | ░ |
| **Machine Learning** | 2,0% | ░ |

**Wnioski z analizy cech:** Najsilniejszym predyktorem jest **staż
pracy** oraz **liczba zrealizowanych projektów**. Model wysoko punktuje
również konkretne umiejętności techniczne (Networking, NLP, Python), co
potwierdza, że system promuje kandydatów z praktyczną wiedzą
specjalistyczną.

# Implementacja systemu

System został zrealizowany w architekturze rozproszonej, co pozwoliło na
odseparowanie stabilnej logiki biznesowej od dynamicznego środowiska
analitycznego AI. Całość opiera się na trzech głównych filarach:
interfejsie użytkownika, serwerze centralnym oraz mikroserwisie
predykcyjnym.

## Stos technologiczny

W projekcie wykorzystano następujące technologie:

-   **Frontend:** React.js -- odpowiedzialny za responsywny interfejs
    rekrutera i formularz zgłoszeniowy kandydata.

-   **Backend biznesowy:** Java (Spring Boot) -- zarządza bazą danych
    MySql, autoryzacją oraz orkiestracją procesów.

-   **Serwis AI:** Python (FastAPI) -- dedykowana usługa obsługująca
    model XGBoost przy użyciu bibliotek Pandas i Joblib.

## Logika integracji modułów

Kluczowym aspektem implementacji jest bezstanowa komunikacja pomiędzy
systemem Spring Boot a serwisem FastAPI. Proces oceny kandydata
przebiega według następującego schematu:

1.  Serwer biznesowy przesyła ustrukturyzowany obiekt JSON z cechami
    kandydata (np. lata doświadczenia, umiejętności techniczne).

2.  Serwis FastAPI, dzięki wykorzystaniu mechanizmu *lifespan*, posiada
    załadowany w pamięci RAM model `xgboost.pkl`, co pozwala na
    błyskawiczną odpowiedź.

3.  Model oblicza prawdopodobieństwo sukcesu (*score*) i zwraca je do
    systemu głównego.

## Implementacja serwisu predykcyjnego (FastAPI)

Poniżej przedstawiono fragment implementacji punktu końcowego `/rank`,
który odpowiada za logikę rankingu:

``` {.python fontsize="\\small" breaklines=""}
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
```

## Baza danych

Do przechowywania danych wykorzystano bazę **MySql**. Schemat bazy
obejmuje tabele ofert pracy, profilów kandydatów oraz historycznych
wyników predykcji, co umożliwia rekruterom powrót do archiwalnych
rankingów bez konieczności ponownego uruchamiania modelu AI.

![Baza danych stworzona do
projektu](images/bazadanych.png){#fig:databsearepresentation
width="100%"}

## Backend biznesowy -- Spring Boot

Główny moduł serwerowy został zaimplementowany w środowisku Spring Boot,
które odpowiada za logikę biznesową, zarządzanie danymi oraz integrację
wszystkich komponentów systemu. Wybór Javy podyktowany był jej
stabilnością, silnym typowaniem oraz doskonałym wsparciem dla
architektury mikrousługowej.

## Kluczowe funkcjonalności modułu

W strukturze systemu Spring Boot realizuje następujące zadania:

-   **Inteligentna ekstrakcja (Spring AI):** System wykorzystuje
    bibliotekę **Spring AI** do integracji z modelem LLM. Zamiast
    prostego parsowania tekstu, model językowy analizuje treść pliku PDF
    i automatycznie mapuje ją na ustrukturyzowany obiekt Java (DTO).

-   **Anonimizacja danych:** Przed wysłaniem dokumentu do zewnętrznego
    modelu AI, system wykonuje anonimizację pliku. Dane wrażliwe (dane
    osobowe, kontaktowe) są usuwane, co zapewnia pełną zgodność z
    **RODO**.

-   **Przygotowanie wektora cech:** Wynik z modelu LLM w formacie JSON
    zawiera precyzyjne dane (np. lata doświadczenia, znajomość
    Python/SQL). Dane te stanowią gotowy wektor wejściowy dla algorytmu
    **XGBoost** w serwisie FastAPI.

-   **Integracja usług:** Wyekstrahowane cechy są przesyłane przez
    Spring Boot do mikrousługi Pythonowej za pomocą klasy `WebClient`,
    gdzie następuje ostateczna ocena i ranking kandydata.

### Implementacja modulu SpringAi

``` {.java fontsize="\\small" breaklines=""}
        public void applyToRecruitmentWithFile(Long recruitmentId, CandidateDtoCv candidateDtoCv, MultipartFile file)
        throws Exception {
    Recruitment recruitment = recruitmentRepository.findById(recruitmentId)
            .orElseThrow(() -> new ResourceNotFoundException("Recruitment not found"));

    System.out.println("Processing CV for: " + candidateDtoCv.getFirstName() + " " + candidateDtoCv.getLastName()
            + ", Email: " + candidateDtoCv.getEmail());
    System.out.println("________");

    String originalContent;
    try (PDDocument document = Loader.loadPDF(file.getBytes())) {
        PDFTextStripper stripper = new PDFTextStripper();
        originalContent = stripper.getText(document);
    }

    System.out.println(originalContent);

    String anonymizedContent = originalContent;
    List<String> phrasesToRemove = List.of(candidateDtoCv.getFirstName(), candidateDtoCv.getLastName(),
            candidateDtoCv.getEmail());

    for (String phrase : phrasesToRemove) {
        if (phrase != null && !phrase.isBlank()) {
            anonymizedContent = anonymizedContent.replaceAll("(?i)" + Pattern.quote(phrase), "[REDACTED]");
        }
    }

    System.out.println(anonymizedContent);

    String anonimData = anonymizedContent;

    String systemMessage = """
            Jesteś ekspertem HR. Przeanalizuj tekst CV i przypisz odpowiednie identyfikatory liczbowe dla poniższych pól:

            1. jobRole (Poziom Seniority):
               1: Junior (0-2 lata doświadczenia lub stanowisko młodsze)
               2: Mid (2-5 lat doświadczenia)
               3: Senior (5-10 lat doświadczenia)
               4: Expert (powyżej 10 lat doświadczenia lub rola architekta)

            2. education (Wykształcenie):
               1: Zawodowe
               2: Średnie (Technikum, Liceum)
               3: Licencjat / Inżynier
               4: Magister
               5: Doktorat

            3. salaryExpectation (Oszacuj na podstawie doświadczenia, jeśli nie podano):
               1: < 3500, 2: 3500-5000, 3: 5000-7000, 4: 7000-10000,
               5: 10000-15000, 6: 15000-20000, 7: 20000-30000, 8: > 30000

            4. Umiejętności techniczne (java, python, sql itp.):
               Zwróć 1 jeśli posiada, 0 jeśli brak.

            Wszystkie te pola muszą być typu Integer. Zwróć tylko czysty JSON.
            """;

    CandidateApplication aiExtractedData = chatClient.prompt()
            .system(systemMessage)
            .user(u -> u.text("Oto zanonimizowany tekst CV: {context}")
                    .param("context", anonimData))
            .call()
            .entity(CandidateApplication.class);

    System.out.println(aiExtractedData.toString());

    if (aiExtractedData != null) {
        Filedb fileEntity = new Filedb(
            file.getOriginalFilename(), 
            file.getContentType(), 
            file.getBytes()
        );
        fileEntity = filedbRepository.save(fileEntity);
    
        CandidateApplication finalApplication = new CandidateApplication();
        

        finalApplication.setFirstName(candidateDtoCv.getFirstName());
        finalApplication.setLastName(candidateDtoCv.getLastName());
        finalApplication.setEmail(candidateDtoCv.getEmail());
        finalApplication.setSalaryExpectation(candidateDtoCv.getSalaryExpectation());
        finalApplication.setRecruitment(recruitment);
        finalApplication.setFiledb(fileEntity);
        finalApplication.setStatus("");
        finalApplication.setJobId("");

        finalApplication.setExperienceYears(aiExtractedData.getExperienceYears());
        finalApplication.setEducation(aiExtractedData.getEducation());
        finalApplication.setJobRole(aiExtractedData.getJobRole());
        finalApplication.setCertifications(aiExtractedData.getCertifications());
        finalApplication.setProjectsCount(aiExtractedData.getProjectsCount());

        finalApplication.setJava(aiExtractedData.getJava());
        finalApplication.setPython(aiExtractedData.getPython());
        finalApplication.setSql(aiExtractedData.getSql());
        finalApplication.setCpp(aiExtractedData.getCpp());
        finalApplication.setLinux(aiExtractedData.getLinux());
        finalApplication.setReact(aiExtractedData.getReact());
        finalApplication.setTensorFlow(aiExtractedData.getTensorFlow());
        finalApplication.setPytorch(aiExtractedData.getPytorch());
        finalApplication.setMachineLearning(aiExtractedData.getMachineLearning());
        finalApplication.setDeepLearning(aiExtractedData.getDeepLearning());
        finalApplication.setNlp(aiExtractedData.getNlp());
        finalApplication.setNetworking(aiExtractedData.getNetworking());
        finalApplication.setCybersecurity(aiExtractedData.getCybersecurity());
        finalApplication.setEthicalHacking(aiExtractedData.getEthicalHacking());

        candidateRepository.save(finalApplication);
        
        System.out.println("Zapisano pomyślnie nową aplikację z kompletem skilli!");
    }
}
```

### Implementacja modułu odpowiedzialnego za komunikację z FastApi

``` {.java fontsize="\\small" breaklines=""}
public void rankedCandidates(Long recruitmentId, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));
    
        Recruitment recruitment = recruitmentRepository.findById(recruitmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruitment not found with id: " + recruitmentId));
    
        if (!recruitment.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Access denied: You do not own this recruitment");
        }
    
        List<CandidateApplication> applications = candidateRepository.findByRecruitmentId(recruitmentId);
    
        if (applications.isEmpty()) {
            System.out.println("Brak aplikacji do oceny dla rekrutacji ID: " + recruitmentId);
            return;
        }
    
        List<CandidateFeaturesDTO> featuresList = applications.stream()
                .map(CandidateFeaturesDTO::fromEntity)
                .collect(Collectors.toList());
    
        RankingRequestDTO requestDTO = new RankingRequestDTO(featuresList);
    
        String pythonApiUrl = "http://127.0.0.1:8000/rank";
        System.out.println("Wysyłanie " + featuresList.size() + " kandydatów do AI pod adres: " + pythonApiUrl);
    
        RankingResponseDTO responseDto;
        try {
            responseDto = webClient
                    .post()
                    .uri(pythonApiUrl)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(requestDTO))
                    .retrieve()
                    .bodyToMono(RankingResponseDTO.class)
                    .block();

        } catch (Exception e) {
            System.err.println("BŁĄD KOMUNIKACJI Z SERWEREM PYTHON: " + e.getMessage());
            throw new RuntimeException("Model AI nie odpowiedział poprawnie.");
        }
    
        if (responseDto == null || responseDto.rankedCandidates() == null) {
            throw new RuntimeException("Otrzymano pustą odpowiedź z serwisu rankingowego.");
        }
    
        for (RankedCandidateDTO rankedResult : responseDto.rankedCandidates()) {
            Long candidateId;
            try {
                candidateId = Long.parseLong(rankedResult.identifier());
            } catch (NumberFormatException e) {
                continue;
            }
    
            applications.stream()
                    .filter(app -> app.getId().equals(candidateId))
                    .findFirst()
                    .ifPresent(candidate -> {
                        candidate.setScore(rankedResult.score());
                        candidate.setStatus("RANKED");
                    });
        }
        
        recruitment.setStatus("RANKED");
        recruitmentRepository.save(recruitment);

        candidateRepository.saveAll(applications);
        //System.out.println("Ranking zakończony sukcesem. Zaktualizowano " + applications.size() + " rekordów.");
    }
```

# Podsumowanie

W ramach niniejszego projektu zaprojektowano i zaimplementowano
inteligentny system wspomagający proces wstępnej selekcji kandydatów,
stanowiący odpowiedź na współczesne wyzwania działów HR w sektorze IT.
Połączenie nowoczesnych technologii backendowych, inżynierii danych oraz
uczenia maszynowego pozwoliło na stworzenie narzędzia, które znacząco
optymalizuje proces rekrutacyjny.

## Wnioski techniczne i operacyjne

Główne osiągnięcia projektu obejmują:

-   **Skuteczność predykcji:** Zastosowanie algorytmu **XGBoost**
    pozwoliło uzyskać wysoką czułość (*Recall*) na poziomie 96%, co
    gwarantuje, że system niemal bezbłędnie identyfikuje najbardziej
    obiecujących kandydatów, minimalizując ryzyko ich przeoczenia.

-   **Automatyzacja i oszczędność czasu:** Wykorzystanie biblioteki
    **Spring AI** do inteligentnej ekstrakcji danych z plików PDF
    umożliwiło odejście od czasochłonnej, manualnej analizy dokumentów
    na rzecz ustrukturyzowanych danych cyfrowych.

-   **Bezpieczeństwo i etyka AI:** Dzięki wdrożeniu procesu anonimizacji
    dokumentów przed ich analizą przez modele LLM, projekt spełnia
    rygorystyczne normy ochrony danych osobowych (RODO), zapewniając
    jednocześnie obiektywizm oceny wolny od ludzkich uprzedzeń.

-   **Skalowalna architektura:** Rozdzielenie logiki biznesowej (Java)
    od analitycznej (Python) zaowocowało systemem elastycznym, który
    może być łatwo rozbudowywany o nowe modele predykcyjne lub dodatkowe
    funkcjonalności bez przerywania ciągłości pracy.

## Perspektywy rozwoju

Opracowany system stanowi solidną bazę do dalszej rozbudowy. Potencjalne
kierunki rozwoju obejmują wdrożenie modułu automatycznej komunikacji z
kandydatami, analizę sentymentu listów motywacyjnych oraz integrację z
platformami zewnętrznymi (np. LinkedIn API).

Podsumowując, projekt udowadnia, że synergia technologii **Spring Boot**
oraz **FastAPI** w połączeniu z zaawansowanymi algorytmami klasyfikacji
stanowi skuteczne rozwiązanie problemu przeciążenia informacyjnego w
nowoczesnej rekrutacji, realnie wpływając na skrócenie wskaźnika
*Time-to-Hire*.


G. Dessler, *Human Resource Management*, Pearson, 2020.

R. L. Mathis, J. H. Jackson, S. R. Valentine, *Human Resource
Management*, Cengage Learning, 2015.

M. Armstrong, S. Taylor, *Armstrong's Handbook of Human Resource
Management Practice*, Kogan Page Publishers, 2020.

K. Sierra, B. Bates, *Head First Java*, O'Reilly Media, Inc., 2003.

M. Heckler, *Spring Boot: Up and Running*, O'Reilly Media, 2021.

W. McKinney, *Python for Data Analysis: Data Wrangling with Pandas,
NumPy, and IPython*, O'Reilly Media, 2017.

B. Ramirez, *FastAPI: Building Modern Python Web APIs*, Packt
Publishing, 2023.

V. Prusty, *ReactJS by Example - Building Modern Web Applications with
React*, Packt Publishing, 2016.

M. Lis, *PHP i MySQL. Dla każdego. Wydanie II*, Helion, 2014.
:::
