import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


export default function InputSymptoms({ navigation }) {

    const [symptoms, setSymptoms] = useState('');

    const changeHandler = (val) => {
        setSymptoms(val);
    }

    const submitButton = () => {
        if(symptoms != '' ) {
            navigation.navigate('Results', {symptom_stems :nlp_preprocessor(symptoms)});
        }
        else {
            Alert.alert('Empty Input', 'You cannot submit empty symptom input', [{text: 'Ok', onPress: () => console.log('user passed no input')}]);
        }
    }

    function nlp_preprocessor(input) {

        // small letters
        const lowerCase = input.toLowerCase();

        // split words into array
        const splitWords = lowerCase.split(' ');

        // removing stop words from symptom input (to be updated always)
        var symptom_base = [];

        splitWords.forEach(element => {
            if (element == "i" 
            || element ==  "a" || element ==  "and" || element ==  "are"
            || element ==  "at" || element ==  "as" || element ==  "be"
            || element ==  "by" || element ==  "for" || element ==  "from"
            || element ==  "at" || element ==  "has" || element ==  "had"
            || element ==  "he" || element ==  "was" || element ==  "is"
            || element ==  "it" || element ==  "its" || element ==  "it's"
            || element ==  "that" || element ==  "the" || element ==  "to"
            || element ==  "will" || element ==  "with" || element ==  "we"
            || element ==  "they" || element ==  "this" || element ==  "these"
            || element ==  "those" || element ==  "some" || element ==  "any"
            || element ==  "no" || element ==  "every" || element ==  "other"
            || element ==  "such" || element ==  "can" || element ==  "could"
            || element ==  "would" || element ==  "shall" || element ==  "should"
            || element ==  "may" || element ==  "might" || element ==  "must"
            || element ==  "ought" || element ==  "morning" || element ==  "afternoon"
            || element ==  "evening" || element ==  "night" || element ==  "sleeping"
            || element ==  "suffer" || element ==  "suffering" || element ==  "have"
            || element ==  "serious" || element ==  "many" || element ==  "few"
            || element ==  "low" || element ==  "little" || element ==  "small"
            || element == "having" || element == "am" || element == "i'am"
            || element == "just" || element == "still" || element == "got"
            || element ==  "you" || element ==  "were" || element ==  "did"
            || element ==  "not" || element ==  "know" || element ==  "didn't"

            ) {
                symptom_base.push("");
            }
            else {
                symptom_base.push(element);
            }
        });

        // removing empty array elements from symptom_base
        const finalSymptoms = symptom_base.filter(removeEmpty);

        function removeEmpty(symptom) {
            return symptom != "";
        }
        // this displays the symptoms that remain after removing stop words.
        console.log("[NLP preprocessing 1st stage]:", finalSymptoms);
        return finalSymptoms;
    }

    return (
        <View style={styles.body}>
            <TextInput 
             placeholder="Input Patient's Symptoms"
             style={styles.input}
             onChangeText={changeHandler}
              />
            <Text style={styles.summary}>
            <FontAwesome5 style={styles.diseaseIcon} name="disease" size={24} color="black" />
                Summary: {symptoms}
            </Text>
            
            <View style={styles.button}>
                <Button 
                 title='Submit' 
                 color={'#fca'}
                 onPress={submitButton} /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        margin: 20,
        borderWidth: 3,
        borderRadius: 15,
        borderColor: '#fca',
        padding: 10,
        marginTop: 10,
        marginBottom: 35
    },
    button: {
        margin: 55,
        marginTop: 120,
    },
    summary: {
        padding: 20,
        backgroundColor: '#fca',
        marginTop: 15,
        marginHorizontal: 7,
        borderRadius: 5,
        fontWeight: 'bold'      
      },
    body: {
        flex: 1,
        justifyContent: 'center'
    },
})