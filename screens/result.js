import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Card from "../shared/Card";
import { images } from "../components/DoctorImages";
import { stringSimilarity } from "string-similarity-js"; 

export default function Result({ route }) {

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
        {disease: 'Acne', symptom: 'skin rash pus filled pimples blackheads scurring', doctor_id: 8, probability: 0},
        {disease: 'Gingivitis', symptom: 'bleeding gums brushing flossing bright red reddish purple gums tender painless mouth sores swollen shiny bad breath', doctor_id: 10, probability: 0},
        {disease: 'Gum Disease', symptom: 'bad breath toothache bright red gums loose teeth receding gums tender tooth loss', doctor_id: 10, probability: 0},
        {disease: 'Tooth Decay', symptom: 'toochache sensitivity tooth mild sharp pain hot cold sweet holes pits brown black white stain', doctor_id: 10, probability: 0},
        {disease: 'Toothache', symptom: 'fever tooth sensitivity swelling around tooth back jaw aches mouth odor pain discomfort eating chewing bad breath headaches cheek infected redness', doctor_id: 10, probability: 0},
        {disease: 'Prostate Cancer', symptom: 'bone pain difficulty steady urine stream dribbling excessive night frequent urge leaking retention weak unirary system', doctor_id: 11, probability: 0},
        {disease: 'Breast Cancer', symptom: 'breast lump thickening change size shape appearing dimpling redness pitting skin nipple areola abnormal bloody fluid', doctor_id: 11, probability: 0},
        {disease: 'Cancer', symptom: 'chemical imbalances urination constipation confusion bowel bladder sore heal bleeing discharge lump indigestion swallowing wart mole nagging cough hoarseness', doctor_id: 11, probability: 0},
        {disease: 'Mental Health Issues', symptom: 'inability emotions sleeping patterns substance performance social situations withdrawal physical illnesses excessive anxiety nightmares temper tantrums', doctor_id: 12, probability: 0},
        {disease: 'Physical Issues', symptom: 'pain balance injury mobility weakened joints discomfort sleeping uncontrollable urination coordination motion neck back neurological disorder disability breathing', doctor_id: 13, probability: 0},
        {disease: 'Sinus Infection', symptom: 'face sinuses back eyes ear forehead congestion itching loss runny nose swelling sinus pressure ear infection headache mouth breathing phlegm pus throat irritation', doctor_id: 14, probability: 0},
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
        {id: 9, name: 'No Doctor Was identified', image: 'no_doctor', specialty: 'Symptoms not classified', description: 'Symptoms not classified'},
        {id: 10, name: 'Dr. Tafadzwa Marakidza', image: 'tafadzwa_marakidza', specialty: 'Dentist', description: 'A dentist is a person who is qualified to treat diseases and other conditions that affect the teeth and gums, especially the repair and extraction of teeth and insertion of artificial ones.'},
        {id: 11, name: 'Dr. Suresh Kumar', image: 'suresh_kumar', specialty: 'Oncologist', description: 'A doctor who treats cancer and provides medical care for a person diagnsoed with cancer. They have 3 major arease: medical oncology, radiation oncology, and surgical oncology.'},
        {id: 12, name: 'Dr. Jenny Watsom', image: 'jenny_watson', specialty: 'Psychiatrist/ Psychologist', description: 'A psychiatrist is a medical doctor who specializes in mental health, including substance use disorders.'},
        {id: 13, name: 'Dr. Steven Rushwa', image: 'steven_rushwa', specialty: 'Physiotherapist', description: 'A physiotherapist helps people affected by injury, illness or disability through movement and exercise, manual therapy, education and advice.'},
        {id: 14, name: 'Dr. Matt Johnson', image: 'matt_johnson', specialty: 'ENT specialist/ Otolaryngologist', description: 'A ENT specialist has advanced medical and surgical training in the diagnosis and treatment of simple sinusitis, allergies to complex cancers, trauma, deformities of the head,'},
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
                        <View style={styles.cardContainer}>
                            <Image style={styles.avatarImage} source={images.doctors[doctorSelected.image]}/>
                            <Text style={styles.doctorName}>{doctorSelected.name}</Text>
                            <Text style={styles.doctorSpecialist}>{doctorSelected.specialty}</Text>
                        </View>
                    </Card>
                </Text>
                </TouchableOpacity>
                <View style={styles.hintBubble}>
                    <Card>
                        <Text style={styles.hintBubbleText}>
                            Consider adding more symptoms for more satisfying results.
                        </Text>
                    </Card>
                </View>
            </View>
        )
    }

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        alignItems: 'center'
    },
    cardContainer: {
        height: 270,
        width: 385,
        alignItems: "center",
    },
    avatarImage: {
        borderRadius: 120,
        height: 150,
        width: 150,
        marginBottom: 25,
        marginTop: 20,
        borderColor: '#00cc00',
        borderWidth: 3,
    },
    doctorName: {
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 10,
        letterSpacing: 0.5,
        color: "white"
    },
    doctorSpecialist: {
        fontStyle: "italic",
        color: "white",
        fontWeight: 'bold',
        fontSize: 15
    },
    hintBubble: {
        marginTop: 5,
        width: 420
    },
    hintBubbleText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600'
    }
})