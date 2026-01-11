package com.example.demo.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity 
@Table(name = "candidate_applications")
public class CandidateApplication {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    @NotBlank(message = "Email jest wymagany")
    @Email(message = "Niepoprawny format email")
    private String email;

    @Column(nullable = false)
    private String jobId;

    @Column
    private String status;
    
    @Column(name = "feature_experience_years")
    private Integer experienceYears;

    @Column(name = "feature_education")
    private Integer education;

    @Column(name = "feature_certifications")
    private Integer certifications;

    @Column(name = "feature_job_role")
    private Integer jobRole;

    @Column(name = "feature_salary_expectation")
    private Integer salaryExpectation;

    @Column(name = "feature_projects_count")
    private Integer projectsCount;

    @Column(name = "skill_cpp")
    private Integer cpp;
    
    @Column(name = "skill_cybersecurity")
    private Integer cybersecurity;
    
    @Column(name = "skill_deep_learning")
    private Integer deepLearning;
    
    @Column(name = "skill_ethical_hacking")
    private Integer ethicalHacking;
    
    @Column(name = "skill_java")
    private Integer java;
    
    @Column(name = "skill_linux")
    private Integer linux;
    
    @Column(name = "skill_machine_learning")
    private Integer machineLearning;
    
    @Column(name = "skill_nlp")
    private Integer nlp;
    
    @Column(name = "skill_networking")
    private Integer networking;
    
    @Column(name = "skill_python")
    private Integer python;
    
    @Column(name = "skill_pytorch")
    private Integer pytorch;
    
    @Column(name = "skill_react")
    private Integer react;
    
    @Column(name = "skill_sql")
    private Integer sql;
    
    @Column(name = "skill_tensorflow")
    private Integer tensorFlow;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruitment_id", nullable = false) // Klucz obcy
    private Recruitment recruitment;

    public CandidateApplication() {
    }
    public CandidateApplication(
            // Dane kandydata
            String firstName, String lastName, String email, String jobId, 
            Recruitment recruitment,
            // Wynik
            Double score, String status, 
            // Cechy
            Integer experienceYears, Integer education, Integer certifications, 
            Integer jobRole, Integer salaryExpectation, Integer projectsCount, 
            // Umiejętności
            Integer cpp, Integer cybersecurity, Integer deepLearning, 
            Integer ethicalHacking, Integer java, Integer linux, 
            Integer machineLearning, Integer nlp, Integer networking, 
            Integer python, Integer pytorch, Integer react, 
            Integer sql, Integer tensorFlow) {
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.jobId = jobId;
        this.status = status;
        this.experienceYears = experienceYears;
        this.education = education;
        this.certifications = certifications;
        this.jobRole = jobRole;
        this.salaryExpectation = salaryExpectation;
        this.projectsCount = projectsCount;
        this.cpp = cpp;
        this.cybersecurity = cybersecurity;
        this.deepLearning = deepLearning;
        this.ethicalHacking = ethicalHacking;
        this.java = java;
        this.linux = linux;
        this.machineLearning = machineLearning;
        this.nlp = nlp;
        this.networking = networking;
        this.python = python;
        this.pytorch = pytorch;
        this.react = react;
        this.sql = sql;
        this.tensorFlow = tensorFlow;
        this.recruitment = recruitment;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobId() {
        return this.jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getExperienceYears() {
        return this.experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public Integer getEducation() {
        return this.education;
    }

    public void setEducation(Integer education) {
        this.education = education;
    }

    public Integer getCertifications() {
        return this.certifications;
    }

    public void setCertifications(Integer certifications) {
        this.certifications = certifications;
    }

    public Integer getJobRole() {
        return this.jobRole;
    }

    public void setJobRole(Integer jobRole) {
        this.jobRole = jobRole;
    }

    public Integer getSalaryExpectation() {
        return this.salaryExpectation;
    }

    public void setSalaryExpectation(Integer salaryExpectation) {
        this.salaryExpectation = salaryExpectation;
    }

    public Integer getProjectsCount() {
        return this.projectsCount;
    }

    public void setProjectsCount(Integer projectsCount) {
        this.projectsCount = projectsCount;
    }

    public Integer getCpp() {
        return this.cpp;
    }

    public void setCpp(Integer cpp) {
        this.cpp = cpp;
    }

    public Integer getCybersecurity() {
        return this.cybersecurity;
    }

    public void setCybersecurity(Integer cybersecurity) {
        this.cybersecurity = cybersecurity;
    }

    public Integer getDeepLearning() {
        return this.deepLearning;
    }

    public void setDeepLearning(Integer deepLearning) {
        this.deepLearning = deepLearning;
    }

    public Integer getEthicalHacking() {
        return this.ethicalHacking;
    }

    public void setEthicalHacking(Integer ethicalHacking) {
        this.ethicalHacking = ethicalHacking;
    }

    public Integer getJava() {
        return this.java;
    }

    public void setJava(Integer java) {
        this.java = java;
    }

    public Integer getLinux() {
        return this.linux;
    }

    public void setLinux(Integer linux) {
        this.linux = linux;
    }

    public Integer getMachineLearning() {
        return this.machineLearning;
    }

    public void setMachineLearning(Integer machineLearning) {
        this.machineLearning = machineLearning;
    }

    public Integer getNlp() {
        return this.nlp;
    }

    public void setNlp(Integer nlp) {
        this.nlp = nlp;
    }

    public Integer getNetworking() {
        return this.networking;
    }

    public void setNetworking(Integer networking) {
        this.networking = networking;
    }

    public Integer getPython() {
        return this.python;
    }

    public void setPython(Integer python) {
        this.python = python;
    }

    public Integer getPytorch() {
        return this.pytorch;
    }

    public void setPytorch(Integer pytorch) {
        this.pytorch = pytorch;
    }

    public Integer getReact() {
        return this.react;
    }

    public void setReact(Integer react) {
        this.react = react;
    }

    public Integer getSql() {
        return this.sql;
    }

    public void setSql(Integer sql) {
        this.sql = sql;
    }

    public Integer getTensorFlow() {
        return this.tensorFlow;
    }

    public void setTensorFlow(Integer tensorFlow) {
        this.tensorFlow = tensorFlow;
    }
    public Recruitment getRecruitment() {
        return this.recruitment;
    }
    public void setRecruitment(Recruitment recruitment) {
        this.recruitment = recruitment;
    }
    public String toString() {
        return "CandidateApplication{id=" + id + ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", jobId='" + jobId + '\'' +
                ", status='" + status + '\'' +
                ", experienceYears=" + experienceYears +
                ", education=" + education +
                ", certifications=" + certifications +
                ", jobRole=" + jobRole +
                ", salaryExpectation=" + salaryExpectation +
                ", projectsCount=" + projectsCount +
                ", cpp=" + cpp +
                ", cybersecurity=" + cybersecurity +
                ", deepLearning=" + deepLearning +
                ", ethicalHacking=" + ethicalHacking +
                ", java=" + java +
                ", linux=" + linux +
                ", machineLearning=" + machineLearning +
                ", nlp=" + nlp +
                ", networking=" + networking +
                ", python=" + python +
                ", pytorch=" + pytorch +
                ", react=" + react +
                ", sql=" + sql +
                ", tensorFlow=" + tensorFlow +
                '}';
    }
}

