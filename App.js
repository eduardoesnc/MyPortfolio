import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import Modal from './Modal.js'
import * as WebBrowser from 'expo-web-browser';



function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, padding: 15 }}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Para onde você deseja navegar?</Text>
      
        <TouchableOpacity onPress={()=> navigation.navigate('Home')} style={styles.btnNavigation}>
          <Ionicons name="md-home" size={29} color="white"/>
          <Text style={{color: 'white', textAlignVertical: 'center', marginLeft: 8,  fontSize: 18}}>Home</Text>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={()=> navigation.navigate('Portfolio')} style={styles.btnNavigation}>
          <Ionicons name="ios-list" size={29} color="white"/>
          <Text style={{color: 'white', textAlignVertical: 'center', marginLeft: 8,  fontSize: 18}}>Portfolio</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate('Sobre')} style={styles.btnNavigation}>
          <Ionicons name="ios-information-circle" size={29} color="white"/>
          <Text style={{color: 'white', textAlignVertical: 'center', marginLeft: 8,  fontSize: 18}}>Sobre</Text>
        </TouchableOpacity>

        
      
      </ScrollView>
      
      

    </View>
  );
}

function PortfolioScreen({navigation,route}) {

  const [images,setImages] = useState([
    {
      img: require('./resources/img1.png'),
      width:0,
      height:0,
      ratio:0,
      website:'https://cursos.dankicode.com'
    },
    {
      img: require('./resources/img2.png'),
      width:0,
      height:0,
      ratio:0,
      website:'https://cursos.dankicode.com'
    }
  ])


  const [windowWidth, setWindowWidhth] = useState(0);

  useEffect(() => {
    
    let windowWidthN = Dimensions.get('window').width;

    setWindowWidhth(windowWidthN - 30 - 40);

    let newImages = images.filter(function(val){

      let w = Image.resolveAssetSource(val.img).width;
      let h = Image.resolveAssetSource(val.img).height;

      val.width = w;
      val.height = h;
      val.ratio = h/w;

      return val;

    })

    setImages(newImages);

  }, [])

  const abrirNavegador = async (website) => {
    let result = await WebBrowser.openBrowserAsync(website);
  }


  return (
    <View style={{ flex: 1, padding: 15 }}>
        <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
          <Text style={styles.textHeader}>Meus últimos projetos:</Text>

          {
            images.map(function(val){
              return (
                <View style={styles.ParentImage}>
                  <Image style={{width: windowWidth, height: windowWidth * val.ratio, resizeMode: 'stretch'}} source={val.img}/>

                  <TouchableOpacity onPress={()=>abrirNavegador(val.website)} style={styles.btnAbrirNavegador}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>Abrir no navegador</Text>
                    </TouchableOpacity>
                
                </View>
              )
            })
          }
          
        
        </ScrollView>
    
    

    </View>
  );
}


function SobreScreen({navigation}) {

  const [showModal,setModal] = useState(false);
  
  
  const abrirModalContato = () => {
    setModal (!showModal);
  }


  let widthWindow = Dimensions.get('window').width - 30 - 40;
  
  return (
    <View style={{flex: 1}}>

      {
        (showModal)?
        <Modal showModal={showModal} setModal={setModal}/>
        :
        <View></View>
      }

      <View style={{ flex: 1, padding: 15 }}>
        <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
          <Text style={styles.textHeader}>Sobre</Text>
        
          <Image source={require('./resources/perfil.jpg')} style={{width: widthWindow, height: widthWindow, marginTop: 5}}/>
          <View>
            <Text style={{fontSize: 20, marginTop:10, textAlign: 'center'}}>Eduardo Estevão / Dev</Text>
            <Text style={{fontSize: 16, marginTop:10}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mauris bibendum, viverra sapien a, fermentum nulla. Donec semper mattis odio ac condimentum. Mauris eu consectetur magna. Suspendisse laoreet vitae eros eu facilisis. Sed luctus hendrerit dolor, ut egestas justo sagittis eu. Vestibulum sapien ligula, elementum non tempor consectetur, consequat quis justo. Vivamus venenatis massa eros, eget gravida erat interdum vitae. Donec a mollis erat. Donec dictum justo eget est aliquet, non finibus mi ornare. Integer libero mi, maximus at semper quis, efficitur vitae nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Vivamus vestibulum mauris non risus cursus, quis vulputate orci vulputate. Curabitur eu mi eu enim congue imperdiet. Sed consectetur, risus eu ultricies vestibulum, nunc tortor faucibus felis, sed posuere dui felis at felis. Suspendisse potenti. Nam lorem eros, venenatis quis laoreet et, condimentum vitae ex. Cras tempor iaculis pulvinar. Duis tincidunt, eros at scelerisque sagittis, nunc felis ullamcorper nunc, et convallis nibh eros in purus. Donec semper, odio sed blandit iaculis, tortor nisi elementum odio, vel volutpat elit tortor id ligula. Nam nec velit id est rutrum dapibus.
            </Text>

            <TouchableOpacity onPress={()=>abrirModalContato()} style={{...styles.btnNavigation, justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 18}}>Entrar em contato</Text>
            </TouchableOpacity>

          </View>


        </ScrollView>

      </View>
    </View>
  );
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {

  LogBox.ignoreAllLogs(true);
  return (
    <NavigationContainer>

      <StatusBar hidden/>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Portfolio') {
              iconName = focused 
                ? 'ios-list' 
                : 'ios-list';
            } else if(route.name === 'Sobre') {
              iconName = focused 
                ? 'ios-information-circle' 
                : 'ios-information-circle';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#fc8014',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        <Tab.Screen name="Sobre" component={SobreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius:20,
  },
  textHeader: {
    color: '#fc8014',
    fontSize:  24,
    textAlign: 'center',
  },
  btnNavigation: {
    backgroundColor: '#fc8014',
    padding: 20,
    marginTop: 15,
    flexDirection: 'row',
    borderRadius:10,
  },
  ParentImage: {
    marginTop: 30,
  }, 
  btnAbrirNavegador: {
    marginTop: 5,
    padding: 20,
    backgroundColor: '#fc8014',
    borderRadius:10,
  },
})