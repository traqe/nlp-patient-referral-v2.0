import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Card from "../shared/Card";
import { images } from "../components/DoctorImages";
import { stringSimilarity } from "string-similarity-js"; 

export default function Result({ route, navigation }) {

    const showDescrition = (input) => {
        Alert.alert(input.specialty, input.description, [{text: 'Ok', onPress: () => console.log('specialty description shown')}]);
    }

    // dataset of symptom-disease-doctor
    const dataset = [
        {disease: 'Tuberculosis', symptom: 'chills vomiting fatigue weight loss cough high fever breathlessness sweating loss of appetite mild fever yellowing of eyes swelled lymph nodes malaise phlegm chest pain blood in sputum', doctor_id: 1, probability: 0},
        {disease: 'Fungal infection', symptom: 'itching skin rash nodal skin eruptions dischromic  patches', doctor_id: 1, probability: 0},
        {disease: 'Peptic ulcer disease', symptom: 'vomiting indigestion loss of appetite abdominal pain passage of gases internal itching', doctor_id: 2, probability: 0},
        {disease: 'Diabetes', symptom: 'fatigue weight loss restlessness lethargy irregular sugar level blurred and distorted vision obesity excessive hunger increased appetite polyuria', doctor_id: 3, probability: 0},
        {disease: 'Bronchial Asthma', symptom: 'fatigue cough high fever breathlessness family history mucoid sputum', doctor_id: 4, probability: 0},
        {disease: 'Hypertension', symptom: 'headache chest pain dizziness loss of balance lack of concentration', doctor_id: 3, probability: 0},
        {disease: 'Jaundice', symptom: 'itching vomiting fatigue weight loss high fever yellowish skin dark urine abdominal pain', doctor_id: 5, probability: 0},
        {disease: 'Malaria', symptom: 'chills vomiting high fever sweating headache nausea diarrhoea muscle pain', doctor_id: 1, probability: 0},
        {disease: 'Chicken pox', symptom: 'itching skin rash fatigue lethargy high fever headache loss of appetite mild fever swelled lymph nodes malaise red spots over body', doctor_id: 1, probability: 0},
        {disease: 'Typhoid', symptom: 'chills vomiting fatigue high fever headache nausea constipation abdominal pain diarrhoea toxic look (typhos)', doctor_id: 1, probability: 0},
        {disease: 'Common Cold', symptom: 'continuous sneezing chills fatigue cough high fever headache swelled lymph nodes malaise phlegm throat irritation redness of eyes sinus pressure runny nose congestion chest pain loss of smell muscle pain', doctor_id: 4, probability: 0},
        {disease: 'Pneumonia', symptom: 'chills fatigue cough high fever breathlessness sweating malaise phlegm chest pain fast heart rate rusty sputum', doctor_id: 4, probability: 0},
        {disease: 'Migraine', symptom: 'acidity indigestion headache blurred and distorted vision excessive hunger stiff neck depression irritability visual disturbances', doctor_id: 6, probability: 0},
        {disease: 'AIDS', symptom: 'muscle wasting patches in throat high fever extra marital contacts', doctor_id: 1, probability: 0},
        {disease: 'Urinary tract infection', symptom: 'burning micturition bladder discomfort foul smell of urine continuous feel of urine', doctor_id: 8, probability: 0},
        {disease: 'Dengue', symptom: 'skin rash chills joint pain vomiting high fever headache nausea loss of appetite pain behind the eyes back pain malaise muscle pain red spots over body', doctor_id: 1, probability: 0},
        {disease: 'Acne', symptom: 'skin rash pus filled pimples blackheads scurring', doctor_id: 7, probability: 0},
    ]

    // doctor dataset
    const doctors = [
        {id: 1, name: 'Dr. Amani Nkosi', image: 'amani_nkosi', specialty: 'Infectious Disease Specialist', description: 'Infectious disease doctors are healthcare providers who specialize in diagnosing and treating conditions caused by bacteria, parasites, viruses and fungi.'},
        {id: 2, name: 'Dr. Kwame Osei', image: 'kwame_osei', specialty: 'Gastroenterologist', description: ' A gastroenterologist is a medical doctor who specializes in conditions affecting your digestive system.'},
        {id: 3, name: 'Dr. Zara Abasi', image: 'zara_abasi', specialty: 'Endocrinologist/Cardiologist', description: 'Endocrinologists specialize in treating disorders of the endocrine system, the network of hormone-producing glands in your body.'},
        {id: 4, name: 'Dr. Tendai Mbeki', image: 'tendai_mbeki', specialty: 'Pulmonologist/Allegist', description: 'A pulmonologist is a doctor who specializes in lung conditions. A pulmonologist diagnoses and treats diseases of the respiratory system.'},
        {id: 5, name: 'Dr. Sanaa Juma', image: 'sanaa_juma', specialty: 'Hepatologist', description: 'Hepatologists are medical doctors trained and certified to diagnose and treat various liver conditions.'},
        {id: 6, name: 'Dr. Jabari Sibanda', image: 'jabari_sibanda', specialty: 'Neurologist', description: 'a medical specialist in the diagnosis and treatment of disorders of the nervous system.'},
        {id: 7, name: 'Dr. Niazi Chikwamba', image: 'niazi_chikwamba', specialty: 'Dermatologist', description: 'A dermatologist is a doctor that specializes in treating skin, hair, nail, and mucous membrane disorders and diseases.'},
        {id: 8, name: 'Dr. Avodele Nkrumah', image: 'avodele_nkrumah', specialty: 'Urologist', description: 'a doctor who specializes in the study or treatment of the function and disorders of the urinary system.'},
        {id: 9, name: 'No Doctor Was identified', image: 'no_doctor', specialty: 'Symptoms not classified', description: 'Symptoms not classified'}
    ]

    // information being read from first screen
    const {symptom_stems} = route.params;

    function nlpTextClassifier() {

        // combine elements into symptom sentence
        const symptoms = symptom_stems.join(" ");

        // find probalilty of each symptom in dataset using cosine similarity
        dataset.forEach(disease => {
            disease.probability = stringSimilarity(symptoms, disease.symptom);
        });
    
        // find the one that has the maximum probability
        var maxDisease = dataset[0]
        dataset.forEach(iteratedDisease => {
            if (iteratedDisease.probability > maxDisease.probability) {
                maxDisease = iteratedDisease;
            }
        });
        
        // if max probability available
        if (maxDisease.probability > 0.09) {
            // classification successful
            return maxDisease;
        }
        else {
            // classification unsuccessful
            return null;
        }
    }

    // display resultant disease identified
    console.log("[disease identified]:", nlpTextClassifier())
    
    // result of referred doctor is put in this variable
    const doctorSelectedID = (nlpTextClassifier() != null ? nlpTextClassifier().doctor_id : 9 );
    console.log("[selected doctor id]:", doctorSelectedID);

    // id - 1 = index (correct position of the doctor selected)
    const doctorSelected = doctors[doctorSelectedID - 1];
    
    console.log("[selected doctor]:", doctorSelected);

    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => showDescrition(doctorSelected)}>
                <Text>
                    <Card style={styles.card}>
                        <View onPress={() => showDescrition(doctorSelected)} style={styles.cardContainer}>
                            <Image style={styles.avatarImage} source={images.doctors[doctorSelected.image]}/>
                            <Text style={styles.doctorName}>{doctorSelected.name}</Text>
                            <Text style={styles.doctorSpecialist}>{doctorSelected.specialty}</Text>
                        </View>
                    </Card>
                </Text>
                </TouchableOpacity>
            </View>
        )
    }

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    cardContainer: {
        height: 270,
        width: 326,
        alignItems: "center",
    },
    avatarImage: {
        borderRadius: 120,
        height: 150,
        width: 150,
        marginBottom: 25,
        marginTop: 20,
        borderColor: '#000000',
          borderWidth: 2,
    },
    doctorName: {
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 10,
        letterSpacing: 0.5,
        color: "#191919"
    },
    doctorSpecialist: {
        fontStyle: "italic",
        color: "#191919",
        fontWeight: 'bold'
    }
})