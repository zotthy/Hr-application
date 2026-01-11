package com.example.demo.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.demo.Entity.CandidateApplication;

public record CandidateFeaturesDTO(
    String identifier,

    @JsonProperty("Experience (Years)")
    Double experienceYears,

    @JsonProperty("Education")
    Double education,

    @JsonProperty("Certifications")
    Double certifications,

    @JsonProperty("Job Role")
    Double jobRole,

    @JsonProperty("Salary Expectation ($)")
    Double salaryExpectation,

    @JsonProperty("Projects Count")
    Double projectsCount,

    @JsonProperty("C++")
    Double cpp,

    @JsonProperty("Cybersecurity")
    Double cybersecurity,

    @JsonProperty("Deep Learning")
    Double deepLearning,

    @JsonProperty("Ethical Hacking")
    Double ethicalHacking,

    @JsonProperty("Java")
    Double java,

    @JsonProperty("Linux")
    Double linux,

    @JsonProperty("Machine Learning")
    Double machineLearning,

    @JsonProperty("NLP")
    Double nlp,

    @JsonProperty("Networking")
    Double networking,

    @JsonProperty("Python")
    Double python,

    @JsonProperty("Pytorch")
    Double pytorch,

    @JsonProperty("React")
    Double react,

    @JsonProperty("SQL")
    Double sql,

    @JsonProperty("TensorFlow")
    Double tensorFlow
) {
    public static CandidateFeaturesDTO fromEntity(CandidateApplication app) {
        String id = app.getId().toString(); 
        return new CandidateFeaturesDTO(
            id,
            toDouble(app.getExperienceYears()),
            toDouble(app.getEducation()),
            toDouble(app.getCertifications()),
            toDouble(app.getJobRole()),
            toDouble(app.getSalaryExpectation()),
            toDouble(app.getProjectsCount()),
            toDouble(app.getCpp()),
            toDouble(app.getCybersecurity()),
            toDouble(app.getDeepLearning()),
            toDouble(app.getEthicalHacking()),
            toDouble(app.getJava()),
            toDouble(app.getLinux()),
            toDouble(app.getMachineLearning()),
            toDouble(app.getNlp()),
            toDouble(app.getNetworking()),
            toDouble(app.getPython()),
            toDouble(app.getPytorch()),
            toDouble(app.getReact()),
            toDouble(app.getSql()),
            toDouble(app.getTensorFlow())
        );
    }

    private static Double toDouble(Integer value) {
        return value != null ? value.doubleValue() : 0.0;
    }
}