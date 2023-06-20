import { View, Text ,BackHandler,StyleSheet ,Dimensions,Alert } from 'react-native'
import React,{useContext, useEffect,useState} from 'react'
import ComboBox from '../Component/Combobox';
import Buttonx from '../Component/Button';
import Constants from 'expo-constants'
import axios from 'axios';
import { MyContext } from '../Context/Context';
import TextInputC from '../Component/TextInput';
import { useTranslation } from 'react-i18next';
export default function Hesapduzenle({navigation}) {

    const {t} = useTranslation()
    const [step, setStep] = useState(1);
    const context = useContext(MyContext);
    const {updateSayfa,updatesetOptions3,
         updatesetOptions2 ,updatesetOptions, 
         theme,
         } = context

         const[dovizKontrol ,setDovizKontrol]= useState();
         const[dovizSecim   ,setDovizSecim]= useState();
         const[sube         ,setSube]= useState();
         const[hesapTur   ,setHesapTur]= useState();

         const[tcno,setTcno]=useState()
         


    const OnChangeButton = async (text)=>{
        const { manifest } = Constants;
        const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
        
        if(text ===`${t('ButtonName4')}`){
          //GERİ
            handlePrevStep();
          }
          else if(text ===`${t('Next')}`){
            // DEVAMET
            handleNextStep();
          }
          else if (text ===`${t('ButtonName5')}`)

          /// HESAP SİL
          {
            
            const { manifest } = Constants;
            const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
            // hesabın silinmesi için tcno ve seçilen dözvivi kontrol eder eğer hesabın bakiyesi 0 a eşitse silme gerçekleşir

            axios
            .post(`${apiAddress}/users/silme`,{tcno,dovizKontrol})
            .then((response) => {
              
             })
             .catch((error) => {
               console.error('API veri alınırken bir hata oluştu:', error);
             });


          }
          else if (text ===`${t('EditAccount')}`)
            // HESAP DÜZENLE

          {  // bu kısımda bir tane kontrol yap ve içinde para olan hesaplar doviztipi değiştirilemez
            const { manifest } = Constants;
            const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
            
            axios.post(`${apiAddress}/users/hesapduzenle`   ,{tcno,dovizKontrol:parseInt(dovizKontrol),dovizSecim,hesapTur,sube})
            .then((response) => {
              
              Alert.alert(
                `${t('Notification1')}`,
                `${t('Alright')}`,
                [
                  {
                    text: 'Tamam',
                    onPress: () => {
                      navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
                    },
                  },
                ]
              );
              
             })
             .catch((error) => {
                
               console.error('API veri alınırken bir hata oluştu:', error);
             });
            

          }
          else {

          }
    }

    const handleNextStep = () => {
        if (//eklenecek şeyler var 
         
          dovizSecim !== null &&
          hesapTur  !== null &&
          sube !== null
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
        const fetchData = async () =>{
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
        }
        fetchData()
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
              <View style={[styles.container,{backgroundColor: theme ==='dark' ? "#1e1e1e":'rgb(218, 231, 237)'}]}>
              <View style={styles.stepContainer}>
                
                <ComboBox onChangeHesap={setDovizKontrol} label="doviztipicheck"/>
               
                <ComboBox onChangeHesap={setDovizSecim} label="doviztipi"/>
               
                <ComboBox onChangeHesap={setSube} label="HesapTUR"/>
              
                <ComboBox onChangeHesap={setHesapTur} label="sube"/>
                <View style={styles.buttonContainer}>
                  <Buttonx label={`${t('Next')}`}  OnChangeButton={OnChangeButton} onPress={handleNextStep} />
                </View>
              </View>
              </View>
            );
          case 2:
            return (
              <View style={[styles.container,{backgroundColor: theme ==='dark' ? "#1e1e1e":'rgb(218, 231, 237)'}]}>
              <View style={styles.stepContainer}>
                
                <TextInputC label="TC No"onChangeText={setTcno}  style={styles.input} />
                
                
                <View style={styles.buttonContainer}>
                 
    
                  <Buttonx label={`${t('ButtonName5')}`} OnChangeButton={OnChangeButton} navigation={navigation}/>
                 <Buttonx label={`${t('EditAccount')}`} OnChangeButton={OnChangeButton} navigation={navigation}/>
                 
                </View>
                <View style={styles.buttonContainer}>
                 <Buttonx  label={`${t('ButtonName4')}`} OnChangeButton={OnChangeButton}  onPress={handlePrevStep} />
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
      width:'100%'
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