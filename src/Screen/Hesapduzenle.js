import { View, Text ,BackHandler,StyleSheet ,Dimensions} from 'react-native'
import React,{useContext, useEffect,useState} from 'react'
import ComboBox from '../Component/Combobox';
import Buttonx from '../Component/Button';
import Constants from 'expo-constants'
import axios from 'axios';
import { MyContext } from '../Context/Context';
import TextInputC from '../Component/TextInput';
export default function Hesapduzenle({navigation}) {
    const [step, setStep] = useState(1);
    const context = useContext(MyContext);
    const {chechdoviz,updateSayfa,updatesetOptions3, updatesetOptions2 ,updatesetOptions, selectedOptionsube , selectedOptiondoviz, selectedOptionhesap} = context


    const OnChangeButton = (text)=>{
        const { manifest } = Constants;
        const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
        
        if(text ==='Geri'){
            handlePrevStep();
          }
          else if(text ==='Devam Et'){
            handleNextStep();
          }
          else if (text ==='Hesap Sil')
          {
            axios
            .post(`${apiAddress}/users/silme`)
            .then((response) => {
             
       
             })
             .catch((error) => {
               console.error('API veri alınırken bir hata oluştu:', error);
             });


          }
          else if (text ==='Hesap Düzenle')
          {

          }
    }

    const handleNextStep = () => {
        if (
           selectedOptionsube !== null &&
           selectedOptiondoviz  !== null &&
           selectedOptionhesap !== null
        ) {
          setStep(step + 1);
        } else {
          console.log("Hata: Geçerli değerleri seçiniz.");
        }
      };
      const handlePrevStep = () => {
        setStep(step - 1);
      };

      useEffect(() => {
        const { manifest } = Constants;
        const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
    
        axios
          .get(`${apiAddress}/users/doviztipiF`)
          .then((response) => {
            // API'den alınan verileri options state'ine ata
            updatesetOptions(response.data);
           
          })
          .catch((error) => {
            console.error('API veri alınırken bir hata oluştu:', error);
          });
    
          axios
          .get(`${apiAddress}/users/hesaptur`)
          .then((response) => {
            // API'den alınan verileri options state'ine ata
            updatesetOptions2(response.data);
           
          })
          .catch((error) => {
            console.error('API veri alınırken bir hata oluştu:', error);
          });
    
          axios
          .get(`${apiAddress}/users/sube`)
          .then((response) => {
            // API'den alınan verileri options state'ine ata
            updatesetOptions3(response.data);
           
          })
          .catch((error) => {
            console.error('API veri alınırken bir hata oluştu:', error);
          });
      }, []);

    useEffect(() => {

        const backAction = () => {
          updateSayfa("HomeScreen");
          navigation.navigate('HomeScreen');
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    const renderStep = () => {
        switch (step) {
          case 1:
            return (
              <View style={styles.container}>
              <View style={styles.stepContainer}>
                <Text style={styles.stepText}>Değişecek Hesap</Text>
                <ComboBox   label="doviztipicheck"/>
                <Text style={styles.stepText}>Doviz Tipini Seçin:</Text>
                <ComboBox   label="doviztipi"/>
                <Text style={styles.stepText}>Hesap Türünü Seçin:</Text>
                <ComboBox label="HesapTUR"/>
                <Text style={styles.stepText}>Şube Seçin:</Text>
                <ComboBox label="sube"/>
                <View style={styles.buttonContainer}>
                  <Buttonx label="Devam Et"  OnChangeButton={OnChangeButton} onPress={handleNextStep} />
                </View>
              </View>
              </View>
            );
          case 2:
            return (
              <View style={styles.container}>
              <View style={styles.stepContainer}>
                <Text style={styles.stepText}>TC numaranız:</Text>
                <TextInputC label="TC No"  style={styles.input} />
                <Text style={styles.stepText}>Parolanız:</Text>
                <TextInputC   label="password" style={styles.input}/>
                <View style={styles.buttonContainer}>
                 
                  <Buttonx label="Hesap Sil" OnChangeButton={OnChangeButton} navigation={navigation}/>
                 <Buttonx label="Hesap Düzenle" OnChangeButton={OnChangeButton} navigation={navigation}/>
                
                </View>
                <View style={styles.buttonContainer}>
                 <Buttonx  label="Geri" OnChangeButton={OnChangeButton}  onPress={handlePrevStep} />
                 </View>
              </View>
              </View>
            );
         
          default:
            return null;
        }
      };
    
      return <View style={styles.container}>{renderStep()}</View>;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'rgb(218, 231, 237)'
    },
    stepContainer: {
      flex: 1,
      width: Dimensions.get('window').width * 0.8,
      justifyContent: 'center',
      
    },
    stepText: {
      fontSize: 16,
      marginTop: 10,
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
    },
    buttonContainer: {
      marginTop:"10%",
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });